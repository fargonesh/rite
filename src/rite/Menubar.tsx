import { useEffect, useRef, useState } from 'react';
import { cx } from '../lib/cx.ts';

export interface MenubarItem {
  label: string;
  onSelect?: () => void;
  destructive?: boolean;
  disabled?: boolean;
}

export interface MenubarMenu {
  label: string;
  items: MenubarItem[];
}

export interface MenubarProps {
  menus: MenubarMenu[];
  className?: string;
}

export function Menubar({ menus, className }: MenubarProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpenIndex(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [openIndex]);

  return (
    <div
      ref={rootRef}
      role="menubar"
      aria-label="Application"
      className={cx(
        'flex items-stretch gap-0.5 rounded-[2px] border border-[#0a0a0b]/20 bg-transparent px-1 py-0.5 dark:border-white/15',
        className,
      )}
    >
      {menus.map((menu, i) => {
        const open = openIndex === i;
        return (
          <div key={menu.label} className="relative">
            <button
              type="button"
              role="menuitem"
              aria-haspopup="menu"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : i)}
              onMouseEnter={() => {
                if (openIndex !== null && openIndex !== i) setOpenIndex(i);
              }}
              className={cx(
                'h-8 px-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] outline-none transition-colors',
                open
                  ? 'bg-[#0a0a0b]/10 text-[#0a0a0b] dark:bg-white/10 dark:text-white'
                  : 'text-[#0a0a0b]/70 hover:bg-[#0a0a0b]/5 dark:text-white/60 dark:hover:bg-white/5',
                'focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#d42b1e]',
              )}
            >
              {menu.label}
            </button>
            {open && (
              <div
                role="menu"
                aria-label={menu.label}
                className="absolute left-0 top-full z-50 mt-1.5 min-w-52 rounded-[2px] border border-[#0a0a0b]/20 bg-white py-1 shadow-[0_8px_24px_rgba(10,10,11,0.16)] dark:border-white/15 dark:bg-[#0e0f11] dark:shadow-none"
              >
                {menu.items.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    role="menuitem"
                    disabled={item.disabled}
                    onClick={() => {
                      item.onSelect?.();
                      setOpenIndex(null);
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
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function MenubarDemo() {
  return (
    <Menubar
      menus={[
        { label: 'File', items: [{ label: 'New record' }, { label: 'Open' }, { label: 'Delete', destructive: true }] },
        { label: 'Edit', items: [{ label: 'Undo' }, { label: 'Redo' }] },
        { label: 'View', items: [{ label: 'Console' }, { label: 'Manifest' }] },
      ]}
    />
  );
}
