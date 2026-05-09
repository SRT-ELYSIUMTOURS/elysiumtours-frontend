import React from "react";
import { classNames } from "../../utils/classNames";

// Gallery photo card — used in gallery category sections and sub-category listing pages
// Design: rounded-[40px] image card, black overlay, border-secondary-light-active,
//         bottom-left: title (25px bold white) + count (16px regular white)
// Sizes: "large" (h=663), "medium" (h=568), "small" (h=197 w=162 rounded-[30px])

const GalleryPhotoCard = React.forwardRef(({
  image,
  title,
  count,
  size = "medium",   // "large" | "medium" | "small"
  className = "",
  onClick,
  ...props
}, ref) => {
  const isSmall = size === "small";
  const rounded = isSmall ? "rounded-[30px]" : "rounded-[40px]";

  return (
    <div
      ref={ref}
      className={classNames(
        "relative overflow-hidden bg-[rgba(0,0,0,0.5)]",
        "border border-secondary-light-active",
        "shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]",
        rounded,
        "cursor-pointer shrink-0",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {/* Background image */}
      {image && (
        <img
          src={image}
          alt={title || "Gallery photo"}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Bottom gradient + text */}
      {!isSmall && (title || count) && (
        <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-gradient-to-t from-black/80 to-transparent" />
      )}

      {(title || count) && (
        <div
          className={classNames(
            "absolute flex flex-col gap-[4px] items-start",
            isSmall
              ? "bottom-[10px] left-[13px] right-[13px]"
              : "bottom-[16px] left-[16px] right-[16px] md:bottom-[22px] md:left-[22px] md:right-[22px]"
          )}
        >
          {title && (
            <p className={classNames(
              "font-raleway font-bold text-primary-light-default leading-[1.2] line-clamp-2 break-words",
              isSmall ? "text-[13px]" : "text-[18px] md:text-[22px] lg:text-[25px]"
            )}>
              {title}
            </p>
          )}
          {count && (
            <p className={classNames(
              "font-raleway font-normal text-primary-light-default leading-[1.4]",
              isSmall ? "text-[10px]" : "text-[13px] md:text-[16px]"
            )}>
              {count}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

GalleryPhotoCard.displayName = "GalleryPhotoCard";
export default GalleryPhotoCard;
