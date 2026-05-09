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
    <div className={classNames("flex w-full items-start justify-between", className)}>
      <div className="flex items-center gap-[8px] pt-[10px]">
        <div className="h-[1px] w-[46px] shrink-0 bg-secondary-dark-darker" />
        <span className="font-raleway font-bold text-[13px] leading-[18px] text-secondary-dark-darker uppercase tracking-[0.05em]">
          {eyebrow}
        </span>
      </div>

      <div className="flex w-[597px] max-w-full shrink-0 flex-col items-end gap-[16px]">
        <div className="flex w-full flex-wrap items-center justify-end gap-[12px]">
          
          <h2 className="max-w-[433px] text-right font-raleway font-bold text-[25px] leading-[34px] text-tertiary-normal-default">
            {title}
          </h2>
        </div>
        <p className="w-[565px] max-w-full text-right font-raleway font-normal text-[16px] leading-[24px] text-tertiary-normal-default">
          {description}
        </p>
        {exploreControl}
      </div>
    </div>
  );
};

export default PartnerSectionHeader;
