export const docs4: Record<string, { usage: string; props: Array<{ name: string; type: string; default?: string; notes?: string }> }> = {
  DataList: {
    usage: `import { DataList } from '@fargone/rite';\n\n<DataList\n  striped\n  items={[\n    { label: 'ref', value: 'VES-1147' },\n    { label: 'status', value: 'Witnessed' },\n  ]}\n/>`,
    props: [
      { name: 'items', type: 'DataListItem[]', default: '—', notes: 'Required rows; each item is { label, value }.' },
      { name: 'striped', type: 'boolean', default: 'false', notes: 'Applies alternating backgrounds to rows.' },
      { name: 'className', type: 'string', notes: 'Extra wrapper classes for width or margin.' },
    ],
  },
  DateInput: {
    usage: `import { DateInput } from '@fargone/rite';\n\n<DateInput\n  label="Rite date"\n  description="Format YYYY-MM-DD."\n  placeholder="YYYY-MM-DD"\n  onChange={(date) => console.log(date)}\n/>`,
    props: [
      { name: 'label', type: 'string', notes: 'Uppercase mono caption rendered above the field.' },
      { name: 'value', type: 'Date | null', notes: 'Controlled date; omit for uncontrolled use.' },
      { name: 'defaultValue', type: 'Date | null', default: 'null', notes: 'Initial date for uncontrolled use.' },
      { name: 'onChange', type: '(value: Date | null) => void', notes: 'Fires on blur or Enter with a parsed date.' },
      { name: 'placeholder', type: 'string', default: "'YYYY-MM-DD'", notes: 'Hint shown when the field is empty.' },
      { name: 'disabled', type: 'boolean', default: 'false', notes: 'Greys out the field and blocks commits.' },
      { name: 'error', type: 'string', notes: 'Overrides parse error with a custom message.' },
    ],
  },
  DatePicker: {
    usage: `import { DatePicker } from '@fargone/rite';\n\n<DatePicker\n  value={day}\n  onChange={setDay}\n  minDate={lo}\n  maxDate={hi}\n/>`,
    props: [
      { name: 'value', type: 'Date | null', notes: 'Controlled selected day; clicking it again clears.' },
      { name: 'defaultValue', type: 'Date | null', default: 'null', notes: 'Initial day for uncontrolled use.' },
      { name: 'onChange', type: '(date: Date | null) => void', notes: 'Called with the new day or null.' },
      { name: 'minDate', type: 'Date', notes: 'Days before this are disabled.' },
      { name: 'maxDate', type: 'Date', notes: 'Days after this are disabled.' },
    ],
  },
  DatePickerInput: {
    usage: `import { DatePickerInput } from '@fargone/rite';\n\n<DatePickerInput\n  label="Rite date"\n  value={day}\n  onChange={setDay}\n  placeholder="YYYY-MM-DD"\n/>`,
    props: [
      { name: 'label', type: 'string', notes: 'Mono caption with a REQ marker.' },
      { name: 'value', type: 'Date | null', notes: 'Controlled date shown in the trigger button.' },
      { name: 'defaultValue', type: 'Date | null', default: 'null', notes: 'Initial date for uncontrolled use.' },
      { name: 'onChange', type: '(date: Date | null) => void', notes: 'Commits a calendar pick and closes the popup.' },
      { name: 'placeholder', type: 'string', default: "'YYYY-MM-DD'", notes: 'Shown when nothing is selected.' },
      { name: 'error', type: 'string', notes: 'Adds invalid styling and an ERR message.' },
    ],
  },
  DateTimePicker: {
    usage: `import { DateTimePicker } from '@fargone/rite';\n\n<DateTimePicker\n  label="Rite schedule"\n  value={stamp}\n  onChange={setStamp}\n  placeholder="Select date + time"\n/>`,
    props: [
      { name: 'label', type: 'string', notes: 'Caption with a REQ marker above the trigger.' },
      { name: 'value', type: 'Date | null', notes: 'Controlled datetime committed via Done.' },
      { name: 'defaultValue', type: 'Date | null', default: 'null', notes: 'Initial datetime for uncontrolled use.' },
      { name: 'onChange', type: '(value: Date | null) => void', notes: 'Fires on Done confirm or Clear.' },
      { name: 'disabled', type: 'boolean', notes: 'Blocks opening the calendar panel.' },
      { name: 'placeholder', type: 'string', default: "'Select date + time'", notes: 'Shown when no datetime is committed.' },
      { name: 'error', type: 'string', notes: 'Displays an error message and applies the error style.' },
    ],
  },
  DayView: {
    usage: `import { DayView } from '@fargone/rite';\n\n<DayView\n  date={new Date(2026, 10, 2)}\n  events={[\n    { id: 'd1', title: 'Standup', start: at(9), end: at(9, 30) },\n    { id: 'd2', title: 'Review', start: at(15, 30), end: at(16, 30) },\n  ]}\n/>`,
    props: [
      { name: 'events', type: 'DayViewEvent[]', default: '—', notes: 'Required; each event needs id, title, start, end.' },
      { name: 'date', type: 'Date', notes: 'Day to render; defaults to today with a red now-line.' },
      { name: 'className', type: 'string', notes: 'Extra classes for the outer bordered panel.' },
    ],
  },
  Dialog: {
    usage: `import { Dialog } from '@fargone/rite';\n\n<button type="button" onClick={() => setOpened(true)}>\n  Open note\n</button>\n<Dialog opened={opened} onClose={() => setOpened(false)} title="Dossier note">\n  Page beneath stays interactive.\n</Dialog>`,
    props: [
      { name: 'opened', type: 'boolean', default: '—', notes: 'Required; renders nothing when false.' },
      { name: 'onClose', type: '() => void', notes: 'Adds the dismiss button when provided.' },
      { name: 'title', type: 'string', notes: 'Header label and aria-label; defaults to Notice.' },
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Required body content of the panel.' },
    ],
  },
  Divider: {
    usage: `import { Divider } from '@fargone/rite';\n\n<Divider label="FILE 02 / 09" />\n<div className="flex h-10 items-stretch">\n  <span>LEFT</span>\n  <Divider orientation="vertical" />\n  <span>RIGHT</span>\n</div>`,
    props: [
      { name: 'label', type: 'string', notes: 'Centered caption between two rules; omit for a plain rule.' },
      { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", notes: 'Vertical renders a self-stretching 1px column.' },
      { name: 'className', type: 'string', notes: 'Extra spacing or color overrides.' },
    ],
  },
  DonutChart: {
    usage: `import { DonutChart } from '@fargone/rite';\n\n<DonutChart\n  data={[\n    { label: 'Bound', value: 42, tone: 'ink' },\n    { label: 'Loose', value: 18, tone: 'dim' },\n    { label: 'Missing', value: 7, tone: 'blood' },\n  ]}\n  size={180}\n/>`,
    props: [
      { name: 'data', type: 'DonutChartDatum[]', default: '—', notes: 'Required slices; each is { label, value, tone }.' },
      { name: 'size', type: 'number', default: '180', notes: 'SVG width and height; height prop is an alias.' },
      { name: 'thickness', type: 'number', default: '22', notes: 'Stroke width of the ring segments.' },
      { name: 'height', type: 'number', notes: 'Alias for size so radial charts share prop shape.' },
      { name: 'ariaLabel', type: 'string', default: "'Donut chart'", notes: 'Accessible label for the svg figure.' },
    ],
  },
  Drawer: {
    usage: `import { Drawer } from '@fargone/rite';\n\n<button type="button" onClick={() => setOpened(true)}>\n  Open drawer\n</button>\n<Drawer opened={opened} onClose={() => setOpened(false)} title="SIDE FILE" position="right">\n  Esc or backdrop click invokes onClose.\n</Drawer>`,
    props: [
      { name: 'opened', type: 'boolean', default: '—', notes: 'Required; renders nothing when false.' },
      { name: 'onClose', type: '() => void', default: '—', notes: 'Required; wired to Esc key and backdrop click.' },
      { name: 'title', type: 'string', notes: 'Header label and dialog aria-label.' },
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Required scrollable panel body.' },
      { name: 'position', type: "'left' | 'right'", default: "'right'", notes: 'Which screen edge the panel docks to.' },
    ],
  },
  Dropzone: {
    usage: `import { Dropzone } from '@fargone/rite';\n\n<Dropzone\n  label="Drop evidence or click to browse"\n  accept=".pdf,.png"\n  multiple\n  onDrop={(files) => console.log(files.length)}\n/>`,
    props: [
      { name: 'onDrop', type: '(files: File[]) => void', default: '—', notes: 'Required; receives dropped or browsed files.' },
      { name: 'accept', type: 'string', notes: 'Native file accept filter passed to the input.' },
      { name: 'multiple', type: 'boolean', default: 'true', notes: 'Allow selecting more than one file.' },
      { name: 'label', type: 'string', notes: 'Drop hint; defaults to Drop files or click to browse.' },
    ],
  },
  EmptyState: {
    usage: `import { EmptyState } from '@fargone/rite';\n\n<EmptyState\n  title="NO RECORDS FOUND"\n  description="No entries match this filter."\n  action={<button type="button">Clear filter</button>}\n/>`,
    props: [
      { name: 'title', type: 'string', default: '—', notes: 'Required uppercase headline of the panel.' },
      { name: 'description', type: 'string', notes: 'Smaller helper text under the headline.' },
      { name: 'icon', type: 'ReactNode', default: 'CircleDashed icon', notes: 'Centered glyph above the title.' },
      { name: 'action', type: 'ReactNode', notes: 'Call-to-action slot, usually a button.' },
    ],
  },
  Fieldset: {
    usage: `import { Fieldset } from '@fargone/rite';\n\n<Fieldset legend="Identity">\n  <label>Callsign<input type="text" placeholder="VES-001" /></label>\n  <label>Sector<input type="text" placeholder="North" /></label>\n</Fieldset>`,
    props: [
      { name: 'legend', type: 'string', default: '—', notes: 'Required section caption with a REQ marker.' },
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Required grouped inputs stacked with gaps.' },
      { name: 'disabled', type: 'boolean', default: 'false', notes: 'Disables all nested fields and dims the frame.' },
    ],
  },
  FileButton: {
    usage: `import { FileButton } from '@fargone/rite';\n\n<FileButton accept=".txt,.md" multiple onChange={(files) => console.log(files)}>\n  <button type="button">Choose files</button>\n</FileButton>`,
    props: [
      { name: 'onChange', type: '(files: FileList | null) => void', default: '—', notes: 'Required; receives the picked files and resets input.' },
      { name: 'accept', type: 'string', notes: 'File-type filter such as .txt,.md.' },
      { name: 'multiple', type: 'boolean', default: 'false', notes: 'Allow picking more than one file.' },
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Required single trigger element that opens the picker.' },
    ],
  },
  FileInput: {
    usage: `import { FileInput } from '@fargone/rite';\n\n<FileInput\n  label="Exhibit"\n  description="PDF or image, one file"\n  placeholder="Select exhibit..."\n  accept=".pdf,.png"\n  onChange={(files) => console.log(files)}\n/>`,
    props: [
      { name: 'label', type: 'string', notes: 'Caption rendered above the browse row.' },
      { name: 'accept', type: 'string', notes: 'Native accept filter for the hidden input.' },
      { name: 'multiple', type: 'boolean', default: 'false', notes: 'Join picked names with commas when true.' },
      { name: 'value', type: 'FileList | null', notes: 'Controlled files; omit for uncontrolled use.' },
      { name: 'onChange', type: '(files: FileList | null) => void', notes: 'Fires when the user picks files.' },
      { name: 'placeholder', type: 'string', default: "'No file chosen'", notes: 'Shown when no file is selected.' },
      { name: 'error', type: 'string', notes: 'Red border plus an alert message.' },
      { name: 'disabled', type: 'boolean', default: 'false', notes: 'Blocks the picker and dims the row.' },
    ],
  },
};
