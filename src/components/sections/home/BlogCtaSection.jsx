import React from "react";
import { classNames } from "../../../utils/classNames";
import Button from "../../ui/button";

const BlogCtaSection = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={classNames("bg-[#F2EAF9] py-16 md:py-20", className)}
      {...props}
    >
      <div className=" bg-primary-light-default mx-auto mx-6 md:mx-[30px] rounded-[20px] py-8 lg:px-[99px] lg:mx-[164px]">
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16">
          {/* Overlapping circular images */}
          <div className="relative w-[200px] h-[200px] md:w-[247px] md:h-[198px] shrink-0">
            <div className="absolute z-10 left-0 top-[20px]  w-[145px] h-[157px]  rounded-[20px] -rotate-[21deg] overflow-hidden shadow-[--shadow-card]">
              <img
                src="./src/assets/homeAssets/Image-6.webp"
                alt="Ghana coast"
                className="w-full h-full object-cover"
              />
              <div className="absolute w-full h-full inset-0  bg-black/40"/>
            </div>
            <div className="absolute left-[56px] top-[20px]   w-[145px] h-[157px]  rounded-[20px] -rotate-[21deg] overflow-hidden shadow-[--shadow-card] bg-[#F2EAF9]" />
          </div>

          {/* Text content */}
          <div className="flex flex-col gap-[11.5px] flex-1">
            <h2 className="font-raleway font-bold text-[22px] leading-[30px] lg:text-High-md-bold lg:leading-[34px] text-tertiary-normal-default">
              Discovering Ghana&apos;s Coastal Charm
            </h2>
            <p className="font-raleway mb-1 font-medium text-[14px] leading-[22px] lg:text-md-regular lg:leading-[22px] text-tertiary-normal-default max-w-[913px]">
              From the historic shores of Cape Coast to the laid-back beaches of
              Busua, Ghana&apos;s coastline is a blend of beauty, history, and
              adventure. Join us as we explore hidden seaside gems, local
              seafood spots, and the cultural rhythms that make the coast truly
              unforgettable.
            </p>
            <div>
              <Button
                endIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M2.33325 6.25016C1.91904 6.25016 1.58325 6.58595 1.58325 7.00016C1.58325 7.41438 1.91904 7.75016 2.33325 7.75016L2.33325 7.00016L2.33325 6.25016ZM11.6666 7.75016C12.0808 7.75016 12.4166 7.41438 12.4166 7.00016C12.4166 6.58595 12.0808 6.25016 11.6666 6.25016V7.00016V7.75016ZM9.86121 3.55081C9.56701 3.25922 9.09214 3.26134 8.80056 3.55554C8.50898 3.84973 8.5111 4.3246 8.80529 4.61619L9.33325 4.0835L9.86121 3.55081ZM10.3617 5.10276L9.83369 5.63545V5.63545L10.3617 5.10276ZM10.3617 8.89757L10.8896 9.43026V9.43026L10.3617 8.89757ZM8.80529 9.38414C8.5111 9.67572 8.50898 10.1506 8.80056 10.4448C9.09214 10.739 9.56701 10.7411 9.86121 10.4495L9.33325 9.91683L8.80529 9.38414ZM11.655 6.81738L12.399 6.72256L12.399 6.72256L11.655 6.81738ZM11.655 7.18294L12.399 7.27777V7.27777L11.655 7.18294ZM2.33325 7.00016L2.33325 7.75016L11.6666 7.75016V7.00016V6.25016L2.33325 6.25016L2.33325 7.00016ZM9.33325 4.0835L8.80529 4.61619L9.83369 5.63545L10.3617 5.10276L10.8896 4.57007L9.86121 3.55081L9.33325 4.0835ZM10.3617 8.89757L9.83369 8.36488L8.80529 9.38414L9.33325 9.91683L9.86121 10.4495L10.8896 9.43026L10.3617 8.89757ZM10.3617 5.10276L9.83369 5.63545C10.2563 6.05429 10.5274 6.3246 10.7074 6.54875C10.8779 6.76107 10.9041 6.85805 10.911 6.91221L11.655 6.81738L12.399 6.72256C12.3427 6.28136 12.1323 5.92745 11.877 5.6095C11.6311 5.30339 11.2871 4.96407 10.8896 4.57007L10.3617 5.10276ZM10.3617 8.89757L10.8896 9.43026C11.2871 9.03625 11.6311 8.69693 11.877 8.39082C12.1323 8.07288 12.3427 7.71897 12.399 7.27777L11.655 7.18294L10.911 7.08811C10.9041 7.14228 10.8779 7.23926 10.7074 7.45158C10.5274 7.67572 10.2563 7.94604 9.83369 8.36488L10.3617 8.89757ZM11.655 6.81738L10.911 6.91221C10.9184 6.97062 10.9184 7.02971 10.911 7.08811L11.655 7.18294L12.399 7.27777C12.4225 7.09344 12.4225 6.90689 12.399 6.72256L11.655 6.81738Z"
                      fill="#7B2CBF"
                    />
                  </svg>
                }
                variant="secondaryOutline"
                size="medium"
                shape="pill"
              >
                Read More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

BlogCtaSection.displayName = "BlogCtaSection";

export default BlogCtaSection;
