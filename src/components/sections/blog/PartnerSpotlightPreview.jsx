import React from "react";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/classNames";
import BlogSectionHeader from "./BlogSectionHeader";
import HighlightCard from "../../cards/HighlightCard";

function SkeletonCard({ className }) {
  return <div className={classNames("rounded-[16px] bg-[#e5e7eb] animate-pulse", className)} />;
}

const PartnerSpotlightPreview = React.forwardRef(
  ({ className, posts = [], status = "idle", ...props }, ref) => {
    const navigate = useNavigate();

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
            label="PARTNER SPOTLIGHT"
            title="Building Meaningful Journeys Together"
            description="From local artisans to eco-lodges and travel innovators, our partners bring each journey to life. 'Partner Spotlight' celebrates their dedication, creativity, and collaboration with Elysium in shaping responsible and memorable travel experiences across West Africa and beyond."
            onButtonClick={() => navigate("/blog/partner-spotlight")}
          />

          {/* 1-col on mobile, 3-col on md+ */}
          <div className="mt-10 lg:mt-[80px] grid grid-cols-1 md:grid-cols-3 gap-xl">
            {isLoading ? (
              [0, 1, 2].map((i) => (
                <SkeletonCard key={i} className="h-[400px] md:h-[500px] w-full lg:h-[656px]" />
              ))
            ) : (
              posts.slice(0, 3).map((post) => (
                <HighlightCard
                  key={post._id}
                  image={post.coverImage}
                  category={post.title}
                  className="h-[400px] md:h-[500px] w-full lg:h-[656px]"
                  onClick={() =>
                    navigate(`/blog/post/${post.slug}`, {
                      state: { title: post.title, heroImage: post.coverImage },
                    })
                  }
                />
              ))
            )}
          </div>
        </div>
      </section>
    );
  }
);

PartnerSpotlightPreview.displayName = "PartnerSpotlightPreview";
export default PartnerSpotlightPreview;
