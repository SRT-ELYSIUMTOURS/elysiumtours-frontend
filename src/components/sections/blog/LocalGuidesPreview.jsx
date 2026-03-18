import React from "react";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/classNames";
import BlogSectionHeader from "./BlogSectionHeader";
import BlogContentCard from "../../cards/BlogContentCard";

const LocalGuidesPreview = React.forwardRef(({ className, ...props }, ref) => {
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
      <div className="mx-[156px]">
        <BlogSectionHeader
          label="BEHIND THE SCENCES WITH GUIDES"
          title="Inside the World of Our Local Guides"
          description="Our guides are more than travel experts — they're storytellers, explorers, and cultural ambassadors. Step behind the scenes to discover how their passion for Ghana transforms every journey into a story, a celebration."
          onButtonClick={() => navigate("/blog/local-guides")}
        />

        {/* 3-column masonry grid with varying heights */}
        <div className="mt-[80px] flex gap-[22px]">
          {/* Column 1 */}
          <div className="flex flex-col gap-[48px]">
            <BlogContentCard
              title="Guide Kofi's Accra"
              category="City Guide"
              image="https://picsum.photos/seed/lg1/457/419"
              className="!w-[457px] !h-[418px]"
            />
            <BlogContentCard
              title="Walking the Gold Coast"
              category="Heritage"
              image="https://picsum.photos/seed/lg4/457/734"
              className="!w-[457px] !h-[734px]"
            />
          </div>
          {/* Column 2 */}
          <div className="flex flex-col gap-[48px]">
            <BlogContentCard
              title="Forest Treks"
              category="Adventure"
              image="https://picsum.photos/seed/lg5/457/814"
              className="!w-[457px] !h-[814px]"
            />
            <BlogContentCard
              title="A Day with Ama"
              category="Local Life"
              image="https://picsum.photos/seed/lg2/457/337"
              className="!w-[457px] !h-[338px]"
            />
          </div>
          {/* Column 3 */}
          <div className="flex flex-col gap-[48px]">
            <BlogContentCard
              title="Festival Season"
              category="Events"
              image="https://picsum.photos/seed/lg6/457/433"
              className="!w-[457px] !h-[338px]"
            />
            <BlogContentCard
              title="Market Stories"
              category="Culture"
              image="https://picsum.photos/seed/lg3/457/734"
              className="!w-[457px] !h-[814px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
});

LocalGuidesPreview.displayName = "LocalGuidesPreview";
export default LocalGuidesPreview;
