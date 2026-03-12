import React from 'react';
import { Link } from 'react-router-dom';
import PopularTourCard from '../cards/PopularTourCard';

const DUMMY_TOURS = [
  {
    id: 1,
    image: "https://picsum.photos/seed/tour1/331/373",
    location: "Kwame Nkrumah Memorial Park",
    rating: 4.8,
    title: "Kwame Nkrumah Memorial Park",
    availabilityBadge: "Opened Daily",
    price: "Ghs. 100.00"
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/tour2/331/373",
    location: "Cape Coast | Central Region",
    rating: 4.9,
    title: "The Homecoming Experience to Kakum National Park",
    availabilityBadge: "Opened Daily",
    price: "Ghs. 400.00"
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/tour3/331/373",
    location: "Ada Foah | Eastern Region",
    rating: 4.7,
    title: "Aqua Safari Weekend Getaway",
    availabilityBadge: "Weekends Only",
    price: "Ghs. 1,200.00"
  },
  {
    id: 4,
    image: "https://picsum.photos/seed/tour4/331/373",
    location: "Mole National Park | Northern Region",
    rating: 4.9,
    title: "Mole Safari & Larabanga Mosque",
    availabilityBadge: "Seasonal",
    price: "Ghs. 850.00"
  }
];

const PopularToursSection = () => {
  return (
    <section className="bg-[#fcf8ff] w-full py-[80px] px-6 xl:px-[157px]">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-[40px]">
        
        {/* Header Row: Label and Title on the same baseline */}
        <div className="w-full flex flex-col md:flex-row md:items-baseline justify-between gap-10">
          {/* Left: FEATURED TOURS Label */}
          <div className="flex items-center gap-[12px] shrink-0">
            <div className="w-[32px] h-[2px] bg-tertiary-normal-default"></div>
            <span className="text-[12px] font-bold text-tertiary-normal-default tracking-widest uppercase">
              FEATURED TOURS
            </span>
          </div>

          {/* Right: Main Headline & Paragraph Area */}
          <div className="flex-1 flex flex-col items-end text-right gap-md">
            <h2 className="text-[25px] font-bold text-tertiary-normal-default leading-[1.2] font-raleway md:whitespace-nowrap">
              Explore Our Most Popular Tours and Experiences
            </h2>
            <p className="text-[14px] text-tertiary-normal-default leading-relaxed max-w-[580px]">
              Ghana is buzzing with spots like Kakum National Park, that canopy walkway<br/>
              is a thrill. Cape Coast Castle, super eye-opening on history. Kwame Nkrumah<br/>
              Memorial Park in Accra's topping lists, with over three hundred thousand<br/>
              visitors last year alone.
            </p>
            <Link to="/tours" className="inline-flex items-center justify-center px-[16px] py-[8px] mt-[8px] rounded-full border border-secondary-normal-default text-[12px] text-secondary-normal-default font-semibold hover:bg-secondary-normal-default hover:text-white transition-colors">
              Explore More 
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="ml-1">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] w-full mt-[24px]">
          {DUMMY_TOURS.map(tour => (
            <PopularTourCard 
              key={tour.id}
              image={tour.image}
              location={tour.location}
              rating={tour.rating}
              title={tour.title}
              availabilityBadge={tour.availabilityBadge}
              price={tour.price}
              className="w-full flex-1"
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default PopularToursSection;
