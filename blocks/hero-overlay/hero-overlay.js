export default function init(el) {
  const rows = [...el.querySelectorAll(':scope > div')];
  const fg = rows.pop();
  fg?.classList.add('hero-overlay-content');
  const bg = rows.pop();
  if (bg) bg.classList.add('hero-overlay-bg');
  else el.classList.add('no-image');
}
