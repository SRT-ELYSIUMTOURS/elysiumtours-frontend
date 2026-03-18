import React from "react";
import { classNames } from "../../../utils/classNames";
import Button from "../../ui/button";

// Figma: Ghana country page — "Ghana Local Guides" section
// bg: secondary-dark-darker (deep purple #2b0f43)
// 3-4 guide cards side-by-side
// Each guide card: portrait image + name + location + languages + rating

const StarIcon = () => (
  <svg width="12" height="11" viewBox="0 0 11 10" fill="none">
    <path d="M4.10607 0.690968C4.40542 -0.230343 5.70883 -0.230344 6.00819 0.690967L6.51647 2.25531C6.65034 2.66733 7.0343 2.94629 7.46753 2.94629H9.11237C10.0811 2.94629 10.4839 4.1859 9.70015 4.75531L8.36945 5.72212C8.01896 5.97676 7.8723 6.42813 8.00618 6.84015L8.51446 8.40449C8.81381 9.3258 7.75933 10.0919 6.97562 9.52253L5.64491 8.55571C5.29443 8.30107 4.81983 8.30107 4.46934 8.55571L3.13864 9.52253C2.35492 10.0919 1.30044 9.3258 1.5998 8.40449L2.10808 6.84015C2.24195 6.42813 2.0953 5.97676 1.74481 5.72212L0.414104 4.75531C-0.369609 4.18591 0.0331654 2.94629 1.00189 2.94629H2.64673C3.07996 2.94629 3.46391 2.66733 3.59779 2.25531L4.10607 0.690968Z" fill="#7B2CBF"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 7.875C8.036 7.875 8.875 7.036 8.875 6C8.875 4.964 8.036 4.125 7 4.125C5.964 4.125 5.125 4.964 5.125 6C5.125 7.036 5.964 7.875 7 7.875Z" stroke="#d6beeb" strokeWidth="1.2"/>
    <path d="M7 1C4.515 1 2.5 2.953 2.5 5.33C2.5 8.5 7 13 7 13C7 13 11.5 8.5 11.5 5.33C11.5 2.953 9.485 1 7 1Z" stroke="#d6beeb" strokeWidth="1.2"/>
  </svg>
);

const GUIDES = [
  {
    id: 1,
    name: "Kwame Asante",
    location: "Accra, Ghana",
    languages: "Twi | English | Ga",
    rating: 4.9,
    reviews: 124,
    image: "https://picsum.photos/seed/guide-1/280/280",
    speciality: "Heritage & Culture",
  },
  {
    id: 2,
    name: "Akosua Mensah",
    location: "Cape Coast, Ghana",
    languages: "Fante | English",
    rating: 4.8,
    reviews: 98,
    image: "https://picsum.photos/seed/guide-2/280/280",
    speciality: "Coastal Tours",
  },
  {
    id: 3,
    name: "Kofi Boateng",
    location: "Kumasi, Ghana",
    languages: "Twi | English | French",
    rating: 4.9,
    reviews: 156,
    image: "https://picsum.photos/seed/guide-3/280/280",
    speciality: "Cultural Immersion",
  },
  {
    id: 4,
    name: "Ama Osei",
    location: "Volta Region, Ghana",
    languages: "Ewe | English",
    rating: 4.7,
    reviews: 87,
    image: "https://picsum.photos/seed/guide-4/280/280",
    speciality: "Nature & Adventure",
  },
];

const GuideCard = ({ guide }) => (
  <div className="flex flex-col gap-[16px] bg-secondary-dark-active rounded-[20px] overflow-hidden p-[20px] w-[331px]">
    {/* Portrait image */}
    <div className="relative w-full h-[280px] rounded-[12px] overflow-hidden">
      <img
        src={guide.image}
        alt={guide.name}
        className="w-full h-full object-cover"
      />
    </div>

    {/* Info */}
    <div className="flex flex-col gap-[8px]">
      <h3 className="font-raleway font-bold text-[20px] leading-[28px] text-primary-light-default">
        {guide.name}
      </h3>

      <div className="flex items-center gap-[6px]">
        <MapPinIcon />
        <span className="font-raleway font-medium text-[13px] leading-[18px] text-secondary-light-active">
          {guide.location}
        </span>
      </div>

      <div className="flex flex-col gap-[4px]">
        <span className="font-raleway font-medium text-[13px] leading-[18px] text-primary-dark-default">
          Languages: <span className="text-secondary-light-active">{guide.languages}</span>
        </span>
        <span className="font-raleway font-medium text-[13px] leading-[18px] text-primary-dark-default">
          Speciality: <span className="text-secondary-light-active">{guide.speciality}</span>
        </span>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-[6px] mt-[4px]">
        <div className="flex items-center gap-[2px]">
          {[1, 2, 3, 4, 5].map((s) => (
            <StarIcon key={s} />
          ))}
        </div>
        <span className="font-raleway font-semibold text-[13px] text-secondary-light-active">
          {guide.rating}
        </span>
        <span className="font-raleway font-normal text-[13px] text-primary-dark-hover">
          ({guide.reviews} reviews)
        </span>
      </div>
    </div>
  </div>
);

const LocalGuidesSection = React.forwardRef(({ country = "Ghana", className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={classNames("w-full bg-secondary-dark-darker py-[80px]", className)}
      {...props}
    >
      <div className="px-[156px]">
        {/* Header */}
        <div className="flex items-start justify-between w-full mb-[60px]">
          <div className="flex items-center gap-[8px] shrink-0">
            <div className="w-[46px] h-[1px] bg-secondary-light-active" />
            <span className="font-raleway font-bold text-[13px] leading-[18px] text-secondary-light-active whitespace-nowrap tracking-[0.05em] uppercase">
              {country} Local Guides
            </span>
          </div>

          <div className="flex flex-col gap-md items-end w-[597px]">
            <h2 className="font-raleway font-bold text-[25px] leading-[34px] text-primary-light-default text-right">
              Meet Your {country} Guides
            </h2>
            <p className="font-raleway font-normal text-[16px] leading-[24px] text-primary-dark-default text-right w-[565px]">
              Our local guides are passionate storytellers and cultural ambassadors who bring {country} to life. Each guide is carefully selected for their expertise, language skills, and dedication to providing authentic experiences.
            </p>
            <Button
              variant="secondaryOutline"
              shape="pill"
              size="small"
              className="h-[32px] gap-[9px] rounded-xl border-secondary-light-active text-secondary-light-active"
            >
              View All Guides
            </Button>
          </div>
        </div>

        {/* Guide cards — 4-col layout */}
        <div className="flex items-start gap-[8px]">
          {GUIDES.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </div>
    </section>
  );
});

LocalGuidesSection.displayName = "LocalGuidesSection";
export default LocalGuidesSection;
