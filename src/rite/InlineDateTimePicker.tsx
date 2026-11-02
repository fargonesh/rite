import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface InlineDateTimePickerProps {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (value: Date | null) => void;
  withTime?: boolean;
  className?: string;
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function firstOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function addMonths(d: Date, n: number): Date {
  const c = new Date(d);
  c.setMonth(c.getMonth() + n, 1);
  return c;
}

function daysInMonth(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}

function stripLabel(d: Date): string {
  return new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric' }).format(d);
}

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const TIME_OPTIONS = ['08:00', '09:30', '11:00', '12:30', '14:00', '15:30', '17:00', '18:30'];

export function InlineDateTimePicker({
  value,
  defaultValue = null,
  onChange,
  withTime = true,
  className,
}: InlineDateTimePickerProps) {
  const isControlled = value !== undefined;
  const [inner, setInner] = useState<Date | null>(defaultValue);
  const current = isControlled ? (value as Date | null) : inner;

  const base = current ?? new Date();
  const [view, setView] = useState<Date>(() => firstOfMonth(base));

  const commit = (next: Date | null) => {
    if (!isControlled) setInner(next);
    onChange?.(next);
  };

  const pickDay = (day: Date) => {
    const keep = current ?? new Date();
    commit(new Date(day.getFullYear(), day.getMonth(), day.getDate(), keep.getHours(), keep.getMinutes()));
  };

  const pickTime = (opt: string) => {
    const [h, m] = opt.split(':').map(Number);
    const keep = current ?? new Date();
    commit(new Date(keep.getFullYear(), keep.getMonth(), keep.getDate(), h, m));
  };

  const lead = (firstOfMonth(view).getDay() + 6) % 7;
  const total = daysInMonth(view);
  const cells: Array<Date | null> = [
    ...Array.from({ length: lead }, () => null),
    ...Array.from({ length: total }, (_, i) => new Date(view.getFullYear(), view.getMonth(), i + 1)),
  ];

  const currentHHMM = current ? `${pad2(current.getHours())}:${pad2(current.getMinutes())}` : null;

  return (
    <div className={cx('w-full rounded-[2px] border border-[#0a0a0b]/30 bg-transparent dark:border-white/20', className)}>
      <div className="grid grid-cols-3 border-b border-[#0a0a0b]/15 dark:border-white/10" role="group" aria-label="Choose month">
        {[-1, 0, 1].map((offset) => {
          const m = addMonths(view, offset);
          const active = offset === 0;
          return (
            <button
              key={offset}
              type="button"
              onClick={() => setView(m)}
              aria-pressed={active}
              className={cx(
                'flex h-9 items-center justify-center gap-1 px-2 font-mono text-[11px] uppercase tracking-[0.14em] outline-none transition-colors focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#d42b1e]',
                offset === -1 && 'justify-start',
                offset === 1 && 'justify-end',
                active ? 'text-[#d42b1e]' : 'text-[#0a0a0b]/50 hover:text-[#0a0a0b] dark:text-white/40 dark:hover:text-white',
              )}
            >
              {offset === -1 && <ChevronLeft aria-hidden className="h-3.5 w-3.5" />}
              {stripLabel(m)}
              {offset === 1 && <ChevronRight aria-hidden className="h-3.5 w-3.5" />}
            </button>
          );
        })}
      </div>
      <div className="p-3">
        <div className="grid grid-cols-7 gap-px" aria-hidden>
          {WEEKDAYS.map((d) => (
            <span key={d} className="py-1 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-[#0a0a0b]/40 dark:text-white/30">
              {d}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px" role="grid" aria-label="Choose day">
          {cells.map((day, i) =>
            day === null ? (
              <span key={`blank-${i}`} aria-hidden className="h-8" />
            ) : (
              <button
                key={day.getTime()}
                type="button"
                onClick={() => pickDay(startOfDay(day))}
                aria-pressed={current !== null && isSameDay(day, current)}
                className={cx(
                  'h-8 rounded-[2px] font-mono text-[12px] outline-none transition-colors focus-visible:ring-1 focus-visible:ring-[#d42b1e]',
                  current !== null && isSameDay(day, current)
                    ? 'bg-[#0a0a0b] text-[#e9e7e2] dark:bg-[#e9e7e2] dark:text-black'
                    : 'text-[#0a0a0b]/75 hover:bg-[#0a0a0b]/5 dark:text-white/70 dark:hover:bg-white/5',
                )}
              >
                {day.getDate()}
              </button>
            ),
          )}
        </div>
        {withTime && (
          <div className="mt-3 border-t border-[#0a0a0b]/15 pt-3 dark:border-white/10">
            <p className="mb-2 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#0a0a0b]/60 dark:text-white/50">
              <Clock aria-hidden className="h-3.5 w-3.5 text-[#d42b1e]" />
              {currentHHMM ?? '--:--'}
            </p>
            <div className="grid grid-cols-4 gap-1" role="group" aria-label="Choose time">
              {TIME_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => pickTime(opt)}
                  aria-pressed={currentHHMM === opt}
                  className={cx(
                    'h-8 rounded-[2px] border font-mono text-[12px] outline-none transition-colors focus-visible:ring-1 focus-visible:ring-[#d42b1e]',
                    currentHHMM === opt
                      ? 'border-[#0a0a0b] bg-[#0a0a0b] text-[#e9e7e2] dark:border-[#e9e7e2] dark:bg-[#e9e7e2] dark:text-black'
                      : 'border-[#0a0a0b]/25 text-[#0a0a0b]/70 hover:border-[#0a0a0b] dark:border-white/20 dark:text-white/60 dark:hover:border-white',
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function InlineDateTimePickerDemo() {
  const [a, setA] = useState<Date | null>(new Date(2026, 10, 2, 14, 0));
  const [b, setB] = useState<Date | null>(null);
  return (
    <div className="grid max-w-2xl gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <InlineDateTimePicker value={a} onChange={setA} />
        <p className="font-mono text-[11px] text-[#0a0a0b]/50 dark:text-white/40">
          controlled: {a ? a.toISOString() : 'null'}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <InlineDateTimePicker value={b} onChange={setB} withTime={false} />
        <p className="font-mono text-[11px] text-[#0a0a0b]/50 dark:text-white/40">date only, no time row</p>
      </div>
    </div>
  );
}
