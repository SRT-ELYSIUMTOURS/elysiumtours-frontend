import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/** Success icon from design export — replace when local asset is ready */
const ASSETS = {
  successIcon: "/svg/Tick Circle.svg",
};

function CloseCircleButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-[24px] top-[24px] z-[8] md:right-[30px] md:top-[30px]"
      aria-label="Close"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
      >
        <path
          d="M9.87868 10.1213L14.1213 14.364M9.87868 14.364L14.1213 10.1213M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
          stroke="#7B2CBF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

function ErrorIcon() {
  return (
    <div
      className="flex h-[62px] w-[64px] shrink-0 items-center justify-center rounded-full bg-[#fdf2f2] ring-2 ring-[#f5c6cb]"
      aria-hidden
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path
          d="M18 6L6 18M6 6l12 12"
          stroke="#b91c1c"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/**
 * Result modal after custom-trip form submit — matches promo modal layout (886×507),
 * left panel uses the same purple shell as the ad modal but only the top-right circle
 * photo (no bottom circle, no corner SVG).
 */
export default function CustomTourResultModal({
  isOpen,
  variant = "success",
  onClose,
  onRetry,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const success = variant === "success";

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  const titleId = "custom-tour-result-title";

  return (
    <div
      className="fixed inset-0 z-[265] flex items-center justify-center bg-black/45 p-4 font-raleway"
      role="presentation"
      onClick={handleOverlay}
    >
      <div
        className="relative mx-auto flex w-full max-w-[886px] flex-col overflow-hidden rounded-[30px] bg-white shadow-[0_10px_4px_0_rgba(0,0,0,0.15)] md:h-[507px] md:flex-row md:items-stretch"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left — same structure as ad modal, only top-right circle (no bottom circle / no ctabgTL) */}
        <div className="relative flex min-h-[280px] w-full shrink-0 flex-col overflow-hidden bg-secondary-dark-default md:h-full md:min-h-0 md:w-[423px]">
          <div
            className="pointer-events-none absolute left-0 top-0 z-0 hidden lg:block"
            aria-hidden
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="399" height="507" viewBox="0 0 399 507" fill="none">
  <path d="M-25.537 -114.129C-24.8086 -115.725 -22.5942 -116.438 -20.591 -115.721L323.03 7.18416C325.033 7.90066 326.067 9.7753 325.338 11.3713L-52.8914 840.129C-53.6198 841.725 -55.8342 842.438 -57.8374 841.721L-401.458 718.816C-403.462 718.099 -404.495 716.225 -403.767 714.629L-25.537 -114.129Z" fill="#EBDFF5" fill-opacity="0.1"/>
  <path d="M145.523 245.713C146.325 244.138 148.572 243.486 150.54 244.256L396.603 340.595C398.571 341.366 399.517 343.267 398.714 344.842L157.065 819.16C156.262 820.735 154.016 821.387 152.048 820.616L-94.0153 724.278C-95.9837 723.507 -96.929 721.605 -96.1265 720.03L145.523 245.713Z" fill="#EBDFF5" fill-opacity="0.07"/>
</svg>
          </div>

          <div
            className="pointer-events-none absolute -right-[12%] -top-[3%] z-[1] size-[180px] overflow-hidden rounded-full bg-white lg:block"
            aria-hidden
            style={{ backgroundImage: "url(/homeAssets/circle1.png)" }}
          />

<img
        src="/svg/ctabgTL.svg"
        alt=""
        width={508}
        height={501}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute left-0 bottom-0 z-[0] hidden h-auto w-[min(42vw,360px)] max-w-none -translate-x-[48%] translate-y-[45%] opacity-70 md:block"
        aria-hidden
      />

          <div className="relative z-[2] mx-auto flex w-full max-w-[317px] flex-col gap-3 px-6 pb-10 pt-12 md:mb-0 md:ml-[55px] md:mr-0 md:mt-[159px] md:max-w-[317px] md:px-0 md:pb-0 md:pt-0">
            <div className="flex flex-col gap-3">
              <h2 className="font-raleway text-[clamp(28px,5vw,40px)] font-bold leading-[1.17] text-[#fefefe] md:text-[40px] md:leading-[46.96px]">
                Build Your <br />
                Dream Tour
              </h2>
              <p className="font-raleway text-[14px] font-medium leading-7 text-[#ebdff5]">
                Fill in a few details and one of our local travel experts will
                put together a personalised itinerary usually within 24 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="relative flex min-h-0  min-w-0 flex-1 flex-col items-center justify-center   bg-[#fdf2f2] px-6 pb-8 pt-14 md:px-9 md:pb-10 md:pt-[63px]">
          <CloseCircleButton onClick={onClose} />

          <div
          className="mx-auto mb-3 h-[2px] w-[80%] border border-secondary-normal-default"
          style={{
            opacity: 0.5,
            background: "var(--violet-secondary-30-normal, #7B2CBF)",
            filter: "blur(10px)",
          }}
          aria-hidden
        />

          <div className="flex min-h-0 flex-1 flex-col items-center justify-center  md:max-w-[358px] ">
            <div className="flex w-full max-w-[358px] flex-col items-center gap-4 text-center md:gap-[10px]">
              {success ? (
                <img
                  src={ASSETS.successIcon}
                  alt=""
                  width={64}
                  height={62}
                  className="h-[62px] w-16 shrink-0 object-contain"
                />
              ) : (
                <ErrorIcon />
              )}

              <h3
                id={titleId}
                className="font-raleway text-[28px] font-bold capitalize leading-[32.872px] tracking-[0.9px] text-[#4a1a73]"
              >
                {success ? "Request Sent!" : "Something Went Wrong"}
              </h3>

              <p className="max-w-[266px] font-raleway text-[14px] font-medium leading-[22px] text-[#6f6f6f]">
                {success
                  ? "One of our local travel experts will be in touch within 24 hours with your personalised itinerary."
                  : "We couldn&apos;t send your request. Please check your connection and try again."}
              </p>

              <div className="pt-4">
                {success ? (
                  <button
                    type="button"
                    onClick={() => {
                      onClose?.();
                      navigate("/");
                    }}
                    className="inline-flex h-12 min-w-[156px] cursor-pointer items-center justify-center rounded-[40px] bg-[#622399] px-4 font-raleway text-[13px] font-semibold leading-[18px] text-[#fefefe] shadow-[0_4px_4px_0_rgba(0,0,0,0.05)] transition hover:brightness-105"
                  >
                    Back to Home
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      onClose?.();
                      onRetry?.();
                    }}
                    className="inline-flex h-12 min-w-[156px] cursor-pointer items-center justify-center rounded-[40px] bg-[#622399] px-4 font-raleway text-[13px] font-semibold leading-[18px] text-[#fefefe] shadow-[0_4px_4px_0_rgba(0,0,0,0.05)] transition hover:brightness-105"
                  >
                    Try Again
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
