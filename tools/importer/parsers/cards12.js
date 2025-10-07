/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards12) block: extract each card's image, tag, date, and title

  // Header row for the block table
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  // Find all card anchor elements (each card is a link)
  const cardLinks = element.querySelectorAll('a.utility-link-content-block');

  cardLinks.forEach((card) => {
    // --- Image: first child div contains the image ---
    const imageWrapper = card.querySelector('.utility-aspect-2x3');
    const img = imageWrapper ? imageWrapper.querySelector('img') : null;

    // --- Tag & Date: horizontal flex container ---
    const flexRow = card.querySelector('.flex-horizontal');
    let tag = null;
    let date = null;
    if (flexRow) {
      const tagEl = flexRow.querySelector('.tag');
      tag = tagEl ? tagEl : null;
      const dateEl = flexRow.querySelector('.paragraph-sm');
      date = dateEl ? dateEl : null;
    }

    // --- Title: h3 element ---
    const title = card.querySelector('h3');

    // --- Compose text cell ---
    // The text cell contains: tag, date, title (in order)
    const textCellContent = [];
    if (tag) textCellContent.push(tag);
    if (date) textCellContent.push(date);
    if (title) textCellContent.push(title);

    // Add row: [image, text cell]
    rows.push([
      img ? img : '',
      textCellContent
    ]);
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
