import React, { useState } from "react";
import { useParams } from "react-router-dom";
import BlogBreadcrumbBar from "../../components/sections/blog/BlogBreadcrumbBar";
import PartnerHero from "../../components/sections/partners/PartnerHero";
import PartnerListingFilterBar from "../../components/sections/partners/PartnerListingFilterBar";
import PartnerListingGrid from "../../components/sections/partners/PartnerListingGrid";
import PartnerStoriesSection from "../../components/sections/partners/PartnerStoriesSection";
import PartnerPromoCtaSection from "../../components/sections/PartnerPromoCtaSection";
import { partnerPromoGallery } from "../../data/partnerPromoCtaPresets.jsx";
import PartnerWithUsModal from "../../components/ui/PartnerWithUsModal";

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

const TourPartnerListingPage = () => {
  const { category } = useParams();
  const [filters, setFilters] = useState(null);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);

  const categoryLabel = CATEGORY_LABELS[category] ?? category;
  const isGuide = category === "guides";

  return (
    <main className="w-full">
      <BlogBreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Tour Partners", href: "/tour-partners" },
          { label: categoryLabel, href: `/tour-partners/${category}` },
        ]}
      />

      <PartnerHero />

      <PartnerListingFilterBar
        category={category}
        showLocationFilter={isGuide}
        onFiltersApply={setFilters}
      />

      <div className="px-4 lg:px-[156px] bg-secondary-light-default py-12 lg:pb-20">
        <PartnerListingGrid
          category={category}
          filters={filters}
          onResetFilters={() => setFilters(null)}
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
          onSubmit={() => {}}
        />
      )}
    </main>
  );
};

export default TourPartnerListingPage;
