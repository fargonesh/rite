import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface SpotlightAction {
  label: string;
  hint?: string;
  onSelect: () => void;
}

export interface SpotlightProps {
  opened: boolean;
  onClose: () => void;
  actions: SpotlightAction[];
  placeholder?: string;
  className?: string;
}

export function Spotlight({ opened, onClose, actions, placeholder = 'Type a command…', className }: SpotlightProps) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (opened) {
      setQuery('');
      setActive(0);
    }
  }, [opened]);

  useEffect(() => {
    if (!opened) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [opened, onClose]);

  if (!opened) return null;

  const q = query.toLowerCase();
  const filtered = actions.filter((a) => a.label.toLowerCase().includes(q));
  const clamped = filtered.length === 0 ? 0 : Math.min(active, filtered.length - 1);

  return (
    <div className="fixed inset-0 z-50 flex justify-center px-4 pt-24" role="presentation">
      <button aria-label="Close command palette" onClick={onClose} className="absolute inset-0 cursor-default bg-black/60" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className={cx(
          'relative w-full max-w-md self-start overflow-hidden rounded-[2px] border border-[#0a0a0b]/20 bg-[#e9e7e2] shadow-[0_8px_40px_rgba(0,0,0,0.35)] dark:border-white/15 dark:bg-[#0e0f11]',
          className,
        )}
      >
        <div className="flex items-center gap-2 border-b border-dashed border-[#0a0a0b]/15 px-3 dark:border-white/10">
          <Search size={14} aria-hidden className="shrink-0 text-[#0a0a0b]/40 dark:text-white/40" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActive((a) => (filtered.length === 0 ? 0 : (a + 1) % filtered.length));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActive((a) => (filtered.length === 0 ? 0 : (a - 1 + filtered.length) % filtered.length));
              } else if (e.key === 'Enter') {
                e.preventDefault();
                filtered[clamped]?.onSelect();
              } else if (e.key === 'Escape') {
                onClose();
              }
            }}
            placeholder={placeholder}
            aria-label="Filter commands"
            role="combobox"
            aria-expanded="true"
            aria-controls="spotlight-list"
            aria-activedescendant={filtered.length > 0 ? `spotlight-${clamped}` : undefined}
            className="h-11 w-full bg-transparent font-mono text-[13px] text-[#0a0a0b] outline-none placeholder:text-[#0a0a0b]/35 dark:text-white dark:placeholder:text-white/30"
          />
          <kbd className="shrink-0 rounded-[2px] border border-[#0a0a0b]/20 px-1.5 py-0.5 font-mono text-[10px] tracking-[0.12em] text-[#0a0a0b]/50 dark:border-white/20 dark:text-white/50">
            ESC
          </kbd>
        </div>
        <ul id="spotlight-list" role="listbox" aria-label="Commands" className="max-h-64 overflow-y-auto py-1">
          {filtered.length === 0 && (
            <li className="px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#0a0a0b]/40 dark:text-white/40">
              No witness found
            </li>
          )}
          {filtered.map((a, i) => (
            <li key={a.label} role="option" id={`spotlight-${i}`} aria-selected={i === clamped}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => a.onSelect()}
                className={cx(
                  'flex w-full items-center justify-between px-4 py-2 text-left outline-none',
                  i === clamped ? 'bg-[#d42b1e]/10 text-[#d42b1e]' : 'text-[#0a0a0b]/80 dark:text-white/80',
                )}
              >
                <span className="font-mono text-[12px] tracking-[0.06em]">{a.label}</span>
                {a.hint && (
                  <span className="ml-3 shrink-0 font-mono text-[10px] tracking-[0.12em] opacity-60">{a.hint}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SpotlightDemo() {
  const [opened, setOpened] = useState(false);
  const [last, setLast] = useState('None');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpened((o) => !o);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const pick = (label: string) => {
    setLast(label);
    setOpened(false);
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setOpened(true)}
          className="h-9 rounded-[2px] border border-[#0a0a0b]/25 px-4 font-mono text-[11px] uppercase tracking-[0.18em] dark:border-white/25"
        >
          Open palette
        </button>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/50 dark:text-white/50">
          Last: {last}
        </span>
      </div>
      {opened && (
        <Spotlight
          opened={opened}
          onClose={() => setOpened(false)}
          placeholder="Type a command…"
          actions={[
            { label: 'Open dossier', hint: 'CTRL O', onSelect: () => pick('Open dossier') },
            { label: 'File exhibit', hint: 'CTRL F', onSelect: () => pick('File exhibit') },
            { label: 'Summon witness', hint: 'CTRL W', onSelect: () => pick('Summon witness') },
          ]}
        />
      )}
    </div>
  );
}
