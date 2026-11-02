import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface ComboboxProps {
  target: ReactNode;
  children: ReactNode;
  opened?: boolean;
  defaultOpened?: boolean;
  onOpenChange?: (opened: boolean) => void;
  width?: number | string;
  className?: string;
}

export function Combobox({
  target,
  children,
  opened,
  defaultOpened = false,
  onOpenChange,
  width,
  className,
}: ComboboxProps) {
  const [internal, setInternal] = useState(defaultOpened);
  const isControlled = opened !== undefined;
  const isOpen = isControlled ? opened : internal;
  const rootRef = useRef<HTMLDivElement>(null);

  function setOpen(next: boolean) {
    if (!isControlled) setInternal(next);
    onOpenChange?.(next);
  }

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    function onDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [isOpen, isControlled]);

  return (
    <div ref={rootRef} className={cx('relative inline-block w-full', className)}>
      <div
        onClick={() => setOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="w-full cursor-pointer"
      >
        {target}
      </div>
      {isOpen && (
        <div
          style={width !== undefined ? { width } : undefined}
          className="absolute left-0 top-full z-40 mt-1 max-h-56 w-full overflow-auto rounded-[2px] border border-[#0a0a0b]/20 bg-[#e9e7e2] py-1 dark:border-white/15 dark:bg-[#08090b]"
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function ComboboxDemo() {
  const [picked, setPicked] = useState<string | null>(null);
  const [opened, setOpened] = useState(false);
  const options = ['vesper', 'matins', 'compline'];
  return (
    <div className="w-full max-w-xs space-y-2">
      <Combobox
        opened={opened}
        onOpenChange={setOpened}
        target={
          <span className="flex h-9 w-full items-center justify-between gap-2 rounded-[2px] border border-[#0a0a0b]/30 px-3 font-mono text-[13px] text-[#0a0a0b] dark:border-white/20 dark:text-[#e9e7e2]">
            <span className={cx(picked ? undefined : 'text-[#0a0a0b]/35 dark:text-white/30')}>
              {picked ?? 'Choose a rite…'}
            </span>
            <ChevronDown
              size={14}
              aria-hidden
              className={cx('shrink-0 opacity-60 transition-transform', opened && 'rotate-180')}
            />
          </span>
        }
      >
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => {
              setPicked(o);
              setOpened(false);
            }}
            className={cx(
              'block w-full px-3 py-2 text-left font-mono text-[13px] text-[#0a0a0b] outline-none hover:bg-[#0a0a0b]/5 dark:text-[#e9e7e2] dark:hover:bg-white/5',
              picked === o && 'bg-[#0a0a0b]/5 dark:bg-white/5',
            )}
          >
            {o}
          </button>
        ))}
      </Combobox>
      {picked && (
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#0a0a0b]/50 dark:text-white/40">
          filed under {picked}
        </p>
      )}
    </div>
  );
}
