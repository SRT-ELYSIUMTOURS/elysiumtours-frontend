import React from "react";
import { classNames } from "../../../utils/classNames";
import PartnerHighlightCard from "../../cards/PartnerHighlightCard";

// Downloaded from Figma asset server
import sectionLine    from "../../../assets/ElysiumAssets/section-line.svg";
import leisureBg      from "../../../assets/ElysiumAssets/leisure-tours-bg.png";
import businessBg     from "../../../assets/ElysiumAssets/business-tours-bg.png";
import ekolureBg      from "../../../assets/ElysiumAssets/ekolure-tours-bg.png";

// Figma node 1903-25379 — TourTypesSection
// Section bg: #f2eaf9 (Violet-Secondary 30%/Light)
// Header: pt-[80px] px-[156px] — flex justify-between items-start
// Cards row: flex gap-[32px] — starts at Figma y=322 → margin-top 96px from header bottom
//   (322px - 80px top - 146px header height = 96px gap)

// Per Figma, each card has different overlay opacity and subtitle colour:
const TOUR_TYPES = [
  {
    id: 1,
    label: "Leisure Tours",
    subtitle: "24 experience available",
    subtitleColor: "#dedede",           // Figma: I1903:25391;98:234 — #dedede
    overlayColor: "rgba(0,0,0,0.7)",   // Figma: bg-[rgba(0,0,0,0.7)]
    image: leisureBg,
  },
  {
    id: 2,
    label: "Business Tours",
    subtitle: "24 curated programmes",
    subtitleColor: "#f7f7f7",           // Figma: I1903:25392;98:234 — #f7f7f7
    overlayColor: "rgba(0,0,0,0.7)",   // Figma: bg-[rgba(0,0,0,0.7)]
    image: businessBg,
  },
  {
    id: 3,
    label: "Ekolure Tours",
    subtitle: "12 eco & cultural immersion",
    subtitleColor: "#fefefe",           // Figma: I1903:25393;98:234 — #fefefe (inherited)
    overlayColor: "rgba(0,0,0,0.5)",   // Figma: bg-[rgba(0,0,0,0.5)] — lighter than other two
    image: ekolureBg,
  },
];

const TourTypesSection = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      // Figma background: #f2eaf9 (Violet-Secondary 30%/Light)
      className={classNames("w-full bg-[#f2eaf9] pt-[80px] pb-[80px]", className)}
      {...props}
    >
      <div className="px-[156px]">

        {/* ── Section header ──────────────────────────────────────────────── */}
        {/* Figma: flex justify-between items-start, full width (1416px inner) */}
        {/* mb-[96px]: gap between header bottom (80+146=226px) and cards top (322px) */}
        <div className="flex items-start justify-between w-full mb-[96px]">

          {/* Left — horizontal line SVG + "TYPES OF TOURS" label */}
          {/* Figma node 1903-25381: flex gap-[8px] items-center */}
          <div className="flex items-center gap-[8px] shrink-0">
            {/* Figma: w-[46px] h-0 with SVG stretching to fill — renders as thin horizontal line */}
            {/* SVG has width/height="100%" so intrinsic size is undefined — set explicit px dims */}
            <img
              src={sectionLine}
              alt=""
              aria-hidden="true"
              style={{ width: "46px", height: "2px", display: "block" }}
            />
            {/* Figma: Raleway Bold 13px/18px #2b0f43, p-[10px] wrapper */}
            <span className="font-raleway font-bold text-[13px] leading-[18px] text-[#2b0f43] whitespace-nowrap p-[10px]">
              TYPES OF TOURS
            </span>
          </div>

          {/* Right — title + description, w-[597px], items-end */}
          {/* Figma node 1903-25385: flex-col gap-[16px] items-end w-[597px] */}
          <div className="flex flex-col gap-[16px] items-end w-[597px]">

            {/* Title row — h-[37px], Raleway Bold 25px/34px #2d2d2d, text-right */}
            {/* Figma node 1903-25386: h-[37px] pl-[10px] py-[10px] flex items-center justify-end */}
            <div className="flex items-center justify-end h-[37px] w-full pl-[10px] py-[10px]">
              <h2 className="font-raleway font-bold text-[25px] leading-[34px] text-[#2d2d2d] text-right whitespace-nowrap">
                Tours: Designed for Every Traveller
              </h2>
            </div>

            {/* Description — h-[93px], Raleway Regular 16px/24px #2d2d2d, w-[565px], text-right */}
            {/* Figma node 1903-25388: h-[93px] pl-[10px] pr-px py-[10px] flex items-center justify-end */}
            <div className="flex items-center justify-end h-[93px] w-full pl-[10px] pr-px py-[10px]">
              <p className="font-raleway font-normal text-[16px] leading-[24px] text-[#2d2d2d] text-right w-[565px]">
                Elysium Tours offers experiences tailored to every journey. Whether
                you&apos;re unwinding with our Leisure Tours, handling official travel
                through our Business Tours, or blending both worlds with our Bleisure
                Tours, we ensure comfort, authenticity, and unforgettable moments every
                step of the way.
              </p>
            </div>

            {/* NOTE: No "Explore More" button — not present in Figma node 1903-25379 */}
          </div>
        </div>

        {/* ── Cards row ───────────────────────────────────────────────────── */}
        {/* Figma node 1903-25390: flex gap-[32px] items-center */}
        {/* Cards: 451×656px, rounded-[40px], shadow, overflow-clip */}
        <div className="flex items-center gap-[32px]">
          {TOUR_TYPES.map((t) => (
            <PartnerHighlightCard
              key={t.id}
              image={t.image}
              category={t.label}
              subtitle={t.subtitle}
              subtitleColor={t.subtitleColor}
              overlayColor={t.overlayColor}
              // Figma: label text at left-[23px] top-[595px] inside 656px card
              // = 61px from card bottom. Two-line text (28px + 26px) fits within clip bounds.
              labelClassName="absolute left-[23px] top-[595px]"
              className="w-[451px] h-[656px] shrink-0"
            />
          ))}
        </div>

      </div>
    </section>
  );
});

TourTypesSection.displayName = "TourTypesSection";
export default TourTypesSection;
