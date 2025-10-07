/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header row (single cell, not two columns)
  const headerRow = ['Accordion (accordion18)'];
  const rows = [headerRow];

  // Find all direct children with class 'divider' (each represents an accordion item)
  const accordionItems = element.querySelectorAll(':scope > .divider');

  accordionItems.forEach((item) => {
    // Each item should have a grid with two children: title and content
    const grid = item.querySelector('.w-layout-grid');
    if (!grid) return;
    const gridChildren = grid.querySelectorAll(':scope > div');
    if (gridChildren.length < 2) return;
    const title = gridChildren[0];
    const content = gridChildren[1];
    rows.push([title, content]);
  });

  // Create the table using DOMUtils, then fix the header row to span two columns
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Fix the header row to span two columns
  const headerTr = table.querySelector('tr');
  if (headerTr && headerTr.children.length === 1) {
    headerTr.children[0].setAttribute('colspan', '2');
  }
  element.replaceWith(table);
}
