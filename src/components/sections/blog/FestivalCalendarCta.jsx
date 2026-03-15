import React from "react";
import { classNames } from "../../../utils/classNames";
import Button from "../../ui/button";

const FestivalCalendarCta = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={classNames(
        "w-full bg-secondary-light-default py-[80px]",
        className
      )}
      {...props}
    >
      <div className="mx-[156px] bg-primary-normal-default h-[238px] rounded-xl overflow-hidden">
        <div className="flex items-center gap-lg h-full px-[24px]">
          {/* Left — two overlapping rotated card images */}
          <div className="relative w-[247px] h-[198px] shrink-0">
            {/* Back card (purple placeholder) */}
            <div
              className="absolute left-[56px] top-0 w-[144px] h-[157px] bg-secondary-light-default rounded-xl shadow-card"
              style={{ transform: "rotate(-21deg)" }}
            />
            {/* Front card (image) */}
            <div
              className="absolute left-0 top-0 w-[144px] h-[157px] rounded-xl shadow-card overflow-hidden"
              style={{ transform: "rotate(-21deg)" }}
            >
              <img
                src="https://picsum.photos/seed/festival-cal/144/157"
                alt="Festival calendar"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-overlay-medium rounded-xl" />
            </div>
          </div>

          {/* Right — title + description + download button */}
          <div className="flex flex-col gap-lg items-start justify-center w-[946px]">
            <div className="flex flex-col items-start w-full">
              <h3 className="font-raleway font-bold text-[25px] leading-[34px] text-tertiary-normal-default">
                Your Year-Round Guide to Africa&apos;s Most Vibrant Festivals
              </h3>
              <p className="font-raleway font-normal text-[16px] leading-[24px] text-tertiary-normal-default w-[913px] mt-[4px]">
                There&apos;s always something to celebrate! Explore Festival Calendar to find unique cultural events happening throughout the year. Whether you&apos;re drawn to the vibrant rhythms of a drum festival, the spiritual energy of a harvest celebration, or the color of a street carnival — there&apos;s always a new experience waiting.
              </p>
            </div>
            <Button
              variant="secondaryOutline"
              shape="pill"
              size="small"
              className="h-[40px] gap-[9px] rounded-xl border-[0.8px]"
              endIcon={
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2.33337V9.33337M7 9.33337L10.5 5.83337M7 9.33337L3.5 5.83337" stroke="#7b2cbf" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2.33337 11.6666H11.6667" stroke="#7b2cbf" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              }
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});

FestivalCalendarCta.displayName = "FestivalCalendarCta";
export default FestivalCalendarCta;
