import { useId, useState } from 'react';
import { cx } from '../lib/cx.ts';

export interface RadioProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  name?: string;
  value?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export function Radio({
  label,
  checked,
  defaultChecked,
  onCheckedChange,
  name,
  value,
  disabled,
  id,
  className,
}: RadioProps) {
  const autoId = useId();
  const radioId = id ?? autoId;

  return (
    <label
      htmlFor={radioId}
      className={cx('inline-flex cursor-pointer items-center gap-2.5', disabled && 'cursor-not-allowed opacity-40', className)}
    >
      <input
        id={radioId}
        type="radio"
        className="peer sr-only"
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
      />
      <span
        aria-hidden
        className={cx(
          'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-150',
          'border-[#0a0a0b]/30 bg-transparent dark:border-white/20',
          'peer-checked:border-[#0a0a0b] dark:peer-checked:border-white',
          '[&>span]:scale-0 peer-checked:[&>span]:scale-100',
          'peer-focus-visible:ring-1 peer-focus-visible:ring-[#d42b1e] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#e9e7e2] dark:peer-focus-visible:ring-offset-[#08090b]',
        )}
      >
        <span className="h-2 w-2 rounded-full bg-[#0a0a0b] transition-transform duration-150 dark:bg-white" />
      </span>
      {label && (
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0a0a0b]/70 dark:text-white/60">
          {label}
        </span>
      )}
    </label>
  );
}

export function RadioDemo() {
  const [rite, setRite] = useState('dusk');
  const opts = [
    { value: 'dawn', label: 'Dawn rite' },
    { value: 'dusk', label: 'Dusk rite' },
    { value: 'midnight', label: 'Midnight rite' },
  ];
  return (
    <div className="flex flex-col gap-2.5" role="radiogroup" aria-label="Rite">
      {opts.map((o) => (
        <Radio
          key={o.value}
          name="rite"
          value={o.value}
          label={o.label}
          checked={rite === o.value}
          onCheckedChange={() => setRite(o.value)}
        />
      ))}
      <Radio label="Sealed (disabled)" disabled />
    </div>
  );
}
