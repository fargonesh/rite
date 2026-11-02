import { useEffect, useMemo, useRef, useState } from 'react';
import * as UI from '@fargone/rite';
import { CATEGORIES, COMPONENTS, type ComponentEntry, type ComponentStatus } from './data/components.ts';
import { DOCS } from './data/docs.ts';
import { DecryptText } from './lib/scramble.tsx';
import { useCountUp, useHeroIntro, useScrollReveals, useTilt } from './lib/motion.ts';
import { cx } from './lib/cx.ts';
import { updateSeo } from './lib/seo.ts';
import { EXAMPLE_SITES, isExampleSiteId } from './data/examples.ts';
import Examples from './pages/examples/Examples.tsx';
import LedgerSite from './pages/examples/sites/LedgerSite.tsx';
import MeridianSite from './pages/examples/sites/MeridianSite.tsx';
import VesperSite from './pages/examples/sites/VesperSite.tsx';

type View =
  | { kind: 'home' }
  | { kind: 'component'; name: string }
  | { kind: 'examples' }
  | { kind: 'example-site'; id: string };

function viewToPath(v: View): string {
  if (v.kind === 'home') return '/';
  if (v.kind === 'examples') return '/examples';
  if (v.kind === 'example-site') return `/examples/${encodeURIComponent(v.id)}`;
  return `/c/${encodeURIComponent(v.name)}`;
}

function parsePath(pathname: string): View {
  const p = pathname.replace(/\/+$/, '') || '/';
  if (p === '/examples') return { kind: 'examples' };
  const mSite = p.match(/^\/examples\/(.+)$/);
  if (mSite) {
    const id = decodeURIComponent(mSite[1]);
    if (isExampleSiteId(id)) return { kind: 'example-site', id };
    return { kind: 'examples' };
  }
  const m = p.match(/^\/c\/(.+)$/);
  if (m) return { kind: 'component', name: decodeURIComponent(m[1]) };
  return { kind: 'home' };
}

// One-time upgrade for old hash URLs (/#/c/Button, #/examples, #/site).
// In-page anchors (#console, …) are left alone.
function upgradeLegacyHash(): string | null {
  const h = window.location.hash;
  if (!h.startsWith('#/')) return null;
  const path = h.slice(1);
  // Legacy route: the demo landing now lives at /examples/vesper.
  if (path === '/site') return '/examples/vesper';
  return path;
}

function StatusBadge({ status }: { status: ComponentStatus }) {
  const styles =
    status === 'ready'
      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200'
      : status === 'in-progress'
        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200'
        : 'bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300';
  const label = status === 'ready' ? 'Ready' : status === 'in-progress' ? 'In progress' : 'Planned';
  return (
    <span className={cx('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', styles)}>
      {label}
    </span>
  );
}

function lookupDemo(name: string): React.ComponentType | undefined {
  return (UI as unknown as Record<string, React.ComponentType | undefined>)[`${name}Demo`];
}

function HomePage({ onSelect, onExamples }: { onSelect: (name: string) => void; onExamples: () => void }) {
  const total = COMPONENTS.length;
  const counts = new Map<string, number>();
  const samples = new Map<string, string[]>();
  for (const entry of COMPONENTS) {
    counts.set(entry.category, (counts.get(entry.category) ?? 0) + 1);
    const list = samples.get(entry.category) ?? [];
    if (list.length < 3) list.push(entry.name);
    samples.set(entry.category, list);
  }
  const featured = ['Button', 'Card', 'DatePicker', 'LineChart', 'Schedule', 'Modal', 'Spotlight', 'RichTextEditor'].filter(
    (name) => COMPONENTS.some((c) => c.name === name),
  );
  const root = useRef<HTMLDivElement | null>(null);

  // Same motion language as the example sites: terminal hero entrance,
  // soft scroll reveals, count-ups, tilt on cards.
  useHeroIntro(root);
  useScrollReveals(root);
  useCountUp(root);
  useTilt(root);

  return (
    <div ref={root}>
      {/* ---- hero — full-bleed across main; only the sidebar is excluded ---- */}
      <section className="border-b border-[#0a0a0b]/20 dark:border-white/15">
        <div className="flex items-center justify-between bg-black px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-[#e9e7e2] sm:px-6">
          <span>
            rite // clearance bone <span className="opacity-40">— this page is witnessed</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 animate-pulse bg-[#d42b1e]" />
            listening
          </span>
        </div>
        <div className="mesh-hero grained relative text-[#e9e7e2]">
        <div className="bg-survey absolute inset-0 opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-6xl space-y-5 px-6 py-10 sm:py-14 lg:px-10">
          <p data-hero-fade className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/50">
            Field manual // 01 — <span className="text-[#ff6b5e]">the system, whole</span>
          </p>
          <h1 className="max-w-3xl text-4xl leading-[1.02] font-medium tracking-tight sm:text-6xl">
            <span className="block overflow-hidden pb-1">
              <span data-hero-word className="block">
                <DecryptText text="Every component." delay={250} />
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span data-hero-word className="block">
                <DecryptText text="One import." delay={550} />
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span data-hero-word className="block font-omen font-normal italic">
                <DecryptText text="Rite." delay={850} />
              </span>
            </span>
          </h1>
          <p data-hero-fade className="max-w-2xl text-sm leading-6 text-white/70">
            <span className="font-mono font-semibold text-white">rite</span> is a flat React component library: {total} components
            across {CATEGORIES.length} categories, installed once and imported from a single package — no sub-packages,
            no version drift between parts. Browse the catalog in the sidebar; every entry documents itself with a live
            demo, copy-paste usage, and a props table.
          </p>
          <div data-hero-fade className="grid gap-3 lg:grid-cols-2">
            <div className="rounded-[2px] border border-white/10 bg-black/60 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">install</p>
              <pre className="mt-1 overflow-x-auto font-mono text-sm text-white/90">npm install @fargone/rite</pre>
            </div>
            <div className="rounded-[2px] border border-white/10 bg-black/60 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">use</p>
              <pre className="mt-1 font-mono text-sm whitespace-pre-wrap break-all text-white/90">
                {"import { Button, Card, DatePicker } from '@fargone/rite';"}
              </pre>
            </div>
          </div>
          <div data-hero-fade className="flex flex-wrap items-center gap-2">
            <span className="rounded-[2px] bg-[#e9e7e2] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-black">
              {total} components
            </span>
            <span className="rounded-[2px] border border-white/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
              {CATEGORIES.length} categories // 1 package
            </span>
            <button
              onClick={onExamples}
              className="rounded-[2px] border border-[#d42b1e] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff6b5e] hover:bg-[#d42b1e]/10"
            >
              Open /examples — sites &amp; sections ↗
            </button>
          </div>
          <div data-hero-fade className="flex flex-wrap items-center gap-2 border-t border-dashed border-white/10 pt-4">
            <UI.Button variant="primary">Primary</UI.Button>
            <UI.Button variant="secondary" className="border-white/25 text-[#e9e7e2] hover:border-white hover:bg-white/5">
              Secondary
            </UI.Button>
            <UI.Button variant="destructive">Destructive</UI.Button>
            <span className="ml-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              ← live rite buttons, not a screenshot
            </span>
          </div>
        </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-10 p-6 lg:p-10">
      {/* ---- stat strip ---- */}
      <div data-reveal className="flex flex-wrap items-center gap-x-8 gap-y-2 border-y border-[#0a0a0b]/15 py-3.5 font-mono text-[10px] uppercase tracking-[0.22em] opacity-45 dark:border-white/10">
        <span className="text-[#d42b1e] opacity-100">✦ the record so far</span>
        <span><span data-count data-to={total}>…</span> components</span>
        <span><span data-count data-to={CATEGORIES.length}>…</span> categories</span>
        <span>1 package</span>
        <span>1 import</span>
      </div>

      {/* ---- why one package ---- */}
      <section aria-label="Why one package" data-reveal>
        <h2 className="font-mono text-[11px] uppercase tracking-[0.24em] opacity-60">↱ why one package</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div data-tilt className="rounded-[3px] border border-[#0a0a0b]/20 bg-white p-5 dark:border-white/15 dark:bg-[#0e0f11]">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#d42b1e]">01 — one install</p>
            <p className="mt-2 text-sm font-semibold">No plugin maze.</p>
            <p className="mt-1 text-[13px] leading-5 opacity-70">
              <span className="font-mono">npm install @fargone/rite</span> gives you layout primitives, forms, overlays,
              date pickers, charts, scheduling tools, and editors in one package.
            </p>
          </div>
          <div data-tilt className="rounded-[3px] border border-[#0a0a0b]/20 bg-white p-5 dark:border-white/15 dark:bg-[#0e0f11]">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#d42b1e]">02 — one import</p>
            <p className="mt-2 text-sm font-semibold">Everything from <span className="font-mono">@fargone/rite</span>.</p>
            <p className="mt-1 text-[13px] leading-5 opacity-70">
              Buttons sit next to Gantt-grade schedule views and candlestick charts in the same barrel. If it is in
              the catalog, it imports the same way.
            </p>
          </div>
          <div data-tilt className="rounded-[3px] border border-[#0a0a0b]/20 bg-white p-5 dark:border-white/15 dark:bg-[#0e0f11]">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#d42b1e]">03 — categories browse only</p>
            <p className="mt-2 text-sm font-semibold">Labels, not packages.</p>
            <p className="mt-1 text-[13px] leading-5 opacity-70">
              Layout, Inputs, Charts, Schedule and friends exist so you can find things in the sidebar. They are
              never separate installs and never drift out of sync.
            </p>
          </div>
        </div>
      </section>

      {/* ---- what's inside ---- */}
      <section aria-label="What's inside" data-reveal>
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.24em] opacity-60">↱ what&apos;s inside — {total} components</h2>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-40">click any name to open its page</p>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category, i) => (
            <div
              key={category}
              data-reveal
              className="group rounded-[3px] border border-[#0a0a0b]/20 bg-white p-5 transition-colors hover:border-[#d42b1e]/60 dark:border-white/15 dark:bg-[#0e0f11]"
            >
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm font-bold">
                  <span className="mr-2 font-mono text-[10px] font-normal opacity-40">0{i + 1}</span>
                  {category}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-40">
                  {counts.get(category) ?? 0} components
                </p>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {(samples.get(category) ?? []).map((name) => (
                  <button
                    key={name}
                    onClick={() => onSelect(name)}
                    className="rounded-[2px] border border-[#0a0a0b]/15 px-1.5 py-0.5 font-mono text-[11px] opacity-70 hover:border-[#d42b1e] hover:text-[#d42b1e] hover:opacity-100 dark:border-white/15"
                  >
                    {name}
                  </button>
                ))}
                <span className="px-1 py-0.5 font-mono text-[11px] opacity-40">…</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-[3px] border border-dashed border-[#0a0a0b]/25 p-4 dark:border-white/20">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">start with the greatest hits</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {featured.map((name) => (
              <button
                key={name}
                onClick={() => onSelect(name)}
                className="rounded-[2px] bg-[#0a0a0b] px-2.5 py-1 font-mono text-[11px] text-[#e9e7e2] hover:bg-[#d42b1e] dark:bg-[#e9e7e2] dark:text-black dark:hover:bg-[#d42b1e] dark:hover:text-white"
              >
                {name} →
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ---- how it works ---- */}
      <section aria-label="How it works" data-reveal>
        <h2 className="font-mono text-[11px] uppercase tracking-[0.24em] opacity-60">↱ how it works</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <div data-tilt className="rounded-[3px] border border-[#0a0a0b]/20 bg-white p-5 dark:border-white/15 dark:bg-[#0e0f11]">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]">Step 1 — open a page</p>
            <p className="mt-2 text-[13px] leading-5 opacity-70">
              Search or filter the sidebar, pick any of the {total} components. Each page renders the real thing —
              not a mock.
            </p>
          </div>
          <div data-tilt className="rounded-[3px] border border-[#0a0a0b]/20 bg-white p-5 dark:border-white/15 dark:bg-[#0e0f11]">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]">Step 2 — copy the usage</p>
            <pre className="mt-2 overflow-x-auto rounded-[2px] border border-white/10 bg-black p-3 font-mono text-xs leading-5 text-white/85">
              {"import { Schedule } from '@fargone/rite';\n\n<Schedule view=\"week\" />"}
            </pre>
          </div>
          <div data-tilt className="rounded-[3px] border border-[#0a0a0b]/20 bg-white p-5 dark:border-white/15 dark:bg-[#0e0f11]">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]">Step 3 — review the props</p>
            <p className="mt-2 text-[13px] leading-5 opacity-70">
              Every page carries a props table — name, type, default, notes — so the demo you see is the API you
              get. Then go steal a whole section from <span className="font-mono">/examples</span>.
            </p>
          </div>
        </div>
      </section>

      {/* ---- examples CTA ---- */}
      <section data-reveal className="overflow-hidden rounded-[3px] border border-[#0a0a0b]/20 dark:border-white/15" aria-label="Examples">
        <div className="mesh-hero grained relative p-6 text-[#e9e7e2] sm:p-8">
          <div className="bg-survey absolute inset-0 opacity-40" aria-hidden />
          <p className="relative font-mono text-[11px] uppercase tracking-[0.28em] text-[#ff6b5e]">field manual // 02 — assembled, not sketched</p>
          <h2 className="relative mt-2 max-w-2xl text-2xl font-medium tracking-tight sm:text-3xl">
            Components are the vocabulary. <span className="font-omen font-normal italic">The examples are the sentences.</span>
          </h2>
          <p className="relative mt-2 max-w-2xl text-sm leading-6 text-white/70">
            Three completed sites plus liftable page sections, all built exclusively from @fargone/rite pieces. Open one for
            the full page, or copy any section block into your own app.
          </p>
          <div className="relative mt-3 flex flex-wrap gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em]">
            <span className="rounded-[2px] border border-white/20 px-2 py-1 text-white/70">Vesper — Vigil Holds</span>
            <span className="rounded-[2px] border border-white/20 px-2 py-1 text-white/70">Meridian — SaaS</span>
            <span className="rounded-[2px] border border-white/20 px-2 py-1 text-white/70">Ledger — dashboard</span>
          </div>
          <button
            onClick={onExamples}
            className="relative mt-4 rounded-[2px] bg-[#e9e7e2] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-black hover:bg-[#d42b1e] hover:text-white"
          >
            Browse examples →
          </button>
        </div>
      </section>

      <p className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-40">
        rite · react + typescript + tailwind · {total} components · docs live on every page
      </p>
      </div>
    </div>
  );
}

function ComponentPage({ entry }: { entry: ComponentEntry }) {
  const doc = DOCS[entry.name];
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6 lg:p-10">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <span className="rounded bg-zinc-100 px-2 py-0.5 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
              {entry.category}
            </span>
            <StatusBadge status="ready" />
          </div>
          <h1 className="font-mono text-3xl font-bold tracking-tight">{entry.name}</h1>
          <p className="max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">{entry.description}</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[3px] border border-[#0a0a0b]/20 bg-white p-5 dark:border-white/15 dark:bg-[#0e0f11]">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-60">Preview</h2>
          <div className="bg-survey mt-3 flex min-h-40 items-center justify-center rounded-[2px] border border-dashed border-[#0a0a0b]/25 p-8 dark:border-white/20">
            {(() => {
              const Demo = lookupDemo(entry.name);
              return Demo ? (
                <div className="w-full max-w-3xl">
                  <Demo />
                </div>
              ) : (
                <div className="text-center">
                  <p className="font-mono text-sm font-semibold">{`<${entry.name} />`}</p>
                   <p className="mt-1 text-xs text-zinc-500">A live preview is not available yet.</p>
                </div>
              );
            })()}
          </div>
        </div>
        <div className="rounded-[3px] border border-[#0a0a0b]/20 bg-white p-5 dark:border-white/15 dark:bg-[#0e0f11]">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-60">Usage</h2>
          <pre className="mt-3 overflow-x-auto rounded-[2px] border border-white/10 bg-black p-4 font-mono text-xs leading-5 text-white/85">
            {doc?.usage ?? `import { ${entry.name} } from '@fargone/rite';\n\n<${entry.name} />`}
          </pre>
        </div>
      </div>

      <div className="rounded-[3px] border border-[#0a0a0b]/20 bg-white p-5 dark:border-white/15 dark:bg-[#0e0f11]">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-60">Props</h2>
        {doc && doc.props.length > 0 ? (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-[#0a0a0b]/15 text-[10px] uppercase tracking-[0.18em] opacity-50 dark:border-white/10">
                  <th className="py-2 pr-4 font-medium">Prop</th>
                  <th className="py-2 pr-4 font-medium">Type</th>
                  <th className="py-2 pr-4 font-medium">Default</th>
                  <th className="py-2 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {doc.props.map((p) => (
                  <tr key={p.name} className="border-b border-[#0a0a0b]/8 align-top last:border-0 dark:border-white/8">
                    <td className="py-2 pr-4 font-semibold text-[#d42b1e]">{p.name}</td>
                    <td className="py-2 pr-4 opacity-80">{p.type}</td>
                    <td className="py-2 pr-4 opacity-60">{p.default ?? '—'}</td>
                    <td className="py-2 font-sans text-zinc-600 dark:text-zinc-400">{p.notes ?? ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-2 font-mono text-xs opacity-50">Prop documentation is not available yet.</p>
        )}
      </div>
    </div>
  );
}

function RiteMark() {
  return (
    <img
      src="/favicon.svg"
      alt=""
      aria-hidden="true"
      width={28}
      height={28}
      className="h-7 w-7 rounded-[3px] transition-transform duration-200 group-hover:scale-[1.04]"
    />
  );
}

export default function App() {
  const [view, setView] = useState<View>(() => {
    if (typeof window === 'undefined') return { kind: 'home' };
    const legacy = upgradeLegacyHash();
    if (legacy) {
      window.history.replaceState(null, '', legacy);
      return parsePath(legacy);
    }
    return parsePath(window.location.pathname);
  });
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onPop = () => setView(parsePath(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    if (view.kind === 'component') {
      const entry = COMPONENTS.find((c) => c.name === view.name);
      updateSeo({ kind: 'component', name: view.name, description: entry?.description });
    } else if (view.kind === 'example-site') {
      updateSeo({ kind: 'example-site', id: view.id });
    } else {
      updateSeo({ kind: view.kind });
    }
  }, [view]);

  const go = (v: View) => {
    window.history.pushState(null, '', viewToPath(v));
    setView(v);
    mainRef.current?.scrollTo({ top: 0 });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return COMPONENTS.filter((c) => {
      if (categoryFilter !== 'all' && c.category !== categoryFilter) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    });
  }, [query, categoryFilter]);

  const grouped = useMemo(() => {
    const map = new Map<string, ComponentEntry[]>();
    for (const entry of filtered) {
      const list = map.get(entry.category) ?? [];
      list.push(entry);
      map.set(entry.category, list);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  const selectedEntry =
    view.kind === 'component' ? COMPONENTS.find((c) => c.name === view.name) : undefined;

  if (view.kind === 'example-site') {
    // Rendered flat so the window is the scroller — GSAP ScrollTrigger
    // below-the-fold reveals depend on it. A nested overflow container
    // would leave them stuck at opacity 0 (the big-gap bug).
    const back = () => go({ kind: 'examples' });
    if (view.id === 'meridian') return <MeridianSite onBack={back} />;
    if (view.id === 'ledger') return <LedgerSite onBack={back} />;
    return <VesperSite onBack={back} />;
  }

  const inExamples = view.kind === 'examples';

  return (
    <div className="flex h-full flex-col">
      <header className="flex h-14 shrink-0 items-center gap-4 border-b border-zinc-200 bg-white px-4 sm:px-5 dark:border-zinc-800 dark:bg-zinc-900">
        <button
          className="grid h-8 w-8 place-items-center rounded-md border border-zinc-300 text-sm lg:hidden dark:border-zinc-700"
          onClick={() => setSidebarOpen((v) => !v)}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
        <button onClick={() => go({ kind: 'home' })} className="group flex shrink-0 items-center gap-2.5 text-left">
          <RiteMark />
          <span className="flex items-baseline gap-2">
            <span className="text-[15px] font-bold leading-none tracking-tight">rite</span>
            <span className="text-xs leading-none tabular-nums text-zinc-400 dark:text-zinc-500">
              {COMPONENTS.length}
            </span>
          </span>
        </button>
        <div className="h-5 w-px bg-zinc-200 dark:bg-zinc-800" aria-hidden />
        <nav className="hidden items-center gap-1 sm:flex">
          <button
            onClick={() => go({ kind: 'home' })}
            className={cx(
              'h-8 rounded-md px-3 text-[13px] font-medium',
              view.kind === 'home' || view.kind === 'component' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800',
            )}
          >
            Browse
          </button>
          <button
            onClick={() => go({ kind: 'examples' })}
            className={cx(
              'h-8 rounded-md px-3 text-[13px] font-medium',
              inExamples ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800',
            )}
          >
            Examples
          </button>
        </nav>
        <div className="ml-auto hidden items-center sm:flex">
          <span className="font-mono text-[11px] tabular-nums text-zinc-400 dark:text-zinc-500">
            {inExamples ? '/examples' : view.kind === 'component' ? `/c/${view.name}` : '/'}
          </span>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside
          className={cx(
            'w-72 shrink-0 overflow-y-auto border-r border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900',
            sidebarOpen ? 'absolute z-20 h-[calc(100%-56px)] shadow-xl lg:static lg:z-auto lg:shadow-none' : 'hidden lg:block',
          )}
        >
          <button
            onClick={() => {
              go({ kind: 'examples' });
              setSidebarOpen(false);
            }}
            className={cx(
              'mb-3 w-full rounded-xl border px-3 py-2 text-left text-sm font-medium',
              inExamples
                ? 'border-[#d42b1e] bg-[#d42b1e]/5 text-[#d42b1e]'
                : 'border-[#d42b1e]/50 text-[#d42b1e] hover:bg-[#d42b1e]/5',
            )}
          >
            ◉ Examples <span className="text-xs opacity-70">— {EXAMPLE_SITES.length} sites + sections</span>
          </button>

          <div className="space-y-3">
            <div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search components…"
                className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-1.5 text-sm outline-none placeholder:text-zinc-400 focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-950"
              />
            </div>
            <div>
              <p className="px-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Category</p>
              <div className="mt-1 flex flex-wrap gap-1">
                <button
                  onClick={() => setCategoryFilter('all')}
                  className={cx(
                    'rounded-full px-2.5 py-1 text-xs font-medium',
                    categoryFilter === 'all'
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300',
                  )}
                >
                  All
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={cx(
                      'rounded-full px-2.5 py-1 text-xs font-medium',
                      categoryFilter === cat
                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300',
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <nav className="mt-4 space-y-4 pb-6">
            {grouped.map(([category, entries]) => (
              <div key={category}>
                <p className="px-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  {category} · {entries.length}
                </p>
                <ul className="mt-1 space-y-0.5">
                  {entries.map((entry) => {
                    const active = view.kind === 'component' && view.name === entry.name;
                    return (
                      <li key={entry.name}>
                        <button
                          onClick={() => {
                            go({ kind: 'component', name: entry.name });
                            setSidebarOpen(false);
                          }}
                          className={cx(
                            'flex w-full items-center rounded-lg px-2 py-1.5 text-left text-sm',
                            active
                              ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                              : 'hover:bg-zinc-100 dark:hover:bg-zinc-800',
                          )}
                        >
                          <span className="font-mono">{entry.name}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
            {grouped.length === 0 && (
              <p className="px-2 text-sm text-zinc-500">No components match “{query}”.</p>
            )}
          </nav>
        </aside>

        <main ref={mainRef} className="min-w-0 flex-1 overflow-y-auto bg-zinc-50 dark:bg-zinc-950">
          {view.kind === 'examples' ? (
            <Examples onOpenSite={(id) => go({ kind: 'example-site', id })} />
          ) : selectedEntry ? (
            <ComponentPage entry={selectedEntry} />
          ) : view.kind === 'component' ? (
            <div className="p-10 text-sm text-zinc-500">Unknown component.</div>
          ) : (
            <HomePage onSelect={(name) => go({ kind: 'component', name })} onExamples={() => go({ kind: 'examples' })} />
          )}
        </main>
      </div>
    </div>
  );
}
