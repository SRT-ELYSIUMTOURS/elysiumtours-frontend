import React from "react";
import { classNames } from '../../utils/classNames';
import { NextPageIcon } from "../../utils/assets";

// Root Pagination component
const Pagination = React.forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <nav
      ref={ref}
      role="navigation"
      aria-label="Pagination"
      className={classNames("inline-flex items-center gap-2", className)}
      {...props}
    >
      {children}
    </nav>
  );
});

Pagination.displayName = "Pagination";

// Individual pagination item
const PaginationItem = React.forwardRef(({
  children,
  isActive = false,
  disabled = false,
  variant = "default",
  onClick,
  className = "",
  ...props
}, ref) => {

  const baseStyles = 'inline-flex items-center justify-center min-w-[40px] h-[40px] px-3 rounded-md transition-all duration-300 ease-in';
  
  const variants = {
    default: 'border-primary-dark-default text-tertiary-normal-default hover:bg-secondary-normal-hover hover:border-secondary-normal-hover hover:text-tertiary-light-default',
    active: 'bg-secondary-normal-active text-primary-light-default border-secondary-normal-active',
    dots: 'border-transparent text-primary-dark-default cursor-default hover:bg-transparent',
    next: 'border-secondary-normal-default text-secondary-normal-default   hover:text-primary-light-default',
  };
  
  const disabledStyles = 'opacity-50 cursor-not-allowed pointer-events-none';

  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      ref={ref}
      className={classNames(
        baseStyles,
        isActive ? variants.active : variants[variant],
        disabled ? disabledStyles : '',
        className
      )}
      onClick={handleClick}
      disabled={disabled}
      type="button"
      aria-current={isActive ? 'page' : undefined}
      {...props}
    >
      {children}
    </button>
  );
});

PaginationItem.displayName = "PaginationItem";

// Pagination ellipsis (dots)
const PaginationEllipsis = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <PaginationItem
      ref={ref}
      variant="dots"
      disabled
      className={className}
      {...props}
    >
      <span className="text-md-semibold">...</span>
    </PaginationItem>
  );
});

PaginationEllipsis.displayName = "PaginationEllipsis";

// Pagination next button
const PaginationNext = React.forwardRef(({ 
  children, 
  disabled = false,
  onClick,
  className,
  icon=<NextPageIcon/>,
  ...props 
}, ref) => {
  return (
    <PaginationItem
      ref={ref}
      variant="next"
      disabled={disabled}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children || (icon && icon)}
    </PaginationItem>
  );
});

PaginationNext.displayName = "PaginationNext";

// Pagination previous button
const PaginationPrevious = React.forwardRef(({ 
  children, 
  disabled = false,
  onClick,
  className,
  icon=<NextPageIcon/>,
  ...props 
}, ref) => {
  return (
    <PaginationItem
      ref={ref}
      variant="next"
      disabled={disabled}
      onClick={onClick}
      className={classNames("rotate-180", className)}
      {...props}
    >
      {children || (icon && icon)}
    </PaginationItem>
  );
});

PaginationPrevious.displayName = "PaginationPrevious";

export { 
  Pagination, 
  PaginationItem, 
  PaginationEllipsis,
  PaginationNext,
  PaginationPrevious 
}; 