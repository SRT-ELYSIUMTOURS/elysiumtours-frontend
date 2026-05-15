import React, { useState, useEffect, useRef, useCallback } from "react";
import { classNames } from "../../utils/classNames";
import {
  PeekCard,
  BlurBand,
  ViewerMetadataBlock,
  ViewerActionButtons,
  ViewerThumbnailStrip,
  ViewerPagination,
  ViewerEdgeArrows,
  PlayIcon,
  PauseIcon,
  CloseCircleIcon,
  FullscreenIcon,
  useBodyScrollLock,
  useEscapeKey,
} from "./viewer/ViewerCommon";

// Video Viewer Modal — Figma node 768:10050.
//   Main video container 1567×988, rounded TOP corners only (flat bottom).
//   Top bar (h≈12.146%): title left, close right (NO expand icon).
//   Bottom playback controls overlaid INSIDE video at top=920/988 ≈ 93.117%, left=61/1567 ≈ 3.89%, w=1416/1567 ≈ 90.36%.
//     Controls layout: progress bar; then row of [play + time | speed + fullscreen].
//   SEPARATE metadata band BELOW the video (1567×146, rounded-[20px]) with the same
//   blurred-gradient recipe as the image viewer's bottom bar.

const SPEED_OPTIONS = ["1x", "1.2x", "1.5x", "1.7x", "2x"];

const FALLBACK_THUMBS = Array.from({ length: 14 }, (_, i) =>
  `https://picsum.photos/seed/vt${i + 1}/120/175`
);

function formatTime(sec) {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

const VideoViewerModal = React.forwardRef(({
  isOpen = false,
  onClose,
  video,
  image,
  title = "Evergreen Sanctuary",
  location = "Ghana-Central Region, Cape Coast",
  description = "Description",
  currentIndex = 0,
  totalImages,
  thumbnails = FALLBACK_THUMBS,
  onPrev,
  onNext,
  onShare,
  onLike,
  flagSrc,
  className = "",
  ...props
}, ref) => {
  const [currentThumb, setCurrentThumb] = useState(currentIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressPct, setProgressPct] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSpeedPopup, setShowSpeedPopup] = useState(false);
  const [speed, setSpeed] = useState("1x");
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const total = totalImages ?? thumbnails.length;

  useEffect(() => setCurrentThumb(currentIndex), [currentIndex]);

  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
      setShowSpeedPopup(false);
    }
  }, [isOpen]);

  useBodyScrollLock(isOpen);
  useEscapeKey(isOpen, onClose);

  const rate = parseFloat(speed.replace("x", "")) || 1;
  useEffect(() => {
    const el = videoRef.current;
    if (el) el.playbackRate = rate;
  }, [rate, video]);

  useEffect(() => {
    setProgressPct(0);
    setCurrentTime(0);
    setDuration(0);
  }, [video]);

  const tickProgress = useCallback(() => {
    const el = videoRef.current;
    if (!el || !Number.isFinite(el.duration) || el.duration <= 0) return;
    setCurrentTime(el.currentTime);
    setDuration(el.duration);
    setProgressPct((el.currentTime / el.duration) * 100);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !video) return undefined;
    const onTime = () => tickProgress();
    const onLoaded = () => {
      setDuration(el.duration || 0);
      tickProgress();
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onLoaded);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onLoaded);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
    };
  }, [video, currentThumb, tickProgress]);

  if (!isOpen) return null;

  const goPrev = () => {
    setCurrentThumb((p) => Math.max(0, p - 1));
    onPrev?.();
  };
  const goNext = () => {
    setCurrentThumb((p) => Math.min(total - 1, p + 1));
    onNext?.();
  };

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  };

  const seekPercent = (pct) => {
    const el = videoRef.current;
    if (!el || !Number.isFinite(el.duration)) return;
    el.currentTime = (pct / 100) * el.duration;
    setProgressPct(pct);
  };

  const enterFullscreen = () => {
    const el = videoRef.current;
    if (!el) return;
    const fn =
      el.requestFullscreen ||
      el.webkitRequestFullscreen ||
      el.msRequestFullscreen;
    fn?.call(el);
  };

  const handleSpeedSelect = (s) => {
    setSpeed(s);
    setShowSpeedPopup(false);
  };

  const prevSrc = thumbnails[Math.max(0, currentThumb - 1)];
  const nextSrc = thumbnails[Math.min(total - 1, currentThumb + 1)];

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-start overflow-y-auto overflow-x-hidden font-raleway"
      style={{ backgroundColor: "rgba(45,45,45,0.65)" }}
    >
      <div
        ref={ref}
        className={classNames(
          "relative mx-auto flex w-full max-w-[min(1728px,100vw)] flex-col items-center gap-[24px] px-3 py-6 md:gap-8 md:px-6 lg:py-8",
          className
        )}
        {...props}
      >
        {/* Carousel: peek — main video — peek */}
        <div className="relative flex w-full items-center justify-center gap-3 md:gap-6 lg:gap-8">
          {currentThumb > 0 ? (
            <PeekCard src={prevSrc} side="left" label="Previous video" onClick={goPrev} />
          ) : (
            <div className="hidden w-[clamp(100px,12vw,260px)] shrink-0 md:block" aria-hidden />
          )}

          <div
            ref={containerRef}
            className={classNames(
              "relative z-10 min-h-[220px] min-w-0 flex-1 overflow-hidden rounded-tl-[20px] rounded-tr-[20px]",
              "shadow-[0px_4px_20px_rgba(0,0,0,0.15)]",
              "aspect-[1567/988] w-[min(960px,calc(100vw-32px))] max-h-[min(70vh,calc(100vh-360px))] md:w-[min(72vw,1567px)]"
            )}
          >
            {/* Video / fallback */}
            <div className="absolute inset-0 bg-[#f7f7f7]">
              {video ? (
                <video
                  ref={videoRef}
                  key={video}
                  src={video}
                  poster={image}
                  className="h-full w-full object-cover"
                  playsInline
                  onClick={togglePlay}
                />
              ) : image ? (
                <img src={image} alt={title} className="h-full w-full object-cover" />
              ) : thumbnails[currentThumb] ? (
                <img src={thumbnails[currentThumb]} alt={title} className="h-full w-full object-cover" />
              ) : null}
              <div className="pointer-events-none absolute inset-0 bg-black/10" aria-hidden />
            </div>

            {/* TOP BAR — Figma 768:10054. Title LEFT, close RIGHT (no expand icon). */}
            <BlurBand position="top" className="absolute left-0 right-0 top-0 h-[12.146%] min-h-[64px]">
              <div
                className="absolute flex items-center justify-between"
                style={{
                  top: "calc((46 / 120) * 100%)",
                  left: "calc((73 / 1567) * 100%)",
                  right: "calc((89 / 1567) * 100%)",
                }}
              >
                {/* Title — w=298 text-center on 1567 design; SemiBold 25/normal #fefefe */}
                <p className="w-[clamp(180px,20vw,298px)] text-left font-raleway text-[clamp(16px,2vw,25px)] font-semibold leading-tight text-primary-light-default">
                  {title}
                </p>
                <button type="button" className="cursor-pointer" onClick={onClose} aria-label="Close viewer">
                  <CloseCircleIcon size={40} />
                </button>
              </div>
            </BlurBand>

            {/* BOTTOM CONTROLS — Figma 772:10310 group, top=920/988 ≈ 93.117%, left=61/1567, w=1416/1567 */}
            <div
              className="absolute z-[3] flex flex-col items-stretch gap-[2px]"
              style={{
                top: "calc((920 / 988) * 100%)",
                left: "calc((61 / 1567) * 100%)",
                width: "calc((1416 / 1567) * 100%)",
              }}
            >
              {/* Progress bar — 8px tall, bg #d6beeb (secondary-light-active), fill #7b2cbf (secondary-normal) */}
              <div className="relative h-[6px] w-full md:h-[8px]">
                <div className="absolute inset-0 rounded-[10px] bg-secondary-light-active" />
                <div
                  className="absolute left-0 top-0 h-full rounded-[10px] bg-secondary-normal-default transition-[width] duration-100"
                  style={{ width: `${progressPct}%` }}
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={progressPct}
                  onChange={(e) => seekPercent(Number(e.target.value))}
                  className="absolute inset-0 w-full cursor-pointer opacity-0"
                  aria-label="Seek video"
                />
              </div>

              {/* Controls row */}
              <div className="flex items-center justify-between">
                {/* Left: play + time. Figma: items-center, no gap between play and time text */}
                <div className="flex min-w-0 items-center">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="shrink-0 cursor-pointer"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
                  </button>
                  <p className="w-[94px] truncate text-center font-raleway text-[16px] font-medium leading-[26px] text-primary-light-default">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </p>
                </div>

                {/* Right: speed + fullscreen. Figma: gap=4, w=63 */}
                <div className="relative flex shrink-0 items-center gap-[4px]">
                  {/* Speed popup — design only shows the closed "1x"; popup is our own UX. */}
                  {showSpeedPopup && (
                    <div
                      className="absolute bottom-full right-[28px] mb-2 flex items-center rounded-[5px] p-1 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]"
                      style={{ background: "#ebdff5" }}
                    >
                      {SPEED_OPTIONS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => handleSpeedSelect(s)}
                          className={classNames(
                            "flex h-[24px] w-[36px] cursor-pointer items-center justify-center rounded-[5px]",
                            s === speed ? "bg-secondary-normal-default" : "bg-transparent"
                          )}
                        >
                          <span
                            className={classNames(
                              "font-raleway text-center",
                              s === speed
                                ? "text-[16px] font-semibold leading-[22px] text-primary-light-default"
                                : "text-[13px] font-normal leading-[20px] text-tertiary-normal-default"
                            )}
                          >
                            {s}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Speed button — Figma: w=36 text-center, "1" 16/22 SemiBold + "x" 13/18 SemiBold, color #fefefe */}
                  <button
                    type="button"
                    onClick={() => setShowSpeedPopup((p) => !p)}
                    className="flex w-[36px] cursor-pointer items-center justify-center rounded-[5px]"
                    aria-label="Playback speed"
                  >
                    <span className="text-center font-raleway text-primary-light-default">
                      <span className="text-[16px] font-semibold leading-[22px]">{speed.replace("x", "")}</span>
                      <span className="text-[13px] font-semibold leading-[18px]">x</span>
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={enterFullscreen}
                    className="shrink-0 cursor-pointer"
                    aria-label="Fullscreen"
                  >
                    <FullscreenIcon size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {currentThumb < total - 1 ? (
            <PeekCard src={nextSrc} side="right" label="Next video" onClick={goNext} />
          ) : (
            <div className="hidden w-[clamp(100px,12vw,260px)] shrink-0 md:block" aria-hidden />
          )}

          <ViewerEdgeArrows
            onPrev={goPrev}
            onNext={goNext}
            canPrev={currentThumb > 0}
            canNext={currentThumb < total - 1}
          />
        </div>

        {/* SEPARATE METADATA BAND — Figma 768:10126: 1567×146, rounded-[20px], same blur recipe as image viewer's bottom bar */}
        <BlurBand
          position="bottom"
          rounded="rounded-[20px]"
          className="relative w-[min(1567px,72vw)] max-w-[1567px]"
          style={{ height: "clamp(120px, 9vw, 146px)" }}
        >
          {/* Left text block at left=81/1567, vertically centred */}
          <div
            className="absolute -translate-y-1/2"
            style={{ top: "50%", left: "calc((81 / 1567) * 100%)" }}
          >
            <ViewerMetadataBlock location={location} description={description} flagSrc={flagSrc} />
          </div>
          {/* Right action buttons at top=50/146, right edge inset 90/1567 */}
          <div
            className="absolute"
            style={{
              top: "calc((50 / 146) * 100%)",
              right: "calc((90 / 1567) * 100%)",
            }}
          >
            <ViewerActionButtons onShare={onShare} onLike={onLike} />
          </div>
        </BlurBand>

        {/* Divider */}
        <div className="h-px w-full max-w-[1727px] bg-white/15" />

        {/* Thumbnails */}
        <ViewerThumbnailStrip
          thumbnails={thumbnails}
          currentIndex={currentThumb}
          onSelect={(i) => setCurrentThumb(i)}
        />

        {/* Pagination */}
        <ViewerPagination
          currentIndex={currentThumb}
          total={total}
          onPrev={goPrev}
          onNext={goNext}
          label="videos"
        />
      </div>
    </div>
  );
});

VideoViewerModal.displayName = "VideoViewerModal";
export default VideoViewerModal;
