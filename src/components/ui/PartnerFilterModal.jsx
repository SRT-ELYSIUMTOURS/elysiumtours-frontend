import React, { useState } from "react";
import { classNames } from "../../utils/classNames";

// Figma: 1108:28981 — Filter Modal (Transportation variant shown)
// Container: 820px wide, rounded-[20px], white bg, shadow
// Sections: configurable filter groups (checkboxes, price range, ratings, etc.)
// Used in: TourPartnerListingPage per category

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18" stroke="#2d2d2d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 6L18 18" stroke="#2d2d2d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StarFilledIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 11 10" fill="none">
    <path
      d="M4.10607 0.690968C4.40542 -0.230343 5.70883 -0.230344 6.00819 0.690967L6.51647 2.25531C6.65034 2.66733 7.0343 2.94629 7.46753 2.94629H9.11237C10.0811 2.94629 10.4839 4.1859 9.70015 4.75531L8.36945 5.72212C8.01896 5.97676 7.8723 6.42813 8.00618 6.84015L8.51446 8.40449C8.81381 9.3258 7.75933 10.0919 6.97562 9.52253L5.64491 8.55571C5.29443 8.30107 4.81983 8.30107 4.46934 8.55571L3.13864 9.52253C2.35492 10.0919 1.30044 9.3258 1.5998 8.40449L2.10808 6.84015C2.24195 6.42813 2.0953 5.97676 1.74481 5.72212L0.414104 4.75531C-0.369609 4.18591 0.0331654 2.94629 1.00189 2.94629H2.64673C3.07996 2.94629 3.46391 2.66733 3.59779 2.25531L4.10607 0.690968Z"
      fill="#7B2CBF"
    />
  </svg>
);

const StarEmptyIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 11 10" fill="none">
    <path
      d="M4.10607 0.690968C4.40542 -0.230343 5.70883 -0.230344 6.00819 0.690967L6.51647 2.25531C6.65034 2.66733 7.0343 2.94629 7.46753 2.94629H9.11237C10.0811 2.94629 10.4839 4.1859 9.70015 4.75531L8.36945 5.72212C8.01896 5.97676 7.8723 6.42813 8.00618 6.84015L8.51446 8.40449C8.81381 9.3258 7.75933 10.0919 6.97562 9.52253L5.64491 8.55571C5.29443 8.30107 4.81983 8.30107 4.46934 8.55571L3.13864 9.52253C2.35492 10.0919 1.30044 9.3258 1.5998 8.40449L2.10808 6.84015C2.24195 6.42813 2.0953 5.97676 1.74481 5.72212L0.414104 4.75531C-0.369609 4.18591 0.0331654 2.94629 1.00189 2.94629H2.64673C3.07996 2.94629 3.46391 2.66733 3.59779 2.25531L4.10607 0.690968Z"
      fill="none"
      stroke="#b9b9b9"
      strokeWidth="0.5"
    />
  </svg>
);

// Divider between sections
const SectionDivider = () => (
  <div className="w-full h-[2px] bg-secondary-light-active opacity-40 rounded-[20px]" />
);

// Checkbox item
const CheckboxItem = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-[10px] cursor-pointer group">
    <div
      className={classNames(
        "w-[20px] h-[20px] rounded-[4px] border flex items-center justify-center shrink-0",
        "transition-all duration-300 ease-in",
        checked
          ? "bg-secondary-normal-default border-secondary-normal-default"
          : "bg-transparent border-primary-dark-default group-hover:border-secondary-normal-default"
      )}
      onClick={() => onChange(!checked)}
    >
      {checked && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
    <span className="font-raleway font-semibold text-[16px] leading-[22px] text-tertiary-normal-default">
      {label}
    </span>
  </label>
);

// Radio item for ratings
const RatingRadioItem = ({ stars, label, selected, onChange }) => (
  <label className="flex items-center gap-[12px] cursor-pointer">
    <div
      className={classNames(
        "w-[20px] h-[20px] rounded-full border flex items-center justify-center shrink-0",
        "transition-all duration-300 ease-in",
        selected
          ? "border-secondary-normal-default"
          : "border-primary-dark-default"
      )}
      onClick={() => onChange(stars)}
    >
      {selected && (
        <div className="w-[10px] h-[10px] rounded-full bg-secondary-normal-default" />
      )}
    </div>
    <div className="flex items-center gap-[6px]">
      {Array.from({ length: 5 }).map((_, i) =>
        i < stars ? <StarFilledIcon key={i} size={16} /> : <StarEmptyIcon key={i} size={16} />
      )}
      {label && (
        <span className="font-raleway font-semibold text-[16px] leading-[22px] text-tertiary-normal-default ml-1">
          {label}
        </span>
      )}
    </div>
  </label>
);

// Default filter configs per category
export const FILTER_CONFIGS = {
  transportation: {
    title: "Filter Transportation",
    sections: [
      {
        key: "vehicleType",
        label: "Vehicle Type",
        type: "checkbox",
        columns: 2,
        options: ["Sedan", "SUV / 4×4", "Mini Van", "Coach / Bus", "Tuk-Tuk / Rickshaw", "Motorcycle", "Boat / Ferry", "Private Jet Charter"],
      },
      {
        key: "priceRange",
        label: "Price Range",
        type: "priceRange",
        min: 0,
        max: 5000,
      },
      {
        key: "ratings",
        label: "Ratings",
        type: "ratings",
      },
      {
        key: "pickupType",
        label: "Pickup Type",
        type: "checkbox",
        columns: 2,
        options: ["Hotel Pickup", "Airport Pickup", "Port Pickup", "Custom Location"],
      },
      {
        key: "accessibility",
        label: "Accessibility",
        type: "checkbox",
        columns: 2,
        options: ["Wheelchair Accessible", "Child Seat Available", "Pet Friendly"],
      },
    ],
  },
  accommodation: {
    title: "Filter Accommodation",
    sections: [
      {
        key: "propertyType",
        label: "Property Type",
        type: "checkbox",
        columns: 2,
        options: ["Hotel", "Guest House", "Resort", "Hostel", "Boutique", "Eco Lodge", "Apartment", "Villa"],
      },
      {
        key: "priceRange",
        label: "Price Range",
        type: "priceRange",
        min: 0,
        max: 5000,
      },
      {
        key: "ratings",
        label: "Ratings",
        type: "ratings",
      },
      {
        key: "amenities",
        label: "Amenities",
        type: "checkbox",
        columns: 2,
        options: ["Free WiFi", "Swimming Pool", "Air Conditioning", "Breakfast Included", "Parking", "Airport Shuttle"],
      },
    ],
  },
  "tour-sites": {
    title: "Filter Tour Sites & Events",
    sections: [
      {
        key: "category",
        label: "Category",
        type: "checkbox",
        columns: 2,
        options: ["Historical Sites", "Cultural Events", "Nature & Wildlife", "Festivals", "Museums", "National Parks", "Beaches", "Religious Sites"],
      },
      {
        key: "priceRange",
        label: "Price Range",
        type: "priceRange",
        min: 0,
        max: 5000,
      },
      {
        key: "ratings",
        label: "Ratings",
        type: "ratings",
      },
      {
        key: "availability",
        label: "Availability",
        type: "checkbox",
        columns: 2,
        options: ["Open Daily", "Weekends Only", "By Appointment", "Seasonal"],
      },
    ],
  },
  guides: {
    title: "Filter Tour Guides",
    sections: [
      {
        key: "specialties",
        label: "Specialties",
        type: "checkbox",
        columns: 2,
        options: ["City Tours", "Historical Sites", "Food & Culture", "Adventure", "Wildlife", "Photography Tours", "Heritage Tours", "Night Tours"],
      },
      {
        key: "language",
        label: "Language",
        type: "checkbox",
        columns: 2,
        options: ["English", "Twi", "French", "German", "Spanish", "Hausa", "Ga", "Ewe"],
      },
      {
        key: "location",
        label: "Location",
        type: "checkbox",
        columns: 2,
        options: ["Accra", "Cape Coast", "Kumasi", "Tamale", "Ho", "Takoradi"],
      },
      {
        key: "ratings",
        label: "Ratings",
        type: "ratings",
      },
    ],
  },
  restaurants: {
    title: "Filter Restaurants & Dining",
    sections: [
      {
        key: "cuisineType",
        label: "Cuisine Type",
        type: "checkbox",
        columns: 2,
        options: ["Ghanaian", "West African", "International", "Seafood", "Vegetarian / Vegan", "Fast Food", "Fine Dining", "Street Food"],
      },
      {
        key: "priceRange",
        label: "Price Range",
        type: "priceRange",
        min: 0,
        max: 1000,
      },
      {
        key: "ratings",
        label: "Ratings",
        type: "ratings",
      },
      {
        key: "features",
        label: "Features",
        type: "checkbox",
        columns: 2,
        options: ["Outdoor Seating", "Live Music", "Private Dining", "Takeaway", "Delivery"],
      },
    ],
  },
  photographers: {
    title: "Filter Photo & Videographers",
    sections: [
      {
        key: "serviceType",
        label: "Service Type",
        type: "checkbox",
        columns: 2,
        options: ["Photography", "Videography", "Drone Footage", "Wedding", "Portrait", "Event Coverage", "Commercial", "Documentary"],
      },
      {
        key: "priceRange",
        label: "Price Range",
        type: "priceRange",
        min: 0,
        max: 10000,
      },
      {
        key: "ratings",
        label: "Ratings",
        type: "ratings",
      },
    ],
  },
  insurance: {
    title: "Filter Insurance & Other Services",
    sections: [
      {
        key: "serviceType",
        label: "Service Type",
        type: "checkbox",
        columns: 2,
        options: ["Travel Insurance", "Health Insurance", "Tour Insurance", "Equipment Insurance", "Visa Services", "Currency Exchange"],
      },
      {
        key: "priceRange",
        label: "Price Range",
        type: "priceRange",
        min: 0,
        max: 5000,
      },
      {
        key: "ratings",
        label: "Ratings",
        type: "ratings",
      },
    ],
  },
};

const PartnerFilterModal = React.forwardRef(({
  isOpen = false,
  onClose,
  category = "transportation",
  onApply,
  className = "",
  ...props
}, ref) => {
  const config = FILTER_CONFIGS[category] || FILTER_CONFIGS.transportation;

  // Dynamic filter state
  const [filters, setFilters] = useState(() => {
    const initial = {};
    config.sections.forEach((section) => {
      if (section.type === "checkbox") {
        initial[section.key] = {};
        section.options?.forEach((opt) => { initial[section.key][opt] = false; });
      } else if (section.type === "priceRange") {
        initial[section.key] = { min: section.min || 0, max: section.max || 5000 };
      } else if (section.type === "ratings") {
        initial[section.key] = null;
      }
    });
    return initial;
  });

  const handleCheckbox = (sectionKey, option, value) => {
    setFilters((prev) => ({
      ...prev,
      [sectionKey]: { ...prev[sectionKey], [option]: value },
    }));
  };

  const handleRating = (value) => {
    setFilters((prev) => ({ ...prev, ratings: value }));
  };

  const handleReset = () => {
    const reset = {};
    config.sections.forEach((section) => {
      if (section.type === "checkbox") {
        reset[section.key] = {};
        section.options?.forEach((opt) => { reset[section.key][opt] = false; });
      } else if (section.type === "priceRange") {
        reset[section.key] = { min: section.min || 0, max: section.max || 5000 };
      } else if (section.type === "ratings") {
        reset[section.key] = null;
      }
    });
    setFilters(reset);
  };

  const handleApply = () => {
    onApply?.(filters);
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
    >
      {/* Modal */}
      <div
        ref={ref}
        className={classNames(
          "bg-primary-light-default border border-[#e9eaeb] rounded-[20px]",
          "shadow-[0px_12px_16px_-4px_rgba(10,13,18,0.08),0px_4px_6px_-2px_rgba(10,13,18,0.03)]",
          "w-[820px] max-h-[90vh] overflow-y-auto py-[42px]",
          "relative",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-[42px] mb-[32px]">
          <h2 className="font-raleway font-bold text-[25px] leading-[34px] text-tertiary-normal-default">
            {config.title}
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-[40px] h-[40px] rounded-full hover:bg-primary-normal-default transition-all duration-300 ease-in cursor-pointer"
            aria-label="Close filter modal"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-[32px] px-[42px]">
          {config.sections.map((section, sIdx) => (
            <React.Fragment key={section.key}>
              {sIdx > 0 && <SectionDivider />}

              <div className="flex flex-col gap-[20px]">
                <span className="font-raleway font-semibold text-[20px] leading-[28px] text-primary-dark-darker">
                  {section.label}
                </span>

                {/* Checkbox grid */}
                {section.type === "checkbox" && (
                  <div
                    className={classNames(
                      "grid gap-x-[40px] gap-y-[16px]",
                      section.columns === 2 ? "grid-cols-2" : "grid-cols-3"
                    )}
                  >
                    {section.options?.map((option) => (
                      <CheckboxItem
                        key={option}
                        label={option}
                        checked={filters[section.key]?.[option] ?? false}
                        onChange={(val) => handleCheckbox(section.key, option, val)}
                      />
                    ))}
                  </div>
                )}

                {/* Price range */}
                {section.type === "priceRange" && (
                  <div className="flex flex-col gap-[12px]">
                    <div className="flex items-center justify-between">
                      <span className="font-raleway font-medium text-[16px] leading-[22px] text-tertiary-normal-default">
                        Gh.{filters[section.key]?.min?.toFixed(2) ?? "0.00"}
                      </span>
                      <span className="font-raleway font-medium text-[16px] leading-[22px] text-tertiary-normal-default">
                        Gh.{filters[section.key]?.max?.toFixed(2) ?? section.max?.toFixed(2)}
                      </span>
                    </div>
                    <div className="relative w-full h-[6px] bg-primary-normal-default rounded-full">
                      <div
                        className="absolute h-full bg-secondary-normal-default rounded-full"
                        style={{
                          left: `${((filters[section.key]?.min || 0) / section.max) * 100}%`,
                          right: `${100 - ((filters[section.key]?.max || section.max) / section.max) * 100}%`,
                        }}
                      />
                      <input
                        type="range"
                        min={section.min || 0}
                        max={section.max || 5000}
                        value={filters[section.key]?.min ?? 0}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            [section.key]: { ...prev[section.key], min: Number(e.target.value) },
                          }))
                        }
                        className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
                      />
                    </div>
                  </div>
                )}

                {/* Ratings */}
                {section.type === "ratings" && (
                  <div className="flex flex-col gap-[14px]">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <RatingRadioItem
                        key={stars}
                        stars={stars}
                        selected={filters.ratings === stars}
                        onChange={handleRating}
                      />
                    ))}
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-[42px] mt-[40px] pt-[24px] border-t border-[#e9eaeb]">
          <button
            onClick={handleReset}
            className={classNames(
              "font-raleway font-semibold text-[16px] leading-[22px] text-primary-dark-active",
              "hover:text-tertiary-normal-default transition-all duration-300 ease-in cursor-pointer",
              "underline underline-offset-2"
            )}
          >
            Reset Filters
          </button>
          <button
            onClick={handleApply}
            className={classNames(
              "px-[32px] py-[14px] rounded-[100px]",
              "bg-secondary-normal-default hover:bg-secondary-normal-hover active:bg-secondary-normal-active",
              "font-raleway font-semibold text-[16px] leading-[22px] text-primary-light-default",
              "transition-all duration-300 ease-in cursor-pointer shadow"
            )}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
});

PartnerFilterModal.displayName = "PartnerFilterModal";
export default PartnerFilterModal;
