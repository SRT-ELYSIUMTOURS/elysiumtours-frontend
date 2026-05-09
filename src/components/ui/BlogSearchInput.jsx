import React from "react";
import { classNames } from "../../utils/classNames";
import SearchIconButton from "./SearchIconButton";

const BlogSearchInput = React.forwardRef(({
  placeholder = "Search for Blogs/Articles",
  value,
  onChange,
  onSearch,
  className = "",
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={classNames(
        "relative border border-solid border-primary-normal-active rounded-md overflow-hidden",
        "h-[48px] w-full lg:w-[379px]",
        className
      )}
      {...props}
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-full pl-[20px] pr-[50px] bg-transparent font-raleway font-medium text-med-small-Medium text-primary-dark-active placeholder:text-[#BEBEBE] outline-none"
      />
      <div className="absolute right-[8px] top-1/2 -translate-y-1/2">
        <SearchIconButton size={37} onClick={onSearch} />
      </div>
    </div>
  );
});

BlogSearchInput.displayName = "BlogSearchInput";
export default BlogSearchInput;
