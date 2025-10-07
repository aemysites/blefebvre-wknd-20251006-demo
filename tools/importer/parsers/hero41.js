/* global WebImporter */
export default function parse(element, { document }) {
  // HERO (hero41) block parsing
  // 1 column, 3 rows: [block name], [image], [text/cta]

  // 1. Header row
  const headerRow = ['Hero (hero41)'];

  // 2. Find the background image (should be visually prominent)
  // Defensive: find the first <img> inside the hero block
  const img = element.querySelector('img');
  const imageRow = [img ? img : ''];

  // 3. Find the main heading, subheading, and CTA
  // Defensive: find h1, paragraph, and anchor/button inside the hero text area
  let heading = null;
  let subheading = null;
  let cta = null;

  // The text area is usually in a container, but structure may vary
  // We'll look for h1, p, and a/button in the whole element
  heading = element.querySelector('h1, h2, h3');
  subheading = element.querySelector('p');
  // CTA: look for <a> with button class or role, or a visible button
  cta = element.querySelector('a.button, a.w-button, button');

  // Compose the text/cta cell
  const textCellContent = [];
  if (heading) textCellContent.push(heading);
  if (subheading) textCellContent.push(subheading);
  if (cta) textCellContent.push(cta);

  const textRow = [textCellContent.length ? textCellContent : ''];

  // 4. Build the table
  const cells = [headerRow, imageRow, textRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace the original element
  element.replaceWith(table);
}
