import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogBreadcrumbBar from "../../components/sections/blog/BlogBreadcrumbBar";
import PartnerHero from "../../components/sections/partners/PartnerHero";
import PartnerCategoryFilterBar from "../../components/sections/partners/PartnerCategoryFilterBar";
import PartnerCategorySection from "../../components/sections/partners/PartnerCategorySection";
import PartnerFeaturedGuide from "../../components/sections/partners/PartnerFeaturedGuide";
import PartnerStoriesSection from "../../components/sections/partners/PartnerStoriesSection";
import PartnerPromoCtaSection from "../../components/sections/PartnerPromoCtaSection";
import { partnerPromoGallery } from "../../data/partnerPromoCtaPresets.jsx";
import PartnerWithUsModal from "../../components/ui/PartnerWithUsModal";

// Route: /tour-partners/:category
// Breadcrumb reflects this route only. The category filter bar is client-side: it shows one
// category’s blocks or “All” without navigating, so the breadcrumb does not change.

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
  /** Filter pills only — does not change the URL or breadcrumb */
  const [filterCategory, setFilterCategory] = useState(routeCategory);

  useEffect(() => {
    setFilterCategory(routeCategory);
  }, [routeCategory]);

  const categoryLabel = CATEGORY_LABELS[routeCategory] ?? routeCategory;

  const showCategory = (key) =>
    filterCategory === "all" || filterCategory === key;

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
        <PartnerCategorySection category="tour-sites" />
      )}
      {showCategory("accommodation") && (
        <PartnerCategorySection category="accommodation" />
      )}
      {showCategory("transportation") && (
        <PartnerCategorySection category="transportation" />
      )}
      {showCategory("guides") && <PartnerCategorySection category="guides" />}
      {showCategory("guides") && <PartnerFeaturedGuide />}
      {showCategory("restaurants") && (
        <PartnerCategorySection category="restaurants" />
      )}
      {showCategory("photographers") && (
        <PartnerCategorySection category="photographers" />
      )}
      {showCategory("insurance") && (
        <PartnerCategorySection category="insurance" />
      )}
      <PartnerStoriesSection />
      <PartnerPromoCtaSection
        {...partnerPromoGallery}
        onCtaClick={() => setPartnerModalOpen(true)}
      />

      {partnerModalOpen && (
        <PartnerWithUsModal
          onClose={() => setPartnerModalOpen(false)}
          onSubmit={() => {}}
        />
      )}
    </main>
  );
};

export default TourPartnerCategoryPage;
