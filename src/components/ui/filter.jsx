import React, { useState } from "react";
import { classNames } from '../../utils/classNames';

// Root Filter component that manages state
const Filter = React.forwardRef(({ 
  children, 
  defaultValue,
  variant="medium",
  value: controlledValue,
  onValueChange,
  className,
  ...props 
}, ref) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;
  
  const handleValueChange = (newValue) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };
  const variantGap = {
    medium: "gap-md"
  }
  return (
    <div
      ref={ref}
      className={classNames("inline-flex items-center", variantGap[variant], className)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            isActive: child.props.value === currentValue,
            onSelect: handleValueChange,
          });
        }
        return child;
      })}
    </div>
  );
});

Filter.displayName = "Filter";

// Individual filter option
const FilterOption = React.forwardRef(({
  children,
  value,
  size = "medium",
  onClick,
  disabled = false,
  className = "",
  fullWidth = false,
  isActive = false,
  onSelect,
  ...props
}, ref) => {

  const baseStyles = 'rounded-md shadow px-x-sm py-y-sm  border border-solid transition-all duration-300 ease-in hover:text-tertiary-light-default hover:bg-secondary-normal-hover hover:border-secondary-normal-hover shadow-lg' ;
  
  const variants = {
    default: 'border-primary-dark-default text-primary-dark-default',
    active: 'bg-secondary-normal-active text-primary-light-default border-secondary-normal-active',
  };
  
  const sizes = {
    small: 'text-med-small-semibold',
    medium: 'text-md-semibold',
  };
  
  const disabledStyles = 'bg-secondary-light-active text-primary-dark-darker cursor-not-allowed opacity-50';

  const handleClick = (e) => {
    if (!disabled) {
      onSelect?.(value);
      onClick?.(e);
    }
  };

  return (
    <button
      ref={ref}
      className={classNames(
        baseStyles,
        isActive ? variants.active : variants.default,
        sizes[size],
        fullWidth ? 'w-full' : '',
        // disabled ? disabledStyles : '',
        className
      )}
      onClick={handleClick}
      disabled={disabled}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
});

FilterOption.displayName = "FilterOption";

export { Filter, FilterOption };