import React from "react";
import ExploreMoreArrowIcon from "../../icons/ExploreMoreArrowIcon";
import { classNames } from "../../../utils/classNames";
import Button from "../../ui/button";

const BlogSectionHeader = React.forwardRef(({
  label,
  title,
  description,
  buttonText = "Explore More",
  onButtonClick,
  buttonIcon,
  className = "",
  ...props
}, ref) => {
  const defaultIcon = <ExploreMoreArrowIcon />;

  return (
    <div
      ref={ref}
      className={classNames(
        "flex flex-col lg:flex-row items-start lg:justify-between w-full gap-4 lg:gap-0",
        className
      )}
      {...props}
    >
      {/* Left — line + label */}
      <div className="flex items-center gap-[8px] shrink-0">
        <div className="w-[46px] h-[1px] bg-secondary-dark-darker" />
        <span className="font-raleway font-bold text-[13px] leading-[18px] text-secondary-dark-darker whitespace-nowrap tracking-[0.05em]">
          {label}
        </span>
      </div>

      {/* Right — title + description + button */}
      <div className="flex flex-col gap-md items-start lg:items-end w-full lg:w-[630px]">
        <h2 className="font-raleway font-bold text-[20px] md:text-[25px] leading-[34px] text-tertiary-normal-default text-left lg:text-right">
          {title}
        </h2>
        {description && (
          <p className="font-raleway font-normal text-[14px] md:text-[16px] leading-[24px] text-tertiary-normal-default text-left lg:text-right w-full lg:w-[565px]">
            {description}
          </p>
        )}
        {buttonText && (
          <Button
            variant="secondaryOutline"
            shape="pill"
            size="small"
            className="h-[32px]  rounded-xl border-[0.8px]"
            onClick={onButtonClick}
            endIcon={buttonIcon || defaultIcon}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
});

BlogSectionHeader.displayName = "BlogSectionHeader";
export default BlogSectionHeader;
