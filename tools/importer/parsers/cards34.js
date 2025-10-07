/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards34) block: 2 columns, multiple rows, header row is block name
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];

  // Find all card links inside the grid container
  const cardLinks = element.querySelectorAll('a.utility-link-content-block');

  cardLinks.forEach((cardLink) => {
    // Each card's main grid
    const cardGrid = cardLink.querySelector('div.w-layout-grid');
    if (!cardGrid) return; // Defensive: skip if structure is unexpected

    // Image: always first child in cardGrid
    const img = cardGrid.querySelector('img');

    // Text content container: second child in cardGrid
    // Defensive: sometimes the structure may vary, but in this HTML it's always the next sibling
    const textContainer = img ? img.nextElementSibling : null;
    if (!img || !textContainer) return;

    // Compose text cell contents
    const textParts = [];

    // Tag and read time (horizontal flex)
    const metaRow = textContainer.querySelector('.flex-horizontal');
    if (metaRow) {
      // Tag (may be a div inside .tag)
      const tag = metaRow.querySelector('.tag');
      if (tag) textParts.push(tag);
      // Read time
      const readTime = metaRow.querySelector('.paragraph-sm');
      if (readTime) textParts.push(readTime);
    }

    // Heading
    const heading = textContainer.querySelector('h3, .h4-heading');
    if (heading) textParts.push(heading);

    // Description paragraph
    const desc = textContainer.querySelector('p');
    if (desc) textParts.push(desc);

    // CTA ("Read") - usually a div at the bottom
    // Find the last child div inside textContainer
    const ctaDivs = textContainer.querySelectorAll('div');
    let cta = null;
    if (ctaDivs.length > 0) {
      // The last div is typically the CTA
      cta = ctaDivs[ctaDivs.length - 1];
      // Defensive: check if its text is 'Read'
      if (cta.textContent.trim() === 'Read') {
        // Wrap CTA text in a link to cardLink.href
        const link = document.createElement('a');
        link.href = cardLink.href;
        link.textContent = cta.textContent;
        textParts.push(link);
      }
    }

    // Add row: [image, text cell]
    rows.push([img, textParts]);
  });

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
