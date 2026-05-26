import React, { useEffect } from "react";

// ── Icons ─────────────────────────────────────────────────────────────────────
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M18 6L6 18M6 6l12 12" stroke="#565656" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const PlaneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="M17 10L11 4l-1.5 1.5 2.5 2.5H3v2h9L9.5 12.5 11 14l6-4z" stroke="#7b2cbf" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 15h8" stroke="#7b2cbf" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const HotelIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <rect x="2" y="8" width="16" height="10" rx="1" stroke="#7b2cbf" strokeWidth="1.3" />
    <path d="M10 2l8 6H2l8-6z" stroke="#7b2cbf" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="8" y="13" width="4" height="5" rx="0.5" stroke="#7b2cbf" strokeWidth="1.2" />
  </svg>
);

const RouteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <circle cx="4" cy="5" r="2" stroke="#7b2cbf" strokeWidth="1.3" />
    <circle cx="16" cy="15" r="2" stroke="#7b2cbf" strokeWidth="1.3" />
    <path d="M4 7c0 3 3 4 6 4s6 1 6 4" stroke="#7b2cbf" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <circle cx="10" cy="10" r="8" stroke="#7b2cbf" strokeWidth="1.3" />
    <path d="M10 6v4l2.5 2" stroke="#7b2cbf" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <rect x="2" y="7" width="16" height="11" rx="1.5" stroke="#7b2cbf" strokeWidth="1.3" />
    <path d="M7 7V5.5A1.5 1.5 0 0 1 8.5 4h3A1.5 1.5 0 0 1 13 5.5V7M2 12h16" stroke="#7b2cbf" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <rect x="2" y="4" width="16" height="14" rx="1.5" stroke="#7b2cbf" strokeWidth="1.3" />
    <path d="M2 8h16M7 2v4M13 2v4" stroke="#7b2cbf" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const TimerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <circle cx="10" cy="11" r="7" stroke="#7b2cbf" strokeWidth="1.3" />
    <path d="M10 8v3l2 1.5M8 2h4M10 2v2" stroke="#7b2cbf" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const MapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="M1 4l6-2 6 2 5-2v14l-5 2-6-2-6 2V4z" stroke="#7b2cbf" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 2v14M13 4v14" stroke="#7b2cbf" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const WifiIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="M2.5 8.5C5.5 5.5 14.5 5.5 17.5 8.5M5.5 11.5C7.17 9.83 12.83 9.83 14.5 11.5M8.5 14.5C9.33 13.67 10.67 13.67 11.5 14.5" stroke="#7b2cbf" strokeWidth="1.3" strokeLinecap="round" />
    <circle cx="10" cy="16.5" r="0.8" fill="#7b2cbf" />
  </svg>
);

const BedIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="M2 14V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5M2 14h16M2 14v2M18 14v2" stroke="#7b2cbf" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M5 7V5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2" stroke="#7b2cbf" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="M10 2L3 5v5c0 4 3.5 7.5 7 8.5C16.5 17.5 17 11 17 10V5l-7-3z" stroke="#7b2cbf" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <circle cx="10" cy="10" r="8" stroke="#7b2cbf" strokeWidth="1.3" />
    <path d="M7 10l2 2 4-4" stroke="#7b2cbf" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ServiceIcon = ({ text }) => {
  const t = text.toLowerCase();
  if (t.includes("airport") || t.includes("pickup") || t.includes("drop-off") || t.includes("flight")) return <PlaneIcon />;
  if (t.includes("hotel") || t.includes("transfer")) return <HotelIcon />;
  if (t.includes("city") || t.includes("custom route") || t.includes("route")) return <RouteIcon />;
  if (t.includes("24/7") || t.includes("availab") || t.includes("hourly")) return <ClockIcon />;
  if (t.includes("corporate") || t.includes("business")) return <BriefcaseIcon />;
  if (t.includes("event")) return <CalendarIcon />;
  if (t.includes("rental") || t.includes("timer")) return <TimerIcon />;
  if (t.includes("map") || t.includes("navigation") || t.includes("gps")) return <MapIcon />;
  if (t.includes("wi-fi") || t.includes("wifi")) return <WifiIcon />;
  if (t.includes("room") || t.includes("bed") || t.includes("stay")) return <BedIcon />;
  if (t.includes("insur") || t.includes("safety") || t.includes("cover")) return <ShieldIcon />;
  return <CheckCircleIcon />;
};

// ── Divider ───────────────────────────────────────────────────────────────────
const Divider = () => (
  <div className="w-full h-[2px] bg-[#d6beeb] rounded-[20px] opacity-[0.18]" />
);

// ── Per-category static data ──────────────────────────────────────────────────
const CATEGORY_DATA = {
  transportation: {
    services: [
      "Airport Pickup & Drop-off",
      "Hotel Transfers",
      "City-to-City Transport",
      "24/7 Availability",
      "Corporate Transportation",
      "Event Transportation",
      "Hourly Rental Service",
      "Custom Routes Available",
    ],
    included: [
      "Sanitized Vehicle",
      "Professional Licensed Driver",
      "Meet & Greet Service",
      "Flight Tracking",
      "Luggage Assistance",
      "Air-Conditioned Vehicle",
      "Complimentary Water",
      "Free WiFi",
      "Child Seats (on request)",
      "Phone Chargers",
      "GPS Navigation",
    ],
  },
  accommodation: {
    services: [
      "Room Service",
      "Free Wi-Fi",
      "Airport Shuttle",
      "Daily Housekeeping",
      "Conference Facilities",
      "Restaurant & Bar",
      "Swimming Pool",
      "Spa & Wellness",
    ],
    included: [
      "Daily Breakfast",
      "Free Parking",
      "24/7 Reception",
      "Concierge Service",
      "Laundry Service",
      "In-Room Safe",
      "Smart TV",
      "Air Conditioning",
      "Toiletries",
      "Wake-up Service",
    ],
  },
  "tour-sites": {
    services: [
      "Guided Tours",
      "Audio Guides",
      "Photography Allowed",
      "Accessible Entry",
      "Group Bookings",
      "Private Tours",
    ],
    included: [
      "Entry Ticket",
      "Site Map",
      "Expert Guide",
      "Safety Briefing",
      "Drinking Water",
      "Rest Areas",
    ],
  },
  restaurants: {
    services: [
      "Dine-in Service",
      "Takeaway",
      "Private Dining",
      "Event Catering",
      "Reservation Available",
      "Outdoor Seating",
    ],
    included: [
      "Welcome Drinks",
      "Complimentary Bread",
      "Dietary Options",
      "Kids Menu",
      "Wi-Fi",
      "Parking",
    ],
  },
  guides: {
    services: [
      "City Walking Tours",
      "Nature & Hiking",
      "Cultural Tours",
      "Heritage Sites",
      "Food & Market Tours",
      "Photography Tours",
    ],
    included: [
      "Route Planning",
      "Local Insights",
      "Safety Briefing",
      "Bottled Water",
      "Snack Breaks",
      "Photo Stops",
    ],
  },
  photographers: {
    services: [
      "Travel Photography",
      "Portrait Sessions",
      "Event Coverage",
      "Drone Footage",
      "Video Production",
      "Same-Day Edits",
    ],
    included: [
      "High-Res Images",
      "Online Gallery",
      "Edited Photos",
      "Raw Files",
      "Travel Costs",
      "Equipment",
    ],
  },
  insurance: {
    services: [
      "Travel Insurance",
      "Medical Coverage",
      "Trip Cancellation",
      "Lost Baggage",
      "Emergency Assistance",
      "Visa Assistance",
    ],
    included: [
      "24/7 Helpline",
      "Digital Policy",
      "Claims Support",
      "Coverage Summary",
      "Emergency Contacts",
      "Online Portal",
    ],
  },
};

// ── Main modal ────────────────────────────────────────────────────────────────
const FeaturesModal = ({ open, onClose, category, partner }) => {
  const data     = CATEGORY_DATA[category] ?? {};
  const services = data.services ?? [];
  const included = data.included ?? [];

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose?.(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Features & Benefits"
        className="relative w-full max-w-[818px] max-h-[90vh] flex flex-col bg-white rounded-[20px] border border-[#e9e9eb] shadow-[0_4px_6px_0_rgba(10,12,18,0.03)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── Padded wrapper: header (static) + scroll area ── */}
        <div className="flex-1 flex flex-col px-[32px] overflow-hidden min-h-0">

          {/* Header — not scrollable */}
          <div className="shrink-0 pt-[32px] pb-[24px] flex flex-col gap-[16px]">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-[6px]">
                <span className="font-raleway text-[20px] font-semibold leading-[28px] text-[#565656]">
                  Features &amp; Benefits
                </span>
                <span className="font-raleway text-[13px] font-medium leading-[22px] text-[#2d2d2d]">
                  A complete look at what we offer and what's included
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="cursor-pointer hover:opacity-60 transition-opacity mt-1 shrink-0"
              >
                <CloseIcon />
              </button>
            </div>
            <Divider />
          </div>

          {/* Scrollable body */}
          <div
            className="flex-1 overflow-y-auto pb-[32px] flex flex-col gap-[32px]"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >

            {/* Services offered */}
            {services.length > 0 && (
              <div className="flex flex-col gap-[20px]">
                <span className="font-raleway text-[20px] font-semibold leading-[28px] text-[#565656]">
                  Services offered
                </span>
                <div className="grid grid-cols-3 gap-[12px]">
                  {services.map((service) => (
                    <div
                      key={service}
                      className="flex items-center gap-[8px] px-[14px] py-[17px] rounded-[8px] border border-[#f0e9f7] shadow-[0_0_5px_0_rgba(0,0,0,0.08)] bg-white"
                    >
                      <span className="shrink-0 flex items-center justify-center w-[20px] h-[20px]">
                        <ServiceIcon text={service} />
                      </span>
                      <span className="font-raleway text-[14px] font-semibold leading-[22px] text-[#2d2d2d]">
                        {service}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What's Included */}
            {included.length > 0 && (
              <div className="flex flex-col gap-[20px] px-[42px] py-[36px] bg-secondary-dark-darker rounded-[32px]">
                <span className="font-raleway text-[18px] font-semibold leading-[28px] text-white">
                  What's Included
                </span>
                <div className="grid grid-cols-3 gap-y-[20px] gap-x-[12px]">
                  {included.map((item) => (
                    <div key={item} className="flex items-center gap-[10px]">
                      <span className="text-white text-[18px] leading-none shrink-0 select-none">▸</span>
                      <span className="font-raleway text-[14px] font-semibold leading-[22px] text-[#eaeaea]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesModal;
