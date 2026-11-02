import { cx } from '../lib/cx.ts';

export interface SpaceProps {
  className?: string;
  h?: 'xs' | 'sm' | 'md' | 'lg';
  w?: 'xs' | 'sm' | 'md' | 'lg';
}

const hMap = {
  xs: 'h-1',
  sm: 'h-2',
  md: 'h-4',
  lg: 'h-8',
} as const;

const wMap = {
  xs: 'w-1',
  sm: 'w-2',
  md: 'w-4',
  lg: 'w-8',
} as const;

export function Space({ className, h = 'md', w }: SpaceProps) {
  return <div aria-hidden className={cx(hMap[h], w && wMap[w], className)} />;
}

const cell =
  'rounded-[2px] border border-dashed border-black/25 px-3 py-2 text-xs dark:border-white/25';

export function SpaceDemo() {
  return (
    <div>
      <div className={cell}>Above</div>
      <Space h="md" />
      <div className={cell}>Below (h=&quot;md&quot; = 16px gap)</div>
    </div>
  );
}
