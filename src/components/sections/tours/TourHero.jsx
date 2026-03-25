import React, { useState, useRef, useEffect } from "react";
import { classNames } from "../../../utils/classNames";

// ── Slide dot assets — Figma node 1903:25270 ─────────────────────────────────
// Active   (44:191): fill #D6BEEB, stroke #F7F7F7  (SVG fallback via <img>)
// Inactive (44:189): stroke #EBDFF5, no fill
import slideDotActive   from "../../../assets/ElysiumAssets/slide-dot-active.svg";
import slideDotInactive from "../../../assets/ElysiumAssets/slide-dot-inactive.svg";

// ── Figma overlay (node I1903:25269;44:203) ───────────────────────────────────
// Layer 1: flat linear rgba(0,0,0,0.3) across entire slide
// Layer 2: purple radial gradient, center ~40% 64% (689.5, 461.5 in 1728×717),
//          ellipse radii 28.5% / 165% from matrix decomposition
const OVERLAY_STYLE = {
  background: [
    "linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.3) 100%)",
    "radial-gradient(ellipse 28.5% 165% at 40% 64%, rgba(132,44,207,0.4) 45.67%, rgba(104,35,164,0.555) 61.78%, rgba(77,26,120,0.71) 77.88%, rgba(43,15,67,0.8) 100%)",
  ].join(", "),
};

const SLIDES = [
  { id: 1, image: "https://picsum.photos/seed/tour-hero-1/1728/717", alt: "Ghana landscape" },
  { id: 2, image: "https://picsum.photos/seed/tour-hero-2/1728/717", alt: "West Africa tour" },
  { id: 3, image: "https://picsum.photos/seed/tour-hero-3/1728/717", alt: "Ghana cultural experience" },
];

const UP_NEXT = {
  category: "Travel Tips",
  title: "Cape Coast Uncovered: History, Heritage & the Sea",
  image: "https://picsum.photos/seed/tour-upnext/337/178",
};

// Figma: 1903:25269 — 1728×717 hero carousel
// Title:    Raleway Bold 56px/66px #fefefe, max-w-[957px] centered
// Subtitle: Raleway Medium 16px/26px #fefefe, w-[867px] centered
// Dots:     top:679px in 717px frame → bottom:22px, gap:12px
// Up Next:  337×178px, right-[156px] bottom-[51px]
const TourHero = React.forwardRef(({ className, ...props }, ref) => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const startAutoPlay = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = (index) => {
    clearInterval(intervalRef.current);
    setCurrent(index);
    startAutoPlay();
  };

  return (
    <section
      ref={ref}
      className={classNames("relative w-full h-[717px] overflow-hidden", className)}
      {...props}
    >
      {/* Slide images */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className={classNames(
            "absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out",
            i === current ? "opacity-100 z-20" : "opacity-0 z-10 pointer-events-none"
          )}
        >
          <img src={slide.image} alt={slide.alt} className="w-full h-full object-cover" />
          {/* Figma overlay: rgba(0,0,0,0.3) linear + purple radial gradient */}
          <div className="absolute inset-0 z-[15]" style={OVERLAY_STYLE} />
        </div>
      ))}

      {/* Centered content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-[32px] z-30">
        <div className="flex flex-col items-center gap-[16px]">
          {/* Title — Raleway Bold 56px/66px #fefefe (node 1903:25276) */}
          <h1
            className="text-center"
            style={{
              fontFamily: "Raleway, sans-serif",
              fontSize:   "56px",
              fontWeight: 700,
              lineHeight: "66px",
              color:      "#fefefe",
              width:      "957px",
            }}
          >
            Unforgettable Journeys Across Ghana and West Africa
          </h1>

          {/* Subtitle — Raleway Medium 16px/26px #fefefe (node 1903:25278) */}
          <div style={{ width: "867px" }}>
            <p
              className="text-center"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontSize:   "16px",
                fontWeight: 500,
                lineHeight: "26px",
                color:      "#fefefe",
                padding:    "0 8.5px",
              }}
            >
              Discover the beauty, culture, and adventure of Ghana and West Africa. From historic landmarks to serene beaches and vibrant local life, every Elysium Tour is designed to give you authentic experiences and lasting memories.
            </p>
          </div>
        </div>
      </div>

      {/* "Up Next" floating card — 337×178px, right-[156px] bottom-[51px] */}
      <div
        className="absolute right-[156px] bottom-[51px] w-[337px] h-[178px] rounded-[2px] overflow-hidden z-30"
        style={{ boxShadow: "4px 4px 4px 0px rgba(255,255,255,0.05)" }}
      >
        <img src={UP_NEXT.image} alt="Up next preview" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 rounded-[2px]" />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit]" style={{ boxShadow: "inset 0px 4px 20px 0px rgba(0,0,0,0.25)" }} />
        <div className="absolute top-[11px] left-[11px]">
          <span style={{ fontFamily: "Raleway, sans-serif", fontSize: "13px", fontWeight: 700, lineHeight: "18px", color: "#fefefe" }}>
            Up Next
          </span>
        </div>
        <div className="absolute bottom-[12px] left-[11px] right-[11px] flex items-end justify-between gap-[30px]">
          <div className="flex flex-col gap-[10px] w-[250px]" style={{ color: "#fefefe" }}>
            <span style={{ fontFamily: "Raleway, sans-serif", fontSize: "13px", fontWeight: 700, lineHeight: "18px", textDecoration: "underline", textDecorationThickness: "12%" }}>
              {UP_NEXT.category}
            </span>
            <span style={{ fontFamily: "Raleway, sans-serif", fontSize: "16px", fontWeight: 600, lineHeight: "22px" }}>
              {UP_NEXT.title}
            </span>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <path d="M9 6L15 12L9 18" stroke="#fefefe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Dot navigation — top:679px in 717px frame → bottom:22px (node 1903:25270), gap:12px */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex items-center gap-[12px] z-40"
        style={{ bottom: "22px" }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            className="shrink-0 transition-opacity duration-300 ease-in"
            aria-label={i === current ? "Current slide" : `Go to slide ${i + 1}`}
          >
            <img
              src={i === current ? slideDotActive : slideDotInactive}
              alt=""
              width={16}
              height={16}
            />
          </button>
        ))}
      </div>
    </section>
  );
});

TourHero.displayName = "TourHero";
export default TourHero;
