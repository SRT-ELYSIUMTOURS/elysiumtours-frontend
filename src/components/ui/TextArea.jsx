import React, { useState, useRef, useEffect } from "react";
import { classNames } from "../../utils/classNames";

const TextArea = React.forwardRef(({
  label = "Message",
  id = "message",
  placeholder = "Enter your message",
  value: controlledValue,
  defaultValue = "",
  onChange,
  variant = "default",
  disabled = false,
  required = false,
  maxLength,
  showCount = false,
  helperText,
  errorText,
  className = "",
  textareaClassName = "",
  ...props
}, ref) => {

  const innerRef = useRef(null);
  const combinedRef = ref || innerRef;

  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const isError = variant === "error";

  // Auto resize function
  const autoResize = (el) => {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  useEffect(() => {
    autoResize(innerRef.current);
  }, []);

  const handleChange = (e) => {
    if (!isControlled) setInternalValue(e.target.value);
    autoResize(e.target);
    onChange?.(e);
  };

  const wrapperVariants = {
    default: "border-[#949494] focus-within:border-[#7b2cbf]",
    error: "border-red-500 focus-within:border-red-500",
    success: "border-green-500 focus-within:border-green-500",
  };

  return (
    <div className={classNames("flex flex-col gap-[6px] w-full", className)}>

      {/* Label */}
      <label
        htmlFor={id}
        style={{
          fontSize: "16px",
          fontWeight: 500,
          color: "#2d2d2d",
          fontFamily: "Raleway, sans-serif",
          display: "inline-flex",
          alignItems: "flex-end", // THIS fixes the vertical position
          gap: "2px"
        }}
      >
        <span>{label}</span>

        {required && (
          <span
            style={{
              color: "#ff0000",
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "1",
              position: "relative",
              top: "2px" // pushes it slightly downward to match Figma
            }}
          >
            *
          </span>
        )}
      </label>


      {/* Textarea wrapper */}
      <div className={classNames(
        "relative w-full rounded-[10px] border transition-all duration-300 ease-in bg-transparent",
        wrapperVariants[variant],
        disabled && "opacity-60"
      )}>

        {/* Textarea */}
        <textarea
          ref={innerRef}
          id={id}
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          rows={1}
          className={classNames(
            "w-full bg-transparent outline-none resize-none overflow-hidden",
            "px-4 py-3 pr-10",
            textareaClassName
          )}
          style={{
            minHeight: "150px",
            fontSize: "13px",
            fontWeight: 500,
            color: "#2d2d2d",
            fontFamily: "Raleway, sans-serif"
          }}
          {...props}
        />

        {/* Expand icon indicator */}
        <div className="absolute bottom-2 right-3 pointer-events-none opacity-50">
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path
              d="M5 11C7 11 9 9 9 7"
              stroke="#949494"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M8 13C10.5 13 13 10.5 13 8"
              stroke="#949494"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>


      </div>

      {/* Character count */}
      {showCount && maxLength && (
        <div className="flex justify-end mt-1">
          <span className="text-sm text-[#949494]">
            {currentValue.length}/{maxLength}
          </span>
        </div>
      )}

      {/* Helper / error */}
      {isError && errorText && (
        <p className="text-sm text-red-500">{errorText}</p>
      )}

      {!isError && helperText && (
        <p className="text-sm text-[#949494]">{helperText}</p>
      )}

    </div>
  );
});

TextArea.displayName = "TextArea";
export default TextArea;
