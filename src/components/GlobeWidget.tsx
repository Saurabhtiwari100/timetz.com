import { useEffect, useRef, useState } from 'react';
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

const SIZE = 210;
const R = SIZE / 2 - 8;
const cx = SIZE / 2;
const cy = SIZE / 2;

function project(lat: number, lng: number, angle: number, tilt: number) {
  const phi = lat * Math.PI / 180;
  const lambda = lng * Math.PI / 180 + angle;
  // Apply tilt (rotation around X axis)
  const x0 = Math.cos(phi) * Math.sin(lambda);
  const y0 = Math.sin(phi);
  const z0 = Math.cos(phi) * Math.cos(lambda);
  const cosT = Math.cos(tilt), sinT = Math.sin(tilt);
  return {
    x: cx + R * x0,
    y: cy - R * (y0 * cosT - z0 * sinT),
    z: y0 * sinT + z0 * cosT,
  };
}

export default function GlobeWidget({ sourceCity, targetCities }: {
  sourceCity: City;
  targetCities: City[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    angle: 0,
    tilt: 0.2,
    raf: 0,
    dragging: false,
    lastX: 0,
    lastY: 0,
    velX: 0,
    manualMode: false,
  });
  const [tooltip, setTooltip] = useState<{ name: string; tz: string } | null>(null);

  const depsKey = sourceCity.name + '|' + targetCities.map(c => c.name).join(',');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = SIZE * DPR;
    canvas.height = SIZE * DPR;
    canvas.style.width = SIZE + 'px';
    canvas.style.height = SIZE + 'px';
    ctx.scale(DPR, DPR);

    const allCities = [
      { city: sourceCity, isSource: true },
      ...targetCities.map(c => ({ city: c, isSource: false })),
    ];

    function drawGridLine(lats: number[], lngs: number[], angle: number, tilt: number) {
      ctx.beginPath();
      let down = false;
      for (let i = 0; i < lats.length; i++) {
        const p = project(lats[i], lngs[i], angle, tilt);
        if (p.z < 0) { down = false; continue; }
        if (!down) { ctx.moveTo(p.x, p.y); down = true; }
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }

    function draw(ts: number) {
      const s = stateRef.current;
      ctx.clearRect(0, 0, SIZE, SIZE);

      if (!s.dragging && !s.manualMode) {
        s.angle += 0.0018;
      } else if (!s.dragging && s.manualMode) {
        s.velX *= 0.95;
        s.angle += s.velX;
        if (Math.abs(s.velX) < 0.0002) s.manualMode = false;
      }

      const angle = s.angle;
      const tilt = s.tilt;

      // Ocean base
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

      // Grid
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();
      ctx.strokeStyle = 'rgba(255,255,255,0.09)';
      ctx.lineWidth = 0.6;
      for (let lat = -60; lat <= 60; lat += 30)
        drawGridLine(Array(LNG_STEPS.length).fill(lat), LNG_STEPS, angle, tilt);
      for (let lng = 0; lng < 360; lng += 30)
        drawGridLine(LAT_STEPS, Array(LAT_STEPS.length).fill(lng), angle, tilt);
      ctx.strokeStyle = 'rgba(255,255,255,0.18)';
      ctx.lineWidth = 0.8;
      drawGridLine(Array(LNG_STEPS.length).fill(0), LNG_STEPS, angle, tilt);
      ctx.restore();

      // City markers
      const projected = allCities
        .map(({ city, isSource }) => {
          const coords = CITY_COORDS[city.name];
          if (!coords) return null;
          const p = project(coords[0], coords[1], angle, tilt);
          return { ...p, city, isSource };
        })
        .filter((p): p is NonNullable<typeof p> => p !== null && p.z > 0)
        .sort((a, b) => a.z - b.z);

      projected.forEach(p => {
        const alpha = Math.max(0, 0.4 + p.z * 0.6);

        if (p.isSource) {
          const pulse = (Math.sin(ts / 500) + 1) / 2;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 7 + pulse * 5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(80,227,194,${0.15 * alpha})`;
          ctx.fill();
          const g = ctx.createRadialGradient(p.x - 1, p.y - 1, 0, p.x, p.y, 5);
          g.addColorStop(0, `rgba(200,255,245,${alpha})`);
          g.addColorStop(1, `rgba(80,227,194,${alpha})`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        } else {
          const g = ctx.createRadialGradient(p.x - 0.5, p.y - 0.5, 0, p.x, p.y, 4);
          g.addColorStop(0, `rgba(255,235,130,${alpha})`);
          g.addColorStop(1, `rgba(251,191,36,${alpha})`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }

        // City name label
        const labelAlpha = Math.max(0, p.z - 0.15) / 0.85;
        if (labelAlpha > 0.1) {
          ctx.save();
          ctx.font = `${p.isSource ? 600 : 400} 9px ui-monospace, monospace`;
          ctx.fillStyle = p.isSource
            ? `rgba(180,255,240,${labelAlpha})`
            : `rgba(255,235,150,${labelAlpha})`;
          // Tiny timezone abbreviation below dot
          const tz = p.city.timezone.split('/')[1]?.replace(/_/g, ' ') ?? p.city.timezone;
          const label = tz.length > 12 ? tz.slice(0, 11) + '…' : tz;
          ctx.textAlign = 'center';
          ctx.shadowColor = 'rgba(0,0,0,0.9)';
          ctx.shadowBlur = 4;
          ctx.fillText(label, p.x, p.y + (p.isSource ? 14 : 12));
          ctx.restore();
        }
      });

      // Gloss + edge
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();
      const gloss = ctx.createRadialGradient(cx - R * 0.38, cy - R * 0.38, 0, cx, cy, R);
      gloss.addColorStop(0, 'rgba(255,255,255,0.2)');
      gloss.addColorStop(0.35, 'rgba(255,255,255,0.03)');
      gloss.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gloss;
      ctx.fillRect(0, 0, SIZE, SIZE);
      const edge = ctx.createRadialGradient(cx, cy, R * 0.55, cx, cy, R);
      edge.addColorStop(0, 'rgba(0,0,0,0)');
      edge.addColorStop(1, 'rgba(0,0,0,0.55)');
      ctx.fillStyle = edge;
      ctx.fillRect(0, 0, SIZE, SIZE);
      ctx.restore();

      s.raf = requestAnimationFrame(draw);
    }

    // Mouse drag
    const onMouseDown = (e: MouseEvent) => {
      stateRef.current.dragging = true;
      stateRef.current.lastX = e.clientX;
      stateRef.current.lastY = e.clientY;
      stateRef.current.velX = 0;
      canvas.style.cursor = 'grabbing';
    };
    const onMouseMove = (e: MouseEvent) => {
      const s = stateRef.current;
      if (!s.dragging) {
        // Tooltip hit test
        const rect = canvas.getBoundingClientRect();
        const mx = (e.clientX - rect.left) * (SIZE / rect.width);
        const my = (e.clientY - rect.top) * (SIZE / rect.height);
        let hit: { name: string; tz: string } | null = null;
        for (const { city, isSource } of allCities) {
          const coords = CITY_COORDS[city.name];
          if (!coords) continue;
          const p = project(coords[0], coords[1], s.angle, s.tilt);
          if (p.z < 0) continue;
          const dist = Math.hypot(mx - p.x, my - p.y);
          if (dist < (isSource ? 10 : 8)) {
            hit = { name: city.name, tz: city.timezone };
            break;
          }
        }
        setTooltip(hit);
        canvas.style.cursor = hit ? 'pointer' : 'grab';
        return;
      }
      const dx = e.clientX - s.lastX;
      const dy = e.clientY - s.lastY;
      s.velX = dx * 0.008;
      s.angle += dx * 0.008;
      s.tilt = Math.max(-0.6, Math.min(0.6, s.tilt - dy * 0.006));
      s.lastX = e.clientX;
      s.lastY = e.clientY;
    };
    const onMouseUp = () => {
      const s = stateRef.current;
      s.dragging = false;
      s.manualMode = true;
      canvas.style.cursor = 'grab';
    };

    // Touch drag
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      stateRef.current.dragging = true;
      stateRef.current.lastX = t.clientX;
      stateRef.current.lastY = t.clientY;
      stateRef.current.velX = 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const s = stateRef.current;
      if (!s.dragging) return;
      const t = e.touches[0];
      const dx = t.clientX - s.lastX;
      const dy = t.clientY - s.lastY;
      s.velX = dx * 0.008;
      s.angle += dx * 0.008;
      s.tilt = Math.max(-0.6, Math.min(0.6, s.tilt - dy * 0.006));
      s.lastX = t.clientX;
      s.lastY = t.clientY;
    };
    const onTouchEnd = () => {
      stateRef.current.dragging = false;
      stateRef.current.manualMode = true;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd);
    canvas.style.cursor = 'grab';

    stateRef.current.raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(stateRef.current.raf);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depsKey]);

  return (
    <div className="globe-widget">
      <div className="globe-header">
        <span className="globe-source-dot" />
        <span className="globe-source-name">{sourceCity.name}</span>
        <span className="globe-drag-hint">drag to rotate</span>
      </div>
      <div className="globe-canvas-wrap">
        <canvas ref={canvasRef} className="globe-canvas" />
        {tooltip && (
          <div className="globe-tooltip">
            <span className="globe-tooltip-name">{tooltip.name}</span>
            <span className="globe-tooltip-tz">{tooltip.tz.replace(/_/g, ' ')}</span>
          </div>
        )}
      </div>
    </div>
  );
}
