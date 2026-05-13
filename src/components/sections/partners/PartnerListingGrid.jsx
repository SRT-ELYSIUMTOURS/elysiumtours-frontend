import React from "react";
import { classNames } from "../../../utils/classNames";
import PartnerListingCard from "../../cards/PartnerListingCard";

// Figma: listing content area — responsive 3-col grid of PartnerListingCard
// Empty state shown when no results

const MOCK_PARTNERS = {
  "tour-sites": [
    { id: 1, image: "https://picsum.photos/seed/ts-1/335/568", partnerName: "Cape Coast Castle Museum", location: "Cape Coast / Central Region", rating: 4.9, title: "Cape Coast Castle: A Journey Through Ghana's Colonial History", availability: "Opened Daily", price: "Ghs.400.00" },
    { id: 2, image: "https://picsum.photos/seed/ts-2/335/568", partnerName: "Kakum National Park", location: "Cape Coast / Central Region", rating: 4.8, title: "Kakum National Park — Canopy Walk & Wildlife Safari", availability: "Opened Daily", price: "Ghs.250.00" },
    { id: 3, image: "https://picsum.photos/seed/ts-3/335/568", partnerName: "Kwame Nkrumah Mausoleum", location: "Accra / Greater Accra", rating: 4.7, title: "Kwame Nkrumah Mausoleum & Memorial Park Tour", availability: "Tue – Sun", price: "Ghs.50.00" },
    { id: 4, image: "https://picsum.photos/seed/ts-4/335/568", partnerName: "W.E.B. Du Bois Center", location: "Accra / Greater Accra", rating: 4.6, title: "W.E.B. Du Bois Memorial Centre for Pan African Culture", availability: "Opened Daily", price: "Ghs.80.00" },
    { id: 5, image: "https://picsum.photos/seed/ts-5/335/568", partnerName: "Elmina Castle", location: "Elmina / Central Region", rating: 4.9, title: "Elmina Castle: The Oldest European Building in Sub-Saharan Africa", availability: "Opened Daily", price: "Ghs.350.00" },
    { id: 6, image: "https://picsum.photos/seed/ts-6/335/568", partnerName: "Aburi Botanical Gardens", location: "Aburi / Eastern Region", rating: 4.5, title: "Aburi Botanical Gardens: Ghana's Lush Green Retreat", availability: "Opened Daily", price: "Ghs.120.00" },
  ],
  accommodation: [
    { id: 1, image: "https://picsum.photos/seed/acc-1/335/568", partnerName: "Labadi Beach Hotel", location: "Accra / Greater Accra", rating: 4.9, title: "Labadi Beach Hotel — Premium Beachfront Stay in Accra", availability: "Year Round", price: "Ghs.850.00" },
    { id: 2, image: "https://picsum.photos/seed/acc-2/335/568", partnerName: "Kempinski Gold Coast City", location: "Accra / Greater Accra", rating: 4.9, title: "Kempinski Gold Coast City — 5-Star Luxury in the Heart of Accra", availability: "Year Round", price: "Ghs.1,200.00" },
    { id: 3, image: "https://picsum.photos/seed/acc-3/335/568", partnerName: "Coconut Grove Hotel", location: "Accra / Greater Accra", rating: 4.6, title: "Coconut Grove Regency Hotel — Comfort and Elegance", availability: "Year Round", price: "Ghs.600.00" },
    { id: 4, image: "https://picsum.photos/seed/acc-4/335/568", partnerName: "Hans Cottage Botel", location: "Cape Coast / Central Region", rating: 4.7, title: "Hans Cottage Botel — Unique Crocodile Pond & Lakeside Lodge", availability: "Year Round", price: "Ghs.450.00" },
    { id: 5, image: "https://picsum.photos/seed/acc-5/335/568", partnerName: "Royal Senchi Hotel", location: "Akosombo / Eastern Region", rating: 4.8, title: "Royal Senchi Hotel & Resort — Riverside Luxury near Volta Lake", availability: "Year Round", price: "Ghs.900.00" },
    { id: 6, image: "https://picsum.photos/seed/acc-6/335/568", partnerName: "Miklin Hotel", location: "Kumasi / Ashanti Region", rating: 4.5, title: "Miklin Hotel — Business & Leisure in the Garden City", availability: "Year Round", price: "Ghs.380.00" },
  ],
  transportation: [
    { id: 1, image: "https://picsum.photos/seed/trans-1/335/568", partnerName: "Elysium Transfer Co.", location: "Accra / Greater Accra", rating: 4.9, title: "Premium Airport Transfers in Accra — Sedan & SUV Options", availability: "Opened Daily", price: "Ghs.200.00" },
    { id: 2, image: "https://picsum.photos/seed/trans-2/335/568", partnerName: "West Africa Wheels", location: "Accra / Greater Accra", rating: 4.7, title: "Private SUV Hire for West Africa Tour Routes", availability: "By Booking", price: "Ghs.350.00" },
    { id: 3, image: "https://picsum.photos/seed/trans-3/335/568", partnerName: "Golden Gate Coaches", location: "Kumasi / Ashanti Region", rating: 4.6, title: "Luxury Coach Service — Accra to Kumasi Round Trips", availability: "Mon – Sat", price: "Ghs.150.00" },
    { id: 4, image: "https://picsum.photos/seed/trans-4/335/568", partnerName: "Cape Coast Cabs", location: "Cape Coast / Central Region", rating: 4.8, title: "Reliable Private Taxi & Transfer — Cape Coast Region", availability: "Opened Daily", price: "Ghs.180.00" },
    { id: 5, image: "https://picsum.photos/seed/trans-5/335/568", partnerName: "Volta Boat Services", location: "Akosombo / Eastern Region", rating: 4.5, title: "Scenic Volta Lake Ferry & Boat Tours", availability: "Opened Daily", price: "Ghs.120.00" },
    { id: 6, image: "https://picsum.photos/seed/trans-6/335/568", partnerName: "GhanaTuk Riders", location: "Accra / Greater Accra", rating: 4.4, title: "Tuk-Tuk City Tours — Fun & Unique Way to Explore Accra", availability: "Opened Daily", price: "Ghs.80.00" },
  ],
  guides: [
    { id: 1, image: "https://picsum.photos/seed/guide-1/335/568", partnerName: "Kweku Asante", location: "Cape Coast / Central Region", rating: 5.0, title: "Expert Heritage & History Guide — Cape Coast Castle Specialist", specialties: "• City tours • History • Heritage walks", language: "English, Twi", variant: "guide" },
    { id: 2, image: "https://picsum.photos/seed/guide-2/335/568", partnerName: "Abena Mensah", location: "Accra / Greater Accra", rating: 4.9, title: "Cultural & Food Tour Guide — Accra Street Food Expert", specialties: "• Food experiences • Cultural tours • Night life", language: "English, Ga, Twi", variant: "guide" },
    { id: 3, image: "https://picsum.photos/seed/guide-3/335/568", partnerName: "Kofi Boateng", location: "Kumasi / Ashanti Region", rating: 4.8, title: "Ashanti Heritage Guide — Royal Kumasi Cultural Tours", specialties: "• History • Ashanti culture • Arts & crafts", language: "English, Twi, French", variant: "guide" },
    { id: 4, image: "https://picsum.photos/seed/guide-4/335/568", partnerName: "Ama Owusu", location: "Accra / Greater Accra", rating: 4.9, title: "Adventure & Wildlife Guide — Kakum Canopy Walk Specialist", specialties: "• Wildlife • Adventure • Nature walks", language: "English, Twi", variant: "guide" },
    { id: 5, image: "https://picsum.photos/seed/guide-5/335/568", partnerName: "Yaw Darko", location: "Ho / Volta Region", rating: 4.7, title: "Volta Region Specialist — Wli Falls & Amedzofe Expert", specialties: "• Nature • Waterfalls • Eco tourism", language: "English, Ewe, Twi", variant: "guide" },
    { id: 6, image: "https://picsum.photos/seed/guide-6/335/568", partnerName: "Efua Amponsah", location: "Cape Coast / Central Region", rating: 4.8, title: "Roots & Heritage Guide — Diaspora Connection Tours", specialties: "• History • Diaspora heritage • Photography tours", language: "English, Twi", variant: "guide" },
  ],
  restaurants: [
    { id: 1, image: "https://picsum.photos/seed/rest-1/335/568", partnerName: "Buka Restaurant", location: "Accra / Greater Accra", rating: 4.8, title: "Buka Restaurant — Authentic West African Cuisine in Accra", availability: "Opened Daily", price: "Ghs.120.00" },
    { id: 2, image: "https://picsum.photos/seed/rest-2/335/568", partnerName: "The Bistro at Labadi", location: "Accra / Greater Accra", rating: 4.7, title: "The Bistro at Labadi — Fine Dining with Ocean Views", availability: "Opened Daily", price: "Ghs.250.00" },
    { id: 3, image: "https://picsum.photos/seed/rest-3/335/568", partnerName: "Lanterna Restaurant", location: "Accra / Greater Accra", rating: 4.9, title: "Lanterna — Italian & International Fine Dining", availability: "Opened Daily", price: "Ghs.300.00" },
    { id: 4, image: "https://picsum.photos/seed/rest-4/335/568", partnerName: "Santoku Restaurant", location: "Accra / Greater Accra", rating: 4.6, title: "Santoku — Asian Fusion & Japanese Cuisine", availability: "Tue – Sun", price: "Ghs.200.00" },
    { id: 5, image: "https://picsum.photos/seed/rest-5/335/568", partnerName: "Cape Coast Seafood", location: "Cape Coast / Central Region", rating: 4.8, title: "Cape Coast Seafood Grill — Fresh Catch Daily by the Sea", availability: "Opened Daily", price: "Ghs.180.00" },
    { id: 6, image: "https://picsum.photos/seed/rest-6/335/568", partnerName: "Kumasi Cultural Kitchen", location: "Kumasi / Ashanti Region", rating: 4.5, title: "Kumasi Cultural Kitchen — Traditional Ashanti Meals & Stories", availability: "Opened Daily", price: "Ghs.100.00" },
  ],
  photographers: [
    { id: 1, image: "https://picsum.photos/seed/photo-1/335/568", partnerName: "Studio Accra", location: "Accra / Greater Accra", rating: 4.9, title: "Studio Accra — Professional Tour & Travel Photography", availability: "By Booking", price: "Ghs.500.00" },
    { id: 2, image: "https://picsum.photos/seed/photo-2/335/568", partnerName: "Drone Ghana", location: "Accra / Greater Accra", rating: 4.8, title: "Drone Ghana — Aerial Videography & Photography Services", availability: "By Booking", price: "Ghs.800.00" },
    { id: 3, image: "https://picsum.photos/seed/photo-3/335/568", partnerName: "Moments Media", location: "Cape Coast / Central Region", rating: 4.7, title: "Moments Media — Heritage & Cultural Documentary Filming", availability: "By Booking", price: "Ghs.650.00" },
    { id: 4, image: "https://picsum.photos/seed/photo-4/335/568", partnerName: "GoldCoast Visuals", location: "Kumasi / Ashanti Region", rating: 4.6, title: "GoldCoast Visuals — Event & Wedding Photography", availability: "By Booking", price: "Ghs.1,000.00" },
  ],
  insurance: [
    { id: 1, image: "https://picsum.photos/seed/ins-1/335/568", partnerName: "TravelSafe Ghana", location: "Accra / Greater Accra", rating: 4.8, title: "TravelSafe Ghana — Comprehensive Travel Insurance Plans", availability: "Opened Daily", price: "Ghs.150.00" },
    { id: 2, image: "https://picsum.photos/seed/ins-2/335/568", partnerName: "VisaLink Ghana", location: "Accra / Greater Accra", rating: 4.7, title: "VisaLink — Fast & Reliable Visa Assistance for All Destinations", availability: "Mon – Fri", price: "Ghs.200.00" },
    { id: 3, image: "https://picsum.photos/seed/ins-3/335/568", partnerName: "FX Exchange Hub", location: "Accra / Greater Accra", rating: 4.5, title: "FX Exchange Hub — Best Rates for Foreign Currency Exchange", availability: "Opened Daily", price: "Ghs.50.00" },
  ],
};

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-[120px] gap-[16px] col-span-3">
    <div className="w-[64px] h-[64px] rounded-full bg-secondary-light-default flex items-center justify-center">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="8" stroke="#7b2cbf" strokeWidth="1.5" />
        <path d="M21 21L16.65 16.65" stroke="#7b2cbf" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
    <p className="font-raleway font-semibold text-[20px] leading-[28px] text-tertiary-normal-default">
      No partners found
    </p>
    <p className="font-raleway font-medium text-[16px] leading-[24px] text-primary-dark-active text-center max-w-[400px]">
      Try adjusting your filters or search query to find more partners.
    </p>
  </div>
);

const PartnerListingGrid = React.forwardRef(({
  category = "transportation",
  partners,               // optional override — if not provided, uses MOCK_PARTNERS
  filters,                // applied filters (for future real data integration)
  className = "",
  ...props
}, ref) => {
  const items = partners ?? MOCK_PARTNERS[category] ?? [];
  const isGuide = category === "guides";

  return (
    <div
      ref={ref}
      className={classNames("w-full px-4 md:px-10 lg:px-[80px] py-10 lg:py-[60px]", className)}
      {...props}
    >
      {items.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <EmptyState />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[24px] gap-y-8 lg:gap-y-[48px]">
          {items.map((partner) => (
            <PartnerListingCard
              key={partner.id}
              image={partner.image}
              partnerName={partner.partnerName}
              location={partner.location}
              rating={partner.rating}
              title={partner.title}
              availability={partner.availability}
              price={partner.price}
              specialties={partner.specialties}
              language={partner.language}
              variant={isGuide || partner.variant === "guide" ? "guide" : "default"}
            />
          ))}
        </div>
      )}
    </div>
  );
});

PartnerListingGrid.displayName = "PartnerListingGrid";
export default PartnerListingGrid;
