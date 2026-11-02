import { useState } from 'react';
import { Avatar } from '@fargone/rite';
import { BarsList } from '@fargone/rite';
import { Blockquote } from '@fargone/rite';
import { Button } from '@fargone/rite';
import { DataList } from '@fargone/rite';
import { EmptyState } from '@fargone/rite';
import { Kbd } from '@fargone/rite';
import { Loader } from '@fargone/rite';
import { Notification } from '@fargone/rite';
import { Progress } from '@fargone/rite';
import { Rating } from '@fargone/rite';
import { RingProgress } from '@fargone/rite';
import { RollingNumber } from '@fargone/rite';
import { Skeleton } from '@fargone/rite';
import { Sparkline } from '@fargone/rite';
import type { ExampleSection } from './types.ts';

function ProofProgress() {
  const [step, setStep] = useState(1);
  const total = 4;
  const pct = Math.round((step / total) * 100);
  const labels = ['Survey', 'Omen', 'Seal', 'Witness'];
  return (
    <div className="p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#d42b1e]">File // onboarding</p>
      <p className="mt-1 text-lg font-medium tracking-tight">Enter the record in four rites</p>
      <div className="mt-4 flex items-center gap-5">
        <RingProgress value={pct} size={88} thickness={9} label={`Step ${step} / ${total}`} />
        <div className="min-w-0 flex-1 space-y-3">
          <Progress value={pct} showLabel striped={step >= 3} tone={step === total ? 'blood' : 'ink'} />
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-60">
            Current rite — {labels[step - 1]}
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              disabled={step <= 1}
              onClick={() => setStep((s) => Math.max(1, s - 1))}
            >
              Back
            </Button>
            <Button size="sm" disabled={step >= total} onClick={() => setStep((s) => Math.min(total, s + 1))}>
              {step >= total ? 'Sealed' : 'Advance'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProofLoading() {
  const [phase, setPhase] = useState<'loading' | 'empty'>('loading');
  return (
    <div className="p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#d42b1e]">File // retrieval</p>
        <div className="flex items-center gap-2">
          <Button size="sm" variant={phase === 'loading' ? 'primary' : 'secondary'} onClick={() => setPhase('loading')}>
            Loading
          </Button>
          <Button size="sm" variant={phase === 'empty' ? 'primary' : 'secondary'} onClick={() => setPhase('empty')}>
            Empty
          </Button>
        </div>
      </div>
      {phase === 'loading' ? (
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton width={40} height={40} />
            <div className="flex-1 space-y-2">
              <Skeleton width="55%" height={12} />
              <Skeleton width="35%" height={10} />
            </div>
            <Loader variant="bars" label="Fetching" />
          </div>
          <Skeleton lines={3} />
        </div>
      ) : (
        <div className="mt-4">
          <EmptyState
            title="No exhibits returned"
            description="The query crossed the archive and found nothing. Loosen the filter or file a new exhibit."
            action={
              <Button size="sm" variant="secondary" onClick={() => setPhase('loading')}>
                Retry retrieval
              </Button>
            }
          />
        </div>
      )}
    </div>
  );
}

function ProofTestimonials() {
  const voices = [
    { name: 'H. Vane', role: 'Registrar, Halden & Co', stars: 5, text: 'Every signal filed before dusk. The grid has never once misplaced a witness.' },
    { name: 'M. Okafor', role: 'Surveyor, Meridian Works', stars: 4, text: 'Triage in under a minute, sealed in blood. Our auditors finally sleep.' },
    { name: 'S. Anselm', role: 'Keeper, St. Anselm Archive', stars: 5, text: 'We brought the dread; it brought the rows and columns. A fair exchange.' },
  ];
  return (
    <div className="p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#d42b1e]">Sworn statements</p>
      <p className="mt-1 text-lg font-medium tracking-tight">Witnessed by working orders</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {voices.map((v) => (
          <div key={v.name} className="rounded-[2px] border border-[#0a0a0b]/15 p-3 dark:border-white/15">
            <div className="flex items-center gap-2">
              <Avatar name={v.name} size="sm" />
              <div className="min-w-0">
                <p className="truncate text-xs font-medium">{v.name}</p>
                <p className="truncate font-mono text-[9px] uppercase tracking-[0.16em] opacity-50">{v.role}</p>
              </div>
            </div>
            <div className="mt-2">
              <Blockquote>
                <span className="text-sm leading-6">{v.text}</span>
              </Blockquote>
            </div>
            <div className="mt-2">
              <Rating defaultValue={v.stars} disabled />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProofShortcuts() {
  const rows = [
    { label: 'Command palette', value: <span className="flex items-center gap-1"><Kbd>Ctrl</Kbd><span aria-hidden className="opacity-50">+</span><Kbd>K</Kbd></span> },
    { label: 'File exhibit', value: <span className="flex items-center gap-1"><Kbd>N</Kbd></span> },
    { label: 'Seal dossier', value: <span className="flex items-center gap-1"><Kbd>Ctrl</Kbd><span aria-hidden className="opacity-50">+</span><Kbd>Enter</Kbd></span> },
    { label: 'Summon witness', value: <span className="flex items-center gap-1"><Kbd>?</Kbd></span> },
  ];
  return (
    <div className="grid gap-4 p-5 sm:grid-cols-2">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#d42b1e]">Without the mouse</p>
        <p className="mt-1 text-lg font-medium tracking-tight">Hands stay on the ledger</p>
        <p className="mt-1 text-xs leading-5 opacity-70">
          Four bindings cover the whole rite. Press <Kbd>?</Kbd> anywhere to summon this panel.
        </p>
      </div>
      <DataList striped items={rows} />
    </div>
  );
}

function ProofActivity() {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const notes = [
    { id: 'n1', tone: 'success' as const, title: 'Dossier filed', body: 'Exhibit V-104 archived under seal. No further action.' },
    { id: 'n2', tone: 'warning' as const, title: 'Margin thinning', body: 'Ink reserves below threshold. Requisition before dusk.' },
    { id: 'n3', tone: 'danger' as const, title: 'Seal broken', body: 'East wing quarantine requested. Awaiting signature.' },
  ];
  const visible = notes.filter((n) => !dismissed.includes(n.id));
  return (
    <div className="p-5">
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#d42b1e]">Night desk</p>
          <p className="mt-1 text-lg font-medium tracking-tight">Activity, as it arrived</p>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-50">{visible.length} unread</p>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {visible.length === 0 ? (
          <p className="rounded-[2px] border border-dashed border-[#0a0a0b]/25 p-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] opacity-60 dark:border-white/20">
            Desk clear — nothing unwitnessed
          </p>
        ) : (
          visible.map((n) => (
            <Notification key={n.id} tone={n.tone} title={n.title} onClose={() => setDismissed((d) => [...d, n.id])}>
              {n.body}
            </Notification>
          ))
        )}
      </div>
      {dismissed.length > 0 && (
        <Button size="sm" variant="ghost" className="mt-3" onClick={() => setDismissed([])}>
          Restore dismissed
        </Button>
      )}
    </div>
  );
}

function ProofNumbers() {
  const [count, setCount] = useState(1204);
  return (
    <div className="p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#d42b1e]">The ledger, live</p>
      <p className="mt-1 text-lg font-medium tracking-tight">Numbers that survived the night</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_1.2fr]">
        <div className="rounded-[2px] border border-[#0a0a0b]/15 p-3 dark:border-white/15">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-50">Folios witnessed</p>
          <div className="mt-1">
            <RollingNumber value={count} digits={5} />
          </div>
          <Sparkline data={[4, 7, 5, 9, 8, 12, 11, 15]} tone="blood" className="mt-2" />
          <div className="mt-2">
            <Button size="sm" variant="secondary" onClick={() => setCount((c) => c + 1)}>
              Witness +1
            </Button>
          </div>
        </div>
        <BarsList
          data={[
            { label: 'Survey', value: 42 },
            { label: 'Omen', value: 78 },
            { label: 'Seal', value: 56 },
            { label: 'Witness', value: 96 },
          ]}
        />
      </div>
    </div>
  );
}

export const PROOF_SECTIONS: ExampleSection[] = [
  {
    id: 'proof-progress',
    title: 'Onboarding — progress rites',
    blurb: 'Stepped onboarding with ring, bar, and advance control.',
    components: ['Progress', 'RingProgress', 'Button'],
    code: `import { Button, Progress, RingProgress } from '@fargone/rite';

const pct = Math.round((step / 4) * 100);
<RingProgress value={pct} label={\`Step \${step} / 4\`} />
<Progress value={pct} showLabel striped />
<Button onClick={() => setStep((s) => s + 1)}>Advance</Button>`,
    render: () => <ProofProgress />,
  },
  {
    id: 'proof-loading',
    title: 'Loading — skeleton to empty',
    blurb: 'Skeleton rows plus loader, resolving to an empty state.',
    components: ['Skeleton', 'Loader', 'EmptyState', 'Button'],
    code: `import { Button, EmptyState, Loader, Skeleton } from '@fargone/rite';

<Skeleton width={40} height={40} />
<Skeleton lines={3} />
<Loader variant="bars" label="Fetching" />
<EmptyState
  title="No exhibits returned"
  description="Loosen the filter or file a new exhibit."
  action={<Button>Retry retrieval</Button>}
/>`,
    render: () => <ProofLoading />,
  },
  {
    id: 'proof-testimonials',
    title: 'Testimonials — sworn statements',
    blurb: 'Three witness cards with avatar, quote, and rating.',
    components: ['Avatar', 'Blockquote', 'Rating'],
    code: `import { Avatar, Blockquote, Rating } from '@fargone/rite';

<Avatar name="H. Vane" size="sm" />
<Blockquote>Every signal filed before dusk.</Blockquote>
<Rating defaultValue={5} disabled />`,
    render: () => <ProofTestimonials />,
  },
  {
    id: 'proof-shortcuts',
    title: 'Shortcuts — key bindings',
    blurb: 'Command bindings rendered as kbd chips in a data list.',
    components: ['Kbd', 'DataList'],
    code: `import { DataList, Kbd } from '@fargone/rite';

<DataList
  striped
  items={[
    { label: 'Command palette', value: <span><Kbd>Ctrl</Kbd> + <Kbd>K</Kbd></span> },
    { label: 'Seal dossier', value: <span><Kbd>Ctrl</Kbd> + <Kbd>Enter</Kbd></span> },
  ]}
/>`,
    render: () => <ProofShortcuts />,
  },
  {
    id: 'proof-activity',
    title: 'Activity — night desk',
    blurb: 'Dismissible notification stack with unread count.',
    components: ['Notification', 'Button'],
    code: `import { Notification } from '@fargone/rite';

<Notification tone="success" title="Dossier filed" onClose={dismiss}>
  Exhibit V-104 archived under seal.
</Notification>
<Notification tone="warning" title="Margin thinning">
  Ink reserves below threshold.
</Notification>`,
    render: () => <ProofActivity />,
  },
  {
    id: 'proof-numbers',
    title: 'Stats — living ledger',
    blurb: 'Rolling counter, sparkline trend, and rite breakdown bars.',
    components: ['RollingNumber', 'Sparkline', 'BarsList', 'Button'],
    code: `import { BarsList, RollingNumber, Sparkline } from '@fargone/rite';

<RollingNumber value={count} digits={5} />
<Sparkline data={[4, 7, 5, 9, 8, 12, 11, 15]} tone="blood" />
<BarsList data={[{ label: 'Seal', value: 56 }]} />`,
    render: () => <ProofNumbers />,
  },
];
