import React from 'react';
import { Link } from 'react-router-dom';
import NewsletterInput from '../ui/NewsletterInput';

import logoImg from "../../assets/images/LOGO.png";

const ElysiumLogo = () => (
  <img 
    src={logoImg} 
    alt="Elysium Tours" 
    className="h-[50px] w-auto object-contain"
  />
);

const Footer = () => {
  return (
    <footer className="w-full bg-primary-light-active border-t border-primary-dark-default pt-[80px] pb-[40px] px-6 xl:px-[157px] font-raleway">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[60px] pb-[80px]">
          
          {/* Logo and Tagline */}
          <div className="md:col-span-3 flex flex-col gap-[24px]">
            <Link to="/">
              <ElysiumLogo />
            </Link>
            <p className="text-[14px] leading-[22px] text-primary-dark-active max-w-[280px]">
              Celebrating Ghana's stories, people, and places through meaningful travel experiences.
            </p>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-5 grid grid-cols-3 gap-[40px]">
            {/* Company */}
            <div className="flex flex-col gap-[24px]">
              <h4 className="text-[16px] font-bold text-tertiary-normal-default">Company</h4>
              <nav className="flex flex-col gap-md">
                <Link to="/" className="text-[15px] text-primary-dark-active hover:text-secondary-normal-default transition-colors">Home</Link>
                <Link to="/tours" className="text-[15px] text-primary-dark-active hover:text-secondary-normal-default transition-colors">Tour</Link>
                <Link to="/tour-partners" className="text-[15px] text-primary-dark-active hover:text-secondary-normal-default transition-colors">Tour Partners</Link>
                <Link to="/gallery" className="text-[15px] text-primary-dark-active hover:text-secondary-normal-default transition-colors">Gallery</Link>
                <Link to="/blog" className="text-[15px] text-primary-dark-active hover:text-secondary-normal-default transition-colors">Blogs</Link>
              </nav>
            </div>

            {/* Support */}
            <div className="flex flex-col gap-[24px]">
              <h4 className="text-[16px] font-bold text-tertiary-normal-default">Support</h4>
              <nav className="flex flex-col gap-md">
                <Link to="/support" className="text-[15px] text-primary-dark-active hover:text-secondary-normal-default transition-colors">Support Center</Link>
                <Link to="/faqs" className="text-[15px] text-primary-dark-active hover:text-secondary-normal-default transition-colors">FAQS</Link>
                <Link to="/troubleshooting" className="text-[15px] text-primary-dark-active hover:text-secondary-normal-default transition-colors">Troubleshooting</Link>
                <Link to="/feedback" className="text-[15px] text-primary-dark-active hover:text-secondary-normal-default transition-colors">Feedback</Link>
              </nav>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-[24px]">
              <h4 className="text-[16px] font-bold text-tertiary-normal-default">Legal</h4>
              <nav className="flex flex-col gap-md">
                <Link to="/privacy" className="text-[15px] text-primary-dark-active hover:text-secondary-normal-default transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="text-[15px] text-primary-dark-active hover:text-secondary-normal-default transition-colors">Terms of Service</Link>
                <Link to="/cookies" className="text-[15px] text-primary-dark-active hover:text-secondary-normal-default transition-colors">Cookie Policy</Link>
              </nav>
            </div>
          </div>
 
          {/* Newsletter */}
          <div className="md:col-span-4 flex flex-col gap-[24px]">
            <NewsletterInput className="max-w-[379px]" />
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-[40px] border-t border-primary-normal-hover flex flex-col md:row items-center justify-between gap-4">
          <p className="text-[13px] text-primary-dark-active">
            Copyright @ ElysiumTours
          </p>
          <div className="flex items-center gap-[32px]">
            <Link to="/privacy" className="text-[13px] text-primary-dark-active hover:text-secondary-normal-default">Privacy Policy</Link>
            <Link to="/terms" className="text-[13px] text-primary-dark-active hover:text-secondary-normal-default">Terms Of Use</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
