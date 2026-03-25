import React, { useState, useRef, useEffect } from "react";
import { classNames } from "../../../utils/classNames";

// ── Figma SVG assets ──────────────────────────────────────────────────────────
import charmTick    from "../../../assets/ElysiumAssets/charm-tick.svg";
import closeCircle  from "../../../assets/ElysiumAssets/close-circle.svg";

// ── Chevron Down icon — Figma "Hicon / Linear / Down 2" ──────────────────────
const ChevronDown = ({ stroke = "#949494" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M7 10l5 4 5-4" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Sort / Price trigger pill ──────────────────────────────────────────────────
// Figma 1914:37476 — border #949494, rounded-[20px], shadow, p-[10px], gap-[8px]
// Text: Raleway SemiBold 13px/18lh #949494
const SortTrigger = React.forwardRef(({ label, isOpen, onClick, style = {}, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    onClick={onClick}
    className={classNames(
      "flex items-center gap-[8px] p-[10px] rounded-[20px] border border-solid transition-all duration-200",
      "shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] w-full",
      isOpen ? "border-[#d6beeb]" : "border-[#949494]"
    )}
    style={style}
    {...props}
  >
    <span style={{
      fontFamily: "Raleway, sans-serif",
      fontWeight: 600,
      fontSize: "13px",
      lineHeight: "18px",
      color: "#949494",
      whiteSpace: "nowrap",
      flex: 1,
    }}>
      {label}
    </span>
    <ChevronDown stroke={isOpen ? "#d6beeb" : "#949494"} />
  </button>
));
SortTrigger.displayName = "SortTrigger";

// ── Sort dropdown panel — Figma 1914:39150 ────────────────────────────────────
// White bg, border #e9eaeb, rounded-[20px], px-[18px] py-[20px], gap-[13px]
// Shadow: 0px 0px 4px 0px rgba(255,56,60,0.2) (Figma "error" effect)
// Options: Raleway SemiBold 16px/22lh #2d2d2d, h-[42px] w-[238px] px-[12px] py-[10px]
// Active: bg #7b2cbf rounded-[8px], gap-[8px], charm-tick.svg + #fefefe text
const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended"  },
  { value: "nearest",     label: "Nearest First" },
  { value: "rated",       label: "Highest Rated" },
  { value: "newest",      label: "Newest"        },
];

const SortDropdownPanel = ({ options, value, onSelect, onClose }) => (
  <div
    className="absolute top-full left-0 mt-[6px] z-50 flex flex-col rounded-[20px] border border-solid"
    style={{
      backgroundColor: "#ffffff",
      borderColor: "#e9eaeb",
      padding: "20px 18px",
      gap: "13px",
      boxShadow: "0px 0px 4px 0px rgba(255,56,60,0.2)",
      width: "274px",
    }}
  >
    {/* "None selected" + divider */}
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
      {/* Figma node 1914:39157 — bg #d6beeb, h-[2px], opacity 18% */}
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
          className="flex items-center transition-all duration-200 rounded-[8px]"
          style={{
            height: "42px",
            width: "238px",
            padding: "10px 12px",
            gap: isSelected ? "8px" : undefined,
            backgroundColor: isSelected ? "#7b2cbf" : "transparent",
          }}
        >
          {/* charm:tick SVG asset (node 1914:39150) */}
          {isSelected && (
            <img src={charmTick} alt="" width={20} height={20} className="shrink-0" />
          )}
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

// ── Price Range Panel — Figma 1914:40862 ─────────────────────────────────────
// White bg, border #e9eaeb, rounded-[20px], pt-[24px] pb-[42px] px-[40px], gap-[29px]
// Shadow: 0px 1px 2px rgba(0,0,0,0.3), 0px 1px 3px 1px rgba(0,0,0,0.15)
// Content width: 770px (panel 850px − 2×40px padding)
// Close: Figma close-circle.svg, top-right of 770px row
// Title: "Price Range" Raleway SemiBold 20px/28px #565656
// Value: "Gh.X.00" Raleway SemiBold 16px/22px #565656 (shows min value)
// Slider track: bg #e9eaeb, filled #7b2cbf, h-[7px], handles: #d6beeb fill + #7b2cbf border
// Button row: w-[768px], Clear (Raleway Bold 16px #2d2d2d underline), Save Input (bg #7b2cbf)
const PriceRangePanel = ({ onClose, minVal, maxVal, setMinVal, setMaxVal, onSave, onClear }) => {
  const MAX = 5000;
  const trackRef = useRef(null);
  // Which input is on top — swapped dynamically based on cursor proximity to each handle
  const [topThumb, setTopThumb] = useState("max");

  const minPct = (minVal / MAX) * 100;
  const maxPct = (maxVal / MAX) * 100;

  // On every mousemove over the track area, put the closest handle's input on top
  // so clicks/drags always target the nearest handle, not just the one with fixed z-index
  const handleTrackMouseMove = (e) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const pct  = (e.clientX - rect.left) / rect.width;
    const val  = pct * MAX;
    setTopThumb(Math.abs(val - minVal) <= Math.abs(val - maxVal) ? "min" : "max");
  };

  const minZIndex = topThumb === "min" ? 5 : 3;
  const maxZIndex = topThumb === "max" ? 5 : 3;

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

        {/* Close button — right-aligned within 770px content row */}
        <div className="flex justify-end" style={{ width: "770px" }}>
          <button type="button" onClick={onClose} className="cursor-pointer shrink-0">
            <img src={closeCircle} alt="Close" width={24} height={24} />
          </button>
        </div>

        {/* Title + slider */}
        <div className="flex flex-col" style={{ gap: "16px" }}>
          <span style={{
            fontFamily: "Raleway, sans-serif",
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: "28px",
            color: "#565656",
          }}>
            Price Range
          </span>

          {/* Slider area — 770px wide */}
          <div style={{ width: "770px" }}>
            {/* Value label — shows full range so dragging either handle gives feedback */}
            <span style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "22px",
              color: "#565656",
              display: "block",
              marginBottom: "12px",
            }}>
              Gh.{minVal.toLocaleString()}.00 – Gh.{maxVal.toLocaleString()}.00
            </span>

            {/* Track container — onMouseMove swaps z-index so nearest handle is always on top */}
            <div ref={trackRef} className="relative" style={{ height: "28px" }} onMouseMove={handleTrackMouseMove}>
              {/* Gray background track */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  top: "50%", transform: "translateY(-50%)",
                  left: 0, right: 0, height: "7px",
                  backgroundColor: "#e9eaeb",
                }}
              />
              {/* Purple filled range */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  top: "50%", transform: "translateY(-50%)",
                  left: `${minPct}%`,
                  width: `${maxPct - minPct}%`,
                  height: "7px",
                  backgroundColor: "#7b2cbf",
                }}
              />

              {/* Min range input — transparent, full width, interactive */}
              <input
                type="range"
                min={0}
                max={MAX}
                value={minVal}
                onChange={(e) => setMinVal(Math.min(Number(e.target.value), maxVal - 100))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                style={{ zIndex: minZIndex }}
              />
              {/* Max range input — transparent, full width, interactive */}
              <input
                type="range"
                min={0}
                max={MAX}
                value={maxVal}
                onChange={(e) => setMaxVal(Math.max(Number(e.target.value), minVal + 100))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                style={{ zIndex: maxZIndex }}
              />

              {/* Min visual handle — #d6beeb fill + #7b2cbf border (Figma) */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  top: "50%",
                  left: `${minPct}%`,
                  transform: "translate(-50%, -50%)",
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#d6beeb",
                  border: "2px solid #7b2cbf",
                  boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
                }}
              />
              {/* Max visual handle */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  top: "50%",
                  left: `${maxPct}%`,
                  transform: "translate(-50%, -50%)",
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#d6beeb",
                  border: "2px solid #7b2cbf",
                  boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Button row — Figma w-[768px] */}
      <div className="flex items-center justify-between" style={{ width: "768px" }}>
        {/* Clear — Raleway Bold 16px #2d2d2d, underline, no border */}
        <button
          type="button"
          onClick={() => { setMinVal(0); setMaxVal(2000); onClear(); }}
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
            cursor: "pointer",
          }}
        >
          Clear
        </button>

        {/* Save Input — bg #7b2cbf, rounded-[40px], Raleway SemiBold 16px #fefefe */}
        <button
          type="button"
          onClick={() => { onSave(minVal, maxVal); onClose(); }}
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
// Figma 1914:36966 / 1914:37063
// Inactive: border #b9b9b9, Raleway Medium 13px/22lh #949494, rounded-[20px], px-[20px] py-[10px]
// Active:   bg #622399, no border, Raleway SemiBold 13px/18lh #fefefe
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

// ── Section label — Figma: Raleway Bold 13px/18lh #2b0f43, p-[10px] ──────────
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

// ── Divider — Figma 1914:37475 — bg #d6beeb, rounded-[10px], 2×42px ──────────
const FilterDivider = () => (
  <div className="w-[2px] h-[42px] bg-[#d6beeb] rounded-[10px] shrink-0" />
);

// ── Options — labels match Figma exactly ──────────────────────────────────────
const DURATION_OPTIONS = [
  { value: "all-day",   label: "All Day"   },
  { value: "day-tours", label: "Day Tours" },
  { value: "multi-day", label: "Muti-Day"  },
];

const TYPE_OPTIONS = [
  { value: "all",      label: "All"      },
  { value: "leisure",  label: "Lesiure"  },
  { value: "business", label: "Business" },
  { value: "ekolure",  label: "Ekolure"  },
];

// ── TourFilterBar ──────────────────────────────────────────────────────────────
// h=147px, borderTop/Bottom 0.5px #f2eaf9, bg white, px-[156px]
const TourFilterBar = React.forwardRef(({ resultsCount = 48, className, ...props }, ref) => {
  const [sortValue, setSortValue]   = useState(null);
  const [duration, setDuration]     = useState("all-day");
  const [type, setType]             = useState("all");
  const [openPanel, setOpenPanel]   = useState(null); // "sort" | "price" | null
  // Price range — state lives here so the trigger label can reflect the saved values
  const [priceMin, setPriceMin]     = useState(0);
  const [priceMax, setPriceMax]     = useState(2000);
  const [savedPrice, setSavedPrice] = useState(null); // { min, max } once saved

  const barRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (barRef.current && !barRef.current.contains(e.target)) setOpenPanel(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const togglePanel = (name) => setOpenPanel(prev => prev === name ? null : name);
  const sortLabel  = SORT_OPTIONS.find(o => o.value === sortValue)?.label ?? "None-Selected";
  const priceLabel = savedPrice
    ? `Gh.${savedPrice.min.toLocaleString()} – Gh.${savedPrice.max.toLocaleString()}`
    : "Select Price";

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
      <div className="h-full flex items-center px-[156px]">
        <div ref={barRef} className="flex items-center gap-[12px] flex-1">

          {/* SORT — Figma 1914:37476 */}
          <div className="flex items-center gap-[12px] shrink-0">
            <FilterLabel>SORT</FilterLabel>
            <div className="relative" style={{ minWidth: "134px", height: "44px" }}>
              <SortTrigger
                label={sortLabel}
                isOpen={openPanel === "sort"}
                onClick={() => togglePanel("sort")}
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

          {/* PRICE — Figma 1914:37455 */}
          <div className="flex items-center gap-[12px] shrink-0">
            <FilterLabel>PRICE</FilterLabel>
            <div className="relative" style={{ minWidth: "126px", height: "44px" }}>
              <SortTrigger
                label={priceLabel}
                isOpen={openPanel === "price"}
                onClick={() => togglePanel("price")}
              />
              {openPanel === "price" && (
                <PriceRangePanel
                  minVal={priceMin}
                  maxVal={priceMax}
                  setMinVal={setPriceMin}
                  setMaxVal={setPriceMax}
                  onSave={(min, max) => setSavedPrice({ min, max })}
                  onClear={() => setSavedPrice(null)}
                  onClose={() => setOpenPanel(null)}
                />
              )}
            </div>
          </div>

          <FilterDivider />

          {/* DURATION — Figma 1914:36966 */}
          <div className="flex items-center gap-[12px] shrink-0">
            <FilterLabel>DURATION</FilterLabel>
            {DURATION_OPTIONS.map((opt) => (
              <FilterPill key={opt.value} value={opt.value} isActive={duration === opt.value} onSelect={setDuration}>
                {opt.label}
              </FilterPill>
            ))}
          </div>

          <FilterDivider />

          {/* TYPE — Figma 1914:37063 */}
          <div className="flex items-center gap-[12px] shrink-0">
            <FilterLabel>TYPE</FilterLabel>
            {TYPE_OPTIONS.map((opt) => (
              <FilterPill key={opt.value} value={opt.value} isActive={type === opt.value} onSelect={setType}>
                {opt.label}
              </FilterPill>
            ))}
          </div>

          {/* Results count */}
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
