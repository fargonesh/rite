import { useId } from 'react';
import { cx } from '../lib/cx.ts';

export interface AreaChartDatum {
  label: string;
  value: number;
}

export interface AreaChartProps {
  data: AreaChartDatum[];
  height?: number;
  showGrid?: boolean;
  ariaLabel?: string;
  className?: string;
}

const W = 560;
const PAD_L = 40;
const PAD_R = 12;
const PAD_T = 14;
const PAD_B = 30;

function fmt(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

/** Catmull-Rom → cubic Bézier smoothing over evenly spaced points. */
function smooth(pts: Array<{ x: number; y: number }>): string {
  if (pts.length === 0) return '';
  const p = (n: number): string => n.toFixed(2);
  if (pts.length === 1) return `M ${p(pts[0].x)} ${p(pts[0].y)}`;
  let d = `M ${p(pts[0].x)} ${p(pts[0].y)}`;
  for (let i = 0; i < pts.length - 1; i += 1) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${p(c1x)} ${p(c1y)}, ${p(c2x)} ${p(c2y)}, ${p(p2.x)} ${p(p2.y)}`;
  }
  return d;
}

export function AreaChart({ data, height = 220, showGrid = true, ariaLabel = 'Area chart', className }: AreaChartProps) {
  const gid = useId().replace(/:/g, '');
  const innerW = W - PAD_L - PAD_R;
  const innerH = height - PAD_T - PAD_B;
  const max = Math.max(1, ...data.map((d) => d.value));
  const baseY = PAD_T + innerH;
  const xs = (i: number): number =>
    data.length === 1 ? PAD_L + innerW / 2 : PAD_L + (i / (data.length - 1)) * innerW;
  const ys = (v: number): number => PAD_T + (1 - v / max) * innerH;
  const pts = data.map((d, i) => ({ x: xs(i), y: ys(d.value) }));
  const line = smooth(pts);
  const area =
    pts.length === 0
      ? ''
      : `${line} L ${pts[pts.length - 1].x.toFixed(2)} ${baseY} L ${pts[0].x.toFixed(2)} ${baseY} Z`;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => max * t);

  return (
    <div className={cx('text-[#0a0a0b] dark:text-[#e9e7e2]', className)}>
      <svg
        role="img"
        aria-label={ariaLabel}
        viewBox={`0 0 ${W} ${height}`}
        className="block h-auto w-full"
      >
        <title>{ariaLabel}</title>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity={0.28} />
            <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
          </linearGradient>
        </defs>
        {showGrid &&
          ticks.map((t, i) => (
            <g key={i}>
              <line
                x1={PAD_L}
                x2={W - PAD_R}
                y1={ys(t)}
                y2={ys(t)}
                strokeWidth={1}
                shapeRendering="crispEdges"
                className="stroke-[#0a0a0b]/10 dark:stroke-white/10"
              />
              <text
                x={PAD_L - 8}
                y={ys(t)}
                textAnchor="end"
                dominantBaseline="central"
                fontSize={10}
                className="fill-[#0a0a0b]/55 font-mono dark:fill-white/45"
              >
                {fmt(t)}
              </text>
            </g>
          ))}
        {area !== '' && <path d={area} fill={`url(#${gid})`} stroke="none" />}
        <line
          x1={PAD_L}
          x2={W - PAD_R}
          y1={baseY}
          y2={baseY}
          strokeWidth={1}
          shapeRendering="crispEdges"
          className="stroke-[#0a0a0b]/25 dark:stroke-white/20"
        />
        {line !== '' && (
          <path d={line} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
        )}
        {pts.map((pt, i) => (
          <g key={i}>
            <circle cx={pt.x} cy={pt.y} r={4.5} className="fill-[#fdfdfc] dark:fill-[#0e0f11]" />
            <circle cx={pt.x} cy={pt.y} r={2.5} fill="currentColor" />
          </g>
        ))}
        {data.map((d, i) => (
          <text
            key={d.label}
            x={xs(i)}
            y={baseY + 18}
            textAnchor="middle"
            fontSize={10}
            className="fill-[#0a0a0b]/55 font-mono uppercase dark:fill-white/45"
          >
            {d.label}
          </text>
        ))}
      </svg>
    </div>
  );
}

const DEMO: AreaChartDatum[] = [
  { label: 'OCT', value: 12 },
  { label: 'NOV', value: 19 },
  { label: 'DEC', value: 15 },
  { label: 'JAN', value: 28 },
  { label: 'FEB', value: 24 },
  { label: 'MAR', value: 36 },
  { label: 'APR', value: 31 },
];

export function AreaChartDemo() {
  return (
    <div className="space-y-2">
      <AreaChart data={DEMO} />
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/55 dark:text-white/45">
        Witnessed séances per moon — steady ascent
      </p>
    </div>
  );
}
