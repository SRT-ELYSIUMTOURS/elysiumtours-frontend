import React, { useState } from "react";
import { classNames } from '../../utils/classNames';
const Button = ({
  children,
  variant = "secondary",
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

  const baseStyles = 'border-r rounded-md' 
  const variants = {
    secondary: 'active:bg-secondary-normal-active hover:bg-secondary-normal-hover bg-secondary-normal-default text-primary-light-default',
  } 
  const sizes = {}
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
