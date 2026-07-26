import { describe, expect, it } from 'vitest';
import { getInitialSelection, resolveCities } from '../citySelection';

describe('city selection defaults', () => {
  it('uses provided city names as source and targets', () => {
    const selection = getInitialSelection('UTC,Dublin');

    expect(selection.source.name).toBe('UTC');
    expect(selection.targets.map(city => city.name)).toEqual(['Dublin']);
  });

  it('resolves IST shorthand to Mumbai in defaults', () => {
    const selection = getInitialSelection('UTC,IST');

    expect(selection.source.name).toBe('UTC');
    expect(selection.targets.map(city => city.name)).toEqual(['Mumbai']);
  });

  it('falls back to the world clock defaults without explicit cities', () => {
    const selection = getInitialSelection();

    expect(selection.source.name).toBe('New York');
    expect(selection.targets.length).toBeGreaterThan(0);
    expect(selection.targets.some(city => city.name === 'Chicago')).toBe(true);
  });

  it('filters unknown city names', () => {
    expect(resolveCities('UTC,No Such City,Mumbai').map(city => city.name)).toEqual(['UTC', 'Mumbai']);
  });
});
