export const docs8: Record<string, { usage: string; props: Array<{ name: string; type: string; default?: string; notes?: string }> }> = {
  OverflowList: {
    usage: `import { OverflowList } from '@fargone/rite';\n\n<OverflowList\n  maxVisible={4}\n  items={['alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot']}\n/>`,
    props: [
      { name: 'items', type: 'ReactNode[]', default: '—', notes: 'Chips to display. Extra items collapse behind a +N more button.' },
      { name: 'maxVisible', type: 'number', default: '4', notes: 'Visible chips before collapsing. Clicking +N more expands inline.' },
      { name: 'className', type: 'string', notes: 'Extra classes for the bordered wrapper.' },
    ],
  },
  Overlay: {
    usage: `import { Overlay } from '@fargone/rite';\n\n<div className="relative h-40">\n  <Overlay label="Sealed — file 047" opacity={0.6} />\n</div>`,
    props: [
      { name: 'children', type: 'ReactNode', notes: 'Optional content centered above the dim layer.' },
      { name: 'label', type: 'string', notes: 'Accessible label shown as centered text. Sets role region when provided.' },
      { name: 'opacity', type: 'number', default: '0.55', notes: 'Dim strength, clamped to 0–1. NaN falls back to 0.5.' },
      { name: 'color', type: "'black' | 'white'", default: "'black'", notes: 'Veil color. White veil suits dark backdrops.' },
    ],
  },
  Pagination: {
    usage: `import { Pagination } from '@fargone/rite';\nimport { useState } from 'react';\n\nconst [page, setPage] = useState(4);\n<Pagination page={page} total={9} onChange={setPage} siblings={1} />`,
    props: [
      { name: 'page', type: 'number', default: '—', notes: 'Current page, 1-based. Clamped into range internally.' },
      { name: 'total', type: 'number', default: '—', notes: 'Total page count. Single page renders just page 1.' },
      { name: 'onChange', type: '(page: number) => void', default: '—', notes: 'Fired by prev/next buttons and numbered buttons.' },
      { name: 'siblings', type: 'number', default: '1', notes: 'Neighbors shown each side of current page; gaps collapse to ellipsis.' },
    ],
  },
  Paper: {
    usage: `import { Paper } from '@fargone/rite';\n\n<Paper padding="sm" shadow>\n  Plain elevated surface. No ticks, no header chrome.\n</Paper>`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Surface content.' },
      { name: 'padding', type: "'xs' | 'sm' | 'md'", default: "'sm'", notes: 'Inner padding: p-2, p-4, or p-6.' },
      { name: 'shadow', type: 'boolean', default: 'true', notes: 'Soft drop shadow in light mode only; flat in dark mode.' },
    ],
  },
  PasswordInput: {
    usage: `import { PasswordInput } from '@fargone/rite';\n\n<PasswordInput\n  label="Seal phrase"\n  fileNo="F-009"\n  placeholder="Enter the words…"\n  description="Toggle show / hide inside the field."\n/>`,
    props: [
      { name: 'label', type: 'string', notes: 'Uppercase label row with a red REQ marker.' },
      { name: 'description', type: 'string', notes: 'Helper text below the field. Hidden when error is set.' },
      { name: 'error', type: 'string', notes: 'Displays an error message, applies the error style, and sets aria-invalid.' },
      { name: 'fileNo', type: 'string', notes: 'Catalog number pinned right of the label, e.g. F-009.' },
      { name: 'id', type: 'string', notes: 'Input id. Auto-generated and wired to label and hints when omitted.' },
    ],
  },
  PieChart: {
    usage: `import { PieChart } from '@fargone/rite';\n\n<PieChart\n  size={180}\n  data={[\n    { label: 'Parchment', value: 34, tone: 'ink' },\n    { label: 'Vellum', value: 21, tone: 'dim' },\n    { label: 'Flesh', value: 9, tone: 'blood' },\n  ]}\n/>`,
    props: [
      { name: 'data', type: 'PieChartDatum[]', default: '—', notes: 'Each slice requires a label and value. The tone controls its color.' },
      { name: 'size', type: 'number', default: '180', notes: 'SVG width/height in px. Falls back to height, then 180.' },
      { name: 'height', type: 'number', notes: 'Alias for size so radial charts share the cartesian prop shape.' },
      { name: 'showGrid', type: 'boolean', notes: 'Accepted for API parity; radial charts render no grid.' },
      { name: 'ariaLabel', type: 'string', default: "'Pie chart'", notes: 'Accessible title for the svg figure.' },
    ],
  },
  Pill: {
    usage: `import { Pill } from '@fargone/rite';\n\n<Pill onRemove={() => setTags((prev) => prev.filter((p) => p !== 'vesper'))}>\n  vesper\n</Pill>`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Tag text. Truncates inside a max-width chip.' },
      { name: 'onRemove', type: '() => void', notes: 'Shows the X dismiss button when provided.' },
      { name: 'disabled', type: 'boolean', default: 'false', notes: 'Dims the chip and disables the remove button.' },
    ],
  },
  PillsInput: {
    usage: `import { PillsInput } from '@fargone/rite';\n\n<PillsInput\n  label="Notify list"\n  inputProps={{ placeholder: 'Type an address, press Enter' }}\n  onCommit={(text) => addRecipient(text)}\n>\n  {recipients.map((a) => <span key={a}>{a}</span>)}\n</PillsInput>`,
    props: [
      { name: 'children', type: 'ReactNode', notes: 'Rendered pills before the draft input; you own remove buttons.' },
      { name: 'label', type: 'string', notes: 'Uppercase heading above the field.' },
      { name: 'error', type: 'string', notes: 'Displays an error message below the field and applies the error style.' },
      { name: 'inputProps', type: 'PillsInputCommitProps', notes: 'Placeholder, onCommit, and onKeyDown for the inner draft input.' },
      { name: 'onCommit', type: '(text: string) => void', notes: 'Fires on Enter or comma with the trimmed draft. Empty drafts ignored.' },
    ],
  },
  PinInput: {
    usage: `import { PinInput } from '@fargone/rite';\nimport { useState } from 'react';\n\nconst [code, setCode] = useState('');\n<PinInput length={4} value={code} onChange={setCode} ariaLabel="Rite code" />`,
    props: [
      { name: 'length', type: 'number', default: '4', notes: 'Number of digit boxes rendered.' },
      { name: 'value', type: 'string', notes: 'Controlled code. Leave unset for uncontrolled use.' },
      { name: 'defaultValue', type: 'string', default: "''", notes: 'Uncontrolled initial code.' },
      { name: 'onChange', type: '(value: string) => void', notes: 'Fires with the joined code on type, delete, and paste.' },
      { name: 'disabled', type: 'boolean', default: 'false', notes: 'Disables every digit box.' },
      { name: 'ariaLabel', type: 'string', default: "'Pin code'", notes: 'Group label; each box is announced as digit N.' },
    ],
  },
  Popover: {
    usage: `import { Popover } from '@fargone/rite';\n\n<Popover target="Open file" defaultOpened={false}>\n  <p>Exhibit A, B, C. Click outside or press Esc to close.</p>\n</Popover>`,
    props: [
      { name: 'target', type: 'ReactNode', default: '—', notes: 'Trigger content rendered inside the toggle button.' },
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Dropdown panel content.' },
      { name: 'opened', type: 'boolean', notes: 'Controlled open state. Pair with onOpenChange.' },
      { name: 'defaultOpened', type: 'boolean', default: 'false', notes: 'Uncontrolled initial open state.' },
      { name: 'onOpenChange', type: '(opened: boolean) => void', notes: 'Fires on toggle, outside click, and Escape.' },
      { name: 'position', type: "'bottom'", default: "'bottom'", notes: 'Only bottom placement is supported; exposed via data-position.' },
    ],
  },
  Portal: {
    usage: `import { Portal } from '@fargone/rite';\n\n<Portal>\n  <div className="fixed bottom-4 right-4">Pinned sigil</div>\n</Portal>`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Content teleported outside the parent tree.' },
      { name: 'target', type: 'Element | null', notes: 'Portal mount node. Defaults to document.body after mount.' },
    ],
  },
  Progress: {
    usage: `import { Progress } from '@fargone/rite';\n\n<Progress value={68} size="sm" tone="ink" showLabel striped />`,
    props: [
      { name: 'value', type: 'number', default: '—', notes: 'Percentage complete, clamped to 0–100. Values of 90 or higher use the critical color.' },
      { name: 'size', type: "'xs' | 'sm' | 'md'", default: "'sm'", notes: 'Bar height: h-1, h-2, or h-3.' },
      { name: 'tone', type: "'ink' | 'blood'", default: "'ink'", notes: 'Sets the progress color. The default tone changes to the critical color at 90 or higher.' },
      { name: 'showLabel', type: 'boolean', default: 'false', notes: 'Shows a Progress header row with the rounded percent.' },
      { name: 'striped', type: 'boolean', default: 'false', notes: 'Diagonal highlight overlay on the fill.' },
    ],
  },
  RadarChart: {
    usage: `import { RadarChart } from '@fargone/rite';\n\n<RadarChart\n  max={100}\n  data={[\n    { label: 'Spd', value: 82 },\n    { label: 'Pwr', value: 64 },\n    { label: 'Agl', value: 91 },\n  ]}\n/>`,
    props: [
      { name: 'data', type: 'RadarDatum[]', default: '—', notes: 'One axis per entry, capped at 8 and floored at 3. Each needs label and value.' },
      { name: 'max', type: 'number', notes: 'Scale ceiling. Defaults to the largest finite value, minimum 1.' },
    ],
  },
  RadialBarChart: {
    usage: `import { RadialBarChart } from '@fargone/rite';\n\n<RadialBarChart\n  size={180}\n  thickness={12}\n  data={[\n    { label: 'Sigils', value: 82, tone: 'ink' },\n    { label: 'Breaches', value: 31, tone: 'blood' },\n  ]}\n/>`,
    props: [
      { name: 'data', type: 'RadialBarChartDatum[]', default: '—', notes: 'Each entry creates a ring with a progress value from 0–100 and a color tone.' },
      { name: 'size', type: 'number', default: '180', notes: 'SVG width/height in px; rings stack inward from center.' },
      { name: 'thickness', type: 'number', default: '12', notes: 'Ring stroke width. Gap between rings is thickness plus 6.' },
      { name: 'ariaLabel', type: 'string', notes: 'Accessible title. Auto-built from labels and values when omitted.' },
    ],
  },
  Radio: {
    usage: `import { Radio } from '@fargone/rite';\n\n<Radio\n  name="rite"\n  value="dusk"\n  label="Dusk rite"\n  checked={rite === 'dusk'}\n  onCheckedChange={() => setRite('dusk')}\n/>`,
    props: [
      { name: 'label', type: 'string', notes: 'Uppercase caption beside the dot.' },
      { name: 'checked', type: 'boolean', notes: 'Controlled state. Omit for uncontrolled with defaultChecked.' },
      { name: 'defaultChecked', type: 'boolean', notes: 'Uncontrolled initial state.' },
      { name: 'onCheckedChange', type: '(checked: boolean) => void', notes: 'Fires with the next checked value on change.' },
      { name: 'name', type: 'string', notes: 'Native radio group name shared across options.' },
      { name: 'disabled', type: 'boolean', notes: 'Dims the row and disables the input.' },
    ],
  },
};
