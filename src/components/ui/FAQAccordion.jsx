import React from "react";
import { classNames } from "../../utils/classNames";

// From Figma: Frame 10 in Frame 184 (Contact page)
// REAL structure — NOT a collapse/expand accordion!
// Each item: HORIZONTAL gap:8
//   Group 3270: Rectangle 40×40 stroke:#d6beeb r:10 + "mynaui:question-solid" 20×20 icon
//   Text column VERTICAL gap:8:
//     Frame 27: question [20px/600] #2d2d2d
//     Frame 28: answer [16px/400] #2d2d2d
// ALL items are ALWAYS VISIBLE — it is a static Q&A list, NOT a dropdown
// Layout: Frame 181 HORIZONTAL gap:21 → Frame 176 (col 1) + Frame 175 (col 2), each VERTICAL gap:19

const QuestionIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    {/* <rect x="1" y="1" width="22" height="22" rx="4" stroke="#d6beeb" strokeWidth="1.5"/> */}
    <path d="M9.5 9.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5c0 1.5-1.5 2-2.5 2.5" stroke="#7b2cbf" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="16.5" r="0.8" fill="#7b2cbf"/>
  </svg>
);

// Single FAQ item — always visible, no expand/collapse
const FAQItem = ({ question, answer }) => (
  <div className="flex items-start gap-[8px]">
    {/* Question mark box — Group 3270: rect 40×40 stroke:#d6beeb r:10 */}
    <div className="shrink-0 w-10 h-10 rounded-[10px] border border-secondary-light-active flex items-center justify-center" style={{ minWidth:"40px" }}>
      <QuestionIcon />
    </div>
    {/* Text column — VERTICAL gap:8 */}
    <div className="flex flex-col gap-[8px]">
      {/* Question — [20px/600] #2d2d2d, Frame 27 */}
      <p style={{ fontSize:"20px", fontWeight:600, color:"#2d2d2d", lineHeight:"28px", fontFamily:"Raleway,sans-serif" }}>
        {question}
      </p>
      {/* Answer — [16px/400] #2d2d2d, Frame 28 */}
      <p style={{ fontSize:"16px", fontWeight:400, color:"#2d2d2d", lineHeight:"24px", fontFamily:"Raleway,sans-serif" }}>
        {answer}
      </p>
    </div>
  </div>
);

// FAQAccordion — 2-column layout matching Frame 181 HORIZONTAL gap:21
// Frame 176 (col 1) + Frame 175 (col 2), both VERTICAL gap:19
const FAQAccordion = React.forwardRef(({
  items = [],
  columns = 2,
  className = "",
  ...props
}, ref) => {
  const col1 = columns === 2 ? items.filter((_, i) => i % 2 === 0) : items;
  const col2 = columns === 2 ? items.filter((_, i) => i % 2 === 1) : [];

  return (
    <div
      ref={ref}
      className={classNames(columns === 2 ? "flex gap-[21px]" : "flex flex-col gap-[19px]", className)}
      {...props}
    >
      {/* Column 1 — Frame 176: VERTICAL gap:19 */}
      <div className="flex-1 flex flex-col gap-[19px]">
        {col1.map((item, i) => (
          <FAQItem key={i} question={item.question} answer={item.answer} />
        ))}
      </div>
      {/* Column 2 — Frame 175: VERTICAL gap:19 */}
      {columns === 2 && col2.length > 0 && (
        <div className="flex-1 flex flex-col gap-[19px]">
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
