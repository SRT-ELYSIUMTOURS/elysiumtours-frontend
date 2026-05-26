import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { fetchPartnersThunk } from "../../../store/slices/partnersSlice";
import { normalizeForListingGrid } from "../../../api/partners.api";
import HighlightCard from "../../cards/HighlightCard";
import GuideSpotlightCard from "../../cards/GuideSpotlightCard";
import { PartnerListingMeta } from "../../cards/PartnerListingCard";

const ALL_CATS = [
  "tour-sites",
  "accommodation",
  "transportation",
  "guides",
  "restaurants",
  "photographers",
  "insurance",
];

const PartnerRelatedSection = ({ category, currentId }) => {
  const dispatch = useAppDispatch();

  // Pull every category's list + status in one selector
  const catData = useAppSelector((state) =>
    ALL_CATS.reduce((acc, cat) => {
      acc[cat] = {
        list:   state.partners[cat]?.list   ?? [],
        status: state.partners[cat]?.status ?? "idle",
      };
      return acc;
    }, {})
  );

  // Fetch any category whose list hasn't been requested yet
  useEffect(() => {
    ALL_CATS.forEach((cat) => {
      if (catData[cat].status === "idle") {
        dispatch(fetchPartnersThunk({ category: cat }));
      }
    });
  }, [dispatch]); // intentional: only on mount

  // Build picks: one from each OTHER category first for variety,
  // then fill remaining slots from the same category (excluding current partner)
  const picks = [];

  for (const cat of ALL_CATS) {
    if (picks.length >= 4) break;
    if (cat === category) continue;
    const first = catData[cat].list[0];
    if (first) picks.push({ raw: first, cat });
  }

  if (picks.length < 4) {
    const sameCatOthers = (catData[category]?.list ?? []).filter(
      (p) => p._id !== currentId
    );
    for (const p of sameCatOthers) {
      if (picks.length >= 4) break;
      picks.push({ raw: p, cat: category });
    }
  }

  const related = picks.map(({ raw, cat }) => ({
    ...normalizeForListingGrid(raw, cat),
    _category: cat,
  }));

  if (related.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="w-full bg-secondary-light-default py-[85px]">
      <div className="mx-auto max-w-[1728px] px-4 sm:px-10 lg:px-[156px]">

        {/* Header row */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between mb-[60px]">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-[46px] h-0.5 bg-secondary-dark-darker shrink-0" aria-hidden />
            <span className="font-raleway font-bold text-[13px] text-secondary-dark-darker leading-[18px] tracking-wide uppercase whitespace-nowrap">
              EXPLORE MORE SERVICES
            </span>
          </div>
          <p className="font-raleway font-normal text-[16px] text-tertiary-normal-default leading-6 md:text-right md:max-w-[440px]">
            Discover other trusted partners to complete your journey
          </p>
        </div>

        {/* Cards — same layout as the listing grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-[24px] gap-y-8">
          {related.map((partner) => (
            <Link
              key={`${partner._category}-${partner.id}`}
              to={`/tour-partners/${partner._category}/${partner.id}`}
              className="flex flex-col gap-[22px] group"
            >
              {partner._category === "guides" ? (
                <GuideSpotlightCard
                  image={partner.image}
                  title={partner.partnerName}
                  alt={partner.partnerName}
                  className="w-full h-[568px]"
                />
              ) : (
                <HighlightCard
                  image={partner.image}
                  category={partner.partnerName}
                  className="w-full h-[568px]"
                />
              )}
              <PartnerListingMeta
                location={partner.location}
                rating={partner.rating}
                title={partner.title}
                availability={partner.availability}
                price={partner.price}
                specialties={partner.specialties}
                language={partner.language}
                variant={partner._category === "guides" || partner.variant === "guide" ? "guide" : "default"}
              />
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PartnerRelatedSection;
