const hasMedia = (cell) => cell.querySelector('picture, img, .icon');

export default function init(el) {
  const list = document.createElement('ul');
  for (const row of [...el.children]) {
    const li = document.createElement('li');
    for (const cell of [...row.children].filter((c) => c.textContent.trim() || hasMedia(c))) {
      cell.className = cell.textContent.trim() ? 'cards-image-link-body' : 'cards-image-link-image';
      li.append(cell);
    }
    const links = li.querySelectorAll('.cards-image-link-body a');
    links[links.length - 1]?.classList.add('cards-image-link-link');
    list.append(li);
  }
  el.replaceChildren(list);
}
