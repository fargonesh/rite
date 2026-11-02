import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface DatePickerProps {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function formatYMD(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function monthLabel(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
}

function isSameDay(a: Date | null | undefined, b: Date | null | undefined): boolean {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function clampDay(d: Date, min?: Date, max?: Date): Date {
  const t = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  if (min) {
    const lo = new Date(min.getFullYear(), min.getMonth(), min.getDate()).getTime();
    if (t < lo) return new Date(min.getFullYear(), min.getMonth(), min.getDate());
  }
  if (max) {
    const hi = new Date(max.getFullYear(), max.getMonth(), max.getDate()).getTime();
    if (t > hi) return new Date(max.getFullYear(), max.getMonth(), max.getDate());
  }
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function outOfRange(d: Date, min?: Date, max?: Date): boolean {
  const t = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  if (min && t < new Date(min.getFullYear(), min.getMonth(), min.getDate()).getTime()) return true;
  if (max && t > new Date(max.getFullYear(), max.getMonth(), max.getDate()).getTime()) return true;
  return false;
}

function isoWeek(d: Date): number {
  const c = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dow = (c.getUTCDay() + 6) % 7;
  c.setUTCDate(c.getUTCDate() - dow + 3);
  const first = new Date(Date.UTC(c.getUTCFullYear(), 0, 4));
  const firstDow = (first.getUTCDay() + 6) % 7;
  first.setUTCDate(first.getUTCDate() - firstDow + 3);
  return 1 + Math.round((c.getTime() - first.getTime()) / 604800000);
}

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export function DatePicker({ value, defaultValue = null, onChange, minDate, maxDate, className }: DatePickerProps) {
  const today = new Date();
  const isControlled = value !== undefined;
  const [inner, setInner] = useState<Date | null>(defaultValue);
  const selected = isControlled ? (value as Date | null) : inner;
  const [view, setView] = useState<Date>(() => {
    const base = selected ?? today;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  const commit = (day: Date) => {
    const next = selected && isSameDay(selected, day) ? null : clampDay(day, minDate, maxDate);
    if (!isControlled) setInner(next);
    onChange?.(next);
  };

  const goToday = () => {
    const t = clampDay(today, minDate, maxDate);
    setView(new Date(t.getFullYear(), t.getMonth(), 1));
    if (!isControlled) setInner(t);
    onChange?.(t);
  };

  const y = view.getFullYear();
  const m = view.getMonth();
  const offset = (new Date(y, m, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const cells: Array<Date | null> = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(y, m, d));
  while (cells.length % 7 !== 0) cells.push(null);

  const navBtn =
    'flex h-7 w-7 items-center justify-center rounded-[2px] border border-transparent font-mono outline-none transition-colors hover:border-[#0a0a0b]/30 hover:text-[#d42b1e] focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:hover:border-white/30 dark:hover:text-[#ff6b5e]';

  const cursor = selected ?? today;

  return (
    <div className={cx('w-full rounded-[2px] border border-[#0a0a0b]/20 bg-transparent dark:border-white/15', className)}>
      <div className="flex items-center justify-between border-b border-[#0a0a0b]/15 px-3 py-2 dark:border-white/10">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/55 dark:text-white/45">
          WK {pad(isoWeek(cursor))} — {monthLabel(view)}
        </p>
        <button
          type="button"
          onClick={goToday}
          className="rounded-[2px] border border-[#0a0a0b]/25 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#0a0a0b]/70 outline-none transition-colors hover:border-[#d42b1e] hover:text-[#d42b1e] focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:border-white/25 dark:text-white/60 dark:hover:border-[#d42b1e] dark:hover:text-[#ff6b5e]"
        >
          today
        </button>
      </div>
      <div className="p-3">
        <div className="mb-2 flex items-center justify-between">
          <button type="button" aria-label="Previous month" onClick={() => setView(new Date(y, m - 1, 1))} className={navBtn}>
            <ChevronLeft size={14} aria-hidden />
          </button>
          <p aria-live="polite" className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-[#0a0a0b]/80 dark:text-white/70">
            {monthLabel(view)}
          </p>
          <button type="button" aria-label="Next month" onClick={() => setView(new Date(y, m + 1, 1))} className={navBtn}>
            <ChevronRight size={14} aria-hidden />
          </button>
        </div>
        <div role="row" className="grid grid-cols-7 gap-px">
          {WEEKDAYS.map((d) => (
            <span key={d} className="pb-1 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-[#0a0a0b]/45 dark:text-white/40">
              {d}
            </span>
          ))}
        </div>
        <div role="grid" aria-label={`Date picker ${monthLabel(view)}`} className="grid grid-cols-7 gap-px">
          {cells.map((day, i) => {
            if (day === null) return <span key={`blank-${i}`} className="h-8" aria-hidden />;
            const disabled = outOfRange(day, minDate, maxDate);
            const isSelected = isSameDay(selected, day);
            const isToday = isSameDay(today, day);
            return (
              <button
                key={formatYMD(day)}
                type="button"
                role="gridcell"
                aria-label={formatYMD(day)}
                aria-pressed={isSelected}
                aria-current={isToday ? 'date' : undefined}
                aria-disabled={disabled || undefined}
                disabled={disabled}
                onClick={() => commit(day)}
                className={cx(
                  'relative flex h-8 items-center justify-center rounded-[2px] font-mono text-[12px] outline-none transition-colors focus-visible:ring-1 focus-visible:ring-[#d42b1e] disabled:cursor-not-allowed disabled:opacity-30',
                  isSelected
                    ? 'bg-[#0a0a0b] text-[#e9e7e2] dark:bg-[#e9e7e2] dark:text-black'
                    : 'text-[#0a0a0b]/80 hover:bg-[#0a0a0b]/5 hover:text-[#0a0a0b] dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white',
                )}
              >
                {day.getDate()}
                {isToday && <span aria-hidden className="absolute bottom-1 h-1 w-1 rounded-full bg-[#d42b1e]" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function DatePickerDemo() {
  const [day, setDay] = useState<Date | null>(new Date());
  const lo = new Date();
  lo.setDate(lo.getDate() - 7);
  const hi = new Date();
  hi.setDate(hi.getDate() + 21);
  return (
    <div className="flex max-w-xs flex-col gap-3">
      <DatePicker value={day} onChange={setDay} minDate={lo} maxDate={hi} />
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#0a0a0b]/60 dark:text-white/50">
        clamped pick — {day ? `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}` : 'none'}
      </p>
    </div>
  );
}
