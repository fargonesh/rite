import { Children, cloneElement, useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import type { ReactElement, ReactNode } from 'react';

export interface FileButtonProps {
  onChange: (files: FileList | null) => void;
  accept?: string;
  multiple?: boolean;
  children: ReactNode;
}

export function FileButton({ onChange, accept, multiple = false, children }: FileButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function openPicker() {
    inputRef.current?.click();
  }

  const trigger = Children.only(children) as ReactElement<{ onClick?: (e: unknown) => void }>;
  const cloned = cloneElement(trigger, {
    onClick: (e: unknown) => {
      trigger.props.onClick?.(e);
      openPicker();
    },
  });

  return (
    <>
      {cloned}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        aria-hidden
        tabIndex={-1}
        onChange={(e) => {
          onChange(e.target.files);
          e.target.value = '';
        }}
      />
    </>
  );
}

export function FileButtonDemo() {
  // Demo uses local state via a wrapper since FileButton itself is callback-driven.
  return <FileButtonDemoInner />;
}

function FileButtonDemoInner() {
  const [names, setNames] = useState<string[]>([]);
  return (
    <div className="flex flex-col gap-2">
      <div>
        <FileButton
          accept=".txt,.md"
          multiple
          onChange={(files) => setNames(files ? Array.from(files).map((f) => f.name) : [])}
        >
          <button
            type="button"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-[2px] border border-[#0a0a0b]/25 bg-transparent px-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#0a0a0b] transition-colors hover:border-[#0a0a0b] hover:bg-[#0a0a0b]/5 dark:border-white/25 dark:text-[#e9e7e2] dark:hover:border-white dark:hover:bg-white/5"
          >
            <Upload size={14} strokeWidth={2} aria-hidden /> Choose files
          </button>
        </FileButton>
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] opacity-60">
        {names.length > 0 ? names.join(' · ') : 'No files chosen'}
      </p>
    </div>
  );
}
