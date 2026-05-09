import React from "react";
import ExploreMoreArrowIcon from "../../icons/ExploreMoreArrowIcon";
import { classNames } from "../../../utils/classNames";

// Figma: 940:6299 — Featured Guide callout
// Inside: decorative rotated pill shapes (left) + guide info (center/right)
// Guide name "Meet Yam Obeng: Your Guide Through Cape Coast History"

const PartnerFeaturedGuide = React.forwardRef(({
  guideName = "Yam Obeng",
  guideTitle = "Meet Yam Obeng: Your Guide Through Cape Coast History",
  guideDescription = "A certified heritage guide with over 12 years of experience leading tours through Cape Coast Castle, Elmina, and beyond. Yam brings history to life with firsthand accounts, community connections, and a deep passion for Ghana's story.",
  guideImage = "https://picsum.photos/seed/guide-yam/200/200",
  className = "",
  ...props
}, ref) => {

  return (
    <section
      ref={ref}
      className={classNames("w-full bg-secondary-light-default py-[80px]", className)}
      {...props}
    >
      <div className="px-[156px]">
        {/* Inner card: bg-[#f7f7f7] h-[291px] rounded-[20px] overflow-hidden */}
        <div className="relative bg-primary-normal-default h-[291px] rounded-[20px] overflow-hidden shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] flex items-center">

          {/* Decorative rotated pill shapes (left) — from Figma node 940:6303 */}
          <div className="relative shrink-0 w-[220px] h-full flex items-center justify-center">
            {/* Back pill - rotated, light purple */}
            <div
              className="absolute w-[144px] h-[157px] rounded-[100px] bg-secondary-light-default shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]"
              style={{ transform: "rotate(-21deg)", top: "20px", left: "40px" }}
            />
            {/* Second pill */}
            <div
              className="absolute w-[144px] h-[157px] rounded-[100px] bg-secondary-light-default shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]"
              style={{ transform: "rotate(-21deg)", top: "80px", left: "60px" }}
            />
            {/* Front pill with guide image - purple with photo */}
            <div
              className="absolute w-[203px] h-[194px] rounded-[100px] overflow-hidden shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]"
              style={{ transform: "rotate(-21deg)", top: "50px", left: "10px" }}
            >
              <div className="absolute inset-0 bg-secondary-normal-default" />
              <img
                src={guideImage}
                alt={guideName}
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          </div>

          {/* Guide info — centered */}
          <div className="flex flex-col gap-[20px] items-center flex-1 px-[40px]">
            {/* Title */}
            <h3 className="font-raleway font-bold text-[25px] leading-[34px] text-tertiary-normal-default text-center">
              {guideTitle}
            </h3>

            {/* Description */}
            <p className="font-raleway font-normal text-[16px] leading-[24px] text-primary-dark-active text-center max-w-[600px]">
              {guideDescription}
            </p>

            {/* Button */}
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

          {/* Decorative logo watermark — from Figma (opacity-7 positioned center-right) */}
          <div className="absolute right-[60px] top-1/2 -translate-y-1/2 opacity-[0.07] pointer-events-none">
            <div className="w-[200px] h-[200px] rounded-full border-[3px] border-secondary-normal-default" />
          </div>
        </div>
      </div>
    </section>
  );
});

PartnerFeaturedGuide.displayName = "PartnerFeaturedGuide";
export default PartnerFeaturedGuide;
