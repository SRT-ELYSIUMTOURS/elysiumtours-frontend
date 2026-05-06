import React from "react";
import { classNames } from "../../../utils/classNames";

import ctaGlowRight   from "../../../assets/ElysiumAssets/cta-glow-right.svg";
import ctaGlowLeft    from "../../../assets/ElysiumAssets/cta-glow-left.svg";



// ── BlogCtaSection ────────────────────────────────────────────────────────────
// Figma: "Frame 103" node 1914-37707 — appears on HomePage, TourPage,
// TourCountryPage, BlogCategoryPage, BlogPage
//
// Layout:
//   section  bg-[#f2eaf9] overflow-hidden py-[41px]
//     └─ decorative dot rings at top-right and bottom-left (partially clipped)
//     └─ main card  mx-[156px] h-[578px] bg-[#f7f7f7] rounded-[20px]
//          ├─ left: skewed photo  w-[757px] h-[487px]  skew-x-[5.41deg]
//          └─ right: text card   w-[463px] h-[306px]  bg-[#f2eaf9] rounded-[10px]
const BlogCtaSection = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={classNames(
"relative w-full overflow-hidden bg-[#2b0f43]",
        className
      )}
      style={{ height: "732px", boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.25)" }}

      {...props}
    >

      {/* ── TOP-RIGHT GLOW (Figma 1903:25303) ───────────────────────────────
          Exact Figma values (from devtools panel):
            width=329.21px  height=818.12px  top=-387px  left=1303px  rotation=-30.2°
          SVG viewBox covers full filter region so the feGaussianBlur bleed
          from the path at y=-244 (above the original 0-450 viewport) is
          captured inside the img bounds.                                     */}
     <img
        src={ctaGlowRight}
        alt=""
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          right: "0px",
          top: "-110px",
          width: "380px",
          height: "836px",
        }}
      />

      {/* ── BOTTOM-LEFT GLOW (Figma 1903:25293) ─────────────────────────────
          Exact Figma values (from devtools panel):
            width=329.21px  height=818.12px  top=294px  left=-265px  rotation=149.8°
          The rotation + position places the blob centre at approx (70, 703)
          inside the 1728×732 section, covering the lower-left corner area.  */}
      <img
        src={ctaGlowLeft}
        alt=""
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          left: "0px",
          bottom: "-104px",
          width: "380px",
          height: "836px",
        }}
      />
   
        {/* Left image — Figma: left 156px, vertically centered, 711×559px, border-radius 40px */}
        <div
          className="absolute"
          style={{
            left: "156px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "711px",
            height: "559px",
            borderRadius: "40px",
            overflow: "hidden",
            boxShadow: "0px 4px 20px 0px rgba(0,0,0,0.05)",
          }}
        >
          <img
            src="https://picsum.photos/seed/ghana-promote/711/559"
            alt="Promoting Ghana"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right text block — Figma: left 987px, vertically centered, width 581px */}
        <div
          className="absolute flex flex-col items-end gap-[16px]"
          style={{
            left: "987px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "581px",
          }}
        >
          {/* Title — 56px Bold white right-aligned */}
          <h2
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: "#fefefe",
              lineHeight: "66px",
              fontFamily: "Raleway, sans-serif",
              textAlign: "right",
              width: "592px",
            }}
          >
            Promoting Ghana,<br />Inspiring the World
          </h2>

          {/* Body + button — gap 24px */}
          <div className="flex flex-col items-end gap-[24px]">
            <div style={{ paddingLeft: "10px", paddingRight: "1px", paddingTop: "10px", paddingBottom: "10px" }}>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  color: "#fefefe",
                  lineHeight: "24px",
                  fontFamily: "Raleway, sans-serif",
                  textAlign: "right",
                  width: "483px",
                }}
              >
                We showcase the best of Ghana — its culture, people, and untold stories. From hidden
                gems to iconic landmarks, we inspire travelers to explore and celebrate the beauty
                that defines our nation.
              </p>
            </div>

            {/* Button — Figma: bg #fefefe, border 1px solid #7b2cbf, h 64px, w 169px, r 40px, text #2b0f43 */}
            <button
              className="flex items-center justify-center gap-[16px] transition-all duration-300 ease-in"
              style={{
                background: "#fefefe",
                border: "1px solid #7b2cbf",
                height: "64px",
                width: "169px",
                borderRadius: "40px",
                boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.05)",
                padding: "10px",
                fontSize: "16px",
                fontWeight: 600,
                color: "#2b0f43",
                fontFamily: "Raleway, sans-serif",
                lineHeight: "22px",
                cursor: "pointer",
              }}
            >
              Partner With Us
            </button>
          </div>
        </div>
      </section>
  );
});

BlogCtaSection.displayName = "BlogCtaSection";
export default BlogCtaSection;
