/* eslint-disable */
/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  const img = element.querySelector('.hb-item picture img, .hb-item img.hb__img');
  if (img) {
    const image = document.createElement('img');
    image.src = img.getAttribute('src');
    image.alt = img.getAttribute('alt') || '';
    cells.push([image]);
  } else {
    cells.push(['']);
  }

  const content = [];
  const srcHeading = element.querySelector('.hb__heading');
  if (srcHeading) {
    // Page hero (3x1) keeps H1; other heroes are demoted to H2.
    const level = element.querySelector('.hero-3x1') ? 'h1' : 'h2';
    const h = document.createElement(level);
    h.textContent = srcHeading.textContent.trim();
    content.push(h);
  }

  const sub = element.querySelector('.hb__subheading');
  if (sub) {
    const p = document.createElement('p');
    p.textContent = sub.textContent.trim();
    content.push(p);
  }

  const buttons = [...element.querySelectorAll('.flexLayout a')];
  if (buttons.length) {
    const p = document.createElement('p');
    buttons.forEach((btn, i) => {
      const a = document.createElement('a');
      a.href = btn.getAttribute('href');
      a.textContent = btn.textContent.trim();
      const isPrimary = /primary/.test(btn.className) || (i === 0 && !/secondary/.test(btn.className));
      const wrap = document.createElement(isPrimary ? 'strong' : 'em');
      wrap.append(a);
      if (i > 0) p.append(' ');
      p.append(wrap);
    });
    content.push(p);
  }

  // Optional location caption link (e.g. "W Maldives").
  const caption = [...element.querySelectorAll('.hb__cnt-sec > a')].find((a) => a.textContent.trim());
  if (caption) {
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.href = caption.getAttribute('href');
    a.textContent = caption.textContent.trim();
    p.append(a);
    content.push(p);
  }

  cells.push([content]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-overlay', cells });
  element.replaceWith(block);
}
