/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const grid = element.querySelector('.container');
  if (!grid) return;

  // --- Extract content ---
  // 1. Visually hidden heading (h1)
  const hiddenHeading = grid.querySelector('h1');
  // 2. Hero Title (large heading)
  const heroTitle = grid.querySelector('.h1-heading');
  // 3. Subheading/paragraph
  const subheading = grid.querySelector('p.subheading');
  // 4. CTA buttons
  const buttonGroup = grid.querySelector('.button-group');
  let ctas = [];
  if (buttonGroup) {
    ctas = Array.from(buttonGroup.querySelectorAll('a')).map((a) => a);
  }
  // 5. Embedded video (iframe)
  const videoWrap = grid.querySelector('.utility-position-relative');
  let videoLink = '';
  if (videoWrap) {
    const iframe = videoWrap.querySelector('iframe');
    if (iframe && iframe.src) {
      const a = document.createElement('a');
      a.href = iframe.src;
      a.textContent = iframe.title || 'Watch video';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      videoLink = a;
    }
  }

  // --- Build table rows ---
  // Header row: block name EXACTLY
  const headerRow = ['Hero (hero25)'];

  // Second row: Background image or embed (here: video link)
  const secondRow = [videoLink ? videoLink : ''];

  // Third row: Visually hidden heading, Title, subheading, CTA(s)
  const contentCells = [];
  // Always include visually hidden heading if present
  if (hiddenHeading && hiddenHeading.textContent.trim()) contentCells.push(hiddenHeading);
  // Title (use heroTitle only)
  if (heroTitle && heroTitle.textContent.trim()) contentCells.push(heroTitle);
  // Subheading
  if (subheading && subheading.textContent.trim()) contentCells.push(subheading);
  // CTA(s)
  if (ctas.length) {
    const ctaFragment = document.createElement('div');
    ctas.forEach((cta) => ctaFragment.appendChild(cta));
    contentCells.push(ctaFragment);
  }

  const thirdRow = [contentCells];

  // Assemble table
  const cells = [headerRow, secondRow, thirdRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
