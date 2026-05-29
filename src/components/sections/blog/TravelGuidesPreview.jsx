import React from "react";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/classNames";
import BlogSectionHeader from "./BlogSectionHeader";
import BlogContentCard from "../../cards/BlogContentCard";

function SkeletonCard({ className }) {
  return <div className={classNames("rounded-[16px] bg-[#e5e7eb] animate-pulse", className)} />;
}

const TravelGuidesPreview = React.forwardRef(
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
        className={classNames("w-full bg-secondary-light-default py-[80px]", className)}
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
              {isLoading ? (
                <>
                  <SkeletonCard className="w-full md:w-[70%] h-[220px] md:h-[371px]" />
                  <SkeletonCard className="w-full md:w-[30%] h-[220px] md:h-[371px]" />
                </>
              ) : (
                <>
                  {posts[0] && (
                    <BlogContentCard
                      title={posts[0].title}
                      category={posts[0].category}
                      image={posts[0].coverImage}
                      className="!w-full md:!w-[70%] !h-[220px] md:!h-[371px]"
                      onClick={goToPost(posts[0])}
                    />
                  )}
                  {posts[1] && (
                    <BlogContentCard
                      title={posts[1].title}
                      category={posts[1].category}
                      image={posts[1].coverImage}
                      className="!w-full md:!w-[30%] !h-[220px] md:!h-[371px]"
                      onClick={goToPost(posts[1])}
                    />
                  )}
                </>
              )}
            </div>
            {/* Row 2: full-width card */}
            {isLoading ? (
              <SkeletonCard className="w-full h-[220px] md:h-[415px]" />
            ) : (
              posts[2] && (
                <BlogContentCard
                  title={posts[2].title}
                  category={posts[2].category}
                  image={posts[2].coverImage}
                  className="!w-full !h-[220px] md:!h-[415px]"
                  onClick={goToPost(posts[2])}
                />
              )
            )}
          </div>
        </div>
      </section>
    );
  }
);

TravelGuidesPreview.displayName = "TravelGuidesPreview";
export default TravelGuidesPreview;
