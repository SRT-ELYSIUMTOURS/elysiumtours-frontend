import React from "react";
import { classNames } from "../../utils/classNames";

// Gallery video card — used in Videos category section
// Design: full-width card with image thumbnail, dark overlay,
//         play button circle top-right, title + video count bottom-left
// From Figma 616:6236 (Videos tab)

const PlayIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="10.25" stroke="#fefefe" strokeWidth="1.5" />
    <path d="M9 7.5L15 11L9 14.5V7.5Z" fill="#fefefe" />
  </svg>
);

const GalleryVideoCard = React.forwardRef(({
  image,
  title,
  count,
  className = "",
  onClick,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={classNames(
        "relative overflow-hidden bg-[rgba(0,0,0,0.5)]",
        "border border-secondary-light-active",
        "rounded-[20px]",
        "shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]",
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
          alt={title || "Gallery video"}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Play button — top right */}
      <div className="absolute top-[16px] right-[16px] z-10">
        <PlayIcon />
      </div>

      {/* Bottom text */}
      {(title || count) && (
        <>
          <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-[20px] left-[20px] flex flex-col gap-[4px]">
            {title && (
              <p className="font-raleway font-bold text-[25px] leading-[34px] text-primary-light-default">
                {title}
              </p>
            )}
            {count && (
              <p className="font-raleway font-normal text-[16px] leading-[24px] text-primary-light-default">
                {count}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
});

GalleryVideoCard.displayName = "GalleryVideoCard";
export default GalleryVideoCard;
