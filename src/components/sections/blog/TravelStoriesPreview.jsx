import React from "react";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/classNames";
import BlogSectionHeader from "./BlogSectionHeader";
import BlogContentCard from "../../cards/BlogContentCard";

function SkeletonCard({ className }) {
  return <div className={classNames("rounded-[16px] bg-[#e5e7eb] animate-pulse", className)} />;
}

const TravelStoriesPreview = React.forwardRef(
  ({ className, posts = [], status = "idle", ...props }, ref) => {
    const navigate = useNavigate();

    const goToPost = (post) => () =>
      navigate(`/blog/post/${post.slug}`, {
        state: { title: post.title, heroImage: post.coverImage },
      });

    const isLoading = status === "idle" || status === "loading";
    if (!isLoading && !posts.length) return null;

    return (
      <section
        ref={ref}
        className={classNames("w-full bg-primary-light-default py-[80px]", className)}
        {...props}
      >
        <div className="mx-4 md:mx-8 lg:mx-[156px]">
          <BlogSectionHeader
            label="DISPORA TRAVEL STORIES"
            title="BidsPora Travel Stories: Real Journeys, Real People"
            description="Step into the world of Dispora travelers as they share their unforgettable adventures across West Africa. From cultural discoveries to spontaneous road trips, these stories capture the heart and spirit of exploration — inspiring you to create your own."
            onButtonClick={() => navigate("/blog/travel-stories")}
          />

          {/* 1-col on mobile, 3-col on md+ */}
          <div className="mt-10 lg:mt-[80px] grid grid-cols-1 md:grid-cols-3 gap-[15px]">
            {isLoading ? (
              [0, 1, 2].map((i) => (
                <SkeletonCard key={i} className="w-full h-[240px] md:h-[364px]" />
              ))
            ) : (
              posts.slice(0, 3).map((post) => (
                <BlogContentCard
                  key={post._id}
                  title={post.title}
                  category={post.category}
                  image={post.coverImage}
                  className="!w-full !h-[240px] md:!h-[364px]"
                  onClick={goToPost(post)}
                />
              ))
            )}
          </div>
        </div>
      </section>
    );
  }
);

TravelStoriesPreview.displayName = "TravelStoriesPreview";
export default TravelStoriesPreview;
