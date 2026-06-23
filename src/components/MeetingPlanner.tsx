import { useState } from 'react';
import { DateTime } from 'luxon';
import { STATUS_META, type TimeStatus } from '../lib/timeUtils';
import type { City } from '../lib/cities';

interface Props {
  sourceCity: City;
  targetCities: City[];
}

function pad2(n: number) { return String(n).padStart(2, '0'); }

function localDateToday(): string {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function buildIcs(overlapHour: number, date: string, cities: City[]): string {
  const [y, mo, d] = date.split('-').map(Number);
  const dtUTC = DateTime.utc(y, mo, d, overlapHour);
  const dtEnd = dtUTC.plus({ hours: 1 });
  const fmt = (dt: DateTime) => dt.toFormat("yyyyMMdd'T'HHmmss'Z'");
  const now = DateTime.utc();
  const cityList = cities.map(c => c.name).join(', ');
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//timetz//timetz//EN',
    'BEGIN:VEVENT',
    `UID:${fmt(now)}-timetz@timetz.com`,
    `DTSTAMP:${fmt(now)}`,
    `DTSTART:${fmt(dtUTC)}`,
    `DTEND:${fmt(dtEnd)}`,
    `SUMMARY:Meeting (${cityList})`,
    `DESCRIPTION:Scheduled via timetz.com for ${cityList}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

interface WorkHours { start: number; end: number; }

export default function MeetingPlanner({ sourceCity, targetCities }: Props) {
  const [date, setDate] = useState(localDateToday);
  const [defaultStart, setDefaultStart] = useState(9);
  const [defaultEnd, setDefaultEnd] = useState(17);
  const [cityOverrides, setCityOverrides] = useState<Record<string, WorkHours>>({});
  const [expandedCity, setExpandedCity] = useState<string | null>(null);
  const [copyDone, setCopyDone] = useState(false);

  const allCities = [sourceCity, ...targetCities];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  function getWorkHours(city: City): WorkHours {
    return cityOverrides[city.timezone + city.name] ?? { start: defaultStart, end: defaultEnd };
  }

  function setOverride(city: City, hours: Partial<WorkHours>) {
    const key = city.timezone + city.name;
    setCityOverrides(prev => ({ ...prev, [key]: { ...getWorkHours(city), ...hours } }));
  }

  function isWorking(city: City, sourceHour: number): boolean {
    const [y, mo, d] = date.split('-').map(Number);
    const sourceMoment = DateTime.fromObject({ year: y, month: mo, day: d, hour: sourceHour }, { zone: sourceCity.timezone });
    const cityMoment = sourceMoment.setZone(city.timezone);
    const localHour = cityMoment.hour;
    const wh = getWorkHours(city);
    return localHour >= wh.start && localHour < wh.end;
  }

  function cellStatus(city: City, sourceHour: number): TimeStatus {
    const [y, mo, d] = date.split('-').map(Number);
    const sourceMoment = DateTime.fromObject({ year: y, month: mo, day: d, hour: sourceHour }, { zone: sourceCity.timezone });
    const cityMoment = sourceMoment.setZone(city.timezone);
    const localH = cityMoment.hour;
    const wh = getWorkHours(city);
    if (localH >= wh.start && localH < wh.end) return 'working';
    if (localH >= 6 && localH < wh.start) return 'early-morning';
    if (localH >= wh.end && localH < 23) return 'evening';
    return 'sleeping';
  }

  const overlapHours = hours.filter(h => allCities.every(c => isWorking(c, h)));

  const copySummary = () => {
    const [y, mo, d] = date.split('-').map(Number);
    const dateStr = DateTime.fromObject({ year: y, month: mo, day: d }).toFormat('EEE, MMM d yyyy');
    const lines = [
      `Meeting time options for ${dateStr}`,
      '',
      ...allCities.map(city => {
        if (!overlapHours.length) return `${city.name}: no overlap`;
        const sourceMoment = DateTime.fromObject({ year: y, month: mo, day: d, hour: overlapHours[0] }, { zone: sourceCity.timezone });
        const cityMoment = sourceMoment.setZone(city.timezone);
        return `${city.name}: ${cityMoment.toFormat('h:mm a')} (${city.timezone.replace('_', ' ')})`;
      }),
      '',
      overlapHours.length
        ? `Best overlap: ${overlapHours[0]}:00–${overlapHours[overlapHours.length - 1] + 1}:00 ${sourceCity.timezone.split('/').pop()?.replace('_', ' ')} time`
        : 'No common working-hours overlap found.',
    ];
    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      setCopyDone(true);
      setTimeout(() => setCopyDone(false), 2000);
    });
  };

  const downloadIcs = () => {
    const [y, mo, d] = date.split('-').map(Number);
    const hour = overlapHours.length
      ? DateTime.fromObject({ year: y, month: mo, day: d, hour: overlapHours[0] }, { zone: sourceCity.timezone }).toUTC().hour
      : DateTime.fromObject({ year: y, month: mo, day: d, hour: 10 }, { zone: sourceCity.timezone }).toUTC().hour;
    const ics = buildIcs(hour, date, allCities);
    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'meeting.ics'; a.click();
    URL.revokeObjectURL(url);
  };

  const STATUS_CELL: Record<TimeStatus, string> = {
    working: '#22c55e',
    'early-morning': '#f97316',
    evening: '#a78bfa',
    sleeping: '#334155',
  };

  return (
    <div className="mp-wrap">
      <div className="mp-controls">
        <label className="mp-label">
          Date
          <input type="date" className="mp-input" value={date} onChange={e => setDate(e.target.value)} />
        </label>
        <label className="mp-label">
          Default work window
          <span className="mp-time-range">
            <input type="number" className="mp-num" min={0} max={23} value={defaultStart}
              onChange={e => setDefaultStart(Number(e.target.value))} />
            <span>–</span>
            <input type="number" className="mp-num" min={1} max={24} value={defaultEnd}
              onChange={e => setDefaultEnd(Number(e.target.value))} />
          </span>
        </label>
      </div>

      <div className="mp-city-overrides">
        {allCities.map(city => {
          const key = city.timezone + city.name;
          const wh = getWorkHours(city);
          const hasOverride = !!cityOverrides[key];
          const isOpen = expandedCity === key;
          return (
            <div key={key} className="mp-city-override">
              <button
                className={`mp-city-override-toggle${hasOverride ? ' mp-city-override-toggle--active' : ''}`}
                onClick={() => setExpandedCity(isOpen ? null : key)}
                title={`Custom hours for ${city.name}`}
              >
                {city.name}
                {hasOverride && <span className="mp-override-badge">{wh.start}–{wh.end}</span>}
                <span className="mp-override-chevron">{isOpen ? '▲' : '▼'}</span>
              </button>
              {isOpen && (
                <span className="mp-time-range mp-city-range">
                  <input type="number" className="mp-num" min={0} max={23} value={wh.start}
                    onChange={e => setOverride(city, { start: Number(e.target.value) })} />
                  <span>–</span>
                  <input type="number" className="mp-num" min={1} max={24} value={wh.end}
                    onChange={e => setOverride(city, { end: Number(e.target.value) })} />
                  {hasOverride && (
                    <button className="mp-override-reset" onClick={() => {
                      setCityOverrides(prev => { const n = { ...prev }; delete n[key]; return n; });
                    }}>reset</button>
                  )}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {overlapHours.length > 0 ? (
        <p className="mp-overlap-msg">
          Overlap: {overlapHours.length}h window starting {overlapHours[0]}:00 {sourceCity.timezone.split('/').pop()?.replace('_', ' ')} time
        </p>
      ) : (
        <p className="mp-no-overlap">No common working-hours overlap on this date.</p>
      )}

      <div className="mp-grid-wrap">
        <table className="mp-grid" aria-label="Meeting planner overlap grid">
          <thead>
            <tr>
              <th className="mp-city-th" scope="col">City</th>
              {hours.map(h => (
                <th key={h} className={`mp-hour-th${overlapHours.includes(h) ? ' mp-overlap-col' : ''}`} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allCities.map(city => (
              <tr key={city.name + city.timezone}>
                <td className="mp-city-td">{city.name}</td>
                {hours.map(h => {
                  const status = cellStatus(city, h);
                  const isOverlap = overlapHours.includes(h);
                  const [y, mo, d] = date.split('-').map(Number);
                  const cityMoment = DateTime.fromObject({ year: y, month: mo, day: d, hour: h }, { zone: sourceCity.timezone }).setZone(city.timezone);
                  return (
                    <td
                      key={h}
                      className={`mp-cell${isOverlap ? ' mp-cell-overlap' : ''}`}
                      style={{ background: STATUS_CELL[status] + (isOverlap ? 'ff' : '55') }}
                      title={`${city.name} ${cityMoment.toFormat('HH:mm')} — ${STATUS_META[status].label}`}
                    >
                      {STATUS_META[status].emoji}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mp-actions">
        <button className="tc-pill-btn tc-pill-btn-icon" onClick={copySummary}>
          {copyDone ? '✓ Copied' : '📋 Copy summary'}
        </button>
        <button className="tc-pill-btn tc-pill-btn-icon" onClick={downloadIcs} disabled={!overlapHours.length}>
          📅 Download .ics
        </button>
      </div>
    </div>
  );
}
