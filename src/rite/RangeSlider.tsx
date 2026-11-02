import { useId, useState } from 'react';
import { cx } from '../lib/cx.ts';

export interface RangeSliderProps {
  value?: [number, number];
  defaultValue?: [number, number];
  onChange?: (value: [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  label?: string;
  className?: string;
}

function clampTuple(v: [number, number], min: number, max: number): [number, number] {
  const a = Math.min(max, Math.max(min, v[0]));
  const b = Math.min(max, Math.max(min, v[1]));
  return a <= b ? [a, b] : [b, a];
}

const thumbCss = [
  '[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-[2px] [&::-webkit-slider-thumb]:bg-[#0a0a0b] dark:[&::-webkit-slider-thumb]:bg-[#e9e7e2]',
  '[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-[2px] [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-[#0a0a0b] dark:[&::-moz-range-thumb]:bg-[#e9e7e2]',
  '[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent',
].join(' ');

export function RangeSlider({
  value,
  defaultValue = [20, 80],
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  label,
  className,
}: RangeSliderProps) {
  const autoId = useId();
  const [uncontrolled, setUncontrolled] = useState<[number, number]>(() =>
    clampTuple(defaultValue, min, max),
  );
  const current = value !== undefined ? clampTuple(value, min, max) : uncontrolled;
  const [lo, hi] = current;
  const loPct = ((lo - min) / (max - min)) * 100;
  const hiPct = ((hi - min) / (max - min)) * 100;

  const commit = (next: [number, number]) => {
    const clamped = clampTuple(next, min, max);
    if (value === undefined) setUncontrolled(clamped);
    onChange?.(clamped);
  };

  const baseInput =
    'pointer-events-none absolute inset-x-0 top-1/2 h-6 w-full -translate-y-1/2 cursor-pointer appearance-none bg-transparent outline-none focus-visible:ring-1 focus-visible:ring-[#d42b1e] disabled:cursor-not-allowed disabled:opacity-40';

  return (
    <div className={cx('w-full', className)}>
      <div className="mb-1.5 flex items-baseline justify-between font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#0a0a0b]/70 dark:text-white/60">
        <span id={`${autoId}-label`}>{label ?? 'Range'}</span>
        <span className="text-[10px] opacity-70 tabular-nums">
          {lo} – {hi}
        </span>
      </div>
      <div className="relative h-6" role="group" aria-labelledby={`${autoId}-label`}>
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#0a0a0b]/25 dark:bg-white/25" />
        <div
          className="absolute top-1/2 h-[3px] -translate-y-1/2 bg-[#0a0a0b] dark:bg-[#e9e7e2]"
          style={{ left: `${loPct}%`, width: `${Math.max(0, hiPct - loPct)}%` }}
        />
        <input
          type="range"
          aria-label="Minimum"
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          value={lo}
          onChange={(e) => commit([Math.min(Number(e.target.value), hi), hi])}
          className={cx(baseInput, thumbCss, 'z-10')}
        />
        <input
          type="range"
          aria-label="Maximum"
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          value={hi}
          onChange={(e) => commit([lo, Math.max(Number(e.target.value), lo)])}
          className={cx(baseInput, thumbCss, 'z-20')}
        />
      </div>
    </div>
  );
}

export function RangeSliderDemo() {
  const [range, setRange] = useState<[number, number]>([25, 70]);
  return (
    <div className="w-full max-w-xs space-y-4">
      <RangeSlider label="Price band" value={range} onChange={setRange} />
      <RangeSlider label="Disabled" defaultValue={[30, 60]} disabled />
    </div>
  );
}
