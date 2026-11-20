/* eslint-disable */
/* global WebImporter */
const text = (el) => (el ? el.textContent.replace(/\s+/g, ' ').trim() : '');

function para(document, value, wrapTag) {
  const p = document.createElement('p');
  if (wrapTag) {
    const w = document.createElement(wrapTag);
    w.textContent = value;
    p.append(w);
  } else {
    p.textContent = value;
  }
  return p;
}

export default function parse(element, { document }) {
  const cells = [];
  const table = element.querySelector('table');
  if (!table) return;

  // Header: corner label + one cell per tier (name + qualifying nights).
  const tierRow = table.querySelector('thead tr.elite-header');
  const tierCells = tierRow ? [...tierRow.children] : [];
  const corner = text(tierCells[0]);
  const tiers = tierCells.slice(1).map(text);
  const nightsRow = [...table.querySelectorAll('thead tr')]
    .find((tr) => tr !== tierRow && !tr.classList.contains('row-header-inline'));
  const nights = nightsRow ? [...nightsRow.children].map(text) : [];
  const cols = tiers.length;

  cells.push([
    corner,
    ...tiers.map((tier, i) => {
      const c = [para(document, tier, 'strong')];
      if (nights[i]) c.push(para(document, nights[i]));
      return c;
    }),
  ]);

  // Body: skip .row-header-inline rows (mobile duplicates of the benefit cell).
  const bodyRows = [...table.querySelectorAll('tbody tr')]
    .filter((tr) => !tr.classList.contains('row-header-inline'))
    .filter((tr) => tr.children.length > 1);

  bodyRows.forEach((tr) => {
    const [head, ...values] = [...tr.children];
    const benefit = [];
    const name = text(head.querySelector('[id="body-row-header"]'));
    const desc = text(head.querySelector('[id="body-row-sub-header"]'));
    if (name) benefit.push(para(document, name, 'strong'));
    if (desc) benefit.push(para(document, desc));
    head.querySelectorAll('a[href]').forEach((link) => {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = link.getAttribute('href');
      a.textContent = text(link);
      p.append(a);
      benefit.push(p);
    });

    const row = [benefit];
    for (let i = 0; i < cols; i += 1) {
      const td = values[i];
      const value = text(td);
      if (value) row.push(value);
      else if (td && td.querySelector('.icon-check')) row.push('Included');
      else row.push('');
    }
    cells.push(row);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'table-comparison', cells });
  element.replaceWith(block);
}
