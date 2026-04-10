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
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_3214_38835)">
    <path d="M19.5304 17.4698C19.2375 17.1769 18.7626 17.1769 18.4697 17.4698C18.1768 17.7626 18.1768 18.2375 18.4697 18.5304L19.0001 18.0001L19.5304 17.4698ZM22.4696 22.5304C22.7625 22.8233 23.2374 22.8233 23.5303 22.5304C23.8232 22.2375 23.8232 21.7626 23.5303 21.4697L23 22L22.4696 22.5304ZM9.33512 4.80232C9.74423 4.73752 10.0234 4.35334 9.95856 3.94423C9.89376 3.53511 9.50958 3.25599 9.10047 3.32079L9.21779 4.06155L9.33512 4.80232ZM4.32076 8.1005C4.25596 8.50961 4.53508 8.89379 4.9442 8.95859C5.35331 9.02339 5.73749 8.74426 5.80229 8.33515L5.06152 8.21782L4.32076 8.1005ZM19.0001 18.0001L18.4697 18.5304L22.4696 22.5304L23 22L23.5303 21.4697L19.5304 17.4698L19.0001 18.0001ZM11 19V18.25C6.44365 18.25 2.75 14.5563 2.75 10H2H1.25C1.25 15.3848 5.61522 19.75 11 19.75V19ZM20 10H19.25C19.25 14.5563 15.5563 18.25 11 18.25V19V19.75C16.3848 19.75 20.75 15.3848 20.75 10H20ZM11 1V1.75C15.5563 1.75 19.25 5.44365 19.25 10H20H20.75C20.75 4.61522 16.3848 0.25 11 0.25V1ZM11 1V0.25C5.61522 0.25 1.25 4.61522 1.25 10H2H2.75C2.75 5.44365 6.44365 1.75 11 1.75V1ZM9.21779 4.06155L9.10047 3.32079C6.64008 3.71047 4.71044 5.64012 4.32076 8.1005L5.06152 8.21782L5.80229 8.33515C6.09032 6.51661 7.51658 5.09035 9.33512 4.80232L9.21779 4.06155Z" fill="#EBDFF5"/>
  </g>
  <defs>
    <clipPath id="clip0_3214_38835">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
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
        "rounded-[var(--radius-md)]",          // pill shape
        "border border-secondary-light-active", // stroke:#d6beeb overall
        "bg-primary-light-default shadow",
        className
      )}
      {...props}
    >
      {/* LEFT — Frame 10: "Where to?" — stroke:#d6beeb on right side only */}
      <div className="flex-1 flex flex-col gap-2 justify-center px-10 py-4 border-r border-secondary-light-active">
        {/* Label — [16px/600] #2d2d2d */}
        <span className="text-md-semibold text-tertiary-normal-default leading-none ">
          Where to?
        </span>
        {/* Input — [13px/500] #949494 */}
        <input
          type="text"
          value={locationValue}
          onChange={e => onLocationChange?.(e.target.value)}
          placeholder={locationPlaceholder}
          className="bg-transparent outline-none text-med-small-Medium text-primary-dark-default placeholder:text-primary-dark-hover"
        />
      </div>

      {/* RIGHT — Frame 11: "When?" */}
      <div className="flex-1 flex items-center justify-between pl-10 pr-5.5 py-4">
        <div className="flex flex-col  gap-2 justify-center">
          {/* Label — [16px/600] #2d2d2d */}
          <span className="text-md-semibold text-tertiary-normal-default leading-none ">
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
            "w-[54px] h-[54px] rounded-full shrink-0 cursor-pointer",
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
