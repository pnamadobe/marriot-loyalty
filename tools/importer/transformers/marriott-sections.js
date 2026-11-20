/* eslint-disable */
/* global WebImporter */

/*
 * Marriott sections transformer.
 *
 * beforeTransform: inserts <hr> section breaks (reverse order, while parser
 * targets still exist) and marks styled sections' breaks with
 * data-excat-section-id. afterTransform: appends a Section Metadata block to
 * each styled section and drops the temporary markers.
 *
 * Wrapper children are stamped with data-excat-nth="<original index>" (shared
 * with marriott-cleanup.js) so nth-child fallbacks keep resolving to the
 * original elements after excluded regions are removed or <hr>s inserted.
 */

const WRAPPER = '.account-page-wrapper';
const NTH_ATTR = 'data-excat-nth';
const MARKER_ATTR = 'data-excat-section-id';

function stampWrapperChildren(document) {
  const wrapper = document.querySelector(WRAPPER);
  if (!wrapper || wrapper.querySelector(`:scope > [${NTH_ATTR}]`)) return;
  [...wrapper.children].forEach((child, i) => child.setAttribute(NTH_ATTR, String(i + 1)));
}

function toStampSelector(selector) {
  return selector.replace(/>\s*div:nth-child\((\d+)\)/g, `> div[${NTH_ATTR}="$1"]`);
}

function findSectionElement(document, section) {
  const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
  for (const sel of selectors) {
    if (!sel) continue;
    const candidates = /:nth-child\(/.test(sel) ? [toStampSelector(sel), sel] : [sel];
    for (const candidate of candidates) {
      try {
        const el = document.querySelector(candidate);
        if (el) return el;
      } catch (e) {
        // invalid selector in this engine; try the next one
      }
    }
  }
  return null;
}

function createHr(document, sectionId) {
  const hr = document.createElement('hr');
  if (sectionId) hr.setAttribute(MARKER_ATTR, sectionId);
  return hr;
}

export default function transform(hookName, element, payload) {
  const document = element.ownerDocument || payload.document;
  const sections = (payload && payload.template && payload.template.sections) || [];
  if (sections.length < 2) return;

  if (hookName === 'beforeTransform') {
    stampWrapperChildren(document);

    // Resolve every section before mutating anything.
    const resolved = sections.map((section) => findSectionElement(document, section));

    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      const el = resolved[i];
      if (!el || !el.parentNode) continue;
      if (i > 0) {
        el.before(createHr(document, section.style ? section.id : null));
      } else if (section.style) {
        // Temporary marker for a styled first section; removed in afterTransform.
        el.before(createHr(document, section.id));
      }
    }
  }

  if (hookName === 'afterTransform') {
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      const marker = document.querySelector(`hr[${MARKER_ATTR}="${section.id}"]`);

      if (section.style) {
        const metadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });

        if (marker) {
          // Place metadata at the end of the section: before the next break.
          let next = marker.nextElementSibling;
          while (next && next.tagName !== 'HR') next = next.nextElementSibling;
          if (next) next.before(metadata);
          else marker.parentNode.append(metadata);
        } else {
          const el = findSectionElement(document, section);
          if (el && el.parentNode) el.after(metadata);
        }
      }

      if (marker) {
        if (i === 0) marker.remove();
        else marker.removeAttribute(MARKER_ATTR);
      }
    }
  }
}
