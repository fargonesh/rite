import { cx } from '../lib/cx.ts';

export interface GaugeChartProps {
  value: number;
  label?: string;
  size?: number;
  className?: string;
  ariaLabel?: string;
}

const BLOOD = '#d42b1e';
const TRACK_W = 10;

function polar(cx: number, cy: number, r: number, deg: number): { x: number; y: number } {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
}

function arc(cx: number, cy: number, r: number, a0: number, a1: number): string {
  const s = polar(cx, cy, r, a0);
  const e = polar(cx, cy, r, a1);
  const large = a0 - a1 > 180 ? 1 : 0;
  return `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${r.toFixed(2)} ${r.toFixed(2)} 0 ${large} 1 ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
}

const angle = (v: number) => 180 - (Math.min(Math.max(v, 0), 100) / 100) * 180;

export function GaugeChart({ value, label, size = 180, className, ariaLabel }: GaugeChartProps) {
  const r = size / 2 - 20;
  const cy = r + 12;
  const h = cy + 42;
  const clamped = Math.min(Math.max(value, 0), 100);
  const tip = polar(size / 2, cy, r - TRACK_W - 4, angle(clamped));
  return (
    <div className={cx('text-[#0a0a0b] dark:text-[#e9e7e2]', className)}>
      <svg
        role="img"
        aria-label={ariaLabel ?? `Gauge chart${label ? `: ${label}` : ''}: ${clamped} of 100`}
        width={size}
        height={h}
        viewBox={`0 0 ${size} ${h}`}
        className="block"
      >
        <path d={arc(size / 2, cy, r, 180, 0)} fill="none" strokeWidth={TRACK_W} className="stroke-[#0a0a0b]/15 dark:stroke-white/15" />
        <path d={arc(size / 2, cy, r, angle(90), angle(100))} fill="none" stroke={BLOOD} strokeWidth={TRACK_W} />
        {clamped > 0 ? (
          <path d={arc(size / 2, cy, r, 180, angle(clamped))} fill="none" stroke="currentColor" strokeWidth={TRACK_W} />
        ) : null}
        <line x1={size / 2} y1={cy} x2={tip.x} y2={tip.y} stroke="currentColor" strokeWidth={2} />
        <circle cx={size / 2} cy={cy} r={3.5} fill="currentColor" />
        <text
          x={size / 2 - r}
          y={cy + 6}
          textAnchor="middle"
          fontSize={9}
          className="fill-[#0a0a0b]/55 font-mono dark:fill-white/50"
        >
          0
        </text>
        <text
          x={size / 2 + r}
          y={cy + 6}
          textAnchor="middle"
          fontSize={9}
          className="fill-[#0a0a0b]/55 font-mono dark:fill-white/50"
        >
          100
        </text>
        <text
          x={size / 2}
          y={cy + 24}
          textAnchor="middle"
          fontSize={size * 0.13}
          fill="currentColor"
          className="font-mono tabular-nums"
        >
          {clamped}
        </text>
      </svg>
      {label ? (
        <p className="mt-1 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/60 dark:text-white/55">
          {label}
        </p>
      ) : null}
    </div>
  );
}

export function GaugeChartDemo() {
  return <GaugeChart value={68} label="Sigil integrity" />;
}
