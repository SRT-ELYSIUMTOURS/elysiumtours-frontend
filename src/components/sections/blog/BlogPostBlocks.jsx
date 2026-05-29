import React from "react";
import { classNames } from "../../../utils/classNames";
import TwemojiText from "../../ui/TwemojiText";
import BlogPostImageTriplet from "./BlogPostImageTriplet";

// ─── Shared token strings (exact styles from original) ────────────────────────

const bodyText =
  "text-left text-semi-md-Medium text-tertiary-normal-default";

const sectionHeading =
  "text-left text-High-md-bold text-tertiary-normal-default";

const subheading =
  "text-left text-semi-md-bold text-tertiary-normal-default";

// ─── Existing block renderers (styles unchanged) ──────────────────────────────

function ParagraphBlock({ text }) {
  return (
    <TwemojiText as="p" className={bodyText}>
      {text}
    </TwemojiText>
  );
}

function SectionHeadingBlock({ text }) {
  return (
    <TwemojiText as="h2" className={sectionHeading}>
      {text}
    </TwemojiText>
  );
}

function SubheadingBlock({ text }) {
  return (
    <TwemojiText as="h3" className={subheading}>
      {text}
    </TwemojiText>
  );
}

function BulletListBlock({ items }) {
  return (
    <ul className="flex list-disc flex-col gap-3 pl-6 marker:text-primary-dark-active">
      {items.map((item, i) => {
        const key =
          typeof item === "object" && item?.term != null
            ? `${item.term}-${i}`
            : `li-${i}`;

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
                  <span className="font-bold text-tertiary-normal-default">
                    {term}
                  </span>
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

// ─── New block renderers (same design tokens) ─────────────────────────────────

// pullQuote — large italic quote with purple left border
function PullQuoteBlock({ text }) {
  return (
    <blockquote className="border-l-4 border-secondary-normal-default pl-6 py-2">
      <TwemojiText
        as="p"
        className={classNames(bodyText, "italic")}
      >
        {text}
      </TwemojiText>
    </blockquote>
  );
}

// Callout icons per type
const CALLOUT_ICONS = {
  tip:     "💡",
  warning: "⚠️",
  info:    "ℹ️",
};

// callout — tinted box using secondary-light tokens
function CalloutBlock({ heading, text, calloutType = "info" }) {
  const icon = CALLOUT_ICONS[calloutType] ?? CALLOUT_ICONS.info;
  return (
    <div className="flex items-start gap-4 rounded-[16px] bg-secondary-light-default px-6 py-5">
      <span className="mt-[2px] shrink-0 text-[22px] leading-none" aria-hidden="true">
        {icon}
      </span>
      <div className="flex flex-col gap-1">
        {heading ? (
          <p className={classNames(subheading, "mb-1")}>{heading}</p>
        ) : null}
        <TwemojiText as="p" className={bodyText}>
          {text}
        </TwemojiText>
      </div>
    </div>
  );
}

// divider — thin rule matching the site's subtle border colour
function DividerBlock() {
  return (
    <hr className="w-full border-t border-[#e5e7eb]" />
  );
}

// ─── Block dispatcher ─────────────────────────────────────────────────────────

function renderBlockInner(block, slug) {
  switch (block.type) {
    case "paragraph":
      return <ParagraphBlock text={block.text} />;
    case "sectionHeading":
      return <SectionHeadingBlock text={block.text} />;
    case "subheading":
      return <SubheadingBlock text={block.text} />;
    case "bulletList":
      return <BulletListBlock items={block.items ?? []} />;
    case "imageTriplet":
      return (
        <BlogPostImageTriplet
          slug={slug}
          mainSrc={block.mainSrc}
          topSrc={block.topSrc}
          bottomSrc={block.bottomSrc}
          mainAlt={block.mainAlt}
          topAlt={block.topAlt}
          bottomAlt={block.bottomAlt}
          className="w-full max-w-[1417px] lg:mx-0"
        />
      );
    case "pullQuote":
      return <PullQuoteBlock text={block.text} />;
    case "callout":
      return (
        <CalloutBlock
          heading={block.heading}
          text={block.text}
          calloutType={block.calloutType}
        />
      );
    case "divider":
      return <DividerBlock />;
    default:
      if (import.meta.env.DEV) {
        console.warn("[BlogPostBlocks] Unknown block type:", block?.type, block);
      }
      return null;
  }
}

// ─── Main component ───────────────────────────────────────────────────────────

const BlogPostBlocks = React.forwardRef(
  ({ blocks = [], slug, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames("flex w-full flex-col gap-8 lg:gap-10", className)}
        {...props}
      >
        {blocks.map((block, index) => {
          const key = block.id ?? `block-${index}`;
          const inner = renderBlockInner(block, slug);
          if (inner === null) return null;

          // imageTriplet bleeds to gallery width — no mx-auto
          if (block.type === "imageTriplet") {
            return (
              <div
                key={key}
                className="w-full max-w-[1728px] px-4 md:px-8 lg:px-[156px]"
              >
                {inner}
              </div>
            );
          }

          return (
            <div
              key={key}
              className="mx-auto w-full max-w-[1728px] px-4 md:px-8 lg:px-[156px]"
            >
              {inner}
            </div>
          );
        })}
      </div>
    );
  }
);

BlogPostBlocks.displayName = "BlogPostBlocks";
export default BlogPostBlocks;
