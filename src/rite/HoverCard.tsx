import { useId, useRef, useState, type ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export interface HoverCardProps {
  target: ReactNode;
  children: ReactNode;
  openDelay?: number;
  className?: string;
}

export function HoverCard({ target, children, openDelay = 200, className }: HoverCardProps) {
  const [open, setOpen] = useState(false);
  const timer = useRef<number | null>(null);
  const panelId = useId();

  const scheduleOpen = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(true), openDelay);
  };
  const close = () => {
    if (timer.current) window.clearTimeout(timer.current);
    setOpen(false);
  };

  return (
    <span
      className={cx('relative inline-block', className)}
      onMouseEnter={scheduleOpen}
      onMouseLeave={close}
      onFocus={scheduleOpen}
      onBlur={close}
    >
      <span aria-describedby={panelId} className="inline-flex outline-none focus-visible:ring-1 focus-visible:ring-[#d42b1e]">
        {target}
      </span>
      {open && (
        <span
          id={panelId}
          role="dialog"
          aria-label="Dossier"
          className="absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 rounded-[2px] border border-[#0a0a0b]/20 bg-white p-3.5 text-left shadow-[0_8px_24px_rgba(10,10,11,0.16)] dark:border-white/15 dark:bg-[#0e0f11] dark:shadow-none"
        >
          <span aria-hidden className="absolute -top-2 left-2 bg-inherit px-0.5 text-[10px] text-[#0a0a0b]/40 dark:text-white/30">+</span>
          <span aria-hidden className="absolute -top-2 right-2 bg-inherit px-0.5 text-[10px] text-[#0a0a0b]/40 dark:text-white/30">+</span>
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] opacity-50">◈ Dossier</span>
          <span className="mt-1 block text-[13px] leading-5 text-[#0a0a0b]/85 dark:text-white/85">{children}</span>
          <span aria-hidden className="absolute left-1/2 top-full h-2 w-px -translate-x-1/2 border-l border-dashed border-[#0a0a0b]/30 dark:border-white/25" />
        </span>
      )}
    </span>
  );
}

export function HoverCardDemo() {
  return (
    <p className="text-[13px] text-[#0a0a0b]/85 dark:text-white/85">
      Field operative{' '}
      <HoverCard
        target={
          <button type="button" className="font-mono text-[12px] uppercase tracking-[0.14em] text-[#0a0a0b] underline decoration-dashed underline-offset-4 outline-none focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:text-white">
            VESPER-07
          </button>
        }
      >
        Codename NIGHTJAR. Last seen crossing the north witness line. Clearance verified, handle with care.
      </HoverCard>{' '}
      — hover or focus to inspect.
    </p>
  );
}
