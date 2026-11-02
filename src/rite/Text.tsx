import type { HTMLAttributes } from 'react';
import { cx } from '../lib/cx.ts';

export type TextSize = 'xs' | 'sm' | 'md' | 'lg';

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: TextSize;
  dimmed?: boolean;
  truncate?: boolean;
  italic?: boolean;
}

const sizeStyles: Record<TextSize, string> = {
  xs: 'text-xs leading-5',
  sm: 'text-sm leading-6',
  md: 'text-[15px] leading-7',
  lg: 'text-lg leading-8',
};

export function Text({ size = 'md', dimmed, truncate, italic, className, children, ...rest }: TextProps) {
  return (
    <p
      className={cx(
        sizeStyles[size],
        italic ? 'font-omen italic' : 'font-sans',
        dimmed ? 'text-[#0a0a0b]/60 dark:text-[#e9e7e2]/55' : 'text-[#0a0a0b] dark:text-[#e9e7e2]',
        truncate && 'truncate',
        className,
      )}
      {...rest}
    >
      {children}
    </p>
  );
}

export function TextDemo() {
  return (
    <div className="flex max-w-md flex-col gap-3">
      <Text size="lg">Body workhorse at large — dense field notes from the survey table.</Text>
      <Text size="md">Medium carries paragraphs, reports, and marginalia without fatigue.</Text>
      <Text size="sm" dimmed>
        Small and dimmed for secondary copy, captions, and asides.
      </Text>
      <Text size="md" italic>
        The occult accent — EB Garamond italic for whispered quotations.
      </Text>
      <Text size="sm" truncate>
        Truncated line: this sentence runs far longer than its container will ever permit it to show.
      </Text>
    </div>
  );
}
