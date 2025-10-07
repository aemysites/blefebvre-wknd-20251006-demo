/* global WebImporter */
export default function parse(element, { document }) {
  // Carousel (carousel16) block parsing
  // 1. Table header row
  const headerRow = ['Carousel (carousel16)'];

  // 2. Find the grid of images (slides)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Each grid > div contains an image inside a nested div
  const slideDivs = Array.from(grid.children);
  const rows = [];

  slideDivs.forEach((slideDiv) => {
    // Find the image inside this slide
    const imgContainer = slideDiv.querySelector('.utility-aspect-2x3');
    const img = imgContainer ? imgContainer.querySelector('img') : null;
    if (img) {
      // Each row: [image, empty cell] (always two columns)
      rows.push([img, '']);
    }
  });

  // Compose table cells
  const cells = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block
  element.replaceWith(block);
}
