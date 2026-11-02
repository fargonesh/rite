import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface PopoverProps {
  target: ReactNode;
  children: ReactNode;
  opened?: boolean;
  defaultOpened?: boolean;
  onOpenChange?: (opened: boolean) => void;
  position?: 'bottom';
  className?: string;
}

export function Popover({
  target,
  children,
  opened,
  defaultOpened = false,
  onOpenChange,
  position = 'bottom',
  className,
}: PopoverProps) {
  const [internal, setInternal] = useState(defaultOpened);
  const isControlled = opened !== undefined;
  const isOpen = isControlled ? opened : internal;
  const rootRef = useRef<HTMLDivElement>(null);

  const setOpen = (next: boolean) => {
    if (!isControlled) setInternal(next);
    onOpenChange?.(next);
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isControlled]);

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setOpen(!isOpen)}
        className="inline-flex h-8 items-center rounded-[2px] border border-[#0a0a0b]/25 px-3 font-mono text-[11px] uppercase tracking-[0.18em] outline-none hover:border-[#0a0a0b] focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:border-white/25 dark:hover:border-white"
      >
        {target}
      </button>
      {isOpen && (
        <div
          role="menu"
          data-position={position}
          className={cx(
            'absolute left-0 top-full z-40 mt-2 w-56 rounded-[2px] border border-[#0a0a0b]/20 bg-[#e9e7e2] p-3 text-[12px] leading-5 shadow-[0_4px_24px_rgba(0,0,0,0.2)]',
            'dark:border-white/15 dark:bg-[#0e0f11]',
            className,
          )}
        >
          <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] opacity-60">
            + field options
          </p>
          {children}
        </div>
      )}
    </div>
  );
}

export function PopoverDemo() {
  return (
    <Popover
      target={
        <span className="inline-flex items-center gap-1">
          Open file <ChevronDown size={12} strokeWidth={2} aria-hidden />
        </span>
      }
      defaultOpened
    >
      <p className="text-[#0a0a0b]/85 dark:text-white/85">
        Exhibit A, B, C. Click outside or press Esc to close.
      </p>
    </Popover>
  );
}
