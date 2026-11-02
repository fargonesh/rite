import type { ReactNode } from 'react';
import { cx } from '../lib/cx.ts';

export interface AspectRatioProps {
  children: ReactNode;
  className?: string;
  ratio?: '16/9' | '4/3' | '1/1';
}

const ratioMap = {
  '16/9': 'aspect-video',
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
} as const;

export function AspectRatio({ children, className, ratio = '16/9' }: AspectRatioProps) {
  return <div className={cx('w-full', ratioMap[ratio], className)}>{children}</div>;
}

function RatioBlock({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-[2px] border border-dashed border-black/25 bg-gradient-to-br from-black/[0.06] to-black/[0.02] dark:border-white/25 dark:from-white/10 dark:to-white/[0.03]">
      <span className="font-mono text-xs">{label}</span>
    </div>
  );
}

export function AspectRatioDemo() {
  return (
    <div className="flex flex-col gap-2">
      <AspectRatio ratio="16/9">
        <RatioBlock label="16/9" />
      </AspectRatio>
      <AspectRatio ratio="4/3">
        <RatioBlock label="4/3" />
      </AspectRatio>
      <AspectRatio ratio="1/1">
        <RatioBlock label="1/1" />
      </AspectRatio>
    </div>
  );
}
