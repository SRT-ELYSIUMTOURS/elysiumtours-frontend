import React from 'react';

const StatsSection = () => {
  return (
    <section className="bg-primary-light-default w-full py-[80px] px-6 xl:px-[157px]">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-[60px]">
        
        {/* Top Part: Text and Image on the same baseline row */}
        <div className="w-full flex flex-col md:flex-row md:items-baseline justify-between gap-10">
          
          {/* Left Text (Label) */}
          <div className="flex items-center gap-md shrink-0">
            <div className="w-[32px] h-[2px] bg-tertiary-normal-default"></div>
            <span className="text-[12px] font-bold text-tertiary-normal-default tracking-widest uppercase">
              DISCOVER GHANA LIKE NEVER BEFORE
            </span>
          </div>

          {/* Right Text & Image Area */}
          <div className="flex-1 flex flex-col items-end text-right gap-[40px]">
             {/* Main Paragraph */}
             <p className="text-[25px] font-medium leading-[36px] font-raleway text-primary-dark-active max-w-[800px]">
                <span className="text-secondary-normal-default font-semibold">
                  We create the best travel experience in Ghana from our featured tours to exclusive offers.
                </span>{" "}
                We are delighted in exploring iconic landmarks, hidden gems, and a mix of history, nature, and culture, all at a great value, inviting travelers to start their adventure.
             </p>

             {/* Image span */}
             <div className="w-full max-w-[795px] h-[386px] rounded-[32px] overflow-hidden">
               <img 
                 src="https://picsum.photos/seed/vintage-ghana/795/386" 
                 alt="Vintage Ghana Tourism" 
                 className="w-full h-full object-cover transition-all duration-700 hover:scale-105" 
               />
             </div>
          </div>
        </div>

        {/* Bottom Part: 4 Stats */}
        <div className="flex flex-wrap lg:grid lg:grid-cols-4 border-t border-secondary-light-active mt-[20px]">
          {/* Stat 1 */}
          <div className="w-1/2 lg:w-auto flex flex-col items-center justify-center text-center border-b border-r lg:border-b-0 border-secondary-light-active py-[40px]">
            <h3 className="text-[48px] font-bold text-secondary-normal-default mb-2 font-raleway tracking-tight">95%</h3>
            <p className="text-[14px] text-tertiary-normal-default font-medium">Satisfaction Rate</p>
          </div>
          {/* Stat 2 */}
          <div className="w-1/2 lg:w-auto flex flex-col items-center justify-center text-center border-b lg:border-b-0 lg:border-r border-secondary-light-active py-[40px]">
            <h3 className="text-[48px] font-bold text-secondary-normal-default mb-2 font-raleway tracking-tight">500<span className="text-[32px] align-top relative top-1">+</span></h3>
            <p className="text-[14px] text-tertiary-normal-default font-medium">Guided Tours Annually</p>
          </div>
          {/* Stat 3 */}
          <div className="w-1/2 lg:w-auto flex flex-col items-center justify-center text-center border-r border-secondary-light-active py-[40px]">
            <h3 className="text-[48px] font-bold text-secondary-normal-default mb-2 font-raleway tracking-tight">150<span className="text-[32px] align-top relative top-1">+</span></h3>
            <p className="text-[14px] text-tertiary-normal-default font-medium">Destinations</p>
          </div>
          {/* Stat 4 */}
          <div className="w-1/2 lg:w-auto flex flex-col items-center justify-center text-center py-[40px]">
            <h3 className="text-[48px] font-bold text-secondary-normal-default mb-2 font-raleway tracking-tight">100<span className="text-[32px] align-top relative top-1">+</span></h3>
            <p className="text-[14px] text-tertiary-normal-default font-medium">Verified Partners</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default StatsSection;
