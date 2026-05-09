import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/** Design assets — replace with local `/public` files when ready */
const ASSETS = {
  chevronDestination:
    "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-05-05/G0SFzAjXjY.png",
  chevronGroup:
    "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-05-05/kok90TErLD.png",
  chevronMonth:
    "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-05-05/JjqYB8cqVP.png",
  chevronDuration:
    "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-05-05/kBMz2FV5XX.png",
};

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke="#9b8aab"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

function ModalLogo() {
  return (
    <img
      src="/ElysiumAssets/Logo.png"
      alt="Elysium"
      className="h-[93px] w-[142px] object-contain"
    />
  );
}

const INTEREST_TAGS = [
  "Heritage",
  "Food & Cuisine",
  "Business",
  "Music & Culture",
  "Wildlife",
  "Beach & Nature",
  "Photography",
  "Religious",
];

const DESTINATION_OPTIONS = [
  "",
  "Ghana",
  "Benin",
  "Togo",
  "Senegal",
  "Other",
];

const GROUP_OPTIONS = ["", "Solo", "2–5", "6–10", "11–20", "20+"];

const MONTH_OPTIONS = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DURATION_OPTIONS = [
  "",
  "Not sure yet",
  "Under 1 week",
  "1–2 weeks",
  "2–3 weeks",
  "3+ weeks",
];

function RequiredLabel({ children, required }) {
  return (
    <span className="font-raleway text-[16px] font-semibold leading-[22px] text-[#4a1a73]">
      {children}
      {required ? (
        <span className="text-[#7b2cbf]"> *</span>
      ) : null}
    </span>
  );
}

function OptionalSuffix() {
  return (
    <span className="font-raleway text-[13px] font-normal leading-[22px] text-[#4a1a73]">
      {" "}
      (optional)
    </span>
  );
}

function FormInput({ value, onChange, placeholder, type = "text", id }) {
  const [focused, setFocused] = useState(false);
  const borderColor = focused ? "#7b2cbf" : "#e2d4f0";
  const shadow = focused ? "0 0 4px 0 #7b2cbf" : "none";

  return (
    <div
      className="relative h-14 shrink-0 overflow-hidden rounded-[12px] bg-[#fefefe]"
      style={{
        border: `1px solid ${borderColor}`,
        boxShadow: shadow,
        transition: "border-color 0.15s, box-shadow 0.15s",
      }}
    >
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="absolute inset-0 bg-transparent pl-[15px] pr-[15px] font-raleway text-[13px] font-medium text-[#565656] outline-none placeholder:text-[#949494] placeholder:font-medium"
      />
    </div>
  );
}

function FormSelect({
  id,
  value,
  onChange,
  options,
  placeholder,
  chevronSrc,
}) {
  const [focused, setFocused] = useState(false);
  const borderColor = focused ? "#7b2cbf" : "#e2d4f0";
  const shadow = focused ? "0 0 4px 0 #7b2cbf" : "none";

  return (
    <div
      className="relative h-14 shrink-0 overflow-hidden rounded-[12px] bg-[#fefefe]"
      style={{
        border: `1px solid ${borderColor}`,
        boxShadow: shadow,
        transition: "border-color 0.15s, box-shadow 0.15s",
      }}
    >
      <select
        id={id}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="absolute inset-0 w-full cursor-pointer appearance-none bg-transparent py-0 pl-[14px] pr-12 font-raleway text-[13px] font-medium text-[#565656] outline-none"
      >
        <option value="">{placeholder}</option>
        {options
          .filter((o) => o)
          .map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
      </select>
      <span
        className="pointer-events-none absolute right-[14px] top-1/2 h-6 w-6 -translate-y-1/2 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${chevronSrc})` }}
        aria-hidden
      />
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <div className="flex items-center gap-3 self-stretch">
      <span className="shrink-0 font-raleway text-[13px] font-semibold leading-[18px] text-[#7b2cbf]">
        {children}
      </span>
      <div className="h-px min-w-0 flex-1 bg-[#ebdff5]" />
    </div>
  );
}

/**
 * “Tell us about your ideal trip” — matches AuthModal shell: logo, blur line,
 * title, scrollable form body, fixed consent + CTA.
 */
export default function IdealTripFormModal({ isOpen, onClose, onComplete }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [destination, setDestination] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [travelMonth, setTravelMonth] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [interests, setInterests] = useState(() => new Set());
  const [consent, setConsent] = useState(false);

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

  const toggleInterest = (tag) => {
    setInterests((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const maxNotes = 500;
  const notesLen = notes.length;

  const requiredOk =
    firstName.trim() &&
    lastName.trim() &&
    email.trim() &&
    destination &&
    groupSize &&
    consent;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!requiredOk) return;
    try {
      // Replace with real API call; throw on failure to show error result modal.
      await new Promise((r) => setTimeout(r, 450));
      onComplete?.("success");
    } catch {
      onComplete?.("error");
    }
  };

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <div
      className="fixed inset-0 z-[260] flex items-center justify-center p-4 font-raleway"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      onClick={handleOverlay}
      role="presentation"
    >
      <div
        className="relative mx-4 flex max-h-[90vh] w-full max-w-[688px] flex-col overflow-hidden rounded-[30px] bg-white"
        style={{
          boxShadow: "0 10px 4px 0 rgba(0,0,0,0.15)",
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ideal-trip-modal-title"
        onClick={(ev) => ev.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-[23px] top-[24px] z-10 cursor-pointer"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        <div className="flex shrink-0 justify-center pb-2 pt-6">
          <ModalLogo />
        </div>

        <div
          className="mx-auto mb-3 h-[2px] w-[80%] border border-secondary-normal-default"
          style={{
            opacity: 0.5,
            background: "var(--violet-secondary-30-normal, #7B2CBF)",
            filter: "blur(10px)",
          }}
          aria-hidden
        />

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-6 pb-8 sm:px-[52px]">
          {/* Header — fixed */}
          <div className="flex shrink-0 flex-col items-center gap-4 pb-4 text-center">
            <h2
              id="ideal-trip-modal-title"
              className="font-raleway text-[25px] font-bold capitalize leading-[27.5px] text-[#7b2cbf]"
            >
              Tell us about your ideal trip
            </h2>
            <p className="max-w-[501px] font-raleway text-[20px] font-medium leading-7 text-[#6b7280]">
              No commitment — just ideas. We&apos;ll take it from there.
            </p>
          </div>

          <form
            className="flex min-h-0 flex-1 flex-col gap-0"
            onSubmit={handleSubmit}
          >
            {/* Scrollable fields */}
            <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden py-2 pr-1">
              <div className="flex flex-col gap-4 pb-4">
                <SectionHeading>Personal Details</SectionHeading>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-4">
                  <div className="flex flex-col gap-3">
                    <label className="flex flex-col gap-1">
                      <RequiredLabel required>First Name</RequiredLabel>
                      <FormInput
                        id="ideal-first"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="eg. Volta Adventure ltd"
                      />
                    </label>
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="flex flex-col gap-1">
                      <RequiredLabel required>Last Name</RequiredLabel>
                      <FormInput
                        id="ideal-last"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="eg. Mensah"
                      />
                    </label>
                  </div>
                </div>

                <label className="flex flex-col gap-3">
                  <RequiredLabel required>Email Address</RequiredLabel>
                  <FormInput
                    id="ideal-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="eg. davidaone@gmail.com"
                  />
                </label>

                <SectionHeading>Trip Details</SectionHeading>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-4">
                  <div className="flex flex-col gap-3">
                    <label className="flex flex-col gap-1" htmlFor="ideal-dest">
                      <span className="font-raleway text-[16px] font-semibold leading-[22px] text-[#4a1a73]">
                        Destination<span className="text-[#7b2cbf]">*</span>
                      </span>
                      <FormSelect
                        id="ideal-dest"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        options={DESTINATION_OPTIONS}
                        placeholder="Select Country"
                        chevronSrc={ASSETS.chevronDestination}
                      />
                    </label>
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="flex flex-col gap-1" htmlFor="ideal-group">
                      <span className="font-raleway text-[16px] font-semibold leading-[22px] text-[#4a1a73]">
                        Group Size<span className="text-[#7b2cbf]">*</span>
                      </span>
                      <FormSelect
                        id="ideal-group"
                        value={groupSize}
                        onChange={(e) => setGroupSize(e.target.value)}
                        options={GROUP_OPTIONS}
                        placeholder="Select group size"
                        chevronSrc={ASSETS.chevronGroup}
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-4">
                  <div className="flex flex-col gap-3">
                    <label className="flex flex-col gap-1" htmlFor="ideal-month">
                      <span className="font-raleway text-[16px] font-semibold leading-[22px] text-[#4a1a73]">
                        Travel Month
                        <OptionalSuffix />
                      </span>
                      <FormSelect
                        id="ideal-month"
                        value={travelMonth}
                        onChange={(e) => setTravelMonth(e.target.value)}
                        options={MONTH_OPTIONS}
                        placeholder="Select month"
                        chevronSrc={ASSETS.chevronMonth}
                      />
                    </label>
                  </div>
                  <div className="flex flex-col gap-3">
                    <label
                      className="flex flex-col gap-1"
                      htmlFor="ideal-duration"
                    >
                      <span className="font-raleway text-[16px] font-semibold leading-[22px] text-[#4a1a73]">
                        Trip Duration
                        <OptionalSuffix />
                      </span>
                      <FormSelect
                        id="ideal-duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        options={DURATION_OPTIONS}
                        placeholder="Not sure yet"
                        chevronSrc={ASSETS.chevronDuration}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="font-raleway text-[16px] font-semibold leading-[22px] text-[#4a1a73]" htmlFor="ideal-notes">
                    Anything specific you&apos;d like?
                    <OptionalSuffix />
                  </label>
                  <div className="flex flex-col gap-0.5">
                    <div
                      className="relative min-h-[131px] overflow-hidden rounded-[12px] border border-[#e2d4f0] bg-[#fefefe]"
                    >
                      <textarea
                        id="ideal-notes"
                        value={notes}
                        maxLength={maxNotes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Tell us about your tours, speciality, languages offered, unique experience"
                        rows={5}
                        className="min-h-[131px] w-full resize-y bg-transparent px-[15px] py-[19px] font-raleway text-[13px] font-medium leading-[22px] text-[#565656] outline-none placeholder:text-[#949494]"
                      />
                    </div>
                    <div className="flex justify-end">
                      <span className="font-raleway text-[13px] font-medium leading-[22px] text-[#949494]">
                        {notesLen}/{maxNotes}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <span className="font-raleway text-[16px] font-semibold leading-[21px] text-[#4a1a73]">
                    Interests <OptionalSuffix />
                  </span>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {INTEREST_TAGS.map((tag) => {
                      const selected = interests.has(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleInterest(tag)}
                          className={`rounded-[40px] border px-2 py-1.5 font-raleway text-[12px] font-medium leading-[14px] transition-colors ${
                            selected
                              ? "border-[#7b2cbf] bg-[#f3e8ff] text-[#4a1a73]"
                              : "border-[#e2d4f0] bg-[#f9fafb] text-[#6f6f6f]"
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Fixed footer: consent + submit */}
            <div className="flex shrink-0 flex-col gap-4 pt-2">
              <label className="flex cursor-pointer gap-3 rounded-[12px] border border-secondary-light-active bg-[#EBDFF5]/30 p-3 sm:px-[10px] sm:py-[13px]">
                <input
                  type="radio"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-6 w-6 shrink-0 cursor-pointer rounded border-[#d6beeb] text-[#7b2cbf] accent-[#7b2cbf]"
                />
                <span className="font-raleway text-[13px] font-medium leading-[22px] text-[#565656]">
                  I agree to Elysium Tours&apos;{" "}
                  <Link
                    to="/contact"
                    className="font-semibold text-[#7b2cbf] underline"
                    onClick={onClose}
                  >
                    Privacy Policy
                  </Link>{" "}
                  and consent to being contacted about my enquiry.
                </span>
              </label>

              <button
                type="submit"
                disabled={!requiredOk}
                className="flex h-16 w-full cursor-pointer items-center justify-center rounded-[40px] bg-[#7b2cbf] font-raleway text-[20px] font-semibold leading-7 text-[#fefefe] shadow-[0_4px_4px_0_rgba(0,0,0,0.05)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:bg-[#d6beeb] disabled:hover:brightness-100"
              >
                Send My Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
