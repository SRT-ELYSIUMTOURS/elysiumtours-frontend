import React from "react";
import { classNames } from "../../../utils/classNames";
import TestimonialCard from "../../cards/TestimonialCard";

// Skeleton mirrors TestimonialCard layout exactly: stars → text block → reviewer row
function SkeletonTestimonialCard() {
  return (
    <div className="flex flex-col gap-[10px] w-full max-w-[456px] min-w-0">
      {/* Stars row */}
      <div className="h-[22px] w-[120px] rounded bg-[#e5e7eb] animate-pulse" />
      {/* Content block */}
      <div className="flex flex-col gap-[37px]">
        {/* Text block */}
        <div className="flex flex-col gap-[8px]">
          <div className="h-[13px] w-3/4 rounded bg-[#e5e7eb] animate-pulse" />
          <div className="h-[36px] w-full rounded bg-[#e5e7eb] animate-pulse" />
          <div className="h-[10px] w-1/2 rounded bg-[#e5e7eb] animate-pulse" />
        </div>
        {/* Reviewer row */}
        <div className="flex items-center gap-[12px]">
          <div className="w-[60px] h-[60px] rounded-full shrink-0 bg-[#e5e7eb] animate-pulse" />
          <div className="flex flex-col gap-[4px]">
            <div className="h-[16px] w-24 rounded bg-[#e5e7eb] animate-pulse" />
            <div className="h-[13px] w-16 rounded bg-[#e5e7eb] animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

const TestimonialsSection = React.forwardRef(
  ({ className, testimonials, status, ...props }, ref) => {
    const isLoading = status === "idle" || status === "loading";
    const isEmpty   = !isLoading && (!testimonials || testimonials.length === 0);

    return (
      <section
        ref={ref}
        className={classNames("bg-primary-light-default py-16 md:py-20", className)}
        {...props}
      >
        <div className="max-w-[1728px] mx-auto px-6 md:px-[30px] lg:px-[164px]">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12 lg:mb-16">
            <div className="flex items-center gap-sm shrink-0 justify-center lg:justify-start">
              <div className="w-[46px] h-[2px] bg-secondary-dark-darker" />
              <span className="font-raleway font-bold text-med-small-bold text-secondary-dark-darker uppercase tracking-wide">
                Testimonials
              </span>
            </div>

            <div className="flex flex-col items-center lg:items-end max-w-[677px]">
              <h2 className="font-raleway font-bold ml-5 lg:ml-0 text-[22px] leading-[30px] lg:text-High-md-bold lg:leading-[34px] text-tertiary-normal-default text-center lg:text-right">
                What Our Travelers Say
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg [&>*]:min-w-0">
            {isLoading ? (
              [0, 1, 2].map((i) => <SkeletonTestimonialCard key={i} />)
            ) : isEmpty ? (
              <p className="col-span-full font-raleway text-[15px] text-[#949494] text-center py-10">
                No testimonials yet — check back soon.
              </p>
            ) : (
              testimonials.map((t, i) => (
                <TestimonialCard
                  key={t._id || t.id || i}
                  quote={t.quote || t.title || t.body?.slice(0, 80) || ""}
                  body={t.body || t.content || t.review || ""}
                  attribution={t.attribution || t.location || ""}
                  reviewerName={t.reviewerName || t.author?.name || t.name || "Traveler"}
                  timestamp={t.timestamp || t.createdAt || ""}
                  rating={t.rating ?? 5}
                  avatar={t.avatar || t.author?.avatar || undefined}
                />
              ))
            )}
          </div>
        </div>
      </section>
    );
  }
);

TestimonialsSection.displayName = "TestimonialsSection";
export default TestimonialsSection;
