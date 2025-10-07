/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout (the columns block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Prepare the header row for the block
  const headerRow = ['Columns block (columns4)'];

  // Prepare the content row with as many columns as in the grid
  // Use the entire column element for each cell for resilience
  const contentRow = columns;

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
