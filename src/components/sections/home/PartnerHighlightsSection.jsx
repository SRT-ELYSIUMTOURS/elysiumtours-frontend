import React from "react";
import { classNames } from "../../../utils/classNames";
import PartnerHighlightCard from "../../cards/PartnerHighlightCard";
import Button from "../../ui/button";
import ExploreMoreArrowIcon from "../../icons/ExploreMoreArrowIcon";

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
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12 lg:mb-16">
            <div className="flex items-center gap-sm shrink-0">
              <div className="w-[46px] h-[2px] bg-secondary-dark-darker" />
              <span className="font-raleway font-bold text-med-small-bold text-secondary-dark-darker uppercase tracking-wide">
                Partner Highlights
              </span>
            </div>

            <div className="flex flex-col items-end gap-4 max-w-[677px]">
              <h2 className="font-raleway font-bold text-[22px] leading-[30px] lg:text-High-md-bold lg:leading-[34px] text-tertiary-normal-default text-right">
                Trusted Partners, Unforgettable Journeys
              </h2>
              <p className=" lg:pl-[111px] leading-[22px] lg:text-md-regular lg:leading-[26px] text-primary-dark-active text-right">
                Team up with our trusted tour partners for smooth, stress-free
                adventures. With expert guides, strong local connections, and
                authentic experiences, every trip becomes more seamless,
                enriching, and fun — the perfect blend of comfort and discovery.
              </p>
              <Button
                endIcon={<ExploreMoreArrowIcon />}
                variant="secondaryOutline"
                size="small"
                shape="pill"
              >
                Explore More
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px]">
            {PARTNERS.map((partner) => (
              <PartnerHighlightCard
                key={partner.id}
                image={partner.image}
                category={partner.category}
                className="h-[400px] md:h-[500px] w-full lg:h-[656px]"
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
