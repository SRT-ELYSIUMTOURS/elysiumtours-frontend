import React from "react";
import { classNames } from "../../../utils/classNames";

// Gallery Hero — Figma node 616:6252 area
// Full-screen hero: image fill, dark overlay, centered title + description + "Explore the Gallery" button
// Title: "Discover Ghana Through Our Lens" — 56px Bold, white, w-[957px]
// Description: 16px Medium, white, w-[850px]
// Button: white bg, border secondary-normal, rounded-[40px] pill, h-[56px] w-[217px]

const ArrowDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="11" viewBox="0 0 8 11" fill="none">
  <path d="M4.41667 0.75C4.41667 0.335786 4.08088 0 3.66667 0C3.25245 0 2.91667 0.335786 2.91667 0.75L3.66667 0.75L4.41667 0.75ZM2.91667 10.0833C2.91667 10.4975 3.25245 10.8333 3.66667 10.8333C4.08088 10.8333 4.41667 10.4975 4.41667 10.0833H3.66667H2.91667ZM7.11602 8.27796C7.40761 7.98376 7.40549 7.50889 7.11129 7.21731C6.8171 6.92573 6.34223 6.92784 6.05064 7.22204L6.58333 7.75L7.11602 8.27796ZM5.56407 8.7784L5.03138 8.25044L5.56407 8.7784ZM1.76926 8.7784L2.30195 8.25044L1.76926 8.7784ZM1.28269 7.22204C0.991107 6.92784 0.516238 6.92573 0.222041 7.21731C-0.0721558 7.50889 -0.0742744 7.98376 0.217309 8.27796L0.75 7.75L1.28269 7.22204ZM3.84944 10.0717L3.94427 10.8157H3.94427L3.84944 10.0717ZM3.48389 10.0717L3.38906 10.8157H3.38906L3.48389 10.0717ZM3.66667 0.75L2.91667 0.75L2.91667 10.0833H3.66667H4.41667L4.41667 0.75L3.66667 0.75ZM6.58333 7.75L6.05064 7.22204L5.03138 8.25044L5.56407 8.7784L6.09676 9.30636L7.11602 8.27796L6.58333 7.75ZM1.76926 8.7784L2.30195 8.25044L1.28269 7.22204L0.75 7.75L0.217309 8.27796L1.23657 9.30636L1.76926 8.7784ZM5.56407 8.7784L5.03138 8.25044C4.61254 8.67303 4.34223 8.94415 4.11808 9.12417C3.90576 9.29468 3.80878 9.32085 3.75462 9.32775L3.84944 10.0717L3.94427 10.8157C4.38547 10.7595 4.73938 10.549 5.05733 10.2937C5.36344 10.0479 5.70276 9.70389 6.09676 9.30636L5.56407 8.7784ZM1.76926 8.7784L1.23657 9.30636C1.63058 9.7039 1.9699 10.0479 2.27601 10.2937C2.59395 10.549 2.94786 10.7595 3.38906 10.8157L3.48389 10.0717L3.57872 9.32775C3.52455 9.32085 3.42757 9.29468 3.21525 9.12417C2.99111 8.94415 2.72079 8.67303 2.30195 8.25044L1.76926 8.7784ZM3.84944 10.0717L3.75462 9.32775C3.69621 9.33519 3.63713 9.33519 3.57872 9.32775L3.48389 10.0717L3.38906 10.8157C3.57339 10.8392 3.75994 10.8392 3.94427 10.8157L3.84944 10.0717Z" fill="currentColor"/>
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
  const handleExplore = () => {
    if (typeof onExplore === "function") {
      onExplore();
      return;
    }
    window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
  };

  return (
    <div
      ref={ref}
      className={classNames(
        "relative w-full overflow-hidden",
        "h-[350px] md:h-[500px] lg:h-[711px]",
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[32px] items-center w-full px-4 md:px-10">
        <div className="flex flex-col gap-[16px] items-center">
          {/* Title */}
          <p className="font-raleway font-bold text-[28px] md:text-[40px] lg:text-[56px] leading-tight lg:leading-[66px] text-primary-light-default text-center w-full max-w-[957px]">
            {title}
          </p>
          {/* Description */}
          <p className="font-raleway font-medium text-[14px] md:text-[16px] leading-[26px] text-primary-light-default text-center w-full max-w-[850px]">
            {description}
          </p>
        </div>

        {/* CTA Button */}
        <button
          className={classNames(
            "flex gap-[16px] h-[44px] md:h-[56px] items-center justify-center px-[20px] md:px-[10px] rounded-[40px]",
            "bg-primary-light-default border border-secondary-normal-default",
            "shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)]",
            "cursor-pointer w-auto md:w-[217px]"
          )}
          onClick={handleExplore}
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
