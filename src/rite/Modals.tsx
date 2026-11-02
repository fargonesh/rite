import { useEffect, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface ModalsProps {
  opened: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm?: () => void;
}

export function Modals({
  opened,
  onClose,
  title = 'Confirm action',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = false,
  onConfirm,
}: ModalsProps) {
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
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-[#0a0a0b]/60 dark:bg-black/70"
      />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full max-w-sm rounded-[2px] border border-[#0a0a0b]/20 bg-[#e9e7e2] shadow-[0_8px_40px_rgba(0,0,0,0.35)] dark:border-white/15 dark:bg-[#0e0f11]"
      >
        <div className="flex items-center justify-between border-b border-dashed border-[#0a0a0b]/15 px-4 py-3 dark:border-white/10">
          <p className="flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em]">
            {danger && <AlertTriangle size={13} className="text-[#d42b1e]" aria-hidden />}
            {title}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-[2px] p-0.5 text-[#0a0a0b]/60 outline-none transition-colors hover:text-[#d42b1e] focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:text-white/60 dark:hover:text-white"
          >
            <X size={14} aria-hidden />
          </button>
        </div>
        {message && (
          <p className="px-4 pt-3 text-[13px] leading-6 text-[#0a0a0b]/85 dark:text-white/85">
            {message}
          </p>
        )}
        <div className="flex justify-end gap-2 px-4 py-4">
          <button
            type="button"
            onClick={onClose}
            className="h-8 rounded-[2px] border border-[#0a0a0b]/25 px-4 font-mono text-[11px] uppercase tracking-[0.18em] outline-none transition-colors hover:bg-[#0a0a0b]/5 focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:border-white/25 dark:hover:bg-white/5"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={cx(
              'h-8 rounded-[2px] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#e9e7e2] outline-none transition-colors focus-visible:ring-1 focus-visible:ring-[#d42b1e] focus-visible:ring-offset-1',
              danger
                ? 'bg-[#d42b1e] hover:bg-[#b32318]'
                : 'bg-[#0a0a0b] hover:bg-[#0a0a0b]/85 dark:bg-[#e9e7e2] dark:text-black dark:hover:bg-white',
            )}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ModalsDemo() {
  const [opened, setOpened] = useState(false);
  const [sealed, setSealed] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setOpened(true)}
          className="h-8 rounded-[2px] border border-[#0a0a0b]/25 px-4 font-mono text-[11px] uppercase tracking-[0.18em] dark:border-white/25"
        >
          Open confirm dialog
        </button>
        {sealed && (
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#d42b1e]">
            Dossier sealed
          </p>
        )}
      </div>
      <Modals
        opened={opened}
        onClose={() => setOpened(false)}
        title="Seal dossier 047?"
        message="This stamps the file closed. Sealed dossiers cannot be reopened without a countersign."
        confirmLabel="Seal file"
        danger
        onConfirm={() => {
          setSealed(true);
          setOpened(false);
        }}
      />
    </div>
  );
}
