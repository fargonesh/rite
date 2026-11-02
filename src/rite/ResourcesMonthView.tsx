import { CalendarDays, User } from 'lucide-react';
import { cx } from '../lib/cx.ts';

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resourceId?: string;
}

interface Resource {
  id: string;
  label: string;
}

export interface ResourcesMonthViewProps {
  events: Event[];
  resources: Resource[];
  month?: Date;
  className?: string;
}

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function ResourcesMonthView({ events, resources, month, className }: ResourcesMonthViewProps) {
  const current = month ?? new Date();
  const y = current.getFullYear();
  const m = current.getMonth();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => new Date(y, m, i + 1));

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
          {current.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
        <span className="text-[10px] uppercase tracking-[0.14em] text-[#0a0a0b]/50 dark:text-white/50">
          {events.length} bookings
        </span>
      </div>
      {resources.length === 0 ? (
        <p className="px-3 py-4 text-[11px] text-[#0a0a0b]/60 dark:text-white/60">
          No resources registered.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[720px] p-3">
            <div
              className="grid items-center gap-[3px]"
              style={{ gridTemplateColumns: `8rem repeat(${days.length}, minmax(0, 1fr))` }}
            >
              <span className="text-[10px] uppercase tracking-[0.14em] text-[#0a0a0b]/45 dark:text-white/45">
                Lane
              </span>
              {days.map((d) => (
                <span
                  key={d.toISOString()}
                  className="text-center text-[9px] text-[#0a0a0b]/45 dark:text-white/45"
                >
                  {d.getDate()}
                </span>
              ))}
              {resources.map((r) => {
                const lane = events.filter((e) => e.resourceId === r.id);
                return (
                  <div key={r.id} className="contents">
                    <span className="flex items-center gap-1.5 border-t border-dashed border-[#0a0a0b]/15 pt-2 text-[10px] uppercase tracking-[0.12em] text-[#0a0a0b] dark:border-white/10 dark:text-[#e9e7e2]">
                      <User className="h-3 w-3 shrink-0 text-[#0a0a0b]/50 dark:text-white/50" />
                      <span className="truncate">{r.label}</span>
                      <span className="ml-auto text-[#0a0a0b]/45 dark:text-white/45">{lane.length}</span>
                    </span>
                    {days.map((d) => {
                      const cell = lane.filter((e) => sameDay(e.start, d));
                      return (
                        <span key={d.toISOString()} className="flex justify-center border-t border-dashed border-[#0a0a0b]/15 pt-2 dark:border-white/10">
                          <span
                            title={cell.length > 0 ? cell.map((e) => e.title).join(', ') : 'Open'}
                            className={cx(
                              'h-3 w-3 rounded-[1px] border',
                              cell.length > 0
                                ? 'border-[#d42b1e]/60 bg-[#d42b1e]/20 dark:border-[#d42b1e]/60 dark:bg-[#d42b1e]/25'
                                : 'border-[#0a0a0b]/15 dark:border-white/15',
                            )}
                          />
                        </span>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-[10px] uppercase tracking-[0.14em] text-[#0a0a0b]/45 dark:text-white/45">
              Tint marks a booked day - hover for titles
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

const DEMO_RESOURCES: Resource[] = [
  { id: 'r1', label: 'Room A' },
  { id: 'r2', label: 'Room B' },
  { id: 'r3', label: 'Desk C' },
];

const DEMO_EVENTS: Event[] = [
  { id: 'n1', title: 'Standup', start: new Date(2026, 10, 2, 9, 0), end: new Date(2026, 10, 2, 9, 30), resourceId: 'r1' },
  { id: 'n2', title: 'Dossier review', start: new Date(2026, 10, 4, 11, 0), end: new Date(2026, 10, 4, 12, 0), resourceId: 'r1' },
  { id: 'n3', title: 'Filing deadline', start: new Date(2026, 10, 12, 9, 0), end: new Date(2026, 10, 12, 10, 0), resourceId: 'r1' },
  { id: 'n4', title: 'Client call', start: new Date(2026, 10, 3, 9, 30), end: new Date(2026, 10, 3, 10, 30), resourceId: 'r2' },
  { id: 'n5', title: 'Survey pass', start: new Date(2026, 10, 12, 14, 0), end: new Date(2026, 10, 12, 15, 0), resourceId: 'r2' },
  { id: 'n6', title: 'Focus block', start: new Date(2026, 10, 6, 10, 0), end: new Date(2026, 10, 6, 12, 0), resourceId: 'r3' },
  { id: 'n7', title: 'Archive run', start: new Date(2026, 10, 20, 13, 0), end: new Date(2026, 10, 20, 14, 0), resourceId: 'r3' },
];

export function ResourcesMonthViewDemo() {
  return (
    <div className="space-y-2">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/50 dark:text-white/50">
        Month lanes - 3 resources, 7 bookings
      </p>
      <ResourcesMonthView events={DEMO_EVENTS} resources={DEMO_RESOURCES} month={new Date(2026, 10, 1)} />
    </div>
  );
}
