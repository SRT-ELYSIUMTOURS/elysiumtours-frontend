import React from "react";

const STEPS_BY_CATEGORY = {
  transportation: [
    {
      number: "01",
      title: "Book Online",
      subtitle:
        "Choose your vehicle and route",
    },
    {
      number: "02",
      title: "Get Confirmed",
      subtitle:
        "Receive instant booking confirmation",
    },
    {
      number: "03",
      title: "Driver Picks You Up",
      subtitle:
        "Meet your driver at arrival point",
    },
    {
      number: "04",
      title: "Enjoy Your Ride",
      subtitle:
        "Relax and enjoy the journey",
    },
  ],
  accommodation: [
    {
      number: "01",
      title: "Browse Room Types",
      subtitle:
        "Explore our selection of rooms and suites to find the perfect match for your stay.",
    },
    {
      number: "02",
      title: "Select Your Dates",
      subtitle:
        "Pick check-in and check-out dates. Real-time availability shows exactly what's open.",
    },
    {
      number: "03",
      title: "Book & Pay Securely",
      subtitle:
        "Complete your reservation online with Mobile Money, card, or bank transfer.",
    },
    {
      number: "04",
      title: "Check In & Relax",
      subtitle:
        "Arrive to a ready room and attentive staff — everything is set for your perfect stay.",
    },
  ],
};

const StepCard = ({ step }) => (
  <div className="flex flex-col relative gap-2.5 rounded-[24px] text-center border border-[rgba(254,254,254,0.4)] p-6 md:p-8 lg:py-[52px] lg:px-[76px]">
    <span className="font-raleway absolute top-0 left-0  -translate-1/2 text-Display-2xl-bold  text-primary-light-default/60">
      {step.number}
    </span>
    <h3 className="font-raleway text-[20px] font-bold leading-[1.25] text-white">
      {step.title}
    </h3>
    <p className="font-raleway text-[15px] md:text-nowrap font-normal leading-[1.65] text-[rgba(255,255,255,0.62)]">
      {step.subtitle}
    </p>
  </div>
);

const PartnerHowItWorksSection = ({ category }) => {
  const steps = STEPS_BY_CATEGORY[category];
  if (!steps) return null;

  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="relative w-full overflow-hidden bg-secondary-dark-darker py-[72px] md:py-[96px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
    >
      {/* Decorative blobs — copied from PartnerCtaSection */}
      <div
        className="pointer-events-none absolute top-0  right-0 -translate-y-1/2 translate-x-1/3  h-[818px] w-[329px] rounded-full bg-secondary-light-hover opacity-20 blur-[40px]"
        style={{ transform: "rotate(30.2deg)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0  translate-y-1/2 -translate-x-1/3 h-[818px] w-[329px] rounded-full bg-secondary-light-hover opacity-20 blur-[40px]"
        style={{ transform: "rotate(-149.8deg)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex max-w-[1416px] flex-col items-center gap-12 px-4 sm:px-10 lg:px-[156px]">
        {/* Section header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <h2
            id="how-it-works-heading"
            className="font-raleway text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.15] text-white"
          >
            How Our Service Works
          </h2>
          <p className="font-raleway text-base font-normal text-[rgba(255,255,255,0.65)]">
            Simple. Fast. Reliable.
          </p>
        </div>

        {/* 2 × 2 step cards */}
        <div className="grid w-full max-w-[820px] grid-cols-1 gap-y-[50px] gap-x-[70px] sm:grid-cols-2">
          {steps.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerHowItWorksSection;
