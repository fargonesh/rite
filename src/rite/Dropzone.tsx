import { useRef, useState } from 'react';
import type { DragEvent } from 'react';
import { UploadCloud } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface DropzoneProps {
  onDrop: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  label?: string;
  className?: string;
}

export function Dropzone({ onDrop, accept, multiple = true, label, className }: DropzoneProps) {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (list: FileList | null) => {
    if (!list) return;
    const next = Array.from(list);
    setFiles(next);
    onDrop(next);
  };

  const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const onDropInner = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className={cx('w-full', className)}>
      <div
        role="button"
        tabIndex={0}
        aria-label={label ?? 'Drop files here or click to browse'}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click();
        }}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDropInner}
        className={cx(
          'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[2px] border border-dashed px-4 py-8 text-center outline-none transition-colors',
          'focus-visible:ring-1 focus-visible:ring-[#d42b1e]',
          dragging
            ? 'border-[#d42b1e] bg-[#d42b1e]/5'
            : 'border-[#0a0a0b]/30 hover:border-[#0a0a0b]/60 dark:border-white/25 dark:hover:border-white/50',
        )}
      >
        <UploadCloud size={20} aria-hidden className={dragging ? 'text-[#d42b1e]' : 'text-[#0a0a0b]/50 dark:text-white/50'} />
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0a0a0b]/70 dark:text-white/70">
          {label ?? 'Drop files or click to browse'}
        </p>
        <p className="font-mono text-[10px] tracking-[0.12em] text-[#0a0a0b]/40 dark:text-white/40">
          {dragging ? 'RELEASE TO LOG EVIDENCE' : 'DRAG OVER TO WITNESS'}
        </p>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          aria-hidden
          tabIndex={-1}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      {files.length > 0 && (
        <ul className="mt-2 rounded-[2px] border border-[#0a0a0b]/15 dark:border-white/10">
          {files.map((f) => (
            <li
              key={`${f.name}-${f.size}`}
              className="flex items-center justify-between border-b border-dashed border-[#0a0a0b]/10 px-3 py-1.5 font-mono text-[11px] last:border-0 dark:border-white/10"
            >
              <span className="truncate text-[#0a0a0b]/80 dark:text-white/80">{f.name}</span>
              <span className="ml-2 shrink-0 tracking-[0.12em] text-[#0a0a0b]/40 dark:text-white/40">
                {(f.size / 1024).toFixed(1)} KB
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function DropzoneDemo() {
  return <Dropzone onDrop={() => {}} label="Drop evidence or click to browse" />;
}
