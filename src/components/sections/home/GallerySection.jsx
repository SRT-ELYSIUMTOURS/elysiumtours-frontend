import React, { useState } from "react";
import { classNames } from "../../../utils/classNames";
import Button from "../../ui/button";

const GALLERY_SLIDES = [
  {
    id: 1,
    image: "./src/assets/Elysium+Achimota/HomeGalImg.webp",
    title: "Moments from Motown",
    description:
      "Browse a collection of images capturing the sights, culture, and memorable experiences that make Motown a destination worth exploring.",
  },
  {
    id: 2,
    image: "./src/assets/homeAssets/hero2.webp",
    title: "Golden Heritage",
    description:
      "Explore the rich history of Elmina Castle, where every stone tells a story of resilience and culture.",
  },
  {
    id: 3,
    image: "./src/assets/homeAssets/hero4.webp",
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
      <div className="max-w-[1728px] mx-auto px-6 md:px-[30px] lg:px-[164px]">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12 lg:mb-16">
          <div className="flex items-center gap-sm shrink-0 justify-center lg:justify-start">
            <div className="w-[46px] h-[2px] bg-secondary-dark-darker" />
            <span className="font-raleway font-bold text-med-small-bold text-secondary-dark-darker uppercase tracking-wide">
              Gallery
            </span>
          </div>

          <div className="flex flex-col items-center self-center lg:self-end  lg:items-end gap-4 max-w-[677px]">
            <h2 className="font-raleway font-bold text-[22px] leading-[30px] lg:text-High-md-bold lg:leading-[34px] text-tertiary-normal-default text-center lg:text-right">
              Gallery: Moments That Tell Our Story
            </h2>
            <p className="font-raleway font-medium text-[14px] lg:pl-[111px] leading-[22px] lg:text-md-Medium lg:leading-[26px] text-primary-dark-active text-center lg:text-right">
              Take a glimpse into the beauty and excitement of our journeys. Our
              gallery showcases breathtaking destinations, vibrant cultures, and
              unforgettable memories captured along the way. Each photo reflects
              the heart of Elysium Tours — adventure, connection, and authentic
              Ghanaian experiences.
            </p>
            <Button variant="secondaryOutline" size="small" shape="pill">
              View Gallery
            </Button>
          </div>
        </div>

        {/* Gallery showcase */}
        <div className="relative">
          <div className="relative noise rounded-xl w-full h-[300px] md:h-[450px] lg:h-[654px] overflow-hidden shadow-[--shadow-card] bg-tertiary-light-default">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            {/* Inner border frame */}
            <div className="absolute flex items-end inset-4 md:inset-8 lg:inset-[87px_110px] border-8 border-primary-light-default rounded-sm ">
              {/* Caption overlay */}
              <div className="bg-primary-light-default pl-3 pr-3 md:pr-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0 py-2.5 w-full">
                <div className="min-w-0">
                  <h3 className="font-raleway font-bold text-[16px] leading-[22px] md:text-[20px] md:leading-[28px] lg:text-High-md-bold lg:leading-[34px] text-tertiary-normal-default mb-1 md:mb-2.5">
                    {slide.title}
                  </h3>
                  <p className="font-raleway font-normal text-[12px] leading-[18px] md:text-[14px] md:leading-[20px] lg:text-md-regular lg:leading-[24px] text-tertiary-normal-default max-w-[565px]">
                    {slide.description}
                  </p>
                </div>
                {/* Dots */}
                <div className="flex justify-start md:justify-end gap-2 shrink-0">
                  {GALLERY_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveSlide(idx)}
                      className={classNames(
                        "w-[10px] h-[10px] cursor-pointer rounded-full transition-all duration-300 ease-in",
                        idx === activeSlide
                          ? "bg-[#D6BEEB] border border-[#7B2CBF]"
                          : "bg-[#F2EAF9]"
                      )}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

GallerySection.displayName = "GallerySection";

export default GallerySection;
