export const SITE_URL = 'https://rite.fargone.sh';
export const SITE_NAME = 'rite';
export const PACKAGE_NAME = '@fargone/rite';

const DEFAULT_TITLE = 'rite — React Component Library | 179 Components, One Package (@fargone/rite)';
const DEFAULT_DESCRIPTION =
  'rite is a flat React component library: 179 components across layout, inputs, charts, scheduling and more. Install once via the @fargone/rite npm package and import everything from one place.';

export type SeoView =
  | { kind: 'home' }
  | { kind: 'component'; name: string; description?: string }
  | { kind: 'examples' }
  | { kind: 'example-site'; id: string };

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** Keep document title, meta description and canonical URL in sync with the
 *  current route so crawlers and link previews see per-page metadata.
 *  Called from App on every view change. */
export function updateSeo(view: SeoView) {
  let title = DEFAULT_TITLE;
  let description = DEFAULT_DESCRIPTION;
  let path = '/';

  if (view.kind === 'component') {
    path = `/c/${encodeURIComponent(view.name)}`;
    title = `${view.name} — rite component docs | ${PACKAGE_NAME}`;
    description = view.description
      ? `${view.name}: ${view.description}. Live preview, usage example and props table — install via the ${PACKAGE_NAME} npm package.`
      : `${view.name} component — live preview, usage example and props table in the rite docs. Install via the ${PACKAGE_NAME} npm package.`;
  } else if (view.kind === 'examples') {
    path = '/examples';
    title = `Examples — sites & sections built with rite | ${PACKAGE_NAME}`;
    description = `Three completed sites plus liftable page sections, all built exclusively from rite components. Browse Vesper, Meridian and Ledger, or copy any section into your app.`;
  } else if (view.kind === 'example-site') {
    path = `/examples/${encodeURIComponent(view.id)}`;
    const label = view.id.charAt(0).toUpperCase() + view.id.slice(1);
    title = `${label} — example site built with rite | ${PACKAGE_NAME}`;
    description = `${label} is a complete example site built exclusively from rite components. Open the full page or copy any section into your own app.`;
  }

  document.title = title;
  upsertMeta('name', 'description', description);
  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:url', `${SITE_URL}${path === '/' ? '/' : path}`);
  upsertMeta('name', 'twitter:title', title);
  upsertMeta('name', 'twitter:description', description);
  upsertCanonical(`${SITE_URL}/`);
}
