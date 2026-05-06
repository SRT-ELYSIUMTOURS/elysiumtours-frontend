import React from "react";
import { classNames } from "../../../utils/classNames";

/**
 * Single-image blog post hero (no slider, CTA, or "Up next").
 * Matches blog index hero height/overlay; copy is title + optional subtitle only.
 */
const BlogArticleHero = React.forwardRef(
  (
    {
      image,
      imageAlt = "",
      title,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={classNames(
          "relative h-[711px] w-full overflow-hidden",
          className
        )}
        {...props}
      >
        {image ? (
          <img
            src={image}
            alt={imageAlt || title || ""}
            className="absolute inset-0 z-10 h-full w-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0 z-[15] bg-overlay-dark" />

        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6">
          <div className="flex max-w-[957px] flex-col items-center gap-md text-center">
            {title ? (
              <h1 className="font-raleway text-Display-xl-bold text-primary-light-default">
                {title}
              </h1>
            ) : null}
           
          </div>
        </div>
      </section>
    );
  }
);

BlogArticleHero.displayName = "BlogArticleHero";
export default BlogArticleHero;
