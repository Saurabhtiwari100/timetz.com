import { useState, useEffect, useRef, useCallback } from 'react';
import { DateTime } from 'luxon';
import { CITIES, QUICK_PRESETS, searchCities, type City } from '../lib/cities';
import { convertTime, STATUS_META, nowInZone, shareUrl, type ConvertedTime } from '../lib/timeUtils';
import { parseQuery } from '../lib/nlp';

const DEFAULT_CITIES = [
  CITIES.find(c => c.name === 'Mumbai')!,
  CITIES.find(c => c.name === 'London')!,
  CITIES.find(c => c.name === 'New York')!,
];

function CityCard({ result, sourceDt, onRemove }: {
  result: ConvertedTime;
  sourceDt: DateTime;
  onRemove: () => void;
}) {
  const meta = STATUS_META[result.status];
  const dayLabel = result.dayDiff === 0 ? '' : result.dayDiff > 0 ? `+${result.dayDiff}d` : `${result.dayDiff}d`;

  return (
    <div className="city-card" data-status={result.status}>
      <div className="city-card-header">
        <div className="city-info">
          <span className="city-name">{result.cityName}</span>
          <span className="city-country">{result.country}</span>
        </div>
        <button className="remove-btn" onClick={onRemove} aria-label={`Remove ${result.cityName}`}>×</button>
      </div>

      <div className="city-time-row">
        <span className="city-time">{result.timeStr}</span>
        {dayLabel && <span className="day-badge">{dayLabel}</span>}
      </div>

      <div className="city-meta-row">
        <span className="city-date">{result.dayName}, {result.dateStr}</span>
      </div>

      <div className="city-footer">
        <span className="status-pill" style={{ color: meta.color }}>
          {meta.emoji} {meta.label}
        </span>
        <span className="offset-label">{result.offsetStr}</span>
      </div>
    </div>
  );
}

function CitySearch({ onSelect, placeholder }: {
  onSelect: (city: City) => void;
  placeholder: string;
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<City[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setResults(searchCities(query));
  }, [query]);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="city-search" ref={ref}>
      <input
        className="city-search-input"
        value={query}
        onChange={e => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        autoComplete="off"
      />
      {open && results.length > 0 && (
        <ul className="city-dropdown">
          {results.map(city => (
            <li key={city.timezone + city.name}>
              <button
                className="city-dropdown-item"
                onMouseDown={e => {
                  e.preventDefault();
                  onSelect(city);
                  setQuery('');
                  setOpen(false);
                }}
              >
                <span className="dropdown-city">{city.name}</span>
                <span className="dropdown-country">{city.country}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function TimeConverter() {
  const [sourceDt, setSourceDt] = useState<DateTime>(() => DateTime.now().setZone('Asia/Kolkata'));
  const [sourceCity, setSourceCity] = useState<City>(DEFAULT_CITIES[0]);
  const [targetCities, setTargetCities] = useState<City[]>(DEFAULT_CITIES.slice(1));
  const [nlpInput, setNlpInput] = useState('');
  const [nlpHint, setNlpHint] = useState('');
  const [use24h, setUse24h] = useState(false);
  const [copied, setCopied] = useState(false);
  const [liveMode, setLiveMode] = useState(true);
  const nlpRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Live clock tick
  useEffect(() => {
    if (!liveMode) return;
    const id = setInterval(() => {
      setSourceDt(DateTime.now().setZone(sourceCity.timezone));
    }, 1000);
    return () => clearInterval(id);
  }, [liveMode, sourceCity.timezone]);

  // URL params on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const citiesParam = params.get('cities');
    const tParam = params.get('t');
    if (citiesParam) {
      const names = citiesParam.split(',');
      const found = names.map(n => CITIES.find(c => c.name === n)).filter(Boolean) as City[];
      if (found.length >= 2) {
        setSourceCity(found[0]);
        setTargetCities(found.slice(1));
      }
    }
    if (tParam) {
      const dt = DateTime.fromISO(tParam);
      if (dt.isValid) {
        setSourceDt(dt);
        setLiveMode(false);
      }
    }
  }, []);

  // NLP debounce
  useEffect(() => {
    if (!nlpInput.trim()) { setNlpHint(''); return; }
    if (nlpRef.current) clearTimeout(nlpRef.current);
    nlpRef.current = setTimeout(() => {
      const parsed = parseQuery(nlpInput);
      if (parsed.time && parsed.sourceCity) {
        setNlpHint(`→ ${parsed.time.toFormat('h:mm a')} in ${parsed.sourceCity.name}${parsed.targetCities.length ? ' to ' + parsed.targetCities.map(c => c.name).join(', ') : ''}`);
      } else {
        setNlpHint('');
      }
    }, 300);
  }, [nlpInput]);

  const applyNlp = () => {
    const parsed = parseQuery(nlpInput);
    if (parsed.sourceCity) {
      setSourceCity(parsed.sourceCity);
      setSourceDt(parsed.time ?? DateTime.now().setZone(parsed.sourceCity.timezone));
      setLiveMode(false);
    }
    if (parsed.targetCities.length > 0) {
      setTargetCities(prev => {
        const existing = new Set(prev.map(c => c.timezone));
        const newOnes = parsed.targetCities.filter(c => !existing.has(c.timezone));
        return [...prev, ...newOnes];
      });
    }
    setNlpInput('');
    setNlpHint('');
  };

  const handleSourceCityChange = (city: City) => {
    setSourceCity(city);
    setSourceDt(prev => prev.setZone(city.timezone));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [h, m] = e.target.value.split(':').map(Number);
    if (isNaN(h) || isNaN(m)) return;
    setSourceDt(prev => prev.set({ hour: h, minute: m, second: 0 }));
    setLiveMode(false);
  };

  const addTarget = (city: City) => {
    if (!targetCities.find(c => c.timezone === city.timezone && c.name === city.name)) {
      setTargetCities(prev => [...prev, city]);
    }
  };

  const removeTarget = (idx: number) => {
    setTargetCities(prev => prev.filter((_, i) => i !== idx));
  };

  const applyPreset = (cities: string[]) => {
    const found = cities.map(n => CITIES.find(c => c.name === n)).filter(Boolean) as City[];
    if (found.length < 2) return;
    setSourceCity(found[0]);
    setSourceDt(DateTime.now().setZone(found[0].timezone));
    setTargetCities(found.slice(1));
    setLiveMode(true);
  };

  const copyText = () => {
    const lines = [
      `${sourceCity.name}: ${sourceDt.toFormat('h:mm a')} — ${sourceDt.toFormat('cccc, MMM d')}`,
      ...results.map(r => `${r.cityName}: ${r.timeStr} — ${r.dayName}, ${r.dateStr}`),
    ].join('\n');
    navigator.clipboard.writeText(lines).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const getShareUrl = () => {
    const all = [sourceCity, ...targetCities];
    return shareUrl(all.map(c => c.name), sourceDt.toISO()!);
  };

  const copyShare = () => {
    navigator.clipboard.writeText(getShareUrl()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const results: ConvertedTime[] = targetCities.map(city =>
    convertTime(sourceCity.timezone, city.timezone, city.name, city.country, sourceDt)
  );

  const sourceResult: ConvertedTime = {
    cityName: sourceCity.name,
    country: sourceCity.country,
    timezone: sourceCity.timezone,
    dt: sourceDt,
    timeStr: sourceDt.toFormat(use24h ? 'HH:mm' : 'h:mm a'),
    dateStr: sourceDt.toFormat('MMM d, yyyy'),
    dayName: sourceDt.toFormat('cccc'),
    offsetStr: 'source',
    offsetMinutes: 0,
    status: (() => {
      const h = sourceDt.hour;
      if (h >= 9 && h < 18) return 'working';
      if (h >= 6 && h < 9) return 'early-morning';
      if (h >= 18 && h < 23) return 'evening';
      return 'sleeping';
    })(),
    isNextDay: false,
    isPrevDay: false,
    dayDiff: 0,
  };

  return (
    <div className="converter">
      {/* NLP Input */}
      <div className="nlp-section">
        <div className="nlp-input-wrap">
          <input
            className="nlp-input"
            value={nlpInput}
            onChange={e => setNlpInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && applyNlp()}
            placeholder='Try "4pm Mumbai to London" or "Tomorrow 9am New York to India"'
            spellCheck={false}
          />
          {nlpInput && (
            <button className="nlp-go" onClick={applyNlp}>Convert</button>
          )}
        </div>
        {nlpHint && <p className="nlp-hint">{nlpHint}</p>}
      </div>

      {/* Quick Presets */}
      <div className="presets-row">
        {QUICK_PRESETS.map(preset => (
          <button
            key={preset.label}
            className="preset-btn"
            onClick={() => applyPreset(preset.cities)}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Source Controls */}
      <div className="source-section">
        <div className="source-label">Source timezone</div>
        <div className="source-controls">
          <CitySearch onSelect={handleSourceCityChange} placeholder={sourceCity.name} />
          <input
            type="time"
            className="time-input"
            value={sourceDt.toFormat('HH:mm')}
            onChange={handleTimeChange}
          />
          <button
            className={`live-btn ${liveMode ? 'live-btn-active' : ''}`}
            onClick={() => {
              setLiveMode(true);
              setSourceDt(DateTime.now().setZone(sourceCity.timezone));
            }}
          >
            ● Live
          </button>
          <button className="toggle-btn" onClick={() => setUse24h(v => !v)}>
            {use24h ? '12h' : '24h'}
          </button>
        </div>
      </div>

      {/* Results Grid */}
      <div className="results-grid">
        {/* Source card */}
        <div className="city-card city-card-source" data-status={sourceResult.status}>
          <div className="city-card-header">
            <div className="city-info">
              <span className="city-name">{sourceResult.cityName}</span>
              <span className="city-country">{sourceResult.country} · source</span>
            </div>
          </div>
          <div className="city-time-row">
            <span className="city-time">{use24h ? sourceDt.toFormat('HH:mm') : sourceResult.timeStr}</span>
          </div>
          <div className="city-meta-row">
            <span className="city-date">{sourceResult.dayName}, {sourceResult.dateStr}</span>
          </div>
          <div className="city-footer">
            <span className="status-pill" style={{ color: STATUS_META[sourceResult.status].color }}>
              {STATUS_META[sourceResult.status].emoji} {STATUS_META[sourceResult.status].label}
            </span>
          </div>
        </div>

        {/* Target cards */}
        {results.map((result, idx) => (
          <CityCard
            key={result.cityName + result.timezone + idx}
            result={{
              ...result,
              timeStr: use24h ? result.dt.toFormat('HH:mm') : result.timeStr,
            }}
            sourceDt={sourceDt}
            onRemove={() => removeTarget(idx)}
          />
        ))}
      </div>

      {/* Add city */}
      <div className="add-city-row">
        <CitySearch onSelect={addTarget} placeholder="+ Add city, country, or timezone" />
      </div>

      {/* Actions */}
      <div className="actions-row">
        <button className="action-btn" onClick={copyText}>
          {copied ? '✓ Copied' : '⎘ Copy times'}
        </button>
        <button className="action-btn" onClick={copyShare}>
          🔗 Share link
        </button>
      </div>
    </div>
  );
}
