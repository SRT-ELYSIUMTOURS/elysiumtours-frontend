import React from "react";
import { classNames } from "../../utils/classNames";

// From Figma: Tours page Frame 7 > Frame 97/98
// CountryTourCard: Frame 46/47/48/49 — 331×192, fills:[#7b2cbf,IMAGE,#000000] r:40
// Structure: full-bleed image + purple base + dark overlay + country name [20px/700] #fefefe bottom-left
// Used in a 4-column grid, 2 rows (8 country cards total)

const CountryTourCard = React.forwardRef(({
  image,
  country = "Ghana",
  subtitle,
  onClick,
  className = "",
  ...props
}, ref) => {

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={classNames(
        "relative overflow-hidden cursor-pointer group transition-all duration-300 ease-in",
        "hover:-translate-y-1 hover:shadow-xl",
        className
      )}
      style={{ width: "331px", height: "192px", borderRadius: "40px" }}
      {...props}
    >
      {/* Base fill — #7b2cbf (shows if no image) */}
      <div className="absolute inset-0 bg-secondary-normal-default" />

      {/* Image */}
      {image ? (
        <img
          src={image}
          alt={country}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-300 ease-in group-hover:scale-105"
        />
      ) : null}

      {/* Dark overlay — #000000 */}
      <div className="absolute inset-0 bg-black/50 transition-all duration-300 ease-in group-hover:bg-black/40" />

      {/* Country name — [20px/700] #fefefe, bottom-left */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 style={{
          fontSize: "20px",
          fontWeight: 700,
          color: "#fefefe",
          lineHeight: "28px",
          fontFamily: "Raleway, sans-serif",
        }}>
          {country}
        </h3>
        {subtitle && (
          <p style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#fefefe",
            lineHeight: "22px",
            fontFamily: "Raleway, sans-serif",
            opacity: 0.9,
          }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
});

CountryTourCard.displayName = "CountryTourCard";
export default CountryTourCard;
