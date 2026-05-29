import React, { useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { classNames } from "../../utils/classNames";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  fetchBlogPostThunk,
  selectCurrentPost,
  selectCurrentPostStatus,
} from "../../store/slices/cmsSlice";
import BlogBreadcrumbBar from "../../components/sections/blog/BlogBreadcrumbBar";
import BlogArticleHero from "../../components/sections/blog/BlogArticleHero";
import BlogPostMetaBar from "../../components/sections/blog/BlogPostMetaBar";
import BlogPostBlocks from "../../components/sections/blog/BlogPostBlocks";
import BlogPostReviewsSection from "../../components/sections/blog/BlogPostReviewsSection";
// DUMMY_BLOG_POST_BLOCKS and DUMMY_BLOG_POST_REVIEWS remain in their files for reference but are no longer used here

function slugToTitle(slug) {
  if (!slug) return "Blog article";
  try {
    return decodeURIComponent(slug)
      .split("-")
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  } catch {
    return slug;
  }
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function PostLoadingSkeleton({ slug }) {
  return (
    <>
      <BlogBreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: slugToTitle(slug) },
        ]}
      />
      <div className="w-full h-[300px] md:h-[480px] lg:h-[600px] bg-[#e5e7eb] animate-pulse" />
      <div className="mx-auto max-w-[1728px] px-4 md:px-8 lg:px-[156px] py-6 border-b border-[#e5e7eb]">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#e5e7eb] animate-pulse shrink-0" />
          <div className="flex flex-col gap-2">
            <div className="h-4 w-36 bg-[#e5e7eb] animate-pulse rounded" />
            <div className="h-3 w-24 bg-[#e5e7eb] animate-pulse rounded" />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1728px] px-4 md:px-8 lg:px-[156px] py-10 lg:py-[80px] flex flex-col gap-5">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className={classNames(
              "h-4 bg-[#e5e7eb] animate-pulse rounded",
              i % 4 === 3 ? "w-2/3" : "w-full"
            )}
          />
        ))}
      </div>
    </>
  );
}

// ─── Error state ──────────────────────────────────────────────────────────────

function PostErrorState() {
  return (
    <>
      <BlogBreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Not Found" },
        ]}
      />
      <div className="flex flex-col items-center justify-center py-[120px] gap-4 px-4 text-center">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="#d1d5db" strokeWidth="1.5" />
          <path d="M12 8v4" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="15.5" r=".75" fill="#d1d5db" />
        </svg>
        <p className="font-raleway font-semibold text-[18px] text-tertiary-normal-default">
          This article couldn't be loaded.
        </p>
        <p className="font-raleway text-[14px] text-[#949494] max-w-[300px]">
          It may have been removed or is temporarily unavailable.
        </p>
        <Link
          to="/blog"
          className="font-raleway font-semibold text-[14px] text-secondary-normal-default underline"
        >
          Back to Blog
        </Link>
      </div>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const BlogPostPage = React.forwardRef(({ className, ...props }, ref) => {
  const { slug } = useParams();
  const location = useLocation();
  const passed = location.state;
  const dispatch = useAppDispatch();
  const apiPost = useAppSelector(selectCurrentPost);
  const postStatus = useAppSelector(selectCurrentPostStatus);

  useEffect(() => {
    if (slug) dispatch(fetchBlogPostThunk(slug));
  }, [dispatch, slug]);

  const post = apiPost?.slug === slug ? apiPost : null;
  const isLoading = postStatus === "idle" || postStatus === "loading";
  const isError = postStatus === "failed";

  const title = post?.title ?? passed?.title ?? slugToTitle(slug);
  const heroImage = post?.coverImage || post?.heroImage || passed?.heroImage || null;
  const authorName = post?.author?.name ?? passed?.authorName ?? null;
  const authorImage = post?.author?.avatar ?? passed?.authorImage ?? null;
  const dateLabel = post?.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : passed?.dateLabel ?? null;
  const readTimeLabel = post?.readTime ?? passed?.readTimeLabel ?? null;

  const contentBlocks =
    post?.contentBlocks?.length > 0
      ? post.contentBlocks
      : passed?.contentBlocks?.length > 0
      ? passed.contentBlocks
      : [];

  const reviews = post?.reviews?.length > 0 ? post.reviews : null;

  if (isLoading) return <PostLoadingSkeleton slug={slug} />;
  if (isError) return <PostErrorState />;

  return (
    <main
      ref={ref}
      className={classNames("font-raleway min-h-screen bg-primary-light-default", className)}
      {...props}
    >
      <BlogBreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: title },
        ]}
      />

      <BlogArticleHero image={heroImage} imageAlt="" title={title} />

      {(authorName || dateLabel || readTimeLabel) && (
        <BlogPostMetaBar
          authorName={authorName}
          authorImage={authorImage}
          dateLabel={dateLabel}
          readTimeLabel={readTimeLabel}
        />
      )}

      {contentBlocks.length > 0 ? (
        <article className="w-full bg-primary-light-default">
          <div className="mx-auto max-w-[1728px] py-10 lg:py-[80px]">
            <BlogPostBlocks blocks={contentBlocks} slug={slug} />
          </div>
        </article>
      ) : (
        <div className="flex flex-col items-center justify-center py-[80px] gap-3">
          <p className="font-raleway text-[15px] text-[#949494]">
            No content available for this article yet.
          </p>
        </div>
      )}

      {reviews && (
        <section className="w-full bg-primary-light-default">
          <div className="mx-auto max-w-[1728px] px-4 md:px-8 lg:px-[156px] pb-10 lg:pb-[80px]">
            <BlogPostReviewsSection reviews={reviews} />
          </div>
        </section>
      )}
    </main>
  );
});

BlogPostPage.displayName = "BlogPostPage";
export default BlogPostPage;
