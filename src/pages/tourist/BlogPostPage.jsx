import React, { useMemo, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { classNames } from "../../utils/classNames";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchBlogPostThunk, selectCurrentPost } from "../../store/slices/cmsSlice";
import BlogBreadcrumbBar from "../../components/sections/blog/BlogBreadcrumbBar";
import BlogArticleHero from "../../components/sections/blog/BlogArticleHero";
import BlogPostMetaBar from "../../components/sections/blog/BlogPostMetaBar";
import BlogPostBlocks from "../../components/sections/blog/BlogPostBlocks";
import BlogPostReviewsSection from "../../components/sections/blog/BlogPostReviewsSection";
import { DUMMY_BLOG_POST_BLOCKS } from "../../data/blogPostDummyBlocks";
import { DUMMY_BLOG_POST_REVIEWS } from "../../data/blogPostReviewsDummy";

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

/**
 * Single blog article ("extended") — hero, meta bar, body, and future sections.
 */
const BlogPostPage = React.forwardRef(({ className, ...props }, ref) => {
  const { slug } = useParams();
  const location = useLocation();
  const passed = location.state;
  const dispatch = useAppDispatch();
  const apiPost = useAppSelector(selectCurrentPost);

  useEffect(() => {
    if (slug) dispatch(fetchBlogPostThunk(slug));
  }, [dispatch, slug]);

  const post = apiPost?.slug === slug ? apiPost : null;

  const fallbackTitle = useMemo(() => slugToTitle(slug), [slug]);
  const title = post?.title ?? passed?.title ?? fallbackTitle;

  const heroImage = useMemo(() => {
    if (post?.coverImage || post?.heroImage) return post.coverImage || post.heroImage;
    if (passed?.heroImage) return passed.heroImage;
    return slug
      ? `https://picsum.photos/seed/blog-post-${slug}/1728/711`
      : "https://picsum.photos/seed/blog-post-default/1728/711";
  }, [post, passed?.heroImage, slug]);

  const authorName = post?.author?.name ?? passed?.authorName ?? "Davida Dzato";
  const authorImage =
    post?.author?.avatar ?? passed?.authorImage ?? "https://picsum.photos/seed/blog-author/150/150";
  const dateLabel = post?.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : passed?.dateLabel ?? "Jun 2, 2025";
  const readTimeLabel = post?.readTime ?? passed?.readTimeLabel ?? "3 minutes read";

  const contentBlocks =
    passed?.contentBlocks?.length > 0 ? passed.contentBlocks : DUMMY_BLOG_POST_BLOCKS;

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

      <BlogArticleHero
        image={heroImage}
        imageAlt=""
        title={title}
      />

      <BlogPostMetaBar
        authorName={authorName}
        authorImage={authorImage}
        dateLabel={dateLabel}
        readTimeLabel={readTimeLabel}
      />

      <article className="w-full bg-primary-light-default">
        <div className="mx-auto max-w-[1728px] py-10 lg:py-[80px]">
          <BlogPostBlocks blocks={contentBlocks} slug={slug} />
        </div>
      </article>

      <section className="w-full bg-primary-light-default">
        <div className="mx-auto max-w-[1728px] px-4 md:px-8 lg:px-[156px] pb-10 lg:pb-[80px]">
          <BlogPostReviewsSection reviews={passed?.reviews ?? DUMMY_BLOG_POST_REVIEWS} />
        </div>
      </section>
    </main>
  );
});

BlogPostPage.displayName = "BlogPostPage";
export default BlogPostPage;
