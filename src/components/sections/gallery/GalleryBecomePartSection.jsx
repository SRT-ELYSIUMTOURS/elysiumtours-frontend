import React from "react";
import { classNames } from "../../../utils/classNames";
import Button from "../../ui/button";

// Gallery "Become Part of the Gallery" / "Share Your Travel Moments"
// Figma: row ~1417px, gap 29px — left 594×631 hero | right column: body (532px max, right-aligned),
// then two tiles 401×337 + 363×337, then Watch Tutorial + Submit Your Photos (bottom-right).

const IMG_HERO =
  "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-05-06/HQfO69TEtC.png";
const IMG_TILE_A =
  "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-05-06/YyPh2sHudY.png";
const IMG_TILE_B =
  "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-05-06/hTbf5HW4mf.png";
const ICON_PLAY =
  "/svg/camera.svg";

const GalleryBecomePartSection = React.forwardRef(
  (
    {
      onUpload,
      onWatchTutorial,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={classNames(
          "relative w-full bg-primary-light-default py-12 lg:py-[80px]",
          className
        )}
        {...props}
      >
        <div className="px-4 md:px-8 lg:px-[156px]">
          {/* Header — eyebrow + title; stacks on mobile */}
          <div className="mb-8 lg:mb-[48px] flex w-full flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-0">
            <div className="flex items-center gap-[8px] pt-[10px]">
              <div className="h-px w-[46px] shrink-0 bg-secondary-dark-darker" />
              <span className="font-raleway text-[13px] font-bold uppercase leading-[18px] tracking-[0.05em] text-secondary-dark-darker">
                SHARE YOUR TRAVEL MOMENTS
              </span>
            </div>
            <div className="flex w-full lg:max-w-[677px] flex-col items-start lg:items-end gap-[16px]">
              <h2 className="w-full lg:max-w-[630px] text-left lg:text-right font-raleway text-[20px] md:text-[25px] font-bold leading-[28px] md:leading-[34px] text-tertiary-normal-default">
                Become Part of the Gallery
              </h2>
            </div>
          </div>

          {/* Main grid — stacks on mobile/tablet, side-by-side on xl+ */}
          <div className="flex w-full flex-col gap-[29px] xl:flex-row xl:items-start xl:gap-[29px]">
            {/* Left — tall image */}
            <div
              className="relative w-full shrink-0 overflow-hidden rounded-[40px] border border-secondary-light-active shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] xl:max-w-[594px]"
              style={{ flex: "594 1 0%" }}
            >
              <img
                src={IMG_HERO}
                alt=""
                className="aspect-594/631 h-auto w-full object-cover"
              />
            </div>

            {/* Right */}
            <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-lg">
              <p className="w-full xl:max-w-[532px] xl:self-end text-left xl:text-right font-raleway text-[14px] md:text-[16px] font-normal leading-[22px] md:leading-[24px] text-tertiary-normal-default">
                Be part of our story. Upload your travel photos, share the memory
                behind them, and see your moments come alive in our community gallery.
                Once approved, your shots will appear in our community gallery for
                other explorers to enjoy.
              </p>

              <div className="flex w-full flex-col gap-[16px] min-[480px]:flex-row min-[480px]:gap-[29px]">
                <div
                  className="relative min-h-0 min-w-0 overflow-hidden rounded-[40px] border border-secondary-light-active shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]"
                  style={{ flex: "401 1 0%" }}
                >
                  <img
                    src={IMG_TILE_A}
                    alt=""
                    className="aspect-401/337 h-auto w-full object-cover"
                  />
                </div>
                <div
                  className="relative min-h-0 min-w-0 overflow-hidden rounded-[40px] border border-secondary-light-active shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] min-[480px]:shrink-0"
                  style={{ flex: "363 1 0%" }}
                >
                  <img
                    src={IMG_TILE_B}
                    alt=""
                    className="aspect-363/337 h-auto w-full object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-start xl:justify-end gap-[16px] pt-[8px]">
                <button
                  type="button"
                  onClick={() => onWatchTutorial?.()}
                  className={classNames(
                    "flex cursor-pointer items-center gap-[16px] border-0 bg-transparent",
                    "font-raleway text-[14px] md:text-[16px] font-semibold leading-[22px] text-tertiary-normal-default",
                    "underline decoration-solid underline-offset-2 transition-opacity hover:opacity-80"
                  )}
                >
                  <span className="relative h-[24px] w-[24px] shrink-0 overflow-hidden">
                    <img
                      src={ICON_PLAY}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </span>
                  Watch Tutorial
                </button>

                <Button
                  variant="secondary"
                  shape="pill"
                  type="button"
                  className="!h-[48px] md:!h-[56px] !rounded-[40px] !px-[24px] md:!px-[32px] font-raleway text-[14px] md:text-[16px] font-semibold leading-[22px] text-primary-light-default shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)]"
                  onClick={() => onUpload?.()}
                >
                  Submit Your Photos
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

GalleryBecomePartSection.displayName = "GalleryBecomePartSection";
export default GalleryBecomePartSection;
