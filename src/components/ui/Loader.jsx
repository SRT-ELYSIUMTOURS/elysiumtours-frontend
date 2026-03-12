import React from 'react';
import { classNames } from '../../utils/classNames';

export const Loader = ({ size = 'medium', className, color = 'text-secondary-normal-default' }) => {
  const sizeClasses = {
    small: 'w-4 h-4 text-sm',
    medium: 'w-8 h-8 text-md',
    large: 'w-12 h-12 text-lg',
  };

  return (
    <div className={classNames('flex justify-center items-center', className)} role="status">
      <svg
        className={classNames('animate-spin', sizeClasses[size], color)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-20"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
