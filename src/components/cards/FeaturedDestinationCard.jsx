import React from "react";
import { classNames } from "../../utils/classNames";

// From Figma: Featured Destinations grid — Frame 9 (1728×1002)
// Each destination: full-bleed image + dark overlay + name [20px/700] #fefefe
//   + subtitle [16px/600] #fefefe
// Destinations seen: Kakum National Park, National Theater,
//   Independence Square, Boti Falls

const FeaturedDestinationCard = React.forwardRef(({
  image,
  name = "Kakum National Park",
  subtitle = "Discover Ghana's most captivating destinations",
  onClick,
  size = "default",       // "default" | "large" — centre card is larger in Figma
  className = "",
  ...props
}, ref) => {

  const sizes = {
    default: "h-[316px]",
    large:   "h-[656px]",   // centre featured card — Frame 48 in Figma (451×656)
  };

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={classNames(
        "relative w-full rounded-[var(--radius-md)] overflow-hidden",
        "cursor-pointer group transition-all duration-300 ease-in",
        sizes[size] || sizes.default,
        className
      )}
      {...props}
    >
      {/* Background image */}
      {image ? (
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-300 ease-in group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-primary-dark-default" />
      )}

      {/* Gradient overlay — dark at bottom for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Text — bottom left */}
      <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-1">
        {/* Name — [20px/700] #fefefe */}
        <h3 className="text-semi-md-bold text-primary-light-default leading-tight">
          {name}
        </h3>
        {/* Subtitle — [16px/600] #fefefe */}
        <p className="text-md-semibold text-primary-light-default opacity-90 line-clamp-1">
          {subtitle}
        </p>
      </div>
    </div>
  );
});

FeaturedDestinationCard.displayName = "FeaturedDestinationCard";
export default FeaturedDestinationCard;
