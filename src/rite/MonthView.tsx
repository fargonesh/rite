import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cx } from '../lib/cx.ts';

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resourceId?: string;
}

export interface MonthViewProps {
  events: Event[];
  month?: Date;
  defaultMonth?: Date;
  className?: string;
}

const WEEKDAYS = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function monthTitle(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export function MonthView({ events, month, defaultMonth, className }: MonthViewProps) {
  const [internal, setInternal] = useState<Date>(() => defaultMonth ?? new Date());
  const controlled = month !== undefined;
  const current = controlled ? month : internal;
  const y = current.getFullYear();
  const m = current.getMonth();
  const lead = new Date(y, m, 1).getDay();
  const cells = Array.from({ length: 42 }, (_, i) => new Date(y, m, 1 - lead + i));
  const today = new Date();

  function shift(delta: number): void {
    if (controlled) return;
    setInternal(new Date(y, m + delta, 1));
  }

  return (
    <div
      className={cx(
        'rounded-[2px] border border-[#0a0a0b]/20 bg-white font-mono dark:border-white/15 dark:bg-[#0e0f11]',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-dashed border-[#0a0a0b]/15 px-3 py-2 dark:border-white/10">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#0a0a0b] dark:text-[#e9e7e2]">
          {monthTitle(current)}
        </p>
        <div className="flex items-center gap-1">
          <span className="mr-1 text-[10px] uppercase tracking-[0.14em] text-[#0a0a0b]/50 dark:text-white/50">
            {events.length} entries
          </span>
          <button
            type="button"
            onClick={() => shift(-1)}
            disabled={controlled}
            aria-label="Previous month"
            className="rounded-[2px] border border-[#0a0a0b]/20 p-1 text-[#0a0a0b] disabled:opacity-40 dark:border-white/15 dark:text-[#e9e7e2]"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => shift(1)}
            disabled={controlled}
            aria-label="Next month"
            className="rounded-[2px] border border-[#0a0a0b]/20 p-1 text-[#0a0a0b] disabled:opacity-40 dark:border-white/15 dark:text-[#e9e7e2]"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 border-b border-[#0a0a0b]/15 dark:border-white/10">
        {WEEKDAYS.map((d) => (
          <p
            key={d}
            className="px-1 py-1.5 text-center text-[10px] tracking-[0.2em] text-[#0a0a0b]/45 dark:text-white/45"
          >
            {d}
          </p>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px bg-[#0a0a0b]/10 dark:bg-white/10">
        {cells.map((date) => {
          const inMonth = date.getMonth() === m;
          const isToday = sameDay(date, today);
          const dayEvents = events
            .filter((e) => sameDay(e.start, date))
            .sort((a, b) => a.start.getTime() - b.start.getTime());
          const rest = dayEvents.length - 2;
          return (
            <div
              key={date.toISOString()}
              className={cx('min-h-[78px] bg-white p-1 dark:bg-[#0e0f11]', !inMonth && 'opacity-40')}
            >
              <span
                className={cx(
                  'inline-block rounded-[2px] px-1 text-[10px] leading-5',
                  isToday
                    ? 'bg-[#d42b1e] text-white'
                    : 'text-[#0a0a0b]/70 dark:text-white/70',
                )}
              >
                {date.getDate()}
              </span>
              <div className="mt-1 space-y-0.5">
                {dayEvents.slice(0, 2).map((e) => (
                  <p
                    key={e.id}
                    title={e.title}
                    className="truncate rounded-[2px] bg-[#0a0a0b]/[0.06] px-1 py-px text-[9px] uppercase tracking-[0.06em] text-[#0a0a0b] dark:bg-white/10 dark:text-[#e9e7e2]"
                  >
                    {e.title}
                  </p>
                ))}
                {rest > 0 && (
                  <p className="px-1 text-[9px] tracking-[0.06em] text-[#0a0a0b]/50 dark:text-white/50">
                    +{rest} more
                  </p>
                )}
              </div>
              {dayEvents.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-[3px] px-0.5">
                  {dayEvents.slice(0, 8).map((e) => (
                    <span
                      key={e.id}
                      className="h-1 w-1 rounded-[1px] bg-[#0a0a0b]/40 dark:bg-white/40"
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const DEMO_EVENTS: Event[] = [
  { id: 'm1', title: 'Standup', start: new Date(2026, 10, 3, 9, 0), end: new Date(2026, 10, 3, 9, 30) },
  { id: 'm2', title: 'Dossier review', start: new Date(2026, 10, 3, 11, 0), end: new Date(2026, 10, 3, 12, 0) },
  { id: 'm3', title: 'Client call', start: new Date(2026, 10, 3, 14, 0), end: new Date(2026, 10, 3, 15, 0) },
  { id: 'm4', title: 'Survey pass', start: new Date(2026, 10, 5, 10, 0), end: new Date(2026, 10, 5, 11, 0) },
  { id: 'm5', title: 'Filing deadline', start: new Date(2026, 10, 12, 9, 0), end: new Date(2026, 10, 12, 10, 0) },
  { id: 'm6', title: 'Witness sign-off', start: new Date(2026, 10, 12, 16, 0), end: new Date(2026, 10, 12, 17, 0) },
  { id: 'm7', title: 'Archive run', start: new Date(2026, 10, 20, 13, 0), end: new Date(2026, 10, 20, 14, 0) },
  { id: 'm8', title: 'Overflow hearing', start: new Date(2026, 11, 2, 9, 0), end: new Date(2026, 11, 2, 10, 0) },
];

export function MonthViewDemo() {
  return (
    <div className="space-y-2">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/50 dark:text-white/50">
        November ledger - 8 entries
      </p>
      <MonthView events={DEMO_EVENTS} defaultMonth={new Date(2026, 10, 1)} />
    </div>
  );
}
