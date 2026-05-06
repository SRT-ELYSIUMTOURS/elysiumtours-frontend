import React from "react";
import { classNames } from "../../utils/classNames";

// From Figma: COMPONENT_SET "Maps" (381:3011) — 1416×521, fill:#fefefe r:10
// Contains: Google Maps static embed (RECTANGLE 1427×521 fills:[IMAGE,GRADIENT_LINEAR])
//           + Zoom controls (Down 3 / Down 4 icons — + / - buttons)
//           + Button "Open In Maps" fill:#7b2cbf r:40 [16px/600] #fefefe
// We implement with a Google Maps iframe embed

const MapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#6f6f6f" strokeWidth="1.5"/>
    <circle cx="12" cy="9" r="2.5" stroke="#6f6f6f" strokeWidth="1.5"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M12 5v14M5 12h14" stroke="#b9b9b9" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const MinusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14" stroke="#b9b9b9" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="#fefefe" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MapEmbed = React.forwardRef(({
  // Default to Accra, Ghana (from Figma map image)
  src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127521.83636879218!2d-0.2833822!3d5.6037168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2sAccra%2C%20Ghana!5e0!3m2!1sen!2sgh!4v1700000000000",
  address = "Accra, Ghana",
  openMapsUrl = "https://maps.google.com/?q=Accra,Ghana",
  height = 521,
  className = "",
  ...props
}, ref) => {

  return (
    // Frame: fill:#fefefe r:10
    <div
      ref={ref}
      className={classNames("relative w-full overflow-hidden rounded-[10px] bg-primary-light-default", className)}
      style={{ height }}
      {...props}
    >
     

      {/* Zoom controls — top-right, matching Figma Down 3 / Down 4 */}
      <div className="absolute top-3 right-3 z-10 flex flex-col rounded-[8px] overflow-hidden border border-primary-dark-default bg-primary-light-default shadow">
        <button
          type="button"
          className="w-[38px] h-[37px] flex items-center justify-center hover:bg-primary-normal-default transition-all duration-300 ease-in border-b border-primary-dark-default"
          aria-label="Zoom in"
        >
          <PlusIcon />
        </button>
        <button
          type="button"
          className="w-[38px] h-[37px] flex items-center justify-center hover:bg-primary-normal-default transition-all duration-300 ease-in"
          aria-label="Zoom out"
        >
          <MinusIcon />
        </button>
      </div>

      {/* Google Maps iframe — RECTANGLE 1427×521 fills:[IMAGE] */}
      <iframe
        title={`Map of ${address}`}
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* "Open In Maps" button — absolute bottom-left
          fill:#7b2cbf r:40 226×56 [16px/600] #fefefe */}
      <div className="absolute bottom-4 left-4 z-10">
        <a
          href={openMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-[10px] px-6 rounded-[var(--radius-md)] transition-all duration-300 ease-in bg-secondary-normal-default hover:bg-secondary-normal-hover active:bg-secondary-normal-active"
          style={{ height: "56px" }}
        >
          <span style={{ fontSize: "16px", fontWeight: 600, color: "#fefefe", fontFamily: "Raleway, sans-serif" }}>
            Open In Maps
          </span>
          <ArrowIcon />
        </a>
      </div>
    </div>
  );
});

MapEmbed.displayName = "MapEmbed";
export default MapEmbed;
