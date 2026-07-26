import { CITIES, WORLD_CLOCK_DEFAULTS, findCity, type City } from './cities';

export function resolveCities(value?: string | null): City[] {
  if (!value) return [];
  return value
    .split(',')
    .map(name => findCity(name))
    .filter(Boolean) as City[];
}

export function getInitialSelection(defaultCities?: string): { source: City; targets: City[] } {
  const explicitCities = resolveCities(defaultCities);
  if (explicitCities.length > 0) {
    return { source: explicitCities[0], targets: explicitCities.slice(1) };
  }

  const defaultSource = CITIES.find(c => c.name === 'New York')!;
  return {
    source: defaultSource,
    targets: WORLD_CLOCK_DEFAULTS
      .filter(n => n !== defaultSource.name)
      .map(n => CITIES.find(c => c.name === n)!)
      .filter(Boolean),
  };
}
