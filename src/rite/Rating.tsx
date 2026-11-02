import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Star } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface RatingProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  count?: number;
  disabled?: boolean;
  className?: string;
}

export function Rating({
  value,
  defaultValue = 0,
  onChange,
  count = 5,
  disabled = false,
  className,
}: RatingProps) {
  const [internal, setInternal] = useState(defaultValue);
  const [hovered, setHovered] = useState<number | null>(null);
  const current = value ?? internal;
  const preview = hovered ?? current;

  function select(n: number) {
    if (disabled) return;
    if (value === undefined) setInternal(n);
    onChange?.(n);
  }

  function handleKey(n: number, e: KeyboardEvent) {
    if (disabled) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      select(Math.min(count, n + 1));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      select(Math.max(1, n - 1));
    }
  }

  return (
    <div
      role="group"
      aria-label="Rating"
      aria-disabled={disabled}
      className={cx('inline-flex items-center gap-0.5', disabled && 'opacity-40', className)}
      onMouseLeave={() => setHovered(null)}
    >
      {Array.from({ length: count }, (_, i) => i + 1).map((n) => {
        const filled = n <= preview;
        return (
          <button
            key={n}
            type="button"
            disabled={disabled}
            aria-label={`Rate ${n}`}
            aria-pressed={n === current}
            onClick={() => select(n)}
            onMouseEnter={() => !disabled && setHovered(n)}
            onFocus={() => !disabled && setHovered(n)}
            onBlur={() => setHovered(null)}
            onKeyDown={(e) => handleKey(n, e)}
            className={cx(
              'rounded-[2px] px-0.5 text-lg leading-none outline-none transition-colors duration-100',
              'focus-visible:ring-1 focus-visible:ring-[#d42b1e]',
              'disabled:cursor-not-allowed',
              filled
                ? 'text-[#0a0a0b] dark:text-[#e9e7e2]'
                : 'text-[#0a0a0b]/25 dark:text-white/25',
              !disabled && !filled && 'hover:text-[#0a0a0b]/60 dark:hover:text-white/60',
            )}
          >
            <Star size={18} strokeWidth={2} fill="currentColor" aria-hidden />
          </button>
        );
      })}
      <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.16em] opacity-60">
        {current}/{count}
      </span>
    </div>
  );
}

export function RatingDemo() {
  const [val, setVal] = useState(3);
  return (
    <div className="flex flex-col gap-3">
      <Rating value={val} onChange={setVal} />
      <Rating defaultValue={2} />
      <Rating defaultValue={4} disabled />
    </div>
  );
}
