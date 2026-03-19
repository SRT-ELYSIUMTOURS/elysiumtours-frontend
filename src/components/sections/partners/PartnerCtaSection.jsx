import React from "react";
import { classNames } from "../../../utils/classNames";
import Button from "../../ui/button";

// Figma: 772:10509 — CTA section
// bg-[#2b0f43] (secondary-dark-darker), shadow
// Left image: h-[559px] left-[156px] rounded-[40px] w-[711px]
// Right text: title + description + "Become a Partner" button

const PartnerCtaSection = React.forwardRef(({
  className = "",
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
      <div className="relative h-[732px] max-w-[1728px] mx-auto">
        {/* Decorative blur blobs */}
        <div
          className="absolute top-[-387px] bg-secondary-light-hover rounded-full blur-[40px] left-[1303px] w-[329px] h-[818px] opacity-20"
          style={{ transform: "rotate(30.2deg)" }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-[-434px] left-[-265px] w-[329px] bg-secondary-light-hover rounded-full blur-[40px] h-[818px] opacity-20"
          style={{ transform: "rotate(-149.8deg)" }}
          aria-hidden="true"
        />

        {/* Left image — h-[559px] left-[156px] w-[711px] rounded-[40px] */}
        <div
          className="absolute top-1/2 -translate-y-1/2"
          style={{ left: "156px", width: "711px", height: "559px" }}
        >
          <div className="w-full h-full rounded-[40px] overflow-hidden shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]">
            <img
              src="https://picsum.photos/seed/partner-cta/711/559"
              alt="Tour partners in West Africa"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right text content */}
        <div
          className="absolute top-1/2 -translate-y-1/2 flex flex-col items-end gap-[16px] z-10"
          style={{ right: "156px", width: "581px" }}
        >
          <h2 className="font-raleway font-bold text-[56px] leading-[66px] text-primary-light-default text-right">
            Join Ghana's Most Trusted Travel Network
          </h2>
          <p className="font-raleway font-normal text-[16px] leading-[26px] text-primary-light-default text-right w-[483px]">
            Are you a tour guide, hotel, restaurant, or service provider? Partner with Elysium Tours and connect your business to thousands of travellers exploring West Africa.
          </p>
          <Button
            variant="white"
            shape="pill"
            className="h-[64px] px-[32px]! gap-md mt-[8px]"
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
