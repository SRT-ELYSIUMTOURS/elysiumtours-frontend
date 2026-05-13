import React from "react";
import { classNames } from "../../utils/classNames";

/**
 * Meet the Experts / guide spotlight — purple gradient, violet glow, white blur
 * behind photo, frosted title strip. Used on tour-by-country (LocalGuidesSection)
 * and tour partners guides row; pass layout via `className`, optional `onClick`
 * for partner hub cards.
 */
const GuideSpotlightCard = React.forwardRef(
  (
    {
      image,
      title,
      alt,
      onClick,
      className = "",
      ...props
    },
    ref
  ) => {
    const interactive = typeof onClick === "function";

    return (
      <div
        ref={ref}
        role={interactive ? "button" : undefined}
        tabIndex={interactive ? 0 : undefined}
        onClick={onClick}
        onKeyDown={
          interactive
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onClick?.(e);
                }
              }
            : undefined
        }
        className={classNames(
          "relative shrink-0 overflow-clip rounded-md border border-secondary-light-default",
          "bg-[linear-gradient(203deg,var(--color-secondary-dark-darker)_14.88%,rgb(108_38_169)_122.89%)]",
          "shadow-[var(--shadow-card)]",
          interactive &&
            "cursor-pointer transition-all duration-300 ease-in hover:shadow-xl group",
          className
        )}
        {...props}
      >
        <div
          className="pointer-events-none absolute left-[-63.5px] top-[267.5px] h-[324px] w-[455px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(108,38,169,0.75)_0%,rgba(108,38,169,0.3)_45%,transparent_70%)]"
          aria-hidden
        />
        <div className="relative z-0 h-full w-full">
          <div className="absolute left-1/2 top-1/2 z-0 h-[324px] w-[455px] -translate-x-1/2 bg-secondary-light-default blur-[50px] rounded-4xl" />
          <img
            src={image}
            alt={alt ?? title ?? "Guide"}
            className="relative z-10 h-full w-full object-cover object-top"
          />
        </div>
        <div className="absolute left-1/2 top-[385.5px] h-[182px] w-full -translate-x-1/2">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full bg-[rgba(153,153,153,0.16)] backdrop-blur-[20px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_30%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_30%)]"
          />
          <div className="absolute left-[31px] right-[31px] top-[calc(50%+18px)] h-[86px] -translate-y-1/2">
            <p className="m-0 text-High-md-bold leading-[34px] text-primary-normal-default">
              {title}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

GuideSpotlightCard.displayName = "GuideSpotlightCard";
export default GuideSpotlightCard;
