import React from "react";
import { classNames } from "../../utils/classNames";

// Figma: 1903:25316 — 331×192, rounded-[40px]
// Layers:  #7b2cbf base → image (object-cover) → rgba(0,0,0,0.5) overlay
// Country: Raleway Bold 25px/34px #fefefe, absolute centered
// Badge:   top-right right-[16px] top-[22px], backdrop-blur-[50px] bg-rgba(254,254,254,0.2)
//          border-[0.2px] border-white rounded-[16px] px-[10px] py-[8px] h-[24px]
//          Raleway SemiBold 10px #fefefe
// Shadow:  0px 4px 20px 0px rgba(0,0,0,0.05)

const CountryTourCard = React.forwardRef(({
  image,
  country = "Ghana",
  tourCount,
  onClick,
  className = "",
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      onClick={onClick}
      className={classNames(
        "relative overflow-clip cursor-pointer group transition-all duration-300 ease-in",
        "hover:-translate-y-1",
        className
      )}
      style={{
        width: "331px",
        height: "192px",
        borderRadius: "40px",
        boxShadow: "0px 4px 20px 0px rgba(0,0,0,0.05)",
      }}
      {...props}
    >
      {/* Background layers */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[40px]">
        {/* Base fill */}
        <div className="absolute inset-0 bg-secondary-normal-default rounded-[40px]" />
        {/* Image */}
        {image && (
          <img
            src={image}
            alt={country}
            className="absolute inset-0 w-full h-full object-cover rounded-[40px] transition-transform duration-300 ease-in group-hover:scale-105"
          />
        )}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 rounded-[40px] transition-all duration-300 ease-in group-hover:bg-black/40" />
      </div>

      {/* Country name — Raleway Bold 25px/34px #fefefe, absolute centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          style={{
            fontFamily: "Raleway, sans-serif",
            fontSize: "25px",
            fontWeight: 700,
            lineHeight: "34px",
            color: "#fefefe",
            textAlign: "center",
          }}
        >
          {country}
        </span>
      </div>

      {/* Tour count badge — frosted glass, top-right */}
      {tourCount != null && (
        <div
          className="absolute flex items-center justify-center"
          style={{
            right: "16px",
            top: "22px",
            height: "24px",
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingTop: "8px",
            paddingBottom: "8px",
            backdropFilter: "blur(50px)",
            backgroundColor: "rgba(254,254,254,0.2)",
            border: "0.2px solid white",
            borderRadius: "16px",
          }}
        >
          <span
            style={{
              fontFamily: "Raleway, sans-serif",
              fontSize: "10px",
              fontWeight: 600,
              color: "#fefefe",
              whiteSpace: "nowrap",
            }}
          >
            {tourCount} tours
          </span>
        </div>
      )}
    </div>
  );
});

CountryTourCard.displayName = "CountryTourCard";
export default CountryTourCard;
