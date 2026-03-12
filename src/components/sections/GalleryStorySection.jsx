import React from 'react';
import busuaSerenityImg from '../../assets/images/busua-serenity.png';

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
    <path d="M5 12h14M13 6l6 6-6 6"/>
  </svg>
);

const GalleryStorySection = () => {
  return (
    <section className="w-full bg-[#fdfafb] py-[80px] px-6 xl:px-[157px]">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center">
        
        {/* Header Row: Exact Figma Layout */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline mb-[40px] relative">
          {/* Left: GALLERY Label */}
          <div className="md:col-span-4 flex items-center gap-[12px] h-fit">
            <div className="w-[32px] h-[2px] bg-secondary-normal-default"></div>
            <span className="text-[12px] font-bold text-secondary-normal-default tracking-widest uppercase font-raleway">
              GALLERY
            </span>
          </div>

        

          {/* Right: Title, Desc, and Button Area */}
          <div className="md:col-start-7 md:col-span-6 flex flex-col items-end text-right gap-4">
            <h2 className="text-[25px] font-bold text-tertiary-normal-default leading-[1.2] font-raleway">
              Gallery: Moments That Tell Our Story
            </h2>
            <p className="text-[14px] md:text-[15px] text-[#555] leading-relaxed font-medium max-w-[500px]">
              Take a glimpse into the beauty and excitement of our journeys. Our gallery showcases breathtaking destinations, 
              vibrant cultures, and unforgettable memories captured along the way.
            </p>
            <button className="group px-7 py-2.5 rounded-full border border-secondary-normal-default text-secondary-normal-default flex items-center gap-3 font-bold text-[13px] transition-all hover:bg-secondary-normal-default hover:text-white active:scale-95">
              Watch Gallery
              <ArrowIcon />
            </button>
          </div>
        </div>

        {/* The Gallery Card: Full Bleed Image with Overlay Frame */}
        <div className="relative w-full aspect-16/7 rounded-[15px] overflow-hidden shadow-2xl group">
          {/* Large Background Image */}
          <img 
            src={busuaSerenityImg} 
            alt="Waves of Serenity" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-2000 group-hover:scale-105"
          />
          
          <div className="absolute inset-0 bg-black/5" />

          {/* The White Frame & Text Block Container */}
          <div className="absolute inset-0 p-4 md:p-8 lg:p-12 flex flex-col">
            {/* The Border Frame */}
            <div className="flex-1 w-full border-[6px] border-white/90 rounded-[15px] relative overflow-hidden flex flex-col justify-end">
              
              {/* Bottom White Info Box (Flush with bottom) */}
              <div className="w-full bg-white px-8 py-5 md:px-12 md:py-6 flex flex-row justify-between items-center gap-6">
                <div className="flex-1 text-left">
                  <h3 className="text-[20px] md:text-[24px] font-bold text-tertiary-normal-default mb-1 font-raleway tracking-tight">
                    Waves of Serenity
                  </h3>
                  <p className="text-[13px] md:text-[14px] text-[#555] font-medium leading-normal max-w-[480px]">
                    Feel the gentle breeze and golden sands of Busua Beach, where every sunset 
                    paints a new memory of peace and adventure.
                  </p>
                </div>

                {/* Pagination Dots (Purple) */}
                <div className="flex gap-3 items-center h-fit">
                  <div className="w-2.5 h-2.5 rounded-full bg-secondary-normal-default shadow-sm ring-4 ring-secondary-normal-default/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-secondary-light-default"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-secondary-light-default"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

GalleryStorySection.displayName = "GalleryStorySection";

export default GalleryStorySection;
