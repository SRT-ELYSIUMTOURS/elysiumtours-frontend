import React from "react";
import { classNames } from "../../utils/classNames";

// From Figma: Blog page sections (Frame 8, 103, 109, 110)
// "Partner Highlights" frames used as blog article cards
// Sizes vary: 1028×371, 363×371, 457×419, 461×364, 340×653
// All: fill:#000000, stroke:#d6beeb, r:40
// Structure:
//   - Full-bleed image background
//   - Dark overlay
//   - "Headline" at bottom: title [25px/700] #fefefe + white underline
//   - Optional: sub-label [16px/400] #f7f7f7 e.g. "28 Pictures"

const BlogContentCard = React.forwardRef(({
  image,
  category,       // eyebrow label e.g. "TRAVEL GUIDE"
  title,          // main title [25px/700] #fefefe
  subLabel,       // optional count e.g. "28 Pictures" [16px/400] #f7f7f7
  onClick,
  size = "medium",  // "small" | "medium" | "large" | "wide"
  className = "",
  ...props
}, ref) => {

  // Size presets matching Figma dimensions
  const sizes = {
    small:  { width: "340px",  height: "364px"  },
    medium: { width: "457px",  height: "419px"  },
    large:  { width: "457px",  height: "814px"  },
    wide:   { width: "1028px", height: "371px"  },
    tall:   { width: "340px",  height: "653px"  },
  };

  const dims = sizes[size] || sizes.medium;

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={classNames(
        "relative overflow-hidden cursor-pointer group transition-all duration-300 ease-in",
        "hover:-translate-y-1",
        className
      )}
      style={{
        ...dims,
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

      {/* Content — bottom of card */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-[8px]">
        {/* Category eyebrow */}
        {category && (
          <span style={{
            fontSize: "13px",
            fontWeight: 700,
            color: "#d6beeb",
            letterSpacing: "0.05em",
            fontFamily: "Raleway, sans-serif",
          }}>
            {category}
          </span>
        )}

        {/* Title — [25px/700] #fefefe */}
        {title && (
          <h3 style={{
            fontSize: "25px",
            fontWeight: 700,
            color: "#fefefe",
            lineHeight: "34px",
            fontFamily: "Raleway, sans-serif",
          }}>
            {title}
          </h3>
        )}

        {/* White underline — from Figma Line 3 stroke:#ffffff */}
        <div className="w-full h-[1px] bg-white opacity-60" />

        {/* Sub-label — [16px/400] #f7f7f7 e.g. "28 Pictures" */}
        {subLabel && (
          <span style={{
            fontSize: "16px",
            fontWeight: 400,
            color: "#f7f7f7",
            lineHeight: "22px",
            fontFamily: "Raleway, sans-serif",
          }}>
            {subLabel}
          </span>
        )}
      </div>
    </div>
  );
});

BlogContentCard.displayName = "BlogContentCard";
export default BlogContentCard;
