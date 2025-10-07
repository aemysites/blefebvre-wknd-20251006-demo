/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns21)'];

  // Defensive: find the grid layout container (the direct child of .container)
  const grid = element.querySelector('.container > .w-layout-grid');
  if (!grid) return;

  // Get the four columns (direct children of the grid)
  const columns = Array.from(grid.children);
  if (columns.length < 4) return; // Expecting 4 columns

  // Build the cells for the second row (each cell is the content of a column)
  // We reference the whole column element for resilience
  const secondRow = columns.map(col => col);

  // Create the block table
  const cells = [headerRow, secondRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
