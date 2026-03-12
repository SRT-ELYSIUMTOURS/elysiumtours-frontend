import React from "react";
import { classNames } from "../../../utils/classNames";
import PartnerHighlightCard from "../../cards/PartnerHighlightCard";
import Button from "../../ui/button";

const PARTNERS = [
  {
    id: 1,
    category: "Accommodation",
    image: "https://picsum.photos/seed/partner1/451/656",
  },
  {
    id: 2,
    category: "Transportation",
    image: "https://picsum.photos/seed/partner2/451/656",
  },
  {
    id: 3,
    category: "Tour Guides",
    image: "https://picsum.photos/seed/partner3/451/656",
  },
];

const PartnerHighlightsSection = React.forwardRef(
  ({ className, ...props }, ref) => {
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
                Partner Highlights
              </span>
            </div>

            <div className="flex flex-col items-end gap-4 max-w-[677px]">
              <h2 className="font-raleway font-bold text-[22px] leading-[30px] lg:text-High-md-bold lg:leading-[34px] text-tertiary-normal-default text-right">
                Trusted Partners, Unforgettable Journeys
              </h2>
              <p className="font-raleway font-medium text-[14px] leading-[22px] lg:text-md-Medium lg:leading-[26px] text-primary-dark-active text-right">
                Team up with our trusted tour partners for smooth, stress-free
                adventures. With expert guides, strong local connections, and
                authentic experiences, every trip becomes more seamless,
                enriching, and fun — the perfect blend of comfort and discovery.
              </p>
              <Button variant="secondaryOutline" size="small" shape="pill">
                See All Partners
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px]">
            {PARTNERS.map((partner) => (
              <PartnerHighlightCard
                key={partner.id}
                image={partner.image}
                category={partner.category}
                className="h-[400px] md:h-[500px] lg:h-[656px]"
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
