import React, { useEffect } from "react";

/**
 * “Customize Your Tour” promo modal — layout from design export.
 * Replace ASSETS URLs with local `/public` images when ready.
 */
const ASSETS = {
  leftPanelBg:
    "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-05-05/dudKjJBGxn.png",
  close:
    "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-05-05/dKbtEMECLb.png",
  titleUnderline:
    "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-05-05/0nccyVKgJA.png",
  iconFlexibleDates:
    "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-05-05/U63hiMYrnP.png",
  iconGroupSize:
    "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-05-05/ZfKWR5nWTG.png",
  iconInterests:
    "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-05-05/mgMBJ6g9s0.png",
};

const CUSTOMISE_ITEMS = [
  {
    title: "Flexible Dates",
    body: (
      <>
        Pick any date range that works for your schedule — we&apos;ll match
        available guides and accommodation.
      </>
    ),
  },
  {
    title: "Group Size",
    body: "Solo, couple, family or large group — every package can be scaled and priced accordingly.",
    weight: "medium",
  },
  {
    title: "Interests & Theme",
    body: "Heritage, food, wildlife, music, business or beach — your tour, your story.",
  },
];

const CustomizeTourModal = React.forwardRef(({ onClose, onGetStarted }, ref) => {
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
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        className="relative mx-auto flex h-fit lg:min-h-[640px] w-full max-w-[886px] flex-col overflow-hidden rounded-[30px] bg-white shadow-[0_10px_4px_0_rgba(0,0,0,0.15)] md:h-[640px] md:flex-row"
        role="dialog"
        aria-modal="true"
        aria-labelledby="customize-tour-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left — purple panel */}
        <div
          className="relative flex min-h-[320px] bg-secondary-dark-default shrink-0 flex-col overflow-hidden md:h-full md:min-h-0 w-[423px]"
        
        >
          <div
        className="pointer-events-none absolute top-0 right-0 z-[0]   lg:block"
        aria-hidden
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="423" height="640" viewBox="0 0 423 640" fill="none">
  <path d="M68.463 -114.129C69.1914 -115.725 71.4058 -116.438 73.409 -115.721L417.03 7.18416C419.033 7.90066 420.067 9.7753 419.338 11.3713L41.1086 840.129C40.3802 841.725 38.1658 842.438 36.1626 841.721L-307.458 718.816C-309.462 718.099 -310.495 716.225 -309.767 714.629L68.463 -114.129Z" fill="#EBDFF5" fill-opacity="0.1"/>
  <path d="M239.523 245.713C240.325 244.138 242.572 243.486 244.54 244.256L490.603 340.595C492.571 341.366 493.517 343.267 492.714 344.842L251.065 819.16C250.262 820.735 248.016 821.387 246.048 820.616L-0.0152588 724.278C-1.9837 723.507 -2.92896 721.605 -2.1265 720.03L239.523 245.713Z" fill="#EBDFF5" fill-opacity="0.07"/>
</svg>
</div>
{/* top right circle */}
<div
        className="pointer-events-none size-[180px] rounded-full overflow-hidden absolute -top-[3%] -right-[12%] z-[1] bg-white   lg:block"
        aria-hidden
        style={{backgroundImage: `url(/homeAssets/circle1.png)`}}
      />
      <img
        src="/svg/ctabgTL.svg"
        alt=""
        width={508}
        height={501}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute right-0 top-0 z-[0] hidden h-auto w-[min(42vw,360px)] max-w-none translate-x-[50%] -translate-y-[35%] opacity-70 md:block"
        aria-hidden
      />
      

      {/* bottom left circle */}
<div
        className="pointer-events-none size-[180px] rounded-full absolute -left-[3%] -bottom-[12%]  z-[0]   lg:block"
        aria-hidden
        style={{backgroundImage: `url(/homeAssets/circle2.png)`}}
      />

          <div className="relative z-[2] mx-auto flex w-full max-w-[317px] flex-col gap-2 px-6 pb-10 pt-12 md:mb-0 md:ml-[55px] md:mr-0 md:mt-[204px] md:max-w-[317px] md:px-0 md:pb-0 md:pt-0">
            <div className="relative z-[3] inline-flex h-8 w-[122px] shrink-0 items-center rounded-[40px] border border-[rgba(201,168,76,0.4)] bg-[rgba(201,168,76,0.18)] px-3">
              <span className="text-left font-raleway text-[10.5px] font-bold uppercase leading-3 tracking-[0.84px] text-[#ffcc00]">
                ✦ New Feature
              </span>
            </div>
            <div className="relative z-[5] flex flex-col gap-3 self-stretch">
              <h2
                id="customize-tour-modal-title"
                className="font-raleway text-[clamp(28px,5vw,40px)] font-bold leading-[1.17] text-[#fefefe] md:h-[94px] md:text-[40px] md:leading-[46.96px]"
              >
                Customize
                <br />
                Your Tour
              </h2>
              <p className="font-raleway text-[14px] font-medium leading-7 text-[#ebdff5] md:h-[84px]">
                Can&apos;t find exactly what you&apos;re looking for? Tell us your
                dream itinerary and we&apos;ll build it around your dates,
                interests, group size, budget and all.
              </p>
            </div>
          </div>
        </div>

        {/* Right — light panel */}
        <div className="relative flex min-h-0 min-w-0 flex-1 flex-col bg-[#fdf2f2] px-6 pb-8 pt-14 md:px-9 md:pb-10 md:pt-[63px]">
          <button
            type="button"
            onClick={onClose}
            className="absolute cursor-pointer right-[24px] top-[24px] z-[8] h-6 w-6 shrink-0 overflow-hidden bg-cover bg-no-repeat transition-opacity hover:opacity-80 md:right-[30px] md:top-[30px]"
            aria-label="Close customize tour modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M9.87868 10.1213L14.1213 14.364M9.87868 14.364L14.1213 10.1213M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#7B2CBF" stroke-width="1.5" stroke-linecap="round"/>
</svg>
</button>

          <div className="flex min-h-0 flex-1 flex-col items-stretch gap-6 md:ml-auto md:w-[358px] md:max-w-[358px]">
            <div className="flex flex-col items-center gap-3">
               {/* purble element */}
        <div
          className="w-[80%] mb-3 mx-auto h-[2px] border border-secondary-normal-default"
          style={{
            opacity: 0.5,
            background: "var(--violet-secondary-30-normal, #7B2CBF)",
            filter: "blur(10px)",
          }}
        />
              <h3 className="text-center font-raleway text-[20px] font-bold capitalize leading-[23px] text-[#4a1a73]">
                What you can customise
              </h3>
            </div>

            <div className="flex flex-col gap-4">
              {CUSTOMISE_ITEMS.map(({ icon, title, body, weight }) => (
                <div
                  key={title}
                  className="flex min-h-[67px] gap-3 md:gap-[12px]"
                >
                  <div
                    className="h-9 w-9 shrink-0 rounded-[10px] bg-[#F3E8FF] border border-[#E2D4F0]"
                  
                    aria-hidden
                  />
                  <div className="flex min-w-0 flex-col gap-2">
                    <span className="font-raleway text-[13px] font-bold leading-[15px] text-[#364153]">
                      {title}
                    </span>
                    <span
                      className={`font-raleway text-[12px] leading-[18px] text-[#6b7280] ${
                        weight === "medium" ? "font-medium" : "font-normal"
                      }`}
                    >
                      {body}
                    </span>
                  </div>
                </div>
              ))}

              <div
                className="h-px w-full shrink-0 bg-[#e2d4f0]"
                aria-hidden
              />

              <blockquote className="rounded-[10px] border-l-4 border-[#622399] bg-[#f9fafb] px-4 py-[15px]">
                <p className="font-raleway text-[12px] font-medium italic leading-[19.2px] text-[#6b7280]">
                  &ldquo;Elysium built us a completely bespoke family heritage
                  tour across Ghana and Benin in under 48 hours. Absolutely
                  seamless.&rdquo;
                </p>
                <footer className="mt-4 flex items-center gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#622399]">
                    <span className="font-[Inter,sans-serif] text-[11px] font-bold leading-none text-white">
                      AK
                    </span>
                  </div>
                  <cite className="not-italic font-raleway text-[11px] font-semibold leading-[13px] text-[#364153]">
                    Ama K. — Diaspora traveller, London
                  </cite>
                </footer>
              </blockquote>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => {
                    onClose?.();
                    onGetStarted?.();
                  }}
                  className="inline-flex h-12 min-w-[156px] cursor-pointer items-center justify-center rounded-[40px] bg-[#622399] px-4 font-raleway text-[13px] font-semibold leading-[18px] text-[#fefefe] shadow-[0_4px_4px_0_rgba(0,0,0,0.05)] transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#622399]"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

CustomizeTourModal.displayName = "CustomizeTourModal";

export default CustomizeTourModal;
