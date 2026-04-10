import React, { useState, useEffect, useCallback, useRef } from "react";

// ─── ImageGalleryModal — Figma 3159:47607 / 3159:47614 / 3159:47642 ──────────
//
// Full-screen layout (fixed inset-0 z-200):
//   Background overlay: rgba(45,45,45,0.6) — #2d2d2d at 60% opacity so
//   the page shows through (Figma 3159:47607)
//
// Two rows:
//   ① Viewer (flex-1, flex-row stretch):
//       [← circle arrow] [image card — flex-1, rounded-20px] [→ circle arrow]
//       Image card has:
//         • bg #f7f7f7 + photo cover + rgba(0,0,0,0.1) tint
//         • Top frosted bar h-120px: backdrop-blur(25px), gradient, mix-blend-multiply
//           Content at left-73px top-46px: expand-icon | title(SemiBold 25 #fefefe) | close-circle
//         • Bottom frosted bar h-146px: same blur
//           Content centred vertically at left-81px:
//             Left col (flex-col gap-7): 🇬🇭 + location text | "Description"
//             Right: share circle (47px) + wishlist circle (47px), gap-19
//
//   ② Image changer bar (flex-shrink-0, pt-24px):
//       separator line (1px rgba(255,255,255,0.12))
//       thumbnail strip: active→172px h-175px no-overlay, inactive→120px rgba(0,0,0,0.8) overlay
//       controls: prev(rgba(235,223,245,0.5)) + next(#ebdff5) | counter(#ebdff5)

const ImageGalleryModal = React.forwardRef(
  ({ images = [], currentIndex = 0, onClose, title = "", location = "" }, ref) => {
    const [activeIndex, setActiveIndex] = useState(currentIndex);
    const [bookmarked, setBookmarked] = useState(false);
    const thumbStripRef = useRef(null);
    const activeThumbRef = useRef(null);

    useEffect(() => { setActiveIndex(currentIndex); }, [currentIndex]);

    const goNext = useCallback(
      () => setActiveIndex((i) => (i + 1) % images.length),
      [images.length]
    );
    const goPrev = useCallback(
      () => setActiveIndex((i) => (i - 1 + images.length) % images.length),
      [images.length]
    );

    // Keyboard navigation
    useEffect(() => {
      const handleKey = (e) => {
        if (e.key === "Escape") onClose?.();
        if (e.key === "ArrowRight") goNext();
        if (e.key === "ArrowLeft") goPrev();
      };
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }, [onClose, goNext, goPrev]);

    // Auto-scroll thumbnail strip to keep active thumb centred
    useEffect(() => {
      if (activeThumbRef.current) {
        activeThumbRef.current.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }, [activeIndex]);

    // Lock body scroll while modal is open
    useEffect(() => {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }, []);

    if (!images.length) return null;

    const imgSrc = images[activeIndex]?.src || images[activeIndex];

    return (
      <div
        ref={ref}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          // Figma 3159:47607 — #2d2d2d at opacity 60%
          backgroundColor: "rgba(45,45,45,0.6)",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Raleway, sans-serif",
        }}
      >
        {/* ─────────────────────────────────────────────────────────────────
            ① VIEWER AREA — flex-1
            Three-column: [arrow] [image card] [arrow]
            alignItems:stretch so card fills full height; arrows self-centre
        ───────────────────────────────────────────────────────────────── */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            alignItems: "stretch",   // card stretches full height
            paddingTop: "24px",
          }}
        >
          {/* ── Left navigation arrow — centred vertically ────────────── */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            style={{
              flexShrink: 0,
              width: "80px",
              alignSelf: "center",   // centre arrow against the tall card
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "rgba(235,223,245,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Left chevron */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M13 4L7 10L13 16"
                  stroke="#fefefe"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>

          {/* ── Main image card — flex-1, fills full viewer height ──────── */}
          {/* Figma 3159:47614: rounded-20px, shadow, bg layers */}
          <div
            style={{
              flex: 1,
              position: "relative",
              overflow: "hidden",
              borderRadius: "20px",
              boxShadow: "0px 4px 20px 0px rgba(0,0,0,0.15)",
              // Ensure the card fills the flex row height
              alignSelf: "stretch",
            }}
          >
            {/* Layer 1: neutral base colour */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "#f7f7f7",
                borderRadius: "20px",
              }}
            />
            {/* Layer 2: hero image */}
            <img
              src={imgSrc}
              alt={title}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "20px",
                display: "block",
              }}
            />
            {/* Layer 3: 10% black tint — Figma rgba(0,0,0,0.1) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.1)",
                borderRadius: "20px",
              }}
            />

            {/* ── TOP FROSTED BAR — h-120px, absolute top-0 ────────────── */}
            {/* Figma 3159:47615: backdrop-blur(25px), gradient mix-blend-multiply */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "120px",
                overflow: "hidden",
                backdropFilter: "blur(25px)",
                WebkitBackdropFilter: "blur(25px)",
                // Exact Figma gradient (stops outside 0-100% intentional — creates subtle effect)
                backgroundImage:
                  "linear-gradient(175.015deg, rgba(255,255,255,0) 186.69%, rgba(153,153,153,0.5) 339.94%)",
                mixBlendMode: "multiply",
              }}
            >
              {/* Content row: expand | title | close — at left-73px top-46px */}
              <div
                style={{
                  position: "absolute",
                  left: "73px",
                  right: "73px",
                  top: "46px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {/* Expand / fullscreen icon — 40×40px SVG arrow-expand-01 */}
                <button
                  type="button"
                  aria-label="Toggle fullscreen"
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                  }}
                >
                  {/* arrow-expand-01 icon — 4 corner arrows pointing outward */}
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path
                      d="M6 6H14M6 6V14M6 6L14 14"
                      stroke="#fefefe"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M34 6H26M34 6V14M34 6L26 14"
                      stroke="#fefefe"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 34H14M6 34V26M6 34L14 26"
                      stroke="#fefefe"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M34 34H26M34 34V26M34 34L26 26"
                      stroke="#fefefe"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Title — Raleway SemiBold 25px #fefefe, centred, w-298px */}
                <p
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 600,
                    fontSize: "25px",
                    lineHeight: "normal",
                    color: "#fefefe",
                    textAlign: "center",
                    width: "298px",
                    flexShrink: 0,
                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {title}
                </p>

                {/* Close circle — Hicon / Linear / Close Circle, 40px */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close gallery"
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                  }}
                >
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="16.5" stroke="#fefefe" strokeWidth="1.5" />
                    <path
                      d="M14.5 14.5L25.5 25.5M25.5 14.5L14.5 25.5"
                      stroke="#fefefe"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* ── BOTTOM FROSTED BAR — h-146px, absolute bottom-0 ─────── */}
            {/* Figma 3159:47622: same blur + gradient mix-blend-multiply */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "146px",
                overflow: "hidden",
                backdropFilter: "blur(25px)",
                WebkitBackdropFilter: "blur(25px)",
                backgroundImage:
                  "linear-gradient(173.942deg, rgba(255,255,255,0) 186.69%, rgba(153,153,153,0.5) 339.94%)",
                mixBlendMode: "multiply",
              }}
            >
              {/* Content: vertically centred, left-81px right side for icons */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  left: "81px",
                  right: "81px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {/* Left block: flag+location / description — flex-col gap-7px */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "7px",
                    width: "298px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                    {/* Ghana flag circle — Ellipse10 26×26px */}
                    <span
                      style={{
                        fontSize: "18px",
                        lineHeight: "26px",
                        flexShrink: 0,
                        width: "26px",
                        height: "26px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      🇬🇭
                    </span>
                    <span
                      style={{
                        fontFamily: "Raleway, sans-serif",
                        fontWeight: 500,
                        fontSize: "16px",
                        lineHeight: "26px",
                        color: "#fefefe",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {location}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "26px",
                      color: "#fefefe",
                    }}
                  >
                    Description
                  </span>
                </div>

                {/* Right block: share + wishlist circles — gap-19px */}
                {/* Figma 3159:47629: left-1355px (relative to 1567px bar = near right) */}
                <div style={{ display: "flex", alignItems: "center", gap: "19px" }}>
                  {/* Share button — Group3267 (47×47px, rgba(235,223,245,0.25)) */}
                  <button
                    type="button"
                    aria-label="Share"
                    style={{
                      width: "47px",
                      height: "47px",
                      borderRadius: "50%",
                      border: "none",
                      cursor: "pointer",
                      backgroundColor: "rgba(235,223,245,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      padding: 0,
                    }}
                  >
                    {/* Share / Send4 icon rotated 180° per Figma */}
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      style={{ transform: "rotate(180deg)" }}
                    >
                      <path
                        d="M22 2L11 13"
                        stroke="#fefefe"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 2L15 22L11 13L2 9L22 2Z"
                        stroke="#fefefe"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* Wishlist button — Ellipse7 (47×47px) + heart icon */}
                  <button
                    type="button"
                    onClick={() => setBookmarked(!bookmarked)}
                    aria-label="Save to wishlist"
                    style={{
                      width: "47px",
                      height: "47px",
                      borderRadius: "50%",
                      border: "none",
                      cursor: "pointer",
                      // Filled purple when bookmarked, semi-transparent otherwise
                      backgroundColor: bookmarked
                        ? "rgba(123,44,191,0.7)"
                        : "rgba(235,223,245,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      padding: 0,
                      transition: "background-color 0.2s",
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"
                        stroke="#fefefe"
                        fill={bookmarked ? "#fefefe" : "none"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right navigation arrow — centred vertically ──────────────── */}
          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            style={{
              flexShrink: 0,
              width: "80px",
              alignSelf: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "rgba(235,223,245,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Right chevron */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M7 4L13 10L7 16"
                  stroke="#fefefe"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>

        {/* ─────────────────────────────────────────────────────────────────
            ② IMAGE CHANGER BAR — Figma 3159:47642
            pt-24px → separator → thumbnail strip → controls row
        ───────────────────────────────────────────────────────────────── */}
        <div style={{ flexShrink: 0, paddingTop: "24px" }}>

          {/* Separator line — Figma: Line7 (full width, very thin) */}
          <div
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "rgba(255,255,255,0.15)",
            }}
          />

          {/* ── Thumbnail strip ───────────────────────────────────────── */}
          {/* Figma 3159:47646: active=172px wide, inactive=120px, h-175px, no gaps */}
          <div
            ref={thumbStripRef}
            style={{
              display: "flex",
              overflowX: "auto",
              // Hide scrollbar cross-browser
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {/* Hide WebKit scrollbar via inline pseudo — handled via global CSS if needed */}
            <div style={{ display: "flex", alignItems: "stretch" }}>
              {images.map((img, i) => {
                const isActive = i === activeIndex;
                const src = img?.src || img;
                return (
                  <button
                    key={i}
                    ref={isActive ? activeThumbRef : null}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-label={`View image ${i + 1}`}
                    style={{
                      // Active: 172px wide, no overlay; inactive: 120px, dark overlay
                      width: isActive ? "172px" : "120px",
                      height: "175px",
                      position: "relative",
                      overflow: "hidden",
                      flexShrink: 0,
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      transition: "width 0.2s ease",
                      display: "block",
                    }}
                  >
                    {/* Base colour */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "#d9d9d9",
                      }}
                    />
                    {/* Thumbnail image */}
                    <img
                      src={src}
                      alt={`Image ${i + 1}`}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                    {/* Dark overlay on inactive thumbnails — Figma: rgba(0,0,0,0.8) */}
                    {!isActive && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          backgroundColor: "rgba(0,0,0,0.8)",
                          transition: "opacity 0.2s ease",
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Controls row — Figma 3159:47662 (Built-in pagination) ──── */}
          {/* max-w-1381px centred, prev/next left + counter right */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "24px 0 24px",
              maxWidth: "1381px",
              width: "calc(100% - 160px)",
              margin: "0 auto",
            }}
          >
            {/* Carets — Figma 3159:47663, gap-4px */}
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              {/* PREV — Figma 3159:47664: bg rgba(235,223,245,0.5), rounded-30px, p-8px */}
              {/* Down chevron rotated 90° = points left */}
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous"
                style={{
                  backgroundColor: "rgba(235,223,245,0.5)",
                  borderRadius: "30px",
                  padding: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ transform: "rotate(90deg)" }}
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="#4a1a73"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* NEXT — Figma 3159:47666: bg #ebdff5, rounded-30px, p-8px */}
              {/* Down chevron rotated -90° = points right */}
              <button
                type="button"
                onClick={goNext}
                aria-label="Next"
                style={{
                  backgroundColor: "#ebdff5",
                  borderRadius: "30px",
                  padding: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ transform: "rotate(-90deg)" }}
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="#4a1a73"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Image counter — Figma 3159:47668: Raleway Medium 16px #ebdff5 */}
            <p
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "26px",
                color: "#ebdff5",
                margin: 0,
                whiteSpace: "nowrap",
              }}
            >
              {activeIndex + 1} of {images.length} images
            </p>
          </div>
        </div>
      </div>
    );
  }
);

ImageGalleryModal.displayName = "ImageGalleryModal";
export default ImageGalleryModal;
