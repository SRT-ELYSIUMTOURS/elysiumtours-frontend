import React from 'react';
import { classNames } from '../../utils/classNames';
import coastalCharmImg from '../../assets/images/coastal-charm.png';

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CoastalSection = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <section 
      ref={ref}
      className={classNames("w-full bg-[#f5f0f9] py-16 px-6 xl:px-[157px]", className)}
      {...props}
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="relative w-full bg-[#fafafa] rounded-md shadow-[0px_20px_50px_rgba(0,0,0,0.03)] overflow-hidden p-8 md:p-14 flex flex-col md:flex-row items-center gap-12 lg:gap-24 transition-all duration-500 hover:shadow-[0px_30px_70px_rgba(0,0,0,0.05)]">
          
          {/* Left: Decorative Image with Ghost Frame */}
          <div className="relative shrink-0 w-[220px] h-[220px] md:w-[300px] md:h-[300px] flex items-center justify-center">
            {/* Ghost Frame (Soft Lavender Shape) */}
            <div className="absolute w-[80%] h-[80%] bg-[#f3e8f9] rounded-md rotate-12 translate-x-6 translate-y-4 opacity-80" />
            
            {/* Main Image Container */}
            <div className="relative w-[80%] h-[80%] rounded-md overflow-hidden -rotate-6 shadow-2xl border-[6px] border-white transition-all duration-700 hover:rotate-0 hover:scale-105 group">
              <img 
                src={coastalCharmImg} 
                alt="Ghana's Coast" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-secondary-normal-default/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex-1 flex flex-col gap-6 text-center md:text-left">
            <h2 className="text-[32px] md:text-[30px] font-bold text-tertiary-normal-default leading-[1.1] font-raleway tracking-tight">
              Discovering Ghana's Coastal Charm
            </h2>
            
            <p className="text-[16px] md:text-[18px] leading-relaxed text-[#555] max-w-[650px] font-medium opacity-80">
              From the historic shores of Cape Coast to the laid-back beaches of Busua, Ghana's coastline is a blend of beauty, 
              history, and adventure. Join us as we explore hidden seaside gems, local seafood spots, and the cultural 
              rhythms that make the coast truly unforgettable.
            </p>

            <div className="mt-4 flex justify-center md:justify-start">
              <button className="group flex items-center gap-3 w-fit px-10 py-4 rounded-full border-[1.5px] border-secondary-normal-default bg-[#f3e8f9] text-secondary-normal-default font-bold text-[15px] transition-all duration-300 hover:bg-secondary-normal-default hover:text-white shadow-sm hover:shadow-lg active:scale-95">
                Read Now
                <ArrowIcon />
              </button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-[#f3e8f9]/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-20px] left-[-20px] w-40 h-40 bg-[#f3e8f9]/30 rounded-full blur-3xl pointer-events-none" />
        </div>
      </div>
    </section>
  );
});

CoastalSection.displayName = "CoastalSection";

export default CoastalSection;
