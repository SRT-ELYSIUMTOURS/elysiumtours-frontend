import React from "react";
import { classNames } from "../../../utils/classNames";
import Button from "../../ui/button";

const CtaSection = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={classNames(
        "relative bg-secondary-dark-darker overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="max-w-[1416px]   mx-auto relative min-h-[500px] lg:min-h-[732px]">
        {/* Rotated decorative images — visible on large screens */}
        <div className="hidden lg:block">
          <div
            className="absolute top-[-258px] left-[101px] w-[347px] h-[708px] rounded-t-[208px] rounded-b-[208px] overflow-hidden shadow-[--shadow-card] opacity-80"
            style={{ transform: "rotate(22.56deg)" }}
          >
            <img
              src="https://picsum.photos/seed/cta1/347/708"
              alt=""
              className="w-full h-full object-cover"
              aria-hidden="true"
            />
          </div>
          <div
            className="absolute bottom-[-204px] left-[300px] w-[329px] h-[669px] rounded-t-[208px] rounded-b-[208px] overflow-hidden shadow-[--shadow-card] opacity-80"
            style={{ transform: "rotate(22.56deg)" }}
          >
            <img
              src="https://picsum.photos/seed/cta2/329/669"
              alt=""
              className="w-full h-full object-cover"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Content — right aligned */}
        <div className="relative z-10 flex items-center justify-center lg:justify-end min-h-[500px] lg:min-h-[732px] px-6 md:px-[30px]">
          <div className="flex flex-col items-center lg:items-end gap-lg max-w-[581px] py-16 lg:py-0">
            <h2 className="font-raleway font-bold text-[32px] leading-[40px] lg:text-Display-xl-bold lg:leading-[66px] text-primary-light-default text-center lg:text-right">
              Join Elysium Tours in Redefining the Future of Ghanaian Travel
            </h2>
            <p className="font-raleway font-normal text-[14px] leading-[22px] lg:text-md-regular lg:leading-[24px] text-primary-light-default text-center lg:text-right max-w-[483px]">
              Join Elysium Tours to showcase Ghana&apos;s beauty and culture.
              Together, we&apos;ll create authentic journeys that inspire
              travelers and empower local communities.
            </p>
            <Button
              variant="white"
              size="medium"
              shape="pill"
              className="w-[169px] h-[56px]"
            >
              Partner With Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});

CtaSection.displayName = "CtaSection";

export default CtaSection;
