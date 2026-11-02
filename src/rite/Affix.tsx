import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Plus } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface AffixPosition {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export interface AffixProps {
  children: ReactNode;
  position?: AffixPosition;
  className?: string;
}

/**
 * Fixed-position portal wrapper pinned to document.body.
 * Defaults to bottom-right.
 */
export function Affix({ children, position = { bottom: 16, right: 16 }, className }: AffixProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <div className={cx('fixed z-50', className)} style={{ ...position }}>
      {children}
    </div>,
    document.body,
  );
}

export function AffixDemo() {
  return (
    <div className="rounded-[2px] border border-dashed border-[#0a0a0b]/25 p-4 dark:border-white/20">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0a0a0b]/50 dark:text-white/40">
        Pinned witness
      </p>
      <p className="mt-2 text-[13px] leading-6 text-[#0a0a0b]/80 dark:text-white/80">
        The ink slab in the viewport corner lives in <span className="font-mono">document.body</span>,
        not inside this box — inspect the DOM to verify.
      </p>
      <Affix>
        <button
          type="button"
          aria-label="Pinned quick action"
          className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-[#0a0a0b] bg-[#0a0a0b] text-[#e9e7e2] shadow-[0_8px_24px_rgba(10,10,11,0.35)] outline-none transition-colors hover:bg-[#1c0b0a] hover:text-white focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:border-white/25 dark:bg-[#e9e7e2] dark:text-black dark:hover:bg-white"
        >
          <Plus size={16} aria-hidden />
        </button>
      </Affix>
    </div>
  );
}
