import React, { useState } from "react";
import { classNames } from "../../utils/classNames";

// From Figma: Contact page Frame 184 > Frame 10 — FAQ section
// Each item: Frame 29/46/47/48/49 (697×111 or 697×138) HORIZONTAL gap:8
// Structure (closed):  [20px/600] question text + expand icon
// Structure (open):    question + [16px/400] answer text
// Two-column layout: Frame 176 + Frame 175 each 697×712 VERTICAL gap:19

const ChevronDown = ({ stroke = "#2d2d2d" }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
    <path d="M7 10l5 4 5-4" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ChevronUp = ({ stroke = "#7b2cbf" }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
    <path d="M7 14l5-4 5 4" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Single FAQ item
const FAQItem = React.forwardRef(({
  question,
  answer,
  defaultOpen = false,
  className = "",
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      ref={ref}
      className={classNames(
        "w-full border-b border-primary-dark-default transition-all duration-300 ease-in",
        className
      )}
      {...props}
    >
      {/* Question row */}
      <button
        type="button"
        onClick={() => setIsOpen(p => !p)}
        className="w-full flex items-start justify-between gap-[8px] py-[10px] text-left group"
      >
        {/* Question text — [20px/600] #2d2d2d */}
        <span
          className="flex-1 transition-all duration-300 ease-in"
          style={{
            fontSize: "20px",
            fontWeight: 600,
            color: isOpen ? "#7b2cbf" : "#2d2d2d",
            lineHeight: "28px",
            fontFamily: "Raleway, sans-serif",
          }}
        >
          {question}
        </span>
        {/* Chevron */}
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>

      {/* Answer — [16px/400] #2d2d2d, slides open */}
      {isOpen && (
        <div className="pb-4">
          <p style={{
            fontSize: "16px",
            fontWeight: 400,
            color: "#2d2d2d",
            lineHeight: "24px",
            fontFamily: "Raleway, sans-serif",
          }}>
            {answer}
          </p>
        </div>
      )}
    </div>
  );
});

FAQItem.displayName = "FAQItem";

// FAQAccordion — two-column grid layout (matches Figma Frame 181: HORIZONTAL gap:21)
// Frame 176 + Frame 175, each 697×712 VERTICAL gap:19
const FAQAccordion = React.forwardRef(({
  items = [],        // [{ question, answer }]
  columns = 2,       // 1 or 2
  className = "",
  ...props
}, ref) => {

  // Split into two columns
  const col1 = columns === 2 ? items.filter((_, i) => i % 2 === 0) : items;
  const col2 = columns === 2 ? items.filter((_, i) => i % 2 === 1) : [];

  return (
    <div
      ref={ref}
      className={classNames(
        columns === 2 ? "flex gap-[21px]" : "flex flex-col",
        className
      )}
      {...props}
    >
      {/* Column 1 */}
      <div className="flex-1 flex flex-col gap-0">
        {col1.map((item, i) => (
          <FAQItem key={i} question={item.question} answer={item.answer} />
        ))}
      </div>
      {/* Column 2 */}
      {columns === 2 && col2.length > 0 && (
        <div className="flex-1 flex flex-col gap-0">
          {col2.map((item, i) => (
            <FAQItem key={i} question={item.question} answer={item.answer} />
          ))}
        </div>
      )}
    </div>
  );
});

FAQAccordion.displayName = "FAQAccordion";

export { FAQItem, FAQAccordion };
export default FAQAccordion;
