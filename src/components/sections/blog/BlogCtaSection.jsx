import React from "react";
import { classNames } from "../../../utils/classNames";
import Button from "../../ui/button";

const BlogCtaSection = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={classNames(
        "relative w-full bg-secondary-dark-darker drop-shadow-xl noise overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="relative h-[732px] max-w-[1728px] mx-auto">
        {/* Left — large rounded image */}
        <div
          className="absolute left-[156px] top-1/2 -translate-y-1/2 w-[711px] h-[559px] rounded-2xl overflow-hidden shadow-card z-[1]"
        >
          <img
            src="https://picsum.photos/seed/blog-cta/711/559"
            alt="Ghana landscape"
            className="w-full h-full object-cover "
          />
        </div>

        {/* Decorative rotated images behind */}
        <div className="absolute top-[-387px] bg-[#EBDFF5] rounded-full   blur-[40px]   left-[1303px] w-[329px] h-[818px] overflow-hidden opacity-20" style={{ transform: "rotate(30.2deg)" }}>
          {/* <img
            src="https://picsum.photos/seed/cta-deco1/329/818"
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          /> */}
        </div>
        <div className="absolute bottom-[-434px] left-[-265px] w-[329px] bg-[#EBDFF5] rounded-full   blur-[40px] h-[818px] overflow-hidden opacity-20" style={{ transform: "rotate(-149.8deg)" }}>
          {/* <img
            src="https://picsum.photos/seed/cta-deco2/329/818"
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          /> */}
        </div>

        {/* Right — text content */}
        <div className="absolute right-[156px] top-1/2 -translate-y-1/2 flex flex-col items-end gap-md w-[581px] z-10">
          <h2 className="font-raleway font-bold text-[56px] leading-[66px] text-primary-light-default text-right">
            Promoting Ghana, Inspiring the World
          </h2>
          <p className="font-raleway font-normal text-[16px] leading-[24px] text-primary-light-default text-right w-[483px]">
            we showcase the best of Ghana — its culture, people, and untold stories. From hidden gems to iconic landmarks, we inspire travelers to explore and celebrate the beauty that defines our nation.
          </p>
          <Button
            variant="white"
            shape="pill"
            className="h-[64px] px-[25px]! gap-md"
          >
            Partner With Us
          </Button>
        </div>
      </div>
    </section>
  );
});

BlogCtaSection.displayName = "BlogCtaSection";
export default BlogCtaSection;
