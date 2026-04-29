import React from "react";
import { classNames } from '../../utils/classNames';

const Button = React.forwardRef(({
  children,
  variant = "secondaryOutline",
  size = "medium",
  shape = "default",
  type = "button",
  onClick,
  disabled = false,
  className = "",
  fullWidth = false,
  startIcon,
  endIcon,
  href,
  ...props
}, ref) => {

  const baseStyles = classNames(
    'flex flex-row cursor-pointer items-center justify-center p-2.5 transition-all duration-300 ease-in',
    variant !== 'link' && 'shadow'
  );

  const variants = {
    secondary: 'active:bg-secondary-normal-active hover:bg-secondary-normal-hover bg-secondary-normal-default active:border-secondary-normal-active hover:border-secondary-normal-hover border-secondary-normal-default text-primary-light-default border border-solid',
    secondaryOutline: 'bg-transparent border border-solid border-secondary-normal-default hover:border-secondary-normal-hover active:border-secondary-normal-active text-secondary-normal-default active:text-secondary-normal-active hover:text-secondary-normal-hover',
    neutral: 'border border-solid bg-primary-light-default active:border-secondary-normal-active hover:border-secondary-normal-hover border-secondary-normal-default text-secondary-dark-default active:text-secondary-dark-active hover:text-secondary-dark-hover',
    white: 'bg-primary-light-default hover:bg-primary-light-hover active:bg-primary-light-active text-secondary-dark-darker border border-solid border-primary-light-default shadow',
    ghost: 'bg-transparent border border-solid border-primary-light-default hover:bg-primary-light-default/10 text-primary-light-default',
    link: 'p-0! bg-transparent underline text-secondary-normal-default hover:text-secondary-normal-hover active:text-secondary-normal-active',
  };

  const sizes = {
    small: 'text-med-small-semibold',
    medium: 'text-md-semibold',
    link: 'text-md-bold',
  };

  const shapes = {
    default: 'rounded-sm',
    pill: 'rounded-2xl',
  };

  const disabledStyles =
    variant === 'link'
      ? 'cursor-not-allowed opacity-50'
      : 'bg-secondary-light-active text-primary-dark-darker cursor-not-allowed opacity-50';

  const classes = classNames(
    baseStyles,
    variants[variant],
    sizes[size],
    shapes[shape],
    fullWidth ? 'w-full' : '',
    disabled ? disabledStyles : '',
    className
  );

  const inner = (
    <>
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </>
  );

  if (href) {
    return (
      <a
        ref={ref}
        href={disabled ? undefined : href}
        className={classes}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            return;
          }
          onClick?.(e);
        }}
        {...props}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {inner}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
