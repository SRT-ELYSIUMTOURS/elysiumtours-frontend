import React from "react";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/classNames";
import { openBlogPost } from "../../../utils/blogPostRoute";
import BlogSectionHeader from "./BlogSectionHeader";
import BlogContentCard from "../../cards/BlogContentCard";

const TravelStoriesPreview = React.forwardRef(({ className, ...props }, ref) => {
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
      <div className="mx-[156px]">
        <BlogSectionHeader
          label="DISPORA TRAVEL STORIES"
          title="BidsPora Travel Stories: Real Journeys, Real People"
          description="Step into the world of Dispora travelers as they share their unforgettable adventures across West Africa. From cultural discoveries to spontaneous road trips, these stories capture the heart and spirit of exploration — inspiring you to create your own."
          onButtonClick={() => navigate("/blog/travel-stories")}
        />

        {/* 3-column equal grid */}
        <div className="mt-[80px] flex gap-[15px]">
          <BlogContentCard
            title="My First Trip to Kumasi"
            category="Personal"
            image="https://picsum.photos/seed/ts1/461/364"
            className="!w-auto !h-[364px] flex-1"
            onClick={go({
              title: "My First Trip to Kumasi",
              category: "Personal",
              image: "https://picsum.photos/seed/ts1/461/364",
              uniqueKey: "ts1",
            })}
          />
          <BlogContentCard
            title="Reconnecting with Roots"
            category="Heritage"
            image="https://picsum.photos/seed/ts2/461/364"
            className="!w-auto !h-[364px] flex-1"
            onClick={go({
              title: "Reconnecting with Roots",
              category: "Heritage",
              image: "https://picsum.photos/seed/ts2/461/364",
              uniqueKey: "ts2",
            })}
          />
          <BlogContentCard
            title="A Week in Tamale"
            category="Adventure"
            image="https://picsum.photos/seed/ts3/461/364"
            className="!w-auto !h-[364px] flex-1"
            onClick={go({
              title: "A Week in Tamale",
              category: "Adventure",
              image: "https://picsum.photos/seed/ts3/461/364",
              uniqueKey: "ts3",
            })}
          />
        </div>
      </div>
    </section>
  );
});

TravelStoriesPreview.displayName = "TravelStoriesPreview";
export default TravelStoriesPreview;
