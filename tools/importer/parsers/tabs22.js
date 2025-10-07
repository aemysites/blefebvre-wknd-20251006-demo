/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find tab menu container (tab headers)
  const tabMenu = element.querySelector('[role="tablist"]');
  // 2. Find all tab triggers (anchors)
  const tabTriggers = tabMenu ? Array.from(tabMenu.querySelectorAll('[role="tab"]')) : [];
  // 3. Find tab content container
  const tabContentContainer = element.querySelector('.w-tab-content');
  // 4. Find all tab panels
  const tabPanels = tabContentContainer ? Array.from(tabContentContainer.querySelectorAll('[role="tabpanel"]')) : [];

  // Defensive: If no triggers or panels, do nothing
  if (!tabTriggers.length || !tabPanels.length) return;

  // Build table rows
  const rows = [];
  // Header row as specified
  rows.push(['Tabs (tabs22)']);

  // For each tab, pair label and content
  for (let i = 0; i < tabTriggers.length; i++) {
    const trigger = tabTriggers[i];
    // Use the actual text content of the tab label
    const label = trigger.querySelector('div') ? trigger.querySelector('div').textContent.trim() : trigger.textContent.trim();
    // Find corresponding panel by index (order matches in this markup)
    const panel = tabPanels[i];
    if (!panel) continue;
    // The panel's content is typically a single div (the grid)
    // We'll use the first child div of the panel as the content
    let contentElem = panel.querySelector('div');
    // Fallback: use the panel itself if no child div
    if (!contentElem) contentElem = panel;
    // Reference the existing element (do not clone)
    rows.push([label, contentElem]);
  }

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
