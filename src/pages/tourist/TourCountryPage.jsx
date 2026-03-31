import React from "react";
import { useParams } from "react-router-dom";
import BlogBreadcrumbBar from "../../components/sections/blog/BlogBreadcrumbBar";
import TourCountryHero from "../../components/sections/tours/TourCountryHero";
import TourCountryFilterBar from "../../components/sections/tours/TourCountryFilterBar";
import SignatureExperiencesSection from "../../components/sections/tours/SignatureExperiencesSection";
import AllToursSection from "../../components/sections/tours/AllToursSection";
import LocalGuidesSection from "../../components/sections/tours/LocalGuidesSection";
import CountryStorySection from "../../components/sections/tours/CountryStorySection";
import BlogCtaSection from "../../components/sections/blog/BlogCtaSection";

// Figma: 1914:40895 — Tours country page (Ghana example)
// Stack: Breadcrumb → CountryHero+Stats → FilterBar → SignatureExperiences → LocalGuides → CountryStory → CTA
const TourCountryPage = () => {
  const { country } = useParams();
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
      <CountryStorySection country={country} />
      <BlogCtaSection />
    </main>
  );
};

export default TourCountryPage;
