import React from 'react';
import { classNames } from '../../utils/classNames';

/**
 * Basic Skeleton primitive for building placeholder loaders.
 */
export const Skeleton = ({ className, ...rest }) => {
  return (
    <div
      className={classNames(
        "animate-pulse bg-[#dbd4e5] rounded-md", 
        className
      )}
      {...rest}
    />
  );
};

/**
 * Pre-composed Card Skeleton matching the Tour Card structure from Figma.
 */
export const CardSkeleton = () => {
  return (
    <div className="flex flex-col w-full max-w-[280px]">
      {/* Large Image Placeholder */}
      <Skeleton className="w-full aspect-3/4 rounded-[24px] mb-3" />
      
      {/* Details List */}
      <div className="flex flex-col gap-2">
        {/* Row 1 */}
        <div className="flex items-center gap-2">
          <Skeleton className="w-3 h-3 rounded-full" />
          <Skeleton className="w-20 h-3 rounded-[4px]" />
        </div>
        {/* Row 2 */}
        <div className="flex items-center gap-2">
          <Skeleton className="w-3 h-3 rounded-full" />
          <Skeleton className="w-10 h-3 rounded-[4px]" />
        </div>
        
        {/* Title/Price Bar */}
        <Skeleton className="w-full h-8 rounded-[8px] my-1" />
        
        {/* Row 3 */}
        <div className="flex items-center gap-2">
          <Skeleton className="w-3 h-3 rounded-full" />
          <Skeleton className="w-24 h-3 rounded-[4px]" />
        </div>
        {/* Row 4 */}
        <div className="flex items-center gap-2">
          <Skeleton className="w-3 h-3 rounded-full" />
          <Skeleton className="w-14 h-3 rounded-[4px]" />
        </div>
      </div>
    </div>
  );
};
