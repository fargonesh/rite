import { useState } from 'react';
import { cx } from '../lib/cx.ts';

export interface RollingNumberProps {
  value: number | string;
  digits?: number;
  className?: string;
}

function splitChars(raw: string, minWidth?: number): string[] {
  let s = raw;
  if (minWidth !== undefined && s.length < minWidth) {
    const pad = minWidth - s.length;
    const neg = s.startsWith('-');
    const body = neg ? s.slice(1) : s;
    s = (neg ? '-' : '') + '0'.repeat(pad) + body;
  }
  return s.split('');
}

function DigitReel({ digit }: { digit: string }) {
  return (
    <span className="inline-flex h-[1em] w-[1ch] overflow-hidden text-center">
      <span
        className="flex flex-col transition-transform duration-300 ease-out"
        style={{ transform: `translateY(-${Number(digit)}em)` }}
        aria-hidden="true"
      >
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className="h-[1em] w-[1ch] shrink-0 leading-[1em]">
            {i}
          </span>
        ))}
      </span>
    </span>
  );
}

export function RollingNumber({ value, digits, className }: RollingNumberProps) {
  const chars = splitChars(String(value), digits);
  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={String(value)}
      className={cx(
        'inline-flex items-start font-mono text-2xl tabular-nums leading-[1em] text-[#0a0a0b] dark:text-[#e9e7e2]',
        className,
      )}
    >
      {chars.map((ch, i) =>
        /[0-9]/.test(ch) ? (
          <DigitReel key={i} digit={ch} />
        ) : (
          <span key={i} className="inline-block h-[1em] w-[1ch] text-center leading-[1em]">
            {ch}
          </span>
        ),
      )}
    </span>
  );
}

export function RollingNumberDemo() {
  const [count, setCount] = useState(128);
  return (
    <div className="flex items-center gap-4 border border-[#0a0a0b]/15 p-3 dark:border-white/15">
      <RollingNumber value={count} digits={5} />
      <button
        type="button"
        onClick={() => setCount((c) => c + 1)}
        className="rounded-[2px] border border-[#0a0a0b]/20 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-[#0a0a0b] transition-colors hover:bg-[#0a0a0b]/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:border-white/20 dark:text-[#e9e7e2] dark:hover:bg-white/5"
      >
        +1
      </button>
    </div>
  );
}
