import React from "react";
import { classNames } from "../../../utils/classNames";

const GalleryCardSkeleton = ({ className = "" }) => (
  <div
    className={classNames(
      "w-full rounded-[16px] bg-[#e5e7eb] animate-pulse",
      className
    )}
    aria-hidden="true"
  />
);

export default GalleryCardSkeleton;
