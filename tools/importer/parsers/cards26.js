/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards26) block: 2 columns, multiple rows, first row is header
  const headerRow = ['Cards (cards26)'];
  const rows = [headerRow];

  // Find all immediate children (each card is a direct child)
  const cardDivs = Array.from(element.children);

  cardDivs.forEach(card => {
    // Find the image (mandatory)
    const img = card.querySelector('img');

    // Find ALL text content (including heading/paragraph anywhere in card)
    let textContent = '';
    const headings = card.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const paras = card.querySelectorAll('p');
    if (headings.length || paras.length) {
      const wrapper = document.createElement('div');
      headings.forEach(h => wrapper.appendChild(h));
      paras.forEach(p => wrapper.appendChild(p));
      textContent = wrapper;
    }
    // Add row: [image, textContent]
    if (img) {
      rows.push([img, textContent]);
    }
  });

  // Create block table and replace original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
