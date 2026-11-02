import type { InputHTMLAttributes, ReactNode } from 'react';
import { useState } from 'react';
import { Info, X } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  error?: string;
}

export function Input({ leftSection, rightSection, error, className, disabled, ...rest }: InputProps) {
  return (
    <div className={cx('w-full', className)}>
      <div className="relative">
        {leftSection && (
          <span className="pointer-events-none absolute left-2.5 top-1/2 flex -translate-y-1/2 items-center text-[#0a0a0b]/50 dark:text-white/40">
            {leftSection}
          </span>
        )}
        <input
          disabled={disabled}
          aria-invalid={Boolean(error)}
          className={cx(
            'h-9 w-full rounded-[2px] border bg-transparent font-mono text-[13px] outline-none transition-colors placeholder:font-sans placeholder:text-[#0a0a0b]/35 focus:ring-1 focus:ring-[#d42b1e] dark:placeholder:text-white/30',
            leftSection ? 'pl-8' : 'pl-3',
            rightSection ? 'pr-8' : 'pr-3',
            error
              ? 'border-[#d42b1e] focus:border-[#d42b1e]'
              : 'border-[#0a0a0b]/30 focus:border-[#0a0a0b] dark:border-white/20 dark:focus:border-white/60',
            disabled && 'cursor-not-allowed opacity-40',
          )}
          {...rest}
        />
        {rightSection && (
          <span className="absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center text-[#0a0a0b]/50 dark:text-white/40">
            {rightSection}
          </span>
        )}
      </div>
      {error && (
        <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#d42b1e]">
          {error}
        </p>
      )}
    </div>
  );
}

export function InputDemo() {
  const [value, setValue] = useState('');

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Input
        placeholder="Search the archive"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        leftSection={<Info size={14} aria-hidden />}
        rightSection={
          value ? (
            <button
              type="button"
              onClick={() => setValue('')}
              aria-label="Clear input"
              className="rounded-[2px] p-0.5 outline-none transition-colors hover:text-[#d42b1e] focus-visible:ring-1 focus-visible:ring-[#d42b1e]"
            >
              <X size={14} aria-hidden />
            </button>
          ) : undefined
        }
      />
      <Input placeholder="Sealed field" error="Required — stamp before filing" />
      <Input placeholder="Disabled ledger" disabled />
    </div>
  );
}
