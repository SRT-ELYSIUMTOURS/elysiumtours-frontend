/**
 * Blog extended articles use an ordered array of blocks (portable content).
 * Different posts only include the block types they need; order is preserved.
 *
 * Supported shapes (discriminated by `type`):
 *
 * - paragraph
 *   { type: 'paragraph', text: string }
 *
 * - section heading (e.g. "#1. Understanding Ghana …")
 *   { type: 'sectionHeading', text: string }
 *
 * - subheading (e.g. "1.1 Where to Visit First?" or "Urban Transport")
 *   { type: 'subheading', text: string }
 *
 * - bullet list — each item is plain text OR term + body ("Term — body" pattern)
 *   { type: 'bulletList', items: Array<string | { term?: string, text: string }> }
 *
 * - three-image row (same layout as BlogPostImageTriplet)
 *   { type: 'imageTriplet', mainSrc?: string, topSrc?: string, bottomSrc?: string }
 *
 * Optional stable key from CMS:
 *   { id?: string, ... }
 */

/** @param {unknown} block */
export function isBlogPostBlock(block) {
  return (
    Boolean(block) &&
    typeof block === "object" &&
    typeof block.type === "string"
  );
}
