/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards35) block: 2 columns, multiple rows (image | text)
  // Even if text is empty, maintain 2 columns per row as per block spec.
  const headerRow = ['Cards (cards35)'];

  // Get all card containers (direct children with utility-aspect-1x1 class)
  const cardDivs = Array.from(element.querySelectorAll('.utility-aspect-1x1'));

  // For each card, extract the image (first cell), and an empty string for text (second cell)
  const rows = cardDivs.map(div => {
    const img = div.querySelector('img');
    return [img, ''];
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}