import { useId, useState } from 'react';
import { cx } from '../lib/cx.ts';

export interface CheckboxProps {
  label?: string;
  description?: string;
  error?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  indeterminate?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
}

export function Checkbox({
  label,
  description,
  error,
  checked,
  defaultChecked,
  onCheckedChange,
  indeterminate = false,
  disabled,
  id,
  name,
  className,
}: CheckboxProps) {
  const autoId = useId();
  const boxId = id ?? autoId;
  const descId = description ? `${boxId}-desc` : undefined;
  const errId = error ? `${boxId}-err` : undefined;
  const isControlled = checked !== undefined;
  const [inner, setInner] = useState(defaultChecked ?? false);
  const isOn = isControlled ? (checked as boolean) : inner;

  return (
    <div className={cx('w-full', className)}>
      <label
        htmlFor={boxId}
        className={cx('inline-flex cursor-pointer items-start gap-2.5', disabled && 'cursor-not-allowed opacity-40')}
      >
        <input
          id={boxId}
          ref={(el) => {
            if (el) el.indeterminate = indeterminate && !isOn;
          }}
          type="checkbox"
          name={name}
          className="peer sr-only"
          checked={checked}
          defaultChecked={!isControlled ? defaultChecked : undefined}
          disabled={disabled}
          aria-describedby={[descId, errId].filter(Boolean).join(' ') || undefined}
          aria-invalid={Boolean(error)}
          onChange={(e) => {
            if (!isControlled) setInner(e.target.checked);
            onCheckedChange?.(e.target.checked);
          }}
        />
        <span
          aria-hidden
          className={cx(
            'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px] border transition-colors duration-150',
            'border-[#0a0a0b]/30 bg-transparent dark:border-white/20',
            'peer-checked:border-[#0a0a0b] peer-checked:bg-[#0a0a0b] dark:peer-checked:border-white dark:peer-checked:bg-white',
            'peer-focus-visible:ring-1 peer-focus-visible:ring-[#d42b1e] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#e9e7e2] dark:peer-focus-visible:ring-offset-[#08090b]',
            error && 'border-[#d42b1e] peer-checked:border-[#d42b1e] peer-checked:bg-[#d42b1e]',
          )}
        >
          {(isOn || indeterminate) && (
            <svg
              viewBox="0 0 10 10"
              className={cx('h-2.5 w-2.5', error ? 'text-white' : 'text-[#e9e7e2] dark:text-black')}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {indeterminate && !isOn ? <path d="M1.5 5h7" /> : <path d="M1.5 5.5 4 8l4.5-6" />}
            </svg>
          )}
        </span>
        {label && (
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0a0a0b]/70 dark:text-white/60">
            {label}
          </span>
        )}
      </label>
      {description && !error && (
        <p id={descId} className="mt-1.5 pl-[26px] font-mono text-[11px] text-[#0a0a0b]/50 dark:text-white/40">
          {description}
        </p>
      )}
      {error && (
        <p id={errId} className="mt-1.5 pl-[26px] font-mono text-[11px] uppercase tracking-[0.12em] text-[#d42b1e]">
          {error}
        </p>
      )}
    </div>
  );
}

export function CheckboxDemo() {
  const [agreed, setAgreed] = useState(true);
  return (
    <div className="flex flex-col gap-3">
      <Checkbox label="Sigil bound" checked={agreed} onCheckedChange={setAgreed} description="Controlled. Click to toggle." />
      <Checkbox label="Uncontrolled rites" defaultChecked description="Uncontrolled with defaultChecked." />
      <Checkbox label="Indeterminate" indeterminate description="Partial selection state." />
      <Checkbox label="Severed (error)" error="ERR — consent required" />
      <Checkbox label="Dormant" disabled description="Disabled state." />
    </div>
  );
}
