import React, { useEffect, useMemo } from "react";
import { classNames } from "../../utils/classNames";
import HeroSection from "../../components/sections/home/HeroSection";
import DiscoverSection from "../../components/sections/home/DiscoverSection";
import FeaturedToursSection from "../../components/sections/home/FeaturedToursSection";
import CustomTourSection from "../../components/sections/home/CustomTourSection";
import FeaturedDestinationsSection from "../../components/sections/home/FeaturedDestinationsSection";
import PartnerHighlightsSection from "../../components/sections/home/PartnerHighlightsSection";
import GallerySection from "../../components/sections/home/GallerySection";
import BlogFeatureSection from "../../components/sections/home/BlogFeatureSection";
import TestimonialsSection from "../../components/sections/home/TestimonialsSection";
import CtaSection from "../../components/sections/home/CtaSection";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchFeaturedToursThunk, selectFeaturedTours, selectFeaturedToursStatus } from "../../store/slices/toursSlice";
import { fetchTestimonialsThunk, selectTestimonials, selectTestimonialsStatus } from "../../store/slices/cmsSlice";

// Tours with a future startDate (e.g. Achimota Jan 2027) sort to the top.
// Tours with no startDate fall to the bottom. Preserves relative order within each group.
function prioritiseFeaturedTours(tours) {
  const now = Date.now();
  return [...tours].sort((a, b) => {
    const aTime   = a.startDate ? new Date(a.startDate).getTime() : null;
    const bTime   = b.startDate ? new Date(b.startDate).getTime() : null;
    const aFuture = aTime !== null && aTime > now;
    const bFuture = bTime !== null && bTime > now;
    // Upcoming tours always appear before past/undated ones
    if (aFuture && !bFuture) return -1;
    if (!aFuture && bFuture) return 1;
    // Both upcoming — earliest departure first
    if (aFuture && bFuture) return aTime - bTime;
    return 0;
  });
}

// Flattens tourHighlights from all featured packages into the shape that
// FeaturedDestinationsSection expects: { id, name, subtitle, image }.
// The first 5 entries fill the masonry grid — order is preserved from the API.
function extractTourHighlights(featuredTours) {
  return featuredTours
    .flatMap((tour) =>
      (tour.tourHighlights || [])
        .filter((h) => h.image)   // skip highlights that have no image URL
        .map((highlight, index) => ({
          id:       `${tour._id}-${index}`,
          name:     highlight.title       || "",
          subtitle: highlight.description || "",
          image:    highlight.image,
        }))
    )
    .slice(0, 5);
}

const HomePage = React.forwardRef(({ className, ...props }, ref) => {
  const dispatch          = useAppDispatch();
  const featuredTours     = useAppSelector(selectFeaturedTours);
  const featuredStatus    = useAppSelector(selectFeaturedToursStatus);
  const testimonials         = useAppSelector(selectTestimonials);
  const testimonialsStatus   = useAppSelector(selectTestimonialsStatus);

  useEffect(() => {
    dispatch(fetchFeaturedToursThunk());
    dispatch(fetchTestimonialsThunk());
  }, [dispatch]);

  const prioritisedTours = useMemo(
    () => (featuredStatus === "succeeded" ? prioritiseFeaturedTours(featuredTours) : []),
    [featuredTours, featuredStatus]
  );

  const tourHighlights = useMemo(
    () => (featuredStatus === "succeeded" ? extractTourHighlights(prioritisedTours) : []),
    [prioritisedTours, featuredStatus]
  );

  return (
    <main
      ref={ref}
      className={classNames("font-raleway", className)}
      {...props}
    >
      <HeroSection />
      <DiscoverSection />
      <FeaturedToursSection
        tours={featuredStatus === "succeeded" ? prioritisedTours : undefined}
        isLoading={featuredStatus === "idle" || featuredStatus === "loading"}
      />
      <GallerySection />
      <CustomTourSection />
      <FeaturedDestinationsSection
        highlights={tourHighlights}
        isLoading={featuredStatus === "idle" || featuredStatus === "loading"}
      />
      <PartnerHighlightsSection />
      <BlogFeatureSection />
      <TestimonialsSection testimonials={testimonials} status={testimonialsStatus} />
      <CtaSection />
    </main>
  );
});

HomePage.displayName = "HomePage";
export default HomePage;
