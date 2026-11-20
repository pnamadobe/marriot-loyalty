/* eslint-disable */
/* global WebImporter */

import heroOverlayParser from './parsers/hero-overlay.js';
import tabsIconPanelParser from './parsers/tabs-icon-panel.js';
import cardLinkBannerParser from './parsers/card-link-banner.js';
import tableComparisonParser from './parsers/table-comparison.js';
import cardsImageLinkParser from './parsers/cards-image-link.js';
import cardsOverlayParser from './parsers/cards-overlay.js';
import cardsIconParser from './parsers/cards-icon.js';
import cardsLogoGridParser from './parsers/cards-logo-grid.js';
import cleanupTransformer from './transformers/marriott-cleanup.js';
import sectionsTransformer from './transformers/marriott-sections.js';
import dmImagesTransformer from './transformers/marriott-dm-images.js';

const PAGE_TEMPLATE = {
  "name": "loyalty",
  "urls": [
    "https://www.marriott.com/loyalty/member-benefits.mi"
  ],
  "representativeUrl": "https://www.marriott.com/loyalty/member-benefits.mi",
  "description": "Marriott Bonvoy loyalty landing pages: photo hero, tier tabs, comparison tables, card grids and brand portfolio",
  "blocks": [
    {
      "name": "hero-overlay",
      "instances": [
        ".hero-banner"
      ]
    },
    {
      "name": "tabs-icon-panel",
      "instances": [
        "section:has(> .membership-tiers__panel)"
      ]
    },
    {
      "name": "card-link-banner",
      "instances": [
        ".minicardlink"
      ]
    },
    {
      "name": "table-comparison",
      "instances": [
        ".table-container"
      ]
    },
    {
      "name": "cards-image-link",
      "instances": [
        ".pointswrapper__cards"
      ]
    },
    {
      "name": "cards-overlay",
      "instances": [
        ".glide:has(.card-layered-wrapper)"
      ]
    },
    {
      "name": "cards-icon",
      "instances": [
        "div:has(> .row.add-gutter-space-top)"
      ]
    },
    {
      "name": "cards-logo-grid",
      "instances": [
        ".brand-ribbon-category-container"
      ]
    }
  ],
  "urlPattern": "/loyalty/*",
  "sections": [
    {
      "id": "s1",
      "name": "hero",
      "selector": [
        ".account-page-wrapper > div:has(.hero-3x1)",
        ".account-page-wrapper > div:nth-child(3)"
      ],
      "style": null,
      "blocks": [
        "hero-overlay"
      ],
      "defaultContent": []
    },
    {
      "id": "s2",
      "name": "membership-tiers",
      "selector": [
        ".account-page-wrapper > div:has(.membership-tiers__heading)",
        ".account-page-wrapper > div:nth-child(5)"
      ],
      "style": "card, centered",
      "blocks": [
        "tabs-icon-panel"
      ],
      "defaultContent": [
        ".membership-tiers__heading"
      ]
    },
    {
      "id": "s3",
      "name": "lifetime-benefits",
      "selector": [
        ".account-page-wrapper > div:has(.minicardlink)",
        ".account-page-wrapper > div:nth-child(6)"
      ],
      "style": null,
      "blocks": [
        "card-link-banner"
      ],
      "defaultContent": []
    },
    {
      "id": "s4",
      "name": "compare-program-benefits",
      "selector": [
        ".account-page-wrapper > div:has(.table-container):has(.disclaimerText)",
        ".account-page-wrapper > div:nth-child(7)"
      ],
      "style": null,
      "blocks": [
        "table-comparison"
      ],
      "defaultContent": [
        ".px-0.mt-md-3 .t-title-s",
        ".disclaimerText"
      ]
    },
    {
      "id": "s5",
      "name": "compare-partner-benefits",
      "selector": [
        ".account-page-wrapper > div:has(.table-container):not(:has(.disclaimerText))",
        ".account-page-wrapper > div:nth-child(8)"
      ],
      "style": null,
      "blocks": [
        "table-comparison"
      ],
      "defaultContent": [
        ".px-0.mt-md-3 .t-title-s"
      ]
    },
    {
      "id": "s6",
      "name": "points",
      "selector": [
        ".account-page-wrapper > div:has(.pointswrapper)",
        ".account-page-wrapper > div:nth-child(9)"
      ],
      "style": "split",
      "blocks": [
        "cards-image-link"
      ],
      "defaultContent": [
        ".pointswrapper__header",
        ".pointswrapper__description",
        ".pointswrapper__list"
      ]
    },
    {
      "id": "s7",
      "name": "join-hero",
      "selector": [
        ".account-page-wrapper > div:has(.hero-2x1)",
        ".account-page-wrapper > div:nth-child(10)"
      ],
      "style": null,
      "blocks": [
        "hero-overlay"
      ],
      "defaultContent": []
    },
    {
      "id": "s8",
      "name": "more-ways-to-explore",
      "selector": [
        ".account-page-wrapper > div:has(.card-layered-wrapper)",
        ".account-page-wrapper > div:nth-child(12)"
      ],
      "style": null,
      "blocks": [
        "cards-overlay"
      ],
      "defaultContent": [
        ".carousal_header"
      ]
    },
    {
      "id": "s9",
      "name": "unlock-more-with-points",
      "selector": [
        ".account-page-wrapper > div:has(.datablock-container)",
        ".account-page-wrapper > div:nth-child(13)"
      ],
      "style": null,
      "blocks": [
        "cards-icon"
      ],
      "defaultContent": [
        ".add-gutter-space-top h2, .add-gutter-space-top h3"
      ]
    },
    {
      "id": "s10",
      "name": "brand-portfolio",
      "selector": [
        ".account-page-wrapper > div:has(.brand-ribbon-full-container)",
        ".account-page-wrapper > div:nth-child(14)"
      ],
      "style": "white, centered",
      "blocks": [
        "cards-logo-grid"
      ],
      "defaultContent": [
        ".brand-ribbon-logo-container",
        ".brand-ribbon-header"
      ]
    }
  ]
};

const TEMPLATE_METADATA = { Subnav: '/fragments/nav/loyalty' };

const parsers = {
  'hero-overlay': heroOverlayParser,
  'tabs-icon-panel': tabsIconPanelParser,
  'card-link-banner': cardLinkBannerParser,
  'table-comparison': tableComparisonParser,
  'cards-image-link': cardsImageLinkParser,
  'cards-overlay': cardsOverlayParser,
  'cards-icon': cardsIconParser,
  'cards-logo-grid': cardsLogoGridParser,
};
// Late transformers change the DOM (section <hr> markers, shared fragments), so their beforeTransform
// runs after block discovery.
const sectionTransformers = [sectionsTransformer];
const fragmentTransformers = [];
const lateTransformers = [...sectionTransformers, ...fragmentTransformers];
// Page corrections ({sitename}-page-corrections.js, when it exists) run last.
const correctionTransformers = [];
const transformers = [cleanupTransformer, dmImagesTransformer, ...lateTransformers, ...correctionTransformers];
const earlyTransformers = transformers.filter((fn) => !lateTransformers.includes(fn));
// Catalog selectors (pageInstances, pageCleanup) count the <script> and <hr> elements the importer
// removes before transform, so a catalog template finds its targets in preprocess.
const CATALOG = Boolean(PAGE_TEMPLATE.pageCleanup || PAGE_TEMPLATE.blocks.some((b) => b.pageInstances));

function executeTransformers(hookName, element, payload, list = transformers) {
  const enhancedPayload = { ...payload, template: payload.params?.targets?.template || PAGE_TEMPLATE };
  list.forEach((fn) => {
    try { fn(hookName, element, enhancedPayload); }
    catch (e) { console.error(`Transformer failed at ${hookName}:`, e); }
  });
}

function findBlocksOnPage(document, template, url) {
  const pageBlocks = [];
  const pageKey = (u) => {
    try { const { origin, pathname } = new URL(u); return `${origin}${pathname.replace(/\/$/, '')}`; }
    catch { return u; }
  };
  const key = pageKey(url);
  const claim = (blockDef, selector) => {
    let matches = [];
    try { matches = document.querySelectorAll(selector); } catch { return; }
    matches.forEach((element) => {
      if (pageBlocks.some((b) => b.element === element || b.element.contains(element) || element.contains(b.element))) return;
      pageBlocks.push({ name: blockDef.name, selector, element });
    });
  };
  template.blocks.forEach((blockDef) => {
    const entry = Object.entries(blockDef.pageInstances || {}).find(([u]) => pageKey(u) === key);
    (entry ? entry[1] : []).forEach((selector) => claim(blockDef, selector));
  });
  template.blocks.forEach((blockDef) => (blockDef.instances || []).forEach((selector) => claim(blockDef, selector)));
  return pageBlocks;
}

// Runs the early transformers, then marks each block and section target with an attribute: the
// importer re-creates the body before transform, so only attributes survive, not element references.
function markPageTargets(payload) {
  const { document, params } = payload;
  executeTransformers('beforeTransform', document.body, payload, earlyTransformers);
  const blocks = findBlocksOnPage(document, PAGE_TEMPLATE, params.originalURL).map(({ name, selector, element }, i) => {
    element.setAttribute('data-excat-block', String(i));
    return { name, selector };
  });
  const sections = (PAGE_TEMPLATE.sections || []).map((section, i) => {
    const target = (section.selector || []).map((s) => { try { return document.querySelector(s); } catch { return null; } }).find(Boolean);
    if (!target) return section;
    target.setAttribute('data-excat-section', String(i));
    return { ...section, selector: [`[data-excat-section="${i}"]`] };
  });
  params.targets = { blocks, template: { ...PAGE_TEMPLATE, sections } };
}

export default {
  preprocess: (payload) => {
    if (CATALOG) markPageTargets(payload);
  },
  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;
    params.fragments = [];

    if (!params.targets) markPageTargets(payload);
    const pageBlocks = params.targets.blocks
      .map((block, i) => ({ ...block, element: document.querySelector(`[data-excat-block="${i}"]`) }))
      .filter((block) => block.element);
    executeTransformers('beforeTransform', main, { ...payload, pageBlocks }, lateTransformers);

    pageBlocks.forEach((block) => {
      if (!main.contains(block.element)) return;
      const parser = parsers[block.name];
      if (!parser) return;
      try { parser(block.element, { document, url, params }); }
      catch (e) { console.error(`Failed to parse ${block.name} (${block.selector}):`, e); }
    });

    executeTransformers('afterTransform', main, payload);

    main.appendChild(document.createElement('hr'));
    // Page metadata plus the template's own entries (loyalty pages show the loyalty sub-navigation).
    const metadata = { ...WebImporter.Blocks.getMetadata(document), ...TEMPLATE_METADATA };
    main.append(WebImporter.Blocks.getMetadataBlock(document, metadata));
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // A fragment's nodes left `main` before afterTransform: finalize it the same way, without the
    // page-only section breaks and metadata.
    params.fragments.forEach(({ element }) => {
      executeTransformers('afterTransform', element, payload, earlyTransformers);
      WebImporter.rules.transformBackgroundImages(element, document);
      WebImporter.rules.adjustImageUrls(element, url, params.originalURL);
    });

    const rawPath = new URL(params.originalURL).pathname
      .replace(/\/$/, '')
      .replace(/\.(html?|mi)$/, '');
    const path = WebImporter.FileUtils.sanitizePath(rawPath === '' ? '/index' : rawPath);

    return [{
      element: main,
      path,
      report: { title: document.title, template: PAGE_TEMPLATE.name, blocks: pageBlocks.map((b) => b.name) },
    }, ...params.fragments];
  },
};
