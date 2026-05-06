import React, { useState } from "react";
import { useParams } from "react-router-dom";
import BlogBreadcrumbBar from "../../components/sections/blog/BlogBreadcrumbBar";
import TourCountryHero from "../../components/sections/tours/TourCountryHero";
import TourCountryFilterBar from "../../components/sections/tours/TourCountryFilterBar";
import SignatureExperiencesSection from "../../components/sections/tours/SignatureExperiencesSection";
import AllToursSection from "../../components/sections/tours/AllToursSection";
import LocalGuidesSection from "../../components/sections/tours/LocalGuidesSection";
import WhyCountrySection from "../../components/sections/tours/WhyCountrySection";
import CountryBlogFeatureSection from "../../components/sections/tours/CountryBlogFeatureSection";
import PartnerPromoCtaSection from "../../components/sections/PartnerPromoCtaSection";
import { partnerPromoTour } from "../../data/partnerPromoCtaPresets.jsx";
import PartnerWithUsModal from "../../components/ui/PartnerWithUsModal";

// Figma: 1914:40895 — Tours country page (Ghana example)
// Stack: Breadcrumb → CountryHero+Stats → FilterBar → SignatureExperiences → LocalGuides → CountryStory → CTA
const TourCountryPage = () => {
  const { country } = useParams();
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const displayName = country
    ? country.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
    : "Country";

  return (
    <main>
      <BlogBreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Tours", href: "/tours" },
          { label: displayName, href: `/tours/${country}` },
        ]}
      />
      <TourCountryHero country={country} />
      <TourCountryFilterBar country={country} />
      <SignatureExperiencesSection country={displayName} />
      <AllToursSection country={displayName} />
      <LocalGuidesSection country={displayName} />
      <WhyCountrySection country={country} />
      <CountryBlogFeatureSection country={country} />
      <PartnerPromoCtaSection
        {...partnerPromoTour}
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

export default TourCountryPage;
