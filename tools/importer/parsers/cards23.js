/* global WebImporter */
export default function parse(element, { document }) {
  // Combine all cards from all tabs into a single Cards (cards23) table
  const rows = [['Cards (cards23)']];
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  tabPanes.forEach((tabPane) => {
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    const cardLinks = grid.querySelectorAll('a.utility-link-content-block, a.card-link');
    cardLinks.forEach((card) => {
      // Card image (if present)
      const img = card.querySelector('img');
      // Card title (h3)
      const title = card.querySelector('h3');
      // Card description (div.paragraph-sm)
      const desc = card.querySelector('.paragraph-sm');
      // First cell: image element or empty string
      const imgCell = img ? img.cloneNode(true) : '';
      // Second cell: text content (title + desc)
      let textCell = '';
      if (title || desc) {
        textCell = document.createElement('div');
        if (title) {
          const h = document.createElement('h3');
          h.textContent = title.textContent;
          textCell.appendChild(h);
        }
        if (desc) {
          const p = document.createElement('p');
          p.textContent = desc.textContent;
          textCell.appendChild(p);
        }
      }
      rows.push([imgCell, textCell]);
    });
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
