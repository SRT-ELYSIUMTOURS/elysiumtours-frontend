import React, { useEffect, useState } from "react";
import { classNames } from "../../utils/classNames";

const ICONS = {
  success: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 18.333A8.333 8.333 0 1 0 10 1.667a8.333 8.333 0 0 0 0 16.666Z" stroke="#22c55e" strokeWidth="1.5"/>
      <path d="M6.667 10l2.5 2.5 4.166-5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  error: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 18.333A8.333 8.333 0 1 0 10 1.667a8.333 8.333 0 0 0 0 16.666Z" stroke="#ef4444" strokeWidth="1.5"/>
      <path d="M12.5 7.5l-5 5M7.5 7.5l5 5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  warning: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 18.333A8.333 8.333 0 1 0 10 1.667a8.333 8.333 0 0 0 0 16.666Z" stroke="#f59e0b" strokeWidth="1.5"/>
      <path d="M10 6.667v4.166M10 13.333h.008" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  info: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 18.333A8.333 8.333 0 1 0 10 1.667a8.333 8.333 0 0 0 0 16.666Z" stroke="#7b2cbf" strokeWidth="1.5"/>
      <path d="M10 9.167v5M10 6.667h.008" stroke="#7b2cbf" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

const variantStyles = {
  success: "bg-primary-light-default border-l-4 border-green-500",
  error:   "bg-primary-light-default border-l-4 border-red-500",
  warning: "bg-primary-light-default border-l-4 border-amber-500",
  info:    "bg-primary-light-default border-l-4 border-secondary-normal-default",
};

// Single Toast item
const ToastItem = React.forwardRef(({
  id,
  message,
  variant = "info",
  duration = 4000,
  onDismiss,
  className = "",
}, ref) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!duration) return;
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss?.(id), 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, id, onDismiss]);

  return (
    <div
      ref={ref}
      role="alert"
      aria-live="assertive"
      className={classNames(
        "flex items-start gap-3 w-full max-w-sm px-4 py-3 rounded-[var(--radius-sm)] shadow-lg",
        "transition-all duration-300 ease-in",
        variantStyles[variant] || variantStyles.info,
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        className
      )}
    >
      <span className="shrink-0 mt-0.5">{ICONS[variant]}</span>
      <p className="flex-1 text-md-regular text-tertiary-normal-default">{message}</p>
      <button
        onClick={() => { setVisible(false); setTimeout(() => onDismiss?.(id), 300); }}
        className="shrink-0 text-primary-dark-default hover:text-tertiary-normal-default transition-all duration-300 ease-in"
        aria-label="Dismiss"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
});

ToastItem.displayName = "ToastItem";

// Toast container — renders all active toasts
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

  return (
    <div
      ref={ref}
      className={classNames(
        "fixed z-[100] flex flex-col gap-2 w-full max-w-sm",
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
    </div>
  );
});

ToastContainer.displayName = "ToastContainer";

export { ToastItem, ToastContainer };
