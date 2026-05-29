import React, { useState, useRef, useEffect } from "react";
import { classNames } from "../../../utils/classNames";

// ── Slide dot assets — Figma node 1903:25270 ─────────────────────────────────
// Active   (44:191): fill #D6BEEB, stroke #F7F7F7  (SVG fallback via <img>)
// Inactive (44:189): stroke #EBDFF5, no fill
import slideDotActive   from "../../../assets/ElysiumAssets/slide-dot-active.svg";
import slideDotInactive from "../../../assets/ElysiumAssets/slide-dot-inactive.svg";
import hero1 from "../../../assets/tourAssets/tour-hero-1.jpg";
import hero2 from "../../../assets/tourAssets/tour-hero-2.jpg";


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
  { id: 1, image: hero1, alt: "Ghana landscape" },
  { id: 2, image: hero2, alt: "West Africa tour" },
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
      className={classNames("relative w-full h-[400px] md:h-[550px] lg:h-[717px] overflow-hidden",className)}
      {...props}
    >
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className={classNames("absolute inset-0 w-full h-full transition-opacity duration-700", {
            "opacity-100 z-20": i === current,
            "opacity-0 z-10": i !== current
          })}
        >
          <img src={slide.image} alt={slide.alt} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={OVERLAY_STYLE} />
        </div>
      ))}

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center gap-4 z-30">
        
        {/* Title */}
        <h1 className="text-white font-bold 
          text-2xl md:text-4xl lg:text-5xl 
          max-w-[90%] md:max-w-[700px] lg:max-w-[900px]">
          Unforgettable Journeys Across Ghana and West Africa
        </h1>

        {/* Subtitle */}
        <p className="text-white 
          text-sm md:text-base 
          max-w-[90%] md:max-w-[600px]">
          Discover the beauty, culture, and adventure of Ghana and West Africa.
        </p>
      </div>

      {/* Up Next Card — hidden on mobile to avoid crowding the hero */}
      <div className="
        hidden md:block
        absolute bottom-4 right-4
        md:w-[280px] md:h-[150px]
        lg:w-[337px] lg:h-[178px]
        bg-black/50 text-white p-2 rounded z-30
      ">
        <p className="text-xs md:text-sm font-bold">Up Next</p>
        <p className="text-xs md:text-sm">{UP_NEXT.title}</p>
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-40">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}>
            <img
              src={i === current ? slideDotActive : slideDotInactive}
              alt=""
              width={12}
              height={12}
            />
          </button>
        ))}
      </div>
    </section>
  );
});
TourHero.displayName = "TourHero";


export default TourHero;
