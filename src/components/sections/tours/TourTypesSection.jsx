import React from "react";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/classNames";
import HighlightCard from "../../cards/HighlightCard";

// Downloaded from Figma asset server
const sectionLine = "/ElysiumAssets/section-line.svg";
const leisureBg = "/ElysiumAssets/leisure-tours-bg.png";
const businessBg = "/ElysiumAssets/business-tours-bg.png";
const ekolureBg = "/ElysiumAssets/ekolure-tours-bg.png";

// Figma node 1903-25379 — TourTypesSection
// Section bg: #f2eaf9 (Violet-Secondary 30%/Light)
// Header: pt-[80px] px-[156px] — flex justify-between items-start
// Cards row: flex gap-[32px] — starts at Figma y=322 → margin-top 96px from header bottom
//   (322px - 80px top - 146px header height = 96px gap)

// Per Figma, each card has different overlay opacity and subtitle colour:
const TOUR_TYPES = [
  {
    id: 1,
    category: "leisure",
    label: "Leisure Tours",
    subtitleColor: "#dedede",           // Figma: I1903:25391;98:234 — #dedede
    overlayColor: "rgba(0,0,0,0.7)",   // Figma: bg-[rgba(0,0,0,0.7)]
    image: leisureBg,
    type: "leisure",
  },
  {
    id: 2,
    category: "business",
    label: "Business Tours",
    subtitleColor: "#f7f7f7",           // Figma: I1903:25392;98:234 — #f7f7f7
    overlayColor: "rgba(0,0,0,0.7)",   // Figma: bg-[rgba(0,0,0,0.7)]
    image: businessBg,
    type: "business",
  },
  {
    id: 3,
    category: "ekolure",
    label: "Ekolure Tours",
    subtitleColor: "#fefefe",           // Figma: I1903:25393;98:234 — #fefefe (inherited)
    overlayColor: "rgba(0,0,0,0.5)",   // Figma: bg-[rgba(0,0,0,0.5)] — lighter than other two
    image: ekolureBg,
    type: "ekolure",
  },
];

const TourTypesSection = React.forwardRef(({ className, tours, ...props }, ref) => {
  const counts = React.useMemo(() => {
    if (!tours) return null;
    return tours.reduce((acc, t) => {
      if (t.category) acc[t.category] = (acc[t.category] || 0) + 1;
      return acc;
    }, {});
  }, [tours]);

  const navigate = useNavigate();
  return (
    <section
      ref={ref}
      className={classNames(
        "w-full bg-[#f2eaf9] py-10 md:py-16 lg:py-20",
        className
      )}
      {...props}
    >
      <div className="px-4 md:px-10 lg:px-[156px]">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-10 md:mb-20">

          {/* Left */}
          <div className="flex items-center gap-2 shrink-0">
            <img
              src={sectionLine}
              alt=""
              className="w-[46px] h-[2px]"
            />
            <span className="font-raleway font-bold text-sm text-[#2b0f43] whitespace-nowrap">
              TYPES OF TOURS
            </span>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4 md:items-end w-full md:max-w-[600px]">

            <h2 className="font-raleway font-bold 
              text-lg md:text-xl lg:text-2xl 
              text-[#2d2d2d] text-left md:text-right">
              Tours: Designed for Every Traveller
            </h2>

            <p className="font-raleway 
              text-sm md:text-base 
              text-[#2d2d2d] 
              text-left md:text-right">
              Elysium Tours offers experiences tailored to every journey.
              Whether you're unwinding with our Leisure Tours, handling
              official travel through our Business Tours, or blending both
              worlds with our Bleisure Tours.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="
          flex flex-col md:flex-row flex-wrap
          gap-6 md:gap-8 md:justify-between
          overflow-x-auto md:overflow-visible
        ">
          {TOUR_TYPES.map((t) => {
            const n = counts ? (counts[t.category] || 0) : null;
            const subtitle = n !== null
              ? `${n} experience${n !== 1 ? "s" : ""} available`
              : t.label === "Leisure Tours" ? "24 experience available"
              : t.label === "Business Tours" ? "24 curated programmes"
              : "12 eco & cultural immersion";
            return (
              <HighlightCard
                key={t.id}
                image={t.image}
                category={t.label}
                subtitle={subtitle}
                subtitleColor={t.subtitleColor}
                overlayColor={t.overlayColor}
                labelClassName="absolute left-4 bottom-4"
                className="
                  w-full
                  md:w-[300px] lg:w-[451px]
                  h-[400px] md:h-[500px] lg:h-[656px]
                  shrink-0
                                  cursor-pointer

                "
              />
            );
          })}
        </div>

      </div>
    </section>
  );
});
TourTypesSection.displayName = "TourTypesSection";
export default TourTypesSection;
