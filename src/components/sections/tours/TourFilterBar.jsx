import React, { useState, useRef, useEffect } from "react";
import { classNames } from "../../../utils/classNames";

// ── Chevron Down icon (Down 2 from Figma) ─────────────────────────────────────
const ChevronDown = ({ stroke = "#949494" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M7 10l5 4 5-4" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseCircle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#949494" strokeWidth="1.5" />
    <path d="M9 9l6 6M15 9l-6 6" stroke="#949494" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ── Sort dropdown (SORT / PRICE trigger pill) ─────────────────────────────────
// Figma: border #949494, rounded-[20px], shadow-card, p-[10px], gap-[8px]
// Text: Raleway SemiBold 13px #949494
const SortTrigger = React.forwardRef(({
  label,
  isOpen,
  onClick,
  className = "",
  ...props
}, ref) => (
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

// ── Sort dropdown panel ───────────────────────────────────────────────────────
const SORT_OPTIONS = [
  { value: "recent", label: "Most Recent" },
  { value: "popular", label: "Most Popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const SortDropdownPanel = ({ options, value, onSelect, onClose }) => (
  <div
    className="absolute top-full left-0 mt-1 z-50 flex flex-col rounded-[20px] border border-solid overflow-hidden"
    style={{ minWidth: "160px", backgroundColor: "#ffffff", borderColor: "#b9b9b9" }}
  >
    {options.map((opt) => {
      const isSelected = value === opt.value;
      return (
        <button
          key={opt.value}
          type="button"
          onClick={() => { onSelect(opt.value); onClose(); }}
          className="flex items-center px-[10px] py-[6px] transition-all duration-200 border border-solid mx-[2px] my-[1px] rounded-[6px]"
          style={{
            backgroundColor: isSelected ? "#ebdff5" : "transparent",
            borderColor: isSelected ? "#7b2cbf" : "#d6beeb",
          }}
        >
          <span style={{
            fontFamily: "Raleway, sans-serif",
            fontWeight: isSelected ? 600 : 500,
            fontSize: "13px",
            lineHeight: "18px",
            color: isSelected ? "#5c218f" : "#565656",
            whiteSpace: "nowrap",
          }}>
            {opt.label}
          </span>
        </button>
      );
    })}
  </div>
);

// ── Price Range Panel ─────────────────────────────────────────────────────────
// Figma: 1914:40862 — 810×307px panel, range slider + Cancel + Apply buttons
// Track bg: gray, filled: purple, two ellipse handles
const PriceRangePanel = ({ onClose }) => {
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(2000);
  const MAX = 5000;

  const minPct = (minVal / MAX) * 100;
  const maxPct = (maxVal / MAX) * 100;

  return (
    <div
      className="absolute top-full left-0 mt-[8px] z-50 bg-white rounded-[20px] border border-solid border-[#e0e0e0]"
      style={{
        width: "810px",
        boxShadow: "0px 8px 32px rgba(0,0,0,0.12)",
      }}
    >
      <div className="p-[20px]">
        {/* Top row: title + close */}
        <div className="flex items-center justify-between mb-[16px]">
          <h3 style={{
            fontFamily: "Raleway, sans-serif",
            fontWeight: 700,
            fontSize: "20px",
            lineHeight: "28px",
            color: "#2b0f43",
          }}>
            Price Range
          </h3>
          <button type="button" onClick={onClose} className="cursor-pointer">
            <CloseCircle />
          </button>
        </div>

        {/* Slider area */}
        <div className="relative px-[17px] py-[24px]">
          {/* Track */}
          <div className="relative h-[7px] rounded-full bg-[#e0e0e0] w-full">
            {/* Filled range */}
            <div
              className="absolute h-[7px] rounded-full bg-[#622399]"
              style={{ left: `${minPct}%`, width: `${maxPct - minPct}%` }}
            />
          </div>

          {/* Min range input */}
          <input
            type="range"
            min={0}
            max={MAX}
            value={minVal}
            onChange={(e) => {
              const v = Math.min(Number(e.target.value), maxVal - 100);
              setMinVal(v);
            }}
            className="absolute inset-0 w-full h-[7px] opacity-0 cursor-pointer mt-[24px]"
            style={{ pointerEvents: "auto" }}
          />
          {/* Max range input */}
          <input
            type="range"
            min={0}
            max={MAX}
            value={maxVal}
            onChange={(e) => {
              const v = Math.max(Number(e.target.value), minVal + 100);
              setMaxVal(v);
            }}
            className="absolute inset-0 w-full h-[7px] opacity-0 cursor-pointer mt-[24px]"
            style={{ pointerEvents: "auto" }}
          />

          {/* Min handle — Ellipse 14 */}
          <div
            className="absolute top-[12px] -translate-x-1/2 w-[27px] h-[28px] rounded-full bg-white border-2 border-[#622399] cursor-pointer shadow-sm"
            style={{ left: `${minPct}%` }}
          />
          {/* Max handle — Ellipse 13 */}
          <div
            className="absolute top-[12px] -translate-x-1/2 w-[27px] h-[28px] rounded-full bg-white border-2 border-[#622399] cursor-pointer shadow-sm"
            style={{ left: `${maxPct}%` }}
          />
        </div>

        {/* Value labels */}
        <div className="flex justify-between mt-[8px]">
          <span style={{
            fontFamily: "Raleway, sans-serif",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "28px",
            color: "#2b0f43",
          }}>
            Gh. {minVal.toLocaleString()}.00
          </span>
          <span style={{
            fontFamily: "Raleway, sans-serif",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "28px",
            color: "#2b0f43",
          }}>
            Gh. {maxVal.toLocaleString()}.00
          </span>
        </div>
      </div>

      {/* Button row — Cancel + Apply */}
      <div className="flex items-center justify-between px-[21px] py-[16px] border-t border-[#f2eaf9]">
        {/* Cancel — 74×56 */}
        <button
          type="button"
          onClick={onClose}
          className="flex items-center justify-center rounded-[40px] border border-solid border-[#7b2cbf] transition-all duration-200 hover:bg-secondary-light-default"
          style={{ width: "74px", height: "56px", fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "16px", color: "#7b2cbf" }}
        >
          Clear
        </button>
        {/* Apply — 169×56 */}
        <button
          type="button"
          onClick={onClose}
          className="flex items-center justify-center rounded-[40px] bg-[#622399] hover:bg-[#5c218f] transition-all duration-200"
          style={{ width: "169px", height: "56px", fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "16px", color: "#fefefe" }}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

// ── Filter pill (DURATION / TYPE) ─────────────────────────────────────────────
// Figma:
//   Active:   bg-[#622399] no border, px-[20px] py-[10px], shadow-card, text SemiBold #fefefe
//   Inactive: border #b9b9b9, px-[20px] py-[10px], shadow-card, text Medium #949494
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

// ── Section label ─────────────────────────────────────────────────────────────
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

// ── Divider ───────────────────────────────────────────────────────────────────
// Figma: w=2, h=42, bg #d6beeb, rounded-[10px]
const FilterDivider = () => (
  <div className="w-[2px] h-[42px] bg-[#d6beeb] rounded-[10px] shrink-0" />
);

// ── Duration options ──────────────────────────────────────────────────────────
const DURATION_OPTIONS = [
  { value: "all-day", label: "All Day" },
  { value: "day-tours", label: "Day Tours" },
  { value: "multi-day", label: "Multi-Day" },
];

// ── Type options ──────────────────────────────────────────────────────────────
const TYPE_OPTIONS = [
  { value: "all", label: "All" },
  { value: "leisure", label: "Leisure" },
  { value: "business", label: "Business" },
  { value: "bleisure", label: "Bleisure" },
];

// ── TourFilterBar ─────────────────────────────────────────────────────────────
// Figma: 1914:37510 — Frame 1000006711, h=147
// Container: full-width, border-t border-b #f2eaf9, bg white
// Inner content: h=80, at y=40 (vertically centered in 147px)
// Row: SORT trigger | divider | PRICE trigger | divider | DURATION pills | divider | TYPE pills
// Right: "48 results" text
const TourFilterBar = React.forwardRef(({ resultsCount = 48, className, ...props }, ref) => {
  const [sortValue, setSortValue] = useState("recent");
  const [duration, setDuration] = useState("all-day");
  const [type, setType] = useState("all");
  const [openPanel, setOpenPanel] = useState(null); // "sort" | "price" | null

  const barRef = useRef(null);

  // Close panels on outside click
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
      className={classNames(
        "w-full bg-white",
        "border-t border-b border-[#f2eaf9]",
        className
      )}
      style={{ height: "147px" }}
      {...props}
    >
      {/* Inner content — h=80, centered vertically in 147px (y=40 in Figma) */}
      <div className="h-full flex items-center px-[156px]">
        <div ref={barRef} className="flex items-center gap-[12px] flex-1">

          {/* ── SORT ── */}
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

          {/* ── PRICE ── */}
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

          {/* ── DURATION ── */}
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

          {/* ── TYPE ── */}
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

          {/* ── Results count — right-aligned ── */}
          {/* Figma: "48 results" [13px bold #2b0f43] at far right x=1489 */}
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
