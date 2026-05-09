import React from "react";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/classNames";
import { openBlogPost } from "../../../utils/blogPostRoute";
import BlogSectionHeader from "./BlogSectionHeader";
import BlogContentCard from "../../cards/BlogContentCard";

const DestinationHighlightsPreview = React.forwardRef(({ className, ...props }, ref) => {
  const navigate = useNavigate();
  const go = (payload) => () => openBlogPost(navigate, payload);
  return (
    <section
      ref={ref}
      className={classNames(
        "w-full bg-primary-light-default py-[80px]",
        className
      )}
      {...props}
    >
      <div className="mx-4 md:mx-8 lg:mx-[156px]">
        <BlogSectionHeader
          label="DESTINATION HIGHLIGHT"
          title="Unforgettable Places, Endless Discoveries"
          description="From Ghana's golden coasts to Togo's vibrant markets and Benin's historic landmarks, discover the destinations that define the spirit of West Africa. Each highlight invites you to explore cities, cultures, adventures, and beauty like never before."
          onButtonClick={() => navigate("/blog/destination-highlights")}
        />

<<<<<<< HEAD
        {/* Mobile/tablet: 2-col grid. Desktop: 4-col bento */}
        <div className="mt-10 lg:mt-[80px]">
          {/* Desktop layout */}
          <div className="hidden lg:flex items-center gap-[15px]">
            <BlogContentCard title="Cape Coast Heritage" category="History" image="https://picsum.photos/seed/dh1/340/653" className="!w-[340px] !h-[653px]" />
            <div className="flex flex-col gap-[15px]">
              <BlogContentCard title="Accra Markets" category="Culture" image="https://picsum.photos/seed/dh2/341/364" className="!w-[341px] !h-[364px]" />
              <BlogContentCard title="Elmina Castle" category="Heritage" image="https://picsum.photos/seed/dh3/341/364" className="!w-[341px] !h-[364px]" />
            </div>
            <BlogContentCard title="Kakum National Park" category="Adventure" image="https://picsum.photos/seed/dh4/879/653" className="!w-[340px] !h-[653px]" />
            <div className="flex flex-col gap-[15px]">
              <BlogContentCard title="Lake Volta" category="Nature" image="https://picsum.photos/seed/dh5/341/364" className="!w-[341px] !h-[364px]" />
              <BlogContentCard title="Mole Park Safari" category="Wildlife" image="https://picsum.photos/seed/dh6/341/364" className="!w-[341px] !h-[364px]" />
            </div>
          </div>
          {/* Mobile/tablet: 2-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px] lg:hidden">
            <BlogContentCard title="Cape Coast Heritage" category="History" image="https://picsum.photos/seed/dh1/340/653" className="!w-full !h-[220px]" />
            <BlogContentCard title="Accra Markets" category="Culture" image="https://picsum.photos/seed/dh2/341/364" className="!w-full !h-[220px]" />
            <BlogContentCard title="Elmina Castle" category="Heritage" image="https://picsum.photos/seed/dh3/341/364" className="!w-full !h-[220px]" />
            <BlogContentCard title="Kakum National Park" category="Adventure" image="https://picsum.photos/seed/dh4/879/653" className="!w-full !h-[220px]" />
            <BlogContentCard title="Lake Volta" category="Nature" image="https://picsum.photos/seed/dh5/341/364" className="!w-full !h-[220px]" />
            <BlogContentCard title="Mole Park Safari" category="Wildlife" image="https://picsum.photos/seed/dh6/341/364" className="!w-full !h-[220px]" />
=======
        {/* 5-col grid: 1 large left + 2 cols of 2 stacked + 2 cols of 2 stacked */}
        <div className="mt-[80px] items-center flex gap-[15px]">
          {/* Large left card */}
          <BlogContentCard
            title="Cape Coast Heritage"
            category="History"
            image="https://picsum.photos/seed/dh1/340/653"
            className="!w-[25%] !h-[653px]"
            onClick={go({
              title: "Cape Coast Heritage",
              category: "History",
              image: "https://picsum.photos/seed/dh1/340/653",
              uniqueKey: "dh1",
            })}
          />
          {/* Column 2: 2 stacked */}
          <div className="flex w-[25%] flex-col gap-[15px]">
            <BlogContentCard
              title="Accra Markets"
              category="Culture"
              image="https://picsum.photos/seed/dh2/341/364"
              className="!w-[100%]  !h-[364px]"
              onClick={go({
                title: "Accra Markets",
                category: "Culture",
                image: "https://picsum.photos/seed/dh2/341/364",
                uniqueKey: "dh2",
              })}
            />
            <BlogContentCard
              title="Elmina Castle"
              category="Heritage"
              image="https://picsum.photos/seed/dh3/341/364"
              className="!w-[100%]  !h-[364px]"
              onClick={go({
                title: "Elmina Castle",
                category: "Heritage",
                image: "https://picsum.photos/seed/dh3/341/364",
                uniqueKey: "dh3",
              })}
            />
          </div>
          {/* Large center-right card */}
          <BlogContentCard
            title="Kakum National Park"
            category="Adventure"
            image="https://picsum.photos/seed/dh4/879/653"
            className=" !w-[25%] !h-[653px]"
            onClick={go({
              title: "Kakum National Park",
              category: "Adventure",
              image: "https://picsum.photos/seed/dh4/879/653",
              uniqueKey: "dh4",
            })}
          />
          {/* Column 4: 2 stacked */}
          <div className="flex w-[25%] flex-col gap-[15px]">
            <BlogContentCard
              title="Lake Volta"
              category="Nature"
              image="https://picsum.photos/seed/dh5/341/364"
              className="!w-[100%]  !h-[364px]"
              onClick={go({
                title: "Lake Volta",
                category: "Nature",
                image: "https://picsum.photos/seed/dh5/341/364",
                uniqueKey: "dh5",
              })}
            />
            <BlogContentCard
              title="Mole Park Safari"
              category="Wildlife"
              image="https://picsum.photos/seed/dh6/341/364"
              className="!w-[100%]  !h-[364px]"
              onClick={go({
                title: "Mole Park Safari",
                category: "Wildlife",
                image: "https://picsum.photos/seed/dh6/341/364",
                uniqueKey: "dh6",
              })}
            />
>>>>>>> 404b32fd78bf81291300a90563016ded1c14c196
          </div>
        </div>
      </div>
    </section>
  );
});

DestinationHighlightsPreview.displayName = "DestinationHighlightsPreview";
export default DestinationHighlightsPreview;
