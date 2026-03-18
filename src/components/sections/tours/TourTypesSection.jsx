import React from "react";
import { classNames } from "../../../utils/classNames";
import PartnerHighlightCard from "../../cards/PartnerHighlightCard";
import Button from "../../ui/button";

// Figma: 1914:37642 — Frame 8, h=1058
// Header: "TYPES OF TOURS" left / "Tours: Designed for Every Traveller" right + desc
// 3 PartnerHighlightCards (451×656px) at x=156, y=322, gap 32px
const TOUR_TYPES = [
  {
    id: 1,
    label: "Leisure Tours",
    image: "https://picsum.photos/seed/tourtype-leisure/451/656",
  },
  {
    id: 2,
    label: "Business Tours",
    image: "https://picsum.photos/seed/tourtype-business/451/656",
  },
  {
    id: 3,
    label: "Bleisure Tours",
    image: "https://picsum.photos/seed/tourtype-bleisure/451/656",
  },
];

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.33325 6.25C1.91904 6.25 1.58325 6.58579 1.58325 7C1.58325 7.41421 1.91904 7.75 2.33325 7.75V7V6.25ZM11.6666 7.75C12.0808 7.75 12.4166 7.41421 12.4166 7C12.4166 6.58579 12.0808 6.25 11.6666 6.25V7V7.75ZM9.86121 3.55068C9.56701 3.2591 9.09214 3.26122 8.80056 3.55542C8.50898 3.84961 8.5111 4.32448 8.80529 4.61606L9.33325 4.08337L9.86121 3.55068ZM2.33325 7.75H11.6666V7V6.25H2.33325V7V7.75ZM8.80529 4.61606L9.83369 5.63533L10.8896 4.56995L9.86121 3.55068L8.80529 4.61606ZM9.83369 8.36475L8.80529 9.38402L9.86121 10.4494L10.8896 9.43014L9.83369 8.36475ZM9.83369 5.63533C10.2563 6.05416 10.5274 6.32448 10.7074 6.54863C10.8779 6.76094 10.9041 6.85793 10.911 6.91209L11.655 6.81726L12.399 6.72243C12.3427 6.28124 12.1323 5.92733 11.877 5.60938C11.6311 5.30327 11.2871 4.96395 10.8896 4.56995L9.83369 5.63533ZM10.911 7.08799C10.9041 7.14215 10.8779 7.23914 10.7074 7.45145C10.5274 7.6756 10.2563 7.94592 9.83369 8.36475L10.8896 9.43014C11.2871 9.03613 11.6311 8.69681 11.877 8.3907C12.1323 8.07275 12.3427 7.71885 12.399 7.27765L10.911 7.08799ZM10.911 6.91209C10.9184 6.9705 10.9184 7.02958 10.911 7.08799L12.399 7.27765C12.4225 7.09331 12.4225 6.90677 12.399 6.72243L10.911 6.91209Z" fill="#7B2CBF"/>
  </svg>
);

const TourTypesSection = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={classNames("w-full bg-secondary-light-default py-[80px]", className)}
      {...props}
    >
      <div className="px-[156px]">
        {/* Section header */}
        <div className="flex items-start justify-between w-full mb-[176px]">
          {/* Left — line + label */}
          <div className="flex items-center gap-[8px] shrink-0">
            <div className="w-[46px] h-[1px] bg-secondary-dark-darker" />
            <span className="font-raleway font-bold text-[13px] leading-[18px] text-secondary-dark-darker whitespace-nowrap tracking-[0.05em] uppercase">
              Types of Tours
            </span>
          </div>

          {/* Right — title + desc + button, w=597 */}
          <div className="flex flex-col gap-md items-end w-[597px]">
            <h2 className="font-raleway font-bold text-[25px] leading-[34px] text-tertiary-normal-default text-right">
              Tours: Designed for Every Traveller
            </h2>
            <p className="font-raleway font-normal text-[16px] leading-[24px] text-tertiary-normal-default text-right w-[565px]">
              Elysium Tours offers experiences tailored to every journey. Whether you're unwinding with our Leisure Tours, handling official travel through our Business Tours, or blending both worlds with our Bleisure Tours, we ensure comfort, authenticity, and unforgettable moments every step of the way.
            </p>
            <Button
              variant="secondaryOutline"
              shape="pill"
              size="small"
              className="h-[32px] gap-[9px] rounded-xl border-[0.8px]"
              endIcon={<ArrowIcon />}
            >
              Explore More
            </Button>
          </div>
        </div>

        {/* 3 PartnerHighlightCards — 451×656, gap 32px */}
        <div className="flex items-start gap-[32px]">
          {TOUR_TYPES.map((t) => (
            <PartnerHighlightCard
              key={t.id}
              image={t.image}
              category={t.label}
              className="!w-[451px] !h-[656px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
});

TourTypesSection.displayName = "TourTypesSection";
export default TourTypesSection;
