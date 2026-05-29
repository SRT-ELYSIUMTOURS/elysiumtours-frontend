import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogBreadcrumbBar from "../../components/sections/blog/BlogBreadcrumbBar";
import PartnerHero from "../../components/sections/partners/PartnerHero";
import PartnerCategoryFilterBar from "../../components/sections/partners/PartnerCategoryFilterBar";
import PartnerCategorySection from "../../components/sections/partners/PartnerCategorySection";
import PartnerFeaturedGuide from "../../components/sections/partners/PartnerFeaturedGuide";
import PartnerStoriesSection from "../../components/sections/partners/PartnerStoriesSection";
import PartnerPromoCtaSection from "../../components/sections/PartnerPromoCtaSection";
import { partnerPromoTourPartners } from "../../data/partnerPromoCtaPresets.jsx";
import PartnerWithUsModal from "../../components/ui/PartnerWithUsModal";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchPartnersThunk, selectPartnerList, selectPartnerStatus } from "../../store/slices/partnersSlice";
import { normalizeForCategorySection, submitPartnerApplicationApi } from "../../api/partners.api";

// Route: /tour-partners/:category
// Breadcrumb reflects this route only. The category filter bar is client-side: it shows one
// category's blocks or "All" without navigating, so the breadcrumb does not change.

const WIRED = ["tour-sites", "restaurants", "transportation", "guides", "accommodation", "photographers", "insurance"];

const CATEGORY_LABELS = {
  "tour-sites": "Tour Sites & Events",
  accommodation: "Accommodation",
  transportation: "Transportation",
  guides: "Tour Guides",
  restaurants: "Restaurants & Dining",
  photographers: "Photos & Videographers",
  insurance: "Insurance & Other Services",
};

const TourPartnerCategoryPage = () => {
  const { category: routeCategory } = useParams();
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState(routeCategory);

  const dispatch = useAppDispatch();

  const attractionsRaw    = useAppSelector(selectPartnerList("tour-sites"));
  const attractionsStatus = useAppSelector(selectPartnerStatus("tour-sites"));
  const restaurantsRaw    = useAppSelector(selectPartnerList("restaurants"));
  const restaurantsStatus = useAppSelector(selectPartnerStatus("restaurants"));
  const transportRaw      = useAppSelector(selectPartnerList("transportation"));
  const transportStatus   = useAppSelector(selectPartnerStatus("transportation"));
  const guidesRaw         = useAppSelector(selectPartnerList("guides"));
  const guidesStatus      = useAppSelector(selectPartnerStatus("guides"));
  const hotelsRaw         = useAppSelector(selectPartnerList("accommodation"));
  const hotelsStatus      = useAppSelector(selectPartnerStatus("accommodation"));
  const photographersRaw  = useAppSelector(selectPartnerList("photographers"));
  const photographersStatus = useAppSelector(selectPartnerStatus("photographers"));
  const insuranceRaw      = useAppSelector(selectPartnerList("insurance"));
  const insuranceStatus   = useAppSelector(selectPartnerStatus("insurance"));

  useEffect(() => {
    WIRED.forEach((cat) => {
      dispatch(fetchPartnersThunk({ category: cat, params: { pageSize: 8 } }));
    });
  }, [dispatch]);

  useEffect(() => {
    setFilterCategory(routeCategory);
  }, [routeCategory]);

  const mkCards = (raw, status, cat) =>
    status === "succeeded"
      ? raw.slice(0, 4).map((p) => normalizeForCategorySection(p, cat))
      : [];

  const featuredGuide = guidesStatus === "succeeded" && guidesRaw.length > 0
    ? [...guidesRaw].sort((a, b) => (b.rating || 0) - (a.rating || 0))[0]
    : null;

  const categoryLabel = CATEGORY_LABELS[routeCategory] ?? routeCategory;
  const showCategory = (key) => filterCategory === "all" || filterCategory === key;

  return (
    <main>
      <BlogBreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Tour Partners", href: "/tour-partners" },
          { label: categoryLabel, href: `/tour-partners/${routeCategory}` },
        ]}
      />
      <PartnerHero />
      <PartnerCategoryFilterBar
        activeCategory={filterCategory}
        onCategoryChange={setFilterCategory}
      />

      {showCategory("tour-sites") && (
        <PartnerCategorySection
          category="tour-sites"
          cardsOverride={mkCards(attractionsRaw, attractionsStatus, "tour-sites")}
          status={attractionsStatus}
        />
      )}
      {showCategory("accommodation") && (
        <PartnerCategorySection
          category="accommodation"
          cardsOverride={mkCards(hotelsRaw, hotelsStatus, "accommodation")}
          status={hotelsStatus}
        />
      )}
      {showCategory("transportation") && (
        <PartnerCategorySection
          category="transportation"
          cardsOverride={mkCards(transportRaw, transportStatus, "transportation")}
          status={transportStatus}
        />
      )}
      {showCategory("guides") && (
        <PartnerCategorySection
          category="guides"
          cardsOverride={mkCards(guidesRaw, guidesStatus, "guides")}
          status={guidesStatus}
        />
      )}
      {showCategory("guides") && (
        <PartnerFeaturedGuide
          {...(featuredGuide ? {
            guideName:        featuredGuide.name,
            guideTitle:       featuredGuide.bio ? `Meet ${featuredGuide.name}: ${featuredGuide.bio.slice(0, 60)}` : `Meet ${featuredGuide.name}`,
            guideDescription: featuredGuide.bio || undefined,
            guideImage:       featuredGuide.avatar || undefined,
          } : {})}
        />
      )}
      {showCategory("restaurants") && (
        <PartnerCategorySection
          category="restaurants"
          cardsOverride={mkCards(restaurantsRaw, restaurantsStatus, "restaurants")}
          status={restaurantsStatus}
        />
      )}
      {showCategory("photographers") && (
        <PartnerCategorySection
          category="photographers"
          cardsOverride={mkCards(photographersRaw, photographersStatus, "photographers")}
          status={photographersStatus}
        />
      )}
      {showCategory("insurance") && (
        <PartnerCategorySection
          category="insurance"
          cardsOverride={mkCards(insuranceRaw, insuranceStatus, "insurance")}
          status={insuranceStatus}
        />
      )}

      <PartnerStoriesSection />
      <PartnerPromoCtaSection
        {...partnerPromoTourPartners}
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

export default TourPartnerCategoryPage;
