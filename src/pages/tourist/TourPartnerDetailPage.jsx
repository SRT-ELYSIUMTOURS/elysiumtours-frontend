import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  fetchPartnerDetailThunk,
  clearPartnerDetail,
  selectCurrentPartner,
  selectCurrentPartnerStatus,
} from "../../store/slices/partnersSlice";
import { normalizeForDetail } from "../../api/partners.api";
import BlogBreadcrumbBar from "../../components/sections/blog/BlogBreadcrumbBar";
import PartnerDetailHero from "../../components/sections/partners/PartnerDetailHero";
import PartnerContactActions from "../../components/sections/partners/PartnerContactActions";
import PartnerPackagesSection from "../../components/sections/partners/PartnerPackagesSection";
import PartnerGallerySection from "../../components/sections/partners/PartnerGallerySection";
import PartnerReviewsSection from "../../components/sections/partners/PartnerReviewsSection";
import PartnerHowItWorksSection from "../../components/sections/partners/PartnerHowItWorksSection";
import PartnerRelatedSection from "../../components/sections/partners/PartnerRelatedSection";
import TransportBookingModal from "../../components/ui/TransportBookingModal";
import FeaturesModal from "../../components/ui/FeaturesModal";

// Route: /tour-partners/:category/:id

const CATEGORY_LABELS = {
  "tour-sites":   "Tour Sites & Events",
  accommodation:  "Accommodation",
  transportation: "Transportation",
  guides:         "Tour Guides",
  restaurants:    "Restaurants & Dining",
  photographers:  "Photos & Videographers",
  insurance:      "Insurance & Other Services",
};

const TourPartnerDetailPage = () => {
  const { category, id } = useParams();
  const dispatch = useAppDispatch();
  const raw    = useAppSelector(selectCurrentPartner);
  const status = useAppSelector(selectCurrentPartnerStatus);

  const [bookingOpen,  setBookingOpen]  = useState(false);
  const [selectedPkg,  setSelectedPkg]  = useState(null);
  const [featuresOpen, setFeaturesOpen] = useState(false);

  useEffect(() => {
    if (category && id) {
      dispatch(fetchPartnerDetailThunk({ category, id }));
    }
    return () => { dispatch(clearPartnerDetail()); };
  }, [dispatch, category, id]);

  const partner = raw ? normalizeForDetail(raw, category) : null;
  const loading = status === "idle" || status === "loading";
  const isError = status === "failed";
  const categoryLabel = CATEGORY_LABELS[category] ?? category;

  const handleBook = (pkg) => {
    setSelectedPkg(pkg);
    setBookingOpen(true);
  };

  const handleContactDriver = () => {
    setBookingOpen(false);
    document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="w-full bg-secondary-light-default">
      <BlogBreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Tour Partners", href: "/tour-partners" },
          { label: categoryLabel, href: `/tour-partners/${category}/all` },
          { label: partner?.name ?? "Details", href: "#" },
        ]}
      />

      {isError && (
        <div className="flex flex-col items-center justify-center gap-4 py-[120px] text-center px-6">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="9" stroke="#d1d5db" strokeWidth="1.5" />
            <path d="M12 8v4" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="12" cy="15.5" r=".75" fill="#d1d5db" />
          </svg>
          <p className="font-raleway font-semibold text-[18px] text-[#2d2d2d]">
            This partner couldn't be loaded
          </p>
          <p className="font-raleway text-[14px] text-[#949494] max-w-[300px]">
            Something went wrong fetching this listing. Please try again.
          </p>
          <button
            type="button"
            onClick={() => dispatch(fetchPartnerDetailThunk({ category, id }))}
            className="h-[44px] px-6 rounded-[22px] border border-secondary-normal-default font-raleway font-semibold text-[14px] text-secondary-dark-darker cursor-pointer hover:opacity-80 transition-opacity"
          >
            Try Again
          </button>
        </div>
      )}

      {!isError && (
        <>
          <div className="w-full px-6 md:px-[30px] lg:px-[156px] py-[60px]">
            <div className="flex flex-col gap-[70px] max-w-[1408px] mx-auto">
              <PartnerDetailHero
                category={category}
                partner={partner}
                loading={loading}
                onViewAllFeatures={() => setFeaturesOpen(true)}
              />
              {!loading && partner && (
                <PartnerContactActions partner={partner} />
              )}
              {!loading && partner && (
                <PartnerPackagesSection
                  category={category}
                  packages={partner.packages ?? undefined}
                  onBook={handleBook}
                  onCustomBooking={() => {
                    document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                />
              )}
            </div>
          </div>

          {!loading && <PartnerHowItWorksSection category={category} />}
          {!loading && (
            <PartnerGallerySection category={category} items={partner?.gallery} />
          )}
          {!loading && (
            <PartnerReviewsSection reviews={partner?.reviews} />
          )}
          {!loading && (
            <PartnerRelatedSection category={category} currentId={id} />
          )}
        </>
      )}

      <FeaturesModal
        open={featuresOpen}
        onClose={() => setFeaturesOpen(false)}
        category={category}
        partner={partner}
      />
      <TransportBookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        onContactDriver={handleContactDriver}
        initialPackage={selectedPkg}
      />
    </main>
  );
};

export default TourPartnerDetailPage;
