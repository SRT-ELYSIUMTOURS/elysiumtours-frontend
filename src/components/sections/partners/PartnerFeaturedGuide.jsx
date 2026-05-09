import React from "react";
import ExploreMoreArrowIcon from "../../icons/ExploreMoreArrowIcon";
import { classNames } from "../../../utils/classNames";

const ELYSIUM_LOGO = "/ElysiumAssets/Logo.png";

// Figma 940:6299 — Featured guide callout
// Watermarks: same asset as Auth modal (`/ElysiumAssets/Logo.png`), low opacity — no external URLs.

const PartnerFeaturedGuide = React.forwardRef(
  (
    {
      guideName = "Yam Obeng",
      guideTitle = "Meet Yam Obeng : Your Guide Through Cape Coast History",
      guideDescription = `From the historic shores of Cape Coast to the laid-back beaches of Busua, Ghana's coastline is a blend of beauty, history, and adventure. Join us as we explore hidden seaside gems, local seafood spots, and the cultural rhythms that make the coast truly unforgettable.`,
      guideImage = "https://picsum.photos/seed/guide-yam/400/400",
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={classNames(
          "w-full bg-secondary-light-default py-10 sm:py-14 lg:py-[80px]",
          className
        )}
        {...props}
      >
        <div className="px-4 sm:px-10 lg:px-[156px]">
          <div
            className={classNames(
              "main-container relative mx-auto my-0 w-full max-w-[1416px] overflow-hidden rounded-[20px] bg-[#f7f7f7]",
              "min-h-[420px] lg:h-[291px] lg:min-h-0"
            )}
          >
            {/* Center Elysium watermark — matches guide placement (~centered, subtle) */}
            <img
              src={ELYSIUM_LOGO}
              alt=""
              aria-hidden
              className={classNames(
                "pointer-events-none select-none absolute z-[1]",
                "left-1/2 top-1/2 w-[min(90vw,563px)] max-w-[563px] object-contain opacity-[0.07]",
                "-translate-x-[23.27%] -translate-y-[49.87%]"
              )}
            />

            {/* Left corner Elysium watermark */}
            <img
              src={ELYSIUM_LOGO}
              alt=""
              aria-hidden
              className={classNames(
                "pointer-events-none select-none absolute z-[1]",
                "left-[-53px] top-[113.003px] h-[217.571px] w-[261.203px] object-contain opacity-[0.07]"
              )}
            />

            {/* Content row — guide: flex w-[1058px] h-[265px] gap-[24px], centered */}
            <div
              className={classNames(
                "relative z-10 flex h-full w-full flex-col items-center justify-center gap-8 px-6 py-10",
                "lg:absolute lg:left-1/2 lg:top-1/2 lg:h-[265px] lg:max-w-[1058.299px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:flex-row lg:items-center lg:gap-[24px] lg:px-0 lg:py-0"
              )}
            >
              {/* Left: layered pills + portrait */}
              <div className="relative z-[1] mx-auto h-[291.875px] w-[311.299px] max-w-full shrink-0">
                <div
                  className={classNames(
                    "absolute left-0 top-0 z-[3] h-[198px] w-[190.654px] rotate-[-21deg] overflow-hidden rounded-[100px]",
                    "bg-secondary-light-default shadow-[0_4px_20px_0_rgba(0,0,0,0.05)]"
                  )}
                />
                <div
                  className={classNames(
                    "absolute left-[58.873px] top-[52.43px] z-[4] h-[194.001px] w-[202.956px] overflow-hidden rounded-[100px]",
                    "shadow-[0_4px_20px_0_rgba(0,0,0,0.05)]"
                  )}
                >
                  <img src={guideImage} alt={guideName} className="h-full w-full object-cover" />
                </div>
                <div
                  className={classNames(
                    "absolute left-[120.645px] top-[93.877px] z-[2] h-[198px] w-[190.654px] rotate-[-21deg] overflow-hidden rounded-[100px]",
                    "bg-secondary-light-default shadow-[0_4px_20px_0_rgba(0,0,0,0.05)]"
                  )}
                />
              </div>

              {/* Right: title + body + Read Now */}
              <div className="flex w-full max-w-[723px] shrink-0 flex-col items-center gap-5 lg:gap-[20px]">
                <div className="flex w-full flex-col items-center gap-4 self-stretch lg:h-[162px] lg:justify-center lg:gap-0">
                  <div className="flex w-full justify-center px-[10px] pt-[10px] lg:h-[37px] lg:items-center lg:justify-end lg:pt-[10px] lg:pb-[10px]">
                    <h3 className="max-w-[694px] text-center font-raleway text-[20px] font-bold leading-[28px] text-[#2d2d2d] sm:text-[22px] sm:leading-[30px] lg:text-right lg:text-[25px] lg:leading-[34px]">
                      {guideTitle}
                    </h3>
                  </div>
                  <div className="flex w-full justify-center px-[10px] pt-[10px] lg:max-w-[600px] lg:items-start lg:justify-center lg:pr-px lg:pb-[10px]">
                    <p className="max-w-[577px] text-center font-raleway text-[15px] font-normal leading-[24px] text-[#2d2d2d] sm:text-[16px]">
                      {guideDescription}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className={classNames(
                    "flex h-[40px] shrink-0 items-center justify-center gap-[9px] rounded-[40px] border-[0.8px] border-solid border-[#7b2cbf] px-[10px] py-[10px]",
                    "shadow-[0_4px_4px_0_rgba(0,0,0,0.05)]",
                    "font-raleway text-[13px] font-semibold leading-[18px] text-[#7b2cbf]",
                    "transition-all duration-300 ease-in hover:bg-secondary-light-default cursor-pointer bg-transparent"
                  )}
                >
                  Read Now
                  <ExploreMoreArrowIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

PartnerFeaturedGuide.displayName = "PartnerFeaturedGuide";
export default PartnerFeaturedGuide;
