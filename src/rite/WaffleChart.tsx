import { cx } from '../lib/cx.ts';

export interface WaffleChartProps {
  /** Filled portion, 0-100. */
  value: number;
  /** Total cells in the grid. Defaults to 100 (10x10). */
  total?: number;
  label?: string;
  ariaLabel?: string;
  className?: string;
}

const BLOOD = '#d42b1e';
const COLS = 10;
const CELL = 18;
const GAP = 4;

function clampPct(v: number): number {
  return Math.min(100, Math.max(0, v));
}

export function WaffleChart({
  value,
  total = 100,
  label,
  ariaLabel,
  className,
}: WaffleChartProps) {
  const safeTotal = total > 0 ? Math.floor(total) : 100;
  const filled = Math.round((clampPct(value) / 100) * safeTotal);
  const rows = Math.ceil(safeTotal / COLS);
  const width = COLS * CELL + (COLS - 1) * GAP;
  const height = rows * CELL + (rows - 1) * GAP;
  const text = ariaLabel ?? `Waffle chart: ${clampPct(value)} percent${label ? ` ${label}` : ''}`;

  return (
    <div className={cx('text-[#0a0a0b] dark:text-[#e9e7e2]', className)}>
      <svg
        role="img"
        aria-label={text}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="block"
      >
        <title>{text}</title>
        {Array.from({ length: safeTotal }, (_, i) => {
          const col = i % COLS;
          const row = Math.floor(i / COLS);
          const x = col * (CELL + GAP);
          const y = row * (CELL + GAP);
          const isFilled = i < filled;
          const isFrontier = isFilled && filled > 0 && filled < safeTotal && i === filled - 1;
          return isFilled ? (
            <rect
              key={i}
              x={x}
              y={y}
              width={CELL}
              height={CELL}
              fill={isFrontier ? BLOOD : 'currentColor'}
            />
          ) : (
            <rect
              key={i}
              x={x + 0.5}
              y={y + 0.5}
              width={CELL - 1}
              height={CELL - 1}
              fill="none"
              strokeWidth={1}
              className="stroke-[#0a0a0b]/25 dark:stroke-white/20"
            />
          );
        })}
      </svg>
      <p className="mt-2 font-mono text-[11px] tabular-nums text-[#0a0a0b] dark:text-[#e9e7e2]">
        {clampPct(value)}%{label ? <span className="ml-2 uppercase tracking-[0.16em] text-[#0a0a0b]/60 dark:text-white/55">{label}</span> : null}
      </p>
    </div>
  );
}

export function WaffleChartDemo() {
  return (
    <div className="space-y-2">
      <WaffleChart value={63} label="Rite complete" />
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/55 dark:text-white/45">
        Completion grid — frontier cell marked in blood
      </p>
    </div>
  );
}
