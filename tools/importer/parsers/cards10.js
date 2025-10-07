/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards10) block: 2 columns, multiple rows, first row is header
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Select all card anchor elements inside the grid container
  const cardLinks = element.querySelectorAll('a.card-link');

  cardLinks.forEach(card => {
    // --- IMAGE CELL ---
    // Find the image inside the card
    const img = card.querySelector('img');
    // Defensive: if no image, skip this card
    if (!img) return;

    // --- TEXT CELL ---
    // Find the content container inside the card
    const content = card.querySelector('.utility-padding-all-1rem');
    // Defensive: if no content, skip this card
    if (!content) return;

    // We'll build a fragment for the text cell
    const frag = document.createDocumentFragment();

    // Tag (optional, appears at top)
    const tag = content.querySelector('.tag-group');
    if (tag) {
      frag.appendChild(tag.cloneNode(true));
    }

    // Title (h3)
    const title = content.querySelector('h3');
    if (title) {
      frag.appendChild(title.cloneNode(true));
    }

    // Description (p)
    const desc = content.querySelector('p');
    if (desc) {
      frag.appendChild(desc.cloneNode(true));
    }

    // No explicit CTA in the source, so nothing to add

    // Add the row: [image, text content]
    rows.push([img, frag]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
