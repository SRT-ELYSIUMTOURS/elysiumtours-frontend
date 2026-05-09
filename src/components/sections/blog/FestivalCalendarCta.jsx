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
      <div className="mx-4 md:mx-8 lg:mx-[156px] px-6 md:px-[60px] lg:px-[100px] py-8 lg:py-5 bg-primary-normal-default h-auto lg:h-[238px] rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-lg h-full">
          {/* Left — two overlapping rotated card images */}
          <div className="relative w-[247px] h-[198px] shrink-0">
            {/* Back card (purple placeholder) */}
            <div
              className="absolute left-[56px] top-5 w-[144px] h-[157px] bg-secondary-light-default rounded-xl shadow-card"
              style={{ transform: "rotate(-21deg)" }}
            />
            {/* Front card (image) */}
            <div
              className="absolute left-0 top-5 w-[144px] h-[157px] rounded-xl shadow-card overflow-hidden"
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
          <div className="flex flex-col gap-lg items-start justify-center w-full lg:w-[946px]">
            <div className="flex flex-col items-start w-full">
              <h3 className="font-raleway font-bold text-[18px] md:text-[25px] leading-[34px] text-tertiary-normal-default">
                Your Year-Round Guide to Africa&apos;s Most Vibrant Festivals
              </h3>
              <p className="font-raleway font-normal text-[14px] md:text-[16px] leading-[24px] text-tertiary-normal-default w-full mt-[4px]">
                There&apos;s always something to celebrate! Explore Festival Calendar to find unique cultural events happening throughout the year. Whether you&apos;re drawn to the vibrant rhythms of a drum festival, the spiritual energy of a harvest celebration, or the color of a street carnival — there&apos;s always a new experience waiting.
              </p>
            </div>
            <Button
              variant="secondaryOutline"
              shape="pill"
              size="small"
              className="h-[40px]  rounded-xl border-[0.8px]"
              endIcon={
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
  <path d="M4.2104 12.2141L4.09307 12.9549L4.09307 12.9549L4.2104 12.2141ZM1.78591 9.7896L2.52668 9.67227V9.67227L1.78591 9.7896ZM12.2141 9.7896L12.9549 9.90693L12.9549 9.90693L12.2141 9.7896ZM9.7896 12.2141L9.90693 12.9549H9.90693L9.7896 12.2141ZM12.2666 5.96623C12.0178 5.63504 11.5476 5.56822 11.2164 5.81699C10.8853 6.06576 10.8184 6.53591 11.0672 6.8671L11.6669 6.41667L12.2666 5.96623ZM2.93279 6.8671C3.18156 6.53591 3.11474 6.06576 2.78355 5.81699C2.45236 5.56822 1.98221 5.63504 1.73345 5.96623L2.33312 6.41667L2.93279 6.8671ZM7.75 1.75C7.75 1.33579 7.41421 1 7 1C6.58579 1 6.25 1.33579 6.25 1.75H7H7.75ZM5.25435 7.11736C4.997 6.79279 4.52526 6.7383 4.2007 6.99565C3.87613 7.253 3.82163 7.72473 4.07898 8.0493L4.66667 7.58333L5.25435 7.11736ZM5.48208 8.61173L4.89439 9.0777V9.0777L5.48208 8.61173ZM8.51792 8.61173L7.93024 8.14576V8.14576L8.51792 8.61173ZM9.92102 8.0493C10.1784 7.72473 10.1239 7.253 9.7993 6.99565C9.47473 6.7383 9.003 6.79279 8.74565 7.11736L9.33333 7.58333L9.92102 8.0493ZM6.85378 9.90506L6.73577 10.6457H6.73577L6.85378 9.90506ZM7.14622 9.90506L7.26423 10.6457H7.26423L7.14622 9.90506ZM12.25 8.16667H11.5V8.75H12.25H13V8.16667H12.25ZM8.75 12.25V11.5H5.25V12.25V13H8.75V12.25ZM1.75 8.75H2.5V8.16667H1.75H1V8.75H1.75ZM5.25 12.25V11.5C4.67942 11.5 4.48145 11.4977 4.32772 11.4733L4.2104 12.2141L4.09307 12.9549C4.39279 13.0023 4.73674 13 5.25 13V12.25ZM1.75 8.75H1C1 9.26326 0.997672 9.60721 1.04514 9.90693L1.78591 9.7896L2.52668 9.67227C2.50233 9.51855 2.5 9.32058 2.5 8.75H1.75ZM4.2104 12.2141L4.32773 11.4733C3.40063 11.3265 2.67351 10.5994 2.52668 9.67227L1.78591 9.7896L1.04514 9.90693C1.29364 11.4759 2.52413 12.7064 4.09307 12.9549L4.2104 12.2141ZM12.25 8.75H11.5C11.5 9.32058 11.4977 9.51855 11.4733 9.67228L12.2141 9.7896L12.9549 9.90693C13.0023 9.60721 13 9.26326 13 8.75H12.25ZM8.75 12.25V13C9.26326 13 9.60721 13.0023 9.90693 12.9549L9.7896 12.2141L9.67228 11.4733C9.51855 11.4977 9.32058 11.5 8.75 11.5V12.25ZM12.2141 9.7896L11.4733 9.67227C11.3265 10.5994 10.5994 11.3265 9.67227 11.4733L9.7896 12.2141L9.90693 12.9549C11.4759 12.7064 12.7064 11.4759 12.9549 9.90693L12.2141 9.7896ZM12.25 8.16667H13C13 7.34208 12.7269 6.57912 12.2666 5.96623L11.6669 6.41667L11.0672 6.8671C11.3392 7.22915 11.5 7.67804 11.5 8.16667H12.25ZM1.75 8.16667H2.5C2.5 7.67804 2.66085 7.22915 2.93279 6.8671L2.33312 6.41667L1.73345 5.96623C1.27309 6.57912 1 7.34208 1 8.16667H1.75ZM7 1.75H6.25V9.33333H7H7.75V1.75H7ZM4.66667 7.58333L4.07898 8.0493L4.89439 9.0777L5.48208 8.61173L6.06976 8.14576L5.25435 7.11736L4.66667 7.58333ZM8.51792 8.61173L9.10561 9.0777L9.92102 8.0493L9.33333 7.58333L8.74565 7.11736L7.93024 8.14576L8.51792 8.61173ZM5.48208 8.61173L4.89439 9.0777C5.20815 9.47341 5.48256 9.82135 5.73182 10.0716C5.98443 10.3252 6.30413 10.577 6.73577 10.6457L6.85378 9.90506L6.97178 9.16441C7.00713 9.17004 6.96613 9.18523 6.79452 9.01296C6.61958 8.83734 6.40628 8.57018 6.06976 8.14576L5.48208 8.61173ZM8.51792 8.61173L7.93024 8.14576C7.59372 8.57018 7.38042 8.83734 7.20548 9.01296C7.03387 9.18523 6.99287 9.17004 7.02821 9.16441L7.14622 9.90506L7.26423 10.6457C7.69587 10.577 8.01557 10.3252 8.26818 10.0716C8.51744 9.82135 8.79185 9.47341 9.10561 9.0777L8.51792 8.61173ZM6.85378 9.90506L6.73577 10.6457C6.8232 10.6597 6.9115 10.6667 7 10.6667V9.91667V9.16667C6.99083 9.16667 6.98145 9.16595 6.97178 9.16441L6.85378 9.90506ZM7 9.91667V10.6667C7.0885 10.6667 7.1768 10.6597 7.26423 10.6457L7.14622 9.90506L7.02822 9.16441C7.01855 9.16595 7.00917 9.16667 7 9.16667V9.91667ZM7 9.33333H6.25V9.91667H7H7.75V9.33333H7Z" fill="#7B2CBF"/>
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
