import React, { useState } from "react";
import { classNames } from "../../../utils/classNames";
import Button from "../../ui/button";
import blogHeroImage1 from "../../../assets/blogAssets/Image-1.webp";

const SLIDES = [
  {
    id: 1,
    image: blogHeroImage1,
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
      className={classNames("relative w-full h-[350px] md:h-[500px] lg:h-[711px] overflow-hidden", className)}
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
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-xl z-30 px-4 md:px-10">
        <div className="flex flex-col items-center gap-md">
          <h1 className="font-raleway font-bold text-[28px] md:text-[40px] lg:text-[56px] leading-tight lg:leading-[66px] text-primary-light-default text-center w-full max-w-[957px]">
            Flavors of Ghana: A Culinary Adventure Through Accra
          </h1>
          <p className="font-raleway font-medium text-[14px] md:text-[16px] leading-[26px] text-primary-light-default text-center max-w-[700px]">
            Savor jollof, street grills, and market bites that tell the story of Ghana&apos;s vibrant spirit.
          </p>
        </div>
        <Button
          variant="neutral"
          shape="pill"
          className="h-[56px] px-[28.5px]! border-secondary-normal-default"
          endIcon={
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
  <path d="M2.33301 6.24968C1.91879 6.24968 1.58301 6.58546 1.58301 6.99968C1.58301 7.41389 1.91879 7.74968 2.33301 7.74968L2.33301 6.99968L2.33301 6.24968ZM11.6663 7.74967C12.0806 7.74967 12.4163 7.41389 12.4163 6.99967C12.4163 6.58546 12.0806 6.24967 11.6663 6.24967V6.99967V7.74967ZM9.86097 3.55032C9.56677 3.25873 9.0919 3.26085 8.80032 3.55505C8.50873 3.84925 8.51085 4.32412 8.80505 4.6157L9.33301 4.08301L9.86097 3.55032ZM10.3614 5.10227L9.83345 5.63496V5.63496L10.3614 5.10227ZM10.3614 8.89708L10.8894 9.42977V9.42977L10.3614 8.89708ZM8.80505 9.38365C8.51085 9.67523 8.50873 10.1501 8.80032 10.4443C9.0919 10.7385 9.56677 10.7406 9.86097 10.449L9.33301 9.91634L8.80505 9.38365ZM11.6547 6.8169L12.3987 6.72207L12.3987 6.72207L11.6547 6.8169ZM11.6547 7.18245L12.3987 7.27728V7.27728L11.6547 7.18245ZM2.33301 6.99968L2.33301 7.74968L11.6663 7.74967V6.99967V6.24967L2.33301 6.24968L2.33301 6.99968ZM9.33301 4.08301L8.80505 4.6157L9.83345 5.63496L10.3614 5.10227L10.8894 4.56958L9.86097 3.55032L9.33301 4.08301ZM10.3614 8.89708L9.83345 8.36439L8.80505 9.38365L9.33301 9.91634L9.86097 10.449L10.8894 9.42977L10.3614 8.89708ZM10.3614 5.10227L9.83345 5.63496C10.256 6.0538 10.5272 6.32411 10.7072 6.54826C10.8777 6.76058 10.9039 6.85756 10.9108 6.91173L11.6547 6.8169L12.3987 6.72207C12.3425 6.28087 12.1321 5.92696 11.8767 5.60902C11.6309 5.3029 11.2869 4.96359 10.8894 4.56958L10.3614 5.10227ZM10.3614 8.89708L10.8894 9.42977C11.2869 9.03576 11.6309 8.69645 11.8767 8.39033C12.1321 8.07239 12.3425 7.71848 12.3987 7.27728L11.6547 7.18245L10.9108 7.08762C10.9039 7.14179 10.8777 7.23877 10.7072 7.45109C10.5272 7.67524 10.256 7.94555 9.83345 8.36439L10.3614 8.89708ZM11.6547 6.8169L10.9108 6.91173C10.9182 6.97013 10.9182 7.02922 10.9108 7.08762L11.6547 7.18245L12.3987 7.27728C12.4222 7.09295 12.4222 6.9064 12.3987 6.72207L11.6547 6.8169Z" fill="#2D264B"/>
</svg>
          }
        >
          Read More
        </Button>
      </div>

      {/* "Up Next" floating card — hidden on mobile, visible lg+ */}
      <div
        className="hidden lg:block absolute right-[156px] bottom-[51px] w-[337px] h-[178px] rounded-[2px] overflow-hidden z-30"
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
              "w-4 h-4 rounded-full border-2 border-solid border-[#F7F7F7] transition-all duration-300 ease-in",
              i === current
                ? "bg-[#D6BEEB] "
                : "bg-transparent  hover:border-secondary-normal-hover"
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
