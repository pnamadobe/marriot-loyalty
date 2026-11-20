/* eslint-disable */
/* global WebImporter */
const text = (el) => (el ? el.textContent.replace(/\s+/g, ' ').trim() : '');

// Brand name for alt text: aria-label on the live page, else derived from the URL.
function brandName(link) {
  const aria = (link.getAttribute('aria-label') || '').trim();
  if (aria) return aria;
  const href = link.getAttribute('href') || '';
  try {
    const u = new URL(href, 'https://www.marriott.com');
    const slug = u.pathname.match(/\/brands\/([^/.]+)/);
    const base = slug ? slug[1] : u.hostname.replace(/^www\./, '').split('.')[0];
    return base.split('-').filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
  } catch (e) {
    return 'Brand logo';
  }
}

// Absolute so the importer's image-URL rule keeps it and DA can ingest it from the site's code.
const SITE_ORIGIN = 'https://main--marriot-loyalty--pnamadobe.aem.page';
const brandSlug = (s) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function svgToDataUri(svg) {
  const markup = svg.outerHTML;
  const b64 = typeof btoa === 'function'
    ? btoa(unescape(encodeURIComponent(markup)))
    : Buffer.from(markup, 'utf8').toString('base64');
  return `data:image/svg+xml;base64,${b64}`;
}

export default function parse(element, { document }) {
  const cells = [];

  const cards = [...element.querySelectorAll('.brand-ribbon-category-label')]
    .map((label) => label.closest('.brand-ribbon-category-container > div') || label.parentElement.parentElement);

  cards.forEach((card) => {
    const body = [];
    const title = text(card.querySelector('.brand-ribbon-category-label'));
    if (title) {
      const h = document.createElement('h3');
      h.textContent = title;
      body.push(h);
    }
    const desc = text(card.querySelector('.brand-ribbon-category-description'));
    if (desc) {
      const p = document.createElement('p');
      p.textContent = desc;
      body.push(p);
    }

    // One paragraph per linked logo; logos stay images (never inline SVG markup).
    card.querySelectorAll('.brand-ribbon-category-list-item a[href]').forEach((link) => {
      const srcImg = link.querySelector('img');
      const svg = link.querySelector('svg');
      let src = '';
      if (srcImg) src = srcImg.getAttribute('src') || '';
      else if (svg) src = svgToDataUri(svg);
      const name = brandName(link);
      // Inline SVG logos live as files in img/brands/ (extracted once), so the page holds no data URIs.
      if (src.startsWith('data:image/svg+xml')) src = `${SITE_ORIGIN}/img/brands/${brandSlug(name)}.svg`;

      // Screen-reader "(opens in new window)" text is dropped; Author Kit's #_blank flag keeps the behavior.
      const newWindow = link.getAttribute('target') === '_blank' || /new window/i.test(text(link.querySelector('.sr-only')));
      const a = document.createElement('a');
      const href = link.getAttribute('href');
      a.href = newWindow && !href.includes('#') ? `${href}#_blank` : href;
      if (src) {
        const img = document.createElement('img');
        img.src = src;
        img.alt = name;
        a.append(img);
      } else {
        a.textContent = name;
      }
      const p = document.createElement('p');
      p.append(a);
      body.push(p);
    });

    cells.push(['', body]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-logo-grid', cells });
  element.replaceWith(block);
}
