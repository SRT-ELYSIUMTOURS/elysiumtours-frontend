import React, { useState, useEffect, useCallback, useRef } from "react";
import ShareModal from "./ShareModal";

// Full-screen lightbox: smaller center frame; prev/next peek strips pinned to viewport edges;
// Share then Like; chrome on hover (touch: always visible on small screens).

const ImageGalleryModal = React.forwardRef(
  (
    {
      images = [],
      currentIndex = 0,
      onClose,
      title = "",
      location = "",
      description = "",
      descriptionLabel = "Description",
    },
    ref
  ) => {
    const [activeIndex, setActiveIndex] = useState(currentIndex);
    const [bookmarked, setBookmarked] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);
    const thumbStripRef = useRef(null);
    const activeThumbRef = useRef(null);

    useEffect(() => {
      setActiveIndex(currentIndex);
    }, [currentIndex]);

    const len = images.length;
    const goNext = useCallback(
      () => setActiveIndex((i) => (i + 1) % len),
      [len]
    );
    const goPrev = useCallback(
      () => setActiveIndex((i) => (i - 1 + len) % len),
      [len]
    );

    useEffect(() => {
      const handleKey = (e) => {
        if (e.key === "Escape") onClose?.();
        if (e.key === "ArrowRight") goNext();
        if (e.key === "ArrowLeft") goPrev();
      };
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }, [onClose, goNext, goPrev]);

    useEffect(() => {
      activeThumbRef.current?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }, [activeIndex]);

    useEffect(() => {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }, []);

    if (!len) return null;

    const imgAt = (i) => images[i]?.src || images[i];
    const activeSrc = imgAt(activeIndex);
    const prevSrc = len > 1 ? imgAt((activeIndex - 1 + len) % len) : activeSrc;
    const nextSrc = len > 1 ? imgAt((activeIndex + 1) % len) : activeSrc;

    const chromeVisibility =
      "pointer-events-none opacity-0 transition-opacity duration-200 ease-out max-md:pointer-events-auto max-md:opacity-100 md:group-hover/main:pointer-events-auto md:group-hover/main:opacity-100 md:group-focus-within/main:pointer-events-auto md:group-focus-within/main:opacity-100";

    return (
      <div
        ref={ref}
        className="fixed inset-0 z-[200] flex flex-col overflow-hidden font-raleway"
        style={{
          backgroundColor: "rgba(45, 45, 45, 0.65)",
          mixBlendMode: "normal",
        }}
      >
        {/* Carousel — peeks flush to viewport edges; smaller center floats above */}
        <div className="relative flex min-h-0 w-full flex-1 items-center justify-center px-0 pt-8 pb-2">
          {/* Left peek — flush to screen left, clipped */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-0 top-1/2 z-[5] hidden h-[min(42vw,560px)] max-h-[68vh] w-[clamp(44px,6vw,88px)] -translate-y-1/2 overflow-hidden rounded-r-[20px] shadow-[0px_4px_20px_rgba(0,0,0,0.12)] md:block"
          >
            <div className="absolute inset-0 bg-[#f7f7f7]" />
            <img
              src={prevSrc}
              alt=""
              className="absolute left-0 top-0 h-full min-w-[min(420px,140vw)] max-w-none rounded-r-[20px] object-cover object-right"
            />
            <div className="absolute inset-0 bg-black/70" aria-hidden />
          </button>

          {/* Center — full-screen on mobile, reduced width on desktop */}
          <div
            className="group/main relative z-[10] flex min-h-[200px] min-w-0 flex-col overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.15)] w-[calc(100vw-24px)] max-h-[calc(100vh-32px)] aspect-[3/4] mx-3 rounded-[16px] md:w-[min(67vw,1056px)] md:max-h-[82vh] md:mx-8 md:rounded-[20px] md:aspect-[1567/988]"
          >
            <div className="absolute inset-0 rounded-[20px] bg-[#f7f7f7]" />
            <img
              src={activeSrc}
              alt={title}
              className="absolute inset-0 z-0 h-full w-full rounded-[20px] object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 z-[1] rounded-[20px] bg-black/10"
              aria-hidden
            />

            {/* Top chrome — always visible on mobile, hover/focus on desktop */}
            <div
              className={`absolute left-0 right-0 top-0 z-[2] h-[64px] md:h-[120px] bg-gradient-to-b from-black/55 via-black/35 to-transparent backdrop-blur-md ${chromeVisibility}`}
            >
              <div className="absolute left-[clamp(12px,4vw,73px)] right-[clamp(12px,4vw,73px)] top-3 md:top-[46px] flex items-center justify-between gap-4">
                <button
                  type="button"
                  aria-label="Open in full view"
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10 p-0 text-white outline-none ring-offset-2 ring-offset-transparent hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <h1 className="max-w-[min(298px,45vw)] shrink truncate text-center font-raleway text-High-md-semibold text-white drop-shadow-sm">
                  {title}
                </h1>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close gallery"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/10 p-0 text-white outline-none backdrop-blur-sm hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Bottom chrome — hover / focus only */}
            <div
              className={`absolute bottom-0 left-0 right-0 z-[2] h-[146px] bg-gradient-to-t from-black/55 via-black/35 to-transparent backdrop-blur-md ${chromeVisibility}`}
            >
              <div className="absolute left-[clamp(16px,5vw,81px)] right-[clamp(16px,5vw,81px)] top-1/2 flex -translate-y-1/2 items-center justify-between gap-8">
                <div className="flex min-w-0 max-w-[min(298px,42vw)] shrink flex-col gap-[7px]">
                  <div className="flex items-start gap-[7px]">
                    <span
                      className="relative mt-0.5 flex size-[26px] shrink-0 items-center justify-center rounded-full bg-white/15 text-white"
                      aria-hidden
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                        <circle cx="12" cy="10" r="2" fill="currentColor" />
                      </svg>
                    </span>
                    <p className="truncate font-raleway text-md-Medium text-white drop-shadow-sm">
                      {location}
                    </p>
                  </div>
                  <p className="font-raleway text-md-Medium text-white/90">
                    {descriptionLabel}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-[19px]">
                  <button
                    type="button"
                    aria-label="Share image"
                    onClick={() => setShareOpen(true)}
                    className="flex size-[47px] shrink-0 cursor-pointer items-center justify-center rounded-[23.5px] border border-white/45 bg-white/10 text-white backdrop-blur-sm hover:bg-white/15"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookmarked((b) => !b)}
                    aria-label="Add to favorites"
                    aria-pressed={bookmarked}
                    className="flex size-[47px] shrink-0 cursor-pointer items-center justify-center rounded-[23.5px] border border-white/45 bg-white/10 text-white backdrop-blur-sm hover:bg-white/15"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"
                        stroke="currentColor"
                        fill={bookmarked ? "white" : "none"}
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

          {/* Right peek — flush to screen right */}
          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-0 top-1/2 z-[5] hidden h-[min(42vw,560px)] max-h-[68vh] w-[clamp(44px,6vw,88px)] -translate-y-1/2 overflow-hidden rounded-l-[20px] shadow-[0px_4px_20px_rgba(0,0,0,0.12)] md:block"
          >
            <div className="absolute inset-0 bg-[#f7f7f7]" />
            <img
              src={nextSrc}
              alt=""
              className="absolute right-0 top-0 h-full min-w-[min(420px,140vw)] max-w-none rounded-l-[20px] object-cover object-left"
            />
            <div className="absolute inset-0 bg-black/70" aria-hidden />
          </button>
        </div>

        {/* Edge chevrons — plain white strokes (no filled circle) */}
        <nav
          className="pointer-events-none fixed inset-x-0 top-1/2 z-[210] flex -translate-y-1/2 justify-between px-3 sm:px-4"
          aria-label="Main gallery navigation"
        >
          <button
            type="button"
            onClick={goPrev}
            aria-label="Show previous featured image"
            className="pointer-events-auto flex size-10 cursor-pointer items-center justify-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
          >
           <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
  <path d="M26.6641 17.25C27.3544 17.25 27.9141 16.6903 27.9141 16C27.9141 15.3096 27.3544 14.75 26.6641 14.75L26.6641 16L26.6641 17.25ZM5.33073 14.75C4.64037 14.75 4.08073 15.3096 4.08073 16C4.08073 16.6903 4.64037 17.25 5.33073 17.25V16V14.75ZM9.78413 23.5545C10.2745 24.0404 11.0659 24.0369 11.5519 23.5466C12.0379 23.0562 12.0343 22.2648 11.544 21.7788L10.6641 22.6666L9.78413 23.5545ZM8.31344 20.3369L9.19337 19.4491L8.31344 20.3369ZM8.31343 11.6631L9.19337 12.5509L8.31343 11.6631ZM11.544 10.2211C12.0343 9.73516 12.0379 8.94371 11.5519 8.45338C11.0659 7.96305 10.2745 7.95952 9.78413 8.44549L10.6641 9.33331L11.544 10.2211ZM5.35725 16.4178L4.11728 16.5758V16.5758L5.35725 16.4178ZM5.35725 15.5822L4.11728 15.4242V15.4242L5.35725 15.5822ZM26.6641 16L26.6641 14.75L5.33073 14.75V16V17.25L26.6641 17.25L26.6641 16ZM10.6641 22.6666L11.544 21.7788L9.19337 19.4491L8.31344 20.3369L7.43351 21.2247L9.78413 23.5545L10.6641 22.6666ZM8.31343 11.6631L9.19337 12.5509L11.544 10.2211L10.6641 9.33331L9.78413 8.44549L7.4335 10.7752L8.31343 11.6631ZM8.31344 20.3369L9.19337 19.4491C8.2352 18.4994 7.59294 17.8602 7.16111 17.3225C6.74512 16.8045 6.62827 16.5033 6.59722 16.2597L5.35725 16.4178L4.11728 16.5758C4.23055 17.4645 4.6545 18.1939 5.21188 18.8879C5.75342 19.5622 6.51709 20.3164 7.43351 21.2247L8.31344 20.3369ZM8.31343 11.6631L7.4335 10.7752C6.51709 11.6835 5.75342 12.4377 5.21188 13.1121C4.6545 13.8061 4.23055 14.5355 4.11728 15.4242L5.35725 15.5822L6.59722 15.7403C6.62827 15.4967 6.74512 15.1954 7.16111 14.6775C7.59294 14.1398 8.2352 13.5005 9.19337 12.5509L8.31343 11.6631ZM5.35725 16.4178L6.59722 16.2597C6.57523 16.0872 6.57523 15.9127 6.59722 15.7402L5.35725 15.5822L4.11728 15.4242C4.06854 15.8065 4.06854 16.1934 4.11728 16.5758L5.35725 16.4178Z" fill="#EBDFF5"/>
</svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Show next featured image"
            className="pointer-events-auto flex size-10 cursor-pointer items-center justify-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
          >
           <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
  <path d="M5.33594 14.75C4.64558 14.75 4.08594 15.3097 4.08594 16C4.08594 16.6904 4.64558 17.25 5.33594 17.25L5.33594 16L5.33594 14.75ZM26.6693 17.25C27.3596 17.25 27.9193 16.6904 27.9193 16C27.9193 15.3097 27.3596 14.75 26.6693 14.75V16V17.25ZM22.2159 8.44554C21.7255 7.95956 20.9341 7.96309 20.4481 8.45342C19.9621 8.94375 19.9657 9.7352 20.456 10.2212L21.3359 9.33335L22.2159 8.44554ZM23.6866 11.6631L22.8066 12.5509L23.6866 11.6631ZM23.6866 20.3369L22.8066 19.4491L23.6866 20.3369ZM20.456 21.7789C19.9657 22.2648 19.9621 23.0563 20.4481 23.5466C20.9341 24.0369 21.7255 24.0405 22.2159 23.5545L21.3359 22.6667L20.456 21.7789ZM26.6428 15.5822L27.8827 15.4242V15.4242L26.6428 15.5822ZM26.6428 16.4178L27.8827 16.5758V16.5758L26.6428 16.4178ZM5.33594 16L5.33594 17.25L26.6693 17.25V16V14.75L5.33594 14.75L5.33594 16ZM21.3359 9.33335L20.456 10.2212L22.8066 12.5509L23.6866 11.6631L24.5665 10.7753L22.2159 8.44554L21.3359 9.33335ZM23.6866 20.3369L22.8066 19.4491L20.456 21.7789L21.3359 22.6667L22.2159 23.5545L24.5665 21.2248L23.6866 20.3369ZM23.6866 11.6631L22.8066 12.5509C23.7648 13.5006 24.4071 14.1398 24.8389 14.6775C25.2549 15.1955 25.3717 15.4967 25.4028 15.7403L26.6428 15.5822L27.8827 15.4242C27.7695 14.5355 27.3455 13.8061 26.7881 13.1121C26.2466 12.4378 25.4829 11.6836 24.5665 10.7753L23.6866 11.6631ZM23.6866 20.3369L24.5665 21.2248C25.4829 20.3165 26.2466 19.5623 26.7881 18.8879C27.3455 18.1939 27.7694 17.4645 27.8827 16.5758L26.6428 16.4178L25.4028 16.2597C25.3717 16.5033 25.2549 16.8046 24.8389 17.3225C24.4071 17.8602 23.7648 18.4995 22.8066 19.4491L23.6866 20.3369ZM26.6428 15.5822L25.4028 15.7403C25.4248 15.9128 25.4248 16.0873 25.4028 16.2598L26.6428 16.4178L27.8827 16.5758C27.9315 16.1935 27.9315 15.8066 27.8827 15.4242L26.6428 15.5822Z" fill="#EBDFF5"/>
</svg>
          </button>
        </nav>

        {/* Thumbnails + pills */}
        <div className="flex shrink-0 flex-col items-center gap-6 pt-6">
          <div className="mx-auto h-px w-full max-w-[1723px] bg-white/15" />

          <div
            ref={thumbStripRef}
            className="scrollbar-none flex w-full overflow-x-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex items-stretch">
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
                    className="relative block shrink-0 cursor-pointer overflow-hidden border-0 p-0 transition-[width] duration-200"
                    style={{
                      width: isActive ? "172px" : "120px",
                      height: "175px",
                    }}
                  >
                    <div className="absolute inset-0 bg-[#d9d9d9]" />
                    <img
                      src={src}
                      alt=""
                      className="absolute inset-0 block h-full w-full object-cover"
                    />
                    {!isActive && (
                      <div className="absolute inset-0 bg-black/80 transition-opacity duration-200" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex w-full max-w-[1381px] items-center justify-between px-4 pb-6">
            <div className="inline-flex items-center gap-1">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous image"
                className="inline-flex cursor-pointer items-center gap-0.5 rounded-[30px] bg-[#ebdff5]/50 p-2"
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
              <button
                type="button"
                onClick={goNext}
                aria-label="Next image"
                className="inline-flex cursor-pointer items-center gap-0.5 rounded-[30px] bg-secondary-light-hover p-2"
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
            <p className="m-0 whitespace-nowrap font-raleway text-md-Medium text-secondary-light-hover">
              {activeIndex + 1} of {len} images
            </p>
          </div>
        </div>

        {shareOpen && (
          <ShareModal
            onClose={() => setShareOpen(false)}
            tour={{
              title,
              description: description || descriptionLabel,
              image: activeSrc,
              url: window.location.href,
              location,
            }}
          />
        )}
      </div>
    );
  }
);

ImageGalleryModal.displayName = "ImageGalleryModal";
export default ImageGalleryModal;
