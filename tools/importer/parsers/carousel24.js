/* global WebImporter */
export default function parse(element, { document }) {
  // Carousel (carousel24) block: 2 columns, first row is header, subsequent rows are slides
  const headerRow = ['Carousel (carousel24)'];
  const rows = [headerRow];

  // Defensive: Find the main card structure
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) return;

  // Find the image (mandatory)
  const img = cardBody.querySelector('img');

  // Find the heading (optional)
  const heading = cardBody.querySelector('.h4-heading');

  // Compose the text cell
  const textCell = [];
  if (heading) {
    const h4 = document.createElement('h4');
    h4.innerHTML = heading.innerHTML;
    textCell.push(h4);
  }

  // Extract all text nodes inside cardBody except heading and image
  cardBody.childNodes.forEach((node) => {
    if (
      node.nodeType === Node.TEXT_NODE && node.textContent.trim() &&
      (!heading || node.textContent.trim() !== heading.textContent.trim())
    ) {
      const p = document.createElement('p');
      p.textContent = node.textContent.trim();
      textCell.push(p);
    } else if (
      node.nodeType === Node.ELEMENT_NODE &&
      node !== img && node !== heading && node.textContent.trim()
    ) {
      const p = document.createElement('p');
      p.textContent = node.textContent.trim();
      textCell.push(p);
    }
  });

  rows.push([
    img || '',
    textCell.length > 0 ? textCell : ''
  ]);

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
