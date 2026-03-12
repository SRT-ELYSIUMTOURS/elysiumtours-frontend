import React, { useState } from "react";
import { classNames } from "../../utils/classNames";
import StarRating from "./StarRating";

// From Figma: "Menu" 820×1196 fill:#ffffff stroke:#e9eaeb r:20 VERTICAL gap:56 pad:42/0/42/0
// "Frame 3089" VERTICAL gap:24 — sections separated by Rectangle r:20 fill:#d6beeb (1px divider)
// Sections (each: VERTICAL gap:24, divider top):
//   Time Of Day [20px/600] + 3 options with sub-label [13px/500]
//   Duration    [20px/600] + 2 rows of 3 checkboxes
//   Price Range [20px/600] + range slider (Group 3285 771×64)
//   Ratings     [20px/600] + radio rows with star icons
//   Accessibility [20px/600] + 2 rows of 3 checkboxes
// "Button row" HORIZONTAL gap:24:
//   Clear All (text only) + See N Results (fill:#7b2cbf r:40)

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 6l3 3 5-5" stroke="#fefefe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Checkbox = ({ checked, onChange, label, subLabel }) => (
  <label className="flex items-start gap-3 cursor-pointer group">
    <div
      onClick={onChange}
      className={classNames(
        "w-5 h-5 rounded-[4px] border shrink-0 mt-0.5 flex items-center justify-center transition-all duration-200 ease-in cursor-pointer",
        checked
          ? "bg-secondary-normal-default border-secondary-normal-default"
          : "border-primary-dark-default bg-primary-light-default group-hover:border-secondary-normal-default"
      )}
    >
      {checked && <CheckIcon />}
    </div>
    <div className="flex flex-col gap-0.5">
      <span style={{ fontSize:"16px", fontWeight:500, color:"#2d2d2d", fontFamily:"Raleway,sans-serif", lineHeight:"22px" }}>{label}</span>
      {subLabel && <span style={{ fontSize:"13px", fontWeight:400, color:"#949494", fontFamily:"Raleway,sans-serif", lineHeight:"18px" }}>{subLabel}</span>}
    </div>
  </label>
);

const RadioStar = ({ value, selected, onChange }) => (
  <label className="flex items-center gap-2 cursor-pointer">
    <div
      onClick={onChange}
      className={classNames(
        "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 ease-in cursor-pointer shrink-0",
        selected ? "border-secondary-normal-default" : "border-primary-dark-default"
      )}
    >
      {selected && <div className="w-2 h-2 rounded-full bg-secondary-normal-default" />}
    </div>
    <StarRating value={value} size="small" readOnly />
    <span style={{ fontSize:"13px", fontWeight:400, color:"#565656", fontFamily:"Raleway,sans-serif" }}>{value} stars</span>
  </label>
);

const SectionDivider = () => (
  <div className="w-full h-[2px] rounded-[20px]" style={{ backgroundColor:"#d6beeb" }} />
);

const SectionLabel = ({ children }) => (
  <span style={{ fontSize:"20px", fontWeight:600, color:"#565656", fontFamily:"Raleway,sans-serif", lineHeight:"28px" }}>{children}</span>
);

const FilterPanel = React.forwardRef(({
  onClear,
  onApply,
  onClose,
  resultCount = 100,
  className = "",
  ...props
}, ref) => {
  // State for all filters
  const [timeOfDay, setTimeOfDay] = useState({ morning: false, afternoon: false, evening: false });
  const [duration, setDuration] = useState({ under1: false, upto1: false, twotofour: false, halfday: false, fullday: false, multiday: false });
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [rating, setRating] = useState(null);
  const [accessibility, setAccessibility] = useState({ wheelchair: false, family: false, kids: false, elder: false, fullday: false, multiday: false });


  const toggle = (setter, key) => setter(prev => ({ ...prev, [key]: !prev[key] }));

  const handleClearAll = () => {
    setTimeOfDay({ morning: false, afternoon: false, evening: false });
    setDuration({ under1: false, upto1: false, twotofour: false, halfday: false, fullday: false, multiday: false });
    setPriceRange([0, 100]);
    setRating(null);
    setAccessibility({ wheelchair: false, family: false, kids: false, elder: false, fullday: false, multiday: false });
    onClear?.();
  };

  return (
    // Menu: fill:#ffffff stroke:#e9eaeb r:20 VERTICAL gap:56 pad:42/0
    <div
      ref={ref}
      className={classNames("bg-primary-light-default rounded-[20px] flex flex-col", className)}
      style={{ width:"820px", border:"1px solid #e9eaeb", padding:"42px 24px" }}
      {...props}
    >
      {/* Close button */}
      <div className="flex justify-end mb-4">
        <button type="button" onClick={onClose} className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-secondary-light-default transition-all duration-300 ease-in">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#7b2cbf" strokeWidth="1.5"/><path d="M15 9l-6 6M9 9l6 6" stroke="#7b2cbf" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
      </div>

      {/* Sections — VERTICAL gap:24 */}
      <div className="flex flex-col gap-[24px] flex-1">

        {/* Time Of Day */}
        <div className="flex flex-col gap-md">
          <SectionLabel>Time Of Day</SectionLabel>
          <div className="flex gap-[82px]">
            <Checkbox checked={timeOfDay.morning}   onChange={() => toggle(setTimeOfDay,'morning')}   label="Morning"        subLabel="Starts Before 12pm" />
            <Checkbox checked={timeOfDay.afternoon} onChange={() => toggle(setTimeOfDay,'afternoon')} label="Afternoon"      subLabel="Starts After 12pm"  />
            <Checkbox checked={timeOfDay.evening}   onChange={() => toggle(setTimeOfDay,'evening')}   label="Evening & Night" subLabel="Starts After 5pm"  />
          </div>
        </div>

        <SectionDivider />

        {/* Duration */}
        <div className="flex flex-col gap-md">
          <SectionLabel>Duration</SectionLabel>
          <div className="flex flex-col gap-[15px]">
            <div className="flex gap-[82px]">
              <Checkbox checked={duration.under1}    onChange={() => toggle(setDuration,'under1')}    label="Under 1 hour" />
              <Checkbox checked={duration.upto1}     onChange={() => toggle(setDuration,'upto1')}     label="Up to 1 hour" />
              <Checkbox checked={duration.twotofour} onChange={() => toggle(setDuration,'twotofour')} label="2–4 hours"    />
            </div>
            <div className="flex gap-[82px]">
              <Checkbox checked={duration.halfday}   onChange={() => toggle(setDuration,'halfday')}   label="Half-day"  />
              <Checkbox checked={duration.fullday}   onChange={() => toggle(setDuration,'fullday')}   label="Full-day"  />
              <Checkbox checked={duration.multiday}  onChange={() => toggle(setDuration,'multiday')}  label="Multi-day" />
            </div>
          </div>
        </div>

        <SectionDivider />

        {/* Price Range — Group 3285 771×64 */}
        <div className="flex flex-col gap-md">
          <SectionLabel>Price Range</SectionLabel>
          <div className="flex flex-col gap-[8px]">
            <span style={{ fontSize:"13px", fontWeight:400, color:"#565656", fontFamily:"Raleway,sans-serif" }}>
              Gh.{priceRange[0].toFixed(2)}
            </span>
            {/* Range slider track */}
            <div className="relative w-full h-[4px] rounded-full" style={{ backgroundColor:"#e0e0e0" }}>
              <div className="absolute h-full rounded-full"
                style={{ left:`${priceRange[0]}%`, width:`${priceRange[1]-priceRange[0]}%`, backgroundColor:"#7b2cbf" }} />
              {/* Left handle */}
              <input type="range" min="0" max="100" value={priceRange[0]}
                onChange={e => { const v=+e.target.value; if(v<priceRange[1]) setPriceRange([v,priceRange[1]]); }}
                className="absolute w-full h-full opacity-0 cursor-pointer" style={{ zIndex:2 }} />
              {/* Right handle */}
              <input type="range" min="0" max="100" value={priceRange[1]}
                onChange={e => { const v=+e.target.value; if(v>priceRange[0]) setPriceRange([priceRange[0],v]); }}
                className="absolute w-full h-full opacity-0 cursor-pointer" style={{ zIndex:3 }} />
              {/* Handle dots */}
              <div className="absolute w-4 h-4 rounded-full bg-secondary-normal-default border-2 border-primary-light-default shadow"
                style={{ left:`${priceRange[0]}%`, top:"50%", transform:"translate(-50%,-50%)", zIndex:1 }} />
              <div className="absolute w-4 h-4 rounded-full bg-secondary-normal-default border-2 border-primary-light-default shadow"
                style={{ left:`${priceRange[1]}%`, top:"50%", transform:"translate(-50%,-50%)", zIndex:1 }} />
            </div>
          </div>
        </div>

        <SectionDivider />

        {/* Ratings */}
        <div className="flex flex-col gap-md">
          <SectionLabel>Ratings</SectionLabel>
          <div className="flex flex-col gap-[15px]">
            <div className="flex gap-[82px]">
              <RadioStar value={5} selected={rating===5} onChange={() => setRating(r => r===5?null:5)} />
              <RadioStar value={4} selected={rating===4} onChange={() => setRating(r => r===4?null:4)} />
              <RadioStar value={3} selected={rating===3} onChange={() => setRating(r => r===3?null:3)} />
            </div>
            <div className="flex gap-[82px]">
              <RadioStar value={2} selected={rating===2} onChange={() => setRating(r => r===2?null:2)} />
              <RadioStar value={1} selected={rating===1} onChange={() => setRating(r => r===1?null:1)} />
              <RadioStar value={0} selected={rating===0} onChange={() => setRating(r => r===0?null:0)} />
            </div>
          </div>
        </div>

        <SectionDivider />

        {/* Accessibility */}
        <div className="flex flex-col gap-md">
          <SectionLabel>Accessibility</SectionLabel>
          <div className="flex flex-col gap-[15px]">
            <div className="flex gap-[82px]">
              <Checkbox checked={accessibility.wheelchair} onChange={() => toggle(setAccessibility,'wheelchair')} label="Wheelchair accessible" />
              <Checkbox checked={accessibility.family}     onChange={() => toggle(setAccessibility,'family')}     label="Family-friendly"       />
              <Checkbox checked={accessibility.kids}       onChange={() => toggle(setAccessibility,'kids')}       label="Kids-friendly"         />
            </div>
            <div className="flex gap-[82px]">
              <Checkbox checked={accessibility.elder}    onChange={() => toggle(setAccessibility,'elder')}    label="Elder-friendly" />
              <Checkbox checked={accessibility.fullday}  onChange={() => toggle(setAccessibility,'fullday')}  label="Full-day"       />
              <Checkbox checked={accessibility.multiday} onChange={() => toggle(setAccessibility,'multiday')} label="Multi-day"      />
            </div>
          </div>
        </div>
      </div>

      {/* Button row — HORIZONTAL gap:24, Clear All text + See Results button */}
      <div className="flex items-center justify-between mt-[56px] pt-4 border-t border-primary-dark-default">
        <button type="button" onClick={handleClearAll}
          className="underline transition-all duration-300 ease-in hover:text-secondary-normal-default"
          style={{ fontSize:"16px", fontWeight:700, color:"#2d2d2d", fontFamily:"Raleway,sans-serif" }}>
          Clear All
        </button>
        <button type="button" onClick={() => onApply?.({ timeOfDay, duration, priceRange, rating, accessibility })}
          className="px-6 rounded-md bg-secondary-normal-default hover:bg-secondary-normal-hover active:bg-secondary-normal-active transition-all duration-300 ease-in"
          style={{ height:"56px", fontSize:"16px", fontWeight:600, color:"#fefefe", fontFamily:"Raleway,sans-serif" }}>
          See {resultCount} Results
        </button>
      </div>
    </div>
  );
});

FilterPanel.displayName = "FilterPanel";
export default FilterPanel;
