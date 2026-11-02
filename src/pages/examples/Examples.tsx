import { useState } from 'react';
import { Badge } from '@fargone/rite';
import { Button } from '@fargone/rite';
import { Card, CardBody, CardFooter, CardHeader } from '@fargone/rite';
import { CodeHighlight } from '@fargone/rite';
import { CopyButton } from '@fargone/rite';
import { EXAMPLE_SITES } from '../../data/examples.ts';
import { SECTIONS } from './sections.tsx';
import type { ExampleSection } from './types.ts';

function SectionCard({ section, index }: { section: ExampleSection; index: number }) {
  const [showCode, setShowCode] = useState(false);
  return (
    <Card id={`section-${section.id}`} className="scroll-mt-24">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
            <span className="mr-2 text-[#d42b1e]">{String(index + 1).padStart(2, '0')}</span>
            {section.title}
          </p>
          <span className="font-mono text-[10px] opacity-40">#{section.id}</span>
        </div>
        <p className="mt-1 text-xs opacity-60">{section.blurb}</p>
      </CardHeader>
      <div className="border-b border-dashed border-[#0a0a0b]/15 dark:border-white/10">
        {section.render()}
      </div>
      {showCode && (
        <div className="border-b border-[#0a0a0b]/10 p-3 dark:border-white/10">
          <CodeHighlight language="tsx" code={section.code} maxHeight={320} />
        </div>
      )}
      <CardFooter>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {section.components.map((c) => (
              <span key={c} className="rounded-[2px] border border-[#0a0a0b]/15 px-1.5 py-0.5 font-mono text-[10px] opacity-60 dark:border-white/15">
                {c}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <CopyButton value={section.code} />
            <Button size="sm" variant="secondary" onClick={() => setShowCode((v) => !v)}>
              {showCode ? 'Hide code' : 'View code'}
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
function SiteCard({
  siteId,
  large,
  onOpen,
  preview,
}: {
  siteId: string;
  large?: boolean;
  onOpen: (id: string) => void;
  preview: React.ReactNode;
}) {
  const meta = EXAMPLE_SITES.find((s) => s.id === siteId)!;
  return (
    <Card className={large ? 'lg:col-span-2' : undefined}>
      <div className="overflow-hidden rounded-t-[3px] border-b border-[#0a0a0b]/10 dark:border-white/10">
        {preview}
      </div>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-bold">{meta.title}</p>
          <Badge color="emerald">Completed</Badge>
        </div>
      </CardHeader>
      <CardBody>
        <p className="text-[13px] leading-5 opacity-70">{meta.blurb}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {meta.tags.map((t) => (
            <span key={t} className="rounded-[2px] bg-[#0a0a0b]/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] opacity-60 dark:bg-white/10">
              {t}
            </span>
          ))}
        </div>
      </CardBody>
      <CardFooter>
        <Button size="sm" onClick={() => onOpen(meta.id)}>Open site →</Button>
      </CardFooter>
    </Card>
  );
}

export default function Examples({ onOpenSite }: { onOpenSite: (id: string) => void }) {
  return (
    <div className="mx-auto max-w-6xl space-y-10 p-6 lg:p-10">
      <div className="space-y-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] opacity-50">
          Field manual // 02 — <span className="text-[#d42b1e]">assembled, not sketched</span>
        </p>
        <h1 className="max-w-3xl text-4xl leading-[1.02] font-medium tracking-tight sm:text-5xl">
          Examples <span className="font-omen font-normal italic">&amp;</span> sections
          <span aria-hidden className="text-[#d42b1e]">.</span>
        </h1>
        <p className="max-w-2xl text-sm leading-6 opacity-70">
          Completed sites built only from showcase components — plus the standalone sections
          they are assembled from. Open a site for the full page, or lift any section below.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="rounded-[2px] bg-[#0a0a0b] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#e9e7e2] dark:bg-[#e9e7e2] dark:text-black">
            {EXAMPLE_SITES.length} sites // {SECTIONS.length} sections
          </span>
          <span className="rounded-[2px] border border-[#d42b1e] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#d42b1e]">
            ◉ under observation
          </span>
        </div>
      </div>

      <section aria-label="Completed sites">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.24em] opacity-60">↱ completed sites</h2>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-40">{EXAMPLE_SITES.length} live</p>
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <SiteCard
            siteId="vesper"
            large
            onOpen={onOpenSite}
            preview={
              <div className="mesh-hero grained relative flex min-h-52 flex-col justify-end overflow-hidden p-5 text-[#e9e7e2]">
                <p className="relative font-mono text-[10px] uppercase tracking-[0.24em] text-[#ff5a4a]">Vesper // containment OS</p>
                <p className="relative mt-1 text-5xl leading-[0.9] font-medium tracking-tight">Vigil Holds</p>
                <p className="relative mt-2 max-w-sm text-[13px] opacity-80">Split-index hero, relics, console, boot-log footer.</p>
              </div>
            }
          />
          <SiteCard
            siteId="meridian"
            onOpen={onOpenSite}
            preview={
              <div className="mesh-page grained relative flex min-h-52 flex-col justify-center gap-2 overflow-hidden p-5">
                <div className="flex items-center gap-2">
                  <Badge color="indigo">SaaS starter</Badge>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">● live</span>
                </div>
                <p className="text-3xl font-medium tracking-tight">Operations, <span className="font-omen italic">witnessed.</span></p>
                <div className="flex gap-2 font-mono text-[11px]">
                  <span className="rounded-[2px] border border-[#0a0a0b]/15 px-2 py-1 dark:border-white/15">99.98% retained</span>
                  <span className="rounded-[2px] border border-[#0a0a0b]/15 px-2 py-1 dark:border-white/15">41s verdict</span>
                  <span className="hidden rounded-[2px] border border-[#d42b1e]/50 px-2 py-1 text-[#d42b1e] sm:inline">6 features + FAQ</span>
                </div>
              </div>
            }
          />
          <SiteCard
            siteId="ledger"
            onOpen={onOpenSite}
            preview={
              <div className="mesh-ink grained relative flex min-h-44 flex-col justify-center gap-2 overflow-hidden p-5 text-[#e9e7e2]">
                <div className="flex items-center gap-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] opacity-50">Ledger // night shift</p>
                  <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#d42b1e]" />
                </div>
                <div className="flex gap-2 font-mono text-2xl">
                  <span>99.98%</span>
                  <span className="opacity-40">·</span>
                  <span>41s</span>
                  <span className="opacity-40">·</span>
                  <span>0</span>
                </div>
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] opacity-70">
                  <span className="rounded-[2px] border border-white/20 px-2 py-0.5">sectors 1–7 filter</span>
                  <span className="rounded-[2px] border border-white/20 px-2 py-0.5">signals chart</span>
                  <span className="rounded-[2px] border border-white/20 px-2 py-0.5">roster · boot log</span>
                </div>
              </div>
            }
          />
          <Card className="border-dashed">
            <CardBody>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-50">Next dossier</p>
              <p className="mt-2 text-sm font-medium">Your site here</p>
              <p className="mt-1 text-[13px] leading-5 opacity-60">
                170+ components queued behind these three. Name the industry — a fourth completed
                site lands next.
              </p>
            </CardBody>
          </Card>
        </div>
      </section>

      <section aria-label="Sections">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.24em] opacity-60">↱ sections — lift anything</h2>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-40">{SECTIONS.length} blocks</p>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {SECTIONS.map((s, i) => (
            <SectionCard key={s.id} section={s} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
