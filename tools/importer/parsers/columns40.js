/* global WebImporter */
export default function parse(element, { document }) {
  // Columns block (columns40)
  // html-comment: model fields: image (per column)
  const headerRow = ['Columns block (columns40)'];

  // Select all direct children (columns)
  const columns = Array.from(element.children);
  // For each column, reference the image element if present
  const cells = columns.map(col => {
    const img = col.querySelector('img');
    // Reference the image element itself, not a clone, and not the src string
    return img || col;
  });

  // Table rows: header, then columns row
  const tableRows = [
    headerRow,
    cells
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Model field comments for each image (for mapping)
  cells.forEach((cell, idx) => {
    if (cell.tagName === 'IMG') {
      block.rows[1].cells[idx].prepend(document.createComment(`model field: image`));
    }
  });

  // Replace the original element with the block table
  element.replaceWith(block);
}
