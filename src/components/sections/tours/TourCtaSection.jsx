import React from "react";
import { classNames } from "../../../utils/classNames";

const blogCtaBg = "/ElysiumAssets/blog-cta-bg.png";
const blogCtaDeco = "/ElysiumAssets/blog-cta-deco.svg";

// Featured-blog teaser CTA used on Tour, TourCountry, BlogCategory, Blog, Home pages.
// Mobile/tablet: stacked card — image on top, text below.
// Desktop (lg+): original Figma layout — skewed photo left + text card right.
const TourCtaSection = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={classNames(
        "relative overflow-hidden bg-[#f2eaf9] py-10 lg:py-[41px]",
        className
      )}
      {...props}
    >
      {/* Decorative dot rings */}
      <img
        src={blogCtaDeco}
        aria-hidden="true"
        className="absolute pointer-events-none w-[200px] md:w-[300px] lg:w-[486px] h-auto"
        style={{ top: -80, right: -100 }}
        alt=""
      />
      <img
        src={blogCtaDeco}
        aria-hidden="true"
        className="absolute pointer-events-none w-[200px] md:w-[300px] lg:w-[486px] h-auto"
        style={{ bottom: -60, left: -40 }}
        alt=""
      />

      {/* Mobile / tablet — stacked card */}
      <div className="relative z-10 flex lg:hidden mx-4 md:mx-8 bg-[#f7f7f7] rounded-[20px] overflow-hidden shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] flex-col">
        <div className="relative w-full h-[200px] md:h-[320px]">
          <img
            src={blogCtaBg}
            alt="Kakum canopy walkway, Ghana"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)]" />
        </div>
        <div className="bg-[#f2eaf9] flex flex-col gap-2 items-center justify-center px-5 py-6 md:py-8">
          <p className="font-raleway font-bold text-[13px] leading-[18px] text-[#5c218f] text-center">
            Writer: Davida Dzato
          </p>
          <p className="font-raleway font-bold text-[18px] md:text-[20px] leading-[28px] text-[#2d2d2d] text-center">
            Jollof Rice, Explained
          </p>
          <p className="font-raleway font-medium text-[14px] md:text-[16px] leading-[24px] md:leading-[26px] text-[#2d2d2d] text-center max-w-[400px]">
            Six unique dishes, six African countries to explore.
          </p>
        </div>
      </div>

      {/* Desktop — original Figma layout */}
      <div className="hidden lg:block mx-[156px] h-[578px] bg-[#f7f7f7] rounded-[20px] overflow-clip shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] relative">
        <div className="absolute left-[33px] top-1/2 -translate-y-1/2 flex items-center">
          {/* Skewed photo */}
          <div className="w-[757px] h-[487px] flex items-center justify-center shrink-0">
            <div className="skew-x-[5.41deg] flex-none">
              <div
                className="relative rounded-[20px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]"
                style={{ width: "710.845px", height: "455.676px" }}
              >
                <div className="absolute inset-0 bg-[#7b2cbf] rounded-[20px]" />
                <img
                  src={blogCtaBg}
                  alt="Kakum canopy walkway, Ghana"
                  className="absolute max-w-none object-cover rounded-[20px] size-full"
                />
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)] rounded-[20px]" />
              </div>
            </div>
          </div>

          {/* Right text card */}
          <div className="w-[463px] h-[306px] bg-[#f2eaf9] rounded-[10px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] flex flex-col gap-[10px] items-center justify-center p-[10px] shrink-0">
            <p className="font-raleway font-bold text-[13px] leading-[18px] text-[#5c218f] text-center w-[298px] shrink-0">
              Writer: Davida Dzato
            </p>
            <p className="font-raleway font-bold text-[20px] leading-[28px] text-[#2d2d2d] whitespace-nowrap shrink-0">
              Jollof Rice, Explained
            </p>
            <p className="font-raleway font-medium text-[16px] leading-[26px] text-[#2d2d2d] text-center w-[298px] shrink-0">
              Six unique dishes, six African countries to explore.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

TourCtaSection.displayName = "TourCtaSection";
export default TourCtaSection;
