/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all non-empty text nodes and inline elements
  const cells = [];
  Array.from(element.childNodes).forEach(node => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      // If it's an element, preserve it
      cells.push(node);
    } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      // If it's a non-empty text node, preserve it
      const span = document.createElement('span');
      span.textContent = node.textContent.trim();
      cells.push(span);
    }
  });

  // If no content, create an empty cell
  if (cells.length === 0) {
    cells.push(document.createElement('span'));
  }

  // Always use the correct block name for the header
  const headerRow = ['Columns block (columns1)'];
  const contentRow = cells;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
