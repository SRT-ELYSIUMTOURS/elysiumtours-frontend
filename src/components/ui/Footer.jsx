import React, { useState } from "react";
import { Link } from "react-router-dom";
import { classNames } from "../../utils/classNames";
import NewsletterInput from "./NewsletterInput";
import PartnerWithUsModal from "./PartnerWithUsModal";
import Toast from "./toast";
import { subscribeNewsletterApi } from "../../api/contact.api";

const ElysiumLogo = "/Elysium-logo.svg";

// ─── Sub-components ────────────────────────────────────────────────────────────

const FooterColHeading = ({ children, className = "" }) => (
  <h4 className={classNames(
    "text-md-semibold text-tertiary-normal-hover font-raleway mb-2",
    className
  )}>
    {children}
  </h4>
);

// Internal routes use React Router <Link> to avoid full page reloads.
// External URLs use a regular <a>.
const FooterLink = ({ href = "#", children, className = "" }) => {
  const isInternal = href.startsWith("/") || href === "#";
  const base = classNames(
    "block text-md-regular text-tertiary-normal-default",
    "hover:text-secondary-normal-default transition-colors duration-200",
    className
  );
  if (isInternal) {
    return <Link to={href} className={base}>{children}</Link>;
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={base}>
      {children}
    </a>
  );
};

// ─── Default link sets ────────────────────────────────────────────────────────

const DEFAULT_COMPANY_LINKS = [
  { label: "Home",          href: "/" },
  { label: "Tours",         href: "/tours" },
  { label: "Tour Partners", href: "/tour-partners" },
  { label: "Gallery",       href: "/gallery" },
  { label: "Blog",          href: "/blog" },
  { label: "Contact",       href: "/contact" },
];

// FAQs and general enquiries live on the Contact page.
const DEFAULT_SUPPORT_LINKS = [
  { label: "Contact Us", href: "/contact" },
  { label: "FAQs",       href: "/contact" },
  { label: "Feedback",   href: "/contact" },
];

// Legal pages not yet created — placeholder hrefs until they exist.
const DEFAULT_LEGAL_LINKS = [
  { label: "Privacy Policy",   href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy",    href: "#" },
];

// ─── Main Footer ───────────────────────────────────────────────────────────────

const Footer = ({
  logo,
  tagline = "Celebrating Ghana's stories, people, and places through meaningful travel experiences.",
  companyLinks,
  supportLinks,
  legalLinks,
  copyrightText,
  className = "",
}) => {
  const year = new Date().getFullYear();
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const resolvedCompany = companyLinks?.length ? companyLinks : DEFAULT_COMPANY_LINKS;
  const resolvedSupport = supportLinks?.length ? supportLinks : DEFAULT_SUPPORT_LINKS;
  const resolvedLegal   = legalLinks?.length   ? legalLinks   : DEFAULT_LEGAL_LINKS;

  const handleNewsletterSubmit = async (email) => {
    if (!email?.trim()) return;
    setSubmitting(true);
    try {
      await subscribeNewsletterApi(email.trim());
      setToast({
        variant: "success",
        Heading: "Subscribed!",
        text: "You're on the list. We'll keep you updated on the latest from Elysium.",
      });
    } catch {
      setToast({
        variant: "error",
        Heading: "Subscription failed",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handlePartnerSubmit = () => {
    setPartnerModalOpen(false);
    setToast({
      variant: "success",
      Heading: "Application received",
      text: "Thanks! We'll reach out within 48 hours.",
    });
  };

  return (
    <footer className={classNames("w-full overflow-hidden", className)}>
      {/* Main grid */}
      <div className="w-full bg-primary-light-default px-6 md:px-16 pt-8 md:pt-10 pb-5">

        {/* Mobile: stacked — Desktop: horizontal row */}
        <div className="flex flex-col md:flex-row md:flex-wrap gap-5 md:gap-8 md:items-start md:justify-between">

          {/* Col 1 — Logo + tagline */}
          <div className="flex flex-col gap-4 max-w-[220px]">
            <div className="h-16 md:h-20 w-auto">
              <img src={ElysiumLogo} alt="Elysium Group" className="h-full w-auto object-contain" />
            </div>
            <p className="text-med-small-regular text-primary-dark-active leading-relaxed">
              {tagline}
            </p>
          </div>

          {/* Cols 2+3 — Company & Support side by side on mobile */}
          <div className="flex flex-row gap-8 md:gap-8 md:contents">

            {/* Col 2 — Company */}
            <div className="flex-1 md:flex-none md:shrink-0">
              <FooterColHeading>Company</FooterColHeading>
              <div className="flex flex-col gap-2 md:gap-4">
                {resolvedCompany.map(link => (
                  <FooterLink key={link.label} href={link.href}>{link.label}</FooterLink>
                ))}
              </div>
            </div>

            {/* Col 3 — Support */}
            <div className="flex-1 md:flex-none md:shrink-0">
              <FooterColHeading>Support</FooterColHeading>
              <div className="flex flex-col gap-2 md:gap-3">
                {resolvedSupport.map(link => (
                  <FooterLink key={link.label} href={link.href}>{link.label}</FooterLink>
                ))}
              </div>
            </div>

          </div>

          {/* Col 4 — Legal */}
          <div className="shrink-0">
            <FooterColHeading>Legal</FooterColHeading>
            <div className="flex flex-col gap-2 md:gap-3">
              {resolvedLegal.map(link => (
                <FooterLink key={link.label} href={link.href}>{link.label}</FooterLink>
              ))}
            </div>
          </div>

          {/* Col 5 — Newsletter */}
          <div className="w-full md:w-auto md:max-w-[379px]">
            <NewsletterInput
              onSubmit={handleNewsletterSubmit}
              buttonText={submitting ? "Submitting…" : "Submit Email"}
              className="w-full"
            />
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="w-full border-t border-solid border-primary-normal-active bg-primary-light-default px-6 md:px-20 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-med-small-regular text-primary-dark-hover">
            {copyrightText || `Copyright © ${year} ElysiumTours`}
          </p>
          <div className="flex items-center gap-6">
            <FooterLink className="text-med-small-regular text-primary-dark-hover" href="#">Privacy Policy</FooterLink>
            <FooterLink className="text-med-small-regular text-primary-dark-hover" href="#">Terms Of Use</FooterLink>
          </div>
        </div>
      </div>

      {/* Partner With Us modal */}
      {partnerModalOpen && (
        <PartnerWithUsModal
          onClose={() => setPartnerModalOpen(false)}
          onSubmit={handlePartnerSubmit}
        />
      )}

      {toast && (
        <Toast
          variant={toast.variant}
          Heading={toast.Heading}
          text={toast.text}
          onCancel={() => setToast(null)}
          duration={4000}
        />
      )}
    </footer>
  );
};

export { FooterLink, FooterColHeading };
export default Footer;
