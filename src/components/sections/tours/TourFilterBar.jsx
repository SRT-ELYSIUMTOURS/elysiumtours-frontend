import React, { useState } from "react";
import { classNames } from "../../../utils/classNames";
import { FilterPill } from "../../ui/FilterBar";
import SortDropdown from "../../ui/SortDropdown";

const DURATION_OPTIONS = [
  { value: "1-day", label: "1 Day" },
  { value: "2-3-days", label: "2-3 Days" },
  { value: "4-7-days", label: "4-7 Days" },
];

const TYPE_OPTIONS = [
  { value: "leisure", label: "Leisure" },
  { value: "business", label: "Business" },
  { value: "bleisure", label: "Bleisure" },
  { value: "festival", label: "Festival" },
];

const PRICE_OPTIONS = [
  { value: "asc", label: "Low to High" },
  { value: "desc", label: "High to Low" },
  { value: "under-500", label: "Under GHS 500" },
  { value: "500-1000", label: "GHS 500–1000" },
];

const SORT_OPTIONS = [
  { value: "recent", label: "Most Recent" },
  { value: "popular", label: "Most Popular" },
  { value: "price-asc", label: "Price: Low" },
  { value: "price-desc", label: "Price: High" },
];

// Figma: 1914:37510 — Frame 1000006711, y=883, h=147
// bg white, full width, content at px-[156px]
// Row at y=18 inside content: SORT | divider | PRICE | divider | DURATION pills | divider | TYPE pills
// Each group label: "SORT"/"PRICE"/"DURATION"/"TYPE" [13px/500] #949494, uppercase
// Dividers: 2×42 rectangles
const TourFilterBar = React.forwardRef(({ className, ...props }, ref) => {
  const [duration, setDuration] = useState("");
  const [type, setType] = useState("");

  return (
    <div
      ref={ref}
      className={classNames("w-full bg-primary-light-default", className)}
      style={{ height: "147px" }}
      {...props}
    >
      <div className="h-full flex items-center px-[156px]">
        <div className="flex items-center gap-0 h-[44px] w-full">

          {/* SORT group */}
          <div className="flex items-center gap-[12px] shrink-0">
            <span className="font-raleway font-medium text-[13px] leading-[18px] text-primary-dark-hover uppercase tracking-[0.05em] whitespace-nowrap px-[10px]">
              SORT
            </span>
            <SortDropdown options={SORT_OPTIONS} defaultValue="recent" />
          </div>

          {/* Divider */}
          <div className="w-[2px] h-[42px] bg-primary-normal-hover mx-[11px] shrink-0" />

          {/* PRICE group */}
          <div className="flex items-center gap-[12px] shrink-0">
            <span className="font-raleway font-medium text-[13px] leading-[18px] text-primary-dark-hover uppercase tracking-[0.05em] whitespace-nowrap px-[10px]">
              PRICE
            </span>
            <SortDropdown options={PRICE_OPTIONS} defaultValue="asc" />
          </div>

          {/* Divider */}
          <div className="w-[2px] h-[42px] bg-primary-normal-hover mx-[11px] shrink-0" />

          {/* DURATION group */}
          <div className="flex items-center gap-[12px] shrink-0">
            <span className="font-raleway font-medium text-[13px] leading-[18px] text-primary-dark-hover uppercase tracking-[0.05em] whitespace-nowrap px-[10px]">
              DURATION
            </span>
            <div className="flex items-center gap-[8px]">
              {DURATION_OPTIONS.map((opt) => (
                <FilterPill
                  key={opt.value}
                  value={opt.value}
                  isActive={duration === opt.value}
                  onSelect={(v) => setDuration(v === duration ? "" : v)}
                >
                  {opt.label}
                </FilterPill>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="w-[2px] h-[42px] bg-primary-normal-hover mx-[11px] shrink-0" />

          {/* TYPE group */}
          <div className="flex items-center gap-[12px] shrink-0">
            <span className="font-raleway font-medium text-[13px] leading-[18px] text-primary-dark-hover uppercase tracking-[0.05em] whitespace-nowrap px-[10px]">
              TYPE
            </span>
            <div className="flex items-center gap-[8px]">
              {TYPE_OPTIONS.map((opt) => (
                <FilterPill
                  key={opt.value}
                  value={opt.value}
                  isActive={type === opt.value}
                  onSelect={(v) => setType(v === type ? "" : v)}
                >
                  {opt.label}
                </FilterPill>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
});

TourFilterBar.displayName = "TourFilterBar";
export default TourFilterBar;
