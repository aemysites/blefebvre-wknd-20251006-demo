/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from a card anchor/div
  function extractCard(cardEl) {
    // Find the image (mandatory, always first)
    const img = cardEl.querySelector('img');
    // Find the heading (h2, h3, h4, etc.)
    const heading = cardEl.querySelector('h2, h3, h4, h5, h6');
    // Find the description (first <p> after heading)
    const desc = cardEl.querySelector('p');
    // Find CTA: button or link (not the card anchor itself)
    let cta = cardEl.querySelector('.button, button');
    if (!cta) {
      // Sometimes a link styled as button
      cta = cardEl.querySelector('a:not([href="#"])');
    }
    // Compose text cell
    const textCell = [];
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);
    if (cta) textCell.push(cta);
    return [img, textCell];
  }

  // 1. Header row
  const rows = [ ['Cards (cards2)'] ];

  // 2. Find the cards container
  // The outermost grid contains the feature card (left) and the right grid (with 4 cards)
  const outerGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!outerGrid) return;

  // 3. Feature card (left, always first child and is an anchor)
  const featureCard = outerGrid.querySelector('a.utility-link-content-block');
  if (featureCard) {
    rows.push(extractCard(featureCard));
  }

  // 4. The right grid (contains 4 cards, each an anchor)
  const rightGrid = outerGrid.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (rightGrid) {
    const cards = rightGrid.querySelectorAll('a.utility-link-content-block');
    cards.forEach(card => {
      rows.push(extractCard(card));
    });
  }

  // 5. Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
