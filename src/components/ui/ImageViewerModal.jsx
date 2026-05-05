import React, { useState, useEffect } from "react";
import { classNames } from "../../utils/classNames";

// Image Viewer Modal — Figma node 751:9961
// Top bar: expand (fullscreen gallery) when onOpenFullscreen is set; title; close (X).
//   - Large image fills the container (rounded bottom corners + top-right)
//   - Bottom bar (blur): location+description left, share+like buttons right
//   - Thumbnail strip below with darkened inactive tiles, active tile (172px wide) highlighted
//   - Pagination "1 of 24 images" + prev/next nav buttons

const THUMBNAIL_IMAGES = [
  "https://picsum.photos/seed/gt1/120/175",
  "https://picsum.photos/seed/gt2/120/175",
  "https://picsum.photos/seed/gt3/120/175",
  "https://picsum.photos/seed/gt4/172/175",
  "https://picsum.photos/seed/gt5/120/175",
  "https://picsum.photos/seed/gt6/120/175",
  "https://picsum.photos/seed/gt7/120/175",
  "https://picsum.photos/seed/gt8/120/175",
  "https://picsum.photos/seed/gt9/120/175",
  "https://picsum.photos/seed/gt10/120/175",
  "https://picsum.photos/seed/gt11/120/175",
  "https://picsum.photos/seed/gt12/120/175",
  "https://picsum.photos/seed/gt13/120/175",
  "https://picsum.photos/seed/gt14/120/175",
];

// Share icon (send/forward)
const ShareIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="#fefefe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Heart/like icon
const HeartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="#fefefe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Expand — open immersive fullscreen gallery (when onOpenFullscreen is provided)
const ExpandFullscreenIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
      stroke="#fefefe"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Close circle icon
const CloseIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="16" stroke="#fefefe" strokeWidth="1.5" />
    <path d="M14 14l12 12M26 14L14 26" stroke="#fefefe" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Left/right chevron
const ChevronLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M15 18L9 12L15 6" stroke="#ebdff5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ChevronRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M9 18L15 12L9 6" stroke="#ebdff5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Flag emoji
const GhanaFlag = () => (
  <span className="text-[16px]" role="img" aria-label="Ghana flag">🇬🇭</span>
);

const ImageViewerModal = React.forwardRef(({
  isOpen = false,
  onClose,
  image,
  title = "Giraffe Sanctuary",
  location = "Ghana-Central Region, Cape Coast",
  description = "Description",
  currentIndex = 3,
  totalImages = 24,
  thumbnails = THUMBNAIL_IMAGES,
  onPrev,
  onNext,
  onShare,
  /** Immersive gallery (e.g. ImageGalleryModal); top-left expand control */
  onOpenFullscreen,
  className = "",
  ...props
}, ref) => {
  const [currentThumb, setCurrentThumb] = useState(currentIndex);

  useEffect(() => {
    setCurrentThumb(currentIndex);
  }, [currentIndex]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrev = () => {
    setCurrentThumb(p => Math.max(0, p - 1));
    onPrev?.();
  };
  const handleNext = () => {
    setCurrentThumb(p => Math.min(totalImages - 1, p + 1));
    onNext?.();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-start"
      style={{ background: "rgba(0,0,0,0.15)" }}
    >
      {/* Main viewer container — rounded bl/br/tr, no top-left rounding */}
      <div
        ref={ref}
        className={classNames(
          "flex flex-col gap-[24px] items-center relative",
          "w-full max-w-[1728px]",
          className
        )}
        {...props}
      >
        {/* === MAIN IMAGE AREA === */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            height: "calc(100vh - 271px)",  // leave space for thumbnail strip + pagination
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
            borderTopRightRadius: "20px",
            boxShadow: "0px 4px 20px 0px rgba(0,0,0,0.15)"
          }}
        >
          {/* Background image */}
          <div
            className="absolute inset-0"
            style={{ background: "#f7f7f7" }}
          >
            {image ? (
              <img src={image} alt={title} className="w-full h-full object-cover" />
            ) : (
              thumbnails[currentThumb] && (
                <img
                  src={`https://picsum.photos/seed/viewer-${currentThumb}/1728/900`}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              )
            )}
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* Top bar — blurred */}
          <div
            className="absolute top-0 left-0 right-0 h-[120px] overflow-hidden"
            style={{ backdropFilter: "blur(25px)", mixBlendMode: "multiply" }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(175.477deg, rgba(255,255,255,0) 186.69%, rgba(153,153,153,0.5) 339.94%)" }}
            />
            {/* Content */}
            <div className="absolute top-[46px] left-0 right-0 flex items-center justify-between px-[154px]">
              <button
                type="button"
                className={classNames(
                  "rounded-lg p-2 transition-colors hover:bg-white/10",
                  onOpenFullscreen ? "cursor-pointer" : "pointer-events-none opacity-40"
                )}
                onClick={() => onOpenFullscreen?.()}
                disabled={!onOpenFullscreen}
                aria-label="Open fullscreen gallery"
              >
                <ExpandFullscreenIcon />
              </button>

              {/* Title */}
              <p className="font-raleway font-semibold text-[25px] leading-[normal] text-primary-light-default text-center w-[298px]">
                {title}
              </p>

              {/* Close */}
              <button className="cursor-pointer" onClick={onClose} aria-label="Close viewer">
                <CloseIcon />
              </button>
            </div>
          </div>

          {/* Bottom bar — blurred */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[146px] overflow-hidden"
            style={{ backdropFilter: "blur(25px)", mixBlendMode: "multiply" }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(174.503deg, rgba(255,255,255,0) 186.69%, rgba(153,153,153,0.5) 339.94%)" }}
            />
            {/* Location + description */}
            <div className="absolute top-1/2 -translate-y-1/2 left-[154px] flex flex-col gap-[7px] w-[298px]">
              <div className="flex items-center gap-[7px]">
                <div className="shrink-0 size-[26px] rounded-full overflow-hidden">
                  <GhanaFlag />
                </div>
                <p className="font-raleway font-medium text-[16px] leading-[26px] text-primary-light-default whitespace-nowrap">
                  {location}
                </p>
              </div>
              <p className="font-raleway font-medium text-[16px] leading-[26px] text-primary-light-default">
                {description}
              </p>
            </div>

            {/* Share + like buttons */}
            <div className="absolute top-[50px] right-[154px] flex items-center gap-[19px]">
              {/* Share button */}
              <button
                className="relative size-[47px] flex items-center justify-center rounded-full border border-primary-light-default/30 cursor-pointer"
                onClick={onShare}
                aria-label="Share"
              >
                <ShareIcon />
              </button>

              {/* Like button */}
              <button
                className="relative size-[47px] flex items-center justify-center rounded-full bg-secondary-normal-default cursor-pointer"
                aria-label="Like"
              >
                <HeartIcon />
              </button>
            </div>
          </div>

          {/* Left/right nav arrows (outside the card, centered vertically) */}
          <button
            className="absolute left-[13px] top-1/2 -translate-y-1/2 flex items-center justify-center size-[32px] cursor-pointer"
            onClick={handlePrev}
            aria-label="Previous image"
          >
            <ChevronLeft />
          </button>
          <button
            className="absolute right-[13px] top-1/2 -translate-y-1/2 flex items-center justify-center size-[32px] cursor-pointer"
            onClick={handleNext}
            aria-label="Next image"
          >
            <ChevronRight />
          </button>
        </div>

        {/* === THUMBNAIL STRIP + PAGINATION === */}
        <div className="flex flex-col gap-[32px] items-center w-full px-[4px]">
          {/* Divider */}
          <div className="w-full h-px bg-primary-dark-default/20" />

          {/* Thumbnail strip */}
          <div className="flex items-center overflow-x-auto scrollbar-none w-full" style={{ height: "175px" }}>
            {thumbnails.map((thumb, i) => {
              const isActive = i === currentThumb;
              const width = isActive ? 172 : 120;
              return (
                <button
                  key={i}
                  className="relative shrink-0 h-[175px] cursor-pointer"
                  style={{ width: `${width}px` }}
                  onClick={() => setCurrentThumb(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: "#d9d9d9" }}
                  >
                    <img src={thumb} alt="" className="w-full h-full object-cover" />
                    {!isActive && (
                      <div className="absolute inset-0 bg-black/80" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between w-[1381px]">
            {/* Prev/next nav buttons */}
            <div className="flex gap-[4px] items-center">
              <button
                className="flex items-center p-[8px] rounded-[30px] cursor-pointer"
                style={{ background: "rgba(235,223,245,0.5)" }}
                onClick={handlePrev}
                aria-label="Previous"
              >
                <ChevronLeft />
              </button>
              <button
                className="flex items-center p-[8px] rounded-[30px] bg-secondary-light-hover cursor-pointer"
                onClick={handleNext}
                aria-label="Next"
              >
                <ChevronRight />
              </button>
            </div>

            {/* Count */}
            <p className="font-raleway font-medium text-[16px] leading-[26px] text-secondary-light-hover text-center whitespace-nowrap">
              {currentThumb + 1} of {totalImages} images
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

ImageViewerModal.displayName = "ImageViewerModal";
export default ImageViewerModal;
