import React from "react";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/classNames";
import BlogSectionHeader from "./BlogSectionHeader";
import BlogContentCard from "../../cards/BlogContentCard";

const DestinationHighlightsPreview = React.forwardRef(({ className, ...props }, ref) => {
  const navigate = useNavigate();
  return (
    <section
      ref={ref}
      className={classNames(
        "w-full bg-primary-light-default py-[80px]",
        className
      )}
      {...props}
    >
      <div className="mx-[156px]">
        <BlogSectionHeader
          label="DESTINATION HIGHLIGHT"
          title="Unforgettable Places, Endless Discoveries"
          description="From Ghana's golden coasts to Togo's vibrant markets and Benin's historic landmarks, discover the destinations that define the spirit of West Africa. Each highlight invites you to explore cities, cultures, adventures, and beauty like never before."
          onButtonClick={() => navigate("/blog/destination-highlights")}
        />

        {/* 5-col grid: 1 large left + 2 cols of 2 stacked + 2 cols of 2 stacked */}
        <div className="mt-[80px] flex gap-[15px]">
          {/* Large left card */}
          <BlogContentCard
            title="Cape Coast Heritage"
            category="History"
            image="https://picsum.photos/seed/dh1/340/653"
            className="!w-[340px] !h-[653px]"
          />
          {/* Column 2: 2 stacked */}
          <div className="flex flex-col gap-[15px]">
            <BlogContentCard
              title="Accra Markets"
              category="Culture"
              image="https://picsum.photos/seed/dh2/341/364"
              className="!w-[341px] !h-[364px]"
            />
            <BlogContentCard
              title="Elmina Castle"
              category="Heritage"
              image="https://picsum.photos/seed/dh3/341/364"
              className="!w-[341px] !h-[364px]"
            />
          </div>
          {/* Large center-right card */}
          <BlogContentCard
            title="Kakum National Park"
            category="Adventure"
            image="https://picsum.photos/seed/dh4/879/653"
            className="!w-[340px] !h-[653px]"
          />
          {/* Column 4: 2 stacked */}
          <div className="flex flex-col gap-[15px]">
            <BlogContentCard
              title="Lake Volta"
              category="Nature"
              image="https://picsum.photos/seed/dh5/341/364"
              className="!w-[341px] !h-[364px]"
            />
            <BlogContentCard
              title="Mole Park Safari"
              category="Wildlife"
              image="https://picsum.photos/seed/dh6/341/364"
              className="!w-[341px] !h-[364px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
});

DestinationHighlightsPreview.displayName = "DestinationHighlightsPreview";
export default DestinationHighlightsPreview;
