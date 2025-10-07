/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the Columns block (columns39)
  const headerRow = ['Columns block (columns39)'];

  // Find the two main columns: left (text/buttons), right (images)
  // The immediate children of the grid-layout are the two columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: heading, subheading, buttons
  const leftCol = columns[0];
  // Right column: images (inside another grid)
  const rightCol = columns[1];

  // For the right column, grab the images as a horizontal row
  const imagesGrid = rightCol.querySelector('.grid-layout');
  let images = [];
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
  }

  // Compose the left cell: include heading, subheading, and buttons
  // We'll include the whole leftCol element for robustness
  // Compose the right cell: include all images as a fragment
  let rightCellContent;
  if (images.length) {
    // Wrap images in a div for horizontal layout preservation
    const imgWrapper = document.createElement('div');
    imgWrapper.style.display = 'flex';
    imgWrapper.style.gap = '16px';
    images.forEach(img => imgWrapper.appendChild(img));
    rightCellContent = imgWrapper;
  } else {
    // fallback to the entire rightCol if no images found
    rightCellContent = rightCol;
  }

  // Second row: left column (text/buttons), right column (images)
  const secondRow = [leftCol, rightCellContent];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
