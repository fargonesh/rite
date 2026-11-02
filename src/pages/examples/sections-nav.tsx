import { useState } from 'react';
import { Bell, Bold, ChevronDown, Italic, Plus, Search, Underline } from 'lucide-react';
import { ActionIcon } from '@fargone/rite';
import { Anchor } from '@fargone/rite';
import { Badge } from '@fargone/rite';
import { Breadcrumbs } from '@fargone/rite';
import { Burger } from '@fargone/rite';
import { Button } from '@fargone/rite';
import { Menu } from '@fargone/rite';
import { Pagination } from '@fargone/rite';
import { Stepper } from '@fargone/rite';
import { Table } from '@fargone/rite';
import { TableOfContents } from '@fargone/rite';
import { Tabs } from '@fargone/rite';
import { Text } from '@fargone/rite';
import { Title } from '@fargone/rite';
import { Toolbar } from '@fargone/rite';
import type { ExampleSection } from './types.ts';

/* 1 — breadcrumb trail + page title */
function BreadcrumbTrail() {
  return (
    <div className="p-5">
      <Breadcrumbs
        items={[
          { label: 'Archive', href: '#' },
          { label: 'Dossiers', href: '#' },
          { label: 'Vesper-09' },
        ]}
      />
      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#d42b1e]">
            File // 09 — open
          </p>
          <Title order={3} className="mt-1">
            The north-line survey
          </Title>
          <Text size="sm" dimmed className="mt-1 max-w-md">
            Filed at dawn, witnessed by two. Everything below belongs to this record.
          </Text>
        </div>
        <Badge color="red" variant="outline">
          Unsealed
        </Badge>
      </div>
    </div>
  );
}

/* 2 — tabs showcase */
function TabsShowcase() {
  return (
    <div className="p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0a0a0b]/50 dark:text-white/40">
        Dossier // tabs
      </p>
      <Tabs
        defaultValue="brief"
        tabs={[
          {
            value: 'brief',
            label: 'Brief',
            content: (
              <div className="space-y-2">
                <Text size="sm">Survey the north line at dawn. Travel light, log everything.</Text>
                <div className="flex gap-2">
                  <Badge>Priority</Badge>
                  <Badge color="red" variant="soft">
                    Due midnight
                  </Badge>
                </div>
              </div>
            ),
          },
          {
            value: 'assets',
            label: 'Assets',
            content: (
              <div className="space-y-2">
                <Text size="sm">Lantern, cord, ledger. Nothing electronic, nothing loud.</Text>
                <Text size="xs" dimmed>
                  Checked out by H. Vane — return within 3 nights.
                </Text>
              </div>
            ),
          },
          {
            value: 'record',
            label: 'Record',
            content: (
              <div className="space-y-2">
                <Text size="sm">Three crows on the wire. Proceed anyway — the ledger demands it.</Text>
                <Anchor href="#">Read the full entry</Anchor>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

/* 3 — paged index */
const DOSSIERS: { ref: string; subject: string; status: string }[] = [
  { ref: 'V-001', subject: 'Ink slab', status: 'Filed' },
  { ref: 'V-002', subject: 'Hairline grid', status: 'Open' },
  { ref: 'V-003', subject: 'Blood accent', status: 'Sealed' },
  { ref: 'V-004', subject: 'North wire', status: 'Open' },
  { ref: 'V-005', subject: 'Bone ledger', status: 'Filed' },
  { ref: 'V-006', subject: 'Crow count', status: 'Open' },
  { ref: 'V-007', subject: 'Night cord', status: 'Sealed' },
  { ref: 'V-008', subject: 'Void map', status: 'Filed' },
  { ref: 'V-009', subject: 'Lantern oil', status: 'Open' },
  { ref: 'V-010', subject: 'Seal wax', status: 'Filed' },
  { ref: 'V-011', subject: 'Dawn log', status: 'Open' },
  { ref: 'V-012', subject: 'Last witness', status: 'Sealed' },
];

const PAGE_SIZE = 4;

function PagedIndex() {
  const [page, setPage] = useState(2);
  const total = Math.ceil(DOSSIERS.length / PAGE_SIZE);
  const rows = DOSSIERS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return (
    <div className="space-y-3 p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0a0a0b]/50 dark:text-white/40">
          Index // {DOSSIERS.length} dossiers
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0a0a0b]/50 dark:text-white/40">
          Page {page} of {total}
        </p>
      </div>
      <Table
        striped
        caption="Exhibit ledger — paged"
        head={['Ref', 'Subject', 'Status']}
        body={rows.map((d) => [d.ref, d.subject, d.status])}
      />
      <Pagination page={page} total={total} onChange={setPage} />
    </div>
  );
}

/* 4 — multi-step rite / checkout */
const RITE_STEPS = [
  { label: 'Gather', description: 'Name the rite' },
  { label: 'Witness', description: 'Seal the details' },
  { label: 'Seal', description: 'Close the record' },
];

const STEP_COPY = [
  'State the designation and choose the line to survey. Nothing moves until it is named.',
  'A second hand confirms the hairlines. Check the ledger, mark the omens.',
  'The wax cools, the file shuts. No edits after the seal without a new rite.',
];

function RiteStepper() {
  const [active, setActive] = useState(1);
  return (
    <div className="space-y-4 p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0a0a0b]/50 dark:text-white/40">
        Rite // step {active + 1} of {RITE_STEPS.length}
      </p>
      <Stepper steps={RITE_STEPS} active={active} onStepClick={setActive} />
      <div className="rounded-[2px] border border-[#0a0a0b]/15 p-3 dark:border-white/10">
        <Text size="sm">{STEP_COPY[active]}</Text>
      </div>
      <div className="flex items-center justify-between gap-2">
        <Button size="sm" variant="secondary" disabled={active === 0} onClick={() => setActive((a) => Math.max(0, a - 1))}>
          Back
        </Button>
        {active < RITE_STEPS.length - 1 ? (
          <Button size="sm" onClick={() => setActive((a) => Math.min(RITE_STEPS.length - 1, a + 1))}>
            Continue
          </Button>
        ) : (
          <Button size="sm" variant="destructive" onClick={() => setActive(0)}>
            Seal rite
          </Button>
        )}
      </div>
    </div>
  );
}

/* 5 — toolbar row */
function MenuRow() {
  const [opened, setOpened] = useState(false);
  const [marks, setMarks] = useState<string[]>(['bold']);
  const [note, setNote] = useState('idle');
  const toggle = (name: string) =>
    setMarks((prev) => (prev.includes(name) ? prev.filter((m) => m !== name) : [...prev, name]));
  return (
    <div className="space-y-3 p-5">
      <div className="flex flex-wrap items-center gap-2">
        <Burger opened={opened} onClick={() => setOpened((o) => !o)} aria-label={opened ? 'Close tools' : 'Open tools'} />
        <div className="min-w-0 flex-1">
          <Toolbar
            label="Entry tools"
            groups={[
              {
                id: 'marks',
                items: [
                  { label: 'Bold', icon: <Bold size={14} aria-hidden />, active: marks.includes('bold'), onSelect: () => toggle('bold') },
                  { label: 'Italic', icon: <Italic size={14} aria-hidden />, active: marks.includes('italic'), onSelect: () => toggle('italic') },
                  { label: 'Underline', icon: <Underline size={14} aria-hidden />, active: marks.includes('underline'), onSelect: () => toggle('underline') },
                ],
              },
              {
                id: 'entry',
                items: [
                  { label: 'Search entries', icon: <Search size={14} aria-hidden />, onSelect: () => setNote('search opened') },
                  { label: 'New entry', icon: <Plus size={14} aria-hidden />, onSelect: () => setNote('draft started') },
                ],
              },
            ]}
          />
        </div>
        <Menu
          trigger={
            <span className="inline-flex h-9 items-center gap-2 rounded-[2px] border border-[#0a0a0b]/25 px-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#0a0a0b] transition-colors hover:border-[#0a0a0b] dark:border-white/25 dark:text-[#e9e7e2] dark:hover:border-white">
              Sort <ChevronDown size={12} strokeWidth={2} aria-hidden />
            </span>
          }
          items={[
            { label: 'Newest first', onSelect: () => setNote('sorted: newest') },
            { label: 'Oldest first', onSelect: () => setNote('sorted: oldest') },
            { label: 'Unsealed only', onSelect: () => setNote('filtered: unsealed') },
          ]}
        />
        <ActionIcon aria-label="Notifications" onClick={() => setNote('3 unread omens')}>
          <Bell size={14} strokeWidth={2} />
        </ActionIcon>
      </div>
      {opened && (
        <div className="rounded-[2px] border border-dashed border-[#0a0a0b]/25 p-3 dark:border-white/20">
          <Text size="xs" dimmed>
            Tray open — jump to archive, drafts, or sealed records. The burger only toggles this tray; nothing
            navigates away.
          </Text>
        </div>
      )}
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0a0a0b]/50 dark:text-white/40">
        Marks: {marks.length > 0 ? marks.join(' + ') : 'none'} — {note}
      </p>
    </div>
  );
}

/* 6 — docs layout */
const TOC_ITEMS = [
  { id: 'overview', label: 'Overview', depth: 1 },
  { id: 'protocol', label: 'Survey protocol', depth: 1 },
  { id: 'methods', label: 'Methods', depth: 2 },
  { id: 'custody', label: 'Chain of custody', depth: 2 },
  { id: 'appendix', label: 'Appendix', depth: 1 },
];

function DocsLayout() {
  const [activeId, setActiveId] = useState('methods');
  return (
    <div className="grid gap-4 p-5 sm:grid-cols-[180px_1fr]">
      <TableOfContents items={TOC_ITEMS} activeId={activeId} />
      <div className="min-w-0 space-y-4">
        <div>
          <Title order={6} id="overview" className="scroll-mt-2">
            <a href="#overview" onClick={() => setActiveId('overview')} className="outline-none focus-visible:ring-1 focus-visible:ring-[#d42b1e]">
              01 — Overview
            </a>
          </Title>
          <Text size="sm" dimmed className="mt-1">
            The archive keeps one record per line walked. Read top to bottom; sign at the foot. See the{' '}
            <Anchor href="#appendix" onClick={() => setActiveId('appendix')}>
              appendix
            </Anchor>{' '}
            for seals.
          </Text>
        </div>
        <div>
          <Title order={6} id="protocol" className="scroll-mt-2">
            <a href="#protocol" onClick={() => setActiveId('protocol')} className="outline-none focus-visible:ring-1 focus-visible:ring-[#d42b1e]">
              02 — Survey protocol
            </a>
          </Title>
          <Text size="sm" dimmed className="mt-1">
            Walk at dawn, mark every hairline, log every crow. Full method under{' '}
            <Anchor href="#methods" onClick={() => setActiveId('methods')}>
              methods
            </Anchor>
            .
          </Text>
        </div>
        <div className="rounded-[2px] border-l-2 border-[#d42b1e] bg-[#d42b1e]/[0.06] p-3 dark:bg-[#d42b1e]/10">
          <Title order={6} id="methods" className="scroll-mt-2">
            <a href="#methods" onClick={() => setActiveId('methods')} className="outline-none focus-visible:ring-1 focus-visible:ring-[#d42b1e]">
              03 — Methods
            </a>
          </Title>
          <Text size="sm" className="mt-1">
            Cord first, then lantern, then ledger. Custody passes are recorded under{' '}
            <Anchor href="#custody" onClick={() => setActiveId('custody')}>
              chain of custody
            </Anchor>
            .
          </Text>
        </div>
      </div>
    </div>
  );
}

export const NAV_SECTIONS: ExampleSection[] = [
  {
    id: 'nav-breadcrumbs',
    title: 'Breadcrumb trail',
    blurb: 'Archive path above a dossier title — orientation before content.',
    components: ['Breadcrumbs', 'Title', 'Text', 'Badge'],
    code: `import { Breadcrumbs, Title, Text, Badge } from '@fargone/rite';

<Breadcrumbs items={[
  { label: 'Archive', href: '#' },
  { label: 'Dossiers', href: '#' },
  { label: 'Vesper-09' },
]} />
<Title order={3}>The north-line survey</Title>
<Text size="sm" dimmed>Filed at dawn, witnessed by two.</Text>
<Badge color="red" variant="outline">Unsealed</Badge>`,
    render: () => <BreadcrumbTrail />,
  },
  {
    id: 'nav-tabs',
    title: 'Dossier tabs',
    blurb: 'Brief, assets, and record in one card — no page reloads.',
    components: ['Tabs', 'Text', 'Badge', 'Anchor'],
    code: `import { Tabs } from '@fargone/rite';

<Tabs
  defaultValue="brief"
  tabs={[
    { value: 'brief', label: 'Brief', content: '...' },
    { value: 'assets', label: 'Assets', content: '...' },
    { value: 'record', label: 'Record', content: '...' },
  ]}
/>`,
    render: () => <TabsShowcase />,
  },
  {
    id: 'nav-pagination',
    title: 'Paged index',
    blurb: 'Twelve dossiers, four per page — ledger with page controls.',
    components: ['Pagination', 'Table'],
    code: `import { useState } from 'react';
import { Pagination, Table } from '@fargone/rite';

const [page, setPage] = useState(2);
<Table striped head={['Ref', 'Subject', 'Status']} body={rows} />
<Pagination page={page} total={3} onChange={setPage} />`,
    render: () => <PagedIndex />,
  },
  {
    id: 'nav-stepper',
    title: 'Rite stepper',
    blurb: 'Gather, witness, seal — a three-step checkout for closing records.',
    components: ['Stepper', 'Button', 'Text'],
    code: `import { useState } from 'react';
import { Stepper, Button } from '@fargone/rite';

const [active, setActive] = useState(1);
<Stepper
  active={active}
  onStepClick={setActive}
  steps={[{ label: 'Gather' }, { label: 'Witness' }, { label: 'Seal' }]}
/>
<Button onClick={() => setActive((a) => a + 1)}>Continue</Button>`,
    render: () => <RiteStepper />,
  },
  {
    id: 'nav-menu-row',
    title: 'Toolbar row',
    blurb: 'Burger tray, mark tools, sort menu, and an omen bell in one strip.',
    components: ['Toolbar', 'Menu', 'Burger', 'ActionIcon', 'Text'],
    code: `import { Toolbar, Menu, Burger, ActionIcon } from '@fargone/rite';

<Burger opened={opened} onClick={toggle} />
<Toolbar groups={[{ id: 'marks', items: [
  { label: 'Bold', active, onSelect: toggle },
]}]} />
<Menu trigger={<span>Sort</span>} items={[{ label: 'Newest first' }]} />
<ActionIcon aria-label="Notifications"><Bell size={14} /></ActionIcon>`,
    render: () => <MenuRow />,
  },
  {
    id: 'nav-toc',
    title: 'Reading column',
    blurb: 'Contents rail beside the protocol — click to move the blood edge.',
    components: ['TableOfContents', 'Title', 'Text', 'Anchor'],
    code: `import { TableOfContents, Title, Text, Anchor } from '@fargone/rite';

<TableOfContents
  activeId={activeId}
  items={[
    { id: 'overview', label: 'Overview' },
    { id: 'methods', label: 'Methods', depth: 2 },
  ]}
/>
<Title order={6} id="methods">03 — Methods</Title>
<Text size="sm">Cord first, then lantern. <Anchor href="#custody">Custody</Anchor></Text>`,
    render: () => <DocsLayout />,
  },
];
