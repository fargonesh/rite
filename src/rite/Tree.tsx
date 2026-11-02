import { useState } from 'react';
import { ChevronRight, File, Folder } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface TreeNodeData {
  value: string;
  label: string;
  children?: TreeNodeData[];
}

export interface TreeProps {
  data: TreeNodeData[];
  expanded?: string[];
  defaultExpanded?: string[];
  onExpand?: (expanded: string[]) => void;
  className?: string;
  ariaLabel?: string;
}

function toggle(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

interface BranchProps {
  nodes: TreeNodeData[];
  depth: number;
  expanded: string[];
  onToggle: (value: string) => void;
}

function Branch({ nodes, depth, expanded, onToggle }: BranchProps) {
  return (
    <ul role="group" className="m-0 list-none p-0">
      {nodes.map((node) => {
        const hasKids = Boolean(node.children?.length);
        const open = expanded.includes(node.value);
        return (
          <li
            key={node.value}
            role="treeitem"
            aria-expanded={hasKids ? open : undefined}
            aria-selected={false}
            className="m-0 p-0"
          >
            <div
              className="border-l border-[#0a0a0b]/15 dark:border-white/10"
              style={{ marginLeft: depth === 0 ? 0 : 14 }}
            >
              <button
                type="button"
                onClick={() => hasKids && onToggle(node.value)}
                aria-expanded={hasKids ? open : undefined}
                className={cx(
                  'flex w-full items-center gap-1.5 rounded-[2px] py-1.5 pl-2 pr-2 text-left outline-none transition-colors',
                  'hover:bg-[#0a0a0b]/5 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#d42b1e] dark:hover:bg-white/5',
                )}
              >
                <span className="flex w-4 shrink-0 items-center justify-center" aria-hidden>
                  {hasKids ? (
                    <ChevronRight
                      size={12}
                      className={cx('opacity-60 transition-transform', open && 'rotate-90')}
                    />
                  ) : (
                    <span className="block h-px w-2 bg-[#0a0a0b]/25 dark:bg-white/20" />
                  )}
                </span>
                <span aria-hidden className="flex shrink-0 items-center opacity-60">
                  {hasKids ? <Folder size={13} /> : <File size={13} />}
                </span>
                <span className="truncate font-mono text-[12px] uppercase tracking-[0.12em] text-[#0a0a0b]/80 dark:text-white/75">
                  {node.label}
                </span>
              </button>
              {hasKids && open && node.children && (
                <Branch nodes={node.children} depth={depth + 1} expanded={expanded} onToggle={onToggle} />
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function Tree({ data, expanded, defaultExpanded = [], onExpand, className, ariaLabel = 'File tree' }: TreeProps) {
  const [inner, setInner] = useState<string[]>(defaultExpanded);
  const isControlled = expanded !== undefined;
  const open: string[] = isControlled ? (expanded ?? []) : inner;
  const handleToggle = (value: string) => {
    const next = toggle(open, value);
    if (!isControlled) setInner(next);
    onExpand?.(next);
  };
  return (
    <div className={cx('font-mono', className)}>
      <div role="tree" aria-label={ariaLabel} aria-multiselectable={false}>
        <Branch nodes={data} depth={0} expanded={open} onToggle={handleToggle} />
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

export function TreeDemo() {
  return (
    <div className="max-w-xs rounded-[2px] border border-[#0a0a0b]/20 p-2 dark:border-white/15">
      <Tree data={DEMO_DATA} defaultExpanded={['archive']} />
    </div>
  );
}
