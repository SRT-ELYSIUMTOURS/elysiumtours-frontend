import React, { useState } from "react";
import { classNames } from "../../../utils/classNames";
import Button from "../../ui/button";

const GALLERY_SLIDES = [
  {
    id: 1,
    image: "https://picsum.photos/seed/gallery1/1256/516",
    title: "Waves of Serenity",
    description:
      "Feel the gentle breeze and golden sands of Busua Beach, where every sunset paints a new memory of peace and adventure.",
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/gallery2/1256/516",
    title: "Golden Heritage",
    description:
      "Explore the rich history of Elmina Castle, where every stone tells a story of resilience and culture.",
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/gallery3/1256/516",
    title: "Forest Canopy Walk",
    description:
      "Walk among the treetops at Kakum National Park for breathtaking views of the tropical rainforest.",
  },
];

const GallerySection = React.forwardRef(({ className, ...props }, ref) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = GALLERY_SLIDES[activeSlide];

  return (
    <section
      ref={ref}
      className={classNames(
        "bg-primary-light-default py-16 md:py-20 lg:py-24",
        className
      )}
      {...props}
    >
      <div className="max-w-[1728px] mx-auto px-6 md:px-[30px]">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12 lg:mb-16">
          <div className="flex items-center gap-sm shrink-0">
            <div className="w-[46px] h-[2px] bg-secondary-dark-darker" />
            <span className="font-raleway font-bold text-med-small-bold text-secondary-dark-darker uppercase tracking-wide">
              Gallery
            </span>
          </div>

          <div className="flex flex-col items-end gap-4 max-w-[677px]">
            <h2 className="font-raleway font-bold text-[22px] leading-[30px] lg:text-High-md-bold lg:leading-[34px] text-tertiary-normal-default text-right">
              Gallery: Moments That Tell Our Story
            </h2>
            <p className="font-raleway font-medium text-[14px] leading-[22px] lg:text-md-Medium lg:leading-[26px] text-primary-dark-active text-right">
              Take a glimpse into the beauty and excitement of our journeys.
              Our gallery showcases breathtaking destinations, vibrant cultures,
              and unforgettable memories captured along the way. Each photo
              reflects the heart of Elysium Tours — adventure, connection, and
              authentic Ghanaian experiences.
            </p>
            <Button variant="secondaryOutline" size="small" shape="pill">
              View Gallery
            </Button>
          </div>
        </div>

        {/* Gallery showcase */}
        <div className="relative">
          <div className="relative rounded-xl overflow-hidden shadow-[--shadow-card] bg-tertiary-light-default">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-[300px] md:h-[450px] lg:h-[654px] object-cover"
            />

            {/* Inner border frame */}
            <div className="absolute inset-4 md:inset-8 lg:inset-[87px_110px] border border-primary-light-default rounded-sm pointer-events-none" />

            {/* Caption overlay */}
            <div className="absolute bottom-8 left-8 lg:bottom-[87px] lg:left-[136px] max-w-[565px]">
              <h3 className="font-raleway font-bold text-[20px] leading-[28px] lg:text-High-md-bold lg:leading-[34px] text-tertiary-normal-default mb-2">
                {slide.title}
              </h3>
              <p className="font-raleway font-normal text-[14px] leading-[20px] lg:text-md-regular lg:leading-[24px] text-tertiary-normal-default">
                {slide.description}
              </p>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-end gap-2 mt-4 pr-4">
            {GALLERY_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveSlide(idx)}
                className={classNames(
                  "w-[10px] h-[10px] rounded-full transition-all duration-300 ease-in",
                  idx === activeSlide
                    ? "bg-secondary-normal-default"
                    : "bg-primary-dark-default"
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

GallerySection.displayName = "GallerySection";

export default GallerySection;
