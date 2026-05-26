import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BlogBreadcrumbBar from "../../components/sections/blog/BlogBreadcrumbBar";
import PartnerHero from "../../components/sections/partners/PartnerHero";
import PartnerCategoryFilterBar from "../../components/sections/partners/PartnerCategoryFilterBar";
import PartnerCategorySection from "../../components/sections/partners/PartnerCategorySection";
import PartnerFeaturedGuide from "../../components/sections/partners/PartnerFeaturedGuide";
import PartnerStoriesSection from "../../components/sections/partners/PartnerStoriesSection";
import PartnerPromoCtaSection from "../../components/sections/PartnerPromoCtaSection";
import { partnerPromoGallery } from "../../data/partnerPromoCtaPresets.jsx";
import PartnerWithUsModal from "../../components/ui/PartnerWithUsModal";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchPartnersThunk, selectPartnerList, selectPartnerStatus } from "../../store/slices/partnersSlice";
import { normalizeForCategorySection, submitPartnerApplicationApi } from "../../api/partners.api";

const WIRED = ["tour-sites", "restaurants", "transportation", "guides", "accommodation", "photographers", "insurance"];

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
  const [activeCategory, setActiveCategory] = useState("all");
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const attractionsRaw    = useAppSelector(selectPartnerList("tour-sites"));
  const attractionsStatus = useAppSelector(selectPartnerStatus("tour-sites"));
  const restaurantsRaw    = useAppSelector(selectPartnerList("restaurants"));
  const restaurantsStatus = useAppSelector(selectPartnerStatus("restaurants"));
  const transportRaw      = useAppSelector(selectPartnerList("transportation"));
  const transportStatus   = useAppSelector(selectPartnerStatus("transportation"));
  const guidesRaw         = useAppSelector(selectPartnerList("guides"));
  const guidesStatus      = useAppSelector(selectPartnerStatus("guides"));
  const hotelsRaw           = useAppSelector(selectPartnerList("accommodation"));
  const hotelsStatus        = useAppSelector(selectPartnerStatus("accommodation"));
  const photographersRaw    = useAppSelector(selectPartnerList("photographers"));
  const photographersStatus = useAppSelector(selectPartnerStatus("photographers"));
  const insuranceRaw        = useAppSelector(selectPartnerList("insurance"));
  const insuranceStatus     = useAppSelector(selectPartnerStatus("insurance"));

  useEffect(() => {
    WIRED.forEach((cat) => {
      dispatch(fetchPartnersThunk({ category: cat, params: { pageSize: 8 } }));
    });
  }, [dispatch]);

  // Always returns an array — empty while loading/failed (shows nothing), real data when ready.
  const mkCards = (raw, status, cat) =>
    status === "succeeded"
      ? raw.slice(0, 4).map((p) => normalizeForCategorySection(p, cat))
      : [];

  const featuredGuide = guidesStatus === "succeeded" && guidesRaw.length > 0
    ? [...guidesRaw].sort((a, b) => (b.rating || 0) - (a.rating || 0))[0]
    : null;

  const showCategory = (key) => activeCategory === "all" || activeCategory === key;

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
      <PartnerHero onSearch={(q) => q && navigate(`/tour-partners/tour-sites/all?q=${encodeURIComponent(q)}`)} />

      {/* 3. Category filter bar */}
      <PartnerCategoryFilterBar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* 4–7. First four category sections */}
      {showCategory("tour-sites") && (
        <PartnerCategorySection
          category="tour-sites"
          cardsOverride={mkCards(attractionsRaw, attractionsStatus, "tour-sites")}
        />
      )}
      {showCategory("accommodation") && (
        <PartnerCategorySection
          category="accommodation"
          cardsOverride={mkCards(hotelsRaw, hotelsStatus, "accommodation")}
        />
      )}
      {showCategory("transportation") && (
        <PartnerCategorySection
          category="transportation"
          cardsOverride={mkCards(transportRaw, transportStatus, "transportation")}
        />
      )}
      {showCategory("guides") && (
        <PartnerCategorySection
          category="guides"
          cardsOverride={mkCards(guidesRaw, guidesStatus, "guides")}
        />
      )}

      {/* 8. Featured Guide callout */}
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

      {/* 9–11. Remaining category sections */}
      {showCategory("restaurants") && (
        <PartnerCategorySection
          category="restaurants"
          cardsOverride={mkCards(restaurantsRaw, restaurantsStatus, "restaurants")}
        />
      )}
      {showCategory("photographers") && (
        <PartnerCategorySection
          category="photographers"
          cardsOverride={mkCards(photographersRaw, photographersStatus, "photographers")}
        />
      )}
      {showCategory("insurance") && (
        <PartnerCategorySection
          category="insurance"
          cardsOverride={mkCards(insuranceRaw, insuranceStatus, "insurance")}
        />
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
          onSubmit={submitPartnerApplicationApi}
        />
      )}
    </main>
  );
};

export default TourPartnersPage;
