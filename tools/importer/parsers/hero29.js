/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero29)'];

  // 2. Find the background image (first img in hero)
  let bgImg = '';
  const imgEl = element.querySelector('img');
  if (imgEl) {
    // Clone the image to avoid removing it from the original DOM
    bgImg = imgEl.cloneNode(true);
  }

  // 3. Find the main heading (h1)
  let heading = '';
  const h1El = element.querySelector('h1');
  if (h1El) {
    // Clone the heading to avoid removing it from the original DOM
    heading = h1El.cloneNode(true);
  }

  // 4. Build table rows
  // Row 2: Background image (optional)
  const imageRow = [bgImg];

  // Row 3: Title (optional), subheading, CTA (none in this case)
  // Only heading exists in this source
  const contentRow = [heading];

  // 5. Compose table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 6. Replace the original element
  element.replaceWith(table);
}
