import React from "react";
import { classNames } from "../../../utils/classNames";

// Reuse the same deco SVG asset and positions as BlogCtaSection
import blogCtaDeco from "../../../assets/ElysiumAssets/blog-cta-deco.svg";

// Figma: 1914:41116 — "Country Blog Feature" section (Tours country page)
// Sits right after WhyCountrySection on the tour country page.
//
// Layout mirrors BlogCtaSection exactly (bg, deco rings, card dimensions, py) with two changes:
//   1. Left side uses TWO overlapping pill images (rounded-[300px]) in an inline-grid
//      instead of one rectangular photo — large pill on top, smaller darker pill overlapping bottom-right
//   2. Right info card is fully pill-shaped (rounded-[400px]) instead of rounded-[10px]

const COUNTRY_BLOG_DATA = {
  ghana: {
    writer: "Writer: Davida Dzato",
    title: "Night In Accra",
    description: "Amazing things ,you can do in Accra at night",
    // Large pill — main scene (bar / nightlife venue)
    imageLarge: "https://picsum.photos/seed/accra-bar-night/711/456",
    // Small pill — people scene, overlaps bottom-right of large pill
    imageSmall: "https://picsum.photos/seed/accra-people-night/500/144",
  },
  nigeria: {
    writer: "Writer: Amaka Obi",
    title: "Lagos After Dark",
    description: "The best spots to experience Lagos nightlife",
    imageLarge: "https://picsum.photos/seed/lagos-night-venue/711/456",
    imageSmall: "https://picsum.photos/seed/lagos-crowd/500/144",
  },
};

const CountryBlogFeatureSection = React.forwardRef(
  ({ country = "ghana", className, ...props }, ref) => {
    const key = country?.toLowerCase();
    const data = COUNTRY_BLOG_DATA[key] || COUNTRY_BLOG_DATA.ghana;

    return (
      <section
        ref={ref}
        className={classNames(
          "relative overflow-hidden bg-[#f2eaf9] py-[65px]",
          className
        )}
        {...props}
      >
        {/* ── Decorative corner rings ─────────────────────────────────────────── */}
        {/* Identical positions to BlogCtaSection — Figma 1914:41118 / 1914:41154 */}
        <img
          src={blogCtaDeco}
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{ top: -137, right: -223, width: 486, height: 437 }}
          alt=""
        />
        <img
          src={blogCtaDeco}
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{ bottom: -86, left: -26, width: 486, height: 437 }}
          alt=""
        />

        {/* ── Main card ─────────────────────────────────────────────────────── */}
        {/* Figma 1914:41190: mx-156px h-578px bg-#f7f7f7 rounded-20px overflow-clip */}
        <div className="mx-[156px] h-[578px] bg-[#f7f7f7] rounded-[20px] overflow-clip shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] relative">

          {/* Inner flex row — centered both axes */}
          {/* Figma: absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-8px items-center */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-[8px]">

            {/* ── Left: two overlapping pill images ─────────────────────────── */}
            {/* Container — Figma 1914:41192: w-757px h-487px */}
            <div
              className="flex items-center justify-center shrink-0"
              style={{ width: "757px", height: "487px" }}
            >
              {/* CSS inline-grid: both pills share col-1/row-1, second offset by margin */}
              {/* This reproduces Figma's grid overlap without absolute positioning */}
              <div
                className="relative shrink-0"
                style={{
                  display: "inline-grid",
                  gridTemplateColumns: "max-content",
                  gridTemplateRows: "max-content",
                  placeItems: "start",
                }}
              >
                {/* Large pill — Figma 1914:41194: w=710.845px h=455.676px rounded-[300px] */}
                {/* skew-x-[5.41deg], no dark overlay */}
                <div style={{ gridRow: 1, gridColumn: 1, marginLeft: 0, marginTop: 0 }}>
                  <div className="skew-x-[5.41deg] flex-none">
                    <div
                      className="relative shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]"
                      style={{ width: "710.845px", height: "455.676px", borderRadius: "300px" }}
                    >
                      <div
                        className="absolute inset-0 bg-[#7b2cbf]"
                        style={{ borderRadius: "300px" }}
                      />
                      <img
                        src={data.imageLarge}
                        alt=""
                        aria-hidden="true"
                        className="absolute max-w-none object-cover size-full"
                        style={{ borderRadius: "300px" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Small pill — Figma 1942:32014: w=499.966px h=144.03px rounded-[300px] */}
                {/* skew-x-[5.41deg], offset ml=154.71px mt=309.78px, dark overlay rgba(0,0,0,0.1) */}
                <div
                  style={{
                    gridRow: 1,
                    gridColumn: 1,
                    marginLeft: "154.71px",
                    marginTop: "309.78px",
                  }}
                >
                  <div className="skew-x-[5.41deg] flex-none">
                    <div
                      className="relative shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]"
                      style={{ width: "499.966px", height: "144.03px", borderRadius: "300px" }}
                    >
                      <div
                        className="absolute inset-0 bg-[#7b2cbf]"
                        style={{ borderRadius: "300px" }}
                      />
                      <img
                        src={data.imageSmall}
                        alt=""
                        aria-hidden="true"
                        className="absolute max-w-none object-cover size-full"
                        style={{ borderRadius: "300px" }}
                      />
                      {/* Subtle dark overlay unique to the small pill */}
                      <div
                        className="absolute inset-0"
                        style={{ backgroundColor: "rgba(0,0,0,0.1)", borderRadius: "300px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right: pill-shaped info card ─────────────────────────────── */}
            {/* Figma 1914:41195: w-463px h-306px bg-#f2eaf9 rounded-[400px] */}
            {/* flex-col gap-10px items-center justify-center p-10px */}
            <div
              className="flex flex-col items-center justify-center shrink-0"
              style={{
                width: "463px",
                height: "306px",
                backgroundColor: "#f2eaf9",
                borderRadius: "400px",
                boxShadow: "0px 4px 20px 0px rgba(0,0,0,0.05)",
                padding: "10px",
                gap: "10px",
              }}
            >
              {/* Writer — Figma 1914:41196: Bold 13px #5c218f centered w-298px */}
              <p
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 700,
                  fontSize: "13px",
                  lineHeight: "18px",
                  color: "#5c218f",
                  textAlign: "center",
                  width: "298px",
                  margin: 0,
                }}
              >
                {data.writer}
              </p>

              {/* Title — Figma 1914:41197: Bold 20px #2d2d2d nowrap */}
              <p
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 700,
                  fontSize: "20px",
                  lineHeight: "28px",
                  color: "#2d2d2d",
                  whiteSpace: "nowrap",
                  margin: 0,
                }}
              >
                {data.title}
              </p>

              {/* Description — Figma 1914:41198: Medium 16px #2d2d2d centered w-298px */}
              <p
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "26px",
                  color: "#2d2d2d",
                  textAlign: "center",
                  width: "298px",
                  margin: 0,
                }}
              >
                {data.description}
              </p>
            </div>

          </div>
        </div>
      </section>
    );
  }
);

CountryBlogFeatureSection.displayName = "CountryBlogFeatureSection";
export default CountryBlogFeatureSection;
