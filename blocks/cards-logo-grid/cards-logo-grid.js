const hasMedia = (node) => node.querySelector('picture, img, .icon');

export default function init(el) {
  const list = document.createElement('ul');
  for (const row of [...el.children]) {
    const li = document.createElement('li');
    for (const cell of [...row.children].filter((c) => c.textContent.trim() || hasMedia(c))) {
      cell.className = cell.textContent.trim() ? 'cards-logo-grid-body' : 'cards-logo-grid-image';
      li.append(cell);
    }
    const body = li.querySelector('.cards-logo-grid-body');
    const logos = document.createElement('div');
    logos.className = 'cards-logo-grid-logos';
    for (const p of body?.querySelectorAll(':scope > p') ?? []) {
      if (!p.textContent.trim() && hasMedia(p)) logos.append(...p.childNodes);
    }
    if (logos.children.length) {
      body.querySelectorAll(':scope > p:empty').forEach((p) => p.remove());
      body.append(logos);
    }
    list.append(li);
  }
  el.replaceChildren(list);
}
