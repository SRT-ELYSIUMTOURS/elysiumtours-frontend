import React from "react";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/classNames";
import CountryTourCard from "../../cards/CountryTourCard";

// Figma: 1914:37543 — Frame 7, y=0 in content block, h=701
// Header: "TOUR BY COUNTRIES" left / "Journey Through the Heart of West Africa with Elysium Tours" right
// Grid: Frame 99 — 4-col × 2-row, each card 331×192, gap-x 32px, gap-y 40px
const COUNTRIES = [
  { country: "Ghana", slug: "ghana", image: "https://picsum.photos/seed/country-ghana/331/192" },
  { country: "Nigeria", slug: "nigeria", image: "https://picsum.photos/seed/country-nigeria/331/192" },
  { country: "Togo", slug: "togo", image: "https://picsum.photos/seed/country-togo/331/192" },
  { country: "Benin", slug: "benin", image: "https://picsum.photos/seed/country-benin/331/192" },
  { country: "Ivory Coast", slug: "ivory-coast", image: "https://picsum.photos/seed/country-ivory/331/192" },
  { country: "Senegal", slug: "senegal", image: "https://picsum.photos/seed/country-senegal/331/192" },
  { country: "Sierra Leone", slug: "sierra-leone", image: "https://picsum.photos/seed/country-sierra/331/192" },
  { country: "Cameroon", slug: "cameroon", image: "https://picsum.photos/seed/country-cameroon/331/192" },
];

const TourByCountriesSection = React.forwardRef(({ className, ...props }, ref) => {
  const navigate = useNavigate();

  return (
    <section
      ref={ref}
      className={classNames("w-full bg-secondary-light-default py-[80px]", className)}
      {...props}
    >
      <div className="px-[156px]">
        {/* Section header — Figma Frame 100, h=54 */}
        <div className="flex items-start justify-between w-full mb-[94px]">
          {/* Left — line + label */}
          <div className="flex items-center gap-[8px] shrink-0">
            <div className="w-[46px] h-[1px] bg-secondary-dark-darker" />
            <span className="font-raleway font-bold text-[13px] leading-[18px] text-secondary-dark-darker whitespace-nowrap tracking-[0.05em] uppercase">
              Tour By Countries
            </span>
          </div>

          {/* Right — title only (no desc/button for this section) */}
          <div className="w-[795px]">
            <h2 className="font-raleway font-bold text-[25px] leading-[34px] text-tertiary-normal-default text-right">
              Journey Through the Heart of West Africa with Elysium Tours
            </h2>
          </div>
        </div>

        {/* 4×2 grid — gap-x: 32px (363-331=32), gap-y: 40px (424-192-192=40) */}
        <div className="grid grid-cols-4 gap-x-[32px] gap-y-[40px]">
          {COUNTRIES.map((c) => (
            <CountryTourCard
              key={c.slug}
              country={c.country}
              image={c.image}
              onClick={() => navigate(`/tours/${c.slug}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

TourByCountriesSection.displayName = "TourByCountriesSection";
export default TourByCountriesSection;
