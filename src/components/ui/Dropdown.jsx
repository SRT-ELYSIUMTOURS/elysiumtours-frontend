import React, { useState, useRef, useEffect, useId, useCallback } from "react";
import { classNames } from "../../utils/classNames";

/**
 * Reusable Elysium design-system dropdown.
 *
 * Props:
 *   options     – [{ value, label, description? }]   required
 *   value       – currently selected value            (controlled)
 *   onChange    – (value) => void                     (controlled)
 *   placeholder – string shown when nothing selected  default "Select…"
 *   label       – floating label above the trigger    optional
 *   disabled    – boolean                             default false
 *   className   – extra class on the root wrapper     optional
 *   size        – "sm" | "md" (default "md")
 */
const CheckmarkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3 8L6.5 11.5L13 5"
      stroke="#7b2cbf"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronIcon = ({ open }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className={classNames("shrink-0 transition-transform duration-200", open ? "rotate-180" : "")}
  >
    <path
      d="M6 9L12 15L18 9"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Dropdown = ({
  options = [],
  value,
  onChange,
  placeholder = "Select…",
  label,
  disabled = false,
  className,
  size = "md",
}) => {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const triggerId = useId();
  const listId = useId();

  const selectedOption = options.find((o) => o.value === value) ?? null;

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Scroll focused option into view
  useEffect(() => {
    if (!open || focusedIndex < 0 || !listRef.current) return;
    const el = listRef.current.children[focusedIndex];
    el?.scrollIntoView({ block: "nearest" });
  }, [focusedIndex, open]);

  const openList = useCallback(() => {
    if (disabled) return;
    setOpen(true);
    const idx = options.findIndex((o) => o.value === value);
    setFocusedIndex(idx >= 0 ? idx : 0);
  }, [disabled, options, value]);

  const selectOption = useCallback(
    (opt) => {
      onChange?.(opt.value);
      setOpen(false);
    },
    [onChange]
  );

  const handleKeyDown = (e) => {
    if (disabled) return;
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        if (!open) { openList(); return; }
        if (focusedIndex >= 0 && options[focusedIndex]) selectOption(options[focusedIndex]);
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!open) { openList(); return; }
        setFocusedIndex((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((i) => Math.max(i - 1, 0));
        break;
      case "Escape":
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        break;
    }
  };

  const isSm = size === "sm";

  return (
    <div ref={rootRef} className={classNames("relative w-full", className)}>
      {label && (
        <label
          htmlFor={triggerId}
          className="mb-1.5 block font-raleway text-xs font-semibold uppercase tracking-[0.04em] text-[#6a7282]"
        >
          {label}
        </label>
      )}

      {/* Trigger button */}
      <button
        id={triggerId}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={handleKeyDown}
        className={classNames(
          "flex w-full items-center justify-between gap-2 rounded-[10px] border bg-white text-left font-raleway transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7b2cbf] focus-visible:ring-offset-1",
          isSm ? "h-10 px-3 text-[13px]" : "h-[46px] px-4 text-[14px]",
          open
            ? "border-[#7b2cbf] shadow-[0_0_0_3px_rgba(123,44,191,0.12)]"
            : "border-[#d1d5dc] hover:border-[#7b2cbf]",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
          selectedOption ? "text-[#0d0d0d]" : "text-[#9ca3af]"
        )}
      >
        <span className="flex-1 truncate font-medium leading-[22px]">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span
          className={classNames(
            "transition-colors",
            open ? "text-[#7b2cbf]" : "text-[#9ca3af]"
          )}
        >
          <ChevronIcon open={open} />
        </span>
      </button>

      {/* Dropdown list */}
      {open && (
        <ul
          id={listId}
          ref={listRef}
          role="listbox"
          aria-labelledby={triggerId}
          className={classNames(
            "absolute left-0 right-0 z-50 mt-1 overflow-hidden rounded-[12px] border border-[#e9eaeb] bg-white py-1",
            "shadow-[0px_8px_24px_rgba(0,0,0,0.12)] ring-1 ring-black/5"
          )}
          style={{ maxHeight: "240px", overflowY: "auto" }}
        >
          {options.length === 0 ? (
            <li className="px-4 py-3 font-raleway text-[13px] text-[#9ca3af]">
              No options available
            </li>
          ) : (
            options.map((opt, idx) => {
              const isSelected = opt.value === value;
              const isFocused = idx === focusedIndex;
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setFocusedIndex(idx)}
                  onClick={() => selectOption(opt)}
                  className={classNames(
                    "flex cursor-pointer items-center justify-between gap-3 px-4 py-[10px] transition-colors",
                    isSelected
                      ? "bg-[#EBDFF5] text-[#7b2cbf]"
                      : isFocused
                      ? "bg-[#f5f0fb] text-[#0d0d0d]"
                      : "text-[#374151] hover:bg-[#f5f0fb]"
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <span
                      className={classNames(
                        "block truncate font-raleway text-[13px] leading-[20px]",
                        isSelected ? "font-semibold" : "font-medium"
                      )}
                    >
                      {opt.label}
                    </span>
                    {opt.description && (
                      <span className="block truncate font-raleway text-[11px] font-normal leading-[16px] text-[#9ca3af]">
                        {opt.description}
                      </span>
                    )}
                  </div>
                  {isSelected && <CheckmarkIcon />}
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
