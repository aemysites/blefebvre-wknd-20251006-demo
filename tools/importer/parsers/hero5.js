/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero image (background image)
  const heroImg = element.querySelector('img');

  // Find the main content container (contains heading, paragraph, buttons)
  let contentContainer = null;
  const containers = element.querySelectorAll('div, section');
  for (const container of containers) {
    if (
      container.querySelector('h1, h2, h3, .h2-heading') &&
      container.querySelector('p') &&
      (container.querySelector('.button-group') || container.querySelector('a.button'))
    ) {
      contentContainer = container;
      break;
    }
  }

  // Extract heading, paragraph, and CTA buttons
  let heading = null;
  let paragraph = null;
  let ctaGroup = null;
  if (contentContainer) {
    heading = contentContainer.querySelector('h1, h2, h3, .h2-heading');
    paragraph = contentContainer.querySelector('p');
    ctaGroup = contentContainer.querySelector('.button-group');
    if (!ctaGroup) {
      // If no button-group, collect all anchor buttons
      const buttons = contentContainer.querySelectorAll('a.button, a.secondary-button');
      if (buttons.length) {
        ctaGroup = document.createElement('div');
        buttons.forEach(btn => ctaGroup.appendChild(btn));
      }
    }
  }

  // Compose the content cell for row 3
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (paragraph) contentCell.push(paragraph);
  if (ctaGroup) contentCell.push(ctaGroup);

  // Compose the table rows
  const headerRow = ['Hero (hero5)'];
  const imageRow = [heroImg ? heroImg : '']; // FIX: always include the hero image if present
  const contentRow = [contentCell.length ? contentCell : ''];

  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
