import React from 'react';
import { Link } from 'react-router-dom';

const CTABannerSection = () => {
  return (
    <section className="w-full bg-[#1e0725]  px-6 xl:px-[157px] overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto min-h-[600px] grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        
        {/* Left Side: Elongated Overlapping Image Pills */}
        <div className="md:col-span-6 relative h-[650px] w-full flex items-center">
          {/* Top Pill - Flag (Higher & Tilted) */}
          <div className="absolute top-[-40px] left-[-40px] md:left-[-60px] w-[260px] md:w-[320px] h-[480px] md:h-[580px] rounded-full overflow-hidden rotate-15 z-10 border-10 border-[#1e0725] shadow-2xl">
            <img 
              src="https://picsum.photos/seed/ghana-flag-cta/600/1000" 
              alt="Ghanaian Flag" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Bottom Pill - Coastal (Lower & Right Shifted) */}
          <div className="absolute bottom-[-100px] left-[160px] md:left-[220px] w-[260px] md:w-[320px] h-[480px] md:h-[580px] rounded-full overflow-hidden rotate-15 border-10 border-[#1e0725] shadow-2xl">
            <img 
              src="https://picsum.photos/seed/ghana-coast-cta/600/1000" 
              alt="Ghanaian Coast" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side: CTA Text & Button Area */}
        <div className="md:col-span-6 flex flex-col items-end text-right gap-8">
          <h2 className="text-[36px] md:text-[52px] lg:text-[58px] font-bold text-white leading-[1.05] font-raleway tracking-tight">
            Join Elysium Tours in <br className="hidden lg:block"/> Redefining the Future <br className="hidden lg:block"/> of Ghanaian Travel
          </h2>
          
          <div className="flex flex-col items-end gap-10">
            <p className="text-[14px] md:text-[16px] text-white/80 leading-relaxed max-w-[480px] font-medium">
              Join Elysium Tours to showcase Ghana's beauty and culture. 
              Together, we'll create authentic journeys that inspire travelers and empower local communities.
            </p>
            
            <Link 
              to="/contact" 
              className="inline-block px-12 py-4 bg-white text-[#1e0725] text-[16px] font-bold rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white/90 active:scale-95"
            >
              Partner With Us
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CTABannerSection;
