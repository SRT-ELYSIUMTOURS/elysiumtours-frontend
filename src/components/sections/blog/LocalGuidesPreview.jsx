import React from "react";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/classNames";
import BlogSectionHeader from "./BlogSectionHeader";
import BlogContentCard from "../../cards/BlogContentCard";

function SkeletonCard({ className, style }) {
  return <div className={classNames("rounded-[16px] bg-[#e5e7eb] animate-pulse", className)} style={style} />;
}

const LocalGuidesPreview = React.forwardRef(
  ({ className, posts = [], status = "idle", ...props }, ref) => {
    const navigate = useNavigate();

    const goToPost = (post) => () =>
      navigate(`/blog/post/${post.slug}`, {
        state: { title: post.title, heroImage: post.coverImage },
      });

    const isLoading = status === "idle" || status === "loading";

    // Desktop slot mapping: col1→posts[0,3], col2→posts[1,4], col3→posts[2,5]
    const p = posts;

    return (
      <section
        ref={ref}
        className={classNames("w-full bg-secondary-light-default py-[80px]", className)}
        {...props}
      >
        <div className="mx-4 md:mx-8 lg:mx-[156px]">
          <BlogSectionHeader
            label="BEHIND THE SCENCES WITH GUIDES"
            title="Inside the World of Our Local Guides"
            description="Our guides are more than travel experts — they're storytellers, explorers, and cultural ambassadors. Step behind the scenes to discover how their passion for Ghana transforms every journey into a story, a celebration."
            onButtonClick={() => navigate("/blog/local-guides")}
          />

          {/* Mobile/tablet: 2-col grid. Desktop: 3-col masonry */}
          {!isLoading && posts.length === 0 ? (
            <p className="mt-10 lg:mt-[80px] font-raleway text-[15px] text-[#949494] text-center py-10">
              No posts in this category yet — check back soon.
            </p>
          ) : (
          <div className="mt-10 lg:mt-[80px]">
            {/* Desktop: 3-col masonry */}
            <div className="hidden lg:flex gap-[22px]">
              {isLoading ? (
                <>
                  <div className="flex flex-1 flex-col gap-[48px]">
                    <SkeletonCard className="w-[100%] h-[418px]" />
                    <SkeletonCard className="w-[100%] h-[734px]" />
                  </div>
                  <div className="flex flex-1 flex-col gap-[48px]">
                    <SkeletonCard className="w-[100%] h-[814px]" />
                    <SkeletonCard className="w-[100%] h-[338px]" />
                  </div>
                  <div className="flex flex-1 flex-col gap-[48px]">
                    <SkeletonCard className="w-[100%] h-[338px]" />
                    <SkeletonCard className="w-[100%] h-[814px]" />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-1 flex-col gap-[48px]">
                    {p[0] && <BlogContentCard title={p[0].title} category={p[0].category} image={p[0].coverImage} className="!w-[100%] !h-[418px]" onClick={goToPost(p[0])} />}
                    {p[3] && <BlogContentCard title={p[3].title} category={p[3].category} image={p[3].coverImage} className="!w-[100%] !h-[734px]" onClick={goToPost(p[3])} />}
                  </div>
                  <div className="flex flex-1 flex-col gap-[48px]">
                    {p[1] && <BlogContentCard title={p[1].title} category={p[1].category} image={p[1].coverImage} className="!w-[100%] !h-[814px]" onClick={goToPost(p[1])} />}
                    {p[4] && <BlogContentCard title={p[4].title} category={p[4].category} image={p[4].coverImage} className="!w-[100%] !h-[338px]" onClick={goToPost(p[4])} />}
                  </div>
                  <div className="flex flex-1 flex-col gap-[48px]">
                    {p[2] && <BlogContentCard title={p[2].title} category={p[2].category} image={p[2].coverImage} className="!w-[100%] !h-[338px]" onClick={goToPost(p[2])} />}
                    {p[5] && <BlogContentCard title={p[5].title} category={p[5].category} image={p[5].coverImage} className="!w-[100%] !h-[814px]" onClick={goToPost(p[5])} />}
                  </div>
                </>
              )}
            </div>
            {/* Mobile/tablet: 2-col grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
              {isLoading ? (
                [0, 1, 2, 3, 4, 5].map((i) => (
                  <SkeletonCard key={i} className="w-full h-[240px]" />
                ))
              ) : (
                p.slice(0, 6).map((post) => (
                  <BlogContentCard
                    key={post._id}
                    title={post.title}
                    category={post.category}
                    image={post.coverImage}
                    className="!w-full !h-[240px]"
                    onClick={goToPost(post)}
                  />
                ))
              )}
            </div>
          </div>
          )}
        </div>
      </section>
    );
  }
);

LocalGuidesPreview.displayName = "LocalGuidesPreview";
export default LocalGuidesPreview;
