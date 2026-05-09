import React from "react";
import { classNames } from "../../../utils/classNames";
import Button from "../../ui/button";

// Figma: Ghana country page — "A Country That Holds Its Visitors" section
// "A TRIP. A NARRATIVE" label left / title right
// Below: large image left (Kwame Asante card) + text content right

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.33325 6.25C1.91904 6.25 1.58325 6.58579 1.58325 7C1.58325 7.41421 1.91904 7.75 2.33325 7.75V7V6.25ZM11.6666 7.75C12.0808 7.75 12.4166 7.41421 12.4166 7C12.4166 6.58579 12.0808 6.25 11.6666 6.25V7V7.75ZM9.86121 3.55068C9.56701 3.2591 9.09214 3.26122 8.80056 3.55542C8.50898 3.84961 8.5111 4.32448 8.80529 4.61606L9.33325 4.08337L9.86121 3.55068ZM2.33325 7.75H11.6666V6.25H2.33325V7.75ZM8.80529 4.61606L9.83369 5.63533L10.8896 4.56995L9.86121 3.55068L8.80529 4.61606ZM9.83369 8.36475L8.80529 9.38402L9.86121 10.4494L10.8896 9.43014L9.83369 8.36475ZM9.83369 5.63533C10.2563 6.05416 10.5274 6.32448 10.7074 6.54863C10.8779 6.76094 10.9041 6.85793 10.911 6.91209L12.399 6.72243C12.3427 6.28124 12.1323 5.92733 11.877 5.60938C11.6311 5.30327 11.2871 4.96395 10.8896 4.56995L9.83369 5.63533ZM10.911 7.08799C10.9041 7.14215 10.8779 7.23914 10.7074 7.45145C10.5274 7.6756 10.2563 7.94592 9.83369 8.36475L10.8896 9.43014C11.2871 9.03613 11.6311 8.69681 11.877 8.3907C12.1323 8.07275 12.3427 7.71885 12.399 7.27765L10.911 7.08799ZM10.911 6.91209C10.9184 6.9705 10.9184 7.02958 10.911 7.08799L12.399 7.27765C12.4225 7.09331 12.4225 6.90677 12.399 6.72243L10.911 6.91209Z" fill="#7B2CBF"/>
  </svg>
);

const COUNTRY_STORIES = {
  ghana: {
    title: "A Country That Holds Its Visitors",
    subtitle: "Ghana leaves no visitor unchanged. From the doors of its historic forts to the warmth of its people, every corner tells a story.",
    imageCaption: "Elmina Castle, Cape Coast",
    imagePerson: "Kwame Asante, Heritage Guide",
    image: "https://picsum.photos/seed/ghana-story/711/559",
    bodyText: "Ghana is more than a destination — it's an experience that stays with you long after you return home. The country's layered history, vibrant culture, and extraordinary landscapes create a journey unlike any other. Our tours are crafted to immerse you in the authentic Ghana — from the rolling hills of the Volta Region to the historic coastal towns of the Central Region.",
  },
  nigeria: {
    title: "A Nation of Stories, Strength & Soul",
    subtitle: "Nigeria captivates every visitor. From the ancient walls of Kano to the festival energy of Lagos, the country's pulse is unlike anywhere else.",
    imageCaption: "Olumo Rock, Abeokuta",
    imagePerson: "Emeka Okafor, Cultural Guide",
    image: "https://picsum.photos/seed/nigeria-story/711/559",
    bodyText: "Nigeria is a land of extraordinary contrasts and remarkable depth. Home to over 250 ethnic groups, the country's cultural tapestry is woven with centuries of tradition, art, music, and resilience. Our tours guide you through the bustling markets of Lagos, the historic palaces of Benin, the serene landscapes of Cross River, and the spiritual heartlands of Osun-Osogbo — each journey revealing a new facet of this incredible nation.",
  },
  default: {
    title: "A Destination That Stays With You",
    subtitle: "Every destination tells a story. Let us take you on a journey through landscapes, culture and history.",
    imageCaption: "Local landmark",
    imagePerson: "Your local guide",
    image: "https://picsum.photos/seed/country-story/711/559",
    bodyText: "Our carefully crafted tours are designed to immerse you in the authentic culture, history, and natural beauty of this destination. With expert local guides and personalized itineraries, every journey is seamless, enriching, and unforgettable.",
  },
};

const CountryStorySection = React.forwardRef(({ country = "ghana", className, ...props }, ref) => {
  const config = COUNTRY_STORIES[country?.toLowerCase()] || { ...COUNTRY_STORIES.default, title: `Discover ${country}` };

  return (
    <section
      ref={ref}
      className={classNames("w-full bg-secondary-light-default py-[80px]", className)}
      {...props}
    >
      <div className="px-6 md:px-[30px] lg:px-[156px]">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full mb-[32px] lg:mb-[60px] gap-4">
          <div className="flex items-center gap-[8px] shrink-0">
            <div className="w-[46px] h-[1px] bg-secondary-dark-darker" />
            <span className="font-raleway font-bold text-[13px] leading-[18px] text-secondary-dark-darker whitespace-nowrap tracking-[0.05em] uppercase">
              A Trip. A Narrative
            </span>
          </div>

          <div className="flex flex-col gap-md items-center lg:items-end w-full lg:max-w-[677px]">
            <h2 className="font-raleway font-bold text-[25px] leading-[34px] text-tertiary-normal-default text-center lg:text-right lg:pl-[80px]">
              {config.title}
            </h2>
            <p className="font-raleway font-normal text-[16px] leading-[24px] text-tertiary-normal-default text-center lg:text-right lg:pl-[111px]">
              {config.subtitle}
            </p>
          </div>
        </div>

        {/* Split layout: image left + text right */}
        <div className="flex flex-col lg:flex-row items-stretch gap-[24px] lg:gap-[32px]">
          {/* Left: large image with caption card */}
          <div className="relative w-full lg:w-[711px] shrink-0 rounded-2xl overflow-hidden h-[280px] md:h-[400px] lg:h-[559px]">
            <img
              src={config.image}
              alt={config.title}
              className="w-full h-full object-cover"
            />
            {/* Caption card at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-[24px] bg-gradient-to-t from-black/70 to-transparent">
              <p className="font-raleway font-semibold text-[16px] leading-[22px] text-primary-light-default">
                {config.imageCaption}
              </p>
              <p className="font-raleway font-normal text-[13px] leading-[18px] text-primary-dark-default mt-[4px]">
                {config.imagePerson}
              </p>
            </div>
          </div>

          {/* Right: text content */}
          <div className="flex flex-col justify-center gap-[24px] flex-1">
            <h3 className="font-raleway font-bold text-[31px] leading-[42px] text-tertiary-normal-default">
              {config.title}
            </h3>
            <p className="font-raleway font-normal text-[16px] leading-[26px] text-primary-dark-darker">
              {config.bodyText}
            </p>
            <Button
              variant="secondary"
              shape="pill"
              className="h-[56px] gap-md self-start"
              endIcon={<ArrowIcon />}
            >
              Read More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});

CountryStorySection.displayName = "CountryStorySection";
export default CountryStorySection;
