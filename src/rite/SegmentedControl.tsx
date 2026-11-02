import { useState } from 'react';
import { cx } from '../lib/cx.ts';

export interface SegmentedControlItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export type SegmentedControlSize = 'sm' | 'md';

export interface SegmentedControlProps {
  data: SegmentedControlItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: SegmentedControlSize;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

const sizeStyles: Record<SegmentedControlSize, string> = {
  sm: 'h-7 px-2.5 text-[10px]',
  md: 'h-9 px-4 text-[11px]',
};

export function SegmentedControl({
  data,
  value,
  defaultValue,
  onChange,
  size = 'md',
  disabled = false,
  className,
  ariaLabel,
}: SegmentedControlProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? data[0]?.value ?? '');
  const controlled = value !== undefined;
  const current = controlled ? value : uncontrolled;

  function pick(v: string) {
    if (!controlled) setUncontrolled(v);
    onChange?.(v);
  }

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cx(
        'inline-flex rounded-[2px] border border-[#0a0a0b]/25 p-0.5 dark:border-white/20',
        disabled && 'cursor-not-allowed opacity-40',
        className,
      )}
    >
      {data.map((item) => {
        const active = item.value === current;
        const itemDisabled = disabled || item.disabled;
        return (
          <button
            key={item.value}
            type="button"
            disabled={itemDisabled}
            aria-pressed={active}
            onClick={() => pick(item.value)}
            className={cx(
              'rounded-[2px] font-mono font-medium uppercase tracking-[0.18em] outline-none transition-colors',
              'focus-visible:ring-1 focus-visible:ring-[#d42b1e]',
              sizeStyles[size],
              active
                ? 'bg-[#0a0a0b] text-[#e9e7e2] dark:bg-[#e9e7e2] dark:text-black'
                : 'text-[#0a0a0b]/60 hover:text-[#0a0a0b] dark:text-white/50 dark:hover:text-white',
              itemDisabled && !active && 'cursor-not-allowed opacity-40',
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

export function SegmentedControlDemo() {
  const [val, setVal] = useState('dusk');
  return (
    <div className="space-y-4">
      <SegmentedControl
        ariaLabel="Hour"
        data={[{ value: 'dusk', label: 'Dusk' }, { value: 'midnight', label: 'Midnight' }, { value: 'dawn', label: 'Dawn', disabled: true }]}
        value={val}
        onChange={setVal}
      />
      <SegmentedControl ariaLabel="Scale" size="sm" data={[{ value: 's', label: 'S' }, { value: 'm', label: 'M' }, { value: 'l', label: 'L' }]} defaultValue="m" />
    </div>
  );
}
