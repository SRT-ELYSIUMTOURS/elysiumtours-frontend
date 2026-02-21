import React, { useState, useCallback } from "react";
import { classNames } from "../../utils/classNames";

// From Figma: "Timer Picker" 1060×1041, fill:#ffffff stroke:#f1f3f7 r:32 pad:36/48/48/48
// "Dates Elements" VERTICAL gap:40
//   "Top": heading "When Are You Staying" [20px/600] #565656
//           date range "April 24 of 2025 - April 27 of 2025" [20px/400] #5c218f
//   "Calendars": "Dual calendar" HORIZONTAL gap:48
//     Left calendar + Right calendar (next month)
//   "Bot": "Picker" (time picker row)
//   "Button row": Reset Date (fill:#ebdff5) + Apply Date (fill:#7b2cbf)
// Selected range: start/end day fill:#7b2cbf circle; range days fill:#ebdff5
// Today: light highlight

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Mo","Tu","We","Th","Fr","Sa","Su"];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  // 0=Sun→6, convert to Mon-first (0=Mon…6=Sun)
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}
function isSameDay(a, b) {
  return a && b && a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate();
}
function isInRange(date, start, end) {
  if (!date || !start || !end) return false;
  const t = date.getTime(), s = start.getTime(), e = end.getTime();
  return t > Math.min(s,e) && t < Math.max(s,e);
}

const SingleCalendar = ({ year, month, startDate, endDate, hoverDate, onDayClick, onDayHover }) => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const prevMonthDays = getDaysInMonth(year, month - 1);
  const today = new Date();

  const cells = [];
  // Leading days from prev month
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: prevMonthDays - i, isCurrentMonth: false });
  }
  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, isCurrentMonth: true });
  }
  // Trailing days
  while (cells.length % 7 !== 0) {
    cells.push({ day: cells.length - daysInMonth - firstDay + 1, isCurrentMonth: false });
  }

  const rangeEnd = endDate || hoverDate;

  return (
    <div className="flex-1">
      {/* Month name */}
      <p className="text-center mb-4" style={{ fontSize:"16px", fontWeight:600, color:"#2d2d2d", fontFamily:"Raleway,sans-serif" }}>
        {MONTHS[month]} {year}
      </p>
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(d => (
          <div key={d} className="text-center" style={{ fontSize:"13px", fontWeight:600, color:"#7b2cbf", lineHeight:"32px", fontFamily:"Raleway,sans-serif" }}>{d}</div>
        ))}
      </div>
      {/* Day cells */}
      <div className="grid grid-cols-7">
        {cells.map((cell, i) => {
          if (!cell.isCurrentMonth) {
            return <div key={i} className="h-10 flex items-center justify-center" style={{ fontSize:"13px", color:"#d6beeb", fontFamily:"Raleway,sans-serif" }}>{cell.day}</div>;
          }
          const date = new Date(year, month, cell.day);
          const isStart = isSameDay(date, startDate);
          const isEnd = isSameDay(date, endDate);
          const inRange = isInRange(date, startDate, rangeEnd);
          const isToday = isSameDay(date, today);

          return (
            <div key={i}
              className={classNames("h-10 flex items-center justify-center cursor-pointer transition-all duration-200 ease-in",
                inRange ? "bg-secondary-light-default" : "",
              )}
            >
              <button
                type="button"
                onClick={() => onDayClick(date)}
                onMouseEnter={() => onDayHover(date)}
                className={classNames(
                  "w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 ease-in",
                  isStart || isEnd ? "bg-secondary-normal-default text-primary-light-default" : "",
                  isToday && !isStart && !isEnd ? "bg-secondary-light-default" : "",
                  !isStart && !isEnd && !isToday ? "hover:bg-secondary-light-default" : "",
                )}
                style={{ fontSize:"13px", fontWeight: isStart||isEnd ? 700 : 400,
                  color: isStart||isEnd ? "#fefefe" : "#2d2d2d", fontFamily:"Raleway,sans-serif" }}
              >
                {cell.day}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DateRangePicker = React.forwardRef(({
  startDate: controlledStart,
  endDate: controlledEnd,
  onApply,
  onClose,
  className = "",
  ...props
}, ref) => {
  const today = new Date();
  const [internalStart, setInternalStart] = useState(null);
  const [internalEnd, setInternalEnd] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [leftMonth, setLeftMonth] = useState({ year: today.getFullYear(), month: today.getMonth() });

  const start = controlledStart ?? internalStart;
  const end   = controlledEnd   ?? internalEnd;

  const rightMonth = leftMonth.month === 11
    ? { year: leftMonth.year + 1, month: 0 }
    : { year: leftMonth.year, month: leftMonth.month + 1 };

  const handleDayClick = useCallback((date) => {
    if (!start || (start && end)) {
      setInternalStart(date); setInternalEnd(null);
    } else {
      if (date < start) { setInternalEnd(start); setInternalStart(date); }
      else { setInternalEnd(date); }
    }
  }, [start, end]);

  const prevMonth = () => setLeftMonth(m => m.month === 0 ? { year: m.year-1, month: 11 } : { ...m, month: m.month-1 });
  const nextMonth = () => setLeftMonth(m => m.month === 11 ? { year: m.year+1, month: 0 } : { ...m, month: m.month+1 });

  const formatDate = (d) => d ? `${MONTHS[d.getMonth()].slice(0,3)} ${d.getDate()} | ${d.getFullYear()}` : "---";

  const handleReset = () => { setInternalStart(null); setInternalEnd(null); setHoverDate(null); };
  const handleApply = () => { onApply?.({ startDate: start, endDate: end }); onClose?.(); };

  return (
    // Timer Picker: fill:#ffffff stroke:#f1f3f7 r:32 pad:36/48/48/48
    <div
      ref={ref}
      className={classNames("bg-primary-light-default rounded-[32px] shadow-xl", className)}
      style={{ width:"1060px", padding:"36px 48px 48px 48px", border:"1px solid #f1f3f7" }}
      {...props}
    >
      {/* Close + divider — Frame 3088 */}
      <div className="flex flex-col gap-[28px] mb-[40px]">
        <div className="flex justify-end">
          <button type="button" onClick={onClose} className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-secondary-light-default transition-all duration-300 ease-in">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#7b2cbf" strokeWidth="1.5"/><path d="M15 9l-6 6M9 9l6 6" stroke="#7b2cbf" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>
        <div className="w-full h-[2px] rounded-[20px] bg-secondary-light-active" />
      </div>

      {/* Dates Elements — VERTICAL gap:40 */}
      <div className="flex flex-col gap-[40px]">

        {/* Top row: heading + date range display */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-[4px]">
            <span style={{ fontSize:"20px", fontWeight:600, color:"#565656", fontFamily:"Raleway,sans-serif" }}>When would you be traveling</span>
            <span style={{ fontSize:"20px", fontWeight:400, color:"#5c218f", fontFamily:"Raleway,sans-serif" }}>
              {start ? `${MONTHS[start.getMonth()]} ${start.getDate()} of ${start.getFullYear()}` : "Select start"}{" "}
              {end ? `- ${MONTHS[end.getMonth()]} ${end.getDate()} of ${end.getFullYear()}` : ""}
            </span>
          </div>
          {/* Start/End date badges — Input 266×66 fill:#ffffff stroke:#d6beeb r:40 */}
          <div className="flex items-center gap-[1px] border border-secondary-light-active rounded-[40px] overflow-hidden">
            <div className="px-5 py-3 flex flex-col gap-1 border-r border-secondary-light-active">
              <span style={{ fontSize:"11px", fontWeight:600, color:"#7b2cbf", fontFamily:"Raleway,sans-serif" }}>Start Date</span>
              <span style={{ fontSize:"13px", fontWeight:500, color:"#2d2d2d", fontFamily:"Raleway,sans-serif" }}>{formatDate(start)}</span>
            </div>
            <div className="px-5 py-3 flex flex-col gap-1">
              <span style={{ fontSize:"11px", fontWeight:600, color:"#7b2cbf", fontFamily:"Raleway,sans-serif" }}>End Date</span>
              <span style={{ fontSize:"13px", fontWeight:500, color:"#2d2d2d", fontFamily:"Raleway,sans-serif" }}>{formatDate(end)}</span>
            </div>
          </div>
        </div>

        {/* Calendars — HORIZONTAL gap:48 with prev/next nav */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <button type="button" onClick={prevMonth} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-secondary-light-default transition-all duration-300 ease-in">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#7b2cbf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button type="button" onClick={nextMonth} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-secondary-light-default transition-all duration-300 ease-in">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="#7b2cbf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
          {/* Dual calendar */}
          <div className="flex gap-[48px]">
            <SingleCalendar year={leftMonth.year} month={leftMonth.month}
              startDate={start} endDate={end} hoverDate={hoverDate}
              onDayClick={handleDayClick} onDayHover={setHoverDate} />
            <div className="w-px bg-primary-dark-default shrink-0" />
            <SingleCalendar year={rightMonth.year} month={rightMonth.month}
              startDate={start} endDate={end} hoverDate={hoverDate}
              onDayClick={handleDayClick} onDayHover={setHoverDate} />
          </div>
        </div>

        {/* Button row — HORIZONTAL gap:24 */}
        <div className="flex items-center justify-between">
          {/* Reset — fill:#ebdff5, text [16px/600] #565656 */}
          <button type="button" onClick={handleReset}
            className="px-6 rounded-[40px] transition-all duration-300 ease-in hover:opacity-80"
            style={{ height:"56px", backgroundColor:"#ebdff5", fontSize:"16px", fontWeight:600, color:"#565656", fontFamily:"Raleway,sans-serif" }}>
            Reset Date
          </button>
          {/* Apply — fill:#7b2cbf, text [16px/600] #fefefe */}
          <button type="button" onClick={handleApply}
            className="px-6 rounded-[40px] bg-secondary-normal-default hover:bg-secondary-normal-hover active:bg-secondary-normal-active transition-all duration-300 ease-in"
            style={{ height:"56px", fontSize:"16px", fontWeight:600, color:"#fefefe", fontFamily:"Raleway,sans-serif" }}>
            Apply Date
          </button>
        </div>
      </div>
    </div>
  );
});

DateRangePicker.displayName = "DateRangePicker";
export default DateRangePicker;
