import React from "react";
import { classNames } from "../../../utils/classNames";

// ── Figma asset imports ───────────────────────────────────────────────────────
const blogCtaBg = "/ElysiumAssets/blog-cta-bg.png";
// Single SVG containing the full concentric dot-ring decoration (486×437, fill="#D6BEEB")
const blogCtaDeco = "/ElysiumAssets/blog-cta-deco.svg";

// ── BlogCtaSection ────────────────────────────────────────────────────────────
// Figma: "Frame 103" node 1914-37707 — appears on HomePage
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
      <div className="mx-6 md:mx-[30px] lg:mx-[156px] md:h-[578px] bg-[#f7f7f7] rounded-[20px] overflow-clip shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] relative">

        {/* Inner layout — stacked on mobile, side-by-side on desktop */}
        <div className="relative md:absolute md:left-[33px] md:right-[33px] md:top-1/2 md:-translate-y-1/2 flex flex-col md:flex-row items-center">

          {/* ── Left: skewed photo ──────────────────────────────────────────── */}
          <div className="w-full md:flex-[3] md:min-w-0 h-[220px] md:h-[487px] flex items-center justify-center">
            {/* Parallelogram skew — only on md+ */}
            <div className="md:skew-x-[5.41deg] w-full h-full flex items-center justify-center">
              {/* Photo card */}
              <div className="relative rounded-[20px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] w-full md:w-[94%] h-full md:h-[94%]">
                {/* Purple fallback bg */}
                <div className="absolute inset-0 bg-[#7b2cbf] rounded-t-[20px] md:rounded-[20px]" />
                <img
                  src={blogCtaBg}
                  alt="Kakum canopy walkway, Ghana"
                  className="absolute max-w-none object-cover rounded-t-[20px] md:rounded-[20px] size-full"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)] rounded-t-[20px] md:rounded-[20px]" />
              </div>
            </div>
          </div>

          {/* ── Right: text card ────────────────────────────────────────────── */}
          <div className="w-full md:flex-[2] md:min-w-0 md:max-w-[463px] py-8 md:py-0 md:h-[306px] bg-[#f2eaf9] md:rounded-[10px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] flex flex-col gap-[10px] items-center justify-center p-[10px] shrink-0">
            {/* Writer */}
            <p className="font-raleway font-bold text-[13px] leading-[18px] text-[#5c218f] text-center max-w-[298px] shrink-0">
              Writer: Davida Dzato
            </p>
            {/* Title */}
            <p className="font-raleway font-bold text-[20px] leading-[28px] text-[#2d2d2d] text-center shrink-0">
              Jollof Rice, Explained
            </p>
            {/* Description */}
            <p className="font-raleway font-medium text-[16px] leading-[26px] text-[#2d2d2d] text-center max-w-[298px] shrink-0">
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
