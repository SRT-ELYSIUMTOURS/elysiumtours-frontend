import React, { useState } from "react";
import { classNames } from "../../utils/classNames";

// From Figma: Frame 95 (inside Frame 75 footer, 1267:22642)
// Structure: VERTICAL gap:14, width:379
//   Label:  "Sign Up to Our Newsletters" [16px/600] #292929
//   Frame 94: pill container 379×56 stroke:#d6beeb r:40
//     Placeholder: "Type your email Address" [13px/500] #2d2d2d
//     Button: 140×48 fill:#7b2cbf r:40
//              "Submit" [16px/600] #fefefe

const NewsletterInput = React.forwardRef(({
  value: controlledValue,
  defaultValue = "",
  onChange,
  onSubmit,
  label = "Sign Up to Our Newsletters",
  placeholder = "Type your email Address",
  buttonText = "Submit",
  showLabel = true,
  className = "",
  ...props
}, ref) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleChange = (e) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(currentValue);
  };

  return (
    <div
      ref={ref}
      className={classNames("flex flex-col gap-md w-full", className)}
      {...props}
    >
      {/* Label — [16px/600] #292929 */}
      {showLabel && (
        <span className="text-md-semibold text-tertiary-normal-hover">
          {label}
        </span>
      )}

      {/* Pill container — Frame 94: 379×56 stroke:#d6beeb r:40 */}
      <form
        onSubmit={handleSubmit}
        className={classNames(
          "flex items-center w-full h-[56px]",
          "rounded-md",          // r:40
          "border border-secondary-light-active", // stroke:#d6beeb
          "bg-primary-light-default",
          "overflow-hidden pl-5 transition-all duration-300 ease-in focus-within:border-secondary-normal-default focus-within:shadow-md"
        )}
      >
        {/* Email input — placeholder: [13px/500] #2d2d2d */}
        <input
          type="email"
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={classNames(
            "flex-1 bg-transparent outline-none",
            "text-med-small-Medium text-tertiary-normal-default",
            "placeholder:text-primary-dark-active"
          )}
        />

        {/* Submit button — 140×48 fill:#7b2cbf r:40, "Submit" [16px/600] #fefefe */}
        <button
          type="submit"
          className={classNames(
            "h-[48px] px-6 my-[4px] mr-[4px] rounded-md",
            "bg-secondary-normal-default",
            "text-md-semibold text-primary-light-default",
            "shrink-0 transition-all duration-300 ease-in",
            "hover:bg-secondary-normal-hover active:bg-secondary-normal-active"
          )}
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
});

NewsletterInput.displayName = "NewsletterInput";
export default NewsletterInput;
