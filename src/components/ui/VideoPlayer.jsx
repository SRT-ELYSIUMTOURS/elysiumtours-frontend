import React, { useState, useRef, useEffect } from "react";
import { classNames } from "../../utils/classNames";

// From Figma: Frame 3027 inside Video Section-Playing video (627:12888)
// "Frame 3031" HORIZONTAL gap:32:
//   Frame 258 (1153×624) — thumbnail L  fill:#f7f7f7,IMAGE,#000000 r:20
//   Frame 255 (1567×988) — MAIN video player fill:#f7f7f7,IMAGE,#000000
//     Frame 3025 (gradient overlay bottom) fill:GRADIENT_LINEAR
//     Frame 3043 (title/info bar) VERTICAL gap:8
//   Frame 257 (1153×624) — thumbnail R fill:#f7f7f7,IMAGE,#000000 r:20
// Frame 3036 VERTICAL gap:24:
//   Frame 3026 (progress/controls bar 1567×146) fill:GRADIENT_LINEAR r:20
//     Frame 3038 (title + location VERTICAL gap:7)
//     Frame 132 (share/download buttons HORIZONTAL gap:19)
//   Line 7 (stroke:#d6beeb)
//   Frame 3037 (thumbnail strip + pagination) VERTICAL gap:32
//     Frame 3029: thumbnails HORIZONTAL gap:- 
//     Built-in pagination: HORIZONTAL gap:80
// Prev/Next arrows: Frame 3034 HORIZONTAL gap:1605
//   ChevronLeft/Right 32×32 stroke:#ebdff5

const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M8 5.5l10 6.5-10 6.5V5.5z" fill="#fefefe"/>
  </svg>
);
const PauseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="6" y="5" width="4" height="14" rx="1" fill="#fefefe"/>
    <rect x="14" y="5" width="4" height="14" rx="1" fill="#fefefe"/>
  </svg>
);
const ShareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="18" cy="5" r="3" stroke="#fefefe" strokeWidth="1.5"/>
    <circle cx="6" cy="12" r="3" stroke="#fefefe" strokeWidth="1.5"/>
    <circle cx="18" cy="19" r="3" stroke="#fefefe" strokeWidth="1.5"/>
    <path d="M9 13.5l6 4M15 6.5l-6 4" stroke="#fefefe" strokeWidth="1.5"/>
  </svg>
);
const DownloadIcon2 = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 3v13M7 11l5 5 5-5" stroke="#fefefe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 20h18" stroke="#fefefe" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#fefefe" strokeWidth="1.5"/>
    <path d="M15 9l-6 6M9 9l6 6" stroke="#fefefe" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const ChevronLeft = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M15 18l-6-6 6-6" stroke="#ebdff5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ChevronRight = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M9 6l6 6-6 6" stroke="#ebdff5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const VideoPlayer = React.forwardRef(({
  title = "Evergreen Sanctuary",
  location = "Ghana Nairobi Region (Captured)",
  description = "From Ghana",
  videoSrc,
  thumbnails = [],
  activeIndex = 0,
  totalImages = 0,
  onClose,
  onPrev,
  onNext,
  onShare,
  onDownload,
  className = "",
  ...props
}, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(27); // %
  const [currentThumb, setCurrentThumb] = useState(activeIndex);
  const [duration] = useState("5:21");
  const [elapsed] = useState("1:27");

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setProgress(((e.clientX - rect.left) / rect.width) * 100);
  };

  return (
    // Rectangle 2939: fill:#2d2d2d (dark background)
    <div ref={ref} className={classNames("relative bg-tertiary-normal-default", className)} {...props}>

      {/* Prev arrow — left edge */}
      <button type="button" onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 transition-all duration-300 ease-in">
        <ChevronLeft />
      </button>

      {/* Next arrow — right edge */}
      <button type="button" onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 transition-all duration-300 ease-in">
        <ChevronRight />
      </button>

      {/* Frame 3031 — 3 columns: side thumbnails + main video */}
      <div className="flex gap-8 items-center px-8 pt-6">

        {/* Left thumbnail — Frame 258 r:20 */}
        {thumbnails.length > 0 && (
          <div className="rounded-[20px] overflow-hidden shrink-0 opacity-60 hover:opacity-100 transition-all duration-300 ease-in cursor-pointer"
            style={{ width:"200px", height:"140px" }}>
            <img src={thumbnails[(currentThumb - 1 + thumbnails.length) % thumbnails.length]?.src}
              alt="" className="w-full h-full object-cover" />
          </div>
        )}

        {/* Main video player — Frame 255 */}
        <div className="relative flex-1 overflow-hidden bg-black"
          style={{ height: "400px", borderRadius:"10px" }}>

          {/* Video/image */}
          {videoSrc
            ? <video src={videoSrc} className="w-full h-full object-cover" />
            : thumbnails[currentThumb]
              ? <img src={thumbnails[currentThumb]?.src} alt={title} className="w-full h-full object-cover" />
              : <div className="w-full h-full bg-black" />
          }

          {/* Title bar — top */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3"
            style={{ background:"linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)" }}>
            <span style={{ fontSize:"16px", fontWeight:600, color:"#fefefe", fontFamily:"Raleway,sans-serif" }}>{title}</span>
            <button type="button" onClick={onClose}><CloseIcon /></button>
          </div>

          {/* Play button overlay */}
          <button type="button" onClick={() => setIsPlaying(p => !p)}
            className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-secondary-normal-default/80 flex items-center justify-center hover:bg-secondary-normal-default transition-all duration-300 ease-in">
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </div>
          </button>

          {/* Bottom controls gradient */}
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-8"
            style={{ background:"linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}>
            {/* Progress bar */}
            <div className="flex items-center gap-2 mb-2">
              <span style={{ fontSize:"11px", color:"#fefefe", fontFamily:"Raleway,sans-serif" }}>{elapsed}</span>
              <div className="flex-1 h-[3px] rounded-full bg-white/30 cursor-pointer relative" onClick={handleProgressClick}>
                <div className="h-full rounded-full bg-secondary-normal-default transition-all duration-100"
                  style={{ width:`${progress}%` }} />
                <div className="absolute w-3 h-3 rounded-full bg-secondary-normal-default top-1/2 -translate-y-1/2 shadow"
                  style={{ left:`${progress}%`, transform:"translate(-50%, -50%)" }} />
              </div>
              <span style={{ fontSize:"11px", color:"#fefefe", fontFamily:"Raleway,sans-serif" }}>{duration}</span>
            </div>
          </div>
        </div>

        {/* Right thumbnail — Frame 257 r:20 */}
        {thumbnails.length > 1 && (
          <div className="rounded-[20px] overflow-hidden shrink-0 opacity-60 hover:opacity-100 transition-all duration-300 ease-in cursor-pointer"
            style={{ width:"200px", height:"140px" }}>
            <img src={thumbnails[(currentThumb + 1) % thumbnails.length]?.src}
              alt="" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Frame 3036 — info bar + divider + thumbnail strip */}
      <div className="flex flex-col gap-[24px] px-8 pb-6 mt-4">
        {/* Info + share row — Frame 3026 */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-[7px]">
            <span style={{ fontSize:"16px", fontWeight:600, color:"#fefefe", fontFamily:"Raleway,sans-serif" }}>{location}</span>
            <span style={{ fontSize:"13px", fontWeight:400, color:"#b9b9b9", fontFamily:"Raleway,sans-serif" }}>{description}</span>
          </div>
          <div className="flex items-center gap-[19px]">
            <button type="button" onClick={onShare} className="hover:opacity-70 transition-all duration-300 ease-in"><ShareIcon /></button>
            <button type="button" onClick={onDownload} className="hover:opacity-70 transition-all duration-300 ease-in"><DownloadIcon2 /></button>
          </div>
        </div>

        {/* Divider — Line 7 stroke:#d6beeb */}
        <div className="w-full h-px" style={{ backgroundColor:"#d6beeb" }} />

        {/* Thumbnail strip — Frame 3029 */}
        <div className="flex items-center gap-2 overflow-hidden">
          {thumbnails.map((t, i) => (
            <button key={i} type="button" onClick={() => setCurrentThumb(i)}
              className={classNames("rounded-[6px] overflow-hidden shrink-0 transition-all duration-300 ease-in",
                i === currentThumb ? "ring-2 ring-secondary-normal-default" : "opacity-60 hover:opacity-100")}
              style={{ width:"72px", height:"48px" }}>
              <img src={t.src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
          {totalImages > thumbnails.length && (
            <span style={{ fontSize:"13px", color:"#b9b9b9", fontFamily:"Raleway,sans-serif", whiteSpace:"nowrap" }}>
              +{totalImages - thumbnails.length} images
            </span>
          )}
        </div>

        {/* Pagination dots */}
        <div className="flex items-center gap-2">
          <div className="w-[10px] h-[10px] rounded-full" style={{ backgroundColor:"#d6beeb", border:"1px solid #7b2cbf" }} />
          <div className="w-[10px] h-[10px] rounded-full" style={{ backgroundColor:"#f2eaf9" }} />
        </div>
      </div>
    </div>
  );
});

VideoPlayer.displayName = "VideoPlayer";
export default VideoPlayer;
