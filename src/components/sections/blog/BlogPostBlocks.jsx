import React from "react";
import { classNames } from "../../../utils/classNames";
import TwemojiText from "../../ui/TwemojiText";
import BlogPostImageTriplet from "./BlogPostImageTriplet";

const bodyText =
  "text-left text-semi-md-Medium text-tertiary-normal-default";

const sectionHeading =
  "text-left text-High-md-bold text-tertiary-normal-default";

const subheading =
  "text-left text-semi-md-bold text-tertiary-normal-default";

function BulletList({ items }) {
  return (
    <ul className="flex list-disc   flex-col gap-3 pl-6 marker:text-primary-dark-active">
      {items.map((item, i) => {
        const key =
          typeof item === "object" && item?.term != null ? `${item.term}-${i}` : `li-${i}`;
        if (typeof item === "string") {
          return (
            <li key={key} className={classNames(bodyText, "pl-1")}>
              <TwemojiText as="span" className="inline">
                {item}
              </TwemojiText>
            </li>
          );
        }
        const term = item.term;
        const rest = item.text ?? "";
        return (
          <li key={key} className={classNames(bodyText, "pl-1")}>
            <TwemojiText as="span" className="inline">
              {term ? (
                <>
                  <span className="font-bold text-tertiary-normal-default">{term}</span>
                  {rest ? (
                    <>
                      <span className="mx-1 text-primary-dark-active">—</span>
                      {rest}
                    </>
                  ) : null}
                </>
              ) : (
                rest
              )}
            </TwemojiText>
          </li>
        );
      })}
    </ul>
  );
}

function renderBlockInner(block, slug) {
  switch (block.type) {
    case "paragraph":
      return (
        <TwemojiText as="p" className={bodyText}>
          {block.text}
        </TwemojiText>
      );
    case "sectionHeading":
      return (
        <TwemojiText as="h2" className={sectionHeading}>
          {block.text}
        </TwemojiText>
      );
    case "subheading":
      return (
        <TwemojiText as="h3" className={subheading}>
          {block.text}
        </TwemojiText>
      );
    case "bulletList":
      return <BulletList items={block.items ?? []} />;
    case "imageTriplet":
      return (
        <BlogPostImageTriplet
          slug={slug}
          mainSrc={block.mainSrc}
          topSrc={block.topSrc}
          bottomSrc={block.bottomSrc}
          className="w-full max-w-[1417px] lg:mx-0"
        />
      );
    default:
      if (import.meta.env.DEV) {
        console.warn("[BlogPostBlocks] Unknown block type:", block?.type, block);
      }
      return null;
  }
}

/**
 * Portable blog body: ordered blocks (headings, paragraphs, lists, image triplet).
 * Text blocks use reading width; imageTriplet spans gallery width inside the article gutter.
 */
const BlogPostBlocks = React.forwardRef(({ blocks = [], slug, className = "", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={classNames("flex w-full flex-col gap-8 lg:gap-10", className)}
      {...props}
    >
      {blocks.map((block, index) => {
        const key = block.id ?? `block-${index}`;
        const inner = renderBlockInner(block, slug);

        if (block.type === "imageTriplet") {
          return (
            <div key={key} className="w-full max-w-[1728px] px-[156px]">
              {inner}
            </div>
          );
        }

        return (
          <div key={key} className="mx-auto w-full max-w-[1728px] px-[156px]">
            {inner}
          </div>
        );
      })}
    </div>
  );
});

BlogPostBlocks.displayName = "BlogPostBlocks";
export default BlogPostBlocks;
