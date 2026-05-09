import React, { useEffect, useMemo, useState } from "react";
import { classNames } from "../../../utils/classNames";
import PartnerHighlightCard from "../../cards/PartnerHighlightCard";
import GuideSpotlightCard from "../../cards/GuideSpotlightCard";
import { PartnerListingMeta } from "../../cards/PartnerListingCard";
import PartnerListingZeroResults from "./PartnerListingZeroResults";

// Listing uses category-page visuals (PartnerHighlightCard / GuideSpotlightCard) + listing meta below

/** Aligned with `PartnerFilterDropdown` default max when filtering by price. */
const FILTER_PRICE_MAX_DEFAULT = 5000;

export const LISTING_PAGE_SIZE = 12;
const TOTAL_LISTING_RESULTS = 200;

const MOCK_PARTNERS = {
  "tour-sites": [
    { id: 1, image: "https://picsum.photos/seed/ts-1/335/568", partnerName: "Cape Coast Castle Museum", location: "Cape Coast / Central Region", rating: 4.9, title: "Cape Coast Castle: A Journey Through Ghana's Colonial History", availability: "Opened Daily", price: "Ghs.400.00" },
    { id: 2, image: "https://picsum.photos/seed/ts-2/335/568", partnerName: "Kakum National Park", location: "Cape Coast / Central Region", rating: 4.8, title: "Kakum National Park — Canopy Walk & Wildlife Safari", availability: "Opened Daily", price: "Ghs.250.00" },
    { id: 3, image: "https://picsum.photos/seed/ts-3/335/568", partnerName: "Kwame Nkrumah Mausoleum", location: "Accra / Greater Accra", rating: 4.7, title: "Kwame Nkrumah Mausoleum & Memorial Park Tour", availability: "Tue – Sun", price: "Ghs.50.00" },
    { id: 4, image: "https://picsum.photos/seed/ts-4/335/568", partnerName: "W.E.B. Du Bois Center", location: "Accra / Greater Accra", rating: 4.6, title: "W.E.B. Du Bois Memorial Centre for Pan African Culture", availability: "Opened Daily", price: "Ghs.80.00" },
    { id: 5, image: "https://picsum.photos/seed/ts-5/335/568", partnerName: "Elmina Castle", location: "Elmina / Central Region", rating: 4.9, title: "Elmina Castle: The Oldest European Building in Sub-Saharan Africa", availability: "Opened Daily", price: "Ghs.350.00" },
    { id: 6, image: "https://picsum.photos/seed/ts-6/335/568", partnerName: "Aburi Botanical Gardens", location: "Aburi / Eastern Region", rating: 4.5, title: "Aburi Botanical Gardens: Ghana's Lush Green Retreat", availability: "Opened Daily", price: "Ghs.120.00" },
  ],
  accommodation: [
    { id: 1, image: "https://picsum.photos/seed/acc-1/335/568", partnerName: "Labadi Beach Hotel", location: "Accra / Greater Accra", rating: 4.9, title: "Labadi Beach Hotel — Premium Beachfront Stay in Accra", availability: "Year Round", price: "Ghs.850.00" },
    { id: 2, image: "https://picsum.photos/seed/acc-2/335/568", partnerName: "Kempinski Gold Coast City", location: "Accra / Greater Accra", rating: 4.9, title: "Kempinski Gold Coast City — 5-Star Luxury in the Heart of Accra", availability: "Year Round", price: "Ghs.1,200.00" },
    { id: 3, image: "https://picsum.photos/seed/acc-3/335/568", partnerName: "Coconut Grove Hotel", location: "Accra / Greater Accra", rating: 4.6, title: "Coconut Grove Regency Hotel — Comfort and Elegance", availability: "Year Round", price: "Ghs.600.00" },
    { id: 4, image: "https://picsum.photos/seed/acc-4/335/568", partnerName: "Hans Cottage Botel", location: "Cape Coast / Central Region", rating: 4.7, title: "Hans Cottage Botel — Unique Crocodile Pond & Lakeside Lodge", availability: "Year Round", price: "Ghs.450.00" },
    { id: 5, image: "https://picsum.photos/seed/acc-5/335/568", partnerName: "Royal Senchi Hotel", location: "Akosombo / Eastern Region", rating: 4.8, title: "Royal Senchi Hotel & Resort — Riverside Luxury near Volta Lake", availability: "Year Round", price: "Ghs.900.00" },
    { id: 6, image: "https://picsum.photos/seed/acc-6/335/568", partnerName: "Miklin Hotel", location: "Kumasi / Ashanti Region", rating: 4.5, title: "Miklin Hotel — Business & Leisure in the Garden City", availability: "Year Round", price: "Ghs.380.00" },
  ],
  transportation: [
    { id: 1, image: "https://picsum.photos/seed/trans-1/335/568", partnerName: "Elysium Transfer Co.", location: "Accra / Greater Accra", rating: 4.9, title: "Premium Airport Transfers in Accra — Sedan & SUV Options", availability: "Opened Daily", price: "Ghs.200.00" },
    { id: 2, image: "https://picsum.photos/seed/trans-2/335/568", partnerName: "West Africa Wheels", location: "Accra / Greater Accra", rating: 4.7, title: "Private SUV Hire for West Africa Tour Routes", availability: "By Booking", price: "Ghs.350.00" },
    { id: 3, image: "https://picsum.photos/seed/trans-3/335/568", partnerName: "Golden Gate Coaches", location: "Kumasi / Ashanti Region", rating: 4.6, title: "Luxury Coach Service — Accra to Kumasi Round Trips", availability: "Mon – Sat", price: "Ghs.150.00" },
    { id: 4, image: "https://picsum.photos/seed/trans-4/335/568", partnerName: "Cape Coast Cabs", location: "Cape Coast / Central Region", rating: 4.8, title: "Reliable Private Taxi & Transfer — Cape Coast Region", availability: "Opened Daily", price: "Ghs.180.00" },
    { id: 5, image: "https://picsum.photos/seed/trans-5/335/568", partnerName: "Volta Boat Services", location: "Akosombo / Eastern Region", rating: 4.5, title: "Scenic Volta Lake Ferry & Boat Tours", availability: "Opened Daily", price: "Ghs.120.00" },
    { id: 6, image: "https://picsum.photos/seed/trans-6/335/568", partnerName: "GhanaTuk Riders", location: "Accra / Greater Accra", rating: 4.4, title: "Tuk-Tuk City Tours — Fun & Unique Way to Explore Accra", availability: "Opened Daily", price: "Ghs.80.00" },
  ],
  guides: [
    { id: 1, image: "https://picsum.photos/seed/guide-1/335/568", partnerName: "Kweku Asante", location: "Cape Coast / Central Region", rating: 5.0, title: "Expert Heritage & History Guide — Cape Coast Castle Specialist", specialties: "• City tours • History • Heritage walks", language: "English, Twi", variant: "guide" },
    { id: 2, image: "https://picsum.photos/seed/guide-2/335/568", partnerName: "Abena Mensah", location: "Accra / Greater Accra", rating: 4.9, title: "Cultural & Food Tour Guide — Accra Street Food Expert", specialties: "• Food experiences • Cultural tours • Night life", language: "English, Ga, Twi", variant: "guide" },
    { id: 3, image: "https://picsum.photos/seed/guide-3/335/568", partnerName: "Kofi Boateng", location: "Kumasi / Ashanti Region", rating: 4.8, title: "Ashanti Heritage Guide — Royal Kumasi Cultural Tours", specialties: "• History • Ashanti culture • Arts & crafts", language: "English, Twi, French", variant: "guide" },
    { id: 4, image: "https://picsum.photos/seed/guide-4/335/568", partnerName: "Ama Owusu", location: "Accra / Greater Accra", rating: 4.9, title: "Adventure & Wildlife Guide — Kakum Canopy Walk Specialist", specialties: "• Wildlife • Adventure • Nature walks", language: "English, Twi", variant: "guide" },
    { id: 5, image: "https://picsum.photos/seed/guide-5/335/568", partnerName: "Yaw Darko", location: "Ho / Volta Region", rating: 4.7, title: "Volta Region Specialist — Wli Falls & Amedzofe Expert", specialties: "• Nature • Waterfalls • Eco tourism", language: "English, Ewe, Twi", variant: "guide" },
    { id: 6, image: "https://picsum.photos/seed/guide-6/335/568", partnerName: "Efua Amponsah", location: "Cape Coast / Central Region", rating: 4.8, title: "Roots & Heritage Guide — Diaspora Connection Tours", specialties: "• History • Diaspora heritage • Photography tours", language: "English, Twi", variant: "guide" },
  ],
  restaurants: [
    { id: 1, image: "https://picsum.photos/seed/rest-1/335/568", partnerName: "Buka Restaurant", location: "Accra / Greater Accra", rating: 4.8, title: "Buka Restaurant — Authentic West African Cuisine in Accra", availability: "Opened Daily", price: "Ghs.120.00" },
    { id: 2, image: "https://picsum.photos/seed/rest-2/335/568", partnerName: "The Bistro at Labadi", location: "Accra / Greater Accra", rating: 4.7, title: "The Bistro at Labadi — Fine Dining with Ocean Views", availability: "Opened Daily", price: "Ghs.250.00" },
    { id: 3, image: "https://picsum.photos/seed/rest-3/335/568", partnerName: "Lanterna Restaurant", location: "Accra / Greater Accra", rating: 4.9, title: "Lanterna — Italian & International Fine Dining", availability: "Opened Daily", price: "Ghs.300.00" },
    { id: 4, image: "https://picsum.photos/seed/rest-4/335/568", partnerName: "Santoku Restaurant", location: "Accra / Greater Accra", rating: 4.6, title: "Santoku — Asian Fusion & Japanese Cuisine", availability: "Tue – Sun", price: "Ghs.200.00" },
    { id: 5, image: "https://picsum.photos/seed/rest-5/335/568", partnerName: "Cape Coast Seafood", location: "Cape Coast / Central Region", rating: 4.8, title: "Cape Coast Seafood Grill — Fresh Catch Daily by the Sea", availability: "Opened Daily", price: "Ghs.180.00" },
    { id: 6, image: "https://picsum.photos/seed/rest-6/335/568", partnerName: "Kumasi Cultural Kitchen", location: "Kumasi / Ashanti Region", rating: 4.5, title: "Kumasi Cultural Kitchen — Traditional Ashanti Meals & Stories", availability: "Opened Daily", price: "Ghs.100.00" },
  ],
  photographers: [
    { id: 1, image: "https://picsum.photos/seed/photo-1/335/568", partnerName: "Studio Accra", location: "Accra / Greater Accra", rating: 4.9, title: "Studio Accra — Professional Tour & Travel Photography", availability: "By Booking", price: "Ghs.500.00" },
    { id: 2, image: "https://picsum.photos/seed/photo-2/335/568", partnerName: "Drone Ghana", location: "Accra / Greater Accra", rating: 4.8, title: "Drone Ghana — Aerial Videography & Photography Services", availability: "By Booking", price: "Ghs.800.00" },
    { id: 3, image: "https://picsum.photos/seed/photo-3/335/568", partnerName: "Moments Media", location: "Cape Coast / Central Region", rating: 4.7, title: "Moments Media — Heritage & Cultural Documentary Filming", availability: "By Booking", price: "Ghs.650.00" },
    { id: 4, image: "https://picsum.photos/seed/photo-4/335/568", partnerName: "GoldCoast Visuals", location: "Kumasi / Ashanti Region", rating: 4.6, title: "GoldCoast Visuals — Event & Wedding Photography", availability: "By Booking", price: "Ghs.1,000.00" },
  ],
  insurance: [
    { id: 1, image: "https://picsum.photos/seed/ins-1/335/568", partnerName: "TravelSafe Ghana", location: "Accra / Greater Accra", rating: 4.8, title: "TravelSafe Ghana — Comprehensive Travel Insurance Plans", availability: "Opened Daily", price: "Ghs.150.00" },
    { id: 2, image: "https://picsum.photos/seed/ins-2/335/568", partnerName: "VisaLink Ghana", location: "Accra / Greater Accra", rating: 4.7, title: "VisaLink — Fast & Reliable Visa Assistance for All Destinations", availability: "Mon – Fri", price: "Ghs.200.00" },
    { id: 3, image: "https://picsum.photos/seed/ins-3/335/568", partnerName: "FX Exchange Hub", location: "Accra / Greater Accra", rating: 4.5, title: "FX Exchange Hub — Best Rates for Foreign Currency Exchange", availability: "Opened Daily", price: "Ghs.50.00" },
  ],
};

function parseGhPrice(priceStr) {
  if (!priceStr || typeof priceStr !== "string") return null;
  const normalized = priceStr.replace(/,/g, "").replace(/\s/g, "");
  const m = normalized.match(/(?:Ghs?\.?)\s*([\d.]+)/i) || normalized.match(/([\d.]+)/);
  return m ? parseFloat(m[1]) : null;
}

/**
 * Client-side filter pass for listing mock/API rows — mirrors dropdown payload shape.
 * Rows without `price` (e.g. guides) skip the price band.
 */
export function partnerMatchesFilters(partner, filters) {
  if (!filters) return true;

  if (filters.minRating != null && typeof partner.rating === "number") {
    if (partner.rating < filters.minRating) return false;
  }

  const pr = filters.priceRange;
  if (pr && partner.price) {
    const p = parseGhPrice(partner.price);
    if (p != null) {
      const maxCap = typeof pr.max === "number" ? pr.max : FILTER_PRICE_MAX_DEFAULT;
      const minBound = typeof pr.min === "number" ? pr.min : 0;
      if (p < minBound || p > maxCap) return false;
    }
  }

  return true;
}

function buildListingDataset(category) {
  const base = MOCK_PARTNERS[category] ?? MOCK_PARTNERS.transportation;
  return Array.from({ length: TOTAL_LISTING_RESULTS }, (_, i) => {
    const b = base[i % base.length];
    const id = i + 1;
    const seed = `${category}-list-${id}`;
    let image = b.image;
    if (typeof image === "string" && image.includes("picsum.photos")) {
      image = image.replace(/seed\/[^/]+/, `seed/${seed}`);
    }
    return {
      ...b,
      id,
      image,
      partnerName:
        id <= base.length ? b.partnerName : `${b.partnerName} (${Math.floor((id - 1) / base.length) + 1})`,
    };
  });
}

const ChevronLeftNav = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden className="text-secondary-normal-default">
    <path d="M23 28L13 19L23 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRightNav = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden className="text-secondary-normal-default">
    <path d="M15 10L25 19L15 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-[120px] gap-[16px] col-span-full">
    <div className="w-[64px] h-[64px] rounded-full bg-secondary-light-default flex items-center justify-center">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="8" stroke="#7b2cbf" strokeWidth="1.5" />
        <path d="M21 21L16.65 16.65" stroke="#7b2cbf" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
    <p className="font-raleway font-semibold text-[20px] leading-[28px] text-tertiary-normal-default">
      No partners found
    </p>
    <p className="font-raleway font-medium text-[16px] leading-[24px] text-primary-dark-active text-center max-w-[400px]">
      Try adjusting your filters or search query to find more partners.
    </p>
  </div>
);

const PartnerListingGrid = React.forwardRef(({
  category = "transportation",
  partners,
  filters,
  onResetFilters,
  className = "",
  ...props
}, ref) => {
  const allItems = useMemo(
    () => partners ?? buildListingDataset(category),
    [partners, category]
  );

  const filteredItems = useMemo(
    () => allItems.filter((p) => partnerMatchesFilters(p, filters)),
    [allItems, filters]
  );

  /** Current pagination page (badge); changing page shows that page’s window only. */
  const [page, setPage] = useState(1);
  /** Extra 12-item chunks appended via “Load More” within the current page’s range. */
  const [extraChunks, setExtraChunks] = useState(0);

  useEffect(() => {
    setPage(1);
    setExtraChunks(0);
  }, [category, partners, filters]);
  const isGuide = category === "guides";

  const total = filteredItems.length;
  const totalPages = Math.max(1, Math.ceil(total / LISTING_PAGE_SIZE));

  const rangeStart = (page - 1) * LISTING_PAGE_SIZE;
  const rangeEnd = Math.min(
    rangeStart + LISTING_PAGE_SIZE + extraChunks * LISTING_PAGE_SIZE,
    total
  );
  const visibleItems = filteredItems.slice(rangeStart, rangeEnd);
  const hasMore = rangeEnd < total;

  const goToPage = (nextPage) => {
    const p = Math.max(1, Math.min(nextPage, totalPages));
    setPage(p);
    setExtraChunks(0);
  };

  const loadMore = () => {
    setExtraChunks((c) => c + 1);
  };

  const pageNumbers = useMemo(() => {
    const pages = [];
    const windowSize = 4;
    let start = Math.max(1, page - 1);
    if (start + windowSize - 1 > totalPages) start = Math.max(1, totalPages - windowSize + 1);
    for (let i = 0; i < windowSize && start + i <= totalPages; i++) pages.push(start + i);
    return pages;
  }, [page, totalPages]);

  const lastShownInWindow = pageNumbers.length ? pageNumbers[pageNumbers.length - 1] : 1;

  const zeroFilterResults = filteredItems.length === 0 && allItems.length > 0;
  const emptyDataset = filteredItems.length === 0 && allItems.length === 0;

  return (
    <div ref={ref} className={classNames("w-full", className)} {...props}>
      {zeroFilterResults ? (
        <div className="grid grid-cols-1 lg:grid-cols-4">
          <div className="col-span-full flex justify-center py-[120px]">
            <PartnerListingZeroResults onResetFilters={onResetFilters} />
          </div>
        </div>
      ) : emptyDataset ? (
        <div className="grid grid-cols-1 lg:grid-cols-4">
          <EmptyState />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-[24px] gap-y-[48px]">
            {visibleItems.map((partner, index) => {
              
              const cardLayout = classNames(
                "w-full min-w-0 h-[568px]",
               );

              return (
                <div key={partner.id} className="flex flex-col gap-[22px]">
                  {isGuide ? (
                    <GuideSpotlightCard
                      image={partner.image}
                      title={partner.partnerName}
                      alt={partner.partnerName}
                      className={cardLayout}
                    />
                  ) : (
                    <PartnerHighlightCard
                      image={partner.image}
                      category={partner.partnerName}
                      className={cardLayout}
                    />
                  )}
                  <PartnerListingMeta
                    location={partner.location}
                    rating={partner.rating}
                    title={partner.title}
                    availability={partner.availability}
                    price={partner.price}
                    specialties={partner.specialties}
                    language={partner.language}
                    variant={isGuide || partner.variant === "guide" ? "guide" : "default"}
                  />
                </div>
              );
            })}
          </div>

          {(hasMore || totalPages > 1) && (
            <div className="mx-auto mt-[48px] flex w-full max-w-[491px] flex-col items-center gap-[32px]">
              {hasMore && (
                <button
                  type="button"
                  onClick={loadMore}
                  className={classNames(
                    "flex h-[56px] min-w-[169px] items-center justify-center gap-[16px] rounded-[40px] px-[10px] py-[10px]",
                    "border border-solid border-secondary-normal-default bg-primary-light-default",
                    "shadow-[0_4px_10px_0_rgba(0,0,0,0.05)]",
                    "font-raleway text-[16px] font-semibold leading-[22px] text-secondary-normal-default",
                    "transition-opacity hover:opacity-90 cursor-pointer"
                  )}
                >
                  Load More
                </button>
              )}

              <div className="flex w-full flex-col items-center gap-[24px]">
                <div className="flex w-full flex-wrap items-center justify-center gap-[17px]">
                  <button
                    type="button"
                    aria-label="Previous page"
                    disabled={page <= 1}
                    onClick={() => goToPage(page - 1)}
                    className="disabled:opacity-40 shrink-0 cursor-pointer bg-transparent border-0 p-0"
                  >
                    <ChevronLeftNav />
                  </button>

                  {pageNumbers.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => goToPage(p)}
                      className={classNames(
                        "flex size-[48px] shrink-0 flex-col items-center justify-center rounded-[50px] p-[10px]",
                        "font-raleway text-[20px] font-medium leading-[28px]",
                        p === page
                          ? "bg-[#622399] text-[#eaeaea]"
                          : "bg-transparent text-[#2d2d2d]"
                      )}
                    >
                      {p}
                    </button>
                  ))}

                  {totalPages > lastShownInWindow && (
                    <>
                      <div className="h-px w-[56px] shrink-0 bg-primary-normal-default opacity-40" aria-hidden />
                      <button
                        type="button"
                        onClick={() => goToPage(totalPages)}
                        className={classNames(
                          "flex size-[48px] shrink-0 flex-col items-center justify-center rounded-[50px] p-[10px]",
                          "font-raleway text-[20px] font-medium leading-[28px]",
                          page === totalPages
                            ? "bg-[#622399] text-[#eaeaea]"
                            : "bg-transparent text-[#2d2d2d]"
                        )}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}

                  <button
                    type="button"
                    aria-label="Next page"
                    disabled={page >= totalPages}
                    onClick={() => goToPage(page + 1)}
                    className="disabled:opacity-40 shrink-0 cursor-pointer bg-transparent border-0 p-0"
                  >
                    <ChevronRightNav />
                  </button>
                </div>

                <p className="text-center font-raleway text-[16px] font-medium leading-[26px] text-[#2d2d2d]">
                  Showing results{" "}
                  <span className="font-semibold text-[#622399]">
                    {visibleItems.length === 0
                      ? "0"
                      : `${rangeStart + 1}-${rangeStart + visibleItems.length}`}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-[#622399]">{total}</span>
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
});

PartnerListingGrid.displayName = "PartnerListingGrid";
export default PartnerListingGrid;
