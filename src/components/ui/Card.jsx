import React from 'react';
import { classNames } from '../../utils/classNames';

/**
 * Generic Card container component.
 * Applies the standard drop shadow and border radius from the design tokens.
 */
export const Card = ({ className, children, ...props }) => (
  <div 
    className={classNames(
      'bg-primary-light-default rounded-sm shadow overflow-hidden flex flex-col',
      'border border-primary-dark-default transition-all duration-300 hover:shadow-lg hover:border-secondary-light-default',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ className, children, ...props }) => (
  <div className={classNames('p-5 pb-0 flex flex-col gap-2', className)} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ className, children, ...props }) => (
  <h3 className={classNames('text-md-semibold text-tertiary-normal-default leading-tight tracking-tight', className)} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ className, children, ...props }) => (
  <p className={classNames('text-sm-Medium text-primary-dark-darker', className)} {...props}>
    {children}
  </p>
);

export const CardContent = ({ className, children, ...props }) => (
  <div className={classNames('p-5 flex-1', className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ className, children, ...props }) => (
  <div className={classNames('flex items-center p-5 pt-0', className)} {...props}>
    {children}
  </div>
);

const CardComponent = Object.assign(Card, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter
});

export default CardComponent;

