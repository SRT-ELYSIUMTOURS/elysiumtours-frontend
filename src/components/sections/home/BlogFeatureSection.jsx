import React from "react";
import { classNames } from "../../../utils/classNames";
import blogCtaBg from "../../../assets/ElysiumAssets/blog-cta-bg.png";

// ── BlogFeatureSection ────────────────────────────────────────────────────────
// Figma: frame 134:1706 — Homepage "CTA section"
//
// Layout:
//   section  bg-[#f2eaf9]  py-[80px]
//     └─ white card  mx-[156px] h-[238px] rounded-[20px] bg-[#f7f7f7]
//           shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] overflow-clip
//           flex items-center justify-center
//         ├─ Left: stacked tilted cards (134:1710)
//         │     Two cards at -21deg, back card offset +56px right, front card has photo
//         └─ Right: text column w-[946px] (134:1713)
//               title (Bold 25px #2d2d2d) + body (Regular 16px) + "Read Now" button
//
// Stacking trick: back card container is shifted right by 56.48px (behind front card);
// front card container is at x=0. Both rendered in the same absolute space so front
// card naturally overlaps the back card.

const BlogFeatureSection = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={classNames("bg-[#f2eaf9] py-[80px] ", className)}
      {...props}
    >
      {/* White card — Figma 134:1708 */}
      <div className="mx-6 md:mx-[30px] lg:mx-[164px] min-h-[238px] max-w-[1728px] bg-[#f7f7f7]  rounded-[20px] overflow-clip shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] flex items-center justify-center p-6 px-[100px] ">

        {/* Content row — stacked on mobile, side-by-side on desktop */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-[24px] items-center w-full">

          {/* ── Left: Stacked tilted photo cards — Figma 134:1710 ─────────── */}
          {/*
            Two cards in the same "layer":
              Back card  — bg-[#f2eaf9], offset right by 56px (peeking behind front)
              Front card — photo + overlay, at natural position
            Both are w-144px h-157px, rotate(-21deg), rounded-20px
            Container width: 191 + 56 = ~247px to show both; height 198px
          */}
          <div
            className="relative shrink-0"
            style={{ width: "247px", height: "198px" }}
          >
            {/* BACK CARD — light purple, shifted right so it peeks behind front */}
            <div
              className="absolute top-0 flex items-center justify-center"
              style={{ left: "56px", width: "191px", height: "198px" }}
            >
              <div style={{ transform: "rotate(-21deg)" }}>
                <div
                  className="rounded-[20px] bg-[#f2eaf9] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]"
                  style={{ width: "144px", height: "157px" }}
                />
              </div>
            </div>

            {/* FRONT CARD — photo with dark overlay */}
            <div
              className="absolute top-0 left-0 flex items-center justify-center"
              style={{ width: "191px", height: "198px" }}
            >
              <div style={{ transform: "rotate(-21deg)" }}>
                {/* Photo card: Figma 134:1712 */}
                <div
                  className="relative rounded-[20px] overflow-hidden shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]"
                  style={{ width: "144px", height: "157px" }}
                >
                  {/* Purple base — shown if image fails to load */}
                  <div className="absolute inset-0 rounded-[20px] bg-[#7b2cbf]" />
                  {/* Photo */}
                  <img
                    src={blogCtaBg}
                    alt="Ghana coastal tour"
                    className="absolute inset-0 w-full h-full object-cover rounded-[20px]"
                  />
                  {/* 40% black overlay — Figma: rgba(0,0,0,0.4) */}
                  <div className="absolute inset-0 rounded-[20px] bg-[rgba(0,0,0,0.4)]" />
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Text content — Figma 134:1713 ─────────────────────── */}
          {/* flex-col gap-[24px] items-start justify-center w-[946px] */}
          <div
            className="flex flex-col gap-[24px] items-start justify-center w-full min-w-0"
          >
            {/* Title + body text block */}
            <div className="flex flex-col items-start w-full">
              {/* Title — Figma 134:1716: Raleway Bold 25px #2d2d2d lh-34px */}
              <p
                className="font-raleway font-bold text-[#2d2d2d] pl-[10px] py-[10px]"
                style={{ fontSize: "25px", lineHeight: "34px" }}
              >
                Discovering Ghana&#39;s Coastal Charm
              </p>

              {/* Body — Figma 134:1718: Raleway Regular 16px #2d2d2d lh-24px */}
              <p
                className="font-raleway font-normal text-[#2d2d2d] pl-[10px] pr-px py-[10px]"
                style={{ fontSize: "16px", lineHeight: "24px" }}
              >
                From the historic shores of Cape Coast to the laid-back beaches
                of Busua, Ghana&#39;s coastline is a blend of beauty, history, and
                adventure. Join us as we explore hidden seaside gems, local seafood
                spots, and the cultural rhythms that make the coast truly
                unforgettable.
              </p>
            </div>

            {/* "Read Now →" button — Figma 134:1719 */}
            {/* border-[0.8px] #7b2cbf, rounded-[40px], h-[40px] w-[117px], shadow */}
            <button
              type="button"
              className="flex items-center justify-center gap-[9px] shrink-0"
              style={{
                width: "117px",
                height: "40px",
                border: "0.8px solid #7b2cbf",
                borderRadius: "40px",
                padding: "10px",
                boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.05)",
                background: "none",
                cursor: "pointer",
              }}
            >
              {/* Label — Raleway SemiBold 13px #7b2cbf lh-18px */}
              <span
                className="font-raleway font-semibold text-[#7b2cbf] whitespace-nowrap"
                style={{ fontSize: "13px", lineHeight: "18px" }}
              >
                Read Now
              </span>
              {/* Right arrow icon — 14×14px, Figma "Right 1" */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
                style={{ flexShrink: 0 }}
              >
                <path
                  d="M2.916 7h8.167M7.583 3.5L11.083 7l-3.5 3.5"
                  stroke="#7b2cbf"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

BlogFeatureSection.displayName = "BlogFeatureSection";
export default BlogFeatureSection;
