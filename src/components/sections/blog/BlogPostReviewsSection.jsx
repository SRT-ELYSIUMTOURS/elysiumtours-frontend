import React, { useState } from "react";
import { classNames } from "../../../utils/classNames";

function ReviewRow({ comment, onLike }) {
  return (
    <li className="border-t-[1.5px] border-secondary-light-default">
      <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-start sm:gap-6">
        <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full bg-tertiary-light-default sm:h-[115px] sm:w-[115px]">
          {comment.avatar ? (
            <img
              src={comment.avatar}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2.5 px-2.5 py-2.5">
          <span className="text-md-semibold text-tertiary-normal-default">
            {comment.authorName}
          </span>
          <p className="text-md-semibold text-primary-dark-active">
            {comment.body}
          </p>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-med-small-Medium text-primary-dark-darker">
              {comment.timeLabel}
            </span>
            <button
              type="button"
              className="font-raleway text-[13px] outline-none font-semibold leading-[18px] text-secondary-dark-darker transition-colors hover:text-secondary-normal-default"
              onClick={() => onLike?.(comment.id)}
            >
              Like
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

/**
 * Blog extended — add review + comment list (Figma ~1416px column).
 */
const BlogPostReviewsSection = React.forwardRef(
  (
    {
      reviews = [],
      onSubmitReview,
      onCommentLike,
      className = "",
      ...props
    },
    ref
  ) => {
    const [draft, setDraft] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      const text = draft.trim();
      if (!text) return;
      onSubmitReview?.(text);
      setDraft("");
    };

    const count = reviews.length;

    return (
      <section
        ref={ref}
        className={classNames(
          "mx-auto w-full max-w-[1416px] overflow-hidden pb-14 pt-[26px]",
          className
        )}
        {...props}
      >
        <h2 className="font-raleway text-[25px] font-bold leading-[34px] text-tertiary-normal-default">
          Add a review
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-7 flex h-20 w-full max-w-[1375px] items-center gap-3 rounded-[40px] border border-solid border-secondary-light-default bg-primary-light-default py-2 pl-5 pr-2 shadow-card sm:gap-4 sm:pr-3"
        >
          <label htmlFor="blog-review-input" className="sr-only">
            Share your thoughts
          </label>
          <input
            id="blog-review-input"
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Share your thoughts"
            className="min-w-0 flex-1 border-0 bg-transparent font-raleway text-[16px] font-medium leading-[26px] text-tertiary-normal-default outline-none placeholder:text-primary-normal-active"
          />
          <button
            type="submit"
            className="flex h-14 w-[120px] shrink-0 items-center justify-center rounded-[40px] bg-secondary-normal-default font-raleway text-[16px] font-semibold leading-[22px] text-primary-light-default shadow-card transition-colors hover:bg-secondary-normal-hover sm:w-[140px]"
          >
            Submit
          </button>
        </form>

        <p className="mt-8 font-raleway text-[20px] font-bold leading-[28px] text-tertiary-normal-default">
          {count} comment{count !== 1 ? "s" : ""}
        </p>

        <ul className="mt-9 flex w-full max-w-[1402px] flex-col">
          {reviews.map((comment) => (
            <ReviewRow key={comment.id} comment={comment} onLike={onCommentLike} />
          ))}
        </ul>
      </section>
    );
  }
);

BlogPostReviewsSection.displayName = "BlogPostReviewsSection";
export default BlogPostReviewsSection;
