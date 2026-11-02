export const docs9: Record<string, { usage: string; props: Array<{ name: string; type: string; default?: string; notes?: string }> }> = {
  RangeSlider: {
    usage: `import { RangeSlider } from '@fargone/rite';\n\n<RangeSlider label="Price band" min={0} max={200} defaultValue={[40, 140]} />`,
    props: [
      { name: 'value', type: '[number, number]', default: '—', notes: 'Controlled tuple; clamped to min/max and ordered.' },
      { name: 'defaultValue', type: '[number, number]', default: '[20, 80]', notes: 'Initial tuple when uncontrolled.' },
      { name: 'onChange', type: '(value: [number, number]) => void', default: '—', notes: 'Fires with the clamped tuple on either thumb.' },
      { name: 'min', type: 'number', default: '0', notes: 'Lower bound of the track.' },
      { name: 'max', type: 'number', default: '100', notes: 'Upper bound of the track.' },
      { name: 'step', type: 'number', default: '1', notes: 'Increment for both range inputs.' },
      { name: 'label', type: 'string', default: '—', notes: 'Caption shown above the track with live values.' },
      { name: 'disabled', type: 'boolean', default: 'false', notes: 'Disables both thumbs and dims the track.' },
    ],
  },
  Rating: {
    usage: `import { Rating } from '@fargone/rite';\n\n<Rating value={3} onChange={(v) => console.log(v)} count={5} />`,
    props: [
      { name: 'value', type: 'number', default: '—', notes: 'Controlled rating; hover previews without committing.' },
      { name: 'defaultValue', type: 'number', default: '0', notes: 'Initial rating when uncontrolled.' },
      { name: 'onChange', type: '(value: number) => void', default: '—', notes: 'Called with the selected star (1-based).' },
      { name: 'count', type: 'number', default: '5', notes: 'How many stars to render.' },
      { name: 'disabled', type: 'boolean', default: 'false', notes: 'Blocks selection and dims the row.' },
    ],
  },
  ResourcesDayView: {
    usage: `import { ResourcesDayView } from '@fargone/rite';\n\nconst resources = [{ id: 'r1', label: 'Room A' }];\nconst events = [{ id: 'd1', title: 'Standup', start: new Date(2026, 10, 4, 9), end: new Date(2026, 10, 4, 9, 30), resourceId: 'r1' }];\n\n<ResourcesDayView events={events} resources={resources} date={new Date(2026, 10, 4)} />`,
    props: [
      { name: 'events', type: 'Event[]', default: '—', notes: 'Bookings with id, title, start, end, and optional resourceId.' },
      { name: 'resources', type: 'Resource[]', default: '—', notes: 'Columns with id and label; empty list shows a notice.' },
      { name: 'date', type: 'Date', default: '—', notes: 'Day to render; defaults to today when omitted.' },
    ],
  },
  ResourcesMonthView: {
    usage: `import { ResourcesMonthView } from '@fargone/rite';\n\nconst resources = [{ id: 'r1', label: 'Room A' }, { id: 'r2', label: 'Room B' }];\n\n<ResourcesMonthView events={events} resources={resources} month={new Date(2026, 10, 1)} />`,
    props: [
      { name: 'events', type: 'Event[]', default: '—', notes: 'Bookings with id, title, start, end, and optional resourceId.' },
      { name: 'resources', type: 'Resource[]', default: '—', notes: 'One lane per resource; empty list shows a notice.' },
      { name: 'month', type: 'Date', default: '—', notes: 'Any date in the month to render; defaults to today.' },
    ],
  },
  ResourcesSchedule: {
    usage: `import { ResourcesSchedule } from '@fargone/rite';\n\nconst resources = [{ id: 'r1', label: 'Room A' }, { id: 'r2', label: 'Room B' }];\n\n<ResourcesSchedule events={events} resources={resources} defaultView="week" />`,
    props: [
      { name: 'events', type: 'Event[]', default: '—', notes: 'Bookings with id, title, start, end, and optional resourceId.' },
      { name: 'resources', type: 'Resource[]', default: '—', notes: 'Lanes rendered in day, week, and month layouts.' },
      { name: 'view', type: "'day' | 'week' | 'month'", default: '—', notes: 'Controlled view; locks the tab switcher when set.' },
      { name: 'defaultView', type: "'day' | 'week' | 'month'", default: "'week'", notes: 'Initial view when uncontrolled.' },
    ],
  },
  ResourcesWeekView: {
    usage: `import { ResourcesWeekView } from '@fargone/rite';\n\nconst resources = [{ id: 'r1', label: 'Room A' }, { id: 'r2', label: 'Room B' }];\n\n<ResourcesWeekView events={events} resources={resources} date={new Date(2026, 10, 4)} />`,
    props: [
      { name: 'events', type: 'Event[]', default: '—', notes: 'Bookings with id, title, start, end, and optional resourceId.' },
      { name: 'resources', type: 'Resource[]', default: '—', notes: 'One row per resource across the 7-day grid.' },
      { name: 'date', type: 'Date', default: '—', notes: 'Anchor date; week starts Sunday. Defaults to today.' },
    ],
  },
  RichTextEditor: {
    usage: `import { RichTextEditor } from '@fargone/rite';\n\n<RichTextEditor label="Exhibit notes" defaultValue="Night watch log." onChange={(v) => console.log(v)} />`,
    props: [
      { name: 'value', type: 'string', default: '—', notes: 'Controlled markdown text.' },
      { name: 'defaultValue', type: 'string', default: "''", notes: 'Initial text when uncontrolled.' },
      { name: 'onChange', type: '(value: string) => void', default: '—', notes: 'Fires on typing and on every toolbar mark.' },
      { name: 'label', type: 'string', default: '—', notes: 'Caption above the editor frame.' },
    ],
  },
  RingProgress: {
    usage: `import { RingProgress } from '@fargone/rite';\n\n<RingProgress value={62} size={80} thickness={8} label="Active" />`,
    props: [
      { name: 'value', type: 'number', default: '—', notes: 'Percentage complete, clamped to 0–100. Values of 90 or higher use the critical color.' },
      { name: 'size', type: 'number', default: '80', notes: 'SVG width/height in px; ring scales from it.' },
      { name: 'thickness', type: 'number', default: '8', notes: 'Stroke width of track and progress arcs.' },
      { name: 'label', type: 'string', default: '—', notes: 'Caption under the ring.' },
    ],
  },
  RollingNumber: {
    usage: `import { RollingNumber } from '@fargone/rite';\n\n<RollingNumber value={128} digits={5} />`,
    props: [
      { name: 'value', type: 'number | string', default: '—', notes: 'Number to display; each digit rolls on change.' },
      { name: 'digits', type: 'number', default: '—', notes: 'Minimum width; pads with leading zeros.' },
      { name: 'className', type: 'string', default: '—', notes: 'Appended to the reel wrapper for sizing.' },
    ],
  },
  SankeyChart: {
    usage: `import { SankeyChart } from '@fargone/rite';\n\nconst nodes = ['Coven', 'Archive', 'Vault'];\nconst links = [{ from: 0, to: 2, value: 42 }];\n\n<SankeyChart nodes={nodes} links={links} height={220} />`,
    props: [
      { name: 'nodes', type: 'string[]', default: '—', notes: 'Labels; links reference them by index.' },
      { name: 'links', type: 'SankeyChartLink[]', default: '—', notes: 'Flows shaped as from, to, and value.' },
      { name: 'height', type: 'number', default: '220', notes: 'SVG height; width is fluid via viewBox.' },
      { name: 'ariaLabel', type: 'string', default: '—', notes: 'Override for the generated flow description.' },
    ],
  },
  ScatterChart: {
    usage: `import { ScatterChart } from '@fargone/rite';\n\nconst data = [{ x: 1, y: 4, label: 'A' }, { x: 4, y: 11, label: 'D' }];\n\n<ScatterChart data={data} height={180} />`,
    props: [
      { name: 'data', type: 'ScatterDatum[]', default: '—', notes: 'Points shaped as x, y, and optional label.' },
      { name: 'height', type: 'number', default: '180', notes: 'SVG height; width is fluid via viewBox.' },
      { name: 'className', type: 'string', default: '—', notes: 'Appended to the svg for tone overrides.' },
    ],
  },
  Schedule: {
    usage: `import { Schedule } from '@fargone/rite';\n\nconst events = [{ id: 'e1', title: 'Standup', start: new Date(2026, 10, 4, 9), end: new Date(2026, 10, 4, 9, 30) }];\n\n<Schedule events={events} defaultView="week" onViewChange={(v) => console.log(v)} />`,
    props: [
      { name: 'events', type: 'ScheduleEvent[]', default: '—', notes: 'Entries with id, title, start, and end.' },
      { name: 'view', type: "'day' | 'week' | 'month'", default: '—', notes: 'Controlled view; pairs with onViewChange.' },
      { name: 'defaultView', type: "'day' | 'week' | 'month'", default: "'week'", notes: 'Initial view when uncontrolled.' },
      { name: 'onViewChange', type: '(view: ScheduleView) => void', default: '—', notes: 'Fires when the day/week/month tab is picked.' },
      { name: 'date', type: 'Date', default: '—', notes: 'Controlled anchor date for the visible range.' },
      { name: 'defaultDate', type: 'Date', default: '—', notes: 'Initial anchor date; defaults to today.' },
    ],
  },
  ScrollArea: {
    usage: `import { ScrollArea } from '@fargone/rite';\n\n<ScrollArea height={200}>\n  <p>Line one of the record.</p>\n  <p>Line two of the record.</p>\n</ScrollArea>`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Scrollable content inside the framed pane.' },
      { name: 'height', type: 'number', default: '200', notes: 'Fixed viewport height in px; overflow scrolls.' },
      { name: 'className', type: 'string', default: '—', notes: 'Appended to the outer frame.' },
    ],
  },
  Scroller: {
    usage: `import { Scroller } from '@fargone/rite';\n\n<Scroller label="Dossiers / 008">\n  <div>Card one</div>\n  <div>Card two</div>\n</Scroller>`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Horizontal cards scrolled by the arrow buttons.' },
      { name: 'label', type: 'string', default: "'Scroller'", notes: 'Header caption above the scroll lane.' },
      { name: 'className', type: 'string', default: '—', notes: 'Appended to the outer frame.' },
    ],
  },
  SegmentedControl: {
    usage: `import { SegmentedControl } from '@fargone/rite';\n\nconst data = [{ value: 'dusk', label: 'Dusk' }, { value: 'dawn', label: 'Dawn' }];\n\n<SegmentedControl data={data} value="dusk" onChange={(v) => console.log(v)} size="md" />`,
    props: [
      { name: 'data', type: 'SegmentedControlItem[]', default: '—', notes: 'Options shaped as value, label, and optional disabled.' },
      { name: 'value', type: 'string', default: '—', notes: 'Controlled selection; matches an item value.' },
      { name: 'defaultValue', type: 'string', default: '—', notes: 'Initial selection; falls back to the first item.' },
      { name: 'onChange', type: '(value: string) => void', default: '—', notes: 'Fires with the picked item value.' },
      { name: 'size', type: "'sm' | 'md'", default: "'md'", notes: 'Density of the segment buttons.' },
      { name: 'disabled', type: 'boolean', default: 'false', notes: 'Disables the whole group and dims it.' },
      { name: 'ariaLabel', type: 'string', default: '—', notes: 'Accessible label for the group.' },
    ],
  },
};
