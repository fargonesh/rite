import { useEffect, useRef, useState } from 'react';
import { cx } from '../lib/cx.ts';

export interface LoadingOverlayProps {
  visible: boolean;
  label?: string;
  className?: string;
}

export function LoadingOverlay({ visible, label = 'communing…', className }: LoadingOverlayProps) {
  if (!visible) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className={cx(
        'absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-[2px] bg-[#e9e7e2]/70 backdrop-blur-[1px]',
        'dark:bg-black/70',
        className,
      )}
    >
      <span
        aria-hidden
        className="h-6 w-6 animate-spin rounded-[2px] border-2 border-[#0a0a0b]/20 border-t-[#d42b1e] dark:border-white/20 dark:border-t-[#d42b1e]"
      />
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0a0a0b]/70 dark:text-white/60">
        {label}
      </p>
    </div>
  );
}

export function LoadingOverlayDemo() {
  const [busy, setBusy] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    },
    [],
  );

  const summon = () => {
    setBusy(true);
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setBusy(false), 1800);
  };

  return (
    <div className="relative h-44 overflow-hidden rounded-[2px] border border-[#0a0a0b]/20 bg-[#e9e7e2] p-4 dark:border-white/15 dark:bg-[#0e0f11]">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0a0a0b]/50 dark:text-white/40">
        Witness ledger
      </p>
      <p className="mt-2 text-[13px] leading-6 text-[#0a0a0b]/80 dark:text-white/80">
        Press summon to veil this panel while the archive answers.
      </p>
      <button
        onClick={summon}
        disabled={busy}
        className="mt-3 h-8 rounded-[2px] bg-[#0a0a0b] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#e9e7e2] outline-none disabled:opacity-50 focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:bg-[#e9e7e2] dark:text-black"
      >
        {busy ? 'Veiled' : 'Summon'}
      </button>
      <LoadingOverlay visible={busy} label="communing…" />
    </div>
  );
}
