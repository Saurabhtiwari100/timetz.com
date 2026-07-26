import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { DateTime } from 'luxon';
import { CITIES, QUICK_PRESETS, searchCities, type City } from '../lib/cities';
import { copyText } from '../lib/clipboard';
import { getInitialSelection, resolveCities } from '../lib/citySelection';
import { convertTime, STATUS_META, parseEpoch, parseSharedDateTime, shareUrl, type ConvertedTime } from '../lib/timeUtils';
import { parseQuery } from '../lib/nlp';
const GlobeWidget = lazy(() => import('./GlobeWidget'));
import MeetingPlanner from './MeetingPlanner';

// ── CitySearch ──────────────────────────────────────────────────────────────
function CitySearch({ onSelect, placeholder, className = '' }: {
  onSelect: (city: City) => void;
  placeholder: string;
  className?: string;
}) {
  const [q, setQ] = useState('');
  const [results, setResults] = useState<City[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { setResults(searchCities(q)); }, [q]);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <div className={`cs-wrap ${className}`} ref={ref}>
      <input className="cs-input" value={q}
        onChange={e => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder} autoComplete="off" spellCheck={false} aria-label={placeholder} />
      {open && results.length > 0 && (
        <ul className="cs-dropdown">
          {results.map(city => {
            const selectCity = () => {
              onSelect(city);
              setQ('');
              setOpen(false);
            };
            return (
              <li key={city.timezone + city.name}>
                <button
                  type="button"
                  className="cs-item"
                  onMouseDown={e => e.preventDefault()}
                  onClick={selectCity}
                >
                  <span className="cs-city">{city.name}</span>
                  <span className="cs-country">{city.country}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// ── Row card for each city ───────────────────────────────────────────────────
function CityRow({ result, use24h, onRemove, isPinned }: {
  result: ConvertedTime;
  use24h: boolean;
  onRemove: () => void;
  isPinned?: boolean;
}) {
  const meta = STATUS_META[result.status];
  const time = use24h ? result.time24 : result.timeStr;
  const dayLabel = result.dayDiff !== 0
    ? (result.dayDiff > 0 ? `+${result.dayDiff}d` : `${result.dayDiff}d`)
    : null;

  return (
    <div className="row-card" data-status={result.status} data-pinned={isPinned ? '' : undefined} style={{ '--status-color': meta.color } as React.CSSProperties}>
      <div className="row-left">
        <div>
          <div className="row-city-name">
            {isPinned && <span className="row-source-dot" title="Source" />}
            {result.cityName}
          </div>
          <div className="row-country">{result.country} · {result.timezone.replace('_', ' ')}</div>
        </div>
        {!isPinned && (
          <button type="button" className="row-remove" onClick={onRemove} aria-label={`Remove ${result.cityName}`}>×</button>
        )}
      </div>

      <div className="row-right">
        <div className="row-time-wrap">
          <span className="row-time">{time}</span>
          {dayLabel && <span className="row-day-badge">{dayLabel}</span>}
        </div>
        <div className="row-date">{result.dayShort}, {result.dateStr}</div>
        <div className="row-offset">{result.offsetStr}</div>
      </div>

      <div className="row-center">
        <span className="row-status-dot" style={{ background: meta.color }} title={meta.label} />
        <span className="row-status-label">{meta.emoji} {meta.label}</span>
      </div>
    </div>
  );
}

// ── Copy icon SVG ────────────────────────────────────────────────────────────
function CopyIcon({ size = 16 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="8" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M3 11V3.5A1.5 1.5 0 0 1 4.5 2H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function CheckIcon({ size = 16 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 8.5L6.5 12L13 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function TimeConverter({ defaultCities }: { defaultCities?: string } = {}) {
  const initialSelection = getInitialSelection(defaultCities);
  const [sourceDt, setSourceDt] = useState<DateTime>(() => DateTime.now().setZone(initialSelection.source.timezone));
  const [sourceCity, setSourceCity] = useState<City>(() => initialSelection.source);
  const [targetCities, setTargetCities] = useState<City[]>(() => initialSelection.targets);
  const [nlpInput, setNlpInput] = useState('');
  const [nlpHint, setNlpHint] = useState('');
  const [epochInput, setEpochInput] = useState('');
  const [epochError, setEpochError] = useState('');
  const [use24h, setUse24h] = useState(false);
  const [liveMode, setLiveMode] = useState(true);
  const [copied, setCopied] = useState(false);
  const [sharedCopied, setSharedCopied] = useState(false);
  const [epochCopied, setEpochCopied] = useState<string | null>(null);
  const [copyFailed, setCopyFailed] = useState<string | null>(null);
  const [inputTab, setInputTab] = useState<'time' | 'epoch' | 'meeting'>('time');
  const [showGlobe, setShowGlobe] = useState(false);
  // null until mounted to avoid SSR/CSR hydration mismatch
  const [nowEpoch, setNowEpoch] = useState<DateTime | null>(null);
  const nlpTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Start epoch ticker after mount only (avoids hydration mismatch)
  useEffect(() => {
    setNowEpoch(DateTime.now());
    const id = setInterval(() => {
      const now = DateTime.now();
      setNowEpoch(now);
      if (liveMode) setSourceDt(now.setZone(sourceCity.timezone));
    }, 1000);
    return () => clearInterval(id);
  }, [liveMode, sourceCity.timezone]);

  // URL hydration
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const cs = p.get('cities') ?? defaultCities ?? null; const t = p.get('t');
    let hydratedSourceCity = sourceCity;
    if (cs) {
      const found = resolveCities(cs);
      if (found.length >= 1) {
        hydratedSourceCity = found[0];
        setSourceCity(found[0]);
        setTargetCities(found.slice(1));
      }
    }
    if (t) {
      const dt = parseSharedDateTime(t, hydratedSourceCity.timezone);
      if (dt?.isValid) { setSourceDt(dt); setLiveMode(false); }
    }
  }, []);

  // NLP hint
  useEffect(() => {
    if (!nlpInput.trim()) { setNlpHint(''); return; }
    if (nlpTimer.current) clearTimeout(nlpTimer.current);
    nlpTimer.current = setTimeout(() => {
      const parsed = parseQuery(nlpInput);
      if (parsed.time && parsed.sourceCity) {
        setNlpHint(`→ ${parsed.time.toFormat('h:mm a')} in ${parsed.sourceCity.name}${parsed.targetCities.length ? ' → ' + parsed.targetCities.map(c => c.name).join(', ') : ''}`);
      } else { setNlpHint(''); }
    }, 250);
  }, [nlpInput]);

  useEffect(() => {
    if (!window.matchMedia('(max-width: 768px)').matches) {
      setShowGlobe(true);
    }
  }, []);

  const applyNlp = () => {
    const parsed = parseQuery(nlpInput);
    if (parsed.sourceCity) {
      setSourceCity(parsed.sourceCity);
      setSourceDt(parsed.time ?? DateTime.now().setZone(parsed.sourceCity.timezone));
      setLiveMode(parsed.time == null);
      if (parsed.targetCities.length > 0) setTargetCities(parsed.targetCities);
    } else if (parsed.time) {
      setSourceDt(parsed.time);
      setLiveMode(false);
    }
    setNlpInput(''); setNlpHint('');
  };

  const applyEpoch = () => {
    const dt = parseEpoch(epochInput);
    if (!dt) { setEpochError('Invalid epoch — enter seconds or milliseconds'); return; }
    setEpochError('');
    setSourceDt(dt.setZone(sourceCity.timezone));
    setLiveMode(false);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [h, m] = e.target.value.split(':').map(Number);
    if (isNaN(h) || isNaN(m)) return;
    setSourceDt(prev => prev.set({ hour: h, minute: m, second: 0 }));
    setLiveMode(false);
  };

  const addTarget = (city: City) => {
    if (city.name === sourceCity.name) return;
    if (!targetCities.find(c => c.timezone === city.timezone && c.name === city.name))
      setTargetCities(prev => [...prev, city]);
  };

  const removeTarget = (idx: number) => setTargetCities(prev => prev.filter((_, i) => i !== idx));

  const swapSourceWithFirstTarget = () => {
    const [nextSource, ...remainingTargets] = targetCities;
    if (!nextSource) return;
    setTargetCities([sourceCity, ...remainingTargets]);
    setSourceCity(nextSource);
    setSourceDt(dt => dt.setZone(nextSource.timezone));
  };

  const applyPreset = (cities: string[]) => {
    const found = cities.map(n => CITIES.find(c => c.name === n)).filter(Boolean) as City[];
    if (!found.length) return;
    setSourceCity(found[0]);
    setSourceDt(DateTime.now().setZone(found[0].timezone));
    setTargetCities(found.slice(1));
    setLiveMode(true);
  };

  const copyTimes = async () => {
    const src = `${sourceCity.name}: ${use24h ? sourceDt.toFormat('HH:mm') : sourceDt.toFormat('h:mm a')} — ${sourceDt.toFormat('EEE, MMM d')}`;
    const rows = results.map(r => `${r.cityName}: ${use24h ? r.time24 : r.timeStr} — ${r.dayShort}, ${r.dateStr}`);
    try {
      await copyText([src, ...rows].join('\n'));
      setCopyFailed(null);
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyFailed('times'); setTimeout(() => setCopyFailed(null), 2500);
    }
  };

  const copyShare = async () => {
    const url = shareUrl([sourceCity, ...targetCities].map(c => c.name), sourceDt.toISO()!);
    try {
      await copyText(url);
      setCopyFailed(null);
      setSharedCopied(true); setTimeout(() => setSharedCopied(false), 2000);
    } catch {
      setCopyFailed('share'); setTimeout(() => setCopyFailed(null), 2500);
    }
  };

  const copyEpoch = async (val: string, key: string) => {
    try {
      await copyText(val);
      setCopyFailed(null);
      setEpochCopied(key); setTimeout(() => setEpochCopied(null), 2000);
    } catch {
      setCopyFailed(key); setTimeout(() => setCopyFailed(null), 2500);
    }
  };

  const results: ConvertedTime[] = targetCities.map(city =>
    convertTime(sourceCity.timezone, city.timezone, city.name, city.country, sourceDt)
  );

  const sourceResult = convertTime(sourceCity.timezone, sourceCity.timezone, sourceCity.name, sourceCity.country, sourceDt);

  const epochRows = nowEpoch ? [
    { key: 'unix', label: 'Unix (s)', val: String(Math.floor(nowEpoch.toMillis() / 1000)) },
    { key: 'ms',   label: 'ms',       val: String(nowEpoch.toMillis()) },
    { key: 'iso',  label: 'ISO',       val: nowEpoch.toUTC().toISO()! },
  ] : [];

  return (
    <div className="tc">

      {/* ── Sticky control bar ── */}
      <div className="tc-bar">
        <div className="tc-tabs">
          <button type="button" className={`tc-tab ${inputTab === 'time' ? 'tc-tab-active' : ''}`} onClick={() => setInputTab('time')} aria-pressed={inputTab === 'time'}>Time</button>
          <button type="button" className={`tc-tab ${inputTab === 'epoch' ? 'tc-tab-active' : ''}`} onClick={() => setInputTab('epoch')} aria-pressed={inputTab === 'epoch'}>Epoch</button>
          <button type="button" className={`tc-tab ${inputTab === 'meeting' ? 'tc-tab-active' : ''}`} onClick={() => setInputTab('meeting')} aria-pressed={inputTab === 'meeting'}>Meeting</button>
        </div>

        {inputTab === 'time' ? (
          <div className="tc-time-row">
            <input className="tc-nlp" value={nlpInput}
              onChange={e => setNlpInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && applyNlp()}
              placeholder='e.g. "4pm Mumbai to London" or "tomorrow 9am NY"'
              spellCheck={false} />
            <input type="time" className="tc-time-input" value={sourceDt.toFormat('HH:mm')} onChange={handleTimeChange} />
            <CitySearch onSelect={c => { setSourceCity(c); setSourceDt(dt => dt.setZone(c.timezone)); }} placeholder={sourceCity.name} className="tc-city-search" />
            {nlpInput
              ? <button type="button" className="tc-btn-cyan" onClick={applyNlp}>Go</button>
              : <button type="button" className={`tc-btn-live ${liveMode ? 'active' : ''}`} onClick={() => { setLiveMode(true); setSourceDt(DateTime.now().setZone(sourceCity.timezone)); }}>● Live</button>
            }
          </div>
        ) : inputTab === 'epoch' ? (
          <div className="tc-epoch-row">
            <input className="tc-epoch-input" value={epochInput}
              onChange={e => { setEpochInput(e.target.value); setEpochError(''); }}
              onKeyDown={e => e.key === 'Enter' && applyEpoch()}
              placeholder="Unix timestamp — seconds (1700000000) or ms (1700000000000)" />
            <button type="button" className="tc-btn-cyan" onClick={applyEpoch}>Convert</button>
          </div>
        ) : null}

        <div className="tc-controls">
          <button type="button" className="tc-pill-btn" onClick={() => setUse24h(v => !v)}>{use24h ? '12h' : '24h'}</button>
          <button
            type="button"
            className="tc-pill-btn"
            onClick={swapSourceWithFirstTarget}
            disabled={targetCities.length === 0}
            title="Swap source with first target"
            aria-label="Swap source with first target"
          >
            ↔ Swap
          </button>
          <button type="button" className="tc-pill-btn tc-pill-btn-icon" onClick={copyTimes} title="Copy times">
            {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
            <span>{copyFailed === 'times' ? 'Failed' : copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button type="button" className="tc-pill-btn tc-pill-btn-icon" onClick={copyShare} title="Share link">
            {sharedCopied ? <CheckIcon size={16} /> : (
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3l3 3-3 3M13 6H6.5A3.5 3.5 0 0 0 3 9.5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            )}
            <span>{copyFailed === 'share' ? 'Failed' : sharedCopied ? 'Copied' : 'Share'}</span>
          </button>
        </div>
      </div>

      {inputTab === 'meeting' && (
        <MeetingPlanner sourceCity={sourceCity} targetCities={targetCities} />
      )}

      {nlpHint && <div className="tc-hint">{nlpHint}</div>}
      {epochError && <div className="tc-error">{epochError}</div>}

      {!liveMode && (
        <div className="tc-epoch-strip">
          <span className="tc-epoch-val">Unix: <b>{Math.floor(sourceDt.toMillis() / 1000)}</b></span>
          <span className="tc-epoch-val">ms: <b>{sourceDt.toMillis()}</b></span>
          <span className="tc-epoch-val">ISO: <b>{sourceDt.toISO()}</b></span>
        </div>
      )}

      {/* ── Quick presets ── */}
      <div className="tc-presets">
        {QUICK_PRESETS.map(p => (
          <button type="button" key={p.label} className="tc-preset" onClick={() => applyPreset(p.cities)}>{p.label}</button>
        ))}
      </div>

      {/* ── Live epoch widget ── */}
      {nowEpoch && (
        <div className="tc-epoch-widget">
          <span className="tc-epoch-widget-label">Current epoch</span>
          <div className="tc-epoch-widget-vals">
            {epochRows.map(({ key, label, val }) => (
              <div key={key} className="tc-epoch-widget-item">
                <span className="tc-epoch-widget-key">{label}</span>
                <span className="tc-epoch-widget-val">{val}</span>
                <button
                  type="button"
                  className="tc-epoch-widget-copy"
                  onClick={() => copyEpoch(val, key)}
                  title={`Copy ${label}`}
                  aria-label={`Copy ${label}`}
                >
                  {epochCopied === key ? <CheckIcon size={15} /> : <CopyIcon size={15} />}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Main layout: cards + globe ── */}
      <div className="tc-main-layout">
        <div className="tc-cards-col">
          <div className="tc-rows">
            <CityRow result={sourceResult} use24h={use24h} onRemove={() => {}} isPinned />
            <div className="tc-divider" />
            {results.map((r, idx) => (
              <CityRow key={r.cityName + r.timezone + idx} result={r} use24h={use24h} onRemove={() => removeTarget(idx)} />
            ))}
          </div>

          <div className="tc-add-row">
            <CitySearch onSelect={addTarget} placeholder="+ Add city, country, or timezone" />
          </div>
        </div>

        {/* ── Globe sidebar ── */}
        <div className="tc-globe-col">
          {showGlobe && (
            <Suspense fallback={null}>
              <GlobeWidget sourceCity={sourceCity} targetCities={targetCities} />
            </Suspense>
          )}
        </div>
      </div>

    </div>
  );
}
