import { useEffect, useRef, useState } from 'react';
import type { City } from '../lib/cities';

export const CITY_COORDS: Record<string, [number, number]> = {
  'New York': [40.71, -74.01], 'Chicago': [41.88, -87.63], 'Denver': [39.74, -104.98],
  'Los Angeles': [34.05, -118.24], 'Phoenix': [33.45, -112.07], 'Anchorage': [61.22, -149.90],
  'Honolulu': [21.31, -157.86], 'Toronto': [43.65, -79.38], 'Vancouver': [49.28, -123.12],
  'Mexico City': [19.43, -99.13], 'São Paulo': [-23.55, -46.63],
  'London': [51.51, -0.13], 'Paris': [48.86, 2.35], 'Berlin': [52.52, 13.40],
  'Amsterdam': [52.37, 4.90], 'Zurich': [47.38, 8.54], 'Stockholm': [59.33, 18.07],
  'Moscow': [55.75, 37.62], 'Istanbul': [41.01, 28.95], 'Athens': [37.98, 23.73],
  'Lisbon': [38.72, -9.14], 'Dubai': [25.20, 55.27], 'Riyadh': [24.69, 46.72],
  'Cairo': [30.05, 31.24], 'Nairobi': [-1.29, 36.82], 'Lagos': [6.45, 3.39],
  'Johannesburg': [-26.20, 28.04], 'Mumbai': [19.08, 72.88], 'Karachi': [24.86, 67.01],
  'Dhaka': [23.72, 90.41], 'Kathmandu': [27.72, 85.32], 'Colombo': [6.93, 79.85],
  'Bangkok': [13.75, 100.50], 'Singapore': [1.35, 103.82], 'Kuala Lumpur': [3.14, 101.69],
  'Jakarta': [-6.21, 106.85], 'Hong Kong': [22.32, 114.17], 'Beijing': [39.91, 116.39],
  'Taipei': [25.05, 121.53], 'Seoul': [37.57, 126.98], 'Tokyo': [35.68, 139.69],
  'Manila': [14.60, 120.98], 'Ho Chi Minh City': [10.82, 106.63],
  'Sydney': [-33.87, 151.21], 'Melbourne': [-37.81, 144.96],
};

// ── Equirectangular land polygons ─────────────────────────────────────────────
const GREEN_LANDS: Array<Array<[number, number]>> = [
  [[72,-140],[70,-95],[60,-95],[50,-90],[48,-88],[46,-84],[43,-82],[42,-79],[44,-66],[47,-53],[52,-55],[60,-64],[67,-62],[72,-78],[72,-100],[72,-140]],
  [[10,-85],[8,-77],[5,-77],[0,-78],[-5,-80],[-10,-76],[-18,-70],[-22,-43],[-34,-58],[-55,-68],[-55,-64],[-40,-62],[-22,-41],[-3,-60],[5,-60],[10,-60],[12,-70],[22,-90],[18,-88],[15,-87],[10,-85]],
  [[70,30],[65,25],[60,25],[55,24],[54,18],[52,14],[48,16],[46,14],[44,15],[40,18],[37,15],[36,5],[38,-10],[42,-8],[44,-8],[48,-2],[50,2],[52,5],[54,10],[56,10],[58,22],[62,25],[68,28],[70,30]],
  [[70,28],[65,14],[58,5],[57,8],[58,11],[60,12],[62,14],[64,14],[68,16],[70,20],[72,25],[70,28]],
  [[37,10],[36,3],[33,-8],[28,-13],[5,-5],[-5,10],[-18,12],[-34,18],[-34,26],[-28,32],[-18,35],[-10,40],[-1,42],[10,42],[12,44],[15,42],[22,37],[30,33],[37,10]],
  [[70,30],[68,42],[65,60],[60,62],[55,60],[50,58],[45,58],[42,54],[38,48],[35,36],[30,35],[25,57],[22,60],[12,44],[15,42],[22,37],[30,33],[35,38],[40,42],[45,44],[48,47],[50,60],[55,60],[60,62],[65,65],[68,72],[70,30]],
  [[30,68],[25,68],[18,73],[10,78],[8,77],[8,80],[6,80],[7,81],[10,79],[13,80],[14,80],[18,82],[22,88],[20,87],[22,90],[24,90],[24,88],[23,88],[27,88],[28,86],[30,78],[32,78],[32,74],[30,68]],
  [[28,98],[22,98],[18,98],[16,98],[10,100],[2,102],[1,104],[4,100],[10,100],[15,98],[20,94],[22,88],[24,94],[25,98],[28,98]],
  [[50,108],[48,110],[42,120],[38,120],[35,110],[30,120],[22,114],[22,108],[20,110],[18,110],[10,104],[10,106],[15,108],[22,114],[25,118],[30,122],[34,126],[36,130],[38,130],[40,124],[42,124],[45,126],[48,125],[50,120],[52,118],[50,108]],
  [[30,130],[34,129],[36,136],[38,141],[40,140],[42,140],[44,142],[44,144],[42,143],[40,141],[38,140],[36,138],[34,133],[32,130],[30,130]],
  [[5,95],[0,100],[-5,105],[-7,107],[-6,108],[-6,107],[0,108],[4,100],[5,95]],
  [[-16,136],[-20,148],[-28,154],[-38,148],[-38,147],[-32,152],[-28,154],[-20,148],[-16,136]],
  [[-34,172],[-40,175],[-46,170],[-45,168],[-40,172],[-34,172]],
  [[52,-10],[54,-8],[55,-6],[56,-6],[58,-4],[58,-3],[55,-2],[52,0],[51,0],[50,-5],[52,-5],[52,-10]],
  [[-12,50],[-16,48],[-26,44],[-25,46],[-18,48],[-12,50]],
];

const DESERT_LANDS: Array<[[number,number,number], Array<[number,number]>]> = [
  [[195,165,85], [[15,-18],[15,37],[35,37],[35,-18],[15,-18]]],
  [[200,165,80], [[12,42],[12,60],[32,60],[32,42],[12,42]]],
  [[185,155,95], [[24,58],[24,72],[38,72],[38,58],[24,58]]],
  [[198,168,95], [[22,68],[22,76],[30,76],[30,68],[22,68]]],
  [[180,160,110],[[38,90],[38,125],[50,125],[50,90],[38,90]]],
  [[185,130,65], [[-35,112],[-35,142],[-20,142],[-20,112],[-35,112]]],
  [[185,158,95], [[-35,-80],[0,-80],[0,-68],[-35,-68],[-35,-80]]],
  [[185,155,90], [[25,-125],[25,-100],[40,-100],[40,-125],[25,-125]]],
  [[160,145,105],[[-55,-75],[-55,-62],[-38,-62],[-38,-75],[-55,-75]]],
  [[175,150,100],[[36,50],[36,90],[50,90],[50,50],[36,50]]],
  [[195,162,85], [[0,40],[0,52],[15,52],[15,40],[0,40]]],
];

const TUNDRA_LANDS: Array<Array<[number,number]>> = [
  [[55,40],[55,180],[65,180],[65,40],[55,40]],
  [[55,-180],[55,-100],[65,-100],[65,-180],[55,-180]],
  [[-50,-80],[-50,180],[-60,180],[-60,-80],[-50,-80]],
];

const POLAR_ICE: Array<Array<[number,number]>> = [
  [[65,-180],[65,180],[90,180],[90,-180],[65,-180]],
  [[-60,-180],[-60,180],[-90,180],[-90,-180],[-60,-180]],
];

const SHALLOW_SEA: Array<Array<[number,number]>> = [
  [[10,-90],[10,-60],[25,-60],[25,-90],[10,-90]],
  [[30,-5],[30,36],[45,36],[45,-5],[30,-5]],
  [[-5,105],[-5,125],[20,125],[20,105],[-5,105]],
];

const TEX_W = 720;
const TEX_H = 360;
const SIZE = 290;
const BASE_R = 132;
const STRIDE = 1;

function toTexCoords(lat: number, lng: number): [number, number] {
  return [(lng + 180) / 360 * TEX_W, (90 - lat) / 180 * TEX_H];
}

function buildTexture(): ImageData {
  const off = document.createElement('canvas');
  off.width = TEX_W; off.height = TEX_H;
  const ctx = off.getContext('2d');
  if (!ctx) return new ImageData(TEX_W, TEX_H);

  // Deep ocean
  const grad = ctx.createLinearGradient(0, 0, 0, TEX_H);
  grad.addColorStop(0, '#b0d4f0');
  grad.addColorStop(0.10, '#1850c8');
  grad.addColorStop(0.30, '#0c2890');
  grad.addColorStop(0.50, '#091e70');
  grad.addColorStop(0.70, '#0c2890');
  grad.addColorStop(0.90, '#1850c8');
  grad.addColorStop(1, '#b0d4f0');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, TEX_W, TEX_H);

  function fillPoly(poly: Array<[number,number]>, fill: string, stroke?: string) {
    ctx.beginPath();
    poly.forEach(([lat, lng], i) => {
      const [tx, ty] = toTexCoords(lat, lng);
      if (i === 0) ctx.moveTo(tx, ty); else ctx.lineTo(tx, ty);
    });
    ctx.closePath();
    ctx.fillStyle = fill; ctx.fill();
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 0.5; ctx.stroke(); }
  }

  SHALLOW_SEA.forEach(p => fillPoly(p, 'rgba(30,110,200,0.35)'));
  TUNDRA_LANDS.forEach(p => fillPoly(p, '#8a9a7a'));
  GREEN_LANDS.forEach(p => fillPoly(p, '#2d8040', 'rgba(15,55,20,0.3)'));

  // Tropical darkening
  const tropGrad = ctx.createLinearGradient(0, TEX_H*0.3, 0, TEX_H*0.7);
  tropGrad.addColorStop(0, 'rgba(0,0,0,0)');
  tropGrad.addColorStop(0.5, 'rgba(0,40,0,0.22)');
  tropGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = tropGrad;
  ctx.fillRect(0, 0, TEX_W, TEX_H);

  DESERT_LANDS.forEach(([[r,g,b], poly]) => fillPoly(poly, `rgb(${r},${g},${b})`));
  POLAR_ICE.forEach(p => fillPoly(p, '#d8eeff'));

  // Himalaya mountain tone
  fillPoly([[28,72],[28,98],[34,98],[34,72],[28,72]], 'rgba(140,115,80,0.22)');
  // Rockies
  fillPoly([[30,-120],[30,-104],[52,-104],[52,-120],[30,-120]], 'rgba(130,105,70,0.15)');
  // Andes
  fillPoly([[-55,-75],[0,-74],[0,-70],[-55,-68],[-55,-75]], 'rgba(130,105,70,0.18)');

  // Cloud patches
  ctx.globalAlpha = 0.14;
  for (let i = 0; i < 22; i++) {
    const cx = (i * 137 + 55) % TEX_W;
    const cy = 45 + (i * 79) % (TEX_H - 90);
    const rw = 38 + (i * 23) % 95;
    const rh = 9 + (i * 17) % 24;
    const cloud = ctx.createRadialGradient(cx, cy, 0, cx, cy, rw);
    cloud.addColorStop(0, 'rgba(255,255,255,0.9)');
    cloud.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = cloud;
    ctx.save(); ctx.scale(1, rh / rw);
    ctx.beginPath(); ctx.arc(cx, cy * (rw / rh), rw, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }
  ctx.globalAlpha = 1;

  return ctx.getImageData(0, 0, TEX_W, TEX_H);
}

function slerp(a: [number,number,number], b: [number,number,number], t: number): [number,number,number] {
  const dot = Math.max(-1, Math.min(1, a[0]*b[0]+a[1]*b[1]+a[2]*b[2]));
  const om = Math.acos(dot);
  if (Math.abs(om) < 1e-6) return a;
  const s = 1 / Math.sin(om);
  const sa = Math.sin((1-t)*om) * s, sb = Math.sin(t*om) * s;
  return [sa*a[0]+sb*b[0], sa*a[1]+sb*b[1], sa*a[2]+sb*b[2]];
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
  ctx.lineTo(0,sc*4); ctx.lineTo(-sc*0.7,sc*4.5); ctx.lineTo(-sc*1.4,sc*2);
  ctx.closePath(); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-sc*0.6,sc*0.5); ctx.lineTo(-sc*7,sc*4); ctx.lineTo(-sc*5.5,sc*5.2);
  ctx.lineTo(-sc*0.9,sc*2.2); ctx.closePath(); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(sc*0.6,sc*0.5); ctx.lineTo(sc*7,sc*4); ctx.lineTo(sc*5.5,sc*5.2);
  ctx.lineTo(sc*0.9,sc*2.2); ctx.closePath(); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(0,sc*3.5); ctx.lineTo(-sc*2.5,sc*6.5); ctx.lineTo(-sc*1.8,sc*7);
  ctx.lineTo(0,sc*5.2); ctx.lineTo(sc*1.8,sc*7); ctx.lineTo(sc*2.5,sc*6.5);
  ctx.closePath(); ctx.fill();
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

  // Build texture once on mount
  useEffect(() => {
    if (!texRef.current) texRef.current = buildTexture();
  }, []);

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
        const ny = (CY - py - STRIDE * 0.5) / R;
        const ny2 = ny * ny;
        for (let px = 0; px < SIZE; px += STRIDE) {
          const nx = (px + STRIDE * 0.5 - CX) / R;
          const r2 = nx * nx + ny2;
          if (r2 >= 1) continue;
          const nzFront = Math.sqrt(1 - r2);
          const wy = ny * cosT + nzFront * sinT;
          const wz = -ny * sinT + nzFront * cosT;
          const wx = nx;
          const lat = Math.asin(Math.max(-1, Math.min(1, wy))) * 180 / Math.PI;
          const lngRad = Math.atan2(wx, wz) - angle;
          const lng = ((lngRad * 180 / Math.PI) % 360 + 540) % 360 - 180;
          const tx = Math.floor(((lng + 180) / 360) * (TEX_W - 1));
          const ty2 = Math.floor(((90 - lat) / 180) * (TEX_H - 1));
          const ti = (ty2 * TEX_W + tx) * 4;
          const r = texD[ti], g = texD[ti + 1], b = texD[ti + 2];
          const dotL = wx * LX + wy * LY + wz * LZ;
          const lambert = Math.max(0.07, dotL);
          const isWater = b > 80 && r < 100;
          const isIce = r > 170 && g > 185 && b > 210;
          let spec = 0;
          if (isWater || isIce) {
            const hLen = Math.sqrt(LX*LX + LY*LY + (LZ+1)*(LZ+1));
            const hDot = wx*(LX/hLen) + wy*(LY/hLen) + wz*((LZ+1)/hLen);
            spec = Math.pow(Math.max(0, hDot), isIce ? 22 : 38) * (isIce ? 65 : 130);
          }
          const nightFactor = dotL < 0 ? Math.max(0.05, 1 + dotL * 1.2) : 1;
          const fr = Math.min(255, r * lambert * nightFactor + spec);
          const fg = Math.min(255, g * lambert * nightFactor + spec * 0.95);
          const fb = Math.min(255, b * lambert * nightFactor + spec);
          for (let dy = 0; dy < STRIDE; dy++) {
            for (let dx = 0; dx < STRIDE; dx++) {
              const i = ((py + dy) * SIZE + (px + dx)) * 4;
              out[i] = fr; out[i+1] = fg; out[i+2] = fb; out[i+3] = 255;
            }
          }
        }
      }
      ctx.putImageData(imgData, 0, 0);

      // Atmosphere rim
      const CX2 = SIZE / 2, CY2 = SIZE / 2;
      const atm = ctx.createRadialGradient(CX2, CY2, R * 0.88, CX2, CY2, R * 1.06);
      atm.addColorStop(0, 'rgba(80,145,255,0)');
      atm.addColorStop(0.5, 'rgba(100,170,255,0.22)');
      atm.addColorStop(1, 'rgba(40,100,220,0)');
      ctx.fillStyle = atm;
      ctx.beginPath(); ctx.arc(CX2, CY2, R * 1.06, 0, Math.PI * 2); ctx.fill();

      // Gloss + edge
      ctx.save();
      ctx.beginPath(); ctx.arc(CX2, CY2, R, 0, Math.PI * 2); ctx.clip();
      const gl = ctx.createRadialGradient(CX2 - R*0.32, CY2 - R*0.32, 0, CX2, CY2, R);
      gl.addColorStop(0, 'rgba(255,255,255,0.2)');
      gl.addColorStop(0.4, 'rgba(255,255,255,0.04)');
      gl.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gl; ctx.fillRect(0, 0, SIZE, SIZE);
      const edge = ctx.createRadialGradient(CX2, CY2, R * 0.55, CX2, CY2, R);
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

          // Dashed arc
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

          if (plane.pauseFrames > 0) {
            plane.pauseFrames--;
          } else {
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
              const a = (i / plane.trail.length) * 0.65;
              octx.beginPath();
              octx.moveTo(plane.trail[i-1][0], plane.trail[i-1][1]);
              octx.lineTo(plane.trail[i][0], plane.trail[i][1]);
              octx.strokeStyle = `rgba(255,215,60,${a})`;
              octx.lineWidth = 2.2;
              octx.stroke();
            }
            octx.restore();

            const tN = Math.min(plane.t + 0.018, 1);
            const vN = slerp(vA, vB, tN);
            const [nl, ng] = toLatlng(vN);
            const pN = project(nl, ng, angle, tilt, R);
            const heading = Math.atan2(pN.x - pPos.x, -(pN.y - pPos.y));
            const planeScale = 1.15 * s.zoom;
            const pa = Math.max(0, Math.min(1, pPos.z * 1.4));
            octx.save();
            octx.beginPath(); octx.arc(SIZE/2, SIZE/2, R, 0, Math.PI*2); octx.clip();
            drawAirplane(octx, pPos.x, pPos.y, heading, planeScale, pa);
            octx.restore();
          }
        }
      }

      const projected = allCities
        .map(({ city, isSource }) => {
          const c = CITY_COORDS[city.name]!;
          return { ...project(c[0], c[1], angle, tilt, R), city, isSource };
        })
        .filter(p => p.z > 0)
        .sort((a, b) => a.z - b.z);

      projected.forEach(p => {
        const alpha = Math.max(0, 0.4 + p.z * 0.6);
        if (p.isSource) {
          const pulse = (Math.sin(ts/500)+1)/2;
          octx.beginPath(); octx.arc(p.x, p.y, 9+pulse*5, 0, Math.PI*2);
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
          const label = tz.length > 12 ? tz.slice(0, 11) + '…' : tz;
          octx.save();
          octx.font = `${p.isSource ? 700 : 500} ${9 * s.zoom}px ui-monospace,monospace`;
          octx.textAlign = 'center';
          octx.shadowColor = 'rgba(0,0,0,1)'; octx.shadowBlur = 6;
          octx.fillStyle = p.isSource ? `rgba(160,255,230,${la})` : `rgba(255,230,100,${la})`;
          octx.fillText(label, p.x, p.y + (p.isSource ? 19 : 16));
          octx.restore();
        }
      });

      // Suppress unused param warning
      void ts;
    }

    function frame(ts: number) {
      const s = stateRef.current;
      if (!s.dragging && !s.manualMode) {
        s.angle += 0.0008;
      } else if (!s.dragging && s.manualMode) {
        s.velX *= 0.94; s.angle += s.velX;
        if (Math.abs(s.velX) < 0.0002) s.manualMode = false;
      }
      renderGlobe();
      renderOverlay(ts);
      s.raf = requestAnimationFrame(frame);
    }

    const onMouseDown = (e: MouseEvent) => {
      stateRef.current.dragging = true;
      stateRef.current.lastX = e.clientX; stateRef.current.lastY = e.clientY;
      stateRef.current.velX = 0;
      overlay.style.cursor = 'grabbing';
    };
    const onMouseMove = (e: MouseEvent) => {
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
          if (Math.hypot(mx - p.x, my - p.y) < (isSource ? 14 : 10)) {
            hit = { name: city.name, tz: city.timezone }; break;
          }
        }
        setTooltip(hit);
        overlay.style.cursor = hit ? 'pointer' : 'grab';
        return;
      }
      const dx = e.clientX - s.lastX, dy = e.clientY - s.lastY;
      s.velX = dx * 0.007; s.angle += dx * 0.007;
      s.tilt = Math.max(-0.6, Math.min(0.6, s.tilt - dy * 0.005));
      s.lastX = e.clientX; s.lastY = e.clientY;
    };
    const onMouseUp = () => {
      stateRef.current.dragging = false;
      stateRef.current.manualMode = true;
      overlay.style.cursor = 'grab';
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      stateRef.current.zoom = Math.max(0.45, Math.min(2.6, stateRef.current.zoom + (e.deltaY > 0 ? -0.09 : 0.09)));
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        stateRef.current.pinchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        return;
      }
      const t = e.touches[0];
      stateRef.current.dragging = true;
      stateRef.current.lastX = t.clientX; stateRef.current.lastY = t.clientY;
      stateRef.current.velX = 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const s = stateRef.current;
      if (e.touches.length === 2) {
        const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        s.zoom = Math.max(0.45, Math.min(2.6, s.zoom + (d - s.pinchDist) * 0.006));
        s.pinchDist = d; return;
      }
      if (!s.dragging) return;
      const t = e.touches[0];
      const dx = t.clientX - s.lastX, dy = t.clientY - s.lastY;
      s.velX = dx * 0.007; s.angle += dx * 0.007;
      s.tilt = Math.max(-0.6, Math.min(0.6, s.tilt - dy * 0.005));
      s.lastX = t.clientX; s.lastY = t.clientY;
    };
    const onTouchEnd = () => {
      stateRef.current.dragging = false;
      stateRef.current.manualMode = true;
    };

    overlay.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    overlay.addEventListener('wheel', onWheel, { passive: false });
    overlay.addEventListener('touchstart', onTouchStart, { passive: false });
    overlay.addEventListener('touchmove', onTouchMove, { passive: false });
    overlay.addEventListener('touchend', onTouchEnd);
    overlay.style.cursor = 'grab';

    stateRef.current.raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(stateRef.current.raf);
      overlay.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      overlay.removeEventListener('wheel', onWheel);
      overlay.removeEventListener('touchstart', onTouchStart);
      overlay.removeEventListener('touchmove', onTouchMove);
      overlay.removeEventListener('touchend', onTouchEnd);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depsKey]);

  const routeTargets = targetCities.filter(c => CITY_COORDS[c.name]);

  const zoomBy = (dir: 1 | -1) => {
    stateRef.current.zoom = Math.max(0.45, Math.min(2.6, stateRef.current.zoom + dir * 0.22));
  };

  return (
    <div className="globe-widget">
      <div className="globe-header">
        <span className="globe-source-dot" />
        <span className="globe-source-name">{sourceCity.name}</span>
        {routeTargets.length > 0 && (
          <>
            <span className="globe-route-arrow">→</span>
            <span className="globe-target-name">{routeTargets.map(c => c.name).join(', ')}</span>
          </>
        )}
      </div>

      <div className="globe-canvas-wrap" style={{ position: 'relative', width: SIZE, height: SIZE }}>
        <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, borderRadius: '50%', display: 'block' }} />
        <canvas ref={overlayRef} style={{ position: 'absolute', top: 0, left: 0, borderRadius: '50%', display: 'block', background: 'transparent' }} />

        <div className="globe-zoom-btns">
          <button className="globe-zoom-btn" onClick={() => zoomBy(1)} title="Zoom in">+</button>
          <button className="globe-zoom-btn" onClick={() => zoomBy(-1)} title="Zoom out">−</button>
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
        {routeTargets.length > 0 && <span className="globe-legend-item"><span className="globe-legend-plane">✈</span>live flight</span>}
        <span className="globe-drag-hint">scroll · drag · pinch</span>
      </div>
    </div>
  );
}
