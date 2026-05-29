import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/classNames";
import HighlightCard from "../../cards/HighlightCard";
import Button from "../../ui/button";
import ExploreMoreArrowIcon from "../../icons/ExploreMoreArrowIcon";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  fetchPartnersThunk,
  selectPartnerList,
  selectPartnerStatus,
} from "../../../store/slices/partnersSlice";
import { normalizeForCategorySection } from "../../../api/partners.api";

// Curated homepage highlights — label shown on card, key matches Redux/API category,
// slug is the /tour-partners/:category route, fallback used while loading or when empty.
const HIGHLIGHTS = [
  {
    label: "Accommodation",
    key: "accommodation",
    slug: "accommodation",
    fallback: "/homeAssets/Image-11.webp",
  },
  {
    label: "Transportation",
    key: "transportation",
    slug: "transportation",
    fallback: "/homeAssets/Image-12.webp",
  },
  {
    label: "Dining",
    key: "restaurants",
    slug: "restaurants",
    fallback: "/homeAssets/Image-13.webp",
  },
];

function SkeletonCard({ className }) {
  return (
    <div className={classNames("rounded-[40px] bg-[#e5e7eb] animate-pulse", className)} />
  );
}

const PartnerHighlightsSection = React.forwardRef(
  ({ className, ...props }, ref) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const accomList   = useAppSelector(selectPartnerList("accommodation"));
    const accomStatus = useAppSelector(selectPartnerStatus("accommodation"));
    const transList   = useAppSelector(selectPartnerList("transportation"));
    const transStatus = useAppSelector(selectPartnerStatus("transportation"));
    const diningList  = useAppSelector(selectPartnerList("restaurants"));
    const diningStatus = useAppSelector(selectPartnerStatus("restaurants"));

    useEffect(() => {
      dispatch(fetchPartnersThunk({ category: "accommodation", params: { pageSize: 8 } }));
      dispatch(fetchPartnersThunk({ category: "transportation", params: { pageSize: 8 } }));
      dispatch(fetchPartnersThunk({ category: "restaurants",   params: { pageSize: 8 } }));
    }, [dispatch]);

    const listMap   = { accommodation: accomList,  transportation: transList,  restaurants: diningList };
    const statusMap = { accommodation: accomStatus, transportation: transStatus, restaurants: diningStatus };

    const getImage = ({ key, fallback }) => {
      const list = listMap[key];
      if (statusMap[key] === "succeeded" && list.length > 0) {
        return normalizeForCategorySection(list[0], key).image || fallback;
      }
      return fallback;
    };

    const cardClass = "h-[260px] md:h-[500px] w-full lg:h-[656px]";

    return (
      <section
        ref={ref}
        className={classNames("bg-[#F2EAF9] py-16 md:py-20 lg:py-24", className)}
        {...props}
      >
        <div className="max-w-[1728px] mx-auto px-6 md:px-[30px] lg:px-[164px]">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-6 lg:gap-8 mb-8 lg:mb-16">
            <div className="flex items-center justify-start w-full lg:w-auto gap-sm shrink-0">
              <div className="w-[46px] h-[2px] bg-secondary-dark-darker" />
              <span className="font-raleway font-bold text-med-small-bold text-secondary-dark-darker uppercase tracking-wide">
                Partner Highlight
              </span>
            </div>

            <div className="flex flex-col items-center lg:items-end gap-4 max-w-[677px]">
              <h2 className="font-raleway font-bold text-[22px] leading-[30px] lg:text-High-md-bold lg:leading-[34px] text-tertiary-normal-default text-center lg:text-right">
                Trusted Partners, Unforgettable Journeys
              </h2>
              <p className=" lg:pl-[111px] leading-[22px] lg:text-md-regular lg:leading-[26px] text-primary-dark-active text-right">
                Team up with our trusted tour partners for smooth, stress-free
                adventures. With expert guides, strong local connections, and
                authentic experiences, every trip becomes more seamless,
                enriching, and fun — the perfect blend of comfort and discovery.
              </p>
              <Button
                endIcon={<ExploreMoreArrowIcon />}
                variant="secondaryOutline"
                size="small"
                shape="pill"
                onClick={() => navigate("/tour-partners")}
              >
                Explore More
              </Button>
            </div>
          </div>

          {/* Cards — skeleton while loading, real image from first partner once ready */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-[32px]">
            {HIGHLIGHTS.map((cat) => {
              const loading = statusMap[cat.key] === "idle" || statusMap[cat.key] === "loading";
              return loading ? (
                <SkeletonCard key={cat.key} className={cardClass} />
              ) : (
                <HighlightCard
                  key={cat.key}
                  image={getImage(cat)}
                  category={cat.label}
                  className={cardClass}
                  onClick={() => navigate(`/tour-partners/${cat.slug}`)}
                />
              );
            })}
          </div>
        </div>
      </section>
    );
  }
);

PartnerHighlightsSection.displayName = "PartnerHighlightsSection";
export default PartnerHighlightsSection;
