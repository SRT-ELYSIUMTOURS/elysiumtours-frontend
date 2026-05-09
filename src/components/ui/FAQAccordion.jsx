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
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M9.99999 16.4596C10.1658 16.4596 10.3247 16.5255 10.4419 16.6427C10.5591 16.7599 10.625 16.9189 10.625 17.0846V17.5013C10.625 17.6671 10.5591 17.826 10.4419 17.9432C10.3247 18.0605 10.1658 18.1263 9.99999 18.1263C9.83423 18.1263 9.67526 18.0605 9.55805 17.9432C9.44084 17.826 9.37499 17.6671 9.37499 17.5013V17.0846C9.37499 16.9189 9.44084 16.7599 9.55805 16.6427C9.67526 16.5255 9.83423 16.4596 9.99999 16.4596ZM13.2833 3.5113C14.2033 4.34214 14.7917 5.5713 14.7917 7.14797C14.7917 8.32297 14.5 9.1813 14.0292 9.86047C13.5825 10.5063 12.995 10.9563 12.4908 11.3413L12.4633 11.363C11.9308 11.7696 11.4908 12.113 11.165 12.583C10.8542 13.0321 10.625 13.6355 10.625 14.5846C10.625 14.7504 10.5591 14.9094 10.4419 15.0266C10.3247 15.1438 10.1658 15.2096 9.99999 15.2096C9.83423 15.2096 9.67526 15.1438 9.55805 15.0266C9.44084 14.9094 9.37499 14.7504 9.37499 14.5846C9.37499 13.4096 9.66666 12.5513 10.1375 11.8721C10.5842 11.2263 11.1717 10.7763 11.6758 10.3913L11.7033 10.3696C12.2358 9.96297 12.6758 9.61964 13.0017 9.14963C13.3125 8.69964 13.5417 8.09714 13.5417 7.14797C13.5417 5.9038 13.0883 5.0188 12.4458 4.43964C11.7925 3.85047 10.9058 3.54297 9.99999 3.54297C9.09416 3.54297 8.20749 3.85047 7.55416 4.43964C6.91249 5.0188 6.45833 5.90464 6.45833 7.14797C6.45833 7.31373 6.39248 7.4727 6.27527 7.58991C6.15806 7.70712 5.99909 7.77297 5.83333 7.77297C5.66757 7.77297 5.5086 7.70712 5.39139 7.58991C5.27418 7.4727 5.20833 7.31373 5.20833 7.14797C5.20833 5.5713 5.79666 4.34214 6.71666 3.5113C7.62583 2.69047 8.82249 2.29297 9.99999 2.29297C11.1775 2.29297 12.3742 2.69047 13.2833 3.5113Z" fill="#7B2CBF"/>
</svg>
);

// Single FAQ item — always visible, no expand/collapse
const FAQItem = ({ question, answer }) => (
  <div className="flex items-start gap-3 md:gap-[18px]">
    <div className="shrink-0 w-10 h-10 rounded-[10px] border border-secondary-light-active flex items-center justify-center">
      <QuestionIcon />
    </div>
    <div className="flex flex-col gap-2 md:gap-[18px] min-w-0">
      <p className="font-raleway font-semibold text-[#2d2d2d] text-[16px] md:text-[20px] leading-[22px] md:leading-[28px]">
        {question}
      </p>
      <p className="font-raleway font-normal text-[#2d2d2d] text-[14px] md:text-[16px] leading-[22px] md:leading-[24px]">
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
      className={classNames(columns === 2 ? "flex flex-col lg:flex-row gap-[19px] lg:gap-[21px]" : "flex flex-col gap-[19px]", className)}
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
