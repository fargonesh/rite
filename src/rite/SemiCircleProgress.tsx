import { cx } from '../lib/cx.ts';

export interface SemiCircleProgressProps {
  value: number;
  size?: number;
  label?: string;
  className?: string;
}

function clamp(v: number): number {
  if (Number.isNaN(v)) return 0;
  return Math.min(100, Math.max(0, v));
}

export function SemiCircleProgress({ value, size = 160, label, className }: SemiCircleProgressProps) {
  const pct = clamp(value);
  const critical = pct >= 90;
  const w = size;
  const h = size / 2 + 8;
  const cy = size / 2;
  const r = size / 2 - 8;
  const sw = Math.max(6, Math.round(size / 14));
  return (
    <div className={cx('inline-flex flex-col items-center', className)}>
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progress'}
      >
        <path
          d={`M 8 ${cy} A ${r} ${r} 0 0 1 ${w - 8} ${cy}`}
          fill="none"
          pathLength={100}
          strokeDasharray="100 100"
          className="stroke-[#0a0a0b]/10 dark:stroke-white/10"
          strokeWidth={sw}
          strokeLinecap="butt"
        />
        <path
          d={`M 8 ${cy} A ${r} ${r} 0 0 1 ${w - 8} ${cy}`}
          fill="none"
          pathLength={100}
          strokeDasharray={`${pct} 100`}
          className={critical ? 'stroke-[#d42b1e]' : 'stroke-[#0a0a0b] dark:stroke-[#e9e7e2]'}
          strokeWidth={sw}
          strokeLinecap="butt"
          style={{ transition: 'stroke-dasharray 0.5s ease' }}
        />
        <text
          x={w / 2}
          y={cy - 4}
          textAnchor="middle"
          className="fill-[#0a0a0b] font-mono dark:fill-[#e9e7e2]"
          fontSize={Math.max(14, size / 7)}
        >
          {Math.round(pct)}%
        </text>
      </svg>
      {label && (
        <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/60 dark:text-white/50">
          {label}
        </span>
      )}
    </div>
  );
}

export function SemiCircleProgressDemo() {
  return (
    <div className="flex items-end gap-6 border border-[#0a0a0b]/15 p-4 dark:border-white/15">
      <SemiCircleProgress value={34} label="Sync" />
      <SemiCircleProgress value={68} label="Build" />
      <SemiCircleProgress value={96} label="Risk" />
    </div>
  );
}
