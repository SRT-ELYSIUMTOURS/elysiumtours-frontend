import React from "react";
import { classNames } from "../../../utils/classNames";
import Button from "../../ui/button";

// Gallery "Become Part of the Gallery" / "Share Your Travel Moments" section
// Figma: 815:6295 area — "SHARE YOUR TRAVEL MOMENTS" eyebrow + "Become Part of the Gallery" title
// Layout: LEFT eyebrow line, RIGHT title
// Below: 3-column card layout + description + "Share Your Photos" button
// bg-primary-light-default (white), py-[80px]

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M5.25 3.5L8.75 7L5.25 10.5" stroke="#7b2cbf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GalleryBecomePartSection = React.forwardRef(({
  onUpload,
  className = "",
  ...props
}, ref) => {
  return (
    <section
      ref={ref}
      className={classNames(
        "relative w-full bg-primary-light-default py-[80px]",
        className
      )}
      {...props}
    >
      <div className="px-4 md:px-8 lg:px-[156px]">
        {/* Header row: LEFT eyebrow + RIGHT title */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between w-full mb-8 lg:mb-[48px] gap-4 lg:gap-0">
          {/* Left — eyebrow */}
          <div className="flex items-center gap-[8px] pt-[10px]">
            <div className="w-[46px] h-px shrink-0 bg-secondary-dark-darker" />
            <span className="font-raleway font-bold text-[13px] leading-[18px] text-secondary-dark-darker uppercase tracking-[0.05em]">
              SHARE YOUR TRAVEL MOMENTS
            </span>
          </div>

          {/* Right — title */}
          <div className="flex flex-col gap-[16px] items-start lg:items-end w-full lg:w-[677px]">
            <h2 className="font-raleway font-bold text-[20px] md:text-[25px] leading-[34px] text-[#2d2d2d] text-left lg:text-right w-full lg:w-[630px]">
              Become Part of the Gallery
            </h2>
          </div>
        </div>

        {/* Content: stacks on mobile, side-by-side on lg+ */}
        <div className="flex flex-col lg:flex-row gap-[24px] items-start w-full">
          {/* Large photo card */}
          <div className="relative overflow-hidden rounded-[40px] border border-secondary-light-active shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] w-full lg:w-[594px] h-[260px] md:h-[380px] lg:h-[631px] shrink-0">
            <img
              src="https://picsum.photos/seed/become-part/594/631"
              alt="Become part of the gallery"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Right side: description + two smaller cards + button */}
          <div className="flex flex-col gap-[24px] flex-1 w-full">
            {/* Description */}
            <div className="flex flex-col gap-[16px] items-start lg:items-end">
              <p className="font-raleway font-normal text-[14px] md:text-[16px] leading-[26px] text-[#2d2d2d] text-left lg:text-right w-full lg:w-[532px]">
                Be part of our story. Upload your travel photos, share the memory behind them, and see your moments come alive in our community gallery. Once approved, your shots will appear in our community gallery for other explorers to enjoy.
              </p>
            </div>

            {/* Two photo cards row */}
            <div className="flex gap-[16px] lg:gap-[24px] items-start">
              <div className="relative overflow-hidden rounded-[40px] border border-secondary-light-active shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] flex-1 h-[180px] md:h-[260px] lg:h-[337px]">
                <img
                  src="https://picsum.photos/seed/become-part-b/401/337"
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>
              <div className="relative overflow-hidden rounded-[40px] border border-secondary-light-active shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] flex-1 lg:w-[363px] lg:flex-none h-[180px] md:h-[260px] lg:h-[337px]">
                <img
                  src="https://picsum.photos/seed/become-part-c/363/337"
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>
            </div>

            {/* Upload button */}
            <div className="flex justify-start lg:justify-end">
              <Button
                variant="primary"
                shape="pill"
                className="h-[56px] px-[32px]! gap-md"
                onClick={onUpload}
              >
                Share Your Photos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

GalleryBecomePartSection.displayName = "GalleryBecomePartSection";
export default GalleryBecomePartSection;
