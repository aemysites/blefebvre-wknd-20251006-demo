/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards36) block: image-only cards in a grid
  // 1. Header row
  const headerRow = ['Cards (cards36)'];

  // 2. Find all card elements (each direct child div of the grid)
  // Each card is a div.utility-aspect-1x1 containing an img
  const cardDivs = Array.from(element.querySelectorAll('.utility-aspect-1x1'));

  // 3. Build rows: each row is [image, ''] (must have two columns per row)
  const rows = cardDivs.map(cardDiv => {
    // Find the image inside the card
    const img = cardDiv.querySelector('img');
    // Defensive: only add row if image exists
    if (img) {
      return [img, ''];
    }
    return null;
  }).filter(Boolean);

  // 4. Assemble table data
  const tableData = [headerRow, ...rows];

  // 5. Create block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // 6. Replace original element with block table
  element.replaceWith(block);
}
