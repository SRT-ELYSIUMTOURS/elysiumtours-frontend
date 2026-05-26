import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { classNames } from "../../../utils/classNames";
import HighlightCard from "../../cards/HighlightCard";
import GuideSpotlightCard from "../../cards/GuideSpotlightCard";
import { PartnerListingMeta } from "../../cards/PartnerListingCard";
import PartnerListingZeroResults from "./PartnerListingZeroResults";

// Listing uses category-page visuals (HighlightCard / GuideSpotlightCard) + listing meta below

/** Aligned with `PartnerFilterDropdown` default max when filtering by price. */
const FILTER_PRICE_MAX_DEFAULT = 5000;

export const LISTING_PAGE_SIZE = 12;
const TOTAL_LISTING_RESULTS = 200;

// All 7 partner categories are now wired to the real API.
// This object is kept as a fallback reference but no category uses it for production data.
const MOCK_PARTNERS = {};

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

  if (filters.search) {
    const q = filters.search.toLowerCase();
    const haystack = [partner.partnerName, partner.title, partner.location]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    if (!haystack.includes(q)) return false;
  }

  return true;
}

function buildListingDataset(category) {
  const base = MOCK_PARTNERS[category] ?? MOCK_PARTNERS.accommodation;
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
  <div className="flex flex-col items-center justify-center py-[120px] gap-[16px] col-span-3">
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
    <div ref={ref} className={classNames("w-full px-4 md:px-10 lg:px-[80px] py-10 lg:py-[60px] ", className)} {...props}>
      {zeroFilterResults ? (
        <div className="grid grid-cols-1 lg:grid-cols-4">
          <div className="col-span-full flex justify-center py-[120px]">
            <PartnerListingZeroResults onResetFilters={onResetFilters} />
          </div>
        </div>
      ) : emptyDataset ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
          <EmptyState />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-[24px] gap-y-8 lg:gap-y-12">
            {visibleItems.map((partner) => {
              const cardLayout = "w-full min-w-0 h-[568px]";

              return (
                <Link
                  key={partner.id}
                  to={`/tour-partners/${category}/${partner.id}`}
                  className="flex flex-col gap-[22px] group"
                >
                  {isGuide ? (
                    <GuideSpotlightCard
                      image={partner.image}
                      title={partner.partnerName}
                      alt={partner.partnerName}
                      className={cardLayout}
                    />
                  ) : (
                    <HighlightCard
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
                </Link>
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
