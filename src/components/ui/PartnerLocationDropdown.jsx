import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { classNames } from "../../utils/classNames";

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SectionLine = () => (
  <div className="h-[2px] w-full rounded-[20px] bg-[#d6beeb] opacity-[0.18]" aria-hidden />
);

const ChevronDownSm = ({ expanded }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
    className={classNames("shrink-0 text-[#2d2d2d] transition-transform", expanded && "-rotate-180")}
  >
    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Empty / checked — design ~20×20 */
function RegionCheckbox({ checked, className }) {
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

const GHANA_REGIONS = [
  "Greater Accra",
  "Ashanti",
  "Eastern",
  "Central",
  "Western",
  "Western North",
  "Volta",
  "Oti",
  "Northern",
  "Savannah",
  "North East",
  "Upper East",
  "Bono",
  "Bono East",
  "Ahafo",
];

const COUNTRIES = [
  { id: "ghana", name: "Ghana", flag: "🇬🇭", regions: GHANA_REGIONS },
  { id: "nigeria", name: "Nigeria", flag: "🇳🇬", regions: [] },
  { id: "senegal", name: "Senegal", flag: "🇸🇳", regions: [] },
  { id: "benin", name: "Benin", flag: "🇧🇯", regions: [] },
  { id: "niger", name: "Niger", flag: "🇳🇪", regions: [] },
  { id: "togo", name: "Togo", flag: "🇹🇬", regions: [] },
  { id: "guinea", name: "Guinea", flag: "🇬🇳", regions: [] },
  { id: "mauritania", name: "Mauritania", flag: "🇲🇷", regions: [] },
];

const PANEL_W = 535;

/**
 * Country & region picker — portal dialog anchored to the location pill (Figma: Select Location).
 */
const PartnerLocationDropdown = ({
  open,
  onClose,
  anchorRef,
  onApply,
  resultCount = 100,
  initialPayload = null,
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [expandedId, setExpandedId] = useState("ghana");
  const [selectedRegions, setSelectedRegions] = useState(() => new Set());

  const updatePosition = useCallback(() => {
    const el = anchorRef?.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const panelWidth = Math.min(PANEL_W, window.innerWidth - 32);
    let left = r.left;
    if (left + panelWidth > window.innerWidth - 16) {
      left = Math.max(16, window.innerWidth - panelWidth - 16);
    }
    if (left < 16) left = 16;
    setPosition({ top: r.bottom + 12, left });
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

  /** Hydrate draft from last applied selection when opening */
  useEffect(() => {
    if (!open) return;
    const regions = initialPayload?.regions;
    const countryName = initialPayload?.country;
    if (regions?.length) {
      setSelectedRegions(new Set(regions));
      const c = COUNTRIES.find((x) => x.name === countryName) ?? COUNTRIES[0];
      setExpandedId(c.id);
    } else if (countryName) {
      const c = COUNTRIES.find((x) => x.name === countryName);
      setExpandedId(c?.id ?? "ghana");
      setSelectedRegions(new Set());
    } else {
      setExpandedId("ghana");
      setSelectedRegions(new Set());
    }
  }, [open, initialPayload]);

  const toggleRegion = (name) => {
    setSelectedRegions((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const handleClear = () => {
    setSelectedRegions(new Set());
    setExpandedId("ghana");
  };

  const handleApply = () => {
    if (selectedRegions.size === 0) {
      onApply?.({ country: null, regions: [] });
    } else {
      const regions = GHANA_REGIONS.filter((r) => selectedRegions.has(r));
      onApply?.({ country: "Ghana", regions });
    }
    onClose?.();
  };

  const displayCount = typeof resultCount === "number" && resultCount >= 0 ? resultCount : 100;

  if (!open || typeof document === "undefined") return null;

  const panelWidth = Math.min(PANEL_W, typeof window !== "undefined" ? window.innerWidth - 32 : PANEL_W);

  return createPortal(
    <>
      <button
        type="button"
        className="fixed inset-0 z-[100] cursor-default bg-transparent"
        aria-label="Close location picker"
        onClick={onClose}
      />
      <div
        className={classNames(
          "fixed z-[101] flex max-h-[min(1004px,calc(100vh-96px))] flex-col overflow-hidden rounded-[20px] border border-solid border-[#e9e9eb] bg-white",
          "shadow-[0_4px_6px_0_rgba(10,12,18,0.03)]"
        )}
        style={{
          top: position.top,
          left: position.left,
          width: panelWidth,
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="partner-location-title"
      >
        <div className="flex shrink-0 flex-col gap-6 px-[26px] pt-[22px]">
          <div className="flex flex-col items-end gap-7">
            <button
              type="button"
              onClick={onClose}
              className="text-[#565656] hover:text-secondary-normal-default cursor-pointer border-0 bg-transparent p-0"
              aria-label="Close"
            >
              <CloseIcon />
            </button>
            <SectionLine />
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-[26px] [-webkit-overflow-scrolling:touch]">
          <div className="flex flex-col gap-6 pb-4">
            <div className="flex flex-col gap-4">
              <h2
                id="partner-location-title"
                className="font-raleway text-[25px] font-semibold leading-[29px] text-[#7b2cbf]"
              >
                Select Location
              </h2>
              <p className="font-raleway text-[20px] font-semibold leading-[28px] text-[#565656]">Country</p>
            </div>

            <div className="flex flex-col gap-2">
              {COUNTRIES.map((c) => {
                const expanded = expandedId === c.id;
                return (
                  <div key={c.id} className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setExpandedId(expanded ? null : c.id)}
                      className={classNames(
                        "flex w-full items-center gap-3 rounded-lg py-2.5 pl-0 pr-2 text-left",
                        "cursor-pointer border-0 bg-transparent hover:bg-[#fafafa]"
                      )}
                    >
                      <span className="flex h-[25px] w-[25px] shrink-0 items-center justify-center rounded-[40px] bg-[rgba(123,44,191,0.2)] text-[14px] leading-none">
                        {c.flag}
                      </span>
                      <span className="min-w-0 flex-1 font-raleway text-[16px] font-semibold leading-[22px] text-[#2d2d2d]">
                        {c.name}
                      </span>
                      <span className="shrink-0">
                        <ChevronDownSm expanded={expanded} />
                      </span>
                    </button>

                    {expanded && c.regions.length > 0 && (
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 pb-2 pl-[5px] sm:gap-x-8">
                        {c.regions.map((region) => {
                          const checked = selectedRegions.has(region);
                          return (
                            <button
                              key={region}
                              type="button"
                              onClick={() => toggleRegion(region)}
                              className="flex cursor-pointer items-center gap-2 rounded-md border-0 bg-transparent py-1 text-left hover:bg-[#fafafa]"
                            >
                              <RegionCheckbox checked={checked} />
                              <span className="font-raleway text-[13px] font-medium leading-[22px] text-[#2d2d2d]">
                                {region}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {expanded && c.regions.length === 0 && (
                      <p className="pb-2 pl-9 font-raleway text-[13px] font-medium leading-[22px] text-[#6f6f6f]">
                        Regions for {c.name} coming soon.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex w-full shrink-0 justify-center px-[26px] pb-[22px] pt-[22px]">
          <div className="flex w-full max-w-[425px] items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleClear}
              className="cursor-pointer border-0 bg-transparent px-[10px] py-[10px] font-raleway text-[16px] font-bold leading-[22px] text-[#2d2d2d] underline"
            >
              Clear All
            </button>
            <button
              type="button"
              onClick={handleApply}
              className={classNames(
                "flex h-[56px] min-w-[169px] shrink-0 items-center justify-center px-[10px] py-[10px]",
                "rounded-[40px] bg-[#7b2cbf] shadow-[0_4px_4px_0_rgba(0,0,0,0.05)]",
                "font-raleway text-[16px] font-semibold leading-[22px] text-[#fefefe]",
                "cursor-pointer border-0 transition-opacity hover:opacity-95"
              )}
            >
              See {displayCount} Results
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default PartnerLocationDropdown;
export { GHANA_REGIONS, COUNTRIES };
