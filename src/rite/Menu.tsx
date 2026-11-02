import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { ArrowRight, ChevronDown, X } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface MenuItem {
  label: string;
  onSelect?: () => void;
  destructive?: boolean;
  disabled?: boolean;
}

export interface MenuProps {
  trigger: ReactNode;
  items: MenuItem[];
  opened?: boolean;
  defaultOpened?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function Menu({ trigger, items, opened, defaultOpened = false, onOpenChange, className }: MenuProps) {
  const [inner, setInner] = useState(defaultOpened);
  const open = opened ?? inner;
  const setOpen = (v: boolean) => {
    if (opened === undefined) setInner(v);
    onOpenChange?.(v);
  };
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

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
      <span
        role="button"
        tabIndex={0}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
            e.preventDefault();
            setOpen(true);
          } else if (e.key === 'Escape') setOpen(false);
        }}
        className="inline-flex cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#d42b1e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#e9e7e2] dark:focus-visible:ring-offset-[#08090b]"
      >
        {trigger}
      </span>
      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label="Actions"
          className="absolute left-0 top-full z-50 mt-2 min-w-52 rounded-[2px] border border-[#0a0a0b]/20 bg-white py-1 shadow-[0_8px_24px_rgba(10,10,11,0.16)] dark:border-white/15 dark:bg-[#0e0f11] dark:shadow-none"
        >
          <p className="border-b border-dashed border-[#0a0a0b]/15 px-3 pb-1.5 pt-2 font-mono text-[10px] uppercase tracking-[0.18em] opacity-50 dark:border-white/10">
            ◈ Directive
          </p>
          {items.map((item, i) => (
            <button
              key={i}
              role="menuitem"
              type="button"
              disabled={item.disabled}
              onClick={() => {
                item.onSelect?.();
                setOpen(false);
              }}
              className={cx(
                'flex w-full items-center justify-between gap-4 px-3 py-2 text-left text-[13px] outline-none transition-colors',
                'hover:bg-[#0a0a0b]/5 focus-visible:bg-[#0a0a0b]/5 dark:hover:bg-white/5 dark:focus-visible:bg-white/5',
                'focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#d42b1e]',
                'disabled:cursor-not-allowed disabled:opacity-40',
                item.destructive ? 'text-[#d42b1e]' : 'text-[#0a0a0b]/85 dark:text-white/85',
              )}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.14em]">{item.label}</span>
              <span aria-hidden className="inline-flex text-[10px] opacity-40">
                {item.destructive ? <X size={12} strokeWidth={2} /> : <ArrowRight size={12} strokeWidth={2} />}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function MenuDemo() {
  return (
    <div className="flex items-center gap-3">
      <Menu
        trigger={
          <span className="inline-flex h-9 items-center gap-2 rounded-[2px] border border-[#0a0a0b]/25 bg-transparent px-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#0a0a0b] transition-colors hover:border-[#0a0a0b] dark:border-white/25 dark:text-[#e9e7e2] dark:hover:border-white">
            Actions <ChevronDown size={12} strokeWidth={2} aria-hidden />
          </span>
        }
        items={[
          { label: 'Rename file' },
          { label: 'Duplicate' },
          { label: 'Archive' },
          { label: 'Delete record', destructive: true },
        ]}
      />
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-50">click · esc closes</span>
    </div>
  );
}
