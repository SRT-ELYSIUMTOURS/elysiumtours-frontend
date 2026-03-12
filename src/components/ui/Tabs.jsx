import React, { createContext, useContext, useState } from 'react';
import { classNames } from '../../utils/classNames';

const TabsContext = createContext();

export const Tabs = ({ defaultValue, value, onValueChange, className, children }) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const activeValue = value !== undefined ? value : internalValue;

  const handleValueChange = (newValue) => {
    if (value === undefined) setInternalValue(newValue);
    if (onValueChange) onValueChange(newValue);
  };

  return (
    <TabsContext.Provider value={{ activeValue, handleValueChange }}>
      <div className={classNames('flex flex-col', className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ className, children }) => {
  return (
    <div className={classNames(
      'flex items-center gap-4 mb-8 flex-wrap', // Base styles inspired by FAQ categories in Figma
      className
    )}>
      {children}
    </div>
  );
};

export const TabsTrigger = ({ value, className, children }) => {
  const { activeValue, handleValueChange } = useContext(TabsContext);
  const isActive = activeValue === value;

  return (
    <button
      type="button"
      onClick={() => handleValueChange(value)}
      className={classNames(
        'px-4 py-[9px] rounded-md border border-solid transition-all duration-300 ease-in',
        isActive 
          ? 'bg-secondary-normal-active text-primary-light-default border-primary-dark-default font-semibold' 
          : 'bg-transparent text-primary-dark-hover border-primary-dark-default font-medium hover:bg-secondary-light-default hover:text-secondary-normal-default',
        className
      )}
      style={{ fontSize: "13px", fontFamily: "Raleway, sans-serif" }}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, className, children }) => {
  const { activeValue } = useContext(TabsContext);
  
  if (activeValue !== value) return null;
  
  return (
    <div className={classNames('mt-2 animate-in fade-in duration-300', className)}>
      {children}
    </div>
  );
};
