/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (3 columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Defensive: Expecting 4 children: [name], [tags], [heading], [rich text]
  // 1st column: name + tags (vertical stack)
  // 2nd column: heading (h2)
  // 3rd column: rich text (paragraphs)

  // 1st column: name + tags
  const nameEl = gridChildren[0];
  const tagsEl = gridChildren[1];
  // 2nd column: heading
  const headingEl = gridChildren[2];
  // 3rd column: rich text
  const richTextEl = gridChildren[3];

  // Compose 1st column: name + tags as a vertical stack
  const col1 = document.createElement('div');
  if (nameEl) col1.appendChild(nameEl);
  if (tagsEl) col1.appendChild(tagsEl);

  // 2nd column: heading only
  const col2 = headingEl;

  // 3rd column: rich text (paragraphs)
  const col3 = richTextEl;

  // Build the table rows
  const headerRow = ['Columns block (columns31)'];
  const columnsRow = [col1, col2, col3];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  element.replaceWith(table);
}
