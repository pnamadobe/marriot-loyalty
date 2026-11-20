/* eslint-disable */
/* global WebImporter */
const text = (el) => (el ? el.textContent.replace(/\s+/g, ' ').trim() : '');

export default function parse(element, { document }) {
  const cells = [];

  element.querySelectorAll('.pointswrapper__card').forEach((card) => {
    const link = card.querySelector('a[href]');
    const href = link ? link.getAttribute('href') : '';

    // Image goes in its own cell, outside the card link (DM transformer skips
    // images inside mixed-content anchors).
    const srcImg = card.querySelector('picture img, img');
    let image = '';
    if (srcImg) {
      image = document.createElement('img');
      image.src = srcImg.getAttribute('src');
      image.alt = srcImg.getAttribute('alt') || '';
    }

    const body = [];
    const title = text(card.querySelector('.card-vertical_heading'));
    if (title) {
      const h = document.createElement('h3');
      if (href) {
        const a = document.createElement('a');
        a.href = href;
        a.textContent = title;
        h.append(a);
      } else {
        h.textContent = title;
      }
      body.push(h);
    }
    const desc = text(card.querySelector('.card-vertical_description'));
    if (desc) {
      const p = document.createElement('p');
      p.textContent = desc;
      body.push(p);
    }

    cells.push([image, body]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-image-link', cells });
  element.replaceWith(block);
}
