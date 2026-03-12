import React, { useState, useRef, useEffect } from "react";
import { classNames } from "../../utils/classNames";

// Dot navigation
const SliderDot = ({ isActive, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={isActive ? "Current slide" : "Go to slide"}
    className={classNames(
      "w-4 h-4 rounded-full border border-solid transition-all duration-300 ease-in",
      isActive
        ? "bg-purple-700 border-purple-700" // Tailwind color, replace with your theme
        : "bg-transparent border-gray-400 hover:border-purple-500"
    )}
  />
);

const HeroImageSlider = ({
  slides = [],
  autoPlay = true,
  interval = 5000,
  className = "",
  height = 717,
}) => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  // Start autoplay safely
  const startAutoPlay = () => {
    if (!autoPlay || slides.length < 2) return;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, interval);
  };

  // Initialize autoplay
  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(intervalRef.current);
  }, [slides.length, autoPlay, interval]);

  // Manual slide navigation
  const goTo = (index) => {
    clearInterval(intervalRef.current);
    setCurrent(index);
    startAutoPlay();
  };

  if (!slides.length) return null;

  return (
    <div
      className={classNames(
        "relative w-full overflow-hidden bg-gray-800", // fallback bg
        className
      )}
      style={{ height }}
      role="region"
      aria-roledescription="carousel"
    >
      {slides.map((slide, i) => {
        const isActive = i === current;
        return (
          <div
            key={slide.id || i}
            className={classNames(
              "absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out",
              isActive ? "opacity-100 z-20" : "opacity-0 z-10 pointer-events-none"
            )}
          >
            {/* Slide image */}
            {slide.image && (
              <img
                src={slide.image}
                alt={slide.alt || `Slide ${i + 1}`}
                className="w-full h-full object-cover"
              />
            )}

            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black"
              style={{ opacity: slide.overlayOpacity ?? 0.35, zIndex: 15 }}
            />

            {/* Slide content */}
            {slide.content && (
              <div className="absolute inset-0 flex items-center justify-center z-30">
                {slide.content}
              </div>
            )}
          </div>
        );
      })}

      {/* Dot navigation */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-40">
          {slides.map((_, i) => (
            <SliderDot key={i} isActive={i === current} onClick={() => goTo(i)} />
          ))}
        </div>
      )}
    </div>
  );
};

export { SliderDot };
export default HeroImageSlider;
