/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards7) block: image-only cards, so single column per card
  const headerRow = ['Cards (cards7)'];

  // Each card is a direct child div of the grid
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  if (!cardDivs.length) return;

  // Each row: [img] only, no text content cell
  const rows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    if (!img) return null;
    return [img];
  }).filter(Boolean);

  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
