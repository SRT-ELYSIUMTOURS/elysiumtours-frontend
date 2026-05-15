import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchToursThunk, selectToursList, selectToursListStatus } from "../../store/slices/toursSlice";
import {
  fetchDestinationsThunk,
  selectDestinationsList,
  selectDestinationsListStatus,
} from "../../store/slices/destinationsSlice";
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
  const allDestinations = useAppSelector(selectDestinationsList);
  const destStatus = useAppSelector(selectDestinationsListStatus);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);

  const displayName = country
    ? country.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
    : "Country";

  // Convert URL slug back to country name for matching (e.g. "cote-d'ivoire" → "cote d'ivoire")
  const countrySlugNorm = country?.toLowerCase().replace(/-/g, " ");

  const countryDestinations = useMemo(() => {
    if (!allDestinations.length) return [];
    return allDestinations.filter(
      (d) => d.country?.toLowerCase() === countrySlugNorm
    );
  }, [allDestinations, countrySlugNorm]);

  useEffect(() => {
    if (!country) return;
    dispatch(fetchToursThunk({ country: country.toLowerCase(), limit: 16 }));
    if (destStatus === "idle") dispatch(fetchDestinationsThunk());
  }, [dispatch, country, destStatus]);

  return (
    <main>
      <BlogBreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Tours", href: "/tours" },
          { label: displayName, href: `/tours/${country}` },
        ]}
      />
      <TourCountryHero
        country={country}
        countryDestinations={countryDestinations}
        tourCount={toursStatus === "succeeded" ? tours.length : null}
      />
      <TourCountryFilterBar
        country={country}
        countryDestinations={countryDestinations}
        resultsCount={toursStatus === "succeeded" ? tours.length : 0}
      />
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
      <WhyCountrySection
        country={country}
        countryDestinations={countryDestinations}
      />
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
