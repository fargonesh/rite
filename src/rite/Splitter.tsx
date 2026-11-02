import { useCallback, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export interface SplitterProps {
  first: ReactNode;
  second: ReactNode;
  initialSplit?: number;
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

function clampSplit(v: number): number {
  if (Number.isNaN(v)) return 0.5;
  return Math.min(0.9, Math.max(0.1, v));
}

export function Splitter({
  first,
  second,
  initialSplit = 0.5,
  direction = 'horizontal',
  className,
}: SplitterProps) {
  const [split, setSplit] = useState(() => clampSplit(initialSplit));
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const vertical = direction === 'vertical';

  const ratioFromClient = useCallback(
    (clientX: number, clientY: number): number => {
      const el = trackRef.current;
      if (!el) return split;
      const rect = el.getBoundingClientRect();
      if (vertical) {
        if (rect.height <= 0) return split;
        return clampSplit((clientY - rect.top) / rect.height);
      }
      if (rect.width <= 0) return split;
      return clampSplit((clientX - rect.left) / rect.width);
    },
    [split, vertical],
  );

  return (
    <div
      ref={trackRef}
      className={cx(
        'flex w-full overflow-hidden rounded-[2px] border border-[#0a0a0b]/15 dark:border-white/15',
        vertical ? 'h-64 flex-col' : 'h-48 flex-row',
        className,
      )}
    >
      <div className="min-h-0 min-w-0 overflow-auto" style={{ flex: `0 0 ${split * 100}%` }}>
        {first}
      </div>
      <div
        role="separator"
        aria-orientation={vertical ? 'horizontal' : 'vertical'}
        aria-valuenow={Math.round(split * 100)}
        aria-valuemin={10}
        aria-valuemax={90}
        tabIndex={0}
        aria-label="Resize panes"
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            setSplit((s) => clampSplit(s - 0.02));
          } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            setSplit((s) => clampSplit(s + 0.02));
          } else if (e.key === 'Home') {
            e.preventDefault();
            setSplit(0.1);
          } else if (e.key === 'End') {
            e.preventDefault();
            setSplit(0.9);
          }
        }}
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          setDragging(true);
          setSplit(ratioFromClient(e.clientX, e.clientY));
        }}
        onPointerMove={(e) => {
          if (!dragging) return;
          setSplit(ratioFromClient(e.clientX, e.clientY));
        }}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        className={cx(
          'flex shrink-0 items-center justify-center bg-[#0a0a0b]/5 outline-none transition-colors hover:bg-[#0a0a0b]/10 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#d42b1e] dark:bg-white/5 dark:hover:bg-white/10',
          vertical ? 'h-5 w-full cursor-row-resize flex-row' : 'h-full w-5 cursor-col-resize flex-col',
          dragging && 'bg-[#0a0a0b]/10 dark:bg-white/10',
        )}
      >
        <span
          aria-hidden="true"
          className={cx('flex gap-1', vertical ? 'flex-row' : 'flex-col')}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1 w-1 rounded-full bg-[#0a0a0b]/40 dark:bg-white/40"
            />
          ))}
        </span>
      </div>
      <div className="min-h-0 min-w-0 flex-1 overflow-auto">{second}</div>
    </div>
  );
}

export function SplitterDemo() {
  return (
    <div className="space-y-4">
      <Splitter
        first={
          <div className="flex h-full items-center justify-center bg-[#0a0a0b]/5 font-mono text-[11px] uppercase tracking-[0.16em] dark:bg-white/5">
            Pane A
          </div>
        }
        second={
          <div className="flex h-full items-center justify-center font-mono text-[11px] uppercase tracking-[0.16em] text-[#0a0a0b]/60 dark:text-white/50">
            Pane B
          </div>
        }
      />
      <Splitter
        direction="vertical"
        initialSplit={0.4}
        first={
          <div className="flex h-full items-center justify-center bg-[#0a0a0b]/5 font-mono text-[11px] uppercase tracking-[0.16em] dark:bg-white/5">
            Top
          </div>
        }
        second={
          <div className="flex h-full items-center justify-center font-mono text-[11px] uppercase tracking-[0.16em] text-[#0a0a0b]/60 dark:text-white/50">
            Bottom
          </div>
        }
      />
    </div>
  );
}
