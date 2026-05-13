import { Link } from "react-router-dom";
import ExploreMoreArrowIcon from "../../icons/ExploreMoreArrowIcon";
import { classNames } from "../../../utils/classNames";

// Shared header for Tour Partners blocks: LEFT eyebrow (rule + label) | RIGHT title + description + Explore More
// Matches PartnerCategorySection layout and typography; optional `badge` renders before the title (e.g. story count).

const exploreMoreClassName = classNames(
  "flex items-center gap-[9px] h-[32px] px-[10px]",
  "border-[0.8px] border-solid border-secondary-normal-default",
  "rounded-[40px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)]",
  "font-raleway font-semibold text-[13px] leading-[18px] text-secondary-normal-default",
  "hover:bg-secondary-light-default transition-all duration-300 ease-in cursor-pointer bg-transparent"
);

const PartnerSectionHeader = ({
  eyebrow,
  title,
  description,
  exploreTo = null,
  onExploreClick = null,
  className = "",
}) => {
  const exploreControl =
    exploreTo != null ? (
      <Link to={exploreTo} className={exploreMoreClassName}>
        Explore More
        <ExploreMoreArrowIcon />
      </Link>
    ) : (
      <button type="button" onClick={onExploreClick} className={exploreMoreClassName}>
        Explore More
        <ExploreMoreArrowIcon />
      </button>
    );

  return (
    <div className={classNames("flex flex-col lg:flex-row w-full items-center lg:items-start justify-between gap-4 lg:gap-0", className)}>
      <div className="flex items-center gap-[8px] pt-[10px]">
        <div className="h-[1px] w-[46px] shrink-0 bg-secondary-dark-darker" />
        <span className="font-raleway font-bold text-[13px] leading-[18px] text-secondary-dark-darker uppercase tracking-[0.05em]">
          {eyebrow}
        </span>
      </div>

      <div className="flex w-full lg:w-[597px] lg:max-w-full lg:shrink-0 flex-col items-center lg:items-end gap-[16px]">
        <div className="flex w-full flex-wrap items-center justify-center lg:justify-end gap-[12px]">
          <h2 className="w-full lg:max-w-[433px] text-center lg:text-right font-raleway font-bold text-[22px] leading-[30px] lg:text-[25px] lg:leading-[34px] text-tertiary-normal-default">
            {title}
          </h2>
        </div>
        <p className="w-full lg:w-[565px] lg:max-w-full text-center lg:text-right font-raleway font-normal text-[14px] leading-[22px] lg:text-[16px] lg:leading-[24px] text-tertiary-normal-default">
          {description}
        </p>
        {exploreControl}
      </div>
    </div>
  );
};

export default PartnerSectionHeader;
