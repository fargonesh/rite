import type { ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export interface ScrollAreaProps {
  children: ReactNode;
  height?: number;
  className?: string;
}

/**
 * Area with custom scrollbars — thin native bar, hairline frame.
 */
export function ScrollArea({ children, height = 200, className }: ScrollAreaProps) {
  return (
    <div
      className={cx(
        'rounded-[2px] border border-[#0a0a0b]/15 bg-white dark:border-white/10 dark:bg-white/[0.02]',
        className,
      )}
    >
      <div className="border-b border-dashed border-[#0a0a0b]/10 px-3 py-1.5 dark:border-white/10">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/50 dark:text-white/40">
          ScrollArea / {height}px
        </span>
      </div>
      <div
        style={{ height }}
        className="overflow-y-auto px-3 py-2 [scrollbar-width:thin] [scrollbar-color:rgba(10,10,11,0.35)_transparent] dark:[scrollbar-color:rgba(255,255,255,0.25)_transparent]"
      >
        {children}
      </div>
    </div>
  );
}

export function ScrollAreaDemo() {
  return (
    <ScrollArea height={200}>
      <div className="space-y-2">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-[2px] border border-[#0a0a0b]/10 px-2 py-1.5 dark:border-white/10"
          >
            <span className="font-mono text-[11px] text-[#0a0a0b]/80 dark:text-white/70">
              LOG-{String(i + 1).padStart(3, '0')}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0a0a0b]/40 dark:text-white/30">
              witnessed
            </span>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
