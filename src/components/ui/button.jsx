import React, { useState } from "react";
import { classNames } from '../../utils/classNames';
const Button = ({
  children,
  variant = "secondaryOutline",
  size = "medium",
  type = "button",
  onClick,
  disabled = false,
  className = "",
  fullWidth = false,
  startIcon,
  endIcon,
  ...props
}) => {

  const baseStyles = 'border-r flex flex-row rounded-md shadow px-x-sm py-y-sm' 
  const variants = {
    secondary: 'active:bg-secondary-normal-active hover:bg-secondary-normal-hover bg-secondary-normal-default active:border-secondary-normal-active hover:border-secondary-normal-hover border-secondary-normal-default text-primary-light-default',
    secondaryOutline: 'bg-transparent border border-solid border-secondary-normal-default hover:border-secondary-normal-hover active:border-secondary-normal-active text-secondary-normal-default active:text-secondary-normal-active hover:text-secondary-normal-hover',
    neutral: 'border border-solid bg-primary-light-default active:border-secondary-normal-active hover:border-secondary-normal-hover border-secondary-normal-default text-secondary-dark-default active:text-secondary-dark-active hover:text-secondary-darks-hover'
  } 
  const sizes = {
    small: 'text-med-small-semibold',
    medium: 'text-md-semibold',
    
  }
  const disabledStyles = 'bg-secondary-light-active text-primary-dark-darker'

  return (
  
    <button
      type={type}
      className={classNames(
        baseStyles,
        variants[variant],
        sizes[size],
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
};

export default Button;
