import React from "react";
import { classNames } from "../../../utils/classNames";
import BlogSectionHeader from "./BlogSectionHeader";
import BlogContentCard from "../../cards/BlogContentCard";

const PLACEHOLDER_CARDS = [
  { id: 1, title: "8 ways to enjoy Ghana in fall", category: "Leisure Tours", size: "wide" },
  { id: 2, title: "8 ways to enjoy", category: "Leisure Tours", size: "small" },
  { id: 3, title: "8 ways to enjoy Ghana in fall", category: "Leisure Tours", size: "wide" },
];

const TravelGuidesPreview = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={classNames(
        "w-full bg-secondary-light-default py-[80px]",
        className
      )}
      {...props}
    >
      <div className="mx-[156px]">
        <BlogSectionHeader
          label="TRAVEL GUIDE & TIPS"
          title="Travel Guides & Tips for Every Explorer"
          description="Discover expert advice, destination guides, and local insights to help you plan your next West African adventure. From cultural etiquette to must-see attractions, our guides make every journey smoother, richer, and more meaningful."
        />

        {/* 2-column masonry grid — Figma layout */}
        <div className="mt-[80px] flex flex-col gap-[15px]">
          {/* Row 1: tall left + short right */}
          <div className="flex gap-[15px]">
            <BlogContentCard
              title="8 ways to enjoy Ghana in fall"
              category="Leisure Tours"
              image="https://picsum.photos/seed/tg1/1028/371"
              className="!w-[1028px] !h-[371px]"
            />
            <BlogContentCard
              title="8 ways to enjoy"
              category="Leisure Tours"
              image="https://picsum.photos/seed/tg2/363/371"
              className="!w-[363px] !h-[371px]"
            />
          </div>
          {/* Row 2: wide card */}
          <div className="flex gap-[15px]">
            <BlogContentCard
              title="8 ways to enjoy Ghana in fall"
              category="Leisure Tours"
              image="https://picsum.photos/seed/tg3/1028/415"
              className="!w-full !h-[415px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
});

TravelGuidesPreview.displayName = "TravelGuidesPreview";
export default TravelGuidesPreview;
