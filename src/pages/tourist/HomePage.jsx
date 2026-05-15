import React, { useEffect } from "react";
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
import { fetchTestimonialsThunk, selectTestimonials } from "../../store/slices/cmsSlice";

const HomePage = React.forwardRef(({ className, ...props }, ref) => {
  const dispatch = useAppDispatch();
  const featuredTours = useAppSelector(selectFeaturedTours);
  const featuredToursStatus = useAppSelector(selectFeaturedToursStatus);
  const testimonials = useAppSelector(selectTestimonials);

  useEffect(() => {
    dispatch(fetchFeaturedToursThunk());
    dispatch(fetchTestimonialsThunk());
  }, [dispatch]);

  return (
    <main
      ref={ref}
      className={classNames("font-raleway", className)}
      {...props}
    >
      <HeroSection/>
      <DiscoverSection />
      <FeaturedToursSection
        tours={featuredToursStatus === "succeeded" ? featuredTours : undefined}
        isLoading={featuredToursStatus === "idle" || featuredToursStatus === "loading"}
      />
      <CustomTourSection />
      <FeaturedDestinationsSection />
      <PartnerHighlightsSection />
      <GallerySection />
      <BlogFeatureSection />
      <TestimonialsSection testimonials={testimonials.length > 0 ? testimonials : undefined} />
      <CtaSection />
    </main>
  );
});

HomePage.displayName = "HomePage";

export default HomePage;
