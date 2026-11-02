import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface MiniCalendarProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (value: Date) => void;
  days?: number;
  start?: Date;
  className?: string;
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function addDays(d: Date, n: number): Date {
  const c = new Date(d);
  c.setDate(c.getDate() + n);
  return c;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function dayLetter(d: Date): string {
  return new Intl.DateTimeFormat('en-GB', { weekday: 'narrow' }).format(d);
}

export function MiniCalendar({ value, defaultValue, onChange, days = 7, start, className }: MiniCalendarProps) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const anchor = start ? startOfDay(start) : today;
  const fallback = defaultValue ? startOfDay(defaultValue) : today;

  const isControlled = value !== undefined;
  const [inner, setInner] = useState<Date>(fallback);
  const selected = isControlled ? startOfDay(value as Date) : inner;

  const [offset, setOffset] = useState(0);
  const windowStart = addDays(anchor, offset);
  const cells = useMemo(() => Array.from({ length: Math.max(days, 1) }, (_, i) => addDays(windowStart, i)), [windowStart, days]);

  const commit = (next: Date) => {
    const day = startOfDay(next);
    if (!isControlled) setInner(day);
    onChange?.(day);
  };

  return (
    <div className={cx('w-full', className)}>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#0a0a0b]/70 dark:text-white/60">
          {new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric' }).format(windowStart)}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous days"
            onClick={() => setOffset((o) => o - Math.max(days, 1))}
            className="flex h-7 w-7 items-center justify-center rounded-[2px] text-[#0a0a0b]/70 outline-none transition-colors hover:bg-[#0a0a0b]/5 hover:text-[#0a0a0b] focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white"
          >
            <ChevronLeft aria-hidden className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Back to today"
            onClick={() => setOffset(0)}
            className="flex h-7 w-7 items-center justify-center rounded-[2px] text-[#0a0a0b]/70 outline-none transition-colors hover:bg-[#0a0a0b]/5 hover:text-[#0a0a0b] focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white"
          >
            <RotateCcw aria-hidden className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            aria-label="Next days"
            onClick={() => setOffset((o) => o + Math.max(days, 1))}
            className="flex h-7 w-7 items-center justify-center rounded-[2px] text-[#0a0a0b]/70 outline-none transition-colors hover:bg-[#0a0a0b]/5 hover:text-[#0a0a0b] focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white"
          >
            <ChevronRight aria-hidden className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${Math.max(days, 1)}, minmax(0, 1fr))` }} role="group" aria-label="Choose day">
        {cells.map((day) => {
          const active = isSameDay(day, selected);
          const isToday = isSameDay(day, today);
          return (
            <button
              key={day.getTime()}
              type="button"
              onClick={() => commit(day)}
              aria-pressed={active}
              aria-label={day.toDateString()}
              className={cx(
                'flex flex-col items-center gap-0.5 rounded-[2px] border py-1.5 outline-none transition-colors focus-visible:ring-1 focus-visible:ring-[#d42b1e]',
                active
                  ? 'border-[#0a0a0b] bg-[#0a0a0b] text-[#e9e7e2] dark:border-[#e9e7e2] dark:bg-[#e9e7e2] dark:text-black'
                  : 'border-[#0a0a0b]/20 text-[#0a0a0b]/70 hover:border-[#0a0a0b] dark:border-white/15 dark:text-white/60 dark:hover:border-white',
              )}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] opacity-60">{dayLetter(day)}</span>
              <span className="font-mono text-[13px] font-medium leading-none">{day.getDate()}</span>
              <span aria-hidden className={cx('mt-0.5 h-0.5 w-4', isToday && !active ? 'bg-[#d42b1e]' : 'bg-transparent')} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function MiniCalendarDemo() {
  const [day, setDay] = useState<Date>(new Date(2026, 10, 2));
  return (
    <div className="flex max-w-md flex-col gap-4">
      <MiniCalendar value={day} onChange={setDay} />
      <MiniCalendar days={5} defaultValue={new Date(2026, 10, 2)} />
      <p className="font-mono text-[11px] text-[#0a0a0b]/50 dark:text-white/40">selected: {day.toDateString()}</p>
    </div>
  );
}
