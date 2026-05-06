import React, { useState } from "react";
import { classNames } from "../../../utils/classNames";
import CustomizeTourModal from "../../ui/CustomizeTourModal";
import CustomTourResultModal from "../../ui/CustomTourResultModal";
import IdealTripFormModal from "../../ui/IdealTripFormModal";

/** Corner SVGs: `ctabgTL.svg` (top-left), `ctabgBR.svg` (bottom-right). */
const ASSETS = {
  decorTopLeft: "/svg/ctabgTL.svg",
  decorBottomRight: "/svg/ctabgBR.svg",
  iconItinerary:
    "/svg/maps.svg",
  iconGuide:
    "/svg/location.svg",
  iconPayment:
    "/svg/credit-card.svg",
  iconAmend:
    "/svg/exchange.svg",
};

const FEATURES = [
  {
    title: "Tailored Itinerary",
    body: "Every stop, activity, and accommodation selected specifically for you — nothing generic, nothing wasted.",
    icon: ASSETS.iconItinerary,
  },
  {
    title: "Dedicated Local Guide",
    body: "We match you with a vetted guide who knows your destination deeply and speaks your language.",
    icon: ASSETS.iconGuide,
  },
  {
    title: "Flexible Payment",
    body: "Pay via Mobile Money (MTN MoMo, Vodafone Cash), card, or bank transfer — whatever works best for you.",
    icon: ASSETS.iconPayment,
  },
  {
    title: "Free Amendments",
    body: "Plans change — we get it. Amend your custom tour up to 7 days before departure at no extra cost.",
    icon: ASSETS.iconAmend,
  },
];

const PILLS = [
  "Flexible Dates",
  "Any Group Size",
  "Your Interests",
  "Any Budget",
];

const CustomTourSection = React.forwardRef(({ className, style, ...props }, ref) => {
  const [customTourModalOpen, setCustomTourModalOpen] = useState(false);
  const [idealTripFormOpen, setIdealTripFormOpen] = useState(false);
  const [tripResultOpen, setTripResultOpen] = useState(false);
  const [tripResultVariant, setTripResultVariant] = useState("success");

  return (
    <section
      ref={ref}
      className={classNames(
        "relative overflow-hidden py-16 md:py-20 lg:py-[96px]",
        className
      )}
      style={{
        background:
          "radial-gradient(80% 55% at 5% 50%, rgba(123, 44, 191, 0.30) 0%, rgba(123, 44, 191, 0.00) 65%), radial-gradient(60% 40% at 95% 20%, rgba(201, 168, 76, 0.12) 0%, rgba(201, 168, 76, 0.00) 55%), #2b0f43",
        ...style,
      }}
      {...props}
    >
      <img
        src={ASSETS.decorTopLeft}
        alt=""
        width={508}
        height={501}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute left-0 top-0 z-[1] hidden h-auto w-[min(42vw,360px)] max-w-none -translate-x-[40%] -translate-y-[30%] opacity-70 md:block"
        aria-hidden
      />
      <img
        src={ASSETS.decorBottomRight}
        alt=""
        width={508}
        height={501}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute bottom-0 right-0 z-[1] hidden h-auto w-[min(42vw,360px)] max-w-none translate-x-[40%] translate-y-[30%] opacity-70 md:block"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[18%] top-1/2 z-[0] hidden h-[760px] w-[360px] -translate-y-1/2 rotate-[22deg] rounded-[6px] bg-[#EBDFF50D] lg:block xl:right-[22%]"
        aria-hidden
      />

      <div className="relative z-[2] mx-auto max-w-[1728px] px-6 md:px-[30px] lg:px-[164px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <div className="flex max-w-[577px] flex-col gap-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-[18px]">
                <h2 className="font-raleway text-[clamp(2rem,4vw,3.125rem)] font-black leading-[1.1] tracking-[-0.5px] text-white">
                  <span className="block">Can&apos;t Find</span>
                  <span className="block">
                    Your{" "}
                    <span className="text-[#ebdff5]">Perfect Tour?</span>
                  </span>
                </h2>
                <p className="font-[Inter,sans-serif] text-[15px] font-normal leading-[27px] text-[rgba(235,223,245,0.78)]">
                  Tell us your dream itinerary and our local travel experts will
                  build a personalised experience around you — your dates, your
                  interests, your pace. Usually ready within 24 hours.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {PILLS.map((label) => (
                  <span
                    key={label}
                    className="inline-flex h-[34px] items-center rounded-[40px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.08)] px-4 font-raleway text-[13px] font-medium leading-none text-[rgba(255,255,255,0.88)]"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <button
                type="button"
                onClick={() => setCustomTourModalOpen(true)}
                className="inline-flex h-14 w-fit min-w-[239px] cursor-pointer items-center justify-center rounded-[40px] bg-[#f2eaf9] px-6 font-raleway text-base font-semibold leading-[22px] text-[#7b2cbf] shadow-[0_8px_28px_0_rgba(214,190,235,0.4)] transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Request a Custom Tour
              </button>
              <p className="font-raleway text-sm font-medium leading-4 text-[rgba(255,255,255,0.4)]">
                No commitment · Free to request · Response within 24 hrs
              </p>
            </div>
          </div>

          <ul className="flex min-w-0 flex-col gap-4">
            {FEATURES.map(({ title, body, icon }) => (
              <li
                key={title}
                className="flex gap-4 rounded-[16px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.07)] py-5 pl-[22px] pr-5 sm:items-start"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.1)]">
                  <img
                    src={icon}
                    alt=""
                    className="h-5 w-5 object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-2 pt-0.5">
                  <h3 className="font-raleway text-sm font-bold leading-4 text-white">
                    {title}
                  </h3>
                  <p className="font-raleway text-xs font-medium leading-[19px] text-[rgba(235,223,245,0.8)]">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {customTourModalOpen ? (
        <CustomizeTourModal
          onClose={() => setCustomTourModalOpen(false)}
          onGetStarted={() => setIdealTripFormOpen(true)}
        />
      ) : null}

      <IdealTripFormModal
        isOpen={idealTripFormOpen}
        onClose={() => setIdealTripFormOpen(false)}
        onComplete={(variant) => {
          setIdealTripFormOpen(false);
          setTripResultVariant(variant);
          setTripResultOpen(true);
        }}
      />

      <CustomTourResultModal
        isOpen={tripResultOpen}
        variant={tripResultVariant}
        onClose={() => setTripResultOpen(false)}
        onRetry={() => {
          setTripResultOpen(false);
          setIdealTripFormOpen(true);
        }}
      />
    </section>
  );
});

CustomTourSection.displayName = "CustomTourSection";

export default CustomTourSection;
