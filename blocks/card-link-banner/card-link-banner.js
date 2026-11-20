const isMedia = (cell) => !cell.textContent.trim() && cell.querySelector('picture, img, .icon');

export default function init(el) {
  const row = el.querySelector(':scope > div');
  if (!row) return;
  row.classList.add('card-link-banner-inner');
  for (const cell of row.children) {
    cell.classList.add(isMedia(cell) ? 'card-link-banner-icon' : 'card-link-banner-body');
  }
  const link = row.querySelector('.card-link-banner-body a');
  if (!link) return;
  link.classList.add('card-link-banner-link');
  el.classList.add('is-linked');
}
