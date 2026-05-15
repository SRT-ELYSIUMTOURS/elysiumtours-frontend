import React from "react";
import { classNames } from "../../../utils/classNames";

// Shared atoms for ImageViewerModal + VideoViewerModal.
// All measurements come from Figma frames 748:9123 (image) and 768:10050 (video).
// Design widths: main container 1567×988, metadata band 1567×146, thumbnail strip 1732×175,
// pagination 1381×40. We scale via percentages inside the main container.

// ────────────────────────────────  ICONS  ────────────────────────────────

export const PlayIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M8 5.5L18.5 12L8 18.5V5.5Z" fill="#fefefe" />
  </svg>
);

export const PauseIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="6" y="5" width="4" height="14" rx="1" fill="#fefefe" />
    <rect x="14" y="5" width="4" height="14" rx="1" fill="#fefefe" />
  </svg>
);

// 4-corner expand (used both for ImageViewer top-left and VideoViewer fullscreen control).
export const FullscreenIcon = ({ size = 24, color = "#fefefe" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ShareIcon = ({ size = 24, color = "#fefefe" }) => (
  // share-03 — arrow up from box
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 3v12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 7l4-4 4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const HeartIcon = ({ size = 24, color = "#fefefe", filled = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : "none"} aria-hidden>
    <path
      d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CloseCircleIcon = ({ size = 40, color = "#fefefe" }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
    <circle cx="20" cy="20" r="16" stroke={color} strokeWidth="1.5" />
    <path d="M14 14l12 12M26 14L14 26" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const ChevronLeft = ({ size = 24, color = "#ebdff5" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M15 18L9 12L15 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronRight = ({ size = 24, color = "#ebdff5" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M9 18L15 12L9 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 26×26 circular flag avatar (Figma uses an Ellipse with the Ghana flag image clipped).
export const FlagAvatar = ({ src, label = "Ghana flag" }) => (
  <div className="size-[clamp(20px,1.6vw,26px)] shrink-0 overflow-hidden rounded-full bg-white/20" aria-label={label}>
    {src ? (
      <img src={src} alt="" className="h-full w-full object-cover" />
    ) : (
      <span className="flex h-full w-full items-center justify-center text-[14px]" role="img" aria-hidden>
        🇬🇭
      </span>
    )}
  </div>
);

// ───────────────────────────────  PEEK CARD  ───────────────────────────────
// Side preview of prev/next item — appears at left/right of the main carousel.
// Figma: left peek 1153×624 at x=0, right peek 1153×624 at x=2784. They sit
// behind the main 1567 container which spans x=1185 to x=2752, so peeks
// occupy the gap between the viewport edge and the main card.

export function PeekCard({ src, label, onClick, side }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={classNames(
        "relative hidden shrink-0 overflow-hidden md:block",
        // Aspect 1153/624 — same as Figma left/right peek frames
        "aspect-[1153/624] w-[clamp(100px,12vw,260px)]",
        side === "left" ? "rounded-tr-[20px] rounded-br-[20px]" : "rounded-tl-[20px] rounded-bl-[20px]"
      )}
    >
      <div className="absolute inset-0 bg-[#f7f7f7]" />
      {src && <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />}
      {/* Figma uses rgba(0,0,0,0.8) overlay for inactive thumbnails — peek cards mirror that. */}
      <div className="absolute inset-0 bg-black/80" aria-hidden />
    </button>
  );
}

// ──────────────────────────────  BLUR BAND  ──────────────────────────────
// Reusable blurred gradient band. Used as:
//   - top bar overlay (height ≈ 12.146% of main container = 120/988)
//   - bottom metadata bar (overlay or detached, height ≈ 146/988)
// Figma gradient: top uses 175.015deg, bottom uses 173.942deg, both sweep
// from rgba(255,255,255,0) → rgba(153,153,153,0.5).

export function BlurBand({ position = "top", className = "", style = {}, rounded, children }) {
  const angle = position === "top" ? 175.015 : 173.942;
  // NOTE: consumer chooses position (absolute vs relative) via className.
  return (
    <div
      className={classNames("overflow-hidden", rounded || "", className)}
      style={style}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backdropFilter: "blur(25px)",
          WebkitBackdropFilter: "blur(25px)",
          mixBlendMode: "multiply",
          background: `linear-gradient(${angle}deg, rgba(255,255,255,0) 186.69%, rgba(153,153,153,0.5) 339.94%)`,
        }}
        aria-hidden
      />
      {/* Soft dark base so the band reads on light footage too. */}
      <div className="pointer-events-none absolute inset-0 bg-black/35" aria-hidden />
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
}

// ──────────────────────────  METADATA BLOCK (left)  ──────────────────────────
// Flag + location row, then description. Figma w=298, gap=7px.
export function ViewerMetadataBlock({ location, description, flagSrc }) {
  return (
    <div className="flex max-w-[298px] flex-col gap-[7px]">
      <div className="flex items-center gap-[7px]">
        <FlagAvatar src={flagSrc} />
        <p className="font-raleway text-[16px] font-medium leading-[26px] text-primary-light-default">
          {location}
        </p>
      </div>
      <p className="font-raleway text-[16px] font-medium leading-[26px] text-primary-light-default">
        {description}
      </p>
    </div>
  );
}

// ───────────────────────  ACTION BUTTONS (share + like)  ───────────────────
// Two 47×47 circular buttons, gap=19. Like is filled with secondary-normal.
export function ViewerActionButtons({ onShare, onLike, liked = false }) {
  return (
    <div className="flex shrink-0 items-center gap-[19px]">
      <button
        type="button"
        onClick={onShare}
        aria-label="Share"
        className="flex size-[47px] cursor-pointer items-center justify-center rounded-full border border-primary-light-default/30 transition hover:bg-white/10"
      >
        <ShareIcon />
      </button>
      <button
        type="button"
        onClick={onLike}
        aria-label={liked ? "Unlike" : "Like"}
        className="flex size-[47px] cursor-pointer items-center justify-center rounded-full bg-secondary-normal-default transition hover:opacity-90"
      >
        <HeartIcon filled={liked} />
      </button>
    </div>
  );
}

// ──────────────────────────  THUMBNAIL STRIP  ──────────────────────────
// Figma: each thumbnail 120×175, active 172×175. Inactive overlay rgba(0,0,0,0.8).
// Strip total width 1732 — overflows on smaller viewports so we scroll horizontally.
export function ViewerThumbnailStrip({ thumbnails, currentIndex, onSelect }) {
  return (
    <div
      className="scrollbar-none flex h-[175px] w-full items-center overflow-x-auto"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {thumbnails.map((src, i) => {
        const isActive = i === currentIndex;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`View item ${i + 1}`}
            aria-current={isActive ? "true" : undefined}
            className={classNames(
              "relative h-[175px] shrink-0 cursor-pointer transition-[width] duration-200",
              isActive ? "w-[172px]" : "w-[120px]"
            )}
          >
            <div className="absolute inset-0 bg-[#d9d9d9]">
              {src && <img src={src} alt="" className="h-full w-full object-cover" />}
              {!isActive && <div className="absolute inset-0 bg-black/80" aria-hidden />}
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ──────────────────────────  PAGINATION  ──────────────────────────
// Figma 1381 wide. Prev/next pills (rounded-30, p-8) + "X of N items" text.
// Prev background rgba(235,223,245,0.5), next background #ebdff5.
export function ViewerPagination({ currentIndex, total, onPrev, onNext, label = "items" }) {
  return (
    <div className="flex w-full max-w-[1381px] items-center justify-between px-2">
      <div className="flex items-center gap-[4px]">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous"
          disabled={currentIndex <= 0}
          className="flex cursor-pointer items-center rounded-[30px] p-[8px] transition disabled:cursor-not-allowed disabled:opacity-50"
          style={{ background: "rgba(235,223,245,0.5)" }}
        >
          <ChevronLeft />
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next"
          disabled={currentIndex >= total - 1}
          className="flex cursor-pointer items-center rounded-[30px] bg-secondary-light-hover p-[8px] transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronRight />
        </button>
      </div>
      <p className="whitespace-nowrap text-center font-raleway text-[16px] font-medium leading-[26px] text-secondary-light-hover">
        {currentIndex + 1} of {total} {label}
      </p>
    </div>
  );
}

// ──────────────────────  OUTER VIEWPORT-EDGE ARROWS  ──────────────────────
// Figma Frame 3034 (image viewer) / 768:10108 (video viewer): 32×32 chevrons
// floating at the very left / right of the viewport, vertically aligned with
// the centre of the main card.
export function ViewerEdgeArrows({ onPrev, onNext, canPrev, canNext }) {
  return (
    <>
      <button
        type="button"
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Previous"
        className="absolute left-[clamp(4px,1vw,13px)] top-[42%] z-20 flex size-[32px] -translate-y-1/2 cursor-pointer items-center justify-center transition disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={!canNext}
        aria-label="Next"
        className="absolute right-[clamp(4px,1vw,13px)] top-[42%] z-20 flex size-[32px] -translate-y-1/2 cursor-pointer items-center justify-center transition disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronRight size={32} />
      </button>
    </>
  );
}

// ───────────────  HOOK: BODY SCROLL LOCK WHILE MODAL OPEN  ───────────────
export function useBodyScrollLock(isOpen) {
  React.useEffect(() => {
    if (!isOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);
}

// ───────────────  HOOK: ESC TO CLOSE  ───────────────
export function useEscapeKey(isOpen, onClose, suppress = false) {
  React.useEffect(() => {
    if (!isOpen || suppress) return undefined;
    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose, suppress]);
}
