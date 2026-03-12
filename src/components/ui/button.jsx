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
  ...props
}, ref) => {

  const baseStyles = 'flex flex-row items-center justify-center shadow px-x-sm py-y-sm transition-all duration-300 ease-in';

  const variants = {
    secondary: 'active:bg-secondary-normal-active hover:bg-secondary-normal-hover bg-secondary-normal-default active:border-secondary-normal-active hover:border-secondary-normal-hover border-secondary-normal-default text-primary-light-default border border-solid',
    secondaryOutline: 'bg-transparent border border-solid border-secondary-normal-default hover:border-secondary-normal-hover active:border-secondary-normal-active text-secondary-normal-default active:text-secondary-normal-active hover:text-secondary-normal-hover',
    neutral: 'border border-solid bg-primary-light-default active:border-secondary-normal-active hover:border-secondary-normal-hover border-secondary-normal-default text-secondary-dark-default active:text-secondary-dark-active hover:text-secondary-dark-hover',
    white: 'bg-primary-light-default hover:bg-primary-light-hover active:bg-primary-light-active text-secondary-dark-darker border border-solid border-primary-light-default shadow',
    ghost: 'bg-transparent border border-solid border-primary-light-default hover:bg-primary-light-default/10 text-primary-light-default',
  };

  const sizes = {
    small: 'text-med-small-semibold',
    medium: 'text-md-semibold',
  };

  const shapes = {
    default: 'rounded-sm',
    pill: 'rounded-2xl',
  };

  const disabledStyles = 'bg-secondary-light-active text-primary-dark-darker cursor-not-allowed opacity-50';

  return (
    <button
      ref={ref}
      type={type}
      className={classNames(
        baseStyles,
        variants[variant],
        sizes[size],
        shapes[shape],
        fullWidth ? 'w-full' : '',
        disabled ? disabledStyles : '',
        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
