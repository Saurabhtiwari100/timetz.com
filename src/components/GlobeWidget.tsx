import { useEffect, useRef } from 'react';
import type { City } from '../lib/cities';

const CITY_COORDS: Record<string, [number, number]> = {
  'New York': [40.71, -74.01],
  'Chicago': [41.88, -87.63],
  'Denver': [39.74, -104.98],
  'Los Angeles': [34.05, -118.24],
  'Phoenix': [33.45, -112.07],
  'Anchorage': [61.22, -149.90],
  'Honolulu': [21.31, -157.86],
  'Toronto': [43.65, -79.38],
  'Vancouver': [49.28, -123.12],
  'Mexico City': [19.43, -99.13],
  'São Paulo': [-23.55, -46.63],
  'London': [51.51, -0.13],
  'Paris': [48.86, 2.35],
  'Berlin': [52.52, 13.40],
  'Amsterdam': [52.37, 4.90],
  'Zurich': [47.38, 8.54],
  'Stockholm': [59.33, 18.07],
  'Moscow': [55.75, 37.62],
  'Istanbul': [41.01, 28.95],
  'Athens': [37.98, 23.73],
  'Lisbon': [38.72, -9.14],
  'Dubai': [25.20, 55.27],
  'Riyadh': [24.69, 46.72],
  'Cairo': [30.05, 31.24],
  'Nairobi': [-1.29, 36.82],
  'Lagos': [6.45, 3.39],
  'Johannesburg': [-26.20, 28.04],
  'Mumbai': [19.08, 72.88],
  'Karachi': [24.86, 67.01],
  'Dhaka': [23.72, 90.41],
  'Kathmandu': [27.72, 85.32],
  'Colombo': [6.93, 79.85],
  'Bangkok': [13.75, 100.50],
  'Singapore': [1.35, 103.82],
  'Kuala Lumpur': [3.14, 101.69],
  'Jakarta': [-6.21, 106.85],
  'Hong Kong': [22.32, 114.17],
  'Beijing': [39.91, 116.39],
  'Taipei': [25.05, 121.53],
  'Seoul': [37.57, 126.98],
  'Tokyo': [35.68, 139.69],
  'Manila': [14.60, 120.98],
  'Ho Chi Minh City': [10.82, 106.63],
  'Sydney': [-33.87, 151.21],
  'Melbourne': [-37.81, 144.96],
};

const LAT_STEPS = Array.from({ length: 121 }, (_, i) => -60 + i);
const LNG_STEPS = Array.from({ length: 361 }, (_, i) => i);

export default function GlobeWidget({ sourceCity, targetCities }: {
  sourceCity: City;
  targetCities: City[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ angle: 0, raf: 0 });

  const depsKey = sourceCity.name + '|' + targetCities.map(c => c.name).join(',');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const SIZE = 190;
    canvas.width = SIZE * DPR;
    canvas.height = SIZE * DPR;
    canvas.style.width = SIZE + 'px';
    canvas.style.height = SIZE + 'px';
    ctx.scale(DPR, DPR);

    const R = SIZE / 2 - 6;
    const cx = SIZE / 2;
    const cy = SIZE / 2;

    function project(lat: number, lng: number, angle: number) {
      const phi = lat * Math.PI / 180;
      const lambda = lng * Math.PI / 180 + angle;
      return {
        x: cx + R * Math.cos(phi) * Math.sin(lambda),
        y: cy - R * Math.sin(phi),
        z: Math.cos(phi) * Math.cos(lambda),
      };
    }

    function drawGridLine(lats: number[], lngs: number[], angle: number) {
      ctx.beginPath();
      let down = false;
      for (let i = 0; i < lats.length; i++) {
        const p = project(lats[i], lngs[i], angle);
        if (p.z < 0) { down = false; continue; }
        if (!down) { ctx.moveTo(p.x, p.y); down = true; }
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }

    function draw(ts: number) {
      ctx.clearRect(0, 0, SIZE, SIZE);
      const angle = stateRef.current.angle;

      // Sphere base
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      const ocean = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.35, R * 0.05, cx, cy, R);
      ocean.addColorStop(0, '#5b9bd5');
      ocean.addColorStop(0.45, '#1a56ab');
      ocean.addColorStop(1, '#0c2461');
      ctx.fillStyle = ocean;
      ctx.fillRect(0, 0, SIZE, SIZE);
      ctx.restore();

      // Grid lines
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();
      ctx.strokeStyle = 'rgba(255,255,255,0.09)';
      ctx.lineWidth = 0.6;
      for (let lat = -60; lat <= 60; lat += 30)
        drawGridLine(Array(LNG_STEPS.length).fill(lat), LNG_STEPS, angle);
      for (let lng = 0; lng < 360; lng += 30)
        drawGridLine(LAT_STEPS, Array(LAT_STEPS.length).fill(lng), angle);

      // Equator highlight
      ctx.strokeStyle = 'rgba(255,255,255,0.18)';
      ctx.lineWidth = 0.8;
      drawGridLine(Array(LNG_STEPS.length).fill(0), LNG_STEPS, angle);
      ctx.restore();

      // City dots — render back-to-front by z
      const allCities = [
        { city: sourceCity, isSource: true },
        ...targetCities.map(c => ({ city: c, isSource: false })),
      ];
      const projected = allCities
        .map(({ city, isSource }) => {
          const coords = CITY_COORDS[city.name];
          if (!coords) return null;
          const p = project(coords[0], coords[1], angle);
          return { ...p, name: city.name, isSource };
        })
        .filter((p): p is NonNullable<typeof p> => p !== null && p.z > -0.1)
        .sort((a, b) => a.z - b.z);

      projected.forEach(p => {
        const alpha = Math.max(0, 0.35 + p.z * 0.65);
        if (p.isSource) {
          const pulse = (Math.sin(ts / 500) + 1) / 2;
          // Outer ring
          ctx.beginPath();
          ctx.arc(p.x, p.y, 6 + pulse * 5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(80,227,194,${0.18 * alpha})`;
          ctx.fill();
          // Main dot
          const g = ctx.createRadialGradient(p.x - 1, p.y - 1, 0, p.x, p.y, 5);
          g.addColorStop(0, `rgba(180,255,240,${alpha})`);
          g.addColorStop(1, `rgba(80,227,194,${alpha})`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        } else {
          const g = ctx.createRadialGradient(p.x - 0.5, p.y - 0.5, 0, p.x, p.y, 3.5);
          g.addColorStop(0, `rgba(255,230,120,${alpha})`);
          g.addColorStop(1, `rgba(251,191,36,${alpha})`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }
      });

      // Surface gloss
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();
      const gloss = ctx.createRadialGradient(cx - R * 0.38, cy - R * 0.38, 0, cx, cy, R);
      gloss.addColorStop(0, 'rgba(255,255,255,0.22)');
      gloss.addColorStop(0.35, 'rgba(255,255,255,0.04)');
      gloss.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gloss;
      ctx.fillRect(0, 0, SIZE, SIZE);

      // Edge darkening
      const edge = ctx.createRadialGradient(cx, cy, R * 0.55, cx, cy, R);
      edge.addColorStop(0, 'rgba(0,0,0,0)');
      edge.addColorStop(1, 'rgba(0,0,0,0.6)');
      ctx.fillStyle = edge;
      ctx.fillRect(0, 0, SIZE, SIZE);
      ctx.restore();

      stateRef.current.angle += 0.0018;
      stateRef.current.raf = requestAnimationFrame(draw);
    }

    stateRef.current.raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(stateRef.current.raf);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depsKey]);

  const visibleTargets = targetCities.filter(c => CITY_COORDS[c.name]);

  return (
    <div className="globe-widget">
      <div className="globe-header">
        <span className="globe-source-dot" />
        <span className="globe-source-name">{sourceCity.name}</span>
      </div>
      <canvas ref={canvasRef} className="globe-canvas" />
      {visibleTargets.length > 0 && (
        <div className="globe-footer">
          <span className="globe-target-dot" />
          <span className="globe-target-label">{visibleTargets.length} target{visibleTargets.length > 1 ? 's' : ''}</span>
        </div>
      )}
    </div>
  );
}
