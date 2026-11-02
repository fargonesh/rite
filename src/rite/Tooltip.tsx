import { useState } from 'react';
import type { ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export interface TooltipProps {
  label: string;
  children: ReactNode;
  position?: 'top';
  className?: string;
}

export function Tooltip({ label, children, position = 'top', className }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          data-position={position}
          className={cx(
            'pointer-events-none absolute bottom-full left-1/2 z-40 mb-2 -translate-x-1/2 whitespace-nowrap rounded-[2px] border border-[#0a0a0b] bg-[#0a0a0b] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#e9e7e2]',
            'dark:border-white/25 dark:bg-[#0e0f11] dark:text-white',
            className,
          )}
        >
          {label}
        </span>
      )}
    </span>
  );
}

export function TooltipDemo() {
  return (
    <p className="text-[13px]">
      Hover the{' '}
      <Tooltip label="FILE 047 — SEALED" position="top">
        <button
          type="button"
          className="rounded-[2px] border-b border-dashed border-[#0a0a0b]/40 font-mono text-[12px] uppercase tracking-[0.18em] outline-none hover:text-[#d42b1e] focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:border-white/40"
        >
          sealed exhibit
        </button>
      </Tooltip>{' '}
      to reveal its label.
    </p>
  );
}
