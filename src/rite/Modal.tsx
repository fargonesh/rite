import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalProps {
  opened: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: ModalSize;
  className?: string;
}

const sizeStyles: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

export function Modal({ opened, onClose, title, children, size = 'md', className }: ModalProps) {
  useEffect(() => {
    if (!opened) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [opened, onClose]);

  if (!opened) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="presentation">
      <button
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-[#0a0a0b]/60 dark:bg-black/70"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title ?? 'Modal'}
        className={cx(
          'relative w-full rounded-[2px] border border-[#0a0a0b]/20 bg-[#e9e7e2] shadow-[0_8px_40px_rgba(0,0,0,0.35)]',
          'dark:border-white/15 dark:bg-[#0e0f11]',
          sizeStyles[size],
          className,
        )}
      >
        <div className="flex items-center justify-between border-b border-dashed border-[#0a0a0b]/15 px-4 py-3 dark:border-white/10">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em]">
            {title ?? 'Dossier'}
          </p>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-[2px] px-2 font-mono text-sm leading-none text-[#0a0a0b]/60 outline-none hover:text-[#d42b1e] focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:text-white/60 dark:hover:text-white"
          >
            <X size={14} strokeWidth={2} aria-hidden />
          </button>
        </div>
        <div className="px-4 py-4 text-[13px] leading-6 text-[#0a0a0b]/85 dark:text-white/85">
          {children}
        </div>
      </div>
    </div>
  );
}

export function ModalDemo() {
  const [opened, setOpened] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpened(true)}
        className="h-9 rounded-[2px] bg-[#0a0a0b] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#e9e7e2] dark:bg-[#e9e7e2] dark:text-black"
      >
        Open dossier
      </button>
      <Modal opened={opened} onClose={() => setOpened(false)} title="FILE 047 — VESPER">
      <p>
        Backdrop click and Esc invoke <span className="font-mono">onClose</span>.
      </p>
      <div className="mt-3 flex gap-2">
        <button
          onClick={() => setOpened(false)}
          className="h-8 rounded-[2px] bg-[#0a0a0b] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#e9e7e2] dark:bg-[#e9e7e2] dark:text-black"
        >
          Confirm
        </button>
        <button
          onClick={() => setOpened(false)}
          className="h-8 rounded-[2px] border border-[#0a0a0b]/25 px-4 font-mono text-[11px] uppercase tracking-[0.18em] dark:border-white/25"
        >
          Abort
        </button>
      </div>
      </Modal>
    </div>
  );
}
