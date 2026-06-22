import { DateTime } from 'luxon';
import { findCity, type City } from './cities';

export interface ParsedQuery {
  time: DateTime | null;
  sourceCity: City | null;
  targetCities: City[];
  raw: string;
}

const TIME_PATTERNS = [
  /(\d{1,2}):(\d{2})\s*(am|pm)/i,
  /(\d{1,2})\s*(am|pm)/i,
  /(\d{1,2}):(\d{2})/,
  /(\d{2})(\d{2})\s*(?:hrs?|h)/i,
];

const CONNECTORS = ['to', 'in', 'for', 'at', 'and', '→', '->', 'vs'];
const DATE_KEYWORDS: Record<string, number> = {
  today: 0,
  tomorrow: 1,
  yesterday: -1,
};

function extractTimeFromStr(str: string): { hour: number; minute: number } | null {
  for (const pat of TIME_PATTERNS) {
    const m = str.match(pat);
    if (!m) continue;

    let hour = parseInt(m[1]);
    const minute = m[2] ? parseInt(m[2]) : 0;
    const meridiem = (m[3] || m[2] || '').toLowerCase();

    if (meridiem === 'pm' && hour !== 12) hour += 12;
    if (meridiem === 'am' && hour === 12) hour = 0;

    if (hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59) {
      return { hour, minute };
    }
  }
  return null;
}

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[,]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

export function parseQuery(input: string): ParsedQuery {
  const raw = input.trim();
  const lower = raw.toLowerCase();
  const tokens = tokenize(raw);

  let timeResult = extractTimeFromStr(raw);
  let dateOffset = 0;

  for (const [kw, offset] of Object.entries(DATE_KEYWORDS)) {
    if (lower.includes(kw)) {
      dateOffset = offset;
      break;
    }
  }

  // Try to extract source and target cities
  // Strategy: scan token windows of 1-3 words, match against city database
  const citiesFound: City[] = [];
  const usedTokens = new Set<number>();

  for (let i = 0; i < tokens.length; i++) {
    if (usedTokens.has(i)) continue;
    if (CONNECTORS.includes(tokens[i])) continue;

    // Try 3-word, 2-word, 1-word windows
    for (let len = 3; len >= 1; len--) {
      if (i + len > tokens.length) continue;
      const phrase = tokens.slice(i, i + len).join(' ');
      const city = findCity(phrase);
      if (city) {
        citiesFound.push(city);
        for (let j = i; j < i + len; j++) usedTokens.add(j);
        break;
      }
    }
  }

  // Determine source (first city found) and targets (rest)
  let sourceCity: City | null = null;
  let targetCities: City[] = [];

  if (citiesFound.length >= 1) {
    sourceCity = citiesFound[0];
    targetCities = citiesFound.slice(1);
  }

  // Build DateTime
  let time: DateTime | null = null;
  if (timeResult) {
    const base = sourceCity
      ? DateTime.now().setZone(sourceCity.timezone)
      : DateTime.now();
    time = base
      .plus({ days: dateOffset })
      .set({ hour: timeResult.hour, minute: timeResult.minute, second: 0, millisecond: 0 });
  }

  return { time, sourceCity, targetCities, raw };
}

export function formatParseResult(parsed: ParsedQuery): string {
  const parts: string[] = [];
  if (parsed.time) parts.push(parsed.time.toFormat('h:mm a'));
  if (parsed.sourceCity) parts.push(`in ${parsed.sourceCity.name}`);
  if (parsed.targetCities.length > 0)
    parts.push(`→ ${parsed.targetCities.map(c => c.name).join(', ')}`);
  return parts.join(' ') || '';
}
