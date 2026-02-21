import React, { useState } from "react";
import { classNames } from "../../utils/classNames";

// From Figma: newsletter email input in Footer — placeholder "Type your email Address"
// Also used in Hero searchbar: "Search for place or activity" [13px/500] #949494

const TextInput = React.forwardRef(({
  label,
  id,
  type = "text",
  placeholder = "",
  value: controlledValue,
  defaultValue = "",
  onChange,
  variant = "default",
  disabled = false,
  required = false,
  helperText,
  errorText,
  startIcon,
  endIcon,
  className = "",
  inputClassName = "",
  ...props
}, ref) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleChange = (e) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e);
  };

  const isError = variant === "error";

  const wrapperBase = [
    "flex items-center gap-2 w-full",
    "px-[var(--padding-x-sm)] py-[var(--padding-y-sm)]",
    "rounded-[var(--radius-sm)] border border-solid",
    "transition-all duration-300 ease-in bg-primary-light-default",
  ].join(" ");

  const wrapperVariants = {
    default: "border-primary-dark-default focus-within:border-secondary-normal-default",
    error:   "border-red-500 focus-within:border-red-500",
    success: "border-green-500 focus-within:border-green-500",
  };

  return (
    <div className={classNames("flex flex-col gap-1 w-full", className)}>
      {label && (
        <label
          htmlFor={id}
          className="text-med-small-semibold text-tertiary-normal-default"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className={classNames(
        wrapperBase,
        wrapperVariants[variant] || wrapperVariants.default,
        disabled ? "bg-primary-normal-default opacity-60 cursor-not-allowed" : ""
      )}>
        {startIcon && (
          <span className="shrink-0 text-primary-dark-default">{startIcon}</span>
        )}
        <input
          ref={ref}
          id={id}
          type={type}
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={classNames(
            "flex-1 bg-transparent outline-none",
            "text-md-regular text-tertiary-normal-default",
            "placeholder:text-primary-dark-hover",
            "disabled:cursor-not-allowed",
            inputClassName
          )}
          {...props}
        />
        {endIcon && (
          <span className="shrink-0 text-primary-dark-default">{endIcon}</span>
        )}
      </div>

      {isError && errorText && (
        <p className="text-med-small-regular text-red-500">{errorText}</p>
      )}
      {!isError && helperText && (
        <p className="text-med-small-regular text-primary-dark-darker">{helperText}</p>
      )}
    </div>
  );
});

TextInput.displayName = "TextInput";
export default TextInput;
