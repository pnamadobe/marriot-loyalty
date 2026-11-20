/* eslint-disable */
/* global WebImporter */
const text = (el) => (el ? el.textContent.replace(/\s+/g, ' ').trim() : '');

export default function parse(element, { document }) {
  const cells = [];

  element.querySelectorAll('.datablock-container').forEach((card) => {
    const iconEl = card.querySelector('.data-block-large-icon, [class*="icon-"]');
    const iconName = iconEl
      ? ([...iconEl.classList].find((c) => c.startsWith('icon-') && c !== 'icon-decorative') || '').replace(/^icon-/, '')
      : '';
    let media = '';
    const srcImg = card.querySelector('img');
    if (srcImg) {
      media = document.createElement('img');
      media.src = srcImg.getAttribute('src');
      media.alt = srcImg.getAttribute('alt') || '';
    } else if (iconName) {
      media = document.createElement('p');
      media.textContent = `:${iconName}:`;
    }

    const body = [];
    const title = text(card.querySelector('.data-block-heading'));
    if (title) {
      const h = document.createElement('h3');
      h.textContent = title;
      body.push(h);
    }
    card.querySelectorAll('.data-block-text-content p').forEach((p) => {
      const t = text(p);
      if (!t) return;
      const np = document.createElement('p');
      np.textContent = t;
      body.push(np);
    });
    // CTA is a sibling of .data-block-text-content, not inside it.
    card.querySelectorAll('a[href]').forEach((link) => {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = link.getAttribute('href');
      a.textContent = text(link);
      p.append(a);
      body.push(p);
    });

    cells.push([media, body]);
  });

  // Section heading ("Unlock More with Points") is default content: keep it before the block.
  const heading = element.querySelector('.add-gutter-space-top > div > h2, .add-gutter-space-top > div > h3');
  if (heading) element.before(heading);

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-icon', cells });
  element.replaceWith(block);
}
