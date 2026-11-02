import { useRef, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface ScrollerProps {
  children: ReactNode;
  label?: string;
  className?: string;
}

/**
 * Horizontal scroll container with navigation controls.
 */
export function Scroller({ children, label, className }: ScrollerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const nudge = (dir: 1 | -1) => {
    ref.current?.scrollBy({ left: dir * 200, behavior: 'smooth' });
  };

  const btn =
    'flex h-7 w-7 items-center justify-center rounded-[2px] border border-[#0a0a0b]/15 bg-white text-[#0a0a0b]/70 transition-colors hover:border-[#d42b1e] hover:text-[#d42b1e] dark:border-white/15 dark:bg-white/[0.03] dark:text-white/70 dark:hover:border-[#d42b1e] dark:hover:text-[#ff6b5e]';

  return (
    <div className={cx('rounded-[2px] border border-[#0a0a0b]/15 dark:border-white/10', className)}>
      <div className="flex items-center justify-between border-b border-dashed border-[#0a0a0b]/10 px-3 py-1.5 dark:border-white/10">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/50 dark:text-white/40">
          {label ?? 'Scroller'}
        </span>
        <div className="flex items-center gap-1">
          <button type="button" aria-label="Scroll left" onClick={() => nudge(-1)} className={btn}>
            <ChevronLeft size={14} strokeWidth={2} />
          </button>
          <button type="button" aria-label="Scroll right" onClick={() => nudge(1)} className={btn}>
            <ChevronRight size={14} strokeWidth={2} />
          </button>
        </div>
      </div>
      <div ref={ref} className="flex gap-2 overflow-x-auto px-3 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
    </div>
  );
}

const DOSSIERS = ['VES-001', 'VES-014', 'VES-027', 'VES-033', 'VES-048', 'VES-052', 'VES-069', 'VES-077'];

export function ScrollerDemo() {
  return (
    <Scroller label="Dossiers / 008">
      {DOSSIERS.map((d) => (
        <div
          key={d}
          className="w-36 shrink-0 rounded-[2px] border border-[#0a0a0b]/15 bg-white p-3 dark:border-white/10 dark:bg-white/[0.02]"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#d42b1e] dark:text-[#ff6b5e]">{d}</p>
          <p className="mt-1 text-[12px] font-medium text-[#0a0a0b] dark:text-[#e9e7e2]">Field record</p>
          <p className="mt-0.5 font-mono text-[10px] text-[#0a0a0b]/50 dark:text-white/40">witnessed / sealed</p>
        </div>
      ))}
    </Scroller>
  );
}
