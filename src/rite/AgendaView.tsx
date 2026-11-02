import { ListOrdered } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface AgendaViewEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

export interface AgendaViewProps {
  events: AgendaViewEvent[];
  className?: string;
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

function fmtTime(d: Date): string {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function dateKey(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function AgendaView({ events, className }: AgendaViewProps) {
  const today = new Date();
  const sorted = [...events].sort((a, b) => a.start.getTime() - b.start.getTime());
  const groups = new Map<string, AgendaViewEvent[]>();
  for (const e of sorted) {
    const k = dateKey(e.start);
    const list = groups.get(k);
    if (list) list.push(e);
    else groups.set(k, [e]);
  }

  return (
    <div className={cx('overflow-hidden rounded-[2px] border border-[#0a0a0b]/15 bg-white dark:border-white/10 dark:bg-[#0d0e11]', className)}>
      <div className="flex items-center gap-2 border-b border-[#0a0a0b]/10 px-3 py-2 dark:border-white/10">
        <ListOrdered className="h-3.5 w-3.5 text-[#0a0a0b]/50 dark:text-white/50" aria-hidden />
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0a0a0b]/60 dark:text-white/60">
          Agenda / {sorted.length} events
        </p>
      </div>
      {sorted.length === 0 && (
        <p className="px-3 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[#0a0a0b]/50 dark:text-white/50">
          Nothing scheduled
        </p>
      )}
      {[...groups.entries()].map(([key, list]) => {
        const isToday = sameDay(list[0].start, today);
        return (
          <section key={key} className="border-b border-[#0a0a0b]/10 last:border-b-0 dark:border-white/10">
            <header className="flex items-center gap-2 px-3 pt-3 pb-1">
              <span
                aria-hidden
                className={cx('h-1.5 w-1.5 rounded-full', isToday ? 'bg-[#d42b1e]' : 'bg-[#0a0a0b]/30 dark:bg-white/30')}
              />
              <h3 className={cx('font-mono text-[10px] tracking-[0.16em]', isToday ? 'text-[#d42b1e] dark:text-[#ff6b5e]' : 'text-[#0a0a0b]/60 dark:text-white/60')}>
                {key}
              </h3>
            </header>
            <ol>
              {list.map((e) => (
                <li key={e.id} className="flex items-baseline gap-3 px-3 py-1.5 pl-6">
                  <span className="w-11 shrink-0 font-mono text-[10px] tracking-[0.12em] text-[#0a0a0b]/60 dark:text-white/60">
                    {fmtTime(e.start)}
                  </span>
                  <span className="truncate text-sm text-[#0a0a0b] dark:text-[#e9e7e2]">{e.title}</span>
                  <span className="ml-auto shrink-0 font-mono text-[10px] text-[#0a0a0b]/40 dark:text-white/40">
                    {fmtTime(e.end)}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        );
      })}
    </div>
  );
}

export function AgendaViewDemo() {
  const now = new Date();
  const at = (dayOffset: number, h: number, m = 0) =>
    new Date(now.getFullYear(), now.getMonth(), now.getDate() + dayOffset, h, m);
  return (
    <div className="rounded-[2px] border border-[#0a0a0b]/15 p-3 dark:border-white/10">
      <AgendaView
        events={[
          { id: 'a1', title: 'Standup', start: at(0, 9), end: at(0, 9, 30) },
          { id: 'a2', title: 'Design review', start: at(0, 13), end: at(0, 14) },
          { id: 'a3', title: 'Planning', start: at(1, 10), end: at(1, 11) },
          { id: 'a4', title: 'Retro', start: at(2, 15), end: at(2, 16) },
        ]}
      />
    </div>
  );
}
