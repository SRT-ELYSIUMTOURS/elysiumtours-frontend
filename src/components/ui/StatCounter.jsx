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
const StatItem = ({ value, label }) => (
  <div className="flex items-center gap-[40px]">
    {/* Value + label — VERTICAL gap:8 */}
    <div className="flex flex-col gap-[8px] w-[182px]">
      {/* Value — [56px/600] #7b2cbf */}
      <span className="text-Display-xl-semibold text-secondary-normal-default leading-none">
        {value}
      </span>
      {/* Label — [16px/500] #565656 */}
      <span className="text-md-Medium text-primary-dark-darker">
        {label}
      </span>
    </div>
    {/* Vertical divider — Line 2: 0×107 stroke:#d6beeb */}
    <div className="w-px h-[107px] bg-secondary-light-active shrink-0" />
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
        // Frame 26: HORIZONTAL gap:170
        "flex items-center gap-[170px]",
        className
      )}
      {...props}
    >
      {stats.map((stat, i) => (
        <StatItem key={i} value={stat.value} label={stat.label} />
      ))}
    </div>
  );
});

StatCounter.displayName = "StatCounter";
export { StatCounter, StatItem };
export default StatCounter;
