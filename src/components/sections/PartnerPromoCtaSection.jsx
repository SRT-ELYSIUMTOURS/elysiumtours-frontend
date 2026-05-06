import React from "react";
import { classNames } from "../../utils/classNames";
import ctaGlowRight from "../../assets/ElysiumAssets/cta-glow-right.svg";
import ctaGlowLeft from "../../assets/ElysiumAssets/cta-glow-left.svg";

/**
 * Shared purple-band partner / promo CTA — same layout everywhere (Tour, Gallery,
 * Blog, Contact). Copy and media come from props or `src/data/partnerPromoCtaPresets.jsx`.
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
    const handleCta =
      onCtaClick ?? onPartnerClick ?? onBecomePartnerClick;
    return (
      <section
        ref={ref}
        className={classNames(
          "relative w-full overflow-hidden bg-secondary-dark-darker",
          className
        )}
        style={{ height: "732px" }}
        {...props}
      >
        <img
          src={ctaGlowRight}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            right: "0px",
            top: "-110px",
            width: "380px",
            height: "836px",
          }}
        />
        <img
          src={ctaGlowLeft}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            left: "0px",
            bottom: "-104px",
            width: "380px",
            height: "836px",
          }}
        />

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
      </section>
    );
  }
);

PartnerPromoCtaSection.displayName = "PartnerPromoCtaSection";
export default PartnerPromoCtaSection;
