import { describe, it, expect } from 'vitest';
import { DateTime } from 'luxon';
import { convertTime, parseEpoch, shareUrl, getTimeStatus } from '../timeUtils';

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
