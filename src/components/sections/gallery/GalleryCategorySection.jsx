import React from "react";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/classNames";
import ExploreMoreArrowIcon from "../../icons/ExploreMoreArrowIcon";
import GalleryPhotoCard from "../../cards/GalleryPhotoCard";
import GalleryBecomePartSection from "./GalleryBecomePartSection";

// Gallery Category Section — all 7 category sections for the gallery main page
// Each section follows: LEFT eyebrow + RIGHT title/desc/Explore More button
// Layout differs per category (Videos = 3 equal cols, Destinations = bento, etc.)
// Figma nodes: 616:6236 (Videos tab), plus other tab variants

// ─── Shared SVG icons ────────────────────────────────────────────────────────

// Large play circle icon (52px) used on video cards in the gallery Videos section
const PlayCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
  <path d="M26 5.19922C24.6081 5.20095 23.2561 5.33269 21.944 5.59442C21.6114 5.6667 21.3205 5.86652 21.1336 6.15096C20.9467 6.4354 20.8788 6.78178 20.9445 7.11571C21.0102 7.44965 21.2043 7.7445 21.485 7.93696C21.7657 8.12941 22.1106 8.20411 22.4458 8.14502C24.7922 7.6778 27.2078 7.6778 29.5542 8.14502C29.8852 8.19542 30.2229 8.11617 30.4969 7.92379C30.7709 7.7314 30.9601 7.44072 31.0251 7.11228C31.0902 6.78385 31.026 6.44299 30.8459 6.16072C30.6659 5.87845 30.3838 5.67653 30.0586 5.59702C28.722 5.3318 27.3626 5.19856 26 5.19922ZM37.557 8.70402C37.2709 8.5302 36.9287 8.47347 36.6017 8.54567C36.2748 8.61786 35.9883 8.81341 35.802 9.09157C35.6157 9.36974 35.5438 9.70907 35.6015 10.0389C35.6591 10.3687 35.8418 10.6635 36.1114 10.862C38.0998 12.191 39.8067 13.8988 41.1346 15.8878C41.2281 16.0329 41.3495 16.158 41.4919 16.2557C41.6342 16.3534 41.7945 16.4217 41.9636 16.4568C42.1326 16.4918 42.3069 16.4928 42.4763 16.4598C42.6458 16.4267 42.8069 16.3603 42.9504 16.2643C43.0939 16.1683 43.2168 16.0447 43.312 15.9007C43.4072 15.7567 43.4727 15.5952 43.5048 15.4255C43.5369 15.2559 43.5349 15.0816 43.4989 14.9128C43.4629 14.744 43.3937 14.584 43.2952 14.4422C41.7778 12.1713 39.8279 10.2215 37.557 8.70402ZM15.8886 10.862C16.0387 10.7709 16.1687 10.6503 16.2709 10.5075C16.373 10.3647 16.4452 10.2027 16.4831 10.0313C16.5209 9.85984 16.5237 9.68251 16.4911 9.50998C16.4586 9.33746 16.3914 9.17331 16.2937 9.02745C16.196 8.88158 16.0698 8.75702 15.9226 8.66127C15.7754 8.56553 15.6104 8.50059 15.4375 8.47036C15.2645 8.44014 15.0872 8.44526 14.9163 8.48542C14.7454 8.52558 14.5844 8.59994 14.443 8.70402C12.1721 10.2215 10.2222 12.1713 8.70481 14.4422C8.60073 14.5836 8.52636 14.7446 8.48621 14.9155C8.44605 15.0865 8.44093 15.2637 8.47115 15.4367C8.50137 15.6096 8.56632 15.7747 8.66206 15.9218C8.75781 16.069 8.88237 16.1952 9.02823 16.2929C9.1741 16.3907 9.33824 16.4578 9.51077 16.4904C9.6833 16.5229 9.86063 16.5202 10.0321 16.4823C10.2035 16.4444 10.3655 16.3723 10.5083 16.2701C10.6511 16.1679 10.7717 16.0379 10.8628 15.8878C12.1918 13.8995 13.8996 12.1899 15.8886 10.862ZM8.14581 22.4476C8.1962 22.1166 8.11696 21.779 7.92457 21.5049C7.73219 21.2309 7.4415 21.0417 7.11307 20.9767C6.78463 20.9117 6.44378 20.9759 6.16151 21.1559C5.87924 21.336 5.67732 21.618 5.59781 21.9432C5.06473 24.6227 5.06473 27.3809 5.59781 30.0604C5.67732 30.3857 5.87924 30.6677 6.16151 30.8477C6.44378 31.0278 6.78463 31.092 7.11307 31.027C7.4415 30.9619 7.73219 30.7727 7.92457 30.4987C8.11696 30.2247 8.1962 29.887 8.14581 29.556C7.67859 27.2096 7.67859 24.7941 8.14581 22.4476ZM46.4048 21.9432C46.3719 21.7755 46.3063 21.6159 46.2117 21.4736C46.1171 21.3312 45.9954 21.209 45.8534 21.1137C45.7115 21.0185 45.5522 20.9522 45.3847 20.9186C45.2171 20.885 45.0445 20.8848 44.8769 20.9179C44.7092 20.9511 44.5497 21.017 44.4076 21.1118C44.2654 21.2067 44.1433 21.3286 44.0483 21.4707C43.9534 21.6128 43.8873 21.7722 43.854 21.9398C43.8207 22.1075 43.8208 22.28 43.8542 22.4476C44.3214 24.7941 44.3214 27.2096 43.8542 29.556C43.8125 29.7266 43.8058 29.9038 43.8345 30.077C43.8631 30.2502 43.9266 30.4158 44.021 30.5638C44.1154 30.7119 44.2388 30.8392 44.3838 30.9382C44.5288 31.0373 44.6923 31.1059 44.8646 31.14C45.0368 31.1741 45.2141 31.1729 45.3859 31.1366C45.5577 31.1003 45.7203 31.0296 45.864 30.9287C46.0077 30.8278 46.1295 30.6989 46.222 30.5496C46.3145 30.4004 46.3758 30.234 46.4022 30.0604C46.9353 27.3809 46.9379 24.6227 46.4048 21.9432ZM10.8602 36.1132C10.7691 35.9632 10.6485 35.8331 10.5057 35.731C10.3629 35.6288 10.2009 35.5566 10.0295 35.5187C9.85803 35.4809 9.6807 35.4781 9.50817 35.5107C9.33564 35.5432 9.1715 35.6104 9.02563 35.7081C8.87977 35.8058 8.75521 35.9321 8.65946 36.0792C8.56372 36.2264 8.49877 36.3914 8.46855 36.5644C8.43833 36.7373 8.44345 36.9146 8.48361 37.0855C8.52376 37.2564 8.59813 37.4174 8.70221 37.5588C10.2196 39.8297 12.1695 41.7796 14.4404 43.297C14.5818 43.4011 14.7428 43.4755 14.9137 43.5156C15.0846 43.5558 15.2619 43.5609 15.4349 43.5307C15.6078 43.5005 15.7728 43.4355 15.92 43.3398C16.0672 43.244 16.1934 43.1195 16.2911 42.9736C16.3888 42.8277 16.456 42.6636 16.4885 42.4911C16.5211 42.3185 16.5183 42.1412 16.4805 41.9698C16.4426 41.7983 16.3704 41.6363 16.2683 41.4936C16.1661 41.3508 16.0361 41.2302 15.886 41.139C13.8977 39.8101 12.1881 38.1023 10.8602 36.1132ZM43.2952 37.5588C43.469 37.2727 43.5258 36.9305 43.4536 36.6036C43.3814 36.2766 43.1858 35.9902 42.9077 35.8038C42.6295 35.6175 42.2902 35.5457 41.9604 35.6033C41.6305 35.6609 41.3357 35.8436 41.1372 36.1132C39.8082 38.1016 38.1004 39.8085 36.1114 41.1364C35.9663 41.2299 35.8412 41.3513 35.7436 41.4937C35.6459 41.636 35.5775 41.7964 35.5425 41.9654C35.5074 42.1344 35.5064 42.3087 35.5394 42.4782C35.5725 42.6476 35.6389 42.8087 35.7349 42.9522C35.8309 43.0957 35.9545 43.2186 36.0985 43.3138C36.2425 43.409 36.4041 43.4745 36.5737 43.5066C36.7433 43.5387 36.9176 43.5367 37.0864 43.5007C37.2553 43.4648 37.4152 43.3955 37.557 43.297C39.8279 41.7796 41.7778 39.8297 43.2952 37.5588ZM22.4458 43.856C22.2753 43.8143 22.098 43.8076 21.9248 43.8363C21.7516 43.8649 21.586 43.9284 21.438 44.0228C21.29 44.1172 21.1626 44.2407 21.0636 44.3856C20.9646 44.5306 20.8959 44.6942 20.8618 44.8664C20.8277 45.0386 20.8289 45.216 20.8652 45.3877C20.9015 45.5595 20.9723 45.7221 21.0731 45.8658C21.174 46.0095 21.303 46.1313 21.4522 46.2238C21.6014 46.3163 21.7678 46.3776 21.9414 46.404C24.6209 46.9371 27.3791 46.9371 30.0586 46.404C30.3838 46.3245 30.6659 46.1226 30.8459 45.8403C31.026 45.5581 31.0902 45.2172 31.0251 44.8888C30.9601 44.5603 30.7709 44.2696 30.4969 44.0773C30.2229 43.8849 29.8852 43.8056 29.5542 43.856C27.2078 44.3232 24.7922 44.3232 22.4458 43.856ZM41.6 25.9992C41.6 30.1366 39.9564 34.1045 37.0309 37.0301C34.1053 39.9557 30.1374 41.5992 26 41.5992C21.8626 41.5992 17.8947 39.9557 14.9691 37.0301C12.0436 34.1045 10.4 30.1366 10.4 25.9992C10.4 21.8618 12.0436 17.8939 14.9691 14.9684C17.8947 12.0428 21.8626 10.3992 26 10.3992C30.1374 10.3992 34.1053 12.0428 37.0309 14.9684C39.9564 17.8939 41.6 21.8618 41.6 25.9992ZM23.725 18.6776C23.4285 18.5064 23.0921 18.4163 22.7497 18.4164C22.4073 18.4164 22.0709 18.5066 21.7745 18.6779C21.478 18.8492 21.2318 19.0956 21.0608 19.3922C20.8897 19.6888 20.7998 20.0252 20.8 20.3676V31.6334C20.7998 31.9758 20.8897 32.3122 21.0608 32.6089C21.2318 32.9055 21.478 33.1518 21.7745 33.3231C22.0709 33.4944 22.4073 33.5846 22.7497 33.5847C23.0921 33.5847 23.4285 33.4946 23.725 33.3234L34.45 27.125C34.6476 27.0109 34.8117 26.8468 34.9258 26.6492C35.0399 26.4516 35.0999 26.2274 35.0999 25.9992C35.0999 25.771 35.0399 25.5469 34.9258 25.3493C34.8117 25.1516 34.6476 24.9875 34.45 24.8734L23.725 18.6776Z" fill="#F2EAF9"/>
</svg>
);

// ─── Explore More pill button (matches PartnerCategorySection) ────────────────

const ExploreButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className={classNames(
      "flex items-center gap-[9px] h-[32px] px-[10px]",
      "border-[0.8px] border-solid border-secondary-normal-default",
      "rounded-[40px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)]",
      "font-raleway font-semibold text-[13px] leading-[18px] text-secondary-normal-default",
      "hover:bg-secondary-light-default transition-all duration-300 ease-in cursor-pointer",
      "bg-transparent"
    )}
  >
    Explore More
    <ExploreMoreArrowIcon />
  </button>
);

// ─── Section header (eyebrow left + title/desc/button right) ─────────────────

const SectionHeader = ({ label, title, description, onExplore }) => (
  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between w-full mb-8 lg:mb-[48px] gap-4 lg:gap-0">
    {/* Left — eyebrow */}
    <div className="flex items-center gap-[8px] pt-[10px]">
      <div className="w-[46px] h-px shrink-0 bg-secondary-dark-darker" />
      <span className="font-raleway font-bold text-[13px] leading-[18px] text-secondary-dark-darker uppercase tracking-[0.05em]">
        {label}
      </span>
    </div>
    {/* Right — title + description + button */}
    <div className="flex flex-col gap-[16px] items-start lg:items-end w-full lg:w-[677px]">
      <h2 className="font-raleway font-bold text-[20px] md:text-[25px] leading-[34px] text-[#2d2d2d] text-left lg:text-right w-full lg:w-[630px]">
        {title}
      </h2>
      <p className="font-raleway font-normal text-[14px] md:text-[16px] leading-[24px] text-[#2d2d2d] text-left lg:text-right w-full lg:w-[565px]">
        {description}
      </p>
      <ExploreButton onClick={onExplore} />
    </div>
  </div>
);

// ─── Category data ────────────────────────────────────────────────────────────

const CATEGORY_DATA = {
  destinations: {
    label: "DESTINATIONS",
    bg: "bg-primary-light-default",
    title: "Where Will Your Next Adventure Take You?",
    description: "Explore iconic destinations across Ghana and West Africa — from historic castles and lush national parks to vibrant cities and serene beaches. Each photo captures the spirit of a place waiting to be discovered.",
    cards: [
      { id: 1, image: "https://picsum.photos/seed/dest-a/335/663", title: "Cape Coast", count: "42 Photos", size: "large" },
      { id: 2, image: "https://picsum.photos/seed/dest-b/338/568", title: "Kakum Park", count: "28 Photos", size: "medium" },
      { id: 3, image: "https://picsum.photos/seed/dest-c/162/197", title: "Elmina", count: "19 Photos", size: "small" },
      { id: 4, image: "https://picsum.photos/seed/dest-d/162/197", title: "Mole", count: "24 Photos", size: "small" },
      { id: 5, image: "https://picsum.photos/seed/dest-e/335/663", title: "Accra", count: "56 Photos", size: "large" },
      { id: 6, image: "https://picsum.photos/seed/dest-f/162/197", title: "Volta", count: "31 Photos", size: "small" },
      { id: 7, image: "https://picsum.photos/seed/dest-g/162/197", title: "Kumasi", count: "37 Photos", size: "small" },
      { id: 8, image: "https://picsum.photos/seed/dest-h/338/568", title: "Ada Foah", count: "22 Photos", size: "medium" },
    ],
  },
  activities: {
    label: "ACTIVITIES",
    bg: "bg-secondary-light-default",
    title: "Exciting Activities for Every Kind of Traveler",
    description: "From thrilling canopy walks and surfing to cultural drumming and guided tours, Ghana offers activities that energize every explorer. Browse real moments captured during our most unforgettable tours.",
    cards: [
      { id: 1, image: "https://picsum.photos/seed/act-a/335/568", title: "Canopy Walk", count: "18 Photos", size: "medium" },
      { id: 2, image: "https://picsum.photos/seed/act-b/335/568", title: "Surfing", count: "25 Photos", size: "medium" },
      { id: 3, image: "https://picsum.photos/seed/act-c/335/568", title: "Drumming", count: "14 Photos", size: "medium" },
      { id: 4, image: "https://picsum.photos/seed/act-d/335/568", title: "Boat Tours", count: "32 Photos", size: "medium" },
      { id: 5, image: "https://picsum.photos/seed/act-e/335/568", title: "Safari", count: "44 Photos", size: "medium" },
      { id: 6, image: "https://picsum.photos/seed/act-f/335/568", title: "Cooking", count: "11 Photos", size: "medium" },
    ],
  },
  nature: {
    label: "NATURE",
    bg: "bg-primary-light-default",
    title: "Ghana's Breathtaking Natural Wonders",
    description: "Lush rainforests, golden savannahs, cascading waterfalls, and pristine coastlines — Ghana's natural beauty is truly awe-inspiring. These photos capture the country's diverse ecosystems in their full glory.",
    // Grid order (column-major): col1 top+bottom, col2 ×3, col3 top+bottom — see NatureGrid
    cards: [
      { id: 1, image: "https://picsum.photos/seed/nat-c1t/457/419", title: "Boti Falls", count: "28 Photos", size: "medium" },
      { id: 2, image: "https://picsum.photos/seed/nat-c1b/457/734", title: "Wli Falls", count: "22 Photos", size: "large" },
      { id: 3, image: "https://picsum.photos/seed/nat-c2t/458/392", title: "Kakum Forest", count: "35 Photos", size: "medium" },
      { id: 4, image: "https://picsum.photos/seed/nat-c2m/458/392", title: "Mole National Park", count: "19 Photos", size: "medium" },
      { id: 5, image: "https://picsum.photos/seed/nat-c2b/458/392", title: "Shai Hills", count: "24 Photos", size: "medium" },
      { id: 6, image: "https://picsum.photos/seed/nat-c3t/463/433", title: "Lake Bosumtwi", count: "31 Photos", size: "medium" },
      { id: 7, image: "https://picsum.photos/seed/nat-c3b/458/734", title: "Bui National Park", count: "18 Photos", size: "large" },
    ],
  },
  culture: {
    label: "CULTURE",
    bg: "bg-secondary-light-default",
    title: "Rich Traditions, Vibrant Celebrations",
    description: "Experience the colors, rhythms, and stories of Ghanaian culture — from royal durbars and kente weaving to vibrant festivals and traditional ceremonies. Culture is at the heart of every Ghanaian experience.",
    // CultureGrid order: col1 tall, col2×2 stack, col3 tall, col4×2 stack — see CultureGrid
    cards: [
      { id: 1, image: "https://picsum.photos/seed/cul-t1/340/653", title: "Traditional Dance", count: "29 Photos", size: "large" },
      { id: 2, image: "https://picsum.photos/seed/cul-s2a/341/364", title: "Kente Weaving", count: "33 Photos", size: "medium" },
      { id: 3, image: "https://picsum.photos/seed/cul-s2b/341/364", title: "Festivals", count: "47 Photos", size: "medium" },
      { id: 4, image: "https://picsum.photos/seed/cul-t2/340/653", title: "Royal Durbars", count: "21 Photos", size: "large" },
      { id: 5, image: "https://picsum.photos/seed/cul-s4a/341/364", title: "Markets", count: "38 Photos", size: "medium" },
      { id: 6, image: "https://picsum.photos/seed/cul-s4b/341/364", title: "Craft & Artisans", count: "15 Photos", size: "medium" },
    ],
  },
  videos: {
    label: "VIDEOS",
    bg: "bg-secondary-light-default",
    title: "See Ghana Through Real Traveler Stories",
    description: "Watch captivating short videos showcasing real moments from tours across Ghana — the landscapes, cultures, food, and excitement that make each experience unique. Feel the energy of the journey before you even set foot on the road.",
    cards: [
      { id: 1, image: "https://picsum.photos/seed/vid-a/451/364", title: "Destinations", count: "28 Videos" },
      { id: 2, image: "https://picsum.photos/seed/vid-b/451/364", title: "Activities", count: "28 Videos" },
      { id: 3, image: "https://picsum.photos/seed/vid-c/451/364", title: "Nature", count: "28 Videos" },
    ],
  },
  partners: {
    label: "PARTNERS",
    bg: "bg-primary-light-default",
    title: "Trusted Partners for Smooth Travel",
    description: "We collaborate with reliable local tour operators, hotels, guides, and transport providers to ensure every traveler enjoys quality service and safe, well-planned adventures.",
    // PartnersGrid order: col1 stack (341), col2 tall (340), col3 wide stack (691) — see PartnersGrid
    cards: [
      { id: 1, image: "https://picsum.photos/seed/par-hotel-t/341/426", title: "Hotels", count: "24 Photos", size: "medium" },
      { id: 2, image: "https://picsum.photos/seed/par-hotel-b/341/309", title: "Hotels", count: "18 Photos", size: "medium" },
      { id: 3, image: "https://picsum.photos/seed/par-trans/340/743", title: "Transportation", count: "15 Photos", size: "large" },
      { id: 4, image: "https://picsum.photos/seed/par-tour/691/319", title: "Tour Partners", count: "28 Photos", size: "medium" },
      { id: 5, image: "https://picsum.photos/seed/par-rest/691/319", title: "Restaurants", count: "32 Photos", size: "medium" },
    ],
  },
  "captured-by-you": {
    label: "CAPTURED BY YOU",
    bg: "bg-secondary-light-default",
    title: "Your Lens, Your Story",
    description: "These are your moments — photos submitted by travelers just like you who fell in love with Ghana. Upload your own travel photos and become part of our growing community gallery.",
    // CapturedByYouGrid order: Nature | Destinations+Activities | Tour Partners | Culture — see CapturedByYouGrid
    cards: [
      { id: 1, image: "https://picsum.photos/seed/cap-nat/366/743", title: "Nature", count: "28 Photos", size: "large" },
      { id: 2, image: "https://picsum.photos/seed/cap-dest/357/319", title: "Destinations", count: "28 Photos", size: "medium" },
      { id: 3, image: "https://picsum.photos/seed/cap-act/357/319", title: "Activities", count: "28 Photos", size: "medium" },
      { id: 4, image: "https://picsum.photos/seed/cap-tour/314/658", title: "Tour Partners", count: "28 Photos", size: "medium" },
      { id: 5, image: "https://picsum.photos/seed/cap-cult/314/658", title: "Culture", count: "28 Photos", size: "medium" },
    ],
  },
};

const OVERVIEW_ORDER = [
  "destinations",
  "activities",
  "nature",
  "culture",
  "videos",
  "partners",
  "captured-by-you",
];

// ─── Videos section card row (3 equal flex-1 cards with play icons) ───────────

const VideosSectionCards = ({ cards, navigate, catKey }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px] items-start w-full">
    {cards.map((card) => (
      <button
        key={card.id}
        className={classNames(
          "relative overflow-hidden w-full",
          "border border-secondary-light-active",
          "rounded-[40px]",
          "shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]",
          "cursor-pointer bg-[rgba(0,0,0,0.5)]"
        )}
        style={{ height: "264px" }}
        onClick={() => navigate(`/gallery/${catKey}/all`)}
      >
        {card.image && (
          <img
            src={card.image}
            alt={card.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/30" />
        {/* Play circle icon — top right */}
        <div className="absolute top-[27px] right-[27px]">
          <PlayCircleIcon />
        </div>
        {/* Title + count — bottom left */}
        <div className="absolute bottom-[22px] left-[22px] flex flex-col gap-[4px] items-start">
          <p className="font-raleway font-bold text-[25px] leading-[34px] text-[#f7f7f7]">
            {card.title}
          </p>
          {card.count && (
            <p className="font-raleway font-normal text-[16px] leading-[24px] text-[#f7f7f7]">
              {card.count}
            </p>
          )}
        </div>
      </button>
    ))}
  </div>
);

// ─── Destinations bento grid layout ──────────────────────────────────────────
// Figma: 4 columns (335 / 338 / 335 / 338), staggered tops — cols 1 & 3 start ~42px lower.
// Implemented with flex + proportional flex-grow (no absolute / no fixed outer height).
// Card heights follow width via aspect-ratio so the strip scales fluidly.

const DEST_COL_GROW = [335, 338, 335, 338];

const DestinationsBentoGrid = ({ cards, navigate, catKey }) => {
  const [cardA, cardB, cardC, cardD, cardE, cardF, cardG, cardH] = cards;
  const go = () => navigate(`/gallery/${catKey}/all`);

  return (
    <div className="flex w-full flex-col gap-8 xl:flex-row xl:items-start xl:gap-[clamp(12px,1.7vw,24px)]">
      {/* Col A — tall (starts lower than B/D) */}
      <div
        className="flex min-w-0 w-full flex-col"
        style={{ flex: `${DEST_COL_GROW[0]} 1 0%` }}
      >
        <div className="hidden shrink-0 xl:block xl:h-[clamp(24px,3.6vw,42px)]" aria-hidden />
        <GalleryPhotoCard
          image={cardA?.image}
          title={cardA?.title}
          count={cardA?.count}
          size="large"
          className="w-full aspect-335/663"
          onClick={go}
        />
      </div>

      {/* Col B — medium + small pair */}
      <div
        className="flex min-w-0 w-full flex-col gap-[clamp(20px,3vw,36px)]"
        style={{ flex: `${DEST_COL_GROW[1]} 1 0%` }}
      >
        <GalleryPhotoCard
          image={cardB?.image}
          title={cardB?.title}
          count={cardB?.count}
          size="medium"
          className="w-full aspect-338/568"
          onClick={go}
        />
        <div className="flex gap-[clamp(8px,1vw,14px)]">
          <GalleryPhotoCard
            image={cardC?.image}
            title={cardC?.title}
            size="small"
            className="min-w-0 flex-1 aspect-162/197"
            onClick={go}
          />
          <GalleryPhotoCard
            image={cardD?.image}
            title={cardD?.title}
            size="small"
            className="min-w-0 flex-1 aspect-162/197"
            onClick={go}
          />
        </div>
      </div>

      {/* Col C — tall */}
      <div
        className="flex min-w-0 w-full flex-col"
        style={{ flex: `${DEST_COL_GROW[2]} 1 0%` }}
      >
        <div className="hidden shrink-0 xl:block xl:h-[clamp(24px,3.6vw,42px)]" aria-hidden />
        <GalleryPhotoCard
          image={cardE?.image}
          title={cardE?.title}
          count={cardE?.count}
          size="large"
          className="w-full aspect-335/663"
          onClick={go}
        />
      </div>

      {/* Col D — small pair + medium */}
      <div
        className="flex min-w-0 w-full flex-col gap-[clamp(20px,3vw,33px)]"
        style={{ flex: `${DEST_COL_GROW[3]} 1 0%` }}
      >
        <div className="flex gap-[clamp(8px,1vw,14px)]">
          <GalleryPhotoCard
            image={cardF?.image}
            title={cardF?.title}
            size="small"
            className="min-w-0 flex-1 aspect-162/197"
            onClick={go}
          />
          <GalleryPhotoCard
            image={cardG?.image}
            title={cardG?.title}
            size="small"
            className="min-w-0 flex-1 aspect-162/197"
            onClick={go}
          />
        </div>
        <GalleryPhotoCard
          image={cardH?.image}
          title={cardH?.title}
          count={cardH?.count}
          size="medium"
          className="w-full aspect-338/568"
          onClick={go}
        />
      </div>
      </div>
  );
};

// ─── Standard photo grid (activities / partners / captured-by-you) ────────────
// Figma (activities): gap 27px — row1: 363+363+629 (=1409) @371px; row2: 753+302+307 + gaps (=1416) @415px.
// Per-card aspect ratios make row heights differ (wide vs narrow columns). Lock each row with one
// aspect-[totalWidth/rowHeight] on the row flex + flex-weighted cells + h-full cards.

const STANDARD_GRID_GAP = "gap-[27px]";

const ActivitiesSixGrid = ({ cards, navigate, catKey }) => {
  const [a, b, c, d, e, f] = cards;
  const go = () => navigate(`/gallery/${catKey}/all`);

  const Card = ({ card, className }) =>
    card ? (
      <GalleryPhotoCard
        key={card.id}
        image={card.image}
        title={card.title}
        count={card.count}
        size="medium"
        className={classNames("min-h-0 w-full", className)}
        onClick={go}
      />
    ) : null;

  const RowCell = ({ card, weight }) => (
    <div className="flex min-h-0 min-w-0 flex-col" style={{ flex: `${weight} 1 0%` }}>
      <Card card={card} className="h-full min-h-0" />
    </div>
  );

  return (
    <>
      <div className={classNames("flex flex-col xl:hidden", STANDARD_GRID_GAP)}>
        {[a, b, c, d, e, f].filter(Boolean).map((card) => (
          <Card key={card.id} card={card} className="aspect-629/371" />
        ))}
      </div>

      <div className={classNames("hidden flex-col xl:flex", STANDARD_GRID_GAP)}>
        <div className="flex min-h-0 w-full items-stretch gap-[27px] aspect-[1409/371]">
          <RowCell card={a} weight={363} />
          <RowCell card={b} weight={363} />
          <RowCell card={c} weight={629} />
        </div>
        <div className="flex min-h-0 w-full items-stretch gap-[27px] aspect-[1416/415]">
          <RowCell card={d} weight={753} />
          <RowCell card={e} weight={302} />
          <RowCell card={f} weight={307} />
        </div>
      </div>
    </>
  );
};

/** Four cards: two-row brick (6+6 / 6+6) — row1 uses activities row1 height ratio, row2 row2 ratio */
const StandardFourGrid = ({ cards, navigate, catKey }) => {
  const go = () => navigate(`/gallery/${catKey}/all`);
  return (
    <div
      className={classNames(
        "grid w-full grid-cols-1",
        STANDARD_GRID_GAP,
        "xl:grid-cols-12"
      )}
    >
      {cards.map((card, index) => (
        <GalleryPhotoCard
          key={card.id}
          image={card.image}
          title={card.title}
          count={card.count}
          size="medium"
          className={classNames(
            "min-w-0 w-full xl:col-span-6",
            index < 2 ? "aspect-629/371" : "aspect-753/415"
          )}
          onClick={go}
        />
      ))}
    </div>
  );
};

const StandardPhotoGrid = ({ cards, navigate, catKey }) => {
  const n = cards?.length ?? 0;
  if (n === 6) {
    return <ActivitiesSixGrid cards={cards} navigate={navigate} catKey={catKey} />;
  }
  if (n === 4) {
    return <StandardFourGrid cards={cards} navigate={navigate} catKey={catKey} />;
  }

  const go = () => navigate(`/gallery/${catKey}/all`);
  return (
    <div
      className={classNames("grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", STANDARD_GRID_GAP)}
    >
      {cards.map((card) => (
        <GalleryPhotoCard
          key={card.id}
          image={card.image}
          title={card.title}
          count={card.count}
          size={card.size || "medium"}
          className={classNames(
            "min-w-0 w-full",
            card.size === "large" && "aspect-335/663",
            card.size === "small" && "aspect-162/197 max-w-[162px]",
            (!card.size || card.size === "medium") && "aspect-335/568"
          )}
          onClick={go}
        />
      ))}
    </div>
  );
};

// ─── Nature — Figma: 3 columns 457 / 458 / 463, gap 22px.
// Col1: small + large (419 + 48gap + 734); Col2: three mediums (392 + 12 + 392 + 12 + 392);
// Col3: small + large (433 + 34gap + 734). Cards array is column-major (7 items).

const NATURE_COL_FR = [457, 458, 463];

const NatureGrid = ({ cards, navigate, catKey }) => {
  const [
    col1Top,
    col1Bottom,
    col2Top,
    col2Mid,
    col2Bottom,
    col3Top,
    col3Bottom,
  ] = cards ?? [];
  const go = () => navigate(`/gallery/${catKey}/all`);

  return (
    <div
      className={classNames(
        "flex w-full flex-col gap-[22px]",
        "xl:flex-row xl:items-start"
      )}
    >
      {/* Column 1 — 2 cards */}
      <div
        className="flex min-w-0 w-full flex-col gap-[48px]"
        style={{ flex: `${NATURE_COL_FR[0]} 1 0%` }}
      >
        <GalleryPhotoCard
          image={col1Top?.image}
          title={col1Top?.title}
          count={col1Top?.count}
          size="medium"
          className="w-full aspect-457/419 min-h-0"
          onClick={go}
        />
        <GalleryPhotoCard
          image={col1Bottom?.image}
          title={col1Bottom?.title}
          count={col1Bottom?.count}
          size="large"
          className="w-full aspect-457/734 min-h-0"
          onClick={go}
        />
      </div>

      {/* Column 2 — 3 cards */}
      <div
        className="flex min-w-0 w-full flex-col gap-[12px]"
        style={{ flex: `${NATURE_COL_FR[1]} 1 0%` }}
      >
        <GalleryPhotoCard
          image={col2Top?.image}
          title={col2Top?.title}
          count={col2Top?.count}
          size="medium"
          className="w-full aspect-458/392 shrink-0"
          onClick={go}
        />
        <GalleryPhotoCard
          image={col2Mid?.image}
          title={col2Mid?.title}
          count={col2Mid?.count}
          size="medium"
          className="w-full aspect-458/392 shrink-0"
          onClick={go}
        />
        <GalleryPhotoCard
          image={col2Bottom?.image}
          title={col2Bottom?.title}
          count={col2Bottom?.count}
          size="medium"
          className="w-full aspect-457/392 shrink-0"
          onClick={go}
        />
      </div>

      {/* Column 3 — 2 cards */}
      <div
        className="flex min-w-0 w-full flex-col gap-[34px]"
        style={{ flex: `${NATURE_COL_FR[2]} 1 0%` }}
      >
        <GalleryPhotoCard
          image={col3Top?.image}
          title={col3Top?.title}
          count={col3Top?.count}
          size="medium"
          className="w-full aspect-463/433 min-h-0"
          onClick={go}
        />
        <GalleryPhotoCard
          image={col3Bottom?.image}
          title={col3Bottom?.title}
          count={col3Bottom?.count}
          size="large"
          className="w-full aspect-458/734 min-h-0"
          onClick={go}
        />
      </div>
    </div>
  );
};

// ─── Culture — Figma: 1415×743, cols 340 | 341 | 340 | 341, gap ~21px; outer cols one tall
// (340×653, top offset ~45px ⇒ vertically centred via items-center); inner cols two squares 341×364 + gap 15px.

const CULTURE_COL_FR = [340, 341, 340, 341];

const CultureGrid = ({ cards, navigate, catKey }) => {
  const [tallLeft, stack2Top, stack2Bot, tallMid, stack4Top, stack4Bot] = cards ?? [];
  const go = () => navigate(`/gallery/${catKey}/all`);

  return (
    <div
      className={classNames(
        "flex w-full flex-col gap-[21px]",
        "xl:flex-row xl:items-center"
      )}
    >
      <div className="flex min-w-0 w-full justify-center" style={{ flex: `${CULTURE_COL_FR[0]} 1 0%` }}>
        <GalleryPhotoCard
          image={tallLeft?.image}
          title={tallLeft?.title}
          count={tallLeft?.count}
          size="large"
          className="w-full aspect-340/653 min-h-0"
          onClick={go}
        />
      </div>

      <div
        className="flex min-w-0 w-full flex-col gap-[15px]"
        style={{ flex: `${CULTURE_COL_FR[1]} 1 0%` }}
      >
        <GalleryPhotoCard
          image={stack2Top?.image}
          title={stack2Top?.title}
          count={stack2Top?.count}
          size="medium"
          className="w-full aspect-341/364 shrink-0"
          onClick={go}
        />
        <GalleryPhotoCard
          image={stack2Bot?.image}
          title={stack2Bot?.title}
          count={stack2Bot?.count}
          size="medium"
          className="w-full aspect-341/364 shrink-0"
          onClick={go}
        />
      </div>

      <div className="flex min-w-0 w-full justify-center" style={{ flex: `${CULTURE_COL_FR[2]} 1 0%` }}>
        <GalleryPhotoCard
          image={tallMid?.image}
          title={tallMid?.title}
          count={tallMid?.count}
          size="large"
          className="w-full aspect-340/653 min-h-0"
          onClick={go}
        />
      </div>

      <div
        className="flex min-w-0 w-full flex-col gap-[15px]"
        style={{ flex: `${CULTURE_COL_FR[3]} 1 0%` }}
      >
        <GalleryPhotoCard
          image={stack4Top?.image}
          title={stack4Top?.title}
          count={stack4Top?.count}
          size="medium"
          className="w-full aspect-341/364 shrink-0"
          onClick={go}
        />
        <GalleryPhotoCard
          image={stack4Bot?.image}
          title={stack4Bot?.title}
          count={stack4Bot?.count}
          size="medium"
          className="w-full aspect-341/364 shrink-0"
          onClick={go}
        />
      </div>
    </div>
  );
};

// ─── Captured by you — Figma: 1416px row, cols 366 | 357 | 314 | 314, gap 22px.
// Col2 stack gap 24px (319+319); Nature 366×743 (row height); cols 3–4 are 314×658 —
// Tour Partners bottom-aligned, Culture top-aligned within the stretched row.

const CAPTURED_COL_FR = [366, 357, 314, 314];

const CapturedByYouGrid = ({ cards, navigate, catKey }) => {
  const [nature, destinations, activities, tourPartners, culture] = cards ?? [];
  const go = () => navigate(`/gallery/${catKey}/all`);

  return (
    <div
      className={classNames(
        "flex w-full flex-col gap-[22px]",
        "xl:flex-row  xl:items-center xl:gap-[22px]"
      )}
    >
      <div
        className="flex min-w-0 w-full flex-col gap-[24px]"
        style={{ flex: `${CAPTURED_COL_FR[1]} 1 0%` }}
      >
        <GalleryPhotoCard
          image={destinations?.image}
          title={destinations?.title}
          count={destinations?.count}
          size="medium"
          className="w-full aspect-357/319 shrink-0"
          onClick={go}
        />
        <GalleryPhotoCard
          image={activities?.image}
          title={activities?.title}
          count={activities?.count}
          size="medium"
          className="w-full aspect-357/319 shrink-0"
          onClick={go}
        />
      </div>

      <div
        className="flex min-w-0 w-full flex-col justify-end"
        style={{ flex: `${CAPTURED_COL_FR[2]} 1 0%` }}
      >
        <GalleryPhotoCard
          image={tourPartners?.image}
          title={tourPartners?.title}
          count={tourPartners?.count}
          size="medium"
          className="w-full aspect-314/658 shrink-0"
          onClick={go}
        />
      </div>

      <div className="min-w-0 w-full" style={{ flex: `${CAPTURED_COL_FR[0]} 1 0%` }}>
        <GalleryPhotoCard
          image={nature?.image}
          title={nature?.title}
          count={nature?.count}
          size="large"
          className="w-full aspect-366/743 min-h-0"
          onClick={go}
        />
      </div>

      

     

      <div
        className="flex min-w-0 w-full flex-col justify-start"
        style={{ flex: `${CAPTURED_COL_FR[3]} 1 0%` }}
      >
        <GalleryPhotoCard
          image={culture?.image}
          title={culture?.title}
          count={culture?.count}
          size="medium"
          className="w-full aspect-314/658 shrink-0"
          onClick={go}
        />
      </div>
    </div>
  );
};

// ─── Partners — Figma: 1416px row, cols 341 | 340 | 691, gap 22px; col1 stack gap 15px (426 + 309);
// col2 Transportation 340×743; col3 wide stack gap 24px (319 + 319).

const PARTNER_COL_FR = [341, 340, 691];

const PartnersGrid = ({ cards, navigate, catKey }) => {
  const [hotelTop, hotelBot, transportation, tourPartners, restaurants] = cards ?? [];
  const go = () => navigate(`/gallery/${catKey}/all`);

  return (
    <div
      className={classNames(
        "flex w-full flex-col gap-[22px]",
        "xl:flex-row xl:items-center xl:gap-[22px]"
      )}
    >
      <div
        className="flex min-w-0 w-full flex-col gap-[15px]"
        style={{ flex: `${PARTNER_COL_FR[0]} 1 0%` }}
      >
        <GalleryPhotoCard
          image={hotelTop?.image}
          title={hotelTop?.title}
          count={hotelTop?.count}
          size="medium"
          className="w-full aspect-341/426 shrink-0"
          onClick={go}
        />
        <GalleryPhotoCard
          image={hotelBot?.image}
          title={hotelBot?.title}
          count={hotelBot?.count}
          size="medium"
          className="w-full aspect-341/309 shrink-0"
          onClick={go}
        />
      </div>

      <div className="flex min-w-0 w-full justify-center" style={{ flex: `${PARTNER_COL_FR[1]} 1 0%` }}>
        <GalleryPhotoCard
          image={transportation?.image}
          title={transportation?.title}
          count={transportation?.count}
          size="large"
          className="w-full aspect-340/743 min-h-0"
          onClick={go}
        />
      </div>

      <div
        className="flex min-w-0 w-full flex-col gap-[24px]"
        style={{ flex: `${PARTNER_COL_FR[2]} 1 0%` }}
      >
        <GalleryPhotoCard
          image={tourPartners?.image}
          title={tourPartners?.title}
          count={tourPartners?.count}
          size="medium"
          className="w-full aspect-691/319 shrink-0"
          onClick={go}
        />
        <GalleryPhotoCard
          image={restaurants?.image}
          title={restaurants?.title}
          count={restaurants?.count}
          size="medium"
          className="w-full aspect-691/319 shrink-0"
          onClick={go}
        />
      </div>
    </div>
  );
};

// ─── Section renderer ─────────────────────────────────────────────────────────

const CategorySectionBlock = ({ catKey, navigate }) => {
  const data = CATEGORY_DATA[catKey];
  if (!data) return null;

  const renderCards = () => {
    switch (catKey) {
      case "destinations":
        return <DestinationsBentoGrid cards={data.cards} navigate={navigate} catKey={catKey} />;
      case "nature":
        return <NatureGrid cards={data.cards} navigate={navigate} catKey={catKey} />;
      case "culture":
        return <CultureGrid cards={data.cards} navigate={navigate} catKey={catKey} />;
      case "videos":
        return <VideosSectionCards cards={data.cards} navigate={navigate} catKey={catKey} />;
      case "partners":
        return <PartnersGrid cards={data.cards} navigate={navigate} catKey={catKey} />;
      case "captured-by-you":
        return <CapturedByYouGrid cards={data.cards} navigate={navigate} catKey={catKey} />;
      default:
        // activities: standard grid
        return <StandardPhotoGrid cards={data.cards} navigate={navigate} catKey={catKey} />;
    }
  };

  return (
    <section className={classNames("w-full py-10 lg:py-[80px]", data.bg)}>
      <div className="px-4 md:px-8 lg:px-[156px]">
        <SectionHeader
          label={data.label}
          title={data.title}
          description={data.description}
          onExplore={() => navigate(`/gallery/${catKey}/all`)}
        />
        {renderCards()}
      </div>
    </section>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

const GalleryCategorySection = React.forwardRef(({
  category,
  showAll = false,
  className = "",
  ...props
}, ref) => {
  const navigate = useNavigate();

  return (
    <div ref={ref} className={classNames("w-full bg-secondary-light-default", className)} {...props}>
      {showAll
        ? OVERVIEW_ORDER.map((catKey) => (
            <React.Fragment key={catKey}>
              <CategorySectionBlock catKey={catKey} navigate={navigate} />
              {catKey === "captured-by-you" && <GalleryBecomePartSection />}
            </React.Fragment>
          ))
        : category === "captured-by-you" ? (
            <>
              <CategorySectionBlock catKey={category} navigate={navigate} />
              <GalleryBecomePartSection />
            </>
          ) : (
            <CategorySectionBlock catKey={category} navigate={navigate} />
          )}
    </div>
  );
});

GalleryCategorySection.displayName = "GalleryCategorySection";
export default GalleryCategorySection;
