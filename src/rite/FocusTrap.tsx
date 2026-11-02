import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent, ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export interface FocusTrapProps {
  children: ReactNode;
  active?: boolean;
  className?: string;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function FocusTrap({ children, active = true, className }: FocusTrapProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!active) return;
    restoreRef.current = document.activeElement;
    const root = rootRef.current;
    const first = root?.querySelector<HTMLElement>(FOCUSABLE);
    (first ?? root)?.focus();
    return () => {
      const el = restoreRef.current;
      if (el instanceof HTMLElement) el.focus();
      restoreRef.current = null;
    };
  }, [active]);

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!active || e.key !== 'Tab') return;
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (el) => !el.hasAttribute('disabled') && el.offsetParent !== null,
    );
    if (items.length === 0) {
      e.preventDefault();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div ref={rootRef} onKeyDown={onKeyDown} tabIndex={-1} className={cx('outline-none', className)}>
      {children}
    </div>
  );
}

export function FocusTrapDemo() {
  const [active, setActive] = useState(true);
  return (
    <div className="rounded-[2px] border border-[#0a0a0b]/20 p-4 dark:border-white/15">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0a0a0b]/50 dark:text-white/40">
          Trap {active ? 'engaged' : 'released'}
        </p>
        <button
          onClick={() => setActive((v) => !v)}
          aria-pressed={active}
          className="h-7 rounded-[2px] border border-[#0a0a0b]/25 px-3 font-mono text-[10px] uppercase tracking-[0.18em] outline-none hover:border-[#d42b1e] hover:text-[#d42b1e] focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:border-white/25"
        >
          {active ? 'Release' : 'Engage'}
        </button>
      </div>
      <FocusTrap active={active}>
        <div className="flex flex-wrap gap-2">
          <button className="h-8 rounded-[2px] bg-[#0a0a0b] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#e9e7e2] dark:bg-[#e9e7e2] dark:text-black">
            First
          </button>
          <button className="h-8 rounded-[2px] border border-[#0a0a0b]/25 px-4 font-mono text-[11px] uppercase tracking-[0.18em] dark:border-white/25">
            Second
          </button>
          <button className="h-8 rounded-[2px] border border-[#d42b1e]/60 px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#d42b1e]">
            Third
          </button>
        </div>
      </FocusTrap>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[#0a0a0b]/45 dark:text-white/35">
        Tab cycles within the three seals; focus returns here on release.
      </p>
    </div>
  );
}
