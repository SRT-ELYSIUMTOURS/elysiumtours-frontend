import React, { useEffect, useState } from "react";

/**
 * Partner application — same shell & behaviour as `IdealTripFormModal`:
 * overlay, white card (max-w-[688px], max-h-[90vh]), logo, purple blur line,
 * fixed header, scrollable body (`overflow-y-auto` + `pr-1`), fixed consent + CTA.
 */

const ASSETS = {
  chevron:
    "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-05-06/wXdSFsAw6p.png",
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

const PARTNER_TYPES = [
  "Tour operator",
  "Hotel / accommodation",
  "Restaurant / dining",
  "Transport",
  "Independent guide",
  "Other",
];

const COUNTRIES = [
  "Ghana",
  "Nigeria",
  "Kenya",
  "South Africa",
  "United Kingdom",
  "United States",
  "Canada",
  "Germany",
  "France",
  "Other",
];

const YEAR_OPTIONS = [
  "Less than 1 year",
  "1–3 years",
  "4–10 years",
  "More than 10 years",
];

const CAPACITY_OPTIONS = [
  "1–10 guests / month",
  "11–50 guests / month",
  "51–200 guests / month",
  "200+ guests / month",
];

const PREFERRED_CONTACT = ["Email", "Phone", "WhatsApp", "Any"];

function RequiredLabel({ children, required }) {
  return (
    <span className="font-raleway text-[16px] font-semibold leading-[22px] text-[#4a1a73]">
      {children}
      {required ? <span className="text-[#7b2cbf]"> *</span> : null}
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

function FormSelect({ id, value, onChange, options, placeholder }) {
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
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <span
        className="pointer-events-none absolute right-[14px] top-1/2 h-6 w-6 -translate-y-1/2 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${ASSETS.chevron})` }}
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

export default function PartnerWithUsModal({ onClose, onSubmit, initialEmail = "" }) {
  const [form, setForm] = useState({
    partnerType: "",
    businessName: "",
    country: "",
    yearsOperating: "",
    monthlyCapacity: "",
    website: "",
    registrationNumber: "",
    servicesDescription: "",
    firstName: "",
    lastName: "",
    businessEmail: initialEmail,
    phone: "",
    roleTitle: "",
    preferredContact: "",
    agreeTerms: false,
  });

  const maxDesc = 500;
  const descLen = form.servicesDescription.length;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const set = (field) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: v }));
  };

  const requiredOk =
    form.partnerType &&
    form.businessName.trim() &&
    form.country &&
    form.yearsOperating &&
    form.monthlyCapacity &&
    form.servicesDescription.trim() &&
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.businessEmail.trim() &&
    form.phone.trim() &&
    form.agreeTerms;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!requiredOk) return;
    onSubmit?.(form);
    onClose?.();
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
        aria-labelledby="partner-modal-title"
        onClick={(ev) => ev.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-[23px] top-[24px] z-10 cursor-pointer"
          aria-label="Close partner application"
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
          <div className="flex shrink-0 flex-col items-center gap-4 pb-4 text-center">
            <h2
              id="partner-modal-title"
              className="font-raleway text-[25px] font-bold capitalize leading-[27.5px] text-[#7b2cbf]"
            >
              Apply to Partner With Us
            </h2>
            <p className="max-w-[551px] font-raleway text-[20px] font-medium leading-7 text-[#6b7280]">
              Fill in the details below our team reviews every application
              <br />
              within 5 business days.
            </p>
          </div>

          <form
            className="flex min-h-0 flex-1 flex-col gap-0"
            onSubmit={handleSubmit}
          >
            <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden py-2 pr-1">
              <div className="flex flex-col gap-4 pb-4">
                <SectionHeading>I AM A</SectionHeading>

                <label className="flex flex-col gap-3" htmlFor="partner-type">
                  <RequiredLabel required>Partner Type</RequiredLabel>
                  <FormSelect
                    id="partner-type"
                    value={form.partnerType}
                    onChange={set("partnerType")}
                    options={PARTNER_TYPES}
                    placeholder="Select a partner type"
                  />
                </label>

                <SectionHeading>Business Details</SectionHeading>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-4">
                  <label className="flex flex-col gap-3">
                    <RequiredLabel required>Business Name</RequiredLabel>
                    <FormInput
                      id="partner-business"
                      value={form.businessName}
                      onChange={set("businessName")}
                      placeholder="eg. Volta Adventure ltd"
                    />
                  </label>
                  <label className="flex flex-col gap-3" htmlFor="partner-country">
                    <RequiredLabel required>Country</RequiredLabel>
                    <FormSelect
                      id="partner-country"
                      value={form.country}
                      onChange={set("country")}
                      options={COUNTRIES}
                      placeholder="Select Country"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-4">
                  <label className="flex flex-col gap-3" htmlFor="partner-years">
                    <RequiredLabel required>Years in Operation</RequiredLabel>
                    <FormSelect
                      id="partner-years"
                      value={form.yearsOperating}
                      onChange={set("yearsOperating")}
                      options={YEAR_OPTIONS}
                      placeholder="Select years"
                    />
                  </label>
                  <label className="flex flex-col gap-3" htmlFor="partner-capacity">
                    <RequiredLabel required>Monthly Capacity</RequiredLabel>
                    <FormSelect
                      id="partner-capacity"
                      value={form.monthlyCapacity}
                      onChange={set("monthlyCapacity")}
                      options={CAPACITY_OPTIONS}
                      placeholder="Select capacity"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-4">
                  <label className="flex flex-col gap-3">
                    <span className="font-raleway text-[16px] font-semibold leading-[22px] text-[#4a1a73]">
                      Website / Social
                      <span className="font-raleway text-[13px] font-medium text-[#7b2cbf]">
                        {" "}
                        (optional)
                      </span>
                    </span>
                    <FormInput
                      id="partner-website"
                      type="url"
                      value={form.website}
                      onChange={set("website")}
                      placeholder="https://"
                    />
                  </label>
                  <label className="flex flex-col gap-3">
                    <span className="font-raleway text-[16px] font-semibold leading-[22px] text-[#4a1a73]">
                      Reg. Number
                      <OptionalSuffix />
                    </span>
                    <FormInput
                      id="partner-reg"
                      value={form.registrationNumber}
                      onChange={set("registrationNumber")}
                      placeholder="Business registration ID"
                    />
                  </label>
                </div>

                <div className="flex flex-col gap-3">
                  <RequiredLabel required>
                    Describe Your Services &amp; Offerings
                  </RequiredLabel>
                  <div className="flex flex-col gap-0.5">
                    <div className="relative min-h-[131px] overflow-hidden rounded-[12px] border border-[#e2d4f0] bg-[#fefefe]">
                      <textarea
                        id="partner-services"
                        value={form.servicesDescription}
                        maxLength={maxDesc}
                        onChange={set("servicesDescription")}
                        placeholder="Tell us about your tours, speciality, languages offered, unique experience"
                        rows={5}
                        className="min-h-[131px] w-full resize-y bg-transparent px-[15px] py-[19px] font-raleway text-[13px] font-medium leading-[22px] text-[#565656] outline-none placeholder:text-[#949494]"
                      />
                    </div>
                    <div className="flex justify-end">
                      <span className="font-raleway text-[13px] font-medium leading-[22px] text-[#949494]">
                        {descLen}/{maxDesc}
                      </span>
                    </div>
                  </div>
                </div>

                <SectionHeading>Contact Person</SectionHeading>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-4">
                  <label className="flex flex-col gap-3">
                    <RequiredLabel required>First Name</RequiredLabel>
                    <FormInput
                      id="partner-first"
                      value={form.firstName}
                      onChange={set("firstName")}
                      placeholder="First name"
                    />
                  </label>
                  <label className="flex flex-col gap-3">
                    <RequiredLabel required>Last Name</RequiredLabel>
                    <FormInput
                      id="partner-last"
                      value={form.lastName}
                      onChange={set("lastName")}
                      placeholder="Last name"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-4">
                  <label className="flex flex-col gap-3" htmlFor="partner-email">
                    <span className="font-raleway text-[16px] font-semibold leading-[22px] text-[#7b2cbf]">
                      Business Email<span className="text-[#7b2cbf]"> *</span>
                    </span>
                    <FormInput
                      id="partner-email"
                      type="email"
                      value={form.businessEmail}
                      onChange={set("businessEmail")}
                      placeholder="you@business.com"
                    />
                  </label>
                  <label className="flex flex-col gap-3">
                    <RequiredLabel required>Phone / WhatsApp</RequiredLabel>
                    <FormInput
                      id="partner-phone"
                      type="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="+233 …"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-4">
                  <label className="flex flex-col gap-3">
                    <span className="font-raleway text-[16px] font-semibold leading-[22px] text-[#4a1a73]">
                      Role / Title
                      <span className="font-raleway text-[13px] font-medium text-[#7b2cbf]">
                        {" "}
                        (optional)
                      </span>
                    </span>
                    <FormInput
                      id="partner-role"
                      value={form.roleTitle}
                      onChange={set("roleTitle")}
                      placeholder="eg. Founder, Manager"
                    />
                  </label>
                  <label className="flex flex-col gap-3" htmlFor="partner-pref">
                    <span className="font-raleway text-[16px] font-semibold leading-[22px] text-[#4a1a73]">
                      Preferred Contact
                      <OptionalSuffix />
                    </span>
                    <FormSelect
                      id="partner-pref"
                      value={form.preferredContact}
                      onChange={set("preferredContact")}
                      options={PREFERRED_CONTACT}
                      placeholder="Select your preferences"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-4 pt-2">
              <label className="flex cursor-pointer gap-3 rounded-[12px] border border-secondary-light-active bg-[#EBDFF5]/30 p-3 sm:px-[10px] sm:py-[13px]">
                <input
                  type="radio"
                  checked={form.agreeTerms}
                  onChange={set("agreeTerms")}
                  className="mt-1 h-6 w-6 shrink-0 cursor-pointer rounded border-[#d6beeb] text-[#7b2cbf] accent-[#7b2cbf]"
                />
                <span className="font-raleway text-[13px] font-medium leading-[22px] text-[#565656]">
                  I confirm the information provided is accurate and I agree to Elysium
                  Tours&apos;{" "}
                  <span className="font-semibold text-[#7b2cbf] underline">
                    Partner Terms &amp; Conditions
                  </span>{" "}
                  and{" "}
                  <span className="font-semibold text-[#7b2cbf] underline">
                    Privacy Policy.
                  </span>
                </span>
              </label>

              <button
                type="submit"
                disabled={!requiredOk}
                className="flex h-16 w-full cursor-pointer items-center justify-center rounded-[40px] bg-[#7b2cbf] font-raleway text-[20px] font-semibold leading-7 text-[#fefefe] shadow-[0_4px_4px_0_rgba(0,0,0,0.05)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:bg-[#d6beeb] disabled:hover:brightness-100"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
