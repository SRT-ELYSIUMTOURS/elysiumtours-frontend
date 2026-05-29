import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import BlogBreadcrumbBar from "../../components/sections/blog/BlogBreadcrumbBar";
import PartnerHero from "../../components/sections/partners/PartnerHero";
import PartnerListingFilterBar from "../../components/sections/partners/PartnerListingFilterBar";
import PartnerListingGrid from "../../components/sections/partners/PartnerListingGrid";
import PartnerStoriesSection from "../../components/sections/partners/PartnerStoriesSection";
import PartnerPromoCtaSection from "../../components/sections/PartnerPromoCtaSection";
import { partnerPromoGallery } from "../../data/partnerPromoCtaPresets.jsx";
import PartnerWithUsModal from "../../components/ui/PartnerWithUsModal";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchPartnersThunk, selectPartnerList, selectPartnerStatus } from "../../store/slices/partnersSlice";
import { normalizeForListingGrid, PARTNER_API_MAP, submitPartnerApplicationApi } from "../../api/partners.api";

// Route: /tour-partners/:category/all
// Hero + listing toolbar + grid (same highlight/guide cards as category page + meta below)

const CATEGORY_LABELS = {
  "tour-sites": "Tour Sites & Events",
  accommodation: "Accommodation",
  transportation: "Transportation",
  guides: "Tour Guides",
  restaurants: "Restaurants & Dining",
  photographers: "Photos & Videographers",
  insurance: "Insurance & Other Services",
};

const SORT_MAP = {
  "price-asc":  "price_asc",
  "price-desc": "price_desc",
  rating:       "rating_desc",
  "name-asc":   "name_asc",
};

const TourPartnerListingPage = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [filters, setFilters]             = useState(null);
  const [dateRange, setDateRange]         = useState(null);
  const [searchQuery, setSearchQuery]     = useState(() => searchParams.get("q") ?? "");
  const [sortKey, setSortKey]             = useState(null);
  const [guideCountry, setGuideCountry]   = useState(null);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const raw      = useAppSelector(selectPartnerList(category));
  const status   = useAppSelector(selectPartnerStatus(category));
  const isWired  = Boolean(PARTNER_API_MAP[category]);
  const isGuide  = category === "guides";

  useEffect(() => {
    if (!category || !isWired) return;
    const params = { pageSize: 100 };
    if (sortKey) params.sort = sortKey;
    if (isGuide && guideCountry) params.country = guideCountry;
    dispatch(fetchPartnersThunk({ category, params }));
  }, [dispatch, category, isWired, sortKey, guideCountry, isGuide]);

  const handleSortChange = (value) => {
    setSortKey(SORT_MAP[value] ?? null);
  };

  const handleLocationChange = (payload) => {
    // payload = { regions: [...] } from PartnerLocationDropdown
    setGuideCountry(payload?.regions?.[0] ?? null);
  };

  const isLoading = isWired && (status === "idle" || status === "loading");
  const isError   = isWired && status === "failed";

  // Wired + succeeded: pass normalized rows. Wired + not yet: undefined (skeleton shown instead).
  // Non-wired: undefined (grid falls back to built-in mock).
  const partners = isWired && status === "succeeded"
    ? raw.map((p) => normalizeForListingGrid(p, category))
    : undefined;

  const mergedFilters = {
    ...(filters || {}),
    ...(searchQuery ? { search: searchQuery } : {}),
    ...(dateRange   ? { dateRange }           : {}),
  };

  const categoryLabel = CATEGORY_LABELS[category] ?? category;

  return (
    <main className="w-full">
      <BlogBreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Tour Partners", href: "/tour-partners" },
          { label: categoryLabel, href: `/tour-partners/${category}` },
        ]}
      />

      <PartnerHero onSearch={setSearchQuery} />

      <PartnerListingFilterBar
        category={category}
        showLocationFilter={isGuide}
        onFiltersApply={setFilters}
        onSortChange={handleSortChange}
        onLocationChange={handleLocationChange}
        onDatesApply={({ start, end }) => setDateRange({ start, end })}
      />

      <div className="px-4 lg:px-[156px] bg-secondary-light-default py-12 lg:pb-20">
        {isError ? (
          <div className="flex flex-col items-center justify-center gap-4 py-[120px] text-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="9" stroke="#d1d5db" strokeWidth="1.5" />
              <path d="M12 8v4" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="12" cy="15.5" r=".75" fill="#d1d5db" />
            </svg>
            <p className="font-raleway font-semibold text-[18px] text-[#2d2d2d]">
              Could not load partners
            </p>
            <p className="font-raleway text-[14px] text-[#949494] max-w-[300px]">
              Something went wrong fetching this listing. Please try again.
            </p>
            <button
              type="button"
              onClick={() => dispatch(fetchPartnersThunk({ category, params: { pageSize: 100 } }))}
              className="h-[44px] px-6 rounded-[22px] border border-secondary-normal-default font-raleway font-semibold text-[14px] text-secondary-dark-darker cursor-pointer hover:opacity-80 transition-opacity"
            >
              Try Again
            </button>
          </div>
        ) : isLoading ? (
          <div className="px-4 md:px-10 lg:px-[80px] py-10 lg:py-[60px]">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-[24px] gap-y-8 lg:gap-y-12">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-[22px]">
                  <div className="w-full h-[568px] rounded-[40px] bg-[#e5e7eb] animate-pulse" />
                  <div className="flex flex-col gap-2">
                    <div className="h-4 w-3/4 rounded bg-[#e5e7eb] animate-pulse" />
                    <div className="h-3 w-1/2 rounded bg-[#e5e7eb] animate-pulse" />
                    <div className="h-3 w-2/3 rounded bg-[#e5e7eb] animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <PartnerListingGrid
            category={category}
            filters={mergedFilters}
            partners={partners}
            onResetFilters={() => { setFilters(null); setSearchQuery(""); }}
          />
        )}
      </div>

      <PartnerStoriesSection />

      <PartnerPromoCtaSection
        {...partnerPromoGallery}
        onCtaClick={() => setPartnerModalOpen(true)}
      />

      {partnerModalOpen && (
        <PartnerWithUsModal
          onClose={() => setPartnerModalOpen(false)}
          onSubmit={submitPartnerApplicationApi}
        />
      )}
    </main>
  );
};

export default TourPartnerListingPage;
