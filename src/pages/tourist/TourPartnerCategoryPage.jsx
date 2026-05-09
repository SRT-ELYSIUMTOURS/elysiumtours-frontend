import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BlogBreadcrumbBar from "../../components/sections/blog/BlogBreadcrumbBar";
import PartnerHero from "../../components/sections/partners/PartnerHero";
import PartnerCategoryFilterBar from "../../components/sections/partners/PartnerCategoryFilterBar";
import PartnerCategorySection from "../../components/sections/partners/PartnerCategorySection";
import PartnerStoriesSection from "../../components/sections/partners/PartnerStoriesSection";
import PartnerPromoCtaSection from "../../components/sections/PartnerPromoCtaSection";
import { partnerPromoGallery } from "../../data/partnerPromoCtaPresets.jsx";
import PartnerWithUsModal from "../../components/ui/PartnerWithUsModal";

// Route: /tour-partners/:category
// Shows overview of a single partner category with its 3 highlight cards
// Same hero as overview but filtered to one category

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
  const { category } = useParams();
  const navigate = useNavigate();
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const categoryLabel = CATEGORY_LABELS[category] ?? category;

  return (
    <main>
      <BlogBreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Tour Partners", href: "/tour-partners" },
          { label: categoryLabel, href: `/tour-partners/${category}` },
        ]}
      />
      <PartnerHero />
      <PartnerCategoryFilterBar
        activeCategory={category}
        onCategoryChange={(cat) => {
          if (cat === "all") navigate("/tour-partners");
          else navigate(`/tour-partners/${cat}`);
        }}
      />
      <PartnerCategorySection category={category} />
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
