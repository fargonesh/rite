import { useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { cx } from '../lib/cx.ts';

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resourceId?: string;
}

export interface YearViewProps {
  events: Event[];
  year?: number;
  defaultYear?: number;
  className?: string;
}

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function monthShort(mi: number): string {
  return new Date(2026, mi, 1).toLocaleDateString('en-US', { month: 'short' });
}

function fmtTime(d: Date): string {
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function YearView({ events, year, defaultYear, className }: YearViewProps) {
  const [internalYear, setInternalYear] = useState<number>(() => defaultYear ?? new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const controlled = year !== undefined;
  const currentYear = controlled ? year : internalYear;
  const today = new Date();
  const months = Array.from({ length: 12 }, (_, mi) => mi);
  const selectedEvents =
    selectedMonth === null
      ? []
      : events
          .filter((e) => e.start.getFullYear() === currentYear && e.start.getMonth() === selectedMonth)
          .sort((a, b) => a.start.getTime() - b.start.getTime());

  function shift(delta: number): void {
    if (controlled) return;
    setInternalYear(currentYear + delta);
  }

  return (
    <div
      className={cx(
        'rounded-[2px] border border-[#0a0a0b]/20 bg-white font-mono dark:border-white/15 dark:bg-[#0e0f11]',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-dashed border-[#0a0a0b]/15 px-3 py-2 dark:border-white/10">
        <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#0a0a0b] dark:text-[#e9e7e2]">
          <CalendarDays className="h-3.5 w-3.5" />
          {currentYear}
        </p>
        <div className="flex items-center gap-1">
          <span className="mr-1 text-[10px] uppercase tracking-[0.14em] text-[#0a0a0b]/50 dark:text-white/50">
            {events.length} entries
          </span>
          <button
            type="button"
            onClick={() => shift(-1)}
            disabled={controlled}
            aria-label="Previous year"
            className="rounded-[2px] border border-[#0a0a0b]/20 p-1 text-[#0a0a0b] disabled:opacity-40 dark:border-white/15 dark:text-[#e9e7e2]"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => shift(1)}
            disabled={controlled}
            aria-label="Next year"
            className="rounded-[2px] border border-[#0a0a0b]/20 p-1 text-[#0a0a0b] disabled:opacity-40 dark:border-white/15 dark:text-[#e9e7e2]"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-3 lg:grid-cols-4">
        {months.map((mi) => {
          const daysInMonth = new Date(currentYear, mi + 1, 0).getDate();
          const lead = new Date(currentYear, mi, 1).getDay();
          const blanks = Array.from({ length: lead }, (_, i) => `b${i}`);
          const days = Array.from({ length: daysInMonth }, (_, i) => new Date(currentYear, mi, i + 1));
          const selected = selectedMonth === mi;
          return (
            <button
              key={mi}
              type="button"
              onClick={() => setSelectedMonth(mi)}
              aria-pressed={selected}
              className={cx(
                'rounded-[2px] border p-2 text-left',
                selected
                  ? 'border-[#d42b1e] dark:border-[#d42b1e]'
                  : 'border-[#0a0a0b]/15 dark:border-white/10',
              )}
            >
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b] dark:text-[#e9e7e2]">
                {monthShort(mi)}
              </span>
              <span className="mt-1.5 grid grid-cols-7 gap-[2px]">
                {blanks.map((b) => (
                  <span key={b} className="aspect-square" />
                ))}
                {days.map((d) => {
                  const has = events.some((e) => sameDay(e.start, d));
                  const isToday = sameDay(d, today);
                  return (
                    <span
                      key={d.toISOString()}
                      title={`${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}${has ? ' - booked' : ''}`}
                      className={cx(
                        'aspect-square rounded-[1px] border',
                        has
                          ? 'border-[#d42b1e]/60 bg-[#d42b1e]/20 dark:border-[#d42b1e]/60 dark:bg-[#d42b1e]/25'
                          : 'border-[#0a0a0b]/10 dark:border-white/10',
                        isToday && !has && 'border-[#d42b1e] dark:border-[#d42b1e]',
                      )}
                    />
                  );
                })}
              </span>
            </button>
          );
        })}
      </div>
      <div className="border-t border-dashed border-[#0a0a0b]/15 px-3 py-2 dark:border-white/10">
        {selectedMonth === null ? (
          <p className="text-[10px] uppercase tracking-[0.14em] text-[#0a0a0b]/50 dark:text-white/50">
            Select a month to inspect entries
          </p>
        ) : (
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.14em] text-[#0a0a0b]/50 dark:text-white/50">
              {monthShort(selectedMonth)} - {selectedEvents.length} entries
            </p>
            {selectedEvents.length === 0 ? (
              <p className="text-[11px] text-[#0a0a0b]/60 dark:text-white/60">No entries filed.</p>
            ) : (
              selectedEvents.map((e) => (
                <p
                  key={e.id}
                  className="flex items-center gap-2 text-[11px] text-[#0a0a0b] dark:text-[#e9e7e2]"
                >
                  <Clock className="h-3 w-3 shrink-0 text-[#0a0a0b]/50 dark:text-white/50" />
                  <span className="text-[#0a0a0b]/50 dark:text-white/50">{fmtTime(e.start)}</span>
                  <span className="truncate">{e.title}</span>
                </p>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const DEMO_EVENTS: Event[] = [
  { id: 'y1', title: 'Winter filing', start: new Date(2026, 0, 12, 9, 0), end: new Date(2026, 0, 12, 10, 0) },
  { id: 'y2', title: 'Spring survey', start: new Date(2026, 2, 3, 10, 0), end: new Date(2026, 2, 3, 11, 0) },
  { id: 'y3', title: 'Ledger audit', start: new Date(2026, 2, 4, 14, 0), end: new Date(2026, 2, 4, 15, 0) },
  { id: 'y4', title: 'Midyear review', start: new Date(2026, 5, 21, 9, 0), end: new Date(2026, 5, 21, 12, 0) },
  { id: 'y5', title: 'Dossier hearing', start: new Date(2026, 10, 2, 9, 0), end: new Date(2026, 10, 2, 10, 0) },
  { id: 'y6', title: 'Sealing ceremony', start: new Date(2026, 11, 24, 16, 0), end: new Date(2026, 11, 24, 17, 0) },
];

export function YearViewDemo() {
  return (
    <div className="space-y-2">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/50 dark:text-white/50">
        Annual survey - 6 entries
      </p>
      <YearView events={DEMO_EVENTS} defaultYear={2026} />
    </div>
  );
}
