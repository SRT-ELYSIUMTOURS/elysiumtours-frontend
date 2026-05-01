import React from "react";
import { classNames } from "../../utils/classNames";
import Button from "./button";
import NewsletterInput from "./NewsletterInput";
import ElysiumLogo from "../../assets/Elysium-logo.svg";

// From Figma: Footer — Frame 75 (1728×399, padding:16 all sides)
// Frame 96: Horizontal, Hug×Hug (1416.5×227), gap:118px, top:73, left:155.5
// Frame 95 (Newsletter): Vertical, width:379, Hug height, gap:14
// Frame 94 (Email pill): 379×56, r:40, border 1px #D6BEEB
// Bottom bar: copyright + Privacy Policy + Terms Of Use

// ─── Sub-components ────────────────────────────────────────────────────────────

const FooterColHeading = ({ children, className = "" }) => (
  <h4 className={classNames(
    "text-md-semibold text-tertiary-normal-hover font-raleway mb-2",
    className
  )}>
    {children}
  </h4>
);

const FooterLink = ({ href = "#", children, className = "" }) => (
  <a
    href={href}
    className={classNames(
      "block text-md-regular text-tertiary-normal-default",
      "hover:text-secondary-normal-default transition-colors duration-200",
      className
    )}
  >
    {children}
  </a>
);

// ─── Partner CTA Strip ─────────────────────────────────────────────────────────


// ─── Main Footer ───────────────────────────────────────────────────────────────

const Footer = ({
  logo,
  tagline = "Celebrating Ghana's stories, people, and places through meaningful travel experiences.",
  companyLinks = [],
  supportLinks = [],
  legalLinks = [],
  onSubscribe,
  copyrightText,
  className = "",
}) => {
  const year = new Date().getFullYear();

  return (
    <footer className={classNames("w-full overflow-hidden", className)}>
      {/* Main grid */}
      <div className="w-full bg-primary-light-default px-6 md:px-16 pt-10 pb-5">

        {/* Mobile: stacked — Desktop: horizontal row */}
        <div className="flex flex-col md:flex-row md:flex-wrap gap-8 md:items-start md:justify-between">

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
          <div className="flex flex-row gap-12 md:gap-8 md:contents">

            {/* Col 2 — Company */}
            <div className="flex-1 md:flex-none md:shrink-0">
              <FooterColHeading>Company</FooterColHeading>
              <div className="flex flex-col gap-4">
                {(companyLinks.length ? companyLinks : [
                  { label: "Home",          href: "#" },
                  { label: "Tour",          href: "#" },
                  { label: "Tour Partners", href: "#" },
                  { label: "Gallery",       href: "#" },
                  { label: "Blogs",         href: "#" },
                ]).map(link => (
                  <FooterLink key={link.label} href={link.href}>{link.label}</FooterLink>
                ))}
              </div>
            </div>

            {/* Col 3 — Support */}
            <div className="flex-1 md:flex-none md:shrink-0">
              <FooterColHeading>Support</FooterColHeading>
              <div className="flex flex-col gap-3">
                {(supportLinks.length ? supportLinks : [
                  { label: "Support Center",  href: "#" },
                  { label: "FAQS",            href: "#" },
                  { label: "Troubleshooting", href: "#" },
                  { label: "Feedback",        href: "#" },
                ]).map(link => (
                  <FooterLink key={link.label} href={link.href}>{link.label}</FooterLink>
                ))}
              </div>
            </div>

          </div>

          {/* Col 4 — Legal */}
          <div className="shrink-0">
            <FooterColHeading>Legal</FooterColHeading>
            <div className="flex flex-col gap-3">
              {(legalLinks.length ? legalLinks : [
                { label: "Privacy Policy",   href: "#" },
                { label: "Terms of Service", href: "#" },
                { label: "Cookie Policy",    href: "#" },
              ]).map(link => (
                <FooterLink key={link.label} href={link.href}>{link.label}</FooterLink>
              ))}
            </div>
          </div>

          {/* Col 5 — Newsletter */}
          <div className="w-full md:w-auto md:max-w-[379px]">
            <NewsletterInput
              onSubmit={onSubscribe}
              buttonText="Partner With Us"
              className="w-full"
            />
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="w-full border-t border-solid border-primary-normal-active bg-primary-light-default px-6 md:px-20 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-med-small-regular text-primary-dark-hover">
            {copyrightText || `Copyright © ElysiumTours`}
          </p>
          <div className="flex items-center gap-6">
            <FooterLink className="text-med-small-regular text-primary-dark-hover" href="#">Privacy Policy</FooterLink>
            <FooterLink className="text-med-small-regular text-primary-dark-hover" href="#">Terms Of Use</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { FooterLink, FooterColHeading };
export default Footer;
