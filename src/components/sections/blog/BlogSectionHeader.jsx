import React from "react";
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
  const defaultIcon = (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5.25 3.5L8.75 7L5.25 10.5" stroke="#7b2cbf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div
      ref={ref}
      className={classNames(
        "flex items-start justify-between w-full",
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
      <div className="flex flex-col gap-md items-end w-[597px]">
        <h2 className="font-raleway font-bold text-[25px] leading-[34px] text-tertiary-normal-default text-right">
          {title}
        </h2>
        {description && (
          <p className="font-raleway font-normal text-[16px] leading-[24px] text-tertiary-normal-default text-right w-[565px]">
            {description}
          </p>
        )}
        {buttonText && (
          <Button
            variant="secondaryOutline"
            shape="pill"
            size="small"
            className="h-[32px] gap-[9px] rounded-xl border-[0.8px]"
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
