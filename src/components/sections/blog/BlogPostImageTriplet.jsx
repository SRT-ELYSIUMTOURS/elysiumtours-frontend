import React from "react";
import { classNames } from "../../../utils/classNames";

function galleryDefaults(slug) {
  const key = slug || "blog";
  return {
    main: `https://picsum.photos/seed/${key}-grid-main/1014/556`,
    top: `https://picsum.photos/seed/${key}-grid-top/365/230`,
    bottom: `https://picsum.photos/seed/${key}-grid-bottom/365/297`,
  };
}

/**
 * Three-image block: 1014×556 left, 365×230 + 365×297 right (gaps 38 / 29). Figma blog extended.
 */
const BlogPostImageTriplet = React.forwardRef(
  (
    {
      slug,
      mainSrc,
      topSrc,
      bottomSrc,
      mainAlt = "",
      topAlt = "",
      bottomAlt = "",
      className = "",
      ...props
    },
    ref
  ) => {
    const d = galleryDefaults(slug);
    const left = mainSrc ?? d.main;
    const r1 = topSrc ?? d.top;
    const r2 = bottomSrc ?? d.bottom;

    return (
      <div
        ref={ref}
        className={classNames("w-full", className)}
        {...props}
      >
        <div className="mx-auto flex w-full max-w-[1417px] flex-col gap-8 lg:flex-row lg:gap-[38px] lg:items-start">
          {/* Main — 1014 × 556 */}
          <div
            className="relative w-full shrink-0 overflow-hidden rounded-[40px] bg-tertiary-light-default aspect-[1014/556] lg:aspect-auto lg:h-[556px] lg:w-[1014px] lg:max-w-[min(100%,1014px)]"
          >
            <img
              src={left}
              alt={mainAlt}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right column — 365 + 29 + 365 */}
          <div className="flex w-full shrink-0 flex-col gap-[29px] lg:w-[365px]">
            <div className="relative h-[200px] w-full overflow-hidden rounded-[40px] bg-tertiary-light-default sm:h-[230px] lg:h-[230px] lg:w-[365px]">
              <img
                src={r1}
                alt={topAlt}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative h-[220px] w-full overflow-hidden rounded-[40px] bg-tertiary-light-default sm:h-[260px] lg:h-[297px] lg:w-[365px]">
              <img
                src={r2}
                alt={bottomAlt}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

BlogPostImageTriplet.displayName = "BlogPostImageTriplet";
export default BlogPostImageTriplet;
