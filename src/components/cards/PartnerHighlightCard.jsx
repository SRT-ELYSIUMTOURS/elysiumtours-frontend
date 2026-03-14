import React from "react";
import { classNames } from "../../utils/classNames";

// From Figma: "Partner Highlights" INSTANCE — 451×656px
// Structure observed:
//   - Full-bleed image fill + black overlay (opacity 0.5)
//   - Category label text [20px/700] #fefefe centred/bottom
//   - e.g. "Accommodation", "Transportation", "Dinning"

const PartnerHighlightCard = React.forwardRef(
  (
    { image, category = "Accommodation", onClick, className = "", ...props },
    ref
  ) => {
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
          "cursor-pointer group transition-all duration-300 ease-in",
          "hover:shadow-xl",
          className
        )}
        style={{ backgroundImage: image ? `url(${image})` : undefined }}
        {...props}
      >
        {/* Dark overlay — border-radius matches parent so no clipping needed */}
        <div className="absolute inset-0 rounded-[40px] bg-black/50 transition-colors duration-300 ease-in group-hover:bg-black/40" />

        {/* Category label — bottom left, [20px/700] #fefefe */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-[27px]">
          <h3 className="text-semi-md-bold text-primary-light-default">
            {category}
          </h3>
        </div>
      </div>
    );
  }
);

PartnerHighlightCard.displayName = "PartnerHighlightCard";
export default PartnerHighlightCard;
