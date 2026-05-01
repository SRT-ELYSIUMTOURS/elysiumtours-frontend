import React from "react";
import { classNames } from "../../../utils/classNames";

// Figma: 1942:31919 — "Why [Country]" section (Tours country page)
// Layout: 1728×auto, bg #fefefe, py-[80px] px-[156px]
// Inner: flex-col gap-[32px]
//   1. Header row (justify-between):
//      Left — 46px line + "WHY GHANA" bold 13px #2b0f43
//      Right (w=677px) — title + description + stat pills
//   2. Full-width image (h=654px, rounded-[20px]) with frosted caption overlay (bottom-left)

const COUNTRY_DATA = {
  ghana: {
    label: "WHY GHANA",
    title: "A Country That Holds Its History",
    paragraphs: [
      `Ghana was the first sub-Saharan African country to gain independence from colonial rule in 1957, under Kwame Nkrumah's rallying cry "Ghana, your beloved country is free forever." That spirit of pride, resilience, and cultural rootedness is woven into every experience Elysium offers here.`,
      `From the Ashanti Kingdom's centuries of gold and governance, to the fishing communities of the Central Coast living exactly as their ancestors did — Ghana rewards the traveler who goes slowly and pays attention.`,
    ],
    stats: [
      { label: "Independence", value: "6th March 1957" },
      { label: "Population", value: "34 million (2024)" },
      { label: "Ethnic Groups", value: "100+ distinct groups" },
    ],
    image: "/tourCountryAssets/Image-1.webp",
    imageTitle: "Elmina Castle, Central Region",
    imageSubtitle: "Built in 1932. A UNESCO World Heritage Site.",
  },
  nigeria: {
    label: "WHY NIGERIA",
    title: "A Nation of Extraordinary Depth",
    paragraphs: [
      `Nigeria is home to over 250 ethnic groups and a culture shaped by centuries of tradition, commerce, and resilience. From the ancient walls of Kano to the vibrant art scene of Lagos, this is a country that continually surprises.`,
      `Elysium's Nigeria experiences are crafted to reveal the many layers of this remarkable nation — its kingdoms, its coastlines, its food, its music, and its people.`,
    ],
    stats: [
      { label: "Independence", value: "1st October 1960" },
      { label: "Population", value: "220 million (2024)" },
      { label: "Ethnic Groups", value: "250+ distinct groups" },
    ],
    image: "/tourCountryAssets/Image-1.webp",
    imageTitle: "Olumo Rock, Abeokuta",
    imageSubtitle: "A historic fortress used during intertribal wars.",
  },
};

const WhyCountrySection = React.forwardRef(
  ({ country = "ghana", className, ...props }, ref) => {
    const key = country?.toLowerCase();
    const data = COUNTRY_DATA[key] || {
      ...COUNTRY_DATA.ghana,
      label: `WHY ${country?.toUpperCase()}`,
      title: `Discover ${country}`,
    };

    return (
      <section
        ref={ref}
        className={classNames("relative w-full noise", className)}
        style={{
          backgroundColor: "#fefefe",
          paddingTop: "80px",
          paddingBottom: "80px",
        }}
        {...props}
      >
        <div
          className="flex flex-col px-6 md:px-[30px] lg:px-[156px]"
          style={{ gap: "32px" }}
        >
          {/* ── Header row ──────────────────────────────────────────────────── */}
          {/* Figma 1942:31920 — justify-between, full width */}
          <div className="flex items-start justify-between w-full">
            {/* Left — Figma 1942:31921: 46px line + "WHY GHANA" label */}
            <div className="flex items-center gap-[8px] shrink-0">
              <div
                style={{
                  width: "46px",
                  height: "1px",
                  backgroundColor: "#2b0f43",
                }}
              />
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
                {data.label}
              </span>
            </div>

            {/* Right — Figma 1942:31925: w=677px, flex-col gap-16px, items-end */}
            <div
              className="flex flex-col items-end"
              style={{ width: "677px", gap: "16px" }}
            >
              {/* Title — Figma 1942:31927: Bold 25px #2d2d2d, text-right */}
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
                {data.title}
              </h2>

              {/* Description + stats — Figma 1942:31928: flex-col gap-29px */}
              <div
                className="flex flex-col items-end"
                style={{ gap: "29px", width: "100%" }}
              >
                {/* Body text — Figma 1942:31929: Regular 16px #2d2d2d, text-right, w=565px */}
                <div
                  className="flex flex-col"
                  style={{ width: "565px", gap: "0px" }}
                >
                  {data.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="text-center lg:text-right"
                      style={{
                        fontFamily: "Raleway, sans-serif",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "24px",
                        color: "#2d2d2d",
                        textAlign: "right",
                        margin:
                          i < data.paragraphs.length - 1 ? "0 0 16px 0" : 0,
                      }}
                    >
                      {p}
                    </p>
                  ))}
                </div>

                {/* Stat pills — Figma 1942:31998: flex gap-24px */}
                {/* Each pill: border #f2eaf9, rounded-12px, p-12px */}
                {/* Label: SemiBold 13px #7b2cbf | Value: Medium 12px #555 */}
                <div className="flex flex-wrap items-start justify-center lg:justify-end gap-[12px] lg:gap-[24px]">
                  {data.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center rounded-[12px] shrink-0"
                      style={{
                        border: "1px solid #f2eaf9",
                        padding: "12px",
                      }}
                    >
                      <div
                        className="flex flex-col items-start"
                        style={{ gap: "3px" }}
                      >
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
              </div>
            </div>
          </div>

          {/* ── Full-width image with caption overlay ───────────────────────── */}
          {/* Figma 3029:36185: h=654px, rounded-20px, overflow-hidden, box-shadow */}
          <div
            className="relative overflow-hidden rounded-[20px] shrink-0 w-full h-[280px] md:h-[450px] lg:h-[654px]"
            style={{
              boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.05)",
            }}
          >
            <img
              src={data.image}
              alt={data.imageTitle}
              className="absolute inset-0 w-full  h-full object-cover"
            />

            {/* Frosted caption overlay — Figma 3029:36186 */}
            {/* Positioned: left=25px, centered at top=calc(50%+229.5px), h=137px, w=623px */}
            <div
              className="absolute left-3 right-3 bottom-3 lg:left-[25px] lg:right-auto lg:bottom-[25px] lg:w-[623px]"
            >
              {/* Backdrop glass panel — Figma 3029:36187 */}
              {/* White-tinted frosted glass: backdrop-blur 50px + rgba(255,255,255,0.72) base */}
              {/* Asymmetric borders: 1.5px top/l/r, 13px bottom (thick white bottom "shelf") */}
              {/* overflow-hidden clips grain layer to rounded corners */}
              <div
                className="absolute inset-0 rounded-[10px] bg-black  noise overflow-hidden"
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
                {/* Subtle paper-grain noise — tiny svg turbulence rendered as CSS mask */}
                {/* opacity kept low so it reads as texture, not pattern */}
                <svg
                  aria-hidden="true"
                  className="absolute inset-0 w-full   h-full pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <filter id="grain-filter">
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.72"
                      numOctaves="4"
                      stitchTiles="stitch"
                    />
                    <feColorMatrix type="saturate" values="0" />
                  </filter>
                  <rect
                    width="100%"
                    height="100%"
                    filter="url(#grain-filter)"
                    opacity="0.09"
                  />
                </svg>
              </div>

              {/* Caption text — Figma 3029:36188 */}
              <div
                className="relative flex flex-col justify-center p-4 lg:p-[26px] w-full lg:max-w-[535px]"
                style={{
                  gap: "8px",
                }}
              >
                {/* Caption title — Bold 25px #2d2d2d */}
                <p className=" text-High-md-bold text-tertiary-normal-default">
                  {data.imageTitle}
                </p>
                {/* Caption subtitle — Regular 16px #2d2d2d */}
                <p className=" text-md-regular text-tertiary-normal-default">
                  {data.imageSubtitle}
                </p>
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
