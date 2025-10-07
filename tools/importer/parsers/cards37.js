/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from a card anchor
  function extractCardContent(cardAnchor) {
    // Find image (if present)
    const imgWrapper = cardAnchor.querySelector('.utility-aspect-1x1, .utility-aspect-3x2');
    let img = imgWrapper ? imgWrapper.querySelector('img') : null;
    // Find tag (if present)
    const tag = cardAnchor.querySelector('.tag-group .tag');
    // Find heading (h3)
    const heading = cardAnchor.querySelector('h3');
    // Find description (p)
    const desc = cardAnchor.querySelector('p');
    // Compose text cell
    const textParts = [];
    if (tag) textParts.push(tag);
    if (heading) textParts.push(heading);
    if (desc) textParts.push(desc);
    // Always return [image, text cell]
    return [img || '', textParts];
  }

  // Find the grid layout containing all cards
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Card rows array
  const rows = [];
  // Header row
  rows.push(['Cards (cards37)']);

  // --- First card (large left card) ---
  // It's the first child anchor of grid
  const firstCardAnchor = grid.querySelector('a.utility-link-content-block');
  if (firstCardAnchor) {
    rows.push(extractCardContent(firstCardAnchor));
  }

  // --- Second grid child: right column with all remaining cards and dividers ---
  // This contains both image cards and text-only cards
  const rightCol = grid.querySelector('.flex-horizontal.flex-vertical.flex-gap-sm');
  if (rightCol) {
    // Select all anchors (cards)
    const rightCardAnchors = rightCol.querySelectorAll('a.utility-link-content-block');
    rightCardAnchors.forEach((anchor) => {
      rows.push(extractCardContent(anchor));
    });
  }

  // --- Third grid child: more text-only cards (if present) ---
  const rightCol2 = grid.querySelector('.flex-horizontal.flex-vertical.flex-gap-sm + .flex-horizontal.flex-vertical.flex-gap-sm');
  if (rightCol2) {
    const rightCardAnchors2 = rightCol2.querySelectorAll('a.utility-link-content-block');
    rightCardAnchors2.forEach((anchor) => {
      rows.push(extractCardContent(anchor));
    });
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
