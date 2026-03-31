import React from "react";
import { classNames } from "../../../utils/classNames";
import mapIcon from "../../../assets/ElysiumAssets/map-pin.svg";
import starIcon from "../../../assets/ElysiumAssets/star.svg";
import decoCP1 from "../../../assets/ElysiumAssets/deco-compound-path.svg";
import decoCP2 from "../../../assets/ElysiumAssets/deco-compound-path2.svg";
import decoCP3 from "../../../assets/ElysiumAssets/deco-compound-path3.svg";
import decoCP4 from "../../../assets/ElysiumAssets/deco-compound-path4.svg";
import decoCP5 from "../../../assets/ElysiumAssets/deco-compound-path5.svg";
import decoSub1 from "../../../assets/ElysiumAssets/deco-subtract.svg";
import decoSub2 from "../../../assets/ElysiumAssets/deco-subtract2.svg";
import decoSub3 from "../../../assets/ElysiumAssets/deco-subtract3.svg";
import decoSub4 from "../../../assets/ElysiumAssets/deco-subtract4.svg";
import decoSub5 from "../../../assets/ElysiumAssets/deco-subtract5.svg";
import decoSub6 from "../../../assets/ElysiumAssets/deco-subtract6.svg";

// Figma: 1942:31180 — Local Guides section (Tours country page)
// Frame: 1728×1118px, bg #2b0f43
// Layout: py-[80px] px-[156px], relative overflow-hidden
// Header: "Meet the Experts" label left | "{Country}'s Local Guides" title + subtitle right
// Body: 4-column flex grid, gap-[21px] — each column: GuideCard (335×568) + 22px gap + GuideInfo

// ── Guide data ─────────────────────────────────────────────────────────────────
const GUIDES_BY_COUNTRY = {
  ghana: [
    {
      id: 1,
      name: "Kwame Mensah",
      location: "Greater Accra · Ghana",
      rating: 4.4,
      specialties: "City tours • History • Food experiences",
      languages: "English, Twi",
      image: "https://picsum.photos/seed/guide-gh-1/499/800",
    },
    {
      id: 2,
      name: "Ama Boateng",
      location: "Cape Coast · Ghana",
      rating: 4.4,
      specialties: "Heritage tours • Cultural storytelling",
      languages: "English, Fante",
      image: "https://picsum.photos/seed/guide-gh-2/499/800",
    },
    {
      id: 3,
      name: "Kofi Asante",
      location: "Greater Accra · Ghana",
      rating: 4.7,
      specialties: "City tours • History • Food experiences",
      languages: "English, Twi",
      image: "https://picsum.photos/seed/guide-gh-3/499/800",
    },
    {
      id: 4,
      name: "Abena Osei",
      location: "Greater Accra · Ghana",
      rating: 4.5,
      specialties: "City tours • History • Food experiences",
      languages: "English, Twi, Ga",
      image: "https://picsum.photos/seed/guide-gh-4/499/800",
    },
  ],
  nigeria: [
    {
      id: 1,
      name: "Emeka Okafor",
      location: "Lagos · Nigeria",
      rating: 4.6,
      specialties: "Urban tours • Culture • Music",
      languages: "English, Yoruba",
      image: "https://picsum.photos/seed/guide-ng-1/499/800",
    },
    {
      id: 2,
      name: "Fatima Bello",
      location: "Kano · Nigeria",
      rating: 4.5,
      specialties: "Heritage tours • Northern history",
      languages: "English, Hausa",
      image: "https://picsum.photos/seed/guide-ng-2/499/800",
    },
    {
      id: 3,
      name: "Chidi Eze",
      location: "Enugu · Nigeria",
      rating: 4.8,
      specialties: "Cultural immersion • Nature walks",
      languages: "English, Igbo",
      image: "https://picsum.photos/seed/guide-ng-3/499/800",
    },
    {
      id: 4,
      name: "Amina Yakubu",
      location: "Abuja · Nigeria",
      rating: 4.7,
      specialties: "City tours • Wildlife • Nature",
      languages: "English, Hausa, French",
      image: "https://picsum.photos/seed/guide-ng-4/499/800",
    },
  ],
};

const getGuides = (country) => {
  const key = country?.toLowerCase();
  return GUIDES_BY_COUNTRY[key] || GUIDES_BY_COUNTRY.ghana;
};

// ── GuideCard ─────────────────────────────────────────────────────────────────
// Figma 1942:31337 — 335×568px
// bg: linear-gradient(203deg, #2B0F43 14.88%, #6C26A9 122.89%)
// border: 1px solid #F2EAF9, border-radius: 40px, box-shadow: 0 4px 20px 0 rgba(0,0,0,0.05)
// overflow: clip
// Photo: absolute left=-14.5px top=8.5px w=499 h=800, extends beyond card and gets clipped
// Ellipse glow: absolute radial, left=-63.5px top=267.5px w=455 h=324
// Frosted panel: absolute h=182px centered-x at top=385.5px, w=363px
//   — double-blur: filter:blur(15px) container (top=14px) + backdropFilter:blur(20px) inner
//   — name: Raleway Bold 25px #f7f7f7, left=31px -translateY-1/2 at top=calc(50%+18px)
const GuideCard = ({ guide }) => (
  <div
    className="relative overflow-clip rounded-[40px] border border-[#f2eaf9] shrink-0"
    style={{
      width: "335px",
      height: "568px",
      background: "linear-gradient(203deg, #2B0F43 14.88%, #6C26A9 122.89%)",
      boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.05)",
    }}
  >
    {/* Ellipse glow — Figma: left=-63.5 top=267.5 w=455 h=324 */}
    <div
      className="absolute pointer-events-none"
      style={{
        left: "-63.5px",
        top: "267.5px",
        width: "455px",
        height: "324px",
        background:
          "radial-gradient(ellipse at center, rgba(108,38,169,0.75) 0%, rgba(108,38,169,0.3) 45%, transparent 70%)",
        borderRadius: "50%",
      }}
    />

    {/* Guide portrait — Figma: absolute left=-14.5px top=8.5px w=499px h=800px */}
    {/* Intentionally wider+taller than the card — clipped by overflow-clip on parent */}
    <div
      className="absolute pointer-events-none"
      style={{ left: "-14.5px", top: "8.5px", width: "499px", height: "800px" }}
    >
      <img
        src={guide.image}
        alt={guide.name}
        className="w-full h-full object-cover object-top"
      />
    </div>

    {/* Frosted name panel — Figma: absolute w=363 h=182 left=50% top=385.5px -translateX-1/2 */}
    {/* 363px is wider than the 335px card, bleeds ±14px each side, clipped by overflow-clip */}
    <div
      className="absolute"
      style={{
        width: "363px",
        height: "182px",
        left: "50%",
        top: "385.5px",
        transform: "translateX(-50%)",
      }}
    >
      {/* Double-blur glass: outer filter:blur(15px) container starts 14px from panel top */}
      {/* Inner backdropFilter:blur(20px) fills the container — frosted glass effect */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: 0,
          top: "14px",
          width: "363px",
          height: "200px",
          filter: "blur(15px)",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            background: "rgba(153, 153, 153, 0.16)",
          }}
        />
      </div>

      {/* Guide name — Figma: absolute left=31px, -translateY-1/2 at top=calc(50%+18px) */}
      <div
        className="absolute"
        style={{
          left: "31px",
          top: "calc(50% + 18px)",
          transform: "translateY(-50%)",
          width: "302px",
          height: "86px",
        }}
      >
        <p
          style={{
            fontFamily: "Raleway, sans-serif",
            fontWeight: 700,
            fontSize: "25px",
            lineHeight: "34px",
            color: "#f7f7f7",
            margin: 0,
          }}
        >
          {guide.name}
        </p>
      </div>
    </div>
  </div>
);

// ── GuideInfo ─────────────────────────────────────────────────────────────────
// Figma 1942:31292 — 340×207px, rendered below the card on the dark section bg
// Location row (h=38): map-pin.svg 24×24 + Bold 13px #fefefe location text
// Rating row (h=33): star.svg 16×16 in 26×28 container + Medium 16px #ebdff5 rating
// Specialties label: SemiBold 20px #ebdff5, h=44px
// Specialties value: SemiBold 16px #d6beeb, h=29px
// Language label: SemiBold 20px #ebdff5, w=100px h=44px | value: SemiBold 16px #d6beeb w=89 h=29
const GuideInfo = ({ guide }) => (
  <div style={{ width: "340px" }}>
    {/* Location row — Figma 1942:31294 */}
    <div className="flex items-center" style={{ height: "38px" }}>
      <img src={mapIcon} alt="" aria-hidden="true" style={{ width: "24px", height: "24px", flexShrink: 0 }} />
      <span
        style={{
          fontFamily: "Raleway, sans-serif",
          fontWeight: 700,
          fontSize: "13px",
          lineHeight: "18px",
          color: "#fefefe",
          whiteSpace: "nowrap",
          marginLeft: "2px",
        }}
      >
        {guide.location}
      </span>
    </div>

    {/* Rating row — Figma 1942:31295 */}
    <div className="flex items-center" style={{ height: "33px" }}>
      <div
        className="flex items-center justify-center shrink-0"
        style={{ width: "26px", height: "28.108px" }}
      >
        <img src={starIcon} alt="" aria-hidden="true" style={{ width: "16px", height: "16px" }} />
      </div>
      <span
        style={{
          fontFamily: "Raleway, sans-serif",
          fontWeight: 500,
          fontSize: "16px",
          lineHeight: "26px",
          color: "#ebdff5",
          whiteSpace: "nowrap",
          marginLeft: "2px",
        }}
      >
        {guide.rating}
      </span>
    </div>

    {/* Specialties + Language — Figma 1942:31296, pr-[10px] */}
    <div style={{ paddingRight: "10px", marginTop: "8px" }}>
      {/* "Specialties:" label — SemiBold 20px #ebdff5, h=44px */}
      <div className="flex items-center" style={{ height: "44px" }}>
        <span
          style={{
            fontFamily: "Raleway, sans-serif",
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: "28px",
            color: "#ebdff5",
          }}
        >
          Specialties:
        </span>
      </div>

      {/* Specialties value — SemiBold 16px #d6beeb, h=29px items-end */}
      <div className="flex items-end" style={{ height: "29px", paddingBottom: "8px" }}>
        <span
          style={{
            fontFamily: "Raleway, sans-serif",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "22px",
            color: "#d6beeb",
          }}
        >
          • {guide.specialties}
        </span>
      </div>

      {/* Language row — label w=100 h=44 + gap-[8px] + value h=29 */}
      <div className="flex items-center gap-[8px]">
        <div className="flex items-center shrink-0" style={{ width: "100px", height: "44px" }}>
          <span
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 600,
              fontSize: "20px",
              lineHeight: "28px",
              color: "#ebdff5",
            }}
          >
            Language:
          </span>
        </div>
        <div className="flex items-center" style={{ height: "29px" }}>
          <span
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "22px",
              color: "#d6beeb",
            }}
          >
            {guide.languages}
          </span>
        </div>
      </div>
    </div>
  </div>
);

// ── Decorative background groups ───────────────────────────────────────────────
// Two absolute ornament groups rendered within the section's `relative overflow-hidden` container.
// All positions are absolute pixel values within the 1728×1118 section frame.
//
// Group 3251 — bottom-left corner, transform: rotate(166deg) scaleY(-1), opacity: 0.70
// Group 3263 — top-right corner, transform: rotate(-14deg) scaleY(-1), opacity: 0.22

const DecoGroup3251 = () => (
  // Wrap in a full-bleed absolute overlay so children can be positioned in section-frame coords
  <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.70 }}>
    {/* ── Subtract rings (larger, background) */}
    <img src={decoSub1} alt="" aria-hidden="true" className="absolute"
      style={{ left: "-245px", top: "933px", width: "481.8px", height: "435.9px",
               transform: "rotate(166deg) scaleY(-1)", transformOrigin: "center" }} />
    <img src={decoSub2} alt="" aria-hidden="true" className="absolute"
      style={{ left: "-227px", top: "949px", width: "445.8px", height: "403.3px",
               transform: "rotate(166deg) scaleY(-1)", transformOrigin: "center" }} />
    <img src={decoSub3} alt="" aria-hidden="true" className="absolute"
      style={{ left: "-209px", top: "966px", width: "409.6px", height: "370.7px",
               transform: "rotate(166deg) scaleY(-1)", transformOrigin: "center" }} />
    <img src={decoSub4} alt="" aria-hidden="true" className="absolute"
      style={{ left: "-191px", top: "982px", width: "373.8px", height: "338.2px",
               transform: "rotate(166deg) scaleY(-1)", transformOrigin: "center" }} />
    <img src={decoSub5} alt="" aria-hidden="true" className="absolute"
      style={{ left: "-173px", top: "998px", width: "337.9px", height: "305.7px",
               transform: "rotate(166deg) scaleY(-1)", transformOrigin: "center" }} />
    <img src={decoSub6} alt="" aria-hidden="true" className="absolute"
      style={{ left: "-155px", top: "1015px", width: "301.7px", height: "272.9px",
               transform: "rotate(166deg) scaleY(-1)", transformOrigin: "center" }} />
    {/* ── Compound paths (smaller, foreground) */}
    <img src={decoCP1} alt="" aria-hidden="true" className="absolute"
      style={{ left: "-105px", top: "1062px", width: "155px", height: "148px",
               transform: "rotate(170.05deg) scaleY(-0.99) skewX(9.27deg)", transformOrigin: "center" }} />
    <img src={decoCP2} alt="" aria-hidden="true" className="absolute"
      style={{ left: "-87px", top: "1081px", width: "127px", height: "121px",
               transform: "rotate(170.05deg) scaleY(-0.99) skewX(9.27deg)", transformOrigin: "center" }} />
    <img src={decoCP3} alt="" aria-hidden="true" className="absolute"
      style={{ left: "-68px", top: "1097px", width: "98px", height: "94px",
               transform: "rotate(170.05deg) scaleY(-0.99) skewX(9.27deg)", transformOrigin: "center" }} />
    <img src={decoCP4} alt="" aria-hidden="true" className="absolute"
      style={{ left: "-49px", top: "1113px", width: "69px", height: "66px",
               transform: "rotate(170.05deg) scaleY(-0.99) skewX(9.27deg)", transformOrigin: "center" }} />
    <img src={decoCP5} alt="" aria-hidden="true" className="absolute"
      style={{ left: "-30px", top: "1130px", width: "40px", height: "38px",
               transform: "rotate(170.05deg) scaleY(-0.99) skewX(9.27deg)", transformOrigin: "center" }} />
  </div>
);

const DecoGroup3263 = () => (
  <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.22 }}>
    {/* ── Subtract rings (larger, background) */}
    <img src={decoSub1} alt="" aria-hidden="true" className="absolute"
      style={{ left: "1456px", top: "-123px", width: "466.5px", height: "432.1px",
               transform: "rotate(-14deg) scaleY(-1)", transformOrigin: "center" }} />
    <img src={decoSub2} alt="" aria-hidden="true" className="absolute"
      style={{ left: "1474px", top: "-109px", width: "439.3px", height: "401.6px",
               transform: "rotate(-14deg) scaleY(-1)", transformOrigin: "center" }} />
    <img src={decoSub3} alt="" aria-hidden="true" className="absolute"
      style={{ left: "1492px", top: "-94px", width: "408.6px", height: "370.4px",
               transform: "rotate(-14deg) scaleY(-1)", transformOrigin: "center" }} />
    <img src={decoSub4} alt="" aria-hidden="true" className="absolute"
      style={{ left: "1510px", top: "-78px", width: "373.8px", height: "338.2px",
               transform: "rotate(-14deg) scaleY(-1)", transformOrigin: "center" }} />
    <img src={decoSub5} alt="" aria-hidden="true" className="absolute"
      style={{ left: "1528px", top: "-62px", width: "337.9px", height: "305.7px",
               transform: "rotate(-14deg) scaleY(-1)", transformOrigin: "center" }} />
    <img src={decoSub6} alt="" aria-hidden="true" className="absolute"
      style={{ left: "1546px", top: "-46px", width: "301.7px", height: "272.9px",
               transform: "rotate(-14deg) scaleY(-1)", transformOrigin: "center" }} />
    {/* ── Compound paths (smaller, foreground) */}
    <img src={decoCP1} alt="" aria-hidden="true" className="absolute"
      style={{ left: "1596px", top: "1.6px", width: "155px", height: "148px",
               transform: "rotate(-9.95deg) scaleY(-0.99) skewX(9.27deg)", transformOrigin: "center" }} />
    <img src={decoCP2} alt="" aria-hidden="true" className="absolute"
      style={{ left: "1615px", top: "21px", width: "127px", height: "121px",
               transform: "rotate(-9.95deg) scaleY(-0.99) skewX(9.27deg)", transformOrigin: "center" }} />
    <img src={decoCP3} alt="" aria-hidden="true" className="absolute"
      style={{ left: "1633px", top: "37px", width: "98px", height: "94px",
               transform: "rotate(-9.95deg) scaleY(-0.99) skewX(9.27deg)", transformOrigin: "center" }} />
    <img src={decoCP4} alt="" aria-hidden="true" className="absolute"
      style={{ left: "1651px", top: "53px", width: "69px", height: "66px",
               transform: "rotate(-9.95deg) scaleY(-0.99) skewX(9.27deg)", transformOrigin: "center" }} />
    <img src={decoCP5} alt="" aria-hidden="true" className="absolute"
      style={{ left: "1671px", top: "69px", width: "40px", height: "38px",
               transform: "rotate(-9.95deg) scaleY(-0.99) skewX(9.27deg)", transformOrigin: "center" }} />
  </div>
);

// ── LocalGuidesSection ────────────────────────────────────────────────────────
// Figma 1942:31180 — 1728×1118px
// bg #2b0f43, relative overflow-hidden, py-[80px] px-[156px]
const LocalGuidesSection = React.forwardRef(
  ({ country = "Ghana", className, ...props }, ref) => {
    const guides = getGuides(country);

    return (
      <section
        ref={ref}
        className={classNames("relative w-full overflow-hidden", className)}
        style={{
          backgroundColor: "#2b0f43",
          paddingTop: "80px",
          paddingBottom: "80px",
        }}
        {...props}
      >
        {/* ── Decorative background ornaments ──────────────────────────────── */}
        <DecoGroup3251 />
        <DecoGroup3263 />

        <div style={{ paddingLeft: "156px", paddingRight: "156px", position: "relative", zIndex: 1 }}>

          {/* ── Section header — Figma 1942:31182 ────────────────────────────── */}
          {/* Left: 46px line + "Meet the Experts" | Right: title + subtitle */}
          <div
            className="flex items-start justify-between w-full"
            style={{ marginBottom: "20px" }}
          >
            {/* Left — Figma 1942:31183 */}
            <div className="flex items-center gap-[8px] shrink-0">
              <div style={{ width: "46px", height: "1px", backgroundColor: "#ebdff5" }} />
              <span
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 700,
                  fontSize: "13px",
                  lineHeight: "18px",
                  color: "#ebdff5",
                  whiteSpace: "nowrap",
                }}
              >
                Meet the Experts
              </span>
            </div>

            {/* Right — Figma 1942:31187, w=826px */}
            <div className="flex items-center justify-end" style={{ width: "826px" }}>
              <div
                className="flex flex-col items-end"
                style={{ width: "677px", gap: "8px" }}
              >
                {/* Title — Raleway Bold 25px/34px #eaeaea, text-right, w=581px */}
                <h2
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 700,
                    fontSize: "25px",
                    lineHeight: "34px",
                    color: "#eaeaea",
                    textAlign: "right",
                    width: "581px",
                    margin: 0,
                  }}
                >
                  {country}&apos;s Local Guides
                </h2>
                {/* Subtitle — Raleway Regular 16px/24px #eaeaea, text-right, w=565px */}
                <p
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#eaeaea",
                    textAlign: "right",
                    width: "565px",
                    margin: 0,
                  }}
                >
                  Every Elysium guide is certified, locally born, and deeply connected to
                  the history and culture they share. These aren&apos;t tour scripts,
                  they&apos;re lived stories.
                </p>
              </div>
            </div>
          </div>

          {/* ── Guide columns grid — Figma 1942:31288 ────────────────────────── */}
          {/* 4 columns, gap-[21px], each col: card (335×568) + gap-[22px] + info (340×207) */}
          <div className="flex gap-[21px]">
            {guides.map((guide) => (
              <div
                key={guide.id}
                className="flex flex-col shrink-0"
                style={{ width: "340px", gap: "22px" }}
              >
                <GuideCard guide={guide} />
                <GuideInfo guide={guide} />
              </div>
            ))}
          </div>

        </div>
      </section>
    );
  }
);

LocalGuidesSection.displayName = "LocalGuidesSection";
export default LocalGuidesSection;
