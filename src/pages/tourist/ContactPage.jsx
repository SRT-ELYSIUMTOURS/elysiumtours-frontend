import React, { useState } from "react";
import { classNames } from "../../utils/classNames";
import HeroImageSlider from "../../components/ui/HeroImageSlider";
import ContactForm from "../../components/ui/ContactForm";
import ContactInfoPill from "../../components/ui/ContactInfoPill";
import FAQAccordion from "../../components/ui/FAQAccordion";
import MapEmbed from "../../components/ui/MapEmbed";
import { ToastItem } from "../../components/ui/toast";
import { Breadcrumb, BreadcrumbItem } from "../../components/ui/breadcrumb";
import Button from "../../components/ui/button";

// ─── Hero slides ─────────────────────────────────────────────────────────────
const CONTACT_HERO_SLIDES = [
  { id: 1, image: "./src/assets/homeAssets/hero1.webp", alt: "Accra skyline", overlayOpacity: 0.6 },
  { id: 2, image: "./src/assets/homeAssets/hero1.webp", alt: "Ghana landmark", overlayOpacity: 0.6 },
  { id: 3, image: "./src/assets/homeAssets/hero1.webp", alt: "Ghana nature", overlayOpacity: 0.6 },
];

// ─── FAQ data — 10 items interleaved so col1=even indices, col2=odd indices ──
const FAQ_ITEMS = [
  // col 1 — index 0
  {
    question: "How do I book a tour with Elysium Tours?",
    answer: "You can easily book through our website. . Once submitted, our team will confirm availability and send your booking details via email.",
  },
  // col 2 — index 1
  {
    question: "How safe is it to travel around Ghana and West Africa?",
    answer: "Your safety is our priority. We work with trusted local partners, experienced drivers, and professional guides while adhering to all regional safety protocols.",
  },
  // col 1 — index 2
  {
    question: "Can I customize my travel itinerary?",
    answer: "Yes! We specialize in personalized experiences. Share your interests, budget, and schedule, and our travel experts will design a custom itinerary tailored just for you.",
  },
  // col 2 — index 3
  {
    question: "What's your cancellation or refund policy?",
    answer: "Plans change — we understand. Notify us at least 7 days before your tour, and we'll assist with rescheduling or a partial refund based on the package booked.",
  },
  // col 1 — index 4
  {
    question: "What payment options do you accept?",
    answer: "We accept credit and debit cards, mobile money (for local travelers), and secure bank transfers. All transactions are processed safely through our payment partners.",
  },
  // col 2 — index 5
  {
    question: "What should I pack for my trip?",
    answer: "We recommend lightweight clothing, comfortable shoes, sun protection, and a reusable water bottle. After booking, you'll receive a detailed packing checklist based on your destination and season.",
  },
  // col 1 — index 6
  {
    question: "Do you help with visas and travel documentation?",
    answer: "We offer detailed guidance on visa requirements and entry documents for all West African destinations. However, we don't handle visa applications directly.",
  },
  // col 2 — index 7
  {
    question: "Do your tours include accommodation and meals?",
    answer: "Yes, most of our tour packages include carefully selected accommodations and local meals that reflect authentic West African flavors. Each itinerary clearly outlines what's included, so you'll know exactly what to expect.",
  },
  // col 1 — index 8
  {
    question: "Are your tours suitable for solo travelers?",
    answer: "Absolutely! We welcome solo travelers and can arrange shared group tours or private guided experiences depending on your comfort level.",
  },
  // col 2 — index 9
  {
    question: "Can I join a group tour if I'm traveling alone?",
    answer: "Of course! Many of our guests travel solo and join small group tours to meet new people and share experiences. We'll match you with groups that suit your travel style and preferences.",
  },
];

const FAQ_TABS = ["General FAQs", "Booking Questions", "Safety Questions", "Traveling Questions"];

// ─── Shared section label ─────────────────────────────────────────────────────
const SectionLabel = ({ text }) => (
  <div className="flex items-center gap-[8px]">
    <div className="w-[46px] h-[1px] shrink-0 bg-[#2b0f43]" />
    <span
      style={{
        fontSize: "13px", fontWeight: 700,
        color: "#2b0f43", letterSpacing: "0.05em",
        lineHeight: "18px", fontFamily: "Raleway, sans-serif",
        textTransform: "uppercase",
      }}
    >
      {text}
    </span>
  </div>
);

// ─── Icons ────────────────────────────────────────────────────────────────────
const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"
      stroke="#7b2cbf" strokeWidth="1.5"
    />
  </svg>
);

const LocationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#7b2cbf" strokeWidth="1.5" />
    <circle cx="12" cy="9" r="2.5" stroke="#7b2cbf" strokeWidth="1.5" />
  </svg>
);

// Figma: question-solid icon used for the email pill
const QuestionIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M9.5 9.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5c0 1.5-1.5 2-2.5 2.5" stroke="#7b2cbf" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="16.5" r="0.8" fill="#7b2cbf" />
  </svg>
);

const SearchBtnIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="8" stroke="#fefefe" strokeWidth="1.5" />
    <path d="m21 21-4.35-4.35" stroke="#fefefe" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ─── ContactPage ──────────────────────────────────────────────────────────────
const ContactPage = React.forwardRef(({ className, ...props }, ref) => {
  const [showToast, setShowToast] = useState(false);
  const [activeTab, setActiveTab] = useState("General FAQs");
  const [faqSearch, setFaqSearch] = useState("");

  const handleFormSubmit = () => setShowToast(true);
  const dismissToast = () => setShowToast(false);

  const visibleFaqs = faqSearch
    ? FAQ_ITEMS.filter(
        (f) =>
          f.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
          f.answer.toLowerCase().includes(faqSearch.toLowerCase())
      )
    : FAQ_ITEMS;

  return (
    <div ref={ref} className={classNames("w-full", className)} {...props}>

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative w-full">
        <HeroImageSlider slides={CONTACT_HERO_SLIDES} autoPlay interval={5000} height={717} />

        {/* Breadcrumb bar — on top of hero, bg #f2eaf9, h-[53px] */}
        <div className="absolute top-0 left-0 right-0 z-30 h-[53px] bg-[#f2eaf9] flex items-center px-4 md:px-[156px]">
          <Breadcrumb>
            <BreadcrumbItem href="/" className="font-raleway font-medium text-[13px] leading-[22px]">
              Home
            </BreadcrumbItem>
            <BreadcrumbItem className="font-raleway font-medium text-[13px] leading-[22px]">
              Contact Us
            </BreadcrumbItem>
          </Breadcrumb>
        </div>

        {/* Hero text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 md:px-8">
          <div className="flex flex-col items-center gap-[32px] max-w-[957px] w-full">
            <div className="flex flex-col items-center gap-[16px] w-full">
              <h1
                className="text-center"
                style={{ fontSize: "56px", fontWeight: 700, color: "#fefefe", lineHeight: "66px", fontFamily: "Raleway, sans-serif" }}
              >
                Let&apos;s Help You Plan Your Next Adventure
              </h1>
              <p
                className="text-center"
                style={{ fontSize: "16px", fontWeight: 500, color: "#fefefe", lineHeight: "26px", fontFamily: "Raleway, sans-serif", maxWidth: "850px" }}
              >
                We&apos;re just a message away and always happy to assist! Whether you&apos;re curious
                about our tour packages, need help planning your trip, or have a special request, our
                friendly support team is here to guide you every step of the way. You can reach out to
                us through our contact form, email, or phone
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. QUICK ASSISTANCE ─────────────────────────────────────────────── */}
      <section className="w-full bg-[#f2eaf9] py-[60px] px-4 md:px-[80px]">
        {/* Top row: label LEFT, title+body RIGHT */}
        <div className="flex items-start justify-between mb-[40px]">
          <SectionLabel text="Help Desk" />
          <div className="flex flex-col items-end gap-[8px] max-w-[597px]">
            <h2
              style={{ fontSize: "25px", fontWeight: 700, color: "#2d2d2d", lineHeight: "34px", fontFamily: "Raleway, sans-serif", textAlign: "right" }}
            >
              Need Quick Assistance?
            </h2>
            <p
              style={{ fontSize: "16px", fontWeight: 400, color: "#2d2d2d", lineHeight: "24px", fontFamily: "Raleway, sans-serif", textAlign: "right", maxWidth: "565px" }}
            >
              Our support team is ready to help with bookings, inquiries, or travel concerns.
              Reach out via email or phone — we&apos;ll get back to you as soon as possible.
            </p>
          </div>
        </div>
        {/* Pills row — centered */}
        <div className="flex flex-wrap gap-[40px] items-center justify-center">
          <ContactInfoPill icon={<QuestionIcon />} text="info@elysiumtours.com" href="mailto:info@elysiumtours.com" />
          <ContactInfoPill icon={<PhoneIcon />} text="+233 24 522 4993" href="tel:+233245224993" />
          <ContactInfoPill icon={<LocationIcon />} text="First Central Link -Adgringanor" />
        </div>
      </section>

      {/* ── 3. CONTACT FORM ─────────────────────────────────────────────────── */}
      <section className="w-full py-[60px] px-4 md:px-[80px]">
        {/* Section label */}
        <SectionLabel text="Contact Us" />

        <div className="mt-[40px] flex flex-col lg:flex-row gap-[80px] items-start">
          {/* Left — image */}
          <div
            className="relative rounded-[40px] overflow-hidden shrink-0 hidden lg:block"
            style={{ width: 500, height: 620 }}
          >
            {/* Blurred background */}
            <img
              src="./src/assets/homeAssets/hero1.webp"
              alt=""
              className="absolute inset-0 w-full h-full object-cover blur-[10px] scale-110"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)]" />
            {/* Foreground image card — bottom right */}
            <div
              className="absolute overflow-hidden"
              style={{ bottom: 0, right: 0, width: "80%", height: "77%", borderRadius: "40px 40px 40px 0" }}
            >
              <img
                src="https://picsum.photos/seed/contact-bus/400/480"
                alt="Ghana street scene"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right — heading + form */}
          <div className="flex-1 flex flex-col gap-[16px]">
            <div className="flex flex-col items-end gap-[8px]">
              <h2
                style={{ fontSize: "25px", fontWeight: 700, color: "#2d2d2d", lineHeight: "34px", fontFamily: "Raleway, sans-serif", textAlign: "right" }}
              >
                Get in Touch With Us
              </h2>
              <p
                style={{ fontSize: "16px", fontWeight: 400, color: "#2d2d2d", lineHeight: "24px", fontFamily: "Raleway, sans-serif", textAlign: "right", maxWidth: "565px" }}
              >
                We&apos;d love to hear from you! Whether you have questions about a tour, want to
                discuss partnership opportunities, or simply need more details about your next
                adventure, our team is here to help. Fill out the form below with your details and
                message, and we&apos;ll get back to you as soon as possible.
              </p>
            </div>
            <ContactForm onSubmit={handleFormSubmit} />
          </div>
        </div>
      </section>

      {/* ── 4. FAQ ──────────────────────────────────────────────────────────── */}
      <section className="w-full py-[60px]">
        {/* Header row — label LEFT, title+body RIGHT */}
        <div className="px-4 md:px-[80px] flex items-start justify-between mb-[40px]">
          <SectionLabel text="FAQs" />
          <div className="flex flex-col items-end gap-[8px] max-w-[597px]">
            <h2
              style={{ fontSize: "25px", fontWeight: 700, color: "#2d2d2d", lineHeight: "34px", fontFamily: "Raleway, sans-serif", textAlign: "right" }}
            >
              Need Help? We&apos;ve Got Answers
            </h2>
            <p
              style={{ fontSize: "16px", fontWeight: 400, color: "#2d2d2d", lineHeight: "24px", fontFamily: "Raleway, sans-serif", textAlign: "right", maxWidth: "565px" }}
            >
              Planning a trip comes with questions — and we&apos;re here to help. Find quick
              answers about booking, payments, safety, and more so you can plan your Ghana
              adventure with confidence.
            </p>
          </div>
        </div>

        {/* Tab bar */}
        <div className="border-t border-b border-[#f2eaf9] h-[80px] flex items-center justify-between px-[20px] mb-[40px] overflow-x-auto gap-[16px]">
          <div className="flex gap-[16px] items-center shrink-0">
            {FAQ_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={classNames(
                  "flex items-center justify-center px-[10px] py-[10px] rounded-[20px] transition-all duration-300 ease-in shrink-0",
                  "shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]",
                  activeTab === tab ? "bg-[#622399]" : "border border-[#b9b9b9]"
                )}
                style={{
                  fontSize: "13px",
                  fontWeight: activeTab === tab ? 600 : 500,
                  color: activeTab === tab ? "#fefefe" : "#949494",
                  fontFamily: "Raleway, sans-serif",
                  lineHeight: activeTab === tab ? "18px" : "22px",
                  whiteSpace: "nowrap",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search — input + purple circular button */}
          <div className="flex items-center border border-[#c6c6c6] rounded-[40px] h-[48px] shrink-0 overflow-hidden"
            style={{ width: 379 }}
          >
            <input
              type="text"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Search for Blogs/Articles"
              className="flex-1 outline-none bg-transparent px-[20px] min-w-0"
              style={{ fontSize: "13px", fontWeight: 500, color: "#bebebe", fontFamily: "Raleway, sans-serif" }}
            />
            {/* Purple circular search button */}
            <button
              type="button"
              className="shrink-0 w-[37px] h-[37px] rounded-full bg-[#7b2cbf] flex items-center justify-center mr-[5px]"
              aria-label="Search"
            >
              <SearchBtnIcon />
            </button>
          </div>
        </div>

        {/* FAQ items — 10 items, 2 columns */}
        <div className="px-4 md:px-[80px]">
          <FAQAccordion items={visibleFaqs} columns={2} />
        </div>
      </section>

      {/* ── 5. MAP ──────────────────────────────────────────────────────────── */}
      <section className="w-full py-[40px] px-4 md:px-[80px]">
        <MapEmbed
          height={521}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15883.0!2d-0.2137!3d5.6537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9062e4ffc9e83%3A0x9e3c31c7d9d4c6e4!2sKwabenya%2C%20Accra%2C%20Ghana!5e0!3m2!1sen!2sgh!4v1700000000000"
          address="Kwabenya, Accra, Ghana"
          openMapsUrl="https://maps.google.com/?q=Kwabenya,Accra,Ghana"
        />
      </section>

      {/* ── 6. CTA — "Promoting Ghana, Inspiring the World" ─────────────────── */}
      <section className="relative w-full bg-[#2b0f43] overflow-hidden">
        <div className="max-w-[1728px] mx-auto min-h-[500px] lg:min-h-[400px] flex flex-col lg:flex-row items-center gap-[60px] px-4 md:px-[80px] py-[60px]">
          {/* Left — image */}
          <div
            className="shrink-0 rounded-[20px] overflow-hidden"
            style={{ width: 500, height: 340 }}
          >
            <img
              src="https://picsum.photos/seed/ghana-safari/500/340"
              alt="Promoting Ghana"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Right — text */}
          <div className="flex flex-col items-end gap-[24px] flex-1">
            <h2
              style={{ fontSize: "40px", fontWeight: 700, color: "#fefefe", lineHeight: "52px", fontFamily: "Raleway, sans-serif", textAlign: "right" }}
            >
              Promoting Ghana,<br />Inspiring the World
            </h2>
            <p
              style={{ fontSize: "16px", fontWeight: 400, color: "#fefefe", lineHeight: "24px", fontFamily: "Raleway, sans-serif", textAlign: "right", maxWidth: "483px" }}
            >
              we showcase the best of Ghana — its culture, people, and untold stories. From hidden
              gems to iconic landmarks, we inspire travelers to explore and celebrate the beauty
              that defines our nation.
            </p>
            <Button variant="white" size="medium" shape="pill" className="w-[169px] h-[64px]">
              Partner With Us
            </Button>
          </div>
        </div>
        {/* Decorative purple glow blobs */}
        <div className="absolute top-[-60px] right-[-60px] w-[200px] h-[200px] rounded-full bg-[#7b2cbf] opacity-20 blur-[60px]" />
        <div className="absolute bottom-[-40px] left-[200px] w-[160px] h-[160px] rounded-full bg-[#5c218f] opacity-20 blur-[40px]" />
      </section>

      {/* ── TOAST OVERLAY ───────────────────────────────────────────────────── */}
      {showToast && (
        <>
          <div
            className="fixed inset-0 z-[90]"
            style={{ background: "#2d2d2d", opacity: 0.6 }}
            onClick={dismissToast}
          />
          <div className="fixed top-6 right-6 z-[100]">
            <ToastItem
              variant="success"
              Heading="Message Sent Successfully!"
              text="Thanks for getting in touch! One of our travel experts will reply within 24 hours."
              duration={4000}
              onDismiss={dismissToast}
              onCancel={dismissToast}
            />
          </div>
        </>
      )}
    </div>
  );
});

ContactPage.displayName = "ContactPage";
export default ContactPage;
