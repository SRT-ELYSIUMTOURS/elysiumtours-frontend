import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../utils/classNames";

// ── Figma asset imports ──────────────────────────────────────────────────────
// All SVGs downloaded from Figma asset server (localhost:3845)
import mapPinImg    from "../../assets/ElysiumAssets/map-pin.svg";
import starImg      from "../../assets/ElysiumAssets/star.svg";
import timeCircle5  from "../../assets/ElysiumAssets/time-circle5.svg";
import dividerLine  from "../../assets/ElysiumAssets/divider-line.svg";
import timeCircle3  from "../../assets/ElysiumAssets/time-circle3.svg";
import peopleIcon   from "../../assets/ElysiumAssets/people-icon.svg";
import award4       from "../../assets/ElysiumAssets/award4.svg";
import flashDisk2   from "../../assets/ElysiumAssets/flash-disk2.svg";
import bag4         from "../../assets/ElysiumAssets/bag4.svg";

// ── Feature icon map ─────────────────────────────────────────────────────────
// Maps featureType string → Figma SVG asset
const FEATURE_ICONS = {
  eco:      award4,
  lunch:    flashDisk2,
  business: bag4,
  // "pickup" handled separately via inline CarIcon (Figma car is 9-vector complex SVG)
};

// Inline car SVG — preserved from existing code; used when featureType="pickup"
const CarIcon = () => (
  <svg
    width="17" height="16" viewBox="0 0 17 16" fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="shrink-0 size-[16px]"
    style={{ color: "#371456" }}
  >
    <path d="M2.66675 8L4.00008 8.66667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.3333 8.33325L14 8.66659" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.33325 11.6667L6.49703 11.2572C6.74059 10.6483 6.86237 10.3439 7.11633 10.1719C7.37027 10 7.69819 10 8.35399 10H9.64585C10.3017 10 10.6296 10 10.8835 10.1719C11.1375 10.3439 11.2593 10.6483 11.5028 11.2572L11.6666 11.6667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.33325 11.3333V13.2546C2.33325 13.5071 2.49375 13.7379 2.74784 13.8509C2.91271 13.9241 3.07017 13.9999 3.26031 13.9999H4.4062C4.59633 13.9999 4.7538 13.9241 4.91867 13.8509C5.17275 13.7379 5.33325 13.5071 5.33325 13.2546V11.9999" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.6667 11.9999V13.2546C12.6667 13.5071 12.8273 13.7379 13.0813 13.8509C13.2462 13.9241 13.4037 13.9999 13.5938 13.9999H14.7397C14.9298 13.9999 15.0873 13.9241 15.2521 13.8509C15.5062 13.7379 15.6667 13.5071 15.6667 13.2546V11.3333" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.3333 5.66659L14.9999 5.33325" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.66667 5.66659L3 5.33325" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 6L4.72553 3.82339C5.01888 2.94337 5.16555 2.50335 5.51473 2.25168C5.86391 2 6.32773 2 7.25536 2H10.7447C11.6723 2 12.1361 2 12.4853 2.25168C12.8345 2.50335 12.9811 2.94337 13.2745 3.82339L14 6" stroke="currentColor" strokeLinejoin="round"/>
    <path d="M3.99992 6H13.9999C14.6381 6.67567 15.6666 7.6166 15.6666 8.6664V10.9801C15.6666 11.3605 15.4136 11.6805 15.0778 11.725L12.9999 12H4.99992L2.92203 11.725C2.58629 11.6805 2.33325 11.3605 2.33325 10.9801V8.6664C2.33325 7.6166 3.36178 6.67567 3.99992 6Z" stroke="currentColor" strokeLinejoin="round"/>
  </svg>
);

// Heart / wishlist icon — exact Figma SVG; outline (#7B2CBF) by default, solid red when wishlisted
const HeartIcon = ({ wishlisted }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20" height="18" viewBox="0 0 20 18"
    fill={wishlisted ? "#ef4444" : "none"}
    aria-hidden="true"
  >
    <path
      d="M6.74806 15.4725C8.27165 17.7191 11.5817 17.7191 13.1053 15.4725L18.334 7.7624C19.3066 6.32821 19.3594 4.45126 18.4795 2.9584C16.7219 -0.0235493 12.3669 0.0189135 10.7093 3.05758C10.3714 3.67696 9.48198 3.67696 9.1441 3.05757C7.48651 0.0189173 3.13153 -0.0235269 1.37394 2.9584C0.494026 4.45126 0.546825 6.3282 1.51943 7.76239L6.74806 15.4725Z"
      stroke={wishlisted ? "#ef4444" : "#7B2CBF"}
      strokeWidth="1.5"
    />
  </svg>
);

// ── PopularTourCard ──────────────────────────────────────────────────────────
// Figma: "Popular tours Cards" component — 351×615px
// Used in: TourFeaturedSection, SignatureExperiencesSection, FeaturedToursSection (home), TourDetailPage
//
// Prop mapping (backward-compat):
//   duration.class → type badge text ("Multi-Day" | "Day Tour")
//   duration.span  → duration text in info row ("3 Days", "8 hours", etc.)
//   availabilityBadge → availability text in body ("Opened Daily")
//   pickupIncluded → if true & no featureType, defaults to pickup feature
//   NEW: statusBadge {label, color} — optional coloured badge after type badge
//   NEW: featureType "eco"|"lunch"|"business"|"pickup" — explicit feature icon
//   NEW: featureLabel — text next to feature icon
//   NEW: reviewCount — number of reviews (default 231)

const PopularTourCard = React.forwardRef(
  (
    {
      // ── Existing props (preserved for backward compat) ──
      image,
      location       = "Cape coast/Ghana",
      rating         = 4.9,
      title          = "Tour",
      availabilityBadge = "Opened Daily",
      price          = "Ghs.400.00",
      tags           = [],
      duration       = { class: "Multi-Day", span: "3 Days" },
      maxGroupSize   = 12,
      pickupIncluded = false,
      country,
      tourSlug,
      onClick,
      className      = "",
      // ── New Figma-exact props ──
      statusBadge    = null,   // {label: string, color: string} | null
      featureType    = null,   // "eco"|"lunch"|"business"|"pickup"|null
      featureLabel   = null,   // override text next to feature icon
      reviewCount    = 231,
      ...props
    },
    ref
  ) => {
    const navigate = useNavigate();
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleClick = (e) => {
      if (onClick) {
        onClick(e);
      } else if (country && tourSlug) {
        navigate(`/tours/${country}/${tourSlug}`);
      }
    };

    // Resolve feature type — explicit prop wins over legacy pickupIncluded
    const resolvedFeatureType  = featureType ?? (pickupIncluded ? "pickup" : null);
    const resolvedFeatureLabel = featureLabel ?? (pickupIncluded ? "Pickup Included" : null);

    // Render the correct feature icon
    const renderFeatureIcon = () => {
      if (resolvedFeatureType === "pickup") return <CarIcon />;
      if (FEATURE_ICONS[resolvedFeatureType]) {
        return (
          <img
            src={FEATURE_ICONS[resolvedFeatureType]}
            alt=""
            aria-hidden="true"
            className="shrink-0 size-[16px] overflow-clip"
          />
        );
      }
      return null;
    };

    return (
      <div
        ref={ref}
        onClick={handleClick}
        // Figma: w-351 h-615, flex-col gap-12, p-10, items-center justify-center
        className={classNames(
          "relative flex flex-col gap-[12px] items-center justify-center p-[10px]",
          "w-[351px] h-[615px] shrink-0",
          "cursor-pointer hover:-translate-y-1 transition-transform duration-300 ease-in",
          className
        )}
        {...props}
      >
        {/* ── IMAGE SECTION ───────────────────────────────────────────────── */}
        {/* Figma: h-373 w-331, rounded-[10px], overflow-clip */}
        <div className="relative h-[373px] w-[331px] shrink-0 rounded-[10px] overflow-clip">
          {/* Background image + black overlay */}
          {image ? (
            <img
              src={image}
              alt={title}
              className="absolute object-cover rounded-[10px] size-full max-w-none"
            />
          ) : (
            <div className="absolute inset-0 rounded-[10px] bg-[#7b2cbf]" />
          )}
          {/* Figma: bg-[rgba(0,0,0,0.5)] overlay */}
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] rounded-[10px]" />

          {/* Top bar — badges left, heart right, all center-aligned on one row
              Single absolute row so everything shares the same baseline */}
          <div className="absolute top-[22px] left-[12px] right-[12px] flex items-center gap-[8px]">
            {/* Duration type badge */}
            <div className="h-[24px] backdrop-blur-[50px] bg-[rgba(254,254,254,0.9)] flex items-center justify-center px-[10px] rounded-[16px] shrink-0">
              <span className="font-raleway font-semibold text-[10px] text-[#622399] leading-none whitespace-nowrap">
                {duration.class}
              </span>
            </div>

            {/* Status badge (optional) */}
            {statusBadge && (
              <div
                className="h-[24px] backdrop-blur-[50px] flex items-center justify-center px-[10px] rounded-[16px] shrink-0"
                style={{ backgroundColor: statusBadge.color }}
              >
                <span className="font-raleway font-semibold text-[10px] text-[#ebdff5] leading-none whitespace-nowrap">
                  {statusBadge.label}
                </span>
              </div>
            )}

            {/* Heart / wishlist button — pushed to the far right */}
            <button
              onClick={(e) => { e.stopPropagation(); setIsWishlisted((v) => !v); }}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className="ml-auto bg-white size-[34px] shrink-0 rounded-full flex items-center justify-center cursor-pointer"
            >
              <HeartIcon wishlisted={isWishlisted} />
            </button>
          </div>

          {/* Location — bottom-left of image area
              Figma: left-[12px] top-[329px] flex items-center
                     Map icon 16px + Raleway Medium 10px/18px #fefefe p-[10px] */}
          <div className="absolute left-[12px] top-[329px] flex items-center">
            <div className="relative shrink-0 size-[16px] overflow-clip">
              <img src={mapPinImg} alt="" aria-hidden="true" className="block size-full max-w-none" />
            </div>
            <div className="flex items-center justify-center p-[10px]">
              <span className="font-raleway font-medium text-[10px] text-[#fefefe] leading-[18px] whitespace-nowrap">
                {location}
              </span>
            </div>
          </div>

          {/* Rating badge — bottom-right of image area
              Figma: left-[237px] top-[336px] h-[24px] bg-[#ebdff5] px-[10px] py-[8px] rounded-[16px]
                     Star 18×19px + "4.9" SemiBold 10px #7b2cbf + dot 2px + "231" Medium 10px #565656 60% */}
          <div className="absolute left-[237px] top-[336px] h-[24px] bg-[#ebdff5] flex items-center justify-center px-[10px] rounded-[16px]">
            <img
              src={starImg}
              alt="Rating"
              className="h-[18px] w-[19px] shrink-0"
            />
            <div className="flex gap-[4px] items-center">
              <span className="font-raleway font-semibold text-[10px] text-[#7b2cbf] text-center leading-none whitespace-pre">
                {rating}{"  "}
              </span>
              <div className="size-[2px] bg-[#7b2cbf] rounded-full shrink-0" />
              <span className="font-raleway font-medium text-[10px] text-[#565656] opacity-60 text-center leading-[18px] whitespace-nowrap">
                {reviewCount}
              </span>
            </div>
          </div>
        </div>

        {/* ── BODY SECTION ────────────────────────────────────────────────── */}
        {/* Figma: flex-col gap-[4px] h-[210px] py-[8px] w-[330px] */}
        <div className="flex flex-col gap-[4px] h-[210px] items-start py-[8px] w-[330px]">

          {/* ── Group 1: Tags + Info row + Divider ── */}
          {/* Figma: flex-col gap-[4px] w-[326px] */}
          <div className="flex flex-col gap-[4px] items-start w-[326px]">

            {/* Tag pills
                Figma: flex gap-[10px] items-center
                       pill: h-[28px] px-[9px] border-[0.5px] border-[#6f6f6f] rounded-[20px]
                       text: Raleway Medium 10px/18px #565656 */}
            <div className="flex gap-[10px] items-center">
              {tags.map((tag, i) => (
                <div
                  key={i}
                  className="border-[0.5px] border-[#6f6f6f] h-[28px] flex items-center px-[9px] rounded-[20px] shrink-0"
                >
                  <div className="flex h-full items-center justify-center p-[10px]">
                    <span className="font-raleway font-medium text-[10px] text-[#565656] leading-[18px] whitespace-nowrap">
                      {tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Info row: duration | group size | feature
                Figma: flex gap-[12px] items-start w-[303px]
                       each item: icon 16px + Raleway Medium 10px #371456 */}
            <div className="flex gap-[12px] items-start w-[303px]">

              {/* Duration */}
              <div className="flex h-[33px] items-center shrink-0">
                <div className="overflow-clip shrink-0 size-[16px]">
                  <img src={timeCircle3} alt="" aria-hidden="true" className="block size-full max-w-none" />
                </div>
                <div className="flex h-[29px] items-center justify-center p-[10px]">
                  <span className="font-raleway font-medium text-[10px] text-[#371456] leading-[18px] whitespace-nowrap">
                    {duration.span}
                  </span>
                </div>
              </div>

              {/* Group size */}
              <div className="flex gap-[4px] h-[33px] items-center shrink-0">
                <div className="overflow-clip shrink-0 size-[16px]">
                  <img src={peopleIcon} alt="" aria-hidden="true" className="block size-full max-w-none" />
                </div>
                <div className="flex h-[29px] items-center justify-center p-[10px] w-[50px]">
                  <span className="font-raleway font-medium text-[10px] text-[#371456] leading-[18px] whitespace-nowrap">
                    Max {maxGroupSize}
                  </span>
                </div>
              </div>

              {/* Feature (eco/lunch/business/pickup) — optional */}
              {resolvedFeatureType && resolvedFeatureLabel && (
                <div className="flex gap-[4px] h-[33px] items-center w-[104px]">
                  {renderFeatureIcon()}
                  <div className="flex h-[29px] items-center py-[10px] w-[84px]">
                    <span className="font-raleway font-medium text-[10px] text-[#371456] leading-[18px] whitespace-nowrap">
                      {resolvedFeatureLabel}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Divider line
                Figma: h-0 w-[327px] relative, absolute inset-[-8.5px_-2.6%]
                       SVG line (780c3c7d...) — visual only, no layout height */}
            <div className="h-0 w-[327px] relative shrink-0">
              <div className="absolute" style={{ inset: "-8.5px -2.6%" }}>
                <img
                  src={dividerLine}
                  alt=""
                  aria-hidden="true"
                  className="block size-full max-w-none"
                />
              </div>
            </div>
          </div>

          {/* ── Group 2: Title + Availability + Price ── */}
          {/* Figma: flex-col h-[129px] items-start pr-[10px] pt-[10px] w-[330px] */}
          <div className="flex flex-col h-[129px] items-start pr-[10px] pt-[10px] w-[330px]">

            {/* Title + availability sub-group */}
            <div className="flex flex-col gap-[4px] items-start">
              {/* Title row — h-[28px], Raleway SemiBold 20px/28px #2d2d2d */}
              <div className="flex h-[28px] items-center justify-center w-[330px]">
                <h3 className="flex-1 font-raleway font-semibold text-[20px] leading-[28px] text-[#2d2d2d] min-h-px min-w-px">
                  {title}
                </h3>
              </div>

              {/* Availability — h-[35px], TimeCircle5 20px + SemiBold 13px/18px #7b2cbf */}
              <div className="flex gap-[16px] h-[35px] items-center">
                <div className="flex gap-[10px] items-center justify-center py-[10px]">
                  <div className="overflow-clip shrink-0 size-[20px]">
                    <img src={timeCircle5} alt="" aria-hidden="true" className="block size-full max-w-none" />
                  </div>
                  <span className="font-raleway font-semibold text-[13px] text-[#7b2cbf] leading-[18px] whitespace-nowrap">
                    {availabilityBadge}
                  </span>
                </div>
              </div>
            </div>

            {/* Price row — "From" + price amount + "/ Person"
                Figma: flex gap-[16px] items-center
                       "From": Raleway Medium 13px/22px #2d2d2d
                       price: Raleway Bold 20px/28px #5c218f opacity-80
                       "/Person": Raleway Medium 13px/22px #2d2d2d */}
            <div className="flex gap-[16px] items-center">
              <div className="flex items-center justify-center py-[10px]">
                <span className="font-raleway font-medium text-[13px] text-[#2d2d2d] leading-[22px] whitespace-nowrap">
                  From
                </span>
              </div>
              <div className="flex h-[38px] items-center justify-center py-[10px]">
                <span className="font-raleway font-bold text-[20px] text-[#5c218f] leading-[28px] opacity-80 whitespace-nowrap">
                  {price}
                </span>
                <span className="font-raleway font-medium text-[13px] text-[#2d2d2d] leading-[22px]">
                  / Person
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PopularTourCard.displayName = "PopularTourCard";
export default PopularTourCard;
