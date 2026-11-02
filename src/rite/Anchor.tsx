import type { AnchorHTMLAttributes } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  external?: boolean;
}

export function Anchor({ href, external, className, children, ...rest }: AnchorProps) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cx(
        'font-sans underline decoration-[#0a0a0b]/30 underline-offset-4 transition-colors hover:text-[#d42b1e] hover:decoration-[#d42b1e] dark:decoration-white/30 dark:hover:text-[#ff6b5e] dark:hover:decoration-[#ff6b5e]',
        className,
      )}
      {...rest}
    >
      {children}
      {external && (
        <span aria-hidden className="ml-1 inline-flex items-center leading-none">
          <ArrowUpRight size={12} strokeWidth={2} />
        </span>
      )}
    </a>
  );
}

export function AnchorDemo() {
  return (
    <p className="max-w-md font-sans text-[15px] leading-7 text-[#0a0a0b] dark:text-[#e9e7e2]">
      Consult the <Anchor href="#">field manual</Anchor> before midnight, or cross-reference the{' '}
      <Anchor href="https://example.com" external>
        outer archive
      </Anchor>
      .
    </p>
  );
}
