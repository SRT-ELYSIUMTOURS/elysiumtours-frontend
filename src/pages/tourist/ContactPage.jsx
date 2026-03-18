import React, { useState } from "react";
import { classNames } from "../../utils/classNames";
import HeroImageSlider from "../../components/ui/HeroImageSlider";
import ContactForm from "../../components/ui/ContactForm";
import ContactInfoPill from "../../components/ui/ContactInfoPill";
import FAQAccordion from "../../components/ui/FAQAccordion";
import MapEmbed from "../../components/ui/MapEmbed";
import { ToastItem } from "../../components/ui/toast";
import BlogBreadcrumbBar from "../../components/sections/blog/BlogBreadcrumbBar";

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
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"
      stroke="#7b2cbf" strokeWidth="1.5"
    />
  </svg>
);

const LocationIcon = () => (
  <svg width="16" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#7b2cbf" strokeWidth="1.5" />
    <circle cx="12" cy="9" r="2.5" stroke="#7b2cbf" strokeWidth="1.5" />
  </svg>
);

const QuestionIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M9.5 9.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5c0 1.5-1.5 2-2.5 2.5" stroke="#7b2cbf" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="16.5" r="0.8" fill="#7b2cbf" />
  </svg>
);

const SearchBtnIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="8" stroke="#fefefe" strokeWidth="1.5" />
    <path d="m21 21-4.35-4.35" stroke="#fefefe" strokeWidth="1.5" strokeLinecap="round" />
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
          <div className="flex items-start gap-[129px] mt-[80px]">
            {/* Left image collage — Figma: 697×746px, border-radius 40px */}
            <div
              className="relative shrink-0 rounded-[40px] overflow-hidden"
              style={{ width: "697px", height: "746px", boxShadow: "0px 4px 20px 0px rgba(0,0,0,0.05)" }}
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
          className="w-full mt-[40px]"
          style={{
            height: "80px",
            borderTop: "0.5px solid #d6beeb",
            borderBottom: "0.5px solid #d6beeb",
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
        </div>

        {/* Search row — Figma: search box 379×48px, right side, with purple circular button */}
        <div className="px-[156px] mt-[24px] flex justify-end">
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
      {/* Figma: bg #2b0f43, h 732px, shadow 0px 4px 4px rgba(0,0,0,0.25) */}
      <section
        className="relative w-full overflow-hidden bg-[#2b0f43]"
        style={{ height: "732px", boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.25)" }}
      >
        {/* Left image — Figma: left 156px, vertically centered, 711×559px, border-radius 40px */}
        <div
          className="absolute"
          style={{
            left: "156px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "711px",
            height: "559px",
            borderRadius: "40px",
            overflow: "hidden",
            boxShadow: "0px 4px 20px 0px rgba(0,0,0,0.05)",
          }}
        >
          <img
            src="https://picsum.photos/seed/ghana-promote/711/559"
            alt="Promoting Ghana"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right text block — Figma: left 987px, vertically centered, width 581px */}
        <div
          className="absolute flex flex-col items-end gap-[16px]"
          style={{
            left: "987px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "581px",
          }}
        >
          {/* Title — 56px Bold white right-aligned */}
          <h2
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: "#fefefe",
              lineHeight: "66px",
              fontFamily: "Raleway, sans-serif",
              textAlign: "right",
              width: "592px",
            }}
          >
            Promoting Ghana,<br />Inspiring the World
          </h2>

          {/* Body + button — gap 24px */}
          <div className="flex flex-col items-end gap-[24px]">
            <div style={{ paddingLeft: "10px", paddingRight: "1px", paddingTop: "10px", paddingBottom: "10px" }}>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  color: "#fefefe",
                  lineHeight: "24px",
                  fontFamily: "Raleway, sans-serif",
                  textAlign: "right",
                  width: "483px",
                }}
              >
                We showcase the best of Ghana — its culture, people, and untold stories. From hidden
                gems to iconic landmarks, we inspire travelers to explore and celebrate the beauty
                that defines our nation.
              </p>
            </div>

            {/* Button — Figma: bg #fefefe, border 1px solid #7b2cbf, h 64px, w 169px, r 40px, text #2b0f43 */}
            <button
              className="flex items-center justify-center gap-[16px] transition-all duration-300 ease-in"
              style={{
                background: "#fefefe",
                border: "1px solid #7b2cbf",
                height: "64px",
                width: "169px",
                borderRadius: "40px",
                boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.05)",
                padding: "10px",
                fontSize: "16px",
                fontWeight: 600,
                color: "#2b0f43",
                fontFamily: "Raleway, sans-serif",
                lineHeight: "22px",
                cursor: "pointer",
              }}
            >
              Partner With Us
            </button>
          </div>
        </div>
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
