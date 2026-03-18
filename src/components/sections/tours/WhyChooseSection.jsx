import React from "react";
import { classNames } from "../../../utils/classNames";
import Button from "../../ui/button";

// Figma: 1914:37692 — Frame 1000006711, h=2776
// Frame 10 (h=936): header + large image collage
//   Header at x=156, y=80, w=1416, h=194: "AUTHENTIC.SEAMLESS.UNFOREGETTABLE" | "Why Choose Elysium Tours?"
//   Frame 47 at x=156, y=314, w=1419, h=554: large image placeholder
// Frame 12 (h=709): article preview
//   Large image 757×487 left; text card right: writer + title + desc

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.33325 6.25C1.91904 6.25 1.58325 6.58579 1.58325 7C1.58325 7.41421 1.91904 7.75 2.33325 7.75V7V6.25ZM11.6666 7.75C12.0808 7.75 12.4166 7.41421 12.4166 7C12.4166 6.58579 12.0808 6.25 11.6666 6.25V7V7.75ZM9.86121 3.55068C9.56701 3.2591 9.09214 3.26122 8.80056 3.55542C8.50898 3.84961 8.5111 4.32448 8.80529 4.61606L9.33325 4.08337L9.86121 3.55068ZM2.33325 7.75H11.6666V6.25H2.33325V7.75ZM8.80529 4.61606L9.83369 5.63533L10.8896 4.56995L9.86121 3.55068L8.80529 4.61606ZM9.83369 8.36475L8.80529 9.38402L9.86121 10.4494L10.8896 9.43014L9.83369 8.36475ZM9.83369 5.63533C10.2563 6.05416 10.5274 6.32448 10.7074 6.54863C10.8779 6.76094 10.9041 6.85793 10.911 6.91209L12.399 6.72243C12.3427 6.28124 12.1323 5.92733 11.877 5.60938C11.6311 5.30327 11.2871 4.96395 10.8896 4.56995L9.83369 5.63533ZM10.911 7.08799C10.9041 7.14215 10.8779 7.23914 10.7074 7.45145C10.5274 7.6756 10.2563 7.94592 9.83369 8.36475L10.8896 9.43014C11.2871 9.03613 11.6311 8.69681 11.877 8.3907C12.1323 8.07275 12.3427 7.71885 12.399 7.27765L10.911 7.08799ZM10.911 6.91209C10.9184 6.9705 10.9184 7.02958 10.911 7.08799L12.399 7.27765C12.4225 7.09331 12.4225 6.90677 12.399 6.72243L10.911 6.91209Z" fill="#7B2CBF"/>
  </svg>
);

const WhyChooseSection = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={classNames("w-full bg-secondary-light-default", className)}
      {...props}
    >
      {/* Part 1: Header + image collage — Frame 10, h=936 */}
      <div className="py-[80px] px-[156px]">
        {/* Header */}
        <div className="flex items-start justify-between w-full mb-[80px]">
          {/* Left — line + label */}
          <div className="flex items-center gap-[8px] shrink-0">
            <div className="w-[46px] h-[1px] bg-secondary-dark-darker" />
            <span className="font-raleway font-bold text-[13px] leading-[18px] text-secondary-dark-darker whitespace-nowrap tracking-[0.05em] uppercase">
              Authentic.Seamless.Unforgettable
            </span>
          </div>

          {/* Right — w=677 */}
          <div className="flex flex-col gap-md items-end w-[677px]">
            <h2 className="font-raleway font-bold text-[25px] leading-[34px] text-tertiary-normal-default text-right pl-[80px]">
              Why Choose Elysium Tours?
            </h2>
            <p className="font-raleway font-normal text-[16px] leading-[24px] text-tertiary-normal-default text-right pl-[111px]">
              At Elysium Tours, we believe travel is more than visiting destinations — it's about experiencing the soul of a place. With expert local guides and personalized itineraries, every journey is seamless, stress-free, and enriching. We create authentic cultural connections that let you discover what truly makes each destination special.
            </p>
            <Button
              variant="secondaryOutline"
              shape="pill"
              size="small"
              className="h-[32px] gap-[9px] rounded-xl border-[0.8px]"
              endIcon={<ArrowIcon />}
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Large image area — Frame 47, w=1419, h=554 */}
        <div className="w-full h-[554px] rounded-2xl overflow-hidden">
          <img
            src="https://picsum.photos/seed/why-choose-collage/1419/554"
            alt="Why choose Elysium Tours"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Part 2: Article preview — Frame 12 / Figma 1914:39485 */}
      {/* Left: skewed image card 757×487; Right: light purple card 463×306 */}
      <div className="px-[156px] pb-[80px]">
        <div className="flex items-center w-full h-[487px]">

          {/* Left: skewed image — skew-x-[5.41deg], rounded-[20px], purple + dark overlay */}
          <div className="flex items-center justify-center shrink-0" style={{ width: "757px", height: "487px" }}>
            <div style={{ transform: "skewX(5.41deg)" }}>
              <div
                className="relative rounded-[20px] overflow-hidden"
                style={{
                  width: "711px",
                  height: "456px",
                  boxShadow: "0px 4px 20px 0px rgba(0,0,0,0.05)",
                }}
              >
                {/* Purple base */}
                <div className="absolute inset-0 rounded-[20px] bg-[#7b2cbf]" />
                {/* Image */}
                <img
                  src="https://picsum.photos/seed/why-article-img/711/456"
                  alt="Jollof Rice article"
                  className="absolute inset-0 w-full h-full object-cover rounded-[20px]"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 rounded-[20px]" style={{ backgroundColor: "rgba(0,0,0,0.4)" }} />
              </div>
            </div>
          </div>

          {/* Right: article card — bg #f2eaf9, w-463, h-306, rounded-[10px], shadow, p-10, gap-10, centered */}
          <div
            className="flex flex-col items-center justify-center gap-[10px] rounded-[10px] shrink-0"
            style={{
              width: "463px",
              height: "306px",
              backgroundColor: "#f2eaf9",
              padding: "10px",
              boxShadow: "0px 4px 20px 0px rgba(0,0,0,0.05)",
            }}
          >
            <p
              className="text-center"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 700,
                fontSize: "13px",
                lineHeight: "18px",
                color: "#5c218f",
                width: "298px",
              }}
            >
              Writer: Davida Dzato
            </p>
            <p
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "28px",
                color: "#2d2d2d",
                whiteSpace: "nowrap",
              }}
            >
              Jollof Rice, Explained
            </p>
            <p
              className="text-center"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "26px",
                color: "#2d2d2d",
                width: "298px",
              }}
            >
              Six unique dishes, six African countries to explore.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
});

WhyChooseSection.displayName = "WhyChooseSection";
export default WhyChooseSection;
