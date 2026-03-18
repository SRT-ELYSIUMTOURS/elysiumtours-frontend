import React, { useState, useRef, useEffect } from "react";
import { classNames } from "../../../utils/classNames";

// ── Chevron Down icon ──────────────────────────────────────────────────────────
const ChevronDown = ({ stroke = "#949494" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M7 10l5 4 5-4" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Close Circle icon ──────────────────────────────────────────────────────────
const CloseCircle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#949494" strokeWidth="1.5" />
    <path d="M9 9l6 6M15 9l-6 6" stroke="#949494" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ── Tick icon for active sort option ──────────────────────────────────────────
const TickIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <path d="M4 10.5L8 14.5L16 6.5" stroke="#fefefe" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Sort / Price trigger pill ──────────────────────────────────────────────────
// Figma 1914:37517 — border #949494, rounded-[20px], shadow, p-[10px], gap-[8px]
// Text: Raleway SemiBold 13px #949494
const SortTrigger = React.forwardRef(({ label, isOpen, onClick, className = "", ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    onClick={onClick}
    className={classNames(
      "flex items-center gap-[8px] p-[10px] rounded-[20px] border border-solid transition-all duration-200",
      "shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]",
      isOpen ? "border-[#d6beeb]" : "border-[#949494]",
      className
    )}
    {...props}
  >
    <span style={{
      fontFamily: "Raleway, sans-serif",
      fontWeight: 600,
      fontSize: "13px",
      lineHeight: "18px",
      color: "#949494",
      whiteSpace: "nowrap",
    }}>
      {label}
    </span>
    <ChevronDown stroke={isOpen ? "#d6beeb" : "#949494"} />
  </button>
));
SortTrigger.displayName = "SortTrigger";

// ── Sort dropdown panel ────────────────────────────────────────────────────────
// Figma 1914:39150 — white bg, border #e9eaeb, rounded-[20px], px-[18px] py-[20px]
// "None selected" label (14px medium #bebebe) + thin #d6beeb divider
// Options: Raleway SemiBold 16px #2d2d2d, h-[42px] w-[238px] px-[12px] py-[10px]
// Active: bg #7b2cbf rounded-[8px], white text, tick icon
const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "nearest", label: "Nearest First" },
  { value: "rated", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
];

const SortDropdownPanel = ({ options, value, onSelect, onClose }) => (
  <div
    className="absolute top-full left-0 mt-[6px] z-50 flex flex-col rounded-[20px] border border-solid"
    style={{
      backgroundColor: "#ffffff",
      borderColor: "#e9eaeb",
      padding: "20px 18px",
      gap: "13px",
      boxShadow: "0px 4px 20px 0px rgba(0,0,0,0.10)",
      width: "274px",
    }}
  >
    {/* "None selected" + separator */}
    <div className="flex flex-col" style={{ gap: "3px" }}>
      <div className="px-[12px] py-[4px]">
        <span style={{
          fontFamily: "Raleway, sans-serif",
          fontWeight: 500,
          fontSize: "14px",
          lineHeight: "22px",
          color: "#bebebe",
          whiteSpace: "nowrap",
        }}>
          None selected
        </span>
      </div>
      <div className="w-full h-[2px] rounded-[20px]" style={{ backgroundColor: "#d6beeb", opacity: 0.18 }} />
    </div>

    {/* Options */}
    {options.map((opt) => {
      const isSelected = value === opt.value;
      return (
        <button
          key={opt.value}
          type="button"
          onClick={() => { onSelect(opt.value); onClose(); }}
          className="flex items-center gap-[8px] transition-all duration-200 rounded-[8px]"
          style={{
            height: "42px",
            width: "238px",
            padding: "10px 12px",
            backgroundColor: isSelected ? "#7b2cbf" : "transparent",
          }}
        >
          {isSelected && <TickIcon />}
          <span style={{
            fontFamily: "Raleway, sans-serif",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "22px",
            color: isSelected ? "#fefefe" : "#2d2d2d",
            whiteSpace: "nowrap",
          }}>
            {opt.label}
          </span>
        </button>
      );
    })}
  </div>
);

// ── Price Range Panel ──────────────────────────────────────────────────────────
// Figma 1914:40862 — white bg, border #e9eaeb, rounded-[20px]
// Shadow: 0px 1px 2px rgba(0,0,0,0.3), 0px 1px 3px 1px rgba(0,0,0,0.15)
// Padding: pt-[24px] pb-[42px] px-[40px], gap-[29px] between sections
// Close X: top-right, no inline header row
// Title: "Price Range" SemiBold 20px #565656
// Value: "Gh.{min}.00" SemiBold 16px #565656 at top-left of slider
// Clear: underline text only, Bold 16px #2d2d2d, no border
// Save Input: bg #7b2cbf, rounded-[40px], h-56px w-169px, SemiBold 16px #fefefe
const PriceRangePanel = ({ onClose }) => {
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(2000);
  const MAX = 5000;

  const minPct = (minVal / MAX) * 100;
  const maxPct = (maxVal / MAX) * 100;

  return (
    <div
      className="absolute top-full left-0 mt-[8px] z-50 bg-white rounded-[20px] border border-solid border-[#e9eaeb] flex flex-col"
      style={{
        width: "850px",
        paddingTop: "24px",
        paddingBottom: "42px",
        paddingLeft: "40px",
        paddingRight: "40px",
        gap: "29px",
        boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.3), 0px 1px 3px 1px rgba(0,0,0,0.15)",
      }}
    >
      {/* Top section */}
      <div className="flex flex-col" style={{ gap: "16px" }}>
        {/* Close button — top right */}
        <div className="flex justify-end w-full">
          <button type="button" onClick={onClose} className="cursor-pointer">
            <CloseCircle />
          </button>
        </div>

        {/* Title + slider area */}
        <div className="flex flex-col" style={{ gap: "16px" }}>
          {/* Title */}
          <span style={{
            fontFamily: "Raleway, sans-serif",
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: "28px",
            color: "#565656",
          }}>
            Price Range
          </span>

          {/* Value label + slider */}
          <div className="relative" style={{ width: "770px" }}>
            {/* Min value label */}
            <span style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "22px",
              color: "#565656",
              display: "block",
              marginBottom: "8px",
            }}>
              Gh.{minVal.toLocaleString()}.00
            </span>

            {/* Slider track */}
            <div className="relative h-[7px] rounded-full w-full" style={{ backgroundColor: "#e9eaeb" }}>
              {/* Filled range */}
              <div
                className="absolute h-[7px] rounded-full"
                style={{ left: `${minPct}%`, width: `${maxPct - minPct}%`, backgroundColor: "#7b2cbf" }}
              />
            </div>

            {/* Min range input (invisible, interactive) */}
            <input
              type="range"
              min={0}
              max={MAX}
              value={minVal}
              onChange={(e) => setMinVal(Math.min(Number(e.target.value), maxVal - 100))}
              className="absolute w-full opacity-0 cursor-pointer"
              style={{ bottom: 0, height: "28px", pointerEvents: "auto" }}
            />
            {/* Max range input (invisible, interactive) */}
            <input
              type="range"
              min={0}
              max={MAX}
              value={maxVal}
              onChange={(e) => setMaxVal(Math.max(Number(e.target.value), minVal + 100))}
              className="absolute w-full opacity-0 cursor-pointer"
              style={{ bottom: 0, height: "28px", pointerEvents: "auto" }}
            />

            {/* Min handle */}
            <div
              className="absolute -translate-x-1/2 rounded-full bg-white cursor-pointer"
              style={{
                left: `${minPct}%`,
                bottom: "-10px",
                width: "27px",
                height: "27px",
                border: "2px solid #7b2cbf",
                boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
              }}
            />
            {/* Max handle */}
            <div
              className="absolute -translate-x-1/2 rounded-full bg-white cursor-pointer"
              style={{
                left: `${maxPct}%`,
                bottom: "-10px",
                width: "27px",
                height: "27px",
                border: "2px solid #7b2cbf",
                boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Button row */}
      <div className="flex items-center justify-between" style={{ width: "770px" }}>
        {/* Clear — underlined text, no border */}
        <button
          type="button"
          onClick={onClose}
          className="flex items-center justify-center transition-all duration-200"
          style={{
            width: "74px",
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
          }}
        >
          Clear
        </button>
        {/* Save Input */}
        <button
          type="button"
          onClick={onClose}
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
          }}
        >
          Save Input
        </button>
      </div>
    </div>
  );
};

// ── Filter pill (DURATION / TYPE) ──────────────────────────────────────────────
// Active:   bg #622399, no border, SemiBold 13px #fefefe, lineHeight 18px
// Inactive: border #b9b9b9, Medium 13px #949494, lineHeight 22px
const FilterPill = ({ children, isActive, onSelect, value }) => (
  <button
    type="button"
    onClick={() => onSelect(value)}
    className={classNames(
      "flex items-center justify-center px-[20px] py-[10px] rounded-[20px] border border-solid transition-all duration-200",
      "shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]",
      isActive
        ? "bg-[#622399] border-transparent"
        : "bg-transparent border-[#b9b9b9] hover:border-[#7b2cbf]"
    )}
  >
    <span style={{
      fontFamily: "Raleway, sans-serif",
      fontWeight: isActive ? 600 : 500,
      fontSize: "13px",
      lineHeight: isActive ? "18px" : "22px",
      color: isActive ? "#fefefe" : "#949494",
      whiteSpace: "nowrap",
    }}>
      {children}
    </span>
  </button>
);

// ── Section label ──────────────────────────────────────────────────────────────
// Figma: Raleway Bold 13px #2b0f43, p-[10px]
const FilterLabel = ({ children }) => (
  <div className="flex items-center justify-center p-[10px] shrink-0">
    <span style={{
      fontFamily: "Raleway, sans-serif",
      fontWeight: 700,
      fontSize: "13px",
      lineHeight: "18px",
      color: "#2b0f43",
      whiteSpace: "nowrap",
    }}>
      {children}
    </span>
  </div>
);

// ── Divider ────────────────────────────────────────────────────────────────────
// Figma: w=2, h=42, bg #d6beeb, rounded-[10px]
const FilterDivider = () => (
  <div className="w-[2px] h-[42px] bg-[#d6beeb] rounded-[10px] shrink-0" />
);

// ── Options ────────────────────────────────────────────────────────────────────
const DURATION_OPTIONS = [
  { value: "all-day", label: "All Day" },
  { value: "day-tours", label: "Day Tours" },
  { value: "multi-day", label: "Muti-Day" },
];

const TYPE_OPTIONS = [
  { value: "all", label: "All" },
  { value: "leisure", label: "Leisure" },
  { value: "business", label: "Business" },
  { value: "bleisure", label: "Ekolure" },
];

// ── TourFilterBar ──────────────────────────────────────────────────────────────
// Figma 1914:37511 — h=147px container, border-t border-b #f2eaf9 (0.5px), bg white
// Inner content: h=80px, vertically centered at y=40
// Row: SORT | divider | PRICE | divider | DURATION pills | divider | TYPE pills | "N results"
const TourFilterBar = React.forwardRef(({ resultsCount = 48, className, ...props }, ref) => {
  const [sortValue, setSortValue] = useState(null);
  const [duration, setDuration] = useState("all-day");
  const [type, setType] = useState("all");
  const [openPanel, setOpenPanel] = useState(null); // "sort" | "price" | null

  const barRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (barRef.current && !barRef.current.contains(e.target)) setOpenPanel(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const togglePanel = (name) => setOpenPanel(prev => prev === name ? null : name);

  const sortLabel = SORT_OPTIONS.find(o => o.value === sortValue)?.label || "Non-Selected";

  return (
    <div
      ref={ref}
      className={classNames("w-full bg-white", className)}
      style={{
        height: "147px",
        borderTop: "0.5px solid #f2eaf9",
        borderBottom: "0.5px solid #f2eaf9",
      }}
      {...props}
    >
      {/* Inner row — h=80, centered vertically */}
      <div className="h-full flex items-center px-[156px]">
        <div ref={barRef} className="flex items-center gap-[12px] flex-1">

          {/* SORT */}
          <div className="flex items-center gap-[12px] shrink-0">
            <FilterLabel>SORT</FilterLabel>
            <div className="relative">
              <SortTrigger
                label={sortLabel}
                isOpen={openPanel === "sort"}
                onClick={() => togglePanel("sort")}
                style={{ minWidth: "139px" }}
              />
              {openPanel === "sort" && (
                <SortDropdownPanel
                  options={SORT_OPTIONS}
                  value={sortValue}
                  onSelect={setSortValue}
                  onClose={() => setOpenPanel(null)}
                />
              )}
            </div>
          </div>

          <FilterDivider />

          {/* PRICE */}
          <div className="flex items-center gap-[12px] shrink-0">
            <FilterLabel>PRICE</FilterLabel>
            <div className="relative">
              <SortTrigger
                label="Select Price"
                isOpen={openPanel === "price"}
                onClick={() => togglePanel("price")}
                style={{ minWidth: "126px" }}
              />
              {openPanel === "price" && (
                <PriceRangePanel onClose={() => setOpenPanel(null)} />
              )}
            </div>
          </div>

          <FilterDivider />

          {/* DURATION */}
          <div className="flex items-center gap-[12px] shrink-0">
            <FilterLabel>DURATION</FilterLabel>
            <div className="flex items-center gap-[8px]">
              {DURATION_OPTIONS.map((opt) => (
                <FilterPill
                  key={opt.value}
                  value={opt.value}
                  isActive={duration === opt.value}
                  onSelect={setDuration}
                >
                  {opt.label}
                </FilterPill>
              ))}
            </div>
          </div>

          <FilterDivider />

          {/* TYPE */}
          <div className="flex items-center gap-[12px] shrink-0">
            <FilterLabel>TYPE</FilterLabel>
            <div className="flex items-center gap-[8px]">
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
          </div>

          {/* Results count — right-aligned */}
          <div className="ml-auto shrink-0 flex items-center justify-center p-[10px]">
            <span style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              lineHeight: "18px",
              color: "#2b0f43",
              whiteSpace: "nowrap",
            }}>
              {resultsCount} results
            </span>
          </div>

        </div>
      </div>
    </div>
  );
});

TourFilterBar.displayName = "TourFilterBar";
export default TourFilterBar;
