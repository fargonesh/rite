import { useRef, useState } from 'react';
import { cx } from '../lib/cx.ts';

export interface AngleSliderProps {
  label?: string;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  size?: number;
  className?: string;
}

function normalizeAngle(n: number): number {
  if (Number.isNaN(n)) return 0;
  return ((Math.round(n) % 360) + 360) % 360;
}

// Circular dial. 0 deg points up; pointer position maps via atan2.
// Keyboard: arrows +/-1 (shift: +/-10), Home resets to 0.
export function AngleSlider({
  label = 'Angle',
  value,
  defaultValue = 0,
  onChange,
  disabled = false,
  size = 120,
  className,
}: AngleSliderProps) {
  const dialRef = useRef<HTMLDivElement>(null);
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const current = normalizeAngle(value ?? uncontrolled);

  const commit = (deg: number) => {
    const next = normalizeAngle(deg);
    if (value === undefined) setUncontrolled(next);
    onChange?.(next);
  };

  const setFromPoint = (clientX: number, clientY: number) => {
    const el = dialRef.current;
    if (!el || disabled) return;
    const r = el.getBoundingClientRect();
    const dx = clientX - (r.left + r.width / 2);
    const dy = clientY - (r.top + r.height / 2);
    commit((Math.atan2(dx, -dy) * 180) / Math.PI);
  };

  return (
    <div className={cx('w-full', className)}>
      <div
        className="mb-1.5 flex items-baseline justify-between font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#0a0a0b]/70 dark:text-white/60"
        style={{ maxWidth: size }}
      >
        <span>{label}</span>
        <span className="text-[10px] opacity-70">{current} DEG</span>
      </div>
      <div
        ref={dialRef}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={360}
        aria-valuenow={current}
        aria-disabled={disabled}
        onPointerDown={(e) => {
          if (disabled) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          setFromPoint(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1) setFromPoint(e.clientX, e.clientY);
        }}
        onKeyDown={(e) => {
          if (disabled) return;
          const step = e.shiftKey ? 10 : 1;
          if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
            e.preventDefault();
            commit(current + step);
          } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
            e.preventDefault();
            commit(current - step);
          } else if (e.key === 'Home') {
            e.preventDefault();
            commit(0);
          }
        }}
        style={{ width: size, height: size }}
        className={cx(
          'relative touch-none select-none rounded-full border border-[#0a0a0b]/30 bg-transparent outline-none dark:border-white/20',
          disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
          'focus-visible:ring-1 focus-visible:ring-[#d42b1e]',
        )}
      >
        {([0, 90, 180, 270] as const).map((tick) => {
          const vertical = tick === 0 || tick === 180;
          return (
            <span
              key={tick}
              aria-hidden
              className={cx(
                'absolute bg-[#0a0a0b]/30 dark:bg-white/25',
                vertical ? 'h-1.5 w-px' : 'h-px w-1.5',
                tick === 0 && 'left-1/2 top-1 -translate-x-1/2',
                tick === 180 && 'bottom-1 left-1/2 -translate-x-1/2',
                tick === 90 && 'right-1 top-1/2 -translate-y-1/2',
                tick === 270 && 'left-1 top-1/2 -translate-y-1/2',
              )}
            />
          );
        })}
        <span aria-hidden className="absolute inset-0" style={{ transform: `rotate(${current}deg)` }}>
          <span className="absolute left-1/2 top-[12%] block h-[38%] w-px -translate-x-1/2 bg-[#0a0a0b] dark:bg-white" />
          <span className="absolute left-1/2 top-[8%] block h-2 w-2 -translate-x-1/2 rounded-[2px] bg-[#0a0a0b] dark:bg-white" />
        </span>
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 block h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-[2px] bg-[#0a0a0b] dark:bg-white"
        />
      </div>
    </div>
  );
}

export function AngleSliderDemo() {
  const [angle, setAngle] = useState(45);
  return (
    <div className="w-full max-w-xs">
      <AngleSlider label="Rotation" value={angle} onChange={setAngle} />
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[#0a0a0b]/50 dark:text-white/40">
        Selected — {angle} deg
      </p>
    </div>
  );
}
