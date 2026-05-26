import client from "./client";

// ── List endpoints (all public, routes: /api/v2/tourist/partners/* and /api/v2/tourist/guides) ───
export const listAttractionsApi = (params = {}) =>
  client.get("/tourist/partners/attractions", { params }).then((r) => r.data);

export const listDiningApi = (params = {}) =>
  client.get("/tourist/partners/dining", { params }).then((r) => r.data);

export const listTransportProvidersApi = (params = {}) =>
  client.get("/tourist/partners/transport", { params }).then((r) => r.data);

export const listGuidesApi = (params = {}) =>
  client.get("/tourist/guides", { params }).then((r) => r.data);

export const listHotelsApi = (params = {}) =>
  client.get("/tourist/partners/hotels", { params }).then((r) => r.data);

export const listPhotographersApi = (params = {}) =>
  client.get("/tourist/partners/photographers", { params }).then((r) => r.data);

export const listServicePartnersApi = (params = {}) =>
  client.get("/tourist/partners/services", { params }).then((r) => r.data);

export const submitPartnerApplicationApi = (data) =>
  client.post("/partner-applications", data).then((r) => r.data);

// ── Get single partner by ID ───────────────────────────────────────────────────
const PARTNER_GET_PATH = {
  "tour-sites":   "/tourist/partners/attractions",
  restaurants:    "/tourist/partners/dining",
  transportation: "/tourist/partners/transport",
  guides:         "/tourist/guides",
  accommodation:  "/tourist/partners/hotels",
  photographers:  "/tourist/partners/photographers",
  insurance:      "/tourist/partners/services",
};

export const getPartnerByIdApi = (category, id) => {
  const path = PARTNER_GET_PATH[category];
  if (!path) return Promise.reject(new Error(`Unknown category: ${category}`));
  return client.get(`${path}/${id}`).then((r) => r.data);
};

// ── Category → API function map ───────────────────────────────────────────────
// Photographers and insurance have no public list endpoint yet.
// Returning undefined causes the slice to skip the fetch and the components
// fall back to their built-in mock data — nothing breaks.
export const PARTNER_API_MAP = {
  "tour-sites":   listAttractionsApi,
  restaurants:    listDiningApi,
  transportation: listTransportProvidersApi,
  guides:         listGuidesApi,
  accommodation:  listHotelsApi,
  photographers:  listPhotographersApi,
  insurance:      listServicePartnersApi,
};

// ── Normalizers ───────────────────────────────────────────────────────────────
// Shape expected by PartnerCategorySection preview cards: { id, image, name }
export function normalizeForCategorySection(item, category) {
  if (category === "transportation") {
    return {
      id:    item._id,
      image: item.coverImage || null,
      name:  item.companyName,
    };
  }
  if (category === "guides") {
    return {
      id:    item._id,
      image: item.avatar || null,
      name:  item.name,
    };
  }
  if (category === "photographers") {
    return {
      id:    item._id,
      image: item.avatar || item.coverImage || null,
      name:  item.name,
    };
  }
  if (category === "insurance") {
    return {
      id:    item._id,
      image: item.coverImage || (item.images && item.images[0]) || null,
      name:  item.name,
    };
  }
  // tour-sites (attractions), restaurants (dining), accommodation (hotels)
  return {
    id:    item._id,
    image: item.coverImage || (item.images && item.images[0]) || null,
    name:  item.name,
  };
}

// Shape expected by PartnerListingGrid:
// { id, image, partnerName, location, rating, title, availability, price, specialties, language, variant }
export function normalizeForListingGrid(item, category) {
  if (category === "guides") {
    return {
      id:          item._id,
      image:       item.avatar || null,
      partnerName: item.name,
      location:    "",
      rating:      item.rating || 0,
      title:       item.bio || item.name,
      availability:"Available",
      price:       "",
      specialties: (item.specialities || []).map((s) => `• ${s}`).join("  "),
      language:    (item.languages || []).join(", "),
      variant:     "guide",
    };
  }
  if (category === "transportation") {
    return {
      id:          item._id,
      image:       item.coverImage || null,
      partnerName: item.companyName,
      location:    (item.serviceAreas || []).join(", "),
      rating:      item.rating || 0,
      title:       item.description || item.companyName,
      availability:"Available",
      price:       item.baseRatePerKm ? `Ghs.${item.baseRatePerKm}/km` : "Contact us",
      variant:     undefined,
    };
  }
  if (category === "restaurants") {
    return {
      id:          item._id,
      image:       item.coverImage || (item.images && item.images[0]) || null,
      partnerName: item.name,
      location:    "",
      rating:      item.rating || 0,
      title:       item.cuisineType ? `${item.cuisineType} Cuisine` : "Restaurant",
      availability:item.openingHours || "See details",
      price:       item.priceRange || "$$",
      variant:     undefined,
    };
  }
  if (category === "accommodation") {
    return {
      id:          item._id,
      image:       item.coverImage || (item.images && item.images[0]) || null,
      partnerName: item.name,
      location:    item.contactInfo?.address || "",
      rating:      item.rating || 0,
      title:       item.shortDescription || item.name,
      availability:item.availabilityStatus || "Available",
      price:       item.rateData?.standardRate
        ? `Ghs.${Number(item.rateData.standardRate).toFixed(2)}`
        : item.priceRange || "Contact us",
      variant:     undefined,
    };
  }
  if (category === "photographers") {
    return {
      id:          item._id,
      image:       item.avatar || item.coverImage || null,
      partnerName: item.name,
      location:    "",
      rating:      item.rating || 0,
      title:       item.bio || item.name,
      availability:"By Booking",
      price:       item.baseRatePerDay ? `Ghs.${Number(item.baseRatePerDay).toFixed(2)}/day` : "Contact us",
      specialties: (item.specialties || []).map((s) => `• ${s}`).join("  "),
      language:    (item.languages || []).join(", "),
      variant:     undefined,
    };
  }
  if (category === "insurance") {
    return {
      id:          item._id,
      image:       item.coverImage || (item.images && item.images[0]) || null,
      partnerName: item.name,
      location:    "",
      rating:      item.rating || 0,
      title:       item.description ? item.description.slice(0, 80) : item.name,
      availability:"Mon – Fri",
      price:       item.priceRange || "Contact us",
      variant:     undefined,
    };
  }
  // tour-sites (attractions)
  return {
    id:          item._id,
    image:       item.coverImage || (item.images && item.images[0]) || null,
    partnerName: item.name,
    location:    "",
    rating:      item.rating || 0,
    title:       item.description ? item.description.slice(0, 80) : item.name,
    availability:item.operatingHours?.weekdays
      || (item.operatingHours?.open
        ? `${item.operatingHours.open} – ${item.operatingHours.close || ""}`.trim()
        : "See details"),
    price:       item.entryFee != null ? `Ghs.${Number(item.entryFee).toFixed(2)}` : "Free",
    variant:     undefined,
  };
}

// ── Detail normalizer ─────────────────────────────────────────────────────────
// Shape: { name, image, images[], rating, reviewCount, price, about,
//          features[], operatingHours[{day,time}], tags[], contact{email,phone,website,address} }
export function normalizeForDetail(item, category) {
  if (!item) return null;
  const ci = item.contactInfo || {};
  const baseContact = {
    email:   ci.email   || item.email   || null,
    phone:   ci.phone   || item.phone   || null,
    website: ci.website || item.website || null,
    address: ci.address || null,
  };

  if (category === "transportation") {
    const vTypes = item.vehicleTypes || [];
    const vImgs  = item.images || [];
    return {
      name:         item.companyName,
      image:        item.coverImage || null,
      images:       vImgs,
      rating:       item.rating || 0,
      reviewCount:  item.reviewCount || 0,
      price:        item.baseRatePerKm ? `GH₵ ${item.baseRatePerKm}/km` : "Contact us",
      about:        item.description || "",
      features:     [...vTypes.slice(0, 2), "Airport Pickup & Drop-off", "Hotel Transfers", "GPS Navigation"].slice(0, 5),
      operatingHours: [{ day: "All Days", time: "24/7 Service" }],
      tags:         [...vTypes, ...(item.serviceAreas || [])].filter(Boolean).slice(0, 6),
      contact:      baseContact,
      packages:     (item.packages && item.packages.length > 0) ? item.packages : null,
      gallery:      (vTypes.length > 0 ? vTypes : vImgs.map((_, i) => `Vehicle ${i + 1}`)).map((type, i) => ({
        id:    `${item._id}-v${i}`,
        image: vImgs[i] || item.coverImage || null,
        name:  typeof type === "string" ? type : item.companyName,
      })),
    };
  }

  if (category === "tour-sites") {
    const oh = item.operatingHours || {};
    const operatingHours = oh.weekdays
      ? [{ day: "Daily", time: oh.weekdays }]
      : oh.open
      ? [{ day: "Daily", time: `${oh.open} – ${oh.close || ""}`.trim() }]
      : [{ day: "Daily", time: "See details" }];
    const tsImgs = item.images || [];
    return {
      name:         item.name,
      image:        item.coverImage || tsImgs[0] || null,
      images:       tsImgs,
      rating:       item.rating || 0,
      reviewCount:  item.reviewCount || 0,
      price:        item.entryFee != null ? `GH₵ ${Number(item.entryFee).toFixed(2)}` : "Free",
      about:        item.description || "",
      features:     [...(item.suitableFor || []), "Guided Tours", "Photography Allowed"].filter(Boolean).slice(0, 5),
      operatingHours,
      tags:         [item.category, ...(item.suitableFor || [])].filter(Boolean).slice(0, 6),
      contact:      baseContact,
      gallery:      tsImgs.map((img, i) => ({ id: `${item._id}-g${i}`, image: img, name: item.name })),
    };
  }

  if (category === "restaurants") {
    const dImgs = item.images || [];
    return {
      name:         item.name,
      image:        item.coverImage || dImgs[0] || null,
      images:       dImgs,
      rating:       item.rating || 0,
      reviewCount:  item.reviewCount || 0,
      price:        item.priceRange || "See menu",
      about:        item.description || (item.cuisineType ? `${item.cuisineType} cuisine dining experience.` : ""),
      features:     [item.cuisineType, "Dine-in", "Takeaway", "Reservation Available", "Private Events"].filter(Boolean).slice(0, 5),
      operatingHours: item.openingHours ? [{ day: "Daily", time: item.openingHours }] : [{ day: "Daily", time: "See details" }],
      tags:         [item.cuisineType, item.priceRange, "Dine-in"].filter(Boolean),
      contact:      baseContact,
      gallery:      dImgs.map((img, i) => ({ id: `${item._id}-g${i}`, image: img, name: item.name })),
    };
  }

  if (category === "guides") {
    const gImgs = item.galleryImages || [];
    return {
      name:         item.name,
      image:        item.avatar || null,
      images:       gImgs,
      rating:       item.rating || 0,
      reviewCount:  item.reviewCount || 0,
      price:        "",
      about:        item.bio || "",
      features:     (item.specialities || []).slice(0, 5),
      operatingHours: [{ day: "Mon – Sat", time: "By Appointment" }],
      tags:         [...(item.languages || []), ...(item.specialities || [])].filter(Boolean).slice(0, 6),
      contact:      { email: item.email || null, phone: item.phone || null, website: null, address: item.country || null },
      gallery:      gImgs.map((img, i) => ({ id: `${item._id}-g${i}`, image: img, name: item.name })),
    };
  }

  if (category === "accommodation") {
    const aImgs = item.images || [];
    return {
      name:         item.name,
      image:        item.coverImage || aImgs[0] || null,
      images:       aImgs,
      rating:       item.rating || 0,
      reviewCount:  item.reviewCount || 0,
      price:        item.rateData?.standardRate ? `GH₵ ${Number(item.rateData.standardRate).toFixed(0)}/night` : item.priceRange || "Contact us",
      about:        item.shortDescription || item.description || "",
      features:     (item.amenities || []).slice(0, 5),
      operatingHours: [{ day: "Check-in", time: "From 2:00 PM" }, { day: "Check-out", time: "By 11:00 AM" }],
      tags:         [item.tier, ...(item.amenities || []).slice(0, 4)].filter(Boolean),
      contact:      baseContact,
      packages:     (item.packages && item.packages.length > 0) ? item.packages : null,
      gallery:      aImgs.map((img, i) => ({ id: `${item._id}-g${i}`, image: img, name: item.name })),
    };
  }

  if (category === "photographers") {
    const pImgs = item.portfolio || [];
    return {
      name:         item.name,
      image:        item.avatar || item.coverImage || null,
      images:       pImgs,
      rating:       item.rating || 0,
      reviewCount:  item.reviewCount || 0,
      price:        item.baseRatePerDay ? `GH₵ ${Number(item.baseRatePerDay).toFixed(2)}/day` : "Contact us",
      about:        item.bio || "",
      features:     (item.specialties || []).slice(0, 5),
      operatingHours: [{ day: "Mon – Sat", time: "By Booking" }],
      tags:         [...(item.specialties || []), ...(item.languages || [])].filter(Boolean).slice(0, 6),
      contact:      baseContact,
      gallery:      pImgs.map((img, i) => ({ id: `${item._id}-g${i}`, image: img, name: `Photo ${i + 1}` })),
    };
  }

  // insurance / service partners
  const sImgs = item.images || [];
  return {
    name:         item.name,
    image:        item.coverImage || sImgs[0] || null,
    images:       sImgs,
    rating:       item.rating || 0,
    reviewCount:  item.reviewCount || 0,
    price:        item.priceRange || "Contact us",
    about:        item.description || "",
    features:     [item.serviceType, "Online Registration", "24/7 Support", "Quick Claims", "Travel Coverage"].filter(Boolean).slice(0, 5),
    operatingHours: [{ day: "Mon – Fri", time: "8:00 AM – 6:00 PM" }],
    tags:         [item.serviceType, "Travel Coverage"].filter(Boolean),
    contact:      baseContact,
    gallery:      sImgs.map((img, i) => ({ id: `${item._id}-g${i}`, image: img, name: item.name })),
  };
}
