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
      <div className="max-w-[1416px]   mx-auto relative min-h-[400px]  items-center flex justify-end lg:min-h-[732px]">
        {/* Rotated decorative images — visible on large screens */}
        <div className=" absolute left-[21px] rotate-[22.5deg] flex ">
          <div
            className=" w-[100px] -translate-y-[228px] h-[400px] md:w-[150px] md:h-[500px] lg:w-[347px] lg:h-[708px] rounded-t-[208px] rounded-b-[208px] overflow-hidden shadow-[--shadow-card] opacity-80"
          >
            <img
              src="https://picsum.photos/seed/cta1/347/708"
              alt=""
              className="w-full h-full object-cover"
              aria-hidden="true"
            />
          </div>
          <div
            className="translate-y-[228px] w-[100px] h-[400px] md:w-[150px] md:h-[500px] lg:w-[347px] lg:h-[708px] rounded-t-[208px] rounded-b-[208px] overflow-hidden shadow-[--shadow-card] opacity-80"
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
        <div className="relative z-10 flex items-center justify-end   px-6 md:px-[30px]">
          <div className="flex flex-col items-end gap-lg max-w-[500px] lg:max-w-[581px] py-16 lg:py-0">
            <h2 className="font-raleway font-bold text-[32px] leading-[40px] lg:text-Display-xl-bold lg:leading-[66px] text-primary-light-default text-left lg:text-right">
              Join Elysium Tours in Redefining the Future of Ghanaian Travel
            </h2>
            <p className="font-raleway font-normal text-[14px] leading-[22px] lg:text-md-regular lg:leading-[24px] text-primary-light-default text-left lg:text-right lg:max-w-[483px]">
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
