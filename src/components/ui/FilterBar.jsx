import React, { useState } from "react";
import { classNames } from "../../utils/classNames";

// From Figma: COMPONENT_SET "Filters" (256:1844) — r:20, HORIZONTAL gap:10, pad:10
// Variants:
//   Default:  stroke:#b9b9b9, text [13px/500] #949494   — inactive pill
//   Variant2: fill:#6f28ac stroke:#fefefe, text [13px/600] #eaeaea — active (hover)
//   Variant3: fill:#622399 stroke:#b9b9b9, text [13px/600] #fefefe — active (pressed)

// Individual pill — matches Figma FilterOption pattern
const FilterPill = React.forwardRef(({
  children,
  value,
  isActive = false,
  onSelect,
  disabled = false,
  className = "",
  ...props
}, ref) => {

  const base = "inline-flex items-center justify-center rounded-[var(--radius-md)] px-[10px] py-[10px] border border-solid transition-all duration-300 ease-in cursor-pointer";

  const variants = {
    default: "border-primary-dark-default text-primary-dark-hover bg-transparent hover:bg-secondary-light-default hover:border-secondary-normal-default",
    active:  "bg-secondary-normal-hover border-primary-light-default text-tertiary-light-default",
  };

  const disabledStyle = "opacity-50 cursor-not-allowed";

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      onClick={() => !disabled && onSelect?.(value)}
      className={classNames(
        base,
        isActive ? variants.active : variants.default,
        disabled ? disabledStyle : "",
        className
      )}
      {...props}
    >
      <span style={{ fontSize: "13px", fontWeight: isActive ? 600 : 500, lineHeight: "18px", whiteSpace: "nowrap" }}>
        {children}
      </span>
    </button>
  );
});

FilterPill.displayName = "FilterPill";

// FilterBar — manages active state across pills
// Used on: Blog, Contact, Tour Partners, Gallery pages
const FilterBar = React.forwardRef(({
  options = [],             // [{ value, label }]
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  className = "",
  ...props
}, ref) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled   = controlledValue !== undefined;
  const currentValue   = isControlled ? controlledValue : internalValue;

  const handleSelect = (val) => {
    if (!isControlled) setInternalValue(val);
    onValueChange?.(val);
  };

  return (
    <div
      ref={ref}
      className={classNames("inline-flex items-center flex-wrap gap-[16px]", className)}
      {...props}
    >
      {options.map((opt) => (
        <FilterPill
          key={opt.value}
          value={opt.value}
          isActive={currentValue === opt.value}
          onSelect={handleSelect}
        >
          {opt.label}
        </FilterPill>
      ))}
    </div>
  );
});

FilterBar.displayName = "FilterBar";

export { FilterPill, FilterBar };
export default FilterBar;
