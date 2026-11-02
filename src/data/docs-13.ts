export const docs13: Record<string, { usage: string; props: Array<{ name: string; type: string; default?: string; notes?: string }> }> = {
  TableOfContents: {
    usage: `import { TableOfContents } from '@fargone/rite';\n\n<TableOfContents\n  activeId="methods"\n  items={[\n    { id: 'overview', label: 'Overview', depth: 1 },\n    { id: 'methods', label: 'Methods', depth: 2 },\n  ]}\n/>`,
    props: [
      { name: 'items', type: '{ id: string; label: string; depth?: number }[]', notes: 'Headings to list; depth indents the rail entry.' },
      { name: 'activeId', type: 'string', notes: 'ID of the currently visible entry.' },
    ],
  },
};
