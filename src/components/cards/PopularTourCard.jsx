import React from "react";
import { classNames } from "../../utils/classNames";
import StarRating from "../ui/StarRating";

const MapIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
    <line x1="9" y1="3" x2="9" y2="18"></line>
    <line x1="15" y1="6" x2="15" y2="21"></line>
  </svg>
);

const HeartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" stroke="#7b2cbf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#7b2cbf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 21V19C6 16.7909 7.79086 15 10 15H14C16.2091 15 18 16.7909 18 19V21" stroke="#7b2cbf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
     <path d="M19 17H22V13L19.5 8H4.5L2 13V17H5M19 17C19 18.6569 17.6569 20 16 20C14.3431 20 13 18.6569 13 17C13 15.3431 14.3431 14 16 14C17.6569 14 19 15.3431 19 17ZM19 17H5M5 17C5 18.6569 3.65685 20 2 20C0.343146 20 -1 18.6569 -1 17C-1 15.3431 0.343146 14 2 14C3.65685 14 5 15.3431 5 17Z" stroke="#7b2cbf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(1 1) scale(0.9)"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
    <circle cx="12" cy="12" r="9" stroke="#7b2cbf" strokeWidth="1.5"/>
    <path d="M12 7v5l3 3" stroke="#7b2cbf" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const DurationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#7b2cbf" strokeWidth="1.5"/>
    <path d="M12 7v5l3 3" stroke="#7b2cbf" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const PopularTourCard = React.forwardRef(({
  image,
  location = "Cape coast/Ghana",
  rating = 4.9,
  reviews = 231,
  title = "Elmina Heritage & Coastal Journey",
  availabilityBadge = "Opened Daily",
  price = "Ghs.400.00",
  onClick,
  className = "",
  ...props
}, ref) => {

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={classNames(
        "relative flex flex-col w-[331px] rounded-sm",
        "bg-transparent transition-all duration-300 ease-in",
        "hover:-translate-y-1 cursor-pointer",
        className
      )}
      {...props}
    >
      {/* ── Hero Image ── */}
      <div className="relative w-full h-[373px] shrink-0 overflow-hidden rounded-sm">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-primary-normal-default" />
        )}

        {/* Top Left Badge */}
        <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-[11px] font-bold text-secondary-normal-default shadow-sm backdrop-blur-sm">
          Multi-Day
        </div>

        {/* Heart button - Top Right */}
        <button
          onClick={(e) => e.stopPropagation()}
          className={classNames(
            "absolute top-4 right-4 w-[36px] h-[36px]",
            "flex items-center justify-center",
            "bg-white rounded-full shadow-md",
            "transition-all duration-300 ease-in hover:bg-white/90"
          )}
          aria-label="Save to wishlist"
        >
          <HeartIcon />
        </button>

        {/* Bottom Overlay Gradient & Info */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 via-black/30 to-transparent flex items-end justify-between p-4">
          {/* Location wrapper with shrink-0 and min-w-0 to allow text to truncate properly */}
          <div className="flex-1 min-w-0 flex items-center gap-1.5 text-white/90 mr-2">
            <MapIcon />
            <span className="text-[12px] font-medium truncate">
              {location}
            </span>
          </div>

          {/* Rating Pill - shrink-0 ensures it never squishes or overflows */}
          <div className="shrink-0 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full backdrop-blur-sm shadow-sm">
             <span className="text-secondary-normal-default text-[12px] leading-none">★</span>
             <span className="text-[11px] font-bold text-secondary-normal-default leading-none">{rating} • <span className="text-[#a4a4a4] font-medium">{reviews}</span></span>
          </div>
        </div>
      </div>

      {/* ── Card body ── no background */}
      <div className="flex flex-col px-1 pt-4 pb-2">
        
        {/* Tags Row */}
        <div className="flex items-center flex-wrap gap-2 mb-3">
           <span className="px-3 py-1 rounded-full border border-gray-300 text-[10px] text-gray-500 font-medium">Cultural</span>
           <span className="px-3 py-1 rounded-full border border-gray-300 text-[10px] text-gray-500 font-medium">Disapora</span>
           <span className="px-3 py-1 rounded-full border border-gray-300 text-[10px] text-gray-500 font-medium">International</span>
        </div>

        {/* Features Row */}
        <div className="flex items-center gap-4 mb-4">
           <div className="flex items-center gap-1">
             <DurationIcon />
             <span className="text-[10px] text-secondary-normal-default font-medium">3 Days/2 days</span>
           </div>
           <div className="flex items-center gap-1">
             <UserIcon />
             <span className="text-[10px] text-secondary-normal-default font-medium">Max 12</span>
           </div>
           <div className="flex items-center gap-1">
             <CarIcon />
             <span className="text-[10px] text-secondary-normal-default font-medium">Pickup Included</span>
           </div>
        </div>

        {/* Title */}
        <h3 className="text-[16px] font-bold text-tertiary-normal-default leading-[1.3] mb-3">
          {title}
        </h3>

        {/* Availability */}
        <div className="flex items-center gap-2 mb-4">
          <ClockIcon />
          <span className="text-[14px] font-medium text-secondary-normal-default">
            {availabilityBadge}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mt-auto">
          <span className="text-[14px] text-tertiary-normal-default">From</span>
          <span className="text-[22px] font-bold text-secondary-normal-default">{price}</span>
          <span className="text-[14px] text-primary-dark-active">/ Person</span>
        </div>

      </div>
    </div>
  );
});

PopularTourCard.displayName = "PopularTourCard";
export default PopularTourCard;
