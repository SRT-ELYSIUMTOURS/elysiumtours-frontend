import React, { useState } from "react";
import { classNames } from "../../../utils/classNames";
import Button from "../../ui/button";

const SLIDES = [
  {
    id: 1,
    image: "https://picsum.photos/seed/blog-hero-1/1728/711",
    alt: "Ghana mountain landscape",
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/blog-hero-2/1728/711",
    alt: "Ghana coastal view",
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/blog-hero-3/1728/711",
    alt: "Ghana cultural scene",
  },
];

const UP_NEXT = {
  category: "Travel Tips",
  title: "Cape Coast Uncovered: History, Heritage & the Sea",
  image: "https://picsum.photos/seed/blog-upnext/337/178",
};

const BlogHero = React.forwardRef(({ className, ...props }, ref) => {
  const [current, setCurrent] = useState(0);

  return (
    <section
      ref={ref}
      className={classNames("relative w-full h-[711px] overflow-hidden", className)}
      {...props}
    >
      {/* Slide images */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className={classNames(
            "absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out",
            i === current ? "opacity-100 z-20" : "opacity-0 z-10 pointer-events-none"
          )}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full object-cover"
          />
          {/* Dark overlay — Figma: rgba(0,0,0,0.6) */}
          <div className="absolute inset-0 bg-overlay-dark z-[15]" />
        </div>
      ))}

      {/* Centered content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-xl z-30">
        <div className="flex flex-col items-center gap-md">
          <h1 className="font-raleway font-bold text-[56px] leading-[66px] text-primary-light-default text-center w-[957px]">
            Flavors of Ghana: A Culinary Adventure Through Accra
          </h1>
          <p className="font-raleway font-medium text-[16px] leading-[26px] text-primary-light-default text-center">
            Savor jollof, street grills, and market bites that tell the story of Ghana&apos;s vibrant spirit.
          </p>
        </div>
        <Button
          variant="neutral"
          shape="pill"
          className="h-[56px] gap-md border-secondary-normal-default"
          endIcon={
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5.25 3.5L8.75 7L5.25 10.5" stroke="#2b0f43" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        >
          Read More
        </Button>
      </div>

      {/* "Up Next" floating card — Figma: 337×178px, right side */}
      <div
        className="absolute right-[156px] bottom-[51px] w-[337px] h-[178px] rounded-[2px] overflow-hidden z-30"
        style={{ boxShadow: "4px 4px 4px 0px rgba(255,255,255,0.05)" }}
      >
        <img
          src={UP_NEXT.image}
          alt="Up next preview"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-overlay-medium rounded-[2px]" />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit]" style={{ boxShadow: "inset 0px 4px 20px 0px rgba(0,0,0,0.25)" }} />
        <div className="absolute top-[11px] left-[11px]">
          <span className="font-raleway font-bold text-[13px] leading-[18px] text-primary-light-default">
            Up Next
          </span>
        </div>
        <div className="absolute bottom-[12px] left-[11px] right-[11px] flex items-end justify-between gap-[30px]">
          <div className="flex flex-col gap-[10px] w-[250px] text-primary-light-default">
            <span className="font-raleway font-bold text-[13px] leading-[18px] underline decoration-[12%]">
              {UP_NEXT.category}
            </span>
            <span className="font-raleway font-semibold text-[16px] leading-[22px]">
              {UP_NEXT.title}
            </span>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <path d="M9 6L15 12L9 18" stroke="#fefefe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Carousel dots */}
      <div className="absolute bottom-[32px] left-1/2 -translate-x-1/2 flex items-center gap-[12px] z-40">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            className={classNames(
              "w-4 h-4 rounded-full border border-solid transition-all duration-300 ease-in",
              i === current
                ? "bg-secondary-normal-default border-secondary-normal-default"
                : "bg-transparent border-primary-dark-default hover:border-secondary-normal-hover"
            )}
            aria-label={i === current ? "Current slide" : `Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
});

BlogHero.displayName = "BlogHero";
export default BlogHero;
