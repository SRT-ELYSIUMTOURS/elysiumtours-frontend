import React from "react";
import { classNames } from "../../../utils/classNames";
import ctaSafariImg   from "../../../assets/ElysiumAssets/cta-safari.png";
import ctaGlowRight   from "../../../assets/ElysiumAssets/cta-glow-right.svg";
import ctaGlowLeft    from "../../../assets/ElysiumAssets/cta-glow-left.svg";

// ── CtaSection ────────────────────────────────────────────────────────────────
// Figma frame: 1903:25290 — 1728×732px, bg=#2b0f43
//
// Glow blobs (exact SVG paths from Figma devtools):
//   1903:25303 → TOP-RIGHT corner  — #EBDFF5 @0.2 opacity, blur stdDeviation=30
//   1903:25293 → BOTTOM-LEFT corner — same styling, mirrored path
//
//   Both SVGs are saved with viewBox set to the full filter region so that the
//   feGaussianBlur output is fully captured inside the <img> bounds:
//     Right: viewBox "0 -386.451 680.355 835.539"  → renders 680×836px
//     Left:  viewBox "-264.557 0 680.355 835.54"   → renders 680×836px
//
//   Positioning (section-relative, overflow-hidden clips the excess):
//     Right: top=-110px (blob bleeds in from top-right)
//     Left:  bottom=-104px (blob bleeds in from bottom-left)
//
// Image card: left=156px, vertically centred, 711×559px, rounded-[40px]
// Text block: right=156px, vertically centred, w=592px, flex-col items-end

const CtaSection = React.forwardRef(({ className, onPartnerClick, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={classNames(
        "relative w-full overflow-hidden bg-[#2b0f43] py-12 lg:py-0 lg:h-[732px]",
        className
      )}
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
        className="absolute pointer-events-none hidden lg:block"
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
        className="absolute pointer-events-none hidden lg:block"
        style={{
          left: "0px",
          bottom: "-104px",
          width: "380px",
          height: "836px",
        }}
      />

      {/* Mobile/Tablet flow wrapper — stacks image and text vertically */}
      <div className="flex flex-col items-center gap-8 px-6 md:px-[30px] lg:hidden relative z-10">
        {/* Image card — mobile */}
        <div className="w-full max-w-[711px] h-[260px] md:h-[400px] rounded-[20px] overflow-hidden shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]">
          <img
            src={ctaSafariImg}
            alt="Safari vehicle with giraffe in the African wilderness"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text block — mobile */}
        <div className="flex flex-col items-center gap-[20px] w-full max-w-[592px]">
          <h2 className="font-raleway font-bold text-[28px] leading-[36px] md:text-[40px] md:leading-[48px] text-[#fefefe] text-center w-full">
            Promoting Ghana, Inspiring the World
          </h2>
          <p className="font-raleway font-normal text-[14px] leading-[22px] md:text-[16px] md:leading-[24px] text-[#fefefe] text-center max-w-[483px]">
            we showcase the best of Ghana — its culture, people, and untold
            stories. From hidden gems to iconic landmarks, we inspire travelers
            to explore and celebrate the beauty that defines our nation.
          </p>
          <button
            type="button"
            className="flex items-center justify-center bg-[#fefefe] border border-[#7b2cbf] rounded-[40px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)] font-raleway font-semibold text-[16px] leading-[22px] text-[#2b0f43] whitespace-nowrap cursor-pointer hover:bg-gray-50 transition-colors"
            style={{ width: "169px", height: "56px", padding: "10px" }}
          >
            Partner With Us
          </button>
        </div>
      </div>

      {/* ── RIGHT TEXT BLOCK ─────────────────────────────────────────────────
          right=156px mirrors the image's left=156px offset.
          Title node (1903:25298) is 592px wide → block width=592px.
          Description (1903:25301) is 483px → max-w-[483px] on the <p>.
          Button (1903:25302): fixed 169×64px, white bg, #7b2cbf border.    */}
      <div
        className="absolute flex flex-col items-end gap-[20px]"
        style={{
          right: "156px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "592px",
        }}
      >
        {/* Title — Raleway Bold 56px/66px #fefefe */}
        <h2 className="font-raleway font-bold text-[56px] leading-[66px] text-[#fefefe] text-right w-full">
          Promoting Ghana, Inspiring the World
        </h2>

        {/* Description — Raleway Regular 16px/24px #fefefe, max-w 483px */}
        <p className="font-raleway font-normal text-[16px] leading-[24px] text-[#fefefe] text-right max-w-[483px]">
          we showcase the best of Ghana — its culture, people, and untold
          stories. From hidden gems to iconic landmarks, we inspire travelers
          to explore and celebrate the beauty that defines our nation.
        </p>

        {/* Button — 169×64px, bg #fefefe, border 1px #7b2cbf, pill
            Text: Raleway SemiBold 16px/22px #2b0f43
            p-[10px] is the Figma padding; h-[64px] is the fixed frame height */}
        <button
          type="button"
          onClick={onPartnerClick}
          className="flex items-center justify-center bg-[#fefefe] border border-[#7b2cbf] rounded-[40px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)] font-raleway font-semibold text-[16px] leading-[22px] text-[#2b0f43] whitespace-nowrap cursor-pointer hover:bg-gray-50 transition-colors"
          style={{ width: "169px", height: "64px", padding: "10px" }}
        >
          <img
            src={ctaSafariImg}
            alt="Safari vehicle with giraffe in the African wilderness"
            className="w-full h-full object-cover"
          />
          </button>
        </div>

        {/* RIGHT TEXT BLOCK */}
        <div
          className="absolute flex flex-col items-end gap-[20px]"
          style={{
            right: "156px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "592px",
          }}
        >
          <h2 className="font-raleway font-bold text-[56px] leading-[66px] text-[#fefefe] text-right w-full">
            Promoting Ghana, Inspiring the World
          </h2>
          <p className="font-raleway font-normal text-[16px] leading-[24px] text-[#fefefe] text-right max-w-[483px]">
            we showcase the best of Ghana — its culture, people, and untold
            stories. From hidden gems to iconic landmarks, we inspire travelers
            to explore and celebrate the beauty that defines our nation.
          </p>
          <button
            type="button"
            className="flex items-center justify-center bg-[#fefefe] border border-[#7b2cbf] rounded-[40px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)] font-raleway font-semibold text-[16px] leading-[22px] text-[#2b0f43] whitespace-nowrap cursor-pointer hover:bg-gray-50 transition-colors"
            style={{ width: "169px", height: "64px", padding: "10px" }}
          >
            Partner With Us
          </button>
        </div>
    </section>
  );
});

CtaSection.displayName = "CtaSection";
export default CtaSection;
