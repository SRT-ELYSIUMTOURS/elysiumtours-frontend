import React, { useState } from 'react';
import SearchBar from '../ui/SearchBar';

// From Figma: Home Banner (Hero Section)
// Background Image full width, dark overlay
// Title: Discover Ghana with Elysium Tours [White, Display-2xl-bold]
// Subtitle: Experience the vibrant culture, breathtaking landscapes... [White, text-md-regular]
// SearchBar centered
// Pagination dots at the bottom

const HomeBanner = () => {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = () => {
    console.log("Searching for:", location, date);
  };

  return (
    <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/arch/1920/1080" 
          alt="Independence Arch, Accra" 
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 xl:px-[157px] w-full max-w-[1200px] mt-[-40px]">
        
        {/* Title */}
        <h1 className="text-[40px] md:text-[56px] lg:text-[64px] font-bold text-white leading-[1.1] mb-[24px]" style={{ fontFamily: 'Raleway, sans-serif' }}>
          Discover Ghana with Elysium Tours
        </h1>

        {/* Subtitle */}
        <p className="text-[15px] md:text-[16px] text-white font-medium max-w-[800px] mb-[48px] leading-[1.6]" style={{ fontFamily: 'Raleway, sans-serif' }}>
          Elysium Tours offers exceptional travel experiences in Ghana, combining cultural immersion, historical landmarks, <br className="hidden md:block" />
          and natural beauty to create unforgettable and authentic journeys.
        </p>

        {/* Search Bar - constrained width */}
        <div className="w-full max-w-[957px]">
          <SearchBar 
            locationValue={location}
            onLocationChange={setLocation}
            dateValue={date}
            onDateChange={setDate}
            onSearch={handleSearch}
          />
        </div>
      </div>

      {/* Hero Carousel Indicators (Bottom) */}
      <div className="absolute bottom-[40px] z-10 flex items-center gap-md">
        {/* Active Dot (Solid White) */}
        <div className="w-[12px] h-[12px] bg-white rounded-full cursor-pointer shadow-[0_0_4px_rgba(0,0,0,0.5)]"></div>
        {/* Inactive Dot (Hollow White) */}
        <div className="w-[12px] h-[12px] bg-transparent border-[1.5px] border-white rounded-full cursor-pointer hover:bg-white/20 transition-colors shadow-[0_0_4px_rgba(0,0,0,0.5)]"></div>
        {/* Inactive Dot (Hollow White) */}
        <div className="w-[12px] h-[12px] bg-transparent border-[1.5px] border-white rounded-full cursor-pointer hover:bg-white/20 transition-colors shadow-[0_0_4px_rgba(0,0,0,0.5)]"></div>
      </div>
    </section>
  );
};

export default HomeBanner;
