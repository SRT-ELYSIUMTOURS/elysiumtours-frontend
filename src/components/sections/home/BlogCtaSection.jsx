import React from "react";
import { classNames } from "../../../utils/classNames";
import Button from "../../ui/button";

const BlogCtaSection = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={classNames(
        "bg-primary-light-default py-16 md:py-20",
        className
      )}
      {...props}
    >
      <div className="max-w-[1728px] mx-auto px-6 md:px-[30px]">
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16">
          {/* Overlapping circular images */}
          <div className="relative w-[200px] h-[200px] md:w-[247px] md:h-[198px] shrink-0">
            <div className="absolute left-0 bottom-0 w-[140px] h-[140px] md:w-[191px] md:h-[198px] rounded-b-[200px] rounded-t-[130px] overflow-hidden shadow-[--shadow-card]">
              <img
                src="https://picsum.photos/seed/blog-cta1/191/198"
                alt="Ghana coast"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute left-[56px] bottom-0 w-[140px] h-[140px] md:w-[191px] md:h-[198px] rounded-b-[200px] rounded-t-[130px] overflow-hidden shadow-[--shadow-card]">
              <img
                src="https://picsum.photos/seed/blog-cta2/191/198"
                alt="Ghana culture"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text content */}
          <div className="flex flex-col gap-4 flex-1">
            <h2 className="font-raleway font-bold text-[22px] leading-[30px] lg:text-High-md-bold lg:leading-[34px] text-tertiary-normal-default">
              Discovering Ghana&apos;s Coastal Charm
            </h2>
            <p className="font-raleway font-medium text-[14px] leading-[22px] lg:text-med-small-Medium lg:leading-[22px] text-tertiary-normal-default max-w-[913px]">
              From the historic shores of Cape Coast to the laid-back beaches of
              Busua, Ghana&apos;s coastline is a blend of beauty, history, and
              adventure. Join us as we explore hidden seaside gems, local
              seafood spots, and the cultural rhythms that make the coast truly
              unforgettable.
            </p>
            <div>
              <Button variant="secondary" size="medium" shape="pill">
                Read More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

BlogCtaSection.displayName = "BlogCtaSection";

export default BlogCtaSection;
