export const docs11: Record<string, { usage: string; props: Array<{ name: string; type: string; default?: string; notes?: string }> }> = {
  Table: {
    usage: `import { Table } from '@fargone/rite';\n\n<Table\n  caption="Exhibit ledger"\n  striped\n  head={['Ref', 'Subject', 'Status']}\n  body={[['V-001', 'Ink slab', 'Filed'], ['V-002', 'Hairline grid', 'Open']]}\n/>`,
    props: [
      { name: 'head', type: 'string[]', default: '—', notes: 'Column headings, one per column.' },
      { name: 'body', type: '(string | number)[][]', default: '—', notes: 'Rows of cells matching head length.' },
      { name: 'caption', type: 'string', default: '—', notes: 'Caption displayed above the table.' },
      { name: 'striped', type: 'boolean', default: 'false', notes: 'Applies alternating backgrounds to rows.' },
    ],
  },
  Tabs: {
    usage: `import { Tabs } from '@fargone/rite';\n\n<Tabs\n  defaultValue="brief"\n  tabs={[\n    { value: 'brief', label: 'Brief', content: 'Survey the north line at dawn.' },\n    { value: 'assets', label: 'Assets', content: 'Lantern, cord, ledger.' },\n  ]}\n/>`,
    props: [
      { name: 'tabs', type: 'TabItem[]', default: '—', notes: 'Each item needs value, label, and content.' },
      { name: 'value', type: 'string', default: '—', notes: 'Controlled active tab value.' },
      { name: 'defaultValue', type: 'string', default: '—', notes: 'Uncontrolled initial tab; falls back to first tab.' },
      { name: 'onChange', type: '(value: string) => void', default: '—', notes: 'Fires on tab select, including arrow-key moves.' },
    ],
  },
  TagsInput: {
    usage: `import { TagsInput } from '@fargone/rite';\n\n<TagsInput\n  label="Sigils"\n  value={tags}\n  onChange={setTags}\n  placeholder="Type + Enter…"\n/>`,
    props: [
      { name: 'label', type: 'string', default: '—', notes: 'Uppercase mono label above the box.' },
      { name: 'value', type: 'string[]', default: '—', notes: 'Controlled tag list.' },
      { name: 'defaultValue', type: 'string[]', default: '[]', notes: 'Uncontrolled initial tags.' },
      { name: 'onChange', type: '(value: string[]) => void', default: '—', notes: 'Fires on commit (Enter/comma/blur) or remove.' },
      { name: 'placeholder', type: 'string', default: "'Type + Enter…'", notes: 'Shown only while the list is empty.' },
      { name: 'error', type: 'string', default: '—', notes: 'Displays an error message below the field and applies the error style.' },
      { name: 'disabled', type: 'boolean', default: 'false', notes: 'Locks typing and tag removal.' },
    ],
  },
  Textarea: {
    usage: `import { Textarea } from '@fargone/rite';\n\n<Textarea\n  label="Epitaph"\n  fileNo="F-014"\n  rows={4}\n  placeholder="Carve the record…"\n  description="Fixed rows. Set rows to resize the rite."\n/>`,
    props: [
      { name: 'label', type: 'string', default: '—', notes: 'REQ-prefixed mono label.' },
      { name: 'description', type: 'string', default: '—', notes: 'Helper line; hidden when error is set.' },
      { name: 'error', type: 'string', default: '—', notes: 'Displays an error message and applies the error style.' },
      { name: 'fileNo', type: 'string', default: '—', notes: 'Right-aligned reference tag beside the label.' },
      { name: 'rows', type: 'number', default: '4', notes: 'Visible text rows; still resizable vertically.' },
    ],
  },
  TextInput: {
    usage: `import { TextInput } from '@fargone/rite';\n\n<TextInput\n  label="Witness"\n  fileNo="F-001"\n  placeholder="Name the witness"\n  description="Filed under the parish ledger."\n/>`,
    props: [
      { name: 'label', type: 'string', default: '—', notes: 'REQ-prefixed mono label.' },
      { name: 'description', type: 'string', default: '—', notes: 'Helper line; hidden when error is set.' },
      { name: 'error', type: 'string', default: '—', notes: 'Displays an error message and applies the error style.' },
      { name: 'fileNo', type: 'string', default: '—', notes: 'Right-aligned reference tag beside the label.' },
      { name: 'placeholder', type: 'string', default: '—', notes: 'Sans hint inside the prompt-style field.' },
      { name: 'disabled', type: 'boolean', default: '—', notes: 'Dims the field via native disabled passthrough.' },
    ],
  },
  Text: {
    usage: `import { Text } from '@fargone/rite';\n\n<Text size="sm" dimmed>\n  Small and dimmed for secondary copy and asides.\n</Text>`,
    props: [
      { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", default: "'md'", notes: 'Type scale from caption to lead paragraph.' },
      { name: 'dimmed', type: 'boolean', default: '—', notes: 'Reduces contrast for secondary text.' },
      { name: 'truncate', type: 'boolean', default: '—', notes: 'Single-line ellipsis overflow.' },
      { name: 'italic', type: 'boolean', default: '—', notes: 'Switches to Garamond italic whisper voice.' },
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Paragraph content.' },
    ],
  },
  ThemeIcon: {
    usage: `import { ThemeIcon } from '@fargone/rite';\nimport { Circle } from 'lucide-react';\n\n<ThemeIcon variant="soft" color="blood" size="md">\n  <Circle size={14} aria-hidden />\n</ThemeIcon>`,
    props: [
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", notes: 'Square slab from 7 to 12 units.' },
      { name: 'variant', type: "'solid' | 'soft' | 'outline'", default: "'solid'", notes: 'Fill weight; soft suits inline warnings.' },
      { name: 'color', type: "'zinc' | 'blood'", default: "'zinc'", notes: 'Sets the icon color. Use the accent color to emphasize destructive or alert states.' },
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Icon displayed in the component. Solid zinc adapts to dark mode.' },
    ],
  },
  TimeGrid: {
    usage: `import { TimeGrid } from '@fargone/rite';\n\n<TimeGrid\n  value={time}\n  onChange={setTime}\n  columns={3}\n  options={['08:00', '09:00', '10:30', '12:00']}\n/>`,
    props: [
      { name: 'value', type: 'string', default: '—', notes: 'Controlled HH:MM selection.' },
      { name: 'defaultValue', type: 'string', default: "'09:00'", notes: 'Uncontrolled initial slot.' },
      { name: 'onChange', type: '(value: string) => void', default: '—', notes: 'Fires with the picked HH:MM slot.' },
      { name: 'options', type: 'string[]', default: 'half-hour day', notes: 'Slot list; defaults to 48 half-hour entries.' },
      { name: 'columns', type: 'number', default: '3', notes: 'Grid columns, clamped to at least 1.' },
    ],
  },
  TimeInput: {
    usage: `import { TimeInput } from '@fargone/rite';\n\n<TimeInput\n  label="Bell time"\n  value={time}\n  onChange={setTime}\n/>`,
    props: [
      { name: 'label', type: 'string', default: '—', notes: 'REQ-prefixed mono label.' },
      { name: 'value', type: 'string', default: '—', notes: 'Controlled HH:MM value.' },
      { name: 'defaultValue', type: 'string', default: "''", notes: 'Uncontrolled initial value.' },
      { name: 'onChange', type: '(value: string) => void', default: '—', notes: 'Fires on typing and stepper nudges.' },
      { name: 'error', type: 'string', default: '—', notes: 'Displays an error message and applies the error style.' },
      { name: 'disabled', type: 'boolean', default: '—', notes: 'Locks typing and both steppers.' },
    ],
  },
  Timeline: {
    usage: `import { Timeline } from '@fargone/rite';\n\n<Timeline\n  items={[\n    { title: 'Dossier filed', time: '09:41', text: 'Exhibit logged.' },\n    { title: 'Sealed in blood', time: 'Now', text: 'Awaiting signature.', active: true },\n  ]}\n/>`,
    props: [
      { name: 'items', type: 'TimelineItem[]', default: '—', notes: 'Ordered entries rendered oldest to newest.' },
      { name: 'items[].title', type: 'string', default: '—', notes: 'Required entry heading.' },
      { name: 'items[].time', type: 'string', default: '—', notes: 'Mono timestamp above the title.' },
      { name: 'items[].text', type: 'string', default: '—', notes: 'Secondary description under the title.' },
      { name: 'items[].active', type: 'boolean', default: '—', notes: 'Highlights the current entry.' },
    ],
  },
  TimePicker: {
    usage: `import { TimePicker } from '@fargone/rite';\n\n<TimePicker\n  label="Vigil hour"\n  value={time}\n  onChange={setTime}\n  step={30}\n/>`,
    props: [
      { name: 'label', type: 'string', default: '—', notes: 'REQ-prefixed mono label.' },
      { name: 'value', type: 'string', default: '—', notes: 'Controlled HH:MM selection.' },
      { name: 'defaultValue', type: 'string', default: "''", notes: 'Uncontrolled initial selection.' },
      { name: 'onChange', type: '(value: string) => void', default: '—', notes: 'Fires on option pick and closes the list.' },
      { name: 'step', type: 'number', default: '30', notes: 'Minute interval; falls back to 30 when out of range.' },
    ],
  },
  TimeValue: {
    usage: `import { TimeValue } from '@fargone/rite';\n\n<TimeValue value="14:45" format="12h" />`,
    props: [
      { name: 'value', type: 'string | Date', default: '—', notes: 'Strings accept HH:MM with optional seconds; invalid renders --:--.' },
      { name: 'format', type: "'12h' | '24h'", default: "'24h'", notes: 'Hour cycle for the rendered time element.' },
      { name: 'className', type: 'string', default: '—', notes: 'Extra styling on the inline time wrapper.' },
    ],
  },
  Title: {
    usage: `import { Title } from '@fargone/rite';\n\n<Title order={2}>\n  The rite begins at midnight\n</Title>`,
    props: [
      { name: 'order', type: '1 | 2 | 3 | 4 | 5 | 6', default: '2', notes: 'Renders h1-h6; order 6 is a mono eyebrow.' },
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Heading content.' },
      { name: 'className', type: 'string', default: '—', notes: 'Extra styling on the heading element.' },
    ],
  },
  Toggle: {
    usage: `import { Toggle } from '@fargone/rite';\n\n<Toggle pressed={witnessed} onChange={setWitnessed}>\n  Witnessed\n</Toggle>`,
    props: [
      { name: 'pressed', type: 'boolean', default: '—', notes: 'Controlled on state mirrored to aria-pressed.' },
      { name: 'defaultPressed', type: 'boolean', default: 'false', notes: 'Uncontrolled initial state.' },
      { name: 'onChange', type: '(pressed: boolean) => void', default: '—', notes: 'Fires with the next pressed value.' },
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Button label.' },
      { name: 'disabled', type: 'boolean', default: 'false', notes: 'Dims and blocks toggling.' },
    ],
  },
  Toolbar: {
    usage: `import { Toolbar } from '@fargone/rite';\nimport { Bold, Italic } from 'lucide-react';\n\n<Toolbar\n  groups={[{ id: 'style', items: [\n    { label: 'Bold', icon: <Bold size={14} aria-hidden />, active: true },\n    { label: 'Italic', icon: <Italic size={14} aria-hidden /> },\n  ] }]}\n/>`,
    props: [
      { name: 'groups', type: 'ToolbarGroup[]', default: '—', notes: 'Hairline-separated groups of icon buttons.' },
      { name: 'groups[].id', type: 'string', default: '—', notes: 'Group key used for roving tabindex and aria-label.' },
      { name: 'item.label', type: 'string', default: '—', notes: 'Accessible name; first letter is the icon fallback.' },
      { name: 'item.icon', type: 'ReactNode', default: '—', notes: 'Optional icon. If omitted, the control displays a letter.' },
      { name: 'item.active', type: 'boolean', default: '—', notes: 'Applies the active style to a selected format.' },
      { name: 'label', type: 'string', default: "'Formatting toolbar'", notes: 'aria-label for the toolbar region.' },
    ],
  },
};
