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
    // Default: label flush to bottom; frosted strip uses a separate layer so text stays sharp
    const defaultLabelClass =
      "absolute bottom-0 left-0 h-[122px] right-0 isolate z-[2] overflow-hidden rounded-b-[40px] px-6 flex flex-col justify-center  ";

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

        {/* Category label + optional subtitle — frosted strip behind text (Figma glass blend) */}
        <div className={labelClassName ?? defaultLabelClass}>
          {!labelClassName && (
            <div
              aria-hidden
              className="partner-highlight-label-frost pointer-events-none absolute inset-0  rounded-b-[40px]"
            />
          )}
          <div className="relative z-1 ">
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
      </div>
    );
  }
);

PartnerHighlightCard.displayName = "PartnerHighlightCard";
export default PartnerHighlightCard;
