/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero6)'];

  // 2. Find the background image (row 2)
  // Look for an <img> with class 'cover-image' inside the hero
  let bgImg = element.querySelector('img.cover-image');
  let bgImgCell = '';
  if (bgImg) {
    bgImgCell = bgImg;
  }

  // 3. Gather the content for row 3 (headline, subheading, CTAs)
  // The main content is inside the card: class 'card-on-inverse'
  const card = element.querySelector('.card-on-inverse');
  let contentCell = '';
  if (card) {
    // We'll collect the heading, subheading, and button group
    const contentParts = [];
    // Heading (h1)
    const h1 = card.querySelector('h1');
    if (h1) contentParts.push(h1);
    // Subheading (p)
    const subheading = card.querySelector('p');
    if (subheading) contentParts.push(subheading);
    // Button group (CTAs)
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) contentParts.push(buttonGroup);
    contentCell = contentParts;
  }

  // 4. Build the table
  const rows = [
    headerRow,
    [bgImgCell],
    [contentCell],
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // 5. Replace the original element
  element.replaceWith(table);
}
