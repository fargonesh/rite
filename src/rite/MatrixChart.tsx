import { cx } from '../lib/cx.ts';

export interface MatrixChartDatum {
  x: string;
  y: string;
  value: number;
}

export interface MatrixChartProps {
  data: MatrixChartDatum[];
  xLabels?: string[];
  yLabels?: string[];
  cellSize?: number;
  ariaLabel?: string;
  className?: string;
}

const BLOOD = '#d42b1e';
const PAD = { top: 8, right: 8, bottom: 24, left: 64 };

function uniqInOrder(items: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of items) {
    if (!seen.has(item)) {
      seen.add(item);
      out.push(item);
    }
  }
  return out;
}

export function MatrixChart({
  data,
  xLabels,
  yLabels,
  cellSize = 28,
  ariaLabel,
  className,
}: MatrixChartProps) {
  const xs = xLabels ?? uniqInOrder(data.map((d) => d.x));
  const ys = yLabels ?? uniqInOrder(data.map((d) => d.y));
  const lookup = new Map<string, number>();
  for (const d of data) lookup.set(`${d.x}\0${d.y}`, d.value);
  const values = data.map((d) => d.value);
  const max = values.length > 0 ? Math.max(...values) : 0;
  const width = PAD.left + xs.length * cellSize + PAD.right;
  const height = PAD.top + ys.length * cellSize + PAD.bottom;
  const label =
    ariaLabel ??
    (data.length > 0
      ? `Matrix chart: ${data.map((d) => `${d.x}, ${d.y}: ${d.value}`).join('; ')}`
      : 'Matrix chart: no data');

  return (
    <svg
      role="img"
      aria-label={label}
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cx('block text-[#0a0a0b] dark:text-[#e9e7e2]', className)}
    >
      <title>{label}</title>
      {ys.map((y, row) =>
        xs.map((x, col) => {
          const v = lookup.get(`${x}\0${y}`) ?? 0;
          const isMax = v === max && max > 0;
          const opacity = max === 0 ? 0 : 0.08 + 0.72 * (v / max);
          return (
            <rect
              key={`${x}-${y}`}
              x={PAD.left + col * cellSize + 0.5}
              y={PAD.top + row * cellSize + 0.5}
              width={cellSize - 1}
              height={cellSize - 1}
              fill={isMax ? BLOOD : 'currentColor'}
              fillOpacity={isMax ? 1 : opacity}
              className="stroke-[#0a0a0b]/25 dark:stroke-white/20"
              strokeWidth={1}
            >
              <title>{`${x}, ${y}: ${v}`}</title>
            </rect>
          );
        }),
      )}
      {ys.map((y, row) => (
        <text
          key={y}
          x={PAD.left - 6}
          y={PAD.top + row * cellSize + cellSize / 2}
          textAnchor="end"
          dominantBaseline="central"
          fontSize={9}
          className="fill-[#0a0a0b]/60 font-mono dark:fill-white/50"
        >
          {y}
        </text>
      ))}
      {xs.map((x, col) => (
        <text
          key={x}
          x={PAD.left + col * cellSize + cellSize / 2}
          y={height - 8}
          textAnchor="middle"
          fontSize={9}
          className="fill-[#0a0a0b]/60 font-mono dark:fill-white/50"
        >
          {x}
        </text>
      ))}
    </svg>
  );
}

const DEMO: MatrixChartDatum[] = [
  { x: 'Mon', y: 'Build', value: 12 },
  { x: 'Tue', y: 'Build', value: 28 },
  { x: 'Wed', y: 'Build', value: 7 },
  { x: 'Thu', y: 'Build', value: 19 },
  { x: 'Mon', y: 'Test', value: 5 },
  { x: 'Tue', y: 'Test', value: 16 },
  { x: 'Wed', y: 'Test', value: 34 },
  { x: 'Thu', y: 'Test', value: 9 },
  { x: 'Mon', y: 'Ship', value: 3 },
  { x: 'Tue', y: 'Ship', value: 11 },
  { x: 'Wed', y: 'Ship', value: 8 },
  { x: 'Thu', y: 'Ship', value: 22 },
];

export function MatrixChartDemo() {
  return (
    <div className="space-y-2">
      <MatrixChart data={DEMO} />
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/55 dark:text-white/45">
        Commit density — peak cell marked in blood
      </p>
    </div>
  );
}
