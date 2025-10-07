/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the main container
  const container = element.querySelector('.container');
  if (!container) return;

  // 2. Find the first grid (headline and text)
  const grids = container.querySelectorAll('.grid-layout');
  if (grids.length < 1) return;
  const topGrid = grids[0];

  // 2a. Left column: headline and eyebrow
  const leftCol = topGrid.children[0];
  // 2b. Right column: paragraph, author, button
  const rightCol = topGrid.children[1];

  // 3. Find the second grid (images)
  // FIX: Use the correct grid for images (the second .grid-layout, not .mobile-portrait-1-column)
  const bottomGrid = grids.length > 1 ? grids[1] : null;

  // 4. Compose left cell (headline/eyebrow)
  const leftCellContent = [];
  if (leftCol) {
    Array.from(leftCol.childNodes).forEach(node => {
      if (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())) {
        leftCellContent.push(node.cloneNode(true));
      }
    });
  }

  // 5. Compose right cell (paragraph, author, button)
  const rightCellContent = [];
  if (rightCol) {
    Array.from(rightCol.childNodes).forEach(node => {
      if (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())) {
        rightCellContent.push(node.cloneNode(true));
      }
    });
  }

  // 6. Compose image cells (bottom row) - Only use images from bottomGrid
  let imgCells = [];
  if (bottomGrid) {
    imgCells = Array.from(bottomGrid.children).map(imgCol => {
      const img = imgCol.querySelector('img');
      return img ? [img.cloneNode(true)] : [''];
    });
    while (imgCells.length < 2) imgCells.push(['']);
    if (imgCells.length > 2) imgCells = imgCells.slice(0, 2);
  }

  // 7. Build table rows
  const headerRow = ['Columns block (columns11)'];
  const firstContentRow = [leftCellContent, rightCellContent];
  while (firstContentRow.length < 2) firstContentRow.push('');

  // Second row: images, if present
  let secondContentRow = null;
  if (imgCells.length === 2) {
    secondContentRow = imgCells;
  }

  // 8. Compose table data
  const tableData = [headerRow, firstContentRow];
  if (secondContentRow) tableData.push(secondContentRow);

  // 9. Create and replace
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
