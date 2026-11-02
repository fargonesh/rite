import { cx } from '../lib/cx.ts';

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: AvatarSize;
  variant?: 'square';
  className?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-[10px]',
  md: 'h-10 w-10 text-xs',
  lg: 'h-12 w-12 text-sm',
};

function initialsOf(name?: string): string {
  if (!name) return '—';
  const parts = name.trim().split(/\s+/);
  const letters = parts.map((p) => p[0]).filter(Boolean).slice(0, 2);
  return letters.join('').toUpperCase() || '—';
}

export function Avatar({ src, name, size = 'md', variant = 'square', className }: AvatarProps) {
  void variant;
  const fallback = initialsOf(name);
  return (
    <span
      role={src ? undefined : 'img'}
      aria-label={src ? undefined : name ?? 'Avatar'}
      title={name}
      className={cx(
        'inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-[2px] border border-[#0a0a0b]/20 font-mono font-medium tracking-[0.12em]',
        'bg-[#0a0a0b] text-[#e9e7e2] dark:border-white/15 dark:bg-[#e9e7e2] dark:text-black',
        sizeStyles[size],
        className,
      )}
    >
      {src ? (
        <img src={src} alt={name ?? 'Avatar'} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <span aria-hidden>{fallback}</span>
      )}
    </span>
  );
}

export function AvatarDemo() {
  return (
    <div className="flex items-end gap-4">
      <span className="flex flex-col items-center gap-2">
        <Avatar size="sm" name="Ada Lovelace" />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/50 dark:text-white/50">SM</span>
      </span>
      <span className="flex flex-col items-center gap-2">
        <Avatar size="md" name="Ada Lovelace" />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/50 dark:text-white/50">MD</span>
      </span>
      <span className="flex flex-col items-center gap-2">
        <Avatar size="lg" name="Edgar Degas" src="https://i.pravatar.cc/96?img=12" />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/50 dark:text-white/50">IMG</span>
      </span>
      <span className="flex flex-col items-center gap-2">
        <Avatar size="lg" name="Vesper Hale" />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/50 dark:text-white/50">FALLBACK</span>
      </span>
    </div>
  );
}
