import { useState } from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface DialogProps {
  opened: boolean;
  onClose?: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Dialog({ opened, onClose, title, children, className }: DialogProps) {
  if (!opened) return null;

  return (
    <div
      role="dialog"
      aria-label={title ?? 'Dialog'}
      aria-live="polite"
      className={cx(
        'fixed bottom-4 right-4 z-40 w-full max-w-xs rounded-[2px] border border-[#0a0a0b]/20 bg-[#e9e7e2] shadow-[0_4px_24px_rgba(0,0,0,0.25)]',
        'dark:border-white/15 dark:bg-[#0e0f11]',
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-dashed border-[#0a0a0b]/15 px-3 py-2.5 dark:border-white/10">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em]">
          {title ?? 'Notice'}
        </p>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Dismiss dialog"
            className="rounded-[2px] px-1.5 font-mono text-xs leading-none text-[#0a0a0b]/60 outline-none hover:text-[#d42b1e] focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:text-white/60 dark:hover:text-white"
          >
            <X size={14} strokeWidth={2} />
          </button>
        )}
      </div>
      <div className="px-3 py-3 text-[12px] leading-5 text-[#0a0a0b]/85 dark:text-white/85">
        {children}
      </div>
    </div>
  );
}

export function DialogDemo() {
  const [opened, setOpened] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpened(true)}
        className="h-9 rounded-[2px] border border-[#0a0a0b]/25 px-4 font-mono text-[11px] uppercase tracking-[0.18em] dark:border-white/25"
      >
        Open note
      </button>
      <Dialog opened={opened} onClose={() => setOpened(false)} title="Dossier note">
      <p>Non-modal survivor panel. Page beneath stays interactive — dismiss with Esc.</p>
      </Dialog>
    </div>
  );
}
