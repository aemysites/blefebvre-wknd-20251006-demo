/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Columns block (columns8)
  const headerRow = ['Columns block (columns8)'];

  // Find the grid container (the columns block)
  let grid = element.querySelector('.w-layout-grid, .grid-layout');
  if (!grid) grid = element;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children).filter((child) => child.nodeType === 1);

  // Defensive extraction: left column is heading, right column is paragraph+button
  let leftCol = '', rightCol = '';
  if (columns.length === 2) {
    // Left: heading (h2), Right: content (div)
    leftCol = columns[0].querySelector('h2') ? columns[0].querySelector('h2') : columns[0];
    rightCol = columns[1];
  } else if (columns.length === 1) {
    // Only one column, try to split by h2
    const h2 = columns[0].querySelector('h2');
    if (h2) {
      leftCol = h2;
      // Gather all siblings after h2 for rightCol
      let frag = document.createDocumentFragment();
      let node = h2.nextSibling;
      while (node) {
        frag.appendChild(node.cloneNode(true));
        node = node.nextSibling;
      }
      rightCol = frag;
    } else {
      rightCol = columns[0];
    }
  } else {
    // Fallback: try to find h2 anywhere
    const h2 = grid.querySelector('h2');
    if (h2) {
      leftCol = h2;
      let frag = document.createDocumentFragment();
      let node = h2.nextSibling;
      while (node) {
        frag.appendChild(node.cloneNode(true));
        node = node.nextSibling;
      }
      rightCol = frag;
    }
  }

  // Ensure all text and elements are included, and reference existing elements
  // Compose the content row
  const contentRow = [leftCol, rightCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
