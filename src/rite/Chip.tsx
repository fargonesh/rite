import { useState } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Square, X } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  children: ReactNode;
}

export function Chip({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  className,
  children,
  ...rest
}: ChipProps) {
  const [internal, setInternal] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isOn = isControlled ? checked : internal;

  function toggle() {
    if (disabled) return;
    const next = !isOn;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }

  return (
    <button
      type="button"
      aria-pressed={isOn}
      disabled={disabled}
      onClick={toggle}
      className={cx(
        'inline-flex items-center gap-1.5 rounded-[2px] border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.16em]',
        'outline-none transition-colors duration-150',
        'focus-visible:ring-1 focus-visible:ring-[#d42b1e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#e9e7e2] dark:focus-visible:ring-offset-[#08090b]',
        'disabled:cursor-not-allowed disabled:opacity-40',
        isOn
          ? 'border-[#0a0a0b] bg-[#0a0a0b] text-[#e9e7e2] dark:border-[#e9e7e2] dark:bg-[#e9e7e2] dark:text-black'
          : 'border-[#0a0a0b]/25 bg-transparent text-[#0a0a0b] hover:border-[#0a0a0b] hover:bg-[#0a0a0b]/5 dark:border-white/25 dark:text-[#e9e7e2] dark:hover:border-white dark:hover:bg-white/5',
        className,
      )}
      {...rest}
    >
      <span aria-hidden className="inline-flex items-center leading-none">
        {isOn ? (
          <X size={11} strokeWidth={2} />
        ) : (
          <Square size={8} strokeWidth={2} fill="currentColor" />
        )}
      </span>
      {children}
    </button>
  );
}

export function ChipDemo() {
  const [active, setActive] = useState<string[]>(['vesper']);
  const options = ['vesper', 'dossier', 'omen'];
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <Chip
          key={opt}
          checked={active.includes(opt)}
          onChange={(on) =>
            setActive((prev) => (on ? [...prev, opt] : prev.filter((p) => p !== opt)))
          }
        >
          {opt}
        </Chip>
      ))}
      <Chip defaultChecked={false}>Uncontrolled</Chip>
      <Chip disabled>Locked</Chip>
    </div>
  );
}
