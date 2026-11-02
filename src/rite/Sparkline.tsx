import type { HTMLAttributes } from 'react';
import { cx } from '../lib/cx.ts';

export type SparklineTone = 'ink' | 'blood';

export interface SparklineProps extends HTMLAttributes<HTMLDivElement> {
  data: number[];
  width?: number;
  height?: number;
  tone?: SparklineTone;
}

function toPoints(data: number[], width: number, height: number, pad = 2): string {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const n = data.length;
  return data
    .map((v, i) => {
      const x = n === 1 ? width / 2 : pad + (i / (n - 1)) * (width - pad * 2);
      const y = pad + (1 - (v - min) / span) * (height - pad * 2);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');
}

export function Sparkline({
  data,
  width = 120,
  height = 32,
  tone = 'ink',
  className,
  ...rest
}: SparklineProps) {
  const safe = data.filter((v) => Number.isFinite(v));
  const label = safe.length > 0 ? `Sparkline trend: ${safe.join(', ')}` : 'Sparkline: no data';
  const stroke = tone === 'blood' ? '#d42b1e' : 'currentColor';
  const pts = safe.length > 0 ? toPoints(safe, width, height) : '';
  const last = safe.length > 0 ? pts.split(' ').pop()?.split(',') : undefined;
  return (
    <div className={cx('inline-flex', className)} {...rest}>
      <svg
        role="img"
        aria-label={label}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="text-[#0a0a0b] dark:text-[#e9e7e2]"
      >
        {safe.length > 1 && (
          <polyline
            points={pts}
            fill="none"
            stroke={stroke}
            strokeWidth={1.5}
            strokeLinejoin="miter"
            strokeLinecap="square"
          />
        )}
        {safe.length === 1 && (
          <rect
            x={width / 2 - 2}
            y={height / 2 - 2}
            width={4}
            height={4}
            fill={stroke}
          />
        )}
        {safe.length > 1 && last && (
          <rect
            x={Number(last[0]) - 2}
            y={Number(last[1]) - 2}
            width={4}
            height={4}
            fill={stroke}
          />
        )}
      </svg>
    </div>
  );
}

export function SparklineDemo() {
  return (
    <div className="flex flex-wrap items-end gap-6">
      <div className="flex flex-col gap-1.5">
        <Sparkline data={[4, 7, 5, 9, 8, 12, 11, 15]} />
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0a0a0b]/60 dark:text-white/50">
          Ink / rising
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        <Sparkline data={[15, 11, 12, 8, 9, 5, 7, 4]} tone="blood" />
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0a0a0b]/60 dark:text-white/50">
          Blood / falling
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        <Sparkline data={[8, 8, 8, 8, 8, 8]} width={96} height={24} />
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0a0a0b]/60 dark:text-white/50">
          Flat
        </span>
      </div>
    </div>
  );
}
