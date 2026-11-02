import { cx } from '../lib/cx.ts';

export interface BarChartDatum {
  label: string;
  value: number;
}

export interface BarChartProps {
  data: BarChartDatum[];
  height?: number;
  showGrid?: boolean;
  ariaLabel?: string;
  className?: string;
}

const W = 560;
const PAD_L = 40;
const PAD_R = 12;
const PAD_T = 26;
const PAD_B = 30;
const BLOOD = '#d42b1e';

function fmt(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

export function BarChart({ data, height = 220, showGrid = true, ariaLabel = 'Bar chart', className }: BarChartProps) {
  const innerW = W - PAD_L - PAD_R;
  const innerH = height - PAD_T - PAD_B;
  const max = Math.max(1, ...data.map((d) => d.value));
  const peak = data.reduce((acc, d) => Math.max(acc, d.value), -Infinity);
  const baseY = PAD_T + innerH;
  const ys = (v: number): number => PAD_T + (1 - v / max) * innerH;
  const slot = data.length === 0 ? 0 : innerW / data.length;
  const barW = Math.max(8, Math.min(46, slot * 0.62));
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
        {data.map((d, i) => {
          const cxp = PAD_L + slot * i + slot / 2;
          const y = ys(d.value);
          const isPeak = d.value === peak;
          return (
            <g key={d.label}>
              <rect
                x={cxp - barW / 2}
                y={y}
                width={barW}
                height={Math.max(0, baseY - y)}
                fill={isPeak ? BLOOD : 'currentColor'}
              />
              <text
                x={cxp}
                y={y - 8}
                textAnchor="middle"
                fontSize={10}
                className="font-mono"
                fill={isPeak ? BLOOD : 'currentColor'}
              >
                {fmt(d.value)}
              </text>
              <text
                x={cxp}
                y={baseY + 18}
                textAnchor="middle"
                fontSize={10}
                className="fill-[#0a0a0b]/55 font-mono uppercase dark:fill-white/45"
              >
                {d.label}
              </text>
            </g>
          );
        })}
        <line
          x1={PAD_L}
          x2={W - PAD_R}
          y1={baseY}
          y2={baseY}
          strokeWidth={1}
          shapeRendering="crispEdges"
          className="stroke-[#0a0a0b]/40 dark:stroke-white/30"
        />
      </svg>
    </div>
  );
}

const DEMO: BarChartDatum[] = [
  { label: 'WAX', value: 8 },
  { label: 'ASH', value: 14 },
  { label: 'BONE', value: 11 },
  { label: 'MYRRH', value: 22 },
  { label: 'SALT', value: 17 },
  { label: 'LEAD', value: 22 },
];

export function BarChartDemo() {
  return (
    <div className="space-y-2">
      <BarChart data={DEMO} />
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/55 dark:text-white/45">
        Relics catalogued by vessel — peak marked in blood
      </p>
    </div>
  );
}
