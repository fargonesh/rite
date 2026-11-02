import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface TourStep {
  selector?: string;
  title: string;
  body: string;
}

export interface TourProps {
  steps: TourStep[];
  step?: number;
  defaultStep?: number;
  onChange?: (step: number) => void;
  onDone?: () => void;
  opened?: boolean;
  className?: string;
}

export function Tour({
  steps,
  step,
  defaultStep = 0,
  onChange,
  onDone,
  opened = true,
  className,
}: TourProps) {
  const [inner, setInner] = useState(defaultStep);

  if (!opened || steps.length === 0) return null;

  const controlled = step !== undefined;
  const raw = controlled ? step : inner;
  const current = Math.min(Math.max(raw, 0), steps.length - 1);
  const active = steps[current];
  const last = current === steps.length - 1;

  const go = (next: number): void => {
    const clamped = Math.min(Math.max(next, 0), steps.length - 1);
    if (!controlled) setInner(clamped);
    onChange?.(clamped);
  };

  return (
    <div
      role="dialog"
      aria-label={`Tour: ${active.title}`}
      className={cx(
        'fixed bottom-4 left-4 z-50 w-80 max-w-[calc(100vw-2rem)] rounded-[2px] border border-[#0a0a0b]/20 bg-[#e9e7e2] shadow-[0_8px_40px_rgba(0,0,0,0.35)] dark:border-white/15 dark:bg-[#0e0f11]',
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-dashed border-[#0a0a0b]/15 px-4 py-2.5 dark:border-white/10">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] opacity-60">
          Field guide
        </p>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-60">
            step {current + 1} / {steps.length}
          </span>
          <button
            type="button"
            onClick={onDone}
            aria-label="Skip tour"
            className="rounded-[2px] p-0.5 opacity-60 outline-none transition-opacity hover:opacity-100 hover:text-[#d42b1e] focus-visible:ring-1 focus-visible:ring-[#d42b1e]"
          >
            <X size={12} aria-hidden />
          </button>
        </div>
      </div>
      <div className="px-4 py-3">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em]">
          {active.title}
        </p>
        <p className="mt-1 text-[13px] leading-6 text-[#0a0a0b]/85 dark:text-white/85">
          {active.body}
        </p>
      </div>
      <div className="flex items-center justify-between px-4 pb-3">
        <button
          type="button"
          onClick={() => go(current - 1)}
          disabled={current === 0}
          className="inline-flex h-8 items-center gap-1 rounded-[2px] border border-[#0a0a0b]/25 px-3 font-mono text-[11px] uppercase tracking-[0.18em] outline-none transition-colors hover:bg-[#0a0a0b]/5 focus-visible:ring-1 focus-visible:ring-[#d42b1e] disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/25 dark:hover:bg-white/5"
        >
          <ChevronLeft size={13} aria-hidden />
          Back
        </button>
        {last ? (
          <button
            type="button"
            onClick={onDone}
            className="h-8 rounded-[2px] bg-[#0a0a0b] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#e9e7e2] outline-none transition-colors hover:bg-[#0a0a0b]/85 focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:bg-[#e9e7e2] dark:text-black dark:hover:bg-white"
          >
            Done
          </button>
        ) : (
          <button
            type="button"
            onClick={() => go(current + 1)}
            className="inline-flex h-8 items-center gap-1 rounded-[2px] bg-[#0a0a0b] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#e9e7e2] outline-none transition-colors hover:bg-[#0a0a0b]/85 focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:bg-[#e9e7e2] dark:text-black dark:hover:bg-white"
          >
            Next
            <ChevronRight size={13} aria-hidden />
          </button>
        )}
      </div>
    </div>
  );
}

const DEMO_STEPS: TourStep[] = [
  { selector: '#ledger', title: 'The ledger', body: 'Every exhibit is entered here before it may move. No entry, no passage.' },
  { selector: '#seal', title: 'The seal', body: 'Stamp a dossier only when the ink has dried on all three copies.' },
  { selector: '#vault', title: 'The vault', body: 'Sealed files rest below. Bring a lantern; the east wing is unlit.' },
];

export function TourDemo() {
  const [opened, setOpened] = useState(true);
  const [finished, setFinished] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setFinished(false);
            setOpened(true);
          }}
          className="h-8 rounded-[2px] border border-[#0a0a0b]/25 px-4 font-mono text-[11px] uppercase tracking-[0.18em] dark:border-white/25"
        >
          Restart tour
        </button>
        {finished && (
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] opacity-60">
            Tour complete — three stops visited.
          </p>
        )}
      </div>
      <Tour
        steps={DEMO_STEPS}
        opened={opened}
        onDone={() => {
          setOpened(false);
          setFinished(true);
        }}
      />
    </div>
  );
}
