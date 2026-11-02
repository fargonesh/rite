import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export type DrawerPosition = 'left' | 'right';

export interface DrawerProps {
  opened: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  position?: DrawerPosition;
  className?: string;
}

export function Drawer({ opened, onClose, title, children, position = 'right', className }: DrawerProps) {
  useEffect(() => {
    if (!opened) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [opened, onClose]);

  if (!opened) return null;

  const side = position === 'left' ? 'left-0 border-r' : 'right-0 border-l';

  return (
    <div className="fixed inset-0 z-50" role="presentation">
      <button
        aria-label="Close drawer"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-[#0a0a0b]/60 dark:bg-black/70"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title ?? 'Drawer'}
        className={cx(
          'absolute top-0 flex h-full w-full max-w-sm flex-col rounded-[2px] border-[#0a0a0b]/20 bg-[#e9e7e2]',
          'dark:border-white/15 dark:bg-[#0e0f11]',
          side,
          'border-y-0',
          className,
        )}
      >
        <div className="flex items-center justify-between border-b border-dashed border-[#0a0a0b]/15 px-4 py-3 dark:border-white/10">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em]">
            {title ?? 'Drawer'}
          </p>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-[2px] px-2 font-mono text-sm leading-none text-[#0a0a0b]/60 outline-none hover:text-[#d42b1e] focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:text-white/60 dark:hover:text-white"
          >
            <X size={14} strokeWidth={2} />
          </button>
        </div>
        <div className="flex-1 overflow-auto px-4 py-4 text-[13px] leading-6 text-[#0a0a0b]/85 dark:text-white/85">
          {children}
        </div>
      </aside>
    </div>
  );
}

export function DrawerDemo() {
  const [opened, setOpened] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpened(true)}
        className="h-9 rounded-[2px] border border-[#0a0a0b]/25 px-4 font-mono text-[11px] uppercase tracking-[0.18em] dark:border-white/25"
      >
        Open drawer
      </button>
      <Drawer opened={opened} onClose={() => setOpened(false)} title="SIDE FILE — RIGHT" position="right">
      <p>Esc or backdrop click invokes onClose — you can always get out.</p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] opacity-60">
        + witnessed margin
      </p>
      </Drawer>
    </div>
  );
}
