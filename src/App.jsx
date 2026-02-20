import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

import Navbar from "./components/shared/Navbar";
import Button from "./components/ui/button";
import { Filter, FilterOption } from "./components/ui/filter";
import { Pagination, PaginationItem, PaginationEllipsis, PaginationNext, PaginationPrevious } from "./components/ui/pagination";
import { Breadcrumb, BreadcrumbItem } from "./components/ui/breadcrumb";
import StarRating from "./components/ui/StarRating";
import TextInput from "./components/ui/TextInput";
import { ToastItem, ToastContainer } from "./components/ui/toast";
import SearchBar from "./components/ui/SearchBar";
import StatCounter from "./components/ui/StatCounter";
import NewsletterInput from "./components/ui/NewsletterInput";
// import GalleryPreviewCard from "./components/ui/GalleryPreviewCard";
import FilterBar from "./components/ui/FilterBar";
import SearchIconButton from "./components/ui/SearchIconButton";
import SectionHeadline, { CardHeadline } from "./components/ui/SectionHeadline";
import SortDropdown from "./components/ui/SortDropdown";
import MapEmbed from "./components/ui/MapEmbed";
import { PlayCircleIcon, VideoIcon, DownloadIcon, CallIcon, LocationIcon } from "./components/ui/MediaIcons";
import FAQAccordion from "./components/ui/FAQAccordion";
import ContactInfoPill from "./components/ui/ContactInfoPill";
import PopularTourCard from "./components/cards/PopularTourCard";
import PartnerHighlightCard from "./components/cards/PartnerHighlightCard";
import FeaturedDestinationCard from "./components/cards/FeaturedDestinationCard";
import TestimonialCard from "./components/cards/TestimonialCard";
import CountryTourCard from "./components/cards/CountryTourCard";
import BlogContentCard from "./components/cards/BlogContentCard";
import GalleryMasonryCard from "./components/cards/GalleryMasonryCard";

const IMG = {
  tour1: "https://picsum.photos/seed/ghana1/360/280",
  tour2: "https://picsum.photos/seed/ghana2/360/280",
  tour3: "https://picsum.photos/seed/ghana3/360/280",
  partner1: "https://picsum.photos/seed/partner1/451/656",
  partner2: "https://picsum.photos/seed/partner2/451/656",
  partner3: "https://picsum.photos/seed/partner3/451/656",
  dest1: "https://picsum.photos/seed/dest1/454/648",
  dest2: "https://picsum.photos/seed/dest2/451/656",
  dest3: "https://picsum.photos/seed/dest3/454/648",
  gallery: "https://picsum.photos/seed/gallery1/1419/654",
  blog1: "https://picsum.photos/seed/blog1/1028/371",
  blog2: "https://picsum.photos/seed/blog2/457/419",
  gal1: "https://picsum.photos/seed/gal1/335/663",
};

const Section = ({ title, bg = "bg-primary-light-default", children }) => (
  <section className={`${bg} py-12`}>
    <div className="max-w-[1728px] mx-auto px-[30px]">
      <h2 className="text-Display-small-bold text-tertiary-normal-default mb-8 pb-3 border-b border-primary-dark-default">{title}</h2>
      {children}
    </div>
  </section>
);

const FAQ_DATA = [
  { question: "How do I book a tour with Elysium Tours?", answer: "You can easily book through our website. Our team will confirm within 24 hours." },
  { question: "Can I customize my travel itinerary?", answer: "Yes! We specialize in personalized experiences tailored to your interests." },
  { question: "What payment options do you accept?", answer: "We accept credit/debit cards, mobile money, and bank transfers." },
  { question: "Do you help with visas and travel documentation?", answer: "We offer detailed guidance on visa requirements for all our destinations." },
  { question: "Are your tours suitable for solo travelers?", answer: "Absolutely! We welcome solo travelers and arrange group or private tours." },
  { question: "How safe is it to travel around Ghana?", answer: "Your safety is our priority. We work with trusted local partners throughout." },
];

const BLOG_FILTERS = [
  { value: "all", label: "All" }, { value: "travel", label: "Travel Guides & Tips" },
  { value: "destinations", label: "Destination Highlights" }, { value: "behind", label: "Behind the Scene" },
  { value: "festival", label: "Festival Calendar" }, { value: "diaspora", label: "Diaspora Stories" },
];

const GALLERY_FILTERS = [
  { value: "all", label: "All" }, { value: "destination", label: "Destinations" },
  { value: "activities", label: "Activities" }, { value: "nature", label: "Nature" },
  { value: "culture", label: "Culture" }, { value: "videos", label: "Videos" },
];

function AppContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState("");
  const [toasts, setToasts] = useState([]);
  const [rating, setRating] = useState(3);
  const [activeSlide, setActiveSlide] = useState(0);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [blogFilter, setBlogFilter] = useState("all");
  const [galleryFilter, setGalleryFilter] = useState("all");
  const [sortValue, setSortValue] = useState("recent");

  const addToast = (v, m) => setToasts(prev => [...prev, { id: Date.now(), variant: v, message: m }]);
  const dismissToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <div className="font-raleway bg-primary-normal-default min-h-screen">
      <Navbar />

      <div className="bg-secondary-dark-darker py-6 px-[30px]">
        <h1 className="text-Display-md-bold text-primary-light-default">Elysium Tours — Full Component Showcase</h1>
        <p className="text-md-regular text-secondary-light-default mt-1">All micro components across all pages</p>
      </div>

      <Section title="1 — Navbar" bg="bg-primary-light-default">
        <p className="text-md-regular text-tertiary-normal-default">↑ Sticky. Click Tour / Tour Partners for dropdowns.</p>
      </Section>

      <Section title="2 — Button + Filter + Pagination + Breadcrumb" bg="bg-primary-normal-default">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary">Secondary</Button>
            <Button variant="secondaryOutline">Outline</Button>
            <Button variant="neutral">Neutral</Button>
            <Button variant="secondary" disabled>Disabled</Button>
          </div>
          <Filter defaultValue="option1">
            <FilterOption value="option1">Day Tours</FilterOption>
            <FilterOption value="option2">Multi-Day</FilterOption>
            <FilterOption value="option3">Festivals</FilterOption>
          </Filter>
          <Pagination>
            <PaginationPrevious disabled={currentPage===1} onClick={()=>setCurrentPage(p=>p-1)} />
            {[1,2,3].map(n=><PaginationItem key={n} isActive={currentPage===n} onClick={()=>setCurrentPage(n)}>{n}</PaginationItem>)}
            <PaginationEllipsis /><PaginationItem isActive={currentPage===5} onClick={()=>setCurrentPage(5)}>5</PaginationItem>
            <PaginationNext disabled={currentPage===5} onClick={()=>setCurrentPage(p=>p+1)} />
          </Pagination>
          <Breadcrumb>
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem href="/tours">Tours</BreadcrumbItem>
            <BreadcrumbItem>Kakum National Park</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </Section>

      <Section title="3 — StarRating + TextInput + Toast" bg="bg-primary-light-default">
        <div className="flex gap-12 flex-wrap">
          <div className="flex flex-col gap-3">
            <StarRating value={4.9} showValue size="small" />
            <StarRating value={4.5} showValue size="medium" />
            <StarRating value={rating} showValue readOnly={false} onChange={setRating} size="large" />
          </div>
          <div className="flex flex-col gap-4 max-w-sm flex-1">
            <TextInput label="Email" id="email" type="email" placeholder="Type your email address" value={email} onChange={e=>setEmail(e.target.value)} />
            <TextInput label="Error" id="err" placeholder="Enter value" variant="error" errorText="Required" />
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-6 mb-4">
          <Button variant="secondary" onClick={()=>addToast("success","Booked!")}>Success</Button>
          <Button variant="secondary" onClick={()=>addToast("error","Failed.")}>Error</Button>
          <Button variant="secondary" onClick={()=>addToast("warning","Limited spots.")}>Warning</Button>
          <Button variant="secondary" onClick={()=>addToast("info","New tours.")}>Info</Button>
        </div>
        <div className="flex flex-col gap-3 max-w-sm">
          <ToastItem id="p1" variant="success" message="Tour booked successfully!" duration={0} />
          <ToastItem id="p2" variant="error" message="Booking failed." duration={0} />
          <ToastItem id="p3" variant="warning" message="Limited spots." duration={0} />
          <ToastItem id="p4" variant="info" message="New tours added." duration={0} />
        </div>
      </Section>

      <Section title="4 — SearchBar + StatCounter + NewsletterInput" bg="bg-primary-normal-default">
        <div className="flex flex-col gap-8">
          <div className="max-w-[957px]"><SearchBar locationValue={searchLocation} onLocationChange={setSearchLocation} dateValue={searchDate} onDateChange={setSearchDate} onSearch={()=>addToast("info","Searching...")} /></div>
          <StatCounter />
          <NewsletterInput value={newsletter} onChange={e=>setNewsletter(e.target.value)} onSubmit={val=>addToast("success",`Subscribed: ${val}`)} />
        </div>
      </Section>

      <Section title="5 — FilterBar + SearchIconButton + SortDropdown" bg="bg-primary-light-default">
        <div className="flex flex-col gap-6">
          <FilterBar options={BLOG_FILTERS} value={blogFilter} onValueChange={setBlogFilter} />
          <FilterBar options={GALLERY_FILTERS} value={galleryFilter} onValueChange={setGalleryFilter} />
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-3 border border-primary-dark-default rounded-[var(--radius-md)] px-4 py-3 max-w-sm">
              <input placeholder="Search for Blogs/Articles..." className="flex-1 bg-transparent outline-none" style={{fontSize:"13px",fontFamily:"Raleway,sans-serif",color:"#2d2d2d"}} />
              <SearchIconButton size={37} onClick={()=>addToast("info","Searching...")} />
            </div>
            <SortDropdown value={sortValue} onValueChange={setSortValue} />
          </div>
        </div>
      </Section>

      <Section title="6 — SectionHeadline + CardHeadline" bg="bg-primary-normal-default">
        <div className="flex flex-col gap-8">
          <SectionHeadline label="FEATURED TOURS" title="Explore Our Most Popular Tours" description="Ghana is buzzing with spots like Kakum National Park, that canopy walkway is a thrill." />
          <div className="bg-tertiary-dark-default p-8 rounded-[var(--radius-sm)] flex gap-8">
            <CardHeadline title="Transportation" />
            <CardHeadline title="Accommodation" variant="dimmed" />
          </div>
        </div>
      </Section>

      <Section title="7 — FAQAccordion (Contact page)" bg="bg-primary-light-default">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-[46px] h-[1px] bg-secondary-dark-darker" />
          <span className="text-med-small-bold text-secondary-dark-darker tracking-widest">FAQS</span>
        </div>
        <SectionHeadline title="Need Help? We've Got Answers" description="Planning a trip comes with questions — and we're here to help." className="mb-8" />
        <FAQAccordion items={FAQ_DATA} columns={2} />
      </Section>

      <Section title="8 — ContactInfoPill + MapEmbed (Contact page)" bg="bg-primary-normal-default">
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap gap-4">
            <ContactInfoPill icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#7b2cbf" strokeWidth="1.5"/><path d="M22 6l-10 7L2 6" stroke="#7b2cbf" strokeWidth="1.5"/></svg>} text="info@elysiumtours.com" href="mailto:info@elysiumtours.com" />
            <ContactInfoPill icon={<CallIcon />} text="+233 24 522 4993" href="tel:+233245224993" />
            <ContactInfoPill icon={<LocationIcon />} text="First Central Link - Adgringanor" />
          </div>
          <MapEmbed height={400} />
        </div>
      </Section>

      <Section title="9 — MediaIcons" bg="bg-primary-light-default">
        <div className="flex items-center gap-8 flex-wrap">
          {[["PlayCircle",<PlayCircleIcon size={52}/>],["Video",<VideoIcon/>],["Download",<DownloadIcon/>],["Call",<CallIcon/>],["Location",<LocationIcon/>]].map(([label,icon])=>(
            <div key={label} className="flex flex-col items-center gap-2">{icon}<span className="text-med-small-regular text-primary-dark-darker">{label}</span></div>
          ))}
        </div>
      </Section>

      <Section title="10 — PopularTourCard" bg="bg-secondary-light-default">
        <div className="flex flex-wrap gap-6">
          <PopularTourCard image={IMG.tour1} location="Cape Coast / Central Region" rating={4.9} title="The Homecoming Experience to Kakum National Park" availabilityBadge="Opened Daily" price="Ghs.400.00" />
          <PopularTourCard image={IMG.tour2} location="Accra / Greater Accra" rating={4.7} title="Kwame Nkrumah Memorial Park & Museum Tour" availabilityBadge="Opened Daily" price="Ghs.250.00" />
          <PopularTourCard image={IMG.tour3} location="Eastern Region" rating={4.8} title="Boti Falls & Umbrella Rock Adventure" availabilityBadge="Weekends Only" price="Ghs.350.00" />
        </div>
      </Section>

      <Section title="11 — PartnerHighlightCard + FeaturedDestinationCard" bg="bg-primary-light-default">
        <div className="flex gap-6 flex-wrap mb-8">
          <PartnerHighlightCard image={IMG.partner1} category="Accommodation" />
          <PartnerHighlightCard image={IMG.partner2} category="Transportation" />
          <PartnerHighlightCard image={IMG.partner3} category="Dining" />
        </div>
        <div className="flex gap-4 items-stretch">
          <div className="flex flex-col gap-4 flex-1">
            <FeaturedDestinationCard image={IMG.dest1} name="Kakum National Park" subtitle="Captivating destinations" size="default" />
            <FeaturedDestinationCard image={IMG.dest3} name="Boti Falls" subtitle="Natural wonders" size="default" />
          </div>
          <div className="flex-1"><FeaturedDestinationCard image={IMG.dest2} name="Independence Square" subtitle="Historic landmark" size="large" /></div>
          <div className="flex flex-col gap-4 flex-1">
            <FeaturedDestinationCard image={IMG.dest1} name="National Theater" subtitle="Cultural hub" size="default" />
            <FeaturedDestinationCard image={IMG.dest3} name="Labadi Beach" subtitle="Coastal escape" size="default" />
          </div>
        </div>
      </Section>

      <Section title="12 — TestimonialCard" bg="bg-primary-normal-default">
        <div className="flex items-center gap-2 mb-3"><div className="w-[46px] h-[1px] bg-secondary-dark-darker" /><span className="text-med-small-bold text-secondary-dark-darker tracking-widest">TESTIMONIALS</span></div>
        <SectionHeadline title="What Our Travelers Say" className="mb-8" />
        <div className="flex gap-[24px]">
          <TestimonialCard quote="Elysium Tours made my trip absolutely amazing!" body="Our guide was knowledgeable, friendly. I loved the Cape Coast tour." attribution="Sarah M., UK" reviewerName="Estella Sackey" timestamp="2 weeks ago" rating={4} />
          <TestimonialCard quote="Best travel experience in West Africa." body="Everything was perfectly organised. I'll definitely be returning." attribution="James K., USA" reviewerName="Sam Smith" timestamp="1 month ago" rating={5} />
          <TestimonialCard quote="The hidden gems were breathtaking." body="Boti Falls in the morning, a river cruise in the afternoon — unforgettable." attribution="Amina D., Canada" reviewerName="Amina Darko" timestamp="3 weeks ago" rating={4} />
        </div>
      </Section>

      {/* <Section title="13 — GalleryPreviewCard" bg="bg-primary-light-default">
        <GalleryPreviewCard image={IMG.gallery} title="Waves of Serenity" description="Feel the gentle breeze and golden sands of Busua Beach, where every sunset paints a new memory." totalSlides={3} activeSlide={activeSlide} onDotClick={setActiveSlide} />
      </Section> */}

      <Section title="14 — CountryTourCard (Tours page)" bg="bg-primary-normal-default">
        <SectionHeadline label="TOUR BY COUNTRIES" title="Journey Through the Heart of West Africa" className="mb-8" />
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap gap-8">
            {[["Kakum National Park","Accra"],["Cape Coast","Central Region"],["Boti Falls","Eastern Region"],["Kumasi","Ashanti"]].map(([name,loc],i)=>(
              <CountryTourCard key={i} image={`https://picsum.photos/seed/ctry${i}/331/192`} country={name} subtitle={loc} />
            ))}
          </div>
          <div className="flex flex-wrap gap-8">
            {[["Volta Region","Volta"],["Tamale","Northern Region"],["Ho","Volta Region"],["Bolgatanga","Upper East"]].map(([name,loc],i)=>(
              <CountryTourCard key={i} image={`https://picsum.photos/seed/ctry${i+5}/331/192`} country={name} subtitle={loc} />
            ))}
          </div>
        </div>
      </Section>

      <Section title="15 — BlogContentCard (Blog page)" bg="bg-primary-light-default">
        <SectionHeadline label="TRAVEL GUIDE & TIPS" title="Travel Guides & Tips for Every Explorer" description="Discover expert advice, destination guides, and local insights." className="mb-8" />
        <div className="flex flex-col gap-4">
          <BlogContentCard image={IMG.blog1} category="TRAVEL GUIDE" title="8 Ways to Enjoy Ghana in Fall" size="wide" />
          <div className="flex gap-4 flex-wrap">
            <BlogContentCard image={IMG.blog2} category="DESTINATION" title="Kakum National Park" size="medium" />
            <BlogContentCard image="https://picsum.photos/seed/blog3/457/419" category="CULTURE" title="Cape Coast Castle" size="medium" />
            <BlogContentCard image="https://picsum.photos/seed/blog4/340/653" category="HERITAGE" title="Independence Square" subLabel="Heritage Site" size="tall" />
          </div>
        </div>
      </Section>

      <Section title="16 — GalleryMasonryCard (Gallery page)" bg="bg-primary-normal-default">
        <SectionHeadline label="DESTINATIONS" title="Where Will Your Next Adventure Take You?" className="mb-8" />
        <div className="flex gap-4 items-start">
          <div className="flex flex-col gap-4" style={{width:"335px"}}>
            <GalleryMasonryCard image={IMG.gal1} title="Greater Accra" size="large" />
            <GalleryMasonryCard image="https://picsum.photos/seed/gal3/335/197" title="Cape Coast" size="small" count="28 Pictures" />
          </div>
          <div className="flex flex-col gap-4" style={{width:"335px"}}>
            <GalleryMasonryCard image="https://picsum.photos/seed/gal4/335/197" title="Kumasi" size="small" count="15 Pictures" />
            <GalleryMasonryCard image="https://picsum.photos/seed/gal5/335/663" title="Volta Region" size="large" />
          </div>
          <div className="flex flex-col gap-4" style={{width:"335px"}}>
            <GalleryMasonryCard image="https://picsum.photos/seed/gal6/335/663" title="Busua Beach" isVideo size="large" />
            <GalleryMasonryCard image="https://picsum.photos/seed/gal7/335/197" title="Labadi" size="small" count="10 Videos" />
          </div>
        </div>
      </Section>

      <ToastContainer toasts={toasts} onDismiss={dismissToast} position="top-right" />
    </div>
  );
}

function App() {
  return <BrowserRouter><AppContent /></BrowserRouter>;
}

export default App;
