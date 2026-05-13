import React from "react";
import ExploreMoreArrowIcon from "../../icons/ExploreMoreArrowIcon";
import { classNames } from "../../../utils/classNames";

// Figma: 940:6299 — Featured Guide callout
// Inside: decorative rotated pill shapes (left) + guide info (center/right)
// Guide name "Meet Yam Obeng: Your Guide Through Cape Coast History"

const PartnerFeaturedGuide = React.forwardRef(({
  guideName = "Yaw Obeng",
  guideTitle = "Meet Yaw Obeng: Your Guide Through Cape Coast History",
  guideDescription = "A certified heritage guide with over 12 years of experience leading tours through Cape Coast Castle, Elmina, and beyond. Yaw brings history to life with firsthand accounts, community connections, and a deep passion for Ghana's story.",
  // Black male portrait from Unsplash (free use, focused face, centered)
  guideImage = "/tourCountryAssets/yaw-obeng.jpg",
  className = "",
  ...props
}, ref) => {

  return (
    <section
      ref={ref}
      className={classNames("w-full bg-secondary-light-default py-10 sm:py-14 lg:py-[80px]", className)}
      {...props}
    >
      <div className="px-4 sm:px-10 lg:px-[156px]">
        {/*
          Inner card:
          Mobile: stacked column — decorative pills on top, text below
          Desktop (lg+): flex row — pills left, text center, watermark right
        */}
        <div className="relative bg-primary-normal-default rounded-[20px] overflow-hidden shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] flex flex-col lg:flex-row lg:items-center lg:h-[291px]">

          {/*
            Decorative rotated pill shapes
            Mobile: reduced size, horizontal strip at top
            Desktop: left column, fixed width
          */}
          <div className="relative shrink-0 w-full h-[190px] lg:w-[220px] lg:h-full flex items-center justify-center overflow-visible">
        {/* Back pill */}
        <div
          className="absolute w-[110px] h-[120px] lg:w-[144px] lg:h-[157px] rounded-[100px] bg-secondary-light-default shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]"
          style={{ transform: "rotate(-21deg)", top: "10px", left: "30px" }}
        />

        {/* Second pill */}
        <div
          className="absolute w-[110px] h-[120px] lg:w-[144px] lg:h-[157px] rounded-[100px] bg-secondary-light-default shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]"
          style={{ transform: "rotate(-21deg)", top: "50px", left: "50px" }}
        />

        {/* Front pill with guide image */}
        <div
          className="absolute w-[155px] h-[148px] lg:w-[203px] lg:h-[194px] rounded-[100px] overflow-hidden shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]"
          style={{ transform: "rotate(-21deg)", top: "35px", left: "5px" }}
        >
          <div className="absolute inset-0 bg-secondary-normal-default" />

          <img
            src={guideImage}
            alt={guideName}
            className="absolute inset-0 w-full h-full object-cover object-top opacity-80"
          />

          <div className="absolute inset-0 bg-black/40" />
        </div>
      </div>
          {/* Guide info */}
          <div className="flex flex-col gap-4 lg:gap-[20px] items-center flex-1 px-6 py-8 lg:px-[40px] lg:py-0">
            <h3 className="font-raleway font-bold text-[18px] sm:text-[22px] lg:text-[25px] leading-[28px] sm:leading-[32px] lg:leading-[34px] text-tertiary-normal-default text-center">
              {guideTitle}
            </h3>
            <p className="font-raleway font-normal text-[14px] sm:text-[15px] lg:text-[16px] leading-[22px] sm:leading-[24px] text-primary-dark-active text-center max-w-[600px]">
              {guideDescription}
            </p>
            <button className={classNames(
              "flex items-center gap-[9px] h-[32px] px-[10px]",
              "border-[0.8px] border-solid border-secondary-normal-default",
              "rounded-[40px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)]",
              "font-raleway font-semibold text-[13px] leading-[18px] text-secondary-normal-default",
              "hover:bg-secondary-light-default transition-all duration-300 ease-in cursor-pointer bg-transparent"
            )}>
              View Profile
              <ExploreMoreArrowIcon />
            </button>
          </div>

          {/* Decorative logo watermark — desktop only */}
          <div className="hidden lg:block absolute right-[60px] top-1/2 -translate-y-1/2 opacity-[0.07] pointer-events-none">
            <div className="w-[200px] h-[200px] rounded-full border-[3px] border-secondary-normal-default" />
          </div>
        </div>
      </div>
    </section>
  );
});

PartnerFeaturedGuide.displayName = "PartnerFeaturedGuide";
export default PartnerFeaturedGuide;
