import React from "react";
import { classNames } from "../../../utils/classNames";

// Figma: 1942:31919 — "Why [Country]" section (Tours country page)
// Layout: 1728×auto, bg #fefefe, py-[80px] px-[156px]
//
// countryData — Country DB document (from countriesSlice).
// This section is only rendered by TourCountryPage when countryData is present,
// so all fields are expected to be populated.
const WhyCountrySection = React.forwardRef(
  ({ country = "ghana", countryData, className, ...props }, ref) => {
    const displayName = country
      ? country.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
      : "Country";

    const label      = `WHY ${displayName.toUpperCase()}`;
    const title      = countryData?.whyTitle      || `Discover ${displayName}`;
    const paragraphs = countryData?.whyParagraphs?.length
      ? countryData.whyParagraphs
      : [`${displayName} offers extraordinary travel experiences with Elysium Tours.`];
    const stats         = countryData?.whyStats      || [];
    const image         = countryData?.whyImage      || "/tourCountryAssets/Image-1.webp";
    const imageTitle    = countryData?.whyImageTitle    || displayName;
    const imageSubtitle = countryData?.whyImageSubtitle || "";

    return (
      <section
        ref={ref}
        className={classNames("relative w-full noise", className)}
        style={{ backgroundColor: "#fefefe", paddingTop: "80px", paddingBottom: "80px" }}
        {...props}
      >
        <div className="flex flex-col px-6 md:px-[30px] lg:px-[156px]" style={{ gap: "32px" }}>

          {/* ── Header row ──────────────────────────────────────────────────── */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full gap-4 lg:gap-0">

            {/* Left — 46px line + "WHY [COUNTRY]" label */}
            <div className="flex items-center gap-[8px] shrink-0">
              <div style={{ width: "46px", height: "1px", backgroundColor: "#2b0f43" }} />
              <span
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 700,
                  fontSize: "13px",
                  lineHeight: "18px",
                  color: "#2b0f43",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            </div>

            {/* Right — title + description + stat pills */}
            <div className="flex flex-col items-center lg:items-end w-full lg:w-[677px]" style={{ gap: "16px" }}>

              {/* Title */}
              <h2
                className="text-center lg:text-right"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 700,
                  fontSize: "25px",
                  lineHeight: "34px",
                  color: "#2d2d2d",
                  margin: 0,
                }}
              >
                {title}
              </h2>

              {/* Description + stats */}
              <div className="flex flex-col items-center lg:items-end w-full" style={{ gap: "29px" }}>

                {/* Body paragraphs */}
                <div className="flex flex-col w-full lg:w-[565px]">
                  {paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="text-center lg:text-right"
                      style={{
                        fontFamily: "Raleway, sans-serif",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "24px",
                        color: "#2d2d2d",
                        margin: i < paragraphs.length - 1 ? "0 0 16px 0" : 0,
                      }}
                    >
                      {p}
                    </p>
                  ))}
                </div>

                {/* Stat pills */}
                {stats.length > 0 && (
                  <div className="flex flex-wrap items-start justify-center lg:justify-end gap-[12px] lg:gap-[24px]">
                    {stats.map((stat, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-center rounded-[12px] shrink-0"
                        style={{ border: "1px solid #f2eaf9", padding: "12px" }}
                      >
                        <div className="flex flex-col items-start" style={{ gap: "3px" }}>
                          <span
                            style={{
                              fontFamily: "Raleway, sans-serif",
                              fontWeight: 600,
                              fontSize: "13px",
                              lineHeight: "18px",
                              color: "#7b2cbf",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {stat.label}
                          </span>
                          <span
                            style={{
                              fontFamily: "Raleway, sans-serif",
                              fontWeight: 500,
                              fontSize: "12px",
                              lineHeight: "18px",
                              color: "#555555",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {stat.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Full-width image with caption overlay ───────────────────────── */}
          <div
            className="relative overflow-hidden rounded-[20px] shrink-0 w-full h-[280px] md:h-[450px] lg:h-[654px]"
            style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.05)" }}
          >
            <img src={image} alt={imageTitle} className="absolute inset-0 w-full h-full object-cover" />

            {/* Frosted caption overlay */}
            <div className="absolute left-3 right-3 bottom-3 lg:left-[25px] lg:right-auto lg:bottom-[25px] lg:w-[623px]">
              <div
                className="absolute inset-0 rounded-[10px] noise overflow-hidden"
                style={{
                  backdropFilter: "blur(50px)",
                  WebkitBackdropFilter: "blur(50px)",
                  background: "rgba(255, 255, 255, 1)",
                  borderTop: "1.5px solid #fefefe",
                  borderLeft: "1.5px solid #fefefe",
                  borderRight: "1.5px solid #fefefe",
                  borderBottom: "1.5px solid #fefefe",
                }}
              >
                <svg
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <filter id="grain-filter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
                    <feColorMatrix type="saturate" values="0" />
                  </filter>
                  <rect width="100%" height="100%" filter="url(#grain-filter)" opacity="0.09" />
                </svg>
              </div>

              {/* Caption text */}
              <div className="relative flex flex-col justify-center p-4 lg:p-[26px] w-full lg:max-w-[535px]" style={{ gap: "8px" }}>
                <p className="text-High-md-bold text-tertiary-normal-default">{imageTitle}</p>
                {imageSubtitle && (
                  <p className="text-md-regular text-tertiary-normal-default">{imageSubtitle}</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>
    );
  }
);

WhyCountrySection.displayName = "WhyCountrySection";
export default WhyCountrySection;
