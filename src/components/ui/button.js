import React, { useState } from "react";

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
  return (
    <div>
      <h1>Button Component</h1>
    </div>
  );
};

export default Button;
