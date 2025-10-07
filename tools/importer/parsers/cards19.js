/* global WebImporter */
export default function parse(element, { document }) {
  // Cards block header row, per spec
  const headerRow = ['Cards (cards19)'];

  // Find all direct card containers (each card is a flex-horizontal)
  const cardNodes = Array.from(element.querySelectorAll(':scope > div'));
  if (!cardNodes.length) return;

  // Build card rows
  const rows = cardNodes.map(card => {
    // Icon cell: reference the <img> inside .icon
    const iconDiv = card.querySelector('.icon');
    let iconImg = null;
    if (iconDiv) {
      iconImg = iconDiv.querySelector('img');
    }

    // Text cell: get all text content from all <p> elements, fallback to all text
    let textContent = '';
    const pElems = Array.from(card.querySelectorAll('p'));
    if (pElems.length) {
      textContent = pElems.map(p => p.textContent.trim()).join('\n');
    } else {
      textContent = card.textContent.trim();
    }
    const textDiv = document.createElement('div');
    textDiv.textContent = textContent;

    // Always reference, never clone
    return [iconImg, textDiv];
  });

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
