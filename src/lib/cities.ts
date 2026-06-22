export interface City {
  name: string;
  country: string;
  timezone: string;
  aliases: string[];
  region: string;
}

export const CITIES: City[] = [
  // USA
  { name: 'New York', country: 'USA', timezone: 'America/New_York', aliases: ['nyc', 'ny', 'est', 'edt', 'eastern', 'jfk', 'lga', 'new york city'], region: 'USA' },
  { name: 'Chicago', country: 'USA', timezone: 'America/Chicago', aliases: ['cst', 'cdt', 'central', 'ord'], region: 'USA' },
  { name: 'Denver', country: 'USA', timezone: 'America/Denver', aliases: ['mst', 'mdt', 'mountain', 'den'], region: 'USA' },
  { name: 'Los Angeles', country: 'USA', timezone: 'America/Los_Angeles', aliases: ['la', 'pst', 'pdt', 'pacific', 'lax', 'california', 'san francisco', 'seattle', 'portland'], region: 'USA' },
  { name: 'Phoenix', country: 'USA', timezone: 'America/Phoenix', aliases: ['phx', 'arizona', 'az'], region: 'USA' },
  { name: 'Anchorage', country: 'USA', timezone: 'America/Anchorage', aliases: ['alaska', 'akst', 'akdt', 'anc'], region: 'USA' },
  { name: 'Honolulu', country: 'USA', timezone: 'Pacific/Honolulu', aliases: ['hawaii', 'hst', 'hnl', 'hi'], region: 'USA' },
  // Americas
  { name: 'Toronto', country: 'Canada', timezone: 'America/Toronto', aliases: ['canada', 'yyz', 'ontario'], region: 'Americas' },
  { name: 'Vancouver', country: 'Canada', timezone: 'America/Vancouver', aliases: ['yvr', 'bc', 'british columbia'], region: 'Americas' },
  { name: 'Mexico City', country: 'Mexico', timezone: 'America/Mexico_City', aliases: ['mexico', 'mex', 'cdmx'], region: 'Americas' },
  { name: 'São Paulo', country: 'Brazil', timezone: 'America/Sao_Paulo', aliases: ['brazil', 'brasil', 'brt', 'gru', 'sao paulo'], region: 'Americas' },
  // Europe
  { name: 'London', country: 'UK', timezone: 'Europe/London', aliases: ['uk', 'england', 'britain', 'lhr', 'gmt', 'bst'], region: 'Europe' },
  { name: 'Paris', country: 'France', timezone: 'Europe/Paris', aliases: ['france', 'cet', 'cest', 'cdg'], region: 'Europe' },
  { name: 'Berlin', country: 'Germany', timezone: 'Europe/Berlin', aliases: ['germany', 'deutschland', 'fra'], region: 'Europe' },
  { name: 'Amsterdam', country: 'Netherlands', timezone: 'Europe/Amsterdam', aliases: ['netherlands', 'holland', 'ams'], region: 'Europe' },
  { name: 'Zurich', country: 'Switzerland', timezone: 'Europe/Zurich', aliases: ['switzerland', 'swiss', 'zrh'], region: 'Europe' },
  { name: 'Stockholm', country: 'Sweden', timezone: 'Europe/Stockholm', aliases: ['sweden', 'arn'], region: 'Europe' },
  { name: 'Moscow', country: 'Russia', timezone: 'Europe/Moscow', aliases: ['russia', 'msk', 'svo'], region: 'Europe' },
  { name: 'Istanbul', country: 'Turkey', timezone: 'Europe/Istanbul', aliases: ['turkey', 'istanbul', 'tur', 'try'], region: 'Europe' },
  { name: 'Athens', country: 'Greece', timezone: 'Europe/Athens', aliases: ['greece', 'eet', 'ath'], region: 'Europe' },
  { name: 'Lisbon', country: 'Portugal', timezone: 'Europe/Lisbon', aliases: ['portugal', 'wet', 'west', 'lis'], region: 'Europe' },
  // Middle East & Africa
  { name: 'Dubai', country: 'UAE', timezone: 'Asia/Dubai', aliases: ['uae', 'dxb', 'abu dhabi'], region: 'Middle East' },
  { name: 'Riyadh', country: 'Saudi Arabia', timezone: 'Asia/Riyadh', aliases: ['saudi arabia', 'ksa', 'ruh'], region: 'Middle East' },
  { name: 'Cairo', country: 'Egypt', timezone: 'Africa/Cairo', aliases: ['egypt', 'eet', 'cat', 'cai'], region: 'Africa' },
  { name: 'Nairobi', country: 'Kenya', timezone: 'Africa/Nairobi', aliases: ['kenya', 'eat', 'nbo'], region: 'Africa' },
  { name: 'Lagos', country: 'Nigeria', timezone: 'Africa/Lagos', aliases: ['nigeria', 'wat', 'los'], region: 'Africa' },
  { name: 'Johannesburg', country: 'South Africa', timezone: 'Africa/Johannesburg', aliases: ['south africa', 'sa', 'sast', 'jnb'], region: 'Africa' },
  // Asia
  { name: 'Mumbai', country: 'India', timezone: 'Asia/Kolkata', aliases: ['bombay', 'india', 'ist', 'in', 'bom', 'delhi', 'bangalore', 'chennai', 'kolkata', 'hyderabad', 'new delhi'], region: 'Asia' },
  { name: 'Karachi', country: 'Pakistan', timezone: 'Asia/Karachi', aliases: ['pakistan', 'pkt', 'khi'], region: 'Asia' },
  { name: 'Dhaka', country: 'Bangladesh', timezone: 'Asia/Dhaka', aliases: ['bangladesh', 'bst', 'dac'], region: 'Asia' },
  { name: 'Kathmandu', country: 'Nepal', timezone: 'Asia/Kathmandu', aliases: ['nepal', 'npt', 'ktm'], region: 'Asia' },
  { name: 'Colombo', country: 'Sri Lanka', timezone: 'Asia/Colombo', aliases: ['sri lanka', 'slst', 'cmb'], region: 'Asia' },
  { name: 'Bangkok', country: 'Thailand', timezone: 'Asia/Bangkok', aliases: ['thailand', 'ict', 'bkk'], region: 'Asia' },
  { name: 'Singapore', country: 'Singapore', timezone: 'Asia/Singapore', aliases: ['sg', 'sin', 'sgt'], region: 'Asia' },
  { name: 'Kuala Lumpur', country: 'Malaysia', timezone: 'Asia/Kuala_Lumpur', aliases: ['malaysia', 'myt', 'kul'], region: 'Asia' },
  { name: 'Jakarta', country: 'Indonesia', timezone: 'Asia/Jakarta', aliases: ['indonesia', 'wib', 'cgk'], region: 'Asia' },
  { name: 'Hong Kong', country: 'Hong Kong', timezone: 'Asia/Hong_Kong', aliases: ['hk', 'hkg', 'hkt'], region: 'Asia' },
  { name: 'Beijing', country: 'China', timezone: 'Asia/Shanghai', aliases: ['china', 'shanghai', 'pek', 'pvg'], region: 'Asia' },
  { name: 'Taipei', country: 'Taiwan', timezone: 'Asia/Taipei', aliases: ['taiwan', 'tpe'], region: 'Asia' },
  { name: 'Seoul', country: 'South Korea', timezone: 'Asia/Seoul', aliases: ['korea', 'kst', 'icn'], region: 'Asia' },
  { name: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo', aliases: ['japan', 'jst', 'nrt', 'hnd'], region: 'Asia' },
  { name: 'Manila', country: 'Philippines', timezone: 'Asia/Manila', aliases: ['philippines', 'pht', 'mnl'], region: 'Asia' },
  { name: 'Ho Chi Minh City', country: 'Vietnam', timezone: 'Asia/Ho_Chi_Minh', aliases: ['vietnam', 'ict', 'sgn', 'saigon', 'hcm'], region: 'Asia' },
  // Pacific
  { name: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney', aliases: ['australia', 'aest', 'aedt', 'syd'], region: 'Pacific' },
  { name: 'Melbourne', country: 'Australia', timezone: 'Australia/Melbourne', aliases: ['mel', 'melbourne'], region: 'Pacific' },
  { name: 'Perth', country: 'Australia', timezone: 'Australia/Perth', aliases: ['per', 'awst'], region: 'Pacific' },
  { name: 'Auckland', country: 'New Zealand', timezone: 'Pacific/Auckland', aliases: ['new zealand', 'nzst', 'nzdt', 'akl'], region: 'Pacific' },
  // Universal
  { name: 'UTC', country: 'Universal', timezone: 'UTC', aliases: ['utc', 'gmt', 'universal', 'zulu', 'z'], region: 'Universal' },
];

// The "world clock" default — all US zones + major world hubs
export const WORLD_CLOCK_DEFAULTS = [
  'New York', 'Chicago', 'Denver', 'Los Angeles', 'Anchorage', 'Honolulu',
  'London', 'Paris', 'Berlin', 'Moscow',
  'Dubai', 'Mumbai', 'Singapore', 'Tokyo', 'Sydney',
  'São Paulo', 'Toronto',
];

export function searchCities(query: string): City[] {
  const q = query.toLowerCase().trim();
  if (!q) return CITIES.slice(0, 8);

  const scored = CITIES.map(city => {
    const nameLower = city.name.toLowerCase();
    const countryLower = city.country.toLowerCase();
    let score = 0;

    if (nameLower === q) score = 100;
    else if (nameLower.startsWith(q)) score = 80;
    else if (nameLower.includes(q)) score = 60;
    else if (countryLower === q) score = 70;
    else if (countryLower.startsWith(q)) score = 50;
    else if (countryLower.includes(q)) score = 30;
    else if (city.aliases.some(a => a === q)) score = 75;
    else if (city.aliases.some(a => a.startsWith(q))) score = 45;
    else if (city.aliases.some(a => a.includes(q))) score = 20;

    return { city, score };
  }).filter(x => x.score > 0);

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 8).map(x => x.city);
}

export function findCity(name: string): City | undefined {
  const q = name.toLowerCase().trim();
  return CITIES.find(c =>
    c.name.toLowerCase() === q ||
    c.aliases.includes(q) ||
    c.country.toLowerCase() === q
  );
}

export const QUICK_PRESETS = [
  { label: 'India ↔ USA', cities: ['Mumbai', 'New York', 'Chicago', 'Los Angeles'] },
  { label: 'India ↔ UK', cities: ['Mumbai', 'London'] },
  { label: 'India ↔ Australia', cities: ['Mumbai', 'Sydney', 'Melbourne'] },
  { label: 'Asia Pacific', cities: ['Tokyo', 'Singapore', 'Sydney', 'Hong Kong', 'Seoul'] },
  { label: 'Europe', cities: ['London', 'Paris', 'Berlin', 'Amsterdam', 'Moscow'] },
  { label: 'All USA', cities: ['New York', 'Chicago', 'Denver', 'Los Angeles', 'Phoenix', 'Anchorage', 'Honolulu'] },
];
