import React, { useState } from "react";
import { classNames } from "../../../utils/classNames";
import PartnerFilterModal from "../../ui/PartnerFilterModal";

// Figma: 982:7478 — Listing page filter bar
// Left: Sort dropdown + Date picker + Filters button + divider
// Right: Category pills (same as overview bar)
// Tour Guides variant adds Location pill between Sort and Date

const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="3.5" width="12" height="10.5" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M2 6.5H14" stroke="currentColor" strokeWidth="1.2" />
    <path d="M5 2V4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M11 2V4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 4H14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M4 8H12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M6 12H10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M12 13.5C13.933 13.5 15.5 11.933 15.5 10C15.5 8.067 13.933 6.5 12 6.5C10.067 6.5 8.5 8.067 8.5 10C8.5 11.933 10.067 13.5 12 13.5Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 2C8.134 2 5 5.134 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.134 15.866 2 12 2Z" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

const LOCATION_OPTIONS = [
  "All Regions",
  "Accra / Greater Accra",
  "Cape Coast / Central",
  "Kumasi / Ashanti",
  "Tamale / Northern",
  "Ho / Volta",
  "Takoradi / Western",
];

const PartnerListingFilterBar = React.forwardRef(({
  category = "transportation",    // controls which filter modal config to use
  showLocationFilter = false,     // true for Tour Guides variant
  onSortChange,
  onDateChange,
  onFiltersApply,
  onLocationChange,
  className = "",
  ...props
}, ref) => {
  const [sort, setSort] = useState("recommended");
  const [sortOpen, setSortOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [location, setLocation] = useState("All Regions");
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  const handleSort = (value) => {
    setSort(value);
    setSortOpen(false);
    onSortChange?.(value);
  };

  const handleLocation = (value) => {
    setLocation(value);
    setLocationOpen(false);
    onLocationChange?.(value);
  };

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Sort";

  return (
    <>
      <div
        ref={ref}
        className={classNames(
          "w-full bg-primary-light-default border-b border-primary-normal-default",
          "px-4 md:px-8 lg:px-[80px] py-[16px]",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between gap-[16px]">
          {/* Left controls — horizontal scroll on mobile so all filter buttons
              (Sort, Date, Filters) are reachable even on narrow screens */}
          <div className="flex items-center gap-[12px] overflow-x-auto scrollbar-hide -mx-4 px-4 md:-mx-0 md:px-0 w-full md:w-auto">
            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => { setSortOpen((v) => !v); setLocationOpen(false); }}
                className={classNames(
                  "flex items-center gap-[8px] px-[14px] h-[42px] rounded-[8px]",
                  "border border-primary-dark-default bg-primary-light-default",
                  "font-raleway font-medium text-[14px] leading-[20px] text-tertiary-normal-default",
                  "hover:border-secondary-normal-default transition-all duration-300 ease-in cursor-pointer",
                  "min-w-[129px]"
                )}
              >
                <span className="flex-1 text-left">{currentSortLabel}</span>
                <ChevronDownIcon />
              </button>
              {sortOpen && (
                <div className="absolute top-full left-0 mt-[4px] w-[200px] bg-primary-light-default border border-primary-normal-default rounded-[10px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] z-20 overflow-hidden">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSort(opt.value)}
                      className={classNames(
                        "w-full px-[16px] py-[10px] text-left",
                        "font-raleway font-medium text-[14px] leading-[20px]",
                        "hover:bg-secondary-light-default transition-all duration-300 ease-in cursor-pointer",
                        sort === opt.value ? "text-secondary-normal-default font-semibold bg-secondary-light-default" : "text-tertiary-normal-default"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Location filter — Tour Guides only */}
            {showLocationFilter && (
              <div className="relative">
                <button
                  onClick={() => { setLocationOpen((v) => !v); setSortOpen(false); }}
                  className={classNames(
                    "flex items-center gap-[8px] px-[14px] h-[42px] rounded-[8px]",
                    "border border-primary-dark-default bg-primary-light-default",
                    "font-raleway font-medium text-[14px] leading-[20px] text-tertiary-normal-default",
                    "hover:border-secondary-normal-default transition-all duration-300 ease-in cursor-pointer",
                    "min-w-[106px]"
                  )}
                >
                  <MapPinIcon />
                  <span className="flex-1 text-left truncate max-w-[120px]">{location}</span>
                  <ChevronDownIcon />
                </button>
                {locationOpen && (
                  <div className="absolute top-full left-0 mt-[4px] w-[220px] bg-primary-light-default border border-primary-normal-default rounded-[10px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] z-20 overflow-hidden">
                    {LOCATION_OPTIONS.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => handleLocation(loc)}
                        className={classNames(
                          "w-full px-[16px] py-[10px] text-left",
                          "font-raleway font-medium text-[14px] leading-[20px]",
                          "hover:bg-secondary-light-default transition-all duration-300 ease-in cursor-pointer",
                          location === loc ? "text-secondary-normal-default font-semibold bg-secondary-light-default" : "text-tertiary-normal-default"
                        )}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Date picker trigger */}
            <button
              className={classNames(
                "flex items-center gap-[8px] px-[14px] h-[42px] rounded-[8px]",
                "border border-primary-dark-default bg-primary-light-default",
                "font-raleway font-medium text-[14px] leading-[20px] text-tertiary-normal-default",
                "hover:border-secondary-normal-default transition-all duration-300 ease-in cursor-pointer",
                "min-w-[162px]"
              )}
            >
              <CalendarIcon />
              <span>Select Dates</span>
              <ChevronDownIcon />
            </button>

            {/* Filters button */}
            <button
              onClick={() => setFilterModalOpen(true)}
              className={classNames(
                "flex items-center gap-[8px] px-[14px] h-[42px] rounded-[8px]",
                "border border-primary-dark-default bg-primary-light-default",
                "font-raleway font-medium text-[14px] leading-[20px] text-tertiary-normal-default",
                "hover:border-secondary-normal-default transition-all duration-300 ease-in cursor-pointer",
                "min-w-[91px]"
              )}
            >
              <FilterIcon />
              <span>Filters</span>
            </button>

            {/* Divider — only shown on desktop where category pills appear on the right */}
            <div className="hidden lg:block w-[2px] h-[42px] bg-primary-normal-default mx-[4px] shrink-0" />
          </div>
        </div>
      </div>

      {/* Filter modal */}
      <PartnerFilterModal
        isOpen={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        category={category}
        onApply={onFiltersApply}
      />
    </>
  );
});

PartnerListingFilterBar.displayName = "PartnerListingFilterBar";
export default PartnerListingFilterBar;
