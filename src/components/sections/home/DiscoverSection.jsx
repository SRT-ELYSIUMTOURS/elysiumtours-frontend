import React from "react";
import { classNames } from "../../../utils/classNames";
import { SectionHeadline } from "../../ui/SectionHeadline";
import { StatCounter } from "../../ui/StatCounter";

const STATS = [
  { value: "95%", label: "Satisfaction Rate" },
  { value: "500+", label: "Guided Tours Annually" },
  { value: "150+", label: "Destinations" },
  { value: "100+", label: "Featured Reviews" },
];

const DiscoverSection = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={classNames(
        "bg-primary-light-default py-16 md:py-20 lg:py-24",
        className
      )}
      {...props}
    >
      <div className="max-w-[1728px] mx-auto px-6 md:px-[30px] lg:px-[164px]">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-16 lg:justify-between mb-8 lg:mb-12">
          <div className="flex items-center justify-start h-fit gap-sm shrink-0">
            <div className="w-[46px] h-[2px] bg-secondary-dark-darker" />
            <span className=" text-med-small-bold text-secondary-dark-darker uppercase tracking-wide">
              Discover Ghana Like Never Before
            </span>
          </div>

          <div className="w-full lg:w-[795px]">
            <p className="font-raleway text-[16px] leading-[26px] lg:text-High-md-bold lg:leading-[34px] text-left">
              <span className="font-bold text-secondary-normal-hover">
                In collaboration with Elysium Tours and Achimota School, we are
                proud to celebrate the Motown Centenary.{" "}
              </span>
              <span className="font-medium text-primary-dark-active">
                We explore iconic landmarks, hidden gems, and a mix of history,
                nature, and culture at great value, inviting travelers to start
                their adventure.
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          <div className="w-full lg:w-auto lg:flex-1 " >
           <img src="./src/assets/Elysium+Achimota/LogoCombo.png" alt="" />
           </div>

          <div className="w-full relative lg:w-[795px] h-[250px] md:h-[386px] rounded-2xl overflow-hidden shadow-[--shadow-card]">
            <div className="bg-black/25 absolute w-full h-full" />
            <img
              src="./src/assets/Elysium+Achimota/DiscoverImg.jpg"
              alt="Ghana discovery"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mt-12 lg:mt-12">
          <StatCounter stats={STATS} />
        </div>
      </div>
    </section>
  );
});

DiscoverSection.displayName = "DiscoverSection";

export default DiscoverSection;
