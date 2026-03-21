import React from "react";
import { classNames } from "../../../utils/classNames";

// Gallery Hero — Figma node 616:6252 area
// Full-screen hero: image fill, dark overlay, centered title + description + "Explore the Gallery" button
// Title: "Discover Ghana Through Our Lens" — 56px Bold, white, w-[957px]
// Description: 16px Medium, white, w-[850px]
// Button: white bg, border secondary-normal, rounded-[40px] pill, h-[56px] w-[217px]

const ArrowDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.625 5.25L7 9.625L11.375 5.25" stroke="#2b0f43" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GalleryHero = React.forwardRef(({
  image,
  title = "Discover Ghana Through Our Lens",
  description = "Explore the sights, sounds, and stories of Ghana — from lively markets and golden beaches to vibrant festivals and hidden gems. Every photo tells a story, every moment is an adventure.",
  onExplore,
  className = "",
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={classNames(
        "relative w-full overflow-hidden",
        "h-[711px]",
        className
      )}
      {...props}
    >
      {/* Background image */}
      <div className="absolute inset-0 bg-[#f7f7f7]">
        <img
          src={image || "https://picsum.photos/seed/gallery-hero/1728/711"}
          alt="Gallery hero"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Centered content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[32px] items-center">
        <div className="flex flex-col gap-[16px] items-center">
          {/* Title */}
          <p
            className="font-raleway font-bold text-[56px] leading-[66px] text-primary-light-default text-center"
            style={{ width: "957px" }}
          >
            {title}
          </p>
          {/* Description */}
          <div className="flex h-[53px] items-start justify-center p-[10px]">
            <p
              className="font-raleway font-medium text-[16px] leading-[26px] text-primary-light-default text-center"
              style={{ width: "850px" }}
            >
              {description}
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          className={classNames(
            "flex gap-[16px] h-[56px] items-center justify-center p-[10px] rounded-[40px]",
            "bg-primary-light-default border border-secondary-normal-default",
            "shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)]",
            "cursor-pointer"
          )}
          style={{ width: "217px" }}
          onClick={onExplore}
        >
          <p className="font-raleway font-semibold text-[16px] leading-[22px] text-secondary-dark-darker whitespace-nowrap">
            Explore the Gallery
          </p>
          <ArrowDownIcon />
        </button>
      </div>
    </div>
  );
});

GalleryHero.displayName = "GalleryHero";
export default GalleryHero;
