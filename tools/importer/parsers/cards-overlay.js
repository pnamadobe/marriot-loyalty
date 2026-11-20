/* eslint-disable */
/* global WebImporter */
const text = (el) => (el ? el.textContent.replace(/\s+/g, ' ').trim() : '');

export default function parse(element, { document }) {
  const cells = [];

  // Skip glide clones if the carousel duplicated slides.
  const cards = [...element.querySelectorAll('.glide__slides > li:not(.glide__slide--clone) .card-layered-wrapper')];

  cards.forEach((card) => {
    const link = card.querySelector('a[href]');
    const href = link ? link.getAttribute('href') : '';

    // Image in its own cell, outside the card link.
    const srcImg = card.querySelector('picture img, img');
    let image = '';
    if (srcImg) {
      image = document.createElement('img');
      image.src = srcImg.getAttribute('src');
      image.alt = srcImg.getAttribute('alt') || '';
    }

    const body = [];
    const eyebrow = text(card.querySelector('.t-overline-overlay'));
    if (eyebrow) {
      const p = document.createElement('p');
      p.textContent = eyebrow;
      body.push(p);
    }
    const title = text(card.querySelector('.card-layered-header'));
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

    cells.push([image, body]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-overlay', cells });
  element.replaceWith(block);
}
