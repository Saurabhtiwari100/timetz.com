import { useEffect, useRef, useState } from 'react';
import type { City } from '../lib/cities';

export const CITY_COORDS: Record<string, [number, number]> = {
  // ── North America — USA ──────────────────────────────────────────────────
  'New York':       [40.71, -74.01], 'Chicago':        [41.88, -87.63],
  'Denver':         [39.74,-104.98], 'Los Angeles':    [34.05,-118.24],
  'San Francisco':  [37.77,-122.42], 'Seattle':        [47.61,-122.33],
  'Las Vegas':      [36.17,-115.14], 'Phoenix':        [33.45,-112.07],
  'Dallas':         [32.78, -96.80], 'Houston':        [29.76, -95.37],
  'Minneapolis':    [44.98, -93.27], 'Miami':          [25.76, -80.19],
  'Atlanta':        [33.75, -84.39], 'Boston':         [42.36, -71.06],
  'Washington DC':  [38.91, -77.04], 'Detroit':        [42.33, -83.05],
  'Anchorage':      [61.22,-149.90], 'Honolulu':       [21.31,-157.86],
  // ── North America — Canada ───────────────────────────────────────────────
  'Toronto':        [43.65, -79.38], 'Montreal':       [45.50, -73.57],
  'Vancouver':      [49.28,-123.12], 'Calgary':        [51.04,-114.07],
  'Edmonton':       [53.55,-113.49], 'Winnipeg':       [49.90, -97.14],
  'Halifax':        [44.65, -63.60],
  // ── North America — Mexico ───────────────────────────────────────────────
  'Mexico City':    [19.43, -99.13], 'Guadalajara':    [20.66,-103.35],
  'Monterrey':      [25.69,-100.32], 'Tijuana':        [32.53,-117.04],
  // ── Central America & Caribbean ─────────────────────────────────────────
  'Guatemala City': [14.63, -90.52], 'San José':       [ 9.93, -84.08],
  'Panama City':    [ 8.99, -79.52], 'Tegucigalpa':    [14.09, -87.21],
  'Managua':        [12.13, -86.28], 'Havana':         [23.13, -82.38],
  'Kingston':       [17.98, -76.80], 'Santo Domingo':  [18.47, -69.90],
  'Port-au-Prince': [18.54, -72.34], 'San Juan':       [18.47, -66.11],
  // ── South America ────────────────────────────────────────────────────────
  'São Paulo':      [-23.55, -46.63], 'Rio de Janeiro': [-22.91, -43.17],
  'Brasília':       [-15.78, -47.93], 'Buenos Aires':   [-34.60, -58.38],
  'Santiago':       [-33.45, -70.67], 'Lima':           [-12.04, -77.03],
  'Bogotá':         [  4.71, -74.07], 'Caracas':        [ 10.48, -66.88],
  'Montevideo':     [-34.90, -56.19], 'Asunción':       [-25.30, -57.64],
  'La Paz':         [-16.50, -68.15], 'Quito':          [ -0.23, -78.52],
  'Guayaquil':      [ -2.20, -79.90], 'Paramaribo':     [  5.87, -55.17],
  // ── Europe — Western ─────────────────────────────────────────────────────
  'London':         [51.51,  -0.13], 'Dublin':         [53.33,  -6.25],
  'Reykjavik':      [64.13, -21.82], 'Lisbon':         [38.72,  -9.14],
  'Madrid':         [40.42,  -3.70], 'Barcelona':      [41.39,   2.17],
  'Paris':          [48.86,   2.35], 'Brussels':       [50.85,   4.35],
  'Amsterdam':      [52.37,   4.90], 'Luxembourg':     [49.61,   6.13],
  'Zurich':         [47.38,   8.54], 'Geneva':         [46.20,   6.14],
  'Berlin':         [52.52,  13.40], 'Munich':         [48.14,  11.58],
  'Hamburg':        [53.55,  10.00], 'Vienna':         [48.21,  16.37],
  'Rome':           [41.90,  12.50], 'Milan':          [45.46,   9.19],
  // ── Europe — Northern ────────────────────────────────────────────────────
  'Copenhagen':     [55.68,  12.57], 'Oslo':           [59.91,  10.75],
  'Stockholm':      [59.33,  18.07], 'Helsinki':       [60.17,  24.94],
  'Tallinn':        [59.44,  24.75], 'Riga':           [56.95,  24.11],
  'Vilnius':        [54.69,  25.28],
  // ── Europe — Central & Eastern ───────────────────────────────────────────
  'Warsaw':         [52.23,  21.01], 'Prague':         [50.09,  14.42],
  'Budapest':       [47.50,  19.05], 'Bratislava':     [48.15,  17.11],
  'Ljubljana':      [46.05,  14.51], 'Zagreb':         [45.81,  15.98],
  'Belgrade':       [44.80,  20.46], 'Bucharest':      [44.43,  26.10],
  'Sofia':          [42.70,  23.32], 'Athens':         [37.98,  23.73],
  'Nicosia':        [35.17,  33.37], 'Kyiv':           [50.45,  30.52],
  'Minsk':          [53.90,  27.57], 'Moscow':         [55.75,  37.62],
  'St Petersburg':  [59.95,  30.32], 'Istanbul':       [41.01,  28.95],
  'Ankara':         [39.93,  32.85],
  // ── Middle East ──────────────────────────────────────────────────────────
  'Dubai':          [25.20,  55.27], 'Abu Dhabi':      [24.47,  54.37],
  'Riyadh':         [24.69,  46.72], 'Jeddah':         [21.49,  39.19],
  'Doha':           [25.29,  51.53], 'Kuwait City':    [29.37,  47.98],
  'Muscat':         [23.61,  58.59], 'Manama':         [26.21,  50.59],
  'Tehran':         [35.70,  51.42], 'Baghdad':        [33.34,  44.40],
  'Beirut':         [33.89,  35.50], 'Amman':          [31.95,  35.93],
  'Damascus':       [33.51,  36.29], 'Tel Aviv':       [32.08,  34.78],
  'Sana\'a':        [15.35,  44.21], 'Tbilisi':        [41.69,  44.83],
  'Yerevan':        [40.18,  44.51], 'Baku':           [40.41,  49.87],
  // ── Africa — North ───────────────────────────────────────────────────────
  'Cairo':          [30.05,  31.24], 'Alexandria':     [31.20,  29.92],
  'Casablanca':     [33.59,  -7.62], 'Rabat':          [34.02,  -6.85],
  'Tunis':          [36.82,  10.18], 'Algiers':        [36.74,   3.06],
  'Tripoli':        [32.90,  13.18], 'Khartoum':       [15.55,  32.53],
  // ── Africa — West ────────────────────────────────────────────────────────
  'Lagos':          [ 6.45,   3.39], 'Abuja':          [ 9.07,   7.40],
  'Accra':          [ 5.56,  -0.20], 'Dakar':          [14.72, -17.47],
  'Abidjan':        [ 5.36,  -4.01], 'Bamako':         [12.65,  -8.00],
  // ── Africa — East & Central ──────────────────────────────────────────────
  'Nairobi':        [-1.29,  36.82], 'Addis Ababa':    [ 9.03,  38.74],
  'Dar es Salaam':  [-6.79,  39.21], 'Kampala':        [ 0.32,  32.58],
  'Kinshasa':       [-4.32,  15.32], 'Luanda':         [-8.84,  13.23],
  // ── Africa — Southern ────────────────────────────────────────────────────
  'Johannesburg':   [-26.20, 28.04], 'Cape Town':      [-33.93, 18.42],
  'Harare':         [-17.82, 31.05], 'Lusaka':         [-15.42, 28.28],
  'Maputo':         [-25.97, 32.58], 'Windhoek':       [-22.56, 17.08],
  'Antananarivo':   [-18.91, 47.54],
  // ── Central Asia ─────────────────────────────────────────────────────────
  'Kabul':          [34.52,  69.18], 'Tashkent':       [41.30,  69.27],
  'Almaty':         [43.25,  76.95], 'Nur-Sultan':     [51.18,  71.45],
  'Bishkek':        [42.87,  74.59], 'Ashgabat':       [37.95,  58.39],
  'Dushanbe':       [38.56,  68.77],
  // ── South Asia ───────────────────────────────────────────────────────────
  'Mumbai':         [19.08,  72.88], 'Delhi':          [28.66,  77.23],
  'Bangalore':      [12.97,  77.56], 'Chennai':        [13.08,  80.27],
  'Hyderabad':      [17.39,  78.47], 'Kolkata':        [22.57,  88.36],
  'Ahmedabad':      [23.03,  72.58], 'Pune':           [18.52,  73.86],
  'Karachi':        [24.86,  67.01], 'Lahore':         [31.56,  74.35],
  'Islamabad':      [33.72,  73.04], 'Dhaka':          [23.72,  90.41],
  'Kathmandu':      [27.72,  85.32], 'Colombo':        [ 6.93,  79.85],
  'Malé':           [ 4.18,  73.51], 'Thimphu':        [27.47,  89.64],
  // ── Southeast Asia ───────────────────────────────────────────────────────
  'Bangkok':        [13.75, 100.50], 'Chiang Mai':     [18.78,  98.98],
  'Hanoi':          [21.03, 105.85], 'Ho Chi Minh City':[10.82, 106.63],
  'Singapore':      [ 1.35, 103.82], 'Kuala Lumpur':   [ 3.14, 101.69],
  'Jakarta':        [-6.21, 106.85], 'Bali':           [-8.67, 115.21],
  'Makassar':       [-5.13, 119.42], 'Surabaya':       [-7.25, 112.75],
  'Manila':         [14.60, 120.98], 'Cebu':           [10.31, 123.89],
  'Phnom Penh':     [11.57, 104.92], 'Vientiane':      [17.97, 102.63],
  'Yangon':         [16.87,  96.12], 'Naypyidaw':      [19.74,  96.13],
  'Brunei':         [ 4.94, 114.95], 'Dili':           [-8.56, 125.58],
  // ── East Asia ────────────────────────────────────────────────────────────
  'Tokyo':          [35.68, 139.69], 'Osaka':          [34.69, 135.50],
  'Sapporo':        [43.07, 141.35], 'Beijing':        [39.91, 116.39],
  'Shanghai':       [31.23, 121.47], 'Shenzhen':       [22.54, 114.06],
  'Guangzhou':      [23.13, 113.26], 'Chengdu':        [30.66, 104.07],
  'Chongqing':      [29.56, 106.55], 'Hong Kong':      [22.32, 114.17],
  'Taipei':         [25.05, 121.53], 'Seoul':          [37.57, 126.98],
  'Busan':          [35.10, 129.03], 'Ulaanbaatar':    [47.91, 106.91],
  // ── Pacific / Oceania ────────────────────────────────────────────────────
  'Sydney':         [-33.87, 151.21], 'Melbourne':     [-37.81, 144.96],
  'Brisbane':       [-27.47, 153.02], 'Perth':         [-31.95, 115.86],
  'Adelaide':       [-34.93, 138.60], 'Darwin':        [-12.46, 130.84],
  'Canberra':       [-35.28, 149.13], 'Auckland':      [-36.87, 174.77],
  'Wellington':     [-41.29, 174.78], 'Christchurch':  [-43.53, 172.64],
  'Suva':           [-18.14, 178.44], 'Port Moresby':  [ -9.44, 147.18],
  'Guam':           [ 13.46, 144.80], 'Noumea':        [-22.28, 166.46],
  'Papeete':        [-17.53,-149.57], 'Apia':          [-13.83,-171.77],
  'Nuku\'alofa':    [-21.14,-175.20], 'Honiara':       [ -9.43, 160.05],
};

// ── Detailed land polygons [lat, lng][] ───────────────────────────────────────
// NO rectangular desert/tundra/ice here — all biomes handled per-pixel
const GREEN_LANDS: Array<Array<[number, number]>> = [
  // North America (detailed)
  [
    [71,-156],[69,-141],[65,-138],[60,-140],[59,-136],[57,-134],[55,-130],[50,-127],
    [48,-124],[46,-124],[43,-124],[39,-122],[34,-120],[30,-116],[24,-110],[22,-105],
    [20,-105],[19,-96],[16,-90],[15,-89],[15,-85],[10,-85],[8,-77],[10,-75],[12,-72],
    [16,-62],[18,-66],[20,-72],[24,-78],[26,-80],[28,-81],[30,-81],[32,-80],[34,-77],
    [36,-76],[38,-75],[40,-74],[42,-70],[44,-68],[46,-64],[47,-53],[50,-55],[52,-56],
    [56,-60],[58,-64],[60,-64],[62,-68],[64,-64],[66,-62],[68,-66],[70,-68],[71,-70],
    [72,-78],[72,-100],[71,-120],[71,-140],[71,-156],
  ],
  // Alaska peninsula
  [
    [71,-156],[68,-166],[65,-168],[62,-165],[58,-152],[56,-160],[54,-165],[56,-160],
    [58,-152],[60,-148],[62,-145],[64,-141],[66,-140],[68,-141],[71,-156],
  ],
  // Greenland
  [
    [83,-30],[80,-18],[77,-18],[73,-22],[69,-28],[65,-38],[65,-50],[67,-58],
    [70,-54],[72,-55],[74,-58],[76,-64],[78,-68],[80,-60],[82,-48],[83,-30],
  ],
  // Central America
  [
    [22,-90],[18,-88],[15,-89],[14,-87],[12,-86],[10,-84],[8,-77],[9,-76],
    [10,-75],[11,-74],[12,-72],[16,-62],[18,-64],[20,-72],[22,-90],
  ],
  // South America (detailed)
  [
    [12,-72],[10,-62],[8,-60],[6,-58],[4,-52],[2,-50],[0,-50],[0,-52],
    [-2,-50],[-3,-42],[-5,-35],[-8,-35],[-10,-37],[-12,-38],[-14,-39],
    [-16,-39],[-20,-40],[-22,-41],[-24,-43],[-26,-48],[-28,-49],[-30,-50],
    [-32,-52],[-34,-52],[-36,-57],[-38,-57],[-40,-62],[-42,-64],[-44,-66],
    [-46,-66],[-50,-68],[-52,-68],[-55,-66],[-54,-64],[-52,-60],[-50,-58],
    [-46,-54],[-40,-60],[-36,-58],[-32,-52],[-26,-50],[-20,-40],[-14,-40],
    [-8,-35],[-4,-36],[0,-50],[2,-52],[4,-52],[6,-56],[8,-60],[10,-62],
    [12,-72],
  ],
  // Europe (Atlantic coast to East)
  [
    [71,28],[68,28],[65,25],[61,25],[58,22],[56,14],[54,10],[52,5],
    [50,2],[48,-2],[46,0],[44,-2],[42,-8],[38,-8],[36,-6],[36,2],
    [38,4],[40,4],[42,8],[43,14],[44,14],[46,14],[47,12],[48,16],
    [50,14],[52,14],[54,18],[55,22],[57,24],[59,28],[62,28],[65,28],
    [68,28],[71,28],
  ],
  // Scandinavia
  [
    [71,28],[68,28],[65,14],[60,5],[57,8],[58,11],[60,12],[62,14],
    [64,14],[66,16],[68,18],[70,20],[72,22],[74,20],[76,20],[71,28],
  ],
  // Iberian Peninsula
  [
    [44,-8],[42,-8],[38,-8],[36,-6],[36,-5],[36,0],[38,4],[40,4],[42,3],
    [43,2],[44,2],[44,-2],[44,-8],
  ],
  // Italian Peninsula
  [
    [44,8],[43,12],[41,14],[40,16],[38,16],[38,15],[38,14],[39,16],
    [40,18],[41,16],[42,14],[44,12],[46,12],[46,10],[44,8],
  ],
  // British Isles (Great Britain)
  [
    [58,-3],[57,-6],[55,-6],[53,-4],[51,-3],[50,-5],[50,-3],[51,-1],
    [52,0],[53,0],[54,-1],[55,-2],[56,-4],[57,-3],[58,-3],
  ],
  // Ireland
  [
    [55,-8],[53,-10],[52,-10],[51,-10],[52,-6],[54,-6],[55,-6],[55,-8],
  ],
  // Africa (detailed)
  [
    [37,10],[36,3],[33,-8],[28,-13],[22,-16],[15,-17],[10,-16],[5,-5],
    [2,8],[0,10],[-5,12],[-8,14],[-10,14],[-14,12],[-18,12],[-22,14],
    [-26,16],[-34,18],[-34,26],[-30,30],[-28,32],[-26,33],[-18,35],
    [-12,40],[-10,40],[-1,42],[5,42],[10,42],[12,44],[14,42],[18,42],
    [20,40],[22,37],[24,36],[28,34],[30,33],[32,32],[35,36],[37,36],
    [37,28],[37,10],
  ],
  // Arabia + Levant
  [
    [37,36],[35,36],[33,36],[32,36],[30,35],[28,35],[24,38],[20,42],
    [16,43],[14,44],[12,44],[10,44],[10,46],[12,48],[16,52],[20,58],
    [22,60],[24,58],[24,56],[26,56],[28,56],[30,48],[32,48],[34,42],
    [36,38],[37,36],
  ],
  // East Africa + Horn
  [
    [12,44],[10,44],[8,45],[6,46],[4,42],[2,42],[0,42],[-1,42],
    [-5,40],[-10,40],[-12,40],[10,42],[12,44],
  ],
  // Russian landmass (Europe + Siberia simplified)
  [
    [71,28],[68,40],[65,58],[60,62],[55,60],[50,58],[46,52],[42,52],
    [38,48],[35,40],[37,36],[40,42],[42,50],[45,50],[48,50],[50,60],
    [55,60],[60,62],[65,65],[68,72],[70,82],[72,92],[68,100],[65,108],
    [60,108],[55,108],[52,108],[48,112],[45,118],[42,124],[40,122],
    [42,132],[46,135],[48,138],[50,140],[52,142],[54,142],[56,138],
    [58,130],[60,120],[62,120],[65,112],[68,108],[70,102],[72,108],
    [72,120],[70,128],[66,132],[64,140],[62,148],[60,152],[58,158],
    [60,162],[62,164],[64,162],[66,160],[68,162],[70,160],[72,158],
    [70,148],[68,138],[70,130],[72,118],[74,108],[74,90],[72,72],
    [71,60],[72,48],[71,28],
  ],
  // Indian subcontinent (detailed)
  [
    [30,68],[28,72],[24,70],[20,72],[18,74],[16,74],[14,76],[12,78],
    [8,78],[8,77],[8,80],[10,80],[12,80],[14,80],[18,82],[20,86],
    [22,88],[22,90],[24,90],[24,88],[26,90],[26,94],[28,98],[30,78],
    [32,78],[32,74],[30,68],
  ],
  // SE Asia peninsula
  [
    [28,98],[26,98],[22,100],[18,100],[16,98],[12,100],[8,100],[4,102],
    [1,104],[4,102],[8,98],[10,98],[14,100],[18,100],[22,100],[24,98],
    [26,100],[28,98],
  ],
  // Malay Peninsula + Singapore
  [
    [6,102],[4,102],[2,104],[1,104],[2,104],[4,104],[6,102],
  ],
  // East Asia (China/Korea coast)
  [
    [50,120],[48,126],[44,128],[42,130],[40,122],[38,120],[36,122],
    [34,120],[30,122],[26,120],[22,114],[20,110],[18,110],[16,108],
    [12,108],[10,104],[10,106],[14,108],[18,110],[22,114],[26,120],
    [30,122],[34,120],[36,122],[38,122],[40,122],[42,130],[44,128],
    [46,130],[48,132],[50,132],[52,130],[52,120],[50,120],
  ],
  // Japan (Honshu + Kyushu + Shikoku)
  [
    [32,130],[33,130],[34,131],[34,133],[35,136],[36,138],[37,140],
    [38,141],[39,141],[40,140],[41,140],[41,141],[40,142],[39,142],
    [38,141],[37,140],[36,138],[35,136],[34,133],[33,130],[32,130],
  ],
  // Japan Hokkaido
  [
    [42,141],[43,141],[44,142],[44,144],[43,145],[42,144],[42,141],
  ],
  // Indonesian archipelago (Sumatra)
  [
    [5,96],[3,98],[0,100],[-4,104],[-6,106],[-5,108],[-2,108],
    [0,106],[2,104],[4,100],[5,96],
  ],
  // Java
  [
    [-6,106],[-6,108],[-7,108],[-8,114],[-8,116],[-7,114],[-6,110],[-6,106],
  ],
  // Borneo
  [
    [7,116],[4,118],[1,118],[-1,116],[-2,116],[-2,118],[0,118],[2,116],
    [4,118],[5,118],[6,116],[7,116],
  ],
  // Philippines (Luzon)
  [
    [14,120],[16,120],[18,122],[18,120],[16,118],[14,120],
  ],
  // Australia (detailed)
  [
    [-14,128],[-16,136],[-18,140],[-20,148],[-24,152],[-28,154],
    [-32,152],[-36,150],[-38,146],[-38,140],[-36,136],[-34,136],
    [-32,134],[-30,132],[-28,128],[-26,114],[-22,114],[-18,122],[-14,128],
  ],
  // New Zealand North
  [[-36,174],[-38,176],[-40,176],[-40,174],[-38,172],[-36,174]],
  // New Zealand South
  [[-44,168],[-46,168],[-46,170],[-44,172],[-42,172],[-42,170],[-44,168]],
  // Madagascar
  [
    [-12,50],[-14,48],[-16,44],[-20,44],[-24,44],[-26,46],[-24,48],
    [-20,48],[-16,50],[-12,50],
  ],
  // Sri Lanka
  [[8,80],[7,80],[6,80],[7,82],[8,82],[8,80]],
  // Taiwan
  [[25,120],[24,122],[23,120],[24,120],[25,120]],
];

// ── Soft elliptical desert zones — smooth falloff, NO rectangles ──────────────
const DESERT_ZONES = [
  { lat: 24, lng: 10,   rlat: 14, rlng: 32 },  // Sahara
  { lat: 24, lng: 48,   rlat: 12, rlng: 16 },  // Arabian desert
  { lat: 32, lng: 62,   rlat: 10, rlng: 14 },  // Iranian plateau
  { lat: 26, lng: 71,   rlat:  7, rlng:  9 },  // Thar (India)
  { lat: 44, lng: 105,  rlat: 10, rlng: 22 },  // Gobi
  { lat: -27, lng: 124, rlat: 13, rlng: 22 },  // Australian outback
  { lat: -22, lng: -68, rlat: 22, rlng:  7 },  // Atacama / coastal Peru
  { lat: 35, lng: -114, rlat:  9, rlng: 16 },  // Mojave / Sonoran
  { lat: -48, lng: -67, rlat:  8, rlng: 12 },  // Patagonia
  { lat: 42, lng: 60,   rlat:  8, rlng: 20 },  // Central Asian steppe/arid
];

const TEX_W = 720;
const TEX_H = 360;
const SIZE = 290;
const BASE_R = 132;
const STRIDE = 1;

function toTexCoords(lat: number, lng: number): [number, number] {
  return [(lng + 180) / 360 * TEX_W, (90 - lat) / 180 * TEX_H];
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

function getDesertFactor(lat: number, lng: number): number {
  let maxF = 0;
  for (const d of DESERT_ZONES) {
    const dlat = lat - d.lat;
    // Longitude wrapping
    let dlng = ((lng - d.lng + 540) % 360) - 180;
    const dist2 = (dlat / d.rlat) ** 2 + (dlng / d.rlng) ** 2;
    if (dist2 < 1) maxF = Math.max(maxF, Math.pow(1 - Math.sqrt(dist2), 1.5));
  }
  return maxF;
}

function getLandColor(lat: number, lng: number): [number, number, number] {
  const absLat = Math.abs(lat);
  const desertF = getDesertFactor(lat, lng);

  // Polar ice (smooth gradient 60→75)
  const iceF = absLat > 75 ? 1 : absLat > 60 ? (absLat - 60) / 15 : 0;

  // Tundra / boreal (50→65)
  const tundraF = iceF > 0 ? 0 : absLat > 60 ? 1 : absLat > 50 ? (absLat - 50) / 10 : 0;

  // Tropical forest (< 12°)
  const tropF = absLat < 8 ? 1 : absLat < 18 ? (18 - absLat) / 10 : 0;

  // Mediterranean / subtropical dry (22–35°)
  const medF = (absLat > 22 && absLat < 36) ? Math.min(1, Math.min(absLat - 22, 36 - absLat) / 6) : 0;

  // Base temperate green
  let r = 52, g = 118, b = 46;

  // Tropical: richer dark green
  r = lerp(r, 28, tropF);
  g = lerp(g, 100, tropF);
  b = lerp(b, 30, tropF);

  // Mediterranean / dry-temperate: yellower green
  r = lerp(r, 110, medF * 0.35);
  g = lerp(g, 130, medF * 0.20);
  b = lerp(b, 40,  medF * 0.25);

  // Tundra: olive grey-green
  r = lerp(r, 105, tundraF);
  g = lerp(g, 118, tundraF);
  b = lerp(b,  85, tundraF);

  // Desert: sandy, smooth blend
  r = lerp(r, 190, desertF);
  g = lerp(g, 158, desertF);
  b = lerp(b,  82, desertF);

  // Ice: white-blue
  r = lerp(r, 215, iceF);
  g = lerp(g, 228, iceF);
  b = lerp(b, 238, iceF);

  return [Math.round(r), Math.round(g), Math.round(b)];
}

function getOceanColor(lat: number): [number, number, number] {
  const absLat = Math.abs(lat);
  if (absLat > 72) {
    const t = Math.min(1, (absLat - 72) / 18);
    return [lerp(18, 155, t), lerp(50, 195, t), lerp(148, 215, t)];
  }
  if (absLat > 52) {
    const t = (absLat - 52) / 20;
    return [lerp(10, 18, t), lerp(32, 50, t), lerp(142, 148, t)];
  }
  if (absLat < 18) {
    const t = (18 - absLat) / 18;
    return [lerp(10, 7, t), lerp(32, 22, t), lerp(142, 115, t)];
  }
  return [10, 32, 142];
}

function buildTexture(): ImageData {
  // Step 1 — land mask (draw all land polygons as white on black)
  const maskCanvas = document.createElement('canvas');
  maskCanvas.width = TEX_W; maskCanvas.height = TEX_H;
  const mctx = maskCanvas.getContext('2d');
  if (!mctx) return new ImageData(TEX_W, TEX_H);
  mctx.fillStyle = '#000'; mctx.fillRect(0, 0, TEX_W, TEX_H);
  mctx.fillStyle = '#fff';
  GREEN_LANDS.forEach(poly => {
    mctx.beginPath();
    poly.forEach(([la, lo], i) => {
      const [tx, ty] = toTexCoords(la, lo);
      if (i === 0) mctx.moveTo(tx, ty); else mctx.lineTo(tx, ty);
    });
    mctx.closePath(); mctx.fill();
  });
  const mask = mctx.getImageData(0, 0, TEX_W, TEX_H).data;

  // Step 2 — per-pixel biome coloring
  const raw = new Uint8ClampedArray(TEX_W * TEX_H * 4);
  for (let ty = 0; ty < TEX_H; ty++) {
    const lat = 90 - (ty / TEX_H) * 180;
    for (let tx = 0; tx < TEX_W; tx++) {
      const lng = (tx / TEX_W) * 360 - 180;
      const isLand = mask[(ty * TEX_W + tx) * 4] > 128;
      const [r, g, b] = isLand ? getLandColor(lat, lng) : getOceanColor(lat);
      const i = (ty * TEX_W + tx) * 4;
      raw[i] = r; raw[i+1] = g; raw[i+2] = b; raw[i+3] = 255;
    }
  }

  // Step 3 — draw subtle coastline borders + clouds on top
  const finalCanvas = document.createElement('canvas');
  finalCanvas.width = TEX_W; finalCanvas.height = TEX_H;
  const fctx = finalCanvas.getContext('2d');
  if (!fctx) return new ImageData(raw, TEX_W, TEX_H);

  fctx.putImageData(new ImageData(raw, TEX_W, TEX_H), 0, 0);

  // Subtle coastline stroke on all land polys
  GREEN_LANDS.forEach(poly => {
    fctx.beginPath();
    poly.forEach(([la, lo], i) => {
      const [tx, ty] = toTexCoords(la, lo);
      if (i === 0) fctx.moveTo(tx, ty); else fctx.lineTo(tx, ty);
    });
    fctx.closePath();
    fctx.strokeStyle = 'rgba(20,60,20,0.25)';
    fctx.lineWidth = 0.7;
    fctx.stroke();
  });

  // Wispy cloud patches
  fctx.globalAlpha = 0.16;
  for (let i = 0; i < 24; i++) {
    const cx = (i * 137 + 55) % TEX_W;
    const cy = 30 + (i * 79) % (TEX_H - 60);
    const rw = 35 + (i * 23) % 100;
    const rh = 8 + (i * 17) % 22;
    const cloud = fctx.createRadialGradient(cx, cy, 0, cx, cy, rw);
    cloud.addColorStop(0, 'rgba(255,255,255,0.9)');
    cloud.addColorStop(1, 'rgba(255,255,255,0)');
    fctx.fillStyle = cloud;
    fctx.save(); fctx.scale(1, rh / rw);
    fctx.beginPath(); fctx.arc(cx, cy * (rw / rh), rw, 0, Math.PI * 2); fctx.fill();
    fctx.restore();
  }
  fctx.globalAlpha = 1;

  return fctx.getImageData(0, 0, TEX_W, TEX_H);
}

// ── Sphere math ───────────────────────────────────────────────────────────────
function slerp(a: [number,number,number], b: [number,number,number], t: number): [number,number,number] {
  const dot = Math.max(-1, Math.min(1, a[0]*b[0]+a[1]*b[1]+a[2]*b[2]));
  const om = Math.acos(dot);
  if (Math.abs(om) < 1e-6) return a;
  const s = 1 / Math.sin(om);
  return [
    (Math.sin((1-t)*om)*s)*a[0] + (Math.sin(t*om)*s)*b[0],
    (Math.sin((1-t)*om)*s)*a[1] + (Math.sin(t*om)*s)*b[1],
    (Math.sin((1-t)*om)*s)*a[2] + (Math.sin(t*om)*s)*b[2],
  ];
}

function toVec(lat: number, lng: number): [number,number,number] {
  const p = lat*Math.PI/180, l = lng*Math.PI/180;
  return [Math.cos(p)*Math.cos(l), Math.sin(p), Math.cos(p)*Math.sin(l)];
}

function toLatlng(v: [number,number,number]): [number,number] {
  return [Math.asin(v[1])*180/Math.PI, Math.atan2(v[2],v[0])*180/Math.PI];
}

function project(lat: number, lng: number, angle: number, tilt: number, R: number) {
  const phi = lat*Math.PI/180, lam = lng*Math.PI/180 + angle;
  const x0 = Math.cos(phi)*Math.sin(lam);
  const y0 = Math.sin(phi);
  const z0 = Math.cos(phi)*Math.cos(lam);
  const cosT = Math.cos(tilt), sinT = Math.sin(tilt);
  return { x: SIZE/2 + R*x0, y: SIZE/2 - R*(y0*cosT - z0*sinT), z: y0*sinT + z0*cosT };
}

function drawAirplane(ctx: CanvasRenderingContext2D, px: number, py: number, heading: number, sc: number, alpha: number) {
  ctx.save();
  ctx.translate(px, py); ctx.rotate(heading);
  ctx.globalAlpha = alpha;
  ctx.shadowColor = 'rgba(0,0,0,0.7)'; ctx.shadowBlur = 5;
  ctx.fillStyle = 'rgba(255,255,255,0.97)';
  ctx.beginPath();
  ctx.moveTo(0,-sc*8); ctx.lineTo(sc*1.4,sc*2); ctx.lineTo(sc*0.7,sc*4.5);
  ctx.lineTo(0,sc*4); ctx.lineTo(-sc*0.7,sc*4.5); ctx.lineTo(-sc*1.4,sc*2); ctx.closePath(); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-sc*0.6,sc*0.5); ctx.lineTo(-sc*7,sc*4); ctx.lineTo(-sc*5.5,sc*5.2); ctx.lineTo(-sc*0.9,sc*2.2); ctx.closePath(); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(sc*0.6,sc*0.5); ctx.lineTo(sc*7,sc*4); ctx.lineTo(sc*5.5,sc*5.2); ctx.lineTo(sc*0.9,sc*2.2); ctx.closePath(); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(0,sc*3.5); ctx.lineTo(-sc*2.5,sc*6.5); ctx.lineTo(-sc*1.8,sc*7);
  ctx.lineTo(0,sc*5.2); ctx.lineTo(sc*1.8,sc*7); ctx.lineTo(sc*2.5,sc*6.5); ctx.closePath(); ctx.fill();
  ctx.globalAlpha = 1; ctx.shadowBlur = 0; ctx.restore();
}

interface PlaneState { toIdx: number; t: number; trail: Array<[number,number]>; pauseFrames: number; }

export default function GlobeWidget({ sourceCity, targetCities }: {
  sourceCity: City; targetCities: City[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ angle: 0, tilt: 0.12, raf: 0, dragging: false, lastX: 0, lastY: 0, velX: 0, manualMode: false, zoom: 1.0, pinchDist: 0 });
  const planeRef = useRef<PlaneState>({ toIdx: 0, t: 0, trail: [], pauseFrames: 0 });
  const texRef = useRef<ImageData | null>(null);
  const [tooltip, setTooltip] = useState<{ name: string; tz: string } | null>(null);

  const depsKey = sourceCity.name + '|' + targetCities.map(c => c.name).join(',');

  useEffect(() => { if (!texRef.current) texRef.current = buildTexture(); }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    if (!canvas || !overlay) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = SIZE; canvas.height = SIZE;
    canvas.style.width = SIZE + 'px'; canvas.style.height = SIZE + 'px';
    const ctx = canvas.getContext('2d')!;

    overlay.width = SIZE * DPR; overlay.height = SIZE * DPR;
    overlay.style.width = SIZE + 'px'; overlay.style.height = SIZE + 'px';
    const octx = overlay.getContext('2d')!;
    octx.scale(DPR, DPR);

    const allCities = [
      { city: sourceCity, isSource: true },
      ...targetCities.map(c => ({ city: c, isSource: false })),
    ].filter(({ city }) => CITY_COORDS[city.name]);

    const routeTargets = allCities.filter(c => !c.isSource);
    const plane = planeRef.current;
    plane.toIdx = routeTargets.length > 0 ? 0 : -1;
    plane.t = 0; plane.trail = []; plane.pauseFrames = 0;

    function getR() { return BASE_R * stateRef.current.zoom; }

    function renderGlobe() {
      const tex = texRef.current;
      if (!tex) return;
      const s = stateRef.current;
      const R = getR();
      const texD = tex.data;
      const imgData = ctx.createImageData(SIZE, SIZE);
      const out = imgData.data;
      const cosT = Math.cos(s.tilt), sinT = Math.sin(s.tilt);
      const angle = s.angle;
      const LX = 0.55, LY = 0.42, LZ = 0.72;
      const CX = SIZE / 2, CY = SIZE / 2;

      for (let py = 0; py < SIZE; py += STRIDE) {
        const ny = (CY - py - 0.5) / R;
        const ny2 = ny * ny;
        for (let px = 0; px < SIZE; px += STRIDE) {
          const nx = (px + 0.5 - CX) / R;
          const r2 = nx * nx + ny2;
          if (r2 >= 1) continue;
          const nzF = Math.sqrt(1 - r2);
          const wy = ny * cosT + nzF * sinT;
          const wz = -ny * sinT + nzF * cosT;
          const wx = nx;
          const lat = Math.asin(Math.max(-1, Math.min(1, wy))) * 180 / Math.PI;
          const lngRad = Math.atan2(wx, wz) - angle;
          const lng = ((lngRad * 180 / Math.PI) % 360 + 540) % 360 - 180;
          const ttx = Math.min(TEX_W - 1, Math.max(0, Math.floor(((lng + 180) / 360) * TEX_W)));
          const tty = Math.min(TEX_H - 1, Math.max(0, Math.floor(((90 - lat) / 180) * TEX_H)));
          const ti = (tty * TEX_W + ttx) * 4;
          const tr = texD[ti], tg = texD[ti+1], tb = texD[ti+2];
          const dotL = wx * LX + wy * LY + wz * LZ;
          const lambert = Math.max(0.07, dotL);
          const isWater = tb > 80 && tr < 100;
          const isIce = tr > 170 && tg > 185 && tb > 210;
          let spec = 0;
          if (isWater || isIce) {
            const hLen = Math.sqrt(LX*LX + LY*LY + (LZ+1)*(LZ+1));
            const hDot = wx*(LX/hLen) + wy*(LY/hLen) + wz*((LZ+1)/hLen);
            spec = Math.pow(Math.max(0, hDot), isIce ? 22 : 38) * (isIce ? 65 : 130);
          }
          const nightF = dotL < 0 ? Math.max(0.05, 1 + dotL * 1.2) : 1;
          const i = (py * SIZE + px) * 4;
          out[i]   = Math.min(255, tr * lambert * nightF + spec);
          out[i+1] = Math.min(255, tg * lambert * nightF + spec * 0.95);
          out[i+2] = Math.min(255, tb * lambert * nightF + spec);
          out[i+3] = 255;
        }
      }
      ctx.putImageData(imgData, 0, 0);

      const atm = ctx.createRadialGradient(CX, CY, R * 0.88, CX, CY, R * 1.06);
      atm.addColorStop(0, 'rgba(80,145,255,0)');
      atm.addColorStop(0.5, 'rgba(100,170,255,0.22)');
      atm.addColorStop(1, 'rgba(40,100,220,0)');
      ctx.fillStyle = atm;
      ctx.beginPath(); ctx.arc(CX, CY, R * 1.06, 0, Math.PI * 2); ctx.fill();

      ctx.save();
      ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.clip();
      const gl = ctx.createRadialGradient(CX - R*0.32, CY - R*0.32, 0, CX, CY, R);
      gl.addColorStop(0, 'rgba(255,255,255,0.2)');
      gl.addColorStop(0.4, 'rgba(255,255,255,0.04)');
      gl.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gl; ctx.fillRect(0, 0, SIZE, SIZE);
      const edge = ctx.createRadialGradient(CX, CY, R * 0.55, CX, CY, R);
      edge.addColorStop(0, 'rgba(0,0,0,0)');
      edge.addColorStop(1, 'rgba(0,0,0,0.55)');
      ctx.fillStyle = edge; ctx.fillRect(0, 0, SIZE, SIZE);
      ctx.restore();
    }

    function renderOverlay(ts: number) {
      octx.clearRect(0, 0, SIZE, SIZE);
      const s = stateRef.current;
      const R = getR();
      const angle = s.angle, tilt = s.tilt;

      if (routeTargets.length > 0 && plane.toIdx >= 0) {
        const srcC = CITY_COORDS[sourceCity.name];
        const dstC = CITY_COORDS[routeTargets[plane.toIdx].city.name];
        if (srcC && dstC) {
          const vA = toVec(srcC[0], srcC[1]);
          const vB = toVec(dstC[0], dstC[1]);

          octx.save();
          octx.beginPath(); octx.arc(SIZE/2, SIZE/2, R, 0, Math.PI*2); octx.clip();
          octx.setLineDash([3, 5]); octx.lineWidth = 1;
          octx.strokeStyle = 'rgba(255,255,255,0.28)';
          octx.beginPath(); let arcOk = false;
          for (let i = 0; i <= 80; i++) {
            const v = slerp(vA, vB, i/80);
            const [la, lo] = toLatlng(v);
            const p = project(la, lo, angle, tilt, R);
            if (p.z < 0) { arcOk = false; continue; }
            if (!arcOk) { octx.moveTo(p.x, p.y); arcOk = true; } else octx.lineTo(p.x, p.y);
          }
          octx.stroke(); octx.setLineDash([]); octx.restore();

          if (plane.pauseFrames > 0) { plane.pauseFrames--; }
          else {
            plane.t += 0.0028;
            if (plane.t >= 1) {
              plane.t = 0; plane.trail = [];
              plane.pauseFrames = 40;
              plane.toIdx = (plane.toIdx + 1) % routeTargets.length;
            }
          }

          const vP = slerp(vA, vB, Math.min(plane.t, 1));
          const [plat, plng] = toLatlng(vP);
          const pPos = project(plat, plng, angle, tilt, R);
          plane.trail.push([pPos.x, pPos.y]);
          if (plane.trail.length > 36) plane.trail.shift();

          if (pPos.z > 0.05) {
            octx.save();
            octx.beginPath(); octx.arc(SIZE/2, SIZE/2, R, 0, Math.PI*2); octx.clip();
            for (let i = 1; i < plane.trail.length; i++) {
              octx.beginPath();
              octx.moveTo(plane.trail[i-1][0], plane.trail[i-1][1]);
              octx.lineTo(plane.trail[i][0], plane.trail[i][1]);
              octx.strokeStyle = `rgba(255,215,60,${(i / plane.trail.length) * 0.65})`;
              octx.lineWidth = 2.2;
              octx.stroke();
            }
            octx.restore();

            const vN = slerp(vA, vB, Math.min(plane.t + 0.018, 1));
            const [nl, ng] = toLatlng(vN);
            const pN = project(nl, ng, angle, tilt, R);
            const heading = Math.atan2(pN.x - pPos.x, -(pN.y - pPos.y));
            octx.save();
            octx.beginPath(); octx.arc(SIZE/2, SIZE/2, R, 0, Math.PI*2); octx.clip();
            drawAirplane(octx, pPos.x, pPos.y, heading, 1.15 * s.zoom, Math.max(0, Math.min(1, pPos.z * 1.4)));
            octx.restore();
          }
        }
      }

      allCities
        .map(({ city, isSource }) => ({ ...project(CITY_COORDS[city.name]![0], CITY_COORDS[city.name]![1], angle, tilt, R), city, isSource }))
        .filter(p => p.z > 0)
        .sort((a, b) => a.z - b.z)
        .forEach(p => {
          const alpha = Math.max(0, 0.4 + p.z * 0.6);
          if (p.isSource) {
            octx.beginPath(); octx.arc(p.x, p.y, 9 + (Math.sin(ts/500)+1)/2 * 5, 0, Math.PI*2);
            octx.fillStyle = `rgba(80,227,194,${0.2*alpha})`; octx.fill();
            const g = octx.createRadialGradient(p.x-1, p.y-1, 0, p.x, p.y, 7);
            g.addColorStop(0, `rgba(220,255,250,${alpha})`);
            g.addColorStop(1, `rgba(80,227,194,${alpha})`);
            octx.beginPath(); octx.arc(p.x, p.y, 7, 0, Math.PI*2);
            octx.fillStyle = g; octx.fill();
          } else {
            const g = octx.createRadialGradient(p.x-0.5, p.y-0.5, 0, p.x, p.y, 5.5);
            g.addColorStop(0, `rgba(255,240,140,${alpha})`);
            g.addColorStop(1, `rgba(251,191,36,${alpha})`);
            octx.beginPath(); octx.arc(p.x, p.y, 5.5, 0, Math.PI*2);
            octx.fillStyle = g; octx.fill();
          }
          const la = Math.max(0, (p.z - 0.06) / 0.94);
          if (la > 0.06 && s.zoom >= 0.8) {
            const tz = p.city.timezone.split('/')[1]?.replace(/_/g, ' ') ?? p.city.timezone;
            octx.save();
            octx.font = `${p.isSource ? 700 : 500} ${9 * s.zoom}px ui-monospace,monospace`;
            octx.textAlign = 'center';
            octx.shadowColor = 'rgba(0,0,0,1)'; octx.shadowBlur = 6;
            octx.fillStyle = p.isSource ? `rgba(160,255,230,${la})` : `rgba(255,230,100,${la})`;
            octx.fillText(tz.length > 12 ? tz.slice(0, 11) + '…' : tz, p.x, p.y + (p.isSource ? 19 : 16));
            octx.restore();
          }
        });

      void ts;
    }

    function frame(ts: number) {
      const s = stateRef.current;
      if (!s.dragging && !s.manualMode) s.angle += 0.0008;
      else if (!s.dragging && s.manualMode) {
        s.velX *= 0.94; s.angle += s.velX;
        if (Math.abs(s.velX) < 0.0002) s.manualMode = false;
      }
      renderGlobe();
      renderOverlay(ts);
      s.raf = requestAnimationFrame(frame);
    }

    const onDown = (e: MouseEvent) => {
      stateRef.current.dragging = true;
      stateRef.current.lastX = e.clientX; stateRef.current.lastY = e.clientY;
      stateRef.current.velX = 0; overlay.style.cursor = 'grabbing';
    };
    const onMove = (e: MouseEvent) => {
      const s = stateRef.current;
      if (!s.dragging) {
        const rect = overlay.getBoundingClientRect();
        const mx = (e.clientX - rect.left) * (SIZE / rect.width);
        const my = (e.clientY - rect.top) * (SIZE / rect.height);
        let hit: { name: string; tz: string } | null = null;
        for (const { city, isSource } of allCities) {
          const c = CITY_COORDS[city.name]!;
          const p = project(c[0], c[1], s.angle, s.tilt, getR());
          if (p.z < 0) continue;
          if (Math.hypot(mx - p.x, my - p.y) < (isSource ? 14 : 10)) { hit = { name: city.name, tz: city.timezone }; break; }
        }
        setTooltip(hit); overlay.style.cursor = hit ? 'pointer' : 'grab'; return;
      }
      const dx = e.clientX - s.lastX, dy = e.clientY - s.lastY;
      s.velX = dx * 0.007; s.angle += dx * 0.007;
      s.tilt = Math.max(-0.6, Math.min(0.6, s.tilt - dy * 0.005));
      s.lastX = e.clientX; s.lastY = e.clientY;
    };
    const onUp = () => { stateRef.current.dragging = false; stateRef.current.manualMode = true; overlay.style.cursor = 'grab'; };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      stateRef.current.zoom = Math.max(0.45, Math.min(2.6, stateRef.current.zoom + (e.deltaY > 0 ? -0.09 : 0.09)));
    };
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) { stateRef.current.pinchDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY); return; }
      const t = e.touches[0]; stateRef.current.dragging = true; stateRef.current.lastX = t.clientX; stateRef.current.lastY = t.clientY; stateRef.current.velX = 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault(); const s = stateRef.current;
      if (e.touches.length === 2) {
        const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        s.zoom = Math.max(0.45, Math.min(2.6, s.zoom + (d - s.pinchDist) * 0.006)); s.pinchDist = d; return;
      }
      if (!s.dragging) return;
      const t = e.touches[0]; const dx = t.clientX - s.lastX, dy = t.clientY - s.lastY;
      s.velX = dx * 0.007; s.angle += dx * 0.007;
      s.tilt = Math.max(-0.6, Math.min(0.6, s.tilt - dy * 0.005));
      s.lastX = t.clientX; s.lastY = t.clientY;
    };
    const onTouchEnd = () => { stateRef.current.dragging = false; stateRef.current.manualMode = true; };

    overlay.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    overlay.addEventListener('wheel', onWheel, { passive: false });
    overlay.addEventListener('touchstart', onTouchStart, { passive: false });
    overlay.addEventListener('touchmove', onTouchMove, { passive: false });
    overlay.addEventListener('touchend', onTouchEnd);
    overlay.style.cursor = 'grab';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reducedMotion) {
      stateRef.current.raf = requestAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const s = stateRef.current;
        if (entry.isIntersecting) {
          if (!s.raf) s.raf = requestAnimationFrame(frame);
        } else {
          if (s.raf) { cancelAnimationFrame(s.raf); s.raf = 0; }
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(stateRef.current.raf);
      observer.disconnect();
      overlay.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      overlay.removeEventListener('wheel', onWheel);
      overlay.removeEventListener('touchstart', onTouchStart);
      overlay.removeEventListener('touchmove', onTouchMove);
      overlay.removeEventListener('touchend', onTouchEnd);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depsKey]);

  const routeTargets = targetCities.filter(c => CITY_COORDS[c.name]);
  const zoomBy = (dir: 1 | -1) => { stateRef.current.zoom = Math.max(0.45, Math.min(2.6, stateRef.current.zoom + dir * 0.22)); };

  return (
    <div className="globe-widget">
      <div className="globe-header">
        <span className="globe-source-dot" />
        <span className="globe-source-name">{sourceCity.name}</span>
        {routeTargets.length > 0 && <>
          <span className="globe-route-arrow">→</span>
          <span className="globe-target-name">{routeTargets.map(c => c.name).join(', ')}</span>
        </>}
      </div>

      <div className="globe-canvas-wrap" style={{ position: 'relative', width: SIZE, height: SIZE }}>
        <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, borderRadius: '50%', display: 'block' }} />
        <canvas ref={overlayRef} style={{ position: 'absolute', top: 0, left: 0, borderRadius: '50%', display: 'block', background: 'transparent' }} />
        <div className="globe-zoom-btns">
          <button className="globe-zoom-btn" onClick={() => zoomBy(1)}>+</button>
          <button className="globe-zoom-btn" onClick={() => zoomBy(-1)}>−</button>
        </div>
        {tooltip && (
          <div className="globe-tooltip">
            <span className="globe-tooltip-name">{tooltip.name}</span>
            <span className="globe-tooltip-tz">{tooltip.tz.replace(/_/g, ' ')}</span>
          </div>
        )}
      </div>

      <div className="globe-legend">
        <span className="globe-legend-item"><span className="globe-legend-dot globe-legend-dot--src" />source</span>
        {routeTargets.length > 0 && <span className="globe-legend-item"><span className="globe-legend-dot globe-legend-dot--dst" />target</span>}
        {routeTargets.length > 0 && <span className="globe-legend-item"><span className="globe-legend-plane">✈</span>flight</span>}
        <span className="globe-drag-hint">scroll · drag · pinch</span>
      </div>
    </div>
  );
}
