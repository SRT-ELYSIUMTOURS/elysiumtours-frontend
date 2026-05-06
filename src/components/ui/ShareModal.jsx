import React, { useState, useEffect, useMemo } from "react";
import { classNames } from "../../utils/classNames";

// ShareModal — layout matches design (523×642, rounded 30px, codia assets).
// Props: onClose, tour { title, description, image, url?, locationTag?, author { name, avatar, subtitle } }

const ASSETS = {
  close:
    "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-30/UwRV1dk8Jy.png",
  avatarFallback:
    "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-30/VzgyKxRcfy.png",
  flag:
    "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-30/0HjBKzuLFa.png",
  linkIcon:
    "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-30/j4uW6GFOO1.png",
  copyIcon:
    "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-30/bOu78QPSx9.png",
  divider:
    "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-30/mn35fGD0mN.png",
  spine:
    "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-30/jMKq3MQt5D.png",
};

/** 8 social icons left-to-right (design order) */
const SOCIAL_ICON_BG = [
  "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-30/UYiCExHbeq.png",
  "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-30/Rhp2F0uKTO.png",
  "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-30/aD66ubJi49.png",
  "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-30/716yXub5ax.png",
  "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-30/tjm8xb4X5c.png",
  "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-30/J7F5KyqkAX.png",
  "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-30/xKa8XaeTfK.png",
  "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-30/cxUzmwdWmQ.png",
];

const SOCIAL_PLATFORMS = [
  {
    name: "Instagram",
    href: (_url) => `https://www.instagram.com/`,
  },
  {
    name: "X",
    href: (url) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
  },
  {
    name: "Facebook",
    href: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: "WhatsApp",
    href: (url) => `https://wa.me/?text=${encodeURIComponent(url)}`,
  },
  {
    name: "Pinterest",
    href: (url) =>
      `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}`,
  },
  {
    name: "Snapchat",
    href: (_url) => `https://www.snapchat.com/`,
  },
  {
    name: "Telegram",
    href: (url) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}`,
  },
  {
    name: "Threads",
    href: (_url) => `https://www.threads.net/`,
  },
];

function formatDisplayUrl(href) {
  if (!href) return "elysium.com/giraffesantuary";
  try {
    const u = new URL(href);
    const host = u.hostname.replace(/^www\./, "");
    const path = `${u.pathname}${u.search}`.replace(/\/$/, "") || "";
    return `${host}${path}`;
  } catch {
    return href;
  }
}

const ShareModal = React.forwardRef(({ onClose, tour = {} }, ref) => {
  const {
    title = "Giraffe Sanctuary",
    description =
      "A Giraffe Sanctuary offers visitors a rare chance to get up close to these gentle giants in a safe, natural environment. Explore open landscapes where giraffes roam freely, learn about conservation efforts, and enjoy unforgettable guided encounters perfect for wildlife lovers and photographers.",
    image = "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-30/Bs3VspDBUA.png",
    url: urlProp,
    locationTag = "Ghana",
    author = {
      name: "Davida Dzato",
      avatar: ASSETS.avatarFallback,
      subtitle: "Giraffe Sanctuary",
    },
  } = tour;

  const url =
    urlProp ??
    (typeof window !== "undefined" ? window.location.href : "");

  const displayUrl = useMemo(() => formatDisplayUrl(url), [url]);

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy =
      url ||
      (typeof window !== "undefined" ? window.location.href : "") ||
      displayUrl;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[250] flex items-center justify-center bg-black/45 p-4 font-raleway"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        className="relative mx-auto my-0 h-[642px] w-[523px] max-h-[min(90vh,642px)] overflow-hidden overflow-y-auto rounded-[30px] bg-white shadow-[0_10px_4px_0_rgba(0,0,0,0.15)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative spine (design) */}
        <div
          className="pointer-events-none absolute left-0 top-[5px] z-[51] h-[298px] w-[3px] shrink-0 bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${ASSETS.spine})` }}
          aria-hidden
        />

        <button
          type="button"
          onClick={onClose}
          className="absolute right-[17px] top-[17px] z-[60] h-[24px] w-[24px] shrink-0 overflow-hidden bg-cover bg-no-repeat transition-opacity hover:opacity-80"
          style={{ backgroundImage: `url(${ASSETS.close})` }}
          aria-label="Close share modal"
        />

        <div className="relative z-[1] mx-10 mt-10 flex w-[calc(100%-80px)] max-w-[443px] flex-col gap-5">
          {/* User row — avatar + text side-by-side; text never overlaps avatar */}
          <div className="flex w-full items-start gap-3 pr-2">
            <div
              className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#f0f0f0] bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${author.avatar || ASSETS.avatarFallback})`,
              }}
            />
            <div className="flex min-w-0 flex-1 flex-col pt-0.5">
              <p className="break-words font-raleway text-[13px] font-semibold leading-[18px] text-[#2d2d2d]">
                {author.name}
              </p>
              <p className="mt-0.5 break-words font-raleway text-[10px] font-medium leading-[18px] text-[#565656]">
                {author.subtitle}
              </p>
            </div>
          </div>

          {/* Location, description, hero image, lavender — story column matches lavender outer width */}
          <div className="relative z-10 flex w-full flex-col items-stretch gap-4 self-stretch">
            <div className="flex w-full flex-col gap-4">
              <div className="flex w-full min-w-0 flex-col gap-2">
                <div className="flex h-[24px] shrink-0 items-center gap-[7px]">
                  <div
                    className="h-[16px] w-[16px] shrink-0 rounded-[50%] bg-cover bg-no-repeat"
                    style={{ backgroundImage: `url(${ASSETS.flag})` }}
                    aria-hidden
                  />
                  <span className="font-raleway text-[13px] font-medium leading-[22px] text-[#292929] whitespace-nowrap">
                    {locationTag}
                  </span>
                </div>
                <p className="max-h-[120px] w-full overflow-y-auto text-left font-raleway text-[10px] font-medium leading-[18px] text-[#565656]">
                  {description}
                </p>
              </div>

              <div className="relative h-[191px] w-full shrink-0 overflow-hidden rounded-[15px] bg-[rgba(0,0,0,0.02)]">
                <img
                  src={image}
                  alt={title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Lavender: Copy URL + Share With — same outer width as column above */}
            <div className="relative z-[19] h-[168px] w-full shrink-0 overflow-hidden rounded-[15px] bg-[#f2eaf9]">
              <div className="relative z-20 mx-[25px] mt-[12px] flex h-[72px] w-[calc(100%-50px)] max-w-none flex-col items-start gap-1">
                <div className="relative z-[21] flex w-full flex-col items-start gap-2 self-stretch shrink-0">
                  <div className="relative z-[22] flex w-full flex-col items-start gap-1 self-stretch shrink-0">
                    <div className="relative z-[23] flex h-[24px] w-[298px] shrink-0 items-center gap-[7px]">
                      <span className="relative z-[24] flex h-[12px] w-[41px] shrink-0 basis-auto items-start justify-center whitespace-nowrap text-center font-raleway text-[10px] font-semibold leading-[11.74px] text-[#2d2d2d]">
                        Copy Url
                      </span>
                    </div>
                    <div className="relative z-[25] flex h-10 w-full shrink-0 flex-nowrap items-center justify-between self-stretch rounded-[20px] bg-[#fefefe] px-[10px]">
                      <div className="relative z-[26] flex min-w-0 flex-1 shrink-0 items-center gap-[7px]">
                        <div
                          className="relative z-[27] h-4 w-4 shrink-0 overflow-hidden bg-cover bg-no-repeat"
                          style={{
                            backgroundImage: `url(${ASSETS.linkIcon})`,
                          }}
                          aria-hidden
                        />
                        <span className="relative z-[28] min-w-0 truncate text-left font-raleway text-[10px] font-medium leading-[18px] text-[#565656]">
                          {copied ? "Copied!" : displayUrl}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopy}
                        className={classNames(
                          "relative z-[29] flex h-8 w-8 shrink-0 flex-nowrap items-center justify-center rounded-[40px] border-[0.8px] border-solid border-[#7b2cbf] shadow-[0_4px_4px_0_rgba(0,0,0,0.05)] transition-colors",
                          copied &&
                            "border-secondary-normal-default bg-secondary-normal-default"
                        )}
                        aria-label="Copy URL"
                      >
                        {copied ? (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 16 16"
                            fill="none"
                            className="relative z-30"
                          >
                            <path
                              d="M3 8L6.5 11.5L13 5"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <div
                            className="relative z-30 h-[14px] w-[14px] shrink-0 bg-cover bg-no-repeat"
                            style={{
                              backgroundImage: `url(${ASSETS.copyIcon})`,
                            }}
                            aria-hidden
                          />
                        )}
                      </button>
                    </div>
                  </div>
                  <div
                    className="relative z-[31] h-[11px] w-full shrink-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${ASSETS.divider})` }}
                    aria-hidden
                  />
                </div>
              </div>

              <div className="relative z-[32] mx-[25px] mt-2 flex w-[calc(100%-50px)] flex-col items-start gap-1">
                <div className="relative z-[33] flex h-[24px] w-[298px] shrink-0 items-center gap-[7px]">
                  <span className="relative z-[34] flex h-[12px] w-[52px] shrink-0 basis-auto items-start justify-center whitespace-nowrap text-center font-raleway text-[10px] font-semibold leading-[11.74px] text-[#2d2d2d]">
                    Share With
                  </span>
                </div>
                <div className="relative z-[35] flex shrink-0 flex-nowrap items-center gap-[15px] self-stretch">
                  {SOCIAL_PLATFORMS.map((platform, i) => (
                    <a
                      key={platform.name}
                      href={platform.href(url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative h-[36px] w-[36px] shrink-0 overflow-hidden rounded-[40px] bg-cover bg-center bg-no-repeat transition-opacity hover:opacity-90"
                      style={{
                        backgroundImage: `url(${SOCIAL_ICON_BG[i]})`,
                      }}
                      aria-label={`Share on ${platform.name}`}
                      title={platform.name}
                    />
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

ShareModal.displayName = "ShareModal";
export default ShareModal;
