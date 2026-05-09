import React from "react";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/classNames";
import BlogSectionHeader from "./BlogSectionHeader";
import PartnerHighlightCard from "../../cards/PartnerHighlightCard";

const PARTNERS = [
  { id: 1, category: "Accommodation", image: "https://picsum.photos/seed/ps1/451/656" },
  { id: 2, category: "Transportation", image: "https://picsum.photos/seed/ps2/451/656" },
  { id: 3, category: "Dinning", image: "https://picsum.photos/seed/ps3/451/656" },
];

const PartnerSpotlightPreview = React.forwardRef(({ className, ...props }, ref) => {
  const navigate = useNavigate();
  return (
    <section
      ref={ref}
      className={classNames(
        "w-full bg-secondary-light-default py-[80px]",
        className
      )}
      {...props}
    >
      <div className="mx-4 md:mx-8 lg:mx-[156px]">
        <BlogSectionHeader
          label="PARTNER SPOTLIGHT"
          title="Building Meaningful Journeys Together"
          description="From local artisans to eco-lodges and travel innovators, our partners bring each journey to life. 'Partner Spotlight' celebrates their dedication, creativity, and collaboration with Elysium in shaping responsible and memorable travel experiences across West Africa and beyond."
          onButtonClick={() => navigate("/blog/partner-spotlight")}
        />

        {/* 1-col on mobile, 3-col on md+ */}
        <div className="mt-10 lg:mt-[80px] grid grid-cols-1 md:grid-cols-3 gap-xl">
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
});

PartnerSpotlightPreview.displayName = "PartnerSpotlightPreview";
export default PartnerSpotlightPreview;
