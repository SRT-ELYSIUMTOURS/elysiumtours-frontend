import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { classNames } from "../../../utils/classNames";
import PartnerSectionHeader from "./PartnerSectionHeader";

// EXPLORE ALL PARTNER STORIES — layout from Figma / guide (~1492×705 collage)
// Polaroid frames: absolute positions + rotations; click lifts the card; hover eases tilt toward straight.

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
  <path d="M2.33325 6.25261C1.91904 6.25261 1.58325 6.58839 1.58325 7.00261C1.58325 7.41682 1.91904 7.75261 2.33325 7.75261L2.33325 7.00261L2.33325 6.25261ZM11.6666 7.7526C12.0808 7.7526 12.4166 7.41682 12.4166 7.0026C12.4166 6.58839 12.0808 6.2526 11.6666 6.2526L11.6666 7.0026L11.6666 7.7526ZM9.86121 3.55325C9.56701 3.26166 9.09214 3.26378 8.80056 3.55798C8.50898 3.85218 8.5111 4.32704 8.80529 4.61863L9.33325 4.08594L9.86121 3.55325ZM10.3617 5.1052L9.83369 5.63789V5.63789L10.3617 5.1052ZM10.3617 8.90001L10.8896 9.4327V9.4327L10.3617 8.90001ZM8.80529 9.38658C8.5111 9.67816 8.50898 10.153 8.80056 10.4472C9.09214 10.7414 9.56701 10.7435 9.86121 10.452L9.33325 9.91927L8.80529 9.38658ZM11.655 6.81983L12.399 6.725L12.399 6.725L11.655 6.81983ZM11.655 7.18538L12.399 7.28021L12.399 7.28021L11.655 7.18538ZM2.33325 7.00261L2.33325 7.75261L11.6666 7.7526L11.6666 7.0026L11.6666 6.2526L2.33325 6.25261L2.33325 7.00261ZM9.33325 4.08594L8.80529 4.61863L9.83369 5.63789L10.3617 5.1052L10.8896 4.57251L9.86121 3.55325L9.33325 4.08594ZM10.3617 8.90001L9.83369 8.36732L8.80529 9.38658L9.33325 9.91927L9.86121 10.452L10.8896 9.4327L10.3617 8.90001ZM10.3617 5.1052L9.83369 5.63789C10.2563 6.05673 10.5274 6.32704 10.7074 6.55119C10.8779 6.76351 10.9041 6.86049 10.911 6.91466L11.655 6.81983L12.399 6.725C12.3427 6.2838 12.1323 5.92989 11.877 5.61195C11.6311 5.30583 11.2871 4.96652 10.8896 4.57251L10.3617 5.1052ZM10.3617 8.90001L10.8896 9.4327C11.2871 9.03869 11.6311 8.69938 11.877 8.39326C12.1323 8.07532 12.3427 7.72141 12.399 7.28021L11.655 7.18538L10.911 7.09055C10.9041 7.14472 10.8779 7.2417 10.7074 7.45402C10.5274 7.67817 10.2563 7.94848 9.83369 8.36732L10.3617 8.90001ZM11.655 6.81983L10.911 6.91466C10.9184 6.97306 10.9184 7.03215 10.911 7.09055L11.655 7.18538L12.399 7.28021C12.4225 7.09588 12.4225 6.90933 12.399 6.725L11.655 6.81983Z" fill="#7B2CBF"/>
</svg>
);

const STORIES = [
  {
    id: 1,
    image: "https://picsum.photos/seed/story-f1/492/380",
    title: "West Africa Bringing Epic Events & History to Life",
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/story-f2/380/420",
    title: "From Accra to the North: Overland With Local Operators",
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/story-f3/474/400",
    title: "The Women of Kente: Weaving Culture in Kumasi",
  },
  {
    id: 4,
    image: "https://picsum.photos/seed/story-f4/512/420",
    title: "Volta Lake at Dawn: A Photographer's Perspective",
  },
  {
    id: 5,
    image: "https://picsum.photos/seed/story-f5/388/380",
    title: "A Chef's Guide to Street Food in Accra",
  },
];

// Positions from guide (container ≈ 1491.522 × 705.294)
const CARD_LAYOUT = [
  { leftPct: (774 / 1491.522) * 100, topPct: (0 / 705.294) * 100, wPct: (491.705 / 1491.522) * 100, hPct: (544.267 / 705.294) * 100, z: 15 },
  { leftPct: 0, topPct: (59.006 / 705.294) * 100, wPct: (380.446 / 1491.522) * 100, hPct: (457.109 / 705.294) * 100, z: 14 },
  { leftPct: (1018 / 1491.522) * 100, topPct: (118.006 / 705.294) * 100, wPct: (473.522 / 1491.522) * 100, hPct: (530.975 / 705.294) * 100, z: 16 },
  { leftPct: (224 / 1491.522) * 100, topPct: (147.019 / 705.294) * 100, wPct: (511.785 / 1491.522) * 100, hPct: (558.275 / 705.294) * 100, z: 17 },
  { leftPct: (559 / 1491.522) * 100, topPct: (164.999 / 705.294) * 100, wPct: (388.366 / 1491.522) * 100, hPct: (463.679 / 705.294) * 100, z: 18 },
];

// Tailwind rotate classes (JIT) — pairs with CARD_LAYOUT index order
const ROTATE_REST = [
  "-rotate-[7deg]",
  "rotate-[6deg]",
  "-rotate-[5deg]",
  "rotate-[5deg]",
  "-rotate-[6deg]",
];

// Hover: straighten partway toward 0° (tilt eases but does not flatten completely)
const ROTATE_HOVER_STRAIGHTEN = [
  "group-hover:-rotate-[3deg]",
  "group-hover:rotate-[3deg]",
  "group-hover:-rotate-[2deg]",
  "group-hover:rotate-[2deg]",
  "group-hover:-rotate-[3deg]",
];

// Same expression as the gallery height — parent translate-y-1/2 peeks cards down; click lifts by
// half gallery height + extra lift so the polaroid clears the fold.
const GALLERY_HEIGHT = "clamp(380px, 49vw, 705px)";
const RAISE_EXTRA = "clamp(72px,12vw,140px)";
const RAISE_UNDO_PEEK = `calc((${GALLERY_HEIGHT}) / 2 + ${RAISE_EXTRA})`;

const PartnerStoryPolaroid = ({
  story,
  layout,
  rotateRestClass,
  rotateHoverStraightenClass,
  isRaised,
  onToggleRaise,
}) => {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onToggleRaise();
      }
    },
    [onToggleRaise]
  );

  return (
  <article
    data-partner-story-card=""
    role="button"
    tabIndex={0}
    aria-pressed={isRaised}
    aria-label={`${isRaised ? "Collapse" : "Expand"} story: ${story.title}`}
    onClick={(e) => {
      e.currentTarget.focus({ preventScroll: true });
      onToggleRaise();
    }}
    onKeyDown={handleKeyDown}
    className={classNames(
      "group absolute cursor-pointer outline-none transition-[transform,z-index] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
      "focus-visible:ring-2 focus-visible:ring-secondary-normal-default focus-visible:ring-offset-2 focus-visible:ring-offset-secondary-light-default",
      isRaised && "-translate-y-[var(--story-raise-lift)]"
    )}
    style={{
      "--story-raise-lift": RAISE_UNDO_PEEK,
      left: `${layout.leftPct}%`,
      top: `${layout.topPct}%`,
      width: `${layout.wPct}%`,
      height: `${layout.hPct}%`,
      zIndex: isRaised ? 50 : layout.z,
    }}
  >
    <div
      className={classNames(
        "flex h-full w-full origin-bottom flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        rotateRestClass,
        rotateHoverStraightenClass,
        "group-hover:scale-[1.02]"
      )}
    >
      <div
        className={classNames(
          "flex h-full min-h-0 flex-col bg-primary-light-default p-[10px] pb-[14px]",
          "shadow-[0_12px_40px_rgba(43,15,67,0.18),0_4px_12px_rgba(0,0,0,0.08)]",
          "border border-[rgba(214,190,235,0.35)]"
        )}
      >
        <div className="relative min-h-0 flex-1 noise overflow-hidden rounded-[4px] bg-primary-dark-default">
          <img src={story.image} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="mt-[10px] flex shrink-0 items-center justify-center flex-col gap-[8px] px-[4px]">
          <h3 className="text-md-semibold text-center text-tertiary-normal-default line-clamp-3 md:text-[14px] md:leading-[20px]">
            {story.title}
          </h3>
          <Link
            to="/blog"
            className="inline-flex items-center gap-[6px] text-med-small-semibold text-secondary-normal-default hover:text-secondary-normal-hover transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Read More
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </div>
  </article>
  );
};

const PartnerStoriesSection = React.forwardRef(({ className = "", ...props }, ref) => {
  const [raisedId, setRaisedId] = useState(null);

  useEffect(() => {
    if (raisedId == null) return;
    const handlePointerDown = (e) => {
      if (e.target.closest("[data-partner-story-card]")) return;
      setRaisedId(null);
    };
    document.addEventListener("pointerdown", handlePointerDown, true);
    return () => document.removeEventListener("pointerdown", handlePointerDown, true);
  }, [raisedId]);

  return (
    <section
      ref={ref}
      className={classNames(
        "relative w-full overflow-hidden bg-secondary-light-default",
        "min-h-[698px] pb-[80px] pt-[80px]",
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-[1728px] px-[156px]">
        <PartnerSectionHeader
          className=""
          eyebrow="EXPLORE ALL PARTNER STORIES"
          title="More Stories From Our Tour Partners"
          description="Discover behind-the-scenes moments, expert insights, and the people shaping West Africa's travel experiences — from local guides to trusted tour operators bringing each journey to life."
          
          exploreTo="/blog"
        />

        <div className="relative z-[18] mx-auto mt-0 w-full">
          <div className="overflow-x-auto overflow-y-visible pb-8 [-webkit-overflow-scrolling:touch] md:overflow-visible md:pb-0">
            <div
              className="relative mx-auto min-h-[380px] translate-y-1/2 min-w-[1492px] overflow-visible"
              style={{ height: GALLERY_HEIGHT }}
            >
            {STORIES.map((story, i) => (
              <PartnerStoryPolaroid
                key={story.id}
                story={story}
                layout={CARD_LAYOUT[i]}
                rotateRestClass={ROTATE_REST[i]}
                rotateHoverStraightenClass={ROTATE_HOVER_STRAIGHTEN[i]}
                isRaised={raisedId === story.id}
                onToggleRaise={() =>
                  setRaisedId((prev) => (prev === story.id ? null : story.id))
                }
              />
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

PartnerStoriesSection.displayName = "PartnerStoriesSection";
export default PartnerStoriesSection;
