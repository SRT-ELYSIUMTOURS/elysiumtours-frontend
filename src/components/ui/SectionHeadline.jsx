import React from "react";
import { classNames } from "../../utils/classNames";

// From Figma: COMPONENT_SET "Headline " (290:2001) — used on blog, tour-partners, gallery
// Structure: VERTICAL gap:- pad:0/0/0/0
//   Frame 28: VERTICAL gap:8 pad:10/1/10/0
//     TEXT [25px/700] fill:#fefefe — "8 ways to enjoy Ghana in fall"
//     LINE  stroke:#ffffff — decorative underline
// Variant2: text fill:#dedede (dimmed)
//
// Used as: section label inside PartnerHighlightCard / gallery grid cards
// The Headline sits at the bottom of image cards with text on dark bg

const SectionHeadline = React.forwardRef(({
  label,      // small eyebrow — e.g. "FEATURED TOURS"
  title,      // main heading  — e.g. "Explore Our Most Popular Tours"
  description,// optional body text
  align = "left",
  labelColor = "#2b0f43",    // default from Figma sections
  titleColor = "#2d2d2d",
  descColor  = "#2d2d2d",
  className = "",
  ...props
}, ref) => {

  return (
    <div
      ref={ref}
      className={classNames(
        "flex flex-col gap-md",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
      {...props}
    >
      {/* Eyebrow label row — Line + text (from Figma Frame 19: gap:8) */}
      {label && (
        <div className="flex items-center gap-[8px]">
          <div className="w-[46px] h-px shrink-0" style={{ backgroundColor: labelColor }} />
          <span style={{ fontSize: "13px", fontWeight: 700, color: labelColor, letterSpacing: "0.05em", lineHeight: "18px", fontFamily: "Raleway, sans-serif" }}>
            {label}
          </span>
        </div>
      )}

      {/* Title — [20px/700] */}
      {title && (
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: titleColor, lineHeight: "34px", fontFamily: "Raleway, sans-serif" }}>
          {title}
        </h2>
      )}

      {/* Description — [16px/400] */}
      {description && (
        <p style={{ fontSize: "16px", fontWeight: 400, color: descColor, lineHeight: "24px", maxWidth: "677px", fontFamily: "Raleway, sans-serif" }}>
          {description}
        </p>
      )}
    </div>
  );
});

SectionHeadline.displayName = "SectionHeadline";

// CardHeadline — the version used inside dark image cards
// From Figma: TEXT [25px/700] #fefefe + white underline stroke
const CardHeadline = React.forwardRef(({
  title,
  variant = "default", // "default" | "dimmed"
  className = "",
  ...props
}, ref) => {
  const textColor = variant === "dimmed" ? "#dedede" : "#fefefe";

  return (
    <div ref={ref} className={classNames("flex flex-col gap-[8px]", className)} {...props}>
      <span style={{ fontSize: "25px", fontWeight: 700, color: textColor, lineHeight: "34px", fontFamily: "Raleway, sans-serif" }}>
        {title}
      </span>
      {/* Decorative white underline — LINE stroke:#ffffff */}
      <div className="h-px w-full bg-white opacity-60" />
    </div>
  );
});

CardHeadline.displayName = "CardHeadline";

export { SectionHeadline, CardHeadline };
export default SectionHeadline;
