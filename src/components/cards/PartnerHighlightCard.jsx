import React from "react";
import { classNames } from "../../utils/classNames";

// Figma: "Partner Highlights" reusable card — 451×656px default
// Used in: PartnerHighlightsSection (home), TourTypesSection (tours), etc.

const PartnerHighlightCard = React.forwardRef(
  (
    {
      image,
      category = "Accommodation",
      // Optional subtitle line below category (e.g. "24 experience available")
      subtitle = null,
      // Subtitle text colour — varies per card in TourTypesSection
      subtitleColor = "#fefefe",
      // Overlay background colour — varies per card (0.7 vs 0.5 opacity)
      overlayColor = "rgba(0,0,0,0.5)",
      // Full override for the label container positioning/styling.
      // Pass a className string to replace the default bottom-flush layout.
      labelClassName,
      onClick,
      className = "",
      ...props
    },
    ref
  ) => {
    // Default: label flush to bottom, full-width, 27px vertical padding
    const defaultLabelClass =
      "absolute bottom-0 left-0 right-0 px-6 py-[27px]";

    return (
      <div
        ref={ref}
        onClick={onClick}
        role="img"
        aria-label={category}
        className={classNames(
          // bg-image lives directly on this element — no child div, no overflow-hidden needed.
          // This bypasses the Chrome bug where overflow:hidden + border-radius
          // doesn't clip background-image on absolute children.
          "relative rounded-[40px] bg-cover bg-center bg-primary-dark-default",
          "overflow-clip", // clip label content to card bounds (Figma: overflow-clip)
          "cursor-pointer group transition-all duration-300 ease-in",
          "hover:shadow-xl",
          className
        )}
        style={{ backgroundImage: image ? `url(${image})` : undefined }}
        {...props}
      >
        {/* Dark overlay — colour is per-card in TourTypesSection */}
        <div
          className="absolute inset-0 rounded-[40px] transition-colors duration-300 ease-in"
          style={{ backgroundColor: overlayColor }}
        />

        {/* Category label + optional subtitle */}
        <div className={labelClassName ?? defaultLabelClass}>
          <h3 className="text-semi-md-bold text-primary-light-default">
            {category}
          </h3>
          {subtitle && (
            <p
              className="font-raleway font-medium text-[16px] leading-[26px]"
              style={{ color: subtitleColor }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    );
  }
);

PartnerHighlightCard.displayName = "PartnerHighlightCard";
export default PartnerHighlightCard;
