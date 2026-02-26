import React, { useState } from "react";
import { classNames } from "../../utils/classNames";

// From Figma: Single Blog page — Group 3265/3266
// Download + Share icon buttons, 40×40 circular
// hover: bg #ebdff5, border #7b2cbf (secondary-light-hover / secondary-normal-default)

const DownloadIcon = ({ size = 24, className = "" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 3v13m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ShareIcon = ({ size = 24, className = "" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="18" cy="5" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="6"  cy="12" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="18" cy="19" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 11l8-5M8 13l8 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ActionButton = ({ onClick, children, title, className = "" }) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    className={classNames(
      "relative flex items-center justify-center w-10 h-10 rounded-[var(--radius-lg)]",
      "border border-solid border-primary-dark-default bg-transparent",
      "text-tertiary-normal-default",
      "hover:bg-secondary-light-hover hover:border-secondary-normal-default hover:text-secondary-normal-default",
      "active:bg-secondary-light-active active:border-secondary-normal-active active:text-secondary-normal-active",
      "transition-all duration-200 ease-in cursor-pointer",
      className
    )}
  >
    {children}
  </button>
);

const ShareActionBar = ({
  onDownload,
  shareData,
  orientation = "horizontal",
  className = "",
}) => {
  const [tooltip, setTooltip] = useState(null);

  const showTooltip = (msg) => {
    setTooltip(msg);
    setTimeout(() => setTooltip(null), 2000);
  };

  const handleShare = async () => {
    try {
      if (navigator.share && shareData) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData?.url || window.location.href);
        showTooltip("Link copied!");
      }
    } catch {
      showTooltip("Link copied!");
    }
  };

  const handleDownload = () => {
    onDownload?.();
    showTooltip("Saved!");
  };

  return (
    <div className={classNames(
      "relative flex items-center",
      orientation === "vertical" ? "flex-col gap-2" : "flex-row gap-[var(--gap-md)]",
      className
    )}>
      <ActionButton onClick={handleDownload} title="Download">
        <DownloadIcon size={20} />
      </ActionButton>

      <ActionButton onClick={handleShare} title="Share">
        <ShareIcon size={20} />
      </ActionButton>

      {tooltip && (
        <span className={classNames(
          "absolute -top-8 left-1/2 -translate-x-1/2",
          "px-2 py-1 rounded-[var(--radius-sm)]",
          "bg-secondary-dark-darker text-primary-light-default text-sm-regular",
          "whitespace-nowrap pointer-events-none"
        )}>
          {tooltip}
        </span>
      )}
    </div>
  );
};

export { ActionButton, DownloadIcon, ShareIcon };
export default ShareActionBar;
