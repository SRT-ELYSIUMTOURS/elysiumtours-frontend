import React from "react";
import { classNames } from "../../../utils/classNames";
import { Breadcrumb, BreadcrumbItem } from "../../ui/breadcrumb";

const BlogBreadcrumbBar = React.forwardRef(({
  items = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
  ],
  className = "",
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={classNames(
        "w-full h-[53px] bg-secondary-light-hover",
        className
      )}
      style={{ boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.25)" }}
      {...props}
    >
      {/* On mobile, only the last 2 breadcrumb items are shown (the parent
          and the current page) so long titles like "Kumasi Heritage & Market
          Discovery" are fully visible without truncation, scrolling, or
          awkward multi-line wrapping. The full path is shown on lg+. */}
      <div className="h-full flex items-center px-6 md:px-[30px] lg:px-[156px]">
        {/* Mobile: show only the last 2 items (e.g. "Ghana > Tour Title") */}
        <div className="lg:hidden">
          <Breadcrumb>
            {items.slice(-2).map((item, index) => (
              <BreadcrumbItem
                key={index}
                href={item.href}
                className="font-raleway font-medium text-[13px] leading-[22px]"
              >
                {item.label}
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
        </div>
        {/* Desktop: full breadcrumb path */}
        <div className="hidden lg:block">
          <Breadcrumb>
            {items.map((item, index) => (
              <BreadcrumbItem
                key={index}
                href={item.href}
                className="font-raleway font-medium text-[13px] leading-[22px]"
              >
                {item.label}
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
        </div>
      </div>
    </div>
  );
});

BlogBreadcrumbBar.displayName = "BlogBreadcrumbBar";
export default BlogBreadcrumbBar;
