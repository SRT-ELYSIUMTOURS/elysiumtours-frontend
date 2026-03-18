import React, { useState, useEffect, useCallback } from "react";
import { classNames } from "../../utils/classNames";

// ImageGalleryModal — full-screen dark overlay modal
// Props: images (array), currentIndex, onClose, title, location

const ImageGalleryModal = React.forwardRef(
  ({ images = [], currentIndex = 0, onClose, title = "", location = "" }, ref) => {
    const [activeIndex, setActiveIndex] = useState(currentIndex);

    useEffect(() => {
      setActiveIndex(currentIndex);
    }, [currentIndex]);

    const goNext = useCallback(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const goPrev = useCallback(() => {
      setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    useEffect(() => {
      const handleKey = (e) => {
        if (e.key === "Escape") onClose?.();
        if (e.key === "ArrowRight") goNext();
        if (e.key === "ArrowLeft") goPrev();
      };
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }, [onClose, goNext, goPrev]);

    if (!images.length) return null;

    const activeImage = images[activeIndex];

    return (
      <div
        ref={ref}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
        onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
      >
        {/* Inner container */}
        <div className="relative bg-black rounded-[12px] overflow-hidden flex flex-col" style={{ width: "863px", height: "800px" }}>
          {/* Header bar */}
          <div className="flex items-center justify-between px-[20px] py-[16px] flex-shrink-0">
            {/* Expand icon (top-left) */}
            <button
              className="w-[36px] h-[36px] flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Expand"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2H6M2 2V6M2 2L6 6M14 2H10M14 2V6M14 2L10 6M2 14H6M2 14V10M2 14L6 10M14 14H10M14 14V10M14 14L10 10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Title */}
            <h2
              className="text-white font-raleway font-semibold text-[18px] leading-[24px] truncate max-w-[500px] text-center"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              {title}
            </h2>

            {/* Close X */}
            <button
              onClick={onClose}
              className="w-[36px] h-[36px] flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close gallery"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 3L13 13M13 3L3 13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Main image area */}
          <div className="relative flex-1 overflow-hidden">
            <img
              src={activeImage?.src || activeImage}
              alt={activeImage?.alt || title}
              className="w-full h-full object-cover"
            />

            {/* Left arrow */}
            <button
              onClick={goPrev}
              className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[48px] h-[48px] flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
              aria-label="Previous image"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12 4L6 10L12 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Right arrow */}
            <button
              onClick={goNext}
              className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[48px] h-[48px] flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
              aria-label="Next image"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M8 4L14 10L8 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Image count badge */}
            <div className="absolute top-[12px] right-[16px] px-[10px] py-[4px] bg-black/60 rounded-[20px]">
              <span className="text-white font-raleway text-[13px] font-medium">
                {activeIndex + 1} of {images.length} images
              </span>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between px-[20px] py-[12px] bg-black/80 flex-shrink-0">
            <div className="flex items-center gap-[8px]">
              <span className="text-[20px]">🇬🇭</span>
              <span className="text-white/80 font-raleway text-[14px]">{location}</span>
              <button className="ml-[8px] px-[12px] py-[4px] border border-white/30 rounded-[20px] text-white/70 font-raleway text-[12px] hover:border-white/50 transition-colors">
                Description
              </button>
            </div>
            <div className="flex items-center gap-[8px]">
              {/* Share icon */}
              <button className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors" aria-label="Share">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="14" cy="3" r="1.5" stroke="white" strokeWidth="1.3"/>
                  <circle cx="14" cy="15" r="1.5" stroke="white" strokeWidth="1.3"/>
                  <circle cx="4" cy="9" r="1.5" stroke="white" strokeWidth="1.3"/>
                  <path d="M5.35 8.25L12.65 3.75M5.35 9.75L12.65 14.25" stroke="white" strokeWidth="1.3"/>
                </svg>
              </button>
              {/* Wishlist heart icon */}
              <button className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors" aria-label="Save to wishlist">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M6.25 3C4.18 3 2.5 4.68 2.5 6.75C2.5 10.5 9 15 9 15C9 15 15.5 10.5 15.5 6.75C15.5 4.68 13.82 3 11.75 3C10.6 3 9.58 3.56 9 4.45C8.42 3.56 7.4 3 6.25 3Z" stroke="white" strokeWidth="1.3"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="flex items-center gap-[8px] px-[20px] py-[12px] overflow-x-auto flex-shrink-0 bg-black">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={classNames(
                  "flex-shrink-0 rounded-[6px] overflow-hidden transition-all duration-200",
                  i === activeIndex ? "ring-2 ring-white opacity-100" : "opacity-50 hover:opacity-75"
                )}
                style={{ width: "64px", height: "48px" }}
              >
                <img
                  src={img?.src || img}
                  alt={img?.alt || `Image ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

ImageGalleryModal.displayName = "ImageGalleryModal";
export default ImageGalleryModal;
