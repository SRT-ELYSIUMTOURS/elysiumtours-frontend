import React from "react";
import { classNames } from "../../../utils/classNames";

// ── Figma asset imports ───────────────────────────────────────────────────────
import blogCtaBg from "../../../assets/ElysiumAssets/blog-cta-bg.png";
// Single SVG containing the full concentric dot-ring decoration (486×437, fill="#D6BEEB")
import blogCtaDeco from "../../../assets/ElysiumAssets/blog-cta-deco.svg";

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
        "relative overflow-hidden bg-[#f2eaf9] py-[41px]",
        className
      )}
      {...props}
    >
      {/* ── Decorative corner rings ─────────────────────────────────────────── */}
      {/* Top-right: Figma node 1914-37709 — top-[-137px] right-[-223px] */}
      <img
        src={blogCtaDeco}
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ top: -137, right: -223, width: 486, height: 437 }}
        alt=""
      />
      {/* Bottom-left: Figma node 1914-37745 — bottom-[-86px] left-[-26px] */}
      <img
        src={blogCtaDeco}
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ bottom: -86, left: -26, width: 486, height: 437 }}
        alt=""
      />

      {/* ── Main card ──────────────────────────────────────────────────────── */}
      {/* Figma: left-[156px] w-[1416px] h-[578px] bg-[#f7f7f7] rounded-[20px]
                shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] overflow-clip */}
      <div className="mx-[156px] h-[578px] bg-[#f7f7f7] rounded-[20px] overflow-clip shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] relative">

        {/* Inner flex row — Figma: absolute left-[33px] top-[50%] -translate-y-1/2 flex items-center */}
        <div className="absolute left-[33px] top-1/2 -translate-y-1/2 flex items-center">

          {/* ── Left: skewed photo ──────────────────────────────────────────── */}
          {/* Container: Figma w-[757px] h-[487px] flex items-center justify-center */}
          <div className="w-[757px] h-[487px] flex items-center justify-center shrink-0">
            {/* Parallelogram skew — Figma skew-x-[5.41deg] */}
            <div className="skew-x-[5.41deg] flex-none">
              {/* Photo card: Figma w-[710.845px] h-[455.676px] rounded-[20px] shadow */}
              <div
                className="relative rounded-[20px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]"
                style={{ width: "710.845px", height: "455.676px" }}
              >
                {/* Purple fallback bg */}
                <div className="absolute inset-0 bg-[#7b2cbf] rounded-[20px]" />
                {/* Photo — rounded applied directly since parent has no overflow-hidden
                    (overflow-hidden + skew-x would clip in unexpected ways) */}
                <img
                  src={blogCtaBg}
                  alt="Kakum canopy walkway, Ghana"
                  className="absolute max-w-none object-cover rounded-[20px] size-full"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)] rounded-[20px]" />
              </div>
            </div>
          </div>

          {/* ── Right: text card ────────────────────────────────────────────── */}
          {/* Figma: w-[463px] h-[306px] bg-[#f2eaf9] rounded-[10px]
                    shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]
                    flex flex-col gap-[10px] items-center justify-center p-[10px] */}
          <div className="w-[463px] h-[306px] bg-[#f2eaf9] rounded-[10px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] flex flex-col gap-[10px] items-center justify-center p-[10px] shrink-0">
            {/* Writer — Raleway Bold 13px/18px #5c218f text-center w-[298px] */}
            <p className="font-raleway font-bold text-[13px] leading-[18px] text-[#5c218f] text-center w-[298px] shrink-0">
              Writer: Davida Dzato
            </p>
            {/* Title — Raleway Bold 20px/28px #2d2d2d */}
            <p className="font-raleway font-bold text-[20px] leading-[28px] text-[#2d2d2d] whitespace-nowrap shrink-0">
              Jollof Rice, Explained
            </p>
            {/* Description — Raleway Medium 16px/26px #2d2d2d text-center w-[298px] */}
            <p className="font-raleway font-medium text-[16px] leading-[26px] text-[#2d2d2d] text-center w-[298px] shrink-0">
              Six unique dishes, six African countries to explore.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

BlogCtaSection.displayName = "BlogCtaSection";
export default BlogCtaSection;
