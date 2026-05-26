import React from "react";

// ── Sub-components ────────────────────────────────────────────────────────────

const StarIcon = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d="M8 1.5L9.854 5.256L14 5.84L11 8.764L11.708 12.894L8 10.944L4.292 12.894L5 8.764L2 5.84L6.146 5.256L8 1.5Z"
      fill={filled ? "#7b2cbf" : "none"}
      stroke="#7b2cbf"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = () => (
  <span className="flex-shrink-0 w-3.5 h-3.5 rounded-full bg-secondary-light-active flex items-center justify-center">
    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden>
      <path d="M1 3L3 5L7 1" stroke="#7b2cbf" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

const ChevronRightIcon = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
    <path d="M4 2L7.5 5.5L4 9" stroke="#7b2cbf" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ImageSkeleton = () => (
  <div className="w-full lg:w-[741px] h-[420px] lg:h-[750px] rounded-[40px] bg-secondary-light-default animate-pulse" />
);

const InfoSkeleton = () => (
  <div className="flex-1 flex flex-col gap-6 py-5 animate-pulse">
    {[80, 60, 100, 120, 80].map((w, i) => (
      <div key={i} className="h-4 rounded-full bg-secondary-light-default" style={{ width: `${w}%` }} />
    ))}
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────

const PartnerDetailHero = ({ category, partner, loading, onViewAllFeatures }) => {
  if (loading) {
    return (
      <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-[76px]">
        <ImageSkeleton />
        <InfoSkeleton />
      </div>
    );
  }

  if (!partner) return null;

  const filledStars = Math.round(partner.rating);
  const visibleFeatures = partner.features.slice(0, 5);
  const thumbnails = partner.images.filter((img) => img !== partner.image).slice(0, 2);

  return (
    <section
      aria-label={`${partner.name} details`}
      className="flex flex-col lg:flex-row items-start gap-10 lg:gap-[76px]"
    >
      {/* ── Left: image panel ──────────────────────────────────────────────── */}
      <div className="relative w-full lg:w-[741px] h-[420px] lg:h-[750px] rounded-[40px] overflow-hidden flex-shrink-0">
        {/* Cover image */}
        {partner.image ? (
          <img
            src={partner.image}
            alt={partner.name}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 bg-secondary-light-default" />
        )}

        {/* Uniform dark overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Bottom row: glass card + thumbnails */}
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
          {/* Frosted glass card — name + rating */}
          <div className="relative rounded-[20px] overflow-hidden py-5 px-6 bg-white/10 backdrop-blur-[20px] max-w-[380px] w-full">
            <h2 className="font-raleway font-bold text-white text-xl leading-[31px] mb-1">
              {partner.name}
            </h2>
            <div
              className="flex items-center gap-1.5"
              aria-label={`Rating ${partner.rating} out of 5 from ${partner.reviewCount} reviews`}
            >
              <StarIcon filled />
              <span className="font-raleway font-medium text-white text-[17px] leading-[22px]">
                {partner.rating}&nbsp;&nbsp;( {partner.reviewCount} reviews )
              </span>
            </div>
          </div>

          {/* Thumbnail strip */}
          {thumbnails.length > 0 && (
            <div className="flex flex-col gap-2 flex-shrink-0">
              {thumbnails.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className="w-[60px] h-[60px] rounded-xl object-cover object-center"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Right: info panel ──────────────────────────────────────────────── */}
      <div className="flex flex-col w-full lg:w-[591px] gap-[30px] py-5">

        {/* Stars + price */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-1" role="img" aria-label={`${filledStars} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((i) => (
              <StarIcon key={i} filled={i <= filledStars} />
            ))}
          </div>

          {partner.price && (
            <div className="flex items-center gap-4">
              <span className="font-raleway font-medium text-[20px] text-tertiary-normal-default leading-[28px]">
                From
              </span>
              <span className="font-raleway font-bold text-[25px] text-secondary-dark-default leading-[32px]">
                {partner.price}
              </span>
            </div>
          )}
        </div>

        {/* About */}
        {partner.about && (
          <section aria-labelledby="about-heading">
            <h3 id="about-heading" className="font-raleway font-bold text-[20px] text-tertiary-normal-default leading-[28px] mb-4">
              About
            </h3>
            <p className="font-raleway font-normal text-base text-tertiary-normal-default leading-[22px]">
              {partner.about}
            </p>
          </section>
        )}

        {/* Features */}
        {partner.features.length > 0 && (
          <section aria-labelledby="features-heading">
            <h3 id="features-heading" className="font-raleway font-bold text-[20px] text-tertiary-normal-default leading-[28px] mb-4">
              Features
            </h3>
            <ul className="grid grid-cols-2 gap-4 mb-4">
              {visibleFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5">
                  <CheckIcon />
                  <span className="font-raleway font-normal text-base text-tertiary-normal-default leading-[22px]">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={onViewAllFeatures}
              className="inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span className="font-raleway font-medium text-sm text-secondary-normal-default leading-[18px]">
                View All features
              </span>
              <ChevronRightIcon />
            </button>
          </section>
        )}

        {/* Operating Hours */}
        {partner.operatingHours.length > 0 && (
          <section aria-labelledby="hours-heading">
            <h3 id="hours-heading" className="font-raleway font-bold text-[20px] text-tertiary-normal-default leading-[28px] mb-4">
              Operating Hours
            </h3>
            <ul className="flex flex-col gap-4">
              {partner.operatingHours.map((item) => (
                <li key={item.day} className="flex items-start justify-between">
                  <span className="font-raleway font-normal text-base text-tertiary-normal-default leading-[22px]">
                    {item.day}
                  </span>
                  <span className="font-raleway font-medium text-base text-secondary-normal-default leading-[22px]">
                    {item.time}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Tags */}
        {partner.tags.length > 0 && (
          <section aria-labelledby="tags-heading">
            <h3 id="tags-heading" className="font-raleway font-bold text-[20px] text-tertiary-normal-default leading-[28px] mb-4">
              Tags
            </h3>
            <ul className="flex flex-wrap gap-[18px]">
              {partner.tags.map((tag) => (
                <li
                  key={tag}
                  className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-secondary-normal-default"
                >
                  <span className="font-raleway font-medium text-sm text-secondary-normal-default leading-[22px]">
                    {tag}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </section>
  );
};

export default PartnerDetailHero;
