import React, { useState, useEffect } from "react";
import { classNames } from "../../utils/classNames";
import {
  PeekCard,
  BlurBand,
  ViewerMetadataBlock,
  ViewerActionButtons,
  ViewerThumbnailStrip,
  ViewerPagination,
  ViewerEdgeArrows,
  CloseCircleIcon,
  FullscreenIcon,
  useBodyScrollLock,
  useEscapeKey,
} from "./viewer/ViewerCommon";

// Image Viewer Modal — Figma node 748:9123.
//   Main container 1567×988, rounded-[20px] (all 4 corners).
//   Top bar (h≈12.146% of container): expand (left), title (centre), close (right).
//   Bottom bar overlay (h≈14.78% of container): metadata block (left), action buttons (right).
//   Outer viewport-edge chevrons (Frame 3034) for prev/next.
//   Below container: divider, thumbnail strip (1732×175), pagination (1381 wide).

const FALLBACK_THUMBS = Array.from({ length: 14 }, (_, i) =>
  `https://picsum.photos/seed/gt${i + 1}/120/175`
);

const ImageViewerModal = React.forwardRef(({
  isOpen = false,
  onClose,
  image,
  title = "Giraffe Sanctuary",
  location = "Ghana-Central Region, Cape Coast",
  description = "Description",
  currentIndex = 0,
  totalImages,
  thumbnails = FALLBACK_THUMBS,
  onPrev,
  onNext,
  onShare,
  onLike,
  onOpenFullscreen,
  flagSrc,
  className = "",
  ...props
}, ref) => {
  const [currentThumb, setCurrentThumb] = useState(currentIndex);
  const total = totalImages ?? thumbnails.length;

  useEffect(() => {
    setCurrentThumb(currentIndex);
  }, [currentIndex]);

  useBodyScrollLock(isOpen);
  useEscapeKey(isOpen, onClose);

  if (!isOpen) return null;

  const goPrev = () => {
    setCurrentThumb((p) => Math.max(0, p - 1));
    onPrev?.();
  };
  const goNext = () => {
    setCurrentThumb((p) => Math.min(total - 1, p + 1));
    onNext?.();
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
        {/* Carousel: peek — main — peek */}
        <div className="relative flex w-full items-center justify-center gap-3 md:gap-6 lg:gap-8">
          {currentThumb > 0 ? (
            <PeekCard src={prevSrc} side="left" label="Previous image" onClick={goPrev} />
          ) : (
            <div className="hidden w-[clamp(100px,12vw,260px)] shrink-0 md:block" aria-hidden />
          )}

          <div
            className={classNames(
              "relative z-10 min-h-[220px] min-w-0 flex-1 overflow-hidden rounded-[20px]",
              "shadow-[0px_4px_20px_rgba(0,0,0,0.15)]",
              // Figma main image is 1567×988 — preserve aspect, cap so overlays remain on-screen.
              "aspect-[1567/988] w-[min(960px,calc(100vw-32px))] max-h-[min(78vh,calc(100vh-330px))] md:w-[min(72vw,1567px)]"
            )}
          >
            {/* Image / fallback background */}
            <div className="absolute inset-0 bg-[#f7f7f7]">
              {image ? (
                <img src={image} alt={title} className="h-full w-full object-cover" />
              ) : thumbnails[currentThumb] ? (
                <img src={thumbnails[currentThumb]} alt={title} className="h-full w-full object-cover" />
              ) : null}
              {/* Figma flat 0.1 dark overlay */}
              <div className="absolute inset-0 bg-black/10" aria-hidden />
            </div>

            {/* TOP BAR — h=120/988 ≈ 12.146% of container; inner row at top=46/988, left=73/1567 */}
            <BlurBand position="top" className="absolute left-0 right-0 top-0 h-[12.146%] min-h-[64px]">
              <div
                className="absolute flex items-center justify-between"
                style={{
                  top: "calc((46 / 120) * 100%)",
                  left: "calc((73 / 1567) * 100%)",
                  right: "calc((89 / 1567) * 100%)",
                }}
              >
                {/* Expand — opens immersive fullscreen gallery */}
                <button
                  type="button"
                  className={classNames(
                    "flex size-[clamp(24px,2.4vw,40px)] cursor-pointer items-center justify-center transition hover:bg-white/10",
                    !onOpenFullscreen && "pointer-events-none opacity-40"
                  )}
                  onClick={() => onOpenFullscreen?.()}
                  disabled={!onOpenFullscreen}
                  aria-label="Open fullscreen gallery"
                >
                  <FullscreenIcon size={24} />
                </button>

                {/* Title — Figma: w=298 text-center, Raleway SemiBold 25px, color #fefefe */}
                <p className="w-[clamp(180px,20vw,298px)] text-center font-raleway text-[clamp(16px,2vw,25px)] font-semibold leading-tight text-primary-light-default">
                  {title}
                </p>

                {/* Close */}
                <button type="button" className="cursor-pointer" onClick={onClose} aria-label="Close viewer">
                  <CloseCircleIcon size={40} />
                </button>
              </div>
            </BlurBand>

            {/* BOTTOM BAR — h=146/988 ≈ 14.778%; metadata left, share/like right */}
            <BlurBand position="bottom" className="absolute bottom-0 left-0 right-0 h-[14.778%] min-h-[100px]">
              {/* Left metadata block — top=50%, translate -50%, left=81/1567 */}
              <div
                className="absolute -translate-y-1/2"
                style={{ top: "50%", left: "calc((81 / 1567) * 100%)" }}
              >
                <ViewerMetadataBlock location={location} description={description} flagSrc={flagSrc} />
              </div>

              {/* Right action buttons — Figma top=50/146 within band; right edge inset 90/1567 */}
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
          </div>

          {currentThumb < total - 1 ? (
            <PeekCard src={nextSrc} side="right" label="Next image" onClick={goNext} />
          ) : (
            <div className="hidden w-[clamp(100px,12vw,260px)] shrink-0 md:block" aria-hidden />
          )}

          {/* Outer viewport-edge chevrons (Frame 3034). Positioned relative to the carousel row so they stay vertically aligned with the main image. */}
          <ViewerEdgeArrows
            onPrev={goPrev}
            onNext={goNext}
            canPrev={currentThumb > 0}
            canNext={currentThumb < total - 1}
          />
        </div>

        {/* Divider — Figma Line 7 across the full strip (1727 wide on a 1732 strip = ~99.7%) */}
        <div className="h-px w-full max-w-[1727px] bg-white/15" />

        {/* Thumbnail strip */}
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
          label="images"
        />
      </div>
    </div>
  );
});

ImageViewerModal.displayName = "ImageViewerModal";
export default ImageViewerModal;
