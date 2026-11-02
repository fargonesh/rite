import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface YearPickerProps {
  value?: number | null;
  defaultValue?: number | null;
  onChange?: (year: number) => void;
  decade?: number;
  defaultDecade?: number;
  onDecadeChange?: (decade: number) => void;
  className?: string;
}

function baseOf(decade: number): number {
  return Math.floor(decade / 10) * 10;
}

function gridYears(decade: number): number[] {
  const b = baseOf(decade);
  return Array.from({ length: 12 }, (_, i) => b - 1 + i);
}

export function YearPicker({
  value,
  defaultValue = null,
  onChange,
  decade,
  defaultDecade,
  onDecadeChange,
  className,
}: YearPickerProps) {
  const thisYear = new Date().getFullYear();
  const [innerVal, setInnerVal] = useState<number | null>(defaultValue);
  const [innerDec, setInnerDec] = useState<number>(defaultDecade ?? defaultValue ?? thisYear);

  const controlledVal = value !== undefined;
  const controlledDec = decade !== undefined;
  const selected = controlledVal ? (value as number | null) : innerVal;
  const viewDec = controlledDec ? (decade as number) : innerDec;
  const years = gridYears(viewDec);
  const b = baseOf(viewDec);

  function setDec(d: number) {
    if (!controlledDec) setInnerDec(d);
    onDecadeChange?.(d);
  }

  function pick(y: number) {
    if (!controlledVal) setInnerVal(y);
    onChange?.(y);
  }

  const navBtn =
    'flex h-7 w-7 items-center justify-center rounded-[2px] border border-transparent font-mono outline-none transition-colors hover:border-[#0a0a0b]/30 hover:text-[#d42b1e] focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:hover:border-white/30 dark:hover:text-[#ff6b5e]';

  return (
    <div className={cx('w-full rounded-[2px] border border-[#0a0a0b]/20 bg-transparent p-3 dark:border-white/15', className)}>
      <div className="mb-2 flex items-center justify-between">
        <button type="button" aria-label="Previous decade" onClick={() => setDec(viewDec - 10)} className={navBtn}>
          <ChevronLeft size={14} aria-hidden />
        </button>
        <p aria-live="polite" className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-[#0a0a0b]/80 dark:text-white/70">
          {years[0]} — {years[years.length - 1]}
        </p>
        <button type="button" aria-label="Next decade" onClick={() => setDec(viewDec + 10)} className={navBtn}>
          <ChevronRight size={14} aria-hidden />
        </button>
      </div>
      <div role="grid" aria-label={`Years ${b}s`} className="grid grid-cols-3 gap-px">
        {years.map((y) => {
          const isSelected = selected === y;
          const isNow = y === thisYear;
          const fringe = y < b || y > b + 9;
          return (
            <button
              key={y}
              type="button"
              role="gridcell"
              aria-label={`Year ${y}`}
              aria-pressed={isSelected}
              aria-current={isNow ? 'date' : undefined}
              onClick={() => pick(y)}
              className={cx(
                'relative flex h-9 items-center justify-center rounded-[2px] font-mono text-[12px] tabular-nums outline-none transition-colors focus-visible:ring-1 focus-visible:ring-[#d42b1e]',
                isSelected
                  ? 'bg-[#0a0a0b] text-[#e9e7e2] dark:bg-[#e9e7e2] dark:text-black'
                  : 'text-[#0a0a0b]/80 hover:bg-[#0a0a0b]/5 hover:text-[#0a0a0b] dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white',
                !isSelected && fringe && 'opacity-45',
              )}
            >
              {y}
              {isNow && <span aria-hidden className="absolute bottom-1 h-1 w-1 rounded-full bg-[#d42b1e]" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function YearPickerDemo() {
  const [val, setVal] = useState<number | null>(2026);
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <YearPicker value={val} onChange={setVal} />
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#0a0a0b]/60 dark:text-white/50">
        picked — {val ?? 'cleared'}
      </p>
      <YearPicker defaultDecade={1995} />
    </div>
  );
}
