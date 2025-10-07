/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the two columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the two columns (left: text, right: image)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: contains all text, breadcrumbs, heading, author, date, social icons
  const leftCol = columns[0];
  // Right column: contains the image
  const rightCol = columns[1];

  // --- Left column content ---
  // We'll keep the entire leftCol content as is, for resilience

  // --- Right column content ---
  // Find the image in the right column (could be wrapped in a div)
  let imageEl = rightCol.querySelector('img');
  let rightContent = imageEl ? imageEl : rightCol;

  // Table header row (block name)
  const headerRow = ['Columns block (columns32)'];
  // Table content row: left column, right column
  const contentRow = [leftCol, rightContent];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
