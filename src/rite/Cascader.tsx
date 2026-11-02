import { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cx } from '../lib/cx.ts';
import type { TreeNodeData } from './Tree.tsx';

export interface CascaderProps {
  label?: string;
  data: TreeNodeData[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  id?: string;
}

function childrenOf(data: TreeNodeData[], path: string[]): TreeNodeData[] {
  let level = data;
  for (const v of path) {
    const hit = level.find((n) => n.value === v);
    if (!hit?.children) return [];
    level = hit.children;
  }
  return level;
}

function labelsOf(data: TreeNodeData[], path: string[]): string[] {
  const out: string[] = [];
  let level = data;
  for (const v of path) {
    const hit = level.find((n) => n.value === v);
    if (!hit) break;
    out.push(hit.label);
    level = hit.children ?? [];
  }
  return out;
}

function isLeaf(node: TreeNodeData): boolean {
  return !node.children?.length;
}

export function Cascader({
  label,
  data,
  value,
  defaultValue = [],
  onChange,
  placeholder = 'Select…',
  className,
  id,
}: CascaderProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [uncontrolled, setUncontrolled] = useState<string[]>(defaultValue);
  const controlled = value !== undefined;
  const selected: string[] = controlled ? (value ?? []) : uncontrolled;
  const [open, setOpen] = useState(false);
  const [trail, setTrail] = useState<string[]>([]);
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

  const activeTrail = trail.length > 0 ? trail : selected;
  const columns: { nodes: TreeNodeData[]; depth: number }[] = [{ nodes: data, depth: 0 }];
  for (let d = 0; d < activeTrail.length; d++) {
    const kids = childrenOf(data, activeTrail.slice(0, d + 1));
    if (kids.length > 0) columns.push({ nodes: kids, depth: d + 1 });
  }

  function commit(path: string[]) {
    if (!controlled) setUncontrolled(path);
    onChange?.(path);
    setOpen(false);
  }

  function onNodeClick(depth: number, node: TreeNodeData) {
    const next = [...activeTrail.slice(0, depth), node.value];
    setTrail(next);
    if (isLeaf(node)) commit(next);
  }

  const display = labelsOf(data, selected).join(' / ');

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
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => {
            setTrail(selected);
            setOpen((o) => !o);
          }}
          onMouseEnter={() => {
            if (!open) setTrail(selected);
          }}
          className={cx(
            'flex h-9 w-full items-center justify-between gap-2 rounded-[2px] border border-[#0a0a0b]/30 bg-transparent px-3 font-mono text-[13px] outline-none transition-colors dark:border-white/20',
            'focus-visible:ring-1 focus-visible:ring-[#d42b1e]',
          )}
        >
          <span className={cx('truncate', selected.length === 0 && 'text-[#0a0a0b]/35 dark:text-white/30')}>
            {selected.length === 0 ? placeholder : display}
          </span>
          <ChevronDown size={14} aria-hidden className={cx('shrink-0 opacity-60 transition-transform', open && 'rotate-180')} />
        </button>
        {open && (
          <div
            role="menu"
            aria-label={label ?? 'Cascading options'}
            className="absolute z-50 mt-1 flex max-w-[calc(100vw-2rem)] overflow-auto rounded-[2px] border border-[#0a0a0b]/20 bg-white shadow-[0_8px_24px_rgba(10,10,11,0.16)] dark:border-white/15 dark:bg-[#0e0f11] dark:shadow-none"
          >
            {columns.map((col) => (
              <ul
                key={col.depth}
                aria-label={`Level ${col.depth + 1}`}
                className="m-0 min-w-40 list-none border-r border-[#0a0a0b]/10 p-1 last:border-r-0 dark:border-white/10"
              >
                {col.nodes.map((node) => {
                  const active = activeTrail[col.depth] === node.value;
                  const leaf = isLeaf(node);
                  return (
                    <li key={node.value} className="m-0 p-0">
                      <button
                        type="button"
                        role="menuitem"
                        aria-current={selected[col.depth] === node.value && col.depth === selected.length - 1 ? 'true' : undefined}
                        onClick={() => onNodeClick(col.depth, node)}
                        onMouseEnter={() => setTrail([...activeTrail.slice(0, col.depth), node.value])}
                        onFocus={() => {
                          if (!leaf) setTrail([...activeTrail.slice(0, col.depth), node.value]);
                        }}
                        className={cx(
                          'flex w-full items-center justify-between gap-3 rounded-[2px] px-2.5 py-2 text-left font-mono text-[12px] uppercase tracking-[0.12em] outline-none transition-colors',
                          'hover:bg-[#0a0a0b]/5 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#d42b1e] dark:hover:bg-white/5',
                          active
                            ? 'bg-[#0a0a0b] text-[#e9e7e2] hover:bg-[#0a0a0b] dark:bg-[#e9e7e2] dark:text-black dark:hover:bg-[#e9e7e2]'
                            : 'text-[#0a0a0b]/80 dark:text-white/75',
                        )}
                      >
                        <span className="truncate">{node.label}</span>
                        {!leaf && <ChevronRight size={12} aria-hidden className="shrink-0 opacity-60" />}
                        {leaf && active && <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-[1px] bg-[#d42b1e]" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            ))}
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

export function CascaderDemo() {
  return (
    <div className="w-full max-w-md">
      <Cascader label="Path" data={DEMO_DATA} placeholder="Pick a path…" defaultValue={['archive', 'dossiers', 'v-09']} />
    </div>
  );
}
