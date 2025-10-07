/* global WebImporter */
export default function parse(element, { document }) {
  // Columns block (columns33) parsing for two-column layout
  // Get the main grid container (holds image and text column)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const children = Array.from(grid.children);

  // Defensive: Expect two columns (image, text)
  let imgCol = null;
  let textCol = null;
  // Find image and text columns
  children.forEach((child) => {
    if (child.tagName === 'IMG') {
      imgCol = child;
    } else {
      textCol = child;
    }
  });

  // Defensive: If missing either column, abort
  if (!imgCol || !textCol) return;

  // For the text column, extract all relevant content as a single block
  // This includes eyebrow, tag, heading, and metadata
  // We'll reference the entire textCol element for resilience

  // Table header
  const headerRow = ['Columns block (columns33)'];
  // Table content row: [image, text column]
  const contentRow = [imgCol, textCol];

  // Build the table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
