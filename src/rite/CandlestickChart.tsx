import { cx } from '../lib/cx.ts';

export interface CandleDatum {
  label: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface CandlestickChartProps {
  data: CandleDatum[];
  height?: number;
  className?: string;
}

const W = 560;
const PAD_L = 8;
const PAD_R = 8;
const PAD_T = 12;
const PAD_B = 24;

function extent(data: CandleDatum[]): { min: number; max: number } {
  let min = Infinity;
  let max = -Infinity;
  for (const d of data) {
    if (d.low < min) min = d.low;
    if (d.high > max) max = d.high;
  }
  if (!Number.isFinite(min) || !Number.isFinite(max)) return { min: 0, max: 1 };
  if (min === max) return { min: min - 1, max: max + 1 };
  const pad = (max - min) * 0.08;
  return { min: min - pad, max: max + pad };
}

export function CandlestickChart({ data, height = 220, className }: CandlestickChartProps) {
  const { min, max } = extent(data);
  const plotH = Math.max(40, height - PAD_T - PAD_B);
  const y = (v: number) => PAD_T + (1 - (v - min) / (max - min)) * plotH;
  const n = Math.max(data.length, 1);
  const slot = (W - PAD_L - PAD_R) / n;
  const bodyW = Math.max(6, Math.min(26, slot * 0.55));

  return (
    <figure className={cx('w-full', className)}>
      <svg
        viewBox={`0 0 ${W} ${height}`}
        className="block w-full"
        role="img"
        aria-label={`Candlestick chart with ${data.length} periods, range ${min.toFixed(1)} to ${max.toFixed(1)}`}
      >
        {[0.25, 0.5, 0.75].map((t) => {
          const gy = PAD_T + plotH * t;
          return (
            <line
              key={t}
              x1={PAD_L}
              x2={W - PAD_R}
              y1={gy}
              y2={gy}
              className="stroke-[#0a0a0b]/10 dark:stroke-white/10"
              strokeWidth={1}
            />
          );
        })}
        {data.map((d, i) => {
          const cxPos = PAD_L + slot * i + slot / 2;
          const up = d.close >= d.open;
          const top = y(Math.max(d.open, d.close));
          const bottom = y(Math.min(d.open, d.close));
          const bodyH = Math.max(2, bottom - top);
          return (
            <g key={`${d.label}-${i}`}>
              <line
                x1={cxPos}
                x2={cxPos}
                y1={y(d.high)}
                y2={y(d.low)}
                className={up ? 'stroke-[#0a0a0b]/70 dark:stroke-white/60' : 'stroke-[#d42b1e]/80'}
                strokeWidth={1}
              />
              <rect
                x={cxPos - bodyW / 2}
                y={top}
                width={bodyW}
                height={bodyH}
                className={
                  up ? 'fill-[#0a0a0b] dark:fill-[#e9e7e2]' : 'fill-[#d42b1e]'
                }
              />
              <text
                x={cxPos}
                y={height - 8}
                textAnchor="middle"
                className="fill-[#0a0a0b]/50 font-mono dark:fill-white/40"
                fontSize={10}
              >
                {d.label}
              </text>
              <title>{`${d.label}: O ${d.open} H ${d.high} L ${d.low} C ${d.close}`}</title>
            </g>
          );
        })}
        <text
          x={W - PAD_R}
          y={PAD_T + 2}
          textAnchor="end"
          className="fill-[#0a0a0b]/50 font-mono dark:fill-white/40"
          fontSize={10}
        >
          {max.toFixed(1)}
        </text>
        <text
          x={W - PAD_R}
          y={PAD_T + plotH}
          textAnchor="end"
          className="fill-[#0a0a0b]/50 font-mono dark:fill-white/40"
          fontSize={10}
        >
          {min.toFixed(1)}
        </text>
      </svg>
      <figcaption className="mt-1 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-[#0a0a0b]/50 dark:text-white/40">
        <span>OHLC</span>
        <span className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1">
            <span className="inline-block h-2 w-2 bg-[#0a0a0b] dark:bg-[#e9e7e2]" /> Up
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="inline-block h-2 w-2 bg-[#d42b1e]" /> Down
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

const DEMO: CandleDatum[] = [
  { label: 'M1', open: 42, high: 51, low: 38, close: 48 },
  { label: 'M2', open: 48, high: 56, low: 44, close: 45 },
  { label: 'M3', open: 45, high: 50, low: 39, close: 41 },
  { label: 'M4', open: 41, high: 47, low: 36, close: 44 },
  { label: 'M5', open: 44, high: 60, low: 43, close: 57 },
  { label: 'M6', open: 57, high: 62, low: 50, close: 52 },
  { label: 'M7', open: 52, high: 58, low: 49, close: 55 },
  { label: 'M8', open: 55, high: 59, low: 46, close: 47 },
];

export function CandlestickChartDemo() {
  return (
    <div className="w-full max-w-md border border-[#0a0a0b]/15 p-3 dark:border-white/15">
      <CandlestickChart data={DEMO} />
    </div>
  );
}
