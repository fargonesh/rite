import { useState } from 'react';
import { Clock } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface TimeGridProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options?: string[];
  columns?: number;
  className?: string;
}

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

function halfHourDay(): string[] {
  const out: string[] = [];
  for (let h = 0; h < 24; h += 1) {
    out.push(`${pad2(h)}:00`, `${pad2(h)}:30`);
  }
  return out;
}

const DEFAULT_OPTIONS = halfHourDay();

export function TimeGrid({ value, defaultValue = '09:00', onChange, options = DEFAULT_OPTIONS, columns = 3, className }: TimeGridProps) {
  const isControlled = value !== undefined;
  const [inner, setInner] = useState(defaultValue);
  const current = isControlled ? (value as string) : inner;

  const commit = (next: string) => {
    if (!isControlled) setInner(next);
    onChange?.(next);
  };

  const cols = Math.max(columns, 1);

  return (
    <div className={cx('w-full', className)}>
      <p className="mb-1.5 flex items-center justify-between font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#0a0a0b]/70 dark:text-white/60">
        <span className="flex items-center gap-1.5">
          <Clock aria-hidden className="h-3.5 w-3.5 text-[#d42b1e]" />
          {current || '--:--'}
        </span>
        <span className="text-[10px] opacity-50">{options.length} slots</span>
      </p>
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }} role="group" aria-label="Choose time">
        {options.map((opt) => {
          const active = current === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => commit(opt)}
              aria-pressed={active}
              className={cx(
                'h-8 rounded-[2px] border font-mono text-[12px] outline-none transition-colors focus-visible:ring-1 focus-visible:ring-[#d42b1e]',
                active
                  ? 'border-[#0a0a0b] bg-[#0a0a0b] text-[#e9e7e2] dark:border-[#e9e7e2] dark:bg-[#e9e7e2] dark:text-black'
                  : 'border-[#0a0a0b]/25 text-[#0a0a0b]/70 hover:border-[#0a0a0b] hover:text-[#0a0a0b] dark:border-white/20 dark:text-white/60 dark:hover:border-white dark:hover:text-white',
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function TimeGridDemo() {
  const [t, setT] = useState('14:30');
  return (
    <div className="grid max-w-2xl gap-4 sm:grid-cols-2">
      <div className="max-h-64 overflow-y-auto">
        <TimeGrid value={t} onChange={setT} />
      </div>
      <div>
        <TimeGrid defaultValue="09:00" columns={2} options={['08:00', '09:00', '10:30', '12:00', '14:00', '16:30']} />
        <p className="mt-2 font-mono text-[11px] text-[#0a0a0b]/50 dark:text-white/40">picked: {t}</p>
      </div>
    </div>
  );
}
