import { loadArea, setConfig } from './ak.js';

// Satisfies require-trusted-types-for; runs before loadPage reaches any sink.
if (window.trustedTypes?.createPolicy) {
  window.trustedTypes.createPolicy('default', {
    createHTML: (input) => input,
    createScriptURL: (input) => input,
    createScript: (input) => input,
  });
}

const hostnames = ['authorkit.dev'];

const locales = {
  '': { lang: 'en' },
  '/de': { lang: 'de' },
  '/es': { lang: 'es' },
  '/fr': { lang: 'fr' },
  '/hi': { lang: 'hi' },
  '/ja': { lang: 'ja' },
  '/zh': { lang: 'zh' },
};

const linkBlocks = [
  { fragment: '/fragments/' },
  { schedule: '/schedules/' },
  { youtube: 'https://www.youtube' },
];

// Blocks with self-managed styles
const components = ['fragment', 'schedule'];

// Dynamic Media (Scene7) images are authored as links: href, or title when the image is linked
const DM_EMPTY_ALT = 'Image without alt text';
const isDm = (url) => /^(https?:)?\/\/[^/]+\/is\/image\//.test(url ?? '');

const dmSrc = (url, width, fmt) => {
  const [base, query = ''] = url.replace(/^\/\//, 'https://').split('?');
  const params = query.split('&').filter((p) => p && !/^(wid|hei|fmt)=/.test(p));
  return `${base}?${[...params, `wid=${width}`, `fmt=${fmt}`].join('&')}`;
};

const dmPicture = (url, alt) => {
  const picture = document.createElement('picture');
  for (const [fmt, type] of [['webp', 'image/webp'], ['jpg', 'image/jpeg']]) {
    for (const [width, media] of [[2000, '(min-width: 600px)'], [750]]) {
      const source = document.createElement('source');
      source.type = type;
      source.srcset = dmSrc(url, width, fmt);
      if (media) source.media = media;
      picture.append(source);
    }
  }
  const img = document.createElement('img');
  img.src = dmSrc(url, 750, 'jpg');
  img.alt = alt === DM_EMPTY_ALT ? '' : alt;
  img.loading = 'lazy';
  picture.append(img);
  return picture;
};

const decorateDynamicMediaLink = (a) => {
  const href = a.getAttribute('href');
  const linked = !isDm(href) && isDm(a.title);
  if (!linked && !isDm(href)) return;
  const text = a.textContent.trim();
  const picture = dmPicture(linked ? a.title : href, text);
  if (linked) {
    a.removeAttribute('title');
    a.replaceChildren(picture);
    return;
  }
  const p = a.parentElement;
  const alone = p?.tagName === 'P' && p.children.length === 1 && p.textContent.trim() === text;
  (alone ? p : a).replaceWith(picture);
};

const decorateDynamicMedia = (area) => area.querySelectorAll('a').forEach(decorateDynamicMediaLink);

// Local previews serve raw authored HTML; Edge Delivery turns :name: tokens into icons server-side
// and content images that point at this site's code resolve once that code is pushed
const decorateLocalPreview = (area) => {
  for (const img of area.querySelectorAll('img[src*="--marriot-loyalty--pnamadobe.aem."]')) {
    img.src = new URL(img.src).pathname;
  }
  // Edge Delivery flattens section-metadata into section classes (style) and data attributes
  for (const meta of area.querySelectorAll('div > div.section-metadata')) {
    const section = meta.parentElement;
    for (const row of meta.children) {
      const [key, value] = [...row.children].map((c) => c.textContent.trim());
      const name = key.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      if (name === 'style') {
        section.classList.add(...value.toLowerCase().split(',').map((s) => s.trim().replace(/\s+/g, '-')));
      } else {
        section.dataset[name.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = value;
      }
    }
    meta.remove();
  }
  const walker = document.createTreeWalker(area.body ?? area, NodeFilter.SHOW_TEXT);
  const nodes = [];
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (/:[a-z0-9-]+:/.test(n.nodeValue)) nodes.push(n);
  }
  for (const node of nodes) {
    const html = node.nodeValue.replace(/[&<>]/g, (c) => `&#${c.charCodeAt(0)};`)
      .replace(/:([a-z0-9-]+):/g, '<span class="icon icon-$1"></span>');
    node.replaceWith(document.createRange().createContextualFragment(html));
  }
};

// How to decorate an area before loading it
const decorateArea = ({ area = document }) => {
  if (window.location.pathname.startsWith('/content/')) decorateLocalPreview(area);
  decorateDynamicMedia(area);

  const eagerLoad = (parent, selector) => {
    const img = parent.querySelector(selector);
    if (!img) return;
    img.removeAttribute('loading');
    img.fetchPriority = 'high';
  };

  eagerLoad(area, 'img');
};

export async function loadPage() {
  setConfig({ hostnames, locales, linkBlocks, components, decorateArea });
  await loadArea();
}
await loadPage();

(function da() {
  const { searchParams } = new URL(window.location.href);
  const hasPreview = searchParams.has('dapreview');
  if (hasPreview) import('../tools/da/da.js').then((mod) => mod.default(loadPage));
  const hasQE = searchParams.has('quick-edit');
  if (hasQE) import('../tools/quick-edit/quick-edit.js').then((mod) => mod.default());
}());
