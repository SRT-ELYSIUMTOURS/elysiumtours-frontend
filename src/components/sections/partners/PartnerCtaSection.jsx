import React from "react";
import { classNames } from "../../../utils/classNames";
import Button from "../../ui/button";

// Figma: 772:10509 — CTA section
// bg-[#2b0f43] (secondary-dark-darker), shadow
// Desktop: LEFT image 711×559px rounded-[40px], RIGHT title + desc + "Become a Partner" button
// Mobile: stacked — image on top, text below

const PartnerCtaSection = React.forwardRef(({
  className = "",
  onBecomePartnerClick,
  ...props
}, ref) => {
  return (
    <section
      ref={ref}
      className={classNames(
        "relative w-full bg-secondary-dark-darker overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]",
        className
      )}
      {...props}
    >
      {/* Decorative blur blobs — purely visual, hidden on very small screens to keep perf light */}
      <div
        className="absolute top-[-387px] bg-secondary-light-hover rounded-full blur-[40px] left-[1303px] w-[329px] h-[818px] opacity-20 pointer-events-none"
        style={{ transform: "rotate(30.2deg)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-434px] left-[-265px] w-[329px] bg-secondary-light-hover rounded-full blur-[40px] h-[818px] opacity-20 pointer-events-none"
        style={{ transform: "rotate(-149.8deg)" }}
        aria-hidden="true"
      />

      {/*
        Layout:
        Mobile: stacked column — image on top, text below, both padded
        Tablet (md): still stacked but more breathing room
        Desktop (lg): side-by-side row matching Figma — image left, text right
                      min-h-[732px] recreates the fixed Figma height without breaking on smaller screens
      */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row lg:items-center lg:min-h-[732px] px-4 sm:px-10 lg:px-[156px] py-12 sm:py-16 lg:py-0 gap-10 lg:gap-0 lg:justify-between">

        {/* Left — image */}
        <div className="w-full lg:w-[711px] lg:h-[559px] lg:shrink-0 rounded-[24px] lg:rounded-[40px] overflow-hidden shadow-[0px_4px_20px_0px_rgba(0,0,0,0.2)]">
          <img
            src="https://picsum.photos/seed/partner-cta/711/559"
            alt="Tour partners in West Africa"
            className="w-full h-full object-cover"
            style={{ aspectRatio: "711/559" }}
          />
        </div>

        {/* Right — text content */}
        <div className="flex flex-col items-start lg:items-end gap-4 lg:gap-[16px] lg:w-[581px] lg:pl-10">
          <h2 className="font-raleway font-bold text-[32px] sm:text-[40px] lg:text-[56px] leading-[42px] sm:leading-[52px] lg:leading-[66px] text-primary-light-default lg:text-right">
            Join Ghana's Most Trusted Travel Network
          </h2>
          <p className="font-raleway font-normal text-[15px] sm:text-[16px] leading-[24px] lg:leading-[26px] text-primary-light-default lg:text-right lg:w-[483px]">
            Are you a tour guide, hotel, restaurant, or service provider? Partner with Elysium Tours and connect your business to thousands of travellers exploring West Africa.
          </p>
          <Button
            variant="white"
            shape="pill"
            className="h-[64px] px-[32px]! gap-md mt-[8px]"
            type="button"
            onClick={onBecomePartnerClick}
          >
            Become a Partner
          </Button>
        </div>
      </div>
    </section>
  );
});

PartnerCtaSection.displayName = "PartnerCtaSection";
export default PartnerCtaSection;
