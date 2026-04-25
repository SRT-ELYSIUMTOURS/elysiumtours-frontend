import React from "react";
import { classNames } from "../../utils/classNames";
import StarRating from "../ui/StarRating";

// Exact structure from Figma node 134:1720 — Frame 13 (Testimonials)
// Card: 456×225px, bg:#fefefe, VERTICAL layout gap:10, NO border, NO shadow
// ┌─────────────────────────────────────────────┐
// │ ★★★★☆  (Frame 36 — 130×33, stars row)       │
// │                                             │
// │ VERTICAL gap:37                             │
// │   VERTICAL gap:8                            │
// │     "Quote headline" [13px/700] #2d2d2d     │
// │     "Quote body..."  [13px/400] #2d2d2d     │
// │     "Attribution"    [10px/700] #2d2d2d     │
// │                                             │
// │   HORIZONTAL gap:12                         │
// │     Avatar circle 60×60 radius:100          │
// │     VERTICAL gap:4                          │
// │       "Reviewer Name"  [16px/600] #2d2d2d   │
// │       "2 weeks ago"    [13px/500] #949494   │
// └─────────────────────────────────────────────┘

const TestimonialCard = React.forwardRef(({
  quote = "Elysium Tours made my trip to Ghana absolutely amazing!",
  body = "Elysium Tours made my trip to Ghana absolutely amazing! Our guide was so knowledgeable and friendly, and every destination felt thoughtfully chosen. I especially loved the Cape Coast tour.....",
  attribution = "Sarah M., United Kingdom",
  reviewerName = "Estella Sackey",
  timestamp = "2 weeks ago",
  rating = 4,
  avatar,
  onClick,
  className = "",
  ...props
}, ref) => {

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={classNames(
        // 456×225 — no border, no shadow, white bg, vertical gap-[10px]
        "flex flex-col gap-[10px] w-full max-w-[456px] min-w-0 overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Stars row — Frame 36: 130×33 */}
      <StarRating value={rating} showValue={false} size="medium" readOnly />

      {/* Content block — VERTICAL gap:37 */}
      <div className="flex flex-col gap-[37px]">

        {/* Text block — VERTICAL gap:8 */}
        <div className="flex flex-col gap-[8px]">
          {/* Quote headline — [13px/700] #2d2d2d */}
          <p className="text-med-small-bold text-tertiary-normal-default break-words">
            {quote}
          </p>
          {/* Body — [13px/400] #2d2d2d */}
          <p className="text-med-small-regular text-tertiary-normal-default leading-[18px] break-words">
            {body}
          </p>
          {/* Attribution — [10px/700] #2d2d2d */}
          <p className="text-sm-bold text-tertiary-normal-default">
            {attribution}
          </p>
        </div>

        {/* Reviewer row — HORIZONTAL gap:12 */}
        <div className="flex items-center gap-[12px]">
          {/* Avatar circle — 60×60 radius:100 */}
          <div className="w-[60px] h-[60px] rounded-full shrink-0 bg-secondary-light-default overflow-hidden flex items-center justify-center">
            {avatar ? (
              <img src={avatar} alt={reviewerName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-md-bold text-secondary-normal-default">
                {reviewerName?.charAt(0) || "?"}
              </span>
            )}
          </div>
          {/* Name + timestamp — VERTICAL gap:4 */}
          <div className="flex flex-col gap-[4px]">
            {/* Name — [16px/600] #2d2d2d */}
            <span className="text-md-semibold text-tertiary-normal-default">
              {reviewerName}
            </span>
            {/* Timestamp — [13px/500] #949494 */}
            <span className="text-med-small-Medium text-primary-dark-hover">
              {timestamp}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
});

TestimonialCard.displayName = "TestimonialCard";
export default TestimonialCard;
