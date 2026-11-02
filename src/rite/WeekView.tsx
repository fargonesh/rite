import { cx } from '../lib/cx.ts';

export interface WeekViewEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

export interface WeekViewProps {
  events: WeekViewEvent[];
  date?: Date;
  className?: string;
}

const DOW = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

function dateKey(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function WeekView({ events, date, className }: WeekViewProps) {
  const anchor = date ?? new Date();
  const base = new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate());
  const monday = new Date(base);
  monday.setDate(base.getDate() - ((base.getDay() + 6) % 7));
  const days = Array.from({ length: 7 }, (_, i) => new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i));
  const today = new Date();

  return (
    <div className={cx('overflow-hidden rounded-[2px] border border-[#0a0a0b]/15 bg-white dark:border-white/10 dark:bg-[#0d0e11]', className)}>
      <div className="grid grid-cols-7 divide-x divide-[#0a0a0b]/10 border-b border-[#0a0a0b]/10 dark:divide-white/10 dark:border-white/10">
        {days.map((d, i) => {
          const isToday = sameDay(d, today);
          return (
            <div key={dateKey(d)} className="px-1 py-2 text-center">
              <p className="font-mono text-[10px] tracking-[0.16em] text-[#0a0a0b]/50 dark:text-white/50">{DOW[i]}</p>
              <p
                className={cx(
                  'mx-auto mt-1 flex h-6 w-6 items-center justify-center rounded-[2px] font-mono text-[11px]',
                  isToday ? 'bg-[#d42b1e] text-white' : 'text-[#0a0a0b] dark:text-[#e9e7e2]',
                )}
              >
                {d.getDate()}
              </p>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-7 divide-x divide-[#0a0a0b]/10 dark:divide-white/10">
        {days.map((d) => {
          const dayEvents = events.filter((e) => sameDay(e.start, d)).sort((a, b) => a.start.getTime() - b.start.getTime());
          return (
            <div key={dateKey(d)} className="min-h-28 space-y-1 p-1">
              {dayEvents.slice(0, 3).map((e) => (
                <p
                  key={e.id}
                  title={e.title}
                  className="truncate rounded-[2px] border border-[#0a0a0b]/15 px-1 py-0.5 font-mono text-[10px] tracking-[0.08em] text-[#0a0a0b] dark:border-white/15 dark:text-[#e9e7e2]"
                >
                  {e.title}
                </p>
              ))}
              {dayEvents.length > 3 && (
                <p className="px-1 font-mono text-[10px] tracking-[0.12em] text-[#0a0a0b]/50 dark:text-white/50">
                  +{dayEvents.length - 3}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function WeekViewDemo() {
  const now = new Date();
  const base = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const monday = new Date(base);
  monday.setDate(base.getDate() - ((base.getDay() + 6) % 7));
  const at = (dayOffset: number, h: number) => new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + dayOffset, h);
  return (
    <div className="rounded-[2px] border border-[#0a0a0b]/15 p-3 dark:border-white/10">
      <WeekView
        events={[
          { id: 'w1', title: 'Standup', start: at(0, 9), end: at(0, 10) },
          { id: 'w2', title: 'Review', start: at(2, 13), end: at(2, 14) },
          { id: 'w3', title: 'Retro', start: at(2, 15), end: at(2, 16) },
          { id: 'w4', title: 'Demo', start: at(2, 16), end: at(2, 17) },
          { id: 'w5', title: 'Planning', start: at(2, 17), end: at(2, 18) },
          { id: 'w6', title: '1:1', start: at(4, 11), end: at(4, 12) },
        ]}
      />
    </div>
  );
}
