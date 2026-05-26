import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { classNames } from "../../utils/classNames";
import Button from "../ui/button";
import { useAuth } from "../../context/AuthContext";
import AuthModal from "../ui/AuthModal";
import Toast from "../ui/toast";

// ── Figma icon assets (node 1073:10307) — downloaded from Figma MCP ──────────
import iconBackpack from "../../assets/ElysiumAssets/menu-icons/backpack.svg";
import iconHome2 from "../../assets/ElysiumAssets/menu-icons/home2.svg";
import iconCar from "../../assets/ElysiumAssets/menu-icons/car.svg";
import iconMentoring from "../../assets/ElysiumAssets/menu-icons/mentoring.svg";
import iconServingFood from "../../assets/ElysiumAssets/menu-icons/serving-food.svg";
import iconAlbum from "../../assets/ElysiumAssets/menu-icons/album.svg";
import iconMoneyJar from "../../assets/ElysiumAssets/menu-icons/money-jar.svg";

// ── Right-panel card assets (node 1073:10379–10381) ──────────────────────────
import menuCardBg from "../../assets/ElysiumAssets/menu-card-bg.png";
import menuCardPhoto from "../../assets/ElysiumAssets/menu-card-photo.png";

// ── Logo SVG — matches Figma cursive Elysium script ──────────────────────────
const ElysiumLogo = () => (
  <img
    src="/ElysiumAssets/Logo.png"
    width={80}
    height={80}
    alt=""
  />
);

// ── Chevrons ──────────────────────────────────────────────────────────────────
const ChevronDown = ({ stroke = "#565656" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M17 10L15.2527 11.763C13.8592 13.1689 13.1625 13.8719 12.3133 13.9801C12.1053 14.0066 11.8947 14.0066 11.6867 13.9801C10.8375 13.8719 10.1408 13.1689 8.74731 11.763L7 10"
      stroke={stroke}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ChevronUp = ({ stroke = "#622399" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M7 14L8.74731 12.237C10.1408 10.8311 10.8375 10.1281 11.6867 10.0199C11.8947 9.99337 12.1053 9.99337 12.3133 10.0199C13.1625 10.1281 13.8592 10.8311 15.2527 12.237L17 14"
      stroke={stroke}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
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
  {
    label: "All Tours",
    desc: "Browse our full collection of Ghana tours.",
    href: "/tours",
  },
  {
    label: "Day Tours",
    desc: "Perfect single-day experiences across Ghana.",
    href: "/tours?type=day",
  },
  {
    label: "Multi-Day",
    desc: "Immersive multi-day adventures and packages.",
    href: "/tours?type=multi-day",
  },
  {
    label: "Festivals",
    desc: "Experience Ghana's vibrant cultural festivals.",
    href: "/tours?type=festivals",
  },
  {
    label: "Heritage",
    desc: "Explore Ghana's rich history and heritage sites.",
    href: "/tours?type=heritage",
  },
];

// ── Tour Partners dropdown items — Figma node 1073:10307 ─────────────────────
// icon: downloaded SVG asset path (rendered via CSS mask for full colour control)
const TOUR_PARTNER_ITEMS = [
  {
    label: "Tour Sites & Events",
    desc: "Discover iconic landmarks, guided tours, and vibrant local events.",
    href: "/tour-partners/tour-sites/all",
    icon: iconBackpack,
  },
  {
    label: "Accommodation",
    desc: "Find comfortable and trusted places to stay, offered by our verified partners.",
    href: "/tour-partners/accommodation/all",
    icon: iconHome2,
  },
  {
    label: "Transportation",
    desc: "Discover iconic landmarks, guided tours, and vibrant local events offered.",
    href: "/tour-partners/transportation/all",
    icon: iconCar,
  },
  {
    label: "Tour Guides",
    desc: "Explore with knowledgeable local guides who bring destinations to life through stories, history, and firsthand experience.",
    href: "/tour-partners/guides/all",
    icon: iconMentoring,
  },
  {
    label: "Resturants & Dinning",
    desc: "Get up and running on new features and techniques.",
    href: "/tour-partners/restaurants/all",
    icon: iconServingFood,
  },
  {
    label: "Photo & Videographers",
    desc: "Get up and running on new features and techniques.",
    href: "/tour-partners/photographers/all",
    icon: iconAlbum,
  },
  {
    label: "Insurance & Other Services",
    desc: "Get up and running on new features and techniques.",
    href: "/tour-partners/insurance/all",
    icon: iconMoneyJar,
  },
];

// ── NavLink ───────────────────────────────────────────────────────────────────
// From Figma "Navbar Components" (44:46):
//   Active:   text [16px/600] #7b2cbf + underline rect fill:#7b2cbf r:10
//   Inactive: text [16px/500] #565656 + ChevronDown
//   Open:     text [16px/600] #622399 + ChevronUp + underline fill:#622399
//
// When `href` + `hasDropdown`: label is a router Link to the hub page; only the
// chevron toggles the dropdown (`onClick`). Optional `onNavigate` runs when the label is clicked (e.g. close menus).
const NavLink = ({
  label,
  isActive,
  hasDropdown,
  isOpen,
  onClick,
  href,
  onNavigate,
}) => {
  const textColor = isOpen ? "#622399" : isActive ? "#7b2cbf" : "#565656";
  const lineColor = isOpen ? "#622399" : "#7b2cbf";
  const fontWeight = isActive || isOpen ? 600 : 500;

  const labelSpan = (
    <span
      style={{
        fontWeight,
        color: textColor,
        whiteSpace: "nowrap",
      }}
      className={classNames(`${!isActive ? `text-md-Medium` : `text-md-semibold`}`)}
    >
      {label}
    </span>
  );

  const underline =
    (isActive || isOpen) && (
      <div
        className="w-full max-w-[59px] mx-auto h-[3px] rounded-[10px] mt-[8px] transition-all duration-300 ease-in"
        style={{ backgroundColor: lineColor }}
      />
    );

  // Hub link + chevron only opens dropdown
  if (hasDropdown && href) {
    return (
      <div className="relative flex flex-col items-start px-[10px] py-[10px] transition-all duration-300 ease-in">
        <div className="flex items-center gap-0">
          <Link
            to={href}
            onClick={() => onNavigate?.()}
            className="inline-flex items-center no-underline visited:text-inherit"
          >
            {labelSpan}
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center shrink-0 bg-transparent border-0 p-0 cursor-pointer"
            aria-expanded={isOpen}
            aria-haspopup="true"
            aria-label={`${label} submenu`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClick?.();
            }}
          >
            {isOpen ? (
              <ChevronUp stroke={textColor} />
            ) : (
              <ChevronDown stroke={textColor} />
            )}
          </button>
        </div>
        {underline}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex flex-col items-start px-[10px] py-[10px] transition-all duration-300 ease-in"
    >
      <div className="flex items-center gap-0">
        {labelSpan}
        {hasDropdown &&
          (isOpen ? (
            <ChevronUp stroke={textColor} />
          ) : (
            <ChevronDown stroke={textColor} />
          ))}
      </div>
      {underline}
    </button>
  );
};

// ── Tour dropdown ─────────────────────────────────────────────────────────────
const TourDropdown = ({ items, currentPath, onClose }) => (
  <div className="absolute top-full left-0 mt-2 z-50 bg-primary-light-default rounded-[12px] border border-primary-dark-default shadow-lg p-2 min-w-[280px]">
    {items.map((item) => {
      const isItemActive = currentPath === item.href;
      return (
        <Link
          key={item.href}
          to={item.href}
          onClick={onClose}
          className={classNames(
            "flex flex-col gap-[4px] px-4 py-3 rounded-[8px] transition-all duration-300 ease-in",
            isItemActive
              ? "bg-secondary-normal-default"
              : "hover:bg-secondary-light-default"
          )}
        >
          <span
            style={{
              fontSize: "16px",
              fontWeight: 600,
              color: isItemActive ? "#eaeaea" : "#2d2d2d",
              lineHeight: "24px",
            }}
          >
            {item.label}
          </span>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 400,
              color: isItemActive ? "#f7f7f7" : "#6f6f6f",
              lineHeight: "18px",
            }}
          >
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
      boxShadow:
        "0px 12px 16px -4px rgba(10,13,18,0.08), 0px 4px 6px -2px rgba(10,13,18,0.03)",
    }}
  >
    {/* ── LEFT column ── */}
    <div className="flex-1 flex flex-col gap-[4px] px-[14px] py-[14px] overflow-hidden">
      {items.map(({ label, desc, href, icon }) => {
        const isItemActive =
          currentPath === href || currentPath.startsWith(href);
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
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "20px",
                  color: isItemActive ? "#eaeaea" : "#2d2d2d",
                }}
              >
                {label}
              </span>
              <span
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontSize: "12px",
                  fontWeight: isItemActive ? 500 : 400,
                  lineHeight: "18px",
                  color: isItemActive ? "#f7f7f7" : "#6f6f6f",
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
        width: "220px",
        backgroundColor: "#f7f7f7",
        paddingLeft: "16px",
        paddingRight: "16px",
        paddingTop: "16px",
        paddingBottom: "16px",
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

// ── UserDropdown ──────────────────────────────────────────────────────────────
const USER_MENU_ITEMS = [
  { label: "My Profile", icon: "👤", href: "/profile" },
  { label: "My Bookings", icon: "🗓️", href: "/bookings" },
  { label: "Wishlist", icon: "❤️", href: "/wishlist" },
  { label: "Settings", icon: "⚙️", href: "/settings" },
];

const UserDropdown = ({ user, onSignOut, onClose }) => {
  const initials = user.name
    .split(" ")
    .map(w => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className="absolute top-full right-0 mt-2 z-50 bg-white rounded-[20px] overflow-hidden"
      style={{ width: "305px", boxShadow: "0px 8px 24px rgba(0,0,0,0.12)", border: "1px solid #f0e8f8" }}
    >
      {/* User header */}
      <div className="flex items-center gap-[12px] px-[20px] py-[16px] border-b border-[#f0e8f8]">
        <div
          className="shrink-0 flex items-center justify-center rounded-full font-raleway font-bold text-[16px] text-white"
          style={{ width: "42px", height: "42px", backgroundColor: "#7b2cbf" }}
        >
          {initials}
        </div>
        <div className="flex flex-col min-w-0">
          <p className="font-raleway font-semibold text-[15px] text-[#2b0f43] truncate">{user.name}</p>
          <p className="font-raleway text-[13px] text-[#9b8aab] truncate">{user.email}</p>
        </div>
      </div>

      {/* Menu items */}
      <div className="py-[8px]">
        {USER_MENU_ITEMS.map(item => (
          <Link
            key={item.href}
            to={item.href}
            onClick={onClose}
            className="flex items-center gap-[12px] px-[20px] py-[11px] transition-colors hover:bg-[#f6f2f9]"
          >
            <span className="text-[16px]">{item.icon}</span>
            <span className="font-raleway font-medium text-[15px] text-[#2b0f43]">{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Divider + Sign Out */}
      <div className="border-t border-[#f0e8f8] py-[8px]">
        <button
          type="button"
          onClick={() => { onSignOut(); onClose(); }}
          className="w-full flex items-center gap-[12px] px-[20px] py-[11px] transition-colors hover:bg-[#fff5f7] cursor-pointer"
        >
          <span className="text-[16px]">🚪</span>
          <span className="font-raleway font-semibold text-[15px] text-[#cd003d]">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

// ── Main Navbar ───────────────────────────────────────────────────────────────
// Frame 1: 1728×112, fill:#fefefe
// Frame 4 inner: 1408×76, HORIZONTAL gap:284
//   Logo IMAGE: 115×76
//   Frame 3 (links): 552×54, HORIZONTAL gap:32
//   Button: 169×56, fill:#7b2cbf, r:40
const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [authModal, setAuthModal] = useState({ open: false, view: "login" });
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target))
        setOpenDropdown(null);
      if (userMenuRef.current && !userMenuRef.current.contains(e.target))
        setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const openAuth = (view) => setAuthModal({ open: true, view });
  const closeAuth = () => setAuthModal(m => ({ ...m, open: false }));

  const handleAuthSuccess = () => {
    setToast({ variant: "success", Heading: "Welcome back!", text: "You've successfully signed in." });
  };

  const handleLogout = () => {
    logout();
    setToast({ variant: "success", Heading: "Signed out", text: "You've been signed out successfully." });
  };

  const userInitials = user
    ? user.name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()
    : "";

  const toggle = (name) =>
    setOpenDropdown((prev) => (prev === name ? null : name));
  const isActivePath = (path) =>
    location.pathname === path ||
    (path !== "/" && location.pathname.startsWith(path));

  // Dismiss toast
  const dismissToast = () => setToast(null);

  return (
    <>
    <nav
      ref={navRef}
      role="navigation"
      aria-label="Main navigation"
      className="w-full bg-primary-light-default shadow-sm sticky top-0 z-50"
    >
      {/* ── Desktop / Mobile top bar ─────────────────────────────────────── */}
      <div className="h-[70px] lg:h-[112px] mx-auto flex items-center justify-between px-6 md:px-[30px] lg:px-[60px] xl:px-[100px]">
        {/* Left side: Logo + Nav links grouped together */}
        <div className="flex items-center gap-6 xl:gap-10">
          <Link
            to="/"
            onClick={() => { setOpenDropdown(null); setMobileOpen(false); }}
            className="shrink-0 flex items-center"
          >
            <ElysiumLogo />
          </Link>

          {/* Desktop: Nav links */}
          <div className="hidden lg:flex items-center">
            <div className="flex" style={{ gap: "20px" }}>
            <Link to="/" onClick={() => setOpenDropdown(null)}>
              <NavLink label="Home" isActive={location.pathname === "/"} hasDropdown={false} isOpen={false} />
            </Link>
            <div className="relative">
              <NavLink
                label="Tour"
                href="/tours"
                isActive={isActivePath("/tours") && openDropdown !== "tour"}
                hasDropdown
                isOpen={openDropdown === "tour"}
                onClick={() => toggle("tour")}
                onNavigate={() => setOpenDropdown(null)}
              />
              {openDropdown === "tour" && (
                <TourDropdown
                  items={TOUR_ITEMS}
                  currentPath={location.pathname}
                  onClose={() => setOpenDropdown(null)}
                />
              )}
            </div>
            <div className="relative">
              <NavLink
                label="Tour Partners"
                href="/tour-partners"
                isActive={
                  isActivePath("/tour-partners") &&
                  openDropdown !== "tour-partners"
                }
                hasDropdown
                isOpen={openDropdown === "tour-partners"}
                onClick={() => toggle("tour-partners")}
                onNavigate={() => setOpenDropdown(null)}
              />
              {openDropdown === "tour-partners" && (
                <TourPartnersDropdown
                  items={TOUR_PARTNER_ITEMS}
                  currentPath={location.pathname}
                  onClose={() => setOpenDropdown(null)}
                />
              )}
            </div>
            <Link to="/gallery" onClick={() => setOpenDropdown(null)}>
              <NavLink label="Gallery" isActive={isActivePath("/gallery")} hasDropdown={false} isOpen={false} />
            </Link>
            <Link to="/blog" onClick={() => setOpenDropdown(null)}>
              <NavLink label="Blogs" isActive={isActivePath("/blog")} hasDropdown={false} isOpen={false} />
            </Link>
            <Link to="/contact" onClick={() => setOpenDropdown(null)}>
              <NavLink label="Contact Us" isActive={isActivePath("/contact")} hasDropdown={false} isOpen={false} />
            </Link>
          </div>
          </div>
        </div>

        {/* Mobile: hamburger button */}
        <button
          type="button"
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] shrink-0"
          onClick={() => { setMobileOpen(v => !v); setOpenDropdown(null); }}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span className={`block w-6 h-[2px] bg-secondary-dark-darker transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-6 h-[2px] bg-secondary-dark-darker transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-[2px] bg-secondary-dark-darker transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
        {/* Desktop: CTA buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Language */}
          <Button
            className=" bg-transparent! px-0! shadow-none!"
            startIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="26"
                viewBox="0 0 22 26"
                fill="none"
              >
                <path
                  d="M11 22.75C12.0834 22.75 13.1562 22.4978 14.1571 22.0078C15.1581 21.5178 16.0675 20.7997 16.8336 19.8943C17.5997 18.9889 18.2074 17.9141 18.622 16.7312C19.0366 15.5482 19.25 14.2804 19.25 13C19.25 11.7196 19.0366 10.4518 18.622 9.26884C18.2074 8.08591 17.5997 7.01108 16.8336 6.10571C16.0675 5.20034 15.1581 4.48216 14.1571 3.99217C13.1562 3.50219 12.0834 3.25 11 3.25M11 22.75C9.91659 22.75 8.8438 22.4978 7.84286 22.0078C6.84193 21.5178 5.93245 20.7997 5.16637 19.8943C4.40029 18.9889 3.7926 17.9141 3.37799 16.7312C2.96339 15.5482 2.75 14.2804 2.75 13C2.75 11.7196 2.96339 10.4518 3.37799 9.26884C3.7926 8.08591 4.40029 7.01108 5.16637 6.10571C5.93245 5.20034 6.84193 4.48216 7.84286 3.99217C8.8438 3.50219 9.91659 3.25 11 3.25M11 22.75C13.5309 22.75 14.6126 17.1568 14.6126 13C14.6126 8.84325 13.5309 3.25 11 3.25M11 22.75C8.46908 22.75 7.38742 17.1568 7.38742 13C7.38742 8.84325 8.46908 3.25 11 3.25M3.20833 9.75H18.7917M3.20833 16.25H18.7917"
                  stroke="#565656"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            }
            endIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path d="M5.25 7.5L9 11.25L12.75 7.5H5.25Z" fill="#565656" />
              </svg>
            }
            variant="outline"
            size="md"
          >
            <span className="text-md-Medium text-primary-dark-darker">
              English
            </span>
          </Button>
          {/* Auth buttons — logged out */}
          {!user && (
            <>
              <Button
                className="shadow-none! px-0!"
                startIcon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M14.1667 7.61627H5.83333C4.68274 7.61627 3.75 8.54901 3.75 9.69961V15.9496C3.75 17.1002 4.68274 18.0329 5.83333 18.0329H14.1667C15.3173 18.0329 16.25 17.1002 16.25 15.9496V9.69961C16.25 8.54901 15.3173 7.61627 14.1667 7.61627Z" stroke="#565656" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 1.36627C8.89497 1.36627 7.83516 1.80526 7.05376 2.58666C6.27236 3.36806 5.83337 4.42787 5.83337 5.53294V7.61627H14.1667V5.53294C14.1667 4.42787 13.7277 3.36806 12.9463 2.58666C12.1649 1.80526 11.1051 1.36627 10 1.36627V1.36627Z" stroke="#565656" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }
                variant="outline"
                size="md"
                onClick={() => openAuth("login")}
              >
                <span className="text-md-semibold text-primary-dark-darker">Login</span>
              </Button>
              <Button className="px-10 py-4" variant="secondary" size="md" shape="pill" onClick={() => openAuth("signup")}>
                <span className="text-nowrap">Sign Up</span>
              </Button>
            </>
          )}

          {/* Auth — logged in: user avatar + dropdown */}
          {user && (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen(v => !v)}
                className="flex items-center gap-[10px] cursor-pointer rounded-[40px] px-[14px] py-[8px] transition-colors hover:bg-[#f6f2f9]"
              >
                <div
                  className="flex items-center justify-center rounded-full font-raleway font-bold text-[14px] text-white shrink-0"
                  style={{ width: "36px", height: "36px", backgroundColor: "#7b2cbf" }}
                >
                  {userInitials}
                </div>
                <span className="font-raleway font-semibold text-[15px] text-[#2b0f43] max-w-[120px] truncate">
                  {user.name}
                </span>
                <ChevronDown stroke={userMenuOpen ? "#7b2cbf" : "#565656"} />
              </button>

              {userMenuOpen && (
                <UserDropdown
                  user={user}
                  onSignOut={handleLogout}
                  onClose={() => setUserMenuOpen(false)}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile menu panel — slides down when mobileOpen ─────────────── */}
      {mobileOpen && (
        <div className="lg:hidden bg-primary-light-default border-t border-primary-normal-default px-6 py-4 flex flex-col gap-1 shadow-md">
          {/* Simple link list */}
          {[
            { label: "Home", to: "/" },
            { label: "Tours", to: "/tours" },
            { label: "Tour Partners", to: "/tour-partners" },
            { label: "Gallery", to: "/gallery" },
            { label: "Blogs", to: "/blog" },
            { label: "Contact Us", to: "/contact" },
          ].map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              onClick={() => setMobileOpen(false)}
              className="py-3 border-b border-primary-normal-default last:border-b-0"
            >
              <span
                className={`font-raleway text-[16px] font-medium ${location.pathname === to || (to !== "/" && location.pathname.startsWith(to)) ? "text-secondary-normal-default font-semibold" : "text-primary-dark-darker"}`}
              >
                {label}
              </span>
            </Link>
          ))}
          {/* Sign Up / Login buttons (only when logged out) */}
          {!user && (
            <div className="pt-3 flex flex-col gap-2">
              <Button
                variant="outline"
                size="md"
                shape="pill"
                className="w-full"
                onClick={() => { setMobileOpen(false); openAuth("login"); }}
              >
                <span>Login</span>
              </Button>
              <Button
                variant="secondary"
                size="md"
                shape="pill"
                className="w-full"
                onClick={() => { setMobileOpen(false); openAuth("signup"); }}
              >
                <span>Sign Up</span>
              </Button>
            </div>
          )}
          {/* Logout button (when logged in) */}
          {user && (
            <div className="pt-3">
              <Button
                variant="outline"
                size="md"
                shape="pill"
                className="w-full"
                onClick={() => { setMobileOpen(false); handleLogout(); }}
              >
                <span>Sign Out</span>
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>

    {/* Auth modal */}
    <AuthModal
      isOpen={authModal.open}
      onClose={closeAuth}
      initialView={authModal.view}
      onAuthSuccess={handleAuthSuccess}
    />

    {/* Toast notification */}
    {toast && (
      <Toast
        variant={toast.variant}
        Heading={toast.Heading}
        text={toast.text}
        onCancel={dismissToast}
        duration={4000}
      />
    )}
    </>
  );
};

export default Navbar;
