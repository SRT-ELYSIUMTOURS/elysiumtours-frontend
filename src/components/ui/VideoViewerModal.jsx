import React, { useState, useEffect } from "react";
import { classNames } from "../../utils/classNames";

// Video Viewer Modal — Figma nodes 772:10180 (playing) + 772:10332 (speed popup)
// Full-screen video lightbox with:
//   - Top bar (blur): title center, X close right (no shrink icon)
//   - Large video area with left/right nav arrows
//   - Controls bar: progress track + play + time + speed + fullscreen
//   - Bottom bar (blur): location+description left, share+like buttons right
//   - Thumbnail strip with active tile (172px) + inactive (120px, darkened)
//   - Pagination row
//   - Speed popup: bg-secondary-light-hover, 5 options [1x active, 1.2x, 1.5x, 1.7x, 2x]

const THUMBNAIL_IMAGES = [
  "https://picsum.photos/seed/vt1/120/175",
  "https://picsum.photos/seed/vt2/120/175",
  "https://picsum.photos/seed/vt3/120/175",
  "https://picsum.photos/seed/vt4/172/175",
  "https://picsum.photos/seed/vt5/120/175",
  "https://picsum.photos/seed/vt6/120/175",
  "https://picsum.photos/seed/vt7/120/175",
  "https://picsum.photos/seed/vt8/120/175",
  "https://picsum.photos/seed/vt9/120/175",
  "https://picsum.photos/seed/vt10/120/175",
  "https://picsum.photos/seed/vt11/120/175",
  "https://picsum.photos/seed/vt12/120/175",
  "https://picsum.photos/seed/vt13/120/175",
  "https://picsum.photos/seed/vt14/120/175",
];

const SPEED_OPTIONS = ["1x", "1.2x", "1.5x", "1.7x", "2x"];

// Play icon (triangle pointing right)
const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M8 5.5L18.5 12L8 18.5V5.5Z" fill="#fefefe" />
  </svg>
);

// Pause icon (two vertical bars)
const PauseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="6" y="5" width="4" height="14" rx="1" fill="#fefefe" />
    <rect x="14" y="5" width="4" height="14" rx="1" fill="#fefefe" />
  </svg>
);

// Fullscreen icon
const FullscreenIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M8 3H5a2 2 0 00-2 2v3M21 8V5a2 2 0 00-2-2h-3M3 16v3a2 2 0 002 2h3M16 21h3a2 2 0 002-2v-3" stroke="#fefefe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Close circle icon
const CloseIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="16" stroke="#fefefe" strokeWidth="1.5" />
    <path d="M14 14l12 12M26 14L14 26" stroke="#fefefe" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Share icon
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

// Left/right chevron (using Down arrow rotated)
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

// Ghana flag emoji
const GhanaFlag = () => (
  <span className="text-[16px]" role="img" aria-label="Ghana flag">🇬🇭</span>
);

const VideoViewerModal = React.forwardRef(({
  isOpen = false,
  onClose,
  video,
  image,          // poster/thumbnail for video
  title = "Evergreen Sanctuary",
  location = "Ghana-Central Region, Cape Coast",
  description = "Description",
  currentIndex = 3,
  totalImages = 24,
  thumbnails = THUMBNAIL_IMAGES,
  onPrev,
  onNext,
  onShare,
  className = "",
  ...props
}, ref) => {
  const [currentThumb, setCurrentThumb] = useState(currentIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(38); // % of video played (575/1492 ≈ 38%)
  const [showSpeedPopup, setShowSpeedPopup] = useState(false);
  const [speed, setSpeed] = useState("1x");

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

  const handleSpeedSelect = (s) => {
    setSpeed(s);
    setShowSpeedPopup(false);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-start"
      style={{ background: "rgba(0,0,0,0.15)" }}
    >
      {/* Main viewer container */}
      <div
        ref={ref}
        className={classNames(
          "flex flex-col gap-[24px] items-center relative",
          "w-full max-w-[1728px]",
          className
        )}
        {...props}
      >
        {/* === MAIN VIDEO AREA === */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            height: "calc(100vh - 271px)",
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
            borderTopRightRadius: "20px",
            boxShadow: "0px 4px 20px 0px rgba(0,0,0,0.15)"
          }}
        >
          {/* Background / Video */}
          <div
            className="absolute inset-0"
            style={{ background: "#f7f7f7" }}
          >
            {video ? (
              <video
                src={video}
                poster={image}
                className="w-full h-full object-cover"
              />
            ) : (
              image && (
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              )
            )}
            {!video && !image && (
              <img
                src={`https://picsum.photos/seed/video-viewer-${currentThumb}/1728/900`}
                alt={title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* Top bar — blurred, title center + close right (no shrink icon) */}
          <div
            className="absolute top-0 left-0 right-0 h-[120px] overflow-hidden"
            style={{ backdropFilter: "blur(25px)", mixBlendMode: "multiply" }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(175.477deg, rgba(255,255,255,0) 186.69%, rgba(153,153,153,0.5) 339.94%)" }}
            />
            <div className="absolute top-[46px] left-0 right-0 flex items-center justify-between px-[154px]">
              {/* Title — left of center, but in design it's centered in the bar with CloseCircle right */}
              <p className="font-raleway font-semibold text-[25px] leading-[normal] text-primary-light-default text-center w-[298px]">
                {title}
              </p>
              {/* Close */}
              <button className="cursor-pointer" onClick={onClose} aria-label="Close viewer">
                <CloseIcon />
              </button>
            </div>
          </div>

          {/* Left/right nav arrows */}
          <button
            className="absolute left-[13px] top-1/2 -translate-y-1/2 flex items-center justify-center size-[32px] cursor-pointer"
            onClick={handlePrev}
            aria-label="Previous video"
          >
            <ChevronLeft />
          </button>
          <button
            className="absolute right-[13px] top-1/2 -translate-y-1/2 flex items-center justify-center size-[32px] cursor-pointer"
            onClick={handleNext}
            aria-label="Next video"
          >
            <ChevronRight />
          </button>

          {/* Controls bar — bottom-[35px], centered, w-[1492px] */}
          <div
            className="absolute bottom-[35px] left-1/2 -translate-x-1/2 flex flex-col gap-[2px] items-start"
            style={{ width: "1492px" }}
          >
            {/* Progress track */}
            <div className="relative w-full" style={{ height: "8px" }}>
              {/* Track */}
              <div
                className="absolute inset-0 rounded-[10px]"
                style={{ background: "#d6beeb" }}
              />
              {/* Fill */}
              <div
                className="absolute left-0 top-0 h-full rounded-[10px]"
                style={{
                  background: "#7b2cbf",
                  width: `${progress}%`,
                }}
              />
              {/* Clickable scrubber */}
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
              />
            </div>

            {/* Controls row */}
            <div className="flex items-center justify-between w-full">
              {/* Left: play + time */}
              <div className="flex items-center">
                <button
                  className="cursor-pointer"
                  onClick={() => setIsPlaying(p => !p)}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
                <p className="font-raleway font-medium text-[16px] leading-[26px] text-primary-light-default text-center w-[94px]">
                  0:01 / 1:25
                </p>
              </div>

              {/* Right: speed + fullscreen */}
              <div className="relative flex gap-[4px] items-center">
                {/* Speed popup — appears above the speed button */}
                {showSpeedPopup && (
                  <div
                    className="absolute bottom-full right-[28px] mb-[4px] flex items-center p-[4px] rounded-[5px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]"
                    style={{ background: "#ebdff5" }}
                  >
                    {SPEED_OPTIONS.map((s) => (
                      <button
                        key={s}
                        className={classNames(
                          "flex h-[24px] items-center justify-center rounded-[5px] cursor-pointer w-[36px]",
                          s === speed
                            ? "bg-secondary-normal-default"
                            : "bg-transparent"
                        )}
                        onClick={() => handleSpeedSelect(s)}
                      >
                        <span
                          className={classNames(
                            "font-raleway text-center",
                            s === speed
                              ? "font-semibold text-[16px] leading-[22px] text-primary-light-default"
                              : "font-normal text-[13px] leading-[20px] text-[#2d2d2d]"
                          )}
                        >
                          {s}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Speed button */}
                <button
                  className="flex items-center justify-center rounded-[5px] cursor-pointer"
                  onClick={() => setShowSpeedPopup(p => !p)}
                  aria-label="Playback speed"
                >
                  <span className="font-raleway text-primary-light-default text-center w-[36px] leading-[0]">
                    <span className="text-[16px] leading-[22px]">{speed.replace("x", "")}</span>
                    <span className="text-[13px] leading-[18px]">x</span>
                  </span>
                </button>

                {/* Fullscreen button */}
                <button
                  className="relative size-[24px] cursor-pointer"
                  aria-label="Fullscreen"
                >
                  <FullscreenIcon />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* === BOTTOM INFO + THUMBNAIL STRIP + PAGINATION === */}
        <div className="flex flex-col gap-[24px] items-center w-full px-[4px]">
          {/* Blurred bottom bar — location + description + share/like */}
          <div
            className="relative w-full h-[146px] overflow-hidden rounded-[20px]"
            style={{ backdropFilter: "blur(25px)", mixBlendMode: "multiply" }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(174.503deg, rgba(255,255,255,0) 186.69%, rgba(153,153,153,0.5) 339.94%)" }}
            />
            {/* Location + description */}
            <div className="absolute top-1/2 -translate-y-1/2 left-[81px] flex flex-col gap-[7px] w-[298px]">
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
                  aria-label={`View video ${i + 1}`}
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
            <p className="font-raleway font-medium text-[16px] leading-[26px] text-secondary-light-hover text-center whitespace-nowrap">
              {currentThumb + 1} of {totalImages} images
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

VideoViewerModal.displayName = "VideoViewerModal";
export default VideoViewerModal;
