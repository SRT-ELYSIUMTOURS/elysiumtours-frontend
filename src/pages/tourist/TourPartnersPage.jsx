import React, { useState } from "react";
import BlogBreadcrumbBar from "../../components/sections/blog/BlogBreadcrumbBar";
import PartnerHero from "../../components/sections/partners/PartnerHero";
import PartnerCategoryFilterBar from "../../components/sections/partners/PartnerCategoryFilterBar";
import PartnerCategorySection from "../../components/sections/partners/PartnerCategorySection";
import PartnerFeaturedGuide from "../../components/sections/partners/PartnerFeaturedGuide";
import PartnerStoriesSection from "../../components/sections/partners/PartnerStoriesSection";
import PartnerPromoCtaSection from "../../components/sections/PartnerPromoCtaSection";
import { partnerPromoGallery } from "../../data/partnerPromoCtaPresets.jsx";
import PartnerWithUsModal from "../../components/ui/PartnerWithUsModal";

// Route: /tour-partners
// Section order from Figma (13 nodes):
// 1. Breadcrumb (772:10580)
// 2. Hero — image carousel + search (772:10495)
// 3. Category filter bar — 8 pills (883:5517)
// 4. Tour Sites & Events section (896:5707)
// 5. Accommodation section (936:6023)
// 6. Transportation section (939:5835)
// 7. Tour Guides section (939:5947)
// 8. Featured Guide callout (940:6299)
// 9. Restaurants & Dining section (939:6095)
// 10. Photos & Videographers section (969:6555)
// 11. Insurance & Other Services section (939:6197)
// 12. Partner Stories section (939:6017)
// 13. CTA section (772:10509)

const TourPartnersPage = () => {
  /** Pills only filter sections — URL stays /tour-partners. Listing opens via Explore More only. */
  const [activeCategory, setActiveCategory] = useState("all");
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);

  const showCategory = (key) =>
    activeCategory === "all" || activeCategory === key;

  return (
    <main>
      {/* 1. Breadcrumb */}
      <BlogBreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Tour Partners", href: "/tour-partners" },
        ]}
      />

      {/* 2. Hero */}
      <PartnerHero />

      {/* 3. Category filter bar */}
      <PartnerCategoryFilterBar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* 4–7. First four category sections */}
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

      {/* 8. Featured Guide callout */}
      {showCategory("guides") && <PartnerFeaturedGuide />}

      {/* 9–11. Remaining category sections */}
      {showCategory("restaurants") && (
        <PartnerCategorySection category="restaurants" />
      )}
      {showCategory("photographers") && (
        <PartnerCategorySection category="photographers" />
      )}
      {showCategory("insurance") && (
        <PartnerCategorySection category="insurance" />
      )}

      {/* 12. Partner Stories */}
      <PartnerStoriesSection />

      {/* 13. CTA */}
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

export default TourPartnersPage;
