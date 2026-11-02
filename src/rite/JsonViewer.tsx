import { useState } from 'react';
import { Check, ChevronRight, Copy } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface JsonViewerProps {
  data: unknown;
  collapsed?: boolean;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isExpandable(value: unknown): boolean {
  if (Array.isArray(value)) return value.length > 0;
  if (isPlainObject(value)) return Object.keys(value).length > 0;
  return false;
}

function typeLabel(value: unknown): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) return `array[${value.length}]`;
  if (isPlainObject(value)) return `object{${Object.keys(value).length}}`;
  return typeof value;
}

function Primitive({ value }: { value: unknown }) {
  if (value === null) return <span className="text-[#d42b1e]">null</span>;
  if (value === undefined) return <span className="text-white/30">undefined</span>;
  if (typeof value === 'string')
    return <span className="text-white/75 break-all">"{value}"</span>;
  if (typeof value === 'number') return <span className="text-white">{String(value)}</span>;
  if (typeof value === 'boolean') return <span className="text-white">{String(value)}</span>;
  return <span className="text-white/50">{String(value)}</span>;
}

interface NodeProps {
  name: string | null;
  value: unknown;
  depth: number;
  path: string;
  expandDepth: number;
  onSelect: (path: string) => void;
}

function JsonNode({ name, value, depth, path, expandDepth, onSelect }: NodeProps) {
  const [open, setOpen] = useState(depth < expandDepth);
  const expandable = isExpandable(value);

  if (!expandable) {
    return (
      <div className="flex items-baseline gap-1.5 py-px" style={{ paddingLeft: depth * 16 }}>
        <span className="w-3 shrink-0" aria-hidden />
        {name !== null && (
          <button
            type="button"
            onClick={() => onSelect(path)}
            className="shrink-0 text-white/45 transition-colors hover:text-white"
          >
            "{name}":
          </button>
        )}
        <Primitive value={value} />
      </div>
    );
  }

  const entries: Array<[string, unknown]> = Array.isArray(value)
    ? value.map((v, i) => [String(i), v])
    : Object.entries(value as Record<string, unknown>);
  const isArray = Array.isArray(value);
  const openBracket = isArray ? '[' : '{';
  const closeBracket = isArray ? ']' : '}';

  return (
    <div>
      <div
        className="flex items-baseline gap-1.5 py-px"
        style={{ paddingLeft: depth * 16 }}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? `Collapse ${path}` : `Expand ${path}`}
          aria-expanded={open}
          className="flex w-3 shrink-0 items-center justify-center text-white/40 transition-colors hover:text-white"
        >
          <ChevronRight
            size={12}
            aria-hidden
            className={cx('transition-transform', open && 'rotate-90')}
          />
        </button>
        {name !== null && (
          <button
            type="button"
            onClick={() => onSelect(path)}
            className="shrink-0 text-white/45 transition-colors hover:text-white"
          >
            "{name}":
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            setOpen((v) => !v);
            onSelect(path);
          }}
          className="text-white/30 transition-colors hover:text-white/60"
        >
          {open ? openBracket : `${openBracket}…${closeBracket}`}
          {!open && (
            <span className="ml-1.5 text-white/25">
              {typeLabel(value)}
            </span>
          )}
        </button>
        {open && entries.length === 0 && (
          <span className="text-white/30">{closeBracket}</span>
        )}
      </div>
      {open && (
        <div>
          {entries.map(([k, v]) => (
            <JsonNode
              key={k}
              name={isArray ? null : k}
              value={v}
              depth={depth + 1}
              path={isArray ? `${path}[${k}]` : `${path}.${k}`}
              expandDepth={expandDepth}
              onSelect={onSelect}
            />
          ))}
          <div
            className="py-px text-white/30"
            style={{ paddingLeft: depth * 16 + 12 }}
          >
            {closeBracket}
          </div>
        </div>
      )}
    </div>
  );
}

export function JsonViewer({ data, collapsed = false }: JsonViewerProps) {
  const [selectedPath, setSelectedPath] = useState('$');
  const [copied, setCopied] = useState(false);
  const expandDepth = collapsed ? 0 : 2;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2) ?? 'undefined');
    } catch {
      setCopied(false);
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="overflow-hidden rounded-[2px] border border-[#0a0a0b]/20 bg-black dark:border-white/15">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-1.5">
        <span className="truncate font-mono text-[10px] tracking-[0.08em] text-white/50">
          {selectedPath}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Copied' : 'Copy JSON'}
          className="flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/50 transition-colors hover:text-white"
        >
          {copied ? (
            <Check size={12} className="text-[#d42b1e]" aria-hidden />
          ) : (
            <Copy size={12} aria-hidden />
          )}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="overflow-auto px-3 py-3 font-mono text-[12px] leading-relaxed">
        <JsonNode
          name={null}
          value={data}
          depth={0}
          path="$"
          expandDepth={expandDepth}
          onSelect={setSelectedPath}
        />
      </div>
    </div>
  );
}

export function JsonViewerDemo() {
  const sample = {
    dossier: 'VESPER',
    count: 42,
    active: true,
    cleared: null,
    tags: ['blood', 'mono'],
    nested: { level: 2, deeper: { level: 3 } },
  };
  return (
    <div className="w-full max-w-lg">
      <JsonViewer data={sample} />
    </div>
  );
}
