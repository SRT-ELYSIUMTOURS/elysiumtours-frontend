import React from "react";
import { classNames } from "../../../utils/classNames";

const GallerySectionErrorState = ({ message = "Failed to load photos", onRetry }) => (
  <div className="flex flex-col items-center justify-center py-[72px] gap-[16px]">
    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="#f87171" strokeWidth="1.5" />
      <path d="M12 8v4" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="15.5" r="0.75" fill="#f87171" />
    </svg>
    <p className="font-raleway font-medium text-[15px] leading-[22px] text-[#b9b9b9] text-center max-w-[280px]">
      {message}
    </p>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className={classNames(
          "mt-2 h-[40px] px-[24px] rounded-[20px]",
          "border border-secondary-normal-default bg-transparent",
          "font-raleway font-semibold text-[14px] text-secondary-normal-default",
          "hover:bg-secondary-light-default transition-colors duration-200 cursor-pointer"
        )}
      >
        Retry
      </button>
    )}
  </div>
);

export default GallerySectionErrorState;
