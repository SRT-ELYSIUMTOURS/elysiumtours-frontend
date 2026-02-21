import React from "react";
import { classNames } from "../../utils/classNames";

// From Figma: COMPONENT_SET "Search Icon" (256:1811) — 37×37 circle
// Variants: Default #7b2cbf, hover #6f28ac, active #622399, disabled #d6beeb
// Contains: Ellipse 37×37 fill + Hicon/Linear/Search 1 (16×16, stroke:#ebdff5) centred

const SearchIconButton = React.forwardRef(({
  variant = "default",
  disabled = false,
  onClick,
  className = "",
  size = 37,
  ...props
}, ref) => {

  const variants = {
    default:  "bg-secondary-normal-default hover:bg-secondary-normal-hover active:bg-secondary-normal-active",
    disabled: "bg-secondary-light-active cursor-not-allowed",
  };

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={classNames(
        "rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ease-in",
        disabled ? variants.disabled : variants.default,
        className
      )}
      style={{ width: size, height: size }}
      aria-label="Search"
      {...props}
    >
      {/* Hicon / Linear / Search 1 — 16×16, stroke:#ebdff5 */}
      <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
        <circle cx="10" cy="10" r="7" stroke="#ebdff5" strokeWidth="1.8"/>
        <path d="M15.5 15.5L20 20" stroke="#ebdff5" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    </button>
  );
});

SearchIconButton.displayName = "SearchIconButton";
export default SearchIconButton;
