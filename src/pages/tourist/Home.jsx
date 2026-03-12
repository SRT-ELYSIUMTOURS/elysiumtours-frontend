import React from 'react';

import HomeBanner from '../../components/sections/HomeBanner';
import StatsSection from '../../components/sections/StatsSection';
import PopularToursSection from '../../components/sections/PopularToursSection';
import FeaturedDestinationsSection from '../../components/sections/FeaturedDestinationsSection';
import PartnersSection from '../../components/sections/PartnersSection';
import GalleryStorySection from '../../components/sections/GalleryStorySection';
import CoastalSection from '../../components/sections/CoastalSection';
import TestimonialsSection from '../../components/sections/TestimonialsSection';
import CTABannerSection from '../../components/sections/CTABannerSection';

const Home = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-primary-light-default overflow-x-hidden">
      <HomeBanner />
      <StatsSection />
      <PopularToursSection />
      <FeaturedDestinationsSection />
      <PartnersSection />
      <GalleryStorySection />
      <CoastalSection />
      <TestimonialsSection />
      <CTABannerSection />
    </div>
  );
};

export default Home;
