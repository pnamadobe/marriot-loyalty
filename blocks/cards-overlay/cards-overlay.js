const hasMedia = (cell) => cell.querySelector('picture, img, .icon');

export default function init(el) {
  const list = document.createElement('ul');
  for (const row of [...el.children]) {
    const li = document.createElement('li');
    for (const cell of [...row.children].filter((c) => c.textContent.trim() || hasMedia(c))) {
      cell.className = cell.textContent.trim() ? 'cards-overlay-body' : 'cards-overlay-image';
      li.append(cell);
    }
    const heading = li.querySelector('.cards-overlay-body :is(h2, h3, h4, h5, h6)');
    heading?.previousElementSibling?.classList.add('cards-overlay-eyebrow');
    const links = li.querySelectorAll('.cards-overlay-body a');
    links[links.length - 1]?.classList.add('cards-overlay-link');
    list.append(li);
  }
  el.replaceChildren(list);
}
