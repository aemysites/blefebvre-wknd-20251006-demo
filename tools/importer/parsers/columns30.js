/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns30)'];

  // Get all immediate children (columns) of the grid
  const columns = Array.from(element.children);

  // Defensive: If the columns are not direct children, check for nested structure
  let cells = [];
  columns.forEach(col => {
    // For each column, find the first image (preserving reference)
    const img = col.querySelector('img');
    if (img) {
      cells.push(img);
    } else {
      cells.push('');
    }
  });

  // If no columns found, fallback to direct images
  if (cells.length === 0) {
    const imgs = Array.from(element.querySelectorAll('img'));
    if (imgs.length > 0) {
      cells = imgs;
    } else {
      cells = [''];
    }
  }

  // Second row: one cell per column/image
  const contentRow = cells;

  // Build the table data
  const tableData = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
