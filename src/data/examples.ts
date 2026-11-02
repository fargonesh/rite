export interface ExampleSiteMeta {
  id: string;
  title: string;
  blurb: string;
  tags: string[];
}

export const EXAMPLE_SITES: ExampleSiteMeta[] = [
  {
    id: 'vesper',
    title: 'Vesper — Vigil Holds',
    blurb: 'Containment-OS landing: split hero, index rows, relics, console form, boot-log footer.',
    tags: ['Landing', 'Hero', 'Form', 'Pricing'],
  },
  {
    id: 'meridian',
    title: 'Meridian — SaaS starter',
    blurb: 'Decrypt hero, live console preview, count-up metrics, six features, ritual, testimonies, 3-tier pricing, FAQ, trial console.',
    tags: ['Landing', 'Hero', 'Pricing', 'Form', 'FAQ'],
  },
  {
    id: 'ledger',
    title: 'Ledger — ops dashboard',
    blurb: 'Live night clock, KPI sparklines, breach protocol, sector-filtered exhibits, signals chart, verdict split, roster, streaming boot log.',
    tags: ['Dashboard', 'Table', 'Charts', 'Timeline'],
  },
];

export function isExampleSiteId(id: string): boolean {
  return EXAMPLE_SITES.some((s) => s.id === id);
}
