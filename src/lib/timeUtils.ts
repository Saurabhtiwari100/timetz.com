import { DateTime } from 'luxon';

export interface ConvertedTime {
  cityName: string;
  country: string;
  timezone: string;
  dt: DateTime;
  timeStr: string;
  dateStr: string;
  dayName: string;
  offsetStr: string;
  offsetMinutes: number;
  status: TimeStatus;
  isNextDay: boolean;
  isPrevDay: boolean;
  dayDiff: number;
}

export type TimeStatus =
  | 'working'
  | 'early-morning'
  | 'evening'
  | 'sleeping';

export function getTimeStatus(dt: DateTime): TimeStatus {
  const hour = dt.hour;
  if (hour >= 9 && hour < 18) return 'working';
  if (hour >= 6 && hour < 9) return 'early-morning';
  if (hour >= 18 && hour < 23) return 'evening';
  return 'sleeping';
}

export const STATUS_META: Record<TimeStatus, { emoji: string; label: string; color: string }> = {
  working: { emoji: '🟢', label: 'Working hours', color: '#22c55e' },
  'early-morning': { emoji: '🌅', label: 'Early morning', color: '#f59e0b' },
  evening: { emoji: '🌆', label: 'Evening', color: '#8b5cf6' },
  sleeping: { emoji: '🌙', label: 'Sleeping', color: '#64748b' },
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

  const offsetMins = converted.offset;
  const sourceOffsetMins = sourceDt.offset;
  const diffMins = offsetMins - sourceOffsetMins;
  const absDiff = Math.abs(diffMins);
  const hours = Math.floor(absDiff / 60);
  const mins = absDiff % 60;
  const sign = diffMins >= 0 ? '+' : '-';
  const offsetStr = diffMins === 0
    ? 'same time'
    : `${sign}${hours}h${mins > 0 ? ` ${mins}m` : ''}`;

  return {
    cityName: targetCityName,
    country: targetCountry,
    timezone: targetTimezone,
    dt: converted,
    timeStr: converted.toFormat('h:mm a'),
    dateStr: converted.toFormat('MMM d, yyyy'),
    dayName: converted.toFormat('cccc'),
    offsetStr,
    offsetMinutes: diffMins,
    status: getTimeStatus(converted),
    isNextDay: dayDiff > 0,
    isPrevDay: dayDiff < 0,
    dayDiff,
  };
}

export function formatTime24(dt: DateTime): string {
  return dt.toFormat('HH:mm');
}

export function nowInZone(timezone: string): DateTime {
  return DateTime.now().setZone(timezone);
}

export function shareUrl(cities: string[], isoTime: string): string {
  const params = new URLSearchParams();
  params.set('cities', cities.join(','));
  params.set('t', isoTime);
  return `${window.location.origin}/?${params.toString()}`;
}
