import React from "react";
import { classNames } from "../../utils/classNames";

const PopularTourCardSkeleton = ({ className = "" }) => (
  <div
    className={classNames(
      "relative flex flex-col gap-[12px] items-center p-[10px]",
      "w-full max-w-[351px] min-h-[660px] shrink-0",
      className
    )}
  >
    {/* Image area */}
    <div className="relative h-[373px] w-full max-w-[331px] shrink-0 rounded-[10px] overflow-clip bg-gray-200 animate-pulse">
      {/* Type badge */}
      <div className="absolute top-[22px] left-[12px] h-[24px] w-[90px] rounded-[16px] bg-gray-300" />
      {/* Heart button */}
      <div className="absolute top-[16px] right-[12px] size-[34px] rounded-full bg-gray-300" />
      {/* Location */}
      <div className="absolute left-[12px] top-[333px] h-[14px] w-[110px] rounded bg-gray-300" />
      {/* Rating */}
      <div className="absolute left-[237px] top-[336px] h-[24px] w-[62px] rounded-[16px] bg-gray-300" />
    </div>

    {/* Body */}
    <div className="flex flex-col gap-[8px] flex-1 min-h-[210px] items-start py-[8px] w-full max-w-[330px]">
      {/* Tag pills */}
      <div className="flex gap-[10px]">
        <div className="h-[28px] w-[65px] rounded-[20px] bg-gray-200 animate-pulse" />
        <div className="h-[28px] w-[55px] rounded-[20px] bg-gray-200 animate-pulse" />
        <div className="h-[28px] w-[75px] rounded-[20px] bg-gray-200 animate-pulse" />
      </div>

      {/* Info row */}
      <div className="flex gap-[12px] items-center">
        <div className="h-[14px] w-[55px] rounded bg-gray-200 animate-pulse" />
        <div className="h-[14px] w-[45px] rounded bg-gray-200 animate-pulse" />
        <div className="h-[14px] w-[90px] rounded bg-gray-200 animate-pulse" />
      </div>

      {/* Divider */}
      <div className="h-[1px] w-full bg-gray-200 animate-pulse" />

      {/* Title */}
      <div className="mt-2 h-[28px] w-full rounded bg-gray-200 animate-pulse" />

      {/* Availability */}
      <div className="h-[18px] w-[110px] rounded bg-gray-200 animate-pulse" />

      {/* Price */}
      <div className="mt-auto flex gap-[6px] items-center">
        <div className="h-[14px] w-[28px] rounded bg-gray-200 animate-pulse" />
        <div className="h-[22px] w-[95px] rounded bg-gray-200 animate-pulse" />
        <div className="h-[14px] w-[45px] rounded bg-gray-200 animate-pulse" />
      </div>
    </div>
  </div>
);

export default PopularTourCardSkeleton;
