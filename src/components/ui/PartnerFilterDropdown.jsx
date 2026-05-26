import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { createPortal, flushSync } from "react-dom";
import { classNames } from "../../utils/classNames";

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SectionLine = () => (
  <div className="h-[2px] w-full rounded-[20px] bg-[#d6beeb] opacity-[0.18]" aria-hidden />
);

const StarVisual = ({ filled, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 11 10" className="shrink-0" fill="none" aria-hidden>
    <path
      d="M4.11 0.69C4.41-0.23 5.71-0.23 6.01 0.69L6.52 2.26C6.65 2.67 7.03 2.95 7.47 2.95H9.11C10.08 2.95 10.48 4.19 9.7 4.76L8.37 5.72C8.02 5.98 7.87 6.43 8.01 6.84L8.51 8.4C8.81 9.33 7.76 10.09 6.98 9.52L5.64 8.56C5.29 8.3 4.82 8.3 4.47 8.56L3.14 9.52C2.35 10.09 1.3 9.33 1.6 8.4L2.11 6.84C2.25 6.43 2.1 5.98 1.75 5.72L0.41 4.76C-0.37 4.19 0.03 2.95 1 2.95H2.65C3.08 2.95 3.46 2.67 3.6 2.26L4.11 0.69Z"
      className={filled ? "fill-[#7b2cbf]" : "fill-none stroke-[#b9b9b9] stroke-[0.5]"}
    />
  </svg>
);

const SunMorning = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#2d2d2d]">
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const SunAfternoon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#2d2d2d]">
    <circle cx="12" cy="11" r="5" fill="currentColor" opacity="0.25" />
    <circle cx="12" cy="11" r="4" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const MoonNight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#2d2d2d]">
    <path d="M20.5 14.5A8.5 8.5 0 0111 4a8.5 8.5 0 108.5 10.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const IconClock = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#2d2d2d]">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const TIME_OPTIONS = [
  { id: "morning", label: "Morning", sub: "Starts Before 12pm", Icon: SunMorning },
  { id: "afternoon", label: "Afternoon", sub: "Starts After 12pm", Icon: SunAfternoon },
  { id: "evening", label: "Evening & Night", sub: "Starts After 5pm", Icon: MoonNight },
];

const DURATION_ROW1 = [
  { id: "under1", label: "Under 1 hour" },
  { id: "up1", label: "Up to 1 hour" },
  { id: "2to4", label: "2–4 hours" },
];

const DURATION_ROW2 = [
  { id: "half", label: "Half-day" },
  { id: "full", label: "Full-day" },
  { id: "multi", label: "Multi-day" },
];

const ACCESS_ROW1 = [
  { key: "wheelchair", label: "Wheelchair accessible" },
  { key: "family", label: "Family-friendly" },
  { key: "kids", label: "Kids-friendly" },
];

const ACCESS_ROW2 = [
  { key: "elder", label: "Elder-friendly" },
  { key: "fullDayAcc", label: "Full-day" },
  { key: "multiDayAcc", label: "Multi-day" },
];

const emptyTimeOfDay = () => ({
  morning: false,
  afternoon: false,
  evening: false,
});

const emptyDuration = () => ({
  under1: false,
  up1: false,
  "2to4": false,
  half: false,
  full: false,
  multi: false,
});

/** Shared checkbox (square) — matches Accessibility section */
function FilterCheckbox({ checked, className }) {
  return (
    <span
      className={classNames(
        "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2",
        checked ? "border-[#7b2cbf] bg-[#7b2cbf]" : "border-[#b9b9b9] bg-transparent",
        className
      )}
    >
      {checked && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </span>
  );
}

const rangeThumbClasses =
  "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-secondary-light-hover [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-grab active:[&::-webkit-slider-thumb]:cursor-grabbing [&::-webkit-slider-thumb]:mt-[-6px] [&::-moz-range-thumb]:mt-[-6px] [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-secondary-light-hover [&::-moz-range-thumb]:cursor-grab active:[&::-moz-range-thumb]:cursor-grabbing [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent touch-none";

function TimeOption({ opt }) {
  return (
    <div className="flex items-start gap-4">
     
      <div className="flex flex-col gap-1">
        <span className="font-raleway text-[16px] font-semibold leading-[22px] text-[#2d2d2d]">{opt.label}</span>
        <span className="font-raleway text-[13px] font-medium leading-[22px] text-[#6f6f6f]">{opt.sub}</span>
      </div>
    </div>
  );
}

function DurationOption({ opt }) {
  return (
    <div className="flex items-start gap-4">
      <span className="font-raleway text-[16px] font-semibold leading-[22px] text-[#2d2d2d]">{opt.label}</span>
    </div>
  );
}

function RatingOption({ stars, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(selected === stars ? null : stars)}
      className={classNames(
        "flex flex-wrap flex-1 items-center gap-2 rounded-lg py-2.5 pr-2 text-left cursor-pointer border-0 bg-transparent",
      )}
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#b9b9b9]">
        <span
          className={classNames(
            "h-2.5 w-2.5 rounded-full bg-[#7b2cbf] transition-opacity",
            selected === stars ? "opacity-100" : "opacity-0"
          )}
        />
      </span>
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarVisual key={i} filled={i < stars} />
        ))}
      </div>
      <span className="font-raleway text-[16px] font-semibold leading-[22px] text-[#2d2d2d]">
        {stars === 0 ? "0 stars" : `${stars} star${stars !== 1 ? "s" : ""}`}
      </span>
    </button>
  );
}

/**
 * Partner filters as a fixed dropdown under the Filters pill (portal — avoids overflow clipping).
 */
const PartnerFilterDropdown = ({
  open,
  onClose,
  anchorRef,
  onApply,
  resultCount = 100,
  priceMaxDefault = 5000,
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [timeOfDay, setTimeOfDay] = useState(emptyTimeOfDay);
  const [duration, setDuration] = useState(emptyDuration);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(priceMaxDefault);
  /** Which range input is on top so both thumbs stay draggable when overlapping */
  const [activePriceThumb, setActivePriceThumb] = useState(null);
  const [rating, setRating] = useState(null);
  const [access, setAccess] = useState({
    wheelchair: false,
    family: false,
    kids: false,
    elder: false,
    fullDayAcc: false,
    multiDayAcc: false,
  });

  const updatePosition = useCallback(() => {
    const el = anchorRef?.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const panelWidth = Math.min(820, window.innerWidth - 32);
    let left = r.left;
    if (left + panelWidth > window.innerWidth - 16) {
      left = Math.max(16, window.innerWidth - panelWidth - 16);
    }
    if (left < 16) left = 16;
    setPosition({ top: r.bottom + 48, left });
  }, [anchorRef]);

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    const clearThumb = () => setActivePriceThumb(null);
    window.addEventListener("pointerup", clearThumb);
    window.addEventListener("pointercancel", clearThumb);
    return () => {
      window.removeEventListener("pointerup", clearThumb);
      window.removeEventListener("pointercancel", clearThumb);
    };
  }, []);

  const toggleAccess = (key) => {
    setAccess((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleClear = () => {
    setTimeOfDay(emptyTimeOfDay());
    setDuration(emptyDuration());
    setPriceMin(0);
    setPriceMax(priceMaxDefault);
    setActivePriceThumb(null);
    setRating(null);
    setAccess({
      wheelchair: false,
      family: false,
      kids: false,
      elder: false,
      fullDayAcc: false,
      multiDayAcc: false,
    });
  };

  const buildPayload = () => ({
    timeOfDay: { ...timeOfDay },
    duration: { ...duration },
    priceRange: { min: priceMin, max: priceMax },
    minRating: rating,
    accessibility: { ...access },
  });

  const handleApply = () => {
    onApply?.(buildPayload());
    onClose?.();
  };

  if (!open || typeof document === "undefined") return null;

  const priceMinPct = (priceMin / priceMaxDefault) * 100;
  const priceMaxPct = (priceMax / priceMaxDefault) * 100;
  const priceSpanPct = Math.max(0, priceMaxPct - priceMinPct);
  /** Lower thumb sits slightly above when idle so both handles remain reachable; pointerdown + flushSync raises the active track */
  const minSliderZ = activePriceThumb === "max" ? 12 : activePriceThumb === "min" ? 40 : 34;
  const maxSliderZ = activePriceThumb === "min" ? 12 : activePriceThumb === "max" ? 40 : 33;

  return createPortal(
    <>
      <button
        type="button"
        className="fixed inset-0 z-[100] cursor-default bg-transparent"
        aria-label="Close filters"
        onClick={onClose}
      />
      <div
        className={classNames(
          "fixed z-[101] flex max-h-[min(1196px,calc(100vh-96px))] w-[min(820px,calc(100vw-32px))] flex-col overflow-hidden rounded-[20px] border border-[#e9e9eb] bg-white",
          "shadow-[0_4px_6px_0_rgba(10,12,18,0.03)] pt-[42px] pb-[42px]"
        )}
        style={{ top: position.top, left: position.left }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="partner-filter-dropdown-title"
      >
        <div className="flex shrink-0 flex-col gap-7 px-6 sm:px-[24px]">
          <div className="flex flex-col items-end gap-7">
            <button
              type="button"
              onClick={onClose}
              className="mr-1 text-[#565656] hover:text-secondary-normal-default cursor-pointer border-0 bg-transparent p-0"
              aria-label="Close"
            >
              <CloseIcon />
            </button>
            <SectionLine />
          </div>
        </div>

        <div className="mt-6 flex min-h-0 flex-1 flex-col gap-14 overflow-y-auto overflow-x-hidden overscroll-contain px-6 sm:px-[24px] [-webkit-overflow-scrolling:touch]">
          <div className="flex flex-col ">
            <h2 id="partner-filter-dropdown-title" className="font-raleway text-[20px] font-semibold leading-[28px] text-[#565656]">
              Time Of Day
            </h2>
            <div className="flex flex-wrap gap-x-10 gap-y-6">
              {TIME_OPTIONS.map((opt) => {
                const checked = timeOfDay[opt.id];
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() =>
                      setTimeOfDay((prev) => ({ ...prev, [opt.id]: !prev[opt.id] }))
                    }
                    className={classNames(
                      "flex items-start gap-4 flex-1 rounded-xl outline-none border-0 bg-transparent py-2 text-left cursor-pointer transition-shadow",
                    )}
                  >
                    <FilterCheckbox checked={checked} className="mt-1" />
                    <TimeOption opt={opt} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <SectionLine />
            <div className="flex flex-col gap-4">
              <span className="font-raleway text-[20px] font-semibold leading-[28px] text-[#565656]">Duration</span>
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-x-12 gap-y-4">
                  {DURATION_ROW1.map((opt) => {
                    const checked = duration[opt.id];
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setDuration((prev) => ({ ...prev, [opt.id]: !prev[opt.id] }))
                        }
                        className={classNames(
                          "flex items-start gap-4 flex-1 outline-none border-0 bg-transparent py-2 text-left cursor-pointer",
                        )}
                      >
                        <FilterCheckbox checked={checked} className="mt-0.5" />
                        <DurationOption opt={opt} />
                      </button>
                    );
                  })}
                </div>
                <div className="flex flex-wrap gap-x-14 gap-y-4">
                  {DURATION_ROW2.map((opt) => {
                    const checked = duration[opt.id];
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setDuration((prev) => ({ ...prev, [opt.id]: !prev[opt.id] }))
                        }
                        className={classNames(
                          "flex items-start gap-4 outline-none flex-1 border-0 bg-transparent py-2 text-left cursor-pointer",
                        )}
                      >
                        <FilterCheckbox checked={checked} className="mt-0.5" />
                        <DurationOption opt={opt} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <SectionLine />
            <div className="flex flex-col gap-4">
              <span className="font-raleway text-[20px] font-semibold leading-[28px] text-[#565656]">Price Range</span>
              <div className="flex flex-col gap-2">
                <div className="relative flex h-11 w-full items-center justify-center">
                  <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-secondary-light-hover" />
                  <div
                    className="pointer-events-none absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-secondary-normal-default"
                    style={{ left: `${priceMinPct}%`, width: `${priceSpanPct}%` }}
                  />
                  <input
                    type="range"
                    min={0}
                    max={priceMaxDefault}
                    step={50}
                    value={priceMin}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setPriceMin(Math.min(v, priceMax));
                    }}
                    onPointerDown={() => {
                      flushSync(() => setActivePriceThumb("min"));
                    }}
                    aria-label="Minimum price"
                    style={{ zIndex: minSliderZ }}
                    className={classNames(
                      "absolute inset-x-0 top-1/2 h-10 w-full -translate-y-1/2 cursor-pointer appearance-none bg-transparent",
                      rangeThumbClasses
                    )}
                  />
                  <input
                    type="range"
                    min={0}
                    max={priceMaxDefault}
                    step={50}
                    value={priceMax}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setPriceMax(Math.max(v, priceMin));
                    }}
                    onPointerDown={() => {
                      flushSync(() => setActivePriceThumb("max"));
                    }}
                    aria-label="Maximum price"
                    style={{ zIndex: maxSliderZ }}
                    className={classNames(
                      "absolute inset-x-0 top-1/2 h-10 w-full -translate-y-1/2 cursor-pointer appearance-none bg-transparent",
                      rangeThumbClasses
                    )}
                  />
                </div>
                <div className="mt-2 flex justify-between font-raleway text-[13px] font-medium text-[#6f6f6f]">
                  <span>Gh.{priceMin.toFixed(2)}</span>
                  <span>Gh.{priceMax.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <SectionLine />
            <div className="flex flex-col gap-4">
              <span className="font-raleway text-[20px] font-semibold leading-[28px] text-[#565656]">Ratings</span>
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {[5, 4, 3].map((s) => (
                    <RatingOption  key={s} stars={s} selected={rating} onSelect={setRating} />
                  ))}
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {[2, 1, 0].map((s) => (
                    <RatingOption key={s} stars={s} selected={rating} onSelect={setRating} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <SectionLine />
            <div className="flex flex-col gap-4">
              <span className="font-raleway text-[20px] font-semibold leading-[28px] text-[#565656]">Accessibility</span>
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-x-8 gap-y-3">
                  {ACCESS_ROW1.map(({ key, label }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggleAccess(key)}
                      className={classNames(
                        "flex flex-1 items-center gap-4 rounded-lg py-2 text-left cursor-pointer border-0 bg-transparent",
                      )}
                    >
                      <span
                        className={classNames(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2",
                          access[key] ? "border-[#7b2cbf] bg-[#7b2cbf]" : "border-[#b9b9b9] bg-transparent"
                        )}
                      >
                        {access[key] && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        )}
                      </span>
                    
                      <span className="font-raleway text-[16px] font-semibold leading-[22px] text-[#2d2d2d]">{label}</span>
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-x-10 gap-y-3">
                  {ACCESS_ROW2.map(({ key, label }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggleAccess(key)}
                      className={classNames(
                        "flex flex-1 items-center gap-4 rounded-lg py-2 text-left cursor-pointer border-0 bg-transparent",
                      )}
                    >
                      <span
                        className={classNames(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2",
                          access[key] ? "border-[#7b2cbf] bg-[#7b2cbf]" : "border-[#b9b9b9] bg-transparent"
                        )}
                      >
                        {access[key] && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        )}
                      </span>
                      <span className="font-raleway text-[16px] font-semibold leading-[22px] text-[#2d2d2d]">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex shrink-0 flex-wrap items-center justify-between gap-4 border-t border-[#f2f2f4] px-6 pt-6 sm:px-[24px]">
          <button
            type="button"
            onClick={handleClear}
            className="cursor-pointer border-0 bg-transparent font-raleway text-[16px] font-bold leading-[22px] text-[#2d2d2d] underline underline-offset-2"
          >
            Clear All
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex h-[56px] min-w-[169px] items-center justify-center rounded-[40px] bg-[#7b2cbf] px-[10px] py-[10px] font-raleway text-[16px] font-semibold leading-[22px] text-[#fefefe] shadow-[0_4px_4px_0_rgba(0,0,0,0.05)] cursor-pointer border-0"
          >
            See {resultCount} Results
          </button>
        </div>
      </div>
    </>,
    document.body
  );
};

export default PartnerFilterDropdown;
