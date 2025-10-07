/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero13)'];

  // 2. Find the background image (should be referenced, not cloned)
  const mainGridDivs = element.querySelectorAll(':scope > div > div');
  let backgroundImg = null;
  for (const div of mainGridDivs) {
    const img = div.querySelector('img');
    if (img && img.classList.contains('cover-image') && !img.classList.contains('utility-aspect-1x1')) {
      backgroundImg = img;
      break;
    }
  }

  // 3. Find the content area (contains card, heading, features, button)
  let contentDiv = null;
  for (const div of mainGridDivs) {
    if (div.querySelector('.card')) {
      contentDiv = div;
      break;
    }
  }

  // 4. In the content area, find the group image (inside .card-body > .grid-layout > img)
  let groupImg = null;
  if (contentDiv) {
    const cardImg = contentDiv.querySelector('.card-body .grid-layout img.image');
    if (cardImg) groupImg = cardImg;
  }

  // 5. In the content area, find the heading, features, and CTA
  let heading = null;
  let features = [];
  let cta = null;
  if (contentDiv) {
    const headingDiv = contentDiv.querySelector('h2');
    if (headingDiv) heading = headingDiv;
    // Features: each .flex-horizontal.flex-gap-xxs with icon and p
    const featureRows = contentDiv.querySelectorAll('.flex-vertical .flex-horizontal.flex-gap-xxs');
    features = Array.from(featureRows);
    // CTA: .button-group > a
    const ctaBtn = contentDiv.querySelector('.button-group a');
    if (ctaBtn) cta = ctaBtn;
  }

  // 6. Compose the content cell (group image, heading, features, CTA)
  const contentCell = document.createElement('div');
  contentCell.style.display = 'flex';
  contentCell.style.gap = '2rem';
  // Left: group image (referenced, not cloned)
  if (groupImg) {
    const left = document.createElement('div');
    left.appendChild(groupImg);
    contentCell.appendChild(left);
  }
  // Right: heading, features, CTA
  const right = document.createElement('div');
  if (heading) right.appendChild(heading);
  features.forEach(f => right.appendChild(f));
  if (cta) right.appendChild(cta);
  contentCell.appendChild(right);

  // 7. Build the table rows
  const rows = [
    headerRow,
    [backgroundImg ? backgroundImg : ''],
    [contentCell]
  ];

  // 8. Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
