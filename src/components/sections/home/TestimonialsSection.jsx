import React from "react";
import { classNames } from "../../../utils/classNames";
import TestimonialCard from "../../cards/TestimonialCard";

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Elysium Tours made my trip to Ghana absolutely amazing!",
    body: "Elysium Tours made my trip to Ghana absolutely amazing! Our guide was so knowledgeable and friendly, and every destination felt thoughtfully chosen. I especially loved the Cape Coast tour.....",
    attribution: "Sarah M., United Kingdom",
    reviewerName: "Estella Sackey",
    timestamp: "2 weeks ago",
    rating: 4,
    avatar: "https://picsum.photos/seed/avatar1/60/60",
  },
  {
    id: 2,
    quote: "Elysium Tours made my trip to Ghana absolutely amazing!",
    body: "Elysium Tours made my trip to Ghana absolutely amazing! Our guide was so knowledgeable and friendly, and every destination felt thoughtfully chosen. I especially loved the Cape Coast tour.....",
    attribution: "Sarah M., United Kingdom",
    reviewerName: "Sam Smith",
    timestamp: "2 weeks ago",
    rating: 4,
    avatar: "https://picsum.photos/seed/avatar2/60/60",
  },
  {
    id: 3,
    quote: "Elysium Tours made my trip to Ghana absolutely amazing!",
    body: "Elysium Tours made my trip to Ghana absolutely amazing! Our guide was so knowledgeable and friendly, and every destination felt thoughtfully chosen. I especially loved the Cape Coast tour.....",
    attribution: "Sarah M., United Kingdom",
    reviewerName: "Sam Smith",
    timestamp: "2 weeks ago",
    rating: 4,
    avatar: "https://picsum.photos/seed/avatar3/60/60",
  },
];

const TestimonialsSection = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={classNames(
          "bg-primary-light-default py-16 md:py-20",
          className
        )}
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
              <h2 className="font-raleway font-bold text-[22px] leading-[30px] lg:text-High-md-bold lg:leading-[34px] text-tertiary-normal-default text-center lg:text-right">
                What Our Travelers Say
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg [&>*]:min-w-0">
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                quote={testimonial.quote}
                body={testimonial.body}
                attribution={testimonial.attribution}
                reviewerName={testimonial.reviewerName}
                timestamp={testimonial.timestamp}
                rating={testimonial.rating}
                avatar={testimonial.avatar}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
);

TestimonialsSection.displayName = "TestimonialsSection";

export default TestimonialsSection;
