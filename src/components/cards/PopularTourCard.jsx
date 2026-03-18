import React from "react";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../utils/classNames";
import StarRating from "../ui/StarRating";

const MapIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 13.5C13.933 13.5 15.5 11.933 15.5 10C15.5 8.067 13.933 6.5 12 6.5C10.067 6.5 8.5 8.067 8.5 10C8.5 11.933 10.067 13.5 12 13.5Z"
      stroke="#6f6f6f"
      strokeWidth="1.5"
    />
    <path
      d="M12 2C8.134 2 5 5.134 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.134 15.866 2 12 2Z"
      stroke="#6f6f6f"
      strokeWidth="1.5"
    />
  </svg>
);

const PeopleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <g clip-path="url(#clip0_3214_39142)">
      <path
        d="M10 5.16675H9.5C9.5 5.99518 8.82843 6.66675 8 6.66675V7.16675V7.66675C9.38071 7.66675 10.5 6.54746 10.5 5.16675H10ZM8 7.16675V6.66675C7.17157 6.66675 6.5 5.99518 6.5 5.16675H6H5.5C5.5 6.54746 6.61929 7.66675 8 7.66675V7.16675ZM6 5.16675H6.5C6.5 4.33832 7.17157 3.66675 8 3.66675V3.16675V2.66675C6.61929 2.66675 5.5 3.78604 5.5 5.16675H6ZM8 3.16675V3.66675C8.82843 3.66675 9.5 4.33832 9.5 5.16675H10H10.5C10.5 3.78604 9.38071 2.66675 8 2.66675V3.16675ZM6 9.16675V9.66675H10V9.16675V8.66675H6V9.16675ZM10 13.1667V12.6667H6V13.1667V13.6667H10V13.1667ZM6 13.1667V12.6667C5.17157 12.6667 4.5 11.9952 4.5 11.1667H4H3.5C3.5 12.5475 4.61929 13.6667 6 13.6667V13.1667ZM12 11.1667H11.5C11.5 11.9952 10.8284 12.6667 10 12.6667V13.1667V13.6667C11.3807 13.6667 12.5 12.5475 12.5 11.1667H12ZM10 9.16675V9.66675C10.8284 9.66675 11.5 10.3383 11.5 11.1667H12H12.5C12.5 9.78604 11.3807 8.66675 10 8.66675V9.16675ZM6 9.16675V8.66675C4.61929 8.66675 3.5 9.78604 3.5 11.1667H4H4.5C4.5 10.3383 5.17157 9.66675 6 9.66675V9.16675Z"
        fill="currentColor"
      />
      <path
        d="M5.16818 6.92585C5.06302 6.75693 4.86572 6.66675 4.66675 6.66675C3.83832 6.66675 3.16675 5.99517 3.16675 5.16675C3.16675 4.33832 3.83832 3.66675 4.66675 3.66675C4.86572 3.66675 5.06302 3.57657 5.16818 3.40765C5.17283 3.40017 5.1775 3.39272 5.18221 3.38529C5.35728 3.10895 5.26858 2.71768 4.94342 2.68188C4.85257 2.67188 4.76026 2.66675 4.66675 2.66675C3.28604 2.66675 2.16675 3.78604 2.16675 5.16675C2.16675 6.54746 3.28604 7.66675 4.66675 7.66675C4.76026 7.66675 4.85257 7.66161 4.94342 7.65161C5.26858 7.61581 5.35728 7.22454 5.18221 6.9482C5.17751 6.94077 5.17283 6.93332 5.16818 6.92585Z"
        fill="currentColor"
      />
      <path
        d="M3.13894 12.2113C3.06326 12.0851 2.92968 12.0001 2.78247 12.0001H2.66675C1.83832 12.0001 1.16675 11.3285 1.16675 10.5001C1.16675 9.67165 1.83832 9.00008 2.66675 9.00008H2.78247C2.92968 9.00008 3.06326 8.9151 3.13894 8.78884C3.32367 8.48063 3.1232 8.00008 2.76388 8.00008H2.66675C1.28604 8.00008 0.166748 9.11937 0.166748 10.5001C0.166748 11.8808 1.28604 13.0001 2.66675 13.0001H2.76388C3.1232 13.0001 3.32367 12.5195 3.13894 12.2113Z"
        fill="currentColor"
      />
      <path
        d="M10.8179 6.9482C10.6429 7.22454 10.7316 7.61581 11.0567 7.65161C11.1476 7.66161 11.2399 7.66675 11.3334 7.66675C12.7141 7.66675 13.8334 6.54746 13.8334 5.16675C13.8334 3.78604 12.7141 2.66675 11.3334 2.66675C11.2399 2.66675 11.1476 2.67188 11.0567 2.68188C10.7316 2.71768 10.6429 3.10895 10.8179 3.38529C10.8227 3.39272 10.8273 3.40017 10.832 3.40764C10.9371 3.57656 11.1344 3.66675 11.3334 3.66675C12.1618 3.66675 12.8334 4.33832 12.8334 5.16675C12.8334 5.99517 12.1618 6.66675 11.3334 6.66675C11.1344 6.66675 10.9371 6.75693 10.832 6.92585C10.8273 6.93332 10.8227 6.94077 10.8179 6.9482Z"
        fill="currentColor"
      />
      <path
        d="M12.8612 12.2113C12.6765 12.5195 12.877 13.0001 13.2363 13.0001H13.3334C14.7141 13.0001 15.8334 11.8808 15.8334 10.5001C15.8334 9.11937 14.7141 8.00008 13.3334 8.00008H13.2363C12.877 8.00008 12.6765 8.48063 12.8612 8.78884C12.9369 8.9151 13.0705 9.00008 13.2177 9.00008H13.3334C14.1618 9.00008 14.8334 9.67165 14.8334 10.5001C14.8334 11.3285 14.1618 12.0001 13.3334 12.0001H13.2177C13.0705 12.0001 12.9369 12.0851 12.8612 12.2113Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_3214_39142">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const CarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
  >
    <path
      d="M2.66675 8L4.00008 8.66667"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.3333 8.33325L14 8.66659"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6.33325 11.6667L6.49703 11.2572C6.74059 10.6483 6.86237 10.3439 7.11633 10.1719C7.37027 10 7.69819 10 8.35399 10H9.64585C10.3017 10 10.6296 10 10.8835 10.1719C11.1375 10.3439 11.2593 10.6483 11.5028 11.2572L11.6666 11.6667"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2.33325 11.3333V13.2546C2.33325 13.5071 2.49375 13.7379 2.74784 13.8509C2.91271 13.9241 3.07017 13.9999 3.26031 13.9999H4.4062C4.59633 13.9999 4.7538 13.9241 4.91867 13.8509C5.17275 13.7379 5.33325 13.5071 5.33325 13.2546V11.9999"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12.6667 11.9999V13.2546C12.6667 13.5071 12.8273 13.7379 13.0813 13.8509C13.2462 13.9241 13.4037 13.9999 13.5938 13.9999H14.7397C14.9298 13.9999 15.0873 13.9241 15.2521 13.8509C15.5062 13.7379 15.6667 13.5071 15.6667 13.2546V11.3333"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M14.3333 5.66659L14.9999 5.33325"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M3.66667 5.66659L3 5.33325"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M4 6L4.72553 3.82339C5.01888 2.94337 5.16555 2.50335 5.51473 2.25168C5.86391 2 6.32773 2 7.25536 2H10.7447C11.6723 2 12.1361 2 12.4853 2.25168C12.8345 2.50335 12.9811 2.94337 13.2745 3.82339L14 6"
      stroke="currentColor"
      stroke-linejoin="round"
    />
    <path
      d="M3.99992 6H13.9999C14.6381 6.67567 15.6666 7.6166 15.6666 8.6664V10.9801C15.6666 11.3605 15.4136 11.6805 15.0778 11.725L12.9999 12H4.99992L2.92203 11.725C2.58629 11.6805 2.33325 11.3605 2.33325 10.9801V8.6664C2.33325 7.6166 3.36178 6.67567 3.99992 6Z"
      stroke="currentColor"
      stroke-linejoin="round"
    />
  </svg>
);

const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M8.82131 18.315C10.3449 20.5617 13.6549 20.5617 15.1785 18.315L20.4072 10.6049C21.3798 9.17074 21.4326 7.29379 20.5527 5.80092C18.7951 2.81898 14.4401 2.86144 12.7825 5.9001C12.4446 6.51949 11.5552 6.51949 11.2173 5.9001C9.55975 2.86145 5.20477 2.819 3.44718 5.80093C2.56727 7.29379 2.62007 9.17073 3.59267 10.6049L8.82131 18.315Z"
      stroke="#7B2CBF"
      stroke-width="1.5"
    />
  </svg>
);

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <g clip-path="url(#clip0_3214_39136)">
      <path
        d="M8.50004 5.33325C8.50004 5.05711 8.27618 4.83325 8.00004 4.83325C7.7239 4.83325 7.50004 5.05711 7.50004 5.33325L8.00004 5.33325H8.50004ZM9.48214 10.0996C9.72129 10.2377 10.0271 10.1557 10.1652 9.91658C10.3032 9.67743 10.2213 9.37164 9.98213 9.23357L9.73214 9.66658L9.48214 10.0996ZM1.68769 1.77615C1.47206 1.94866 1.4371 2.2633 1.60961 2.47893C1.78211 2.69456 2.09676 2.72952 2.31239 2.55702L2.00004 2.16659L1.68769 1.77615ZM3.97905 1.22369C4.19469 1.05118 4.22965 0.736535 4.05714 0.520904C3.88464 0.305273 3.56999 0.270313 3.35436 0.442818L3.66671 0.833252L3.97905 1.22369ZM13.6877 2.55702C13.9033 2.72952 14.218 2.69456 14.3905 2.47893C14.563 2.2633 14.528 1.94866 14.3124 1.77615L14 2.16659L13.6877 2.55702ZM12.6457 0.442818C12.4301 0.270313 12.1154 0.305273 11.9429 0.520904C11.7704 0.736535 11.8054 1.05118 12.021 1.22369L12.3334 0.833252L12.6457 0.442818ZM8.14518 8.25986L8.60889 8.07286L8.14518 8.25986ZM8.42485 8.74425L8.03105 9.05235L8.42485 8.74425ZM8.00004 5.33325L7.50004 5.33325V6.66655H8.00004H8.50004L8.50004 5.33325H8.00004ZM14.6667 7.99992H14.1667C14.1667 11.4057 11.4058 14.1666 8.00004 14.1666V14.6666V15.1666C11.9581 15.1666 15.1667 11.958 15.1667 7.99992H14.6667ZM8.00004 14.6666V14.1666C4.59428 14.1666 1.83337 11.4057 1.83337 7.99992H1.33337H0.833374C0.833374 11.958 4.042 15.1666 8.00004 15.1666V14.6666ZM1.33337 7.99992H1.83337C1.83337 4.59416 4.59428 1.83325 8.00004 1.83325V1.33325V0.833252C4.042 0.833252 0.833374 4.04188 0.833374 7.99992H1.33337ZM8.00004 1.33325V1.83325C11.4058 1.83325 14.1667 4.59416 14.1667 7.99992H14.6667H15.1667C15.1667 4.04188 11.9581 0.833252 8.00004 0.833252V1.33325ZM2.00004 2.16659L2.31239 2.55702L3.97905 1.22369L3.66671 0.833252L3.35436 0.442818L1.68769 1.77615L2.00004 2.16659ZM14 2.16659L14.3124 1.77615L12.6457 0.442818L12.3334 0.833252L12.021 1.22369L13.6877 2.55702L14 2.16659ZM8.00004 6.66655H7.50004C7.50004 7.44711 7.49143 7.9756 7.68146 8.44685L8.14518 8.25986L8.60889 8.07286C8.50865 7.82428 8.50004 7.53051 8.50004 6.66655H8.00004ZM9.73214 9.66658L9.98213 9.23357C9.23391 8.8016 8.9838 8.64725 8.81865 8.43616L8.42485 8.74425L8.03105 9.05235C8.34415 9.45254 8.80615 9.70933 9.48214 10.0996L9.73214 9.66658ZM8.14518 8.25986L7.68146 8.44685C7.76905 8.66406 7.88673 8.86789 8.03105 9.05235L8.42485 8.74425L8.81865 8.43616C8.73206 8.32548 8.66145 8.20319 8.60889 8.07286L8.14518 8.25986Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_3214_39136">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const PopularTourCard = React.forwardRef(
  (
    {
      image,
      location = "Cape coast/Central Region",
      rating = 4.9,
      title = "The Homecoming Experience to Kakum National Park",
      availabilityBadge = "Opened Daily",
      price = "Ghs.400.00",
      onClick,
      className = "",
      duration = { class: "Multi-Day", span: "3 Days/2 days" },
      maxGroupSize = 12,
      pickupIncluded = false,
      tags,
      country,
      tourSlug,
      ...props
    },
    ref
  ) => {
    const navigate = useNavigate();

    const handleClick = (e) => {
      if (onClick) {
        onClick(e);
      } else if (country && tourSlug) {
        navigate(`/tours/${country}/${tourSlug}`);
      }
    };

    return (
      <div
        ref={ref}
        onClick={handleClick}
        className={classNames(
          "relative flex flex-col  rounded-[var(--radius-sm)]",
          "bg-transparent transition-all duration-300 ease-in",
          "hover:-translate-y-1 cursor-pointer",
          className
        )}
        {...props}
      >
        {/* ── Hero Image ── */}
        <div className="relative w-full h-[373px] shrink-0 overflow-hidden rounded-[var(--radius-sm)]">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-primary-normal-default" />
          )}

          {/* Tag */}
          <div className="absolute top-5 left-[15px] px-2.5 py-2 bg-[#FEFEFE] rounded-[16px] text-sm-semibold shadow-sm  text-secondary-normal-active">
            {duration.class}
          </div>

          {/* Heart button */}
          <button
            onClick={(e) => e.stopPropagation()}
            className={classNames(
              "absolute top-5 right-[15px] w-[34px] h-[34px] cursor-pointer",
              "flex items-center justify-center",
              "bg-primary-light-default rounded-full shadow",
              "transition-all duration-300 ease-in hover:bg-secondary-light-default"
            )}
            aria-label="Save to wishlist"
          >
            <HeartIcon />
          </button>

          {/* Location */}
          <div className="flex items-center  absolute bottom-1.5 left-3 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M6 2.66675C5.2963 2.66675 4.59259 2.88897 4 3.33341L2.53333 4.43341C2.19759 4.68522 2 5.08041 2 5.50008V11.2528C2 12.3161 3.21389 12.923 4.06452 12.285C4.63799 11.8549 5.319 11.6399 6 11.6399M6 2.66675C6.7037 2.66675 7.40741 2.88897 8 3.33341L8.06452 3.3818C8.63799 3.81191 9.319 4.02696 10 4.02696M6 2.66675V3.16675V11.1667V11.6399M10 4.02696C10.681 4.02696 11.362 3.81191 11.9355 3.3818C12.7861 2.74383 14 3.35078 14 4.41406V10.1667C14 10.5864 13.8024 10.9816 13.4667 11.2334L12 12.3334C11.4074 12.7779 10.7037 13.0001 10 13.0001M10 4.02696V4.50008V12.5001V13.0001M10 13.0001C9.2963 13.0001 8.59259 12.7779 8 12.3334L7.93548 12.285C7.36201 11.8549 6.681 11.6399 6 11.6399"
                stroke="#FEFEFE"
                stroke-linecap="round"
              />
            </svg>
            <span className="p-2.5 text-[#FEFEFE] text-sm-Medium ">
              {location}
            </span>
          </div>

          {/* Rating */}
          <div className="px-2.5 py-2 bg-secondary-light-hover absolute bottom-[13px] right-[15px] rounded-[16px] gap-0.5 flex items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="10"
              viewBox="0 0 11 10"
              fill="none"
            >
              <path
                d="M4.10607 0.690968C4.40542 -0.230343 5.70883 -0.230344 6.00819 0.690967L6.51647 2.25531C6.65034 2.66733 7.0343 2.94629 7.46753 2.94629H9.11237C10.0811 2.94629 10.4839 4.1859 9.70015 4.75531L8.36945 5.72212C8.01896 5.97676 7.8723 6.42813 8.00618 6.84015L8.51446 8.40449C8.81381 9.3258 7.75933 10.0919 6.97562 9.52253L5.64491 8.55571C5.29443 8.30107 4.81983 8.30107 4.46934 8.55571L3.13864 9.52253C2.35492 10.0919 1.30044 9.3258 1.5998 8.40449L2.10808 6.84015C2.24195 6.42813 2.0953 5.97676 1.74481 5.72212L0.414104 4.75531C-0.369609 4.18591 0.0331654 2.94629 1.00189 2.94629H2.64673C3.07996 2.94629 3.46391 2.66733 3.59779 2.25531L4.10607 0.690968Z"
                fill="#7B2CBF"
              />
            </svg>
            <span className="flex text-sm-semibold text-secondary-normal-default gap-0.5 ">
              {rating}
              <div className=" size-0.5 mt-[5px] bg-secondary-normal-default" />
              <span className="text-primary-dark-darker/60">231</span>
            </span>
          </div>
        </div>

        {/* ── Card body ── no background */}
        <div className="flex flex-col gap-2  py-5">
          {/* Tags */}
          <div className="flex items-center gap-2.5">
            {tags &&
              tags.map((tag) => (
                <span className="px-5 py-2.5 rounded-[20px] text-sm-Medium text-primary-dark-darker border border-[#6F6F6F]/60">
                  {tag}
                </span>
              ))}
          </div>

          {/* Info */}
          <div className="flex items-center gap-3">
            {/* duration span */}
            <div className="flex items-center text-secondary-normal-default">
              <ClockIcon />
              <span className="text-sm-semibold p-2.5 text-secondary-normal-default">
                {duration.span}
              </span>
            </div>
            {/* maxGroupSize */}
            <div className="flex items-center text-secondary-normal-default">
              <PeopleIcon />
              <span className="text-sm-semibold p-2.5 text-secondary-normal-default">
                Max {maxGroupSize}
              </span>
            </div>
            {/* pickupAvailability */}
            {pickupIncluded && (
              <div className="flex items-center text-secondary-normal-default">
                <CarIcon />
                <span className="text-sm-semibold p-2.5 text-secondary-normal-default">
                  Pickup Included
                </span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-semi-md-semibold text-tertiary-normal-default leading-snug line-clamp-2 mt-1">
            {title}
          </h3>

          {/* Availability */}
          <div className="inline-flex items-center text-secondary-normal-default gap-2.5 mt-1">
            <ClockIcon />
            <span className="text-med-small-semibold ">
              {availabilityBadge}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-4 mt-1">
            <span className="text-med-small-Medium text-tertiary-normal-default">
              From
            </span>
            <span className="text-semi-md-bold text-secondary-dark-default">
              {price}
              <span className="text-med-small-Medium text-tertiary-normal-default">/Person</span>
            </span>
          </div>
        </div>
      </div>
    );
  }
);

PopularTourCard.displayName = "PopularTourCard";
export default PopularTourCard;
