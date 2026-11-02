import { useId, useState } from 'react';
import { cx } from '../lib/cx.ts';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
}

export function Switch({ checked, defaultChecked, onCheckedChange, label, disabled, id }: SwitchProps) {
  const autoId = useId();
  const switchId = id ?? autoId;

  return (
    <label
      htmlFor={switchId}
      className={cx('inline-flex cursor-pointer items-center gap-2.5', disabled && 'cursor-not-allowed opacity-40')}
    >
      <input
        id={switchId}
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
      />
      <span
        aria-hidden
        className={cx(
          'relative h-5 w-9 rounded-[2px] border transition-colors duration-150',
          'border-[#0a0a0b]/30 bg-transparent dark:border-white/25',
          'peer-checked:border-[#d42b1e] peer-checked:bg-[#d42b1e]',
          'peer-focus-visible:ring-1 peer-focus-visible:ring-[#d42b1e] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#e9e7e2] dark:peer-focus-visible:ring-offset-[#08090b]',
          'after:absolute after:left-[2px] after:top-[2px] after:h-3.5 after:w-3.5 after:rounded-[1px]',
          'after:bg-[#0a0a0b] dark:after:bg-white after:transition-transform',
          'peer-checked:after:translate-x-4 peer-checked:after:bg-white',
        )}
      />
      {label && (
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0a0a0b]/70 dark:text-white/60">
          {label}
        </span>
      )}
    </label>
  );
}

export function SwitchDemo() {
  const [on, setOn] = useState(true);
  return (
    <div className="flex flex-col gap-3">
      <Switch label="Controlled — bound" checked={on} onCheckedChange={setOn} />
      <Switch label="Uncontrolled — free" defaultChecked={false} />
      <Switch label="Disabled — sealed" disabled />
    </div>
  );
}
