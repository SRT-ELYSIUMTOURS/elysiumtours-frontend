import React, { useState } from "react";
import { classNames } from "../../utils/classNames";

// Social Share Modal — Figma node 854:7441 (Share Photos form)
// Used on: 815:6218 (Social Share-Image), 854:7542 (Social Share-Video)
// Card: 523×642px, bg-white, rounded-[30px], shadow-[0px_10px_4px_0px_rgba(0,0,0,0.15)]
// Content: user info, description + image, copy-url + share-with social icons

// Close circle icon (24px)
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9.5" stroke="#2d2d2d" strokeWidth="1" />
    <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" stroke="#2d2d2d" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

// Link icon (16px)
const LinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6.5 9.5a3.5 3.5 0 005 0l2-2a3.5 3.5 0 00-5-5l-1 1" stroke="#565656" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.5 6.5a3.5 3.5 0 00-5 0l-2 2a3.5 3.5 0 005 5l1-1" stroke="#565656" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Copy icon (14px, used in copy button)
const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="4.5" y="4.5" width="8" height="8" rx="1" stroke="#7b2cbf" strokeWidth="1" />
    <path d="M2 9.5V2a1 1 0 011-1h7.5" stroke="#7b2cbf" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

// Social brand icons (simplified inline SVGs matching brand colors)
const InstagramIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ borderRadius: "40px", overflow: "hidden" }}>
    <defs>
      <radialGradient id="ig-grad" cx="30%" cy="100%" r="120%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </radialGradient>
    </defs>
    <rect width="36" height="36" rx="8" fill="url(#ig-grad)" />
    <rect x="10" y="10" width="16" height="16" rx="4" stroke="white" strokeWidth="1.5" fill="none" />
    <circle cx="18" cy="18" r="4" stroke="white" strokeWidth="1.5" fill="none" />
    <circle cx="23" cy="13" r="1" fill="white" />
  </svg>
);

const XIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ borderRadius: "40px" }}>
    <rect width="36" height="36" rx="18" fill="#000" />
    <path d="M9 9l7 9.5L9 27h2.5l5.5-7 5.5 7H27l-7.5-10L27 9h-2.5L19 15.5 14 9H9z" fill="white" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="18" fill="#1877F2" />
    <path d="M20 13h-2c-.55 0-1 .45-1 1v2h3l-.5 3H17v7h-3v-7h-2v-3h2v-2c0-2.21 1.79-4 4-4h2v3z" fill="white" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="18" fill="#25D366" />
    <path d="M18 9c-4.97 0-9 4.03-9 9 0 1.59.42 3.08 1.14 4.38L9 27l4.75-1.24A8.94 8.94 0 0018 27c4.97 0 9-4.03 9-9s-4.03-9-9-9zm4.5 12.5c-.2.55-1.17 1.07-1.6 1.12-.41.05-.9.07-1.45-.09-.33-.1-.76-.24-1.3-.47-2.28-.98-3.77-3.25-3.88-3.4-.11-.15-.9-1.2-.9-2.28 0-1.09.57-1.62.77-1.84.2-.22.44-.27.58-.27h.42c.13 0 .31-.05.48.37.18.43.62 1.51.67 1.62.06.11.1.24.02.38-.07.14-.11.22-.22.34l-.33.38c-.11.11-.22.23-.1.45.13.22.57.94 1.22 1.52.84.75 1.55.98 1.77 1.09.22.11.35.09.48-.05l.33-.37c.13-.14.27-.12.44-.07.17.05 1.1.52 1.29.61.19.1.32.14.37.22.05.09.05.5-.14 1.04z" fill="white" />
  </svg>
);

const TikTokIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ borderRadius: "40px" }}>
    <rect width="36" height="36" fill="#000" />
    <path d="M21 9c.37 2 1.9 3.5 4 3.8v2.7c-1.4 0-2.7-.4-3.8-1.1v5.1c0 2.5-2 4.5-4.5 4.5S12.2 22 12.2 19.5s2-4.5 4.5-4.5c.2 0 .4 0 .6.02v2.7c-.2-.03-.4-.05-.6-.05-1 0-1.8.8-1.8 1.83 0 1 .8 1.83 1.8 1.83s1.8-.82 1.8-1.83V9h2.5z" fill="white" />
  </svg>
);

const SnapchatIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="18" fill="#FFFC00" />
    <path d="M18 8c-2.21 0-4 2-4 5v1c-.55 0-1 .45-1 1s.45 1 1 1c-.4.8-1.1 1.5-2 1.8.2.4.8.7 2 .8-.1.3-.3.6-.7.8.5.4 2 .6 4.7.6s4.2-.2 4.7-.6c-.4-.2-.6-.5-.7-.8 1.2-.1 1.8-.4 2-.8-.9-.3-1.6-1-2-1.8.55 0 1-.45 1-1s-.45-1-1-1v-1c0-3-1.79-5-4-5z" fill="white" />
  </svg>
);

const TelegramIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="18" fill="#2CA5E0" />
    <path d="M8 17.5l3.5 1.3 1.5 4.7 2-2.8 4 3L23 9 8 17.5zm4.8 1.6l6.7-4.1-4.8 5.2-.7 2-1.2-3.1z" fill="white" />
  </svg>
);

const ThreadsIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ borderRadius: "40px" }}>
    <rect width="36" height="36" fill="#000" />
    <path d="M22.5 16.8c-.2-.8-.7-1.5-1.4-2-.7-.5-1.6-.8-2.6-.8-2.2 0-3.8 1.5-3.8 3.8s1.6 3.8 3.8 3.8c1 0 1.9-.3 2.5-.9.4-.4.6-.9.6-1.5 0-1.1-.8-2-1.9-2-.6 0-1.1.3-1.4.7-.3-.5-1-.8-1.7-.8-1.2 0-2.1 1-2.1 2.3s.9 2.3 2.1 2.3c.4 0 .7-.1 1-.3.4.5 1 .8 1.7.8 1.6 0 2.8-1.3 2.8-2.8 0-.3 0-.5-.1-.7z" stroke="white" strokeWidth="1" fill="none" />
    <path d="M18 8c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10S23.5 8 18 8zm4.5 10c0 2.5-2 4.5-4.5 4.5S13.5 20.5 13.5 18s2-4.5 4.5-4.5 4.5 2 4.5 4.5z" fill="white" />
  </svg>
);

const SOCIAL_ICONS = [
  { label: "Instagram", icon: InstagramIcon },
  { label: "X", icon: XIcon },
  { label: "Facebook", icon: FacebookIcon },
  { label: "WhatsApp", icon: WhatsAppIcon },
  { label: "TikTok", icon: TikTokIcon },
  { label: "Snapchat", icon: SnapchatIcon },
  { label: "Telegram", icon: TelegramIcon },
  { label: "Threads", icon: ThreadsIcon },
];

const SocialShareModal = React.forwardRef(({
  isOpen = false,
  onClose,
  image,
  userName = "Davida Dzato",
  userSubtitle = "Giraffe Sanctuary",
  location = "Ghana",
  description = "A Giraffe Sanctuary offers visitors a rare chance to get up close to these gentle giants in a safe, natural environment. Explore open landscapes where giraffes roam freely, learn about conservation efforts, and enjoy unforgettable guided encounters perfect for wildlife lovers and photographers.",
  url = "elysium.com/graiffesantuary",
  className = "",
  ...props
}, ref) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.4)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose?.(); }}
    >
      {/* Modal card — 523×642px */}
      <div
        ref={ref}
        className={classNames(
          "relative bg-white overflow-hidden",
          "rounded-[30px]",
          "shadow-[0px_10px_4px_0px_rgba(0,0,0,0.15)]",
          className
        )}
        style={{ width: "523px", height: "642px" }}
        {...props}
      >
        {/* Close button — top-right */}
        <button
          className="absolute top-[17px] right-[17px] cursor-pointer z-10"
          onClick={onClose}
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        {/* Content — left-[40px], vertically centered, w-[443px] */}
        <div className="absolute top-1/2 -translate-y-1/2 left-[40px] flex flex-col gap-[12px] items-end w-[443px]">
          {/* User info row */}
          <div className="flex items-start gap-[4px] w-full">
            {/* Avatar */}
            <div className="shrink-0 size-[48px] rounded-full overflow-hidden bg-secondary-light-default">
              <img
                src={`https://picsum.photos/seed/user-avatar/48/48`}
                alt={userName}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Name + subtitle */}
            <div className="flex flex-col items-start justify-center">
              <div className="flex items-center justify-center h-[28px]">
                <p className="font-raleway font-semibold text-[13px] leading-[18px] text-[#2d2d2d] whitespace-nowrap">
                  {userName}
                </p>
              </div>
              <div className="flex items-center justify-center h-[23px]">
                <p className="font-raleway font-medium text-[10px] leading-[18px] text-[#565656] whitespace-nowrap">
                  {userSubtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Content + URL/share section */}
          <div className="flex flex-col gap-[12px] items-center w-full">
            {/* Info + image block */}
            <div className="flex items-center w-[393px]">
              <div className="flex flex-col gap-[8px] items-start w-[393px]">
                {/* Location + description */}
                <div className="flex flex-col gap-[4px] items-start w-[417px]">
                  <div className="flex gap-[7px] items-center h-[24px]">
                    <div className="shrink-0 size-[16px] rounded-full overflow-hidden">
                      <img
                        src={`https://picsum.photos/seed/flag/16/16`}
                        alt="flag"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-raleway font-medium text-[13px] leading-[22px] text-[#292929] whitespace-nowrap">
                      {location}
                    </p>
                  </div>
                  <p className="font-raleway font-medium text-[10px] leading-[18px] text-[#565656] w-[418px]">
                    {description}
                  </p>
                </div>

                {/* Image thumbnail */}
                <div
                  className="relative rounded-[15px] overflow-hidden shadow-[0px_4px_20px_0px_rgba(0,0,0,0.15)] shrink-0"
                  style={{ width: "417px", height: "191px" }}
                >
                  <div className="absolute inset-0 bg-[#f7f7f7]">
                    <img
                      src={image || `https://picsum.photos/seed/share-img/417/191`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                </div>
              </div>
            </div>

            {/* Copy URL + Share With section */}
            <div
              className="relative overflow-hidden rounded-[15px] w-full"
              style={{ height: "168px", background: "#f2eaf9" }}
            >
              {/* Copy Url row */}
              <div
                className="absolute left-1/2 -translate-x-1/2 flex flex-col items-start"
                style={{ top: "12px", width: "393px" }}
              >
                <div className="flex flex-col gap-[4px] items-start w-full">
                  {/* Label */}
                  <div className="flex items-center h-[24px]">
                    <p className="font-raleway font-semibold text-[10px] leading-[normal] text-[#2d2d2d] whitespace-nowrap">
                      Copy Url
                    </p>
                  </div>

                  {/* URL pill row */}
                  <div
                    className="flex items-center justify-between bg-white rounded-[20px] w-full"
                    style={{ height: "40px", paddingLeft: "10px", paddingRight: "10px" }}
                  >
                    <div className="flex gap-[7px] items-center">
                      <LinkIcon />
                      <p className="font-raleway font-medium text-[10px] leading-[18px] text-[#565656] whitespace-nowrap">
                        {url}
                      </p>
                    </div>
                    <button
                      className="flex items-center justify-center size-[32px] rounded-full border border-secondary-normal-default cursor-pointer shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)] shrink-0"
                      onClick={handleCopy}
                      aria-label="Copy URL"
                    >
                      <CopyIcon />
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-[#2d2d2d]/10 mt-[4px]" />
                </div>
              </div>

              {/* Share With row */}
              <div
                className="absolute flex flex-col gap-[4px] items-start"
                style={{ left: "25px", top: "92px", width: "393px" }}
              >
                <div className="flex items-center h-[24px]">
                  <p className="font-raleway font-semibold text-[10px] leading-[normal] text-[#2d2d2d] whitespace-nowrap">
                    Share With
                  </p>
                </div>
                <div className="flex gap-[15px] items-center">
                  {SOCIAL_ICONS.map(({ label, icon: Icon }) => (
                    <button key={label} className="shrink-0 cursor-pointer" aria-label={label}>
                      <Icon />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

SocialShareModal.displayName = "SocialShareModal";
export default SocialShareModal;
