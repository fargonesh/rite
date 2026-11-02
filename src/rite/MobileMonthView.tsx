import { useState } from 'react';
import { Smartphone } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface MobileMonthViewEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

export interface MobileMonthViewProps {
  events: MobileMonthViewEvent[];
  month?: Date;
  defaultMonth?: Date;
  className?: string;
}

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

function fmtTime(d: Date): string {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function MobileMonthView({ events, month, defaultMonth, className }: MobileMonthViewProps) {
  const [internalMonth] = useState<Date>(() => defaultMonth ?? new Date());
  const activeMonth = month ?? internalMonth;
  const year = activeMonth.getFullYear();
  const mon = activeMonth.getMonth();

  const first = new Date(year, mon, 1);
  const lead = (first.getDay() + 6) % 7;
  const start = new Date(year, mon, 1 - lead);
  const cells = Array.from({ length: 42 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
  const weeks: Date[][] = Array.from({ length: 6 }, (_, w) => cells.slice(w * 7, w * 7 + 7));

  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const selected = cells.find((d) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}` === selectedKey) ?? new Date();
  const selectedEvents = events.filter((e) => sameDay(e.start, selected)).sort((a, b) => a.start.getTime() - b.start.getTime());

  function cellKey(d: Date): string {
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  }

  return (
    <div className={cx('overflow-hidden rounded-[2px] border border-[#0a0a0b]/15 bg-white dark:border-white/10 dark:bg-[#0d0e11]', className)}>
      <div className="flex items-center gap-2 border-b border-[#0a0a0b]/10 px-3 py-2 dark:border-white/10">
        <Smartphone className="h-3.5 w-3.5 text-[#0a0a0b]/50 dark:text-white/50" aria-hidden />
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0a0a0b] dark:text-[#e9e7e2]">
          {MONTHS[mon]} {year}
        </p>
      </div>
      <div className="px-2 py-2">
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 gap-0.5">
            {week.map((d) => {
              const inMonth = d.getMonth() === mon;
              const dayEvents = events.filter((e) => sameDay(e.start, d));
              const isSelected = cellKey(d) === cellKey(selected);
              const isToday = sameDay(d, new Date());
              return (
                <button
                  key={cellKey(d)}
                  type="button"
                  onClick={() => setSelectedKey(cellKey(d))}
                  aria-pressed={isSelected}
                  className={cx(
                    'flex min-h-10 flex-col items-center justify-center rounded-[2px] border px-0.5 py-1',
                    isSelected
                      ? 'border-[#0a0a0b] dark:border-[#e9e7e2]'
                      : 'border-transparent hover:border-[#0a0a0b]/20 dark:hover:border-white/20',
                    !inMonth && 'opacity-35',
                  )}
                >
                  <span className={cx('font-mono text-[11px]', isToday ? 'text-[#d42b1e] dark:text-[#ff6b5e]' : 'text-[#0a0a0b] dark:text-[#e9e7e2]')}>
                    {d.getDate()}
                  </span>
                  <span className="mt-1 flex h-1 items-center gap-0.5" aria-hidden>
                    {dayEvents.slice(0, 3).map((e) => (
                      <span key={e.id} className="h-1 w-1 rounded-full bg-[#0a0a0b]/60 dark:bg-white/60" />
                    ))}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div className="border-t border-[#0a0a0b]/10 dark:border-white/10">
        <p className="px-3 pt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#0a0a0b]/60 dark:text-white/60">
          {selected.getFullYear()}-{pad(selected.getMonth() + 1)}-{pad(selected.getDate())} / {selectedEvents.length}
        </p>
        <ol className="px-3 py-2">
          {selectedEvents.length === 0 && (
            <li className="py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#0a0a0b]/40 dark:text-white/40">
              No events
            </li>
          )}
          {selectedEvents.map((e) => (
            <li key={e.id} className="flex items-baseline gap-3 border-b border-dashed border-[#0a0a0b]/10 py-1.5 last:border-b-0 dark:border-white/10">
              <span className="w-11 shrink-0 font-mono text-[10px] tracking-[0.12em] text-[#0a0a0b]/60 dark:text-white/60">
                {fmtTime(e.start)}
              </span>
              <span className="truncate text-sm text-[#0a0a0b] dark:text-[#e9e7e2]">{e.title}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function MobileMonthViewDemo() {
  const now = new Date();
  const at = (day: number, h: number) => new Date(now.getFullYear(), now.getMonth(), day, h);
  const todayNum = now.getDate();
  return (
    <div className="mx-auto max-w-xs rounded-[2px] border border-[#0a0a0b]/15 p-3 dark:border-white/10">
      <MobileMonthView
        events={[
          { id: 'm1', title: 'Standup', start: at(todayNum, 9), end: at(todayNum, 10) },
          { id: 'm2', title: 'Review', start: at(todayNum, 14), end: at(todayNum, 15) },
          { id: 'm3', title: 'Planning', start: at(Math.min(todayNum + 2, 28), 10), end: at(Math.min(todayNum + 2, 28), 11) },
        ]}
      />
    </div>
  );
}
