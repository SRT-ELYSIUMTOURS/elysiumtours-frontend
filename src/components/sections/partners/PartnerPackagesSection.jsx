import React from "react";
import { classNames } from "../../../utils/classNames";

// ── Feature icons (inline SVG, keyword-matched) ───────────────────────────────

const PaxIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <circle cx="10" cy="6" r="3.5" stroke="#7b2cbf" strokeWidth="1.4" />
    <path d="M3 17c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#7b2cbf" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const LuggageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <rect x="5" y="7" width="10" height="10" rx="1.5" stroke="#7b2cbf" strokeWidth="1.4" />
    <path d="M7 7V5.5A1.5 1.5 0 0 1 8.5 4h3A1.5 1.5 0 0 1 13 5.5V7" stroke="#7b2cbf" strokeWidth="1.4" />
    <path d="M10 10v3M8 11.5h4" stroke="#7b2cbf" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const ACIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="M10 3v14M10 3l-2 2M10 3l2 2M10 17l-2-2M10 17l2-2" stroke="#7b2cbf" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M3 10h14M3 10l2-2M3 10l2 2M17 10l-2-2M17 10l-2 2" stroke="#7b2cbf" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const WifiIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="M2.5 8.5C5.5 5.5 14.5 5.5 17.5 8.5" stroke="#7b2cbf" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M5.5 11.5C7.17 9.83 12.83 9.83 14.5 11.5" stroke="#7b2cbf" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M8.5 14.5C9.33 13.67 10.67 13.67 11.5 14.5" stroke="#7b2cbf" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="10" cy="16.5" r="0.8" fill="#7b2cbf" />
  </svg>
);

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="M10 2l2.4 5 5.5.8-4 3.9.95 5.5L10 14.5l-4.85 2.7.95-5.5-4-3.9 5.5-.8z"
      stroke="#7b2cbf" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DriverIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <circle cx="10" cy="6" r="3.5" stroke="#7b2cbf" strokeWidth="1.4" />
    <path d="M4 17c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#7b2cbf" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M7 6h6" stroke="#7b2cbf" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const GroupIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <circle cx="7" cy="6" r="2.5" stroke="#7b2cbf" strokeWidth="1.4" />
    <circle cx="13" cy="6" r="2.5" stroke="#7b2cbf" strokeWidth="1.4" />
    <path d="M1 17c0-2.761 2.239-5 5-5h2" stroke="#7b2cbf" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M8 17c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="#7b2cbf" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const CarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="M3 11l1.5-4h11L17 11" stroke="#7b2cbf" strokeWidth="1.4" strokeLinecap="round" />
    <rect x="2" y="11" width="16" height="5" rx="1" stroke="#7b2cbf" strokeWidth="1.4" />
    <circle cx="6" cy="16.5" r="1.5" stroke="#7b2cbf" strokeWidth="1.2" />
    <circle cx="14" cy="16.5" r="1.5" stroke="#7b2cbf" strokeWidth="1.2" />
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <circle cx="10" cy="10" r="7.5" stroke="#7b2cbf" strokeWidth="1.4" />
    <path d="M7 10l2 2 4-4" stroke="#7b2cbf" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
    <path d="M2 5.5h7M6.5 3l2.5 2.5-2.5 2.5" stroke="#7b2cbf" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function FeatureIcon({ text }) {
  const t = text.toLowerCase();
  if (t.includes("pax") || t.includes("passenger")) return <PaxIcon />;
  if (t.includes("luggage") || t.includes("bag"))    return <LuggageIcon />;
  if (t.includes("ac") || t.includes("air con"))     return <ACIcon />;
  if (t.includes("wi-fi") || t.includes("wifi"))     return <WifiIcon />;
  if (t.includes("vip") || t.includes("premium") || t.includes("luxury")) return <StarIcon />;
  if (t.includes("chauffeur") || t.includes("driver")) return <DriverIcon />;
  if (t.includes("group") || t.includes("spacious") || t.includes("bus") || t.includes("van")) return <GroupIcon />;
  if (t.includes("sedan") || t.includes("suv") || t.includes("vehicle") || t.includes("car")) return <CarIcon />;
  return <CheckIcon />;
}

// ── Static package definitions ────────────────────────────────────────────────

const ACCOMMODATION_PACKAGES = [
  {
    id:          "standard-room",
    title:       "STANDARD ROOM",
    price:       "GH₵ 350 / night",
    description: "Comfortable room with essential amenities for a restful stay",
    highlighted: true,
    features:    ["1–2 guests", "Free Wi-Fi", "AC room", "Daily housekeeping"],
  },
  {
    id:          "deluxe-room",
    title:       "DELUXE ROOM",
    price:       "GH₵ 550 / night",
    description: "Spacious room with upgraded furnishings and garden or pool view",
    highlighted: false,
    features:    ["1–2 guests", "Free Wi-Fi", "Premium amenities", "Mini bar"],
  },
  {
    id:          "junior-suite",
    title:       "JUNIOR SUITE",
    price:       "GH₵ 850 / night",
    description: "Separate living area with king-size bed and enhanced services",
    highlighted: false,
    features:    ["1–3 guests", "VIP service", "Lounge access", "Chauffeur pickup"],
  },
  {
    id:          "executive-suite",
    title:       "EXECUTIVE SUITE",
    price:       "GH₵ 1,500 / night",
    description: "Luxury suite with panoramic views and full concierge service",
    highlighted: false,
    features:    ["1–4 guests", "VIP service", "Premium brands", "Private butler"],
  },
];

const TRANSPORT_PACKAGES = [
  {
    id:          "standard-sedan",
    title:       "STANDARD SEDAN",
    price:       "GH₵ 100",
    description: "Ideal for solo travelers and small groups",
    highlighted: true,
    features:    ["1–3 passengers", "2 luggage", "AC vehicle", "Wi-Fi"],
  },
  {
    id:          "premium-suv",
    title:       "PREMIUM SUV",
    price:       "GH₵ 180",
    description: "Extra space and comfort for families",
    highlighted: false,
    features:    ["1–5 passengers", "4 luggage", "Luxury SUV", "Premium amenities"],
  },
  {
    id:          "van-minibus",
    title:       "VAN / MINIBUS",
    price:       "GH₵ 250",
    description: "Perfect for groups and corporate travel",
    highlighted: false,
    features:    ["6–14 passengers", "Group travel", "Spacious"],
  },
  {
    id:          "executive-luxury",
    title:       "EXECUTIVE LUXURY SEDAN",
    price:       "GH₵ 300",
    description: "For important meetings and VIP guests",
    highlighted: false,
    features:    ["1–3 passengers", "VIP service", "Premium brands", "Chauffeur"],
  },
  {
    id:          "airport-transfer",
    title:       "AIRPORT TRANSFER",
    price:       "GH₵ 300",
    description: "Seamless transfers to and from the airport",
    highlighted: false,
    features:    ["1–3 passengers", "Flight tracking", "Meet & greet", "Chauffeur"],
  },
  {
    id:          "corporate-fleet",
    title:       "CORPORATE FLEET",
    price:       "GH₵ 300",
    description: "Dedicated vehicles for business travel",
    highlighted: false,
    features:    ["1–5 passengers", "VIP service", "Premium brands", "Chauffeur"],
  },
];

// ── Package card ──────────────────────────────────────────────────────────────

const PackageCard = ({ pkg, onBook }) => (
  <article
    className="group flex flex-col w-full rounded-[40px] border border-solid border-[rgba(123,44,191,0.15)] hover:border-secondary-normal-default p-5 bg-white gap-[60px] shadow-[0px_4px_10px_rgba(0,0,0,0.05)] transition-colors duration-200"
  >
    {/* Top: header card + description + features */}
    <div className="flex flex-col gap-6">
      {/* Coloured header card */}
      <div className="h-[166px] rounded-3xl px-4 py-[18px] flex flex-col justify-between bg-secondary-light-default group-hover:bg-gradient-to-l group-hover:from-[#ede8f2] group-hover:to-[#ce95ff] transition-all duration-200">
          {/* Title badge */}
          <span className="inline-flex self-start items-center px-3 py-1.5 rounded-full bg-white">
            <span className="font-raleway font-semibold text-[13px] text-tertiary-normal-default leading-[18px] whitespace-nowrap">
              {pkg.title}
            </span>
          </span>
          {/* Price */}
          <span className="font-['Inter',sans-serif] font-bold text-[28px] text-tertiary-dark-default leading-normal">
            {pkg.price}
          </span>
        </div>

        {/* Description */}
        <p className="font-raleway font-normal text-base text-tertiary-normal-default leading-[22px] px-4">
          {pkg.description}
        </p>

        {/* Features */}
        <ul className="flex flex-col gap-6 pl-4">
          {pkg.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2.5">
              <span className="flex-shrink-0 w-5 h-5">
                <FeatureIcon text={feature} />
              </span>
              <span className="font-raleway font-normal text-[20px] text-tertiary-normal-default leading-[22px]">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Book Now button */}
      <div className="px-4">
        <button
          type="button"
          onClick={() => onBook?.(pkg)}
          aria-label={`Book ${pkg.title.toLowerCase()}`}
          className="w-full flex items-center justify-center gap-4 px-12 py-[18px] rounded-[40px] bg-secondary-normal-default text-primary-light-default font-raleway font-semibold text-base leading-[22px] shadow-[0px_4px_4px_rgba(0,0,0,0.05)] hover:bg-secondary-normal-hover active:bg-secondary-normal-active transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-normal-default"
        >
          Book Now
        </button>
      </div>
    </article>
);

// ── Section header ────────────────────────────────────────────────────────────

const PackagesSectionHeader = ({ description }) => (
  <div className="flex items-start justify-between w-full">
    {/* Left: eyebrow */}
    <div className="flex items-center gap-2">
      <div className="w-[46px] h-0.5 bg-secondary-dark-darker" aria-hidden />
      <span className="font-raleway font-bold text-[13px] text-secondary-dark-darker leading-[18px] tracking-wide uppercase">
        Packages
      </span>
    </div>
    {/* Right: sub-description */}
    {description && (
      <p className="font-raleway font-normal text-base text-tertiary-normal-default leading-[22px] text-right max-w-[565px]">
        {description}
      </p>
    )}
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────

const CATEGORY_DESCRIPTIONS = {
  transportation: "Select a vehicle package that suits your needs and budget",
  accommodation:  "Choose the room type that fits your stay",
};

const CATEGORY_DEFAULTS = {
  transportation: TRANSPORT_PACKAGES,
  accommodation:  ACCOMMODATION_PACKAGES,
};

const PartnerPackagesSection = ({
  category,
  packages,
  onBook,
  onCustomBooking,
}) => {
  if (category !== "transportation" && category !== "accommodation") return null;

  const cards = packages ?? CATEGORY_DEFAULTS[category] ?? [];
  if (cards.length === 0) return null;

  return (
    <section aria-labelledby="packages-heading" className="w-full flex flex-col gap-[63px]">
      <PackagesSectionHeader description={CATEGORY_DESCRIPTIONS[category]} />

      {/* Cards grid — 1 col → 2 col → 3 col */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[38px]">
        {cards.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} onBook={onBook} />
        ))}
      </div>

      {/* Custom booking link */}
      <div className="flex items-center justify-center gap-2.5">
        <p className="font-raleway font-normal text-[20px] text-tertiary-normal-default leading-[22px]">
          To make a custom booking,
        </p>
        <button
          type="button"
          onClick={onCustomBooking}
          className="inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-normal-default rounded-sm cursor-pointer"
          aria-label="Click here to make a custom booking"
        >
          <span className="font-raleway font-semibold text-[20px] text-secondary-normal-default leading-[18px]">
            Click here
          </span>
          <ArrowRightIcon />
        </button>
      </div>
    </section>
  );
};

export default PartnerPackagesSection;
