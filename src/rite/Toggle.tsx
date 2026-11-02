import { useState } from 'react';
import type { ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export interface ToggleProps {
  pressed?: boolean;
  defaultPressed?: boolean;
  onChange?: (pressed: boolean) => void;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

/**
 * Toggleable button — off is outline, on is ink slab invert.
 */
export function Toggle({
  pressed,
  defaultPressed = false,
  onChange,
  children,
  disabled = false,
  className,
}: ToggleProps) {
  const [internal, setInternal] = useState(defaultPressed);
  const isOn = pressed ?? internal;

  const handleClick = () => {
    if (disabled) return;
    const next = !isOn;
    if (pressed === undefined) setInternal(next);
    onChange?.(next);
  };

  return (
    <button
      type="button"
      aria-pressed={isOn}
      disabled={disabled}
      onClick={handleClick}
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-[2px] border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] outline-none transition-colors duration-150',
        'focus-visible:ring-1 focus-visible:ring-[#d42b1e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#e9e7e2] dark:focus-visible:ring-offset-[#08090b]',
        'disabled:cursor-not-allowed disabled:opacity-40',
        isOn
          ? 'border-[#0a0a0b] bg-[#0a0a0b] text-[#e9e7e2] hover:bg-[#1c0b0a] hover:text-white dark:border-[#e9e7e2] dark:bg-[#e9e7e2] dark:text-black dark:hover:bg-white'
          : 'border-[#0a0a0b]/30 bg-transparent text-[#0a0a0b]/70 hover:border-[#0a0a0b] hover:text-[#0a0a0b] dark:border-white/25 dark:text-white/60 dark:hover:border-white dark:hover:text-white',
        className,
      )}
    >
      {children}
    </button>
  );
}

export function ToggleDemo() {
  const [witnessed, setWitnessed] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle pressed={witnessed} onChange={setWitnessed}>
        Witnessed
      </Toggle>
      <Toggle defaultPressed>Surveyed</Toggle>
      <Toggle disabled>Sealed</Toggle>
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0a0a0b]/50 dark:text-white/40">
        aria-pressed: {String(witnessed)}
      </span>
    </div>
  );
}
