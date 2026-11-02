import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface ComboboxPopoverProps {
  buttonLabel: string;
  children: ReactNode;
  opened?: boolean;
  defaultOpened?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function ComboboxPopover({
  buttonLabel,
  children,
  opened,
  defaultOpened = false,
  onOpenChange,
  className,
}: ComboboxPopoverProps) {
  const [inner, setInner] = useState(defaultOpened);
  const open = opened ?? inner;
  const setOpen = (v: boolean) => {
    if (opened === undefined) setInner(v);
    onOpenChange?.(v);
  };
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cx('relative inline-block', className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
        className={cx(
          'inline-flex h-9 items-center gap-2 rounded-[2px] border px-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] outline-none transition-colors',
          'border-[#0a0a0b]/25 bg-transparent text-[#0a0a0b] hover:border-[#0a0a0b] dark:border-white/25 dark:text-[#e9e7e2] dark:hover:border-white',
          'focus-visible:ring-1 focus-visible:ring-[#d42b1e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#e9e7e2] dark:focus-visible:ring-offset-[#08090b]',
        )}
      >
        {buttonLabel}
        <ChevronDown size={14} aria-hidden className={cx('transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div
          id={panelId}
          role="listbox"
          aria-label={buttonLabel}
          className="absolute left-0 top-full z-50 mt-2 min-w-52 rounded-[2px] border border-[#0a0a0b]/20 bg-white py-1 shadow-[0_8px_24px_rgba(10,10,11,0.16)] dark:border-white/15 dark:bg-[#0e0f11] dark:shadow-none"
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function ComboboxPopoverDemo() {
  const [picked, setPicked] = useState('Select record');
  const options = ['VES-001', 'VES-002', 'VES-003'];
  return (
    <div className="flex items-center gap-3">
      <ComboboxPopover buttonLabel={picked}>
        {options.map((o) => (
          <button
            key={o}
            type="button"
            role="option"
            aria-selected={picked === o}
            onClick={() => setPicked(o)}
            className="flex w-full items-center justify-between px-3 py-2 text-left font-mono text-[11px] uppercase tracking-[0.14em] text-[#0a0a0b]/85 outline-none transition-colors hover:bg-[#0a0a0b]/5 focus-visible:bg-[#0a0a0b]/5 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#d42b1e] dark:text-white/85 dark:hover:bg-white/5 dark:focus-visible:bg-white/5"
          >
            {o}
            {picked === o && <span aria-hidden className="text-[10px] opacity-50">SET</span>}
          </button>
        ))}
      </ComboboxPopover>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-50">click · esc closes</span>
    </div>
  );
}
