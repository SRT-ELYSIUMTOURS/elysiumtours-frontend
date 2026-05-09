import React from "react";
import { classNames } from "../../../utils/classNames";

// Gallery Category Filter Bar — Figma node 616:6259 area
// h-[147px], bg-white, border-top/bottom secondary-light-default
// Tabs: All, Destinations, Activities, Nature, Culture, Videos, Partners, Captured by You
// Active tab: bg-secondary-normal-active (#622399) rounded-[20px] text white SemiBold 13px
// Inactive tab: border-[#b9b9b9] rounded-[20px] text #949494 Medium 13px
// Right: Sort dropdown + Search field

const TABS = [
  { key: "all",            label: "All" },
  { key: "destinations",   label: "Destinations" },
  { key: "activities",     label: "Activities" },
  { key: "nature",         label: "Nature" },
  { key: "culture",        label: "Culture" },
  { key: "videos",         label: "Videos" },
  { key: "partners",       label: "Partners" },
  { key: "captured-by-you", label: "Captured by You" },
];

const DownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6 9L12 15L18 9" stroke="#949494" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="#949494" strokeWidth="1.5" />
    <path d="M16.5 16.5L21 21" stroke="#949494" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const GalleryCategoryFilterBar = React.forwardRef(({
  activeTab = "all",
  onTabChange,
  className = "",
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={classNames(
        "w-full bg-primary-light-default",
        "h-auto lg:h-[147px]",
        className
      )}
      {...props}
    >
      <div className="h-full mx-auto flex items-center" style={{ maxWidth: "1728px" }}>
        {/* Tabs + controls row */}
        <div
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full gap-3 lg:gap-0 py-4 lg:py-0 px-4 md:px-8 lg:px-[162px]"
          style={{
            borderTop: "0.5px solid #f2eaf9",
            borderBottom: "0.5px solid #f2eaf9",
            minHeight: "80px",
          }}
        >
          {/* Tabs row — horizontally scrollable on mobile */}
          <div className="flex gap-[10px] lg:gap-[16px] items-center overflow-x-auto scrollbar-hide pb-1 lg:pb-0">
            {TABS.map((tab) => {
              const isActive = tab.key === activeTab;
              return (
                <button
                  key={tab.key}
                  className={classNames(
                    "flex items-center justify-center p-[8px] lg:p-[10px] rounded-[20px]",
                    "shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] cursor-pointer whitespace-nowrap shrink-0",
                    isActive
                      ? "bg-[#622399]"
                      : "border border-[#b9b9b9] bg-transparent"
                  )}
                  onClick={() => onTabChange?.(tab.key)}
                >
                  <span
                    className={classNames(
                      "font-raleway text-[12px] lg:text-[13px]",
                      isActive
                        ? "font-semibold text-primary-light-default"
                        : "font-medium text-[#949494]"
                    )}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sort + Search */}
          <div className="flex items-center gap-[12px] lg:gap-[16px] shrink-0">
            {/* Sort dropdown */}
            <button className="flex items-center gap-[4px] h-[40px] lg:h-[44px] px-[12px] border border-[#b9b9b9] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)] bg-transparent cursor-pointer shrink-0">
              <span className="font-raleway font-medium text-[13px] leading-[22px] text-[#949494] whitespace-nowrap">
                Sort By
              </span>
              <DownIcon />
            </button>

            {/* Search field */}
            <div className="relative flex items-center h-[40px] lg:h-[44px] w-full lg:w-[379px] border border-[#b9b9b9] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)] bg-transparent overflow-hidden">
              <input
                type="text"
                placeholder="Search for Photos/Videos"
                className="flex-1 h-full px-[16px] font-raleway font-medium text-[13px] text-[#949494] outline-none bg-transparent"
              />
              <div className="absolute right-[8px] top-1/2 -translate-y-1/2 size-[37px] flex items-center justify-center">
                <SearchIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

GalleryCategoryFilterBar.displayName = "GalleryCategoryFilterBar";
export default GalleryCategoryFilterBar;
