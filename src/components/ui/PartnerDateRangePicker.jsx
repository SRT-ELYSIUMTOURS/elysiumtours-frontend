import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { classNames } from "../../utils/classNames";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function startOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function addMonths(d, n) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}

function sameDay(a, b) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function compareDay(a, b) {
  return startOfDay(a).getTime() - startOfDay(b).getTime();
}

function formatPillDate(d) {
  if (!d) return "—";
  return `${MONTH_NAMES[d.getMonth()]} ${d.getDate()} | ${d.getFullYear()}`;
}

/** Monday-first column index (0–6) for the first of month */
function mondayOffset(year, month) {
  const dow = new Date(year, month, 1).getDay(); // Sun 0
  return (dow + 6) % 7;
}

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ChevronNavLeft = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden className="text-[#565656]">
    <circle cx="16" cy="16" r="15.5" stroke="currentColor" strokeOpacity="0.35" />
    <path d="M18 10L12 16L18 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronNavRight = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden className="text-[#565656]">
    <circle cx="16" cy="16" r="15.5" stroke="currentColor" strokeOpacity="0.35" />
    <path d="M14 10L20 16L14 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function buildMonthCells(year, month) {
  const lead = mondayOffset(year, month);
  const dim = daysInMonth(year, month);
  const cells = [];

  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const prevDim = daysInMonth(prevYear, prevMonth);

  for (let i = 0; i < lead; i++) {
    const dayNum = prevDim - lead + i + 1;
    cells.push({
      date: new Date(prevYear, prevMonth, dayNum),
      inMonth: false,
      label: dayNum,
    });
  }

  for (let d = 1; d <= dim; d++) {
    cells.push({
      date: new Date(year, month, d),
      inMonth: true,
      label: d,
    });
  }

  let nextMonth = month === 11 ? 0 : month + 1;
  let nextYear = month === 11 ? year + 1 : year;
  let n = 1;
  while (cells.length % 7 !== 0 || cells.length < 42) {
    cells.push({
      date: new Date(nextYear, nextMonth, n),
      inMonth: false,
      label: n,
    });
    n += 1;
  }

  while (cells.length > 42 && cells.length > 35) {
    const lastRowEmpty = cells.slice(-7).every((c) => !c.inMonth);
    if (cells.length === 42 && lastRowEmpty) cells.splice(-7, 7);
    else break;
  }

  return cells;
}

function MonthGrid({
  year,
  month,
  rangeStart,
  rangeEnd,
  today,
  onDayClick,
}) {
  const cells = useMemo(() => buildMonthCells(year, month), [year, month]);

  const rows = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
  }

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4">
      <div className="flex h-[30px] items-center gap-0">
        {WEEKDAYS.map((wd) => (
          <div key={wd} className="flex flex-1 justify-center">
            <span className="font-raleway text-[16px] font-semibold leading-[22px] text-[#5c218f]">
              {wd}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        {rows.map((week, wi) => (
          <div key={wi} className="flex items-stretch gap-0">
            {week.map((cell, ci) => {
              const { date, inMonth, label } = cell;
              const d0 = startOfDay(date);
              const muted = !inMonth;

              const isToday =
                inMonth &&
                today &&
                sameDay(d0, today) &&
                date.getMonth() === month;

              let endpoint = false;
              let middle = false;
              if (inMonth && rangeStart) {
                if (!rangeEnd) {
                  endpoint = sameDay(d0, rangeStart);
                } else {
                  const lo =
                    compareDay(rangeStart, rangeEnd) <= 0 ? rangeStart : rangeEnd;
                  const hi =
                    compareDay(rangeStart, rangeEnd) <= 0 ? rangeEnd : rangeStart;
                  const t = d0.getTime();
                  const tLo = startOfDay(lo).getTime();
                  const tHi = startOfDay(hi).getTime();
                  if (t >= tLo && t <= tHi) {
                    if (t === tLo || t === tHi) endpoint = true;
                    else middle = true;
                  }
                }
              }

              const cellContent = (
                <button
                  type="button"
                  disabled={muted}
                  onClick={() => !muted && onDayClick(date)}
                  className={classNames(
                    "relative flex h-[60px] flex-1 flex-col items-center justify-center rounded-[12px] font-sans text-[20px] leading-[15px] transition-colors",
                    muted && "cursor-default text-[#e1e3ec]",
                    !muted && "cursor-pointer text-[#2d2d2d]",
                    isToday && !endpoint && !middle && "bg-[#f7f7f7]",
                    middle && "bg-[#f2eaf9]",
                    endpoint && "z-[1] font-semibold text-white"
                  )}
                >
                  {endpoint && (
                    <span
                      className="pointer-events-none absolute top-1/2 left-1/2 size-[60px] -translate-x-1/2 -translate-y-1/2 rounded-[40px] bg-[#7b2cbf] shadow-[0_0_4px_0_rgba(255,56,60,0.2)]"
                      aria-hidden
                    />
                  )}
                  <span className="relative z-[2]">{label}</span>
                </button>
              );

              return (
                <div key={`${wi}-${ci}`} className="relative flex min-w-0 flex-1">
                  {cellContent}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Fixed date-range picker anchored below the trigger (portal — avoids overflow clipping).
 */
const PartnerDateRangePicker = ({
  open,
  onClose,
  anchorRef,
  initialStart = null,
  initialEnd = null,
  onApply,
}) => {
  const [leftMonth, setLeftMonth] = useState(() => startOfMonth(new Date()));
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!open) return;
    setRangeStart(initialStart ? startOfDay(initialStart) : null);
    setRangeEnd(initialEnd ? startOfDay(initialEnd) : null);
    const anchor = initialStart || new Date();
    setLeftMonth(startOfMonth(anchor));
  }, [open, initialStart, initialEnd]);

  const updatePosition = useCallback(() => {
    const el = anchorRef?.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const panelWidth = Math.min(1060, window.innerWidth - 32);
    let left = r.left;
    if (left + panelWidth > window.innerWidth - 16) {
      left = Math.max(16, window.innerWidth - panelWidth - 16);
    }
    if (left < 16) left = 16;
    setPosition({
      top: r.bottom + 48,
      left,
    });
  }, [anchorRef]);

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const rightMonth = useMemo(() => addMonths(leftMonth, 1), [leftMonth]);

  const yearL = leftMonth.getFullYear();
  const monthL = leftMonth.getMonth();
  const yearR = rightMonth.getFullYear();
  const monthR = rightMonth.getMonth();

  const today = startOfDay(new Date());

  const handleDayClick = (day) => {
    const d = startOfDay(day);
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(d);
      setRangeEnd(null);
      return;
    }
    if (rangeStart && !rangeEnd) {
      if (compareDay(d, rangeStart) < 0) {
        setRangeEnd(rangeStart);
        setRangeStart(d);
      } else {
        setRangeEnd(d);
      }
    }
  };

  const handleReset = () => {
    setRangeStart(null);
    setRangeEnd(null);
  };

  const handleApply = () => {
    onApply?.({ start: rangeStart, end: rangeEnd });
    onClose?.();
  };

  const navPrev = () => setLeftMonth((m) => addMonths(m, -1));
  const navNext = () => setLeftMonth((m) => addMonths(m, 1));

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <>
      <button
        type="button"
        className="fixed inset-0 z-[100] cursor-default bg-transparent"
        aria-label="Close date picker"
        onClick={onClose}
      />
      <div
        className={classNames(
          "fixed z-[101] flex max-h-[min(830px,calc(100vh-96px))] w-[min(1060px,calc(100vw-32px))] flex-col overflow-hidden rounded-[32px] border border-[#f1f2f6] bg-white",
          "px-[48px] pb-[48px] pt-[36px] shadow-[0_13px_25px_0_rgba(132,139,166,0.13)]"
        )}
        style={{
          top: position.top,
          left: position.left,
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="partner-date-range-title"
      >
        <div className="flex shrink-0 flex-col items-end gap-7 self-stretch">
          <button
            type="button"
            onClick={onClose}
            className="text-[#565656] hover:text-secondary-normal-default cursor-pointer border-0 bg-transparent p-0"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
          <div className="h-[2px] w-full rounded-[20px] bg-[#7b2cbf] opacity-[0.18]" aria-hidden />
        </div>

        <div className="mt-6 flex min-h-0 flex-1 flex-col gap-10 overflow-y-auto overflow-x-hidden overscroll-contain [-webkit-overflow-scrolling:touch]">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-[353px]">
              <h2
                id="partner-date-range-title"
                className="font-raleway text-[25px] font-semibold leading-[29px] text-[#565656]"
              >
                When would you be traveling
              </h2>
            </div>
            <div className="flex h-[66px] min-w-0 shrink-0 items-center justify-between rounded-[40px] border-2 border-[#d6beeb] bg-white px-5 pl-[53px] sm:w-[266px]">
              <div className="flex min-w-0 flex-1 items-center justify-center gap-3">
                <div className="flex min-w-0 items-center gap-8">
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="font-raleway text-[13px] font-semibold leading-[18px] text-[#7b2cbf]">
                      Start Date
                    </span>
                    <span className="truncate font-raleway text-[13px] font-medium leading-[22px] text-[#565656]">
                      {formatPillDate(rangeStart)}
                    </span>
                  </div>
                  <div className="h-[42px] w-[2px] shrink-0 rounded-[10px] bg-[#ebdff5]" aria-hidden />
                </div>
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="font-raleway text-[13px] font-semibold leading-[18px] text-[#7b2cbf]">
                    End Date:
                  </span>
                  <span className="truncate font-raleway text-[13px] font-medium leading-[22px] text-[#565656]">
                    {formatPillDate(rangeEnd)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <button type="button" onClick={navPrev} className="shrink-0 border-0 bg-transparent p-0 cursor-pointer" aria-label="Previous months">
                  <ChevronNavLeft />
                </button>
                <span className="font-raleway text-[25px] font-semibold leading-[29px] text-[#565656]">
                  {MONTH_NAMES[monthL]} {yearL}
                </span>
              </div>
              <div className="flex items-center gap-6">
                <span className="font-raleway text-[25px] font-semibold leading-[29px] text-[#565656]">
                  {MONTH_NAMES[monthR]} {yearR}
                </span>
                <button type="button" onClick={navNext} className="shrink-0 border-0 bg-transparent p-0 cursor-pointer" aria-label="Next months">
                  <ChevronNavRight />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
              <MonthGrid
                year={yearL}
                month={monthL}
                rangeStart={rangeStart}
                rangeEnd={rangeEnd}
                today={today}
                onDayClick={handleDayClick}
              />
              <MonthGrid
                year={yearR}
                month={monthR}
                rangeStart={rangeStart}
                rangeEnd={rangeEnd}
                today={today}
                onDayClick={handleDayClick}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex shrink-0 flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="flex h-[56px] min-w-[169px] items-center justify-center rounded-[40px] bg-[#ebdff5] px-[10px] py-[10px] font-raleway text-[16px] font-semibold leading-[22px] text-[#565656] shadow-[0_4px_4px_0_rgba(0,0,0,0.05)] cursor-pointer border-0"
          >
            Reset Date
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex h-[56px] min-w-[169px] items-center justify-center rounded-[40px] bg-[#7b2cbf] px-[10px] py-[10px] font-raleway text-[16px] font-semibold leading-[22px] text-[#fefefe] shadow-[0_4px_4px_0_rgba(0,0,0,0.05)] cursor-pointer border-0"
          >
            Apply Date
          </button>
        </div>
      </div>
    </>,
    document.body
  );
};

export default PartnerDateRangePicker;
