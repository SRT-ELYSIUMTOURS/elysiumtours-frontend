import React, { useState } from "react";
import BlogBreadcrumbBar from "../../components/sections/blog/BlogBreadcrumbBar";
import GalleryHero from "../../components/sections/gallery/GalleryHero";
import GalleryCategoryFilterBar from "../../components/sections/gallery/GalleryCategoryFilterBar";
import GalleryCategorySection from "../../components/sections/gallery/GalleryCategorySection";
import PartnerPromoCtaSection from "../../components/sections/PartnerPromoCtaSection";
import { partnerPromoGallery } from "../../data/partnerPromoCtaPresets.jsx";
import PartnerWithUsModal from "../../components/ui/PartnerWithUsModal";

// Route: /gallery
// Gallery main page — Figma nodes 616:6236 (Videos tab) + variants for other tabs
// Section order:
// 1. Breadcrumb bar
// 2. Hero — "Discover Ghana Through Our Lens"
// 3. Category filter bar — All / Destinations / Activities / Nature / Culture / Videos / Partners / Captured by You
// 4. All category sections (when All tab) or single section; "Share your travel moments"
//    is rendered with Captured by you (see GalleryCategorySection)
// 5. CTA (Plan Your West African Adventure)

const GalleryPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <main>
      {/* 1. Breadcrumb */}
      <BlogBreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Gallery", href: "/gallery" },
        ]}
      />

      {/* 2. Hero */}
      <GalleryHero />

      {/* 3. Category filter bar */}
      <GalleryCategoryFilterBar
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* 4. Gallery sections */}
      {activeTab === "all" ? (
        <GalleryCategorySection showAll />
      ) : (
        <GalleryCategorySection category={activeTab} />
      )}

      {/* 5. CTA */}
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

export default GalleryPage;
