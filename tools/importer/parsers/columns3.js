/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout containing columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the two columns: image (left), content (right)
  const [imgCol, contentCol] = Array.from(grid.children);
  if (!imgCol || !contentCol) return;

  // Ensure left column is an image element
  const imageEl = imgCol.tagName === 'IMG' ? imgCol : imgCol.querySelector('img');
  if (!imageEl) return;

  // Content column: preserve all semantic content
  // - Headline (h1)
  // - Subheading (p)
  // - Button group (div.button-group)
  // We'll reference the whole contentCol for fidelity

  // Compose the table
  const headerRow = ['Columns block (columns3)'];
  const row = [imageEl, contentCol];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row
  ], document);

  element.replaceWith(table);
}
