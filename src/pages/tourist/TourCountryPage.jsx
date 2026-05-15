import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchToursThunk, selectToursList, selectToursListStatus } from "../../store/slices/toursSlice";
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
  const dispatch = useAppDispatch();
  const tours = useAppSelector(selectToursList);
  const toursStatus = useAppSelector(selectToursListStatus);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const displayName = country
    ? country.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
    : "Country";

  useEffect(() => {
    if (country) dispatch(fetchToursThunk({ country: country.toLowerCase(), limit: 16 }));
  }, [dispatch, country]);

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
      <SignatureExperiencesSection
        country={displayName}
        tours={toursStatus === "succeeded" ? [...tours].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 4) : undefined}
        isLoading={toursStatus === "idle" || toursStatus === "loading"}
      />
      <AllToursSection
        country={displayName}
        tourCount={toursStatus === "succeeded" ? tours.length : 0}
        tours={toursStatus === "succeeded" ? tours : undefined}
        isLoading={toursStatus === "idle" || toursStatus === "loading"}
      />
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
