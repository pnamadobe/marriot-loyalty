let uid = 0;

const isIcon = (node) => !node.textContent.trim() && node.querySelector('picture, img, .icon');

function decoratePanel(panel) {
  const features = document.createElement('div');
  features.className = 'tabs-icon-panel-features';
  let feature;
  let titled;
  let afterIcon;
  for (const child of [...panel.children]) {
    const icon = isIcon(child);
    const heading = /^H[1-6]$/.test(child.tagName);
    if (icon || (heading && titled && !afterIcon)) {
      feature = document.createElement('div');
      feature.className = 'tabs-icon-panel-feature';
      features.append(feature);
    }
    afterIcon = icon;
    titled ||= heading;
    feature?.append(child);
  }
  if (feature) panel.append(features);
}

export default function init(el) {
  uid += 1;
  const buttons = [];
  const panels = [];
  const select = (idx, focus) => {
    buttons.forEach((tab, i) => {
      tab.setAttribute('aria-selected', i === idx);
      tab.tabIndex = i === idx ? 0 : -1;
      panels[i].hidden = i !== idx;
    });
    if (focus) buttons[idx].focus();
  };

  for (const row of [...el.children].filter((r) => r.children[1])) {
    const [label, panel] = row.children;
    const idx = buttons.length;
    const id = `tabs-icon-panel-${uid}-${idx}`;
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.role = 'tab';
    tab.id = `${id}-tab`;
    tab.textContent = label.textContent.trim();
    tab.setAttribute('aria-controls', `${id}-panel`);
    tab.addEventListener('click', () => select(idx));
    panel.id = `${id}-panel`;
    panel.role = 'tabpanel';
    panel.className = 'tabs-icon-panel-panel';
    panel.setAttribute('aria-labelledby', tab.id);
    decoratePanel(panel);
    buttons.push(tab);
    panels.push(panel);
  }
  if (!buttons.length) return;

  const tabList = document.createElement('div');
  tabList.className = 'tabs-icon-panel-list';
  tabList.role = 'tablist';
  tabList.append(...buttons);
  tabList.addEventListener('keydown', (e) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const { length } = buttons;
    select((buttons.indexOf(document.activeElement) + step + length) % length, true);
  });
  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'tabs-icon-panel-next';
  next.ariaLabel = 'Scroll tabs';
  next.addEventListener('click', () => {
    const end = tabList.scrollLeft + tabList.clientWidth >= tabList.scrollWidth - 1;
    tabList.scrollTo({ left: end ? 0 : tabList.scrollLeft + buttons[0].offsetWidth, behavior: 'smooth' });
  });
  const nav = document.createElement('div');
  nav.className = 'tabs-icon-panel-nav';
  nav.append(tabList, next);
  el.replaceChildren(nav, ...panels);
  select(0);
}
