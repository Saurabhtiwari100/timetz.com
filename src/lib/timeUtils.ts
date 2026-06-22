import { DateTime } from 'luxon';

export interface ConvertedTime {
  cityName: string;
  country: string;
  timezone: string;
  dt: DateTime;
  timeStr: string;
  time24: string;
  dateStr: string;
  dayName: string;
  dayShort: string;
  offsetStr: string;
  offsetMinutes: number;
  status: TimeStatus;
  dayDiff: number;
}

export type TimeStatus = 'working' | 'early-morning' | 'evening' | 'sleeping';

export function getTimeStatus(dt: DateTime): TimeStatus {
  const h = dt.hour;
  if (h >= 9 && h < 18) return 'working';
  if (h >= 6 && h < 9) return 'early-morning';
  if (h >= 18 && h < 23) return 'evening';
  return 'sleeping';
}

export const STATUS_META: Record<TimeStatus, { emoji: string; label: string; color: string; bg: string }> = {
  working:        { emoji: '🟢', label: 'Working',       color: '#4ade80', bg: 'rgba(74,222,128,0.10)' },
  'early-morning':{ emoji: '🌅', label: 'Early morning', color: '#fb923c', bg: 'rgba(251,146,60,0.10)' },
  evening:        { emoji: '🌆', label: 'Evening',       color: '#a78bfa', bg: 'rgba(167,139,250,0.10)' },
  sleeping:       { emoji: '🌙', label: 'Sleeping',      color: '#64748b', bg: 'rgba(100,116,139,0.10)' },
};

export function convertTime(
  sourceTimezone: string,
  targetTimezone: string,
  targetCityName: string,
  targetCountry: string,
  sourceDt: DateTime
): ConvertedTime {
  const converted = sourceDt.setZone(targetTimezone);
  const sourceDay = sourceDt.startOf('day');
  const convertedDay = converted.startOf('day');
  const dayDiff = Math.round(convertedDay.diff(sourceDay, 'days').days);

  const diffMins = converted.offset - sourceDt.offset;
  const absDiff = Math.abs(diffMins);
  const hours = Math.floor(absDiff / 60);
  const mins = absDiff % 60;
  const sign = diffMins >= 0 ? '+' : '-';
  const offsetStr = diffMins === 0 ? '±0h' : `${sign}${hours}h${mins > 0 ? `${mins}m` : ''}`;

  return {
    cityName: targetCityName,
    country: targetCountry,
    timezone: targetTimezone,
    dt: converted,
    timeStr: converted.toFormat('h:mm a'),
    time24: converted.toFormat('HH:mm'),
    dateStr: converted.toFormat('MMM d'),
    dayName: converted.toFormat('cccc'),
    dayShort: converted.toFormat('EEE'),
    offsetStr,
    offsetMinutes: diffMins,
    status: getTimeStatus(converted),
    dayDiff,
  };
}

export function parseEpoch(input: string): DateTime | null {
  const n = Number(input.trim());
  if (isNaN(n)) return null;
  // Handle seconds or milliseconds
  const ms = n > 1e12 ? n : n * 1000;
  const dt = DateTime.fromMillis(ms, { zone: 'UTC' });
  return dt.isValid ? dt : null;
}

export function shareUrl(cities: string[], isoTime: string): string {
  const params = new URLSearchParams();
  params.set('cities', cities.join(','));
  params.set('t', isoTime);
  return `${window.location.origin}/?${params.toString()}`;
}
