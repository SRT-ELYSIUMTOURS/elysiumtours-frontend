import React from "react";
import { classNames } from "../../utils/classNames";

// From Figma: Frame 26 (134:1518) — Stats row, 1399×127
// Structure: HORIZONTAL gap:170
// Each stat: Frame 22/23/24/25 (222×127) HORIZONTAL gap:40
//   Frame 21 (182×127) VERTICAL gap:8
//     Value: "95%" [56px/600] #7b2cbf
//     Label: "Satisfaction Rate" [16px/500] #565656
//   Line 2: 0×107 vertical divider stroke:#d6beeb

// Single stat item
const StatItem = ({ value, label}) => (
  <div className="flex items-center  gap-[20px] md:gap-[40px]">
    {/* Value + label — VERTICAL gap:8 */}
    <div className="flex flex-col gap-[8px] w-auto md:w-[182px] items-center ">
      {/* Value — [56px/600] #7b2cbf */}
      <span className="text-[36px] font-semibold md:text-Display-xl-semibold text-secondary-normal-default leading-none">
        {value}
      </span>
      {/* Label — [16px/500] #565656 */}
      <span className="text-[13px] md:text-md-Medium text-primary-dark-darker text-center ">
        {label}
      </span>
    </div>
   
  </div>
);

// Full stats row
const StatCounter = React.forwardRef(({
  stats = [
    { value: "95%",  label: "Satisfaction Rate" },
    { value: "500+", label: "Guided Tours Annually" },
    { value: "150+", label: "Destinations" },
    { value: "100+", label: "Featured Reviews" },
  ],
  className = "",
  ...props
}, ref) => {

  return (
    <div
      ref={ref}
      className={classNames(
        // Mobile: 2×2 grid with dividers; Desktop: horizontal row
        "grid grid-cols-2 gap-y-6 gap-x-4 md:flex  md:items-center ",
        className
      )}
      {...props}
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          className={classNames(
            "flex items-center md:flex-1 justify-center ",
            // Mobile: right border on left-column items, bottom border on top-row items
            !(i  === stats.length-1) ? "border-r border-secondary-light-active " : "",
            i < 2 ? "border-b border-secondary-light-active pb-6 md:border-b-0 md:pb-0" : ""
          )}
        >
          <StatItem value={stat.value} label={stat.label} hideDivider={i === stats.length - 1} />
        </div>
      ))}
    </div>
  );
});

StatCounter.displayName = "StatCounter";
export { StatCounter, StatItem };
export default StatCounter;
