import type { ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export interface FieldsetProps {
  legend: string;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

export function Fieldset({ legend, children, disabled = false, className }: FieldsetProps) {
  return (
    <fieldset
      disabled={disabled}
      className={cx(
        'rounded-[2px] border border-[#0a0a0b]/20 px-4 pb-4 pt-2 dark:border-white/15',
        disabled && 'opacity-50',
        className,
      )}
    >
      <legend className="px-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#0a0a0b]/70 dark:text-white/60">
        <span aria-hidden className="mr-1.5 text-[#d42b1e]">
          REQ
        </span>
        {legend}
      </legend>
      <div className="flex flex-col gap-3">{children}</div>
    </fieldset>
  );
}

export function FieldsetDemo() {
  return (
    <Fieldset legend="Identity">
      <label className="flex flex-col gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#0a0a0b]/70 dark:text-white/60">
        Callsign
        <input
          type="text"
          placeholder="VES-001"
          className="h-9 rounded-[2px] border border-[#0a0a0b]/30 bg-transparent px-3 font-mono text-[13px] normal-case tracking-normal outline-none transition-colors focus:border-[#0a0a0b] focus:ring-1 focus:ring-[#d42b1e] dark:border-white/20 dark:focus:border-white/60"
        />
      </label>
      <label className="flex flex-col gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#0a0a0b]/70 dark:text-white/60">
        Sector
        <input
          type="text"
          placeholder="North"
          className="h-9 rounded-[2px] border border-[#0a0a0b]/30 bg-transparent px-3 font-mono text-[13px] normal-case tracking-normal outline-none transition-colors focus:border-[#0a0a0b] focus:ring-1 focus:ring-[#d42b1e] dark:border-white/20 dark:focus:border-white/60"
        />
      </label>
    </Fieldset>
  );
}
