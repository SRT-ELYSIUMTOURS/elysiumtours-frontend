import React, { useState, useEffect } from "react";
import { classNames } from "../../utils/classNames";

// ShareModal — centered white modal overlay
// Props: onClose, tour { title, description, image, url, author { name, avatar, subtitle, country } }

const SOCIAL_PLATFORMS = [
  {
    name: "Instagram",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="2" width="16" height="16" rx="5" stroke="url(#ig-grad)" strokeWidth="1.5"/>
        <circle cx="10" cy="10" r="3.5" stroke="url(#ig-grad)" strokeWidth="1.5"/>
        <circle cx="14.5" cy="5.5" r="1" fill="url(#ig-grad)"/>
        <defs>
          <linearGradient id="ig-grad" x1="2" y1="18" x2="18" y2="2" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f9ce34"/>
            <stop offset="0.4" stopColor="#ee2a7b"/>
            <stop offset="1" stopColor="#6228d7"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    bg: "bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    href: (url) => `https://www.instagram.com/`,
  },
  {
    name: "X",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 3L17 17M3 17L17 3" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    bg: "bg-black",
    href: (url) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
  },
  {
    name: "Facebook",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M11 10H13.5L14 7.5H11V6C11 5.17 11.5 5 12 5H14V2.5C14 2.5 12.9 2 11.5 2C9.1 2 8 3.5 8 5.5V7.5H5.5V10H8V18H11V10Z" fill="white"/>
      </svg>
    ),
    bg: "bg-[#1877f2]",
    href: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: "WhatsApp",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2C5.58 2 2 5.58 2 10C2 11.45 2.38 12.81 3.04 14L2 18L6.12 16.96C7.26 17.57 8.59 17.9 10 17.9C14.42 17.9 18 14.32 18 9.9C18 5.48 14.42 2 10 2ZM13.46 12.83C13.27 13.33 12.46 13.78 12 13.84C11.54 13.9 10.99 13.92 10.31 13.69C9.9 13.55 9.37 13.36 8.7 13.06C6.77 12.17 5.54 10.23 5.44 10.11C5.34 9.99 4.67 9.11 4.67 8.19C4.67 7.27 5.14 6.82 5.33 6.61C5.52 6.4 5.74 6.35 5.87 6.35C6 6.35 6.13 6.35 6.25 6.36C6.38 6.37 6.55 6.32 6.72 6.71C6.89 7.1 7.29 8.02 7.34 8.12C7.39 8.22 7.42 8.34 7.35 8.46C7.28 8.58 7.25 8.66 7.15 8.78C7.05 8.9 6.94 9.05 6.85 9.14C6.75 9.24 6.64 9.35 6.76 9.55C6.88 9.75 7.29 10.39 7.88 10.92C8.64 11.6 9.27 11.81 9.47 11.91C9.67 12.01 9.79 11.99 9.91 11.86C10.03 11.73 10.42 11.27 10.56 11.07C10.7 10.87 10.84 10.9 11.03 10.97C11.22 11.04 12.14 11.5 12.34 11.6C12.54 11.7 12.67 11.75 12.72 11.83C12.77 11.91 12.77 12.27 12.59 12.7L13.46 12.83Z" fill="white"/>
      </svg>
    ),
    bg: "bg-[#25d366]",
    href: (url) => `https://wa.me/?text=${encodeURIComponent(url)}`,
  },
  {
    name: "Pinterest",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2C5.58 2 2 5.58 2 10C2 13.44 4.07 16.4 7.03 17.72C6.97 17.2 6.93 16.37 7.07 15.77C7.2 15.22 7.93 12.2 7.93 12.2C7.93 12.2 7.71 11.76 7.71 11.11C7.71 10.08 8.3 9.31 9.03 9.31C9.65 9.31 9.95 9.78 9.95 10.35C9.95 10.99 9.54 11.94 9.32 12.82C9.14 13.56 9.69 14.16 10.42 14.16C11.73 14.16 12.72 12.78 12.72 10.81C12.72 9.07 11.48 7.86 9.7 7.86C7.65 7.86 6.46 9.4 6.46 10.99C6.46 11.63 6.71 12.32 7.02 12.7C7.08 12.77 7.09 12.84 7.07 12.92C6.99 13.26 6.81 13.97 6.77 14.12C6.73 14.33 6.61 14.38 6.4 14.28C5.45 13.84 4.84 12.5 4.84 10.96C4.84 8.52 6.62 6.28 10 6.28C12.76 6.28 14.9 8.23 14.9 10.79C14.9 13.47 13.21 15.61 10.78 15.61C10.03 15.61 9.32 15.22 9.08 14.76L8.5 16.96C8.24 17.91 7.57 19.1 7.13 19.85C8.07 20.12 9.02 20.28 10 20.28C14.42 20.28 18 16.7 18 12.28C18 5.86 14.42 2 10 2Z" fill="white"/>
      </svg>
    ),
    bg: "bg-[#e60023]",
    href: (url) => `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}`,
  },
  {
    name: "Snapchat",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2C7.24 2 5 4.24 5 7V9.5C4.17 9.5 3.5 10.17 3.5 11C3.5 11.83 4.17 12.5 5 12.5C4.8 13.5 4.17 14.37 3.5 15C3 15.5 3 16.5 5 17C5.5 17.17 6.1 17.7 7 18H13C13.9 17.7 14.5 17.17 15 17C17 16.5 17 15.5 16.5 15C15.83 14.37 15.2 13.5 15 12.5C15.83 12.5 16.5 11.83 16.5 11C16.5 10.17 15.83 9.5 15 9.5V7C15 4.24 12.76 2 10 2Z" fill="black"/>
      </svg>
    ),
    bg: "bg-[#fffc00]",
    href: () => `https://www.snapchat.com/`,
  },
  {
    name: "Telegram",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M2.5 9.75L16.5 3.5L13 17L9 13L6.5 15.5L6 11.5L2.5 9.75Z" stroke="white" strokeWidth="1.3" strokeLinejoin="round"/>
        <path d="M6 11.5L9 8.5L13 11" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    bg: "bg-[#2aabee]",
    href: (url) => `https://t.me/share/url?url=${encodeURIComponent(url)}`,
  },
  {
    name: "Threads",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M13.5 8.5C13.5 6.57 11.93 5 10 5C8.07 5 6.5 6.57 6.5 8.5V10.5C6.5 12.43 8.07 14 10 14C11.93 14 13.5 12.43 13.5 10.5V9.5C13.5 8.12 12.5 7 11.5 7C10.5 7 9.5 7.88 9.5 9.5C9.5 11.12 10.5 12 11.5 12" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M13.5 9C13.5 10.93 12.5 12.5 10 12.5" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    bg: "bg-black",
    href: () => `https://www.threads.net/`,
  },
];

const ShareModal = React.forwardRef(
  ({ onClose, tour = {} }, ref) => {
    const {
      title = "Elmina Heritage & Coastal Journey",
      description = "Experience the rich history and stunning coastal landscapes of Ghana's Central Region on this immersive 3-day heritage tour.",
      image = "https://picsum.photos/seed/share-tour/492/200",
      url = window.location.href,
      author = { name: "Davida Dzato", avatar: "https://picsum.photos/seed/author-avatar/48/48", subtitle: "Giraffe Sanctuary", country: "🇬🇭 Ghana" },
    } = tour;

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    };

    useEffect(() => {
      const handleKey = (e) => { if (e.key === "Escape") onClose?.(); };
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }, [onClose]);

    return (
      <div
        ref={ref}
        className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center"
        onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
      >
        {/* White card */}
        <div
          className="bg-white rounded-[20px] relative overflow-y-auto"
          style={{ width: "540px", maxHeight: "90vh", padding: "24px", fontFamily: "Raleway, sans-serif" }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-[20px] right-[20px] w-[32px] h-[32px] flex items-center justify-center rounded-full bg-[#f5f5f5] hover:bg-[#e9eaeb] transition-colors"
            aria-label="Close share modal"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2L12 12M12 2L2 12" stroke="#2d2d2d" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Modal title */}
          <h2 className="font-raleway font-bold text-[20px] leading-[28px] text-[#2d2d2d] mb-[20px]">
            Share Tour
          </h2>

          {/* Author card */}
          <div className="flex items-center gap-[12px] p-[14px] rounded-[12px] border border-[#e9eaeb] mb-[16px]">
            <div className="w-[48px] h-[48px] rounded-full overflow-hidden flex-shrink-0">
              <img src={author.avatar} alt={author.name} className="w-full h-full object-cover"/>
            </div>
            <div className="flex-1">
              <p className="font-raleway font-bold text-[15px] leading-[20px] text-[#2d2d2d]">{author.name}</p>
              <p className="font-raleway font-medium text-[13px] leading-[18px] text-[#6f6f6f]">{author.subtitle}</p>
            </div>
            <span className="text-[14px] text-[#6f6f6f]">{author.country}</span>
          </div>

          {/* Description */}
          <p className="font-raleway font-normal text-[14px] leading-[22px] text-[#4a4a4a] mb-[16px]">
            {description}
          </p>

          {/* Tour image */}
          <div className="w-full rounded-[10px] overflow-hidden mb-[20px]" style={{ height: "200px" }}>
            <img src={image} alt={title} className="w-full h-full object-cover"/>
          </div>

          {/* Copy URL section */}
          <div className="mb-[20px]">
            <p className="font-raleway font-semibold text-[13px] leading-[18px] text-[#2d2d2d] uppercase tracking-[0.06em] mb-[8px]">
              Copy Url
            </p>
            <div className="flex items-center gap-[8px] p-[10px] rounded-[10px] border border-[#e9eaeb] bg-[#fafafa]">
              <input
                type="text"
                readOnly
                value={url}
                className="flex-1 bg-transparent outline-none font-raleway font-medium text-[13px] text-[#6f6f6f] truncate"
              />
              <button
                onClick={handleCopy}
                className={classNames(
                  "w-[36px] h-[36px] flex items-center justify-center rounded-full transition-colors flex-shrink-0",
                  copied ? "bg-[#22c55e]" : "bg-[#7b2cbf] hover:bg-[#6b22af]"
                )}
                aria-label="Copy URL"
              >
                {copied ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8L6.5 11.5L13 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="5" y="5" width="8" height="9" rx="1.5" stroke="white" strokeWidth="1.3"/>
                    <path d="M11 4V3C11 2.45 10.55 2 10 2H3C2.45 2 2 2.45 2 3V11C2 11.55 2.45 12 3 12H4" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Share with section */}
          <div>
            <p className="font-raleway font-semibold text-[13px] leading-[18px] text-[#2d2d2d] uppercase tracking-[0.06em] mb-[12px]">
              Share With
            </p>
            <div className="flex items-center gap-[10px] flex-wrap">
              {SOCIAL_PLATFORMS.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.href(url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classNames(
                    "w-[48px] h-[48px] rounded-full flex items-center justify-center transition-opacity hover:opacity-80 flex-shrink-0",
                    platform.bg
                  )}
                  aria-label={`Share on ${platform.name}`}
                  title={platform.name}
                >
                  {platform.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ShareModal.displayName = "ShareModal";
export default ShareModal;
