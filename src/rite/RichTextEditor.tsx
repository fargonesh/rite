import { useRef, useState } from 'react';
import { Bold, Code, Heading2, Italic, Quote } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface RichTextEditorProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  className?: string;
}

type MarkKind = 'bold' | 'italic' | 'heading' | 'quote' | 'code';

export function RichTextEditor({ value, defaultValue = '', onChange, label, className }: RichTextEditorProps) {
  const [inner, setInner] = useState(defaultValue);
  const areaRef = useRef<HTMLTextAreaElement>(null);

  const controlled = value !== undefined;
  const text = controlled ? value : inner;

  const commit = (next: string): void => {
    if (!controlled) setInner(next);
    onChange?.(next);
  };

  const applyMark = (kind: MarkKind): void => {
    const el = areaRef.current;
    if (!el) return;
    const start = el.selectionStart ?? text.length;
    const end = el.selectionEnd ?? text.length;
    const sel = text.slice(start, end) || 'text';
    let next = text;
    let caretStart = start;
    let caretEnd = end;

    if (kind === 'bold' || kind === 'italic' || kind === 'code') {
      const marker = kind === 'bold' ? '**' : kind === 'italic' ? '*' : '`';
      next = text.slice(0, start) + marker + sel + marker + text.slice(end);
      caretStart = start + marker.length;
      caretEnd = caretStart + sel.length;
    } else {
      const prefix = kind === 'heading' ? '## ' : '> ';
      const lineStart = text.lastIndexOf('\n', start - 1) + 1;
      const lineEndIdx = text.indexOf('\n', end);
      const lineEnd = lineEndIdx === -1 ? text.length : lineEndIdx;
      const block = text.slice(lineStart, lineEnd);
      const marked = block
        .split('\n')
        .map((line) => (line.startsWith(prefix) ? line : `${prefix}${line}`))
        .join('\n');
      next = text.slice(0, lineStart) + marked + text.slice(lineEnd);
      caretStart = lineStart;
      caretEnd = lineStart + marked.length;
    }

    commit(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(caretStart, caretEnd);
    });
  };

  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

  const tools: Array<{ kind: MarkKind; label: string; Icon: typeof Bold }> = [
    { kind: 'bold', label: 'Bold selection', Icon: Bold },
    { kind: 'italic', label: 'Italicize selection', Icon: Italic },
    { kind: 'heading', label: 'Prefix lines as heading', Icon: Heading2 },
    { kind: 'quote', label: 'Prefix lines as quote', Icon: Quote },
    { kind: 'code', label: 'Wrap selection in code', Icon: Code },
  ];

  return (
    <div className={cx('w-full', className)}>
      {label && (
        <p className="mb-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#0a0a0b]/70 dark:text-white/60">
          {label}
        </p>
      )}
      <div className="overflow-hidden rounded-[2px] border border-[#0a0a0b]/30 bg-transparent focus-within:border-[#0a0a0b] focus-within:ring-1 focus-within:ring-[#d42b1e] dark:border-white/20 dark:focus-within:border-white/60">
        <div className="flex items-center gap-1 border-b border-dashed border-[#0a0a0b]/15 px-2 py-1.5 dark:border-white/10">
          {tools.map(({ kind, label: toolLabel, Icon }) => (
            <button
              key={kind}
              type="button"
              title={toolLabel}
              aria-label={toolLabel}
              onClick={() => applyMark(kind)}
              className="rounded-[2px] p-1.5 text-[#0a0a0b]/70 outline-none transition-colors hover:bg-[#0a0a0b]/5 hover:text-[#0a0a0b] focus-visible:ring-1 focus-visible:ring-[#d42b1e] dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white"
            >
              <Icon size={14} aria-hidden />
            </button>
          ))}
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/40 dark:text-white/30">
            {words} {words === 1 ? 'word' : 'words'}
          </span>
        </div>
        <textarea
          ref={areaRef}
          value={text}
          onChange={(e) => commit(e.target.value)}
          rows={6}
          spellCheck={false}
          className="block w-full resize-y bg-transparent px-3 py-2.5 font-mono text-[13px] leading-6 outline-none placeholder:text-[#0a0a0b]/35 dark:placeholder:text-white/30"
          placeholder="Draft the record in markdown…"
        />
      </div>
      <p className="mt-1.5 font-mono text-[11px] text-[#0a0a0b]/50 dark:text-white/40">
        Toolbar wraps the selection: **bold**, *italic*, ## heading, &gt; quote, `code`.
      </p>
    </div>
  );
}

export function RichTextEditorDemo() {
  const [draft, setDraft] = useState('Night watch log.\nSecond line holds until dawn.');
  return (
    <div className="flex flex-col gap-3">
      <RichTextEditor label="Exhibit notes" value={draft} onChange={setDraft} />
      <p className="font-mono text-[11px] text-[#0a0a0b]/50 dark:text-white/40">
        {draft.length} chars committed to state.
      </p>
    </div>
  );
}
