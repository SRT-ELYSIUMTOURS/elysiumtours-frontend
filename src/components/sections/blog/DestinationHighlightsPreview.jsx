import React from "react";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/classNames";
import BlogSectionHeader from "./BlogSectionHeader";
import BlogContentCard from "../../cards/BlogContentCard";

function SkeletonCard({ className }) {
  return <div className={classNames("rounded-[16px] bg-[#e5e7eb] animate-pulse", className)} />;
}

const DestinationHighlightsPreview = React.forwardRef(
  ({ className, posts = [], status = "idle", ...props }, ref) => {
    const navigate = useNavigate();

    const goToPost = (post) => () =>
      navigate(`/blog/post/${post.slug}`, {
        state: { title: post.title, heroImage: post.coverImage },
      });

    const isLoading = status === "idle" || status === "loading";
    if (!isLoading && !posts.length) return null;

    // Slot indices: 0=tall-left, 1=stacked-top, 2=stacked-bottom, 3=tall-mid, 4=stacked-top, 5=stacked-bottom
    const p = posts;

    return (
      <section
        ref={ref}
        className={classNames("w-full bg-primary-light-default py-[80px]", className)}
        {...props}
      >
        <div className="mx-4 md:mx-8 lg:mx-[156px]">
          <BlogSectionHeader
            label="DESTINATION HIGHLIGHT"
            title="Unforgettable Places, Endless Discoveries"
            description="From Ghana's golden coasts to Togo's vibrant markets and Benin's historic landmarks, discover the destinations that define the spirit of West Africa. Each highlight invites you to explore cities, cultures, adventures, and beauty like never before."
            onButtonClick={() => navigate("/blog/destination-highlights")}
          />

          {/* Mobile/tablet: 2-col grid. Desktop: 4-col bento */}
          <div className="mt-10 lg:mt-[80px]">
            {/* Desktop layout */}
            <div className="hidden lg:flex items-center gap-[15px]">
              {isLoading ? (
                <>
                  <SkeletonCard className="w-[25%] h-[653px]" />
                  <div className="flex w-[25%] flex-col gap-[15px]">
                    <SkeletonCard className="w-[100%] h-[364px]" />
                    <SkeletonCard className="w-[100%] h-[364px]" />
                  </div>
                  <SkeletonCard className="w-[25%] h-[653px]" />
                  <div className="flex w-[25%] flex-col gap-[15px]">
                    <SkeletonCard className="w-[100%] h-[364px]" />
                    <SkeletonCard className="w-[100%] h-[364px]" />
                  </div>
                </>
              ) : (
                <>
                  {p[0] && <BlogContentCard title={p[0].title} category={p[0].category} image={p[0].coverImage} className="!w-[25%] !h-[653px]" onClick={goToPost(p[0])} />}
                  {(p[1] || p[2]) && (
                    <div className="flex w-[25%] flex-col gap-[15px]">
                      {p[1] && <BlogContentCard title={p[1].title} category={p[1].category} image={p[1].coverImage} className="!w-[100%] !h-[364px]" onClick={goToPost(p[1])} />}
                      {p[2] && <BlogContentCard title={p[2].title} category={p[2].category} image={p[2].coverImage} className="!w-[100%] !h-[364px]" onClick={goToPost(p[2])} />}
                    </div>
                  )}
                  {p[3] && <BlogContentCard title={p[3].title} category={p[3].category} image={p[3].coverImage} className="!w-[25%] !h-[653px]" onClick={goToPost(p[3])} />}
                  {(p[4] || p[5]) && (
                    <div className="flex w-[25%] flex-col gap-[15px]">
                      {p[4] && <BlogContentCard title={p[4].title} category={p[4].category} image={p[4].coverImage} className="!w-[100%] !h-[364px]" onClick={goToPost(p[4])} />}
                      {p[5] && <BlogContentCard title={p[5].title} category={p[5].category} image={p[5].coverImage} className="!w-[100%] !h-[364px]" onClick={goToPost(p[5])} />}
                    </div>
                  )}
                </>
              )}
            </div>
            {/* Mobile/tablet: 2-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px] lg:hidden">
              {isLoading ? (
                [0, 1, 2, 3, 4, 5].map((i) => (
                  <SkeletonCard key={i} className="w-full h-[220px]" />
                ))
              ) : (
                p.slice(0, 6).map((post) => (
                  <BlogContentCard
                    key={post._id}
                    title={post.title}
                    category={post.category}
                    image={post.coverImage}
                    className="!w-full !h-[220px]"
                    onClick={goToPost(post)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
);

DestinationHighlightsPreview.displayName = "DestinationHighlightsPreview";
export default DestinationHighlightsPreview;
