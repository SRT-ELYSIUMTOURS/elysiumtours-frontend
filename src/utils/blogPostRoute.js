/**
 * Build /blog/post/:slug URLs and navigation state for blog article pages.
 */

export function slugifyBlogTitle(text) {
  if (text == null || text === "") return "article";
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "article";
}

/**
 * @param {string} title - Headline shown on the card
 * @param {string|number} [uniqueKey] - disambiguates duplicate titles (id, or e.g. "tg1")
 */
export function blogPostSlug(title, uniqueKey) {
  const base = slugifyBlogTitle(title);
  if (uniqueKey == null || uniqueKey === "") {
    return base;
  }
  const key = slugifyBlogTitle(String(uniqueKey));
  if (!key) return base;
  return `${base}-${key}`.replace(/-+/g, "-").replace(/^-|-$/g, "") || base;
}

/**
 * @param {import('react-router-dom').NavigateFunction} navigate
 * @param {{ title?: string, image?: string, category?: string, subtitle?: string, uniqueKey?: string|number, contentBlocks?: object[] }} card
 */
export function openBlogPost(navigate, card) {
  const displayTitle = (card.title || card.category || "Article").trim();
  const unique = card.uniqueKey != null ? card.uniqueKey : card.id;
  const slug = blogPostSlug(displayTitle, unique);
  navigate(`/blog/post/${slug}`, {
    state: {
      title: displayTitle,
      heroImage: card.image,
      category: card.category ?? null,
      subtitle: card.subtitle ?? null,
      ...(Array.isArray(card.contentBlocks) && card.contentBlocks.length > 0
        ? { contentBlocks: card.contentBlocks }
        : {}),
    },
  });
}
