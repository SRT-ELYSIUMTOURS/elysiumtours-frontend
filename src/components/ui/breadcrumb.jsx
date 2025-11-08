import React from 'react';
import { classNames } from '../../utils/classNames';
import { BreadcrumbIcon } from '../../utils/assets';

// Root Breadcrumb component
const Breadcrumb = React.forwardRef(({ 
  children, 
  separator = <BreadcrumbIcon />,
  className,
  ...props 
}, ref) => {
  return (
    <nav
      ref={ref}
      aria-label="Breadcrumb"
      className={classNames("inline-flex items-center gap-2", className)}
      {...props}
    >
      <ol className="inline-flex items-center gap-2">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            const isLast = index === React.Children.count(children) - 1;
            return (
              <>
                {React.cloneElement(child, {
                  isLast,
                })}
                {!isLast && (
                  <li className="inline-flex items-center" aria-hidden="true">
                    {separator}
                  </li>
                )}
              </>
            );
          }
          return child;
        })}
      </ol>
    </nav>
  );
});

Breadcrumb.displayName = "Breadcrumb";

// Individual breadcrumb item
const BreadcrumbItem = React.forwardRef(({
  children,
  href,
  isLast = false,
  onClick,
  className = "",
  ...props
}, ref) => {

  const baseStyles = 'inline-flex items-center transition-all duration-300 ease-in text-md-semibold';
  
  const variants = {
    default: 'text-primary-dark-active hover:text-secondary-normal-hover',
    active: 'text-secondary-dark-default cursor-default',
  };

  const handleClick = (e) => {
    if (!isLast && onClick) {
      onClick(e);
    } else if (isLast) {
      e.preventDefault();
    }
  };

  const content = (
    <>
      {children}
    </>
  );

  if (href && !isLast) {
    return (
      <li ref={ref}>
        <a
          href={href}
          className={classNames(
            baseStyles,
            variants.default,
            className
          )}
          onClick={handleClick}
          aria-current={isLast ? 'page' : undefined}
          {...props}
        >
          {content}
        </a>
      </li>
    );
  }

  return (
    <li ref={ref}>
      <span
        className={classNames(
          baseStyles,
          isLast ? variants.active : variants.default,
          className
        )}
        onClick={handleClick}
        aria-current={isLast ? 'page' : undefined}
        {...props}
      >
        {content}
      </span>
    </li>
  );
});

BreadcrumbItem.displayName = "BreadcrumbItem";

export { Breadcrumb, BreadcrumbItem };