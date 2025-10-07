/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns15)'];

  // Find the grid layout container (should have 3 children for 3 columns)
  const grid = element.querySelector('.grid-layout');
  let columns = [];

  if (grid) {
    // Get all immediate children of the grid (each column)
    const colEls = Array.from(grid.children);
    // Each column: use the actual child element (text or button)
    columns = colEls.map((col) => {
      // If the column only contains one child, use that child directly
      if (col.children.length === 1) {
        return col.firstElementChild;
      }
      // Otherwise, use the whole column element
      return col;
    });
  } else {
    // Fallback: treat all immediate children of element as columns
    columns = Array.from(element.children);
  }

  // Build the table rows
  const rows = [headerRow, columns];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
