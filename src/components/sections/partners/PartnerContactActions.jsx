import React from "react";

// ── Icons (inline SVG — no extra assets needed) ───────────────────────────────

const EnvelopeIcon = () => (
  <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
    <rect x="1" y="1" width="16" height="12" rx="2" stroke="white" strokeWidth="1.6" />
    <path d="M1 4L9 8.5L17 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
    <circle cx="11" cy="11" r="9" stroke="#7b2cbf" strokeWidth="1.5" />
    <ellipse cx="11" cy="11" rx="4" ry="9" stroke="#7b2cbf" strokeWidth="1.5" />
    <path d="M2 11H20" stroke="#7b2cbf" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M2 7H20M2 15H20" stroke="#7b2cbf" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
    <path
      d="M3.5 2H6.5L8 5.5L6 7C7.06 9.15 8.85 10.94 11 12L12.5 10L16 11.5V14.5C16 15.33 15.33 16 14.5 16C7.6 16 2 10.4 2 3.5C2 2.67 2.67 2 3.5 2Z"
      stroke="#7b2cbf"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LocationPinIcon = () => (
  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" aria-hidden>
    <path
      d="M9 1C5.69 1 3 3.69 3 7C3 11.5 9 19 9 19C9 19 15 11.5 15 7C15 3.69 12.31 1 9 1Z"
      stroke="#7b2cbf"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="9" cy="7" r="2" stroke="#7b2cbf" strokeWidth="1.5" />
  </svg>
);

// ── Build items from partner contact data ─────────────────────────────────────

function buildContactItems(partner) {
  if (!partner?.contact) return [];
  const { email, phone, website, address } = partner.contact;
  const items = [];

  if (email) {
    items.push({
      id:          "email",
      title:       "Email Us",
      value:       email,
      href:        `mailto:${email}`,
      iconBg:      "bg-secondary-normal-default",
      icon:        <EnvelopeIcon />,
      borderClass: "border-[#c08feb]",
    });
  }
  if (website) {
    items.push({
      id:          "website",
      title:       "Visit Website",
      value:       website.replace(/^https?:\/\//, ""),
      href:        website.startsWith("http") ? website : `https://${website}`,
      iconBg:      "bg-secondary-light-hover",
      icon:        <GlobeIcon />,
      borderClass: "border-secondary-light-active",
    });
  }
  if (phone) {
    items.push({
      id:          "phone",
      title:       "Phone",
      value:       phone,
      href:        `tel:${phone}`,
      iconBg:      "bg-secondary-light-hover",
      icon:        <PhoneIcon />,
      borderClass: "border-secondary-light-active",
    });
  }
  if (address) {
    items.push({
      id:          "location",
      title:       "Location",
      value:       address,
      href:        `https://maps.google.com/?q=${encodeURIComponent(address)}`,
      iconBg:      "bg-secondary-light-hover",
      icon:        <LocationPinIcon />,
      borderClass: "border-secondary-light-active",
    });
  }
  return items;
}

// ── Component ─────────────────────────────────────────────────────────────────

const PartnerContactActions = ({ partner }) => {
  const items = buildContactItems(partner);
  if (items.length === 0) return null;

  return (
    <section
      aria-label="Contact actions"
      className="flex flex-wrap gap-4 lg:gap-[50px] items-start"
    >
      {items.map((item) => (
        <a
          key={item.id}
          href={item.href}
          target={item.id === "email" || item.id === "phone" ? "_self" : "_blank"}
          rel="noopener noreferrer"
          aria-label={`${item.title}: ${item.value}`}
          className={`flex items-center gap-[17px] p-3 rounded-xl border-[1.5px] border-solid min-w-[220px] max-w-[260px] transition-opacity hover:opacity-80 ${item.borderClass}`}
        >
          {/* Icon circle */}
          <span className={`flex-shrink-0 w-[50px] h-[50px] rounded-full flex items-center justify-center ${item.iconBg}`}>
            {item.icon}
          </span>

          {/* Text */}
          <span className="flex flex-col items-start gap-[3px] min-w-0">
            <span className="font-raleway font-semibold text-base text-tertiary-normal-default leading-[22px] whitespace-nowrap">
              {item.title}
            </span>
            <span className="font-raleway font-medium text-xs text-[#555555] leading-[18px] truncate max-w-[160px]">
              {item.value}
            </span>
          </span>
        </a>
      ))}
    </section>
  );
};

export default PartnerContactActions;
