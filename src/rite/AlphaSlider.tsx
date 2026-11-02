import { useId, useState } from 'react';
import { cx } from '../lib/cx.ts';

export interface AlphaSliderProps {
  label?: string;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  color?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
}

const CHECKER = 'conic-gradient(#a1a1aa 25%, #ffffff 0 50%, #a1a1aa 0 75%, #ffffff 0)';

function clampAlpha(n: number): number {
  if (Number.isNaN(n)) return 0;
  return Math.min(1, Math.max(0, Math.round(n * 100) / 100));
}

export function AlphaSlider({
  label = 'Alpha',
  value,
  defaultValue = 1,
  onChange,
  color = '#0a0a0b',
  disabled = false,
  className,
  id,
  name,
}: AlphaSliderProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const shown = clampAlpha(value ?? uncontrolled);

  const commit = (next: number) => {
    const v = clampAlpha(next);
    if (value === undefined) setUncontrolled(v);
    onChange?.(v);
  };

  return (
    <div className={cx('w-full', className)}>
      <div className="mb-1.5 flex items-baseline justify-between font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#0a0a0b]/70 dark:text-white/60">
        <label htmlFor={inputId}>{label}</label>
        <span className="text-[10px] opacity-70">{Math.round(shown * 100)}%</span>
      </div>
      <div className="relative flex h-5 items-center">
        <div
          aria-hidden
          className="absolute inset-x-0 h-2.5 rounded-[2px]"
          style={{ backgroundImage: CHECKER, backgroundSize: '8px 8px', opacity: disabled ? 0.4 : 1 }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 h-2.5 rounded-[2px]"
          style={{
            background: `linear-gradient(to right, transparent, ${color})`,
            opacity: disabled ? 0.4 : 1,
          }}
        />
        <input
          type="range"
          id={inputId}
          name={name}
          min={0}
          max={1}
          step={0.01}
          value={shown}
          disabled={disabled}
          aria-valuemin={0}
          aria-valuemax={1}
          aria-valuenow={shown}
          onChange={(e) => commit(Number(e.target.value))}
          className={cx(
            'relative h-5 w-full cursor-pointer appearance-none bg-transparent outline-none',
            'focus-visible:ring-1 focus-visible:ring-[#d42b1e]',
            'disabled:cursor-not-allowed disabled:opacity-40',
            '[&::-webkit-slider-runnable-track]:h-2.5 [&::-webkit-slider-runnable-track]:bg-transparent',
            '[&::-webkit-slider-thumb]:-mt-[3px] [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-[2px] [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-black/60 [&::-webkit-slider-thumb]:bg-white',
            '[&::-moz-range-track]:h-2.5 [&::-moz-range-track]:bg-transparent',
            '[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-2.5 [&::-moz-range-thumb]:rounded-[2px] [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-black/60 [&::-moz-range-thumb]:bg-white',
          )}
        />
      </div>
    </div>
  );
}

export function AlphaSliderDemo() {
  const [alpha, setAlpha] = useState(1);
  return (
    <div className="w-full max-w-xs space-y-4">
      <AlphaSlider label="Opacity" color="#d42b1e" value={alpha} onChange={setAlpha} />
      <AlphaSlider label="Disabled" defaultValue={0.5} disabled />
    </div>
  );
}
