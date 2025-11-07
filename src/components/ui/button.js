import React, { useState } from "react";
import { classNames } from '../../utils/classNames';
const Button = ({
  children,
  variant = "primary",
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

  const baseStyles = '' 
  const variants = {} 
  const sizes = {}
  const disabledStyles = ''

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
