import React from "react";
import BlogBreadcrumbBar from "../../components/sections/blog/BlogBreadcrumbBar";
import TourHero from "../../components/sections/tours/TourHero";
import TourFilterBar from "../../components/sections/tours/TourFilterBar";
import TourByCountriesSection from "../../components/sections/tours/TourByCountriesSection";
import TourTypesSection from "../../components/sections/tours/TourTypesSection";
import TourFeaturedSection from "../../components/sections/tours/TourFeaturedSection";
import WhyChooseSection from "../../components/sections/tours/WhyChooseSection";
import TourCtaSection from "../../components/sections/tours/TourCtaSection";
import CtaSection from "../../components/sections/tours/CtaSection";

// Figma: 1914:37486 — Tours landing page
// Stack: Breadcrumb → Hero → FilterBar → TourByCountries → TourTypes → FeaturedTours → WhyChoose → CTA
const TourPage = () => {
  return (
    <main>
      <BlogBreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Tours", href: "/tours" },
        ]}
      />
      <TourHero />
      <TourFilterBar />
      <TourByCountriesSection />
      <TourTypesSection />
      <TourFeaturedSection />
      <WhyChooseSection />
      <TourCtaSection />
      <CtaSection />
    </main>
  );
};

export default TourPage;
