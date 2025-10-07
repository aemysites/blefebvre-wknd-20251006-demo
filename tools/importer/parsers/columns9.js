/* global WebImporter */
export default function parse(element, { document }) {
  // Get immediate children of the grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const children = Array.from(grid.children);

  // Identify left column (text), right column (contact list), and image
  let leftCol = null;
  let rightCol = null;
  let imageEl = null;

  children.forEach((child) => {
    if (child.tagName === 'DIV' && child.querySelector('h2, h3, p')) {
      leftCol = child;
    } else if (child.tagName === 'UL') {
      rightCol = child;
    } else if (child.tagName === 'IMG') {
      imageEl = child;
    }
  });

  if (!leftCol || !rightCol || !imageEl) return;

  // Table header
  const headerRow = ['Columns block (columns9)'];

  // First row: two columns - left is text, right is contact list
  const firstContentRow = [leftCol, rightCol];

  // Second row: image should span both columns (colspan=2)
  // Pass only the image element and set colspan via object property
  const secondContentRow = [{ element: imageEl.cloneNode(true), colspan: 2 }];

  // Compose table rows
  const cells = [
    headerRow,
    firstContentRow,
    secondContentRow
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
