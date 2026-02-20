import React from "react";
import { classNames } from "../../utils/classNames";

// From Figma: Gallery page Frame 212
// GalleryMasonryCard: "Partner Highlights" frames — fill:#000000 stroke:#d6beeb r:40
// Variable heights (663, 663, 197, 568, 741, 848 etc) in masonry grid columns
// Structure:
//   - Full-bleed image fills
//   - Dark overlay
//   - Frame 220/221 at bottom: VERTICAL gap:8
//       Headline: title [25px/700] #f7f7f7 + white underline (large cards)
//              OR title [16px/700] #fefefe (small cards)
//       Sub-label: count [16px/400] #f7f7f7 e.g. "28 Pictures" (small cards only)
// Also has play button overlay for video cards

import { PlayCircleIcon } from "../ui/MediaIcons";

const GalleryMasonryCard = React.forwardRef(({
  image,
  title,          // location/destination name
  count,          // e.g. "28 Pictures" or "5 Videos"
  isVideo = false,
  onClick,
  size = "large",  // "large" (663px tall) | "small" (197px) | "medium" (415px)
  className = "",
  ...props
}, ref) => {

  const heights = {
    large:   "663px",
    medium:  "415px",
    small:   "197px",
    xlarge:  "848px",
    tall:    "741px",
  };

  const height = heights[size] || heights.large;
  const isSmall = size === "small";

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={classNames(
        "relative w-full overflow-hidden cursor-pointer group transition-all duration-300 ease-in",
        "hover:-translate-y-1",
        className
      )}
      style={{
        height,
        backgroundColor: "#000000",
        border: "1px solid #d6beeb",
        borderRadius: "40px",
      }}
      {...props}
    >
      {/* Background image */}
      {image ? (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-300 ease-in group-hover:scale-105"
        />
      ) : null}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 transition-all duration-300 ease-in group-hover:bg-black/40" />

      {/* Play button overlay — for video cards */}
      {isVideo && (
        <div className="absolute inset-0 flex items-center justify-center">
          <PlayCircleIcon size={52} />
        </div>
      )}

      {/* Content bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-[8px]">
        {/* Title */}
        {title && (
          <span style={{
            fontSize: isSmall ? "16px" : "25px",
            fontWeight: 700,
            color: isSmall ? "#fefefe" : "#f7f7f7",
            lineHeight: isSmall ? "22px" : "34px",
            fontFamily: "Raleway, sans-serif",
          }}>
            {title}
          </span>
        )}

        {/* White underline */}
        {title && <div className="w-full h-[1px] bg-white opacity-60" />}

        {/* Count — [16px/400] #f7f7f7, only on small cards */}
        {count && isSmall && (
          <span style={{
            fontSize: "16px",
            fontWeight: 400,
            color: "#f7f7f7",
            lineHeight: "22px",
            fontFamily: "Raleway, sans-serif",
          }}>
            {count}
          </span>
        )}
      </div>
    </div>
  );
});

GalleryMasonryCard.displayName = "GalleryMasonryCard";
export default GalleryMasonryCard;
