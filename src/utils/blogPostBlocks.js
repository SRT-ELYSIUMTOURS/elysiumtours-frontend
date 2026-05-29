/**
 * Blog articles are built from an ordered array of content blocks.
 * Each block has a `type` that controls both its structure and its visual style.
 * The frontend owns all styling — the admin only picks the purpose of each block.
 *
 * ─── Block types ─────────────────────────────────────────────────────────────
 *
 * paragraph
 *   Admin label: "Body Text"
 *   { type: "paragraph", text: string }
 *   → Regular prose paragraph. The main narrative content.
 *
 * sectionHeading
 *   Admin label: "Section Title"
 *   { type: "sectionHeading", text: string }
 *   → Large bold heading. Opens a new major topic in the article.
 *
 * subheading
 *   Admin label: "Subsection Title"
 *   { type: "subheading", text: string }
 *   → Medium bold heading. Breaks a section into named parts.
 *
 * bulletList
 *   Admin label: "Bullet List"
 *   { type: "bulletList", items: Array<string | { term?: string, text: string }> }
 *   → Plain items: just a string per item.
 *     Term items: { term: "Bold label", text: "Description after the dash" }
 *   → Use plain items for tips/steps. Use term items for definitions or comparisons.
 *
 * imageTriplet
 *   Admin label: "Photo Block — 3 Images"
 *   {
 *     type: "imageTriplet",
 *     mainSrc: string,   mainAlt?: string,   ← large left image (1014×556)
 *     topSrc: string,    topAlt?: string,    ← top-right image   (365×230)
 *     bottomSrc: string, bottomAlt?: string, ← bottom-right image (365×297)
 *   }
 *   → Three-photo editorial layout. All three image URLs are required.
 *
 * pullQuote
 *   Admin label: "Highlighted Quote"
 *   { type: "pullQuote", text: string }
 *   → A stand-out sentence or quote shown in italic with a purple left bar.
 *     Use for key takeaways or memorable lines.
 *
 * callout
 *   Admin label: "Tip / Info Box"
 *   {
 *     type: "callout",
 *     calloutType: "tip" | "warning" | "info",  ← controls icon (💡 / ⚠️ / ℹ️)
 *     heading?: string,                          ← optional bold label inside the box
 *     text: string,                              ← body of the callout
 *   }
 *   → A tinted box for travel tips, safety warnings, or important notes.
 *
 * divider
 *   Admin label: "Section Divider"
 *   { type: "divider" }
 *   → A thin horizontal line. Use to create a visual break between major parts.
 *
 * ─── Optional stable key (prevents React key churn when blocks are reordered) ─
 *   { id?: string, ...blockFields }
 */

export const BLOG_BLOCK_TYPES = [
  {
    type: "paragraph",
    adminLabel: "Body Text",
    adminDescription: "Regular paragraph. The main narrative content of your post.",
    adminPreview: "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n▬▬▬▬▬▬▬▬▬▬▬▬\nRegular text",
    fields: ["text"],
  },
  {
    type: "sectionHeading",
    adminLabel: "Section Title",
    adminDescription: "Large bold heading. Opens a new major topic.",
    adminPreview: "████████████████\nLarge heading",
    fields: ["text"],
  },
  {
    type: "subheading",
    adminLabel: "Subsection Title",
    adminDescription: "Medium bold heading. Breaks a section into named parts.",
    adminPreview: "██████████\nMedium heading",
    fields: ["text"],
  },
  {
    type: "bulletList",
    adminLabel: "Bullet List",
    adminDescription: "List of items — tips, steps, or definitions. Each item can be plain text or a bold label followed by a description.",
    adminPreview: "• First item\n• Second item\n• Third item",
    fields: ["items"],
  },
  {
    type: "imageTriplet",
    adminLabel: "Photo Block — 3 Images",
    adminDescription: "Three photos: one large on the left, two stacked on the right. All three image URLs are required.",
    adminPreview: "┌──────┐ ┌───┐\n│      │ │   │\n│      │ ├───┤\n└──────┘ │   │\n         └───┘",
    fields: ["mainSrc", "mainAlt", "topSrc", "topAlt", "bottomSrc", "bottomAlt"],
  },
  {
    type: "pullQuote",
    adminLabel: "Highlighted Quote",
    adminDescription: "A key sentence shown large in italic with a coloured left bar. Use for memorable lines or takeaways.",
    adminPreview: "┃ "A stand-out sentence\n  the reader will remember."",
    fields: ["text"],
  },
  {
    type: "callout",
    adminLabel: "Tip / Info Box",
    adminDescription: "A tinted box for a travel tip (💡), safety warning (⚠️), or general note (ℹ️).",
    adminPreview: "┌─────────────────────┐\n│ 💡  Heading          │\n│    Body text here.   │\n└─────────────────────┘",
    fields: ["calloutType", "heading", "text"],
    calloutTypes: [
      { value: "tip",     label: "💡 Tip"     },
      { value: "warning", label: "⚠️ Warning" },
      { value: "info",    label: "ℹ️ Info"    },
    ],
  },
  {
    type: "divider",
    adminLabel: "Section Divider",
    adminDescription: "A thin horizontal line. Creates a visual break between major parts of the article.",
    adminPreview: "────────────────────",
    fields: [],
  },
];

/** Map from type string → admin metadata (label, description, fields) */
export const BLOG_BLOCK_TYPE_MAP = Object.fromEntries(
  BLOG_BLOCK_TYPES.map((b) => [b.type, b])
);

/** All valid type strings */
export const BLOG_BLOCK_TYPE_VALUES = BLOG_BLOCK_TYPES.map((b) => b.type);

/** @param {unknown} block */
export function isBlogPostBlock(block) {
  return (
    Boolean(block) &&
    typeof block === "object" &&
    typeof block.type === "string"
  );
}
