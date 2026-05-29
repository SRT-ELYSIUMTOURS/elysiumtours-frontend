import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import { deriveTourTags } from "../../utils/tourTags";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchToursThunk, selectToursList, selectToursListStatus } from "../../store/slices/toursSlice";
import {
  fetchDestinationsThunk,
  selectDestinationsList,
  selectDestinationsListStatus,
} from "../../store/slices/destinationsSlice";
import {
  fetchCountryBySlugThunk,
  selectCurrentCountry,
  selectCurrentCountryStatus,
  clearCurrentCountry,
} from "../../store/slices/countriesSlice";
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

const TourCountryPage = () => {
  const { country } = useParams();
  const dispatch = useAppDispatch();
  const tours = useAppSelector(selectToursList);
  const toursStatus = useAppSelector(selectToursListStatus);
  const allDestinations = useAppSelector(selectDestinationsList);
  const destStatus = useAppSelector(selectDestinationsListStatus);
  const countryData = useAppSelector(selectCurrentCountry);
  const countryStatus = useAppSelector(selectCurrentCountryStatus);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [filters, setFilters] = useState({ regions: [], type: "all", tags: [] });
  const allToursSectionRef = useRef(null);

  const displayName = country
    ? country.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
    : "Country";

  // Use DB country name when available — avoids slug-approximation bugs (e.g. Côte d'Ivoire)
  const countryNameNorm = useMemo(() => {
    if (countryData?.name) return countryData.name.toLowerCase();
    return country?.toLowerCase().replace(/-/g, " ");
  }, [countryData, country]);

  const countryDestinations = useMemo(() => {
    if (!allDestinations.length) return [];
    return allDestinations.filter(
      (d) => d.country?.toLowerCase() === countryNameNorm
    );
  }, [allDestinations, countryNameNorm]);

  // Unique tags across all loaded tours — drives the CATEGORY filter pills
  const tourTags = useMemo(
    () => (tours.length ? [...new Set(tours.flatMap((t) => deriveTourTags(t)))].sort() : []),
    [tours]
  );

  // Client-side filter applied after the country-scoped backend fetch
  const filteredTours = useMemo(() => {
    if (!tours.length) return [];
    return tours.filter((t) => {
      if (filters.type !== "all" && t.category !== filters.type) return false;
      if (filters.tags.length > 0) {
        const tTags = deriveTourTags(t).map((x) => x.toLowerCase());
        if (!filters.tags.some((tag) => tTags.includes(tag.toLowerCase()))) return false;
      }
      if (filters.regions.length > 0) {
        const destRegion = t.destination?.region;
        // Only exclude if region is known; tours with unpopulated destination pass through
        if (destRegion && !filters.regions.includes(destRegion)) return false;
      }
      return true;
    });
  }, [tours, filters]);

  useEffect(() => {
    if (!country) return;
    dispatch(clearCurrentCountry());
    dispatch(fetchToursThunk({ country: country.toLowerCase(), limit: 16 }));
    if (destStatus === "idle") dispatch(fetchDestinationsThunk());
    dispatch(fetchCountryBySlugThunk(country.toLowerCase()));
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
      <TourCountryHero
        country={country}
        countryData={countryStatus === "succeeded" ? countryData : null}
        countryDestinations={countryDestinations}
        tourCount={toursStatus === "succeeded" ? tours.length : null}
      />
      <TourCountryFilterBar
        country={country}
        countryDestinations={countryDestinations}
        resultsCount={toursStatus === "succeeded" ? filteredTours.length : 0}
        tourTags={toursStatus === "succeeded" ? tourTags : []}
        onFilterChange={setFilters}
      />
      <SignatureExperiencesSection
        country={displayName}
        tours={
          toursStatus === "succeeded"
            ? [...filteredTours].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 4)
            : undefined
        }
        isLoading={toursStatus === "idle" || toursStatus === "loading"}
        onSeeAll={() => allToursSectionRef.current?.scrollIntoView({ behavior: "smooth" })}
      />
      <AllToursSection
        ref={allToursSectionRef}
        country={displayName}
        tourCount={toursStatus === "succeeded" ? filteredTours.length : 0}
        tours={toursStatus === "succeeded" ? filteredTours : undefined}
        isLoading={toursStatus === "idle" || toursStatus === "loading"}
      />
      <LocalGuidesSection country={displayName} />
      {countryStatus === "succeeded" && countryData && (
        <WhyCountrySection country={country} countryData={countryData} />
      )}
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
