import React from "react";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/classNames";
import { openBlogPost } from "../../../utils/blogPostRoute";
import BlogSectionHeader from "./BlogSectionHeader";
import BlogContentCard from "../../cards/BlogContentCard";

const LocalGuidesPreview = React.forwardRef(({ className, ...props }, ref) => {
  const navigate = useNavigate();
  const go = (payload) => () => openBlogPost(navigate, payload);
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
          <div className="flex flex-1 flex-col gap-[48px]">
            <BlogContentCard
              title="Guide Kofi's Accra"
              category="City Guide"
              image="https://picsum.photos/seed/lg1/457/419"
              className="!w-[100%] !h-[418px]"
              onClick={go({
                title: "Guide Kofi's Accra",
                category: "City Guide",
                image: "https://picsum.photos/seed/lg1/457/419",
                uniqueKey: "lg1",
              })}
            />
            <BlogContentCard
              title="Walking the Gold Coast"
              category="Heritage"
              image="https://picsum.photos/seed/lg4/457/734"
              className="!w-[100%] !h-[734px]"
              onClick={go({
                title: "Walking the Gold Coast",
                category: "Heritage",
                image: "https://picsum.photos/seed/lg4/457/734",
                uniqueKey: "lg4",
              })}
            />
          </div>
          {/* Column 2 */}
          <div className="flex flex-1 flex-col gap-[48px]">
            <BlogContentCard
              title="Forest Treks"
              category="Adventure"
              image="https://picsum.photos/seed/lg5/457/814"
              className="!w-[100%] !h-[814px]"
              onClick={go({
                title: "Forest Treks",
                category: "Adventure",
                image: "https://picsum.photos/seed/lg5/457/814",
                uniqueKey: "lg5",
              })}
            />
            <BlogContentCard
              title="A Day with Ama"
              category="Local Life"
              image="https://picsum.photos/seed/lg2/457/337"
              className="!w-[100%] !h-[338px]"
              onClick={go({
                title: "A Day with Ama",
                category: "Local Life",
                image: "https://picsum.photos/seed/lg2/457/337",
                uniqueKey: "lg2",
              })}
            />
          </div>
          {/* Column 3 */}
          <div className="flex flex-1 flex-col gap-[48px]">
            <BlogContentCard
              title="Festival Season"
              category="Events"
              image="https://picsum.photos/seed/lg6/457/433"
              className="!w-[100%] !h-[338px]"
              onClick={go({
                title: "Festival Season",
                category: "Events",
                image: "https://picsum.photos/seed/lg6/457/433",
                uniqueKey: "lg6",
              })}
            />
            <BlogContentCard
              title="Market Stories"
              category="Culture"
              image="https://picsum.photos/seed/lg3/457/734"
              className="!w-[100%] !h-[814px]"
              onClick={go({
                title: "Market Stories",
                category: "Culture",
                image: "https://picsum.photos/seed/lg3/457/734",
                uniqueKey: "lg3",
              })}
            />
          </div>
        </div>
      </div>
    </section>
  );
});

LocalGuidesPreview.displayName = "LocalGuidesPreview";
export default LocalGuidesPreview;
