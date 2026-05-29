import React, { useState, useRef, useEffect } from "react";
import { classNames } from "../../../utils/classNames";

const closeCircle = "/ElysiumAssets/close-circle.svg";

const ChevronDown = ({ stroke = "#949494" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M7 10l5 4 5-4" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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

const RegionDropdownPanel = ({
  country,
  regions,
  selected,
  onToggle,
  onClose,
  onClear,
  onApply,
  resultsCount,
  position,
}) => (
  <div
    data-filter-dropdown="region"
    className="z-50 bg-white rounded-[20px] border border-solid border-[#e9eaeb] flex flex-col overflow-hidden"
    style={{
      position: "fixed",
      top: position?.top ?? 0,
      left: position?.left ?? 0,
      width: "min(460px, calc(100vw - 32px))",
      paddingTop: "22px",
      paddingBottom: "22px",
      gap: "22px",
      boxShadow: "0px 12px 16px -4px rgba(10,13,18,0.08), 0px 4px 6px -2px rgba(10,13,18,0.03)",
    }}
  >
    <div
      className="flex flex-col items-start"
      style={{ gap: "24px", paddingLeft: "26px", paddingRight: "26px" }}
    >
      <div className="flex flex-col w-full" style={{ gap: "8px" }}>
        <div className="flex justify-end w-full">
          <button type="button" onClick={onClose} className="cursor-pointer shrink-0">
            <img src={closeCircle} alt="Close" width={24} height={24} />
          </button>
        </div>
        <div
          className="w-full h-[2px] rounded-[20px]"
          style={{ backgroundColor: "#d6beeb", opacity: 0.18 }}
        />
      </div>

      <div className="flex flex-col" style={{ gap: "16px" }}>
        <div className="flex flex-col" style={{ gap: "16px" }}>
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

          <div
            className="flex flex-wrap"
            style={{ gap: "4px 0", maxWidth: "408px", width: "100%" }}
          >
            {regions.map((region) => {
              const isChecked = selected.includes(region);
              return (
                <button
                  key={region}
                  type="button"
                  onClick={() => onToggle(region)}
                  className="flex items-center gap-[8px] transition-all duration-150 hover:opacity-80"
                  style={{ width: "50%", minWidth: "160px", padding: "8px 0" }}
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

    <div
      className="flex items-center justify-between shrink-0"
      style={{ paddingLeft: "26px", paddingRight: "26px" }}
    >
      <button
        type="button"
        onClick={onClear}
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

const FilterDivider = () => (
  <div className="w-[2px] h-[42px] bg-[#d6beeb] rounded-[10px] shrink-0" />
);

const TYPE_OPTIONS = [
  { value: "all",      label: "All"      },
  { value: "leisure",  label: "Lesiure"  }, // "Lesiure" typo matches Figma 1942:34266
  { value: "business", label: "Business" },
  { value: "ekolure",  label: "Ekolure"  },
];

// Static region fallback — used when destination data isn't loaded yet
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

const TourCountryFilterBar = React.forwardRef(
  (
    {
      country = "ghana",
      countryDestinations,
      resultsCount = 0,
      tourTags = [],
      onFilterChange,
      className,
      ...props
    },
    ref
  ) => {
    // Prefer live destination regions; fall back to static country config
    const config = React.useMemo(() => {
      const base = COUNTRY_REGION_CONFIG[country?.toLowerCase()] || {
        ...DEFAULT_REGION_CONFIG,
        displayName: country
          ? country.charAt(0).toUpperCase() + country.slice(1)
          : "Country",
      };
      if (countryDestinations && countryDestinations.length > 0) {
        const liveRegions = [...new Set(
          countryDestinations.map((d) => d.region).filter(Boolean)
        )].sort();
        if (liveRegions.length > 0) return { ...base, regions: liveRegions };
      }
      return base;
    }, [country, countryDestinations]);

    const [selectedRegions, setSelectedRegions] = useState([]);
    const [type,            setType]            = useState("all");
    const [selectedTags,    setSelectedTags]    = useState([]);
    const [regionOpen,      setRegionOpen]      = useState(false);
    const [panelPosition,   setPanelPosition]   = useState(null);
    const [canScrollLeft,   setCanScrollLeft]   = useState(false);
    const [canScrollRight,  setCanScrollRight]  = useState(false);

    const wrapperRef     = useRef(null);
    const barRef         = useRef(null);
    const regionAnchorRef = useRef(null);

    // Reset all filter state when the country changes
    useEffect(() => {
      setSelectedRegions([]);
      setType("all");
      setSelectedTags([]);
      setRegionOpen(false);
      onFilterChange?.({ regions: [], type: "all", tags: [] });
    }, [country]); // eslint-disable-line react-hooks/exhaustive-deps

    // Close region dropdown on outside click
    useEffect(() => {
      const handler = (e) => {
        if (wrapperRef.current?.contains(e.target)) return;
        if (e.target.closest("[data-filter-dropdown]")) return;
        setRegionOpen(false);
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Compute fixed-position coordinates for the region dropdown panel
    useEffect(() => {
      if (!regionOpen) { setPanelPosition(null); return; }
      const computePosition = () => {
        if (!regionAnchorRef.current) return;
        const rect = regionAnchorRef.current.getBoundingClientRect();
        const panelWidth = Math.min(460, window.innerWidth - 32);
        let left = rect.left;
        if (left + panelWidth > window.innerWidth - 16) {
          left = Math.max(16, window.innerWidth - panelWidth - 16);
        }
        setPanelPosition({ top: rect.bottom + 6, left });
      };
      computePosition();
      window.addEventListener("scroll", computePosition, true);
      window.addEventListener("resize", computePosition);
      return () => {
        window.removeEventListener("scroll", computePosition, true);
        window.removeEventListener("resize", computePosition);
      };
    }, [regionOpen]);

    // Track whether the pill row has overflowed left or right
    useEffect(() => {
      const el = barRef.current;
      if (!el) return;
      const check = () => {
        setCanScrollLeft(el.scrollLeft > 1);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
      };
      const raf = requestAnimationFrame(check);
      el.addEventListener("scroll", check, { passive: true });
      window.addEventListener("resize", check);
      return () => {
        cancelAnimationFrame(raf);
        el.removeEventListener("scroll", check);
        window.removeEventListener("resize", check);
      };
    }, [tourTags]); // re-run when pill count changes

    const toggleRegion = (region) =>
      setSelectedRegions((prev) =>
        prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
      );

    const clearRegions = () => setSelectedRegions([]);

    // TYPE pills — apply immediately
    const handleTypeChange = (value) => {
      setType(value);
      onFilterChange?.({ regions: selectedRegions, type: value, tags: selectedTags });
    };

    // CATEGORY (tag) pills — multi-select, apply immediately
    const toggleTag = (tag) => {
      const newTags = selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag];
      setSelectedTags(newTags);
      onFilterChange?.({ regions: selectedRegions, type, tags: newTags });
    };

    // Region "See Results" — apply region selection
    const applyFilters = () => {
      onFilterChange?.({ regions: selectedRegions, type, tags: selectedTags });
    };

    const regionLabel =
      selectedRegions.length === 0
        ? "Select Region"
        : selectedRegions.length === 1
        ? selectedRegions[0]
        : `${selectedRegions.length} Regions`;

    return (
      <div
        ref={(el) => {
          wrapperRef.current = el;
          if (typeof ref === "function") ref(el);
          else if (ref) ref.current = el;
        }}
        className={classNames("w-full flex items-center", className)}
        style={{ minHeight: "113px", backgroundColor: "#f2eaf9" }}
        {...props}
      >
        <div className="h-full flex flex-1 min-w-0 items-center px-6 md:px-[30px] lg:px-[156px] py-4 lg:py-0">
          <div className="relative flex-1 min-w-0">
            {/* Left fade + scroll button */}
            {canScrollLeft && (
              <>
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-r from-[#f2eaf9] to-transparent" />
                <button
                  type="button"
                  aria-label="Scroll left"
                  onClick={() => barRef.current?.scrollBy({ left: -220, behavior: "smooth" })}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-7 h-7 rounded-full bg-white shadow-sm border border-[#e4d0f7]"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M15 18l-6-6 6-6" stroke="#7b2cbf" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            )}
            {/* Right fade + scroll button */}
            {canScrollRight && (
              <>
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-l from-[#f2eaf9] to-transparent" />
                <button
                  type="button"
                  aria-label="Scroll right"
                  onClick={() => barRef.current?.scrollBy({ left: 220, behavior: "smooth" })}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-7 h-7 rounded-full bg-white shadow-sm border border-[#e4d0f7]"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M9 18l6-6-6-6" stroke="#7b2cbf" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            )}
            <div
              ref={barRef}
              className="flex items-center gap-[12px] overflow-x-auto scrollbar-hide py-2 -my-2 px-1 -mx-1"
            >
            {/* ── REGION ──────────────────────────────────────────────────────── */}
            <div className="flex items-center gap-[12px] shrink-0">
              <FilterLabel>REGION</FilterLabel>
              <div ref={regionAnchorRef} style={{ minWidth: "137px", height: "44px" }}>
                <RegionTrigger
                  label={regionLabel}
                  isOpen={regionOpen}
                  onClick={() => setRegionOpen((prev) => !prev)}
                />
              </div>
            </div>

            {/* ── TYPE ────────────────────────────────────────────────────────── */}
            <div className="flex items-center gap-[12px] shrink-0">
              <FilterLabel>TYPE</FilterLabel>
              {TYPE_OPTIONS.map((opt) => (
                <FilterPill
                  key={opt.value}
                  value={opt.value}
                  isActive={type === opt.value}
                  onSelect={handleTypeChange}
                >
                  {opt.label}
                </FilterPill>
              ))}
            </div>

            {/* ── CATEGORY — derived from tour tags; hidden until tours load ── */}
            {tourTags.length > 0 && (
              <>
                <FilterDivider />
                <div className="flex items-center gap-[12px] shrink-0">
                  <FilterLabel>CATEGORY</FilterLabel>
                  {tourTags.map((tag) => (
                    <FilterPill
                      key={tag}
                      value={tag}
                      isActive={selectedTags.includes(tag)}
                      onSelect={toggleTag}
                    >
                      {tag}
                    </FilterPill>
                  ))}
                </div>
              </>
            )}

            </div>{/* end scrollable barRef */}
          </div>{/* end relative wrapper */}

          {/* ── Results count — outside scroll container, always visible ── */}
          <div className="shrink-0 flex items-center justify-center pl-[16px]">
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
        </div>{/* end padding container */}

        {/* Region dropdown — position:fixed to escape the scrollable bar */}
        {regionOpen && panelPosition && (
          <RegionDropdownPanel
            country={config.displayName}
            regions={config.regions}
            selected={selectedRegions}
            onToggle={toggleRegion}
            onClose={() => setRegionOpen(false)}
            onClear={clearRegions}
            onApply={applyFilters}
            resultsCount={resultsCount}
            position={panelPosition}
          />
        )}
      </div>
    );
  }
);

TourCountryFilterBar.displayName = "TourCountryFilterBar";
export default TourCountryFilterBar;
