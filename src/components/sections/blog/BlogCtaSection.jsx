import React from "react";
import { classNames } from "../../../utils/classNames";

import ctaGlowRight   from "../../../assets/ElysiumAssets/cta-glow-right.svg";
import ctaGlowLeft    from "../../../assets/ElysiumAssets/cta-glow-left.svg";

const BlogCtaSection = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={classNames(
        "relative w-full overflow-hidden bg-[#2b0f43] h-auto lg:h-[732px] py-12 lg:py-0",
        className
      )}
      style={{ boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.25)" }}
      {...props}
    >
      {/* Top-right glow */}
      <img
        src={ctaGlowRight}
        alt=""
        aria-hidden="true"
        className="absolute pointer-events-none right-0 top-[-110px] w-[200px] md:w-[300px] lg:w-[380px] h-auto"
      />

      {/* Bottom-left glow */}
      <img
        src={ctaGlowLeft}
        alt=""
        aria-hidden="true"
        className="absolute pointer-events-none left-0 bottom-[-104px] w-[200px] md:w-[300px] lg:w-[380px] h-auto"
      />

      {/* Mobile/tablet stacked layout */}
      <div className="relative z-10 flex flex-col lg:hidden items-center gap-8 px-4 md:px-8">
        <div className="w-full max-w-[600px] rounded-[40px] overflow-hidden shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]">
          <img
            src="https://picsum.photos/seed/ghana-promote/711/559"
            alt="Promoting Ghana"
            className="w-full h-[220px] md:h-[400px] object-cover"
          />
        </div>
        <div className="flex flex-col items-center gap-4 w-full max-w-[600px]">
          <h2 className="font-raleway font-bold text-[28px] md:text-[40px] leading-tight text-[#fefefe] text-center">
            Promoting Ghana,<br />Inspiring the World
          </h2>
          <p className="font-raleway font-normal text-[14px] md:text-[16px] leading-[24px] text-[#fefefe] text-center">
            We showcase the best of Ghana — its culture, people, and untold stories. From hidden
            gems to iconic landmarks, we inspire travelers to explore and celebrate the beauty
            that defines our nation.
          </p>
          <button
            className="flex items-center justify-center gap-[16px] transition-all duration-300 ease-in"
            style={{
              background: "#fefefe",
              border: "1px solid #7b2cbf",
              height: "56px",
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

      {/* Desktop layout — original Figma absolute positioning */}
      <div className="hidden lg:block">
        {/* Left image */}
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

        {/* Right text block */}
        <div
          className="absolute flex flex-col items-end gap-[16px]"
          style={{
            left: "987px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "581px",
          }}
        >
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
      </div>
    </section>
  );
});

BlogCtaSection.displayName = "BlogCtaSection";
export default BlogCtaSection;
