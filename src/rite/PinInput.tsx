import { useId, useRef, useState } from 'react';
import { cx } from '../lib/cx.ts';

export interface PinInputProps {
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  type?: 'text';
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

export function PinInput({
  length = 4,
  value,
  defaultValue = '',
  onChange,
  disabled = false,
  className,
  ariaLabel = 'Pin code',
}: PinInputProps) {
  const autoId = useId();
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const controlled = value !== undefined;
  const current = (controlled ? value : uncontrolled) ?? '';
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const chars = Array.from({ length }, (_, i) => current[i] ?? '');

  function commit(next: string) {
    const sliced = next.slice(0, length);
    if (!controlled) setUncontrolled(sliced);
    onChange?.(sliced);
  }

  function focusAt(i: number) {
    inputsRef.current[i]?.focus();
    inputsRef.current[i]?.select();
  }

  return (
    <div className={cx('flex gap-2', className)} role="group" aria-label={ariaLabel}>
      {chars.map((ch, i) => (
        <input
          key={`${autoId}-${i}`}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          value={ch}
          disabled={disabled}
          inputMode="text"
          autoComplete="one-time-code"
          aria-label={`${ariaLabel} digit ${i + 1}`}
          maxLength={1}
          onChange={(e) => {
            const raw = e.target.value;
            const c = raw[raw.length - 1] ?? '';
            if (!c) {
              const next = current.split('');
              next[i] = '';
              commit(next.join('').slice(0, i));
              return;
            }
            const arr = current.split('');
            arr[i] = c;
            commit(arr.join(''));
            if (i < length - 1) focusAt(i + 1);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Backspace') {
              if (current[i]) {
                e.preventDefault();
                const arr = current.split('');
                arr[i] = '';
                commit(arr.join(''));
              } else if (i > 0) {
                e.preventDefault();
                focusAt(i - 1);
              }
            } else if (e.key === 'ArrowLeft' && i > 0) {
              e.preventDefault();
              focusAt(i - 1);
            } else if (e.key === 'ArrowRight' && i < length - 1) {
              e.preventDefault();
              focusAt(i + 1);
            }
          }}
          onPaste={(e) => {
            e.preventDefault();
            const text = e.clipboardData.getData('text').slice(0, length);
            if (text) {
              commit(text);
              focusAt(Math.min(text.length, length - 1));
            }
          }}
          className={cx(
            'h-10 w-10 rounded-[2px] border border-[#0a0a0b]/30 bg-transparent text-center font-mono text-[15px] outline-none transition-colors dark:border-white/20',
            'focus:border-[#0a0a0b] focus:ring-1 focus:ring-[#d42b1e] dark:focus:border-white/60',
            disabled && 'cursor-not-allowed opacity-40',
          )}
        />
      ))}
    </div>
  );
}

export function PinInputDemo() {
  const [val, setVal] = useState('1');
  return (
    <div className="space-y-4">
      <PinInput value={val} onChange={setVal} ariaLabel="Rite code" />
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#0a0a0b]/50 dark:text-white/40">
        Code — {val || '∅'}
      </p>
      <PinInput length={6} defaultValue="" ariaLabel="Long code" />
    </div>
  );
}
