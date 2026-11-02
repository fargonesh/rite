import { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown, ChevronRight, File, Folder } from 'lucide-react';
import { cx } from '../lib/cx.ts';
import type { TreeNodeData } from './Tree.tsx';

export interface TreeSelectProps {
  label?: string;
  data: TreeNodeData[];
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (value: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

function findLabel(nodes: TreeNodeData[], value: string): string | undefined {
  for (const n of nodes) {
    if (n.value === value) return n.label;
    if (n.children) {
      const hit = findLabel(n.children, value);
      if (hit) return hit;
    }
  }
  return undefined;
}

function toggle(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

interface RowsProps {
  nodes: TreeNodeData[];
  selected: string | null;
  expanded: string[];
  onToggle: (value: string) => void;
  onPick: (value: string) => void;
}

function Rows({ nodes, selected, expanded, onToggle, onPick }: RowsProps) {
  return (
    <ul role="group" className="m-0 list-none p-0">
      {nodes.map((node) => {
        const hasKids = Boolean(node.children?.length);
        const open = expanded.includes(node.value);
        const isSel = node.value === selected;
        return (
          <li key={node.value} role="treeitem" aria-expanded={hasKids ? open : undefined} aria-selected={isSel} className="m-0 p-0">
            <div className="border-l border-[#0a0a0b]/15 dark:border-white/10">
              <div
                role="button"
                tabIndex={0}
                aria-expanded={hasKids ? open : undefined}
                onClick={() => (hasKids ? onToggle(node.value) : onPick(node.value))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (hasKids) onToggle(node.value);
                    else onPick(node.value);
                  } else if (e.key === 'ArrowRight' && hasKids && !open) onToggle(node.value);
                  else if (e.key === 'ArrowLeft' && hasKids && open) onToggle(node.value);
                }}
                className={cx(
                  'flex w-full cursor-pointer items-center gap-1.5 rounded-[2px] py-1.5 pl-2 pr-2 outline-none transition-colors',
                  'hover:bg-[#0a0a0b]/5 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#d42b1e] dark:hover:bg-white/5',
                  isSel && 'bg-[#0a0a0b] text-[#e9e7e2] hover:bg-[#0a0a0b] dark:bg-[#e9e7e2] dark:text-black dark:hover:bg-[#e9e7e2]',
                )}
              >
                <span className="flex w-4 shrink-0 items-center justify-center" aria-hidden>
                  {hasKids ? (
                    <ChevronRight size={12} className={cx('opacity-60 transition-transform', open && 'rotate-90')} />
                  ) : (
                    <span className="block h-px w-2 bg-current opacity-30" />
                  )}
                </span>
                <span aria-hidden className="flex shrink-0 items-center opacity-60">
                  {hasKids ? <Folder size={13} /> : <File size={13} />}
                </span>
                <span className="truncate font-mono text-[12px] uppercase tracking-[0.12em]">{node.label}</span>
                {isSel && <span aria-hidden className="ml-auto h-1.5 w-1.5 shrink-0 rounded-[1px] bg-[#d42b1e]" />}
              </div>
              {hasKids && open && node.children && (
                <Rows nodes={node.children} selected={selected} expanded={expanded} onToggle={onToggle} onPick={onPick} />
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function TreeSelect({
  label,
  data,
  value,
  defaultValue = null,
  onChange,
  placeholder = 'Select…',
  disabled = false,
  className,
  id,
}: TreeSelectProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [uncontrolled, setUncontrolled] = useState<string | null>(defaultValue);
  const controlled = value !== undefined;
  const selected = controlled ? value : uncontrolled;
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open ]);

  const selectedLabel = selected != null ? findLabel(data, selected) : undefined;

  function pick(v: string) {
    if (!controlled) setUncontrolled(v);
    onChange?.(v);
    setOpen(false);
  }

  return (
    <div className={cx('w-full', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#0a0a0b]/70 dark:text-white/60"
        >
          {label}
        </label>
      )}
      <div ref={rootRef} className="relative">
        <button
          type="button"
          id={inputId}
          disabled={disabled}
          aria-haspopup="tree"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={cx(
            'flex h-9 w-full items-center justify-between gap-2 rounded-[2px] border border-[#0a0a0b]/30 bg-transparent px-3 font-mono text-[13px] outline-none transition-colors dark:border-white/20',
            'focus-visible:ring-1 focus-visible:ring-[#d42b1e]',
            disabled && 'cursor-not-allowed opacity-40',
          )}
        >
          <span className={cx('truncate', !selectedLabel && 'text-[#0a0a0b]/35 dark:text-white/30')}>
            {selectedLabel ?? placeholder}
          </span>
          <ChevronDown size={14} aria-hidden className={cx('shrink-0 opacity-60 transition-transform', open && 'rotate-180')} />
        </button>
        {open && !disabled && (
          <div className="absolute z-50 mt-1 max-h-64 w-full overflow-auto rounded-[2px] border border-[#0a0a0b]/20 bg-white p-1.5 shadow-[0_8px_24px_rgba(10,10,11,0.16)] dark:border-white/15 dark:bg-[#0e0f11] dark:shadow-none">
            <div role="tree" aria-label={label ?? 'Select from tree'}>
              <Rows
                nodes={data}
                selected={selected ?? null}
                expanded={expanded}
                onToggle={(v) => setExpanded((prev) => toggle(prev, v))}
                onPick={pick}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const DEMO_DATA: TreeNodeData[] = [
  {
    value: 'archive',
    label: 'Archive',
    children: [
      {
        value: 'dossiers',
        label: 'Dossiers',
        children: [
          { value: 'v-09', label: 'Vesper-09' },
          { value: 'v-10', label: 'Vesper-10' },
        ],
      },
      { value: 'night-log', label: 'Night log' },
    ],
  },
  { value: 'field-manual', label: 'Field manual' },
];

export function TreeSelectDemo() {
  return (
    <div className="w-full max-w-xs">
      <TreeSelect label="Record" data={DEMO_DATA} placeholder="Pick a record…" defaultValue="v-09" />
    </div>
  );
}
