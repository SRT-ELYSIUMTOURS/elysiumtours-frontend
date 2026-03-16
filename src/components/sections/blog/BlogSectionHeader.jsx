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
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
  <path d="M2.33301 6.24968C1.91879 6.24968 1.58301 6.58546 1.58301 6.99968C1.58301 7.41389 1.91879 7.74968 2.33301 7.74968L2.33301 6.99968L2.33301 6.24968ZM11.6663 7.74967C12.0806 7.74967 12.4163 7.41389 12.4163 6.99967C12.4163 6.58546 12.0806 6.24967 11.6663 6.24967V6.99967V7.74967ZM9.86097 3.55032C9.56677 3.25873 9.0919 3.26085 8.80032 3.55505C8.50873 3.84925 8.51085 4.32412 8.80505 4.6157L9.33301 4.08301L9.86097 3.55032ZM10.3614 5.10227L9.83345 5.63496V5.63496L10.3614 5.10227ZM10.3614 8.89708L10.8894 9.42977V9.42977L10.3614 8.89708ZM8.80505 9.38365C8.51085 9.67523 8.50873 10.1501 8.80032 10.4443C9.0919 10.7385 9.56677 10.7406 9.86097 10.449L9.33301 9.91634L8.80505 9.38365ZM11.6547 6.8169L12.3987 6.72207L12.3987 6.72207L11.6547 6.8169ZM11.6547 7.18245L12.3987 7.27728V7.27728L11.6547 7.18245ZM2.33301 6.99968L2.33301 7.74968L11.6663 7.74967V6.99967V6.24967L2.33301 6.24968L2.33301 6.99968ZM9.33301 4.08301L8.80505 4.6157L9.83345 5.63496L10.3614 5.10227L10.8894 4.56958L9.86097 3.55032L9.33301 4.08301ZM10.3614 8.89708L9.83345 8.36439L8.80505 9.38365L9.33301 9.91634L9.86097 10.449L10.8894 9.42977L10.3614 8.89708ZM10.3614 5.10227L9.83345 5.63496C10.256 6.0538 10.5272 6.32411 10.7072 6.54826C10.8777 6.76058 10.9039 6.85756 10.9108 6.91173L11.6547 6.8169L12.3987 6.72207C12.3425 6.28087 12.1321 5.92696 11.8767 5.60902C11.6309 5.3029 11.2869 4.96359 10.8894 4.56958L10.3614 5.10227ZM10.3614 8.89708L10.8894 9.42977C11.2869 9.03576 11.6309 8.69645 11.8767 8.39033C12.1321 8.07239 12.3425 7.71848 12.3987 7.27728L11.6547 7.18245L10.9108 7.08762C10.9039 7.14179 10.8777 7.23877 10.7072 7.45109C10.5272 7.67524 10.256 7.94555 9.83345 8.36439L10.3614 8.89708ZM11.6547 6.8169L10.9108 6.91173C10.9182 6.97013 10.9182 7.02922 10.9108 7.08762L11.6547 7.18245L12.3987 7.27728C12.4222 7.09295 12.4222 6.9064 12.3987 6.72207L11.6547 6.8169Z" fill="#7B2CBF"/>
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
      <div className="flex flex-col gap-md items-end w-[630px]">
        <h2 className="font-raleway font-bold text-[25px] leading-[34px] text-tertiary-normal-default text-right">
          {title}
        </h2>
        {description && (
          <p className="font-raleway font-normal w-[565px] text-[16px] leading-[24px] text-tertiary-normal-default text-right w-[565px]">
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
