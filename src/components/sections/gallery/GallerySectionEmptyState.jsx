import React from "react";

const GallerySectionEmptyState = ({ message = "No photos in this section yet" }) => (
  <div className="flex flex-col items-center justify-center py-[72px] gap-[16px]">
    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="20" height="15" rx="3" stroke="#d1d5db" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3.5" stroke="#d1d5db" strokeWidth="1.5" />
      <path d="M8.5 5L9.5 3h5l1 2" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <p className="font-raleway font-medium text-[15px] leading-[22px] text-[#b9b9b9] text-center max-w-[280px]">
      {message}
    </p>
  </div>
);

export default GallerySectionEmptyState;
