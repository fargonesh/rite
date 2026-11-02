import type { HTMLAttributes } from 'react';
import { Square } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface CodeProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  block?: boolean;
  language?: string;
}

export function Code({ block = false, language, className, children, ...rest }: CodeProps) {
  if (!block) {
    return (
      <code
        className={cx(
          'inline rounded-[2px] border border-[#0a0a0b]/15 bg-[#0a0a0b]/[0.04] px-1.5 py-0.5 font-mono text-[12px] leading-normal text-[#0a0a0b]',
          'dark:border-white/15 dark:bg-white/[0.06] dark:text-[#e9e7e2]',
          className,
        )}
        {...rest}
      >
        {children}
      </code>
    );
  }

  return (
    <div
      className={cx(
        'overflow-hidden rounded-[2px] border border-[#0a0a0b]/20 bg-black',
        'dark:border-white/15',
        className,
      )}
    >
      {language && (
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">{language}</span>
          <span aria-hidden className="inline-flex items-center text-[#d42b1e]">
            <Square size={8} strokeWidth={2} fill="currentColor" />
          </span>
        </div>
      )}
      <pre className="overflow-x-auto px-3 py-3">
        <code className="font-mono text-[12px] leading-relaxed text-[#e9e7e2]" {...rest}>
          {children}
        </code>
      </pre>
    </div>
  );
}

export function CodeDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <p className="font-mono text-[12px] text-[#0a0a0b]/70 dark:text-white/60">
        Run <Code>vesper build</Code> to ship the dossier.
      </p>
      <Code block language="tsx">{`const sigil = "VESPER";\nexport default sigil;`}</Code>
    </div>
  );
}
