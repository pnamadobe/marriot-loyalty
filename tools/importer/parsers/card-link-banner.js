/* eslint-disable */
/* global WebImporter */
export default function parse(element, { document }) {
  const anchor = element.matches('a') ? element : element.querySelector('a.minicardlink, a');
  const href = anchor ? anchor.getAttribute('href') : '';

  // Cell 1: icon tile (Author Kit :name: icon notation).
  const iconEl = element.querySelector('.miniCardImage [class*="icon-"]');
  const iconName = iconEl ? ([...iconEl.classList].find((c) => c.startsWith('icon-')) || '').replace(/^icon-/, '') : '';
  const img = element.querySelector('.miniCardImage img');
  let media = '';
  if (img) {
    media = document.createElement('img');
    media.src = img.getAttribute('src');
    media.alt = img.getAttribute('alt') || '';
  } else if (iconName) {
    media = document.createElement('p');
    media.textContent = `:${iconName}:`;
  }

  // Cell 2: linked heading + description.
  const body = [];
  const title = element.querySelector('.miniCardBody h2, .miniCardBody h3, .miniCardBody h4');
  if (title) {
    const h = document.createElement(title.tagName.toLowerCase());
    const text = title.textContent.trim();
    if (href) {
      const a = document.createElement('a');
      a.href = href;
      a.textContent = text;
      h.append(a);
    } else {
      h.textContent = text;
    }
    body.push(h);
  }
  element.querySelectorAll('[id$="-DescriptionText"] p').forEach((p) => {
    const np = document.createElement('p');
    np.textContent = p.textContent.trim();
    if (np.textContent) body.push(np);
  });

  const cells = [[media, body]];
  const block = WebImporter.Blocks.createBlock(document, { name: 'card-link-banner', cells });
  element.replaceWith(block);
}
