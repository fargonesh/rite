import type { SVGAttributes } from 'react';
import { cx } from '../lib/cx.ts';

export interface RingProgressProps extends SVGAttributes<SVGSVGElement> {
  value: number;
  size?: number;
  thickness?: number;
  label?: string;
}

function clamp(v: number): number {
  if (Number.isNaN(v)) return 0;
  return Math.min(100, Math.max(0, v));
}

export function RingProgress({ value, size = 80, thickness = 8, label, className, ...rest }: RingProgressProps) {
  const pct = clamp(value);
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct / 100);
  const critical = pct >= 90;
  const stroke = critical ? '#d42b1e' : 'currentColor';
  const center = size / 2;
  return (
    <div className="inline-flex flex-col items-center gap-1.5">
      <svg
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={cx('text-[#0a0a0b] dark:text-[#e9e7e2]', className)}
        {...rest}
      >
        <circle cx={center} cy={center} r={r} fill="none" strokeWidth={thickness} className="stroke-[#0a0a0b]/10 dark:stroke-white/10" />
        <circle
          cx={center}
          cy={center}
          r={r}
          fill="none"
          stroke={stroke}
          strokeWidth={thickness}
          strokeLinecap="butt"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${center} ${center})`}
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
        <text
          x={center}
          y={center}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-current font-mono"
          fontSize={size * 0.2}
        >
          {Math.round(pct)}%
        </text>
      </svg>
      {label && (
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0a0a0b]/60 dark:text-white/50">
          {label}
        </span>
      )}
    </div>
  );
}

export function RingProgressDemo() {
  return (
    <div className="flex flex-wrap items-end gap-6">
      <RingProgress value={25} label="Queued" />
      <RingProgress value={62} label="Active" />
      <RingProgress value={96} label="Critical" />
      <RingProgress value={75} size={56} thickness={6} />
    </div>
  );
}
