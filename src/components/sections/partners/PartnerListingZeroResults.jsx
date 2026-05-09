import React from "react";
import { classNames } from "../../../utils/classNames";

/** Illustration — matches empty-state slot (~56×56), no external asset URLs */
const ZeroResultsIllustration = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
  <path d="M36.5252 34.4379C38.0631 33.3221 39.9549 32.6641 42.0003 32.6641C47.1549 32.6641 51.3337 36.8428 51.3337 41.9974C51.3337 42.9746 51.3327 43.4639 50.8763 43.8141C50.4197 44.1641 49.8672 44.0155 48.7626 43.7185L47.3206 43.3307M50.8763 43.8141C50.8766 43.8139 50.8761 43.8141 50.8763 43.8141ZM36.667 40.6641L35.2376 40.2784C34.1344 39.9807 33.5831 39.8318 33.1262 40.1802C33.125 40.1811 33.1234 40.1823 33.1225 40.1832C32.667 40.5335 32.667 41.0214 32.667 41.9974C32.667 47.152 36.8458 51.3307 42.0003 51.3307C43.9776 51.3307 45.8114 50.7159 47.3206 49.6668" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M51.3337 27.9974V21.5049C51.3337 16.9791 51.3337 14.7162 49.9668 13.3102C48.5999 11.9043 46.4001 11.9043 42.0003 11.9043H37.1503C35.0097 11.9043 34.9919 11.9001 33.0672 10.9369L25.2934 7.04672C22.0476 5.42249 20.4247 4.61037 18.6959 4.66682C16.967 4.72326 15.3975 5.63958 12.2584 7.47225L9.39335 9.14493C7.08757 10.4911 5.93467 11.1642 5.30082 12.2839C4.66699 13.4036 4.66699 14.7672 4.66699 17.4944V36.6674C4.66699 40.2507 4.66699 42.0424 5.4656 43.0397C5.99702 43.7031 6.7417 44.1492 7.56499 44.2971C8.80227 44.5193 10.3171 43.6349 13.3467 41.866C15.404 40.6651 17.3839 39.4177 19.845 39.756C21.9073 40.0393 23.8237 41.3406 25.667 42.2629" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M18.667 4.66406V39.6641" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
  <path d="M35 11.6641V26.8307" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
);

/**
 * Shown when partner listing filters yield no matches (Figma-style empty state).
 */
const PartnerListingZeroResults = ({ onResetFilters, className = "", ...props }) => {
  return (
    <div
      className={classNames(
        "mx-auto my-0 flex w-full max-w-[527px] flex-col items-center gap-3 flex-nowrap",
        className
      )}
      {...props}
    >
      <div className="flex w-full max-w-[445px] flex-col items-center gap-1 shrink-0">
        <ZeroResultsIllustration />
        <div className="flex w-full max-w-[445px] flex-col items-center">
          <div className="flex min-h-[40px] w-full max-w-[445px] items-center justify-center gap-[10px]">
            <span className="max-w-[445px] text-center font-raleway text-[20px] font-semibold leading-[45px] text-[#2d2d2d]">
              Nothing Available Right Now
            </span>
          </div>
          <div className="flex min-h-[48px] w-full max-w-[445px] items-center justify-center gap-[10px] px-1">
            <span className="max-w-[439px] text-center font-raleway text-[13px] font-medium leading-[22px] text-[#6f6f6f]">
              We couldn&apos;t find any stays that match your current filters. Try changing your dates or location.
            </span>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={onResetFilters}
        className={classNames(
          "flex h-[56px] min-w-[169px] shrink-0 items-center justify-center px-[10px] py-[10px]",
          "rounded-[40px] bg-[#7b2cbf] shadow-[0_4px_4px_0_rgba(0,0,0,0.05)]",
          "font-raleway text-[16px] font-semibold leading-[22px] text-[#fefefe]",
          "cursor-pointer border-0 transition-opacity hover:opacity-95"
        )}
      >
        Reset all filters
      </button>
    </div>
  );
};

export default PartnerListingZeroResults;
