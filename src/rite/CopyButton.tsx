import { useEffect, useRef, useState } from 'react';
import type { ButtonHTMLAttributes, MouseEvent } from 'react';
import { Check } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface CopyButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'children'> {
  value: string;
  timeout?: number;
}

async function copyText(value: string): Promise<boolean> {
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // fall through to textarea fallback
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = value;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    return true;
  } catch {
    return false;
  }
}

export function CopyButton({ value, timeout = 1200, className, disabled, onClick, ...rest }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, []);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || disabled) return;
    void copyText(value).then(() => {
      setCopied(true);
      if (timer.current !== null) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), timeout);
    });
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      aria-live="polite"
      className={cx(
        'inline-flex h-7 items-center gap-2 rounded-[2px] border border-dashed px-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em]',
        'bg-transparent outline-none transition-colors duration-150',
        'focus-visible:ring-1 focus-visible:ring-[#d42b1e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#e9e7e2] dark:focus-visible:ring-offset-[#08090b]',
        'disabled:cursor-not-allowed disabled:opacity-40',
        copied
          ? 'border-solid border-[#0a0a0b] text-[#0a0a0b] dark:border-white dark:text-white'
          : 'border-[#0a0a0b]/40 text-[#0a0a0b]/80 hover:border-solid hover:border-[#d42b1e] hover:text-[#d42b1e] dark:border-white/30 dark:text-white/70 dark:hover:border-[#d42b1e] dark:hover:text-[#ff6b5e]',
        className,
      )}
      {...rest}
    >
      {copied ? (
        <span className="inline-flex items-center gap-1">
          copied <Check size={12} strokeWidth={2} aria-hidden />
        </span>
      ) : (
        'copy'
      )}
    </button>
  );
}

export function CopyButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <code className="border border-[#0a0a0b]/15 px-2 py-1 font-mono text-[11px] dark:border-white/15">
        npm i vesper
      </code>
      <CopyButton value="npm i vesper" />
      <CopyButton value="https://vesper.design" timeout={2000} />
    </div>
  );
}
