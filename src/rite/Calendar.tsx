import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface CalendarProps {
  month?: Date;
  defaultMonth?: Date;
  onMonthChange?: (month: Date) => void;
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
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

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function addMonths(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export function Calendar({
  month,
  defaultMonth,
  onMonthChange,
  value,
  defaultValue = null,
  onChange,
  className,
}: CalendarProps) {
  const today = new Date();
  const isMonthControlled = month !== undefined;
  const isValueControlled = value !== undefined;
  const [innerMonth, setInnerMonth] = useState<Date>(() => startOfMonth(defaultMonth ?? defaultValue ?? today));
  const [innerValue, setInnerValue] = useState<Date | null>(defaultValue);
  const view = startOfMonth(isMonthControlled ? (month as Date) : innerMonth);
  const selected = isValueControlled ? (value as Date | null) : innerValue;

  const goMonth = (next: Date) => {
    const clean = startOfMonth(next);
    if (!isMonthControlled) setInnerMonth(clean);
    onMonthChange?.(clean);
  };

  const pick = (day: Date) => {
    const next = selected && isSameDay(selected, day) ? null : new Date(day.getFullYear(), day.getMonth(), day.getDate());
    if (!isValueControlled) setInnerValue(next);
    onChange?.(next);
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

  return (
    <div className={cx('w-full rounded-[2px] border border-[#0a0a0b]/20 bg-transparent p-3 dark:border-white/15', className)}>
      <div className="mb-2 flex items-center justify-between">
        <button type="button" aria-label="Previous month" onClick={() => goMonth(addMonths(view, -1))} className={navBtn}>
          <ChevronLeft size={14} aria-hidden />
        </button>
        <p aria-live="polite" className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-[#0a0a0b]/80 dark:text-white/70">
          {monthLabel(view)}
        </p>
        <button type="button" aria-label="Next month" onClick={() => goMonth(addMonths(view, 1))} className={navBtn}>
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
      <div role="grid" aria-label={`Calendar ${monthLabel(view)}`} className="grid grid-cols-7 gap-px">
        {cells.map((day, i) => {
          if (day === null) return <span key={`blank-${i}`} className="h-8" aria-hidden />;
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
              onClick={() => pick(day)}
              className={cx(
                'relative flex h-8 items-center justify-center rounded-[2px] font-mono text-[12px] outline-none transition-colors focus-visible:ring-1 focus-visible:ring-[#d42b1e]',
                isSelected
                  ? 'bg-[#0a0a0b] text-[#e9e7e2] dark:bg-[#e9e7e2] dark:text-black'
                  : 'text-[#0a0a0b]/80 hover:bg-[#0a0a0b]/5 hover:text-[#0a0a0b] dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white',
              )}
            >
              {day.getDate()}
              {isToday && (
                <span aria-hidden className="absolute bottom-1 h-1 w-1 rounded-full bg-[#d42b1e]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function CalendarDemo() {
  const [day, setDay] = useState<Date | null>(new Date());
  const [seen, setSeen] = useState<string>('—');
  return (
    <div className="flex max-w-xs flex-col gap-3">
      <Calendar value={day} onChange={(d) => { setDay(d); setSeen(d ? `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}` : 'cleared'); }} />
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#0a0a0b]/60 dark:text-white/50">
        picked — {seen}
      </p>
      <Calendar />
    </div>
  );
}
