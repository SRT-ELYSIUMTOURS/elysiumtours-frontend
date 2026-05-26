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

  // Wired: always pass an array (empty while loading, real rows when succeeded).
  // Non-wired: pass undefined so the grid falls back to its built-in mock data.
  const partners = isWired
    ? (status === "succeeded" ? raw.map((p) => normalizeForListingGrid(p, category)) : [])
    : undefined;

  const mergedFilters = searchQuery
    ? { ...(filters || {}), search: searchQuery }
    : filters;

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
      />

      <div className="px-4 lg:px-[156px] bg-secondary-light-default py-12 lg:pb-20">
        <PartnerListingGrid
          category={category}
          filters={mergedFilters}
          partners={partners}
          onResetFilters={() => { setFilters(null); setSearchQuery(""); }}
        />
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
