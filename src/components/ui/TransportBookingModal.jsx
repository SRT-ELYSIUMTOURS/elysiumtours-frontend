import React, { useState, useEffect } from "react";

// ── Icons ─────────────────────────────────────────────────────────────────────
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M18 6L6 18M6 6l12 12" stroke="#565656" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="M5 7.5l5 5 5-5" stroke="#949494" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <circle cx="8" cy="8" r="7" stroke="#7b2cbf" strokeWidth="1.4" />
    <path d="M5 8l2 2 4-4" stroke="#7b2cbf" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Constants ─────────────────────────────────────────────────────────────────
const TRANSFER_TYPES = [
  { value: "pickup",    label: "Airport Pickup" },
  { value: "dropoff",  label: "Airport Drop-off" },
  { value: "roundtrip", label: "Round Trip" },
];

const VEHICLES = [
  { id: "standard-sedan",   label: "Standard Sedan",   price: 100 },
  { id: "premium-suv",      label: "Premium SUV",      price: 180 },
  { id: "van-minibus",      label: "Van/Minibus",       price: 250 },
  { id: "executive-luxury", label: "Executive Luxury",  price: 250 },
];

const ADDONS = [
  { id: "childSeat", label: "Child Seat",      price: 20 },
  { id: "waitTime",  label: "Wait Time – 1hr", price: 50 },
  { id: "extraStop", label: "Extra Stop",      price: 30 },
];

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAYS  = Array.from({ length: 31 }, (_, i) => i + 1);
const YEARS = Array.from({ length: 6 },  (_, i) => new Date().getFullYear() + i);

function buildTimeOptions() {
  const opts = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hh   = h % 12 === 0 ? 12 : h % 12;
      const mm   = m.toString().padStart(2, "0");
      const ampm = h < 12 ? "AM" : "PM";
      opts.push(`${hh.toString().padStart(2, "0")} : ${mm} ${ampm}`);
    }
  }
  return opts;
}
const TIME_OPTIONS = buildTimeOptions();

// ── Primitive components ───────────────────────────────────────────────────────
const Divider = () => (
  <div className="w-full h-[2px] bg-[#d6beeb] rounded-[20px] opacity-[0.18]" />
);

const FieldLabel = ({ children }) => (
  <span className="font-raleway text-[16px] font-semibold leading-[22px] text-[#565656]">
    {children}
  </span>
);

const StyledSelect = ({ value, onChange, placeholder, options }) => (
  <div className="relative flex items-center">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-[48px] pl-[10px] pr-[34px] bg-[#fdfdfd] rounded-[10px] border border-[#b9b9b9] shadow-[0_0_4px_0_rgba(0,0,0,0.01)] font-raleway text-[14px] font-medium text-[#949494] appearance-none cursor-pointer focus:outline-none focus:border-[#7b2cbf] transition-colors"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => {
        const val   = typeof opt === "object" ? opt.value : String(opt);
        const label = typeof opt === "object" ? opt.label  : String(opt);
        return <option key={val} value={val}>{label}</option>;
      })}
    </select>
    <div className="pointer-events-none absolute right-[10px]">
      <ChevronDownIcon />
    </div>
  </div>
);

const RadioDot = ({ checked }) => (
  <div className={`w-[20px] h-[20px] rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${
    checked ? "border-[#7b2cbf]" : "border-[#b9b9b9]"
  }`}>
    {checked && <div className="w-[10px] h-[10px] rounded-full bg-[#7b2cbf]" />}
  </div>
);

// ── Rows ──────────────────────────────────────────────────────────────────────
const RadioRow = ({ name, value, checked, onChange, label }) => (
  <label className="flex items-center gap-[16px] py-[10px] cursor-pointer">
    <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} className="sr-only" />
    <RadioDot checked={checked} />
    <span className="font-raleway text-[16px] font-semibold leading-[22px] text-[#2d2d2d] whitespace-nowrap">
      {label}
    </span>
  </label>
);

const VehicleRow = ({ vehicle, checked, onChange }) => (
  <label className="flex items-center gap-[16px] py-[10px] cursor-pointer">
    <input type="radio" name="vehicle" value={vehicle.id} checked={checked} onChange={() => onChange(vehicle.id)} className="sr-only" />
    <RadioDot checked={checked} />
    <div className="flex justify-between items-center flex-1 min-w-0">
      <span className="font-raleway text-[16px] font-semibold leading-[22px] text-[#2d2d2d]">{vehicle.label}</span>
      <span className="font-raleway text-[16px] font-semibold leading-[22px] text-[#7b2cbf] shrink-0 ml-2">GH₵ {vehicle.price}</span>
    </div>
  </label>
);

const AddonRow = ({ addon, checked, onChange }) => (
  <label className="flex items-center gap-[16px] py-[10px] cursor-pointer">
    <input type="checkbox" checked={checked} onChange={(e) => onChange(addon.id, e.target.checked)} className="sr-only" />
    <div className={`w-[20px] h-[20px] rounded-[4px] border-2 flex items-center justify-center transition-colors shrink-0 ${
      checked ? "border-[#7b2cbf] bg-[#7b2cbf]" : "border-[#b9b9b9] bg-white"
    }`}>
      {checked && (
        <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
          <path d="M1 5l3.5 3.5L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
    <div className="flex justify-between items-center flex-1 min-w-0">
      <span className="font-raleway text-[16px] font-semibold leading-[22px] text-[#2d2d2d]">{addon.label}</span>
      <span className="font-raleway text-[16px] font-semibold leading-[22px] text-[#7b2cbf] shrink-0 ml-2">GH₵ {addon.price}</span>
    </div>
  </label>
);

// ── Main modal ────────────────────────────────────────────────────────────────
const TransportBookingModal = ({ open, onClose, onContactDriver, initialPackage }) => {
  const [transferType,    setTransferType]    = useState("pickup");
  const [pickupLocation,  setPickupLocation]  = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [day,   setDay]   = useState("");
  const [month, setMonth] = useState("");
  const [year,  setYear]  = useState("");
  const [time,  setTime]  = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("standard-sedan");
  const [addons,    setAddons]    = useState({ childSeat: false, waitTime: false, extraStop: false });
  const [passengers, setPassengers] = useState("");
  const [luggage,    setLuggage]    = useState("");
  const [specialRequest, setSpecialRequest] = useState("");

  // Pre-select vehicle from whichever package card was clicked
  useEffect(() => {
    if (initialPackage?.id) {
      const match = VEHICLES.find((v) => v.id === initialPackage.id);
      if (match) setSelectedVehicle(match.id);
    }
  }, [initialPackage]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose?.(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (open) { document.body.style.overflow = "hidden"; }
    else       { document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const vehiclePrice = VEHICLES.find((v) => v.id === selectedVehicle)?.price ?? 0;
  const addonTotal   = ADDONS.filter((a) => addons[a.id]).reduce((s, a) => s + a.price, 0);
  const total        = vehiclePrice + addonTotal;

  const handleAddonChange = (id, val) => setAddons((prev) => ({ ...prev, [id]: val }));

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Book Your Transfer"
        className="relative w-full max-w-[820px] max-h-[90vh] flex flex-col bg-white rounded-[20px] border border-[#e9e9eb] shadow-[0_4px_6px_0_rgba(10,12,18,0.06)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── Padded wrapper: header (static) + scroll area ── */}
        <div className="flex-1 flex flex-col px-[32px] overflow-hidden min-h-0">

          {/* Header — outside scroll */}
          <div className="shrink-0 pt-[32px] pb-[24px] flex flex-col gap-[24px]">
            <div className="flex justify-between items-center">
              <span className="font-raleway text-[20px] font-semibold leading-[28px] text-[#565656]">
                Book Your Transfer
              </span>
              <button type="button" onClick={onClose} aria-label="Close" className="cursor-pointer hover:opacity-60 transition-opacity">
                <CloseIcon />
              </button>
            </div>
            <Divider />
          </div>

          {/* Scrollable body */}
          <div
            className="flex-1 overflow-y-auto pb-[32px] flex flex-col gap-[24px]"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >

          {/* Transfer Type */}
          <div className="flex flex-col gap-[16px]">
            <FieldLabel>Transfer Type</FieldLabel>
            <div className="flex flex-wrap gap-x-[48px]">
              {TRANSFER_TYPES.map((t) => (
                <RadioRow
                  key={t.value}
                  name="transferType"
                  value={t.value}
                  checked={transferType === t.value}
                  onChange={setTransferType}
                  label={t.label}
                />
              ))}
            </div>
          </div>

          <Divider />

          {/* Pickup / Drop-off Location */}
          <div className="flex flex-col sm:flex-row gap-[24px]">
            <div className="flex flex-col gap-[20px] flex-1">
              <FieldLabel>Pickup Location</FieldLabel>
              <StyledSelect
                value={pickupLocation}
                onChange={setPickupLocation}
                placeholder="Kotoka International Airport"
                options={[
                  { value: "kotoka",       label: "Kotoka International Airport" },
                  { value: "accra-centre", label: "Accra City Centre" },
                  { value: "tema",         label: "Tema Port" },
                  { value: "other",        label: "Other / Enter Address" },
                ]}
              />
            </div>
            <div className="flex flex-col gap-[20px] flex-1">
              <FieldLabel>Drop-off Location</FieldLabel>
              <StyledSelect
                value={dropoffLocation}
                onChange={setDropoffLocation}
                placeholder="Select Hotel/Address"
                options={[
                  { value: "labadi",     label: "Labadi Beach Hotel" },
                  { value: "kempinski",  label: "Kempinski Gold Coast City" },
                  { value: "movenpick",  label: "Mövenpick Ambassador Hotel" },
                  { value: "novotel",    label: "Novotel Accra City Centre" },
                  { value: "other",      label: "Other / Enter Address" },
                ]}
              />
            </div>
          </div>

          <Divider />

          {/* Date & Time */}
          <div className="flex flex-col sm:flex-row gap-[24px]">
            <div className="flex gap-[16px] flex-1">
              <div className="flex flex-col gap-[10px] flex-1">
                <FieldLabel>Day</FieldLabel>
                <StyledSelect value={day} onChange={setDay} placeholder="-- none --" options={DAYS} />
              </div>
              <div className="flex flex-col gap-[10px] flex-1">
                <FieldLabel>Month</FieldLabel>
                <StyledSelect value={month} onChange={setMonth} placeholder="Month" options={MONTHS} />
              </div>
            </div>
            <div className="flex gap-[16px] flex-1">
              <div className="flex flex-col gap-[10px] flex-1">
                <FieldLabel>Year</FieldLabel>
                <StyledSelect value={year} onChange={setYear} placeholder="Year" options={YEARS} />
              </div>
              <div className="flex flex-col gap-[10px] flex-1">
                <FieldLabel>Time</FieldLabel>
                <StyledSelect value={time} onChange={setTime} placeholder="-- time --" options={TIME_OPTIONS} />
              </div>
            </div>
          </div>

          <Divider />

          {/* Select Vehicle */}
          <div className="flex flex-col gap-[16px]">
            <span className="font-raleway text-[20px] font-semibold leading-[28px] text-[#565656]">Select Vehicle</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[40px]">
              {VEHICLES.map((v) => (
                <VehicleRow key={v.id} vehicle={v} checked={selectedVehicle === v.id} onChange={setSelectedVehicle} />
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div className="flex flex-col gap-[16px]">
            <span className="font-raleway text-[20px] font-semibold leading-[28px] text-[#565656]">Add-ons (Optional)</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[40px]">
              {ADDONS.map((a) => (
                <AddonRow key={a.id} addon={a} checked={addons[a.id]} onChange={handleAddonChange} />
              ))}
            </div>
          </div>

          <Divider />

          {/* Passengers & Luggage */}
          <div className="flex flex-col sm:flex-row gap-[24px]">
            <div className="flex flex-1 justify-between items-center">
              <FieldLabel>Passengers</FieldLabel>
              <input
                type="number"
                min={1}
                max={50}
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                placeholder="-- none --"
                className="w-[200px] h-[44px] px-[10px] text-right bg-[#fdfdfd] rounded-[10px] border border-[#b9b9b9] shadow-[0_0_4px_0_rgba(0,0,0,0.01)] font-raleway text-[14px] font-medium text-[#949494] focus:outline-none focus:border-[#7b2cbf] transition-colors"
              />
            </div>
            <div className="flex flex-1 justify-between items-center">
              <FieldLabel>Luggage</FieldLabel>
              <input
                type="number"
                min={0}
                max={20}
                value={luggage}
                onChange={(e) => setLuggage(e.target.value)}
                placeholder="0"
                className="w-[200px] h-[44px] px-[10px] text-right bg-[#fdfdfd] rounded-[10px] border border-[#b9b9b9] shadow-[0_0_4px_0_rgba(0,0,0,0.01)] font-raleway text-[14px] font-medium text-[#949494] focus:outline-none focus:border-[#7b2cbf] transition-colors"
              />
            </div>
          </div>

          <Divider />

          {/* Special Request */}
          <div className="flex flex-col gap-[16px]">
            <span className="font-raleway text-[20px] font-semibold leading-[28px] text-[#565656]">Special Request</span>
            <div className="relative">
              <textarea
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                placeholder="Add your special request here..."
                maxLength={1500}
                className="w-full h-[150px] resize-none pt-[10px] px-[10px] pb-[30px] bg-[#fdfdfd] rounded-[10px] border border-[#b9b9b9] shadow-[0_0_4px_0_rgba(0,0,0,0.01)] font-raleway text-[14px] font-medium text-[#949494] placeholder:text-[#949494] focus:outline-none focus:border-[#7b2cbf] transition-colors"
              />
              <span className="absolute bottom-[8px] left-[10px] font-raleway text-[13px] font-normal leading-[20px] text-[#c6c6c6] pointer-events-none">
                (Max 300 words)
              </span>
            </div>
          </div>

          <Divider />

          {/* Total */}
          <div className="flex flex-col gap-[14px]">
            <div className="flex justify-between items-center">
              <span className="font-raleway text-[20px] font-semibold leading-[28px] text-[#565656]">Total</span>
              <span className="font-raleway text-[20px] font-bold leading-[28px] text-[#7b2cbf]">
                GH₵ {total.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-[8px]">
              <CheckCircleIcon />
              <span className="font-raleway text-[14px] font-medium leading-[18px] text-[#565656]">
                Free cancellation up to 24hrs before
              </span>
            </div>
          </div>

          </div>{/* end scrollable body */}
        </div>{/* end padded wrapper */}

        {/* ── Sticky footer — full-width border ── */}
        <div className="shrink-0 px-[32px] py-[20px] border-t border-[#e9e9eb] bg-white flex justify-between items-center">
          <button
            type="button"
            onClick={onContactDriver ?? onClose}
            className="font-raleway text-[16px] font-bold leading-[22px] text-[#2d2d2d] underline underline-offset-2 cursor-pointer hover:text-[#7b2cbf] transition-colors"
          >
            Contact Driver
          </button>
          <button
            type="button"
            onClick={() => { /* TODO: submit booking */ onClose?.(); }}
            className="flex items-center justify-center h-[56px] px-[24px] bg-[#7b2cbf] rounded-[40px] shadow-[0_4px_4px_0_rgba(0,0,0,0.05)] font-raleway text-[16px] font-semibold leading-[22px] text-[#fefefe] hover:bg-[#6d27a8] active:bg-[#5c2299] transition-colors cursor-pointer"
          >
            Request Booking
          </button>
        </div>

      </div>
    </div>
  );
};

export default TransportBookingModal;
