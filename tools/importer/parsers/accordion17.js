/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header row (single cell, not <th>)
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  // Find all accordion items (each .w-dropdown is an accordion item)
  const accordionItems = element.querySelectorAll('.w-dropdown');

  accordionItems.forEach((item) => {
    // Title: look for the toggle button with [role="button"]
    const toggle = item.querySelector('[role="button"]');
    let title = '';
    if (toggle) {
      // Find the title text within the toggle
      // Usually inside a .paragraph-lg, but fallback to textContent
      const titleEl = toggle.querySelector('.paragraph-lg') || toggle;
      title = titleEl.cloneNode(true);
    }

    // Content: look for the accordion content panel
    const contentPanel = item.querySelector('.accordion-content');
    let content = '';
    if (contentPanel) {
      // The content is usually inside a .w-richtext, but fallback to the panel itself
      const richText = contentPanel.querySelector('.w-richtext') || contentPanel;
      content = richText.cloneNode(true);
    }

    // Only add row if both title and content are present
    if (title && content) {
      rows.push([title, content]);
    }
  });

  // Create the table block (header row will be a single <td> cell, not <th>)
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
