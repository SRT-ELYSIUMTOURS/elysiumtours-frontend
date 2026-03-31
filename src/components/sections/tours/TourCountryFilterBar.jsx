import React, { useState, useRef, useEffect } from "react";
import { classNames } from "../../../utils/classNames";

// ── Shared asset ──────────────────────────────────────────────────────────────
import closeCircle from "../../../assets/ElysiumAssets/close-circle.svg";

// ── Chevron Down (reused from TourFilterBar pattern) ─────────────────────────
const ChevronDown = ({ stroke = "#949494" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M7 10l5 4 5-4" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Checkbox icons for region selection (Figma 1950:38657 = checkmark-square-01)
// Unchecked: #d6beeb rounded-square border
// Checked:   #7b2cbf fill + white tick
const CheckboxUnchecked = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="1.5" y="1.5" width="17" height="17" rx="3.5" stroke="#d6beeb" strokeWidth="1.5" />
  </svg>
);

const CheckboxChecked = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="1" y="1" width="18" height="18" rx="4" fill="#7b2cbf" />
    <path d="M5.5 10L8.5 13L14.5 7" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Region trigger pill ────────────────────────────────────────────────────────
// Figma 1942:34261 — same pattern as SortTrigger in TourFilterBar
// border #949494→#d6beeb when open, rounded-[20px], p-[10px], gap-[8px]
const RegionTrigger = React.forwardRef(({ label, isOpen, onClick }, ref) => (
  <button
    ref={ref}
    type="button"
    onClick={onClick}
    className={classNames(
      "flex items-center gap-[8px] p-[10px] rounded-[20px] border border-solid transition-all duration-200 w-full",
      "shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]",
      isOpen ? "border-[#d6beeb]" : "border-[#949494]"
    )}
  >
    <span
      className="flex-1 text-left"
      style={{
        fontFamily: "Raleway, sans-serif",
        fontWeight: 600,
        fontSize: "13px",
        lineHeight: "18px",
        color: "#949494",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
    <ChevronDown stroke={isOpen ? "#d6beeb" : "#949494"} />
  </button>
));
RegionTrigger.displayName = "RegionTrigger";

// ── Region dropdown panel (Figma 1950:38623) ──────────────────────────────────
// White card, rounded-[20px], border #e9eaeb, shadow/lg, py-[22px]
// Structure: Close + divider | "Select Location" title | country row + checkbox grid | button row
// Panel width ~460px; region grid is 2-column flex-wrap (w-[369px] from Figma)
const RegionDropdownPanel = ({
  country,
  countryCode,
  regions,
  selected,
  onToggle,
  onClose,
  onClear,
  onApply,
  resultsCount,
}) => (
  <div
    className="absolute top-full left-0 mt-[6px] z-50 bg-white rounded-[20px] border border-solid border-[#e9eaeb] flex flex-col overflow-hidden"
    style={{
      width: "460px",
      paddingTop: "22px",
      paddingBottom: "22px",
      gap: "22px",
      boxShadow: "0px 12px 16px -4px rgba(10,13,18,0.08), 0px 4px 6px -2px rgba(10,13,18,0.03)",
    }}
  >
    {/* ── Main content section ─────────────────────────────────────────────── */}
    <div
      className="flex flex-col items-start"
      style={{ gap: "24px", paddingLeft: "26px", paddingRight: "26px" }}
    >
      {/* Close button + divider */}
      <div className="flex flex-col w-full" style={{ gap: "8px" }}>
        <div className="flex justify-end w-full">
          <button type="button" onClick={onClose} className="cursor-pointer shrink-0">
            <img src={closeCircle} alt="Close" width={24} height={24} />
          </button>
        </div>
        {/* Figma 1950:38628 — bg #d6beeb, h-[2px], opacity 18% */}
        <div
          className="w-full h-[2px] rounded-[20px]"
          style={{ backgroundColor: "#d6beeb", opacity: 0.18 }}
        />
      </div>

      {/* Country row + region grid */}
      <div className="flex flex-col" style={{ gap: "16px" }}>
        <div className="flex flex-col" style={{ gap: "16px" }}>
          {/* Country header row (Figma 1950:38635) */}
          {/* flag circle (20×20 bg-[#7b2cbf] rounded-full) + country name SemiBold 16px #2d2d2d */}
          <div className="flex items-center gap-[8px]">
            <div
              className="shrink-0 rounded-full"
              style={{ width: "20px", height: "20px", backgroundColor: "#7b2cbf", opacity: 0.8 }}
            />
            <span
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "22px",
                color: "#2d2d2d",
              }}
            >
              {country}
            </span>
          </div>

          {/* Region checkbox grid — Figma 1950:38651: flex-wrap, 2-col, gap-[16px 0] */}
          {/* Each item is ~183px wide so 2 × 183 = 366 ≈ 369px total (matches Figma w-[369px]) */}
          <div
            className="flex flex-wrap"
            style={{ gap: "4px 0", width: "408px" }}
          >
            {regions.map((region) => {
              const isChecked = selected.includes(region);
              return (
                <button
                  key={region}
                  type="button"
                  onClick={() => onToggle(region)}
                  className="flex items-center gap-[8px] transition-all duration-150 hover:opacity-80"
                  style={{ width: "204px", padding: "8px 0" }}
                >
                  {isChecked ? <CheckboxChecked /> : <CheckboxUnchecked />}
                  <span
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 500,
                      fontSize: "13px",
                      lineHeight: "22px",
                      color: "#2d2d2d",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {region}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>

    {/* ── Button row (Figma 1950:38832) ──────────────────────────────────── */}
    {/* px-[26px], justify-between */}
    <div
      className="flex items-center justify-between shrink-0"
      style={{ paddingLeft: "26px", paddingRight: "26px" }}
    >
      {/* Clear All — Raleway Bold 16px #2d2d2d underline (Figma 1950:38833) */}
      <button
        type="button"
        onClick={() => { onClear(); }}
        style={{
          height: "56px",
          fontFamily: "Raleway, sans-serif",
          fontWeight: 700,
          fontSize: "16px",
          lineHeight: "22px",
          color: "#2d2d2d",
          textDecoration: "underline",
          background: "none",
          border: "none",
          boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.05)",
          borderRadius: "40px",
          padding: "10px",
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        Clear All
      </button>

      {/* See N Results — bg #7b2cbf, Raleway SemiBold 16px #fefefe (Figma 1950:38834) */}
      <button
        type="button"
        onClick={() => { onApply(); onClose(); }}
        className="flex items-center justify-center rounded-[40px] transition-all duration-200 hover:opacity-90"
        style={{
          width: "169px",
          height: "56px",
          backgroundColor: "#7b2cbf",
          fontFamily: "Raleway, sans-serif",
          fontWeight: 600,
          fontSize: "16px",
          lineHeight: "22px",
          color: "#fefefe",
          boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.05)",
          whiteSpace: "nowrap",
        }}
      >
        {resultsCount > 0 ? `See ${resultsCount} Results` : "See All Results"}
      </button>
    </div>
  </div>
);

// ── Filter pill ────────────────────────────────────────────────────────────────
// NOTE: active colour is #6f28ac (var(--violet-secondary-30%/normal:hover)) —
// intentionally lighter than TourFilterBar's #622399 (pressed state).
// This matches Figma 1942:34266 (TYPE) and 1942:34276 (CATEGORY) active states.
const FilterPill = ({ children, isActive, onSelect, value }) => (
  <button
    type="button"
    onClick={() => onSelect(value)}
    className={classNames(
      "flex items-center justify-center px-[20px] py-[10px] rounded-[20px] border border-solid transition-all duration-200",
      "shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]",
      isActive
        ? "bg-[#6f28ac] border-transparent"
        : "bg-transparent border-[#b9b9b9] hover:border-[#7b2cbf]"
    )}
  >
    <span
      style={{
        fontFamily: "Raleway, sans-serif",
        fontWeight: isActive ? 600 : 500,
        fontSize: "13px",
        lineHeight: isActive ? "18px" : "22px",
        color: isActive ? "#eaeaea" : "#949494",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  </button>
);

// ── Section label — Figma 1942:33998 / 1942:34263 etc. ────────────────────────
// Raleway Bold 13px/18px #2b0f43, p-[10px]
const FilterLabel = ({ children }) => (
  <div className="flex items-center justify-center p-[10px] shrink-0">
    <span
      style={{
        fontFamily: "Raleway, sans-serif",
        fontWeight: 700,
        fontSize: "13px",
        lineHeight: "18px",
        color: "#2b0f43",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  </div>
);

// ── Divider — Figma 1942:34269 — same spec as TourFilterBar ───────────────────
// bg #d6beeb, 2px × 42px, rounded-[10px]
const FilterDivider = () => (
  <div className="w-[2px] h-[42px] bg-[#d6beeb] rounded-[10px] shrink-0" />
);

// ── Filter option sets — labels match Figma exactly (including typos) ─────────
const TYPE_OPTIONS = [
  { value: "all",      label: "All"      },
  { value: "leisure",  label: "Lesiure"  }, // "Lesiure" typo matches Figma 1942:34266
  { value: "business", label: "Business" },
  { value: "ekolure",  label: "Ekolure"  },
];

const CATEGORY_OPTIONS = [
  { value: "day-tour",  label: "Day Tour"  }, // Figma 1942:34273
  { value: "multi-day", label: "Multi-Day" }, // Figma 1942:34274
  { value: "heritage",  label: "Heritage"  }, // Figma 1942:34275
  { value: "cultural",  label: "Cultural"  }, // Figma 1942:34276 — active state shown
  { value: "festival",  label: "Festival"  }, // Figma 1942:34277
];

// ── Country-specific region lists (Figma 1950:38623 Ghana example) ─────────────
// When wiring this up functionally, pass `regions` as a prop from the page
// using route/country data. The config here serves as a static fallback.
const COUNTRY_REGION_CONFIG = {
  ghana: {
    displayName: "Ghana",
    regions: [
      "Greater Accra", "Ashanti",
      "Eastern",        "Central",
      "Western",        "Western North",
      "Volta",          "Oti",
      "Northern",       "Savannah",
      "North East",     "Upper East",
      "Upper West",     "Bono",
      "Bono East",      "Ahafo",
    ],
  },
  nigeria: {
    displayName: "Nigeria",
    regions: [
      "Lagos",          "Abuja (FCT)",
      "Kano",           "Rivers",
      "Ogun",           "Kaduna",
      "Oyo",            "Anambra",
      "Delta",          "Imo",
      "Edo",            "Cross River",
      "Enugu",          "Akwa Ibom",
      "Kwara",          "Borno",
    ],
  },
};

const DEFAULT_REGION_CONFIG = {
  displayName: "Country",
  regions: [],
};

// ── TourCountryFilterBar ───────────────────────────────────────────────────────
// Figma 1942:34242 — 1728×113px
// Groups: REGION (dropdown) + TYPE pills + [divider] + CATEGORY pills + results
//
// WHY a separate component (not extending TourFilterBar):
//   • Different filter groups, different height, different active-pill colour
//   • When functional: different URL params (?region=&type=&category= vs
//     ?sort=&price=&duration=&type=) — keeping them separate avoids prop-soup
//   • Country-specific region data that doesn't belong in a global filter
const TourCountryFilterBar = React.forwardRef(
  ({ country = "ghana", resultsCount = 0, className, ...props }, ref) => {
    const config =
      COUNTRY_REGION_CONFIG[country?.toLowerCase()] || {
        ...DEFAULT_REGION_CONFIG,
        displayName:
          country
            ? country.charAt(0).toUpperCase() + country.slice(1)
            : "Country",
      };

    const [selectedRegions, setSelectedRegions] = useState([]);
    const [type,            setType]            = useState("all");
    const [category,        setCategory]        = useState(null);
    const [regionOpen,      setRegionOpen]      = useState(false);

    const barRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
      const handler = (e) => {
        if (barRef.current && !barRef.current.contains(e.target)) {
          setRegionOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, []);

    const toggleRegion = (region) => {
      setSelectedRegions((prev) =>
        prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
      );
    };

    const clearRegions = () => setSelectedRegions([]);

    // Future: call onFilter({ regions: selectedRegions, type, category })
    const applyFilters = () => {};

    // Trigger label reflects current selection
    const regionLabel =
      selectedRegions.length === 0
        ? "Select Region"
        : selectedRegions.length === 1
        ? selectedRegions[0]
        : `${selectedRegions.length} Regions`;

    return (
      <div
        ref={ref}
        className={classNames("w-full", className)}
        style={{
          height: "113px",
          backgroundColor: "#f2eaf9",
        }}
        {...props}
      >
        <div className="h-full flex items-center px-[156px]">
          <div ref={barRef} className="flex items-center gap-[12px] flex-1">

            {/* ── REGION — Figma 1942:34258 ───────────────────────────────── */}
            <div className="flex items-center gap-[12px] shrink-0">
              <FilterLabel>REGION</FilterLabel>
              <div className="relative" style={{ minWidth: "137px", height: "44px" }}>
                <RegionTrigger
                  label={regionLabel}
                  isOpen={regionOpen}
                  onClick={() => setRegionOpen((prev) => !prev)}
                />
                {regionOpen && (
                  <RegionDropdownPanel
                    country={config.displayName}
                    regions={config.regions}
                    selected={selectedRegions}
                    onToggle={toggleRegion}
                    onClose={() => setRegionOpen(false)}
                    onClear={clearRegions}
                    onApply={applyFilters}
                    resultsCount={resultsCount}
                  />
                )}
              </div>
            </div>

            {/* ── TYPE — Figma 1942:34262 ─────────────────────────────────── */}
            <div className="flex items-center gap-[12px] shrink-0">
              <FilterLabel>TYPE</FilterLabel>
              {TYPE_OPTIONS.map((opt) => (
                <FilterPill
                  key={opt.value}
                  value={opt.value}
                  isActive={type === opt.value}
                  onSelect={setType}
                >
                  {opt.label}
                </FilterPill>
              ))}
            </div>

            {/* ── Divider — Figma 1942:34269 ──────────────────────────────── */}
            <FilterDivider />

            {/* ── CATEGORY — Figma 1942:34270 ─────────────────────────────── */}
            <div className="flex items-center gap-[12px] shrink-0">
              <FilterLabel>CATEGORY</FilterLabel>
              {CATEGORY_OPTIONS.map((opt) => (
                <FilterPill
                  key={opt.value}
                  value={opt.value}
                  isActive={category === opt.value}
                  onSelect={setCategory}
                >
                  {opt.label}
                </FilterPill>
              ))}
            </div>

            {/* ── Results count — right-aligned ───────────────────────────── */}
            <div className="ml-auto shrink-0 flex items-center justify-center p-[10px]">
              <span
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 700,
                  fontSize: "13px",
                  lineHeight: "18px",
                  color: "#7b2cbf",
                  whiteSpace: "nowrap",
                }}
              >
                {resultsCount > 0 ? `${resultsCount} results` : "all results"}
              </span>
            </div>

          </div>
        </div>
      </div>
    );
  }
);

TourCountryFilterBar.displayName = "TourCountryFilterBar";
export default TourCountryFilterBar;
