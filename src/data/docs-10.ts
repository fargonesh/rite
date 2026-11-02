export const docs10: Record<string, { usage: string; props: Array<{ name: string; type: string; default?: string; notes?: string }> }> = {
  Select: {
    usage: `import { Select } from '@fargone/rite';\n\n<Select\n  label="Rite"\n  data={['vesper', 'matins', 'compline']}\n  placeholder="Pick a rite..."\n  clearable\n/>`,
    props: [
      { name: 'data', type: 'SelectItem[]', default: "'—'", notes: 'Options as strings or value/label/disabled objects.' },
      { name: 'value', type: 'string | null', notes: 'Controlled selection; omit for uncontrolled use.' },
      { name: 'defaultValue', type: 'string | null', default: 'null', notes: 'Initial selection in uncontrolled mode.' },
      { name: 'onChange', type: '(value: string | null) => void', notes: 'Fired when an option is picked or cleared.' },
      { name: 'label', type: 'string', notes: 'Uppercase field label rendered above the trigger.' },
      { name: 'placeholder', type: 'string', default: "'Select…'", notes: 'Shown when nothing is selected.' },
      { name: 'clearable', type: 'boolean', default: 'false', notes: 'Shows an X button to clear the selection.' },
      { name: 'disabled', type: 'boolean', default: 'false', notes: 'Disables the trigger and dropdown.' },
    ],
  },
  SemiCircleProgress: {
    usage: `import { SemiCircleProgress } from '@fargone/rite';\n\n<SemiCircleProgress value={68} size={160} label="Build" />`,
    props: [
      { name: 'value', type: 'number', default: "'—'", notes: 'Progress 0-100; clamped and rounded for display.' },
      { name: 'size', type: 'number', default: '160', notes: 'Width in px; height derives from it.' },
      { name: 'label', type: 'string', notes: 'Caption under the gauge; also feeds aria-label.' },
    ],
  },
  SimpleGrid: {
    usage: `import { SimpleGrid } from '@fargone/rite';\n\n<SimpleGrid cols={3} gap="sm">\n  <div>One</div>\n  <div>Two</div>\n  <div>Three</div>\n</SimpleGrid>`,
    props: [
      { name: 'children', type: 'ReactNode', default: "'—'", notes: 'Grid cells rendered in order.' },
      { name: 'cols', type: '1 | 2 | 3 | 4 | 5 | 6', default: '3', notes: 'Column count via grid-cols classes.' },
      { name: 'gap', type: "'xs' | 'sm' | 'md' | 'lg'", default: "'md'", notes: 'Spacing between cells, xs tight to lg loose.' },
    ],
  },
  Skeleton: {
    usage: `import { Skeleton } from '@fargone/rite';\n\n<Skeleton width="60%" height={12} />\n<Skeleton lines={3} />\n<Skeleton width={40} height={40} animate={false} />`,
    props: [
      { name: 'width', type: 'string | number', notes: 'CSS width; numbers become px.' },
      { name: 'height', type: 'string | number', notes: 'Bar height; defaults to 12.' },
      { name: 'lines', type: 'number', default: '1', notes: 'Renders a stacked set; last line shortens to two thirds.' },
      { name: 'animate', type: 'boolean', default: 'true', notes: 'Toggles the pulse animation.' },
    ],
  },
  Slider: {
    usage: `import { Slider } from '@fargone/rite';\n\n<Slider label="Volume" min={0} max={100} defaultValue={33} />\n<Slider label="Threshold" value={70} showValue={false} />`,
    props: [
      { name: 'label', type: 'string', notes: 'Uppercase label shown above the track.' },
      { name: 'value', type: 'number', notes: 'Controlled value; omit for uncontrolled use.' },
      { name: 'defaultValue', type: 'number', default: '50', notes: 'Initial value in uncontrolled mode.' },
      { name: 'onChange', type: '(value: number) => void', notes: 'Fired with the numeric value on input.' },
      { name: 'min', type: 'number', default: '0', notes: 'Range floor.' },
      { name: 'max', type: 'number', default: '100', notes: 'Range ceiling.' },
      { name: 'step', type: 'number', default: '1', notes: 'Keyboard and drag increment.' },
      { name: 'showValue', type: 'boolean', default: 'true', notes: 'Shows the current value beside the label.' },
    ],
  },
  Space: {
    usage: `import { Space } from '@fargone/rite';\n\n<div>Above</div>\n<Space h="md" />\n<div>Below</div>`,
    props: [
      { name: 'h', type: "'xs' | 'sm' | 'md' | 'lg'", default: "'md'", notes: 'Vertical spacer height, md equals 16px.' },
      { name: 'w', type: "'xs' | 'sm' | 'md' | 'lg'", notes: 'Optional width for horizontal spacing.' },
      { name: 'className', type: 'string', notes: 'Extra classes merged onto the spacer.' },
    ],
  },
  Sparkline: {
    usage: `import { Sparkline } from '@fargone/rite';\n\n<Sparkline data={[4, 7, 5, 9, 8, 12]} />\n<Sparkline data={[15, 11, 9, 5, 4]} tone="blood" width={96} height={24} />`,
    props: [
      { name: 'data', type: 'number[]', default: "'—'", notes: 'Values plotted left to right; non-finite entries dropped.' },
      { name: 'width', type: 'number', default: '120', notes: 'SVG width in px.' },
      { name: 'height', type: 'number', default: '32', notes: 'SVG height in px.' },
      { name: 'tone', type: "'ink' | 'blood'", default: "'ink'", notes: 'Sets the chart color. Use the critical tone to highlight a falling or concerning trend.' },
    ],
  },
  Splitter: {
    usage: `import { Splitter } from '@fargone/rite';\n\n<Splitter\n  initialSplit={0.4}\n  first={<div>Pane A</div>}\n  second={<div>Pane B</div>}\n/>`,
    props: [
      { name: 'first', type: 'ReactNode', default: "'—'", notes: 'Left or top pane content.' },
      { name: 'second', type: 'ReactNode', default: "'—'", notes: 'Right or bottom pane content.' },
      { name: 'initialSplit', type: 'number', default: '0.5', notes: 'Starting ratio; clamped between 0.1 and 0.9.' },
      { name: 'direction', type: "'horizontal' | 'vertical'", default: "'horizontal'", notes: 'Pane arrangement; vertical stacks top over bottom.' },
    ],
  },
  Spoiler: {
    usage: `import { Spoiler } from '@fargone/rite';\n\n<Spoiler maxHeight={72} showLabel="Show more" hideLabel="Show less">\n  <p>Long field report text collapses here.</p>\n</Spoiler>`,
    props: [
      { name: 'children', type: 'ReactNode', default: "'—'", notes: 'Collapsible content.' },
      { name: 'maxHeight', type: 'number', default: '120', notes: 'Collapsed height in px before the fade.' },
      { name: 'showLabel', type: 'string', default: "'Show more'", notes: 'Expand button label.' },
      { name: 'hideLabel', type: 'string', default: "'Show less'", notes: 'Collapse button label.' },
    ],
  },
  Spotlight: {
    usage: `import { Spotlight } from '@fargone/rite';\n\n<Spotlight\n  opened={opened}\n  onClose={() => setOpened(false)}\n  placeholder="Type a command..."\n  actions={[{ label: 'Open dossier', hint: 'CTRL O', onSelect: pick }]}\n/>`,
    props: [
      { name: 'opened', type: 'boolean', default: "'—'", notes: 'Controls visibility; returns null when false.' },
      { name: 'onClose', type: '() => void', default: "'—'", notes: 'Called on Escape, backdrop click, or close key.' },
      { name: 'actions', type: 'SpotlightAction[]', default: "'—'", notes: 'Each action needs label, optional hint, and onSelect.' },
      { name: 'placeholder', type: 'string', default: "'Type a command…'", notes: 'Filter input placeholder.' },
    ],
  },
  Stack: {
    usage: `import { Stack } from '@fargone/rite';\n\n<Stack gap="sm" align="stretch">\n  <div>First row</div>\n  <div>Second row</div>\n  <div>Third row</div>\n</Stack>`,
    props: [
      { name: 'children', type: 'ReactNode', default: "'—'", notes: 'Vertically stacked items.' },
      { name: 'gap', type: "'xs' | 'sm' | 'md' | 'lg'", default: "'md'", notes: 'Vertical spacing between items.' },
      { name: 'justify', type: "CSSProperties['justifyContent']", notes: 'Maps to justify-content on the flex column.' },
      { name: 'align', type: "CSSProperties['alignItems']", default: "'stretch'", notes: 'Maps to align-items on the flex column.' },
    ],
  },
  Stepper: {
    usage: `import { Stepper } from '@fargone/rite';\n\n<Stepper\n  active={1}\n  onStepClick={setActive}\n  steps={[{ label: 'Filed' }, { label: 'Surveyed' }, { label: 'Sealed' }]}\n/>`,
    props: [
      { name: 'steps', type: 'StepperStep[]', default: "'—'", notes: 'Each step has label plus optional description.' },
      { name: 'active', type: 'number', default: "'—'", notes: 'Zero-based index of the current step.' },
      { name: 'onStepClick', type: '(index: number) => void', notes: 'Makes steps clickable buttons when provided.' },
    ],
  },
  SunburstChart: {
    usage: `import { SunburstChart } from '@fargone/rite';\n\n<SunburstChart\n  size={220}\n  data={[{ label: 'Vigil', value: 40 }, { label: 'Foundry', value: 30 }]}\n/>`,
    props: [
      { name: 'data', type: 'SunburstDatum[]', default: "'—'", notes: 'Top segments with optional one-level children.' },
      { name: 'size', type: 'number', default: '220', notes: 'Square SVG size in px.' },
      { name: 'ariaLabel', type: 'string', default: "'Sunburst chart'", notes: 'Accessible name for the chart figure.' },
    ],
  },
  Switch: {
    usage: `import { Switch } from '@fargone/rite';\n\n<Switch label="Notifications" checked={on} onCheckedChange={setOn} />\n<Switch label="Uncontrolled" defaultChecked={false} />`,
    props: [
      { name: 'checked', type: 'boolean', notes: 'Controlled state; omit for uncontrolled use.' },
      { name: 'defaultChecked', type: 'boolean', notes: 'Initial state in uncontrolled mode.' },
      { name: 'onCheckedChange', type: '(checked: boolean) => void', notes: 'Fired with the new checked value.' },
      { name: 'label', type: 'string', notes: 'Uppercase label beside the track.' },
      { name: 'disabled', type: 'boolean', notes: 'Dims the control and blocks input.' },
    ],
  },
  Table: {
    usage: `import { Table } from '@fargone/rite';\n\n<Table\n  caption="Exhibit ledger"\n  striped\n  head={['Ref', 'Subject', 'Status']}\n  body={[['V-001', 'Ink slab', 'Filed']]}\n/>`,
    props: [
      { name: 'head', type: 'string[]', default: "'—'", notes: 'Column headers rendered as scope col cells.' },
      { name: 'body', type: '(string | number)[][]', default: "'—'", notes: 'Rows of cell values in header order.' },
      { name: 'caption', type: 'string', notes: 'Caption displayed above the table.' },
      { name: 'striped', type: 'boolean', default: 'false', notes: 'Applies alternating backgrounds to rows.' },
    ],
  },
};
