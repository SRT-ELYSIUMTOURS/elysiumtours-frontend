import React from "react";
import { classNames } from "../../utils/classNames";
import ctaGlowRight from "../../assets/ElysiumAssets/cta-glow-right.svg";
import ctaGlowLeft from "../../assets/ElysiumAssets/cta-glow-left.svg";

/**
 * Shared purple-band partner / promo CTA — used on Tour, Gallery, Blog, Contact.
 * Mobile/tablet: stacked column (image, title, description, button — all centered).
 * Desktop (lg+): original Figma absolute layout — image left, text right.
 */
const PartnerPromoCtaSection = React.forwardRef(
  (
    {
      title,
      description,
      buttonText,
      imageSrc,
      imageAlt = "",
      onCtaClick,
      /** @deprecated use onCtaClick */
      onPartnerClick,
      /** @deprecated use onCtaClick */
      onBecomePartnerClick,
      className = "",
      ...props
    },
    ref
  ) => {
    const handleCta = onCtaClick ?? onPartnerClick ?? onBecomePartnerClick;

    return (
      <section
        ref={ref}
        className={classNames(
          "relative w-full overflow-hidden bg-secondary-dark-darker",
          "h-auto lg:h-[732px] py-12 lg:py-0",
          className
        )}
        {...props}
      >
        {/* Decorative glows */}
        <img
          src={ctaGlowRight}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-[-110px] w-[200px] md:w-[300px] lg:w-[380px] h-auto"
        />
        <img
          src={ctaGlowLeft}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-0 bottom-[-104px] w-[200px] md:w-[300px] lg:w-[380px] h-auto"
        />

        {/* Mobile / tablet — stacked, centered */}
        <div className="relative z-10 flex flex-col lg:hidden items-center gap-6 px-4 md:px-8">
          <div className="w-full max-w-[600px] overflow-hidden rounded-[24px] md:rounded-[40px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.2)]">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-[220px] md:h-[380px] object-cover"
            />
          </div>
          <div className="flex w-full max-w-[600px] flex-col items-center gap-4">
            <h2 className="w-full font-raleway font-bold text-[24px] md:text-[36px] leading-tight text-primary-light-default text-center">
              {title}
            </h2>
            <p className="w-full font-raleway font-normal text-[14px] md:text-[16px] leading-[22px] md:leading-[24px] text-primary-light-default text-center">
              {description}
            </p>
            <button
              type="button"
              onClick={handleCta}
              className="mt-2 flex h-[48px] min-w-[169px] cursor-pointer items-center justify-center rounded-[40px] border border-secondary-normal-default bg-primary-light-default px-8 font-raleway text-[14px] md:text-[16px] font-semibold leading-[22px] text-secondary-dark-darker shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)] transition-colors hover:bg-gray-50"
            >
              {buttonText}
            </button>
          </div>
        </div>

        {/* Desktop — original Figma absolute layout */}
        <div className="hidden lg:block">
          <div
            className="absolute overflow-hidden rounded-[40px] shadow-card"
            style={{
              left: "156px",
              top: "calc(50% + 0.5px)",
              transform: "translateY(-50%)",
              width: "711px",
              height: "559px",
            }}
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-full w-full object-cover"
            />
          </div>

          <div
            className="absolute flex flex-col items-end gap-[20px]"
            style={{
              right: "156px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "592px",
            }}
          >
            <h2 className="w-full text-right font-raleway text-[56px] font-bold leading-[66px] text-primary-light-default">
              {title}
            </h2>
            <p className="max-w-[483px] text-right font-raleway text-[16px] font-normal leading-[24px] text-primary-light-default">
              {description}
            </p>
            <button
              type="button"
              onClick={handleCta}
              className="flex min-h-[64px] min-w-[169px] cursor-pointer items-center justify-center rounded-[40px] border border-secondary-normal-default bg-primary-light-default px-8 font-raleway text-[16px] font-semibold leading-[22px] text-secondary-dark-darker shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)] transition-colors hover:bg-gray-50"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </section>
    );
  }
);

PartnerPromoCtaSection.displayName = "PartnerPromoCtaSection";
export default PartnerPromoCtaSection;
