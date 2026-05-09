import React from "react";
import { classNames } from "../../../utils/classNames";

// Figma: 939:6017 — Partner Stories section
// Label: "EXPLORE ALL PARTNER STORIES"
// Title: "More Stories From Our Tour Partners"
// Description: right-aligned
// bg-[#f2eaf9], left-[156px] w-[1416px]
// Below header: 5 story image frames arranged in a horizontal layout with alternating heights

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M5.25 3.5L8.75 7L5.25 10.5" stroke="#7b2cbf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const STORIES = [
  { id: 1, image: "https://picsum.photos/seed/story-f1/335/480", title: "Behind the Castle Walls: A Heritage Guide's Story", category: "Heritage" },
  { id: 2, image: "https://picsum.photos/seed/story-f2/335/360", title: "From Accra to the North: A 10-Day Overland Journey", category: "Adventure" },
  { id: 3, image: "https://picsum.photos/seed/story-f3/335/480", title: "The Women of Kente: Weaving Culture in Kumasi", category: "Culture" },
  { id: 4, image: "https://picsum.photos/seed/story-f4/335/360", title: "Volta Lake at Dawn: A Photographer's Perspective", category: "Photography" },
  { id: 5, image: "https://picsum.photos/seed/story-f5/335/480", title: "A Chef's Guide to Street Food in Accra", category: "Food" },
];

const PartnerStoriesSection = React.forwardRef(({
  className = "",
  ...props
}, ref) => {
  return (
    <section
      ref={ref}
      className={classNames("w-full bg-secondary-light-default py-10 sm:py-14 lg:py-[80px]", className)}
      {...props}
    >
      <div className="px-4 sm:px-10 lg:px-[156px]">

        {/*
          Header:
          Mobile/tablet: stacked column, left-aligned
          Desktop (lg+): side-by-side — LEFT eyebrow | RIGHT title + desc + button
        */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between w-full mb-8 sm:mb-10 lg:mb-[48px] gap-6 lg:gap-0">

          {/* Left — eyebrow */}
          <div className="flex items-center gap-[8px] lg:pt-[10px]">
            <div className="w-[46px] h-[1px] shrink-0 bg-secondary-dark-darker" />
            <span className="font-raleway font-bold text-[13px] leading-[18px] text-secondary-dark-darker uppercase tracking-[0.05em]">
              EXPLORE ALL PARTNER STORIES
            </span>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-[16px] lg:items-end lg:w-[597px]">
            <h2 className="font-raleway font-bold text-[22px] sm:text-[25px] leading-[32px] sm:leading-[34px] text-tertiary-normal-default lg:text-right">
              More Stories From Our Tour Partners
            </h2>
            <p className="font-raleway font-normal text-[15px] sm:text-[16px] leading-[24px] text-tertiary-normal-default lg:text-right lg:w-[522px]">
              Discover behind-the-scenes moments, expert insights, and the people shaping West Africa's travel experiences — from local guides to trusted tour operators bringing each journey to life.
            </p>
            <button className={classNames(
              "flex items-center gap-[9px] h-[32px] px-[10px]",
              "border-[0.8px] border-solid border-secondary-normal-default",
              "rounded-[40px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)]",
              "font-raleway font-semibold text-[13px] leading-[18px] text-secondary-normal-default",
              "hover:bg-secondary-light-hover transition-all duration-300 ease-in cursor-pointer bg-transparent"
            )}>
              Explore More
              <ArrowRightIcon />
            </button>
          </div>
        </div>

        {/*
          Story cards:
          Mobile: horizontal scroll row, each card 240px wide, 320px tall
          Tablet (sm): scroll row, 280px wide, 380px tall
          Desktop (lg): flat flex row, flex-1, alternating h-[480px] / h-[360px]

          On mobile/tablet we strip the alternating-height trick because it doesn't
          read well in a scroll container — all cards share a uniform height instead.
        */}
        <div className="flex gap-4 sm:gap-5 lg:gap-[20px] overflow-x-auto scrollbar-none touch-pan-x lg:overflow-visible lg:items-start">
          {STORIES.map((story, i) => (
            <div
              key={story.id}
              className={classNames(
                // Mobile / tablet: fixed-size scroll card
                "flex-shrink-0 w-[240px] h-[320px] sm:w-[280px] sm:h-[380px]",
                // Desktop: flex-1 with alternating heights
                "lg:flex-1 lg:w-auto",
                i % 2 === 0 ? "lg:h-[480px]" : "lg:h-[360px]",
                "relative overflow-hidden rounded-[20px] cursor-pointer group",
                "transition-all duration-300 ease-in hover:shadow-xl"
              )}
            >
              {/* Background image */}
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              {/* Category badge */}
              <div className="absolute top-[16px] left-[16px] px-[10px] py-[6px] bg-primary-light-default/90 rounded-[20px]">
                <span className="font-raleway font-semibold text-[12px] leading-[16px] text-secondary-normal-default">
                  {story.category}
                </span>
              </div>
              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-[16px] sm:p-[20px]">
                <p className="font-raleway font-semibold text-[14px] sm:text-[16px] leading-[20px] sm:leading-[22px] text-primary-light-default line-clamp-2">
                  {story.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

PartnerStoriesSection.displayName = "PartnerStoriesSection";
export default PartnerStoriesSection;
