import { useId, useState } from 'react';
import { cx } from '../lib/cx.ts';

export interface SliderProps {
  label?: string;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  showValue?: boolean;
  className?: string;
  id?: string;
  name?: string;
}

export function Slider({
  label,
  value,
  defaultValue = 50,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  showValue = true,
  className,
  id,
  name,
}: SliderProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const controlled = value !== undefined;
  const current = controlled ? value : uncontrolled;

  return (
    <div className={cx('w-full', className)}>
      {(label || showValue) && (
        <label
          htmlFor={inputId}
          className="mb-1.5 flex items-baseline justify-between font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#0a0a0b]/70 dark:text-white/60"
        >
          <span>{label}</span>
          {showValue && <span className="text-[10px] opacity-70">{current}</span>}
        </label>
      )}
      <input
        type="range"
        id={inputId}
        name={name}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        value={current}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={current}
        onChange={(e) => {
          const v = Number(e.target.value);
          if (!controlled) setUncontrolled(v);
          onChange?.(v);
        }}
        className={cx(
          'h-6 w-full cursor-pointer appearance-none bg-transparent outline-none',
          'accent-[#0a0a0b] dark:accent-[#e9e7e2]',
          'focus-visible:ring-1 focus-visible:ring-[#d42b1e]',
          'disabled:cursor-not-allowed disabled:opacity-40',
          '[&::-webkit-slider-runnable-track]:h-px [&::-webkit-slider-runnable-track]:bg-[#0a0a0b]/30 dark:[&::-webkit-slider-runnable-track]:bg-white/25',
          '[&::-webkit-slider-thumb]:-mt-[5px] [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-[2px] [&::-webkit-slider-thumb]:bg-[#0a0a0b] dark:[&::-webkit-slider-thumb]:bg-[#e9e7e2]',
          '[&::-moz-range-track]:h-px [&::-moz-range-track]:bg-[#0a0a0b]/30 dark:[&::-moz-range-track]:bg-white/25',
          '[&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-[2px] [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-[#0a0a0b] dark:[&::-moz-range-thumb]:bg-[#e9e7e2]',
        )}
      />
    </div>
  );
}

export function SliderDemo() {
  const [val, setVal] = useState(33);
  return (
    <div className="w-full max-w-xs space-y-4">
      <Slider label="Volume" value={val} onChange={setVal} />
      <Slider label="Muted" defaultValue={70} disabled />
    </div>
  );
}
