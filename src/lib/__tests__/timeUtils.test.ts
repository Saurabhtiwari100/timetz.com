import { describe, it, expect } from 'vitest';
import { DateTime } from 'luxon';
import { convertTime, parseEpoch, parseSharedDateTime, shareUrl, getTimeStatus } from '../timeUtils';
import { CITIES } from '../cities';

describe('getTimeStatus', () => {
  it('returns working for 9am', () => {
    const dt = DateTime.fromObject({ hour: 9 }, { zone: 'UTC' });
    expect(getTimeStatus(dt)).toBe('working');
  });
  it('returns working for 17:59', () => {
    const dt = DateTime.fromObject({ hour: 17, minute: 59 }, { zone: 'UTC' });
    expect(getTimeStatus(dt)).toBe('working');
  });
  it('returns early-morning for 7am', () => {
    const dt = DateTime.fromObject({ hour: 7 }, { zone: 'UTC' });
    expect(getTimeStatus(dt)).toBe('early-morning');
  });
  it('returns evening for 8pm', () => {
    const dt = DateTime.fromObject({ hour: 20 }, { zone: 'UTC' });
    expect(getTimeStatus(dt)).toBe('evening');
  });
  it('returns sleeping for midnight', () => {
    const dt = DateTime.fromObject({ hour: 0 }, { zone: 'UTC' });
    expect(getTimeStatus(dt)).toBe('sleeping');
  });
});

describe('convertTime', () => {
  it('same timezone has zero offset', () => {
    const dt = DateTime.fromObject({ year: 2024, month: 6, day: 1, hour: 12 }, { zone: 'America/New_York' });
    const result = convertTime('America/New_York', 'America/New_York', 'New York', 'USA', dt);
    expect(result.offsetMinutes).toBe(0);
    expect(result.dayDiff).toBe(0);
  });

  it('New York to London: London is 5h ahead in January (EST vs GMT)', () => {
    const dt = DateTime.fromObject({ year: 2024, month: 1, day: 15, hour: 10 }, { zone: 'America/New_York' });
    const result = convertTime('America/New_York', 'Europe/London', 'London', 'UK', dt);
    expect(result.offsetMinutes).toBe(5 * 60);
    expect(result.dt.hour).toBe(15);
  });

  it('Mumbai to New York: NY is 10.5h behind in January', () => {
    const dt = DateTime.fromObject({ year: 2024, month: 1, day: 15, hour: 12 }, { zone: 'Asia/Kolkata' });
    const result = convertTime('Asia/Kolkata', 'America/New_York', 'New York', 'USA', dt);
    expect(result.offsetMinutes).toBe(-(10 * 60 + 30));
  });

  it('reports +1 dayDiff when conversion crosses midnight forward', () => {
    const dt = DateTime.fromObject({ year: 2024, month: 1, day: 15, hour: 22 }, { zone: 'America/New_York' });
    const result = convertTime('America/New_York', 'Europe/London', 'London', 'UK', dt);
    expect(result.dayDiff).toBe(1);
  });

  it('does not report a dayDiff when local calendar dates match', () => {
    const dt = DateTime.fromObject(
      { year: 2026, month: 7, day: 26, hour: 3, minute: 30 },
      { zone: 'America/New_York' }
    );
    const result = convertTime('America/New_York', 'Asia/Tokyo', 'Tokyo', 'Japan', dt);
    expect(result.time24).toBe('16:30');
    expect(result.dayDiff).toBe(0);
  });

  it('UTC to Dublin uses summer DST correctly', () => {
    const dt = DateTime.fromISO('2026-07-26T04:00:00.000Z', { zone: 'UTC' });
    const result = convertTime('UTC', 'Europe/Dublin', 'Dublin', 'Ireland', dt);
    expect(result.time24).toBe('05:00');
    expect(result.offsetMinutes).toBe(60);
  });

  it('Dublin to UTC reverses the same instant correctly', () => {
    const dt = DateTime.fromObject(
      { year: 2026, month: 7, day: 26, hour: 5, minute: 0 },
      { zone: 'Europe/Dublin' }
    );
    const result = convertTime('Europe/Dublin', 'UTC', 'UTC', 'Universal', dt);
    expect(result.time24).toBe('04:00');
    expect(result.offsetMinutes).toBe(-60);
  });

  it('all configured city timezones are valid and convertible', () => {
    const dt = DateTime.fromISO('2026-07-26T04:00:00.000Z', { zone: 'UTC' });

    for (const city of CITIES) {
      const zoneProbe = DateTime.now().setZone(city.timezone);
      expect(zoneProbe.isValid, `${city.name} uses invalid timezone ${city.timezone}`).toBe(true);

      const result = convertTime('UTC', city.timezone, city.name, city.country, dt);
      expect(result.dt.isValid, `${city.name} conversion failed`).toBe(true);
      expect(result.time24, `${city.name} did not produce HH:mm time`).toMatch(/^\d{2}:\d{2}$/);
    }
  });
});

describe('parseEpoch', () => {
  it('parses Unix seconds', () => {
    const dt = parseEpoch('1700000000');
    expect(dt).not.toBeNull();
    expect(dt!.toMillis()).toBe(1700000000 * 1000);
  });

  it('parses milliseconds when > 1e12', () => {
    const dt = parseEpoch('1700000000000');
    expect(dt).not.toBeNull();
    expect(dt!.toMillis()).toBe(1700000000000);
  });

  it('returns null for non-numeric input', () => {
    expect(parseEpoch('not-a-number')).toBeNull();
    // Note: Number('') === 0, so empty string resolves to epoch 0 (1970-01-01T00:00:00Z)
    expect(parseEpoch('')).not.toBeNull();
  });
});

describe('parseSharedDateTime', () => {
  it('preserves explicit UTC instants in the source timezone', () => {
    const dt = parseSharedDateTime('2026-07-26T04:00:00.000Z', 'Asia/Kolkata');

    expect(dt?.zoneName).toBe('Asia/Kolkata');
    expect(dt?.toFormat('HH:mm')).toBe('09:30');
  });

  it('interprets offset-less ISO input as source-zone wall time', () => {
    const dt = parseSharedDateTime('2026-07-26T04:00:00.000', 'UTC');

    expect(dt?.zoneName).toBe('UTC');
    expect(dt?.toISO()).toBe('2026-07-26T04:00:00.000Z');
  });
});

describe('shareUrl', () => {
  it('contains cities and time params', () => {
    Object.defineProperty(window, 'location', {
      value: { origin: 'https://timetz.com' },
      writable: true,
    });
    const url = shareUrl(['New York', 'London'], '2024-01-15T10:00:00.000-05:00');
    expect(url).toContain('cities=');
    expect(url).toContain('New+York');
    expect(url).toContain('t=');
    expect(url.startsWith('https://timetz.com')).toBe(true);
  });
});
