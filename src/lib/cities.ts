export interface City {
  name: string;
  country: string;
  timezone: string;
  aliases: string[];
}

export const CITIES: City[] = [
  { name: 'Mumbai', country: 'India', timezone: 'Asia/Kolkata', aliases: ['bombay', 'india', 'ist', 'in', 'bom', 'delhi', 'bangalore', 'chennai', 'kolkata', 'hyderabad'] },
  { name: 'London', country: 'UK', timezone: 'Europe/London', aliases: ['uk', 'england', 'britain', 'lhr', 'gmt', 'bst'] },
  { name: 'New York', country: 'USA', timezone: 'America/New_York', aliases: ['nyc', 'ny', 'est', 'edt', 'eastern', 'jfk', 'lga'] },
  { name: 'Los Angeles', country: 'USA', timezone: 'America/Los_Angeles', aliases: ['la', 'pst', 'pdt', 'pacific', 'lax', 'california'] },
  { name: 'Chicago', country: 'USA', timezone: 'America/Chicago', aliases: ['cst', 'cdt', 'central', 'ord'] },
  { name: 'Dubai', country: 'UAE', timezone: 'Asia/Dubai', aliases: ['uae', 'dxb', 'abu dhabi'] },
  { name: 'Singapore', country: 'Singapore', timezone: 'Asia/Singapore', aliases: ['sg', 'sin', 'sgt'] },
  { name: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo', aliases: ['japan', 'jst', 'nrt', 'hnd'] },
  { name: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney', aliases: ['australia', 'aest', 'aedt', 'syd'] },
  { name: 'Paris', country: 'France', timezone: 'Europe/Paris', aliases: ['france', 'cet', 'cest', 'cdg'] },
  { name: 'Berlin', country: 'Germany', timezone: 'Europe/Berlin', aliases: ['germany', 'deutschland'] },
  { name: 'Toronto', country: 'Canada', timezone: 'America/Toronto', aliases: ['canada', 'yyz'] },
  { name: 'Hong Kong', country: 'Hong Kong', timezone: 'Asia/Hong_Kong', aliases: ['hk', 'hkg', 'hkt'] },
  { name: 'Seoul', country: 'South Korea', timezone: 'Asia/Seoul', aliases: ['korea', 'kst', 'icn'] },
  { name: 'Beijing', country: 'China', timezone: 'Asia/Shanghai', aliases: ['china', 'shanghai', 'cst', 'pek'] },
  { name: 'Moscow', country: 'Russia', timezone: 'Europe/Moscow', aliases: ['russia', 'msk', 'svo'] },
  { name: 'São Paulo', country: 'Brazil', timezone: 'America/Sao_Paulo', aliases: ['brazil', 'brasil', 'brt', 'gru'] },
  { name: 'Mexico City', country: 'Mexico', timezone: 'America/Mexico_City', aliases: ['mexico', 'mex', 'mst'] },
  { name: 'Cairo', country: 'Egypt', timezone: 'Africa/Cairo', aliases: ['egypt', 'eet', 'cat'] },
  { name: 'Nairobi', country: 'Kenya', timezone: 'Africa/Nairobi', aliases: ['kenya', 'eat'] },
  { name: 'Johannesburg', country: 'South Africa', timezone: 'Africa/Johannesburg', aliases: ['south africa', 'sa', 'sast', 'jnb'] },
  { name: 'Amsterdam', country: 'Netherlands', timezone: 'Europe/Amsterdam', aliases: ['netherlands', 'holland', 'ams'] },
  { name: 'Stockholm', country: 'Sweden', timezone: 'Europe/Stockholm', aliases: ['sweden', 'arn'] },
  { name: 'Zurich', country: 'Switzerland', timezone: 'Europe/Zurich', aliases: ['switzerland', 'swiss', 'zrh'] },
  { name: 'Karachi', country: 'Pakistan', timezone: 'Asia/Karachi', aliases: ['pakistan', 'pkt'] },
  { name: 'Dhaka', country: 'Bangladesh', timezone: 'Asia/Dhaka', aliases: ['bangladesh', 'bst'] },
  { name: 'Colombo', country: 'Sri Lanka', timezone: 'Asia/Colombo', aliases: ['sri lanka', 'slst'] },
  { name: 'Kathmandu', country: 'Nepal', timezone: 'Asia/Kathmandu', aliases: ['nepal', 'npt'] },
  { name: 'Bangkok', country: 'Thailand', timezone: 'Asia/Bangkok', aliases: ['thailand', 'ict', 'bkk'] },
  { name: 'Jakarta', country: 'Indonesia', timezone: 'Asia/Jakarta', aliases: ['indonesia', 'wib'] },
  { name: 'Riyadh', country: 'Saudi Arabia', timezone: 'Asia/Riyadh', aliases: ['saudi arabia', 'ksa', 'ast'] },
  { name: 'Istanbul', country: 'Turkey', timezone: 'Europe/Istanbul', aliases: ['turkey', 'try', 'ist', 'tur'] },
  { name: 'Athens', country: 'Greece', timezone: 'Europe/Athens', aliases: ['greece', 'eet'] },
  { name: 'Lisbon', country: 'Portugal', timezone: 'Europe/Lisbon', aliases: ['portugal', 'wet', 'west'] },
  { name: 'Denver', country: 'USA', timezone: 'America/Denver', aliases: ['mst', 'mdt', 'mountain', 'den'] },
  { name: 'Phoenix', country: 'USA', timezone: 'America/Phoenix', aliases: ['phx', 'arizona'] },
  { name: 'Honolulu', country: 'USA', timezone: 'Pacific/Honolulu', aliases: ['hawaii', 'hst', 'hnl'] },
  { name: 'Anchorage', country: 'USA', timezone: 'America/Anchorage', aliases: ['alaska', 'akst', 'akdt'] },
  { name: 'Vancouver', country: 'Canada', timezone: 'America/Vancouver', aliases: ['yvr', 'bc'] },
  { name: 'Auckland', country: 'New Zealand', timezone: 'Pacific/Auckland', aliases: ['new zealand', 'nzst', 'nzdt', 'akl'] },
  { name: 'Kuala Lumpur', country: 'Malaysia', timezone: 'Asia/Kuala_Lumpur', aliases: ['malaysia', 'myt', 'kul'] },
  { name: 'Manila', country: 'Philippines', timezone: 'Asia/Manila', aliases: ['philippines', 'pht', 'mnl'] },
  { name: 'Taipei', country: 'Taiwan', timezone: 'Asia/Taipei', aliases: ['taiwan', 'tst', 'tpe'] },
  { name: 'Ho Chi Minh City', country: 'Vietnam', timezone: 'Asia/Ho_Chi_Minh', aliases: ['vietnam', 'ict', 'sgn', 'saigon'] },
  { name: 'Lagos', country: 'Nigeria', timezone: 'Africa/Lagos', aliases: ['nigeria', 'wat', 'los'] },
  { name: 'Accra', country: 'Ghana', timezone: 'Africa/Accra', aliases: ['ghana', 'gmt'] },
  { name: 'UTC', country: 'Universal', timezone: 'UTC', aliases: ['utc', 'gmt', 'universal', 'zulu', 'z'] },
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
  { label: 'India ↔ USA', cities: ['Mumbai', 'New York', 'Los Angeles'] },
  { label: 'India ↔ UK', cities: ['Mumbai', 'London'] },
  { label: 'India ↔ Australia', cities: ['Mumbai', 'Sydney'] },
  { label: 'India ↔ Europe', cities: ['Mumbai', 'London', 'Paris', 'Berlin'] },
  { label: 'Americas', cities: ['New York', 'Chicago', 'Los Angeles', 'Toronto', 'São Paulo'] },
  { label: 'Asia Pacific', cities: ['Tokyo', 'Singapore', 'Sydney', 'Hong Kong', 'Seoul'] },
];
