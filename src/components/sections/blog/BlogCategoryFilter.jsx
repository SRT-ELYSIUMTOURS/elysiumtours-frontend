import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/classNames";
import BlogSearchInput from "../../ui/BlogSearchInput";

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "travel-guides", label: "Travel Guides& Tips" },
  { value: "destination-highlights", label: "Destination Highlights" },
  { value: "local-guides", label: "Behind the scene" },
  { value: "travel-stories", label: "Travel Stories" },
  { value: "partner-spotlight", label: "Partner Spotlight" },
  { value: "festival-calendar", label: "Festival Calendar" },
];

const BlogCategoryFilter = React.forwardRef(({
  activeCategory = "all",
  onCategoryChange,
  onSearch,
  className = "",
  ...props
}, ref) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(activeCategory);
  const [searchValue, setSearchValue] = useState("");

  const handleSelect = (value) => {
    setSelected(value);
    onCategoryChange?.(value);
    if (value === "all") {
      navigate("/blog");
    } else {
      navigate(`/blog/${value}`);
    }
  };

  return (
    <div
      ref={ref}
      className={classNames(
        "w-full bg-primary-light-default",
        className
      )}
      {...props}
    >
      <div className="h-[80px] mx-[156px] flex items-center border-t-[0.5px] border-b-[0.5px] border-solid border-secondary-light-default">
        <div className="flex items-center gap-[109px] ml-[20px]">
          {/* Category pills */}
          <div className="flex items-center gap-md">
            {CATEGORIES.map((cat) => {
              const isActive = selected === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => handleSelect(cat.value)}
                  className={classNames(
                    "flex items-center justify-center px-x-sm py-y-sm rounded-xl transition-all duration-300 ease-in whitespace-nowrap",
                    isActive
                      ? "bg-secondary-normal-active text-primary-light-default shadow-lg font-raleway font-semibold text-[13px] leading-[18px]"
                      : "border border-solid border-primary-dark-default text-primary-dark-hover shadow-lg font-raleway font-medium text-[13px] leading-[22px] hover:bg-secondary-normal-hover hover:border-secondary-normal-hover hover:text-primary-light-default"
                  )}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search input */}
          <BlogSearchInput
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={() => onSearch?.(searchValue)}
          />
        </div>
      </div>
    </div>
  );
});

BlogCategoryFilter.displayName = "BlogCategoryFilter";
export default BlogCategoryFilter;
