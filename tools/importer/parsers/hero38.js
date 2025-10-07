/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero38)'];

  // Defensive: Find the main grid layout (contains headline/subheading and CTA)
  const grid = element.querySelector('.grid-layout');
  let headline = null;
  let subheading = null;
  let cta = null;

  if (grid) {
    // Find left column (headline/subheading)
    const leftCol = grid.children[0];
    if (leftCol) {
      headline = leftCol.querySelector('h1, h2, h3, h4, h5, h6');
      subheading = leftCol.querySelector('p, .subheading');
    }
    // Find right column (CTA)
    const rightCol = grid.querySelector('a.button, a.w-button, button');
    if (rightCol) {
      cta = rightCol;
    }
  }

  // Row 2: Background image (none in this case)
  const imageRow = ['']; // No image present

  // Row 3: Content (headline, subheading, CTA)
  const content = [];
  if (headline) content.push(headline);
  if (subheading) content.push(subheading);
  if (cta) content.push(cta);
  const contentRow = [content];

  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
