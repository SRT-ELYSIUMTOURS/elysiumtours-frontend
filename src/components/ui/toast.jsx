import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { classNames } from "../../utils/classNames";

const variants = {
  warning: {
    icon: "/Warning.svg",
    bg: "/Yellow-warning.svg",
  },
  error: {
    icon: "/Danger.svg",
    bg: "/Red-Error.svg",
  },
  info: {
    icon: "/Information.svg",
    bg: "/Blue-info.svg",
  },
  success: {
    icon: "/checkmark.svg",
    bg: "/Green-success.svg",
  },
};

// Single Toast item — original design + auto-dismiss + accessibility
const ToastItem = React.forwardRef(({
  id,
  Heading,
  text,
  variant = "info",
  duration = 4000,
  onDismiss,
  onCancel,
  className = "",
  ...props
}, ref) => {
  const [visible, setVisible] = useState(true);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(() => {
      onDismiss?.(id);
      onCancel?.();
    }, 300);
  };

  useEffect(() => {
    if (!duration) return;
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        onDismiss?.(id);
        onCancel?.();
      }, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, id, onDismiss, onCancel]);

  return (
    <div
      ref={ref}
      role="alert"
      aria-live="assertive"
      className={classNames(
        "bg-primary-light-default flex relative overflow-hidden flex-col gap-[5px] rounded-[15px] p-2 w-[300px] md:w-[350px] lg:w-[490px]",
        "transition-all duration-300 ease-in",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        className
      )}
      style={{ boxShadow: "0px 1px 5px 0px #27C84033" }}
      {...props}
    >
      {/* Background decorative SVGs */}
      <img
        className="absolute right-0"
        src="/toastBg.svg"
        alt=""
        aria-hidden="true"
      />
      <img
        className="absolute -left-[64px]   lg:-left-[34px] -top-[17px]"
        src={variants[variant]?.bg}
        alt=""
        aria-hidden="true"
      />

      {/* Header row: icon + heading + close */}
      <div className="flex z-10 flex-1 gap-[5px] py-2.5 items-center">
        {variants[variant]?.icon && (
          <img
            src={variants[variant].icon}
            alt={`${variant} icon`}
            width="24"
            height="24"
          />
        )}
        <p className="flex-1 text-md-bold">{Heading}</p>
        <button
          className="cursor-pointer"
          onClick={handleDismiss}
          aria-label="Dismiss"
        >
          <img
            src="/XSquare.svg"
            width="20"
            height="20"
            alt="close icon"
          />
        </button>
      </div>

      {/* Body text */}
      <p className="text-tertiary-normal-default flex-1 p-2.5 text-med-small-regular">
        {text}
      </p>
    </div>
  );
});

ToastItem.displayName = "ToastItem";

// Legacy single-toast component using portal (preserves original API)
const Toast = ({
  children,
  variant = "info",
  Heading,
  text,
  className = "",
  onCancel,
  duration,
  ...props
}) => {
  return ReactDOM.createPortal(
    <div className="fixed top-6 right-6 z-[100]">
      <ToastItem
        variant={variant}
        Heading={Heading}
        text={text}
        className={className}
        onCancel={onCancel}
        duration={duration}
        {...props}
      />
    </div>,
    document.getElementById("toast-root")
  );
};

// Toast container — renders a queue of toasts (new functionality)
const ToastContainer = React.forwardRef(({
  toasts = [],
  onDismiss,
  position = "top-right",
  className = "",
}, ref) => {
  const positions = {
    "top-right":    "top-4 right-4",
    "top-left":     "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left":  "bottom-4 left-4",
    "top-center":   "top-4 left-1/2 -translate-x-1/2",
  };

  return ReactDOM.createPortal(
    <div
      ref={ref}
      className={classNames(
        "fixed z-[100] flex flex-col gap-2 ",
        positions[position] || positions["top-right"],
        className
      )}
    >
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          {...toast}
          onDismiss={onDismiss}
        />
      ))}
    </div>,
    document.getElementById("toast-root")
  );
});

ToastContainer.displayName = "ToastContainer";

export default Toast;
export { ToastItem, ToastContainer };
