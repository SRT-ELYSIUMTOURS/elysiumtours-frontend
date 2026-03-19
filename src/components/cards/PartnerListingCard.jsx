import React from "react";
import { classNames } from "../../utils/classNames";

// Figma: 985:9845 — PartnerListingCard
// Card: 335×568px, rounded-[40px], border secondary-light-active, shadow-card
// Below card: info section ~211px tall, gap 22px from card bottom
// variant="guide" shows specialties+language instead of availability+price

const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 13.5C13.933 13.5 15.5 11.933 15.5 10C15.5 8.067 13.933 6.5 12 6.5C10.067 6.5 8.5 8.067 8.5 10C8.5 11.933 10.067 13.5 12 13.5Z"
      stroke="#6f6f6f"
      strokeWidth="1.5"
    />
    <path
      d="M12 2C8.134 2 5 5.134 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.134 15.866 2 12 2Z"
      stroke="#6f6f6f"
      strokeWidth="1.5"
    />
  </svg>
);

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 11 10" fill="none">
    <path
      d="M4.10607 0.690968C4.40542 -0.230343 5.70883 -0.230344 6.00819 0.690967L6.51647 2.25531C6.65034 2.66733 7.0343 2.94629 7.46753 2.94629H9.11237C10.0811 2.94629 10.4839 4.1859 9.70015 4.75531L8.36945 5.72212C8.01896 5.97676 7.8723 6.42813 8.00618 6.84015L8.51446 8.40449C8.81381 9.3258 7.75933 10.0919 6.97562 9.52253L5.64491 8.55571C5.29443 8.30107 4.81983 8.30107 4.46934 8.55571L3.13864 9.52253C2.35492 10.0919 1.30044 9.3258 1.5998 8.40449L2.10808 6.84015C2.24195 6.42813 2.0953 5.97676 1.74481 5.72212L0.414104 4.75531C-0.369609 4.18591 0.0331654 2.94629 1.00189 2.94629H2.64673C3.07996 2.94629 3.46391 2.66733 3.59779 2.25531L4.10607 0.690968Z"
      fill="#7B2CBF"
    />
  </svg>
);

const ClockCircleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#7B2CBF" strokeWidth="1.5" />
    <path d="M12 7V12L15 14.5" stroke="#7B2CBF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PartnerListingCard = React.forwardRef(({
  image,
  partnerName = "Cape Coast Castle Museum",
  location = "Cape Coast / Central Region",
  rating = 4.9,
  title = "Cape Coast Castle: A Journey Through Ghana's Colonial History",
  availability = "Opened Daily",
  price = "Ghs.400.00",
  specialties,
  language,
  variant = "default",  // "default" | "guide"
  onClick,
  className = "",
  ...props
}, ref) => {

  return (
    <div
      ref={ref}
      className={classNames("flex flex-col gap-[22px]", className)}
      {...props}
    >
      {/* Image card */}
      <div
        onClick={onClick}
        className={classNames(
          "relative w-full h-[568px] overflow-hidden rounded-[40px]",
          "border border-solid border-secondary-light-active",
          "shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]",
          "cursor-pointer transition-all duration-300 ease-in",
          "hover:shadow-xl hover:-translate-y-0.5"
        )}
      >
        {/* Background image */}
        {image ? (
          <img src={image} alt={partnerName} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-secondary-light-default" />
        )}

        {/* Gradient overlay for footer */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Footer blur strip — partner name */}
        <div
          className={classNames(
            "absolute bottom-0 left-0 right-0 px-[24px] py-[20px]",
            "backdrop-blur-[10px] bg-[rgba(153,153,153,0.16)]"
          )}
        >
          <span className="font-raleway font-bold text-[25px] leading-[34px] text-primary-normal-default">
            {partnerName}
          </span>
        </div>
      </div>

      {/* Info section below card */}
      <div className="flex flex-col gap-[8px]">
        {/* Location */}
        <div className="flex items-center gap-[6px]">
          <MapPinIcon />
          <span className="font-raleway font-bold text-[13px] leading-[18px] text-primary-dark-active">
            {location}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-[6px]">
          <StarIcon />
          <span className="font-raleway font-medium text-[16px] leading-[22px] text-secondary-normal-default">
            {rating}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-raleway font-semibold text-[20px] leading-[28px] text-tertiary-normal-default w-full line-clamp-2">
          {title}
        </h3>

        {variant === "guide" ? (
          <>
            {/* Specialties */}
            {specialties && (
              <div className="flex items-start gap-[4px]">
                <span className="font-raleway font-bold text-[13px] leading-[18px] text-tertiary-normal-default shrink-0">
                  Specialties:
                </span>
                <span className="font-raleway font-medium text-[13px] leading-[18px] text-primary-dark-active">
                  {specialties}
                </span>
              </div>
            )}
            {/* Language */}
            {language && (
              <div className="flex items-center gap-[4px]">
                <span className="font-raleway font-bold text-[13px] leading-[18px] text-tertiary-normal-default">
                  Language:
                </span>
                <span className="font-raleway font-medium text-[13px] leading-[18px] text-primary-dark-active">
                  {language}
                </span>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Availability */}
            <div className="flex items-center gap-[6px]">
              <ClockCircleIcon />
              <span className="font-raleway font-semibold text-[13px] leading-[18px] text-secondary-normal-default">
                {availability}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-[8px]">
              <span className="font-raleway font-medium text-[13px] leading-[18px] text-tertiary-normal-default">
                From
              </span>
              <span className="font-raleway font-bold text-[20px] leading-[28px] text-secondary-dark-default">
                {price}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
});

PartnerListingCard.displayName = "PartnerListingCard";
export default PartnerListingCard;
