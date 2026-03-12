import React, { useState } from "react";
import Navbar from "../components/shared/Navbar";
import Button from "../components/ui/button";
import { Filter, FilterOption } from "../components/ui/filter";
import { Pagination, PaginationItem, PaginationEllipsis, PaginationNext, PaginationPrevious } from "../components/ui/pagination";
import { Breadcrumb, BreadcrumbItem } from "../components/ui/breadcrumb";
import StarRating from "../components/ui/StarRating";
import TextInput from "../components/ui/TextInput";
import { ToastItem, ToastContainer } from "../components/ui/toast";
import SearchBar from "../components/ui/SearchBar";
import StatCounter from "../components/ui/StatCounter";
import NewsletterInput from "../components/ui/NewsletterInput";
import FilterBar from "../components/ui/FilterBar";
import SearchIconButton from "../components/ui/SearchIconButton";
import SectionHeadline, { CardHeadline } from "../components/ui/SectionHeadline";
import SortDropdown from "../components/ui/SortDropdown";
import MapEmbed from "../components/ui/MapEmbed";
import { PlayCircleIcon, VideoIcon, DownloadIcon, CallIcon, LocationIcon } from "../components/ui/MediaIcons";
import FAQAccordion from "../components/ui/FAQAccordion";
import ContactInfoPill from "../components/ui/ContactInfoPill";
import DateRangePicker from "../components/ui/DateRangePicker";
import FilterPanel from "../components/ui/FilterPanel";
import CommentSection from "../components/ui/CommentSection";
import ContactForm from "../components/ui/ContactForm";
import VideoPlayer from "../components/ui/VideoPlayer";
import PopularTourCard from "../components/cards/PopularTourCard";
import PartnerHighlightCard from "../components/cards/PartnerHighlightCard";
import FeaturedDestinationCard from "../components/cards/FeaturedDestinationCard";
import TestimonialCard from "../components/cards/TestimonialCard";
import CountryTourCard from "../components/cards/CountryTourCard";
import BlogContentCard from "../components/cards/BlogContentCard";
import GalleryMasonryCard from "../components/cards/GalleryMasonryCard";
import Loader from "../components/ui/Loader";
import { CardSkeleton } from "../components/ui/Skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/Tabs";
import Modal from "../components/ui/Modal";
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/Card";

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

const THUMBS = [
  { src: "https://picsum.photos/seed/vid1/72/48" },
  { src: "https://picsum.photos/seed/vid2/72/48" },
  { src: "https://picsum.photos/seed/vid3/72/48" },
  { src: "https://picsum.photos/seed/vid4/72/48" },
  { src: "https://picsum.photos/seed/vid5/72/48" },
];

const COMMENTS = [
  { name: "Veeda", body: "Elysium Tours completely changed the way I travel. I didn't just visit Ghana — I lived it. From cooking lessons in Cape Coast to dancing at a local festival, every day was full of connection and joy.", timestamp: "1 hour ago" },
  { name: "Veeda", body: "I was in Accra for a business conference but extended my stay for a bleisure tour with Elysium. It was the best decision! They helped me blend meetings with cultural adventures.", timestamp: "1 hour ago" },
  { name: "Veeda", body: "Elysium Tours completely changed the way I travel. The guides were friendly, knowledgeable, and genuinely cared about creating unforgettable memories.", timestamp: "1 hour ago" },
  { name: "Veeda", body: "Article was insightful.", timestamp: "1 hour ago" },
];

const FAQ_DATA = [
  { question: "How do I book a tour with Elysium Tours?", answer: "You can easily book through our website. Once submitted, our team will confirm availability and send your booking details via email." },
  { question: "How safe is it to travel around Ghana and West Africa?", answer: "Your safety is our priority. We work with trusted local partners, experienced drivers, and professional guides while adhering to all regional safety protocols." },
  { question: "Can I customize my travel itinerary?", answer: "Yes! We specialize in personalized experiences. Share your interests, budget, and schedule, and our travel experts will design a custom itinerary tailored just for you." },
  { question: "What's your cancellation or refund policy?", answer: "Plans change — we understand. Notify us at least 7 days before your tour, and we'll assist with rescheduling or a partial refund based on the package booked." },
  { question: "What payment options do you accept?", answer: "We accept credit and debit cards, mobile money (for local travelers), and secure bank transfers. All transactions are processed safely through our payment partners." },
  { question: "What should I pack for my trip?", answer: "We recommend lightweight clothing, comfortable shoes, sun protection, and a reusable water bottle. After booking, you'll receive a detailed packing checklist based on your destination and season." },
  { question: "Do you help with visas and travel documentation?", answer: "We offer detailed guidance on visa requirements and entry documents for all West African destinations. However, we don't handle visa applications directly." },
  { question: "Do your tours include accommodation and meals?", answer: "Yes, most of our tour packages include carefully selected accommodations and local meals that reflect authentic West African flavors." },
  { question: "Are your tours suitable for solo travelers?", answer: "Absolutely! We welcome solo travelers and can arrange shared group tours or private guided experiences depending on your comfort level." },
  { question: "Can I join a group tour if I'm traveling alone?", answer: "Of course! Many of our guests travel solo and join small group tours to meet new people and share experiences. We'll match you with groups that suit your travel style." },
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

const Section = ({ title, bg = "bg-primary-light-default", children }) => (
  <section className={`${bg} py-12`}>
    <div className="max-w-[1728px] mx-auto px-[30px]">
      <h2 className="text-Display-small-bold text-tertiary-normal-default mb-8 pb-3 border-b border-primary-dark-default">{title}</h2>
      {children}
    </div>
  </section>
);

const Showcase = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState("");
  const [toasts, setToasts] = useState([]);
  const [rating, setRating] = useState(3);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const addToast = (v, m) => setToasts(prev => [...prev, { id: Date.now(), variant: v, message: m }]);
  const dismissToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <div className="font-raleway bg-primary-normal-default min-h-screen">
      <div className="bg-secondary-dark-darker py-6 px-[30px]">
        <h1 className="text-Display-md-bold text-primary-light-default">Elysium Tours — Component Showcase</h1>
        <p className="text-md-regular text-secondary-light-default mt-1">Refactored as Showcase Page</p>
      </div>

      <Section title="1 — Button + Filter + Pagination + Breadcrumb" bg="bg-primary-normal-default">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary">Secondary</Button>
            <Button variant="secondaryOutline">Outline</Button>
            <Button variant="neutral">Neutral</Button>
          </div>
          <Filter defaultValue="option1">
            <FilterOption value="option1">Day Tours</FilterOption>
            <FilterOption value="option2">Multi-Day</FilterOption>
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

      <Section title="2 — StarRating + TextInput + Toast" bg="bg-primary-light-default">
        <div className="flex gap-12 flex-wrap">
          <div className="flex flex-col gap-3">
            <StarRating value={4.9} showValue size="small" />
            <StarRating value={rating} showValue readOnly={false} onChange={setRating} size="large" />
          </div>
          <div className="flex flex-col gap-4 max-w-sm flex-1">
            <TextInput label="Email" id="email" type="email" placeholder="Type your email" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-6">
          <Button variant="secondary" onClick={()=>addToast("success","Booked!")}>Success</Button>
          <Button variant="secondary" onClick={()=>addToast("error","Failed.")}>Error</Button>
        </div>
      </Section>

      <Section title="3 — SearchBar + Newsletter" bg="bg-primary-normal-default">
        <div className="flex flex-col gap-8">
          <SearchBar locationValue={searchLocation} onLocationChange={setSearchLocation} dateValue={searchDate} onDateChange={setSearchDate} />
          <NewsletterInput value={newsletter} onChange={e=>setNewsletter(e.target.value)} onSubmit={val=>addToast("success",`Subscribed: ${val}`)} />
        </div>
      </Section>

      <Section title="4 — Cards" bg="bg-secondary-light-default">
        <div className="flex flex-wrap gap-6">
          <PopularTourCard image={IMG.tour1} location="Cape Coast" rating={4.9} title="The Homecoming Experience" price="Ghs.400.00" />
          <PartnerHighlightCard image={IMG.partner1} category="Accommodation" />
          <TestimonialCard quote="Amazing!" reviewerName="Estella Sackey" timestamp="2 weeks ago" rating={4} />
        </div>
      </Section>

      <Section title="5 — Foundation & UI (Phase 1)" bg="bg-primary-light-default">
        <div className="flex flex-col gap-12">
          {/* Loaders */}
          <div className="flex flex-col gap-6 w-full">
            <div className="flex items-center gap-8">
              <Loader size="small" />
              <Loader size="medium" color="text-tertiary-normal-default" />
              <Loader size="large" />
            </div>

            {/* Loaders - Skeleton */}
            <h3 className="text-[16px] font-semibold text-tertiary-dark-darker opacity-80 mt-4">Loaders - Skeleton</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px] bg-[#f5eefb] py-8 px-6 rounded-xl w-full">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          </div>

          {/* Tabs */}
          <div>
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">General FAQs</TabsTrigger>
                <TabsTrigger value="tab2">Booking</TabsTrigger>
                <TabsTrigger value="tab3">Safety</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="text-secondary-dark-darker bg-secondary-light-default p-4 rounded-md">General FAQ content here...</TabsContent>
              <TabsContent value="tab2" className="text-secondary-dark-darker bg-secondary-light-default p-4 rounded-md">Booking information here...</TabsContent>
              <TabsContent value="tab3" className="text-secondary-dark-darker bg-secondary-light-default p-4 rounded-md">Safety protocols here...</TabsContent>
            </Tabs>
          </div>

          {/* Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Base Generic Card</CardTitle>
                <CardDescription>This is heavily reusable base for all future cards.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Content goes here. It automatically takes up flexible space.</p>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full">Action</Button>
              </CardFooter>
            </Card>

            {/* Modal demonstration */}
            <Card className="items-center justify-center p-6 bg-primary-normal-default">
              <Button onClick={() => setIsModalOpen(true)}>Open Modal System</Button>
            </Card>
          </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Sample Modal">
          <p className="text-sm text-primary-dark-darker mb-4">
            This is the new generic modal component. It supports focus trapping, scrolling, outside click to close, and escape key to close.
          </p>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="neutral" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="secondary" onClick={() => { addToast('success', 'Confirmed!'); setIsModalOpen(false); }}>Confirm Action</Button>
          </div>
        </Modal>
      </Section>

      <ToastContainer toasts={toasts} onDismiss={dismissToast} position="top-right" />
    </div>
  );
};

export default Showcase;
