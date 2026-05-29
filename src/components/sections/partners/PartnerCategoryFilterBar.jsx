import React from "react";
import { classNames } from "../../../utils/classNames";

// Figma: 883:5517 — Category Filter Bar
// Outer: bg-white h-[147px] (py-[40px] + h-[80px] strip + py-[27px])
// Inner strip: border-t-[0.5px] border-b-[0.5px] border-[#f2eaf9] h-[80px]
// Pills centered within the strip, px-[156px] to match page content inset
// Active: bg-[#622399] text-[#fefefe] 13px semibold
// Inactive: border border-[#b9b9b9] text-[#949494] 13px medium rounded-[20px] p-[10px]

export const PARTNER_CATEGORIES = [
  { key: "all", label: "All" },
  { key: "tour-sites", label: "Tour Sites & Events" },
  { key: "accommodation", label: "Accommodation" },
  { key: "transportation", label: "Transportation" },
  { key: "guides", label: "Tour Guides" },
  { key: "restaurants", label: "Restaurants & Dining" },
  { key: "photographers", label: "Photos & Videographers" },
  { key: "insurance", label: "Insurance & Other Services" },
];

const PartnerCategoryFilterBar = React.forwardRef(({
  activeCategory = "all",
  onCategoryChange,
  className = "",
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={classNames("w-full bg-primary-light-default", className)}
      style={{ paddingTop: "40px", paddingBottom: "27px" }}
      {...props}
    >
      {/* Inner strip with top/bottom 0.5px borders — matches Figma border-t/b-[0.5px] #f2eaf9 */}
      <div
        className="w-full flex items-center"
        style={{
          height: "80px",
          borderTop: "0.5px solid #f2eaf9",
          borderBottom: "0.5px solid #f2eaf9",
        }}
      >
        {/*
          Mobile: px-4 with overflow-x-auto scroll + touch-action pan-x
          Tablet: px-10
          Desktop: px-[156px]
          scrollbar-none hides the native scrollbar on all browsers
        */}
        <div className="w-full px-4 sm:px-10 lg:px-[156px]  flex items-center gap-[12px] sm:gap-[16px] overflow-x-auto scrollbar-none touch-pan-x">
          {PARTNER_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => onCategoryChange?.(cat.key)}
                className={classNames(
                  "flex-shrink-0 p-[10px] rounded-[20px]",
                  "shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]",
                  "transition-all duration-300 ease-in cursor-pointer",
                  "font-raleway text-[13px] leading-[18px]",
                  isActive
                    ? "bg-secondary-normal-active text-primary-light-default font-semibold border-none"
                    : "bg-transparent border border-solid border-primary-dark-default text-primary-dark-hover font-medium hover:border-secondary-normal-default hover:text-secondary-normal-default"
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
});

PartnerCategoryFilterBar.displayName = "PartnerCategoryFilterBar";
export default PartnerCategoryFilterBar;
