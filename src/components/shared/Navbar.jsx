import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { classNames } from "../../utils/classNames";
import Button from "../ui/button";

import logoImg from "../../assets/images/LOGO.png";

// ── Logo — matches Figma cursive Elysium script ──────────────────────────────
const ElysiumLogo = () => (
  <img 
    src={logoImg} 
    alt="Elysium Tours" 
    className="h-[60px] w-auto object-contain"
  />
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

// ── Action Icons ─────────────────────────────────────────────────────────────
const GlobeIcon = ({ color = "#565656" }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5"/>
    <ellipse cx="12" cy="12" rx="4" ry="9" stroke={color} strokeWidth="1.5"/>
    <path d="M3 12h18" stroke={color} strokeWidth="1.5"/>
  </svg>
);

const LockIcon = ({ color = "#565656" }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="5" y="11" width="14" height="10" rx="2" stroke={color} strokeWidth="1.5"/>
    <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// ── User Dropdown Icons ──────────────────────────────────────────────────────
const MenuProfileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const MenuBookingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);
const MenuWishlistIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const MenuPaymentsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" />
  </svg>
);
const MenuDiscountsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="3" />
  </svg>
);
const MenuHelpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const MenuLogoutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
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
        <div className="w-full h-[3px] rounded-sm mt-[2px] transition-all duration-300 ease-in"
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
      {/* eslint-disable-next-line no-unused-vars */}
      {items.map(({ label, desc, href, Icon }) => {
        const isItemActive = currentPath === href;
        return (
          <Link key={href} to={href} onClick={onClose}
            className={classNames(
              "flex items-start gap-md px-4 py-3 rounded-[8px] transition-all duration-300 ease-in",
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
      <div className="w-full rounded-sm overflow-hidden" style={{ height: "150px", backgroundColor: "#f4ebff" }}>
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
  const { isAuthenticated, user } = useSelector((state) => state.auth || {});
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
      className="w-full bg-primary-light-default flex justify-center sticky top-0 z-40 transition-shadow duration-300 shadow-[4px_4px_30px_rgba(123,44,191,0.1)] hover:shadow-[4px_4px_35px_rgba(123,44,191,0.15)] px-6 xl:px-[157px]"
      style={{ height: "112px", paddingBlock: "18px" }}>

      {/* Inner container — max-w-[1728px], mirrors Frame 4 layout */}
      <div className="h-full mx-auto flex items-center justify-between w-full max-w-[1408px]">

        {/* Logo — 115×76 IMAGE (Figma: Elysium cursive script) */}
        <Link to="/" onClick={() => setOpenDropdown(null)} className="shrink-0 flex items-center" style={{ width: "115px", height: "76px" }}>
          <ElysiumLogo />
        </Link>

          {/* Center: Links — HORIZONTAL gap:32 */}
          <div className="flex items-center" style={{ gap: "32px" }}>

            {/* Home */}
            <NavLink label="Home" isActive={location.pathname === "/"} hasDropdown={false} isOpen={false}
              onClick={() => setOpenDropdown(null)} />

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
            <NavLink label="Gallery" isActive={isActivePath("/gallery")} hasDropdown={false} isOpen={false}
              onClick={() => setOpenDropdown(null)} />

            {/* Blogs */}
            <NavLink label="Blogs" isActive={isActivePath("/blog")} hasDropdown={false} isOpen={false}
              onClick={() => setOpenDropdown(null)} />

            {/* Contact Us */}
            <NavLink label="Contact Us" isActive={isActivePath("/contact")} hasDropdown={false} isOpen={false}
              onClick={() => setOpenDropdown(null)} />
          </div>

          {/* Right: Actions — gap:16, English, Login/Avatar, Sign Up */}
          <div className="flex items-center shrink-0" style={{ gap: "16px" }}>
            
            {/* Language Selector */}
            <button type="button" className="flex items-center gap-[4px] hover:opacity-80 transition-opacity">
              <GlobeIcon />
              <span style={{ fontSize: "16px", fontWeight: 500, color: "#565656", fontFamily: "Raleway, sans-serif" }}>English</span>
              <ChevronDown stroke="#565656" />
            </button>

            {isAuthenticated ? (
              /* Authenticated State: Avatar & Dropdown */
              <div className="relative ml-4">
                <button type="button" onClick={() => toggle("user-menu")} className="flex items-center gap-[8px] hover:opacity-90 transition-opacity">
                  <div className="w-[42px] h-[42px] rounded-full bg-secondary-normal-default shadow-[0px_4px_12px_rgba(123,44,191,0.25)] flex items-center justify-center text-primary-light-default font-bold text-lg">
                    {user?.email?.charAt(0).toUpperCase() || 'A'}
                  </div>
                  <ChevronDown stroke="#565656" />
                </button>
                {openDropdown === "user-menu" && (
                   <div className="absolute top-full right-0 mt-3 w-[280px] bg-white rounded-[16px] shadow-[0px_10px_40px_rgba(0,0,0,0.08)] py-3 z-50 flex flex-col border border-gray-50"
                        style={{ fontFamily: 'Raleway, sans-serif' }}>
                     <Link to="/profile" onClick={() => setOpenDropdown(null)} className="flex items-center gap-4 px-6 py-[14px] hover:bg-gray-50 transition-colors text-[15px] font-medium text-[#4a4a4a]">
                        <MenuProfileIcon /> Profile
                     </Link>
                     <Link to="/bookings" onClick={() => setOpenDropdown(null)} className="flex items-center gap-4 px-6 py-[14px] hover:bg-gray-50 transition-colors text-[15px] font-medium text-[#4a4a4a]">
                        <MenuBookingsIcon /> Past Bookings
                     </Link>
                     <Link to="/wishlist" onClick={() => setOpenDropdown(null)} className="flex items-center gap-4 px-6 py-[14px] hover:bg-gray-50 transition-colors text-[15px] font-medium text-[#4a4a4a]">
                        <MenuWishlistIcon /> Wishlist
                     </Link>
                     <Link to="/payments" onClick={() => setOpenDropdown(null)} className="flex items-center gap-4 px-6 py-[14px] hover:bg-gray-50 transition-colors text-[15px] font-medium text-[#4a4a4a]">
                        <MenuPaymentsIcon /> Payments & Invoices
                     </Link>
                     <Link to="/discounts" onClick={() => setOpenDropdown(null)} className="flex items-center gap-4 px-6 py-[14px] hover:bg-gray-50 transition-colors text-[15px] font-medium text-[#4a4a4a]">
                        <MenuDiscountsIcon /> Discounts & Promotions
                     </Link>
                     
                     <Link to="/help" onClick={() => setOpenDropdown(null)} className="flex items-center gap-4 px-6 py-[14px] mt-2 hover:bg-gray-50 transition-colors text-[15px] font-medium text-[#4a4a4a]">
                        <MenuHelpIcon /> Help Center
                     </Link>
                     <div className="h-px bg-gray-100 my-1 mx-6"></div>
                     <button onClick={() => setOpenDropdown(null)} className="flex items-center gap-4 px-6 py-[14px] hover:bg-gray-50 transition-colors text-left w-full text-[15px] font-medium text-[#4a4a4a]">
                        <MenuLogoutIcon /> Sign Out
                     </button>
                   </div>
                )}
              </div>
            ) : (
              /* Unauthenticated State: Login & Sign Up */
              <>
                <Link to="/login" className="flex items-center gap-[6px] hover:opacity-80 transition-opacity mx-2" onClick={() => setOpenDropdown(null)}>
                  <LockIcon />
                  <span style={{ fontSize: "16px", fontWeight: 600, color: "#565656", fontFamily: "Raleway, sans-serif" }}>Login</span>
                </Link>

                <Link to="/signup" onClick={() => setOpenDropdown(null)}>
                  <button
                    type="button"
                    className="bg-secondary-normal-default hover:bg-secondary-normal-hover active:bg-secondary-normal-active text-primary-light-default transition-all duration-300 shadow-[0px_4px_4px_rgba(0,0,0,0.05)]"
                    style={{ width: "140px", height: "56px", borderRadius: "40px", fontSize: "16px", fontWeight: 600, fontFamily: "Raleway, sans-serif" }}>
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
