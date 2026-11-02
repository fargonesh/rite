export const docs7: Record<string, { usage: string; props: Array<{ name: string; type: string; default?: string; notes?: string }> }> = {
  MiniCalendar: {
    usage: `import { useState } from 'react';\nimport { MiniCalendar } from '@fargone/rite';\n\nconst [day, setDay] = useState(new Date(2026, 10, 2));\n\n<MiniCalendar value={day} onChange={setDay} days={7} />`,
    props: [
      { name: 'value', type: 'Date', notes: 'Controlled selected day. Pair with onChange.' },
      { name: 'defaultValue', type: 'Date', notes: 'Uncontrolled initial selection. Ignored when value is set.' },
      { name: 'onChange', type: '(value: Date) => void', notes: 'Fires with the start-of-day Date after each pick.' },
      { name: 'days', type: 'number', default: '7', notes: 'Visible day cells in the sliding window. Clamped to at least 1.' },
      { name: 'start', type: 'Date', notes: 'Anchor for the window. Defaults to today.' },
    ],
  },
  MobileMonthView: {
    usage: `import { MobileMonthView } from '@fargone/rite';\n\n<MobileMonthView\n  month={new Date(2026, 10, 1)}\n  events={[\n    { id: 'm1', title: 'Standup', start: new Date(2026, 10, 3, 9), end: new Date(2026, 10, 3, 10) },\n  ]}\n/>`,
    props: [
      { name: 'events', type: 'MobileMonthViewEvent[]', default: '—', notes: 'Each event needs id, title, start, and end Dates. Dots mark days with events.' },
      { name: 'month', type: 'Date', notes: 'Controlled visible month. Falls back to defaultMonth.' },
      { name: 'defaultMonth', type: 'Date', notes: 'Uncontrolled initial month. Defaults to today.' },
    ],
  },
  Modal: {
    usage: `import { useState } from 'react';\nimport { Modal } from '@fargone/rite';\n\nconst [opened, setOpened] = useState(false);\n\n<Modal opened={opened} onClose={() => setOpened(false)} title="FILE 047" size="md">\n  <p>Sealed exhibits, handle with care.</p>\n</Modal>`,
    props: [
      { name: 'opened', type: 'boolean', default: '—', notes: 'Controls visibility. Returns null when false.' },
      { name: 'onClose', type: '() => void', default: '—', notes: 'Called on Escape key and backdrop click.' },
      { name: 'title', type: 'string', notes: 'Dialog title. Defaults to Dossier.' },
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Dialog body rendered below the header rule.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", notes: 'Sets the dialog width.' },
    ],
  },
  Modals: {
    usage: `import { useState } from 'react';\nimport { Modals } from '@fargone/rite';\n\nconst [opened, setOpened] = useState(false);\n\n<Modals opened={opened} onClose={() => setOpened(false)} title="Seal dossier 047?" danger onConfirm={() => setOpened(false)} />`,
    props: [
      { name: 'opened', type: 'boolean', default: '—', notes: 'Controls visibility. Returns null when false.' },
      { name: 'onClose', type: '() => void', default: '—', notes: 'Called on Escape, backdrop click, and Cancel.' },
      { name: 'title', type: 'string', default: "'Confirm action'", notes: 'Header text with a warning icon when danger is set.' },
      { name: 'message', type: 'string', notes: 'Optional body copy explaining the consequence.' },
      { name: 'confirmLabel', type: 'string', default: "'Confirm'", notes: 'Confirm button text.' },
      { name: 'cancelLabel', type: 'string', default: "'Cancel'", notes: 'Cancel button text. Always invokes onClose.' },
      { name: 'danger', type: 'boolean', default: 'false', notes: 'Applies the destructive-action style to the confirmation control.' },
      { name: 'onConfirm', type: '() => void', notes: 'Fires from the confirm button. Close the dialog inside it.' },
    ],
  },
  MonthPicker: {
    usage: `import { useState } from 'react';\nimport { MonthPicker } from '@fargone/rite';\n\nconst [val, setVal] = useState({ year: 2026, month: 2 });\n\n<MonthPicker value={val} onChange={setVal} />`,
    props: [
      { name: 'value', type: 'MonthValue | null', notes: 'Controlled pick as year plus 0-based month.' },
      { name: 'defaultValue', type: 'MonthValue | null', default: 'null', notes: 'Uncontrolled initial pick.' },
      { name: 'onChange', type: '(value: MonthValue) => void', notes: 'Fires with year and 0-based month on each cell pick.' },
      { name: 'year', type: 'number', notes: 'Controlled view year. Falls back to defaultYear.' },
      { name: 'defaultYear', type: 'number', notes: 'Uncontrolled initial view year.' },
      { name: 'onYearChange', type: '(year: number) => void', notes: 'Fires when the chevrons step the view year.' },
    ],
  },
  MonthPickerInput: {
    usage: `import { useState } from 'react';\nimport { MonthPickerInput } from '@fargone/rite';\n\nconst [val, setVal] = useState({ year: 2026, month: 2 });\n\n<MonthPickerInput label="Issue month" value={val} onChange={setVal} placeholder="YYYY-MM" />`,
    props: [
      { name: 'label', type: 'string', notes: 'Field label rendered above the trigger button.' },
      { name: 'value', type: 'MonthValue | null', notes: 'Controlled pick. Displayed as YYYY-MM.' },
      { name: 'onChange', type: '(value: MonthValue | null) => void', notes: 'Fires on pick, or with null when cleared.' },
      { name: 'placeholder', type: 'string', default: "'YYYY-MM'", notes: 'Shown when nothing is selected.' },
      { name: 'disabled', type: 'boolean', default: 'false', notes: 'Blocks the dropdown and dims the trigger.' },
      { name: 'error', type: 'string', notes: 'Red border plus message. Marks the trigger invalid.' },
    ],
  },
  MonthView: {
    usage: `import { MonthView } from '@fargone/rite';\n\n<MonthView\n  defaultMonth={new Date(2026, 10, 1)}\n  events={[\n    { id: 'm1', title: 'Standup', start: new Date(2026, 10, 3, 9), end: new Date(2026, 10, 3, 9, 30) },\n  ]}\n/>`,
    props: [
      { name: 'events', type: 'Event[]', default: '—', notes: 'Each event needs id, title, start, and end Dates. Sorted per day, two shown plus a more count.' },
      { name: 'month', type: 'Date', notes: 'Controlled visible month. Nav chevrons disable when set.' },
      { name: 'defaultMonth', type: 'Date', notes: 'Uncontrolled initial month. Defaults to today.' },
    ],
  },
  MultiSelect: {
    usage: `import { useState } from 'react';\nimport { MultiSelect } from '@fargone/rite';\n\nconst [rites, setRites] = useState(['vesper']);\n\n<MultiSelect label="Rites" data={['vesper', 'matins', 'compline']} value={rites} onChange={setRites} />`,
    props: [
      { name: 'data', type: 'string[]', default: '—', notes: 'Option pool. Already-picked values are hidden from the list.' },
      { name: 'value', type: 'string[]', notes: 'Controlled picks rendered as removable chips.' },
      { name: 'defaultValue', type: 'string[]', default: '[]', notes: 'Uncontrolled initial picks.' },
      { name: 'onChange', type: '(value: string[]) => void', notes: 'Fires with the next array on select, remove, or Backspace.' },
      { name: 'label', type: 'string', notes: 'Field label rendered above the box.' },
      { name: 'placeholder', type: 'string', default: "'Pick…'", notes: 'Shown only while no chips are picked.' },
      { name: 'disabled', type: 'boolean', default: 'false', notes: 'Blocks typing, list, and chip removal.' },
      { name: 'error', type: 'string', notes: 'Displays an error message and marks the input as invalid.' },
    ],
  },
  NativeSelect: {
    usage: `import { NativeSelect } from '@fargone/rite';\n\n<NativeSelect\n  label="Choir"\n  data={['soprano', 'alto', 'tenor', 'bass']}\n  defaultValue="alto"\n/>`,
    props: [
      { name: 'data', type: 'NativeSelectItem[]', default: '—', notes: 'Options as strings or value/label/disabled objects.' },
      { name: 'value', type: 'string', notes: 'Controlled selection. Falls back to defaultValue.' },
      { name: 'defaultValue', type: 'string', notes: 'Uncontrolled starting value.' },
      { name: 'onChange', type: '(value: string) => void', notes: 'Fires with the next option value.' },
      { name: 'label', type: 'string', notes: 'Field label rendered above the select.' },
      { name: 'description', type: 'string', notes: 'Helper text. Hidden when error is set.' },
      { name: 'disabled', type: 'boolean', default: 'false', notes: 'Disables the native control and dims it.' },
    ],
  },
  NavLink: {
    usage: `import { NavLink } from '@fargone/rite';\n\n<NavLink label="Overview" description="Case summary" active />\n<NavLink label="Evidence" description="14 exhibits filed" href="#" />`,
    props: [
      { name: 'label', type: 'string', default: '—', notes: 'Uppercase link title. Always rendered.' },
      { name: 'description', type: 'string', notes: 'Sub-line rendered below the label.' },
      { name: 'href', type: 'string', notes: 'Renders an anchor when set, a button otherwise.' },
      { name: 'active', type: 'boolean', default: 'false', notes: 'Filled slab with red edge. Sets aria-current page.' },
      { name: 'onClick', type: 'MouseEventHandler', notes: 'Click handler for button or anchor mode.' },
      { name: 'leftSection', type: 'ReactNode', notes: 'Icon or mark pinned before the label.' },
      { name: 'rightSection', type: 'ReactNode', notes: 'Badge or chevron pinned after the label.' },
    ],
  },
  NavigationProgress: {
    usage: `import { NavigationProgress } from '@fargone/rite';\n\n<NavigationProgress progress={40} color="#d42b1e" />`,
    props: [
      { name: 'progress', type: 'number | null', notes: 'Percent 0-100, clamped and rounded. Renders nothing when null or undefined.' },
      { name: 'color', type: 'string', default: "'#d42b1e'", notes: 'Sets the progress bar color.' },
    ],
  },
  Notification: {
    usage: `import { Notification } from '@fargone/rite';\n\n<Notification title="Dossier filed" tone="success" onClose={() => undefined}>\n  Exhibit 12 archived under seal.\n</Notification>`,
    props: [
      { name: 'title', type: 'string', notes: 'Headline rendered under the tone kicker.' },
      { name: 'children', type: 'ReactNode', default: '—', notes: 'Body copy below the title.' },
      { name: 'tone', type: "'info' | 'success' | 'warning' | 'danger'", default: "'info'", notes: 'Sets label, icon, and edge bar. Danger uses a red border.' },
      { name: 'onClose', type: '() => void', notes: 'Shows the dismiss X when provided.' },
      { name: 'autoClose', type: 'number | false', notes: 'Accepted for parity but ignored. Close is always manual.' },
    ],
  },
  Notifications: {
    usage: `import { Notifications, notifications } from '@fargone/rite';\n\n<button type="button" onClick={() => notifications.show({ title: 'Filed', tone: 'success' })}>\n  File exhibit\n</button>\n<Notifications />`,
    props: [
      { name: 'title', type: 'string', notes: 'Option for notifications.show. Headline of the notice.' },
      { name: 'message', type: 'string', notes: 'Option for notifications.show. Body copy of the notice.' },
      { name: 'tone', type: "'info' | 'success' | 'warning' | 'danger'", default: "'info'", notes: 'Option for notifications.show. Sets icon and border.' },
      { name: 'className', type: 'string', notes: 'Extra classes on the fixed bottom-right stack host.' },
    ],
  },
  NumberFormatter: {
    usage: `import { NumberFormatter } from '@fargone/rite';\n\n<NumberFormatter value={48210.5} decimals={2} prefix="$" />\n<NumberFormatter value={1204000} compact />`,
    props: [
      { name: 'value', type: 'number', default: '—', notes: 'Number rendered with en-US grouping.' },
      { name: 'decimals', type: 'number', notes: 'Fixed fraction digits. Omitted keeps the natural precision.' },
      { name: 'prefix', type: 'string', default: "''", notes: 'Text before the digits, e.g. a currency mark.' },
      { name: 'suffix', type: 'string', default: "''", notes: 'Text after the digits, e.g. a percent sign.' },
      { name: 'compact', type: 'boolean', default: 'false', notes: 'Shortens large values, e.g. 1.2M.' },
    ],
  },
  NumberInput: {
    usage: `import { useState } from 'react';\nimport { NumberInput } from '@fargone/rite';\n\nconst [candles, setCandles] = useState(3);\n\n<NumberInput label="Candles" value={candles} onChange={setCandles} min={0} max={13} step={1} />`,
    props: [
      { name: 'label', type: 'string', notes: 'Uppercase field label with a red REQ mark.' },
      { name: 'value', type: 'number', notes: 'Controlled count. Falls back to defaultValue.' },
      { name: 'defaultValue', type: 'number', default: '0', notes: 'Uncontrolled starting count.' },
      { name: 'onChange', type: '(value: number) => void', notes: 'Fires with the clamped count from stepper or typing.' },
      { name: 'min', type: 'number', notes: 'Floor. Disables decrement at the bound.' },
      { name: 'max', type: 'number', notes: 'Ceiling. Disables increment at the bound.' },
      { name: 'step', type: 'number', default: '1', notes: 'Stepper delta per click.' },
      { name: 'disabled', type: 'boolean', notes: 'Blocks stepper and typing. Dims the field.' },
    ],
  },
};
