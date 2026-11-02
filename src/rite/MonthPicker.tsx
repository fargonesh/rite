import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface MonthValue {
  year: number;
  month: number;
}

export interface MonthPickerProps {
  value?: MonthValue | null;
  defaultValue?: MonthValue | null;
  onChange?: (value: MonthValue) => void;
  year?: number;
  defaultYear?: number;
  onYearChange?: (year: number) => void;
  className?: string;
}

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export function MonthPicker({
  value,
  defaultValue = null,
  onChange,
  year,
  defaultYear,
  onYearChange,
  className,
}: MonthPickerProps) {
  const now = new Date();
  const thisYear = now.getFullYear();
  const thisMonth = now.getMonth();

  const [innerVal, setInnerVal] = useState<MonthValue | null>(defaultValue);
  const [innerYear, setInnerYear] = useState<number>(defaultYear ?? defaultValue?.year ?? new Date().getFullYear());

  const controlledVal = value !== undefined;
  const controlledYear = year !== undefined;
  const selected = controlledVal ? (value as MonthValue | null) : innerVal;
  const viewYear = controlledYear ? (year as number) : innerYear;

  function setYear(y: number) {
    if (!controlledYear) setInnerYear(y);
    onYearChange?.(y);
  }

  function pick(month: number) {
    const next: MonthValue = { year: viewYear, month };
    if (!controlledVal) setInnerVal(next);
    onChange?.(next);
  }

  const navBtn =
    'flex h-7 w-7 items-center justify-center rounded-[2px] border border-transparent font-mono outline-none transition-colors hover:border-[#0a0a0b]/30 hover:text-[#d42b1e] focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:hover:border-white/30 dark:hover:text-[#ff6b5e]';

  return (
    <div className={cx('w-full rounded-[2px] border border-[#0a0a0b]/20 bg-transparent p-3 dark:border-white/15', className)}>
      <div className="mb-2 flex items-center justify-between">
        <button type="button" aria-label="Previous year" onClick={() => setYear(viewYear - 1)} className={navBtn}>
          <ChevronLeft size={14} aria-hidden />
        </button>
        <p aria-live="polite" className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-[#0a0a0b]/80 dark:text-white/70">
          {viewYear}
        </p>
        <button type="button" aria-label="Next year" onClick={() => setYear(viewYear + 1)} className={navBtn}>
          <ChevronRight size={14} aria-hidden />
        </button>
      </div>
      <div role="grid" aria-label={`Months of ${viewYear}`} className="grid grid-cols-3 gap-px">
        {MONTHS.map((m, i) => {
          const isSelected = selected?.year === viewYear && selected?.month === i;
          const isNow = viewYear === thisYear && i === thisMonth;
          return (
            <button
              key={m}
              type="button"
              role="gridcell"
              aria-label={`${m} ${viewYear}`}
              aria-pressed={isSelected}
              aria-current={isNow ? 'date' : undefined}
              onClick={() => pick(i)}
              className={cx(
                'relative flex h-9 items-center justify-center rounded-[2px] font-mono text-[12px] uppercase tracking-[0.1em] outline-none transition-colors focus-visible:ring-1 focus-visible:ring-[#d42b1e]',
                isSelected
                  ? 'bg-[#0a0a0b] text-[#e9e7e2] dark:bg-[#e9e7e2] dark:text-black'
                  : 'text-[#0a0a0b]/80 hover:bg-[#0a0a0b]/5 hover:text-[#0a0a0b] dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white',
              )}
            >
              {m}
              {isNow && <span aria-hidden className="absolute bottom-1 h-1 w-1 rounded-full bg-[#d42b1e]" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function MonthPickerDemo() {
  const [val, setVal] = useState<MonthValue | null>({ year: 2026, month: 2 });
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <MonthPicker value={val} onChange={setVal} />
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#0a0a0b]/60 dark:text-white/50">
        picked — {val ? `${val.year}-${String(val.month + 1).padStart(2, '0')}` : 'cleared'}
      </p>
      <MonthPicker defaultYear={2024} />
    </div>
  );
}
