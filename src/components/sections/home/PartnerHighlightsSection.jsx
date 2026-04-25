import React from "react";
import { classNames } from "../../../utils/classNames";
import PartnerHighlightCard from "../../cards/PartnerHighlightCard";
import Button from "../../ui/button";

const PARTNERS = [
  {
    id: 1,
    category: "Accommodation",
    image: "./src/assets/homeAssets/Image-11.webp",
  },
  {
    id: 2,
    category: "Transportation",
    image: "./src/assets/homeAssets/Image-12.webp",
  },
  {
    id: 3,
    category: "Tour Guides",
    image: "./src/assets/homeAssets/Image-13.webp",
  },
];

const PartnerHighlightsSection = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={classNames(
          "bg-[#F2EAF9] py-16 md:py-20 lg:py-24",
          className
        )}
        {...props}
      >
        <div className="max-w-[1728px] mx-auto px-6 md:px-[30px] lg:px-[164px]">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-8 mb-8 lg:mb-16">
            <div className="flex items-center justify-center lg:justify-start w-full lg:w-auto gap-sm shrink-0">
              <div className="w-[46px] h-[2px] bg-secondary-dark-darker" />
              <span className="font-raleway font-bold text-med-small-bold text-secondary-dark-darker uppercase tracking-wide">
                Partner Highlight
              </span>
            </div>

            <div className="flex flex-col items-center lg:items-end gap-4 max-w-[677px]">
              <h2 className="font-raleway font-bold text-[22px] leading-[30px] lg:text-High-md-bold lg:leading-[34px] text-tertiary-normal-default text-center lg:text-right">
                Trusted Partners, Unforgettable Journeys
              </h2>
              <p className="font-raleway font-medium text-[14px] lg:pl-[111px] leading-[22px] lg:text-md-Medium lg:leading-[26px] text-primary-dark-active text-center lg:text-right">
                Team up with our trusted tour partners for smooth, stress-free
                adventures. With expert guides, strong local connections, and
                authentic experiences, every trip becomes more seamless,
                enriching, and fun — the perfect blend of comfort and discovery.
              </p>
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
                      d="M2.33325 6.24992C1.91904 6.24992 1.58325 6.58571 1.58325 6.99992C1.58325 7.41413 1.91904 7.74992 2.33325 7.74992L2.33325 6.99992L2.33325 6.24992ZM11.6666 7.74992C12.0808 7.74992 12.4166 7.41413 12.4166 6.99992C12.4166 6.58571 12.0808 6.24992 11.6666 6.24992V6.99992V7.74992ZM9.86121 3.55056C9.56701 3.25898 9.09214 3.2611 8.80056 3.55529C8.50898 3.84949 8.5111 4.32436 8.80529 4.61594L9.33325 4.08325L9.86121 3.55056ZM10.3617 5.10251L9.83369 5.63521V5.63521L10.3617 5.10251ZM10.3617 8.89732L10.8896 9.43001V9.43001L10.3617 8.89732ZM8.80529 9.38389C8.5111 9.67548 8.50898 10.1503 8.80056 10.4445C9.09214 10.7387 9.56701 10.7409 9.86121 10.4493L9.33325 9.91659L8.80529 9.38389ZM11.655 6.81714L12.399 6.72231L12.399 6.72231L11.655 6.81714ZM11.655 7.1827L12.399 7.27753V7.27752L11.655 7.1827ZM2.33325 6.99992L2.33325 7.74992L11.6666 7.74992V6.99992V6.24992L2.33325 6.24992L2.33325 6.99992ZM9.33325 4.08325L8.80529 4.61594L9.83369 5.63521L10.3617 5.10251L10.8896 4.56982L9.86121 3.55056L9.33325 4.08325ZM10.3617 8.89732L9.83369 8.36463L8.80529 9.38389L9.33325 9.91659L9.86121 10.4493L10.8896 9.43001L10.3617 8.89732ZM10.3617 5.10251L9.83369 5.63521C10.2563 6.05404 10.5274 6.32436 10.7074 6.54851C10.8779 6.76082 10.9041 6.85781 10.911 6.91197L11.655 6.81714L12.399 6.72231C12.3427 6.28111 12.1323 5.92721 11.877 5.60926C11.6311 5.30315 11.2871 4.96383 10.8896 4.56982L10.3617 5.10251ZM10.3617 8.89732L10.8896 9.43001C11.2871 9.03601 11.6311 8.69669 11.877 8.39058C12.1323 8.07263 12.3427 7.71872 12.399 7.27753L11.655 7.1827L10.911 7.08787C10.9041 7.14203 10.8779 7.23902 10.7074 7.45133C10.5274 7.67548 10.2563 7.94579 9.83369 8.36463L10.3617 8.89732ZM11.655 6.81714L10.911 6.91197C10.9184 6.97037 10.9184 7.02946 10.911 7.08787L11.655 7.1827L12.399 7.27752C12.4225 7.09319 12.4225 6.90665 12.399 6.72231L11.655 6.81714Z"
                      fill="#7B2CBF"
                    />
                  </svg>
                }
                variant="secondaryOutline"
                size="small"
                shape="pill"
              >
                Explore More
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-[32px]">
            {PARTNERS.map((partner) => (
              <PartnerHighlightCard
                key={partner.id}
                image={partner.image}
                category={partner.category}
                className="h-[300px] md:h-[500px] w-full lg:h-[656px]"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
);

PartnerHighlightsSection.displayName = "PartnerHighlightsSection";

export default PartnerHighlightsSection;
