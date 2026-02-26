import React from "react";
import { classNames } from "../../utils/classNames";
import Button from "./button";

// From Figma: Not Found page — Frame 192 + digit "0"/"4" components
// Digits: 112×200, [150px/600] Poppins #c6c6c6 (primary-normal-active)
// Message: [16px/600] Raleway #2d2d2d (tertiary-normal-default), maxWidth 487px
// CTA: Button variant="secondaryOutline"

const LargeDigit = ({ digit, className = "" }) => (
  <div className={classNames(
    "flex items-center justify-center",
    "w-[112px] h-[200px]",
    "text-primary-normal-active font-semibold leading-none",
    className
  )}
    style={{ fontFamily: "Poppins, sans-serif", fontSize: "150px", fontWeight: 600 }}
  >
    {digit}
  </div>
);

const NotFoundDisplay = ({
  message = "Sorry, the page you were looking for could not be found. It may have been moved, deleted, or never existed.",
  ctaLabel = "Back to Home",
  onCtaClick,
  ctaHref,
  className = "",
}) => {
  const handleCta = () => {
    if (onCtaClick) {
      onCtaClick();
    } else if (ctaHref) {
      window.location.href = ctaHref;
    }
  };

  return (
    <div className={classNames(
      "flex flex-col items-center justify-center gap-[var(--gap-md)] w-full",
      className
    )}>
      {/* 404 digits */}
      <div className="flex items-center gap-4">
        <LargeDigit digit="4" />
        <LargeDigit digit="0" />
        <LargeDigit digit="4" />
      </div>

      {/* Message */}
      <p className={classNames(
        "text-md-semibold text-tertiary-normal-default font-raleway text-center",
        "max-w-[487px]"
      )}>
        {message}
      </p>

      {/* CTA */}
      <Button
        variant="secondaryOutline"
        size="medium"
        onClick={handleCta}
        className="mt-2 min-w-[169px] h-[56px] justify-center"
      >
        {ctaLabel}
      </Button>
    </div>
  );
};

export { LargeDigit };
export default NotFoundDisplay;
