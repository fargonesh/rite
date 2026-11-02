import { cx } from '../lib/cx.ts';

export interface TreemapDatum {
  label: string;
  value: number;
}

export interface TreemapProps {
  data: TreemapDatum[];
  height?: number;
  ariaLabel?: string;
  className?: string;
}

const BLOOD = '#d42b1e';
const WIDTH = 320;

interface Cell {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Slice-and-dice rows: rows stacked vertically, cells within a row share the row height. */
function layout(data: TreemapDatum[], width: number, height: number): Cell[] {
  const total = data.reduce((acc, d) => acc + Math.max(0, d.value), 0);
  if (total <= 0 || data.length === 0) return data.map(() => ({ x: 0, y: 0, w: 0, h: 0 }));
  const rows: TreemapDatum[][] = [];
  let current: TreemapDatum[] = [];
  let currentSum = 0;
  for (const d of data) {
    current.push(d);
    currentSum += Math.max(0, d.value);
    const rowH = (currentSum / total) * height;
    if (rowH >= 44 || d === data[data.length - 1]) {
      rows.push(current);
      current = [];
      currentSum = 0;
    }
  }
  if (current.length > 0) rows.push(current);

  const cells: Cell[] = new Array(data.length);
  let y = 0;
  let index = 0;
  for (const row of rows) {
    const rowSum = row.reduce((acc, d) => acc + Math.max(0, d.value), 0);
    const rowH = (rowSum / total) * height;
    let x = 0;
    for (const d of row) {
      const w = rowSum === 0 ? 0 : (Math.max(0, d.value) / rowSum) * width;
      cells[index] = { x, y, w, h: rowH };
      index += 1;
      x += w;
    }
    y += rowH;
  }
  return cells;
}

export function Treemap({ data, height = 180, ariaLabel, className }: TreemapProps) {
  const sorted = [...data].sort((a, b) => b.value - a.value);
  const cells = layout(sorted, WIDTH, height);
  const max = sorted.length > 0 ? sorted[0].value : 0;
  const label =
    ariaLabel ??
    (sorted.length > 0
      ? `Treemap: ${sorted.map((d) => `${d.label} ${d.value}`).join(', ')}`
      : 'Treemap: no data');

  return (
    <svg
      role="img"
      aria-label={label}
      width="100%"
      height={height}
      viewBox={`0 0 ${WIDTH} ${height}`}
      className={cx('block text-[#0a0a0b] dark:text-[#e9e7e2]', className)}
    >
      <title>{label}</title>
      {sorted.map((d, i) => {
        const cell = cells[i];
        if (!cell || cell.w <= 0 || cell.h <= 0) return null;
        const isMax = d.value === max && max > 0;
        const opacity = max === 0 ? 0.1 : 0.12 + 0.68 * (d.value / max);
        const showLabel = cell.w > 44 && cell.h > 20;
        const showValue = cell.w > 44 && cell.h > 34;
        return (
          <g key={d.label}>
            <rect
              x={cell.x + 0.5}
              y={cell.y + 0.5}
              width={Math.max(cell.w - 1, 0)}
              height={Math.max(cell.h - 1, 0)}
              fill={isMax ? BLOOD : 'currentColor'}
              fillOpacity={isMax ? 1 : opacity}
              className="stroke-[#0a0a0b]/25 dark:stroke-white/20"
              strokeWidth={1}
            >
              <title>{`${d.label}: ${d.value}`}</title>
            </rect>
            {showLabel ? (
              <text
                x={cell.x + 6}
                y={cell.y + (showValue ? 14 : cell.h / 2)}
                dominantBaseline={showValue ? 'hanging' : 'central'}
                fontSize={9}
                fill={isMax ? '#ffffff' : 'currentColor'}
                opacity={isMax ? 1 : 0.85}
                className="font-mono uppercase"
                letterSpacing={1}
              >
                {d.label}
              </text>
            ) : null}
            {showValue ? (
              <text
                x={cell.x + 6}
                y={cell.y + 28}
                dominantBaseline="hanging"
                fontSize={10}
                fill={isMax ? '#ffffff' : 'currentColor'}
                opacity={isMax ? 0.9 : 0.6}
                className="font-mono"
              >
                {d.value}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

const DEMO: TreemapDatum[] = [
  { label: 'Grimoires', value: 42 },
  { label: 'Sigils', value: 27 },
  { label: 'Wards', value: 18 },
  { label: 'Candles', value: 11 },
  { label: 'Herbs', value: 6 },
];

export function TreemapDemo() {
  return (
    <div className="space-y-2">
      <Treemap data={DEMO} />
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/55 dark:text-white/45">
        Vault holdings — largest holding marked in blood
      </p>
    </div>
  );
}
