import React from "react";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/classNames";
import BlogSectionHeader from "./BlogSectionHeader";
import BlogContentCard from "../../cards/BlogContentCard";

const PLACEHOLDER_CARDS = [
  { id: 1, title: "8 ways to enjoy Ghana in fall", category: "Leisure Tours", size: "wide" },
  { id: 2, title: "8 ways to enjoy", category: "Leisure Tours", size: "small" },
  { id: 3, title: "8 ways to enjoy Ghana in fall", category: "Leisure Tours", size: "wide" },
];

const TravelGuidesPreview = React.forwardRef(({ className, ...props }, ref) => {
  const navigate = useNavigate();
  return (
    <section
      ref={ref}
      className={classNames(
        "w-full bg-secondary-light-default py-[80px]",
        className
      )}
      {...props}
    >
      <div className="mx-4 md:mx-8 lg:mx-[156px]">
        <BlogSectionHeader
          label="TRAVEL GUIDE & TIPS"
          title="Travel Guides & Tips for Every Explorer"
          description="Discover expert advice, destination guides, and local insights to help you plan your next West African adventure. From cultural etiquette to must-see attractions, our guides make every journey smoother, richer, and more meaningful."
          onButtonClick={() => navigate("/blog/travel-guides")}
        />

        {/* Card grid — stacks on mobile, side-by-side on md+ */}
        <div className="mt-10 lg:mt-[80px] flex flex-col gap-[15px]">
          {/* Row 1 */}
          <div className="flex flex-col md:flex-row gap-[15px]">
            <BlogContentCard
              title="8 ways to enjoy Ghana in fall"
              category="Leisure Tours"
              image="https://picsum.photos/seed/tg1/1028/371"
              className="!w-full !h-[220px] md:!h-[371px]"
            />
            <BlogContentCard
              title="8 ways to enjoy"
              category="Leisure Tours"
              image="https://picsum.photos/seed/tg2/363/371"
              className="!w-full md:!w-[280px] lg:!w-[363px] !h-[220px] md:!h-[371px]"
            />
          </div>
          {/* Row 2: full-width card */}
          <BlogContentCard
            title="8 ways to enjoy Ghana in fall"
            category="Leisure Tours"
            image="https://picsum.photos/seed/tg3/1028/415"
            className="!w-full !h-[220px] md:!h-[415px]"
          />
        </div>
      </div>
    </section>
  );
});

TravelGuidesPreview.displayName = "TravelGuidesPreview";
export default TravelGuidesPreview;
