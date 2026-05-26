import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BlogBreadcrumbBar from "../../components/sections/blog/BlogBreadcrumbBar";
import TourHero from "../../components/sections/tours/TourHero";
import TourFilterBar from "../../components/sections/tours/TourFilterBar";
import TourByCountriesSection from "../../components/sections/tours/TourByCountriesSection";
import TourTypesSection from "../../components/sections/tours/TourTypesSection";
import TourFeaturedSection from "../../components/sections/tours/TourFeaturedSection";
import WhyChooseSection from "../../components/sections/tours/WhyChooseSection";
import TourCtaSection from "../../components/sections/tours/TourCtaSection";
import PartnerPromoCtaSection from "../../components/sections/PartnerPromoCtaSection";
import { partnerPromoTour } from "../../data/partnerPromoCtaPresets.jsx";
import PartnerWithUsModal from "../../components/ui/PartnerWithUsModal";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchToursThunk, selectToursList, selectToursListStatus } from "../../store/slices/toursSlice";
import { fetchDestinationsThunk, selectDestinationsList } from "../../store/slices/destinationsSlice";

const TourPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const tours = useAppSelector(selectToursList);
  const toursStatus = useAppSelector(selectToursListStatus);
  const destinations = useAppSelector(selectDestinationsList);

  useEffect(() => {
    dispatch(fetchToursThunk({}));
    dispatch(fetchDestinationsThunk());
  }, [dispatch]);

  const handleFilterChange = useCallback((filters) => {
    const params = { ...filters };
    Object.keys(params).forEach((k) => params[k] === undefined && delete params[k]);
    dispatch(fetchToursThunk(params));
  }, [dispatch]);

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.hash]);

  return (
    <main>
      <BlogBreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Tours", href: "/tours" },
        ]}
      />
      <TourHero />
      <TourFilterBar
        onFilterChange={handleFilterChange}
        resultsCount={toursStatus === "succeeded" ? tours.length : 0}
      />
      <TourByCountriesSection destinations={destinations} tours={toursStatus === "succeeded" ? tours : null} />
      <TourTypesSection tours={toursStatus === "succeeded" ? tours : null} />
      <TourFeaturedSection
        id="featured"
        tours={toursStatus === "succeeded" ? tours : undefined}
        isLoading={toursStatus === "idle" || toursStatus === "loading"}
      />
      <WhyChooseSection />
      <TourCtaSection />
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

export default TourPage;
