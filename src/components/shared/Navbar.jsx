import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { classNames } from "../../utils/classNames";
import Button from "../ui/button";

// ── Figma icon assets (node 1073:10307) — downloaded from Figma MCP ──────────
import iconBackpack    from "../../assets/ElysiumAssets/menu-icons/backpack.svg";
import iconHome2       from "../../assets/ElysiumAssets/menu-icons/home2.svg";
import iconCar         from "../../assets/ElysiumAssets/menu-icons/car.svg";
import iconMentoring   from "../../assets/ElysiumAssets/menu-icons/mentoring.svg";
import iconServingFood from "../../assets/ElysiumAssets/menu-icons/serving-food.svg";
import iconAlbum       from "../../assets/ElysiumAssets/menu-icons/album.svg";
import iconMoneyJar    from "../../assets/ElysiumAssets/menu-icons/money-jar.svg";

// ── Right-panel card assets (node 1073:10379–10381) ──────────────────────────
import menuCardBg    from "../../assets/ElysiumAssets/menu-card-bg.png";
import menuCardPhoto from "../../assets/ElysiumAssets/menu-card-photo.png";

// ── Logo SVG — matches Figma cursive Elysium script ──────────────────────────
const ElysiumLogo = () => (
  <img src="./src/assets/ElysiumAssets/Logo.png" width={80} height={80} alt="" />
);

// ── Chevrons ──────────────────────────────────────────────────────────────────
const ChevronDown = ({ stroke = "#565656" }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M7 10l5 4 5-4" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ChevronUp = ({ stroke = "#622399" }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M7 14l5-4 5 4" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── MenuIcon ──────────────────────────────────────────────────────────────────
// SVG assets use `var(--stroke-0, #7B2CBF)` — the CSS variable falls back to
// the correct purple when rendered as <img> (external context, no CSS cascade).
// Active state: filter brightness(0) invert(1) converts any colour to white.
const MenuIcon = ({ src, isActive }) => (
  <img
    src={src}
    alt=""
    width={24}
    height={24}
    className="shrink-0"
    style={isActive ? { filter: "brightness(0) invert(1)" } : {}}
  />
);

// ── Nav item data ─────────────────────────────────────────────────────────────
const TOUR_ITEMS = [
  { label: "All Tours",  desc: "Browse our full collection of Ghana tours.",       href: "/tours"                  },
  { label: "Day Tours",  desc: "Perfect single-day experiences across Ghana.",     href: "/tours?type=day"         },
  { label: "Multi-Day",  desc: "Immersive multi-day adventures and packages.",     href: "/tours?type=multi-day"   },
  { label: "Festivals",  desc: "Experience Ghana's vibrant cultural festivals.",   href: "/tours?type=festivals"   },
  { label: "Heritage",   desc: "Explore Ghana's rich history and heritage sites.", href: "/tours?type=heritage"    },
];

// ── Tour Partners dropdown items — Figma node 1073:10307 ─────────────────────
// icon: downloaded SVG asset path (rendered via CSS mask for full colour control)
const TOUR_PARTNER_ITEMS = [
  {
    label: "Tour Sites & Events",
    desc:  "Discover iconic landmarks, guided tours, and vibrant local events.",
    href:  "/tour-partners/tour-sites",
    icon:  iconBackpack,
  },
  {
    label: "Accommodation",
    desc:  "Find comfortable and trusted places to stay, offered by our verified partners.",
    href:  "/tour-partners/accommodation",
    icon:  iconHome2,
  },
  {
    label: "Transportation",
    desc:  "Discover iconic landmarks, guided tours, and vibrant local events offered.",
    href:  "/tour-partners/transportation",
    icon:  iconCar,
  },
  {
    label: "Tour Guides",
    desc:  "Explore with knowledgeable local guides who bring destinations to life through stories, history, and firsthand experience.",
    href:  "/tour-partners/guides",
    icon:  iconMentoring,
  },
  {
    label: "Restaurants & Dining",
    desc:  "Get up and running on new features and techniques.",
    href:  "/tour-partners/restaurants",
    icon:  iconServingFood,
  },
  {
    label: "Photos & Videographers",
    desc:  "Get up and running on new features and techniques.",
    href:  "/tour-partners/photographers",
    icon:  iconAlbum,
  },
  {
    label: "Insurance & Other Services",
    desc:  "Get up and running on new features and techniques.",
    href:  "/tour-partners/insurance",
    icon:  iconMoneyJar,
  },
];

// ── NavLink ───────────────────────────────────────────────────────────────────
// From Figma "Navbar Components" (44:46):
//   Active:   text [16px/600] #7b2cbf + underline rect fill:#7b2cbf r:10
//   Inactive: text [16px/500] #565656 + ChevronDown
//   Open:     text [16px/600] #622399 + ChevronUp + underline fill:#622399
const NavLink = ({ label, isActive, hasDropdown, isOpen, onClick }) => {
  const textColor  = isOpen ? "#622399" : isActive ? "#7b2cbf" : "#565656";
  const lineColor  = isOpen ? "#622399" : "#7b2cbf";
  const fontWeight = (isActive || isOpen) ? 600 : 500;

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex flex-col items-start px-[10px] py-[10px] transition-all duration-300 ease-in"
    >
      <div className="flex items-center gap-0">
        <span style={{ fontSize: "16px", fontWeight, color: textColor, fontFamily: "Raleway, sans-serif", lineHeight: "22px", whiteSpace: "nowrap" }}>
          {label}
        </span>
        {hasDropdown && (isOpen
          ? <ChevronUp stroke={textColor} />
          : <ChevronDown stroke={textColor} />
        )}
      </div>
      {/* Underline — Rectangle r:10, only on active or open */}
      {(isActive || isOpen) && (
        <div className="w-full h-[3px] rounded-[10px] mt-[2px] transition-all duration-300 ease-in"
          style={{ backgroundColor: lineColor }} />
      )}
    </button>
  );
};

// ── Tour dropdown ─────────────────────────────────────────────────────────────
const TourDropdown = ({ items, currentPath, onClose }) => (
  <div className="absolute top-full left-0 mt-2 z-50 bg-primary-light-default rounded-[12px] border border-primary-dark-default shadow-lg p-2 min-w-[280px]">
    {items.map((item) => {
      const isItemActive = currentPath === item.href;
      return (
        <Link key={item.href} to={item.href} onClick={onClose}
          className={classNames(
            "flex flex-col gap-[4px] px-4 py-3 rounded-[8px] transition-all duration-300 ease-in",
            isItemActive ? "bg-secondary-normal-default" : "hover:bg-secondary-light-default"
          )}>
          <span style={{ fontSize: "16px", fontWeight: 600, color: isItemActive ? "#eaeaea" : "#2d2d2d", lineHeight: "24px" }}>
            {item.label}
          </span>
          <span style={{ fontSize: "13px", fontWeight: 400, color: isItemActive ? "#f7f7f7" : "#6f6f6f", lineHeight: "18px" }}>
            {item.desc}
          </span>
        </Link>
      );
    })}
  </div>
);

// ── Tour Partners dropdown ────────────────────────────────────────────────────
// Figma node 1073:10307 — scaled down from 748px to fit viewport height.
// Proportions and token colours preserved; sizes reduced uniformly.
const TourPartnersDropdown = ({ items, currentPath, onClose }) => (
  <div
    className="absolute top-full left-0 mt-2 z-50 flex overflow-hidden rounded-[12px] border border-[#e9eaeb]"
    style={{
      width: "620px",
      backgroundColor: "#ffffff",
      boxShadow: "0px 12px 16px -4px rgba(10,13,18,0.08), 0px 4px 6px -2px rgba(10,13,18,0.03)",
    }}
  >
    {/* ── LEFT column ── */}
    <div className="flex-1 flex flex-col gap-[4px] px-[14px] py-[14px] overflow-hidden">
      {items.map(({ label, desc, href, icon }) => {
        const isItemActive = currentPath === href || currentPath.startsWith(href);
        return (
          <Link
            key={href}
            to={href}
            onClick={onClose}
            className={classNames(
              "flex items-start gap-[12px] p-[8px] rounded-[8px] transition-all duration-300 ease-in",
              isItemActive ? "bg-[#7b2cbf]" : "hover:bg-secondary-light-default"
            )}
          >
            {/* Icon — 20×20 (reduced from 24), purple inactive / white active */}
            <img
              src={icon}
              alt=""
              width={20}
              height={20}
              className="shrink-0 mt-[2px]"
              style={isItemActive ? { filter: "brightness(0) invert(1)" } : {}}
            />

            <div className="flex flex-col gap-[2px] flex-1 min-w-0">
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize:   "14px",
                  fontWeight: 600,
                  lineHeight: "20px",
                  color:      isItemActive ? "#eaeaea" : "#2d2d2d",
                }}
              >
                {label}
              </span>
              <span
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontSize:   "12px",
                  fontWeight: isItemActive ? 500 : 400,
                  lineHeight: "18px",
                  color:      isItemActive ? "#f7f7f7" : "#6f6f6f",
                }}
              >
                {desc}
              </span>
            </div>
          </Link>
        );
      })}
    </div>

    {/* ── RIGHT column — featured photo card ── */}
    <div
      className="shrink-0 flex flex-col items-start justify-center overflow-hidden self-stretch"
      style={{
        width:           "220px",
        backgroundColor: "#f7f7f7",
        paddingLeft:     "16px",
        paddingRight:    "16px",
        paddingTop:      "16px",
        paddingBottom:   "16px",
      }}
    >
      {/* Card: bg texture + purple overlay + main photo */}
      <div
        className="relative w-full overflow-hidden"
        style={{ borderRadius: "16px", padding: "8px" }}
      >
        <img
          alt=""
          src={menuCardBg}
          className="absolute inset-0 w-full h-full object-cover rounded-[16px]"
          style={{ opacity: 0.5 }}
        />
        <div
          className="absolute inset-0 rounded-[16px]"
          style={{ backgroundColor: "rgba(123,44,191,0.5)" }}
        />
        {/* Reduced from 278px → 160px */}
        <div
          className="relative w-full overflow-hidden"
          style={{ height: "160px", borderRadius: "8px" }}
        >
          <img
            src={menuCardPhoto}
            alt="Explore Ghana"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
);

// ── Main Navbar ───────────────────────────────────────────────────────────────
// Frame 1: 1728×112, fill:#fefefe
// Frame 4 inner: 1408×76, HORIZONTAL gap:284
//   Logo IMAGE: 115×76
//   Frame 3 (links): 552×54, HORIZONTAL gap:32
//   Button: 169×56, fill:#7b2cbf, r:40
const Navbar = () => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (name) => setOpenDropdown(prev => prev === name ? null : name);
  const isActivePath = (path) => location.pathname === path || (path !== "/" && location.pathname.startsWith(path));

  return (
    <nav ref={navRef} role="navigation" aria-label="Main navigation"
      className="w-full bg-primary-light-default shadow-sm sticky top-0 z-50"
      style={{ height: "112px" }}>

      {/* Inner container — max-w-[1728px], mirrors Frame 4 layout */}
      <div className="h-full mx-auto flex items-center justify-between px-[164px]">

        {/* Logo — 115×76 IMAGE (Figma: Elysium cursive script) */}
        <Link to="/" onClick={() => setOpenDropdown(null)} className="shrink-0 flex items-center" style={{ height: "76px" }}>
          <ElysiumLogo />
        </Link>

        {/* Nav links + CTA — right side with gap:284 from logo */}
        <div className="flex items-center" style={{ gap: "284px", marginLeft: "0" }}>

          {/* Links — HORIZONTAL gap:32 */}
          <div className="flex items-center" style={{ gap: "32px" }}>

            {/* Home */}
            <Link to="/" onClick={() => setOpenDropdown(null)}>
              <NavLink label="Home" isActive={location.pathname === "/"} hasDropdown={false} isOpen={false} />
            </Link>

            {/* Tour */}
            <div className="relative">
              <NavLink label="Tour" isActive={isActivePath("/tours") && openDropdown !== "tour"}
                hasDropdown isOpen={openDropdown === "tour"}
                onClick={() => toggle("tour")} />
              {openDropdown === "tour" && (
                <TourDropdown items={TOUR_ITEMS} currentPath={location.pathname}
                  onClose={() => setOpenDropdown(null)} />
              )}
            </div>

            {/* Tour Partners */}
            <div className="relative">
              <NavLink label="Tour Partners" isActive={isActivePath("/tour-partners") && openDropdown !== "tour-partners"}
                hasDropdown isOpen={openDropdown === "tour-partners"}
                onClick={() => toggle("tour-partners")} />
              {openDropdown === "tour-partners" && (
                <TourPartnersDropdown items={TOUR_PARTNER_ITEMS} currentPath={location.pathname}
                  onClose={() => setOpenDropdown(null)} />
              )}
            </div>

            {/* Gallery */}
            <Link to="/gallery" onClick={() => setOpenDropdown(null)}>
              <NavLink label="Gallery" isActive={isActivePath("/gallery")} hasDropdown={false} isOpen={false} />
            </Link>

            {/* Blogs */}
            <Link to="/blog" onClick={() => setOpenDropdown(null)}>
              <NavLink label="Blogs" isActive={isActivePath("/blog")} hasDropdown={false} isOpen={false} />
            </Link>
          </div>

          {/* Contact Us — 169×56, fill:#7b2cbf, r:40, [16px/600] #fefefe */}
          <Link to="/contact" onClick={() => setOpenDropdown(null)}>
            <button
              type="button"
              className="bg-secondary-normal-default hover:bg-secondary-normal-hover active:bg-secondary-normal-active text-primary-light-default transition-all duration-300 ease-in"
              style={{ width: "169px", height: "56px", borderRadius: "40px", fontSize: "16px", fontWeight: 600, fontFamily: "Raleway, sans-serif" }}>
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
