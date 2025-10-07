/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns28)'];

  // Find the main grid layout (the columns container)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the immediate children of the grid (should be two: left content, right image)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Left column: all text content and button
  const leftCol = gridChildren[0];
  // Right column: the image
  const rightCol = gridChildren[1];

  // For the left column, collect all children as a single cell content
  // This ensures resilience to minor DOM variations
  const leftCellContent = Array.from(leftCol.childNodes).filter(
    (node) => node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())
  );

  // For the right column, use the image element directly
  let rightCellContent = rightCol;
  // Defensive: if the rightCol is not an image, look for an image inside
  if (!(rightCol.tagName && rightCol.tagName.toLowerCase() === 'img')) {
    const img = rightCol.querySelector('img');
    if (img) rightCellContent = img;
  }

  // Compose the table rows
  const rows = [
    headerRow,
    [leftCellContent, rightCellContent],
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
