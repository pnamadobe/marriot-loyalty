const hasMedia = (cell) => cell.querySelector('picture, img, .icon');

export default function init(el) {
  const list = document.createElement('ul');
  for (const row of [...el.children]) {
    const li = document.createElement('li');
    for (const cell of [...row.children].filter((c) => c.textContent.trim() || hasMedia(c))) {
      cell.className = cell.textContent.trim() ? 'cards-icon-body' : 'cards-icon-icon';
      li.append(cell);
    }
    const cta = li.querySelector('.cards-icon-body > p:last-child:has(> a:only-child)');
    cta?.classList.add('cards-icon-cta');
    list.append(li);
  }
  el.replaceChildren(list);
}
