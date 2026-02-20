import React from "react";
import { classNames } from "../../utils/classNames";

// Star icon — filled or empty
const StarIcon = ({ filled = true, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path
      d="M8 1.5l1.854 3.756 4.146.603-3 2.924.708 4.127L8 10.771l-3.708 1.939.708-4.127-3-2.924 4.146-.603L8 1.5Z"
      fill={filled ? "#7b2cbf" : "none"}
      stroke={filled ? "#7b2cbf" : "#b9b9b9"}
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
);

// StarRating — from Figma: star (26×33) ×5, rating value beside it
const StarRating = React.forwardRef(({
  value = 0,
  max = 5,
  showValue = true,
  showCount = false,
  count = 0,
  size = "medium",
  readOnly = true,
  onChange,
  className = "",
  ...props
}, ref) => {
  const starSizes = { small: 12, medium: 16, large: 20 };
  const starSize  = starSizes[size] || 16;

  const textSizes = {
    small:  "text-med-small-semibold",
    medium: "text-md-Medium",
    large:  "text-semi-md-semibold",
  };

  return (
    <div
      ref={ref}
      className={classNames("inline-flex items-center gap-1", className)}
      {...props}
    >
      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => (
          <button
            key={i}
            type="button"
            disabled={readOnly}
            onClick={() => !readOnly && onChange?.(i + 1)}
            className={classNames(
              "transition-all duration-300 ease-in",
              readOnly ? "cursor-default" : "cursor-pointer hover:scale-110"
            )}
            aria-label={`${i + 1} star${i !== 0 ? "s" : ""}`}
          >
            <StarIcon filled={i < Math.round(value)} size={starSize} />
          </button>
        ))}
      </div>

      {/* Numeric value — from Figma: [16px/500] #7b2cbf "4.9" */}
      {showValue && (
        <span className={classNames(
          textSizes[size],
          "text-secondary-normal-default"
        )}>
          {typeof value === "number" ? value.toFixed(1) : value}
        </span>
      )}

      {/* Review count — optional */}
      {showCount && count > 0 && (
        <span className="text-med-small-regular text-primary-dark-darker">
          ({count})
        </span>
      )}
    </div>
  );
});

StarRating.displayName = "StarRating";
export default StarRating;
