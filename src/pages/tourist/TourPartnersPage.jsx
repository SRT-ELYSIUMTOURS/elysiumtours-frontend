import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogBreadcrumbBar from "../../components/sections/blog/BlogBreadcrumbBar";
import PartnerHero from "../../components/sections/partners/PartnerHero";
import PartnerCategoryFilterBar from "../../components/sections/partners/PartnerCategoryFilterBar";
import PartnerCategorySection from "../../components/sections/partners/PartnerCategorySection";
import PartnerFeaturedGuide from "../../components/sections/partners/PartnerFeaturedGuide";
import PartnerStoriesSection from "../../components/sections/partners/PartnerStoriesSection";
import PartnerCtaSection from "../../components/sections/partners/PartnerCtaSection";

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

const CATEGORY_TO_SECTION_KEY = {
  "all": null,
  "tour-sites": "tour-sites",
  "accommodation": "accommodation",
  "transportation": "transportation",
  "guides": "guides",
  "restaurants": "restaurants",
  "photographers": "photographers",
  "insurance": "insurance",
};

const TourPartnersPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();

  const handleCategoryChange = (cat) => {
    if (cat === "all") {
      setActiveCategory("all");
    } else {
      navigate(`/tour-partners/${cat}`);
    }
  };

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
        onCategoryChange={handleCategoryChange}
      />

      {/* 4–7. First four category sections */}
      <PartnerCategorySection category="tour-sites" />
      <PartnerCategorySection category="accommodation" />
      <PartnerCategorySection category="transportation" />
      <PartnerCategorySection category="guides" />

      {/* 8. Featured Guide callout */}
      <PartnerFeaturedGuide />

      {/* 9–11. Remaining category sections */}
      <PartnerCategorySection category="restaurants" />
      <PartnerCategorySection category="photographers" />
      <PartnerCategorySection category="insurance" />

      {/* 12. Partner Stories */}
      <PartnerStoriesSection />

      {/* 13. CTA */}
      <PartnerCtaSection />
    </main>
  );
};

export default TourPartnersPage;
