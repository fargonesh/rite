import { useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { Bold, Check, Italic, Underline, X } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface ToolbarItem {
  label: string;
  icon?: ReactNode;
  onSelect?: () => void;
  active?: boolean;
}

export interface ToolbarGroup {
  id: string;
  items: ToolbarItem[];
}

export interface ToolbarProps {
  groups: ToolbarGroup[];
  label?: string;
  className?: string;
}

/**
 * Accessible toolbar — hairline-separated groups, roving tabindex,
 * active items rendered as ink slabs.
 */
export function Toolbar({ groups, label = 'Formatting toolbar', className }: ToolbarProps) {
  const keys = groups.flatMap((group) => group.items.map((_, index) => `${group.id}:${index}`));
  const [focusKey, setFocusKey] = useState<string | null>(null);
  const buttons = useRef(new Map<string, HTMLButtonElement>());
  const current = focusKey ?? keys[0] ?? null;

  const focusByKey = (key: string) => {
    setFocusKey(key);
    buttons.current.get(key)?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, key: string) => {
    const index = keys.indexOf(key);
    if (index < 0) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      focusByKey(keys[(index + 1) % keys.length]);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      focusByKey(keys[(index - 1 + keys.length) % keys.length]);
    } else if (event.key === 'Home') {
      event.preventDefault();
      focusByKey(keys[0]);
    } else if (event.key === 'End') {
      event.preventDefault();
      focusByKey(keys[keys.length - 1]);
    }
  };

  return (
    <div
      role="toolbar"
      aria-label={label}
      className={cx(
        'inline-flex items-stretch rounded-[2px] border border-[#0a0a0b]/20 dark:border-white/15',
        className,
      )}
    >
      {groups.map((group, groupIndex) => (
        <div
          key={group.id}
          role="group"
          aria-label={group.id}
          className={cx(
            'flex items-center gap-0.5 px-1 py-1',
            groupIndex > 0 && 'border-l border-[#0a0a0b]/15 dark:border-white/15',
          )}
        >
          {group.items.map((item, itemIndex) => {
            const key = `${group.id}:${itemIndex}`;
            return (
              <button
                key={key}
                ref={(element) => {
                  if (element) buttons.current.set(key, element);
                  else buttons.current.delete(key);
                }}
                type="button"
                title={item.label}
                aria-label={item.label}
                aria-pressed={item.active ?? undefined}
                tabIndex={current === key ? 0 : -1}
                onFocus={() => setFocusKey(key)}
                onKeyDown={(event) => handleKeyDown(event, key)}
                onClick={item.onSelect}
                className={cx(
                  'flex h-7 w-7 items-center justify-center rounded-[2px] outline-none transition-colors',
                  'focus-visible:ring-1 focus-visible:ring-[#d42b1e]',
                  item.active
                    ? 'bg-[#0a0a0b] text-[#e9e7e2] dark:bg-[#e9e7e2] dark:text-black'
                    : 'text-[#0a0a0b]/60 hover:bg-[#0a0a0b]/5 hover:text-[#0a0a0b] dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white',
                )}
              >
                {item.icon ?? (
                  <span className="font-mono text-[10px] uppercase">{item.label.slice(0, 1)}</span>
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function ToolbarDemo() {
  const [formats, setFormats] = useState<string[]>(['bold']);
  const toggle = (name: string) =>
    setFormats((prev) => (prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name]));
  const [log, setLog] = useState('idle');

  return (
    <div className="space-y-2">
      <Toolbar
        groups={[
          {
            id: 'style',
            items: [
              { label: 'Bold', icon: <Bold size={14} aria-hidden />, active: formats.includes('bold'), onSelect: () => toggle('bold') },
              { label: 'Italic', icon: <Italic size={14} aria-hidden />, active: formats.includes('italic'), onSelect: () => toggle('italic') },
              { label: 'Underline', icon: <Underline size={14} aria-hidden />, active: formats.includes('underline'), onSelect: () => toggle('underline') },
            ],
          },
          {
            id: 'review',
            items: [
              { label: 'Apply', icon: <Check size={14} aria-hidden />, onSelect: () => setLog('applied') },
              { label: 'Clear', icon: <X size={14} aria-hidden />, onSelect: () => { setFormats([]); setLog('cleared'); } },
            ],
          },
        ]}
      />
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0a0a0b]/50 dark:text-white/40">
        Active: {formats.length > 0 ? formats.join(' + ') : 'none'} — {log}
      </p>
    </div>
  );
}
