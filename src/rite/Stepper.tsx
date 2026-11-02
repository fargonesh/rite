import { useState } from 'react';
import { Check } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface StepperStep {
  label: string;
  description?: string;
}

export interface StepperProps {
  steps: StepperStep[];
  active: number;
  onStepClick?: (index: number) => void;
  className?: string;
}

export function Stepper({ steps, active, onStepClick, className }: StepperProps) {
  return (
    <nav aria-label="Progress" className={className}>
      <ol className="flex items-start">
        {steps.map((step, i) => {
          const completed = i < active;
          const current = i === active;
          const clickable = typeof onStepClick === 'function';
          const box = (
            <>
              <span
                aria-hidden
                className={cx(
                  'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-[2px] border font-mono text-[11px] tracking-[0.12em]',
                  completed && 'border-[#0a0a0b] bg-[#0a0a0b] text-[#e9e7e2] dark:border-[#e9e7e2] dark:bg-[#e9e7e2] dark:text-black',
                  current && 'border-[#d42b1e] bg-transparent text-[#d42b1e] dark:text-[#ff6b5e]',
                  !completed && !current && 'border-[#0a0a0b]/25 text-[#0a0a0b]/60 dark:border-white/25 dark:text-white/60',
                )}
              >
                {completed ? <Check size={14} strokeWidth={2} aria-hidden /> : String(i + 1).padStart(2, '0')}
              </span>
              <span className="mt-2 flex flex-col gap-1">
                <span
                  className={cx(
                    'font-mono text-[10px] uppercase tracking-[0.18em]',
                    current ? 'text-[#0a0a0b] dark:text-[#e9e7e2]' : 'text-[#0a0a0b]/60 dark:text-white/60',
                  )}
                >
                  {step.label}
                </span>
                {step.description && (
                  <span className="max-w-[16ch] text-xs leading-snug text-[#0a0a0b]/60 dark:text-white/50">
                    {step.description}
                  </span>
                )}
              </span>
            </>
          );
          return (
            <li key={step.label} className="flex min-w-0 flex-1 items-stretch last:flex-none">
              <div
                className={cx(
                  'flex flex-col border-t-2 pt-3 pr-4',
                  current ? 'border-[#d42b1e]' : 'border-[#0a0a0b]/15 dark:border-white/15',
                  completed && 'border-[#0a0a0b]/40 dark:border-white/40',
                )}
              >
                {clickable ? (
                  <button
                    type="button"
                    onClick={() => onStepClick?.(i)}
                    aria-current={current ? 'step' : undefined}
                    aria-label={`Step ${i + 1}: ${step.label}`}
                    className="flex flex-col items-start gap-1 rounded-[2px] text-left outline-none focus-visible:ring-1 focus-visible:ring-[#d42b1e]"
                  >
                    {box}
                  </button>
                ) : (
                  <div aria-current={current ? 'step' : undefined} className="flex flex-col items-start gap-1">
                    {box}
                  </div>
                )}
              </div>
              {i < steps.length - 1 && <span aria-hidden className="hidden" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function StepperDemo() {
  const [active, setActive] = useState(1);
  return (
    <Stepper
      active={active}
      onStepClick={setActive}
      steps={[
        { label: 'Filed', description: 'Dossier opened' },
        { label: 'Surveyed', description: 'Hairlines checked' },
        { label: 'Sealed', description: 'Witnessed shut' },
      ]}
    />
  );
}
