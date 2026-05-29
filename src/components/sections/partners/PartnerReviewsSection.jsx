import React, { useState } from "react";
import StarRating from "../../ui/StarRating";

const REVIEWS_PER_PAGE = 4;

// ── Icons ─────────────────────────────────────────────────────────────────────
const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StarPlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <path d="M7 1l1.5 3.2L12 4.7l-2.5 2.4.6 3.4L7 8.9l-3.1 1.6.6-3.4L2 4.7l3.5-.5z"
      stroke="#7b2cbf" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 11v4M9 13h4" stroke="#7b2cbf" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const QuoteMark = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" aria-hidden>
    <text x="5" y="90" fontFamily="Georgia, serif" fontSize="120" fill="#7b2cbf" opacity="0.12">"</text>
  </svg>
);

// ── Review card ───────────────────────────────────────────────────────────────
const ReviewCard = ({ review }) => (
  <div className="flex flex-col justify-between h-full min-h-[210px] bg-white rounded-[16px] border border-[#e9dff5] p-[30px] gap-6 shadow-[0px_2px_10px_rgba(43,15,67,0.04)]">
    <div className="flex flex-col gap-5">
      <StarRating value={review.rating} showValue={false} size="medium" readOnly />
      <p className="font-raleway text-[16px] font-normal leading-[22px] text-[#2d2d2d] line-clamp-3">
        {review.text}
      </p>
    </div>
    <div className="flex items-center gap-3">
      <div className="w-[60px] h-[60px] shrink-0 rounded-full overflow-hidden bg-secondary-light-default">
        {review.avatar
          ? <img src={review.avatar} alt={review.reviewer} className="w-full h-full object-cover" />
          : <span className="w-full h-full flex items-center justify-center font-raleway font-bold text-secondary-normal-default text-lg">{review.reviewer[0]}</span>
        }
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-raleway text-[16px] font-semibold leading-[18.8px] text-[#2d2d2d]">
          {review.reviewer}
        </span>
        <span className="font-raleway text-[13px] font-medium leading-[15px] text-[#949494]">
          {review.date}
        </span>
      </div>
    </div>
  </div>
);

// ── Skeleton card — same dimensions as ReviewCard ─────────────────────────────
const SkeletonReviewCard = () => (
  <div className="min-h-[210px] rounded-[16px] bg-[#e5e7eb] animate-pulse" />
);

// ── Main component ────────────────────────────────────────────────────────────
const PartnerReviewsSection = ({ reviews, status, onAddReview }) => {
  const [page, setPage]     = useState(0);
  const [fading, setFading] = useState(false);

  const isLoading  = status === "idle" || status === "loading";
  const allReviews = reviews ?? [];
  const totalPages = Math.ceil(allReviews.length / REVIEWS_PER_PAGE);
  const visible    = allReviews.slice(page * REVIEWS_PER_PAGE, (page + 1) * REVIEWS_PER_PAGE);

  const navigate = (dir) => {
    const next = page + dir;
    if (fading || next < 0 || next >= totalPages) return;
    setFading(true);
    setTimeout(() => {
      setPage(next);
      setFading(false);
    }, 220);
  };

  return (
    <section aria-labelledby="reviews-heading" className="w-full bg-[#fdfbff] py-[140px]">
      <div className="mx-auto max-w-[1728px] px-4 sm:px-10 lg:px-[160px]">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-[48px]">

          {/* ── Left sidebar ── */}
          <div className="flex flex-col justify-between lg:w-[409px] shrink-0 lg:self-stretch gap-10">
            <div className="flex flex-col gap-7">
              <QuoteMark />
              <h2
                id="reviews-heading"
                className="font-raleway text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.4] text-[#2d2d2d] max-w-[409px]"
              >
                Hear from travelers who've experienced our service
              </h2>

              {/* Prev / Next arrows — only shown when there are reviews */}
              {allReviews.length > 0 && (
                <div className="flex gap-[18px]">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    disabled={page === 0 || fading}
                    aria-label="Previous reviews"
                    className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#949494] text-[#949494] transition hover:border-[#7b2cbf] hover:text-[#7b2cbf] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ArrowIcon />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(1)}
                    disabled={page >= totalPages - 1 || fading}
                    aria-label="Next reviews"
                    className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#949494] text-[#949494] transition hover:border-[#7b2cbf] hover:text-[#7b2cbf] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer rotate-180"
                  >
                    <ArrowIcon />
                  </button>
                </div>
              )}
            </div>

            {/* Add review button */}
            <button
              type="button"
              onClick={onAddReview}
              className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#7b2cbf] bg-white px-3 py-3.5 font-raleway text-[16px] font-medium text-[#7b2cbf] transition hover:bg-[#f7f0ff] cursor-pointer"
            >
              <StarPlusIcon />
              Add Your Review
            </button>
          </div>

          {/* ── Reviews grid ── */}
          {isLoading ? (
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-10">
              {[0, 1, 2, 3].map((i) => <SkeletonReviewCard key={i} />)}
            </div>
          ) : allReviews.length === 0 ? (
            <div className="flex-1 flex items-center justify-center py-10">
              <p className="font-raleway text-[16px] text-[#949494]">
                No reviews yet — be the first to share your experience.
              </p>
            </div>
          ) : (
            <div
              className={`flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-10 transition-opacity duration-[220ms] ${fading ? "opacity-0" : "opacity-100"}`}
            >
              {visible.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default PartnerReviewsSection;
