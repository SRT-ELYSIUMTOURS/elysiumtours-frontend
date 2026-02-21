import React from "react";
import { classNames } from "../../utils/classNames";
import StarRating from "../ui/StarRating";

const MapIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M12 13.5C13.933 13.5 15.5 11.933 15.5 10C15.5 8.067 13.933 6.5 12 6.5C10.067 6.5 8.5 8.067 8.5 10C8.5 11.933 10.067 13.5 12 13.5Z" stroke="#6f6f6f" strokeWidth="1.5"/>
    <path d="M12 2C8.134 2 5 5.134 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.134 15.866 2 12 2Z" stroke="#6f6f6f" strokeWidth="1.5"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 21C12 21 3 14.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 13 5.08C14.09 3.81 15.76 3 17.5 3C20.58 3 23 5.42 23 8.5C23 14.5 12 21 12 21Z" stroke="#7b2cbf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#7b2cbf" strokeWidth="1.5"/>
    <path d="M12 7v5l3 3" stroke="#7b2cbf" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const PopularTourCard = React.forwardRef(({
  image,
  location = "Cape coast/Central Region",
  rating = 4.9,
  title = "The Homecoming Experience to Kakum National Park",
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
        "relative flex flex-col w-[360px] rounded-[var(--radius-sm)]",
        "bg-transparent transition-all duration-300 ease-in",
        "hover:-translate-y-1 cursor-pointer",
        className
      )}
      {...props}
    >
      {/* ── Hero Image ── */}
      <div className="relative w-full h-[280px] shrink-0 overflow-hidden rounded-[var(--radius-sm)]">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-primary-normal-default" />
        )}

        {/* Heart button */}
        <button
          onClick={(e) => e.stopPropagation()}
          className={classNames(
            "absolute top-3 right-3 w-[34px] h-[34px]",
            "flex items-center justify-center",
            "bg-primary-light-default rounded-full shadow",
            "transition-all duration-300 ease-in hover:bg-secondary-light-default"
          )}
          aria-label="Save to wishlist"
        >
          <HeartIcon />
        </button>
      </div>

      {/* ── Card body ── no background */}
      <div className="flex flex-col gap-2 px-1 py-3">

        {/* Location */}
        <div className="flex items-center gap-1">
          <MapIcon />
          <span className="text-med-small-bold text-primary-dark-active truncate">
            {location}
          </span>
        </div>

        {/* Rating */}
        <StarRating value={rating} showValue size="small" />

        {/* Title */}
        <h3 className="text-semi-md-semibold text-tertiary-normal-default leading-snug line-clamp-2 mt-1">
          {title}
        </h3>

        {/* Availability */}
        <div className="inline-flex items-center gap-1.5 mt-1">
          <ClockIcon />
          <span className="text-med-small-semibold text-secondary-normal-default">
            {availabilityBadge}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mt-1">
          <span className="text-med-small-Medium text-tertiary-normal-default">From</span>
          <span className="text-semi-md-bold text-secondary-dark-default">{price}</span>
        </div>

      </div>
    </div>
  );
});

PopularTourCard.displayName = "PopularTourCard";
export default PopularTourCard;
