import { cx } from '../lib/cx.ts';

export interface LineChartDatum {
  label: string;
  value: number;
}

export interface LineChartProps {
  data: LineChartDatum[];
  height?: number;
  showGrid?: boolean;
  /** Blood dashed rule drawn at this value; extends the scale when out of range. */
  threshold?: number;
  ariaLabel?: string;
  className?: string;
}

const W = 560;
const PAD_L = 40;
const PAD_R = 12;
const PAD_T = 20;
const PAD_B = 30;
const BLOOD = '#d42b1e';

function fmt(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

export function LineChart({
  data,
  height = 220,
  showGrid = true,
  threshold,
  ariaLabel = 'Line chart',
  className,
}: LineChartProps) {
  const innerW = W - PAD_L - PAD_R;
  const innerH = height - PAD_T - PAD_B;
  const max = Math.max(1, ...data.map((d) => d.value), ...(threshold === undefined ? [] : [threshold]));
  const baseY = PAD_T + innerH;
  const xs = (i: number): number =>
    data.length === 1 ? PAD_L + innerW / 2 : PAD_L + (i / (data.length - 1)) * innerW;
  const ys = (v: number): number => PAD_T + (1 - v / max) * innerH;
  const pts = data.map((d, i) => ({ x: xs(i), y: ys(d.value) }));
  const line =
    pts.length === 0
      ? ''
      : pts.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`).join(' ');
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => max * t);
  const ty = threshold === undefined ? null : Math.min(baseY, Math.max(PAD_T, ys(threshold)));

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
        {ty !== null && threshold !== undefined && (
          <g>
            <line
              x1={PAD_L}
              x2={W - PAD_R}
              y1={ty}
              y2={ty}
              stroke={BLOOD}
              strokeWidth={1}
              strokeDasharray="5 4"
              shapeRendering="crispEdges"
            />
            <text
              x={W - PAD_R}
              y={Math.max(ty - 6, 10)}
              textAnchor="end"
              fontSize={10}
              fill={BLOOD}
              className="font-mono uppercase"
              letterSpacing={1.5}
            >
              {`omen ${fmt(threshold)}`}
            </text>
          </g>
        )}
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
        {data.map((d, i) => (
          <g key={d.label}>
            <circle cx={xs(i)} cy={ys(d.value)} r={4.5} className="fill-[#fdfdfc] dark:fill-[#0e0f11]" />
            <circle cx={xs(i)} cy={ys(d.value)} r={2.5} fill="currentColor" />
            <text
              x={xs(i)}
              y={baseY + 18}
              textAnchor="middle"
              fontSize={10}
              className="fill-[#0a0a0b]/55 font-mono uppercase dark:fill-white/45"
            >
              {d.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

const DEMO: LineChartDatum[] = [
  { label: 'DUSK', value: 9 },
  { label: 'EVE', value: 13 },
  { label: 'MID', value: 11 },
  { label: 'LOW', value: 18 },
  { label: 'HIGH', value: 24 },
  { label: 'DAWN', value: 20 },
];

export function LineChartDemo() {
  return (
    <div className="space-y-2">
      <LineChart data={DEMO} threshold={21} />
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/55 dark:text-white/45">
        Ether pressure by watch — omen line at 21
      </p>
    </div>
  );
}
