import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BlogBreadcrumbBar from "../../components/sections/blog/BlogBreadcrumbBar";
import PartnerCategoryFilterBar from "../../components/sections/partners/PartnerCategoryFilterBar";
import PartnerListingFilterBar from "../../components/sections/partners/PartnerListingFilterBar";
import PartnerListingGrid from "../../components/sections/partners/PartnerListingGrid";
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
    <main>
      <BlogBreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Tour Partners", href: "/tour-partners" },
          { label: categoryLabel, href: `/tour-partners/${category}` },
          { label: "All" },
        ]}
      />

      {/* Category filter bar at top — switching categories navigates */}
      <PartnerCategoryFilterBar
        activeCategory={category}
        onCategoryChange={(cat) => {
          if (cat === "all") navigate("/tour-partners");
          else navigate(`/tour-partners/${cat}/all`);
        }}
      />

      {/* Sort / Date / Filter controls */}
      <PartnerListingFilterBar
        category={category}
        showLocationFilter={isGuide}
        onSortChange={setSort}
        onFiltersApply={setFilters}
      />

      {/* Page heading */}
      <div className="px-[80px] pt-[48px] pb-[8px]">
        <h1 className="font-raleway font-bold text-[31px] leading-[42px] text-tertiary-normal-default">
          {categoryLabel}
        </h1>
      </div>

      {/* Partner cards grid */}
      <PartnerListingGrid
        category={category}
        filters={filters}
        sort={sort}
      />

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
