import React from "react";
import { classNames } from "../../utils/classNames";
import HeroSection from "../../components/sections/home/HeroSection";
import DiscoverSection from "../../components/sections/home/DiscoverSection";
import FeaturedToursSection from "../../components/sections/home/FeaturedToursSection";
import FeaturedDestinationsSection from "../../components/sections/home/FeaturedDestinationsSection";
import PartnerHighlightsSection from "../../components/sections/home/PartnerHighlightsSection";
import GallerySection from "../../components/sections/home/GallerySection";
import BlogCtaSection from "../../components/sections/home/BlogCtaSection";
import BlogFeatureSection from "../../components/sections/home/BlogFeatureSection";
import TestimonialsSection from "../../components/sections/home/TestimonialsSection";
import CtaSection from "../../components/sections/home/CtaSection";

const HomePage = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={classNames("font-raleway", className)}
      {...props}
    >
      <HeroSection/>
      <DiscoverSection />
      <FeaturedToursSection />
      <FeaturedDestinationsSection />
      <PartnerHighlightsSection />
      <GallerySection />
      <BlogFeatureSection />
      <TestimonialsSection />
      <CtaSection />
    </main>
  );
});

HomePage.displayName = "HomePage";

export default HomePage;
