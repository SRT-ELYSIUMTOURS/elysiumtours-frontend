import React, { useEffect, useMemo, useRef, useState } from "react";
import { classNames } from "../../../utils/classNames";
import PartnerFilterDropdown from "../../ui/PartnerFilterDropdown";
import PartnerDateRangePicker from "../../ui/PartnerDateRangePicker";
import PartnerLocationDropdown from "../../ui/PartnerLocationDropdown";

// Listing toolbar — Figma-style row: sort / (optional location) / dates / filters | divider | tag pills

function formatLocationSummary(payload) {
  if (!payload?.regions?.length) return "All Regions";
  const r = payload.regions;
  if (r.length === 1) return r[0];
  if (r.length <= 3) return r.join(", ");
  return `${r.slice(0, 2).join(", ")} +${r.length - 2}`;
}

const ChevronDownSm = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden >
    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M16 2V6M8 2V6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3 10H21" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
);

const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M3 7H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3 17H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M18 17H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 7H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6 7C6 6.06812 6 5.60218 6.15224 5.23463C6.35523 4.74458 6.74458 4.35523 7.23463 4.15224C7.60218 4 8.06812 4 9 4C9.93188 4 10.3978 4 10.7654 4.15224C11.2554 4.35523 11.6448 4.74458 11.8478 5.23463C12 5.60218 12 6.06812 12 7C12 7.93188 12 8.39782 11.8478 8.76537C11.6448 9.25542 11.2554 9.64477 10.7654 9.84776C10.3978 10 9.93188 10 9 10C8.06812 10 7.60218 10 7.23463 9.84776C6.74458 9.64477 6.35523 9.25542 6.15224 8.76537C6 8.39782 6 7.93188 6 7Z" stroke="currentColor" stroke-width="1.5"/>
  <path d="M12 17C12 16.0681 12 15.6022 12.1522 15.2346C12.3552 14.7446 12.7446 14.3552 13.2346 14.1522C13.6022 14 14.0681 14 15 14C15.9319 14 16.3978 14 16.7654 14.1522C17.2554 14.3552 17.6448 14.7446 17.8478 15.2346C18 15.6022 18 16.0681 18 17C18 17.9319 18 18.3978 17.8478 18.7654C17.6448 19.2554 17.2554 19.6448 16.7654 19.8478C16.3978 20 15.9319 20 15 20C14.0681 20 13.6022 20 13.2346 19.8478C12.7446 19.6448 12.3552 19.2554 12.1522 18.7654C12 18.3978 12 17.9319 12 17Z" stroke="currentColor" stroke-width="1.5"/>
</svg>
);

const MapPinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className="text-[#949494] shrink-0">
    <path d="M12 13.5C13.933 13.5 15.5 11.933 15.5 10C15.5 8.067 13.933 6.5 12 6.5C10.067 6.5 8.5 8.067 8.5 10C8.5 11.933 10.067 13.5 12 13.5Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 2C8.134 2 5 5.134 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.134 15.866 2 12 2Z" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const SORT_OPTIONS = [
  { value: "recent", label: "Most Recent" },
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

/** Tag pills shown after divider — first item should be "All" */
const CATEGORY_TAGS = {
  "tour-sites": [
    "All",
    "Cultural Festivals",
    "Historical Sites",
    "Music & Entertainment",
    "Food & Drink",
    "Religious Events",
    "Nature & Wildlife",
    "Workshops",
  ],
  accommodation: ["All", "Hotels", "Resorts", "Eco-Lodges", "Guesthouses", "Apartments"],
  transportation: ["All", "Airport Transfer", "Private Hire", "Coach", "Regional", "Boat"],
  guides: ["All", "Heritage", "Food & Culture", "Wildlife", "City Tours", "Multi-Day"],
  restaurants: ["All", "Fine Dining", "Local Cuisine", "Seafood", "Vegetarian", "Nightlife"],
  photographers: ["All", "Photography", "Videography", "Drone", "Events", "Travel Shoots"],
  insurance: ["All", "Travel Insurance", "Visa Support", "Health", "Currency"],
};

const pillBase =
  "flex shrink-0 items-center justify-center gap-[10px] rounded-[20px] px-[10px] py-[10px] font-raleway text-[13px] shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] transition-colors cursor-pointer whitespace-nowrap";

const PartnerListingFilterBar = React.forwardRef(({
  category = "transportation",
  showLocationFilter = false,
  onSortChange,
  onFiltersApply,
  onLocationChange,
  onTagChange,
  onDatesApply,
  className = "",
  ...props
}, ref) => {
  const dateTriggerRef = useRef(null);
  const filterTriggerRef = useRef(null);
  const locationTriggerRef = useRef(null);
  const [sort, setSort] = useState("recent");
  const [sortOpen, setSortOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [locationPayload, setLocationPayload] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [datesOpen, setDatesOpen] = useState(false);
  const [dateRangeStart, setDateRangeStart] = useState(null);
  const [dateRangeEnd, setDateRangeEnd] = useState(null);
  const tags = useMemo(() => CATEGORY_TAGS[category] ?? CATEGORY_TAGS.transportation, [category]);
  const [activeTag, setActiveTag] = useState(() => tags[0] ?? "All");

  useEffect(() => {
    const next = CATEGORY_TAGS[category]?.[0] ?? "All";
    setActiveTag(next);
  }, [category]);

  const handleSort = (value) => {
    setSort(value);
    setSortOpen(false);
    onSortChange?.(value);
  };

  const handleLocationApply = (payload) => {
    setLocationPayload(payload);
    onLocationChange?.(payload);
    setLocationOpen(false);
  };

  const locationLabel = useMemo(() => formatLocationSummary(locationPayload), [locationPayload]);
  const handleTag = (tag) => {
    setActiveTag(tag);
    onTagChange?.(tag);
  };

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Most Recent";

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
                  type="button"
                  onClick={() => {
                    setSortOpen((v) => !v);
                    setLocationOpen(false);
                    setDatesOpen(false);
                    setFiltersOpen(false);
                  }}
                  className={classNames(
                    "flex h-[44px] items-center gap-[8px] rounded-[20px] border border-solid border-[#949494] px-[10px] py-[10px]",
                    "shadow-[0_4px_20px_0_rgba(0,0,0,0.05)]",
                    "font-raleway text-[13px] font-semibold leading-[18px] text-[#949494]",
                    "min-w-[129px] justify-center hover:text-primary-light-default focus:bg-secondary-normal-default hover:bg-secondary-normal-default focus:text-primary-light-default cursor-pointer"
                  )}
                >
                  <span className="truncate">{currentSortLabel}</span>
                  <ChevronDownSm />
                </button>
                {sortOpen && (
                  <div className="absolute left-0 top-full z-30 mt-1 w-[220px] overflow-hidden rounded-[12px] border border-primary-normal-default bg-primary-light-default shadow-lg">
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleSort(opt.value)}
                        className={classNames(
                          "block w-full px-4 py-2.5 text-left font-raleway text-[14px] hover:bg-secondary-light-default",
                          sort === opt.value ? "font-semibold text-secondary-normal-default" : "text-tertiary-normal-default"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {showLocationFilter && (
                <div className="relative" ref={locationTriggerRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setLocationOpen((v) => !v);
                      setSortOpen(false);
                      setDatesOpen(false);
                      setFiltersOpen(false);
                    }}
                    className={classNames(
                      "flex h-[44px] min-w-[162px] items-center gap-[8px] rounded-[20px] border border-solid border-[#949494] px-[10px] py-[10px]",
                      "shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] font-raleway text-[13px] font-semibold text-[#949494]",
                      "bg-primary-light-default cursor-pointer"
                    )}
                    aria-expanded={locationOpen}
                    aria-haspopup="dialog"
                  >
                    <MapPinIcon />
                    <span className="max-w-[min(200px,28vw)] flex-1 truncate text-left">{locationLabel}</span>
                    <ChevronDownSm />
                  </button>
                </div>
              )}

              <div className="relative" ref={dateTriggerRef}>
                <button
                  type="button"
                  onClick={() => {
                    setDatesOpen((v) => !v);
                    setSortOpen(false);
                    setLocationOpen(false);
                    setFiltersOpen(false);
                  }}
                  className={classNames(
                    "flex h-[44px] min-w-[162px] items-center gap-[8px] rounded-[20px] border border-solid border-[#949494] px-[10px] py-[10px] focus:outline-secondary-normal-active",
                    "shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] font-raleway text-[13px] font-semibold text-primary-dark-hover",
                    "cursor-pointer hover:bg-secondary-normal-default hover:text-primary-light-default focus:bg-secondary-normal-default focus:text-primary-light-default",
                    datesOpen && "bg-secondary-normal-default text-primary-light-default"
                  )}
                  aria-expanded={datesOpen}
                  aria-haspopup="dialog"
                >
                  <CalendarIcon />
                  <span>Select Dates</span>
                  <ChevronDownSm />
                </button>
              </div>

              <div className="relative" ref={filterTriggerRef}>
                <button
                  type="button"
                  onClick={() => {
                    setFiltersOpen((v) => !v);
                    setSortOpen(false);
                    setLocationOpen(false);
                    setDatesOpen(false);
                  }}
                  className={classNames(
                    "flex h-[44px] min-w-[91px] items-center gap-[8px] rounded-[20px] border border-solid border-[#949494] px-[10px] py-[10px]",
                    "shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] font-raleway text-[13px] font-semibold text-[#949494]",
                    "bg-primary-light-default cursor-pointer hover:bg-secondary-normal-default hover:text-primary-light-default focus:bg-secondary-normal-default focus:text-primary-light-default",
                    filtersOpen && "bg-secondary-normal-default text-primary-light-default"
                  )}
                  aria-expanded={filtersOpen}
                  aria-haspopup="dialog"
                >
                  <FilterIcon />
                  <span>Filters</span>
                </button>
              </div>
            </div>

            <div className="hidden lg:block h-[42px] w-[2px] shrink-0 rounded-[10px] bg-[#ebdff5] bg-primary-normal-default mx-[4px]" aria-hidden />

            {/* Tag pills */}
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-[16px] lg:flex-nowrap lg:overflow-x-auto">
              {tags.map((tag) => {
                const isAll = tag === "All";
                const active = activeTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTag(tag)}
                    className={classNames(
                      pillBase,
                      active  && "bg-[#622399] font-semibold text-[#fefefe]",
                      !active && "border border-[#b9b9b9] bg-transparent font-medium text-[#949494]"
                    )}
                  >
                    <span className={classNames(!isAll && "text-[13px] leading-[22px]")}>{tag}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <PartnerLocationDropdown
        open={locationOpen}
        onClose={() => setLocationOpen(false)}
        anchorRef={locationTriggerRef}
        initialPayload={locationPayload}
        resultCount={200}
        onApply={handleLocationApply}
      />

      <PartnerFilterDropdown
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        anchorRef={filterTriggerRef}
        onApply={onFiltersApply}
        resultCount={200}
      />

      <PartnerDateRangePicker
        open={datesOpen}
        onClose={() => setDatesOpen(false)}
        anchorRef={dateTriggerRef}
        initialStart={dateRangeStart}
        initialEnd={dateRangeEnd}
        onApply={({ start, end }) => {
          setDateRangeStart(start);
          setDateRangeEnd(end);
          onDatesApply?.({ start, end });
          setDatesOpen(false);
        }}
      />
    </>
  );
});

PartnerListingFilterBar.displayName = "PartnerListingFilterBar";
export default PartnerListingFilterBar;
