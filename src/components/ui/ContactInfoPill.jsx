import React from "react";
import { classNames } from "../../utils/classNames";

// From Figma: Contact page Frame 184 > Frame 7 > Frame 185
// Three info pills: email, phone, address
// Structure: GROUP (rect r:10 stroke:#d6beeb + icon + text [16px/500] #2d2d2d)
// Sizes: 249×57, 204×57, 313×57

const ContactInfoPill = React.forwardRef(({
  icon,
  text,
  href,
  target,
  className = "",
  ...props
}, ref) => {

  const content = (
    <div
      ref={ref}
      className={classNames(
        "inline-flex items-center gap-[12px] px-4 py-3",
        "rounded-[10px] border border-solid border-secondary-light-active",
        "bg-transparent transition-all duration-300 ease-in",
        href ? "hover:border-secondary-normal-default hover:bg-secondary-light-default cursor-pointer" : "",
        className
      )}
      {...props}
    >
      {/* Icon */}
      {icon && (
        <span className="shrink-0 text-secondary-normal-default">
          {icon}
        </span>
      )}
      {/* Text — [16px/500] #2d2d2d */}
      <span style={{
        fontSize: "16px",
        fontWeight: 500,
        color: "#2d2d2d",
        lineHeight: "22px",
        fontFamily: "Raleway, sans-serif",
        whiteSpace: "nowrap",
      }}>
        {text}
      </span>
    </div>
  );

  if (href) {
    return <a href={href} target={target} className="inline-flex">{content}</a>;
  }

  return content;
});

ContactInfoPill.displayName = "ContactInfoPill";
export default ContactInfoPill;
