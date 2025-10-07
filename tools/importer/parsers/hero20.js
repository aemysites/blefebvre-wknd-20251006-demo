/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero20)'];

  // 2. Extract background images (collage)
  let bgImages = [];
  const collageGrid = element.querySelector('.grid-layout.desktop-3-column');
  if (collageGrid) {
    bgImages = Array.from(collageGrid.querySelectorAll('img'));
  } else {
    bgImages = Array.from(element.querySelectorAll('img'));
  }
  let bgCell;
  if (bgImages.length === 1) {
    bgCell = bgImages[0];
  } else if (bgImages.length > 1) {
    const fragment = document.createDocumentFragment();
    bgImages.forEach(img => fragment.appendChild(img));
    bgCell = fragment;
  } else {
    bgCell = '';
  }
  const bgRow = [bgCell];

  // 3. Extract heading, subheading, CTAs (flattened, not wrapped)
  const contentContainer = element.querySelector('.container.utility-text-align-center') || element.querySelector('.container');
  let contentRow = [''];
  if (contentContainer) {
    const cells = [];
    // Heading
    const heading = contentContainer.querySelector('h1');
    if (heading) cells.push(heading);
    // Subheading
    const subheading = contentContainer.querySelector('p');
    if (subheading) cells.push(subheading);
    // CTAs (buttons/links)
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) {
      const buttons = Array.from(buttonGroup.querySelectorAll('a'));
      buttons.forEach(btn => cells.push(btn));
    }
    contentRow = [cells];
  }

  // 4. Build table
  const tableCells = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);

  // 5. Replace the element
  element.replaceWith(table);
}
