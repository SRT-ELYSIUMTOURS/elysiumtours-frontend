import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { classNames } from "../../utils/classNames";
import Button from "../ui/button";

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

// ── Partner category icons (matching Figma vector paths) ─────────────────────
const IconTourSites = ({ color = "#7b2cbf" }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 22V12h6v10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconAccommodation = ({ color = "#7b2cbf" }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="9" y="12" width="6" height="5" rx="1" stroke={color} strokeWidth="1.5"/>
  </svg>
);
const IconTransportation = ({ color = "#7b2cbf" }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="8" width="20" height="10" rx="2" stroke={color} strokeWidth="1.5"/>
    <path d="M6 18v2M18 18v2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2 12h20" stroke={color} strokeWidth="1.5"/>
    <circle cx="7" cy="18" r="1.5" fill={color}/>
    <circle cx="17" cy="18" r="1.5" fill={color}/>
    <path d="M6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" stroke={color} strokeWidth="1.5"/>
  </svg>
);
const IconTourGuides = ({ color = "#7b2cbf" }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="7" r="4" stroke={color} strokeWidth="1.5"/>
    <path d="M4 21v-1a8 8 0 0 1 16 0v1" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M15 11l2 2-2 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconDining = ({ color = "#7b2cbf" }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M3 2v7c0 2.21 1.79 4 4 4s4-1.79 4-4V2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7 2v20M21 2v20M17 2c0 0 4 3 4 9s-4 9-4 9" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconPhotography = ({ color = "#7b2cbf" }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="13" r="4" stroke={color} strokeWidth="1.5"/>
  </svg>
);
const IconInsurance = ({ color = "#7b2cbf" }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── Nav item data ─────────────────────────────────────────────────────────────
const TOUR_ITEMS = [
  { label: "All Tours",  desc: "Browse our full collection of Ghana tours.",       href: "/tours"                  },
  { label: "Day Tours",  desc: "Perfect single-day experiences across Ghana.",     href: "/tours?type=day"         },
  { label: "Multi-Day",  desc: "Immersive multi-day adventures and packages.",     href: "/tours?type=multi-day"   },
  { label: "Festivals",  desc: "Experience Ghana's vibrant cultural festivals.",   href: "/tours?type=festivals"   },
  { label: "Heritage",   desc: "Explore Ghana's rich history and heritage sites.", href: "/tours?type=heritage"    },
];

const TOUR_PARTNER_ITEMS = [
  { label: "Tour Sites & Events",       desc: "Discover iconic landmarks, guided tours, and vibrant local events.",                   href: "/tour-partners/sites-events",  Icon: IconTourSites      },
  { label: "Accommodation",             desc: "Find comfortable and trusted places to stay, offered by our verified partners.",        href: "/tour-partners/accommodation", Icon: IconAccommodation  },
  { label: "Transportation",            desc: "Discover iconic landmarks, guided tours, and vibrant local experiences.",               href: "/tour-partners/transportation", Icon: IconTransportation },
  { label: "Tour Guides",               desc: "Explore with knowledgeable local guides who bring destinations to life.",               href: "/tour-partners/guides",        Icon: IconTourGuides     },
  { label: "Restaurants & Dining",      desc: "Savour local cuisine at our trusted partner restaurants across Ghana.",                 href: "/tour-partners/dining",        Icon: IconDining         },
  { label: "Photo & Videographers",     desc: "Capture your memories with our professional photography partners.",                    href: "/tour-partners/photography",   Icon: IconPhotography    },
  { label: "Insurance & Other Services",desc: "Travel with confidence with our trusted insurance and service partners.",               href: "/tour-partners/insurance",     Icon: IconInsurance      },
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
// From Figma: 748×782, fill:#ffffff stroke:#e9eaeb r:12
// Left col: menu items with icons (HORIZONTAL gap:16, r:8)
// Right col: fill:#fafafa paddingLeft:20 — featured card
const TourPartnersDropdown = ({ items, currentPath, onClose }) => (
  <div className="absolute top-full left-0 mt-2 z-50 rounded-[12px] border border-[#e9eaeb] shadow-lg flex overflow-hidden"
    style={{ width: "680px", backgroundColor: "#ffffff" }}>

    {/* Left column — menu items with icons */}
    <div className="flex-1 p-2 flex flex-col gap-[2px]">
      {items.map(({ label, desc, href, Icon }) => {
        const isItemActive = currentPath === href;
        return (
          <Link key={href} to={href} onClick={onClose}
            className={classNames(
              "flex items-start gap-[16px] px-4 py-3 rounded-[8px] transition-all duration-300 ease-in",
              isItemActive ? "bg-secondary-normal-default" : "hover:bg-secondary-light-default"
            )}>
            {/* Icon — 24×24, stroke:#7b2cbf (or white when active) */}
            <div className="shrink-0 mt-0.5">
              <Icon color={isItemActive ? "#ffffff" : "#7b2cbf"} />
            </div>
            <div className="flex flex-col gap-[4px]">
              <span style={{ fontSize: "16px", fontWeight: 600, color: isItemActive ? "#eaeaea" : "#2d2d2d", lineHeight: "24px" }}>
                {label}
              </span>
              <span style={{ fontSize: "13px", fontWeight: 400, color: isItemActive ? "#f7f7f7" : "#6f6f6f", lineHeight: "18px" }}>
                {desc}
              </span>
            </div>
          </Link>
        );
      })}
    </div>

    {/* Right column — featured card, fill:#fafafa paddingLeft:20 from Figma */}
    <div className="shrink-0 flex flex-col gap-4 p-5" style={{ width: "220px", backgroundColor: "#fafafa" }}>
      <div className="w-full rounded-[10px] overflow-hidden" style={{ height: "150px", backgroundColor: "#f4ebff" }}>
        <img src="https://picsum.photos/seed/partner-card/220/150" alt="Featured" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-[4px]">
        <p style={{ fontSize: "16px", fontWeight: 600, color: "#181d27" }}>Explore Our Partners</p>
        <p style={{ fontSize: "13px", fontWeight: 400, color: "#535862" }}>
          Trusted local partners for every part of your journey.
        </p>
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
