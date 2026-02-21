import React from "react";
import { classNames } from "../../utils/classNames";

// From Figma: "fluent:play-circle-hint-20-filled" (598:3586) — 24×24
// VECTOR fill:#2d264b — filled play circle icon used on gallery video cards
// Also: Hicon / Linear / Video 2 — 24×24 for video section indicator

export const PlayCircleIcon = ({ size = 52, className = "" }) => (
  <div
    className={classNames(
      "rounded-full flex items-center justify-center transition-all duration-300 ease-in",
      "bg-secondary-normal-default hover:bg-secondary-normal-hover cursor-pointer",
      className
    )}
    style={{ width: size, height: size }}
  >
    <svg
      width={Math.round(size * 0.46)}
      height={Math.round(size * 0.46)}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="11" fill="rgba(255,255,255,0.15)" stroke="#fefefe" strokeWidth="1.2"/>
      <path d="M10 8.5l6 3.5-6 3.5V8.5z" fill="#fefefe"/>
    </svg>
  </div>
);

// Video 2 icon — used in Gallery section header
export const VideoIcon = ({ stroke = "#7b2cbf", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M15 10l4.553-2.276A1 1 0 0 1 21 8.723v6.554a1 1 0 0 1-1.447.894L15 14M3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Download icon — used in Single Blog page (Hicon / Linear / Download — 10:429)
export const DownloadIcon = ({ stroke = "#7b2cbf", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 3v13M7 11l5 5 5-5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 20h18" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Call icon — used in Contact page (Hicon / Linear / Call)
export const CallIcon = ({ stroke = "#7b2cbf", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Location icon — used in Contact page (Hicon / Linear / Location)
export const LocationIcon = ({ stroke = "#7b2cbf", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="9" r="2.5" stroke={stroke} strokeWidth="1.5"/>
  </svg>
);

export default PlayCircleIcon;
