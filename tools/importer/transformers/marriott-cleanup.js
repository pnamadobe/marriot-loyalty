/* eslint-disable */
/* global WebImporter */

/*
 * Marriott cleanup transformer.
 *
 * Excluded regions are direct children of .account-page-wrapper addressed by
 * their ORIGINAL nth-child index (page-structure.json excludedRegions). Both
 * this transformer and marriott-sections.js stamp every wrapper child with
 * data-excat-nth="<original index>" before mutating anything, so removals here
 * and <hr> insertions there never shift each other's nth-child lookups,
 * regardless of which transformer runs first.
 */

const WRAPPER = '.account-page-wrapper';
const NTH_ATTR = 'data-excat-nth';

// Original nth-child indexes of .account-page-wrapper children to drop:
// 1 global header, 2 loyalty sub-nav, 4 hotel search widget,
// 11 empty spacer, 15 extended footer links, 16 global footer.
const EXCLUDED_NTH = [1, 2, 4, 11, 15, 16];

function stampWrapperChildren(document) {
  const wrapper = document.querySelector(WRAPPER);
  if (!wrapper || wrapper.querySelector(`:scope > [${NTH_ATTR}]`)) return wrapper;
  [...wrapper.children].forEach((child, i) => child.setAttribute(NTH_ATTR, String(i + 1)));
  return wrapper;
}

// Inline SVG logos are served from the site's code (img/brands/); data: images don't survive import.
const SITE_ORIGIN = 'https://main--marriot-loyalty--pnamadobe.aem.page';

function fixBrandLogo(document) {
  // The live page renders the logo as inline <svg>; snapshots carry it as a data: <img>.
  document.querySelectorAll('.brand-ribbon-logo-container :is(svg, img[src^="data:image/svg"])').forEach((logo) => {
    const img = document.createElement('img');
    img.setAttribute('src', `${SITE_ORIGIN}/img/brands/marriott-bonvoy.svg`);
    img.setAttribute('alt', 'Marriott Bonvoy');
    logo.replaceWith(img);
  });
}

// Section titles are h3s or styled divs in the source; author them as h2 (blocks are tables by now).
function normalizeSectionHeadings(element) {
  const document = element.ownerDocument;
  element.querySelectorAll('h3, .t-title-s').forEach((el) => {
    if (el.closest('table')) return;
    const h2 = document.createElement('h2');
    h2.innerHTML = el.innerHTML;
    el.replaceWith(h2);
  });
}

// Pages import without Marriott's .mi extension, so internal links follow suit.
function stripMiLinks(element) {
  element.querySelectorAll('a[href^="/"]').forEach((a) => {
    const href = a.getAttribute('href');
    if (/^\/default\.mi([?#]|$)/.test(href)) a.setAttribute('href', href.replace('/default.mi', '/'));
    else a.setAttribute('href', href.replace(/\.mi(?=[?#]|$)/, ''));
  });
}

function removeAll(root, selectors) {
  selectors.forEach((sel) => {
    root.querySelectorAll(sel).forEach((el) => el.remove());
  });
}

export default function transform(hookName, element, payload) {
  const document = element.ownerDocument || payload.document;

  if (hookName === 'beforeTransform') {
    const wrapper = stampWrapperChildren(document);

    // Capture excluded regions by reference first, then remove.
    if (wrapper) {
      const excluded = EXCLUDED_NTH
        .map((n) => wrapper.querySelector(`:scope > [${NTH_ATTR}="${n}"]`))
        .filter(Boolean);
      excluded.forEach((el) => el.remove());
    }

    // Overlays, consent and privacy notice (outside the wrapper, under body).
    removeAll(document, [
      '#onetrust-consent-sdk',
      '#notice-popup',
      '.notice-popup-container',
      '#notice-privacy-policy',
      '#teconsent',
      '.modal-popup-container',
      'a.skip-links',
      'next-route-announcer',
      '#a11y-status-message',
      'body > img',
      // Tracking beacons / survey containers (#ZN_*, #batBeacon*) beside the app root.
      'body > div:not(.modal-content)',
    ]);

    fixBrandLogo(document);

    // Screen-reader-only duplicates ("(opens in new window)", repeated card text).
    removeAll(element, ['.sr-only']);

    // Non-authorable elements.
    removeAll(document, ['script', 'style', 'noscript', 'iframe', 'link', 'template']);
  }

  if (hookName === 'afterTransform') {
    removeAll(document, ['script', 'style', 'noscript', 'iframe', 'link']);
    normalizeSectionHeadings(element);
    stripMiLinks(element);

    // Strip temporary stamps and tracking attributes. HTML comments are left alone.
    element.querySelectorAll('*').forEach((el) => {
      [...el.attributes].forEach(({ name }) => {
        if (
          name === NTH_ATTR
          || name.startsWith('data-track')
          || name.startsWith('data-analytics')
          || name.startsWith('data-gtm')
          || name === 'data-custom_click_track_value'
          || name.startsWith('on')
        ) {
          el.removeAttribute(name);
        }
      });
    });
  }
}
