import React, { useState, useEffect, useCallback, Fragment, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { classNames } from "../../utils/classNames";
import { formatTimeAgo } from "../../utils/formatTimeAgo";
import BlogBreadcrumbBar from "../../components/sections/blog/BlogBreadcrumbBar";
import PopularTourCard from "../../components/cards/PopularTourCard";
import ImageGalleryModal from "../../components/ui/ImageGalleryModal";
import ShareModal from "../../components/ui/ShareModal";
import PartnerWithUsModal from "../../components/ui/PartnerWithUsModal";
import Button from "../../components/ui/button";
import PartnerPromoCtaSection from "../../components/sections/PartnerPromoCtaSection";
import { partnerPromoTour } from "../../data/partnerPromoCtaPresets.jsx";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Route: /tours/:country/:tour
// e.g. /tours/ghana/elmina-heritage-coastal-journey

// ─── Static tour data (replace with API call later) ───────────────────────────
const msAgo = (ms) => new Date(Date.now() - ms).toISOString();

/** Fallback map center if tour has no `meetingPoint` (WGS84). */
const DEFAULT_MEETING_POINT = { lat: 5.6037, lng: -0.187 };

/** Build a short place label from BigDataCloud reverse-geocode (browser CORS, no key). */
function formatReverseGeocodeLabel(data) {
  if (!data || typeof data !== "object") return null;
  const locality = data.locality;
  const city = data.city;
  const region = data.principalSubdivision;
  if (locality && city && locality !== city) {
    return `${locality}, ${city}`;
  }
  if (locality) return locality;
  if (city && region) return `${city}, ${region}`;
  if (city) return city;
  if (region) return region;
  return data.countryName || null;
}

/**
 * Coordinates → place name for the map pill (replaces raw lat/lng in the UI).
 * Uses BigDataCloud client reverse-geocode API.
 */
async function reverseGeocodeToPlaceName(lat, lng, signal) {
  const url = new URL(
    "https://api.bigdatacloud.net/data/reverse-geocode-client"
  );
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lng));
  url.searchParams.set("localityLanguage", "en");
  const res = await fetch(url.toString(), { signal });
  if (!res.ok) throw new Error("Reverse geocode failed");
  const data = await res.json();
  return formatReverseGeocodeLabel(data);
}

function truncatePinLabel(text, maxChars = 52) {
  const t = String(text).trim();
  if (t.length <= maxChars) return t;
  return `${t.slice(0, maxChars - 1)}…`;
}

/** Safe text for DivIcon HTML */
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Purple pin + pill label (Leaflet DivIcon — tip of pin at lat/lng) */
function createMeetingPinIcon(labelText) {
  const safe = escapeHtml(labelText);
  // Mobile-aware sizing: cap label width to leave breathing room from map edges
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const maxW = isMobile ? 200 : 280;
  const padX = isMobile ? 12 : 18;
  const wrap = isMobile ? "normal" : "nowrap";
  return L.divIcon({
    className: "leaflet-meeting-pin-icon",
    html: `<div style="display:flex;flex-direction:column;align-items:center;gap:8px;width:max-content;max-width:${maxW}px;">
      <svg width="38" height="47" viewBox="0 0 38 47" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M19 0C8.51 0 0 8.51 0 19C0 33.25 19 47 19 47C19 47 38 33.25 38 19C38 8.51 29.49 0 19 0Z" fill="#7b2cbf"/>
        <circle cx="19" cy="19" r="8" fill="white"/>
      </svg>
      <div style="background:#fff;padding:10px ${padX}px;border-radius:40px;box-shadow:0 2px 8px rgba(0,0,0,0.12);font-family:Raleway,sans-serif;font-size:13px;font-weight:600;color:#7b2cbf;border-bottom:1px solid #7b2cbf;white-space:${wrap};text-align:center;line-height:1.3;">
        ${safe}
      </div>
    </div>`,
    iconAnchor: [maxW / 2, 47],
    iconSize: [maxW, 140],
    popupAnchor: [0, -47],
  });
}

/** Tap map to drop pin at that location (pans so the pin stays in view) */
function MapClickPlacePin({ onPlace }) {
  const map = useMap();
  useMapEvents({
    click(e) {
      const ll = e.latlng;
      onPlace({ lat: ll.lat, lng: ll.lng });
      map.panTo(ll, { animate: true });
    },
  });
  return null;
}

/**
 * OSM tiles + draggable pin (same artwork as before). Click map or drag pin to move.
 */
const MeetingPointMapFrame = ({
  position,
  onPositionChange,
  locationLabel,
}) => {
  const [mapReady, setMapReady] = useState(false);
  const [hasMovedPin, setHasMovedPin] = useState(false);
  const [resolvedPlace, setResolvedPlace] = useState(null);
  const [placeLookup, setPlaceLookup] = useState("idle"); // idle | loading | ok | error

  useEffect(() => {
    setMapReady(true);
  }, []);

  useEffect(() => {
    if (!hasMovedPin) {
      setResolvedPlace(null);
      setPlaceLookup("idle");
      return;
    }

    const ac = new AbortController();
    setPlaceLookup("loading");
    const timer = setTimeout(async () => {
      try {
        const name = await reverseGeocodeToPlaceName(
          position.lat,
          position.lng,
          ac.signal
        );
        if (!name) throw new Error("empty");
        setResolvedPlace(name);
        setPlaceLookup("ok");
      } catch {
        if (!ac.signal.aborted) {
          setResolvedPlace(null);
          setPlaceLookup("error");
        }
      }
    }, 400);

    return () => {
      ac.abort();
      clearTimeout(timer);
    };
  }, [hasMovedPin, position.lat, position.lng]);

  const labelText = useMemo(() => {
    if (!hasMovedPin) return truncatePinLabel(locationLabel);
    if (resolvedPlace) return truncatePinLabel(resolvedPlace);
    if (placeLookup === "error") return truncatePinLabel(locationLabel);
    return "Finding location…";
  }, [hasMovedPin, locationLabel, placeLookup, resolvedPlace]);

  const pinIcon = useMemo(
    () => createMeetingPinIcon(labelText),
    [labelText]
  );

  const handleMove = (next) => {
    onPositionChange(next);
    setHasMovedPin(true);
  };

  if (!mapReady) {
    return (
      <div
        className="absolute inset-0 z-0 bg-secondary-light-hover"
        aria-hidden
      />
    );
  }

  return (
    <MapContainer
      center={[position.lat, position.lng]}
      zoom={14}
      className="absolute inset-0 z-0 size-full cursor-crosshair outline-none! [&_.leaflet-container]:cursor-crosshair [&_.leaflet-control-zoom]:cursor-pointer [&_.leaflet-marker-draggable]:cursor-grab [&_.leaflet-marker-draggable.leaflet-drag-target]:cursor-grabbing [&_.leaflet-control-zoom]:border-secondary-light-active [&_.leaflet-control-zoom_a]:text-secondary-normal-default"
      style={{ minHeight: "100%", minWidth: "100%" }}
      scrollWheelZoom={false}
      zoomControl
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickPlacePin onPlace={handleMove} />
      <Marker
        position={[position.lat, position.lng]}
        icon={pinIcon}
        draggable
        eventHandlers={{
          dragend: (e) => {
            const ll = e.target.getLatLng();
            handleMove({ lat: ll.lat, lng: ll.lng });
          },
        }}
      />
    </MapContainer>
  );
};

/**
 * Per-tour page content. Optional keys control “extended” detail layout:
 * - `tourHighlights` — cards under About the Tour (`{ title, description }[]`; legacy plain strings become title-only)
 * - `businessAmenities` — two-column checklist + optional `corporateBookingBenefits` or legacy `noteHtml`
 *   (`items` order: **left** column top-to-bottom, then **right** column, so the split matches Figma)
 * - `importantInformation` — `{ blocks[], footerNote? }` above the map (`block.label` or `block.title` + `body`; optional banner)
 * - `bookingAddOns` — optional extras in the sidebar (checkboxes + subtotal)
 * Omit a field or use [] / empty `items` / `blocks` to hide that block.
 */
const TOUR_DATA = {
  "elmina-heritage-coastal-journey": {
    title: "Elmina Heritage & Coastal Journey",
    country: "Ghana",
    location: "Cape Coast, Ghana",
    meetingPoint: { lat: 5.6037, lng: -0.187 },
    meetingPointLabel: "Accra, Greater Accra Region",
    /** Optional: omit or [] to hide “Tour Highlights” on this tour */
    tourHighlights: [
      {
        title: "Elmina Castle & Atlantic heritage",
        description:
          "UNESCO World Heritage site with expert guides and space for reflection at the Door of No Return.",
      },
      {
        title: "Cape Coast communities & markets",
        description:
          "Coastal fishing villages, open-air markets, and everyday life along Ghana's Central Region shore.",
      },
      {
        title: "Cultural context & local voices",
        description:
          "Certified heritage storytelling that connects the past to the living culture around you.",
      },
      {
        title: "Evening ocean & downtime",
        description:
          "Paced days with time by the coast—well suited to photography, conversation, and rest.",
      },
    ],
    /** Optional: omit or empty items[] to hide “Business Amenities” */
    businessAmenities: {
      items: [
        "High-Speed WiFi Throughout",
        "4-Star Hotel (Executive Floor)",
        "VAT Invoices Provided",
        "Private Chauffeured Vehicle",
        "Corporate Group Invoicing",
        "24/7 Concierge Support",
        "Airport Transfers (VIP)",
        "Hotel pickup & drop-off",
        "Meeting Room Access",
      ],
      corporateBookingBenefits: {
        title: "Corporate Booking Benefits",
        items: [
          "Group bookings of 5+ receive 12% corporate discount",
          "Consolidated invoices available for company expense reporting",
          "Dedicated corporate account manager assigned for your trip",
          "Custom itinerary modifications for conference integration",
        ],
      },
    },
    /** Optional — appears above the map in Location */
    importantInformation: {
      blocks: [
        {
          title: "Visa:",
          body: "Most non-Ghanaian visitors need a visa or eligible VOA; check your nationality and apply early. eVisa is available for many countries.",
        },
        {
          title: "Health:",
          body:
            "Yellow fever vaccination is required for entry. Malaria prophylaxis is strongly recommended. Confirm plans with your healthcare provider at least 6 weeks before travel.",
        },
        {
          title: "Dress code:",
          body: "Comfortable walking shoes and modest layers for heritage sites. Smart casual for evenings; bring sun protection and a light rain layer in the rainy season.",
        },
        {
          title: "Power:",
          body: "Ghana uses Type G outlets (230V). Bring a universal adaptor; a power bank is useful for long days.",
        },
        {
          title: "Connectivity:",
          body: "Local SIM cards with data are widely available (MTN, Vodafone, AirtelTigo). Your guide can help on arrival if needed.",
        },
      ],
      footerNote:
        "Free cancellation up to 48 hours before departure. Corporate and group bookings may have dedicated terms—contact your coordinator.",
    },
    /** Optional: omit or [] — optional extras + subtotal in the booking sidebar */
    bookingAddOns: [
      { id: "airport", label: "Airport pickup / drop-off (Accra)", priceGhc: 250 },
      { id: "photo", label: "Half-day professional photography", priceGhc: 450 },
    ],
    rating: 4.9,
    duration: "3 Days / 2 Nights",
    price: "GHC 4,590",
    description:
      'Stand inside the same cells that held thousands of enslaved Africans before their crossing  Elmina Castle is not just a UNESCO World Heritage Site, it is a visceral entry into history that demands to be felt, not just seen. Your certified heritage guide will walk you through every corner, courtyard, and "Door of No Return" with a depth that no audio guide can replicate. <br /><br />Beyond the castle, this journey moves through the living cultures of Ghana\'s Central Region  fishing villages that celebrate dance, open-air markets crowded with dried fish and fresh cassava, and evenings by the ocean where coconuts are shared and waves echo the unspoken. This is Ghana unfiltered.',
    images: Array.from(
      { length: 24 },
      (_, i) => `https://picsum.photos/seed/tour-detail-${i + 1}/856/717`
    ),
    heroMainImage: "https://picsum.photos/seed/tour-hero-main/856/717",
    heroTopRight: "https://picsum.photos/seed/tour-hero-top/867/366",
    heroBottomLeft: "https://picsum.photos/seed/tour-hero-bl/430/347",
    heroBottomRight: "https://picsum.photos/seed/tour-hero-bottom/432/347",
    bestFor: [
      "Cultural Enthusiasts",
      "Diaspora Travelers",
      "International Tourists",
      "Couples",
    ],
    included: [
      { type: "check", text: "All inter-continental travels" },
      { type: "check", text: "Expert certified heritage guides" },
      { type: "check", text: "2 nights hotel accommodation" },
      { type: "check", text: "4 meals (2x Lunch, 2x Breakfast)" },
      { type: "check", text: "All entrance fees" },
      { type: "check", text: "Hotel pickup & drop-off" },
      { type: "cross", text: "International/domestic flights" },
      { type: "cross", text: "Personal spending & tips" },
      { type: "cross", text: "Travel insurance" },
      { type: "cross", text: "Alcoholic beverages" },
      { type: "cross", text: "Dinner meals (Day 1 & 2)" },
    ],
    itinerary: [
      {
        day: 1,
        title: "Accra Departure → Cape Coast Arrival",
        preview: "Lagos · Airport → Victoria Island · Meals: Welcome Dinner",
        activities: [
          {
            time: "08:00 AM",
            activity: "Early drive along the coastal highway",
          },
          {
            time: "10:00 AM",
            activity: "Orientation walk through Cape Coast town",
            tag: "Business",
          },
          {
            time: "12:00 PM",
            activity: "Traditional cuisine walk at local market",
          },
        ],
        localContext:
          " Lagos is Africa's largest city by population, home to 21M+ people and a GDP that rivals many African nations. Victoria Island is the commercial and diplomatic heartbeat.",
      },
      {
        day: 2,
        title: "Coastal Exploration",
        preview: "Lagos · Airport → Victoria Island · Meals: Welcome Dinner",

        activities: [
          {
            time: "08:00 AM",
            activity: "Fort Elmina & Cape Coast Castle visits",
          },
          {
            time: "10:00 AM",
            activity: "Kakum National Park canopy walk",
            tag: "Business",
          },
          { time: "12:00 PM", activity: "Local fishing harbour market tour" },
        ],
        localContext:
          " Lagos is Africa's largest city by population, home to 21M+ people and a GDP that rivals many African nations. Victoria Island is the commercial and diplomatic heartbeat.",
      },
      {
        day: 3,
        title: "Return to Accra",
        preview: "Lagos · Airport → Victoria Island · Meals: Welcome Dinner",

        activities: [
          {
            time: "08:00 AM",
            activity: "W.E.B Du Bois Memorial Museum visit",
            tag: "Business",
          },
          {
            time: "10:00 AM",
            activity: "Departure and transfer back to Accra",
          },
        ],
        localContext:
          " Lagos is Africa's largest city by population, home to 21M+ people and a GDP that rivals many African nations. Victoria Island is the commercial and diplomatic heartbeat.",
      },
    ],
    guide: {
      name: "Ailsa Mensah-Asante",
      rating: 4.9,
      reviews: 124,
      speciality: "Heritage Guide",
      yearsExp: 8,
      languages: [
        { code: "gb", name: "English" },
        { code: "fr", name: "French" },
        { code: "gh", name: "Twi" }, // Twi is Ghanaian → gh
      ],
      certifications: ["UNESCO Certified", "History MA"],
      image: "/tourAssets/Image-1.png",
      testimonials: [
        {
          quote:
            "Ailsa's depth of knowledge brought the castle history to life in a way no textbook ever could. A truly transformative experience.",
          reviewer: "Estella Sackey",
          date: "2 weeks ago",
        },
        {
          quote:
            "Her passion for Ghana's heritage is infectious. Every stop felt personal and deeply meaningful — I'll never forget it.",
          reviewer: "James O.",
          date: "1 month ago",
        },
      ],
    },
    reviews: [
      {
        id: 1,
        name: "Sarah M.",
        avatar: "https://picsum.photos/seed/reviewer-1/40/40",
        rating: 5,
        date: msAgo(50 * 1000),
        text: "Absolutely life-changing experience. Kwame's knowledge of the history was profound and deeply moving. The castle visits were emotional but necessary. Highly recommend to every person of African descent.",
      },
      {
        id: 2,
        name: "James O.",
        avatar: "https://picsum.photos/seed/reviewer-2/40/40",
        rating: 5,
        date: msAgo(5 * 60 * 1000),
        text: "A perfect blend of history, culture, and natural beauty. The canopy walk was exhilarating and the coastal views were stunning. Elysium Tours truly exceeded our expectations.",
      },
      {
        id: 3,
        name: "Priya K.",
        avatar: "https://picsum.photos/seed/reviewer-3/40/40",
        rating: 4,
        date: msAgo(14 * 24 * 60 * 60 * 1000),
        text: "Wonderful tour with excellent organisation. The accommodations were comfortable and the meals were delicious. Would love to return for the extended tour next time.",
      },
    ],
    ratingBreakdown: { 5: 85, 4: 10, 3: 3, 2: 1, 1: 1 },
    totalReviews: 3249,
    categoryRatings: [
      { label: "Guide Quality", score: 4.9 },
      { label: "Value for Money", score: 4.8 },
      { label: "Logistical Quality", score: 4.9 },
      { label: "Transport", score: 4.5 },
    ],
    addOns: [
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <g clip-path="url(#clip0_3749_56820)">
              <path
                d="M7.19104 2.49449L6.69277 1.93394L6.69277 1.93394L7.19104 2.49449ZM12.8037 2.49449L13.302 1.93394V1.93394L12.8037 2.49449ZM12.624 2.33468L12.1257 2.89523V2.89523L12.624 2.33468ZM7.37084 2.33467L7.86911 2.89523V2.89523L7.37084 2.33467ZM3.38162 17.5375L3.82246 16.9308L3.38162 17.5375ZM2.45982 16.6157L3.06659 16.1749L2.45982 16.6157ZM17.535 16.6157L16.9282 16.1749L17.535 16.6157ZM16.6132 17.5375L16.1723 16.9308L16.6132 17.5375ZM18.3307 6.65407H17.5807V10.8333H18.3307H19.0807V6.65407H18.3307ZM10.8307 18.3333V17.5833H9.16406V18.3333V19.0833H10.8307V18.3333ZM1.66406 10.8333H2.41406V6.65407H1.66406H0.914062V10.8333H1.66406ZM12.624 2.33468L12.1257 2.89523L12.3055 3.05505L12.8037 2.49449L13.302 1.93394L13.1222 1.77412L12.624 2.33468ZM7.19104 2.49449L7.68932 3.05505L7.86911 2.89523L7.37084 2.33467L6.87257 1.77412L6.69277 1.93394L7.19104 2.49449ZM4.98484 3.33329V4.08329C5.98183 4.08329 6.94416 3.71741 7.68932 3.05505L7.19104 2.49449L6.69277 1.93394C6.22219 2.35223 5.61446 2.58329 4.98484 2.58329V3.33329ZM12.8037 2.49449L12.3055 3.05505C13.0506 3.71741 14.013 4.08329 15.01 4.08329V3.33329V2.58329C14.3803 2.58329 13.7726 2.35223 13.302 1.93394L12.8037 2.49449ZM12.624 2.33468L13.1222 1.77412C11.3401 0.19004 8.65465 0.19004 6.87257 1.77412L7.37084 2.33467L7.86911 2.89523C9.08287 1.81634 10.9119 1.81634 12.1257 2.89523L12.624 2.33468ZM9.16406 18.3333V17.5833C7.58497 17.5833 6.46089 17.5823 5.59256 17.4882C4.73827 17.3956 4.22094 17.2203 3.82246 16.9308L3.38162 17.5375L2.94079 18.1443C3.63758 18.6505 4.44908 18.8731 5.43099 18.9795C6.39887 19.0843 7.61838 19.0833 9.16406 19.0833V18.3333ZM1.66406 10.8333H0.914062C0.914062 12.379 0.913033 13.5985 1.0179 14.5664C1.12428 15.5483 1.34681 16.3598 1.85306 17.0566L2.45982 16.6157L3.06659 16.1749C2.77708 15.7764 2.60173 15.2591 2.50917 14.4048C2.41509 13.5365 2.41406 12.4124 2.41406 10.8333H1.66406ZM3.38162 17.5375L3.82246 16.9308C3.53241 16.72 3.27733 16.4649 3.06659 16.1749L2.45982 16.6157L1.85306 17.0566C2.15632 17.474 2.52339 17.841 2.94079 18.1443L3.38162 17.5375ZM18.3307 10.8333H17.5807C17.5807 12.4124 17.5797 13.5365 17.4856 14.4048C17.3931 15.2591 17.2177 15.7764 16.9282 16.1749L17.535 16.6157L18.1417 17.0566C18.648 16.3598 18.8705 15.5483 18.9769 14.5664C19.0818 13.5985 19.0807 12.379 19.0807 10.8333H18.3307ZM10.8307 18.3333V19.0833C12.3764 19.0833 13.5959 19.0843 14.5638 18.9795C15.5457 18.8731 16.3572 18.6505 17.054 18.1443L16.6132 17.5375L16.1723 16.9308C15.7739 17.2203 15.2565 17.3956 14.4022 17.4882C13.5339 17.5823 12.4098 17.5833 10.8307 17.5833V18.3333ZM17.535 16.6157L16.9282 16.1749C16.7175 16.4649 16.4624 16.72 16.1723 16.9308L16.6132 17.5375L17.054 18.1443C17.4714 17.841 17.8385 17.474 18.1417 17.0566L17.535 16.6157ZM18.3307 6.65407H19.0807C19.0807 4.40584 17.2582 2.58329 15.01 2.58329V3.33329V4.08329C16.4298 4.08329 17.5807 5.23427 17.5807 6.65407H18.3307ZM1.66406 6.65407H2.41406C2.41406 5.23427 3.56504 4.08329 4.98484 4.08329V3.33329V2.58329C2.73661 2.58329 0.914062 4.40584 0.914062 6.65407H1.66406ZM6.66406 10.8333H5.91406C5.91406 13.0885 7.74223 14.9166 9.9974 14.9166V14.1666V13.4166C8.57066 13.4166 7.41406 12.26 7.41406 10.8333H6.66406ZM9.9974 14.1666V14.9166C12.2526 14.9166 14.0807 13.0885 14.0807 10.8333H13.3307H12.5807C12.5807 12.26 11.4241 13.4166 9.9974 13.4166V14.1666ZM13.3307 10.8333H14.0807C14.0807 8.57813 12.2526 6.74996 9.9974 6.74996V7.49996V8.24996C11.4241 8.24996 12.5807 9.40655 12.5807 10.8333H13.3307ZM9.9974 7.49996V6.74996C7.74223 6.74996 5.91406 8.57813 5.91406 10.8333H6.66406H7.41406C7.41406 9.40655 8.57066 8.24996 9.9974 8.24996V7.49996Z"
                fill="#7B2CBF"
              />
              <path
                d="M14.1641 6.66671C14.1641 7.12694 14.5372 7.50004 14.9974 7.50004C15.4576 7.50004 15.8307 7.12694 15.8307 6.66671C15.8307 6.20647 15.4576 5.83337 14.9974 5.83337C14.5372 5.83337 14.1641 6.20647 14.1641 6.66671Z"
                fill="#7B2CBF"
              />
            </g>
            <defs>
              <clipPath id="clip0_3749_56820">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        ),
        name: "Professional Photo Package",

        desc: "High-resolution photos & edited highlights reel",
        price: "GH₵ 850",
      },
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
          >
            <path
              d="M3.33594 10L5.0026 10.8333"
              stroke="#7B2CBF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M19.1667 10.4165L17.5 10.8332"
              stroke="#7B2CBF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.91406 14.5833L8.11879 14.0715C8.42324 13.3104 8.57546 12.9298 8.8929 12.7149C9.21034 12.5 9.62023 12.5 10.44 12.5H12.0548C12.8746 12.5 13.2845 12.5 13.6019 12.7149C13.9193 12.9298 14.0716 13.3104 14.376 14.0715L14.5807 14.5833"
              stroke="#7B2CBF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2.91406 14.1665V16.5682C2.91406 16.8838 3.11469 17.1723 3.4323 17.3135C3.63838 17.4051 3.83521 17.4998 4.07288 17.4998H5.50525C5.74291 17.4998 5.93975 17.4051 6.14583 17.3135C6.46344 17.1723 6.66406 16.8838 6.66406 16.5682V14.9998"
              stroke="#7B2CBF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.8359 14.9998V16.5682C15.8359 16.8838 16.0366 17.1723 16.3542 17.3135C16.5603 17.4051 16.7571 17.4998 16.9948 17.4998H18.4271C18.6648 17.4998 18.8616 17.4051 19.0677 17.3135C19.3853 17.1723 19.5859 16.8838 19.5859 16.5682V14.1665"
              stroke="#7B2CBF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M17.9141 7.08317L18.7474 6.6665"
              stroke="#7B2CBF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4.58333 7.08317L3.75 6.6665"
              stroke="#7B2CBF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5 7.5L5.90692 4.77924C6.2736 3.67921 6.45693 3.12919 6.89342 2.8146C7.32989 2.5 7.90966 2.5 9.0692 2.5H13.4308C14.5903 2.5 15.1701 2.5 15.6066 2.8146C16.0431 3.12919 16.2264 3.67921 16.5931 4.77924L17.5 7.5"
              stroke="#7B2CBF"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
            <path
              d="M4.9974 7.5H17.4974C18.2951 8.34458 19.5807 9.52075 19.5807 10.833V13.7252C19.5807 14.2006 19.2645 14.6007 18.8447 14.6562L16.2474 15H6.2474L3.65003 14.6562C3.23035 14.6007 2.91406 14.2006 2.91406 13.7252V10.833C2.91406 9.52075 4.19972 8.34458 4.9974 7.5Z"
              stroke="#7B2CBF"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
          </svg>
        ),
        name: "Private Vehicle Upgrade",
        desc: "Exclusive private transfer throughout the tour",
        price: "GH₵ 850",
      },
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M8.035 1.43875C8.385 0.73875 9.01625 0 10 0C10.9837 0 11.615 0.74 11.965 1.43875C12.3262 2.1625 12.5 3.03875 12.5 3.75V8.36375L18.9625 11.595C19.2742 11.7506 19.5364 11.99 19.7197 12.2863C19.9029 12.5826 20 12.9241 20 13.2725V15C20 15.0907 19.9802 15.1804 19.942 15.2627C19.9038 15.345 19.8482 15.418 19.779 15.4766C19.7097 15.5352 19.6286 15.5781 19.5411 15.6022C19.4537 15.6263 19.362 15.6311 19.2725 15.6162L12.3887 14.4687L11.92 17.285L13.5675 18.9325C13.6551 19.0199 13.7148 19.1314 13.739 19.2528C13.7633 19.3741 13.7509 19.5 13.7035 19.6143C13.6561 19.7287 13.5758 19.8264 13.4728 19.895C13.3698 19.9637 13.2488 20.0002 13.125 20H6.875C6.75122 20.0002 6.63017 19.9637 6.52718 19.895C6.4242 19.8264 6.34392 19.7287 6.29652 19.6143C6.24912 19.5 6.23674 19.3741 6.26095 19.2528C6.28516 19.1314 6.34487 19.0199 6.4325 18.9325L8.08125 17.285L7.61125 14.4687L0.7275 15.6162C0.638004 15.6311 0.546341 15.6263 0.45888 15.6022C0.371418 15.5781 0.290255 15.5352 0.221029 15.4766C0.151803 15.418 0.0961726 15.345 0.0580036 15.2627C0.0198346 15.1804 4.17625e-05 15.0907 0 15L0 13.2725C1.17688e-05 12.9241 0.0970907 12.5826 0.280348 12.2863C0.463605 11.99 0.725792 11.7506 1.0375 11.595L7.5 8.36375L7.5 3.75C7.5 3.04 7.675 2.16125 8.035 1.43875ZM9.1525 1.99875C8.88875 2.525 8.75 3.21125 8.75 3.75V8.75C8.75 8.86597 8.71772 8.97966 8.65679 9.07834C8.59587 9.17701 8.50868 9.25679 8.405 9.30875L1.595 12.7137C1.49132 12.7657 1.40413 12.8455 1.3432 12.9442C1.28228 13.0428 1.25 13.1565 1.25 13.2725L1.25 14.2625L8.0225 13.1337C8.18574 13.1066 8.35309 13.1453 8.48783 13.2414C8.62256 13.3375 8.7137 13.4831 8.74125 13.6462L9.36625 17.3962C9.38281 17.4947 9.37556 17.5956 9.34511 17.6906C9.31467 17.7857 9.26191 17.872 9.19125 17.9425L8.385 18.75H11.6175L10.8087 17.9425C10.7383 17.8722 10.6856 17.786 10.6552 17.6912C10.6248 17.5964 10.6174 17.4957 10.6337 17.3975L11.2587 13.6475C11.2722 13.5665 11.3016 13.4889 11.3451 13.4192C11.3886 13.3495 11.4454 13.2891 11.5122 13.2414C11.5791 13.1936 11.6547 13.1596 11.7348 13.1411C11.8148 13.1227 11.8977 13.1201 11.9787 13.1337L18.75 14.2625V13.2725C18.75 13.1565 18.7177 13.0428 18.6568 12.9442C18.5959 12.8455 18.5087 12.7657 18.405 12.7137L11.595 9.30875C11.4913 9.25679 11.4041 9.17701 11.3432 9.07834C11.2823 8.97966 11.25 8.86597 11.25 8.75V3.75C11.25 3.21 11.1125 2.52625 10.8475 1.99875C10.5725 1.44875 10.2662 1.25 10 1.25C9.73375 1.25 9.4275 1.4475 9.1525 1.99875Z"
              fill="#7B2CBF"
            />
          </svg>
        ),
        name: "Elmwood International Flights",
        desc: "Return flights from your home country",
        price: "GH₵ 850",
      },
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M8.035 1.43875C8.385 0.73875 9.01625 0 10 0C10.9837 0 11.615 0.74 11.965 1.43875C12.3262 2.1625 12.5 3.03875 12.5 3.75V8.36375L18.9625 11.595C19.2742 11.7506 19.5364 11.99 19.7197 12.2863C19.9029 12.5826 20 12.9241 20 13.2725V15C20 15.0907 19.9802 15.1804 19.942 15.2627C19.9038 15.345 19.8482 15.418 19.779 15.4766C19.7097 15.5352 19.6286 15.5781 19.5411 15.6022C19.4537 15.6263 19.362 15.6311 19.2725 15.6162L12.3887 14.4687L11.92 17.285L13.5675 18.9325C13.6551 19.0199 13.7148 19.1314 13.739 19.2528C13.7633 19.3741 13.7509 19.5 13.7035 19.6143C13.6561 19.7287 13.5758 19.8264 13.4728 19.895C13.3698 19.9637 13.2488 20.0002 13.125 20H6.875C6.75122 20.0002 6.63017 19.9637 6.52718 19.895C6.4242 19.8264 6.34392 19.7287 6.29652 19.6143C6.24912 19.5 6.23674 19.3741 6.26095 19.2528C6.28516 19.1314 6.34487 19.0199 6.4325 18.9325L8.08125 17.285L7.61125 14.4687L0.7275 15.6162C0.638004 15.6311 0.546341 15.6263 0.45888 15.6022C0.371418 15.5781 0.290255 15.5352 0.221029 15.4766C0.151803 15.418 0.0961726 15.345 0.0580036 15.2627C0.0198346 15.1804 4.17625e-05 15.0907 0 15L0 13.2725C1.17688e-05 12.9241 0.0970907 12.5826 0.280348 12.2863C0.463605 11.99 0.725792 11.7506 1.0375 11.595L7.5 8.36375L7.5 3.75C7.5 3.04 7.675 2.16125 8.035 1.43875ZM9.1525 1.99875C8.88875 2.525 8.75 3.21125 8.75 3.75V8.75C8.75 8.86597 8.71772 8.97966 8.65679 9.07834C8.59587 9.17701 8.50868 9.25679 8.405 9.30875L1.595 12.7137C1.49132 12.7657 1.40413 12.8455 1.3432 12.9442C1.28228 13.0428 1.25 13.1565 1.25 13.2725L1.25 14.2625L8.0225 13.1337C8.18574 13.1066 8.35309 13.1453 8.48783 13.2414C8.62256 13.3375 8.7137 13.4831 8.74125 13.6462L9.36625 17.3962C9.38281 17.4947 9.37556 17.5956 9.34511 17.6906C9.31467 17.7857 9.26191 17.872 9.19125 17.9425L8.385 18.75H11.6175L10.8087 17.9425C10.7383 17.8722 10.6856 17.786 10.6552 17.6912C10.6248 17.5964 10.6174 17.4957 10.6337 17.3975L11.2587 13.6475C11.2722 13.5665 11.3016 13.4889 11.3451 13.4192C11.3886 13.3495 11.4454 13.2891 11.5122 13.2414C11.5791 13.1936 11.6547 13.1596 11.7348 13.1411C11.8148 13.1227 11.8977 13.1201 11.9787 13.1337L18.75 14.2625V13.2725C18.75 13.1565 18.7177 13.0428 18.6568 12.9442C18.5959 12.8455 18.5087 12.7657 18.405 12.7137L11.595 9.30875C11.4913 9.25679 11.4041 9.17701 11.3432 9.07834C11.2823 8.97966 11.25 8.86597 11.25 8.75V3.75C11.25 3.21 11.1125 2.52625 10.8475 1.99875C10.5725 1.44875 10.2662 1.25 10 1.25C9.73375 1.25 9.4275 1.4475 9.1525 1.99875Z"
              fill="#7B2CBF"
            />
          </svg>
        ),
        name: "Souvenir Bundle",
        desc: "Curated Ghanaian artisan souvenirs and gifts",
        price: "GH₵ 850",
      },
    ],
  },
};

// ─── Templated tour data (fallback) ────────────────────────────────────────
// For tour slugs that don't have rich curated data in TOUR_DATA above, we
// build per-tour entries by merging a shared TOUR_TEMPLATE with slug-specific
// overrides (title, location, price, duration, description, country).
// This way every tour link in the app routes to a detail page with at least
// the right title and basic info, instead of falling back to Elmina.
const TOUR_TEMPLATE = {
  rating: 4.8,
  reviewCount: 24,
  maxGuests: 12,
  languages: "English, Twi, French",
  cancellation: "Cancellation available",
  images: Array.from({ length: 24 }, (_, i) => `https://picsum.photos/seed/tour-detail-${i + 1}/856/717`),
  heroMainImage: "https://picsum.photos/seed/tour-hero-main/856/717",
  heroTopRight: "https://picsum.photos/seed/tour-hero-top/867/366",
  heroBottomLeft: "https://picsum.photos/seed/tour-hero-bl/430/347",
  heroBottomRight: "https://picsum.photos/seed/tour-hero-bottom/432/347",
  bestFor: ["Cultural Enthusiasts", "Diaspora Travelers", "International Tourists", "Couples"],
  included: [
    { type: "check", text: "Expert certified local guides" },
    { type: "check", text: "Hotel accommodation (where applicable)" },
    { type: "check", text: "Daily meals as per itinerary" },
    { type: "check", text: "All entrance fees" },
    { type: "check", text: "Hotel pickup & drop-off" },
    { type: "check", text: "Private comfortable transport" },
    { type: "cross", text: "International/domestic flights" },
    { type: "cross", text: "Personal spending & tips" },
    { type: "cross", text: "Travel insurance" },
    { type: "cross", text: "Alcoholic beverages" },
  ],
  itinerary: [
    {
      day: 1,
      title: "Departure & Arrival",
      activities: ["Hotel pickup and orientation", "Scenic transit to destination", "Traditional welcome dinner"],
    },
    {
      day: 2,
      title: "Main Exploration Day",
      activities: ["Guided tour of key sights", "Cultural immersion experience", "Local cuisine tasting"],
    },
    {
      day: 3,
      title: "Return Journey",
      activities: ["Optional morning excursion", "Souvenir shopping", "Departure and transfer back"],
    },
  ],
  guide: {
    name: "Ailsa Mensah-Asante",
    rating: 4.9,
    reviews: 124,
    speciality: "Heritage Guide",
    yearsExp: 8,
    languages: [
      { code: "gb", name: "English" },
      { code: "fr", name: "French" },
      { code: "gh", name: "Twi" },
    ],
    certifications: ["UNESCO Certified", "History MA"],
    image: "https://picsum.photos/seed/guide-ailsa/296/393",
    testimonials: [
      { quote: "Ailsa's depth of knowledge brought the history to life in a way no textbook ever could.", reviewer: "Estella Sackey", date: "2 weeks ago" },
      { quote: "Her passion for Ghana's heritage is infectious. Every stop felt personal and deeply meaningful.", reviewer: "James O.", date: "1 month ago" },
    ],
  },
  reviews: [
    { id: 1, name: "Sarah M.", avatar: "https://picsum.photos/seed/reviewer-1/40/40", rating: 5, date: "January 2025", text: "Absolutely life-changing experience. The guide's knowledge was profound and deeply moving. Highly recommend." },
    { id: 2, name: "James O.", avatar: "https://picsum.photos/seed/reviewer-2/40/40", rating: 5, date: "December 2024", text: "A perfect blend of history, culture, and natural beauty. Elysium Tours truly exceeded our expectations." },
    { id: 3, name: "Priya K.", avatar: "https://picsum.photos/seed/reviewer-3/40/40", rating: 4, date: "November 2024", text: "Wonderful tour with excellent organisation. Comfortable accommodations and delicious meals." },
  ],
  ratingBreakdown: { 5: 85, 4: 10, 3: 3, 2: 1, 1: 1 },
  totalReviews: 3249,
  categoryRatings: [
    { label: "Guide Quality", score: 4.9 },
    { label: "Value for Money", score: 4.8 },
    { label: "Logistical Quality", score: 4.9 },
    { label: "Transport", score: 4.5 },
  ],
  addOns: [
    { name: "Professional Photo Package", desc: "High-resolution photos & edited highlights reel", price: "GH₵ 850" },
    { name: "Private Vehicle Upgrade", desc: "Exclusive private transfer throughout the tour", price: "GH₵ 850" },
    { name: "International Flights", desc: "Return flights from your home country", price: "GH₵ 850" },
    { name: "Souvenir Bundle", desc: "Curated artisan souvenirs and gifts", price: "GH₵ 850" },
  ],
};

// Per-tour overrides — only the fields that should be unique per tour.
// Anything not specified falls back to TOUR_TEMPLATE.
const TOUR_OVERRIDES = {
  // ── Featured tours (TourPage's TourFeaturedSection) ──────────────────
  "mole-national-park-safari": {
    title: "Mole National Park Safari",
    country: "Ghana",
    location: "Northern Region, Ghana",
    rating: 4.8,
    duration: "3 Days / 2 Nights",
    price: "GHC 5,500",
    description: "Experience Ghana's largest wildlife sanctuary on this immersive safari adventure. Spot elephants, antelopes, baboons, and over 300 bird species across 4,840 km² of pristine savannah. Take guided walking safaris with armed rangers, swim in the lodge's pool overlooking the watering hole, and learn about traditional northern Ghanaian culture. An eco-certified experience that supports local conservation.",
  },
  "accra-arts-culture-food-day": {
    title: "Accra Arts, Culture & Food Day",
    country: "Ghana",
    location: "Accra, Greater Accra",
    rating: 4.7,
    duration: "1 Day (8 hours)",
    price: "GHC 2,500",
    description: "A vibrant single-day immersion into Ghana's capital. Explore the Centre for National Culture for traditional crafts, visit the Kwame Nkrumah Memorial Park, sample street food at Makola Market, and enjoy a curated lunch at a local fusion restaurant. Perfect for first-time visitors looking to capture the essence of Accra in a single, memorable day.",
  },
  "dakar-business-immersion": {
    title: "Dakar Business & Immersion",
    country: "Senegal",
    location: "Dakar, Senegal",
    rating: 4.9,
    duration: "3 Days / 2 Nights",
    price: "GHC 6,500",
    description: "A premium business-class tour of West Africa's francophone hub. Combine networking opportunities with cultural immersion: visit the historic Île de Gorée (UNESCO World Heritage Site), explore the bustling Sandaga Market, dine at Senegal's finest restaurants, and experience the warmth of Teranga hospitality.",
  },

  // ── HomePage FeaturedToursSection ────────────────────────────────────
  "accra-bustling-city-market-tour": {
    title: "Accra Bustling City & Market Tour",
    country: "Ghana",
    location: "Accra, Greater Accra",
    rating: 4.8,
    duration: "3 Days / 2 Nights",
    price: "GHC 3,500",
    description: "Dive into the energetic heart of Accra with this multi-day exploration. Wander through Makola, Kantamanto, and Madina markets to experience daily Ghanaian life. Visit Jamestown's lighthouse, the W.E.B. Du Bois Memorial Centre, and Independence Square.",
  },
  "kumasi-heritage-market-discovery": {
    title: "Kumasi Heritage & Market Discovery",
    country: "Ghana",
    location: "Kumasi, Ashanti Region",
    rating: 4.7,
    duration: "2 Days / 1 Night",
    price: "GHC 5,000",
    description: "Experience the cultural heart of the Ashanti Kingdom. Visit the Manhyia Palace Museum, Kejetia Market (one of West Africa's largest open-air markets), and the National Cultural Centre. Watch master craftsmen weave authentic kente cloth in Bonwire village, and learn the history of the Golden Stool — sacred symbol of the Ashanti people.",
  },
  "wli-waterfalls-nature-exploration": {
    title: "Wli Waterfalls & Nature Exploration",
    country: "Ghana",
    location: "Volta Region, Ghana",
    rating: 4.9,
    duration: "1 Day",
    price: "GHC 4,500",
    description: "Trek to West Africa's highest waterfall in the lush mountains of the Volta Region. The hike through the Agumatsa Wildlife Sanctuary takes you past tropical butterflies, fruit bats, and dense rainforest before revealing the spectacular 80-metre Wli Falls.",
  },

  // ── Country page tours ──────────────────────────────────────────────
  "homecoming-kakum-national-park": {
    title: "The Homecoming Experience to Kakum National Park",
    country: "Ghana",
    location: "Cape Coast, Ghana",
    rating: 4.8,
    duration: "5 Days / 4 Nights",
    price: "GHC 4,000",
    description: "A specially curated diaspora homecoming experience combining heritage with adventure. Walk through the Cape Coast and Elmina Castles, traverse Kakum's iconic canopy walkway high above the rainforest, and join in a naming ceremony at a traditional Akan village.",
  },
  "accra-city-culture-tour": {
    title: "Accra City & Culture Full-Day Tour",
    country: "Ghana",
    location: "Accra, Greater Accra",
    rating: 4.8,
    duration: "1 Day",
    price: "GHC 250",
    description: "The definitive single-day introduction to Accra. From Independence Square to the National Museum, from Jamestown fishing harbour to the Arts Centre, this tour packs the highlights of Ghana's capital into one carefully-paced day.",
  },
  "canopy-bridges-kakum": {
    title: "Canopy Bridges & Adventure at Kakum",
    country: "Ghana",
    location: "Central Region, Ghana",
    rating: 4.6,
    duration: "1 Day",
    price: "GHC 350",
    description: "An adrenaline-filled day at Kakum National Park's famous canopy walkway. Suspended 30 metres above the rainforest floor across seven swaying bridges, this is one of only three such walkways in Africa.",
  },
  "legacy-return-diaspora-experience": {
    title: "Legacy & Return — Diaspora Experience",
    country: "Ghana",
    location: "Cape Coast, Ghana",
    rating: 5.0,
    duration: "4 Days / 3 Nights",
    price: "GHC 7,500",
    description: "An emotionally profound diaspora journey designed for travelers tracing their African roots. Visit Cape Coast and Elmina Castles with specialised heritage guides, participate in libation and naming ceremonies, meet with traditional chiefs, and explore W.E.B. Du Bois's legacy.",
  },
  "boti-falls-umbrella-rock": {
    title: "Boti Falls & Umbrella Rock Day Trip",
    country: "Ghana",
    location: "Eastern Region, Ghana",
    rating: 4.7,
    duration: "1 Day",
    price: "GHC 300",
    description: "Discover the natural wonders of Ghana's Eastern Region. The twin Boti Falls plunge 30 metres into a serene pool — locals affectionately call them the 'male and female' falls. A short hike away, marvel at the gravity-defying Umbrella Rock and the mysterious 'three-headed' palm tree.",
  },
  "premium-accra-heritage-business": {
    title: "Premium Accra Heritage & Business Tour",
    country: "Ghana",
    location: "Greater Accra, Ghana",
    rating: 4.8,
    duration: "2 Days / 1 Night",
    price: "GHC 6,000",
    description: "A business-class tour designed for executives visiting Accra. Combines high-quality cultural sites (Du Bois Centre, Nkrumah Mausoleum, Jamestown) with networking opportunities at Accra's premier business venues.",
  },
  "bolgatanga-arts-crafts-paga-crocodile": {
    title: "Bolgatanga Arts, Crafts & Paga Crocodile",
    country: "Ghana",
    location: "Upper East, Ghana",
    rating: 4.6,
    duration: "5 Days / 4 Nights",
    price: "GHC 8,500",
    description: "Travel to Ghana's far north for a deep cultural immersion. Visit the famous Bolgatanga craft market for handmade leather and basketry, see the legendary Paga Crocodile Pond where sacred crocodiles coexist peacefully with humans.",
  },
  "bolgatanga-arts-crafts-paga": {
    title: "Bolgatanga Arts, Crafts & Paga Crocodile",
    country: "Ghana",
    location: "Upper East, Ghana",
    rating: 4.6,
    duration: "5 Days / 4 Nights",
    price: "GHC 8,500",
    description: "Travel to Ghana's far north for a deep cultural immersion. Visit the famous Bolgatanga craft market for handmade leather and basketry, see the legendary Paga Crocodile Pond where sacred crocodiles coexist peacefully with humans.",
  },
  "kintampo-falls-rock-village": {
    title: "Kintampo Falls & Rock Village Tour",
    country: "Ghana",
    location: "Brong-Ahafo, Ghana",
    rating: 4.8,
    duration: "1 Day",
    price: "GHC 320",
    description: "Visit the breathtaking Kintampo Falls — three cascading falls plunging into deep emerald pools surrounded by tropical forest. Continue to the unique Rock Village (Tongo Rocks) where traditional shrines are built into the natural rock formations.",
  },
  "cape-three-points-coastal-heritage": {
    title: "Cape Three Points & Coastal Heritage",
    country: "Ghana",
    location: "Western Region, Ghana",
    rating: 4.9,
    duration: "3 Days / 2 Nights",
    price: "GHC 5,500",
    description: "Visit the southernmost tip of Ghana — Cape Three Points — where three coastal points meet the Atlantic. Explore the historic Fort Apollonia, walk the pristine beaches of Princes Town, and experience the slower pace of Ghana's lesser-known western coast.",
  },
};

// Build templated tour data by merging TOUR_TEMPLATE + per-tour overrides.
// Used as fallback for tour slugs that don't have rich curated data in TOUR_DATA above.
const TEMPLATED_TOURS = Object.fromEntries(
  Object.entries(TOUR_OVERRIDES).map(([slug, overrides]) => [
    slug,
    { ...TOUR_TEMPLATE, ...overrides },
  ])
);

const RELATED_TOURS = [
  {
    id: 1,
    image: "https://picsum.photos/seed/related-1/351/373",
    location: "Accra/Ghana",
    duration: { class: "Multi-Day", span: "5 Days/4 Nights" },
    maxGroupSize: 15,
    pickupIncluded: false,
    tags: ["Cultural", "Diaspora"],
    rating: 4.8,
    title: "The Homecoming Experience to Kakum National Park",
    availabilityBadge: "Opened Daily",
    price: "Ghs.400.00",
    country: "ghana",
    slug: "homecoming-kakum-national-park",
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/related-2/351/373",
    location: "Kumasi/Ghana",
    duration: { class: "Multi-Day", span: "4 Days/3 Nights" },
    maxGroupSize: 10,
    pickupIncluded: true,
    tags: ["Heritage", "Culture"],
    rating: 4.9,
    title: "Kumasi Heritage & Market Discovery",
    availabilityBadge: "Opened Daily",
    price: "Ghs.500.00",
    country: "ghana",
    slug: "kumasi-heritage-market-discovery",
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/related-3/351/373",
    location: "Volta Region/Ghana",
    duration: { class: "Day Tour", span: "1 Day" },
    maxGroupSize: 8,
    pickupIncluded: false,
    tags: ["Nature", "Scenic"],
    rating: 4.7,
    title: "Wli Waterfalls & Nature Exploration",
    availabilityBadge: "Opened Daily",
    price: "Ghs.450.00",
    country: "ghana",
    slug: "wli-waterfalls-nature-exploration",
  },
];

/** Figma: left column first (5 of 9), right column second — split at ceil(n/2). */
function splitBusinessAmenityColumns(items) {
  const mid = Math.ceil(items.length / 2);
  return [items.slice(0, mid), items.slice(mid)];
}

/** Tour highlight entry: Figma uses title + body; plain strings are treated as title-only. */
function normalizeTourHighlight(entry) {
  if (typeof entry === "string") {
    return { title: entry, description: "" };
  }
  return {
    title: entry?.title ?? "",
    description: entry?.description ?? "",
  };
}

function importantInformationRowLabel(block) {
  return block?.label ?? block?.title ?? "";
}

// ─── Icon components ──────────────────────────────────────────────────────────
const StarIcon = ({ filled = true, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path
      d="M7.02 1.47C7.35 0.51 8.65 0.51 8.98 1.47L9.97 4.43C10.1 4.83 10.47 5.1 10.88 5.1H13.97C14.97 5.1 15.38 6.38 14.57 6.95L12.08 8.77C11.73 9.02 11.58 9.47 11.71 9.87L12.7 12.83C13.03 13.79 11.93 14.59 11.12 14.02L8.63 12.2C8.25 11.93 7.75 11.93 7.37 12.2L4.88 14.02C4.07 14.59 2.97 13.79 3.3 12.83L4.29 9.87C4.42 9.47 4.27 9.02 3.92 8.77L1.43 6.95C0.62 6.38 1.03 5.1 2.03 5.1H5.12C5.53 5.1 5.9 4.83 6.03 4.43L7.02 1.47Z"
      fill={filled ? "#7B2CBF" : "#D6BEEB"}
      stroke={filled ? "none" : "none"}
      strokeWidth="1.2"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M4.16406 10.833L7.4974 14.1663L15.8307 5.83301"
      stroke="#7B2CBF"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const CrossIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M5 15L15 5M5 5L15 15"
      stroke="#FF3B30"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 9C9.105 9 10 8.105 10 7C10 5.895 9.105 5 8 5C6.895 5 6 5.895 6 7C6 8.105 6.895 9 8 9Z"
      stroke="#6f6f6f"
      strokeWidth="1.2"
    />
    <path
      d="M8 2C5.33 2 3 4.27 3 6.87C3 10.33 8 14 8 14C8 14 13 10.33 13 6.87C13 4.27 10.67 2 8 2Z"
      stroke="#6f6f6f"
      strokeWidth="1.2"
    />
  </svg>
);

const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M10 5.16666H9.5C9.5 5.99509 8.82843 6.66666 8 6.66666V7.16666V7.66666C9.38071 7.66666 10.5 6.54738 10.5 5.16666H10ZM8 7.16666V6.66666C7.17157 6.66666 6.5 5.99509 6.5 5.16666H6H5.5C5.5 6.54738 6.61929 7.66666 8 7.66666V7.16666ZM6 5.16666H6.5C6.5 4.33824 7.17157 3.66666 8 3.66666V3.16666V2.66666C6.61929 2.66666 5.5 3.78595 5.5 5.16666H6ZM8 3.16666V3.66666C8.82843 3.66666 9.5 4.33824 9.5 5.16666H10H10.5C10.5 3.78595 9.38071 2.66666 8 2.66666V3.16666ZM6 9.16666V9.66666H10V9.16666V8.66666H6V9.16666ZM10 13.1667V12.6667H6V13.1667V13.6667H10V13.1667ZM6 13.1667V12.6667C5.17157 12.6667 4.5 11.9951 4.5 11.1667H4H3.5C3.5 12.5474 4.61929 13.6667 6 13.6667V13.1667ZM12 11.1667H11.5C11.5 11.9951 10.8284 12.6667 10 12.6667V13.1667V13.6667C11.3807 13.6667 12.5 12.5474 12.5 11.1667H12ZM10 9.16666V9.66666C10.8284 9.66666 11.5 10.3382 11.5 11.1667H12H12.5C12.5 9.78595 11.3807 8.66666 10 8.66666V9.16666ZM6 9.16666V8.66666C4.61929 8.66666 3.5 9.78595 3.5 11.1667H4H4.5C4.5 10.3382 5.17157 9.66666 6 9.66666V9.16666Z"
      fill="#2D2D2D"
    />
    <path
      d="M5.16549 6.92577C5.06034 6.75685 4.86304 6.66666 4.66406 6.66666C3.83564 6.66666 3.16406 5.99509 3.16406 5.16666C3.16406 4.33824 3.83564 3.66666 4.66406 3.66666C4.86304 3.66666 5.06034 3.57648 5.16549 3.40756C5.17014 3.40009 5.17482 3.39264 5.17953 3.38521C5.3546 3.10887 5.26589 2.7176 4.94073 2.6818C4.84988 2.6718 4.75757 2.66666 4.66406 2.66666C3.28335 2.66666 2.16406 3.78595 2.16406 5.16666C2.16406 6.54738 3.28335 7.66666 4.66406 7.66666C4.75757 7.66666 4.84988 7.66153 4.94073 7.65153C5.26589 7.61573 5.3546 7.22446 5.17953 6.94812C5.17482 6.94069 5.17014 6.93324 5.16549 6.92577Z"
      fill="#2D2D2D"
    />
    <path
      d="M3.13626 12.2112C3.06058 12.085 2.92699 12 2.77979 12H2.66406C1.83564 12 1.16406 11.3284 1.16406 10.5C1.16406 9.67157 1.83564 9 2.66406 9H2.77979C2.92699 9 3.06058 8.91501 3.13626 8.78875C3.32099 8.48055 3.12052 8 2.76119 8H2.66406C1.28335 8 0.164062 9.11929 0.164062 10.5C0.164062 11.8807 1.28335 13 2.66406 13H2.76119C3.12052 13 3.32099 12.5194 3.13626 12.2112Z"
      fill="#2D2D2D"
    />
    <path
      d="M10.8153 6.94812C10.6402 7.22446 10.7289 7.61573 11.0541 7.65153C11.1449 7.66153 11.2372 7.66666 11.3307 7.66666C12.7114 7.66666 13.8307 6.54738 13.8307 5.16666C13.8307 3.78595 12.7114 2.66666 11.3307 2.66666C11.2372 2.66666 11.1449 2.6718 11.0541 2.6818C10.7289 2.7176 10.6402 3.10887 10.8153 3.38521C10.82 3.39264 10.8247 3.40009 10.8293 3.40756C10.9345 3.57648 11.1318 3.66666 11.3307 3.66666C12.1592 3.66666 12.8307 4.33824 12.8307 5.16666C12.8307 5.99509 12.1592 6.66666 11.3307 6.66666C11.1318 6.66666 10.9345 6.75685 10.8293 6.92577C10.8247 6.93324 10.82 6.94069 10.8153 6.94812Z"
      fill="#2D2D2D"
    />
    <path
      d="M12.8585 12.2112C12.6738 12.5194 12.8743 13 13.2336 13H13.3307C14.7114 13 15.8307 11.8807 15.8307 10.5C15.8307 9.11929 14.7114 8 13.3307 8H13.2336C12.8743 8 12.6738 8.48055 12.8585 8.78875C12.9342 8.91501 13.0678 9 13.215 9H13.3307C14.1592 9 14.8307 9.67157 14.8307 10.5C14.8307 11.3284 14.1592 12 13.3307 12H13.215C13.0678 12 12.9342 12.085 12.8585 12.2112Z"
      fill="#2D2D2D"
    />
  </svg>
);

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M8.5026 5.33333C8.5026 5.05719 8.27875 4.83333 8.0026 4.83333C7.72646 4.83333 7.5026 5.05719 7.5026 5.33333L8.0026 5.33333H8.5026ZM9.4847 10.0997C9.72385 10.2377 10.0296 10.1558 10.1677 9.91666C10.3058 9.67751 10.2238 9.37171 9.9847 9.23365L9.7347 9.66666L9.4847 10.0997ZM1.69026 1.77623C1.47463 1.94873 1.43966 2.26338 1.61217 2.47901C1.78467 2.69464 2.09932 2.7296 2.31495 2.5571L2.0026 2.16666L1.69026 1.77623ZM3.98162 1.22376C4.19725 1.05126 4.23221 0.736612 4.05971 0.520981C3.8872 0.30535 3.57255 0.270389 3.35692 0.442894L3.66927 0.833328L3.98162 1.22376ZM13.6903 2.5571C13.9059 2.7296 14.2205 2.69464 14.393 2.47901C14.5655 2.26338 14.5306 1.94873 14.315 1.77623L14.0026 2.16666L13.6903 2.5571ZM12.6483 0.442894C12.4327 0.270389 12.118 0.30535 11.9455 0.520981C11.773 0.736612 11.808 1.05126 12.0236 1.22376L12.3359 0.833328L12.6483 0.442894ZM8.14774 8.25993L8.61146 8.07294L8.14774 8.25993ZM8.42741 8.74433L8.03361 9.05242L8.42741 8.74433ZM8.0026 5.33333L7.5026 5.33333V6.66662H8.0026H8.5026L8.5026 5.33333H8.0026ZM14.6693 7.99999H14.1693C14.1693 11.4058 11.4084 14.1667 8.0026 14.1667V14.6667V15.1667C11.9606 15.1667 15.1693 11.958 15.1693 7.99999H14.6693ZM8.0026 14.6667V14.1667C4.59685 14.1667 1.83594 11.4058 1.83594 7.99999H1.33594H0.835938C0.835938 11.958 4.04456 15.1667 8.0026 15.1667V14.6667ZM1.33594 7.99999H1.83594C1.83594 4.59424 4.59685 1.83333 8.0026 1.83333V1.33333V0.833328C4.04456 0.833328 0.835938 4.04195 0.835938 7.99999H1.33594ZM8.0026 1.33333V1.83333C11.4084 1.83333 14.1693 4.59424 14.1693 7.99999H14.6693H15.1693C15.1693 4.04195 11.9606 0.833328 8.0026 0.833328V1.33333ZM2.0026 2.16666L2.31495 2.5571L3.98162 1.22376L3.66927 0.833328L3.35692 0.442894L1.69026 1.77623L2.0026 2.16666ZM14.0026 2.16666L14.315 1.77623L12.6483 0.442894L12.3359 0.833328L12.0236 1.22376L13.6903 2.5571L14.0026 2.16666ZM8.0026 6.66662H7.5026C7.5026 7.44719 7.49399 7.97568 7.68403 8.44693L8.14774 8.25993L8.61146 8.07294C8.51122 7.82436 8.5026 7.53059 8.5026 6.66662H8.0026ZM9.7347 9.66666L9.9847 9.23365C9.23647 8.80167 8.98636 8.64733 8.82121 8.43623L8.42741 8.74433L8.03361 9.05242C8.34671 9.45262 8.80871 9.7094 9.4847 10.0997L9.7347 9.66666ZM8.14774 8.25993L7.68403 8.44693C7.77162 8.66414 7.8893 8.86796 8.03361 9.05242L8.42741 8.74433L8.82121 8.43623C8.73462 8.32556 8.66401 8.20326 8.61146 8.07294L8.14774 8.25993Z"
      fill="#2D2D2D"
    />
  </svg>
);

const GlobeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M1.33594 8.00002C1.33594 8.70129 1.45624 9.37442 1.67735 10M1.67735 10H7.33594M1.67735 10C2.50102 12.3304 4.7235 14 7.33594 14C6.30648 14 5.45868 11.6666 5.34814 8.66669M8.6784 6H14.3369M14.3369 6C13.5133 3.66961 11.2908 2 8.6784 2C9.74567 2 10.6177 4.508 10.6753 7.66669M14.3369 6C14.5228 6.52578 14.6374 7.08522 14.6693 7.66669"
      stroke="#2D2D2D"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M1.33594 3.53123C1.33594 2.79899 1.33594 2.43287 1.46086 2.14893C1.59334 1.84783 1.82168 1.60581 2.10578 1.46541C2.37368 1.33301 2.71912 1.33301 3.41001 1.33301H4.0026C5.25968 1.33301 5.88822 1.33301 6.27874 1.74691C6.66927 2.16081 6.66927 2.82697 6.66927 4.1593V5.66535C6.66927 6.24651 6.66927 6.53709 6.49322 6.63695C6.31718 6.73681 6.08905 6.57562 5.6328 6.25325L5.56329 6.20413C5.22984 5.96853 5.06312 5.85073 4.87417 5.79009C4.68522 5.72946 4.48484 5.72946 4.08409 5.72946H3.41001C2.71912 5.72946 2.37368 5.72946 2.10578 5.59706C1.82168 5.45665 1.59334 5.21464 1.46086 4.91353C1.33594 4.6296 1.33594 4.26348 1.33594 3.53123Z"
      stroke="#2D2D2D"
    />
    <path
      d="M14.6693 11.5312C14.6693 10.799 14.6693 10.4329 14.5443 10.1489C14.4119 9.84781 14.1835 9.60581 13.8994 9.46541C13.6315 9.33301 13.2861 9.33301 12.5952 9.33301H12.0026C10.7455 9.33301 10.117 9.33301 9.72647 9.74694C9.33594 10.1608 9.33594 10.8269 9.33594 12.1593V13.6653C9.33594 14.2465 9.33594 14.5371 9.512 14.6369C9.688 14.7368 9.91614 14.5756 10.3724 14.2533L10.4419 14.2041C10.7753 13.9685 10.9421 13.8507 11.131 13.7901C11.32 13.7295 11.5203 13.7295 11.9211 13.7295H12.5952C13.2861 13.7295 13.6315 13.7295 13.8994 13.5971C14.1835 13.4567 14.4119 13.2147 14.5443 12.9135C14.6693 12.6296 14.6693 12.2635 14.6693 11.5312Z"
      stroke="#2D2D2D"
    />
  </svg>
);

const CancelIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M7.33333 1.33301C4.81917 1.33301 3.5621 1.33301 2.78105 2.0855C2 2.83799 2 4.04911 2 6.47136V11.9869C2 13.5241 2 14.2927 2.51523 14.5679C3.51298 15.1006 5.38453 13.3231 6.27333 12.7879C6.7888 12.4775 7.04653 12.3223 7.33333 12.3223C7.62013 12.3223 7.87787 12.4775 8.39333 12.7879C9.28213 13.3231 11.1537 15.1006 12.1515 14.5679C12.6667 14.2927 12.6667 13.5241 12.6667 11.9869V7.66634"
      stroke="#141B34"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2.33594 4.66699H7.33594"
      stroke="#141B34"
      stroke-linecap="round"
    />
    <path
      d="M14.0026 1.33301L9.33594 5.99937M14.0026 5.99967L9.33594 1.33331"
      stroke="#141B34"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const BookmarkIcon = ({ active }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M5 3H15C15.55 3 16 3.45 16 4V18L10 14.5L4 18V4C4 3.45 4.45 3 5 3Z"
      stroke="#6f6f6f"
      strokeWidth="1.5"
      fill={active ? "#7b2cbf" : "none"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ShareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="15" cy="4" r="2" stroke="#6f6f6f" strokeWidth="1.5" />
    <circle cx="15" cy="16" r="2" stroke="#6f6f6f" strokeWidth="1.5" />
    <circle cx="5" cy="10" r="2" stroke="#6f6f6f" strokeWidth="1.5" />
    <path d="M6.8 9L13.2 5M6.8 11L13.2 15" stroke="#6f6f6f" strokeWidth="1.5" />
  </svg>
);

const ChevronDownIcon = ({ open }) => (
  <svg
    className={classNames(
      "transition-transform duration-200 text-secondary-normal-default",
      !open ? "rotate-180" : ""
    )}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
  >
    <path fill="currentColor" d="m11 7l-4 6h8z" />
  </svg>
);

const GreenCheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className="flex-shrink-0"
  >
    <circle cx="8" cy="8" r="7" fill="#22c55e" />
    <path
      d="M4.5 8L6.5 10L11.5 5.5"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Converts ISO 3166-1 alpha-2 code → Twemoji flag SVG URL (illustrated emoji-style flags)
const flagUrl = (code) => {
  const base = 0x1f1e6;
  const pts = code
    .toUpperCase()
    .split("")
    .map((c) => (base + c.charCodeAt(0) - 65).toString(16));
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${pts.join("-")}.svg`;
};

// ─── Tour Hero Section — Figma (title + meta pl-156, grid 856 | 8 | 864, h-717) ─
// Left column: main image. Right: 366 + row 430+432. 30% black overlay on tiles.
const TourHeroSection = React.forwardRef(({ tourData, onOpenGallery }, ref) => {
    const mainSrc = tourData.heroMainImage;

    return (
      <div
        ref={ref}
        className="flex w-full flex-col gap-4 bg-secondary-light-hover"
      >
        <div className="flex flex-col gap-2 px-6 md:px-[30px] lg:pl-[156px] lg:pr-4 pt-8">
          <h1 className="font-raleway text-[28px] leading-[36px] md:text-[32px] md:leading-[42px] lg:text-Display-md-small-semibold lg:leading-[50px] text-secondary-normal-default">
            {tourData.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <svg
                width="11"
                height="11"
                viewBox="0 0 18 18"
                fill="none"
                className="shrink-0"
                aria-hidden="true"
              >
                <path
                  d="M8.523 1.164c.292-.842 1.662-.842 1.954 0l1.12 3.232a1.04 1.04 0 0 0 .987.716h3.4c.893 0 1.264 1.145.542 1.67l-2.75 2.002a1.04 1.04 0 0 0-.378 1.163l1.052 3.042c.29.84-.69 1.54-1.408 1.017l-2.752-2.003a1.04 1.04 0 0 0-1.224 0L6.358 14.006c-.718.523-1.698-.176-1.408-1.017l1.052-3.042a1.04 1.04 0 0 0-.378-1.163L2.874 6.782c-.722-.525-.351-1.67.542-1.67h3.4a1.04 1.04 0 0 0 .987-.716L8.923 1.164Z"
                  fill="#7b2cbf"
                />
              </svg>
              <span className="font-raleway text-med-small-semibold text-neutral-950">
                {tourData.rating}
              </span>
              <span className="font-raleway text-med-small-semibold text-[#4a5565]">
                ({tourData.reviewCount} reviews)
              </span>
            </div>
            <span
              aria-hidden="true"
              className="font-sans text-sm leading-5 tracking-[-0.15px] text-[#99a1af]"
            >
              ·
            </span>
            <span className="font-raleway text-med-small-semibold text-[#364153] underline decoration-solid underline-offset-2">
              {tourData.location}
            </span>
          </div>
        </div>

        {/* Mobile: single hero image with "Show all photos" overlay */}
        <div className="relative w-full h-[280px] cursor-pointer overflow-hidden xl:hidden" onClick={() => onOpenGallery(0)} role="presentation">
          <img
            src={mainSrc}
            alt={tourData.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/30" aria-hidden />
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onOpenGallery(0); }}
            className="absolute bottom-4 right-4 z-10 flex h-[38px] items-center gap-2 rounded-[10px] border border-secondary-light-default px-3 backdrop-blur-[7.45px]"
            style={{ backgroundColor: "rgba(123, 44, 191, 0.5)", width: "160px" }}
          >
            <span className="font-sans text-sm font-semibold leading-5 tracking-[-0.15px] text-secondary-light-hover" aria-hidden>⋮⋮</span>
            <span className="font-raleway text-med-small-semibold text-secondary-light-default">Show all photos</span>
          </button>
        </div>

        {/* Desktop: original 4-photo grid */}
        <div className="hidden xl:flex w-full flex-col items-stretch border-r border-solid border-secondary-light-active">
          <div
            className="grid h-[717px] w-full grid-cols-[minmax(0,856fr)_minmax(0,864fr)] gap-2 overflow-hidden"
          >
            {/* Left: main image */}
            <div
              className="relative min-h-0 min-w-0 cursor-pointer"
              onClick={() => onOpenGallery(0)}
              role="presentation"
            >
              <img
                src={mainSrc}
                alt={tourData.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-black/30"
                aria-hidden
              />
            </div>

            {/* Right column */}
            <div className="flex min-h-0 min-w-0 flex-col gap-1">
              <div
                className="relative h-[366px] min-h-0 shrink-0 cursor-pointer overflow-hidden"
                onClick={() => onOpenGallery(1)}
                role="presentation"
              >
                <img
                  src={tourData.heroTopRight}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-black/30"
                  aria-hidden
                />
              </div>
              <div className="flex h-[347px] gap-1">
                <div
                  className="relative w-[430px] min-w-0 shrink-0 cursor-pointer overflow-hidden"
                  onClick={() => onOpenGallery(2)}
                  role="presentation"
                >
                  <img
                    src={tourData.heroBottomLeft}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-black/30"
                    aria-hidden
                  />
                </div>
                <div
                  className="relative min-w-0 flex-1 cursor-pointer overflow-hidden"
                  onClick={() => onOpenGallery(3)}
                  role="presentation"
                >
                  <img
                    src={tourData.heroBottomRight}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-black/30"
                    aria-hidden
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenGallery(0);
                    }}
                    className="absolute bottom-[43px] right-8 z-10 flex h-[38px] items-center gap-2 rounded-[10px] border border-secondary-light-default px-3 backdrop-blur-[7.45px]"
                    style={{
                      backgroundColor: "rgba(123, 44, 191, 0.5)",
                      width: "160px",
                    }}
                  >
                    <span
                      className="font-sans text-sm font-semibold leading-5 tracking-[-0.15px] text-secondary-light-hover"
                      aria-hidden
                    >
                      ⋮⋮
                    </span>
                    <span className="font-raleway text-med-small-semibold text-secondary-light-default">
                      Show all photos
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
TourHeroSection.displayName = "TourHeroSection";

// ─── Sticky section nav bar — Figma 3045:42287 ────────────────────────────────
// 1728×64px, bg #fefefe, borderBottom 2px solid #d6beeb, sticky below main nav
// Tabs: flex row gap-8px, left-aligned inside px-156px container
// Active:   SemiBold 13px/18lh #7b2cbf + 2px bottom border #7b2cbf
// Inactive: Medium   13px/22lh #565656 + transparent border
const DETAIL_TABS = [
  { key: "overview", label: "Overview" },
  { key: "itinerary", label: "Itinerary" },
  { key: "inclusions", label: "Inclusions" },
  { key: "tour-guide", label: "Tour Guide" },
  { key: "reviews", label: "Reviews" },
  { key: "location", label: "Location" },
];

const TourDetailNavBar = ({ activeSection, onTabClick }) => (
  <div
    className="w-full bg-[#fefefe] sticky z-40 top-[70px] lg:top-[112px]"
    style={{ height: "64px", borderBottom: "2px solid #d6beeb" }}
  >
    <div className="h-full flex items-center px-6 md:px-[30px] lg:px-[156px] overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-[8px]">
        {DETAIL_TABS.map((tab) => {
          const isActive = activeSection === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTabClick(tab.key)}
              className="h-[63px] relative flex items-center justify-center px-[10px] flex-shrink-0 transition-colors"
              style={{
                borderBottom: isActive
                  ? "2px solid #7b2cbf"
                  : "2px solid transparent",
                marginBottom: "-2px", // align bottom border with bar's bottom border
              }}
            >
              <span
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontSize: "13px",
                  fontWeight: isActive ? 600 : 500,
                  lineHeight: isActive ? "18px" : "22px",
                  color: isActive ? "#7b2cbf" : "#565656",
                  whiteSpace: "nowrap",
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

// ─── Itinerary accordion item ──────────────────────────────────────────────────
const ItineraryDay = ({ day }) => {
  const [open, setOpen] = useState(day.day === 1);
  return (
    <div className="border border-[#e9eaeb] rounded-[12px] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-[20px] bg-white hover:bg-[#fafafa] transition-colors text-left"
      >
        <div className="flex items-center gap-[16px]">
          <div className="w-[36px] h-[36px] rounded-full  bg-secondary-normal-default flex items-center justify-center flex-shrink-0">
            <span className="text-white font-raleway font-bold text-[14px]">
              {day.day}
            </span>
          </div>
          <span className="font-raleway font-semibold text-[16px] text-[#2d2d2d]">
            Day {day.day}: {day.title}
          </span>
        </div>
        <ChevronDownIcon open={open} />
      </button>
      {open && (
        <div className="px-[20px] pb-[20px] bg-[#fafafa]">
          <div className="pl-[52px] flex flex-col gap-[8px]">
            {day.activities.map((activity, i) => (
              <div key={i} className="flex items-center gap-[8px]">
                <div className="w-[6px] h-[6px] rounded-full bg-[#7b2cbf] flex-shrink-0" />
                <span className="font-raleway font-normal text-[15px] text-[#4a4a4a]">
                  {activity}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Rating stars row ──────────────────────────────────────────────────────────
const ReviewStars = ({ rating, size = 14 }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((s) => (
      <StarIcon key={s} filled={s <= Math.round(rating)} size={size} />
    ))}
  </div>
);

// ─── ItineraryStep ────────────────────────────────────────────────────────────
// Figma 3111:40578 — step circle (48px) + vertical connector line + accordion
// Active circle: bg-#7b2cbf border-2 white, text white   Inactive: bg-#ebdff5 border-#d6beeb, text #7b2cbf
const ItineraryStep = ({ day, isFirst }) => {
  const [open, setOpen] = useState(isFirst);
  return (
    <div className="flex flex-col gap-4.5  border rounded-[14px] px-5 py-4 border-[#E8D9F5] ">
      <div className=" flex items-center gap-[14px]">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full text-left cursor-pointer  flex items-center justify-between"
        >
          {/* Circle */}
          <div className="size-[36px] mr-[14px] flex items-center justify-center shrink-0 bg-secondary-normal-default rounded-full ">
            <span className="text-white text-[13px] font-bold">{day.day}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-[15px] font-bold text-secondary-dark-hover">
              {day.title}
            </h3>
            <p className="text-[12px] text-[#6B7280] ">{day.preview}</p>
          </div>
          <ChevronDownIcon open={open} />
        </button>
      </div>
      {/* Content */}
      {open && (
        <div className="flex-1">
          <div className="flex flex-col gap-3.5">
            {/* Locoal context */}
            <div className="border-l-3 border-secondary-normal-default px-4.5 py-3 bg-[#F3E8FF80] rounded-r-sm ">
              <span className="text-[14px] font-bold text-secondary-dark-hover">
                Local Context:
                <span className="text-[14px] font-medium ">
                  {day.localContext}
                </span>
              </span>
            </div>

            {/* Activities */}
            <div className="flex flex-col divide-y divide-[#F3E8FF]">
              {day.activities.map((act, i) => (
                <div key={i} className="flex py-3 items-start">
                  <div className="flex gap-6">
                    <span className="text-[12px] text-secondary-normal-default font-bold">
                      {act.time}
                    </span>
                    <div className="flex-col flex gap-1">
                      <span className="text-[13px] text-tertiary-normal-default">
                        {act.activity}
                      </span>
                      {act.tag && (
                        <span className="text-[10px] text-secondary-dark-hover w-fit rounded-[20px] font-bold px-[7px] py-0.5 bg-secondary-light-hover">
                          {act.tag}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── AddOnRow ─────────────────────────────────────────────────────────────────
// Figma 3112:40669 — icon + name + desc on left; price + checkbox on right
const AddOnRow = ({ addon }) => {
  const [selected, setSelected] = useState(false);
  return (
    <div className="flex items-center pl-1.5 pr-3 md:pr-6 justify-between gap-3">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          {/* Icon chip */}
          <div className="shrink-0">{addon.icon}</div>
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-semibold leading-[20px] md:text-semi-md-semibold text-tertiary-normal-default">
              {addon.name}
            </p>
          </div>
        </div>
        <p className="text-med-small-Medium text-secondary-dark-default">
          {addon.desc}
        </p>
      </div>

      <div className="flex items-center" style={{ gap: "14px", flexShrink: 0 }}>
        <span
          style={{
            fontFamily: "Raleway, sans-serif",
            fontWeight: 600,
            fontSize: "14px",
            color: "#7b2cbf",
            whiteSpace: "nowrap",
          }}
        >
          + {addon.price}
        </span>
        <button
          type="button"
          onClick={() => setSelected(!selected)}
          style={{
            width: "24px",
            height: "24px",
            flexShrink: 0,
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          {selected ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="4" fill="#7b2cbf" />
              <path
                d="M7 12L10 15L17 8"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect
                x="2"
                y="2"
                width="20"
                height="20"
                rx="4"
                stroke="#d1d5dc"
                strokeWidth="1.5"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

// ─── GuideCard ────────────────────────────────────────────────────────────────
// Figma 3112:40961 — rounded-30px card; left photo panel (gradient #2b0f43→#6c26a9)
// Right content: name / subtitle / language+cert badges / 2 testimonial quotes / link
const GuideCard = ({ guide }) => (
  <div className="relative overflow-hidden md:min-h-[393px] border border-secondary-light-active rounded-[30px] bg-[#FEFEFE] flex flex-col md:flex-row">
    {/* Left (desktop) / Top (mobile): photo panel */}
    <div
      className="relative flex-shrink-0 overflow-hidden w-full h-[260px] md:h-auto md:w-[296px]"
    >
      {/* Gradient behind image so transparent PNG reveals gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(180deg, #2b0f43 0%, #6c26a9 100%)",
        }}
      />

      <div
        className="w-[455px] h-[324px] absolute inset-0 z-0 bg-secondary-light-default rounded-4xl  top-[60%] left-[50%] translate-x-[-50%]"
        style={{
          filter: "blur(50px)",
        }}
      />
      <img
        src={guide.image}
        alt={guide.name}
        className="relative z-[1] h-full w-full object-cover object-top md:object-center"
      />
    </div>

    {/* Right (desktop) / Below (mobile): content */}
    <div
      className="flex-1 flex flex-col justify-center p-6 md:p-8 md:pl-9"
    >
      {/* Name */}
      <h3 className="max-w-[509px] text-semi-md-semibold text-tertiary-normal-default">
        {guide.name}
      </h3>
      {/* Subtitle */}
      <p className="max-w-[509px] mb-5 text-med-small-Medium text-secondary-dark-default">
        {guide.speciality} · {guide.yearsExp} Years Experience
      </p>
      {/* Language + certification badges */}
      <div
        className="flex flex-wrap max-w-[509px]"
        style={{ gap: "8px", marginBottom: "24px" }}
      >
        {(guide.languages || []).map((lang) => (
          <span
            key={lang.code}
            className="inline-flex items-center gap-[5px] bg-secondary-light-default text-[#0A0A0A] text-med-small-regular rounded-[15px] px-[9.5px] py-[2.5px] border border-secondary-light-active"
          >
            {/* Twemoji SVG — illustrated emoji-style flag, cross-platform (no Windows emoji font needed) */}
            <img src={flagUrl(lang.code)} alt="" width={13} height={13} style={{ flexShrink: 0 }} />
            {lang.name}
          </span>
        ))}
        {(guide.certifications || []).map((cert) => (
          <span
            key={cert}
            style={{
              fontFamily: "Raleway, sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              color: "#4a1a73",
              backgroundColor: "#f2eaf9",
              border: "1px solid #d6beeb",
              borderRadius: "100px",
              padding: "4px 12px",
            }}
          >
            {cert}
          </span>
        ))}
      </div>
      {/* divider */}
      <div className="h-px w-full bg-secondary-light-hover max-w-[551px] mb-3" />

      {/* Testimonial quotes — border-l-2 #7b2cbf */}
      <div
        className="flex flex-col max-w-[509px]"
        style={{ gap: "16px", marginBottom: "24px" }}
      >
        {(guide.testimonials || []).map((t, i) => (
          <div
            key={i}
            
          >
            <p className="font-medium flex gap-3 text-[13px] italic leading-[22px] text-primary-dark-darker "
             
            >
              <span className="block w-[2px] h-[32px] my-auto  bg-secondary-normal-default "/>
              "{t.quote}"
            </p>
            <p
            className="font-medium text-[10px] leading-[22px] text-secondary-normal-default mt-1"
              
            >
              — {t.reviewer}, {t.date}
            </p>
          </div>
        ))}
        {/* View Full Details link */}
        <button
          type="button"
          className="font-semibold text-[14px] hover:bg-tertiary-light-hover self-end p-2 rounded-[5px] border-b  text-secondary-normal-default   cursor-pointer"
        style={
          {boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.05)"}

        }
        >
          View Full Details →
        </button>
      </div>
    </div>
  </div>
);

// ─── ReviewsSection ───────────────────────────────────────────────────────────
// Figma 3123:42908 — 4.9 score + category bars + filter tabs + 4 review cards
const REVIEW_FILTER_TABS = [
  "All",
  "Cultural Interests",
  "Cleanness",
  "International",
  "Business",
  "Groups",
];

const ReviewsSection = ({ tourData }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  return (
    <div>
      {/* Rating overview */}
      <div
        className="flex gap-12 mb-7 items-start"
      >
        {/* Big number + stars */}
        <div
          className="flex flex-col gap-2 w-[127px] p-3.5 rounded-[10px] border-2 border-secondary-light-active bg-primary-light-default items-center flex-shrink-0"
        >
          <span
          className="text-Display-md-small-semibold mb-[2.5px] text-secondary-normal-default"
          
          >
            {tourData.rating}
          </span>
          <ReviewStars rating={tourData.rating} size={18} />
          <span
          className="text-med-small-Medium mt-2.5 text-[#4a5565]"
            
          >
            {(tourData.totalReviews || 3249).toLocaleString()} reviews
          </span>
        </div>
        {/* Category rating bars */}
        <div
          className="flex-1 gap-4.5 pt-2 flex flex-col"
        >
          {(tourData.categoryRatings || []).map(({ label, score }) => (
            <div
              key={label}
              className="flex items-center gap-3"
            >
              <span
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 500,
                  fontSize: "13px",
                  lineHeight: "20px",
                  color: "#364153",
                  width: "140px",
                  flexShrink: 0,
                }}
                className="text-med-small-Medium text-tertiary-normal-default"
              >
                {label}
              </span>
              <div
                className="flex-1 h-2 rounded-lg bg-secondary-light-hover overflow-hidden"
                
              >
                <div
                className="h-full bg-secondary-normal-default rounded-lg"
                  style={{
                    width: `${(score / 5) * 100}%`,
                  
                  }}
                />
              </div>
              <span
              className="text-[14px]  text-tertiary-normal-default  text-right flex-shrink-0"
              
              >
                {score}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div
        className="flex items-center gap-2 mb-7 flex-wrap"
      >
        {REVIEW_FILTER_TABS.map((tab) => {
          const isActive = activeFilter === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveFilter(tab)}
              className={`text-med-small-Medium py-[9px] rounded-[40px] px-4 transition-colors cursor-pointer ${isActive? `text-white bg-secondary-normal-default` : `text-primary-dark-darker bg-secondary-light-hover`} `}
              
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Review cards */}
      <div className="flex flex-col gap-4">
        {tourData.reviews.map((review) => (
          <div
            key={review.id}
            className="px-5 py-7 rounded-[20px] bg-primary-light-default/60 border border-secondary-light-hover "
          >
            <div className="flex items-start gap-4" >
              <div
              className="size-[60px] rounded-full overflow-hidden flex-shrink-0"
               
              >
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p
                    className="text-[16px] font-semibold text-tertiary-normal-default "
                     
                    >
                      {review.name}
                    </p>
                    <p
                    className="text-[13px] font-medium text-primary-dark-hover mt-1"
                      
                    >
                      {formatTimeAgo(review.date)}
                    </p>
                  </div>
                  <ReviewStars rating={review.rating} size={14} />
                </div>
                <p
                                    className="text-med-small-Medium text-[#364153] mt-2"

               
                >
                  {review.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* See all reviews — light lavender fill, purple outline — Figma spacing 24px above */}
      <div className="flex justify-center mt-6">
        <Button
          type="button"
          variant="secondaryOutline"
          shape="pill"
          style={{ fontFamily: "Raleway, sans-serif" }}
          className="!bg-secondary-light-default hover:!bg-secondary-light-hover active:!bg-secondary-light-active shadow-none min-h-14 h-14 px-8 rounded-full border-[1.5px] border-secondary-normal-default text-secondary-normal-default text-[15px] font-semibold"
        >
          {`see All ${(tourData.totalReviews || 3249).toLocaleString()} Reviews →`}
        </Button>
      </div>
    </div>
  );
};

// ─── BookingWidget ────────────────────────────────────────────────────────────
// Figma 3156:45940 — 457×755px card; gradient header + 3-step stepper + date inputs
// + traveler counters + Check Availability CTA + free cancellation notice
const BOOKING_STEPS = [
  { id: 1, label: "Dates" },
  { id: 2, label: "Review" },
  { id: 3, label: "Payment" },
];

const BookingWidget = ({
  tourData,
  adults,
  setAdults,
  children,
  setChildren,
  departureDate,
  setDepartureDate,
  returnDate,
  setReturnDate,
  bookmarked,
  setBookmarked,
  bookingStep: bookingStepProp,
  onBookingStepChange,
}) => {
  const [bookingStepInternal, setBookingStepInternal] = useState(1);
  const activeStep =
    bookingStepProp !== undefined ? bookingStepProp : bookingStepInternal;
  const setActiveStep = onBookingStepChange ?? setBookingStepInternal;

  const [selectedBookingAddons, setSelectedBookingAddons] = useState({});
  const bookingAddOns = tourData.bookingAddOns ?? [];
  const addonsSubtotal = useMemo(
    () =>
      bookingAddOns.reduce(
        (sum, a) => sum + (selectedBookingAddons[a.id] ? a.priceGhc : 0),
        0
      ),
    [bookingAddOns, selectedBookingAddons]
  );

  const toggleBookingAddon = (id) => {
    setSelectedBookingAddons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
  <div className="max-w-full  overflow-hidden rounded-[24px] border border-secondary-light-active bg-white">
    {/* ── Gradient header — condensed to 110px so widget fits viewport ── */}
    <div className="flex  flex-col gap-2 bg-linear-to-b from-secondary-normal-default to-[#391559] pl-[18px] pr-6 py-6">
      <p className=" text-sm-Medium text-secondary-light-active">
        FROM
      </p>
      <p className=" text-Display-md-small-bold  text-white">
        {tourData?.price ?? "GH₵ 4,590"}
      </p>
      <p className="text-med-small-Medium text-secondary-light-hover">
        per person · USD ~$290 equivalent
      </p>
    </div>

    {/* ── 3-step stepper — active / completed / upcoming from `activeStep` ── */}
    <div className="flex py-5 px-11 items-center justify-center border-b border-secondary-light-default">
      <div className="flex items-center justify-between w-full gap-3">
        {BOOKING_STEPS.map((step, index) => {
          const isActive = activeStep === step.id;
          const isComplete = activeStep > step.id;
          const isUpcoming = activeStep < step.id;

          const circleClass = classNames(
            "flex items-center justify-center rounded-full font-raleway text-med-small-semibold  transition-colors",
            isActive &&
              "size-[40px] bg-secondary-normal-default text-white",
            !isActive &&
              isComplete &&
              "size-[40px] bg-secondary-normal-default text-white",
            !isActive &&
              isUpcoming &&
              "size-[40px] bg-secondary-light-default text-secondary-light-active"
          );

          const labelClass = classNames(
            "font-raleway text-xs leading-4",
            (isActive || isComplete) &&
              "font-bold text-secondary-normal-default",
            isUpcoming && "font-semibold text-secondary-light-active"
          );

          return (
            <Fragment key={step.id}>
              <button
                type="button"
                onClick={() => setActiveStep(step.id)}
                className="flex w-[72px] flex-col items-center gap-1.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-secondary-normal-default focus-visible:ring-offset-2"
                aria-current={isActive ? "step" : undefined}
                aria-label={`${step.label}, step ${step.id} of ${BOOKING_STEPS.length}`}
              >
                <span className={circleClass}>{step.id}</span>
                <span className={labelClass}>{step.label}</span>
              </button>
              {index < BOOKING_STEPS.length - 1 && (
                <div
                  role="presentation"
                  className={classNames(
                    "h-0.5 w-10 rounded-lg",
                    activeStep > step.id
                      ? "bg-secondary-normal-default"
                      : "bg-secondary-light-hover"
                  )}
                />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>

    {/* ── Content area — tightened spacing ────────────────────────────── */}
    <div className="flex flex-col gap-3 px-[30px] pt-6">
      {/* CHOOSE YOUR DATE */}
      <div className="w-full">
        <p className="mb-3.5 text-med-small-bold text-secondary-dark-hover">
          CHOOSE YOUR DATE
        </p>
        <div className="flex gap-[70px] justify-between w-full">
          <div className="flex-1">
            <p className="mb-2 font-[Inter,sans-serif] text-xs font-medium uppercase tracking-[0.04em] text-[#6a7282]">
              DEPARTURE
            </p>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="box-border h-9 w-full rounded-sm border border-[#d1d5dc] px-3 py-2.5 font-[Inter,sans-serif] text-[13px] text-[#0A0A0A80] outline-none"
            />
          </div>
          <div className="flex-1">
            <p className="mb-2 font-[Inter,sans-serif] text-xs font-medium uppercase tracking-[0.04em] text-[#6a7282]">
              RETURN
            </p>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="box-border h-9 w-full rounded-sm border border-[#d1d5dc] px-2.5 font-[Inter,sans-serif] text-[13px] text-[#0A0A0A80] outline-none"
            />
          </div>
        </div>
      </div>

      {/* TRAVELERS */}
      <div>
        <p className="mb-2 font-raleway text-med-small-bold text-secondary-dark-hover">
          Travelers
        </p>
        <div className="flex flex-col">
          {/* Adults */}
          <div className="flex items-center justify-between py-[7px]">
            <div>
              <p className="text-med-small-semibold text-tertiary-normal-default">
                Adults
              </p>
              <p className="text-sm-Medium text-secondary-normal-default">
                Age 13+
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="secondaryOutline"
                onClick={() => setAdults(Math.max(1, adults - 1))}
                className="size-8! min-h-0! border-2! rounded-full! border-secondary-light-active! bg-transparent! p-0! text-lg! font-bold! leading-none text-secondary-normal-default shadow-none! hover:bg-secondary-light-default/40"
              >
                −
              </Button>
              <span className="w-8 text-center text-semi-md-semibold text-secondary-dark-hover">
                {adults}
              </span>
              <Button
                type="button"
                variant="secondaryOutline"
                onClick={() => setAdults(adults + 1)}
                className="size-8! min-h-0!  rounded-full! border-2! border-secondary-light-active! bg-transparent! p-0! text-lg! font-bold! leading-none text-secondary-normal-default shadow-none! hover:bg-secondary-light-default/40"
              >
                +
              </Button>
            </div>
          </div>
          {/* Children */}
          <div className="flex items-center justify-between py-[7px]">
            <div>
              <p className="text-med-small-semibold text-tertiary-normal-default">
                Children
              </p>
              <p className="text-sm-Medium text-secondary-normal-default">
                Age 4–12
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="secondaryOutline"
                onClick={() => setChildren(Math.max(0, children - 1))}
                className="size-8! min-h-0!  rounded-full! border-2! border-secondary-light-active! bg-transparent! p-0! text-lg! font-bold! leading-none text-secondary-normal-default shadow-none! hover:bg-secondary-light-default/40"
              >
                −
              </Button>
              <span className="w-8 text-center  text-semi-md-semibold text-secondary-dark-hover">
                {children}
              </span>
              <Button
                type="button"
                variant="secondaryOutline"
                onClick={() => setChildren(children + 1)}
                className="size-8! min-h-0!  rounded-full! border-2! border-secondary-light-active! bg-transparent! p-0! text-lg! font-bold! leading-none text-secondary-normal-default shadow-none! hover:bg-secondary-light-default/40"
              >
                +
              </Button>
            </div>
          </div>
        </div>
      </div>

      {bookingAddOns.length > 0 && (
        <div className="mt-3 border-t border-secondary-light-default pt-4">
          <p className="mb-3 font-raleway text-med-small-bold text-secondary-dark-hover">
            Optional extras
          </p>
          <div className="flex flex-col gap-2">
            {bookingAddOns.map((a) => (
              <label
                key={a.id}
                className="flex cursor-pointer items-start gap-3 rounded-lg border border-secondary-light-hover bg-secondary-light-default/50 px-3 py-2.5 transition-colors hover:bg-secondary-light-default/80"
              >
                <input
                  type="checkbox"
                  checked={!!selectedBookingAddons[a.id]}
                  onChange={() => toggleBookingAddon(a.id)}
                  className="mt-0.5 size-4 shrink-0 accent-secondary-normal-default"
                />
                <span className="flex-1 text-med-small-Medium text-tertiary-normal-default">
                  {a.label}
                </span>
                <span className="text-med-small-semibold text-secondary-normal-default whitespace-nowrap tabular-nums">
                  GHC {a.priceGhc.toLocaleString()}
                </span>
              </label>
            ))}
          </div>
          {addonsSubtotal > 0 && (
            <div className="mt-3 flex items-center justify-between border-t border-dashed border-secondary-light-active pt-3 text-med-small-semibold text-secondary-dark-hover">
              <span>Add-ons subtotal</span>
              <span className="tabular-nums">
                GHC {addonsSubtotal.toLocaleString()}
              </span>
            </div>
          )}
        </div>
      )}

      {/* CTA ACTIONS */}
      <div className="flex flex-col gap-2">
        <Button
          type="button"
          variant="secondary"
          shape="pill"
          fullWidth
          className="h-[46px] min-h-0! rounded-full border-0 font-raleway text-[15px] font-semibold leading-[22px] text-secondary-light-default! shadow-[0_4px_4px_rgba(0,0,0,0.05)]"
        >
          Reserve This Tour
        </Button>
        <Button
          type="button"
          variant="link"
          onClick={() => setBookmarked(!bookmarked)}
          startIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden
            >
              <path
                d="M6.61573 13.7362C7.75843 15.4212 10.241 15.4213 11.3837 13.7363L15.3052 7.9537C16.0346 6.87805 16.0742 5.47034 15.4143 4.35069C14.0961 2.11423 10.8298 2.14608 9.58663 4.42508C9.33322 4.88962 8.66617 4.88962 8.41277 4.42508C7.16957 2.14608 3.90334 2.11425 2.58514 4.3507C1.92521 5.47034 1.96481 6.87805 2.69426 7.95369L6.61573 13.7362Z"
                stroke={bookmarked ? "#7b2cbf" : "#2d2d2d"}
                fill={bookmarked ? "#7b2cbf" : "none"}
                strokeWidth="1.2"
              />
            </svg>
          }
          className="w-full justify-center !no-underline  p-0! py-1 font-raleway text-[13px] font-medium text-tertiary-normal-default shadow-none "
        >
          Save to Wishlist
        </Button>
      </div>
    </div>

    {/* Free cancellation notice */}
    <div className="mx-[22px] mb-5 mt-2 flex h-9 items-center gap-2.5 rounded-sm border border-secondary-light-active bg-secondary-light-hover/50 px-[11px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <g clipPath="url(#clip-booking-widget-free-cancel)">
          <path
            d="M8 0C3.58867 0 0 3.58867 0 8C0 12.4113 3.58867 16 8 16C12.4113 16 16 12.4113 16 8H14.2C14.2 11.4187 11.4187 14.2 8 14.2C4.58133 14.2 1.8 11.4187 1.8 8C1.8 4.58133 4.58133 1.8 8 1.8V0ZM12.9333 1.722L7.93 7.96933L5.592 6.05333L4.25733 7.67733L7.418 10.2693C7.52538 10.3579 7.64931 10.4242 7.78258 10.4644C7.91585 10.5046 8.05578 10.5178 8.19422 10.5034C8.33266 10.4889 8.46684 10.447 8.58893 10.3802C8.71102 10.3133 8.81857 10.2228 8.90533 10.114L14.5747 3.036L12.9333 1.722Z"
            className="fill-secondary-light-active"
          />
        </g>
        <defs>
          <clipPath id="clip-booking-widget-free-cancel">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <span className="whitespace-nowrap text-med-small-Medium text-secondary-normal-default">
        Free cancellation up to 48 hours before departure
      </span>
    </div>
  </div>
  );
};

// ─── TourDetailPage ────────────────────────────────────────────────────────────
const TourDetailPage = () => {
  const { country, tour } = useParams();
  // activeSection drives the sticky nav bar tabs
  const [activeSection, setActiveSection] = useState("overview");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(2);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  // Lookup priority:
  //   1. Rich curated data in TOUR_DATA (elmina-heritage-coastal-journey, accra-corporate-executive-tour)
  //   2. Templated data in TEMPLATED_TOURS (per-tour title/location/price overrides on TOUR_TEMPLATE)
  //   3. Fallback to elmina-heritage-coastal-journey
  // Merge with TOUR_TEMPLATE so basic fields (maxGuests, languages, cancellation,
  // images, etc.) are always present even when rich curated data omits them.
  const tourData = useMemo(() => {
    const rich = TOUR_DATA[tour];
    const templated = TEMPLATED_TOURS[tour];
    const fallback = TOUR_DATA["elmina-heritage-coastal-journey"];
    const baseData = rich || templated || fallback;
    return { ...TOUR_TEMPLATE, ...baseData };
  }, [tour]);
  const importantInfo = tourData.importantInformation;
  const importantInfoRows = importantInfo?.blocks ?? [];
  const importantInfoFooter = importantInfo?.footerNote;
  const showImportantInformation =
    importantInfoRows.length > 0 || !!importantInfoFooter;
  const [meetingPin, setMeetingPin] = useState(
    () => tourData.meetingPoint ?? DEFAULT_MEETING_POINT
  );

  useEffect(() => {
    const data = TOUR_DATA[tour] || TEMPLATED_TOURS[tour] || TOUR_DATA["elmina-heritage-coastal-journey"];
    setMeetingPin(data.meetingPoint ?? DEFAULT_MEETING_POINT);
  }, [tour]);

  // Reset scroll to top whenever the user navigates to a different tour
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  const countryDisplay = country
    ? country.charAt(0).toUpperCase() + country.slice(1)
    : "Ghana";

  const openGallery = (index = 0) => {
    setGalleryIndex(index);
    setGalleryOpen(true);
  };

  // Scroll to section when nav tab is clicked (offset = navbar + detail nav + buffer)
  const scrollToSection = useCallback((key) => {
    setActiveSection(key);
    const el = document.getElementById(`section-${key}`);
    if (!el) return;
    // Mobile navbar is 70px, desktop is 112px
    const navbarHeight = window.innerWidth >= 1024 ? 112 : 70;
    const offset = navbarHeight + 64 + 8;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  // Update active section as user scrolls (highlight whichever section is in the middle of the viewport)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = entry.target.id.replace("section-", "");
            setActiveSection(key);
          }
        });
      },
      // Trigger when section crosses the midpoint of the viewport
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    DETAIL_TABS.forEach(({ key }) => {
      const el = document.getElementById(`section-${key}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main
      className="w-full bg-secondary-light-default min-h-screen"
      style={{ fontFamily: "Raleway, sans-serif" }}
    >
      {/* Breadcrumb */}
      <BlogBreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Tours", href: "/tours" },
          { label: countryDisplay, href: `/tours/${country}` },
          { label: tourData.title, href: "#" },
        ]}
      />

      {/* Sticky section nav — Figma 3045:42287 */}
      <TourDetailNavBar
        activeSection={activeSection}
        onTabClick={scrollToSection}
      />

      {/* Full-width tour hero — Figma 3075:39137
          Title + meta (pl-156px) + 4-photo image grid (h-717px)
          Must be OUTSIDE the padded content div so images reach both edges */}
      <TourHeroSection
        tourData={tourData}
        onOpenGallery={openGallery}
      />

      {/* ── Main content — Figma Frame 1000006773 ────────────────────────────────
           Mobile: stacked (booking widget below content)
           Desktop: two-column (left content + sticky right widget)            */}
      <div className="px-6 md:px-[30px] lg:px-[156px] pt-8 lg:pt-[56px] pb-12 lg:pb-[80px]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[32px] items-start">
          {/* ── LEFT CONTENT — full width on mobile, max-w-928px on desktop */}
          <div className="w-full lg:flex-1 lg:min-w-[70%] lg:max-w-[928px] min-w-0 flex flex-col">
            {/* ① OVERVIEW: Tour Meta Bar + About The Tour ─ id=section-overview */}
            <div id="section-overview" className="mb-6">
              {/* Meta subtitle — "3-day tour hosted by Heritage Guides" */}
              <p className="text-semi-md-semibold text-secondary-dark-hover mb-3">
                3-day tour hosted by Heritage Guides
              </p>
              {/* Info bar: Users · Duration · Languages · Cancellation */}
              <div
                className="flex items-center flex-wrap"
                style={{ gap: "8px" }}
              >
                <span className="flex items-center gap-2 text-med-small-semibold text-tertiary-normal-default">
                  <UsersIcon /> <span>Max {tourData.maxGuests} guests</span>
                </span>
                <span style={{ color: "#99a1af" }}>·</span>
                <span className="flex items-center  gap-2 text-med-small-semibold text-tertiary-normal-default">
                  <ClockIcon /> <span>{tourData.duration}</span>
                </span>
                <span style={{ color: "#99a1af" }}>·</span>
                <span className="flex items-center  gap-2 text-med-small-semibold text-tertiary-normal-default">
                  <GlobeIcon /> <span>{tourData.languages}</span>
                </span>
                <span style={{ color: "#99a1af" }}>·</span>
                <span className="flex items-center  gap-2 text-med-small-semibold text-tertiary-normal-default">
                  <CancelIcon /> <span>{tourData.cancellation}</span>
                </span>
              </div>

              {/* Divider */}
              <div className="h-[1.5px] mt-[21px] mb-6 bg-secondary-light-hover" />

              {/* About The Tour heading */}
              <div className="bg-white p-5 flex flex-col gap-4 rounded-xl border border-secondary-light-hover ">
                <h2 className="text-semi-md-semibold text-secondary-dark-hover">
                  About The Tour
                </h2>
                {/* Description */}
                <p
                  dangerouslySetInnerHTML={{ __html: tourData.description }}
                  className="text-md-regular text-[#364153]"
                />

                {/* Read More button */}
                <Button href="/" variant="link" className="w-fit  " size="link">
                  Read More
                </Button>

                {/* Best For tags */}
                <div className="flex bg-[#EBDFF580] border  mb-4 border-secondary-light-active rounded-[10px] flex-wrap p-2.5 gap-1 items-center">
                  <span className="text-med-small-semibold text-secondary-normal-default">
                    Best For:
                  </span>
                  <div className="flex flex-wrap items-center gap-1">
                    {tourData.bestFor.map((tag, i) => (
                      <React.Fragment key={tag}>
                        {i > 0 && (
                          <span
                            className="mx-1 inline-flex shrink-0 items-center justify-center select-none leading-none"
                            aria-hidden="true"
                          >
                            <span className="block h-[2px] w-[2px] shrink-0 rounded-full bg-tertiary-normal-default" />
                          </span>
                        )}
                        <span className="text-med-small-Medium text-tertiary-normal-default">
                          {tag}
                        </span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              {tourData.tourHighlights?.length > 0 && (
                <div className="relative mt-6 w-full rounded-[20px] border border-solid border-[#e8d9f5] bg-white px-[33px] pb-8 pt-[29px]">
                  <h2 className="font-raleway text-xl font-bold leading-8 tracking-normal text-secondary-dark-hover">
                    Tour Highlights
                  </h2>
                  <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-5 md:gap-y-3">
                    {tourData.tourHighlights.map((entry, idx) => {
                      const { title, description } =
                        normalizeTourHighlight(entry);
                      return (
                        <div
                          key={`${title}-${idx}`}
                          className="relative min-h-[92px] rounded-[14px] bg-[#f3e8ff]/50 pl-[18px] pr-4 pt-4 pb-4"
                        >
                          <div className="flex items-start gap-[5px]">
                            <div
                              className="h-[26px] w-6 shrink-0 rounded bg-secondary-light-hover"
                              aria-hidden
                            />
                            <div className="flex min-w-0 flex-1 flex-col gap-1">
                              <div className="font-raleway text-sm font-bold leading-[20.8px] text-secondary-dark-hover">
                                {title}
                              </div>
                              {description ? (
                                <p className="font-raleway text-xs font-normal leading-[18px] tracking-normal text-gray-500 whitespace-pre-line">
                                  {description}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {tourData.businessAmenities?.items?.length > 0 && (
                <div className="mt-6 flex w-full max-w-full flex-col items-start gap-4 self-stretch rounded-[20px] border-b-[1.2px] border-solid border-secondary-light-hover bg-white pl-5 pr-5 pt-5 pb-[21px]">
                  <div className="flex w-full flex-col items-start gap-2">
                    <div className="flex w-full items-center gap-2.5 px-0 py-1">
                      <h2 className="text-semi-md-semibold text-secondary-dark-hover">
                        Business Amenities
                      </h2>
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-4 lg:flex-row lg:gap-x-[87px]">
                    {splitBusinessAmenityColumns(
                      tourData.businessAmenities.items
                    ).map((column, colIdx) => (
                      <div
                        key={colIdx}
                        className="flex min-w-0 flex-1 flex-col gap-4"
                      >
                        {column.map((line) => (
                          <div
                            key={line}
                            className="flex items-center"
                            style={{ gap: "12px" }}
                          >
                            <span className="flex size-5 shrink-0 items-center justify-center">
                              <CheckIcon />
                            </span>
                            <span className="text-md-Medium text-[#364153]">
                              {line}
                            </span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  {(tourData.businessAmenities.corporateBookingBenefits?.items
                    ?.length > 0 ||
                    tourData.businessAmenities.noteHtml) && (
                    <div className="relative min-h-44 w-full max-w-[877px] rounded-[14px] border-l-[3px] border-solid border-secondary-dark-hover bg-secondary-light-default/50 px-[21px] pb-5 pt-[19px]">
                      {tourData.businessAmenities.corporateBookingBenefits
                        ?.items?.length > 0 && (
                        <>
                          <p className="font-raleway text-sm font-bold leading-[22.4px] text-secondary-dark-hover">
                            {tourData.businessAmenities
                              .corporateBookingBenefits.title ??
                              "Corporate Booking Benefits"}
                          </p>
                          <ul className="mt-3 flex flex-col gap-0">
                            {tourData.businessAmenities.corporateBookingBenefits.items.map(
                              (benefit) => (
                                <li
                                  key={benefit}
                                  className="flex min-h-[29px] items-center gap-[5.7px]"
                                >
                                  <span
                                    className="shrink-0 font-sans text-[13px] font-bold leading-[20.8px] text-secondary-normal-default"
                                    aria-hidden
                                  >
                                    →
                                  </span>
                                  <p className="font-raleway text-[13px] font-normal leading-[20.8px] text-[#364153]">
                                    {benefit}
                                  </p>
                                </li>
                              )
                            )}
                          </ul>
                        </>
                      )}
                      {(!tourData.businessAmenities.corporateBookingBenefits
                        ?.items?.length &&
                        tourData.businessAmenities.noteHtml) && (
                        <div
                          className="font-raleway text-[13px] font-normal leading-relaxed text-[#364153]"
                          dangerouslySetInnerHTML={{
                            __html: tourData.businessAmenities.noteHtml,
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ② WHAT'S INCLUDED ─ id=section-inclusions */}
            <div
              id="section-inclusions"
              className="bg-white p-5 flex flex-col gap-4 mb-6 rounded-xl border border-secondary-light-hover"
            >
              <h2 className="text-semi-md-semibold text-secondary-dark-hover">
                What's included
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "16px 40px" }}>
                {tourData.included.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center"
                    style={{ gap: "12px" }}
                  >
                    {item.type === "check" ? <CheckIcon /> : <CrossIcon />}
                    <span className="text-md-Medium text-[#364153]">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ③ ITINERARY ─ id=section-itinerary */}
            {/* Step circles (48px) + vertical connector line + expandable days */}
            <div
              id="section-itinerary"
              className="bg-white px-8.5 mb-6 py-7.5 flex flex-col gap-4 rounded-xl border border-secondary-light-hover"
            >
              <h2 className="text-semi-md-bold text-secondary-dark-hover">
                Day-by-Day Itinerary
              </h2>
              <p className="text-[14px] font-medium text-[#6B7280]">
                A structured 5-day programme with flexibility for your schedule
              </p>
              <div className="relative ">
                {/* Vertical connector line linking all circles */}

                <div className="flex flex-col gap-3">
                  {tourData.itinerary.map((day, idx) => (
                    <ItineraryStep
                      key={day.day}
                      day={day}
                      isFirst={idx === 0}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ④ OPTIONAL ADD-ONS */}
            <div className="bg-white mb-6 pl-5 pr-2 pt-7.5 pb-12 flex flex-col gap-4 rounded-xl border border-secondary-light-hover">
              <h2 className="text-semi-md-bold text-secondary-dark-hover">
                + Optional Add-ons
              </h2>
              <div className="flex mb-6 flex-col gap-4">
                {tourData.addOns.map((addon, i) => (
                  <AddOnRow key={i} addon={addon} />
                ))}
              </div>
            </div>

            {/* ⑤ MEET YOUR TOUR GUIDE ─ id=section-tour-guide */}
            <div
              id="section-tour-guide"
              className="pb-[50px] border-b border-secondary-light-hover"
            >
              <h2 className="text-semi-md-semibold text-secondary-dark-hover mb-5 ml-5">
                Meet Your Tour Guide
              </h2>
              <GuideCard guide={tourData.guide} />
            </div>

            {/* ⑥ WHAT OUR TRAVELERS SAY ─ id=section-reviews */}
            <div
              id="section-reviews"
              style={{ padding: "32px 0", borderBottom: "1.5px solid #ebdff5" }}
            >
                           <h2 className="text-semi-md-semibold text-secondary-dark-hover mb-5.5 ml-5">

                What Our Travelers Say
              </h2>
              <ReviewsSection tourData={tourData} />
            </div>

            {/* ⑦ IMPORTANT INFO + MEETING POINT & LOCATION ─ id=section-location */}
            <div
              id="section-location"
              className="pb-14.5 pt-8 border-b border-secondary-light-hover"
            >
              {showImportantInformation && (
                <div className="mb-10 w-full rounded-[20px] border border-solid border-[#e8d9f5] bg-white px-5 md:px-[33px] pb-8 pt-[29px]">
                  <h2 className="font-raleway text-xl font-bold leading-8 tracking-normal text-secondary-dark-hover">
                    Important Information
                  </h2>
                  {importantInfoRows.length > 0 && (
                    <div className="mt-4 flex w-full min-w-0 flex-col">
                      {importantInfoRows.map((block, i) => (
                        <div
                          key={i}
                          className="border-b border-solid border-[#e8d9f5] py-3"
                        >
                          <p className="font-raleway text-sm font-normal leading-[20.8px]">
                            <span className="font-bold text-secondary-dark-default">
                              {importantInformationRowLabel(block)}
                            </span>
                            <span className="whitespace-pre-line font-raleway text-[13px] font-normal leading-[20.8px] text-tertiary-normal-default">
                              {" "}
                              {block.body}
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  {importantInfoFooter ? (
                    <div
                      className={`flex min-h-[70px] w-full items-center gap-[11.7px] rounded-xl bg-secondary-light-hover/50 px-4 py-4 ${importantInfoRows.length > 0 ? "mt-6" : "mt-4"}`}
                    >
                      <span
                        className="ml-1.5 shrink-0 font-sans text-lg font-normal leading-[28.8px] text-[#364153]"
                        aria-hidden
                      >
                        ✓
                      </span>
                      <p className="font-raleway text-[13px] font-semibold leading-[20.8px] text-secondary-dark-hover">
                        {importantInfoFooter}
                      </p>
                    </div>
                  ) : null}
                </div>
              )}

              <h2 className="text-semi-md-semibold text-secondary-dark-hover mb-5.5 ml-5">

                Meeting Point & Location
              </h2>
              {/* Map — OSM tiles; pin is draggable; tap map to move pin */}
              <div className="relative h-[393px] w-full overflow-hidden rounded-[16px] bg-secondary-light-hover">
                <MeetingPointMapFrame
                  key={tour}
                  position={meetingPin}
                  onPositionChange={setMeetingPin}
                  locationLabel={
                    tourData.meetingPointLabel ?? "Accra, Greater Accra Region"
                  }
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="small"
                  shape="pill"
                  endIcon="→"
                  onClick={() => {
                    const { lat, lng } = meetingPin;
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                  className="absolute right-4 bottom-4 z-[501] min-h-0! rounded-full border-0 shadow-none px-[18px] py-2.5 text-[14px] font-semibold text-primary-light-default"
                >
                  Get Directions
                </Button>
              </div>
              {/* Pickup note */}
              <p
              className="mt-4 rounded-[10px] bg-secondary-light-hover border border-secondary-light-active px-5 py-2.5 text-med-small-semibold text-secondary-normal-default"
               
              >
                Hotel pickup available from Greater Accra and Cape Coast
                downtown. We will contact you the day before to confirm your
                exact pickup time.
              </p>
            </div>

            {/* ⑧ TRAVELLING WITH 6 OR MORE? ─ group CTA */}
            <div
            className="pt-5 pb-[64px] border-b border-secondary-light-hover "
            >
              <div
              className="px-5 py-8 rounded-[30px] bg-secondary-dark-darker border border-secondary-light-hover flex flex-col md:flex-row md:items-center md:justify-between gap-6"

              >
                <div className="flex-1 min-w-0">
                  <h4
                  className="text-semi-md-semibold text-white mb-2 "
                   
                  >
                    Travelling with 6 or more?
                  </h4>
                  <p
                  className="text-med-small-Medium text-primary-normal-hover max-w-[500px]"
                    
                  >
                    Get bespoke itineraries around our group—greater vehicles, separate dining sessions for minors and starting-time seeds at hotels. Corporate retreats and cultural delegations welcome.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="secondaryOutline"
                  size="medium"
                  shape="pill"
                  endIcon="→"
                  className="shrink-0 whitespace-nowrap rounded-full border-[1.5px] border-secondary-dark-hover bg-secondary-light-default! hover:bg-secondary-light-hover! active:bg-secondary-light-active! text-secondary-dark-hover hover:text-secondary-dark-hover active:text-secondary-dark-hover shadow-none px-6 py-[14px] text-[15px] leading-[22px] font-raleway font-semibold hover:border-secondary-dark-hover active:border-secondary-dark-hover"
                >
                  Get a Group Quote
                </Button>
              </div>
            </div>

            {/* ⑨ YOU MIGHT ALSO LOVE — flex-wrap: 351px cards × 3 exceeds 928px col; avoid overflow under sidebar */}
            <div className="pt-10 w-full min-w-0">
            <h2 className="text-semi-md-semibold text-secondary-dark-hover mb-5.5 ml-5">

                You Might Also Love
              </h2>
              <div className="flex w-full min-w-0 flex-wrap justify-start gap-5">
                {RELATED_TOURS.map((t) => (
                  <PopularTourCard
                    key={t.id}
                    image={t.image}
                    location={t.location}
                    rating={t.rating}
                    title={t.title}
                    availabilityBadge={t.availabilityBadge}
                    price={t.price}
                    tags={t.tags}
                    duration={t.duration}
                    pickupIncluded={t.pickupIncluded}
                    maxGroupSize={t.maxGroupSize}
                    country={t.country}
                    tourSlug={t.slug}
                  />
                ))}
              </div>
            </div>

            
          </div>

          {/* ── RIGHT: Booking Widget — Figma 3156:45940 ─────────────────── */}
          {/* Mobile: full width, below content. Desktop: sticky 457px right column
              sticky top = 112px navbar + 64px detail nav + 12px buffer = 188px   */}
          <div
            className="z-10 lg:min-w-[457px] max-w-full flex-shrink-0 sticky"
            style={{
              top: "188px",
              maxHeight: "calc(100vh - 200px)",
              overflowY: "auto",
              scrollbarWidth: "none",   /* Firefox */
              msOverflowStyle: "none",  /* IE 11  */
            }}
          >
            <BookingWidget
              tourData={tourData}
              adults={adults}
              setAdults={setAdults}
              children={children}
              setChildren={setChildren}
              departureDate={departureDate}
              setDepartureDate={setDepartureDate}
              returnDate={returnDate}
              setReturnDate={setReturnDate}
              bookmarked={bookmarked}
              setBookmarked={setBookmarked}
            />
          </div>
          
        </div>
        
      </div>
      <div>
            <PartnerPromoCtaSection
              {...partnerPromoTour}
              onCtaClick={() => setPartnerModalOpen(true)}
            />

            </div>

      {/* Gallery Modal */}
      {galleryOpen && (
        <ImageGalleryModal
          images={tourData.images}
          currentIndex={galleryIndex}
          onClose={() => setGalleryOpen(false)}
          onShare={() => setShareOpen(true)}
          suppressEscapeClose={shareOpen}
          title={tourData.title}
          location="Ghana — Central Region, Cape Coast"
        />
      )}

      {/* Share Modal */}
      {shareOpen && (
        <ShareModal
          onClose={() => setShareOpen(false)}
          tour={{
            title: tourData.title,
            description: tourData.description.slice(0, 220) + "…",
            image: tourData.heroMainImage,
            url: typeof window !== "undefined" ? window.location.href : "",
            locationTag: "Ghana",
            author: {
              name: "Danielle Cousin",
              avatar: "https://picsum.photos/seed/author-avatar/48/48",
              subtitle: tourData.title,
            },
          }}
        />
      )}

      {partnerModalOpen && (
        <PartnerWithUsModal
          onClose={() => setPartnerModalOpen(false)}
          onSubmit={() => {}}
        />
      )}
    </main>
  );
};

export default TourDetailPage;
