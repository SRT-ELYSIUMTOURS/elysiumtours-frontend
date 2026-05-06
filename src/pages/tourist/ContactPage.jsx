import React, { useState } from "react";
import { classNames } from "../../utils/classNames";
import HeroImageSlider from "../../components/ui/HeroImageSlider";
import ContactForm from "../../components/ui/ContactForm";
import ContactInfoPill from "../../components/ui/ContactInfoPill";
import FAQAccordion from "../../components/ui/FAQAccordion";
import MapEmbed from "../../components/ui/MapEmbed";
import { ToastItem } from "../../components/ui/toast";
import BlogBreadcrumbBar from "../../components/sections/blog/BlogBreadcrumbBar";
import BlogCtaSection from "../../components/sections/blog/BlogCtaSection";


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
    answer: "You can easily book through our website. Once submitted, our team will confirm availability and send your booking details via email.",
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

// ─── Shared section label (line + uppercase text) ─────────────────────────────
const SectionLabel = ({ text }) => (
  <div className="flex items-center gap-[8px]">
    <div className="w-[46px] h-[1px] shrink-0 bg-[#2b0f43]" />
    <span
      style={{
        fontSize: "13px", fontWeight: 700,
        color: "#2b0f43", letterSpacing: "0.05em",
        lineHeight: "18px", fontFamily: "Raleway, sans-serif",
        textTransform: "uppercase", padding: "10px 0",
      }}
    >
      {text}
    </span>
  </div>
);

// ─── Icons ────────────────────────────────────────────────────────────────────
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M4.76085 3.66187C4.8315 3.59123 4.86682 3.5559 4.89794 3.52731C5.6631 2.82423 6.83921 2.82423 7.60436 3.52731C7.63548 3.5559 7.67081 3.59123 7.74145 3.66187L9.19965 5.12007C10.0017 5.92212 10.2311 7.13336 9.77785 8.17314C9.32461 9.21293 9.554 10.4242 10.356 11.2262L12.7529 13.623C13.5549 14.4251 14.7661 14.6545 15.8059 14.2012C16.8457 13.748 18.057 13.9774 18.859 14.7794L20.3172 16.2376C20.3878 16.3083 20.4232 16.3436 20.4518 16.3747C21.1548 17.1399 21.1548 18.316 20.4518 19.0811C20.4232 19.1123 20.3878 19.1476 20.3172 19.2182L19.4309 20.1046C18.7091 20.8264 17.6685 21.1294 16.6721 20.9079C9.88248 19.3991 4.57995 14.0966 3.07115 7.307C2.84971 6.31054 3.15272 5.27001 3.87451 4.54821L4.76085 3.66187Z" stroke="#7B2CBF" stroke-width="1.5"/>
</svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M14.7808 19.7005L14.1906 19.2377V19.2377L14.7808 19.7005ZM9.21921 19.7005L8.62903 20.1633L9.21921 19.7005ZM12 22.0055V21.2555V22.0055ZM20 9.6087H19.25C19.25 10.8352 18.6104 12.4764 17.6037 14.256C16.6137 16.0063 15.3342 17.7794 14.1906 19.2377L14.7808 19.7005L15.371 20.1633C16.5371 18.6762 17.8672 16.837 18.9094 14.9945C19.9349 13.1814 20.75 11.2494 20.75 9.6087H20ZM9.21921 19.7005L9.80938 19.2377C8.66578 17.7794 7.38628 16.0063 6.39625 14.256C5.38962 12.4764 4.75 10.8352 4.75 9.6087H4H3.25C3.25 11.2494 4.06511 13.1814 5.09064 14.9945C6.13277 16.837 7.46288 18.6762 8.62903 20.1633L9.21921 19.7005ZM4 9.6087H4.75C4.75 5.21571 8.04678 1.75 12 1.75V1V0.25C7.11666 0.25 3.25 4.49277 3.25 9.6087H4ZM12 1V1.75C15.9532 1.75 19.25 5.21571 19.25 9.6087H20H20.75C20.75 4.49277 16.8833 0.25 12 0.25V1ZM14.7808 19.7005L14.1906 19.2377C13.5717 20.027 13.1641 20.5426 12.7992 20.8741C12.4664 21.1764 12.2442 21.2555 12 21.2555V22.0055V22.7555C12.7291 22.7555 13.2948 22.4504 13.8078 21.9844C14.2886 21.5476 14.7849 20.9107 15.371 20.1633L14.7808 19.7005ZM9.21921 19.7005L8.62903 20.1633C9.21511 20.9107 9.71136 21.5476 10.1922 21.9844C10.7052 22.4504 11.2709 22.7555 12 22.7555V22.0055V21.2555C11.7558 21.2555 11.5336 21.1764 11.2008 20.8741C10.8359 20.5426 10.4283 20.027 9.80938 19.2377L9.21921 19.7005ZM9 10H8.25C8.25 12.0711 9.92893 13.75 12 13.75V13V12.25C10.7574 12.25 9.75 11.2426 9.75 10H9ZM12 13V13.75C14.0711 13.75 15.75 12.0711 15.75 10H15H14.25C14.25 11.2426 13.2426 12.25 12 12.25V13ZM15 10H15.75C15.75 7.92893 14.0711 6.25 12 6.25V7V7.75C13.2426 7.75 14.25 8.75736 14.25 10H15ZM12 7V6.25C9.92893 6.25 8.25 7.92893 8.25 10H9H9.75C9.75 8.75736 10.7574 7.75 12 7.75V7Z" fill="#7B2CBF"/>
</svg>
);

const QuestionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M10.3665 16.3953C10.5316 16.3953 10.6899 16.4609 10.8066 16.5776C10.9234 16.6943 10.989 16.8527 10.989 17.0178V17.4328C10.989 17.5979 10.9234 17.7562 10.8066 17.873C10.6899 17.9897 10.5316 18.0553 10.3665 18.0553C10.2014 18.0553 10.043 17.9897 9.92629 17.873C9.80955 17.7562 9.74397 17.5979 9.74397 17.4328V17.0178C9.74397 16.8527 9.80955 16.6943 9.92629 16.5776C10.043 16.4609 10.2014 16.3953 10.3665 16.3953ZM13.6367 3.49863C14.553 4.32614 15.139 5.5504 15.139 7.12078C15.139 8.29108 14.8485 9.14599 14.3796 9.82245C13.9347 10.4657 13.3495 10.9139 12.8474 11.2974L12.82 11.3189C12.2896 11.724 11.8514 12.066 11.5268 12.5341C11.2172 12.9815 10.989 13.5824 10.989 14.5278C10.989 14.6929 10.9234 14.8512 10.8066 14.9679C10.6899 15.0847 10.5316 15.1503 10.3665 15.1503C10.2014 15.1503 10.043 15.0847 9.92629 14.9679C9.80955 14.8512 9.74397 14.6929 9.74397 14.5278C9.74397 13.3574 10.0345 12.5025 10.5034 11.8261C10.9483 11.1828 11.5335 10.7346 12.0356 10.3512L12.063 10.3296C12.5934 9.92454 13.0316 9.58257 13.3562 9.11445C13.6657 8.66625 13.894 8.06615 13.894 7.12078C13.894 5.88158 13.4425 5.00011 12.8025 4.42325C12.1518 3.83644 11.2687 3.53017 10.3665 3.53017C9.46425 3.53017 8.58113 3.83644 7.9304 4.42325C7.2913 5.00011 6.83894 5.88241 6.83894 7.12078C6.83894 7.28587 6.77336 7.44421 6.65662 7.56095C6.53987 7.67769 6.38154 7.74328 6.21644 7.74328C6.05134 7.74328 5.893 7.67769 5.77626 7.56095C5.65952 7.44421 5.59393 7.28587 5.59393 7.12078C5.59393 5.5504 6.17992 4.32614 7.09625 3.49863C8.00178 2.68107 9.19367 2.28516 10.3665 2.28516C11.5393 2.28516 12.7312 2.68107 13.6367 3.49863Z" fill="#7B2CBF"/>
</svg>
);

const SearchBtnIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
  <g clip-path="url(#clip0_3936_8366)">
    <path d="M13.5489 11.8015C13.256 11.5086 12.7811 11.5086 12.4882 11.8015C12.1953 12.0944 12.1953 12.5692 12.4882 12.8621L13.0186 12.3318L13.5489 11.8015ZM15.2289 15.6028C15.5218 15.8957 15.9967 15.8957 16.2895 15.6028C16.5824 15.31 16.5824 14.8351 16.2896 14.5422L15.7592 15.0725L15.2289 15.6028ZM6.43321 3.52209C6.84233 3.45729 7.12145 3.07311 7.05665 2.664C6.99185 2.25489 6.60767 1.97576 6.19856 2.04056L6.31589 2.78133L6.43321 3.52209ZM2.72731 5.51181C2.66251 5.92093 2.94163 6.30511 3.35075 6.36991C3.75986 6.4347 4.14404 6.15558 4.20884 5.74647L3.46807 5.62914L2.72731 5.51181ZM13.0186 12.3318L12.4882 12.8621L15.2289 15.6028L15.7592 15.0725L16.2896 14.5422L13.5489 11.8015L13.0186 12.3318ZM7.53703 13.0169V12.2669C4.54549 12.2669 2.12036 9.8418 2.12036 6.85026H1.37036H0.620361C0.620361 10.6702 3.71706 13.7669 7.53703 13.7669V13.0169ZM13.7037 6.85026H12.9537C12.9537 9.8418 10.5286 12.2669 7.53703 12.2669V13.0169V13.7669C11.357 13.7669 14.4537 10.6702 14.4537 6.85026H13.7037ZM7.53703 0.683594V1.43359C10.5286 1.43359 12.9537 3.85872 12.9537 6.85026H13.7037H14.4537C14.4537 3.03029 11.357 -0.0664062 7.53703 -0.0664062V0.683594ZM7.53703 0.683594V-0.0664062C3.71706 -0.0664062 0.620361 3.03029 0.620361 6.85026H1.37036H2.12036C2.12036 3.85872 4.54549 1.43359 7.53703 1.43359V0.683594ZM6.31589 2.78133L6.19856 2.04056C4.41171 2.32357 3.01031 3.72497 2.72731 5.51181L3.46807 5.62914L4.20884 5.74647C4.39019 4.60146 5.2882 3.70344 6.43321 3.52209L6.31589 2.78133Z" fill="#EBDFF5"/>
  </g>
  <defs>
    <clipPath id="clip0_3936_8366">
      <rect width="16.4444" height="16.4444" fill="white"/>
    </clipPath>
  </defs>
</svg>
);

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="#2b0f43" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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

      {/* ── BREADCRUMB BAR — sits between navbar and hero ───────────────────── */}
      <BlogBreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Contact Us" },
        ]}
      />

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative w-full">
        <HeroImageSlider slides={CONTACT_HERO_SLIDES} autoPlay interval={5000} height={717} />

        {/* Hero text — centered over slider */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4">
          <div className="flex flex-col items-center gap-[32px] w-[957px] max-w-full">
            <div className="flex flex-col items-center gap-[16px]">
              <h1
                className="text-center"
                style={{ fontSize: "56px", fontWeight: 700, color: "#fefefe", lineHeight: "66px", fontFamily: "Raleway, sans-serif", width: "957px", maxWidth: "100%" }}
              >
                Let&apos;s Help You Plan Your Next Adventure
              </h1>
              <div style={{ width: "867px", maxWidth: "100%", padding: "10px" }}>
                <p
                  className="text-center"
                  style={{ fontSize: "16px", fontWeight: 500, color: "#fefefe", lineHeight: "26px", fontFamily: "Raleway, sans-serif", width: "850px", maxWidth: "100%" }}
                >
                  We&apos;re just a message away and always happy to assist! Whether you&apos;re curious
                  about our tour packages, need help planning your trip, or have a special request, our
                  friendly support team is here to guide you every step of the way. You can reach out to
                  us through our contact form, email, or phone
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. QUICK ASSISTANCE ─────────────────────────────────────────────── */}
      {/* Figma: bg #f2eaf9, h 392px, content starts at top 80px, left 156px */}
      <section className="w-full bg-[#f2eaf9] overflow-hidden" style={{ minHeight: "392px" }}>
        <div className="px-[156px] pt-[80px] pb-[60px]">
          {/* Top row: label LEFT, title+body RIGHT — justify-between */}
          <div className="flex items-start justify-between">
            <SectionLabel text="Help Desk" />
            {/* Right column — items-end, gap 16px, max-w 597px */}
            <div className="flex flex-col items-end gap-[16px]" style={{ width: "597px" }}>
              <div style={{ height: "37px", width: "597px", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingLeft: "10px", paddingTop: "10px", paddingBottom: "10px" }}>
                <h2
                  style={{ fontSize: "25px", fontWeight: 700, color: "#2d2d2d", lineHeight: "34px", fontFamily: "Raleway, sans-serif", textAlign: "right" }}
                >
                  Need Quick Assistance?
                </h2>
              </div>
              <div style={{ width: "597px", paddingLeft: "10px", paddingRight: "1px", paddingTop: "10px", paddingBottom: "10px", display: "flex", justifyContent: "flex-end" }}>
                <p
                  style={{ fontSize: "16px", fontWeight: 400, color: "#2d2d2d", lineHeight: "24px", fontFamily: "Raleway, sans-serif", textAlign: "right", width: "565px" }}
                >
                  Our support team is ready to help with bookings, inquiries, or travel concerns.
                  Reach out via email or phone — we&apos;ll get back to you as soon as possible.
                </p>
              </div>
            </div>
          </div>

          {/* Pills row — right-aligned, gap 40px */}
          {/* Figma: pills at absolute left 724px (= 156px margin + 568px offset), so right-aligned */}
          <div className="flex items-center gap-[40px] justify-end mt-[40px]">
            {/* Email pill — 249×57px */}
            <ContactInfoPill
              icon={<QuestionIcon />}
              text="info@elysiumtours.com"
              href="mailto:info@elysiumtours.com"
            />
            {/* Phone pill — 204×57px */}
            <ContactInfoPill
              icon={<PhoneIcon />}
              text="+233 24 522 4993"
              href="tel:+233245224993"
            />
            {/* Location pill — 313×57px */}
            <ContactInfoPill
            href="https://maps.app.goo.gl/b8sTzKkNv3H19D8u8"
            target="_blank"
              icon={<LocationIcon />}
              text="First Central Link -Adgringanor"
            />
          </div>
        </div>
      </section>

      {/* ── 3. CONTACT FORM ─────────────────────────────────────────────────── */}
      {/* Figma: bg #fefefe, h 1182px, content at left 156px, top 80px */}
      <section className="w-full bg-[#fefefe] overflow-hidden">
        <div className="px-[156px] pt-[80px] pb-[80px]">
          {/* Section header row — label LEFT, title+body RIGHT */}
          <div className="flex items-start justify-between">
            <SectionLabel text="Contact Us" />
            <div className="flex flex-col items-end gap-[16px]" style={{ width: "597px" }}>
              <div style={{ height: "37px", width: "597px", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingLeft: "10px", paddingTop: "10px", paddingBottom: "10px" }}>
                <h2
                  style={{ fontSize: "25px", fontWeight: 700, color: "#2d2d2d", lineHeight: "34px", fontFamily: "Raleway, sans-serif", textAlign: "right" }}
                >
                  Get in Touch With Us
                </h2>
              </div>
              <div style={{ width: "597px", paddingLeft: "10px", paddingRight: "1px", paddingTop: "10px", paddingBottom: "10px", display: "flex", justifyContent: "flex-end" }}>
                <p
                  style={{ fontSize: "16px", fontWeight: 400, color: "#2d2d2d", lineHeight: "24px", fontFamily: "Raleway, sans-serif", textAlign: "right", width: "565px" }}
                >
                  We&apos;d love to hear from you! Whether you have questions about a tour, want to
                  discuss partnership opportunities, or simply need more details about your next
                  adventure, our team is here to help. Fill out the form below with your details and
                  message, and we&apos;ll get back to you as soon as possible.
                </p>
              </div>
            </div>
          </div>

          {/* Content row: image (697px) + gap (~129px) + form (576px) = 1402px ≈ 1416px content */}
          <div className="mt-[80px] flex items-stretch gap-[160px] justify-between">
            {/* Left image collage — Figma: 697×746px; stretches to match form height (items-stretch) */}
            <div
              className="relative min-h-0 w-[697px] shrink-0 self-stretch overflow-hidden rounded-[40px]"
              style={{ boxShadow: "0px 4px 20px 0px rgba(0,0,0,0.05)" }}
            >
              {/* Blurred background fill */}
              <img
                src="./src/assets/homeAssets/hero1.webp"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "blur(10px)", transform: "scale(1.1)" }}
                aria-hidden="true"
              />
              {/* Dark overlays */}
              <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.4)" }} />
              <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.1)" }} />
              {/* Foreground image card — Figma: 439×568px, br-[40px] bl-[40px] tl-[40px], bottom-right anchored */}
              <div
                className="absolute overflow-hidden"
                style={{
                  bottom: 0,
                  right: 0,
                  width: "439px",
                  height: "568px",
                  borderRadius: "40px 40px 40px 0",
                }}
              >
                <img
                  src="https://picsum.photos/seed/contact-ghana/439/568"
                  alt="Ghana street scene"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right form — Figma: 576px wide */}
            <div className="flex flex-col gap-[16px]" style={{ width: "576px" }}>
              <ContactForm onSubmit={handleFormSubmit} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. FAQ ──────────────────────────────────────────────────────────── */}
      {/* Figma: bg #f2eaf9, h 1167px, content at left 156px, top 80px */}
      <section className="w-full bg-[#f2eaf9] overflow-hidden">
        {/* Section header row — px-[156px] */}
        <div className="px-[156px] pt-[80px]">
          <div className="flex items-start justify-between">
            <SectionLabel text="FAQs" />
            <div className="flex flex-col items-end gap-[16px]" style={{ width: "677px" }}>
              <div style={{ height: "37px", width: "597px", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingLeft: "10px", paddingTop: "10px", paddingBottom: "10px" }}>
                <h2
                  style={{ fontSize: "25px", fontWeight: 700, color: "#2d2d2d", lineHeight: "34px", fontFamily: "Raleway, sans-serif", textAlign: "right", width: "581px" }}
                >
                  Need Help? We&apos;ve Got Answers
                </h2>
              </div>
              <div style={{ paddingLeft: "10px", paddingRight: "1px", paddingTop: "10px", paddingBottom: "10px", display: "flex", justifyContent: "flex-end" }}>
                <p
                  style={{ fontSize: "16px", fontWeight: 400, color: "#2d2d2d", lineHeight: "24px", fontFamily: "Raleway, sans-serif", textAlign: "right", width: "565px" }}
                >
                  Planning a trip comes with questions — and we&apos;re here to help. Find quick
                  answers about booking, payments, safety, and more so you can plan your Ghana
                  adventure with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab bar — full width, h-[80px], border top+bottom 0.5px #f2eaf9 baked into shadow/border */}
        {/* Figma: border top 0.5px solid #f2eaf9, border bottom 0.5px solid #f2eaf9, inner px left 20px */}
        <div
          className="w-full flex items-center justify-between px-[156px] mx-auto mt-[40px]"
          style={{
            height: "80px",
             display: "flex",
            alignItems: "center",
          }}
        >
          <div
            className="flex items-center gap-[16px]"
            style={{ paddingLeft: "20px", paddingRight: "20px" }}
          >
            {FAQ_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={classNames(
                  "flex items-center justify-center rounded-[20px] transition-all duration-300 ease-in shrink-0",
                  "shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]",
                  activeTab === tab ? "bg-[#622399]" : "border border-[#b9b9b9] bg-transparent"
                )}
                style={{
                  padding: "10px",
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

           {/* Search row — Figma: search box 379×48px, right side, with purple circular button */}
        <div className="  flex justify-end">
          <div
            className="flex items-center overflow-hidden"
            style={{
              width: "379px",
              height: "48px",
              border: "1px solid #c6c6c6",
              borderRadius: "40px",
            }}
          >
            <input
              type="text"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Search for Blogs/Articles"
              className="flex-1 outline-none bg-transparent min-w-0"
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "#2d2d2d",
                fontFamily: "Raleway, sans-serif",
                paddingLeft: "20px",
              }}
            />
            <button
              type="button"
              className="shrink-0 flex items-center justify-center rounded-full bg-[#7b2cbf] mr-[5px]"
              style={{ width: "37px", height: "37px" }}
              aria-label="Search"
            >
              <SearchBtnIcon />
            </button>
          </div>
        </div>
        </div>

       

        {/* FAQ grid — Figma: left 158px, top 375px from section, 2 cols gap 21px, items gap 19px */}
        <div className="px-[156px] mt-[32px] pb-[80px]">
          <FAQAccordion items={visibleFaqs} columns={2} />
        </div>
      </section>

      {/* ── 5. MAP ──────────────────────────────────────────────────────────── */}
      {/* Figma: bg #fefefe, h 604px, map 1416×521px centered, py ~41px */}
      <section className="w-full bg-[#fefefe]" style={{ height: "604px", display: "flex", alignItems: "center" }}>
        <div className="px-[156px] w-full">
          <MapEmbed
            height={521}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15883.0!2d-0.2137!3d5.6537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9062e4ffc9e83%3A0x9e3c31c7d9d4c6e4!2sKwabenya%2C%20Accra%2C%20Ghana!5e0!3m2!1sen!2sgh!4v1700000000000"
            address="Kwabenya, Accra, Ghana"
            openMapsUrl="https://maps.google.com/?q=Kwabenya,Accra,Ghana"
          />
        </div>
      </section>

      {/* ── 6. CTA — "Promoting Ghana, Inspiring the World" ─────────────────── */}
      <BlogCtaSection />


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
