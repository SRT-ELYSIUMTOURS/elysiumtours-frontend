import React from 'react';
import FeaturedDestinationCard from '../cards/FeaturedDestinationCard';

const DESTINATIONS = [
  { id: 1, name: "Kakum National Park", subtitle: "Discover Ghana's most captivating\ndestinations", image: "https://picsum.photos/seed/dest1/400/316", size: "default" },
  { id: 2, name: "National Theater", subtitle: "Discover Ghana's most captivating\ndestinations", image: "https://picsum.photos/seed/dest2/400/316", size: "default" },
  { id: 3, name: "Independence Square", subtitle: "Discover Ghana's most captivating\ndestinations", image: "https://picsum.photos/seed/dest3/450/656", size: "large" },
  { id: 4, name: "Kakum National Park", subtitle: "Discover Ghana's most captivating\ndestinations", image: "https://picsum.photos/seed/dest4/400/316", size: "default" },
  { id: 5, name: "Boti Falls", subtitle: "Discover Ghana's most captivating\ndestinations", image: "https://picsum.photos/seed/dest5/400/316", size: "default" },
];

const FeaturedDestinationsSection = () => {
  return (
    <section className="bg-primary-light-default w-full py-[80px] px-6 xl:px-[157px]">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-[40px]">
        
        {/* Header Row: Label and Title on the same baseline */}
        <div className="w-full flex flex-col md:flex-row md:items-baseline justify-between gap-10 mb-[10px]">
          {/* Left: FEATURED DESTINATIONS Label */}
          <div className="flex items-center gap-[12px] shrink-0">
            <div className="w-[32px] h-[2px] bg-tertiary-normal-default"></div>
            <span className="text-[12px] font-bold text-tertiary-normal-default tracking-widest uppercase">
              FEATURED DESTINATIONS
            </span>
          </div>

          {/* Right: Main Headline & Paragraph Area */}
          <div className="flex-1 flex flex-col items-end text-right gap-md">
            <h2 className="text-[25px] font-bold text-tertiary-normal-default leading-[1.2] font-raleway md:whitespace-nowrap">
              Discover Ghana's Hidden Gems
            </h2>
            <p className="text-[14px] text-tertiary-normal-default leading-relaxed max-w-[650px]">
              Discover Ghana's most captivating destinations handpicked by Elysium<br className="hidden md:block"/>
              Tours. From the historic castles of Cape Coast to the serene shores of Lake<br className="hidden md:block"/>
              Volta and the vibrant streets of Accra, each location offers a unique blend of<br className="hidden md:block"/>
              culture, heritage, and natural beauty.
            </p>
          </div>
        </div>

        {/* Masonry Layout: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
          
          {/* Left Column - 2 stacked */}
          <div className="flex flex-col gap-[24px]">
            <FeaturedDestinationCard 
              image={DESTINATIONS[0].image}
              name={DESTINATIONS[0].name}
              subtitle={DESTINATIONS[0].subtitle}
              size={DESTINATIONS[0].size}
            />
            <FeaturedDestinationCard 
              image={DESTINATIONS[1].image}
              name={DESTINATIONS[1].name}
              subtitle={DESTINATIONS[1].subtitle}
              size={DESTINATIONS[1].size}
            />
          </div>

          {/* Middle Column - 1 large */}
          <div className="flex flex-col gap-[24px]">
            <FeaturedDestinationCard 
              image={DESTINATIONS[2].image}
              name={DESTINATIONS[2].name}
              subtitle={DESTINATIONS[2].subtitle}
              size={DESTINATIONS[2].size}
            />
          </div>

          {/* Right Column - 2 stacked */}
          <div className="flex flex-col gap-[24px]">
             <FeaturedDestinationCard 
              image={DESTINATIONS[3].image}
              name={DESTINATIONS[3].name}
              subtitle={DESTINATIONS[3].subtitle}
              size={DESTINATIONS[3].size}
            />
            <FeaturedDestinationCard 
              image={DESTINATIONS[4].image}
              name={DESTINATIONS[4].name}
              subtitle={DESTINATIONS[4].subtitle}
              size={DESTINATIONS[4].size}
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default FeaturedDestinationsSection;
