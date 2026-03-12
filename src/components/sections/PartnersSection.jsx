import React from 'react';
import { Link } from 'react-router-dom';
import PartnerHighlightCard from '../cards/PartnerHighlightCard';

const PARTNERS = [
  { id: 1, category: "Accommodation", image: "https://picsum.photos/seed/partner1/451/656" },
  { id: 2, category: "Tours & Rides", image: "https://picsum.photos/seed/partner2/451/656" },
  { id: 3, category: "Dining", image: "https://picsum.photos/seed/partner3/451/656" }
];

const PartnersSection = () => {
  return (
    <section className="bg-primary-light-default w-full py-[80px] px-6 xl:px-[157px]">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-[40px]">
        
        {/* Header Row: Label and Title on the same baseline */}
        <div className="w-full flex flex-col md:flex-row md:items-baseline justify-between gap-10">
          {/* Left: OUR PARTNERS Label */}
          <div className="flex items-center gap-[12px] shrink-0">
            <div className="w-[32px] h-[2px] bg-tertiary-normal-default"></div>
            <span className="text-[12px] font-bold text-tertiary-normal-default tracking-widest uppercase">
              OUR PARTNERS
            </span>
          </div>

          {/* Right: Main Headline & Paragraph Area */}
          <div className="flex-1 flex flex-col items-end text-right gap-md">
            <h2 className="text-[25px] font-bold text-tertiary-normal-default leading-[1.2] font-raleway md:whitespace-nowrap">
              Trusted Partners, Unforgettable Journeys
            </h2>
            <p className="text-[15px] text-tertiary-normal-default leading-relaxed max-w-[580px]">
              Elysium offers an unparalleled experience to any traveler. Over the years, we've partnered with the best companies around Ghana to provide premium support in every vertical.
            </p>
            <Link to="/tour-partners" className="inline-flex items-center justify-center px-[20px] py-[10px] rounded-full border border-secondary-normal-default text-[13px] text-secondary-normal-default font-semibold hover:bg-secondary-normal-default hover:text-white transition-colors">
              Explore Partners
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="ml-2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] w-full mt-[24px]">
          {PARTNERS.map(partner => (
            <PartnerHighlightCard 
              key={partner.id}
              category={partner.category}
              image={partner.image}
              className="w-full flex-1"
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default PartnersSection;
