import React, { useState, useEffect, useLayoutEffect, useCallback, useRef, Fragment, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchTourThunk, selectCurrentTour, clearCurrentTour } from "../../store/slices/toursSlice";
import { createBookingThunk, selectCreateBookingStatus, selectBookingsError, clearBookingError } from "../../store/slices/bookingsSlice";
import { selectIsAuthenticated } from "../../store/slices/authSlice";
import { incrementTourViewApi, listToursApi } from "../../api/tours.api";
import { listReviewsByTourApi } from "../../api/reviews.api";
import { classNames } from "../../utils/classNames";
import { formatTimeAgo } from "../../utils/formatTimeAgo";
import BlogBreadcrumbBar from "../../components/sections/blog/BlogBreadcrumbBar";
import Dropdown from "../../components/ui/Dropdown";
import logoCombo from "../../assets/Elysium+Achimota/LogoCombo.png";
import ElysiumLogo from "../../assets/Elysium-logo.svg";
import dividerLine from "../../assets/ElysiumAssets/divider-line.svg";
import ImageGalleryModal from "../../components/ui/ImageGalleryModal";
import ShareModal from "../../components/ui/ShareModal";
import PartnerWithUsModal from "../../components/ui/PartnerWithUsModal";
import Button from "../../components/ui/button";
import PartnerPromoCtaSection from "../../components/sections/PartnerPromoCtaSection";
import { partnerPromoTour } from "../../data/partnerPromoCtaPresets.jsx";
import PopularTourCard from "../../components/cards/PopularTourCard";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Route: /tours/:country/:tour
// e.g. /tours/ghana/elmina-heritage-coastal-journey

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
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={20}
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
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
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
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
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
      strokeLinecap="round"
      strokeLinejoin="round"
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
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.33594 4.66699H7.33594"
      stroke="#141B34"
      strokeLinecap="round"
    />
    <path
      d="M14.0026 1.33301L9.33594 5.99937M14.0026 5.99967L9.33594 1.33331"
      stroke="#141B34"
      strokeLinecap="round"
      strokeLinejoin="round"
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
          {tourData.images.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onOpenGallery(0); }}
              className="absolute bottom-4 right-4 z-10 flex h-[38px] items-center gap-2 rounded-[10px] border border-secondary-light-default px-3 backdrop-blur-[7.45px]"
              style={{ backgroundColor: "rgba(123, 44, 191, 0.5)", width: "160px" }}
            >
              <span className="font-sans text-sm font-semibold leading-5 tracking-[-0.15px] text-secondary-light-hover" aria-hidden>⋮⋮</span>
              <span className="font-raleway text-med-small-semibold text-secondary-light-default">Show all photos</span>
            </button>
          )}
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
                onClick={() => tourData.heroTopRight && onOpenGallery(1)}
                role="presentation"
              >
                {tourData.heroTopRight ? (
                  <>
                    <img
                      src={tourData.heroTopRight}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-black/30" aria-hidden />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-secondary-light-hover" aria-hidden />
                )}
              </div>
              <div className="flex h-[347px] gap-1">
                <div
                  className="relative flex-1 min-w-0 min-w-0 shrink-0 cursor-pointer overflow-hidden"
                  onClick={() => tourData.heroBottomLeft && onOpenGallery(2)}
                  role="presentation"
                >
                  {tourData.heroBottomLeft ? (
                    <>
                      <img src={tourData.heroBottomLeft} alt="" className="absolute inset-0 h-full w-full object-cover" />
                      <div className="pointer-events-none absolute inset-0 bg-black/30" aria-hidden />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-secondary-light-hover" aria-hidden />
                  )}
                </div>
                <div
                  className="relative min-w-0 flex-1 cursor-pointer overflow-hidden"
                  onClick={() => tourData.heroBottomRight && onOpenGallery(3)}
                  role="presentation"
                >
                  {tourData.heroBottomRight ? (
                    <>
                      <img src={tourData.heroBottomRight} alt="" className="absolute inset-0 h-full w-full object-cover" />
                      <div className="pointer-events-none absolute inset-0 bg-black/30" aria-hidden />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-secondary-light-hover" aria-hidden />
                  )}
                  {tourData.images.length > 4 && (
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
                  )}
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
    className="w-full bg-[#fefefe] sticky z-40 top-0"
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
            {/* Local context — only shown when explicitly provided */}
            {day.localContext && (
              <div className="border-l-3 border-secondary-normal-default px-4.5 py-3 bg-[#F3E8FF80] rounded-r-sm ">
                <span className="text-[14px] font-bold text-secondary-dark-hover">
                  Local Context:
                  <span className="text-[14px] font-medium ">
                    {day.localContext}
                  </span>
                </span>
              </div>
            )}

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
const STAR_FILTERS = ["All", 5, 4, 3, 2, 1];

const normalizeReview = (r, i) => ({
  id:     r._id || r.id || i,
  name:   r.author?.name || r.reviewerName || r.name || "Traveler",
  avatar: r.author?.avatar || r.avatar || null,
  rating: r.rating || 5,
  date:   r.createdAt || r.date || new Date().toISOString(),
  text:   r.body || r.text || r.comment || "",
});

const ReviewsSection = ({ tourData, apiReviews, apiStats, tourId }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [extraReviews, setExtraReviews]  = useState([]);
  const [nextPage, setNextPage]          = useState(2);
  const [loadingMore, setLoadingMore]    = useState(false);

  const baseReviews = useMemo(
    () => (apiReviews && apiReviews.length > 0 ? apiReviews.map(normalizeReview) : tourData.reviews),
    [apiReviews, tourData.reviews]
  );

  const allReviews = useMemo(
    () => [...baseReviews, ...extraReviews],
    [baseReviews, extraReviews]
  );

  const displayReviews = activeFilter === "All"
    ? allReviews
    : allReviews.filter((r) => r.rating === activeFilter);

  const totalReviews = apiStats?.totalReviews ?? 0;
  const hasMore = activeFilter === "All" && allReviews.length < totalReviews;

  const handleLoadMore = async () => {
    if (!tourId || loadingMore) return;
    setLoadingMore(true);
    try {
      const data = await listReviewsByTourApi(tourId, { page: nextPage, pageSize: 10 });
      const rows = Array.isArray(data?.reviews) ? data.reviews : [];
      setExtraReviews((prev) => [...prev, ...rows.map(normalizeReview)]);
      setNextPage((p) => p + 1);
    } catch {
      // silently ignore
    } finally {
      setLoadingMore(false);
    }
  };

  const displayRating = apiStats?.weightedAverageRating ?? apiStats?.averageRating ?? tourData.rating;
  const displayTotal  = apiStats?.totalReviews ?? tourData.totalReviews ?? 0;
  const displayBreakdown = apiStats?.ratingBreakdown ?? tourData.ratingBreakdown;

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
            {displayRating || "—"}
          </span>
          <ReviewStars rating={displayRating} size={18} />
          <span
          className="text-med-small-Medium mt-2.5 text-[#4a5565]"

          >
            {displayTotal.toLocaleString()} reviews
          </span>
        </div>
        {/* Category rating bars */}
        <div
          className="flex-1 gap-4.5 pt-2 flex flex-col"
        >
          {displayBreakdown
            ? [5, 4, 3, 2, 1].map((star) => {
                const count = displayBreakdown[star] || 0;
                const pct = displayTotal > 0 ? (count / displayTotal) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-3">
                    <span
                      style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500, fontSize: "13px", lineHeight: "20px", color: "#364153", width: "60px", flexShrink: 0 }}
                    >
                      {star} star{star !== 1 ? "s" : ""}
                    </span>
                    <div className="flex-1 h-2 rounded-lg bg-secondary-light-hover overflow-hidden">
                      <div className="h-full bg-secondary-normal-default rounded-lg" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-[14px] text-tertiary-normal-default text-right flex-shrink-0 w-8">
                      {count}
                    </span>
                  </div>
                );
              })
            : (tourData.categoryRatings || []).map(({ label, score }) => (
                <div key={label} className="flex items-center gap-3">
                  <span
                    style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500, fontSize: "13px", lineHeight: "20px", color: "#364153", width: "140px", flexShrink: 0 }}
                    className="text-med-small-Medium text-tertiary-normal-default"
                  >
                    {label}
                  </span>
                  <div className="flex-1 h-2 rounded-lg bg-secondary-light-hover overflow-hidden">
                    <div className="h-full bg-secondary-normal-default rounded-lg" style={{ width: `${(score / 5) * 100}%` }} />
                  </div>
                  <span className="text-[14px] text-tertiary-normal-default text-right flex-shrink-0">
                    {score}
                  </span>
                </div>
              ))
          }
        </div>
      </div>

      {/* Star rating filters — only shown when reviews exist */}
      {allReviews.length > 0 && (
        <div className="flex items-center gap-2 mb-7 flex-wrap">
          {STAR_FILTERS.map((f) => {
            const isActive = activeFilter === f;
            const count = f === "All" ? allReviews.length : allReviews.filter((r) => r.rating === f).length;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(f)}
                className={`flex items-center gap-1.5 text-med-small-Medium py-[9px] rounded-[40px] px-4 transition-colors cursor-pointer ${isActive ? "text-white bg-secondary-normal-default" : "text-primary-dark-darker bg-secondary-light-hover"}`}
              >
                {f === "All" ? (
                  <span>All ({count})</span>
                ) : (
                  <>
                    <span>{f}</span>
                    <StarIcon filled size={13} />
                    <span className={isActive ? "text-white/70" : "text-[#888]"}>({count})</span>
                  </>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Review cards */}
      <div className="flex flex-col gap-4">
        {allReviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 px-6 rounded-[20px] bg-primary-light-default/60 border border-secondary-light-hover gap-4">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <circle cx="24" cy="24" r="23" stroke="#D6BEEB" strokeWidth="2" />
              <path d="M15 20h18M15 27h12" stroke="#D6BEEB" strokeWidth="2" strokeLinecap="round" />
              <circle cx="33" cy="27" r="1.5" fill="#D6BEEB" />
            </svg>
            <p className="font-raleway font-semibold text-[15px] text-secondary-normal-default">No reviews yet</p>
            <p className="font-raleway text-[13px] text-[#4a5565] text-center max-w-[280px]">
              Be the first to share your experience on this tour.
            </p>
          </div>
        ) : displayReviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 px-6 rounded-[20px] bg-primary-light-default/60 border border-secondary-light-hover gap-3">
            <p className="font-raleway font-semibold text-[14px] text-secondary-normal-default">No {activeFilter}★ reviews</p>
            <p className="font-raleway text-[13px] text-[#4a5565]">Try a different star filter.</p>
          </div>
        ) : displayReviews.map((review) => (
          <div
            key={review.id}
            className="px-5 py-7 rounded-[20px] bg-primary-light-default/60 border border-secondary-light-hover "
          >
            <div className="flex items-start gap-4" >
              <div
              className="size-[60px] rounded-full overflow-hidden flex-shrink-0 bg-secondary-light-hover flex items-center justify-center"

              >
                {review.avatar ? (
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-secondary-normal-default font-raleway font-bold text-lg select-none">
                    {review.name ? review.name.charAt(0).toUpperCase() : "?"}
                  </span>
                )}
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

      {/* Load more — only when there are more reviews on the server */}
      {hasMore && (
        <div className="flex justify-center mt-6">
          <Button
            type="button"
            variant="secondaryOutline"
            shape="pill"
            onClick={handleLoadMore}
            disabled={loadingMore}
            style={{ fontFamily: "Raleway, sans-serif" }}
            className="!bg-secondary-light-default hover:!bg-secondary-light-hover active:!bg-secondary-light-active shadow-none min-h-14 h-14 px-8 rounded-full border-[1.5px] border-secondary-normal-default text-secondary-normal-default text-[15px] font-semibold disabled:opacity-50"
          >
            {loadingMore
              ? "Loading..."
              : `See All ${totalReviews.toLocaleString()} Reviews →`}
          </Button>
        </div>
      )}
    </div>
  );
};

// ─── BookingWidget ────────────────────────────────────────────────────────────
// Two render modes (auto-detected from tourData):
//
//   hotel_selector  accommodationOptions[] populated
//                   → Achimota-style: single/double dropdown, hotel dropdown,
//                     single departure date, "Make Payment", logo combo footer
//
//   standard        base price only
//                   → original layout: stepper, traveler counters, date range,
//                     "Reserve This Tour"

const BOOKING_STEPS = [
  { id: 1, label: "Dates" },
  { id: 2, label: "Review" },
  { id: 3, label: "Payment" },
];

const ROOM_OPTIONS = [
  { value: "single", label: "Single" },
  { value: "double", label: "Double" },
];

const WishlistHeartIcon = ({ filled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
    <path
      d="M6.61573 13.7362C7.75843 15.4212 10.241 15.4213 11.3837 13.7363L15.3052 7.9537C16.0346 6.87805 16.0742 5.47034 15.4143 4.35069C14.0961 2.11423 10.8298 2.14608 9.58663 4.42508C9.33322 4.88962 8.66617 4.88962 8.41277 4.42508C7.16957 2.14608 3.90334 2.11425 2.58514 4.3507C1.92521 5.47034 1.96481 6.87805 2.69426 7.95369L6.61573 13.7362Z"
      stroke={filled ? "#7b2cbf" : "#2d2d2d"}
      fill={filled ? "#7b2cbf" : "none"}
      strokeWidth="1.2"
    />
  </svg>
);

const FreeCancelBadge = () => (
  <div className="mx-5 mb-5 mt-2 flex h-9 items-center gap-2.5 rounded-sm border border-secondary-light-active bg-secondary-light-hover/50 px-[11px]">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="shrink-0">
      <g clipPath="url(#clip-free-cancel)">
        <path d="M8 0C3.58867 0 0 3.58867 0 8C0 12.4113 3.58867 16 8 16C12.4113 16 16 12.4113 16 8H14.2C14.2 11.4187 11.4187 14.2 8 14.2C4.58133 14.2 1.8 11.4187 1.8 8C1.8 4.58133 4.58133 1.8 8 1.8V0ZM12.9333 1.722L7.93 7.96933L5.592 6.05333L4.25733 7.67733L7.418 10.2693C7.52538 10.3579 7.64931 10.4242 7.78258 10.4644C7.91585 10.5046 8.05578 10.5178 8.19422 10.5034C8.33266 10.4889 8.46684 10.447 8.58893 10.3802C8.71102 10.3133 8.81857 10.2228 8.90533 10.114L14.5747 3.036L12.9333 1.722Z" className="fill-secondary-light-active" />
      </g>
      <defs><clipPath id="clip-free-cancel"><rect width="16" height="16" fill="white" /></clipPath></defs>
    </svg>
    <span className="whitespace-nowrap text-med-small-Medium text-secondary-normal-default">
      Free cancellation up to 48 hours before departure
    </span>
  </div>
);

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
  onBook,
  bookingStatus,
  bookingError,
}) => {
  // ── Hotel-selector mode detection ──────────────────────────────────────────
  const accomOptions = tourData.accommodationOptions ?? [];
  const isHotelSelector = accomOptions.length > 0;

  const [selectedHotelValue, setSelectedHotelValue] = useState(String(0));
  const [selectedRoomType, setSelectedRoomType] = useState("single");

  const selectedHotelOption = accomOptions[Number(selectedHotelValue)] ?? accomOptions[0] ?? null;

  const hotelDropdownOptions = accomOptions.map((o, i) => ({
    value: String(i),
    label: o.label,
  }));

  const getPriceRaw = useCallback((opt, roomType) => {
    if (!opt?.pricing) return null;
    const entry = opt.pricing.find((p) => p.roomType === roomType);
    return entry?.pricePerPerson ?? null;
  }, []);

  const fmtPrice = (raw) =>
    raw != null ? `$${Number(raw).toLocaleString("en-US")}` : null;

  const singleRaw = getPriceRaw(selectedHotelOption, "single");
  const doubleRaw = getPriceRaw(selectedHotelOption, "double");

  // Pre-populate departure from tour startDate
  useEffect(() => {
    if (tourData.startDate && !departureDate) {
      setDepartureDate(new Date(tourData.startDate).toISOString().split("T")[0]);
    }
  }, [tourData.startDate]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Standard mode state ────────────────────────────────────────────────────
  const [bookingStepInternal, setBookingStepInternal] = useState(1);
  const activeStep = bookingStepProp !== undefined ? bookingStepProp : bookingStepInternal;
  const setActiveStep = onBookingStepChange ?? setBookingStepInternal;

  const [selectedBookingAddons, setSelectedBookingAddons] = useState({});
  const bookingAddOns = useMemo(() => tourData.bookingAddOns ?? [], [tourData.bookingAddOns]);
  const addonsSubtotal = useMemo(
    () => bookingAddOns.reduce((sum, a) => sum + (selectedBookingAddons[a.id] ? a.priceGhc : 0), 0),
    [bookingAddOns, selectedBookingAddons]
  );
  const toggleBookingAddon = (id) =>
    setSelectedBookingAddons((prev) => ({ ...prev, [id]: !prev[id] }));

  // ── HOTEL-SELECTOR RENDER ──────────────────────────────────────────────────
  if (isHotelSelector) {
    const hasMultipleOptions = accomOptions.length > 1;
    const headerPriceText = [fmtPrice(singleRaw), fmtPrice(doubleRaw)]
      .filter(Boolean)
      .join(" / ");
    // Subtitle: "single/ double" always; append hotel name only if 1 option
    const headerSubtitle = hasMultipleOptions
      ? "single/ double"
      : `single/ double · ${selectedHotelOption?.label ?? ""}`;

    return (
      <div className="max-w-full overflow-hidden rounded-[24px] border border-secondary-light-active bg-white">
        {/* Gradient header */}
        <div className="flex flex-col gap-1.5 bg-linear-to-b from-secondary-normal-default to-[#391559] px-5 py-6">
          <p className="font-raleway text-xs font-medium uppercase tracking-[0.06em] text-secondary-light-active">FROM</p>
          <p className="font-raleway text-[28px] font-bold leading-[34px] text-white">
            {headerPriceText || tourData.price || "Contact us"}
          </p>
          <p className="font-raleway text-[13px] font-medium text-secondary-light-hover">
            {headerSubtitle}
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5 px-5 pt-6 pb-2">
          {/* Single or Double Option */}
          <div>
            <p className="mb-2 font-raleway text-[13px] font-semibold text-secondary-dark-hover">
              Single or Double Option
            </p>
            <Dropdown
              options={ROOM_OPTIONS}
              value={selectedRoomType}
              onChange={setSelectedRoomType}
              placeholder="Choose between a single or double option."
            />
          </div>

          {/* Hotel Option — only when multiple options exist */}
          {hasMultipleOptions && (
            <div>
              <p className="mb-2 font-raleway text-[13px] font-semibold text-secondary-dark-hover">
                Choose Hotel Option
              </p>
              <Dropdown
                options={hotelDropdownOptions}
                value={selectedHotelValue}
                onChange={setSelectedHotelValue}
                placeholder="Package / hotel option"
              />
            </div>
          )}

          {/* Departure */}
          <div>
            <p className="mb-2 font-raleway text-[13px] font-semibold text-secondary-dark-hover">
              Departure
            </p>
            <div className="relative">
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="box-border h-[46px] w-full rounded-[10px] border border-[#d1d5dc] px-4 font-raleway text-[14px] text-[#374151] outline-none focus:border-[#7b2cbf] focus:ring-2 focus:ring-[#7b2cbf]/20"
              />
            </div>
          </div>

          {/* Error */}
          {bookingError && (
            <p className="rounded-sm bg-red-50 px-3 py-2 text-sm text-red-600">{bookingError}</p>
          )}

          {/* Make Payment */}
          <Button
            type="button"
            variant="secondary"
            shape="pill"
            fullWidth
            disabled={bookingStatus === "loading"}
            onClick={onBook}
            className="h-[52px] min-h-0! rounded-full border-0 font-raleway text-[15px] font-semibold leading-[22px] text-secondary-light-default! shadow-[0_4px_4px_rgba(0,0,0,0.05)] disabled:opacity-60"
          >
            {bookingStatus === "loading" ? "Processing…" : "Make Payment"}
          </Button>

          {/* Save to Wishlist */}
          <Button
            type="button"
            variant="link"
            onClick={() => setBookmarked(!bookmarked)}
            startIcon={<WishlistHeartIcon filled={bookmarked} />}
            className="w-full justify-center !no-underline p-0! py-1 font-raleway text-[13px] font-medium text-tertiary-normal-default shadow-none"
          >
            Save to Wishlist
          </Button>
        </div>

        <FreeCancelBadge />
      </div>
    );
  }

  // ── STANDARD RENDER ────────────────────────────────────────────────────────
  return (
  <div className="max-w-full overflow-hidden rounded-[24px] border border-secondary-light-active bg-white">
    {/* Gradient header */}
    <div className="flex flex-col gap-2 bg-linear-to-b from-secondary-normal-default to-[#391559] pl-[18px] pr-6 py-6">
      <p className="text-sm-Medium text-secondary-light-active">FROM</p>
      <p className="text-Display-md-small-bold text-white">{tourData?.price ?? "Contact us"}</p>
      <p className="text-med-small-Medium text-secondary-light-hover">per person</p>
    </div>

    {/* 3-step stepper */}
    <div className="flex py-5 px-11 items-center justify-center border-b border-secondary-light-default">
      <div className="flex items-center justify-between w-full gap-3">
        {BOOKING_STEPS.map((step, index) => {
          const isActive = activeStep === step.id;
          const isComplete = activeStep > step.id;
          const isUpcoming = activeStep < step.id;
          const circleClass = classNames(
            "flex items-center justify-center rounded-full font-raleway text-med-small-semibold transition-colors size-[40px]",
            (isActive || isComplete) ? "bg-secondary-normal-default text-white" : "bg-secondary-light-default text-secondary-light-active"
          );
          const labelClass = classNames(
            "font-raleway text-xs leading-4",
            (isActive || isComplete) ? "font-bold text-secondary-normal-default" : "font-semibold text-secondary-light-active"
          );
          return (
            <Fragment key={step.id}>
              <button
                type="button"
                onClick={() => setActiveStep(step.id)}
                className="flex w-[72px] flex-col items-center gap-1.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-secondary-normal-default focus-visible:ring-offset-2"
                aria-current={isActive ? "step" : undefined}
              >
                <span className={circleClass}>{step.id}</span>
                <span className={labelClass}>{step.label}</span>
              </button>
              {index < BOOKING_STEPS.length - 1 && (
                <div role="presentation" className={classNames("h-0.5 w-10 rounded-lg", activeStep > step.id ? "bg-secondary-normal-default" : "bg-secondary-light-hover")} />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>

    {/* Content */}
    <div className="flex flex-col gap-3 px-[30px] pt-6">
      {/* Date range */}
      <div className="w-full">
        <p className="mb-3.5 text-med-small-bold text-secondary-dark-hover">CHOOSE YOUR DATE</p>
        <div className="flex gap-[70px] justify-between w-full">
          <div className="flex-1">
            <p className="mb-2 font-[Inter,sans-serif] text-xs font-medium uppercase tracking-[0.04em] text-[#6a7282]">DEPARTURE</p>
            <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} className="box-border h-9 w-full rounded-sm border border-[#d1d5dc] px-3 py-2.5 font-[Inter,sans-serif] text-[13px] text-[#0A0A0A80] outline-none" />
          </div>
          <div className="flex-1">
            <p className="mb-2 font-[Inter,sans-serif] text-xs font-medium uppercase tracking-[0.04em] text-[#6a7282]">RETURN</p>
            <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className="box-border h-9 w-full rounded-sm border border-[#d1d5dc] px-2.5 font-[Inter,sans-serif] text-[13px] text-[#0A0A0A80] outline-none" />
          </div>
        </div>
      </div>

      {/* Travelers */}
      <div>
        <p className="mb-2 font-raleway text-med-small-bold text-secondary-dark-hover">Travelers</p>
        <div className="flex flex-col">
          {[{ label: "Adults", sub: "Age 13+", val: adults, setVal: setAdults, min: 1 },
            { label: "Children", sub: "Age 4–12", val: children, setVal: setChildren, min: 0 }].map(({ label, sub, val, setVal, min }) => (
            <div key={label} className="flex items-center justify-between py-[7px]">
              <div>
                <p className="text-med-small-semibold text-tertiary-normal-default">{label}</p>
                <p className="text-sm-Medium text-secondary-normal-default">{sub}</p>
              </div>
              <div className="flex items-center gap-3">
                <Button type="button" variant="secondaryOutline" onClick={() => setVal(Math.max(min, val - 1))} className="size-8! min-h-0! border-2! rounded-full! border-secondary-light-active! bg-transparent! p-0! text-lg! font-bold! leading-none text-secondary-normal-default shadow-none! hover:bg-secondary-light-default/40">−</Button>
                <span className="w-8 text-center text-semi-md-semibold text-secondary-dark-hover">{val}</span>
                <Button type="button" variant="secondaryOutline" onClick={() => setVal(val + 1)} className="size-8! min-h-0! rounded-full! border-2! border-secondary-light-active! bg-transparent! p-0! text-lg! font-bold! leading-none text-secondary-normal-default shadow-none! hover:bg-secondary-light-default/40">+</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {bookingAddOns.length > 0 && (
        <div className="mt-3 border-t border-secondary-light-default pt-4">
          <p className="mb-3 font-raleway text-med-small-bold text-secondary-dark-hover">Optional extras</p>
          <div className="flex flex-col gap-2">
            {bookingAddOns.map((a) => (
              <label key={a.id} className="flex cursor-pointer items-start gap-3 rounded-lg border border-secondary-light-hover bg-secondary-light-default/50 px-3 py-2.5 transition-colors hover:bg-secondary-light-default/80">
                <input type="checkbox" checked={!!selectedBookingAddons[a.id]} onChange={() => toggleBookingAddon(a.id)} className="mt-0.5 size-4 shrink-0 accent-secondary-normal-default" />
                <span className="flex-1 text-med-small-Medium text-tertiary-normal-default">{a.label}</span>
                <span className="text-med-small-semibold text-secondary-normal-default whitespace-nowrap tabular-nums">GHC {a.priceGhc.toLocaleString()}</span>
              </label>
            ))}
          </div>
          {addonsSubtotal > 0 && (
            <div className="mt-3 flex items-center justify-between border-t border-dashed border-secondary-light-active pt-3 text-med-small-semibold text-secondary-dark-hover">
              <span>Add-ons subtotal</span>
              <span className="tabular-nums">GHC {addonsSubtotal.toLocaleString()}</span>
            </div>
          )}
        </div>
      )}

      {bookingError && <p className="rounded-sm bg-red-50 px-3 py-2 text-sm text-red-600">{bookingError}</p>}

      <div className="flex flex-col gap-2">
        <Button type="button" variant="secondary" shape="pill" fullWidth disabled={bookingStatus === "loading"} onClick={onBook} className="h-[46px] min-h-0! rounded-full border-0 font-raleway text-[15px] font-semibold leading-[22px] text-secondary-light-default! shadow-[0_4px_4px_rgba(0,0,0,0.05)] disabled:opacity-60">
          {bookingStatus === "loading" ? "Booking…" : "Reserve This Tour"}
        </Button>
        <Button type="button" variant="link" onClick={() => setBookmarked(!bookmarked)} startIcon={<WishlistHeartIcon filled={bookmarked} />} className="w-full justify-center !no-underline p-0! py-1 font-raleway text-[13px] font-medium text-tertiary-normal-default shadow-none">
          Save to Wishlist
        </Button>
      </div>
    </div>

    <FreeCancelBadge />
  </div>
  );
};

// ─── YouMightAlsoLoveSection ─────────────────────────────────────────────────
// Fetches tours from the same country, filters out the current one,
// prioritises shared tags (so Achimota tours surface together), shows 3 cards.
const TOUR_TYPE_LABELS_YML = { day_tour: "Day Tour", multi_day: "Multi-Day", express: "Express" };

function toRelatedCardProps(t, i) {
  const typeLabel  = TOUR_TYPE_LABELS_YML[t.tourType] || "Multi-Day";
  const days       = t.durationDays;
  const durationSpan = days
    ? (days === 1 ? "1 Day" : `${days} Days/${days - 1} Night${days - 1 !== 1 ? "s" : ""}`)
    : "3 Days";

  const accomOpts  = (t.accommodationOptions || []).filter((o) => o.isActive !== false);
  const allSingles = accomOpts.flatMap((o) =>
    (o.pricing || []).filter((p) => p.roomType === "single").map((p) => p.pricePerPerson)
  ).filter((v) => v != null);
  const minPrice = allSingles.length > 0 ? Math.min(...allSingles) : t.basePrice;
  const currency = t.displayCurrency || "GHS";
  const SYMBOLS  = { USD: "$", GHS: "GHS ", EUR: "€", GBP: "£" };
  const sym      = SYMBOLS[currency] ?? `${currency} `;
  const price    = minPrice != null
    ? `${sym}${Number(minPrice).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
    : "Contact us";

  return {
    id:                t._id || t.id || i,
    image:             t.coverImage || t.tourHighlights?.[0]?.image,
    location:          t.destination?.name
      ? `${t.destination.name}, ${t.country || "Ghana"}`
      : (t.country || "Ghana"),
    rating:            t.rating || 0,
    reviewCount:       t.reviewCount || 0,
    title:             t.title || "Tour",
    availabilityBadge: t.availabilityBadge || "Available",
    startDate:         t.startDate || null,
    price,
    tags:              (t.tags || []).slice(0, 3),
    duration:          { class: typeLabel, span: durationSpan },
    maxGroupSize:      t.totalCapacity ?? 50,
    pickupIncluded:    t.pickupIncluded ?? false,
    featureType:       t.featureType ?? null,
    featureLabel:      t.featureLabel ?? null,
    statusBadge:       t.statusBadge || null,
    country:           t.country || "ghana",
    tourSlug:          t.slug || String(t._id || t.id || i),
  };
}

const YouMightAlsoLoveSection = ({ currentSlug, currentTags = [], currentCountry = "ghana" }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    let cancelled = false;
    listToursApi({ country: currentCountry, limit: 20 })
      .then((payload) => {
        if (cancelled) return;
        const raw = Array.isArray(payload) ? payload : (payload.rows || payload.data || []);
        const currentSeries = currentSlug.split("-")[0];
        const scored = raw
          .filter((t) => t.slug !== currentSlug)
          .map((t) => {
            const shared = (t.tags || []).filter((tag) => currentTags.includes(tag)).length;
            // Tours from the same series (same slug prefix) always surface first
            const seriesBonus = t.slug?.split("-")[0] === currentSeries ? 200 : 0;
            return { t, score: shared * 10 + seriesBonus + (t.featured ? 5 : 0) + (t.rating || 0) };
          })
          .sort((a, b) => b.score - a.score)
          .slice(0, 3)
          .map(({ t }, i) => toRelatedCardProps(t, i));
        setCards(scored);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [currentSlug, currentCountry, currentTags]);

  if (cards.length === 0) return null;

  return (
    <section className="w-full  py-12 ">
      <h2 className="font-raleway text-xl font-bold text-secondary-dark-hover mb-6">
        You Might Also Love
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <PopularTourCard
            key={card.id}
            {...card}
            showImageOverlays
            className="w-full"
          />
        ))}
      </div>
    </section>
  );
};

// ─── BookingAuthGateModal ──────────────────────────────────────────────────────
// Shown when a logged-out user taps "Book" — introduces sign-in before redirecting.
const BookingAuthGateModal = ({ tourName, onClose, onSignIn, onRegister }) => (
  <div
    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 px-4"
    onClick={onClose}
  >
    <div
      className="relative w-full max-w-[648px] rounded-[30px] bg-white shadow-[0_10px_4px_0_rgba(0,0,0,0.15)] overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-6 right-6 flex items-center justify-center w-6 h-6 text-[#6b7280] hover:text-[#7b2cbf] transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </button>

      <div className="flex flex-col items-center gap-8 px-8 pt-14 pb-10">
        {/* Logo + divider */}
        <div className="flex flex-col items-center gap-2 w-full">
          <img src={ElysiumLogo} alt="Elysium Tours" className="h-[93px] w-auto object-contain" />
          <img src={dividerLine} alt="" className="w-full max-w-[517px]" />
        </div>

        {/* Title + body */}
        <div className="flex flex-col items-center gap-4 text-center max-w-[501px]">
          <h2 className="font-raleway text-[25px] font-bold leading-[1.1] text-[#7b2cbf]">
            Sign In to Reserve Your Place
          </h2>
          <p className="font-raleway text-[16px] font-medium leading-[26px] text-[#6b7280]">
            To complete your booking
            {tourName ? ` for the ${tourName}` : ""}, you'll need to sign in to
            your Elysium account first. This allows us to securely record your
            reservation.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3 w-full max-w-[544px]">
          <button
            type="button"
            onClick={onSignIn}
            className="w-full h-[64px] rounded-[40px] bg-[#6f28ac] font-raleway text-[20px] font-semibold text-white shadow-[0_4px_4px_rgba(0,0,0,0.05)] hover:bg-[#5c1f96] transition-colors"
          >
            Sign In
          </button>

          <div className="flex justify-center border-b border-[#eeeeee] pb-6 pt-3">
            <span className="font-raleway text-[16px] font-semibold text-[#6b7280]">
              New to Elysium?{" "}
            </span>
            <button
              type="button"
              onClick={onRegister}
              className="font-raleway text-[16px] font-semibold text-[#622399] hover:underline ml-1"
            >
              Create an account
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── TourDetailPage ────────────────────────────────────────────────────────────
const TourDetailPage = () => {
  const { country, tour } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const apiTour = useAppSelector(selectCurrentTour);
  const relatedTags = useMemo(() => apiTour?.tags || [], [apiTour?.tags]);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const bookingStatus = useAppSelector(selectCreateBookingStatus);
  const bookingError = useAppSelector(selectBookingsError);
  // activeSection drives the sticky nav bar tabs
  const [activeSection, setActiveSection] = useState("overview");
  const [descExpanded, setDescExpanded] = useState(false);
  const [descClipped, setDescClipped] = useState(false);
  const descRef = useRef(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(2);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [apiReviews, setApiReviews] = useState(null);
  const [apiReviewStats, setApiReviewStats] = useState(null);

  const tourData = useMemo(() => {
    if (!apiTour) return null;

    const days = apiTour.durationDays || 1;
    const durationStr = days === 1
      ? "1 Day"
      : `${days} Days / ${days - 1} Night${days - 1 !== 1 ? "s" : ""}`;

    // Derive min price: accommodationOptions → lowest single price, else basePrice
    const accomOpts = (apiTour.accommodationOptions || []).filter((o) => o.isActive !== false);
    const allSinglePrices = accomOpts.flatMap((o) =>
      (o.pricing || []).filter((p) => p.roomType === "single").map((p) => p.pricePerPerson)
    ).filter((v) => v != null);
    const minPrice = allSinglePrices.length > 0
      ? Math.min(...allSinglePrices)
      : apiTour.basePrice;

    const locationStr = apiTour.destination?.name
      ? `${apiTour.destination.name}, ${apiTour.country ? (apiTour.country.charAt(0).toUpperCase() + apiTour.country.slice(1)) : "Ghana"}`
      : apiTour.country ? (apiTour.country.charAt(0).toUpperCase() + apiTour.country.slice(1)) : null;

    const included = [
      ...(apiTour.inclusions || []).map((text) => ({ type: "check", text })),
      ...(apiTour.exclusions || []).map((text) => ({ type: "cross", text })),
    ];

    // Highlights have hero priority; gallery images fill any remaining slots
    const highlightImgs = (apiTour.tourHighlights || []).map(h => h.image).filter(Boolean);
    const rawImgs = apiTour.images || [];
    const pool = [...new Set([...highlightImgs, ...rawImgs].filter(Boolean))];
    const heroMainImage   = pool[0] || null;
    const heroTopRight    = pool[1] || null;
    const heroBottomLeft  = pool[2] || null;
    const heroBottomRight = pool[3] || null;
    const allImages = pool;

    return {
      title:               apiTour.title        || "",
      description:         apiTour.description  || "",
      location:            locationStr,
      duration:            durationStr,
      maxGuests:           apiTour.totalCapacity ?? null,
      languages:           apiTour.languages || [],
      cancellable:         apiTour.cancellable ?? false,
      cancellation:        apiTour.cancellable
                             ? "Cancellation available"
                             : "Cancellation not available",
      bestFor:             apiTour.bestFor || [],
      route:               apiTour.route || null,
      availabilityBadge:   apiTour.availabilityBadge || null,
      statusBadge:         apiTour.statusBadge || null,
      rating:              apiTour.rating || 0,
      reviewCount:         apiTour.reviewCount || 0,
      categoryRatings:     apiTour.categoryRatings || [],
      heroMainImage,
      heroTopRight,
      heroBottomLeft,
      heroBottomRight,
      images:              allImages,
      tourHighlights:      apiTour.tourHighlights || [],
      itinerary:           apiTour.itinerary || [],
      included,
      bookingAddOns:       (apiTour.bookingAddOns || []).map(a => ({
        id:    a.id || a._id,
        label: a.label,
        price: `GHS ${Number(a.priceGhc || 0).toLocaleString()}`,
        priceGhc: a.priceGhc || 0,
      })),
      importantInformation: apiTour.importantInformation || null,
      businessAmenities:   apiTour.businessAmenities?.items?.length ? apiTour.businessAmenities : null,
      startDate:           apiTour.startDate || null,
      category:            apiTour.category || "leisure",
      highlights:          apiTour.highlights || [],
      accommodationOptions: (apiTour.accommodationOptions || []).filter((o) => o.isActive !== false),
      meetingPoint:        apiTour.meetingPoint || null,
      meetingPointLabel:   apiTour.meetingPointLabel || apiTour.pickupLocation || null,
      pickupNote:          apiTour.pickupNote || null,
      price:               (() => {
        if (minPrice == null) return null;
        const cur = apiTour.displayCurrency || "GHS";
        const SYMBOLS = { USD: "$", GHS: "GHS ", EUR: "€", GBP: "£" };
        const sym = SYMBOLS[cur] ?? `${cur} `;
        return `${sym}${Number(minPrice).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
      })(),
      guide:               null, // no TourGuide service yet
      reviews:             [],   // real reviews come via apiReviews state
      ratingBreakdown:     null,
      totalReviews:        0,
      addOns:              [],   // legacy static add-ons removed; use bookingAddOns
    };
  }, [apiTour]);

  useLayoutEffect(() => {
    const el = descRef.current;
    if (el) setDescClipped(el.scrollHeight > el.clientHeight);
  }, [tourData?.description]);

  const importantInfo = tourData?.importantInformation;
  const importantInfoRows = importantInfo?.blocks ?? [];
  const importantInfoFooter = importantInfo?.footerNote;
  const showImportantInformation = importantInfoRows.length > 0 || !!importantInfoFooter;
  const [meetingPin, setMeetingPin] = useState(() => DEFAULT_MEETING_POINT);

  useEffect(() => {
    setMeetingPin(tourData?.meetingPoint ?? DEFAULT_MEETING_POINT);
  }, [tourData?.meetingPoint]);

  // Fetch tour by slug from API; clear stale data on tour change
  useEffect(() => {
    dispatch(clearCurrentTour());
    setApiReviews(null);
    setApiReviewStats(null);
    if (tour) {
      dispatch(fetchTourThunk(tour)).then((action) => {
        const tourId = action.payload?._id;
        if (tourId) {
          incrementTourViewApi(tourId).catch(() => null);
          listReviewsByTourApi(tourId)
            .then((data) => {
              const rows = Array.isArray(data?.reviews) ? data.reviews : (Array.isArray(data) ? data : []);
              if (rows.length > 0) setApiReviews(rows);
              if (data && !Array.isArray(data)) setApiReviewStats(data);
            })
            .catch(() => null);
        }
      });
    }
  }, [dispatch, tour]);

  // Reset scroll to top whenever the user navigates to a different tour
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  const [authGateOpen, setAuthGateOpen] = useState(false);

  const handleBook = useCallback(async () => {
    if (!isAuthenticated) {
      setAuthGateOpen(true);
      return;
    }
    if (!departureDate) {
      alert("Please select a departure date.");
      return;
    }
    const tourPackageId = apiTour?._id;
    if (!tourPackageId) {
      alert("Tour details are still loading. Please try again.");
      return;
    }
    dispatch(clearBookingError());
    const result = await dispatch(
      createBookingThunk({
        packageId: tourPackageId,
        groupSize: adults + children,
        tourDate: departureDate,
      })
    );
    if (createBookingThunk.fulfilled.match(result)) {
      navigate("/account/bookings");
    }
  }, [isAuthenticated, apiTour, adults, children, departureDate, dispatch, navigate]);

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

  if (!tourData) {
    return (
      <main className="w-full bg-secondary-light-default min-h-screen" style={{ fontFamily: "Raleway, sans-serif" }}>
        <BlogBreadcrumbBar items={[{ label: "Home", href: "/" }, { label: "Tours", href: "/tours" }]} />
        <div className="flex items-center justify-center min-h-[50vh]">
          <span className="text-secondary-normal-default font-raleway text-base">Loading tour details...</span>
        </div>
      </main>
    );
  }

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
      <div className="px-6 md:px-[30px] lg:px-[156px] pt-8 lg:pt-[102px] pb-12 lg:pb-[80px]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[32px] items-start">
          {/* ── LEFT CONTENT — full width on mobile, max-w-928px on desktop */}
          <div className="w-full lg:flex-1 lg:min-w-[70%] lg:max-w-[928px] min-w-0 flex flex-col">
            {/* ── SHARED: Overview block (About + meta bar) ─ id=section-overview ─── */}
            <div id="section-overview" className="mb-6">
              <p className="text-semi-md-semibold text-secondary-dark-hover mb-3">
                {tourData.duration} guided tour
              </p>
              <div className="flex items-center flex-wrap" style={{ gap: "8px" }}>
                <span className="flex items-center gap-2 text-med-small-semibold text-tertiary-normal-default">
                  <UsersIcon /> <span>Max {tourData.maxGuests} guests</span>
                </span>
                <span style={{ color: "#99a1af" }}>·</span>
                <span className="flex items-center gap-2 text-med-small-semibold text-tertiary-normal-default">
                  <ClockIcon /> <span>{tourData.duration}</span>
                </span>
                <span style={{ color: "#99a1af" }}>·</span>
                <span className="flex items-center gap-2 text-med-small-semibold text-tertiary-normal-default">
                  <GlobeIcon /> <span>{tourData.languages}</span>
                </span>
                <span style={{ color: "#99a1af" }}>·</span>
                <span className="flex items-center gap-2 text-med-small-semibold text-tertiary-normal-default">
                  <CancelIcon /> <span>{tourData.cancellation}</span>
                </span>
              </div>

              <div className="h-[1.5px] mt-[21px] mb-6 bg-secondary-light-hover" />

              <div className="bg-white p-5 flex flex-col gap-4 rounded-xl border border-secondary-light-hover">
                <h2 className="text-semi-md-semibold text-secondary-dark-hover">About The Tour</h2>
                <div>
                  <p
                    ref={descRef}
                    dangerouslySetInnerHTML={{ __html: tourData.description }}
                    className={classNames(
                      "text-md-regular text-[#364153]",
                      !descExpanded && "line-clamp-3"
                    )}
                  />
                  {descClipped && !descExpanded && (
                    <button
                      type="button"
                      onClick={() => setDescExpanded(true)}
                      className="mt-1 font-raleway text-sm font-semibold text-[#7b2cbf] hover:underline focus-visible:outline-none"
                    >
                      Read More
                    </button>
                  )}
                </div>
                <div className="flex bg-[#EBDFF580] border mb-4 border-secondary-light-active rounded-[10px] flex-wrap p-2.5 gap-1 items-center">
                  {tourData.route ? (
                    <>
                      <span className="text-med-small-semibold text-secondary-normal-default">Route:</span>
                      <span className="text-med-small-Medium text-tertiary-normal-default">{tourData.route}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-med-small-semibold text-secondary-normal-default">Best For:</span>
                      <div className="flex flex-wrap items-center gap-1">
                        {tourData.bestFor.map((tag, i) => (
                          <React.Fragment key={tag}>
                            {i > 0 && (
                              <span className="mx-1 inline-flex shrink-0 items-center justify-center select-none leading-none" aria-hidden="true">
                                <span className="block h-[2px] w-[2px] shrink-0 rounded-full bg-tertiary-normal-default" />
                              </span>
                            )}
                            <span className="text-med-small-Medium text-tertiary-normal-default">{tag}</span>
                          </React.Fragment>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Business-only: Tour Highlights image cards */}
              {tourData.category === "business" && tourData.tourHighlights?.length > 0 && (
                <div className="relative mt-6 w-full rounded-[20px] border border-solid border-[#e8d9f5] bg-white px-[33px] pb-8 pt-[29px]">
                  <h2 className="font-raleway text-xl font-bold leading-8 tracking-normal text-secondary-dark-hover">Tour Highlights</h2>
                  <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-5 md:gap-y-3">
                    {tourData.tourHighlights.map((entry, idx) => {
                      const { title, description } = normalizeTourHighlight(entry);
                      return (
                        <div key={`${title}-${idx}`} className="relative min-h-[92px] rounded-[14px] bg-[#f3e8ff]/50 pl-[18px] pr-4 pt-4 pb-4">
                          <div className="flex items-start gap-[5px]">
                            <div className="h-[26px] w-6 shrink-0 rounded bg-secondary-light-hover" aria-hidden />
                            <div className="flex min-w-0 flex-1 flex-col gap-1">
                              <div className="font-raleway text-sm font-bold leading-[20.8px] text-secondary-dark-hover">{title}</div>
                              {description ? (
                                <p className="font-raleway text-xs font-normal leading-[18px] tracking-normal text-gray-500 whitespace-pre-line">{description}</p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Business-only: Business Amenities */}
              {tourData.category === "business" && tourData.businessAmenities?.items?.length > 0 && (
                <div className="mt-6 flex w-full max-w-full flex-col items-start gap-4 self-stretch rounded-[20px] border-b-[1.2px] border-solid border-secondary-light-hover bg-white pl-5 pr-5 pt-5 pb-[21px]">
                  <div className="flex w-full flex-col items-start gap-2">
                    <div className="flex w-full items-center gap-2.5 px-0 py-1">
                      <h2 className="text-semi-md-semibold text-secondary-dark-hover">Business Amenities</h2>
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-4 lg:flex-row lg:gap-x-[87px]">
                    {splitBusinessAmenityColumns(tourData.businessAmenities.items).map((column, colIdx) => (
                      <div key={colIdx} className="flex min-w-0 flex-1 flex-col gap-4">
                        {column.map((line) => (
                          <div key={line} className="flex items-center" style={{ gap: "12px" }}>
                            <span className="flex size-5 shrink-0 items-center justify-center"><CheckIcon /></span>
                            <span className="text-md-Medium text-[#364153]">{line}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  {(tourData.businessAmenities.corporateBookingBenefits?.items?.length > 0 || tourData.businessAmenities.noteHtml) && (
                    <div className="relative min-h-44 w-full max-w-[877px] rounded-[14px] border-l-[3px] border-solid border-secondary-dark-hover bg-secondary-light-default/50 px-[21px] pb-5 pt-[19px]">
                      {tourData.businessAmenities.corporateBookingBenefits?.items?.length > 0 && (
                        <>
                          <p className="font-raleway text-sm font-bold leading-[22.4px] text-secondary-dark-hover">
                            {tourData.businessAmenities.corporateBookingBenefits.title ?? "Corporate Booking Benefits"}
                          </p>
                          <ul className="mt-3 flex flex-col gap-0">
                            {tourData.businessAmenities.corporateBookingBenefits.items.map((benefit) => (
                              <li key={benefit} className="flex min-h-[29px] items-center gap-[5.7px]">
                                <span className="shrink-0 font-sans text-[13px] font-bold leading-[20.8px] text-secondary-normal-default" aria-hidden>→</span>
                                <p className="font-raleway text-[13px] font-normal leading-[20.8px] text-[#364153]">{benefit}</p>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                      {!tourData.businessAmenities.corporateBookingBenefits?.items?.length && tourData.businessAmenities.noteHtml && (
                        <div className="font-raleway text-[13px] font-normal leading-relaxed text-[#364153]" dangerouslySetInnerHTML={{ __html: tourData.businessAmenities.noteHtml }} />
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── LEISURE: What's Included comes BEFORE itinerary ─────────────── */}
            {tourData.category !== "business" && (
              <div id="section-inclusions" className="bg-white p-5 flex flex-col gap-4 mb-6 rounded-xl border border-secondary-light-hover">
                <h2 className="text-semi-md-semibold text-secondary-dark-hover">What's included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "16px 40px" }}>
                  {tourData.included.map((item, i) => (
                    <div key={i} className="flex items-center" style={{ gap: "12px" }}>
                      {item.type === "check" ? <CheckIcon /> : <CrossIcon />}
                      <span className="text-md-Medium text-[#364153]">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── ITINERARY ─ id=section-itinerary ───────────────────────────── */}
            {/* Leisure: numbered highlights list | Business: expandable day accordion */}
            <div id="section-itinerary" className="bg-white px-8 mb-6 py-7 flex flex-col gap-4 rounded-xl border border-secondary-light-hover">
              <h2 className="text-semi-md-bold text-secondary-dark-hover">Day-by-Day Itinerary</h2>

              {tourData.category !== "business" ? (
                /* LEISURE — highlights[] mapped to ItineraryStep accordion (same component, same look) */
                tourData.highlights.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {tourData.highlights.map((line, idx) => {
                      const dashIdx = line.indexOf(" — ");
                      const stopName = dashIdx !== -1 ? line.slice(0, dashIdx) : line;
                      const detail   = dashIdx !== -1 ? line.slice(dashIdx + 3) : "";
                      const stepDay = {
                        day:          idx + 1,
                        title:        stopName,
                        preview:      detail.length > 60 ? detail.slice(0, 60) + "…" : detail,
                        localContext: null,
                        activities:   [],
                      };
                      return <ItineraryStep key={idx} day={stepDay} isFirst={idx === 0} />;
                    })}
                  </div>
                ) : (
                  <p className="text-[14px] text-[#9ca3af] font-raleway">No itinerary available for this tour yet.</p>
                )
              ) : (
                /* BUSINESS — structured day accordion */
                <>
                  <p className="text-[14px] font-medium text-[#6B7280]">A structured programme with flexibility for your schedule</p>
                  <div className="flex flex-col gap-3">
                    {tourData.itinerary.map((day, idx) => (
                      <ItineraryStep key={day.day} day={day} isFirst={idx === 0} />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* ── HOTEL / ACCOMMODATION OPTIONS TABLE ─────────────────────────── */}
            {tourData.accommodationOptions.length > 0 && (
              <div className="bg-white mb-6 rounded-xl px-10.5 py-5   overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full  border-collapse">
                    <thead>
                      <tr className=" border-[#e8d9f5]">
                        <th className="px-6 py-4 text-left font-raleway text-md-semibold lg:text-semi-md-semibold text-secondary-dark-hover">Hotel / Option</th>
                        <th className="px-4 py-4 text-left font-raleway text-md-semibold lg:text-semi-md-semibold text-secondary-dark-hover">Single</th>
                        <th className="px-4 py-4 text-left font-raleway text-md-semibold lg:text-semi-md-semibold text-secondary-dark-hover">Double</th>
                        <th className="px-6 py-4 text-left font-raleway text-md-semibold lg:text-semi-md-semibold text-secondary-dark-hover">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tourData.accommodationOptions.map((opt, i) => {
                        const single = opt.pricing?.find((p) => p.roomType === "single")?.pricePerPerson;
                        const double = opt.pricing?.find((p) => p.roomType === "double")?.pricePerPerson;
                        const isLast = i === tourData.accommodationOptions.length - 1;
                        return (
                          <tr key={i} className={classNames("")}>
                            <td className="px-6 py-5 font-raleway  text-md-semibold lg:text-semi-md-semibold text-tertiary-normal-default">{opt.label}</td>
                            <td className="px-4 py-5 font-raleway text-md-semibold lg:text-semi-md-semibold text-tertiary-normal-default tabular-nums">
                              {single != null ? `$${Number(single).toLocaleString("en-US")}` : "—"}
                            </td>
                            <td className="px-4 py-5 font-raleway text-md-semibold lg:text-semi-md-semibold text-tertiary-normal-default tabular-nums">
                              {double != null ? `$${Number(double).toLocaleString("en-US")}` : "—"}
                            </td>
                            <td className="px-6 py-5 font-raleway text-md-semibold lg:text-semi-md-semibold text-tertiary-normal-default">
                              {opt.notes || "—"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── BUSINESS: What's Included comes AFTER itinerary ─────────────── */}
            {tourData.category === "business" && (
              <div id="section-inclusions" className="bg-white p-5 flex flex-col gap-4 mb-6 rounded-xl border border-secondary-light-hover">
                <h2 className="text-semi-md-semibold text-secondary-dark-hover">What's included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "16px 40px" }}>
                  {tourData.included.map((item, i) => (
                    <div key={i} className="flex items-center" style={{ gap: "12px" }}>
                      {item.type === "check" ? <CheckIcon /> : <CrossIcon />}
                      <span className="text-md-Medium text-[#364153]">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── OPTIONAL ADD-ONS — both variants ────────────────────────────── */}
            {tourData.bookingAddOns.length > 0 && (
              <div className="bg-white mb-6 pl-5 pr-2 pt-7 pb-12 flex flex-col gap-4 rounded-xl border border-secondary-light-hover">
                <h2 className="text-semi-md-bold text-secondary-dark-hover">+ Optional Add-ons</h2>
                <div className="flex mb-6 flex-col gap-4">
                  {tourData.bookingAddOns.map((addon, i) => (
                    <div key={addon.id || i} className="flex items-center pl-1.5 pr-3 md:pr-6 justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-[15px] font-semibold leading-[20px] md:text-semi-md-semibold text-tertiary-normal-default">{addon.label}</p>
                      </div>
                      <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "14px", color: "#7b2cbf", whiteSpace: "nowrap" }}>
                        + {addon.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ⑤ MEET YOUR TOUR GUIDE ─ id=section-tour-guide */}
            {tourData.guide && (
              <div
                id="section-tour-guide"
                className="pb-[50px] border-b border-secondary-light-hover"
              >
                <h2 className="text-semi-md-semibold text-secondary-dark-hover mb-5 ml-5">
                  Meet Your Tour Guide
                </h2>
                <GuideCard guide={tourData.guide} />
              </div>
            )}

            {/* ⑥ WHAT OUR TRAVELERS SAY ─ id=section-reviews */}
            <div
              id="section-reviews"
              style={{ padding: "32px 0", borderBottom: "1.5px solid #ebdff5" }}
            >
                           <h2 className="text-semi-md-semibold text-secondary-dark-hover mb-5.5 ml-5">

                What Our Travelers Say
              </h2>
              <ReviewsSection tourData={tourData} apiReviews={apiReviews} apiStats={apiReviewStats} tourId={apiTour?._id} />
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
              {/* Pickup note — only shown when the tour has one */}
              {tourData.pickupNote && (
                <p className="mt-4 rounded-[10px] bg-secondary-light-hover border border-secondary-light-active px-5 py-2.5 text-med-small-semibold text-secondary-normal-default">
                  {tourData.pickupNote}
                </p>
              )}
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
              <YouMightAlsoLoveSection
                currentSlug={tour}
                currentTags={relatedTags}
                currentCountry={apiTour?.country || "ghana"}
              />
            </div>

            {/* ⑨ YOU MIGHT ALSO LOVE — rendered when related tours are available from the API */}
            {/* No static related tours; this section will be populated via API in a future iteration */}

            
          </div>

          {/* ── RIGHT: Booking Widget — Figma 3156:45940 ─────────────────── */}
          {/* Mobile: full width, below content. Desktop: sticky 457px right column
              sticky top = 64px detail nav + 12px buffer = 76px   */}
          <div
            className="z-10 w-full lg:min-w-[457px] lg:max-w-[457px] flex-shrink-0 lg:sticky lg:self-start"
            style={{
              top: "76px",
              maxHeight: "calc(100vh - 100px)",
              overflowY: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
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
              onBook={handleBook}
              bookingStatus={bookingStatus}
              bookingError={bookingError}
            />
            {/* Logo combo — shown below the widget for Achimota (hotel_selector) tours */}
            {tourData.accommodationOptions?.length > 0 && (
              <div className="mt-8 flex items-center justify-center">
                <img
                  src={logoCombo}
                  alt="Elysium Tours featuring Akoras"
                  className="h-auto w-full max-w-[420px] object-contain"
                />
              </div>
            )}
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
              name: "Elysium Tours",
              avatar: null,
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

      {authGateOpen && (
        <BookingAuthGateModal
          tourName={apiTour?.title}
          onClose={() => setAuthGateOpen(false)}
          onSignIn={() => {
            setAuthGateOpen(false);
            navigate("/", { state: { openAuthModal: true, authMode: "login", from: `/${country}/${tour}` } });
          }}
          onRegister={() => {
            setAuthGateOpen(false);
            navigate("/", { state: { openAuthModal: true, authMode: "register", from: `/${country}/${tour}` } });
          }}
        />
      )}
    </main>
  );
};

export default TourDetailPage;
