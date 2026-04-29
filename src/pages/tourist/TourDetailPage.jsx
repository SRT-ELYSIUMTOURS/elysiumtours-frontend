import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { classNames } from "../../utils/classNames";
import BlogBreadcrumbBar from "../../components/sections/blog/BlogBreadcrumbBar";
import PopularTourCard from "../../components/cards/PopularTourCard";
import ImageGalleryModal from "../../components/ui/ImageGalleryModal";
import ShareModal from "../../components/ui/ShareModal";
import Button from "../../components/ui/Button";
// Route: /tours/:country/:tour
// e.g. /tours/ghana/elmina-heritage-coastal-journey

// ─── Static tour data (replace with API call later) ───────────────────────────
const TOUR_DATA = {
  "elmina-heritage-coastal-journey": {
    title: "Elmina Heritage & Coastal Journey",
    country: "Ghana",
    location: "Cape Coast, Ghana",
    rating: 4.9,
    reviewCount: 24,
    maxGuests: 12,
    duration: "3 Days / 2 Nights",
    languages: "English, Twi, French",
    cancellation: "Cancellation available",
    price: "GHC 4,590",
    description:
      'Stand inside the same cells that held thousands of enslaved Africans before their crossing  Elmina Castle is not just a UNESCO World Heritage Site, it is a visceral entry into history that demands to be felt, not just seen. Your certified heritage guide will walk you through every corner, courtyard, and "Door of No Return" with a depth that no audio guide can replicate. <br /><br />Beyond the castle, this journey moves through the living cultures of Ghana\'s Central Region  fishing villages that celebrate dance, open-air markets crowded with dried fish and fresh cassava, and evenings by the ocean where coconuts are shared and waves echo the unspoken. This is Ghana unfiltered.',
    images: Array.from(
      { length: 24 },
      (_, i) => `https://picsum.photos/seed/tour-detail-${i + 1}/856/717`
    ),
    heroMainImage: "https://picsum.photos/seed/tour-hero-main/856/717",
    heroTopRight: "https://picsum.photos/seed/tour-hero-top/867/366",
    heroBottomLeft: "https://picsum.photos/seed/tour-hero-bl/430/347",
    heroBottomRight: "https://picsum.photos/seed/tour-hero-bottom/432/347",
    bestFor: [
      "Cultural Enthusiasts",
      "Diaspora Travelers",
      "International Tourists",
      "Couples",
    ],
    included: [
      { type: "check", text: "All inter-continental travels" },
      { type: "check", text: "Expert certified heritage guides" },
      { type: "check", text: "2 nights hotel accommodation" },
      { type: "check", text: "4 meals (2x Lunch, 2x Breakfast)" },
      { type: "check", text: "All entrance fees" },
      { type: "check", text: "Hotel pickup & drop-off" },
      { type: "cross", text: "International/domestic flights" },
      { type: "cross", text: "Personal spending & tips" },
      { type: "cross", text: "Travel insurance" },
      { type: "cross", text: "Alcoholic beverages" },
      { type: "cross", text: "Dinner meals (Day 1 & 2)" },
    ],
    itinerary: [
      {
        day: 1,
        title: "Accra Departure → Cape Coast Arrival",
        preview: "Lagos · Airport → Victoria Island · Meals: Welcome Dinner",
        activities: [
          {
            time: "08:00 AM",
            activity: "Early drive along the coastal highway",
          },
          {
            time: "10:00 AM",
            activity: "Orientation walk through Cape Coast town",
            tag: "Business",
          },
          {
            time: "12:00 PM",
            activity: "Traditional cuisine walk at local market",
          },
        ],
        localContext:
          " Lagos is Africa's largest city by population, home to 21M+ people and a GDP that rivals many African nations. Victoria Island is the commercial and diplomatic heartbeat.",
      },
      {
        day: 2,
        title: "Coastal Exploration",
        preview: "Lagos · Airport → Victoria Island · Meals: Welcome Dinner",

        activities: [
          {
            time: "08:00 AM",
            activity: "Fort Elmina & Cape Coast Castle visits",
          },
          {
            time: "10:00 AM",
            activity: "Kakum National Park canopy walk",
            tag: "Business",
          },
          { time: "12:00 PM", activity: "Local fishing harbour market tour" },
        ],
        localContext:
          " Lagos is Africa's largest city by population, home to 21M+ people and a GDP that rivals many African nations. Victoria Island is the commercial and diplomatic heartbeat.",
      },
      {
        day: 3,
        title: "Return to Accra",
        preview: "Lagos · Airport → Victoria Island · Meals: Welcome Dinner",

        activities: [
          {
            time: "08:00 AM",
            activity: "W.E.B Du Bois Memorial Museum visit",
            tag: "Business",
          },
          {
            time: "10:00 AM",
            activity: "Departure and transfer back to Accra",
          },
        ],
        localContext:
          " Lagos is Africa's largest city by population, home to 21M+ people and a GDP that rivals many African nations. Victoria Island is the commercial and diplomatic heartbeat.",
      },
    ],
    guide: {
      name: "Ailsa Mensah-Asante",
      rating: 4.9,
      reviews: 124,
      speciality: "Heritage Guide",
      yearsExp: 8,
      languages: [
        { code: "gb", name: "English" },
        { code: "fr", name: "French" },
        { code: "gh", name: "Twi" }, // Twi is Ghanaian → gh
      ],
      certifications: ["UNESCO Certified", "History MA"],
      image: "/tourAssets/Image-1.png",
      testimonials: [
        {
          quote:
            "Ailsa's depth of knowledge brought the castle history to life in a way no textbook ever could. A truly transformative experience.",
          reviewer: "Estella Sackey",
          date: "2 weeks ago",
        },
        {
          quote:
            "Her passion for Ghana's heritage is infectious. Every stop felt personal and deeply meaningful — I'll never forget it.",
          reviewer: "James O.",
          date: "1 month ago",
        },
      ],
    },
    reviews: [
      {
        id: 1,
        name: "Sarah M.",
        avatar: "https://picsum.photos/seed/reviewer-1/40/40",
        rating: 5,
        date: "January 2025",
        text: "Absolutely life-changing experience. Kwame's knowledge of the history was profound and deeply moving. The castle visits were emotional but necessary. Highly recommend to every person of African descent.",
      },
      {
        id: 2,
        name: "James O.",
        avatar: "https://picsum.photos/seed/reviewer-2/40/40",
        rating: 5,
        date: "December 2024",
        text: "A perfect blend of history, culture, and natural beauty. The canopy walk was exhilarating and the coastal views were stunning. Elysium Tours truly exceeded our expectations.",
      },
      {
        id: 3,
        name: "Priya K.",
        avatar: "https://picsum.photos/seed/reviewer-3/40/40",
        rating: 4,
        date: "November 2024",
        text: "Wonderful tour with excellent organisation. The accommodations were comfortable and the meals were delicious. Would love to return for the extended tour next time.",
      },
    ],
    ratingBreakdown: { 5: 85, 4: 10, 3: 3, 2: 1, 1: 1 },
    totalReviews: 3249,
    categoryRatings: [
      { label: "Guide Quality", score: 4.9 },
      { label: "Value for Money", score: 4.8 },
      { label: "Logistical Quality", score: 4.9 },
      { label: "Transport", score: 4.5 },
    ],
    addOns: [
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <g clip-path="url(#clip0_3749_56820)">
              <path
                d="M7.19104 2.49449L6.69277 1.93394L6.69277 1.93394L7.19104 2.49449ZM12.8037 2.49449L13.302 1.93394V1.93394L12.8037 2.49449ZM12.624 2.33468L12.1257 2.89523V2.89523L12.624 2.33468ZM7.37084 2.33467L7.86911 2.89523V2.89523L7.37084 2.33467ZM3.38162 17.5375L3.82246 16.9308L3.38162 17.5375ZM2.45982 16.6157L3.06659 16.1749L2.45982 16.6157ZM17.535 16.6157L16.9282 16.1749L17.535 16.6157ZM16.6132 17.5375L16.1723 16.9308L16.6132 17.5375ZM18.3307 6.65407H17.5807V10.8333H18.3307H19.0807V6.65407H18.3307ZM10.8307 18.3333V17.5833H9.16406V18.3333V19.0833H10.8307V18.3333ZM1.66406 10.8333H2.41406V6.65407H1.66406H0.914062V10.8333H1.66406ZM12.624 2.33468L12.1257 2.89523L12.3055 3.05505L12.8037 2.49449L13.302 1.93394L13.1222 1.77412L12.624 2.33468ZM7.19104 2.49449L7.68932 3.05505L7.86911 2.89523L7.37084 2.33467L6.87257 1.77412L6.69277 1.93394L7.19104 2.49449ZM4.98484 3.33329V4.08329C5.98183 4.08329 6.94416 3.71741 7.68932 3.05505L7.19104 2.49449L6.69277 1.93394C6.22219 2.35223 5.61446 2.58329 4.98484 2.58329V3.33329ZM12.8037 2.49449L12.3055 3.05505C13.0506 3.71741 14.013 4.08329 15.01 4.08329V3.33329V2.58329C14.3803 2.58329 13.7726 2.35223 13.302 1.93394L12.8037 2.49449ZM12.624 2.33468L13.1222 1.77412C11.3401 0.19004 8.65465 0.19004 6.87257 1.77412L7.37084 2.33467L7.86911 2.89523C9.08287 1.81634 10.9119 1.81634 12.1257 2.89523L12.624 2.33468ZM9.16406 18.3333V17.5833C7.58497 17.5833 6.46089 17.5823 5.59256 17.4882C4.73827 17.3956 4.22094 17.2203 3.82246 16.9308L3.38162 17.5375L2.94079 18.1443C3.63758 18.6505 4.44908 18.8731 5.43099 18.9795C6.39887 19.0843 7.61838 19.0833 9.16406 19.0833V18.3333ZM1.66406 10.8333H0.914062C0.914062 12.379 0.913033 13.5985 1.0179 14.5664C1.12428 15.5483 1.34681 16.3598 1.85306 17.0566L2.45982 16.6157L3.06659 16.1749C2.77708 15.7764 2.60173 15.2591 2.50917 14.4048C2.41509 13.5365 2.41406 12.4124 2.41406 10.8333H1.66406ZM3.38162 17.5375L3.82246 16.9308C3.53241 16.72 3.27733 16.4649 3.06659 16.1749L2.45982 16.6157L1.85306 17.0566C2.15632 17.474 2.52339 17.841 2.94079 18.1443L3.38162 17.5375ZM18.3307 10.8333H17.5807C17.5807 12.4124 17.5797 13.5365 17.4856 14.4048C17.3931 15.2591 17.2177 15.7764 16.9282 16.1749L17.535 16.6157L18.1417 17.0566C18.648 16.3598 18.8705 15.5483 18.9769 14.5664C19.0818 13.5985 19.0807 12.379 19.0807 10.8333H18.3307ZM10.8307 18.3333V19.0833C12.3764 19.0833 13.5959 19.0843 14.5638 18.9795C15.5457 18.8731 16.3572 18.6505 17.054 18.1443L16.6132 17.5375L16.1723 16.9308C15.7739 17.2203 15.2565 17.3956 14.4022 17.4882C13.5339 17.5823 12.4098 17.5833 10.8307 17.5833V18.3333ZM17.535 16.6157L16.9282 16.1749C16.7175 16.4649 16.4624 16.72 16.1723 16.9308L16.6132 17.5375L17.054 18.1443C17.4714 17.841 17.8385 17.474 18.1417 17.0566L17.535 16.6157ZM18.3307 6.65407H19.0807C19.0807 4.40584 17.2582 2.58329 15.01 2.58329V3.33329V4.08329C16.4298 4.08329 17.5807 5.23427 17.5807 6.65407H18.3307ZM1.66406 6.65407H2.41406C2.41406 5.23427 3.56504 4.08329 4.98484 4.08329V3.33329V2.58329C2.73661 2.58329 0.914062 4.40584 0.914062 6.65407H1.66406ZM6.66406 10.8333H5.91406C5.91406 13.0885 7.74223 14.9166 9.9974 14.9166V14.1666V13.4166C8.57066 13.4166 7.41406 12.26 7.41406 10.8333H6.66406ZM9.9974 14.1666V14.9166C12.2526 14.9166 14.0807 13.0885 14.0807 10.8333H13.3307H12.5807C12.5807 12.26 11.4241 13.4166 9.9974 13.4166V14.1666ZM13.3307 10.8333H14.0807C14.0807 8.57813 12.2526 6.74996 9.9974 6.74996V7.49996V8.24996C11.4241 8.24996 12.5807 9.40655 12.5807 10.8333H13.3307ZM9.9974 7.49996V6.74996C7.74223 6.74996 5.91406 8.57813 5.91406 10.8333H6.66406H7.41406C7.41406 9.40655 8.57066 8.24996 9.9974 8.24996V7.49996Z"
                fill="#7B2CBF"
              />
              <path
                d="M14.1641 6.66671C14.1641 7.12694 14.5372 7.50004 14.9974 7.50004C15.4576 7.50004 15.8307 7.12694 15.8307 6.66671C15.8307 6.20647 15.4576 5.83337 14.9974 5.83337C14.5372 5.83337 14.1641 6.20647 14.1641 6.66671Z"
                fill="#7B2CBF"
              />
            </g>
            <defs>
              <clipPath id="clip0_3749_56820">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        ),
        name: "Professional Photo Package",

        desc: "High-resolution photos & edited highlights reel",
        price: "GH₵ 850",
      },
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
          >
            <path
              d="M3.33594 10L5.0026 10.8333"
              stroke="#7B2CBF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M19.1667 10.4165L17.5 10.8332"
              stroke="#7B2CBF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.91406 14.5833L8.11879 14.0715C8.42324 13.3104 8.57546 12.9298 8.8929 12.7149C9.21034 12.5 9.62023 12.5 10.44 12.5H12.0548C12.8746 12.5 13.2845 12.5 13.6019 12.7149C13.9193 12.9298 14.0716 13.3104 14.376 14.0715L14.5807 14.5833"
              stroke="#7B2CBF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2.91406 14.1665V16.5682C2.91406 16.8838 3.11469 17.1723 3.4323 17.3135C3.63838 17.4051 3.83521 17.4998 4.07288 17.4998H5.50525C5.74291 17.4998 5.93975 17.4051 6.14583 17.3135C6.46344 17.1723 6.66406 16.8838 6.66406 16.5682V14.9998"
              stroke="#7B2CBF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.8359 14.9998V16.5682C15.8359 16.8838 16.0366 17.1723 16.3542 17.3135C16.5603 17.4051 16.7571 17.4998 16.9948 17.4998H18.4271C18.6648 17.4998 18.8616 17.4051 19.0677 17.3135C19.3853 17.1723 19.5859 16.8838 19.5859 16.5682V14.1665"
              stroke="#7B2CBF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M17.9141 7.08317L18.7474 6.6665"
              stroke="#7B2CBF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4.58333 7.08317L3.75 6.6665"
              stroke="#7B2CBF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5 7.5L5.90692 4.77924C6.2736 3.67921 6.45693 3.12919 6.89342 2.8146C7.32989 2.5 7.90966 2.5 9.0692 2.5H13.4308C14.5903 2.5 15.1701 2.5 15.6066 2.8146C16.0431 3.12919 16.2264 3.67921 16.5931 4.77924L17.5 7.5"
              stroke="#7B2CBF"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
            <path
              d="M4.9974 7.5H17.4974C18.2951 8.34458 19.5807 9.52075 19.5807 10.833V13.7252C19.5807 14.2006 19.2645 14.6007 18.8447 14.6562L16.2474 15H6.2474L3.65003 14.6562C3.23035 14.6007 2.91406 14.2006 2.91406 13.7252V10.833C2.91406 9.52075 4.19972 8.34458 4.9974 7.5Z"
              stroke="#7B2CBF"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
          </svg>
        ),
        name: "Private Vehicle Upgrade",
        desc: "Exclusive private transfer throughout the tour",
        price: "GH₵ 850",
      },
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M8.035 1.43875C8.385 0.73875 9.01625 0 10 0C10.9837 0 11.615 0.74 11.965 1.43875C12.3262 2.1625 12.5 3.03875 12.5 3.75V8.36375L18.9625 11.595C19.2742 11.7506 19.5364 11.99 19.7197 12.2863C19.9029 12.5826 20 12.9241 20 13.2725V15C20 15.0907 19.9802 15.1804 19.942 15.2627C19.9038 15.345 19.8482 15.418 19.779 15.4766C19.7097 15.5352 19.6286 15.5781 19.5411 15.6022C19.4537 15.6263 19.362 15.6311 19.2725 15.6162L12.3887 14.4687L11.92 17.285L13.5675 18.9325C13.6551 19.0199 13.7148 19.1314 13.739 19.2528C13.7633 19.3741 13.7509 19.5 13.7035 19.6143C13.6561 19.7287 13.5758 19.8264 13.4728 19.895C13.3698 19.9637 13.2488 20.0002 13.125 20H6.875C6.75122 20.0002 6.63017 19.9637 6.52718 19.895C6.4242 19.8264 6.34392 19.7287 6.29652 19.6143C6.24912 19.5 6.23674 19.3741 6.26095 19.2528C6.28516 19.1314 6.34487 19.0199 6.4325 18.9325L8.08125 17.285L7.61125 14.4687L0.7275 15.6162C0.638004 15.6311 0.546341 15.6263 0.45888 15.6022C0.371418 15.5781 0.290255 15.5352 0.221029 15.4766C0.151803 15.418 0.0961726 15.345 0.0580036 15.2627C0.0198346 15.1804 4.17625e-05 15.0907 0 15L0 13.2725C1.17688e-05 12.9241 0.0970907 12.5826 0.280348 12.2863C0.463605 11.99 0.725792 11.7506 1.0375 11.595L7.5 8.36375L7.5 3.75C7.5 3.04 7.675 2.16125 8.035 1.43875ZM9.1525 1.99875C8.88875 2.525 8.75 3.21125 8.75 3.75V8.75C8.75 8.86597 8.71772 8.97966 8.65679 9.07834C8.59587 9.17701 8.50868 9.25679 8.405 9.30875L1.595 12.7137C1.49132 12.7657 1.40413 12.8455 1.3432 12.9442C1.28228 13.0428 1.25 13.1565 1.25 13.2725L1.25 14.2625L8.0225 13.1337C8.18574 13.1066 8.35309 13.1453 8.48783 13.2414C8.62256 13.3375 8.7137 13.4831 8.74125 13.6462L9.36625 17.3962C9.38281 17.4947 9.37556 17.5956 9.34511 17.6906C9.31467 17.7857 9.26191 17.872 9.19125 17.9425L8.385 18.75H11.6175L10.8087 17.9425C10.7383 17.8722 10.6856 17.786 10.6552 17.6912C10.6248 17.5964 10.6174 17.4957 10.6337 17.3975L11.2587 13.6475C11.2722 13.5665 11.3016 13.4889 11.3451 13.4192C11.3886 13.3495 11.4454 13.2891 11.5122 13.2414C11.5791 13.1936 11.6547 13.1596 11.7348 13.1411C11.8148 13.1227 11.8977 13.1201 11.9787 13.1337L18.75 14.2625V13.2725C18.75 13.1565 18.7177 13.0428 18.6568 12.9442C18.5959 12.8455 18.5087 12.7657 18.405 12.7137L11.595 9.30875C11.4913 9.25679 11.4041 9.17701 11.3432 9.07834C11.2823 8.97966 11.25 8.86597 11.25 8.75V3.75C11.25 3.21 11.1125 2.52625 10.8475 1.99875C10.5725 1.44875 10.2662 1.25 10 1.25C9.73375 1.25 9.4275 1.4475 9.1525 1.99875Z"
              fill="#7B2CBF"
            />
          </svg>
        ),
        name: "Elmwood International Flights",
        desc: "Return flights from your home country",
        price: "GH₵ 850",
      },
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M8.035 1.43875C8.385 0.73875 9.01625 0 10 0C10.9837 0 11.615 0.74 11.965 1.43875C12.3262 2.1625 12.5 3.03875 12.5 3.75V8.36375L18.9625 11.595C19.2742 11.7506 19.5364 11.99 19.7197 12.2863C19.9029 12.5826 20 12.9241 20 13.2725V15C20 15.0907 19.9802 15.1804 19.942 15.2627C19.9038 15.345 19.8482 15.418 19.779 15.4766C19.7097 15.5352 19.6286 15.5781 19.5411 15.6022C19.4537 15.6263 19.362 15.6311 19.2725 15.6162L12.3887 14.4687L11.92 17.285L13.5675 18.9325C13.6551 19.0199 13.7148 19.1314 13.739 19.2528C13.7633 19.3741 13.7509 19.5 13.7035 19.6143C13.6561 19.7287 13.5758 19.8264 13.4728 19.895C13.3698 19.9637 13.2488 20.0002 13.125 20H6.875C6.75122 20.0002 6.63017 19.9637 6.52718 19.895C6.4242 19.8264 6.34392 19.7287 6.29652 19.6143C6.24912 19.5 6.23674 19.3741 6.26095 19.2528C6.28516 19.1314 6.34487 19.0199 6.4325 18.9325L8.08125 17.285L7.61125 14.4687L0.7275 15.6162C0.638004 15.6311 0.546341 15.6263 0.45888 15.6022C0.371418 15.5781 0.290255 15.5352 0.221029 15.4766C0.151803 15.418 0.0961726 15.345 0.0580036 15.2627C0.0198346 15.1804 4.17625e-05 15.0907 0 15L0 13.2725C1.17688e-05 12.9241 0.0970907 12.5826 0.280348 12.2863C0.463605 11.99 0.725792 11.7506 1.0375 11.595L7.5 8.36375L7.5 3.75C7.5 3.04 7.675 2.16125 8.035 1.43875ZM9.1525 1.99875C8.88875 2.525 8.75 3.21125 8.75 3.75V8.75C8.75 8.86597 8.71772 8.97966 8.65679 9.07834C8.59587 9.17701 8.50868 9.25679 8.405 9.30875L1.595 12.7137C1.49132 12.7657 1.40413 12.8455 1.3432 12.9442C1.28228 13.0428 1.25 13.1565 1.25 13.2725L1.25 14.2625L8.0225 13.1337C8.18574 13.1066 8.35309 13.1453 8.48783 13.2414C8.62256 13.3375 8.7137 13.4831 8.74125 13.6462L9.36625 17.3962C9.38281 17.4947 9.37556 17.5956 9.34511 17.6906C9.31467 17.7857 9.26191 17.872 9.19125 17.9425L8.385 18.75H11.6175L10.8087 17.9425C10.7383 17.8722 10.6856 17.786 10.6552 17.6912C10.6248 17.5964 10.6174 17.4957 10.6337 17.3975L11.2587 13.6475C11.2722 13.5665 11.3016 13.4889 11.3451 13.4192C11.3886 13.3495 11.4454 13.2891 11.5122 13.2414C11.5791 13.1936 11.6547 13.1596 11.7348 13.1411C11.8148 13.1227 11.8977 13.1201 11.9787 13.1337L18.75 14.2625V13.2725C18.75 13.1565 18.7177 13.0428 18.6568 12.9442C18.5959 12.8455 18.5087 12.7657 18.405 12.7137L11.595 9.30875C11.4913 9.25679 11.4041 9.17701 11.3432 9.07834C11.2823 8.97966 11.25 8.86597 11.25 8.75V3.75C11.25 3.21 11.1125 2.52625 10.8475 1.99875C10.5725 1.44875 10.2662 1.25 10 1.25C9.73375 1.25 9.4275 1.4475 9.1525 1.99875Z"
              fill="#7B2CBF"
            />
          </svg>
        ),
        name: "Souvenir Bundle",
        desc: "Curated Ghanaian artisan souvenirs and gifts",
        price: "GH₵ 850",
      },
    ],
  },
};

const RELATED_TOURS = [
  {
    id: 1,
    image: "https://picsum.photos/seed/related-1/351/373",
    location: "Accra/Ghana",
    duration: { class: "Multi-Day", span: "5 Days/4 Nights" },
    maxGroupSize: 15,
    pickupIncluded: false,
    tags: ["Cultural", "Diaspora"],
    rating: 4.8,
    title: "The Homecoming Experience to Kakum National Park",
    availabilityBadge: "Opened Daily",
    price: "Ghs.400.00",
    country: "ghana",
    slug: "homecoming-kakum-national-park",
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/related-2/351/373",
    location: "Kumasi/Ghana",
    duration: { class: "Multi-Day", span: "4 Days/3 Nights" },
    maxGroupSize: 10,
    pickupIncluded: true,
    tags: ["Heritage", "Culture"],
    rating: 4.9,
    title: "Kumasi Heritage & Market Discovery",
    availabilityBadge: "Opened Daily",
    price: "Ghs.500.00",
    country: "ghana",
    slug: "kumasi-heritage-market-discovery",
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/related-3/351/373",
    location: "Volta Region/Ghana",
    duration: { class: "Day Tour", span: "1 Day" },
    maxGroupSize: 8,
    pickupIncluded: false,
    tags: ["Nature", "Scenic"],
    rating: 4.7,
    title: "Wli Waterfalls & Nature Exploration",
    availabilityBadge: "Opened Daily",
    price: "Ghs.450.00",
    country: "ghana",
    slug: "wli-waterfalls-nature-exploration",
  },
];

// ─── Icon components ──────────────────────────────────────────────────────────
const StarIcon = ({ filled = true, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path
      d="M7.02 1.47C7.35 0.51 8.65 0.51 8.98 1.47L9.97 4.43C10.1 4.83 10.47 5.1 10.88 5.1H13.97C14.97 5.1 15.38 6.38 14.57 6.95L12.08 8.77C11.73 9.02 11.58 9.47 11.71 9.87L12.7 12.83C13.03 13.79 11.93 14.59 11.12 14.02L8.63 12.2C8.25 11.93 7.75 11.93 7.37 12.2L4.88 14.02C4.07 14.59 2.97 13.79 3.3 12.83L4.29 9.87C4.42 9.47 4.27 9.02 3.92 8.77L1.43 6.95C0.62 6.38 1.03 5.1 2.03 5.1H5.12C5.53 5.1 5.9 4.83 6.03 4.43L7.02 1.47Z"
      fill={filled ? "#7B2CBF" : "none"}
      stroke={filled ? "none" : "#7B2CBF"}
      strokeWidth="1.2"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M4.16406 10.833L7.4974 14.1663L15.8307 5.83301"
      stroke="#7B2CBF"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const CrossIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M5 15L15 5M5 5L15 15"
      stroke="#FF3B30"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 9C9.105 9 10 8.105 10 7C10 5.895 9.105 5 8 5C6.895 5 6 5.895 6 7C6 8.105 6.895 9 8 9Z"
      stroke="#6f6f6f"
      strokeWidth="1.2"
    />
    <path
      d="M8 2C5.33 2 3 4.27 3 6.87C3 10.33 8 14 8 14C8 14 13 10.33 13 6.87C13 4.27 10.67 2 8 2Z"
      stroke="#6f6f6f"
      strokeWidth="1.2"
    />
  </svg>
);

const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M10 5.16666H9.5C9.5 5.99509 8.82843 6.66666 8 6.66666V7.16666V7.66666C9.38071 7.66666 10.5 6.54738 10.5 5.16666H10ZM8 7.16666V6.66666C7.17157 6.66666 6.5 5.99509 6.5 5.16666H6H5.5C5.5 6.54738 6.61929 7.66666 8 7.66666V7.16666ZM6 5.16666H6.5C6.5 4.33824 7.17157 3.66666 8 3.66666V3.16666V2.66666C6.61929 2.66666 5.5 3.78595 5.5 5.16666H6ZM8 3.16666V3.66666C8.82843 3.66666 9.5 4.33824 9.5 5.16666H10H10.5C10.5 3.78595 9.38071 2.66666 8 2.66666V3.16666ZM6 9.16666V9.66666H10V9.16666V8.66666H6V9.16666ZM10 13.1667V12.6667H6V13.1667V13.6667H10V13.1667ZM6 13.1667V12.6667C5.17157 12.6667 4.5 11.9951 4.5 11.1667H4H3.5C3.5 12.5474 4.61929 13.6667 6 13.6667V13.1667ZM12 11.1667H11.5C11.5 11.9951 10.8284 12.6667 10 12.6667V13.1667V13.6667C11.3807 13.6667 12.5 12.5474 12.5 11.1667H12ZM10 9.16666V9.66666C10.8284 9.66666 11.5 10.3382 11.5 11.1667H12H12.5C12.5 9.78595 11.3807 8.66666 10 8.66666V9.16666ZM6 9.16666V8.66666C4.61929 8.66666 3.5 9.78595 3.5 11.1667H4H4.5C4.5 10.3382 5.17157 9.66666 6 9.66666V9.16666Z"
      fill="#2D2D2D"
    />
    <path
      d="M5.16549 6.92577C5.06034 6.75685 4.86304 6.66666 4.66406 6.66666C3.83564 6.66666 3.16406 5.99509 3.16406 5.16666C3.16406 4.33824 3.83564 3.66666 4.66406 3.66666C4.86304 3.66666 5.06034 3.57648 5.16549 3.40756C5.17014 3.40009 5.17482 3.39264 5.17953 3.38521C5.3546 3.10887 5.26589 2.7176 4.94073 2.6818C4.84988 2.6718 4.75757 2.66666 4.66406 2.66666C3.28335 2.66666 2.16406 3.78595 2.16406 5.16666C2.16406 6.54738 3.28335 7.66666 4.66406 7.66666C4.75757 7.66666 4.84988 7.66153 4.94073 7.65153C5.26589 7.61573 5.3546 7.22446 5.17953 6.94812C5.17482 6.94069 5.17014 6.93324 5.16549 6.92577Z"
      fill="#2D2D2D"
    />
    <path
      d="M3.13626 12.2112C3.06058 12.085 2.92699 12 2.77979 12H2.66406C1.83564 12 1.16406 11.3284 1.16406 10.5C1.16406 9.67157 1.83564 9 2.66406 9H2.77979C2.92699 9 3.06058 8.91501 3.13626 8.78875C3.32099 8.48055 3.12052 8 2.76119 8H2.66406C1.28335 8 0.164062 9.11929 0.164062 10.5C0.164062 11.8807 1.28335 13 2.66406 13H2.76119C3.12052 13 3.32099 12.5194 3.13626 12.2112Z"
      fill="#2D2D2D"
    />
    <path
      d="M10.8153 6.94812C10.6402 7.22446 10.7289 7.61573 11.0541 7.65153C11.1449 7.66153 11.2372 7.66666 11.3307 7.66666C12.7114 7.66666 13.8307 6.54738 13.8307 5.16666C13.8307 3.78595 12.7114 2.66666 11.3307 2.66666C11.2372 2.66666 11.1449 2.6718 11.0541 2.6818C10.7289 2.7176 10.6402 3.10887 10.8153 3.38521C10.82 3.39264 10.8247 3.40009 10.8293 3.40756C10.9345 3.57648 11.1318 3.66666 11.3307 3.66666C12.1592 3.66666 12.8307 4.33824 12.8307 5.16666C12.8307 5.99509 12.1592 6.66666 11.3307 6.66666C11.1318 6.66666 10.9345 6.75685 10.8293 6.92577C10.8247 6.93324 10.82 6.94069 10.8153 6.94812Z"
      fill="#2D2D2D"
    />
    <path
      d="M12.8585 12.2112C12.6738 12.5194 12.8743 13 13.2336 13H13.3307C14.7114 13 15.8307 11.8807 15.8307 10.5C15.8307 9.11929 14.7114 8 13.3307 8H13.2336C12.8743 8 12.6738 8.48055 12.8585 8.78875C12.9342 8.91501 13.0678 9 13.215 9H13.3307C14.1592 9 14.8307 9.67157 14.8307 10.5C14.8307 11.3284 14.1592 12 13.3307 12H13.215C13.0678 12 12.9342 12.085 12.8585 12.2112Z"
      fill="#2D2D2D"
    />
  </svg>
);

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M8.5026 5.33333C8.5026 5.05719 8.27875 4.83333 8.0026 4.83333C7.72646 4.83333 7.5026 5.05719 7.5026 5.33333L8.0026 5.33333H8.5026ZM9.4847 10.0997C9.72385 10.2377 10.0296 10.1558 10.1677 9.91666C10.3058 9.67751 10.2238 9.37171 9.9847 9.23365L9.7347 9.66666L9.4847 10.0997ZM1.69026 1.77623C1.47463 1.94873 1.43966 2.26338 1.61217 2.47901C1.78467 2.69464 2.09932 2.7296 2.31495 2.5571L2.0026 2.16666L1.69026 1.77623ZM3.98162 1.22376C4.19725 1.05126 4.23221 0.736612 4.05971 0.520981C3.8872 0.30535 3.57255 0.270389 3.35692 0.442894L3.66927 0.833328L3.98162 1.22376ZM13.6903 2.5571C13.9059 2.7296 14.2205 2.69464 14.393 2.47901C14.5655 2.26338 14.5306 1.94873 14.315 1.77623L14.0026 2.16666L13.6903 2.5571ZM12.6483 0.442894C12.4327 0.270389 12.118 0.30535 11.9455 0.520981C11.773 0.736612 11.808 1.05126 12.0236 1.22376L12.3359 0.833328L12.6483 0.442894ZM8.14774 8.25993L8.61146 8.07294L8.14774 8.25993ZM8.42741 8.74433L8.03361 9.05242L8.42741 8.74433ZM8.0026 5.33333L7.5026 5.33333V6.66662H8.0026H8.5026L8.5026 5.33333H8.0026ZM14.6693 7.99999H14.1693C14.1693 11.4058 11.4084 14.1667 8.0026 14.1667V14.6667V15.1667C11.9606 15.1667 15.1693 11.958 15.1693 7.99999H14.6693ZM8.0026 14.6667V14.1667C4.59685 14.1667 1.83594 11.4058 1.83594 7.99999H1.33594H0.835938C0.835938 11.958 4.04456 15.1667 8.0026 15.1667V14.6667ZM1.33594 7.99999H1.83594C1.83594 4.59424 4.59685 1.83333 8.0026 1.83333V1.33333V0.833328C4.04456 0.833328 0.835938 4.04195 0.835938 7.99999H1.33594ZM8.0026 1.33333V1.83333C11.4084 1.83333 14.1693 4.59424 14.1693 7.99999H14.6693H15.1693C15.1693 4.04195 11.9606 0.833328 8.0026 0.833328V1.33333ZM2.0026 2.16666L2.31495 2.5571L3.98162 1.22376L3.66927 0.833328L3.35692 0.442894L1.69026 1.77623L2.0026 2.16666ZM14.0026 2.16666L14.315 1.77623L12.6483 0.442894L12.3359 0.833328L12.0236 1.22376L13.6903 2.5571L14.0026 2.16666ZM8.0026 6.66662H7.5026C7.5026 7.44719 7.49399 7.97568 7.68403 8.44693L8.14774 8.25993L8.61146 8.07294C8.51122 7.82436 8.5026 7.53059 8.5026 6.66662H8.0026ZM9.7347 9.66666L9.9847 9.23365C9.23647 8.80167 8.98636 8.64733 8.82121 8.43623L8.42741 8.74433L8.03361 9.05242C8.34671 9.45262 8.80871 9.7094 9.4847 10.0997L9.7347 9.66666ZM8.14774 8.25993L7.68403 8.44693C7.77162 8.66414 7.8893 8.86796 8.03361 9.05242L8.42741 8.74433L8.82121 8.43623C8.73462 8.32556 8.66401 8.20326 8.61146 8.07294L8.14774 8.25993Z"
      fill="#2D2D2D"
    />
  </svg>
);

const GlobeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M1.33594 8.00002C1.33594 8.70129 1.45624 9.37442 1.67735 10M1.67735 10H7.33594M1.67735 10C2.50102 12.3304 4.7235 14 7.33594 14C6.30648 14 5.45868 11.6666 5.34814 8.66669M8.6784 6H14.3369M14.3369 6C13.5133 3.66961 11.2908 2 8.6784 2C9.74567 2 10.6177 4.508 10.6753 7.66669M14.3369 6C14.5228 6.52578 14.6374 7.08522 14.6693 7.66669"
      stroke="#2D2D2D"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M1.33594 3.53123C1.33594 2.79899 1.33594 2.43287 1.46086 2.14893C1.59334 1.84783 1.82168 1.60581 2.10578 1.46541C2.37368 1.33301 2.71912 1.33301 3.41001 1.33301H4.0026C5.25968 1.33301 5.88822 1.33301 6.27874 1.74691C6.66927 2.16081 6.66927 2.82697 6.66927 4.1593V5.66535C6.66927 6.24651 6.66927 6.53709 6.49322 6.63695C6.31718 6.73681 6.08905 6.57562 5.6328 6.25325L5.56329 6.20413C5.22984 5.96853 5.06312 5.85073 4.87417 5.79009C4.68522 5.72946 4.48484 5.72946 4.08409 5.72946H3.41001C2.71912 5.72946 2.37368 5.72946 2.10578 5.59706C1.82168 5.45665 1.59334 5.21464 1.46086 4.91353C1.33594 4.6296 1.33594 4.26348 1.33594 3.53123Z"
      stroke="#2D2D2D"
    />
    <path
      d="M14.6693 11.5312C14.6693 10.799 14.6693 10.4329 14.5443 10.1489C14.4119 9.84781 14.1835 9.60581 13.8994 9.46541C13.6315 9.33301 13.2861 9.33301 12.5952 9.33301H12.0026C10.7455 9.33301 10.117 9.33301 9.72647 9.74694C9.33594 10.1608 9.33594 10.8269 9.33594 12.1593V13.6653C9.33594 14.2465 9.33594 14.5371 9.512 14.6369C9.688 14.7368 9.91614 14.5756 10.3724 14.2533L10.4419 14.2041C10.7753 13.9685 10.9421 13.8507 11.131 13.7901C11.32 13.7295 11.5203 13.7295 11.9211 13.7295H12.5952C13.2861 13.7295 13.6315 13.7295 13.8994 13.5971C14.1835 13.4567 14.4119 13.2147 14.5443 12.9135C14.6693 12.6296 14.6693 12.2635 14.6693 11.5312Z"
      stroke="#2D2D2D"
    />
  </svg>
);

const CancelIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M7.33333 1.33301C4.81917 1.33301 3.5621 1.33301 2.78105 2.0855C2 2.83799 2 4.04911 2 6.47136V11.9869C2 13.5241 2 14.2927 2.51523 14.5679C3.51298 15.1006 5.38453 13.3231 6.27333 12.7879C6.7888 12.4775 7.04653 12.3223 7.33333 12.3223C7.62013 12.3223 7.87787 12.4775 8.39333 12.7879C9.28213 13.3231 11.1537 15.1006 12.1515 14.5679C12.6667 14.2927 12.6667 13.5241 12.6667 11.9869V7.66634"
      stroke="#141B34"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2.33594 4.66699H7.33594"
      stroke="#141B34"
      stroke-linecap="round"
    />
    <path
      d="M14.0026 1.33301L9.33594 5.99937M14.0026 5.99967L9.33594 1.33331"
      stroke="#141B34"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const BookmarkIcon = ({ active }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M5 3H15C15.55 3 16 3.45 16 4V18L10 14.5L4 18V4C4 3.45 4.45 3 5 3Z"
      stroke="#6f6f6f"
      strokeWidth="1.5"
      fill={active ? "#7b2cbf" : "none"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ShareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="15" cy="4" r="2" stroke="#6f6f6f" strokeWidth="1.5" />
    <circle cx="15" cy="16" r="2" stroke="#6f6f6f" strokeWidth="1.5" />
    <circle cx="5" cy="10" r="2" stroke="#6f6f6f" strokeWidth="1.5" />
    <path d="M6.8 9L13.2 5M6.8 11L13.2 15" stroke="#6f6f6f" strokeWidth="1.5" />
  </svg>
);

const ChevronDownIcon = ({ open }) => (
  <svg
    className={classNames(
      "transition-transform duration-200 text-secondary-normal-default",
      !open ? "rotate-180" : ""
    )}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
  >
    <path fill="currentColor" d="m11 7l-4 6h8z" />
  </svg>
);

const GreenCheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className="flex-shrink-0"
  >
    <circle cx="8" cy="8" r="7" fill="#22c55e" />
    <path
      d="M4.5 8L6.5 10L11.5 5.5"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Converts ISO 3166-1 alpha-2 code → Twemoji flag SVG URL (illustrated emoji-style flags)
const flagUrl = (code) => {
  const base = 0x1f1e6;
  const pts = code
    .toUpperCase()
    .split("")
    .map((c) => (base + c.charCodeAt(0) - 65).toString(16));
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${pts.join("-")}.svg`;
};

// ─── Tour Hero Section — Figma 3075:39137 ─────────────────────────────────────
// Full-width section: title+meta header (pl-156px) + 4-photo image grid (h-717px)
// Must sit OUTSIDE the padded content container so images reach edge-to-edge.
//
// Image grid layout (all absolute-positioned within the 1728×717 frame):
//   Left carousel:   left-0       w-856px  h-717px (gap of 8px to right column)
//   Right column:    left-864px   w-864px  h-717px   flex-col gap-4px
//     ↳ Top image:   w-full       h-366px
//     ↳ Bottom row:  w-full       h-347px  flex gap-4px
//         Bottom-L:  w-430px      h-347px
//         Bottom-R:  flex-1       h-347px  + "Show all photos" button
//
// "Show all photos" button — Figma 3071:39004:
//   backdrop-blur(7.45px) bg rgba(123,44,191,0.5) border-[#f2eaf9] rounded-[10px]
//   left-248px top-294px  w-160px h-38px  within the 432×347 bottom-right image
const TourHeroSection = React.forwardRef(({ tourData, onOpenGallery }, ref) => {
  const [slideIndex, setSlideIndex] = useState(0);

  return (
    <div
      ref={ref}
      className="w-full flex flex-col bg-secondary-light-hover"
      style={{ gap: "16px" }}
    >
      {/* ── Title + meta row — Figma 3075:39109 ──────────────────────────── */}
      {/* pl-156px matches the standard page left gutter; pt-32px from gap to tab nav */}
      <div
        className="flex flex-col pl-[156px]"
        style={{ gap: "8px", paddingTop: "32px" }}
      >
        {/* h1 — Raleway SemiBold 39px/50lh #7b2cbf — Figma 3075:39111 */}
        <h1
          style={{
            fontFamily: "Raleway, sans-serif",
            fontWeight: 600,
            fontSize: "39px",
            lineHeight: "50px",
            color: "#7b2cbf",
            whiteSpace: "nowrap",
          }}
        >
          {tourData.title}
        </h1>

        {/* Meta row — Figma 3075:39112 — h-20px flex gap-8px */}
        <div
          className="flex items-center"
          style={{ gap: "8px", height: "20px" }}
        >
          {/* Star + rating + review count */}
          <div className="flex items-center" style={{ gap: "4px" }}>
            {/* star SVG 18×19px — Figma 3075:39115 */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M8.523 1.164c.292-.842 1.662-.842 1.954 0l1.12 3.232a1.04 1.04 0 0 0 .987.716h3.4c.893 0 1.264 1.145.542 1.67l-2.75 2.002a1.04 1.04 0 0 0-.378 1.163l1.052 3.042c.29.84-.69 1.54-1.408 1.017l-2.752-2.003a1.04 1.04 0 0 0-1.224 0L6.358 14.006c-.718.523-1.698-.176-1.408-1.017l1.052-3.042a1.04 1.04 0 0 0-.378-1.163L2.874 6.782c-.722-.525-.351-1.67.542-1.67h3.4a1.04 1.04 0 0 0 .987-.716L8.923 1.164Z"
                fill="#7b2cbf"
              />
            </svg>
            {/* rating value — Raleway SemiBold 13px #0a0a0a */}
            <span
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 600,
                fontSize: "13px",
                lineHeight: "18px",
                color: "#0a0a0a",
              }}
            >
              {tourData.rating}
            </span>
            {/* review count — Raleway SemiBold 13px #4a5565 */}
            <span
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 600,
                fontSize: "13px",
                lineHeight: "18px",
                color: "#4a5565",
              }}
            >
              ({tourData.reviewCount} reviews)
            </span>
          </div>

          {/* Dot separator — Inter Regular 14px #99a1af tracking-[-0.15px] */}
          <span
            aria-hidden="true"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "20px",
              color: "#99a1af",
              letterSpacing: "-0.1504px",
            }}
          >
            ·
          </span>

          {/* Location — Raleway SemiBold 13px #2d2d2d underline — Figma 3075:39124 */}
          <span
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 600,
              fontSize: "13px",
              lineHeight: "18px",
              color: "#2d2d2d",
              textDecoration: "underline",
              textDecorationStyle: "solid",
              whiteSpace: "nowrap",
            }}
          >
            {tourData.location}
          </span>
        </div>
      </div>

      {/* ── 4-photo image grid — Figma 3047:42325 ────────────────────────── */}
      {/* Full width, h-717px, border-r #d6beeb, overflow-hidden */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "717px", borderRight: "1px solid #d6beeb" }}
      >
        {/* LEFT: carousel — absolute, left-0, w-856px */}
        <div
          className="absolute left-0 top-0 overflow-hidden cursor-pointer"
          style={{ width: "856px", height: "717px" }}
          onClick={() => onOpenGallery(slideIndex)}
        >
          <img
            src={tourData.heroMainImage}
            alt={tourData.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* RIGHT: 3-image column — absolute, left-864px (8px gap), w-864px */}
        <div
          className="absolute top-0 flex flex-col"
          style={{ left: "864px", width: "864px", height: "717px", gap: "4px" }}
        >
          {/* Top image — h-366px, full right width */}
          <div
            className="overflow-hidden flex-shrink-0 cursor-pointer"
            style={{ width: "100%", height: "366px" }}
            onClick={() => onOpenGallery(1)}
          >
            <img
              src={tourData.heroTopRight}
              alt="Tour view 2"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom row — h-347px, two images side by side gap-4px */}
          <div className="flex" style={{ gap: "4px", height: "347px" }}>
            {/* Bottom-left — w-430px */}
            <div
              className="overflow-hidden flex-shrink-0 cursor-pointer"
              style={{ width: "430px", height: "347px" }}
              onClick={() => onOpenGallery(2)}
            >
              <img
                src={tourData.heroBottomLeft}
                alt="Tour view 3"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom-right — flex-1 (~432px), has "Show all photos" button */}
            <div
              className="relative overflow-hidden cursor-pointer"
              style={{ flex: "1 0 0", height: "347px" }}
              onClick={() => onOpenGallery(3)}
            >
              <img
                src={tourData.heroBottomRight}
                alt="Tour view 4"
                className="w-full h-full object-cover"
              />

              {/* "Show all photos" button — Figma 3071:39004
                  Frosted glass: backdrop-blur(7.45px) rgba(123,44,191,0.5) border-[#f2eaf9]
                  Position within image: left-248px top-294px
                  Interaction: opens image gallery carousel (pop-up) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenGallery(0);
                }}
                className="absolute flex items-center"
                style={{
                  left: "248px",
                  top: "294px",
                  width: "160px",
                  height: "38px",
                  borderRadius: "10px",
                  backdropFilter: "blur(7.45px)",
                  WebkitBackdropFilter: "blur(7.45px)",
                  backgroundColor: "rgba(123, 44, 191, 0.5)",
                  border: "1px solid #f2eaf9",
                  paddingLeft: "12px",
                  gap: "8px",
                }}
              >
                {/* Grid icon — Figma uses ⋮⋮ (two vertical ellipsis chars); rendered as SVG 4-square grid for crisp rendering */}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                  style={{ flexShrink: 0 }}
                >
                  <rect
                    x="0"
                    y="0"
                    width="5"
                    height="5"
                    rx="1"
                    fill="#ebdff5"
                  />
                  <rect
                    x="7"
                    y="0"
                    width="5"
                    height="5"
                    rx="1"
                    fill="#ebdff5"
                  />
                  <rect
                    x="0"
                    y="7"
                    width="5"
                    height="5"
                    rx="1"
                    fill="#ebdff5"
                  />
                  <rect
                    x="7"
                    y="7"
                    width="5"
                    height="5"
                    rx="1"
                    fill="#ebdff5"
                  />
                </svg>
                <span
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 600,
                    fontSize: "13px",
                    lineHeight: "18px",
                    color: "#f2eaf9",
                    whiteSpace: "nowrap",
                  }}
                >
                  Show all photos
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
TourHeroSection.displayName = "TourHeroSection";

// ─── Sticky section nav bar — Figma 3045:42287 ────────────────────────────────
// 1728×64px, bg #fefefe, borderBottom 2px solid #d6beeb, sticky below main nav
// Tabs: flex row gap-8px, left-aligned inside px-156px container
// Active:   SemiBold 13px/18lh #7b2cbf + 2px bottom border #7b2cbf
// Inactive: Medium   13px/22lh #565656 + transparent border
const DETAIL_TABS = [
  { key: "overview", label: "Overview" },
  { key: "itinerary", label: "Itinerary" },
  { key: "inclusions", label: "Inclusions" },
  { key: "tour-guide", label: "Tour Guide" },
  { key: "reviews", label: "Reviews" },
  { key: "location", label: "Location" },
];

const TourDetailNavBar = ({ activeSection, onTabClick }) => (
  <div
    className="w-full bg-[#fefefe] sticky z-40"
    style={{ top: "112px", height: "64px", borderBottom: "2px solid #d6beeb" }}
  >
    <div className="h-full flex items-center px-[156px]">
      <div className="flex items-center gap-[8px]">
        {DETAIL_TABS.map((tab) => {
          const isActive = activeSection === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTabClick(tab.key)}
              className="h-[63px] relative flex items-center justify-center px-[10px] flex-shrink-0 transition-colors"
              style={{
                borderBottom: isActive
                  ? "2px solid #7b2cbf"
                  : "2px solid transparent",
                marginBottom: "-2px", // align bottom border with bar's bottom border
              }}
            >
              <span
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontSize: "13px",
                  fontWeight: isActive ? 600 : 500,
                  lineHeight: isActive ? "18px" : "22px",
                  color: isActive ? "#7b2cbf" : "#565656",
                  whiteSpace: "nowrap",
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

// ─── Itinerary accordion item ──────────────────────────────────────────────────
const ItineraryDay = ({ day }) => {
  const [open, setOpen] = useState(day.day === 1);
  return (
    <div className="border border-[#e9eaeb] rounded-[12px] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-[20px] bg-white hover:bg-[#fafafa] transition-colors text-left"
      >
        <div className="flex items-center gap-[16px]">
          <div className="w-[36px] h-[36px] rounded-full  bg-secondary-normal-default flex items-center justify-center flex-shrink-0">
            <span className="text-white font-raleway font-bold text-[14px]">
              {day.day}
            </span>
          </div>
          <span className="font-raleway font-semibold text-[16px] text-[#2d2d2d]">
            Day {day.day}: {day.title}
          </span>
        </div>
        <ChevronDownIcon open={open} />
      </button>
      {open && (
        <div className="px-[20px] pb-[20px] bg-[#fafafa]">
          <div className="pl-[52px] flex flex-col gap-[8px]">
            {day.activities.map((activity, i) => (
              <div key={i} className="flex items-center gap-[8px]">
                <div className="w-[6px] h-[6px] rounded-full bg-[#7b2cbf] flex-shrink-0" />
                <span className="font-raleway font-normal text-[15px] text-[#4a4a4a]">
                  {activity}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Rating stars row ──────────────────────────────────────────────────────────
const ReviewStars = ({ rating, size = 14 }) => (
  <div className="flex items-center gap-[2px]">
    {[1, 2, 3, 4, 5].map((s) => (
      <StarIcon key={s} filled={s <= Math.round(rating)} size={size} />
    ))}
  </div>
);

// ─── ItineraryStep ────────────────────────────────────────────────────────────
// Figma 3111:40578 — step circle (48px) + vertical connector line + accordion
// Active circle: bg-#7b2cbf border-2 white, text white   Inactive: bg-#ebdff5 border-#d6beeb, text #7b2cbf
const ItineraryStep = ({ day, isFirst }) => {
  const [open, setOpen] = useState(isFirst);
  return (
    <div className="flex flex-col gap-4.5  border rounded-[14px] px-5 py-4 border-[#E8D9F5] ">
      <div className=" flex items-center gap-[14px]">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full text-left cursor-pointer  flex items-center justify-between"
        >
          {/* Circle */}
          <div className="size-[36px] mr-[14px] flex items-center justify-center shrink-0 bg-secondary-normal-default rounded-full ">
            <span className="text-white text-[13px] font-bold">{day.day}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-[15px] font-bold text-secondary-dark-hover">
              {day.title}
            </h3>
            <p className="text-[12px] text-[#6B7280] ">{day.preview}</p>
          </div>
          <ChevronDownIcon open={open} />
        </button>
      </div>
      {/* Content */}
      {open && (
        <div className="flex-1">
          <div className="flex flex-col gap-3.5">
            {/* Locoal context */}
            <div className="border-l-3 border-secondary-normal-default px-4.5 py-3 bg-[#F3E8FF80] rounded-r-sm ">
              <span className="text-[14px] font-bold text-secondary-dark-hover">
                Local Context:
                <span className="text-[14px] font-medium ">
                  {day.localContext}
                </span>
              </span>
            </div>

            {/* Activities */}
            <div className="flex flex-col divide-y divide-[#F3E8FF]">
              {day.activities.map((act, i) => (
                <div key={i} className="flex py-3 items-start">
                  <div className="flex gap-6">
                    <span className="text-[12px] text-secondary-normal-default font-bold">
                      {act.time}
                    </span>
                    <div className="flex-col flex gap-1">
                      <span className="text-[13px] text-tertiary-normal-default">
                        {act.activity}
                      </span>
                      {act.tag && (
                        <span className="text-[10px] text-secondary-dark-hover w-fit rounded-[20px] font-bold px-[7px] py-0.5 bg-secondary-light-hover">
                          {act.tag}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── AddOnRow ─────────────────────────────────────────────────────────────────
// Figma 3112:40669 — icon + name + desc on left; price + checkbox on right
const AddOnRow = ({ addon }) => {
  const [selected, setSelected] = useState(false);
  return (
    <div className="flex items-center pl-1.5 pr-6 justify-between">
      <div>
        <div className="flex items-center gap-2">
          {/* Icon chip */}
          <div>{addon.icon}</div>
          <div>
            <p className="text-semi-md-semibold text-tertiary-normal-default">
              {addon.name}
            </p>
          </div>
        </div>
        <p className="text-med-small-Medium text-secondary-dark-default">
          {addon.desc}
        </p>{" "}
      </div>

      <div className="flex items-center" style={{ gap: "14px", flexShrink: 0 }}>
        <span
          style={{
            fontFamily: "Raleway, sans-serif",
            fontWeight: 600,
            fontSize: "14px",
            color: "#7b2cbf",
            whiteSpace: "nowrap",
          }}
        >
          + {addon.price}
        </span>
        <button
          type="button"
          onClick={() => setSelected(!selected)}
          style={{
            width: "24px",
            height: "24px",
            flexShrink: 0,
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          {selected ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="4" fill="#7b2cbf" />
              <path
                d="M7 12L10 15L17 8"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect
                x="2"
                y="2"
                width="20"
                height="20"
                rx="4"
                stroke="#d1d5dc"
                strokeWidth="1.5"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

// ─── GuideCard ────────────────────────────────────────────────────────────────
// Figma 3112:40961 — rounded-30px card; left photo panel (gradient #2b0f43→#6c26a9)
// Right content: name / subtitle / language+cert badges / 2 testimonial quotes / link
const GuideCard = ({ guide }) => (
  <div className="relative overflow-hidden min-h-[393px] border border-secondary-light-active rounded-[30px] bg-[#FEFEFE] flex">
    {/* Left: photo panel */}
    <div
      className="relative flex-shrink-0 overflow-hidden"
      style={{ width: "296px" }}
    >
      {/* Gradient behind image so transparent PNG reveals gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(180deg, #2b0f43 0%, #6c26a9 100%)",
        }}
      />

      <div
        className="w-[455px] h-[324px] absolute inset-0 z-0 bg-secondary-light-default rounded-4xl  top-[60%] left-[50%] translate-x-[-50%]"
        style={{
          filter: "blur(50px)",
        }}
      />
      <img
        src={guide.image}
        alt={guide.name}
        className="relative z-[1] h-full w-full object-cover"
        style={{ borderRadius: "28px 0 0 28px" }}
      />
    </div>

    {/* Right: content */}
    <div
      className="flex-1 py-[32px] flex flex-col justify-center"
      style={{ padding: "32px 32px 32px 36px" }}
    >
      {/* Name */}
      <h3 className="max-w-[509px] text-semi-md-semibold text-tertiary-normal-default">
        {guide.name}
      </h3>
      {/* Subtitle */}
      <p className="max-w-[509px] mb-5 text-med-small-Medium text-secondary-dark-default">
        {guide.speciality} · {guide.yearsExp} Years Experience
      </p>
      {/* Language + certification badges */}
      <div
        className="flex flex-wrap max-w-[509px]"
        style={{ gap: "8px", marginBottom: "24px" }}
      >
        {(guide.languages || []).map((lang) => (
          <span
            key={lang.code}
            className="inline-flex items-center gap-[5px] bg-secondary-light-default text-[#0A0A0A] text-med-small-regular rounded-[15px] px-[9.5px] py-[2.5px] border border-secondary-light-active"
          >
            {/* Twemoji SVG — illustrated emoji-style flag, cross-platform (no Windows emoji font needed) */}
            <img src={flagUrl(lang.code)} alt="" width={13} height={13} style={{ flexShrink: 0 }} />
            {lang.name}
          </span>
        ))}
        {(guide.certifications || []).map((cert) => (
          <span
            key={cert}
            style={{
              fontFamily: "Raleway, sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              color: "#4a1a73",
              backgroundColor: "#f2eaf9",
              border: "1px solid #d6beeb",
              borderRadius: "100px",
              padding: "4px 12px",
            }}
          >
            {cert}
          </span>
        ))}
      </div>
      {/* divider */}
      <div className="h-px w-full bg-secondary-light-hover max-w-[551px] mb-3" />

      {/* Testimonial quotes — border-l-2 #7b2cbf */}
      <div
        className="flex flex-col max-w-[509px]"
        style={{ gap: "16px", marginBottom: "24px" }}
      >
        {(guide.testimonials || []).map((t, i) => (
          <div
            key={i}
            style={{ borderLeft: "2px solid #7b2cbf", paddingLeft: "14px" }}
          >
            <p
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "22px",
                color: "#364153",
                fontStyle: "italic",
              }}
            >
              "{t.quote}"
            </p>
            <p
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 600,
                fontSize: "12px",
                color: "#6a7282",
                marginTop: "4px",
              }}
            >
              — {t.reviewer}, {t.date}
            </p>
          </div>
        ))}
        {/* View Full Details link */}
        <button
          type="button"
          style={{
            alignSelf: "flex-end",
            fontFamily: "Raleway, sans-serif",
            fontWeight: 600,
            fontSize: "14px",
            color: "#7b2cbf",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          View Full Details →
        </button>
      </div>
    </div>
  </div>
);

// ─── ReviewsSection ───────────────────────────────────────────────────────────
// Figma 3123:42908 — 4.9 score + category bars + filter tabs + 4 review cards
const REVIEW_FILTER_TABS = [
  "All",
  "Cultural Interests",
  "Cleanness",
  "International",
  "Business",
  "Groups",
];

const ReviewsSection = ({ tourData }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  return (
    <div>
      {/* Rating overview */}
      <div
        className="flex items-start"
        style={{ gap: "48px", marginBottom: "28px" }}
      >
        {/* Big number + stars */}
        <div
          className="flex flex-col items-center flex-shrink-0"
          style={{ gap: "8px", width: "127px" }}
        >
          <span
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 700,
              fontSize: "56px",
              lineHeight: "56px",
              color: "#0a0a0a",
            }}
          >
            {tourData.rating}
          </span>
          <ReviewStars rating={tourData.rating} size={18} />
          <span
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 400,
              fontSize: "13px",
              color: "#6a7282",
              marginTop: "2px",
            }}
          >
            {(tourData.totalReviews || 3249).toLocaleString()} reviews
          </span>
        </div>
        {/* Category rating bars */}
        <div
          className="flex-1 flex flex-col"
          style={{ gap: "18px", paddingTop: "8px" }}
        >
          {(tourData.categoryRatings || []).map(({ label, score }) => (
            <div
              key={label}
              className="flex items-center"
              style={{ gap: "12px" }}
            >
              <span
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 500,
                  fontSize: "13px",
                  lineHeight: "20px",
                  color: "#364153",
                  width: "140px",
                  flexShrink: 0,
                }}
              >
                {label}
              </span>
              <div
                className="flex-1 overflow-hidden"
                style={{
                  height: "8px",
                  borderRadius: "100px",
                  backgroundColor: "#e9eaeb",
                }}
              >
                <div
                  style={{
                    width: `${(score / 5) * 100}%`,
                    height: "100%",
                    backgroundColor: "#7b2cbf",
                    borderRadius: "100px",
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 600,
                  fontSize: "13px",
                  color: "#364153",
                  width: "32px",
                  textAlign: "right",
                  flexShrink: 0,
                }}
              >
                {score}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div
        className="flex items-center flex-wrap"
        style={{ gap: "8px", marginBottom: "28px" }}
      >
        {REVIEW_FILTER_TABS.map((tab) => {
          const isActive = activeFilter === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveFilter(tab)}
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: isActive ? 600 : 500,
                fontSize: "13px",
                lineHeight: "22px",
                color: isActive ? "#7b2cbf" : "#364153",
                backgroundColor: isActive ? "#f2eaf9" : "#fafafa",
                border: `1.5px solid ${isActive ? "#d6beeb" : "#e9eaeb"}`,
                borderRadius: "100px",
                padding: "6px 16px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Review cards */}
      <div className="flex flex-col">
        {tourData.reviews.map((review) => (
          <div
            key={review.id}
            style={{ padding: "28px 10px", borderBottom: "1px solid #ebdff5" }}
          >
            <div className="flex items-start" style={{ gap: "16px" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p
                      style={{
                        fontFamily: "Raleway, sans-serif",
                        fontWeight: 600,
                        fontSize: "15px",
                        lineHeight: "22px",
                        color: "#2d2d2d",
                      }}
                    >
                      {review.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "Raleway, sans-serif",
                        fontWeight: 400,
                        fontSize: "12px",
                        color: "#6a7282",
                        marginTop: "2px",
                      }}
                    >
                      {review.date}
                    </p>
                  </div>
                  <ReviewStars rating={review.rating} size={14} />
                </div>
                <p
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 400,
                    fontSize: "15px",
                    lineHeight: "24px",
                    color: "#364153",
                    marginTop: "12px",
                  }}
                >
                  {review.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More — centered, w=215px h=56px — Figma 3126:43291 */}
      <div className="flex justify-center" style={{ marginTop: "32px" }}>
        <button
          type="button"
          style={{
            width: "215px",
            height: "56px",
            borderRadius: "40px",
            border: "1.5px solid #7b2cbf",
            color: "#7b2cbf",
            fontFamily: "Raleway, sans-serif",
            fontWeight: 600,
            fontSize: "15px",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
        >
          Load More Reviews
        </button>
      </div>
    </div>
  );
};

// ─── BookingWidget ────────────────────────────────────────────────────────────
// Figma 3156:45940 — 457×755px card; gradient header + 3-step stepper + date inputs
// + traveler counters + Check Availability CTA + free cancellation notice
const BookingWidget = ({
  tourData,
  adults,
  setAdults,
  children,
  setChildren,
  departureDate,
  setDepartureDate,
  returnDate,
  setReturnDate,
  bookmarked,
  setBookmarked,
}) => (
  <div
    style={{
      width: "457px",
      borderRadius: "24px",
      border: "1px solid #d6beeb",
      overflow: "hidden",
      boxShadow: "0px 20px 25px -5px rgba(0,0,0,0.1)",
      backgroundColor: "white",
    }}
  >
    {/* ── Gradient header — bg from-#7b2cbf to-#391559, h-140px ─────── */}
    <div
      style={{
        height: "140px",
        background: "linear-gradient(180deg, #7b2cbf 0%, #391559 100%)",
        padding: "24px 24px 0 18px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <p
        style={{
          fontFamily: "Raleway, sans-serif",
          fontWeight: 500,
          fontSize: "10px",
          lineHeight: "18px",
          color: "#d6beeb",
          letterSpacing: "0.08em",
        }}
      >
        FROM
      </p>
      <p
        style={{
          fontFamily: "Raleway, sans-serif",
          fontWeight: 700,
          fontSize: "39px",
          lineHeight: "50px",
          color: "white",
          margin: 0,
        }}
      >
        GH₵ 4,590
      </p>
      <p
        style={{
          fontFamily: "Raleway, sans-serif",
          fontWeight: 500,
          fontSize: "13px",
          lineHeight: "22px",
          color: "#ebdff5",
          margin: 0,
        }}
      >
        per person · USD ~$290 equivalent
      </p>
    </div>

    {/* ── 3-step stepper — h-105px border-b #f2eaf9 ─────────────────── */}
    <div
      style={{
        height: "105px",
        borderBottom: "1px solid #f2eaf9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="flex items-center" style={{ gap: "12px" }}>
        {/* Step 1 — active */}
        <div
          className="flex flex-col items-center"
          style={{ gap: "8px", width: "91px" }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "100px",
              backgroundColor: "#7b2cbf",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 600,
                fontSize: "13px",
                color: "white",
              }}
            >
              1
            </span>
          </div>
          <span
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              lineHeight: "18px",
              color: "#7b2cbf",
            }}
          >
            Dates
          </span>
        </div>
        {/* Connector line */}
        <div
          style={{
            width: "47px",
            height: "2px",
            borderRadius: "10px",
            backgroundColor: "#ebdff5",
          }}
        />
        {/* Step 2 — inactive */}
        <div
          className="flex flex-col items-center"
          style={{ gap: "8px", width: "91px" }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "100px",
              backgroundColor: "#f2eaf9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 600,
                fontSize: "13px",
                color: "#d6beeb",
              }}
            >
              2
            </span>
          </div>
          <span
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 600,
              fontSize: "13px",
              lineHeight: "18px",
              color: "#d6beeb",
            }}
          >
            Review
          </span>
        </div>
        {/* Connector line */}
        <div
          style={{
            width: "47px",
            height: "2px",
            borderRadius: "10px",
            backgroundColor: "#ebdff5",
          }}
        />
        {/* Step 3 — inactive */}
        <div
          className="flex flex-col items-center"
          style={{ gap: "8px", width: "91px" }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "100px",
              backgroundColor: "#f2eaf9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 600,
                fontSize: "13px",
                color: "#d6beeb",
              }}
            >
              3
            </span>
          </div>
          <span
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 600,
              fontSize: "13px",
              lineHeight: "18px",
              color: "#d6beeb",
            }}
          >
            Payment
          </span>
        </div>
      </div>
    </div>

    {/* ── Content area ─────────────────────────────────────────────────── */}
    <div
      style={{
        padding: "24px 28px 0",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* CHOOSE YOUR DATE */}
      <div>
        <p
          style={{
            fontFamily: "Raleway, sans-serif",
            fontWeight: 700,
            fontSize: "13px",
            lineHeight: "18px",
            color: "#4a1a73",
            marginBottom: "16px",
          }}
        >
          CHOOSE YOUR DATE
        </p>
        <div className="grid grid-cols-2" style={{ gap: "16px" }}>
          <div>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "12px",
                color: "#6a7282",
                textTransform: "uppercase",
                marginBottom: "8px",
                letterSpacing: "0.04em",
              }}
            >
              DEPARTURE
            </p>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              style={{
                width: "100%",
                height: "42px",
                borderRadius: "10px",
                border: "1px solid #d1d5dc",
                padding: "0 12px",
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                color: "#0a0a0a",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "12px",
                color: "#6a7282",
                textTransform: "uppercase",
                marginBottom: "8px",
                letterSpacing: "0.04em",
              }}
            >
              RETURN
            </p>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              style={{
                width: "100%",
                height: "42px",
                borderRadius: "10px",
                border: "1px solid #d1d5dc",
                padding: "0 12px",
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                color: "#0a0a0a",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>
      </div>

      {/* TRAVELERS */}
      <div>
        <p
          style={{
            fontFamily: "Raleway, sans-serif",
            fontWeight: 700,
            fontSize: "13px",
            lineHeight: "18px",
            color: "#4a1a73",
            marginBottom: "12px",
          }}
        >
          Travelers
        </p>
        <div className="flex flex-col" style={{ gap: "0" }}>
          {/* Adults */}
          <div
            className="flex items-center justify-between"
            style={{ padding: "10px 0" }}
          >
            <div>
              <p
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 600,
                  fontSize: "13px",
                  lineHeight: "20px",
                  color: "#2d2d2d",
                }}
              >
                Adults
              </p>
              <p
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 500,
                  fontSize: "10px",
                  color: "#7b2cbf",
                }}
              >
                Age 13+
              </p>
            </div>
            <div className="flex items-center" style={{ gap: "12px" }}>
              <button
                type="button"
                onClick={() => setAdults(Math.max(1, adults - 1))}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border: "2px solid #d6beeb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#7b2cbf",
                  fontSize: "18px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                  lineHeight: 1,
                }}
              >
                −
              </button>
              <span
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 600,
                  fontSize: "20px",
                  color: "#4a1a73",
                  width: "32px",
                  textAlign: "center",
                }}
              >
                {adults}
              </span>
              <button
                type="button"
                onClick={() => setAdults(adults + 1)}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border: "2px solid #d6beeb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#7b2cbf",
                  fontSize: "18px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                  lineHeight: 1,
                }}
              >
                +
              </button>
            </div>
          </div>
          {/* Children */}
          <div
            className="flex items-center justify-between"
            style={{ padding: "10px 0" }}
          >
            <div>
              <p
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 600,
                  fontSize: "13px",
                  lineHeight: "20px",
                  color: "#2d2d2d",
                }}
              >
                Children
              </p>
              <p
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 500,
                  fontSize: "10px",
                  color: "#7b2cbf",
                }}
              >
                Age 4–12
              </p>
            </div>
            <div className="flex items-center" style={{ gap: "12px" }}>
              <button
                type="button"
                onClick={() => setChildren(Math.max(0, children - 1))}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border: "2px solid #d6beeb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#7b2cbf",
                  fontSize: "18px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                  lineHeight: 1,
                }}
              >
                −
              </button>
              <span
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 600,
                  fontSize: "20px",
                  color: "#4a1a73",
                  width: "32px",
                  textAlign: "center",
                }}
              >
                {children}
              </span>
              <button
                type="button"
                onClick={() => setChildren(children + 1)}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border: "2px solid #d6beeb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#7b2cbf",
                  fontSize: "18px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                  lineHeight: 1,
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA ACTIONS */}
      <div className="flex flex-col" style={{ gap: "12px" }}>
        {/* Check Availability — h-52px rounded-40px bg-#7b2cbf */}
        <button
          type="button"
          style={{
            width: "100%",
            height: "52px",
            borderRadius: "40px",
            backgroundColor: "#7b2cbf",
            border: "1px solid #7b2cbf",
            color: "#f2eaf9",
            fontFamily: "Raleway, sans-serif",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "22px",
            cursor: "pointer",
            boxShadow: "0px 4px 4px rgba(0,0,0,0.05)",
          }}
        >
          Check Availability
        </button>
        {/* Save to Wishlist — send/arrow icon + text */}
        <button
          type="button"
          onClick={() => setBookmarked(!bookmarked)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            padding: "8px 0",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            style={{ transform: "scaleY(-1)" }}
          >
            <path
              d="M1.5 1.5L16.5 9L1.5 16.5V11.25L11.5 9L1.5 6.75V1.5Z"
              stroke={bookmarked ? "#7b2cbf" : "#2d2d2d"}
              fill={bookmarked ? "#7b2cbf" : "none"}
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 500,
              fontSize: "13px",
              color: "#2d2d2d",
            }}
          >
            Save to Wishlist
          </span>
        </button>
      </div>
    </div>

    {/* Free cancellation notice — absolute-like, pinned at bottom of widget */}
    <div
      style={{
        margin: "0 28px 28px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "0 11px",
        backgroundColor: "rgba(235,223,245,0.5)",
        border: "1px solid #d6beeb",
        borderRadius: "10px",
        height: "40px",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        style={{ flexShrink: 0 }}
      >
        <circle cx="8" cy="8" r="7" fill="#22c55e" />
        <path
          d="M4.5 8L6.5 10L11.5 5.5"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        style={{
          fontFamily: "Raleway, sans-serif",
          fontWeight: 500,
          fontSize: "13px",
          lineHeight: "22px",
          color: "#7b2cbf",
          whiteSpace: "nowrap",
        }}
      >
        Free cancellation up to 48 hours before departure
      </span>
    </div>
  </div>
);

// ─── TourDetailPage ────────────────────────────────────────────────────────────
const TourDetailPage = () => {
  const { country, tour } = useParams();
  // activeSection drives the sticky nav bar tabs
  const [activeSection, setActiveSection] = useState("overview");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(2);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const tourData =
    TOUR_DATA[tour] || TOUR_DATA["elmina-heritage-coastal-journey"];
  const countryDisplay = country
    ? country.charAt(0).toUpperCase() + country.slice(1)
    : "Ghana";

  const openGallery = (index = 0) => {
    setGalleryIndex(index);
    setGalleryOpen(true);
  };

  // Scroll to section when nav tab is clicked (offset = navbar 112px + detail nav 64px + 8px buffer)
  const scrollToSection = useCallback((key) => {
    setActiveSection(key);
    const el = document.getElementById(`section-${key}`);
    if (!el) return;
    const offset = 112 + 64 + 8;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  // Update active section as user scrolls (highlight whichever section is in the middle of the viewport)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = entry.target.id.replace("section-", "");
            setActiveSection(key);
          }
        });
      },
      // Trigger when section crosses the midpoint of the viewport
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    DETAIL_TABS.forEach(({ key }) => {
      const el = document.getElementById(`section-${key}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main
      className="w-full bg-secondary-light-default min-h-screen"
      style={{ fontFamily: "Raleway, sans-serif" }}
    >
      {/* Breadcrumb */}
      <BlogBreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Tours", href: "/tours" },
          { label: countryDisplay, href: `/tours/${country}` },
          { label: tourData.title, href: "#" },
        ]}
      />

      {/* Sticky section nav — Figma 3045:42287 */}
      <TourDetailNavBar
        activeSection={activeSection}
        onTabClick={scrollToSection}
      />

      {/* Full-width tour hero — Figma 3075:39137
          Title + meta (pl-156px) + 4-photo image grid (h-717px)
          Must be OUTSIDE the padded content div so images reach both edges */}
      <TourHeroSection tourData={tourData} onOpenGallery={openGallery} />

      {/* ── Main content — Figma Frame 1000006773 ────────────────────────────────
           px-156px matches page gutter (same as hero title / sticky nav)
           Left col max-w-928px + gap + right widget 457px sticky              */}
      <div className="px-[156px] pt-[56px] pb-[80px]">
        <div className="flex gap-[32px] items-start">
          {/* ── LEFT CONTENT — w=928px ─────────────────────────────────── */}
          <div className="flex-1 max-w-[928px] min-w-0 flex flex-col">
            {/* ① OVERVIEW: Tour Meta Bar + About The Tour ─ id=section-overview */}
            <div id="section-overview" className="mb-6">
              {/* Meta subtitle — "3-day tour hosted by Heritage Guides" */}
              <p className="text-semi-md-semibold text-secondary-dark-hover mb-3">
                3-day tour hosted by Heritage Guides
              </p>
              {/* Info bar: Users · Duration · Languages · Cancellation */}
              <div
                className="flex items-center flex-wrap"
                style={{ gap: "8px" }}
              >
                <span className="flex items-center gap-2 text-med-small-semibold text-tertiary-normal-default">
                  <UsersIcon /> <span>Max {tourData.maxGuests} guests</span>
                </span>
                <span style={{ color: "#99a1af" }}>·</span>
                <span className="flex items-center  gap-2 text-med-small-semibold text-tertiary-normal-default">
                  <ClockIcon /> <span>{tourData.duration}</span>
                </span>
                <span style={{ color: "#99a1af" }}>·</span>
                <span className="flex items-center  gap-2 text-med-small-semibold text-tertiary-normal-default">
                  <GlobeIcon /> <span>{tourData.languages}</span>
                </span>
                <span style={{ color: "#99a1af" }}>·</span>
                <span className="flex items-center  gap-2 text-med-small-semibold text-tertiary-normal-default">
                  <CancelIcon /> <span>{tourData.cancellation}</span>
                </span>
              </div>

              {/* Divider */}
              <div className="h-[1.5px] mt-[21px] mb-6 bg-secondary-light-hover" />

              {/* About The Tour heading */}
              <div className="bg-white p-5 flex flex-col gap-4 rounded-xl border border-secondary-light-hover ">
                <h2 className="text-semi-md-semibold text-secondary-dark-hover">
                  About The Tour
                </h2>
                {/* Description */}
                <p
                  dangerouslySetInnerHTML={{ __html: tourData.description }}
                  className="text-md-regular text-[#364153]"
                />

                {/* Read More button */}
                <Button href="/" variant="link" className="w-fit  " size="link">
                  Read More
                </Button>

                {/* Best For tags */}
                <div className="flex bg-[#EBDFF580] border  mb-4 border-secondary-light-active rounded-[10px] flex-wrap p-2.5 gap-1 items-center">
                  <span className="text-med-small-semibold text-secondary-normal-default">
                    Best For:
                  </span>
                  <div className="flex flex-wrap items-center gap-1">
                    {tourData.bestFor.map((tag, i) => (
                      <React.Fragment key={tag}>
                        {i > 0 && (
                          <span
                            className="mx-1 inline-flex shrink-0 items-center justify-center select-none leading-none"
                            aria-hidden="true"
                          >
                            <span className="block h-[2px] w-[2px] shrink-0 rounded-full bg-tertiary-normal-default" />
                          </span>
                        )}
                        <span className="text-med-small-Medium text-tertiary-normal-default">
                          {tag}
                        </span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ② WHAT'S INCLUDED ─ id=section-inclusions */}
            <div
              id="section-inclusions"
              className="bg-white p-5 flex flex-col gap-4 mb-6 rounded-xl border border-secondary-light-hover"
            >
              <h2 className="text-semi-md-semibold text-secondary-dark-hover">
                What's included
              </h2>
              <div className="grid grid-cols-2" style={{ gap: "16px 40px" }}>
                {tourData.included.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center"
                    style={{ gap: "12px" }}
                  >
                    {item.type === "check" ? <CheckIcon /> : <CrossIcon />}
                    <span className="text-md-Medium text-[#364153]">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ③ ITINERARY ─ id=section-itinerary */}
            {/* Step circles (48px) + vertical connector line + expandable days */}
            <div
              id="section-itinerary"
              className="bg-white px-8.5 mb-6 py-7.5 flex flex-col gap-4 rounded-xl border border-secondary-light-hover"
            >
              <h2 className="text-semi-md-bold text-secondary-dark-hover">
                Day-by-Day Itinerary
              </h2>
              <p className="text-[14px] font-medium text-[#6B7280]">
                A structured 5-day programme with flexibility for your schedule
              </p>
              <div className="relative ">
                {/* Vertical connector line linking all circles */}

                <div className="flex flex-col gap-3">
                  {tourData.itinerary.map((day, idx) => (
                    <ItineraryStep
                      key={day.day}
                      day={day}
                      isFirst={idx === 0}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ④ OPTIONAL ADD-ONS */}
            <div className="bg-white mb-6 pl-5 pr-2 pt-7.5 pb-12 flex flex-col gap-4 rounded-xl border border-secondary-light-hover">
              <h2 className="text-semi-md-bold text-secondary-dark-hover">
                + Optional Add-ons
              </h2>
              <div className="flex mb-6 flex-col gap-4">
                {tourData.addOns.map((addon, i) => (
                  <AddOnRow key={i} addon={addon} />
                ))}
              </div>
            </div>

            {/* ⑤ MEET YOUR TOUR GUIDE ─ id=section-tour-guide */}
            <div
              id="section-tour-guide"
              className="pb-[50px] border-b border-secondary-light-hover"
            >
              <h2 className="text-semi-md-semibold text-secondary-dark-hover mb-5 ml-5">
                Meet Your Tour Guide
              </h2>
              <GuideCard guide={tourData.guide} />
            </div>

            {/* ⑥ WHAT OUR TRAVELERS SAY ─ id=section-reviews */}
            <div
              id="section-reviews"
              style={{ padding: "32px 0", borderBottom: "1.5px solid #ebdff5" }}
            >
              <h2
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 600,
                  fontSize: "20px",
                  lineHeight: "28px",
                  color: "#4a1a73",
                  marginBottom: "24px",
                }}
              >
                What Our Travelers Say
              </h2>
              <ReviewsSection tourData={tourData} />
            </div>

            {/* ⑦ MEETING POINT & LOCATION ─ id=section-location */}
            <div
              id="section-location"
              style={{ padding: "32px 0", borderBottom: "1.5px solid #ebdff5" }}
            >
              <h2
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 600,
                  fontSize: "20px",
                  lineHeight: "28px",
                  color: "#4a1a73",
                  marginBottom: "20px",
                }}
              >
                Meeting Point & Location
              </h2>
              {/* Map placeholder — 928×393px */}
              <div
                className="relative w-full overflow-hidden"
                style={{
                  height: "393px",
                  borderRadius: "16px",
                  backgroundColor: "#e9eaeb",
                }}
              >
                {/* Grid overlay */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg,#9ca3af 0,#9ca3af 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#9ca3af 0,#9ca3af 1px,transparent 1px,transparent 40px)",
                  }}
                />
                {/* Map pin + label */}
                <div
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%,-60%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <svg width="38" height="47" viewBox="0 0 38 47" fill="none">
                    <path
                      d="M19 0C8.51 0 0 8.51 0 19C0 33.25 19 47 19 47C19 47 38 33.25 38 19C38 8.51 29.49 0 19 0Z"
                      fill="#7b2cbf"
                    />
                    <circle cx="19" cy="19" r="8" fill="white" />
                  </svg>
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                      fontFamily: "Raleway, sans-serif",
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#2d2d2d",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Accra, Greater Accra Region
                  </div>
                </div>
                {/* Get Directions button */}
                <button
                  type="button"
                  style={{
                    position: "absolute",
                    right: "16px",
                    bottom: "16px",
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#2d2d2d",
                    backgroundColor: "white",
                    border: "1px solid #e9eaeb",
                    borderRadius: "8px",
                    padding: "10px 18px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                    cursor: "pointer",
                  }}
                >
                  Get Directions →
                </button>
              </div>
              {/* Pickup note */}
              <p
                style={{
                  marginTop: "16px",
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "22px",
                  color: "#6a7282",
                }}
              >
                Hotel pickup available from Greater Accra and Cape Coast
                downtown. We will contact you the day before to confirm your
                exact pickup time.
              </p>
            </div>

            {/* ⑧ TRAVELLING WITH 6 OR MORE? ─ group CTA */}
            <div
              style={{ padding: "32px 0", borderBottom: "1.5px solid #ebdff5" }}
            >
              <div
                style={{
                  borderRadius: "16px",
                  border: "1.5px solid #ebdff5",
                  padding: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "24px",
                }}
              >
                <div>
                  <h4
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 600,
                      fontSize: "20px",
                      lineHeight: "28px",
                      color: "#4a1a73",
                      marginBottom: "12px",
                    }}
                  >
                    Travelling with 6 or more?
                  </h4>
                  <p
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 400,
                      fontSize: "15px",
                      lineHeight: "24px",
                      color: "#364153",
                      maxWidth: "509px",
                    }}
                  >
                    Get bespoke itineraries tailored around your group — greater
                    value, shared memories, and seamless logistics designed just
                    for you.
                  </p>
                </div>
                <button
                  type="button"
                  style={{
                    flexShrink: 0,
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 600,
                    fontSize: "15px",
                    lineHeight: "22px",
                    color: "#4a1a73",
                    border: "1.5px solid #4a1a73",
                    borderRadius: "40px",
                    padding: "14px 24px",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                  }}
                >
                  Get a Group Quote →
                </button>
              </div>
            </div>

            {/* ⑨ YOU MIGHT ALSO LOVE */}
            <div style={{ paddingTop: "40px" }}>
              <h2
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 600,
                  fontSize: "20px",
                  lineHeight: "28px",
                  color: "#4a1a73",
                  marginBottom: "24px",
                }}
              >
                You Might Also Love
              </h2>
              <div className="grid grid-cols-3" style={{ gap: "24px" }}>
                {RELATED_TOURS.map((t) => (
                  <PopularTourCard
                    key={t.id}
                    image={t.image}
                    location={t.location}
                    rating={t.rating}
                    title={t.title}
                    availabilityBadge={t.availabilityBadge}
                    price={t.price}
                    tags={t.tags}
                    duration={t.duration}
                    pickupIncluded={t.pickupIncluded}
                    maxGroupSize={t.maxGroupSize}
                    country={t.country}
                    tourSlug={t.slug}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Booking Widget — Figma 3156:45940 ─────────────────── */}
          {/* sticky top = 112px navbar + 64px detail nav + 12px buffer = 188px */}
          <div
            className="flex-shrink-0 sticky"
            style={{ width: "457px", top: "188px" }}
          >
            <BookingWidget
              tourData={tourData}
              adults={adults}
              setAdults={setAdults}
              children={children}
              setChildren={setChildren}
              departureDate={departureDate}
              setDepartureDate={setDepartureDate}
              returnDate={returnDate}
              setReturnDate={setReturnDate}
              bookmarked={bookmarked}
              setBookmarked={setBookmarked}
            />
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {galleryOpen && (
        <ImageGalleryModal
          images={tourData.images}
          currentIndex={galleryIndex}
          onClose={() => setGalleryOpen(false)}
          title={tourData.title}
          location="Ghana — Central Region, Cape Coast"
        />
      )}

      {/* Share Modal */}
      {shareOpen && (
        <ShareModal
          onClose={() => setShareOpen(false)}
          tour={{
            title: tourData.title,
            description: tourData.description.slice(0, 160) + "...",
            image: tourData.heroMainImage,
            url: window.location.href,
            author: {
              name: "Davida Dzato",
              avatar: "https://picsum.photos/seed/author-avatar/48/48",
              subtitle: "Giraffe Sanctuary",
              country: "🇬🇭 Ghana",
            },
          }}
        />
      )}
    </main>
  );
};

export default TourDetailPage;
