import React from "react";
import { classNames } from "../../utils/classNames";
import Button from "./button";

// From Figma: All inner pages — Frame 6 hero + Frame 108 breadcrumb bar
// Hero: bg image + overlay, title [56px/700] Raleway #fefefe, subtitle [16px/500] #fefefe
// BreadcrumbBar: bg #ebdff5 (secondary-light-hover), h:53px

const BreadcrumbBar = ({ children, className = "" }) => (
  <div className={classNames(
    "w-full flex items-center bg-secondary-light-hover",
    "px-8 min-h-[53px]",
    className
  )}>
    {children}
  </div>
);

const PageHeroBanner = ({
  backgroundSrc,
  title,
  subtitle,
  align = "center",
  ctaLabel,
  onCta,
  ctaHref,
  searchSlot,
  breadcrumbSlot,
  overlayOpacity = 0.4,
  height = 711,
  className = "",
}) => {
  const alignClass = align === "left" ? "items-start text-left" : "items-center text-center";

  const handleCta = () => {
    if (onCta) onCta();
    else if (ctaHref) window.location.href = ctaHref;
  };

  return (
    <div className={classNames("flex flex-col w-full", className)}>
      {/* Hero area */}
      <div
        className="relative w-full flex items-center justify-center overflow-hidden bg-tertiary-dark-darker"
        style={{ height }}
      >
        {/* Background image */}
        {backgroundSrc && (
          <img
            src={backgroundSrc}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-tertiary-dark-darker"
          style={{ opacity: overlayOpacity }}
        />

        {/* Content */}
        <div className={classNames(
          "relative z-10 flex flex-col gap-4 px-8 w-full max-w-[957px]",
          alignClass
        )}>
          {title && (
            <h1 className="text-Display-xl-bold text-primary-light-default font-raleway leading-tight">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-md-Medium text-primary-light-default max-w-[850px]">
              {subtitle}
            </p>
          )}
          {searchSlot && (
            <div className="w-full mt-2">{searchSlot}</div>
          )}
          {ctaLabel && (
            <Button
              variant="secondary"
              size="medium"
              onClick={handleCta}
              className="mt-2 min-w-[169px] h-[56px] justify-center self-center"
            >
              {ctaLabel}
            </Button>
          )}
        </div>
      </div>

      {/* Breadcrumb bar */}
      {breadcrumbSlot && (
        <BreadcrumbBar>{breadcrumbSlot}</BreadcrumbBar>
      )}
    </div>
  );
};

export { BreadcrumbBar };
export default PageHeroBanner;
