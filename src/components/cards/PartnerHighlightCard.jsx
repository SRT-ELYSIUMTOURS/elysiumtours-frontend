import React from "react";
import { classNames } from "../../utils/classNames";

// From Figma: "Partner Highlights" INSTANCE — 451×656px
// Structure observed:
//   - Full-bleed image fill + black overlay (opacity 0.5)
//   - Category label text [20px/700] #fefefe centred/bottom
//   - e.g. "Accommodation", "Transportation", "Dinning"

const PartnerHighlightCard = React.forwardRef(({
  image,
  category = "Accommodation",
  onClick,
  className = "",
  ...props
}, ref) => {

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={classNames(
        "relative w-[451px] h-[656px] rounded-[var(--radius-md)] overflow-hidden",
        "cursor-pointer group transition-all duration-300 ease-in",
        "hover:shadow-xl",
        className
      )}
      {...props}
    >
      {/* Background image */}
      {image ? (
        <img
          src={image}
          alt={category}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-300 ease-in group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-primary-dark-default" />
      )}

      {/* Dark overlay — from Figma: black 0.5 opacity */}
      <div className="absolute inset-0 bg-black/50 transition-all duration-300 ease-in group-hover:bg-black/40" />

      {/* Category label — bottom left, [20px/700] #fefefe */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-semi-md-bold text-primary-light-default">
          {category}
        </h3>
      </div>
    </div>
  );
});

PartnerHighlightCard.displayName = "PartnerHighlightCard";
export default PartnerHighlightCard;
