import React, { useState } from "react";
import { classNames } from "../../../utils/classNames";
import PopularTourCard from "../../cards/PopularTourCard";
import Button from "../../ui/button";

// Figma: Ghana country page — Signature Experiences section
// "SIGNATURE EXPERIENCES" label left / "Signature Experiences" right
// "Select a Location" pill triggers LEFT sidebar with region checkboxes
// When sidebar is open, tours grid narrows (flex layout: sidebar + grid side by side)

const GHANA_REGIONS = [
  "Greater Accra", "Ashanti", "Eastern", "Central",
  "Western", "Western North", "Volta", "Oti",
  "Northern", "North East", "Upper East", "Upper West",
  "Savannah", "Bono", "Bono East", "Ahafo",
];

const TOURS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  image: `https://picsum.photos/seed/sig-exp-${i + 1}/351/373`,
  location: ["Cape Coast/Central Region", "Accra/Ghana", "Ashanti/Ghana", "Volta Region/Ghana"][i % 4],
  duration: {
    class: ["Multi-Day", "Day Tour", "Multi-Day", "Day Tour"][i % 4],
    span: ["3 Days/2 Nights", "1 Day", "5 Days/4 Nights", "1 Day"][i % 4],
  },
  maxGroupSize: [12, 8, 15, 10][i % 4],
  pickupIncluded: i % 3 === 0,
  tags: [["Cultural", "Diaspora"], ["Heritage", "Nature"], ["Cultural", "Adventure"], ["Nature", "Scenic"]][i % 4],
  rating: [4.9, 4.8, 4.7, 4.9][i % 4],
  title: [
    "The Homecoming Experience to Kakum National Park",
    "Elmina Heritage & Coastal Journey Tour",
    "Kumasi Heritage & Market Discovery",
    "Wli Waterfalls & Nature Exploration",
  ][i % 4],
  availabilityBadge: "Opened Daily",
  price: ["Ghs.400.00", "Ghs.350.00", "Ghs.500.00", "Ghs.450.00"][i % 4],
  country: "ghana",
  slug: [
    "homecoming-kakum-national-park",
    "elmina-heritage-coastal-journey",
    "kumasi-heritage-market-discovery",
    "wli-waterfalls-nature-exploration",
  ][i % 4],
}));

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.33325 6.25C1.91904 6.25 1.58325 6.58579 1.58325 7C1.58325 7.41421 1.91904 7.75 2.33325 7.75V7V6.25ZM11.6666 7.75C12.0808 7.75 12.4166 7.41421 12.4166 7C12.4166 6.58579 12.0808 6.25 11.6666 6.25V7V7.75ZM9.86121 3.55068C9.56701 3.2591 9.09214 3.26122 8.80056 3.55542C8.50898 3.84961 8.5111 4.32448 8.80529 4.61606L9.33325 4.08337L9.86121 3.55068ZM2.33325 7.75H11.6666V6.25H2.33325V7.75ZM8.80529 4.61606L9.83369 5.63533L10.8896 4.56995L9.86121 3.55068L8.80529 4.61606ZM9.83369 8.36475L8.80529 9.38402L9.86121 10.4494L10.8896 9.43014L9.83369 8.36475ZM9.83369 5.63533C10.2563 6.05416 10.5274 6.32448 10.7074 6.54863C10.8779 6.76094 10.9041 6.85793 10.911 6.91209L12.399 6.72243C12.3427 6.28124 12.1323 5.92733 11.877 5.60938C11.6311 5.30327 11.2871 4.96395 10.8896 4.56995L9.83369 5.63533ZM10.911 7.08799C10.9041 7.14215 10.8779 7.23914 10.7074 7.45145C10.5274 7.6756 10.2563 7.94592 9.83369 8.36475L10.8896 9.43014C11.2871 9.03613 11.6311 8.69681 11.877 8.3907C12.1323 8.07275 12.3427 7.71885 12.399 7.27765L10.911 7.08799ZM10.911 6.91209C10.9184 6.9705 10.9184 7.02958 10.911 7.08799L12.399 7.27765C12.4225 7.09331 12.4225 6.90677 12.399 6.72243L10.911 6.91209Z" fill="#7B2CBF"/>
  </svg>
);

const PinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z" stroke="#7B2CBF" strokeWidth="1.2"/>
    <path d="M8 2C5.33333 2 3 4.26667 3 6.86667C3 10.3333 8 14 8 14C8 14 13 10.3333 13 6.86667C13 4.26667 10.6667 2 8 2Z" stroke="#7B2CBF" strokeWidth="1.2"/>
  </svg>
);

const ChevronDownIcon = ({ open }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={classNames("transition-transform duration-200", open ? "rotate-180" : "")}>
    <path d="M4 6L8 10L12 6" stroke="#2d2d2d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 4L10 8L6 12" stroke="#7B2CBF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Location Sidebar component
const LocationSidebar = ({ onClose, selectedRegions, onRegionsChange, onApply, onClear }) => {
  const [countryExpanded, setCountryExpanded] = useState(true);
  const [countryChecked] = useState(true);

  const toggleRegion = (region) => {
    if (selectedRegions.includes(region)) {
      onRegionsChange(selectedRegions.filter((r) => r !== region));
    } else {
      onRegionsChange([...selectedRegions, region]);
    }
  };

  return (
    <div
      className="flex-shrink-0 bg-white rounded-[20px] shadow-md border border-[#e9eaeb] overflow-hidden"
      style={{ width: "369px", padding: "24px" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-[20px]">
        <h3 className="font-raleway font-bold text-[18px] leading-[26px] text-[#2d2d2d]">
          Select a Location
        </h3>
        <button
          onClick={onClose}
          className="w-[28px] h-[28px] flex items-center justify-center rounded-full hover:bg-[#f5f5f5] transition-colors"
          aria-label="Close sidebar"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2L12 12M12 2L2 12" stroke="#6f6f6f" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Country row */}
      <div className="mb-[16px]">
        <button
          onClick={() => setCountryExpanded(!countryExpanded)}
          className="w-full flex items-center justify-between py-[10px] px-[12px] rounded-[10px] hover:bg-[#f9f5ff] transition-colors"
        >
          <div className="flex items-center gap-[10px]">
            {/* Checkbox */}
            <div
              className={classNames(
                "w-[18px] h-[18px] rounded-[4px] border-2 flex items-center justify-center flex-shrink-0",
                countryChecked ? "bg-[#7b2cbf] border-[#7b2cbf]" : "bg-white border-[#d0d0d0]"
              )}
            >
              {countryChecked && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span className="font-raleway font-semibold text-[15px] text-[#2d2d2d]">Ghana</span>
          </div>
          <ChevronDownIcon open={countryExpanded} />
        </button>

        {/* Region checkboxes */}
        {countryExpanded && (
          <div className="mt-[8px] pl-[12px] grid grid-cols-2 gap-x-[8px] gap-y-[2px]">
            {GHANA_REGIONS.map((region) => (
              <label
                key={region}
                className="flex items-center gap-[8px] py-[6px] px-[4px] rounded-[6px] cursor-pointer hover:bg-[#f9f5ff] transition-colors"
              >
                <div
                  onClick={() => toggleRegion(region)}
                  className={classNames(
                    "w-[16px] h-[16px] rounded-[3px] border-2 flex items-center justify-center flex-shrink-0 cursor-pointer",
                    selectedRegions.includes(region) ? "bg-[#7b2cbf] border-[#7b2cbf]" : "bg-white border-[#d0d0d0]"
                  )}
                >
                  {selectedRegions.includes(region) && (
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className="font-raleway font-medium text-[13px] text-[#4a4a4a] leading-[18px]">
                  {region}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Bottom action buttons */}
      <div className="flex items-center gap-[12px] mt-[20px] pt-[16px] border-t border-[#e9eaeb]">
        <button
          onClick={onClear}
          className="flex-1 h-[40px] rounded-[40px] border border-[#7b2cbf] text-[#7b2cbf] font-raleway font-semibold text-[14px] hover:bg-[#f9f5ff] transition-colors"
        >
          Clear
        </button>
        <button
          onClick={onApply}
          className="flex-1 h-[40px] rounded-[40px] bg-[#7b2cbf] text-white font-raleway font-semibold text-[14px] hover:bg-[#6b22af] transition-colors"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

const SignatureExperiencesSection = React.forwardRef(({ country = "Ghana", className, ...props }, ref) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [appliedRegions, setAppliedRegions] = useState([]);

  const handleApply = () => {
    setAppliedRegions([...selectedRegions]);
    setSidebarOpen(false);
  };

  const handleClear = () => {
    setSelectedRegions([]);
  };

  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <section
      ref={ref}
      className={classNames("w-full bg-secondary-light-default py-[80px]", className)}
      {...props}
    >
      <div className="px-[148px]">
        {/* Section header */}
        <div className="flex items-start justify-between w-full mb-[60px]">
          <div className="flex items-center gap-[8px] shrink-0">
            <div className="w-[46px] h-[1px] bg-secondary-dark-darker" />
            <span className="font-raleway font-bold text-[13px] leading-[18px] text-secondary-dark-darker whitespace-nowrap tracking-[0.05em] uppercase">
              Signature Experiences
            </span>
          </div>

          <div className="flex flex-col gap-md items-end w-[677px]">
            <h2 className="font-raleway font-bold text-[25px] leading-[34px] text-tertiary-normal-default text-right pl-[80px]">
              {country} Signature Experiences
            </h2>
            <p className="font-raleway font-normal text-[16px] leading-[24px] text-tertiary-normal-default text-right pl-[111px]">
              Explore the most authentic and memorable tours curated specifically for {country}. From heritage sites to natural wonders, every experience is designed to leave a lasting impression.
            </p>
            <Button
              variant="secondaryOutline"
              shape="pill"
              size="small"
              className="h-[32px] gap-[9px] rounded-xl border-[0.8px]"
              endIcon={<ArrowIcon />}
            >
              Explore More
            </Button>
          </div>
        </div>

        {/* "Select a Location" trigger pill */}
        <div className="flex items-center mb-[24px]">
          <button
            onClick={handleOpenSidebar}
            className={classNames(
              "flex items-center gap-[8px] px-[16px] py-[10px] rounded-[40px] border transition-all duration-200",
              sidebarOpen
                ? "bg-[#7b2cbf] border-[#7b2cbf] text-white"
                : "bg-white border-[#e9eaeb] text-[#2d2d2d] hover:border-[#7b2cbf] hover:text-[#7b2cbf]"
            )}
          >
            <PinIcon />
            <span className="font-raleway font-semibold text-[14px]">
              {appliedRegions.length > 0 ? `${appliedRegions.length} Region${appliedRegions.length > 1 ? "s" : ""} Selected` : "Select a Location"}
            </span>
            <ChevronRightIcon />
          </button>

          {appliedRegions.length > 0 && (
            <button
              onClick={() => { setAppliedRegions([]); setSelectedRegions([]); }}
              className="ml-[12px] text-[13px] text-[#6f6f6f] hover:text-[#7b2cbf] font-raleway transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Sidebar + grid layout */}
        <div className={classNames("flex gap-[24px] items-start", sidebarOpen ? "flex-row" : "block")}>
          {/* Sidebar */}
          {sidebarOpen && (
            <LocationSidebar
              onClose={handleCloseSidebar}
              selectedRegions={selectedRegions}
              onRegionsChange={setSelectedRegions}
              onApply={handleApply}
              onClear={handleClear}
            />
          )}

          {/* Tours grid */}
          <div className={classNames(
            "flex-1",
            sidebarOpen ? "grid grid-cols-3 gap-x-[8px] gap-y-[20px]" : "grid grid-cols-4 gap-x-[8px] gap-y-[20px]"
          )}>
            {TOURS.map((tour) => (
              <PopularTourCard
                key={tour.id}
                image={tour.image}
                location={tour.location}
                rating={tour.rating}
                title={tour.title}
                availabilityBadge={tour.availabilityBadge}
                price={tour.price}
                tags={tour.tags}
                duration={tour.duration}
                pickupIncluded={tour.pickupIncluded}
                maxGroupSize={tour.maxGroupSize}
                country={tour.country}
                tourSlug={tour.slug}
                className={sidebarOpen ? "w-full" : "w-[351px]"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

SignatureExperiencesSection.displayName = "SignatureExperiencesSection";
export default SignatureExperiencesSection;
