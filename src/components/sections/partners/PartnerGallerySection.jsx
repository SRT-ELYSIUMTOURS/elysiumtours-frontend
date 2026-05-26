import React, { useRef, useState, useCallback, useEffect, useMemo } from "react";

// ── Category config ───────────────────────────────────────────────────────────
const CATEGORY_CONFIG = {
  transportation: {
    eyebrow:         "OUR VEHICLE FLEET",
    description:     "Modern, well-maintained vehicles for your comfort",
    highlightsTitle: "All Vehicles are:",
    highlights: [
      "Fully insured & licensed",
      "Regularly maintained",
      "Deep cleaned after each trip",
      "Equipped with GPS tracking",
    ],
  },
  accommodation: {
    eyebrow:         "PHOTO GALLERY",
    description:     "Explore our rooms, facilities, and surroundings",
    highlightsTitle: "All Rooms include:",
    highlights: [
      "Free Wi-Fi included",
      "Daily housekeeping",
      "24/7 concierge service",
      "Climate-controlled rooms",
    ],
  },
  "tour-sites": {
    eyebrow:         "SITE GALLERY",
    description:     "Stunning sights and experiences awaiting you",
    highlightsTitle: null,
    highlights:      null,
  },
  guides: {
    eyebrow:         "PHOTO GALLERY",
    description:     "Moments captured through the journey",
    highlightsTitle: null,
    highlights:      null,
  },
  restaurants: {
    eyebrow:         "DINING GALLERY",
    description:     "Ambiance, signature dishes, and atmosphere",
    highlightsTitle: null,
    highlights:      null,
  },
  photographers: {
    eyebrow:         "PORTFOLIO",
    description:     "A selection of our best captured moments",
    highlightsTitle: null,
    highlights:      null,
  },
  insurance: {
    eyebrow:         "OUR SERVICES",
    description:     "Comprehensive coverage for peace of mind",
    highlightsTitle: null,
    highlights:      null,
  },
};

// ── Mock fallback items ───────────────────────────────────────────────────────
const MOCK_ITEMS = {
  transportation: [
    { id: "t1", image: "https://picsum.photos/seed/camry2023/352/568",       name: "Toyota Camry 2023" },
    { id: "t2", image: "https://picsum.photos/seed/highlander2023/352/568",  name: "Toyota Highlander 2023" },
    { id: "t3", image: "https://picsum.photos/seed/mercedeseclass/352/568",  name: "Mercedes E-Class 2024" },
    { id: "t4", image: "https://picsum.photos/seed/hiace2023/352/568",       name: "Toyota HiAce 2023" },
    { id: "t5", image: "https://picsum.photos/seed/bmw5series/352/568",      name: "BMW 5 Series 2024" },
  ],
  accommodation: [
    { id: "a1", image: "https://picsum.photos/seed/room-std/352/568",   name: "Standard Room" },
    { id: "a2", image: "https://picsum.photos/seed/room-dlx/352/568",   name: "Deluxe Room" },
    { id: "a3", image: "https://picsum.photos/seed/room-suite/352/568", name: "Junior Suite" },
    { id: "a4", image: "https://picsum.photos/seed/room-exec/352/568",  name: "Executive Suite" },
    { id: "a5", image: "https://picsum.photos/seed/room-pres/352/568",  name: "Presidential Suite" },
  ],
  "tour-sites": [
    { id: "ts1", image: "https://picsum.photos/seed/site-gate/352/568",    name: "Main Entrance" },
    { id: "ts2", image: "https://picsum.photos/seed/site-view/352/568",    name: "Scenic Overlook" },
    { id: "ts3", image: "https://picsum.photos/seed/site-exhibit/352/568", name: "Cultural Exhibit" },
    { id: "ts4", image: "https://picsum.photos/seed/site-trail/352/568",   name: "Heritage Trail" },
  ],
  guides: [
    { id: "g1", image: "https://picsum.photos/seed/guide-trail/352/568",   name: "On the Trail" },
    { id: "g2", image: "https://picsum.photos/seed/guide-city/352/568",    name: "City Walking Tour" },
    { id: "g3", image: "https://picsum.photos/seed/guide-culture/352/568", name: "Cultural Experience" },
    { id: "g4", image: "https://picsum.photos/seed/guide-hike/352/568",    name: "Nature Hike" },
  ],
  restaurants: [
    { id: "r1", image: "https://picsum.photos/seed/dining-main/352/568",    name: "Main Dining" },
    { id: "r2", image: "https://picsum.photos/seed/dining-food/352/568",    name: "Signature Dishes" },
    { id: "r3", image: "https://picsum.photos/seed/dining-bar/352/568",     name: "Bar & Lounge" },
    { id: "r4", image: "https://picsum.photos/seed/dining-terrace/352/568", name: "Outdoor Terrace" },
  ],
  photographers: [
    { id: "p1", image: "https://picsum.photos/seed/port-land/352/568",    name: "Landscape Series" },
    { id: "p2", image: "https://picsum.photos/seed/port-portrait/352/568", name: "Portrait Work" },
    { id: "p3", image: "https://picsum.photos/seed/port-event/352/568",   name: "Cultural Events" },
    { id: "p4", image: "https://picsum.photos/seed/port-travel/352/568",  name: "Travel Docs" },
    { id: "p5", image: "https://picsum.photos/seed/port-wild/352/568",    name: "Wildlife" },
  ],
  insurance: [
    { id: "i1", image: "https://picsum.photos/seed/svc-office/352/568",  name: "Our Office" },
    { id: "i2", image: "https://picsum.photos/seed/svc-team/352/568",    name: "Our Team" },
    { id: "i3", image: "https://picsum.photos/seed/svc-claims/352/568",  name: "Claims Process" },
    { id: "i4", image: "https://picsum.photos/seed/svc-network/352/568", name: "Partner Network" },
  ],
};

// ── Icons ─────────────────────────────────────────────────────────────────────
const ArrowRightIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
    <path d="M6 16h20M18 8l8 8-8 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
    <path d="M26 16H6M14 8L6 16l8 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Gallery card ──────────────────────────────────────────────────────────────
const GalleryCard = ({ item }) => (
  <div className="relative shrink-0 w-[280px] sm:w-[320px] lg:w-[352px] h-[400px] sm:h-[480px] lg:h-[568px] rounded-[40px] overflow-hidden bg-[#1a0a2e]">
    {item.image && (
      <img
        src={item.image}
        alt={item.name}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
    )}
    {/* Bottom gradient */}
    <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/75 via-black/35 to-transparent pointer-events-none" />
    {/* Name label */}
    <div className="absolute bottom-0 left-0 p-6">
      <span className="font-raleway text-[22px] font-bold leading-[1.3] text-white">
        {item.name}
      </span>
    </div>
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────
const PartnerGallerySection = ({ category, items }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft,  setCanScrollLeft]  = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const config = CATEGORY_CONFIG[category];
  const cards  = useMemo(
    () => (items && items.length > 0) ? items : (MOCK_ITEMS[category] || []),
    [items, category]
  );

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => { updateScrollState(); }, [updateScrollState, cards]);

  const scrollLeft  = () => scrollRef.current?.scrollBy({ left: -373, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left:  373, behavior: "smooth" });

  if (!config || cards.length === 0) return null;

  return (
    <section
      aria-label={config.eyebrow}
      className="w-full py-[85px]"
    >
      <div className="mx-auto max-w-[1728px] px-4 sm:px-10 lg:px-[160px] flex flex-col gap-[60px]">

        {/* ── Header row ── */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          {/* Left: eyebrow */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-[46px] h-0.5 bg-secondary-dark-darker shrink-0" aria-hidden />
            <span className="font-raleway font-bold text-[13px] text-secondary-dark-darker leading-[18px] tracking-wide uppercase whitespace-nowrap">
              {config.eyebrow}
            </span>
          </div>

          {/* Right: description + optional highlights box */}
          <div className="flex flex-col gap-4 items-start md:items-end md:max-w-[440px]">
            <p className="font-raleway font-normal text-[16px] text-[#2d2d2d] leading-[24px] md:text-right">
              {config.description}
            </p>
            {config.highlights && (
              <div className="w-full flex flex-col gap-3 bg-white rounded-[20px] border-2 border-[#d6beeb] p-5">
                <span className="font-raleway text-[14px] font-normal text-[#2b0f43]">
                  {config.highlightsTitle}
                </span>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                  {config.highlights.map((h) => (
                    <span key={h} className="font-raleway text-[14px] font-normal text-[#2b0f43]">
                      • {h}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Carousel ── */}
        <div className="relative overflow-hidden">
          {/* Scrollable track */}
          <div
            ref={scrollRef}
            onScroll={updateScrollState}
            className="flex gap-[21px] overflow-x-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {cards.map((item) => (
              <GalleryCard key={item.id} item={item} />
            ))}
            {/* trailing spacer so last card doesn't butt against the arrow */}
            <div className="shrink-0 w-16" aria-hidden />
          </div>

          {/* Right fade — only when there's more to scroll */}
          {canScrollRight && (
            <div className="pointer-events-none absolute inset-y-0 right-0 w-[120px] bg-linear-to-l from-white/80 to-transparent" aria-hidden />
          )}

          {/* Scroll arrows — overlaid on right side */}
          <div className="absolute justify-between w-full top-1/2 -translate-y-1/2 flex gap-2 pointer-events-none">
            {canScrollLeft && (
              <button
                type="button"
                onClick={scrollLeft}
                className="pointer-events-auto translate-x-4 mr-auto flex h-[72px] w-[72px] items-center justify-center rounded-full border border-[rgba(255,255,255,0.2)] bg-[rgba(78,78,78,0.5)] backdrop-blur-sm transition hover:bg-[rgba(78,78,78,0.7)] cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
                aria-label="Scroll left"
              >
                <ArrowLeftIcon />
              </button>
            )}
            {canScrollRight && (
              <button
                type="button"
                onClick={scrollRight}
                className="pointer-events-auto flex ml-auto -translate-x-4 h-[72px] w-[72px] items-center justify-center rounded-full border border-[rgba(255,255,255,0.2)] bg-[rgba(78,78,78,0.5)] backdrop-blur-sm transition hover:bg-[rgba(78,78,78,0.7)] cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
                aria-label="Scroll right"
              >
                <ArrowRightIcon />
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default PartnerGallerySection;
