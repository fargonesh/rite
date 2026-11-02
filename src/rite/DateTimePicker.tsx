import { useState } from 'react';
import { CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, Clock, X } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface DateTimePickerProps {
  label?: string;
  error?: string;
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (value: Date | null) => void;
  id?: string;
  name?: string;
  disabled?: boolean;
  placeholder?: string;
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

function monthLabel(d: Date): string {
  return new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(d);
}

function formatCommitted(d: Date): string {
  const date = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(d);
  const time = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }).format(d);
  return `${date} — ${time}`;
}

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

function clampInt(raw: string, max: number): string {
  const n = Number.parseInt(raw.replace(/\D/g, '').slice(0, 2), 10);
  if (Number.isNaN(n)) return '';
  return pad2(Math.min(Math.max(n, 0), max));
}

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export function DateTimePicker({
  label,
  error,
  value,
  defaultValue = null,
  onChange,
  id,
  name,
  disabled,
  placeholder = 'Select date + time',
  className,
}: DateTimePickerProps) {
  const isControlled = value !== undefined;
  const [inner, setInner] = useState<Date | null>(defaultValue);
  const committed = isControlled ? (value as Date | null) : inner;

  const [open, setOpen] = useState(false);
  const [view, setView] = useState<Date>(() => firstOfMonth(committed ?? new Date()));
  const [draftDay, setDraftDay] = useState<Date | null>(committed ? startOfDay(committed) : null);
  const [hour, setHour] = useState(committed ? pad2(committed.getHours()) : '09');
  const [minute, setMinute] = useState(committed ? pad2(committed.getMinutes()) : '00');

  const openPanel = () => {
    if (disabled) return;
    const base = committed ?? new Date();
    setView(firstOfMonth(base));
    setDraftDay(committed ? startOfDay(committed) : null);
    setHour(pad2(base.getHours()));
    setMinute(pad2(base.getMinutes()));
    setOpen(true);
  };

  const commit = (next: Date | null) => {
    if (!isControlled) setInner(next);
    onChange?.(next);
  };

  const handleDone = () => {
    const day = draftDay ?? startOfDay(new Date());
    const h = Number.parseInt(hour, 10);
    const m = Number.parseInt(minute, 10);
    const next = new Date(day.getFullYear(), day.getMonth(), day.getDate(), Number.isNaN(h) ? 0 : h, Number.isNaN(m) ? 0 : m);
    commit(next);
    setOpen(false);
  };

  const handleClear = () => {
    commit(null);
    setDraftDay(null);
    setOpen(false);
  };

  const lead = (firstOfMonth(view).getDay() + 6) % 7;
  const total = daysInMonth(view);
  const cells: Array<Date | null> = [
    ...Array.from({ length: lead }, () => null),
    ...Array.from({ length: total }, (_, i) => new Date(view.getFullYear(), view.getMonth(), i + 1)),
  ];

  return (
    <div className={cx('w-full', className)}>
      {label && (
        <label
          htmlFor={id}
          className="mb-1.5 flex items-baseline justify-between font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#0a0a0b]/70 dark:text-white/60"
        >
          <span>
            <span aria-hidden className="mr-1.5 text-[#d42b1e]">
              REQ
            </span>
            {label}
          </span>
        </label>
      )}
      <input type="hidden" name={name} value={committed ? committed.toISOString() : ''} />
      <button
        type="button"
        id={id}
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : openPanel())}
        aria-expanded={open}
        aria-invalid={Boolean(error)}
        className={cx(
          'flex h-9 w-full items-center gap-2 rounded-[2px] border bg-transparent px-3 font-mono text-[13px] outline-none transition-colors focus:ring-1 focus:ring-[#d42b1e]',
          error
            ? 'border-[#d42b1e]'
            : 'border-[#0a0a0b]/30 dark:border-white/20',
          disabled ? 'cursor-not-allowed opacity-40' : 'hover:border-[#0a0a0b] dark:hover:border-white/60',
          !committed && 'text-[#0a0a0b]/35 dark:text-white/30',
        )}
      >
        <CalendarDays aria-hidden className="h-4 w-4 shrink-0 text-[#d42b1e]" />
        <span className="flex-1 truncate text-left">{committed ? formatCommitted(committed) : placeholder}</span>
        <ChevronDown aria-hidden className={cx('h-4 w-4 shrink-0 opacity-50 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="mt-1.5 rounded-[2px] border border-[#0a0a0b]/30 bg-[#e9e7e2] dark:border-white/20 dark:bg-[#08090b]">
          <div className="flex items-center justify-between border-b border-[#0a0a0b]/15 px-3 py-2 dark:border-white/10">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0a0a0b]/60 dark:text-white/50">
              {monthLabel(view)}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => setView((v) => addMonths(v, -1))}
                className="flex h-7 w-7 items-center justify-center rounded-[2px] text-[#0a0a0b]/70 outline-none transition-colors hover:bg-[#0a0a0b]/5 hover:text-[#0a0a0b] focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white"
              >
                <ChevronLeft aria-hidden className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => setView((v) => addMonths(v, 1))}
                className="flex h-7 w-7 items-center justify-center rounded-[2px] text-[#0a0a0b]/70 outline-none transition-colors hover:bg-[#0a0a0b]/5 hover:text-[#0a0a0b] focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white"
              >
                <ChevronRight aria-hidden className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-3 p-3 sm:flex-row">
            <div className="flex-1">
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
                      onClick={() => setDraftDay(startOfDay(day))}
                      aria-pressed={draftDay !== null && isSameDay(day, draftDay)}
                      className={cx(
                        'h-8 rounded-[2px] font-mono text-[12px] outline-none transition-colors focus-visible:ring-1 focus-visible:ring-[#d42b1e]',
                        draftDay !== null && isSameDay(day, draftDay)
                          ? 'bg-[#0a0a0b] text-[#e9e7e2] dark:bg-[#e9e7e2] dark:text-black'
                          : 'text-[#0a0a0b]/75 hover:bg-[#0a0a0b]/5 dark:text-white/70 dark:hover:bg-white/5',
                      )}
                    >
                      {day.getDate()}
                    </button>
                  ),
                )}
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 border-t border-[#0a0a0b]/15 pt-3 sm:w-32 sm:flex-col sm:items-stretch sm:border-l sm:border-t-0 sm:pl-3 sm:pt-0 dark:border-white/10">
              <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#0a0a0b]/60 dark:text-white/50">
                <Clock aria-hidden className="h-3.5 w-3.5 text-[#d42b1e]" />
                Time
              </span>
              <div className="flex items-center gap-1">
                <input
                  aria-label="Hours"
                  value={hour}
                  inputMode="numeric"
                  maxLength={2}
                  onChange={(e) => setHour(e.target.value.replace(/\D/g, '').slice(0, 2))}
                  onBlur={() => setHour((h) => clampInt(h, 23) || '00')}
                  className="h-9 w-full min-w-0 rounded-[2px] border border-[#0a0a0b]/30 bg-transparent px-2 text-center font-mono text-[13px] outline-none focus:border-[#0a0a0b] focus:ring-1 focus:ring-[#d42b1e] dark:border-white/20 dark:focus:border-white/60"
                />
                <span aria-hidden className="font-mono text-[13px] text-[#0a0a0b]/50 dark:text-white/40">
                  :
                </span>
                <input
                  aria-label="Minutes"
                  value={minute}
                  inputMode="numeric"
                  maxLength={2}
                  onChange={(e) => setMinute(e.target.value.replace(/\D/g, '').slice(0, 2))}
                  onBlur={() => setMinute((m) => clampInt(m, 59) || '00')}
                  className="h-9 w-full min-w-0 rounded-[2px] border border-[#0a0a0b]/30 bg-transparent px-2 text-center font-mono text-[13px] outline-none focus:border-[#0a0a0b] focus:ring-1 focus:ring-[#d42b1e] dark:border-white/20 dark:focus:border-white/60"
                />
              </div>
              <p className="hidden font-mono text-[10px] text-[#0a0a0b]/40 sm:block dark:text-white/30">24H — HH:MM</p>
            </div>
          </div>
          <div className="flex items-center justify-end gap-1.5 border-t border-[#0a0a0b]/15 px-3 py-2 dark:border-white/10">
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex h-8 items-center gap-1.5 rounded-[2px] px-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#0a0a0b]/60 outline-none transition-colors hover:text-[#d42b1e] focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:text-white/50 dark:hover:text-[#ff6b5e]"
            >
              <X aria-hidden className="h-3.5 w-3.5" />
              Clear
            </button>
            <button
              type="button"
              onClick={handleDone}
              className="inline-flex h-8 items-center gap-1.5 rounded-[2px] bg-[#0a0a0b] px-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#e9e7e2] outline-none transition-colors hover:bg-[#1c0b0a] focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:bg-[#e9e7e2] dark:text-black dark:hover:bg-white"
            >
              <Check aria-hidden className="h-3.5 w-3.5" />
              Done
            </button>
          </div>
        </div>
      )}
      {error && (
        <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#d42b1e]">{error}</p>
      )}
    </div>
  );
}

export function DateTimePickerDemo() {
  const [stamp, setStamp] = useState<Date | null>(new Date(2026, 10, 2, 14, 30));
  return (
    <div className="flex max-w-md flex-col gap-4">
      <DateTimePicker label="Rite schedule" value={stamp} onChange={setStamp} />
      <DateTimePicker label="Uncontrolled toll" defaultValue={new Date(2026, 5, 13, 9, 0)} />
      <DateTimePicker label="Severed entry" error="ERR — datetime required" defaultValue={null} />
      <p className="font-mono text-[11px] text-[#0a0a0b]/50 dark:text-white/40">
        committed: {stamp ? stamp.toISOString() : 'null'}
      </p>
    </div>
  );
}
