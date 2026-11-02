import type { ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export type OverlayColor = 'black' | 'white';

export interface OverlayProps {
  children?: ReactNode;
  label?: string;
  opacity?: number;
  color?: OverlayColor;
  className?: string;
}

function clamp01(n: number): number {
  if (Number.isNaN(n)) return 0.5;
  return Math.min(1, Math.max(0, n));
}

export function Overlay({ children, label, opacity = 0.55, color = 'black', className }: OverlayProps) {
  const dim = clamp01(opacity);
  const backgroundColor = color === 'white' ? `rgba(233, 231, 226, ${dim})` : `rgba(10, 10, 11, ${dim})`;
  return (
    <div
      aria-hidden={label ? undefined : true}
      role={label ? 'region' : 'presentation'}
      aria-label={label}
      style={{ backgroundColor }}
      className={cx('absolute inset-0 z-10 flex items-center justify-center rounded-[2px]', className)}
    >
      {label && (
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#e9e7e2] mix-blend-difference">
          {label}
        </p>
      )}
      {children}
    </div>
  );
}

export function OverlayDemo() {
  return (
    <div className="relative h-40 overflow-hidden rounded-[2px] border border-[#0a0a0b]/20 dark:border-white/15">
      <div className="grid h-full grid-cols-3 gap-px bg-[#0a0a0b]/10 p-4 dark:bg-white/10">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-[#e9e7e2] dark:bg-[#0e0f11]" />
        ))}
      </div>
      <Overlay label="Sealed — file 047" opacity={0.6} />
    </div>
  );
}
