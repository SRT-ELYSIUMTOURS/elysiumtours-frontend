import React, { useState, useRef, useEffect } from "react";
import { classNames } from "../../utils/classNames";

const DEFAULT_COUNTRIES = [
  { code: "GH", flag: "gh", dial: "+233", label: "Ghana", maxLength: 10 },
  { code: "NG", flag: "ng", dial: "+234", label: "Nigeria", maxLength: 11 },
  { code: "US", flag: "us", dial: "+1", label: "United States", maxLength: 10 },
  { code: "GB", flag: "gb", dial: "+44", label: "United Kingdom", maxLength: 10 },
];

const ChevronDown = ({ open }) => (
  <svg width="12" height="12" viewBox="0 0 12 12"
    className={classNames("transition-transform", open && "rotate-180")}>
    <path d="M2 4L6 8L10 4" stroke="#949494" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const PhoneInput = ({
  label = "Phone Number",
  required = false,
  countries = DEFAULT_COUNTRIES,
  value,
  onChange,
  country,
  onCountryChange,
}) => {

  const [internalPhone, setInternalPhone] = useState("");
  const [internalCountry, setInternalCountry] = useState("GH");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const dropdownRef = useRef();

  const currentPhone = value ?? internalPhone;
  const currentCountry = country ?? internalCountry;

  const selectedCountry =
    countries.find(c => c.code === currentCountry) || countries[0];

  // Close dropdown outside click
  useEffect(() => {
    const close = e => {
      if (!dropdownRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  // Ghana formatting
  const formatPhone = (phone, countryCode) => {

    const digits = phone.replace(/\D/g, "");

    if (countryCode === "GH") {

      const part1 = digits.slice(0, 3);
      const part2 = digits.slice(3, 6);
      const part3 = digits.slice(6, 10);

      if (digits.length <= 3) return part1;
      if (digits.length <= 6) return `${part1} ${part2}`;
      return `${part1} ${part2} ${part3}`;
    }

    return digits;
  };

  // Validation
  const validate = (phone, countryObj) => {

    const digits = phone.replace(/\D/g, "");

    if (required && digits.length === 0) {
      setError("Phone number is required");
      return false;
    }

    if (digits.length > 0 && digits.length < countryObj.maxLength) {
      setError("Invalid phone number");
      return false;
    }

    setError("");
    return true;
  };

  const handlePhoneChange = e => {

    const formatted = formatPhone(e.target.value, currentCountry);

    if (value === undefined) setInternalPhone(formatted);

    onChange?.({
      target: {
        value: formatted,
        digits: formatted.replace(/\D/g, ""),
        country: selectedCountry
      }
    });

    validate(formatted, selectedCountry);
  };

  const handleCountryChange = c => {

    if (country === undefined) setInternalCountry(c.code);

    onCountryChange?.(c);

    setOpen(false);
  };

  const filteredCountries = countries.filter(c =>
    c.label.toLowerCase().includes(search.toLowerCase()) ||
    c.dial.includes(search)
  );

  return (
    <div className="flex flex-col gap-[6px] w-full">

      {/* Label */}
      <label
        className="inline-flex items-end text-[16px] font-medium"
        style={{ fontFamily:"Raleway, sans-serif", color:"#2d2d2d" }}
      >
        {label}
        {required && (
          <span className="text-red-500 ml-[3px] relative top-[2px]">*</span>
        )}
      </label>

      {/* Input wrapper */}
      <div
        className="flex rounded-[10px] border overflow-hidden focus-within:border-[#7b2cbf]"
        style={{
          borderColor: error ? "#ff0000" : "#949494",
          height:"48px"
        }}
      >

        {/* Country dropdown */}
        <div ref={dropdownRef} className="relative">

          <button
            onClick={()=>setOpen(v=>!v)}
            type="button"
            className="flex items-center gap-2 px-3 h-full"
            style={{ fontFamily:"Raleway", fontSize:"13px", fontWeight:700 }}
          >
            <span className={`fi fi-${selectedCountry.flag} mr-1`}></span>

            {selectedCountry.code}
            {selectedCountry.dial}

            <ChevronDown open={open}/>
          </button>

          {open && (
            <div className="absolute top-full mt-1 bg-white border rounded shadow z-50 w-[220px]">

              {/* Search */}
              <input
                placeholder="Search country..."
                value={search}
                onChange={e=>setSearch(e.target.value)}
                className="w-full px-3 py-2 border-b outline-none"
              />

              {/* Countries */}
              {filteredCountries.map(c => (
                <button
                  key={c.code}
                  onClick={()=>handleCountryChange(c)}
                  className="flex gap-2 w-full px-3 py-2 hover:bg-gray-100 text-left"
                >
                      <span className={`fi fi-${c.flag} mr-1`}></span>
 {c.code} {c.dial} {c.label}
                </button>
              ))}

            </div>
          )}

        </div>

        {/* Divider */}
        <div style={{ width:"1px", background:"#949494" }}/>

        {/* Phone input */}
        <input
          value={currentPhone}
          onChange={handlePhoneChange}
          placeholder="024 123 4567"
          className="flex-1 px-4 outline-none"
          style={{ fontFamily:"Raleway", fontSize:"13px" }}
        />

      </div>

      {/* Error */}
      {error && (
        <span className="text-red-500 text-[12px]">{error}</span>
      )}

    </div>
  );
};

export default PhoneInput;
