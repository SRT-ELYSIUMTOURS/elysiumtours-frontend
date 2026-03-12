import React from "react";
import { classNames } from "../../utils/classNames";

// From Figma: Frame 15 (134:1493) — Hero search bar, 957×88
// Structure:
//   Frame 10 (400×88): fill:#ffffff stroke:#d6beeb — LEFT pill (Where to?)
//     Label:       "Where to?"              [16px/600] #2d2d2d
//     Placeholder: "Search for place..."   [13px/500] #949494
//   Frame 11 (400×88): fill:#ffffff — RIGHT pill (When?)
//     Label:       "When?"                  [16px/600] #2d2d2d
//     Placeholder: "Select Dates"           [13px/500] #949494
//     Search btn:  Ellipse 54×54 fill:#7b2cbf + search icon stroke:#ebdff5

const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="#ebdff5" strokeWidth="1.8"/>
    <path d="M16.5 16.5L21 21" stroke="#ebdff5" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const SearchBar = React.forwardRef(({
  locationValue = "",
  onLocationChange,
  locationPlaceholder = "Search for place or activity",
  dateValue = "",
  onDateChange,
  datePlaceholder = "Select Dates",
  onSearch,
  className = "",
  ...props
}, ref) => {

  return (
    <div
      ref={ref}
      className={classNames(
        // Frame 15: HORIZONTAL, 957×88, two sections side by side
        "flex w-full overflow-hidden",
        "rounded-full",          // perfect pill shape
        "border border-secondary-light-active", // stroke:#d6beeb overall
        "bg-primary-light-default shadow",
        className
      )}
      {...props}
    >
      {/* LEFT — Frame 10: "Where to?" — stroke:#d6beeb on right side only */}
      <div className="flex-1 flex flex-col justify-center pl-[48px] pr-6 py-4 border-r border-secondary-light-active text-left">
        {/* Label — [16px/600] #2d2d2d */}
        <span className="text-md-semibold text-tertiary-normal-default leading-none mb-1">
          Where to?
        </span>
        {/* Input — [13px/500] #949494 */}
        <input
          type="text"
          value={locationValue}
          onChange={e => onLocationChange?.(e.target.value)}
          placeholder={locationPlaceholder}
          className="bg-transparent outline-none text-med-small-Medium text-primary-dark-hover placeholder:text-primary-dark-hover"
        />
      </div>

      {/* RIGHT — Frame 11: "When?" */}
      <div className="flex-1 flex items-center justify-between pl-[48px] pr-4 py-4">
        <div className="flex flex-col justify-center text-left">
          {/* Label — [16px/600] #2d2d2d */}
          <span className="text-md-semibold text-tertiary-normal-default leading-none mb-1">
            When?
          </span>
          {/* Input — [13px/500] #949494 */}
          <input
            type="text"
            value={dateValue}
            onChange={e => onDateChange?.(e.target.value)}
            placeholder={datePlaceholder}
            className="bg-transparent outline-none text-med-small-Medium text-primary-dark-hover placeholder:text-primary-dark-hover"
          />
        </div>

        {/* Search button — Ellipse 54×54 fill:#7b2cbf */}
        <button
          onClick={onSearch}
          className={classNames(
            "w-[54px] h-[54px] rounded-full shrink-0",
            "bg-secondary-normal-default",
            "flex items-center justify-center",
            "transition-all duration-300 ease-in",
            "hover:bg-secondary-normal-hover active:bg-secondary-normal-active"
          )}
          aria-label="Search"
        >
          <SearchIcon />
        </button>
      </div>
    </div>
  );
});

SearchBar.displayName = "SearchBar";
export default SearchBar;
