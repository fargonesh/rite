import type { ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export function Typography({ children, className }: TypographyProps) {
  return (
    <div
      className={cx(
        'font-sans text-[15px] leading-7 tracking-tight text-[#0a0a0b] dark:text-[#e9e7e2]',
        '[&_p]:mb-4 [&_p]:leading-7',
        '[&_h2]:mb-2 [&_h2]:mt-6 [&_h2]:font-mono [&_h2]:text-xs [&_h2]:font-medium [&_h2]:uppercase [&_h2]:tracking-widest',
        '[&_h3]:mb-1 [&_h3]:mt-5 [&_h3]:font-mono [&_h3]:text-xs [&_h3]:uppercase [&_h3]:tracking-widest [&_h3]:text-[#0a0a0b]/70 [&_h3]:dark:text-[#e9e7e2]/70',
        '[&_a]:text-[#d42b1e] [&_a]:underline [&_a]:decoration-[#d42b1e]/50 [&_a]:underline-offset-2 hover:[&_a]:decoration-[#d42b1e]',
        '[&_code]:rounded-none [&_code]:bg-[#0a0a0b]/8 [&_code]:px-1 [&_code]:font-mono [&_code]:text-[13px] [&_code]:dark:bg-[#e9e7e2]/12',
        '[&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:marker:text-[#d42b1e]',
        '[&_li]:mb-1',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function TypographyDemo() {
  return (
    <Typography>
      <h2>Survey report, entry 12</h2>
      <p>
        The team crossed the lower field at dusk and logged each marker in sequence. See the{' '}
        <a href="#field-manual">field manual</a> for the full protocol and naming scheme.
      </p>
      <h3>Findings</h3>
      <ul>
        <li>
          North gate sealed with <code>seal:0x1e</code> and wax.
        </li>
        <li>Second marker found ajar, hinge rusted through.</li>
      </ul>
      <p>Close the ledger each night. The ink remembers what the hand forgets.</p>
    </Typography>
  );
}
