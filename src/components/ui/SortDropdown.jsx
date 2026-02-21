import React, { useState, useRef, useEffect } from "react";
import { classNames } from "../../utils/classNames";

// From Figma: COMPONENT_SET "Sort drop down " (574:2782)
// Default variant: 98×44
//   Frame "Filters": stroke:#949494 r:20 HORIZONTAL gap:8 pad:10
//     "Sort By" [13px/500] #949494
//     ChevronDown stroke:#949494
// Open dropdown: same trigger + panel below
//   Panel: fill:#ffffff stroke:#b9b9b9 r:20 VERTICAL gap:8 pad:10/0
//     Active option: fill:#ebdff5 stroke:#7b2cbf [13px/600] #5c218f pad:0/5
//     Other option:  stroke:#d6beeb [13px/500] #565656

const ChevronDown = ({ stroke }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M7 10l5 4 5-4" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SortDropdown = React.forwardRef(({
  options = [
    { value: "recent",   label: "Most Recent" },
    { value: "oldest",   label: "Oldest"      },
    { value: "popular",  label: "Most Popular" },
    { value: "price-asc",label: "Price: Low to High" },
    { value: "price-desc",label: "Price: High to Low"},
  ],
  value: controlledValue,
  defaultValue = "recent",
  onValueChange,
  className = "",
  ...props
}, ref) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const isControlled  = controlledValue !== undefined;
  const currentValue  = isControlled ? controlledValue : internalValue;
  const selectedLabel = options.find(o => o.value === currentValue)?.label || "Sort By";

  const handleSelect = (val) => {
    if (!isControlled) setInternalValue(val);
    onValueChange?.(val);
    setIsOpen(false);
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isDefaultLabel = currentValue === defaultValue || !options.find(o => o.value === currentValue);

  return (
    <div ref={containerRef} className={classNames("relative inline-flex flex-col", className)} {...props}>

      {/* Trigger pill — stroke:#949494 r:20 */}
      <button
        type="button"
        onClick={() => setIsOpen(p => !p)}
        className="flex items-center gap-[8px] px-[10px] py-[10px] rounded-[var(--radius-md)] border border-solid transition-all duration-300 ease-in"
        style={{
          borderColor: isOpen ? "#d6beeb" : "#949494",
          minWidth: "98px",
        }}
      >
        <span style={{ fontSize: "13px", fontWeight: isDefaultLabel ? 500 : 600, color: isDefaultLabel ? "#949494" : "#6f6f6f", whiteSpace: "nowrap", lineHeight: "18px" }}>
          {selectedLabel}
        </span>
        <ChevronDown stroke={isOpen ? "#d6beeb" : "#949494"} />
      </button>

      {/* Dropdown panel — fill:#ffffff stroke:#b9b9b9 r:20 VERTICAL gap:8 */}
      {isOpen && (
        <div
          className="absolute top-full left-0 mt-1 z-50 flex flex-col rounded-[20px] border border-solid overflow-hidden"
          style={{ minWidth: "98px", backgroundColor: "#ffffff", borderColor: "#b9b9b9" }}
        >
          {options.map((opt) => {
            const isSelected = currentValue === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelect(opt.value)}
                className="flex items-center px-[10px] py-[6px] transition-all duration-300 ease-in border border-solid"
                style={{
                  backgroundColor: isSelected ? "#ebdff5" : "transparent",
                  borderColor:     isSelected ? "#7b2cbf" : "#d6beeb",
                  margin: "0 2px",
                  borderRadius: "6px",
                }}
              >
                <span style={{
                  fontSize: "13px",
                  fontWeight: isSelected ? 600 : 500,
                  color: isSelected ? "#5c218f" : "#565656",
                  whiteSpace: "nowrap",
                  lineHeight: "18px",
                }}>
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
});

SortDropdown.displayName = "SortDropdown";
export default SortDropdown;
