import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/classNames";
import Button from "../../ui/button";

// Static fallback slides — shown while posts are loading or when none are available.
const STATIC_SLIDES = [
  {
    id: "s1",
    image: "/blogAssets/Image-1.webp",
    title: "Flavors of Ghana: A Culinary Adventure Through Accra",
    subtitle:
      "Savor jollof, street grills, and market bites that tell the story of Ghana’s vibrant spirit.",
    slug: null,
    category: null,
  },
  {
    id: "s2",
    image: "https://picsum.photos/seed/blog-hero-2/1728/711",
    title: "Cape Coast: History, Castles & the Atlantic Shore",
    subtitle: "Explore the rich history along Ghana’s most storied coastline.",
    slug: null,
    category: null,
  },
  {
    id: "s3",
    image: "https://picsum.photos/seed/blog-hero-3/1728/711",
    title: "Hidden Gems of West Africa",
    subtitle:
      "From Togoville to Abomey, discover the region’s best-kept secrets.",
    slug: null,
    category: null,
  },
];

const CATEGORY_LABELS = {
  "travel-guides": "Travel Guides",
  "destination-highlights": "Destination Highlights",
  "local-guides": "Local Guides",
  "travel-stories": "Travel Stories",
  "partner-spotlight": "Partner Spotlight",
  "festival-calendar": "Festival Calendar",
};

// ─── Up Next card ─────────────────────────────────────────────────────────────
// Receives the slide that is next in the carousel sequence.
// Fully responsive from 320px up to desktop Figma dimensions (337×178).
const UpNextCard = ({ slide, onClick }) => {
  if (!slide) return null;
  const categoryLabel = slide.category
    ? CATEGORY_LABELS[slide.category] || slide.category
    : null;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Up next: ${slide.title}`}
      className={classNames(
        "absolute z-30 overflow-hidden hidden md:block rounded-[2px] text-left",
        slide.slug ? "cursor-pointer" : "cursor-default",
        "w-[200px] h-[108px]",
        "sm:w-[240px] sm:h-[120px]",
        "lg:w-[337px] lg:h-[178px]",
        "right-3 bottom-[30px] lg:bottom-[50px]",
        "sm:right-4",
        "lg:right-[60px] xl:right-[156px] lg:bottom-[51px]"
      )}
      style={{ boxShadow: "4px 4px 4px 0px rgba(255,255,255,0.05)" }}
    >
      {slide.image && (
        <img
          src={slide.image}
          alt={slide.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-black/50 rounded-[inherit]" />
      <div
        className="absolute inset-0 pointer-events-none rounded-[inherit]"
        style={{ boxShadow: "inset 0px 4px 20px 0px rgba(0,0,0,0.25)" }}
      />

      {/* "Up Next" label */}
      <div className="absolute top-[8px] flex justify-between w-full px-[8px] sm:top-[10px] sm:px-[11px]">
        <span className="font-raleway font-bold text-[10px] sm:text-[11px] lg:text-[13px] leading-[18px] text-primary-light-default">
          Up Next
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M2.6665 7.25008C2.25229 7.25008 1.9165 7.58587 1.9165 8.00008C1.9165 8.4143 2.25229 8.75008 2.6665 8.75008L2.6665 8.00008L2.6665 7.25008ZM13.3332 8.75008C13.7474 8.75008 14.0832 8.41429 14.0832 8.00008C14.0832 7.58587 13.7474 7.25008 13.3332 7.25008V8.00008V8.75008ZM11.1945 4.13406C10.9003 3.84247 10.4254 3.84459 10.1338 4.13879C9.84223 4.43299 9.84435 4.90786 10.1385 5.19944L10.6665 4.66675L11.1945 4.13406ZM11.8418 5.83162L11.3139 6.36431V6.36431L11.8418 5.83162ZM11.8418 10.1685L12.3698 10.7012V10.7012L11.8418 10.1685ZM10.1385 10.8007C9.84435 11.0923 9.84223 11.5672 10.1338 11.8614C10.4254 12.1556 10.9003 12.1577 11.1945 11.8661L10.6665 11.3334L10.1385 10.8007ZM13.3199 7.79119L14.0639 7.69636L14.0639 7.69636L13.3199 7.79119ZM13.3199 8.20897L14.0639 8.3038V8.3038L13.3199 8.20897ZM2.6665 8.00008L2.6665 8.75008L13.3332 8.75008V8.00008V7.25008L2.6665 7.25008L2.6665 8.00008ZM10.6665 4.66675L10.1385 5.19944L11.3139 6.36431L11.8418 5.83162L12.3698 5.29893L11.1945 4.13406L10.6665 4.66675ZM11.8418 10.1685L11.3139 9.63585L10.1385 10.8007L10.6665 11.3334L11.1945 11.8661L12.3698 10.7012L11.8418 10.1685ZM11.8418 5.83162L11.3139 6.36431C11.795 6.84121 12.1101 7.15507 12.3205 7.41709C12.5214 7.66728 12.5645 7.79647 12.5759 7.88602L13.3199 7.79119L14.0639 7.69636C14.0031 7.21978 13.7758 6.83367 13.4901 6.47785C13.2138 6.13386 12.8259 5.751 12.3698 5.29893L11.8418 5.83162ZM11.8418 10.1685L12.3698 10.7012C12.8259 10.2492 13.2138 9.8663 13.4901 9.52232C13.7758 9.16649 14.0031 8.78038 14.0639 8.3038L13.3199 8.20897L12.5759 8.11414C12.5645 8.20369 12.5214 8.33288 12.3205 8.58307C12.1101 8.84509 11.795 9.15895 11.3139 9.63585L11.8418 10.1685ZM13.3199 7.79119L12.5759 7.88602C12.5856 7.96176 12.5856 8.0384 12.5759 8.11414L13.3199 8.20897L14.0639 8.3038C14.0896 8.10213 14.0896 7.89804 14.0639 7.69636L13.3199 7.79119Z"
            fill="#EBDFF5"
          />
        </svg>
      </div>

      {/* Bottom row */}
      <div className="absolute bottom-[8px] left-[8px] right-[8px] sm:bottom-[10px] sm:left-[11px] sm:right-[11px] lg:bottom-[12px] lg:left-[11px] lg:right-[11px] flex items-end justify-between gap-2">
        <div className="flex flex-col gap-[6px] sm:gap-[10px] flex-1 min-w-0 text-primary-light-default">
          {categoryLabel && (
            <span className="font-raleway font-bold text-[10px] sm:text-[11px] lg:text-[13px] leading-[18px] underline decoration-[12%] truncate">
              {categoryLabel}
            </span>
          )}
          <span className="font-raleway font-semibold text-[11px] sm:text-[13px] lg:text-[16px] leading-[1.4] line-clamp-2">
            {slide.title}
          </span>
        </div>
        
      </div>
    </button>
  );
};

// ─── BlogHero ─────────────────────────────────────────────────────────────────
// posts: array of blog post objects { _id, title, excerpt, coverImage, category, slug }
// Each dot = one post. Active slide = that post's cover + title + excerpt.
// "Up Next" card = the slide that follows the active one (wraps around).
// Falls back to STATIC_SLIDES while posts are loading or when none are passed.
const BlogHero = React.forwardRef(({ className, posts, ...props }, ref) => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const slides =
    posts && posts.length > 0
      ? posts.map((p) => ({
          id: p._id || p.slug,
          image: p.coverImage,
          title: p.title,
          subtitle: p.excerpt || "",
          slug: p.slug,
          category: p.category,
        }))
      : STATIC_SLIDES;

  const slide = slides[current];
  const upNext =
    slides.length > 1 ? slides[(current + 1) % slides.length] : null;

  const handleReadMore = () => {
    if (slide?.slug) {
      navigate(`/blog/post/${slide.slug}`, {
        state: { title: slide.title, heroImage: slide.image },
      });
    }
  };

  const handleUpNextClick = () => {
    if (upNext?.slug) {
      navigate(`/blog/post/${upNext.slug}`, {
        state: { title: upNext.title, heroImage: upNext.image },
      });
    }
  };

  return (
    <section
      ref={ref}
      className={classNames(
        "relative w-full h-[370px] md:h-[500px] lg:h-[711px] overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Slide images */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={classNames(
            "absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out",
            i === current
              ? "opacity-100 z-20"
              : "opacity-0 z-10 pointer-events-none"
          )}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-overlay-dark z-[15]" />
        </div>
      ))}

      {/* Centered content — driven by the active slide */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-xl z-30 px-4 md:px-10">
        <div className="flex flex-col items-center gap-md">
          <h1 className="font-raleway font-bold text-[28px] md:text-[32px] lg:text-[56px] leading-tight lg:leading-[66px] text-primary-light-default text-center w-full max-w-[957px]">
            {slide?.title}
          </h1>
          {slide?.subtitle && (
            <p className="font-raleway font-medium line-clamp-2 md:line-clamp-none text-[14px] md:text-[14px] leading-[26px] text-primary-light-default text-center  max-w-[700px]">
              {slide.subtitle}
            </p>
          )}
        </div>
        <Button
          variant="neutral"
          shape="pill"
          className="h-[56px] px-[28.5px]! border-secondary-normal-default"
          onClick={handleReadMore}
          endIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M2.33301 6.24968C1.91879 6.24968 1.58301 6.58546 1.58301 6.99968C1.58301 7.41389 1.91879 7.74968 2.33301 7.74968L2.33301 6.99968L2.33301 6.24968ZM11.6663 7.74967C12.0806 7.74967 12.4163 7.41389 12.4163 6.99967C12.4163 6.58546 12.0806 6.24967 11.6663 6.24967V6.99967V7.74967ZM9.86097 3.55032C9.56677 3.25873 9.0919 3.26085 8.80032 3.55505C8.50873 3.84925 8.51085 4.32412 8.80505 4.6157L9.33301 4.08301L9.86097 3.55032ZM10.3614 5.10227L9.83345 5.63496V5.63496L10.3614 5.10227ZM10.3614 8.89708L10.8894 9.42977V9.42977L10.3614 8.89708ZM8.80505 9.38365C8.51085 9.67523 8.50873 10.1501 8.80032 10.4443C9.0919 10.7385 9.56677 10.7406 9.86097 10.449L9.33301 9.91634L8.80505 9.38365ZM11.6547 6.8169L12.3987 6.72207L12.3987 6.72207L11.6547 6.8169ZM11.6547 7.18245L12.3987 7.27728V7.27728L11.6547 7.18245ZM2.33301 6.99968L2.33301 7.74968L11.6663 7.74967V6.99967V6.24967L2.33301 6.24968L2.33301 6.99968ZM9.33301 4.08301L8.80505 4.6157L9.83345 5.63496L10.3614 5.10227L10.8894 4.56958L9.86097 3.55032L9.33301 4.08301ZM10.3614 8.89708L9.83345 8.36439L8.80505 9.38365L9.33301 9.91634L9.86097 10.449L10.8894 9.42977L10.3614 8.89708ZM10.3614 5.10227L9.83345 5.63496C10.256 6.0538 10.5272 6.32411 10.7072 6.54826C10.8777 6.76058 10.9039 6.85756 10.9108 6.91173L11.6547 6.8169L12.3987 6.72207C12.3425 6.28087 12.1321 5.92696 11.8767 5.60902C11.6309 5.3029 11.2869 4.96359 10.8894 4.56958L10.3614 5.10227ZM10.3614 8.89708L10.8894 9.42977C11.2869 9.03576 11.6309 8.69645 11.8767 8.39033C12.1321 8.07239 12.3425 7.71848 12.3987 7.27728L11.6547 7.18245L10.9108 7.08762C10.9039 7.14179 10.8777 7.23877 10.7072 7.45109C10.5272 7.67524 10.256 7.94555 9.83345 8.36439L10.3614 8.89708ZM11.6547 6.8169L10.9108 6.91173C10.9182 6.97013 10.9182 7.02922 10.9108 7.08762L11.6547 7.18245L12.3987 7.27728C12.4222 7.09295 12.4222 6.9064 12.3987 6.72207L11.6547 6.8169Z"
                fill="#2D264B"
              />
            </svg>
          }
        >
          Read More
        </Button>
      </div>

      {/* Up Next — the slide that follows the currently active one */}
      <UpNextCard slide={upNext} onClick={handleUpNextClick} />

      {/* Carousel dots */}
      <div className="absolute bottom-[32px] left-1/2 -translate-x-1/2 flex items-center gap-[12px] z-40">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            className={classNames(
              "w-4 h-4 rounded-full border-2 border-solid border-[#F7F7F7] transition-all duration-300 ease-in",
              i === current
                ? "bg-[#D6BEEB]"
                : "bg-transparent hover:border-secondary-normal-hover"
            )}
            aria-label={
              i === current ? "Current slide" : `Go to slide ${i + 1}`
            }
          />
        ))}
      </div>
    </section>
  );
});

BlogHero.displayName = "BlogHero";
export default BlogHero;
