import { cx } from '../lib/cx.ts';

export interface HeatmapLabels {
  rows: string[];
  cols: string[];
}

export interface HeatmapProps {
  data: number[][];
  labels?: HeatmapLabels;
  className?: string;
  ariaLabel?: string;
}

const CELL = 26;
const GAP = 4;
const PL = 36;
const PT = 22;
const BLOOD = '#d42b1e';

export function Heatmap({ data, labels, className, ariaLabel }: HeatmapProps) {
  const rows = data.length;
  const cols = data.reduce((m, r) => Math.max(m, r.length), 0);
  const flat = data.flat();
  const min = flat.length > 0 ? Math.min(...flat) : 0;
  const max = flat.length > 0 ? Math.max(...flat) : 1;
  const span = max - min;
  const rowLabels = labels?.rows ?? data.map((_, i) => `R${i + 1}`);
  const colLabels = labels?.cols ?? Array.from({ length: cols }, (_, j) => `C${j + 1}`);
  const width = PL + (cols > 0 ? cols * (CELL + GAP) - GAP : 0) + 8;
  const height = PT + (rows > 0 ? rows * (CELL + GAP) - GAP : 0) + 8;
  return (
    <div className={cx('text-[#0a0a0b] dark:text-[#e9e7e2]', className)}>
      <svg
        role="img"
        aria-label={ariaLabel ?? (flat.length > 0 ? `Heatmap: ${rows} rows by ${cols} columns, range ${min} to ${max}` : 'Heatmap: no data')}
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="block"
      >
        {colLabels.slice(0, cols).map((c, j) => (
          <text
            key={j}
            x={PL + j * (CELL + GAP) + CELL / 2}
            y={PT - 8}
            textAnchor="middle"
            fontSize={9}
            className="fill-[#0a0a0b]/60 font-mono dark:fill-white/50"
          >
            {c}
          </text>
        ))}
        {data.map((row, i) => (
          <g key={i}>
            <text
              x={PL - 6}
              y={PT + i * (CELL + GAP) + CELL / 2}
              textAnchor="end"
              dominantBaseline="central"
              fontSize={9}
              className="fill-[#0a0a0b]/60 font-mono dark:fill-white/50"
            >
              {rowLabels[i] ?? `R${i + 1}`}
            </text>
            {Array.from({ length: cols }, (_, j) => {
              const v = row[j] ?? min;
              const t = span === 0 ? 1 : (v - min) / span;
              const isMax = span > 0 && v === max;
              return (
                <rect
                  key={j}
                  x={PL + j * (CELL + GAP)}
                  y={PT + i * (CELL + GAP)}
                  width={CELL}
                  height={CELL}
                  fill={isMax ? BLOOD : 'currentColor'}
                  fillOpacity={isMax ? 0.9 : 0.08 + 0.84 * t}
                >
                  <title>{`${rowLabels[i] ?? `R${i + 1}`} / ${colLabels[j] ?? `C${j + 1}`}: ${v}`}</title>
                </rect>
              );
            })}
          </g>
        ))}
      </svg>
    </div>
  );
}

const DEMO: number[][] = [
  [3, 7, 12, 5, 9],
  [8, 14, 6, 11, 4],
  [5, 9, 18, 7, 13],
  [10, 4, 8, 15, 6],
];

export function HeatmapDemo() {
  return <Heatmap data={DEMO} labels={{ rows: ['Mon', 'Tue', 'Wed', 'Thu'], cols: ['A', 'B', 'C', 'D', 'E'] }} />;
}
