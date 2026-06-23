import { describe, it, expect } from 'vitest';
import { parseQuery } from '../nlp';

describe('parseQuery', () => {
  it('extracts city and time from "4pm Mumbai to London"', () => {
    const result = parseQuery('4pm Mumbai to London');
    expect(result.sourceCity?.name).toBe('Mumbai');
    expect(result.targetCities[0]?.name).toBe('London');
    expect(result.time?.hour).toBe(16);
    expect(result.time?.minute).toBe(0);
  });

  it('handles 12-hour format with minutes "9:30am NY"', () => {
    const result = parseQuery('9:30am NY');
    expect(result.sourceCity?.name).toBe('New York');
    expect(result.time?.hour).toBe(9);
    expect(result.time?.minute).toBe(30);
  });

  it('returns null sourceCity and time for empty input', () => {
    const result = parseQuery('');
    expect(result.sourceCity).toBeNull();
    expect(result.time).toBeNull();
    expect(result.targetCities).toHaveLength(0);
  });

  it('handles multi-city "London to Dubai to Singapore"', () => {
    const result = parseQuery('London to Dubai to Singapore');
    expect(result.sourceCity?.name).toBe('London');
    expect(result.targetCities.map(c => c.name)).toContain('Dubai');
    expect(result.targetCities.map(c => c.name)).toContain('Singapore');
  });

  it('handles "tomorrow 9am NY" — day is tomorrow', () => {
    const result = parseQuery('tomorrow 9am NY');
    expect(result.time?.hour).toBe(9);
    expect(result.sourceCity?.name).toBe('New York');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    expect(result.time?.day).toBe(tomorrow.getDate());
  });
});
