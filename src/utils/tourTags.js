/**
 * Derive the effective tag list for a tour package.
 * Highlight-level tags (per image) are more specific than the top-level tour tags,
 * so they come first. Top-level tags are appended as general metadata.
 */
export function deriveTourTags(tour) {
  const highlightTags = (tour?.tourHighlights || []).flatMap((h) => h?.tags || []);
  const tourTags = tour?.tags || [];
  return [...new Set([...highlightTags, ...tourTags])];
}
