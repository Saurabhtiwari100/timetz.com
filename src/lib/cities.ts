export interface City {
  name: string;
  country: string;
  timezone: string;
  aliases: string[];
  region: string;
}

export const CITIES: City[] = [

  // ── North America — USA ────────────────────────────────────────────────────
  { name: 'New York',       country: 'USA',     timezone: 'America/New_York',    aliases: ['nyc','ny','est','edt','eastern','jfk','lga','new york city','manhattan'], region: 'North America' },
  { name: 'Chicago',        country: 'USA',     timezone: 'America/Chicago',     aliases: ['cst','cdt','central','ord','illinois'], region: 'North America' },
  { name: 'Denver',         country: 'USA',     timezone: 'America/Denver',      aliases: ['mst','mdt','mountain','den','colorado'], region: 'North America' },
  { name: 'Los Angeles',    country: 'USA',     timezone: 'America/Los_Angeles', aliases: ['la','pst','pdt','pacific','lax','california','socal'], region: 'North America' },
  { name: 'San Francisco',  country: 'USA',     timezone: 'America/Los_Angeles', aliases: ['sf','sfo','bay area','silicon valley'], region: 'North America' },
  { name: 'Seattle',        country: 'USA',     timezone: 'America/Los_Angeles', aliases: ['sea','washington state','pnw'], region: 'North America' },
  { name: 'Las Vegas',      country: 'USA',     timezone: 'America/Los_Angeles', aliases: ['lvs','nevada','nv'], region: 'North America' },
  { name: 'Phoenix',        country: 'USA',     timezone: 'America/Phoenix',     aliases: ['phx','arizona','az'], region: 'North America' },
  { name: 'Dallas',         country: 'USA',     timezone: 'America/Chicago',     aliases: ['dfw','texas','tx','fort worth'], region: 'North America' },
  { name: 'Houston',        country: 'USA',     timezone: 'America/Chicago',     aliases: ['hou','iah','texas'], region: 'North America' },
  { name: 'Minneapolis',    country: 'USA',     timezone: 'America/Chicago',     aliases: ['msp','minnesota','mn','twin cities'], region: 'North America' },
  { name: 'Miami',          country: 'USA',     timezone: 'America/New_York',    aliases: ['mia','florida','fl'], region: 'North America' },
  { name: 'Atlanta',        country: 'USA',     timezone: 'America/New_York',    aliases: ['atl','georgia','ga'], region: 'North America' },
  { name: 'Boston',         country: 'USA',     timezone: 'America/New_York',    aliases: ['bos','massachusetts','ma'], region: 'North America' },
  { name: 'Washington DC',  country: 'USA',     timezone: 'America/New_York',    aliases: ['dc','iad','dulles','capital'], region: 'North America' },
  { name: 'Detroit',        country: 'USA',     timezone: 'America/Detroit',     aliases: ['dtw','michigan','mi'], region: 'North America' },
  { name: 'Anchorage',      country: 'USA',     timezone: 'America/Anchorage',   aliases: ['alaska','akst','akdt','anc'], region: 'North America' },
  { name: 'Honolulu',       country: 'USA',     timezone: 'Pacific/Honolulu',    aliases: ['hawaii','hst','hnl','hi'], region: 'North America' },

  // ── North America — Canada ─────────────────────────────────────────────────
  { name: 'Toronto',        country: 'Canada',  timezone: 'America/Toronto',     aliases: ['yyz','ontario','canada east'], region: 'North America' },
  { name: 'Montreal',       country: 'Canada',  timezone: 'America/Toronto',     aliases: ['yul','quebec','mtl'], region: 'North America' },
  { name: 'Vancouver',      country: 'Canada',  timezone: 'America/Vancouver',   aliases: ['yvr','bc','british columbia'], region: 'North America' },
  { name: 'Calgary',        country: 'Canada',  timezone: 'America/Edmonton',    aliases: ['yyc','alberta'], region: 'North America' },
  { name: 'Edmonton',       country: 'Canada',  timezone: 'America/Edmonton',    aliases: ['yeg','alberta','mdt'], region: 'North America' },
  { name: 'Winnipeg',       country: 'Canada',  timezone: 'America/Winnipeg',    aliases: ['ywg','manitoba'], region: 'North America' },
  { name: 'Halifax',        country: 'Canada',  timezone: 'America/Halifax',     aliases: ['yhz','nova scotia','ast','adt'], region: 'North America' },

  // ── North America — Mexico ─────────────────────────────────────────────────
  { name: 'Mexico City',    country: 'Mexico',  timezone: 'America/Mexico_City', aliases: ['mexico','mex','cdmx','df'], region: 'North America' },
  { name: 'Guadalajara',    country: 'Mexico',  timezone: 'America/Mexico_City', aliases: ['gdl','jalisco'], region: 'North America' },
  { name: 'Monterrey',      country: 'Mexico',  timezone: 'America/Monterrey',   aliases: ['mty','nuevo leon'], region: 'North America' },
  { name: 'Tijuana',        country: 'Mexico',  timezone: 'America/Tijuana',     aliases: ['tij','baja california'], region: 'North America' },

  // ── Central America & Caribbean ────────────────────────────────────────────
  { name: 'Guatemala City', country: 'Guatemala',    timezone: 'America/Guatemala',    aliases: ['gua','guatemala'], region: 'Central America' },
  { name: 'San José',       country: 'Costa Rica',   timezone: 'America/Costa_Rica',   aliases: ['sjo','costa rica'], region: 'Central America' },
  { name: 'Panama City',    country: 'Panama',       timezone: 'America/Panama',       aliases: ['pty','panama','est'], region: 'Central America' },
  { name: 'Tegucigalpa',    country: 'Honduras',     timezone: 'America/Tegucigalpa',  aliases: ['tgu','honduras'], region: 'Central America' },
  { name: 'Managua',        country: 'Nicaragua',    timezone: 'America/Managua',      aliases: ['mga','nicaragua'], region: 'Central America' },
  { name: 'Havana',         country: 'Cuba',         timezone: 'America/Havana',       aliases: ['hav','cuba','cst'], region: 'Central America' },
  { name: 'Kingston',       country: 'Jamaica',      timezone: 'America/Jamaica',      aliases: ['kin','jamaica','est'], region: 'Central America' },
  { name: 'Santo Domingo',  country: 'Dominican Rep',timezone: 'America/Santo_Domingo',aliases: ['sdq','dominican republic','ast'], region: 'Central America' },
  { name: 'Port-au-Prince', country: 'Haiti',        timezone: 'America/Port-au-Prince',aliases: ['pap','haiti'], region: 'Central America' },
  { name: 'San Juan',       country: 'Puerto Rico',  timezone: 'America/Puerto_Rico',  aliases: ['sju','puerto rico','ast'], region: 'Central America' },

  // ── South America ──────────────────────────────────────────────────────────
  { name: 'São Paulo',      country: 'Brazil',    timezone: 'America/Sao_Paulo',              aliases: ['brazil','brasil','brt','gru','sao paulo'], region: 'South America' },
  { name: 'Rio de Janeiro', country: 'Brazil',    timezone: 'America/Sao_Paulo',              aliases: ['rio','gig','brt'], region: 'South America' },
  { name: 'Brasília',       country: 'Brazil',    timezone: 'America/Sao_Paulo',              aliases: ['brasilia','bsb'], region: 'South America' },
  { name: 'Buenos Aires',   country: 'Argentina', timezone: 'America/Argentina/Buenos_Aires', aliases: ['eze','argentina','art'], region: 'South America' },
  { name: 'Santiago',       country: 'Chile',     timezone: 'America/Santiago',               aliases: ['scl','chile','clst'], region: 'South America' },
  { name: 'Lima',           country: 'Peru',      timezone: 'America/Lima',                   aliases: ['lim','peru','pet'], region: 'South America' },
  { name: 'Bogotá',         country: 'Colombia',  timezone: 'America/Bogota',                 aliases: ['bog','colombia','col','bogota'], region: 'South America' },
  { name: 'Caracas',        country: 'Venezuela', timezone: 'America/Caracas',                aliases: ['ccs','venezuela','vet'], region: 'South America' },
  { name: 'Montevideo',     country: 'Uruguay',   timezone: 'America/Montevideo',             aliases: ['mvd','uruguay','uyt'], region: 'South America' },
  { name: 'Asunción',       country: 'Paraguay',  timezone: 'America/Asuncion',               aliases: ['asu','paraguay','pyt','asuncion'], region: 'South America' },
  { name: 'La Paz',         country: 'Bolivia',   timezone: 'America/La_Paz',                 aliases: ['lpb','bolivia','bot'], region: 'South America' },
  { name: 'Quito',          country: 'Ecuador',   timezone: 'America/Guayaquil',              aliases: ['uio','ecuador','ect'], region: 'South America' },
  { name: 'Guayaquil',      country: 'Ecuador',   timezone: 'America/Guayaquil',              aliases: ['gye','ecuador'], region: 'South America' },
  { name: 'Paramaribo',     country: 'Suriname',  timezone: 'America/Paramaribo',             aliases: ['pbm','suriname','srt'], region: 'South America' },

  // ── Europe — Western ───────────────────────────────────────────────────────
  { name: 'London',         country: 'UK',          timezone: 'Europe/London',    aliases: ['uk','england','britain','lhr','gmt','bst','gbr'], region: 'Europe' },
  { name: 'Dublin',         country: 'Ireland',     timezone: 'Europe/Dublin',    aliases: ['dub','ireland','ire','ist'], region: 'Europe' },
  { name: 'Reykjavik',      country: 'Iceland',     timezone: 'Atlantic/Reykjavik',aliases: ['rek','iceland','gmt'], region: 'Europe' },
  { name: 'Lisbon',         country: 'Portugal',    timezone: 'Europe/Lisbon',    aliases: ['portugal','wet','west','lis'], region: 'Europe' },
  { name: 'Madrid',         country: 'Spain',       timezone: 'Europe/Madrid',    aliases: ['spain','mad','cet','cest'], region: 'Europe' },
  { name: 'Barcelona',      country: 'Spain',       timezone: 'Europe/Madrid',    aliases: ['bcn','catalonia'], region: 'Europe' },
  { name: 'Paris',          country: 'France',      timezone: 'Europe/Paris',     aliases: ['france','cet','cest','cdg'], region: 'Europe' },
  { name: 'Brussels',       country: 'Belgium',     timezone: 'Europe/Brussels',  aliases: ['bru','belgium','cet','cest'], region: 'Europe' },
  { name: 'Amsterdam',      country: 'Netherlands', timezone: 'Europe/Amsterdam', aliases: ['netherlands','holland','ams','cet'], region: 'Europe' },
  { name: 'Luxembourg',     country: 'Luxembourg',  timezone: 'Europe/Luxembourg',aliases: ['lux','cet'], region: 'Europe' },
  { name: 'Zurich',         country: 'Switzerland', timezone: 'Europe/Zurich',    aliases: ['switzerland','swiss','zrh','cet'], region: 'Europe' },
  { name: 'Geneva',         country: 'Switzerland', timezone: 'Europe/Zurich',    aliases: ['gva','gvf','switzerland'], region: 'Europe' },
  { name: 'Berlin',         country: 'Germany',     timezone: 'Europe/Berlin',    aliases: ['germany','deutschland','fra','cet'], region: 'Europe' },
  { name: 'Munich',         country: 'Germany',     timezone: 'Europe/Berlin',    aliases: ['muc','bavaria','cet'], region: 'Europe' },
  { name: 'Hamburg',        country: 'Germany',     timezone: 'Europe/Berlin',    aliases: ['ham','cet'], region: 'Europe' },
  { name: 'Vienna',         country: 'Austria',     timezone: 'Europe/Vienna',    aliases: ['vie','austria','cet'], region: 'Europe' },
  { name: 'Rome',           country: 'Italy',       timezone: 'Europe/Rome',      aliases: ['italy','fco','cet','italia'], region: 'Europe' },
  { name: 'Milan',          country: 'Italy',       timezone: 'Europe/Rome',      aliases: ['mxp','linate','italy'], region: 'Europe' },

  // ── Europe — Northern ──────────────────────────────────────────────────────
  { name: 'Copenhagen',     country: 'Denmark',     timezone: 'Europe/Copenhagen',aliases: ['denmark','cph','cet'], region: 'Europe' },
  { name: 'Oslo',           country: 'Norway',       timezone: 'Europe/Oslo',      aliases: ['norway','osl','cet'], region: 'Europe' },
  { name: 'Stockholm',      country: 'Sweden',      timezone: 'Europe/Stockholm', aliases: ['sweden','arn','cet'], region: 'Europe' },
  { name: 'Helsinki',       country: 'Finland',     timezone: 'Europe/Helsinki',  aliases: ['finland','hel','eet','eest'], region: 'Europe' },
  { name: 'Tallinn',        country: 'Estonia',     timezone: 'Europe/Tallinn',   aliases: ['estonia','tll','eet'], region: 'Europe' },
  { name: 'Riga',           country: 'Latvia',      timezone: 'Europe/Riga',      aliases: ['latvia','rix','eet'], region: 'Europe' },
  { name: 'Vilnius',        country: 'Lithuania',   timezone: 'Europe/Vilnius',   aliases: ['lithuania','vno','eet'], region: 'Europe' },

  // ── Europe — Central & Eastern ─────────────────────────────────────────────
  { name: 'Warsaw',         country: 'Poland',      timezone: 'Europe/Warsaw',    aliases: ['poland','waw','cet'], region: 'Europe' },
  { name: 'Prague',         country: 'Czech Republic',timezone: 'Europe/Prague',  aliases: ['czechia','prg','cet'], region: 'Europe' },
  { name: 'Budapest',       country: 'Hungary',     timezone: 'Europe/Budapest',  aliases: ['hungary','bud','cet'], region: 'Europe' },
  { name: 'Bratislava',     country: 'Slovakia',    timezone: 'Europe/Bratislava',aliases: ['slovakia','bts','cet'], region: 'Europe' },
  { name: 'Ljubljana',      country: 'Slovenia',    timezone: 'Europe/Ljubljana', aliases: ['slovenia','lju','cet'], region: 'Europe' },
  { name: 'Zagreb',         country: 'Croatia',     timezone: 'Europe/Zagreb',    aliases: ['croatia','zag','cet'], region: 'Europe' },
  { name: 'Belgrade',       country: 'Serbia',      timezone: 'Europe/Belgrade',  aliases: ['serbia','beg','cet'], region: 'Europe' },
  { name: 'Bucharest',      country: 'Romania',     timezone: 'Europe/Bucharest', aliases: ['romania','otc','eet'], region: 'Europe' },
  { name: 'Sofia',          country: 'Bulgaria',    timezone: 'Europe/Sofia',     aliases: ['bulgaria','sof','eet'], region: 'Europe' },
  { name: 'Athens',         country: 'Greece',      timezone: 'Europe/Athens',    aliases: ['greece','eet','ath'], region: 'Europe' },
  { name: 'Nicosia',        country: 'Cyprus',      timezone: 'Asia/Nicosia',     aliases: ['cyprus','nic','eet'], region: 'Europe' },
  { name: 'Kyiv',           country: 'Ukraine',     timezone: 'Europe/Kiev',      aliases: ['ukraine','kbp','eet','kiev'], region: 'Europe' },
  { name: 'Minsk',          country: 'Belarus',     timezone: 'Europe/Minsk',     aliases: ['belarus','msq','fmt'], region: 'Europe' },
  { name: 'Moscow',         country: 'Russia',      timezone: 'Europe/Moscow',    aliases: ['russia','msk','svo','mow'], region: 'Europe' },
  { name: 'St Petersburg',  country: 'Russia',      timezone: 'Europe/Moscow',    aliases: ['saint petersburg','led','russia'], region: 'Europe' },
  { name: 'Istanbul',       country: 'Turkey',      timezone: 'Europe/Istanbul',  aliases: ['turkey','istanbul','ist','try','tur'], region: 'Europe' },
  { name: 'Ankara',         country: 'Turkey',      timezone: 'Europe/Istanbul',  aliases: ['turkey','esb'], region: 'Europe' },

  // ── Middle East ────────────────────────────────────────────────────────────
  { name: 'Dubai',          country: 'UAE',          timezone: 'Asia/Dubai',    aliases: ['uae','dxb','gulf','gst'], region: 'Middle East' },
  { name: 'Abu Dhabi',      country: 'UAE',          timezone: 'Asia/Dubai',    aliases: ['uae','auh','gst'], region: 'Middle East' },
  { name: 'Riyadh',         country: 'Saudi Arabia', timezone: 'Asia/Riyadh',   aliases: ['saudi arabia','ksa','ruh','ast'], region: 'Middle East' },
  { name: 'Jeddah',         country: 'Saudi Arabia', timezone: 'Asia/Riyadh',   aliases: ['jed','mecca','saudi'], region: 'Middle East' },
  { name: 'Doha',           country: 'Qatar',        timezone: 'Asia/Qatar',    aliases: ['qatar','doh','ast'], region: 'Middle East' },
  { name: 'Kuwait City',    country: 'Kuwait',       timezone: 'Asia/Kuwait',   aliases: ['kwi','kuwait','ast'], region: 'Middle East' },
  { name: 'Muscat',         country: 'Oman',         timezone: 'Asia/Muscat',   aliases: ['oman','mct','gst'], region: 'Middle East' },
  { name: 'Manama',         country: 'Bahrain',      timezone: 'Asia/Bahrain',  aliases: ['bahrain','bah','ast'], region: 'Middle East' },
  { name: 'Tehran',         country: 'Iran',         timezone: 'Asia/Tehran',   aliases: ['iran','thr','irst'], region: 'Middle East' },
  { name: 'Baghdad',        country: 'Iraq',         timezone: 'Asia/Baghdad',  aliases: ['iraq','bgw','ast'], region: 'Middle East' },
  { name: 'Beirut',         country: 'Lebanon',      timezone: 'Asia/Beirut',   aliases: ['lebanon','bei','eet'], region: 'Middle East' },
  { name: 'Amman',          country: 'Jordan',       timezone: 'Asia/Amman',    aliases: ['jordan','amm','eet'], region: 'Middle East' },
  { name: 'Damascus',       country: 'Syria',        timezone: 'Asia/Damascus', aliases: ['syria','dag','eet'], region: 'Middle East' },
  { name: 'Tel Aviv',       country: 'Israel',       timezone: 'Asia/Jerusalem',aliases: ['israel','tlv','ist','jerusalem'], region: 'Middle East' },
  { name: 'Sana\'a',        country: 'Yemen',        timezone: 'Asia/Aden',     aliases: ['yemen','sar','ast'], region: 'Middle East' },

  // ── Caucasus ───────────────────────────────────────────────────────────────
  { name: 'Tbilisi',        country: 'Georgia',      timezone: 'Asia/Tbilisi',  aliases: ['georgia','tbs','get'], region: 'Middle East' },
  { name: 'Yerevan',        country: 'Armenia',      timezone: 'Asia/Yerevan',  aliases: ['armenia','evn','amt'], region: 'Middle East' },
  { name: 'Baku',           country: 'Azerbaijan',   timezone: 'Asia/Baku',     aliases: ['azerbaijan','gyd','azt'], region: 'Middle East' },

  // ── Africa — North ─────────────────────────────────────────────────────────
  { name: 'Cairo',          country: 'Egypt',        timezone: 'Africa/Cairo',       aliases: ['egypt','eet','cat','cai'], region: 'Africa' },
  { name: 'Alexandria',     country: 'Egypt',        timezone: 'Africa/Cairo',       aliases: ['egypt','alx'], region: 'Africa' },
  { name: 'Casablanca',     country: 'Morocco',      timezone: 'Africa/Casablanca',  aliases: ['morocco','cmn','wet'], region: 'Africa' },
  { name: 'Rabat',          country: 'Morocco',      timezone: 'Africa/Casablanca',  aliases: ['morocco','rak'], region: 'Africa' },
  { name: 'Tunis',          country: 'Tunisia',      timezone: 'Africa/Tunis',       aliases: ['tunisia','tun','cet'], region: 'Africa' },
  { name: 'Algiers',        country: 'Algeria',      timezone: 'Africa/Algiers',     aliases: ['algeria','alg','cet'], region: 'Africa' },
  { name: 'Tripoli',        country: 'Libya',        timezone: 'Africa/Tripoli',     aliases: ['libya','tip','eet'], region: 'Africa' },
  { name: 'Khartoum',       country: 'Sudan',        timezone: 'Africa/Khartoum',    aliases: ['sudan','krt','cat'], region: 'Africa' },

  // ── Africa — West ──────────────────────────────────────────────────────────
  { name: 'Lagos',          country: 'Nigeria',      timezone: 'Africa/Lagos',       aliases: ['nigeria','wat','los'], region: 'Africa' },
  { name: 'Abuja',          country: 'Nigeria',      timezone: 'Africa/Lagos',       aliases: ['nigeria','abv','wat'], region: 'Africa' },
  { name: 'Accra',          country: 'Ghana',        timezone: 'Africa/Accra',       aliases: ['ghana','acc','gmt'], region: 'Africa' },
  { name: 'Dakar',          country: 'Senegal',      timezone: 'Africa/Dakar',       aliases: ['senegal','dkr','gmt'], region: 'Africa' },
  { name: 'Abidjan',        country: 'Ivory Coast',  timezone: 'Africa/Abidjan',     aliases: ['ivory coast','cote divoire','abj','gmt'], region: 'Africa' },
  { name: 'Bamako',         country: 'Mali',         timezone: 'Africa/Bamako',      aliases: ['mali','bko','gmt'], region: 'Africa' },

  // ── Africa — East & Central ────────────────────────────────────────────────
  { name: 'Nairobi',        country: 'Kenya',        timezone: 'Africa/Nairobi',     aliases: ['kenya','eat','nbo'], region: 'Africa' },
  { name: 'Addis Ababa',    country: 'Ethiopia',     timezone: 'Africa/Addis_Ababa', aliases: ['ethiopia','add','eat'], region: 'Africa' },
  { name: 'Dar es Salaam',  country: 'Tanzania',     timezone: 'Africa/Dar_es_Salaam',aliases: ['tanzania','dat','eat'], region: 'Africa' },
  { name: 'Kampala',        country: 'Uganda',       timezone: 'Africa/Kampala',     aliases: ['uganda','kla','eat'], region: 'Africa' },
  { name: 'Kinshasa',       country: 'DR Congo',     timezone: 'Africa/Kinshasa',    aliases: ['congo','drc','fnj','wat'], region: 'Africa' },
  { name: 'Luanda',         country: 'Angola',       timezone: 'Africa/Luanda',      aliases: ['angola','lad','wat'], region: 'Africa' },

  // ── Africa — Southern ──────────────────────────────────────────────────────
  { name: 'Johannesburg',   country: 'South Africa', timezone: 'Africa/Johannesburg',aliases: ['south africa','sa','sast','jnb'], region: 'Africa' },
  { name: 'Cape Town',      country: 'South Africa', timezone: 'Africa/Johannesburg',aliases: ['south africa','cpt','sast'], region: 'Africa' },
  { name: 'Harare',         country: 'Zimbabwe',     timezone: 'Africa/Harare',      aliases: ['zimbabwe','hre','cat'], region: 'Africa' },
  { name: 'Lusaka',         country: 'Zambia',       timezone: 'Africa/Lusaka',      aliases: ['zambia','lun','cat'], region: 'Africa' },
  { name: 'Maputo',         country: 'Mozambique',   timezone: 'Africa/Maputo',      aliases: ['mozambique','mpq','cat'], region: 'Africa' },
  { name: 'Windhoek',       country: 'Namibia',      timezone: 'Africa/Windhoek',    aliases: ['namibia','wdh','cat'], region: 'Africa' },
  { name: 'Antananarivo',   country: 'Madagascar',   timezone: 'Indian/Antananarivo',aliases: ['madagascar','tnr','eat'], region: 'Africa' },

  // ── Central Asia ───────────────────────────────────────────────────────────
  { name: 'Kabul',          country: 'Afghanistan',  timezone: 'Asia/Kabul',     aliases: ['afghanistan','kbl','aft'], region: 'Central Asia' },
  { name: 'Tashkent',       country: 'Uzbekistan',   timezone: 'Asia/Tashkent',  aliases: ['uzbekistan','tas','uzt'], region: 'Central Asia' },
  { name: 'Almaty',         country: 'Kazakhstan',   timezone: 'Asia/Almaty',    aliases: ['kazakhstan','ala','almt'], region: 'Central Asia' },
  { name: 'Nur-Sultan',     country: 'Kazakhstan',   timezone: 'Asia/Almaty',    aliases: ['astana','kazakhstan','tse'], region: 'Central Asia' },
  { name: 'Bishkek',        country: 'Kyrgyzstan',   timezone: 'Asia/Bishkek',   aliases: ['kyrgyzstan','fru','kgt'], region: 'Central Asia' },
  { name: 'Ashgabat',       country: 'Turkmenistan', timezone: 'Asia/Ashgabat',  aliases: ['turkmenistan','asg','tmt'], region: 'Central Asia' },
  { name: 'Dushanbe',       country: 'Tajikistan',   timezone: 'Asia/Dushanbe',  aliases: ['tajikistan','dyj','tjt'], region: 'Central Asia' },

  // ── South Asia ─────────────────────────────────────────────────────────────
  { name: 'Mumbai',         country: 'India',        timezone: 'Asia/Kolkata',   aliases: ['bombay','india','ist','in','bom','maharashtra'], region: 'South Asia' },
  { name: 'Delhi',          country: 'India',        timezone: 'Asia/Kolkata',   aliases: ['new delhi','ndls','india','ist','capital'], region: 'South Asia' },
  { name: 'Bangalore',      country: 'India',        timezone: 'Asia/Kolkata',   aliases: ['bengaluru','blr','india','ist','tech city'], region: 'South Asia' },
  { name: 'Chennai',        country: 'India',        timezone: 'Asia/Kolkata',   aliases: ['madras','maa','india','ist'], region: 'South Asia' },
  { name: 'Hyderabad',      country: 'India',        timezone: 'Asia/Kolkata',   aliases: ['hyd','india','ist','cyberabad'], region: 'South Asia' },
  { name: 'Kolkata',        country: 'India',        timezone: 'Asia/Kolkata',   aliases: ['calcutta','ccu','india','ist'], region: 'South Asia' },
  { name: 'Ahmedabad',      country: 'India',        timezone: 'Asia/Kolkata',   aliases: ['amd','india','ist','gujarat'], region: 'South Asia' },
  { name: 'Pune',           country: 'India',        timezone: 'Asia/Kolkata',   aliases: ['pnq','india','ist','maharashtra'], region: 'South Asia' },
  { name: 'Karachi',        country: 'Pakistan',     timezone: 'Asia/Karachi',   aliases: ['pakistan','pkt','khi'], region: 'South Asia' },
  { name: 'Lahore',         country: 'Pakistan',     timezone: 'Asia/Karachi',   aliases: ['pakistan','lhe','pkt'], region: 'South Asia' },
  { name: 'Islamabad',      country: 'Pakistan',     timezone: 'Asia/Karachi',   aliases: ['pakistan','isb','pkt'], region: 'South Asia' },
  { name: 'Dhaka',          country: 'Bangladesh',   timezone: 'Asia/Dhaka',     aliases: ['bangladesh','bst','dac'], region: 'South Asia' },
  { name: 'Kathmandu',      country: 'Nepal',        timezone: 'Asia/Kathmandu', aliases: ['nepal','npt','ktm'], region: 'South Asia' },
  { name: 'Colombo',        country: 'Sri Lanka',    timezone: 'Asia/Colombo',   aliases: ['sri lanka','slst','cmb'], region: 'South Asia' },
  { name: 'Malé',           country: 'Maldives',     timezone: 'Indian/Maldives',aliases: ['maldives','mle','mvt'], region: 'South Asia' },
  { name: 'Thimphu',        country: 'Bhutan',       timezone: 'Asia/Thimphu',   aliases: ['bhutan','pbn','btt'], region: 'South Asia' },

  // ── Southeast Asia ─────────────────────────────────────────────────────────
  { name: 'Bangkok',        country: 'Thailand',     timezone: 'Asia/Bangkok',         aliases: ['thailand','ict','bkk'], region: 'Southeast Asia' },
  { name: 'Chiang Mai',     country: 'Thailand',     timezone: 'Asia/Bangkok',         aliases: ['thailand','cnh','ict'], region: 'Southeast Asia' },
  { name: 'Hanoi',          country: 'Vietnam',      timezone: 'Asia/Ho_Chi_Minh',     aliases: ['vietnam','ict','han'], region: 'Southeast Asia' },
  { name: 'Ho Chi Minh City',country:'Vietnam',      timezone: 'Asia/Ho_Chi_Minh',     aliases: ['vietnam','ict','sgn','saigon','hcm'], region: 'Southeast Asia' },
  { name: 'Singapore',      country: 'Singapore',    timezone: 'Asia/Singapore',       aliases: ['sg','sin','sgt'], region: 'Southeast Asia' },
  { name: 'Kuala Lumpur',   country: 'Malaysia',     timezone: 'Asia/Kuala_Lumpur',    aliases: ['malaysia','myt','kul','kl'], region: 'Southeast Asia' },
  { name: 'Jakarta',        country: 'Indonesia',    timezone: 'Asia/Jakarta',         aliases: ['indonesia','wib','cgk'], region: 'Southeast Asia' },
  { name: 'Bali',           country: 'Indonesia',    timezone: 'Asia/Makassar',        aliases: ['bali','indonesia','wita','dps'], region: 'Southeast Asia' },
  { name: 'Makassar',       country: 'Indonesia',    timezone: 'Asia/Makassar',        aliases: ['indonesia','wita','ups'], region: 'Southeast Asia' },
  { name: 'Surabaya',       country: 'Indonesia',    timezone: 'Asia/Jakarta',         aliases: ['indonesia','sub','wib'], region: 'Southeast Asia' },
  { name: 'Manila',         country: 'Philippines',  timezone: 'Asia/Manila',          aliases: ['philippines','pht','mnl'], region: 'Southeast Asia' },
  { name: 'Cebu',           country: 'Philippines',  timezone: 'Asia/Manila',          aliases: ['philippines','ceb','pht'], region: 'Southeast Asia' },
  { name: 'Phnom Penh',     country: 'Cambodia',     timezone: 'Asia/Phnom_Penh',      aliases: ['cambodia','ict','pnh'], region: 'Southeast Asia' },
  { name: 'Vientiane',      country: 'Laos',         timezone: 'Asia/Vientiane',       aliases: ['laos','ict','vte'], region: 'Southeast Asia' },
  { name: 'Yangon',         country: 'Myanmar',      timezone: 'Asia/Yangon',          aliases: ['myanmar','rangoon','mmst','rng'], region: 'Southeast Asia' },
  { name: 'Naypyidaw',      country: 'Myanmar',      timezone: 'Asia/Yangon',          aliases: ['myanmar','npt'], region: 'Southeast Asia' },
  { name: 'Brunei',         country: 'Brunei',       timezone: 'Asia/Brunei',          aliases: ['bwn','bst'], region: 'Southeast Asia' },
  { name: 'Dili',           country: 'Timor-Leste',  timezone: 'Asia/Dili',            aliases: ['east timor','dil','tlt'], region: 'Southeast Asia' },

  // ── East Asia ──────────────────────────────────────────────────────────────
  { name: 'Tokyo',          country: 'Japan',        timezone: 'Asia/Tokyo',    aliases: ['japan','jst','nrt','hnd'], region: 'East Asia' },
  { name: 'Osaka',          country: 'Japan',        timezone: 'Asia/Tokyo',    aliases: ['japan','itm','kix','jst'], region: 'East Asia' },
  { name: 'Sapporo',        country: 'Japan',        timezone: 'Asia/Tokyo',    aliases: ['japan','cts','jst'], region: 'East Asia' },
  { name: 'Beijing',        country: 'China',        timezone: 'Asia/Shanghai', aliases: ['china','pek','cst','peking'], region: 'East Asia' },
  { name: 'Shanghai',       country: 'China',        timezone: 'Asia/Shanghai', aliases: ['china','pvg','sha','cst'], region: 'East Asia' },
  { name: 'Shenzhen',       country: 'China',        timezone: 'Asia/Shanghai', aliases: ['china','szx','cst'], region: 'East Asia' },
  { name: 'Guangzhou',      country: 'China',        timezone: 'Asia/Shanghai', aliases: ['china','can','canton','cst'], region: 'East Asia' },
  { name: 'Chengdu',        country: 'China',        timezone: 'Asia/Shanghai', aliases: ['china','ctu','cst','sichuan'], region: 'East Asia' },
  { name: 'Chongqing',      country: 'China',        timezone: 'Asia/Shanghai', aliases: ['china','ckm','cst'], region: 'East Asia' },
  { name: 'Hong Kong',      country: 'Hong Kong',    timezone: 'Asia/Hong_Kong',aliases: ['hk','hkg','hkt'], region: 'East Asia' },
  { name: 'Taipei',         country: 'Taiwan',       timezone: 'Asia/Taipei',   aliases: ['taiwan','tpe','tst'], region: 'East Asia' },
  { name: 'Seoul',          country: 'South Korea',  timezone: 'Asia/Seoul',    aliases: ['korea','kst','icn'], region: 'East Asia' },
  { name: 'Busan',          country: 'South Korea',  timezone: 'Asia/Seoul',    aliases: ['korea','pus','kst'], region: 'East Asia' },
  { name: 'Ulaanbaatar',    country: 'Mongolia',     timezone: 'Asia/Ulaanbaatar',aliases: ['mongolia','uln','ulat'], region: 'East Asia' },

  // ── Pacific / Oceania ──────────────────────────────────────────────────────
  { name: 'Sydney',         country: 'Australia',    timezone: 'Australia/Sydney',    aliases: ['australia','aest','aedt','syd'], region: 'Pacific' },
  { name: 'Melbourne',      country: 'Australia',    timezone: 'Australia/Melbourne', aliases: ['mel','australia','aest'], region: 'Pacific' },
  { name: 'Brisbane',       country: 'Australia',    timezone: 'Australia/Brisbane',  aliases: ['bne','australia','aest'], region: 'Pacific' },
  { name: 'Perth',          country: 'Australia',    timezone: 'Australia/Perth',     aliases: ['per','australia','awst'], region: 'Pacific' },
  { name: 'Adelaide',       country: 'Australia',    timezone: 'Australia/Adelaide',  aliases: ['adl','australia','acst','acdt'], region: 'Pacific' },
  { name: 'Darwin',         country: 'Australia',    timezone: 'Australia/Darwin',    aliases: ['dfw','australia','acst'], region: 'Pacific' },
  { name: 'Canberra',       country: 'Australia',    timezone: 'Australia/Sydney',    aliases: ['cbr','australia','capital'], region: 'Pacific' },
  { name: 'Auckland',       country: 'New Zealand',  timezone: 'Pacific/Auckland',    aliases: ['new zealand','nzst','nzdt','akl'], region: 'Pacific' },
  { name: 'Wellington',     country: 'New Zealand',  timezone: 'Pacific/Auckland',    aliases: ['new zealand','wlg','nzst'], region: 'Pacific' },
  { name: 'Christchurch',   country: 'New Zealand',  timezone: 'Pacific/Auckland',    aliases: ['new zealand','chc','nzst'], region: 'Pacific' },
  { name: 'Suva',           country: 'Fiji',         timezone: 'Pacific/Fiji',        aliases: ['fiji','suv','fjt'], region: 'Pacific' },
  { name: 'Port Moresby',   country: 'Papua New Guinea',timezone: 'Pacific/Port_Moresby',aliases: ['png','pom','pgt'], region: 'Pacific' },
  { name: 'Guam',           country: 'Guam',         timezone: 'Pacific/Guam',        aliases: ['gum','chamst','chst'], region: 'Pacific' },
  { name: 'Noumea',         country: 'New Caledonia',timezone: 'Pacific/Noumea',      aliases: ['new caledonia','nou','nct'], region: 'Pacific' },
  { name: 'Papeete',        country: 'French Polynesia',timezone: 'Pacific/Tahiti',   aliases: ['tahiti','french polynesia','ppte','taht'], region: 'Pacific' },
  { name: 'Apia',           country: 'Samoa',        timezone: 'Pacific/Apia',        aliases: ['samoa','apw','wst'], region: 'Pacific' },
  { name: 'Nuku\'alofa',    country: 'Tonga',        timezone: 'Pacific/Tongatapu',   aliases: ['tonga','tbu','tot'], region: 'Pacific' },
  { name: 'Honiara',        country: 'Solomon Islands',timezone: 'Pacific/Guadalcanal',aliases: ['solomon islands','hir','sbt'], region: 'Pacific' },

  // ── Universal ──────────────────────────────────────────────────────────────
  { name: 'UTC',            country: 'Universal',    timezone: 'UTC',                 aliases: ['utc','gmt','universal','zulu','z','coordinated universal time'], region: 'Universal' },
];

// ── Default world clock cities ─────────────────────────────────────────────
export const WORLD_CLOCK_DEFAULTS = [
  'New York', 'Chicago', 'Denver', 'Los Angeles', 'Anchorage', 'Honolulu',
  'London', 'Paris', 'Berlin', 'Moscow',
  'Dubai', 'Mumbai', 'Singapore', 'Tokyo', 'Sydney',
  'São Paulo', 'Toronto',
];

// ── Quick presets ──────────────────────────────────────────────────────────
export const QUICK_PRESETS = [
  { label: 'India ↔ USA',    cities: ['Mumbai', 'New York', 'Chicago', 'Los Angeles'] },
  { label: 'India ↔ UK',     cities: ['Mumbai', 'London'] },
  { label: 'India ↔ UAE',    cities: ['Mumbai', 'Dubai'] },
  { label: 'India ↔ AU',     cities: ['Mumbai', 'Sydney', 'Melbourne'] },
  { label: 'Asia Pacific',   cities: ['Tokyo', 'Singapore', 'Sydney', 'Hong Kong', 'Seoul'] },
  { label: 'Europe',         cities: ['London', 'Paris', 'Berlin', 'Amsterdam', 'Moscow'] },
  { label: 'All USA',        cities: ['New York', 'Chicago', 'Denver', 'Los Angeles', 'Phoenix', 'Anchorage', 'Honolulu'] },
  { label: 'Americas',       cities: ['New York', 'Chicago', 'Los Angeles', 'Toronto', 'São Paulo', 'Buenos Aires'] },
  { label: 'Global Meeting', cities: ['London', 'New York', 'Dubai', 'Singapore', 'Tokyo'] },
];

// ── Search ─────────────────────────────────────────────────────────────────
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
