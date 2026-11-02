import { cx } from '../lib/cx.ts';

export interface TableProps {
  head: string[];
  body: (string | number)[][];
  caption?: string;
  striped?: boolean;
  className?: string;
}

export function Table({ head, body, caption, striped = false, className }: TableProps) {
  return (
    <div className={cx('overflow-x-auto rounded-[2px] border border-[#0a0a0b]/20 dark:border-white/15', className)}>
      <table className="w-full border-collapse text-left text-sm">
        {caption && (
          <caption className="border-b border-[#0a0a0b]/15 px-4 py-2 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0b]/60 [caption-side:top] dark:border-white/10 dark:text-white/60">
            {caption}
          </caption>
        )}
        <thead>
          <tr className="border-b border-[#0a0a0b]/20 dark:border-white/15">
            {head.map((h) => (
              <th
                key={h}
                scope="col"
                className="px-4 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#0a0a0b]/60 dark:text-white/60"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, i) => (
            <tr
              key={i}
              className={cx(
                'border-b border-[#0a0a0b]/10 last:border-b-0 dark:border-white/10',
                striped && i % 2 === 1 && 'bg-[#0a0a0b]/[0.04] dark:bg-white/[0.04]',
              )}
            >
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 text-[#0a0a0b] dark:text-[#e9e7e2]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TableDemo() {
  return (
    <Table
      caption="Exhibit ledger — 03 entries"
      striped
      head={['Ref', 'Subject', 'Status']}
      body={[
        ['V-001', 'Ink slab', 'Filed'],
        ['V-002', 'Hairline grid', 'Open'],
        ['V-003', 'Blood accent', 'Sealed'],
      ]}
    />
  );
}
