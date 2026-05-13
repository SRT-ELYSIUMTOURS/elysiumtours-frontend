import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BlogBreadcrumbBar from "../../components/sections/blog/BlogBreadcrumbBar";
import PartnerCategoryFilterBar from "../../components/sections/partners/PartnerCategoryFilterBar";
import PartnerListingFilterBar from "../../components/sections/partners/PartnerListingFilterBar";
import PartnerListingGrid from "../../components/sections/partners/PartnerListingGrid";
import PartnerStoriesSection from "../../components/sections/partners/PartnerStoriesSection";
import PartnerPromoCtaSection from "../../components/sections/PartnerPromoCtaSection";
import { partnerPromoGallery } from "../../data/partnerPromoCtaPresets.jsx";
import PartnerWithUsModal from "../../components/ui/PartnerWithUsModal";

// Route: /tour-partners/:category/all
// Full listing page with sort/filter/date controls + grid of PartnerListingCard

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
  const navigate = useNavigate();
  const [filters, setFilters] = useState(null);
  const [sort, setSort] = useState("recommended");
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);

  const categoryLabel = CATEGORY_LABELS[category] ?? category;
  const isGuide = category === "guides";

  return (
    <main className="w-full">

      {/* Breadcrumb — full width, BlogBreadcrumbBar handles internal padding */}
      <BlogBreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Tour Partners", href: "/tour-partners" },
          { label: categoryLabel, href: `/tour-partners/${category}` },
          { label: "All" },
        ]}
      />

      {/* Category filter bar */}
      <PartnerCategoryFilterBar
        activeCategory={category}
        onCategoryChange={(cat) => {
          if (cat === "all") navigate("/tour-partners");
          else navigate(`/tour-partners/${cat}/all`);
        }}
      />

      {/* Filters — filter bar handles its own responsive padding internally */}
      <PartnerListingFilterBar
        category={category}
        showLocationFilter={isGuide}
        onSortChange={setSort}
        onFiltersApply={setFilters}
      />

      {/* Heading */}
      <div className="px-4 md:px-8 lg:px-16 pt-6 md:pt-10 pb-2">
        <h1 className="font-raleway font-bold text-xl md:text-2xl lg:text-3xl text-tertiary-normal-default">
          {categoryLabel}
        </h1>
      </div>

      {/* Grid — PartnerListingGrid handles its own responsive padding */}
      <PartnerListingGrid
        category={category}
        filters={filters}
        sort={sort}
      />

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