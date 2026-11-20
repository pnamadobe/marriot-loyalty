const check = (td) => {
  const label = document.createElement('span');
  label.className = 'table-comparison-label';
  label.textContent = td.textContent.trim();
  const icon = document.createElement('span');
  icon.className = 'table-comparison-check';
  icon.append(label);
  td.replaceChildren(icon);
};

export default function init(el) {
  const rows = [...el.children];
  if (!rows.length) return;
  const table = document.createElement('table');
  const thead = table.createTHead();
  const tbody = table.createTBody();
  for (const [r, row] of rows.entries()) {
    const tr = (r ? tbody : thead).insertRow();
    for (const [c, cell] of [...row.children].entries()) {
      const isHead = !r || !c;
      const td = document.createElement(isHead ? 'th' : 'td');
      if (isHead) td.scope = r ? 'row' : 'col';
      td.append(...cell.childNodes);
      if (!isHead && td.textContent.trim().toLowerCase() === 'included') check(td);
      tr.append(td);
    }
  }
  const scroller = document.createElement('div');
  scroller.className = 'table-comparison-scroll';
  scroller.tabIndex = 0;
  scroller.append(table);
  el.replaceChildren(scroller);
}
