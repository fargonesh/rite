export const docs12: Record<string, { usage: string; props: Array<{ name: string; type: string; default?: string; notes?: string }> }> = {
  Tooltip: {
    usage: `import { Tooltip } from '@fargone/rite';\n\n<Tooltip label="FILE 047 — SEALED" position="top">\n  <button type="button">Sealed exhibit</button>\n</Tooltip>`,
    props: [
      { name: 'label', type: 'string', notes: 'Text shown inside the floating bubble.' },
      { name: 'children', type: 'ReactNode', notes: 'Hover or focus target that anchors the tooltip.' },
      { name: 'position', type: "'top'", default: "'top'", notes: 'Placement slot; bubble renders above the target.' },
    ],
  },
  Tour: {
    usage: `import { Tour } from '@fargone/rite';\n\nconst steps = [\n  { selector: '#ledger', title: 'The ledger', body: 'Every exhibit is entered here.' },\n  { selector: '#vault', title: 'The vault', body: 'Sealed files rest below.' },\n];\n\n<Tour steps={steps} opened onDone={() => setOpened(false)} />`,
    props: [
      { name: 'steps', type: 'TourStep[]', notes: 'Ordered stops; each has selector, title, and body.' },
      { name: 'step', type: 'number', notes: 'Controlled active index, clamped to the steps range.' },
      { name: 'defaultStep', type: 'number', default: '0', notes: 'Starting index for uncontrolled use.' },
      { name: 'onChange', type: '(step: number) => void', notes: 'Fires when Back or Next moves the active stop.' },
      { name: 'onDone', type: '() => void', notes: 'Fires when Done or the skip button is pressed.' },
      { name: 'opened', type: 'boolean', default: 'true', notes: 'Set false to hide the panel; empty steps also hide it.' },
    ],
  },
  Transition: {
    usage: `import { Transition } from '@fargone/rite';\n\n<Transition in={show} preset="slide-up" duration={250}>\n  <p>The exhibit enters on opacity plus transform.</p>\n</Transition>`,
    props: [
      { name: 'in', type: 'boolean', notes: 'True mounts and fades in; false plays exit then unmounts.' },
      { name: 'preset', type: "'fade' | 'slide-up' | 'slide-down' | 'scale'", default: "'fade'", notes: 'Opacity plus transform treatment for enter and exit.' },
      { name: 'duration', type: 'number', default: '200', notes: 'Length in ms; also used for the unmount timeout.' },
      { name: 'children', type: 'ReactNode', notes: 'Content kept mounted through the exit timeout.' },
    ],
  },
  Tree: {
    usage: `import { Tree } from '@fargone/rite';\n\nconst data = [\n  { value: 'archive', label: 'Archive', children: [{ value: 'v-09', label: 'Vesper-09' }] },\n  { value: 'field-manual', label: 'Field manual' },\n];\n\n<Tree data={data} defaultExpanded={['archive']} ariaLabel="File tree" />`,
    props: [
      { name: 'data', type: 'TreeNodeData[]', notes: 'Nested nodes with value, label, and optional children.' },
      { name: 'expanded', type: 'string[]', notes: 'Controlled list of open node values.' },
      { name: 'defaultExpanded', type: 'string[]', default: '[]', notes: 'Open values for uncontrolled use.' },
      { name: 'onExpand', type: '(expanded: string[]) => void', notes: 'Fires with the next open list on each toggle.' },
      { name: 'ariaLabel', type: 'string', default: "'File tree'", notes: 'Accessible label for the tree region.' },
    ],
  },
  Treemap: {
    usage: `import { Treemap } from '@fargone/rite';\n\nconst data = [\n  { label: 'Grimoires', value: 42 },\n  { label: 'Sigils', value: 27 },\n  { label: 'Wards', value: 18 },\n];\n\n<Treemap data={data} height={180} />`,
    props: [
      { name: 'data', type: 'TreemapDatum[]', notes: 'Label plus value pairs; sorted descending before layout.' },
      { name: 'height', type: 'number', default: '180', notes: 'SVG height; width is fixed at 320 units.' },
      { name: 'ariaLabel', type: 'string', notes: 'Defaults to a joined label plus value summary.' },
    ],
  },
  TreeSelect: {
    usage: `import { TreeSelect } from '@fargone/rite';\n\n<TreeSelect\n  label="Record"\n  data={data}\n  defaultValue="v-09"\n  placeholder="Pick a record…"\n/>`,
    props: [
      { name: 'label', type: 'string', notes: 'Field label rendered above the trigger button.' },
      { name: 'data', type: 'TreeNodeData[]', notes: 'Nested tree nodes. Leaf nodes can be selected.' },
      { name: 'value', type: 'string | null', notes: 'Controlled selected node value.' },
      { name: 'defaultValue', type: 'string | null', default: 'null', notes: 'Initial selection for uncontrolled use.' },
      { name: 'onChange', type: '(value: string | null) => void', notes: 'Fires with the picked leaf value; closes the menu.' },
      { name: 'placeholder', type: 'string', default: "'Select…'", notes: 'Shown when nothing is selected.' },
      { name: 'disabled', type: 'boolean', default: 'false', notes: 'Blocks opening the dropdown menu.' },
    ],
  },
  Typography: {
    usage: `import { Typography } from '@fargone/rite';\n\n<Typography>\n  <h2>Survey report, entry 12</h2>\n  <p>The team crossed the lower field at dusk.</p>\n  <ul><li>North gate sealed with wax.</li></ul>\n</Typography>`,
    props: [
      { name: 'children', type: 'ReactNode', notes: 'Prose with h2, h3, p, a, code, ul, and li styling.' },
    ],
  },
  UnstyledButton: {
    usage: `import { UnstyledButton } from '@fargone/rite';\n\n<UnstyledButton onClick={openLedger}>\n  Bare trigger — opens the ledger\n</UnstyledButton>`,
    props: [
      { name: 'children', type: 'ReactNode', notes: 'Unstyled content; inherits surrounding font and color.' },
      { name: 'onClick', type: 'MouseEventHandler<HTMLButtonElement>', notes: 'Click handler for the bare button element.' },
      { name: 'disabled', type: 'boolean', notes: 'Disables interaction and dims to half opacity.' },
    ],
  },
  VisuallyHidden: {
    usage: `import { VisuallyHidden } from '@fargone/rite';\n\n<button type="button">\n  Read more\n  <VisuallyHidden> about the night survey, entry 12</VisuallyHidden>\n</button>`,
    props: [
      { name: 'children', type: 'ReactNode', notes: 'Extra screen-reader text clipped visually via sr-only.' },
    ],
  },
  WaffleChart: {
    usage: `import { WaffleChart } from '@fargone/rite';\n\n<WaffleChart value={63} total={100} label="Rite complete" />`,
    props: [
      { name: 'value', type: 'number', notes: 'Filled portion from 0 to 100; clamped before render.' },
      { name: 'total', type: 'number', default: '100', notes: 'Cell count; 100 gives the default 10 by 10 grid.' },
      { name: 'label', type: 'string', notes: 'Caption displayed after the percentage, such as a task name.' },
      { name: 'ariaLabel', type: 'string', notes: 'Defaults to a percent plus label summary for the chart.' },
    ],
  },
  WeekView: {
    usage: `import { WeekView } from '@fargone/rite';\n\nconst events = [\n  { id: 'w1', title: 'Standup', start: monday9am, end: monday10am },\n  { id: 'w2', title: 'Review', start: wed1pm, end: wed2pm },\n];\n\n<WeekView events={events} date={new Date()} />`,
    props: [
      { name: 'events', type: 'WeekViewEvent[]', notes: 'Entries with id, title, start, and end dates.' },
      { name: 'date', type: 'Date', notes: 'Anchor inside the week; defaults to today, Monday-first.' },
    ],
  },
  YearPicker: {
    usage: `import { YearPicker } from '@fargone/rite';\n\n<YearPicker value={year} onChange={setYear} />`,
    props: [
      { name: 'value', type: 'number | null', notes: 'Controlled selected year; null means no selection.' },
      { name: 'defaultValue', type: 'number | null', default: 'null', notes: 'Initial year for uncontrolled use.' },
      { name: 'onChange', type: '(year: number) => void', notes: 'Fires with the picked year cell.' },
      { name: 'decade', type: 'number', notes: 'Controlled decade anchor; any year inside it works.' },
      { name: 'defaultDecade', type: 'number', notes: 'Starting decade; falls back to value or current year.' },
      { name: 'onDecadeChange', type: '(decade: number) => void', notes: 'Fires when the prev or next decade arrow is pressed.' },
    ],
  },
  YearPickerInput: {
    usage: `import { YearPickerInput } from '@fargone/rite';\n\n<YearPickerInput\n  label="Vintage year"\n  description="Field with year dropdown."\n  value={year}\n  onChange={setYear}\n/>`,
    props: [
      { name: 'label', type: 'string', notes: 'Field label above the trigger button.' },
      { name: 'description', type: 'string', notes: 'Helper text; hidden when an error is shown.' },
      { name: 'error', type: 'string', notes: 'Displays an error message and applies the error style.' },
      { name: 'value', type: 'number | null', notes: 'Controlled year; null shows the placeholder.' },
      { name: 'defaultValue', type: 'number | null', default: 'null', notes: 'Initial year for uncontrolled use.' },
      { name: 'onChange', type: '(year: number | null) => void', notes: 'Pick sets the year; the clear action sends null.' },
      { name: 'placeholder', type: 'string', default: "'YYYY'", notes: 'Shown when no year is selected.' },
      { name: 'disabled', type: 'boolean', default: 'false', notes: 'Blocks opening the year dropdown.' },
    ],
  },
  YearView: {
    usage: `import { YearView } from '@fargone/rite';\n\nconst events = [\n  { id: 'y1', title: 'Winter filing', start: jan12, end: jan12 },\n  { id: 'y2', title: 'Spring survey', start: mar3, end: mar3 },\n];\n\n<YearView events={events} defaultYear={2026} />`,
    props: [
      { name: 'events', type: 'Event[]', notes: 'Entries with id, title, start, end, and optional resourceId.' },
      { name: 'year', type: 'number', notes: 'Controlled year; disables the prev and next arrows.' },
      { name: 'defaultYear', type: 'number', notes: 'Starting year for uncontrolled use; defaults to this year.' },
    ],
  },
};
