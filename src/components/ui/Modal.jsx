import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { classNames } from '../../utils/classNames';

export const Modal = ({ isOpen, onClose, title, children, className, maxWidth = 'max-w-md' }) => {
  const modalRef = useRef(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const content = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
         onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside content
        className={classNames(
          'w-full bg-primary-light-default rounded-sm shadow-lg overflow-hidden flex flex-col',
          'transform animate-in zoom-in-95 duration-200 ease-out',
          maxWidth,
          className
        )}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-primary-dark-default">
          <h2 className="text-semi-md-bold text-tertiary-normal-default">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-primary-dark-darker hover:text-secondary-normal-default hover:bg-secondary-light-default rounded-full transition-colors"
            aria-label="Close modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: '75vh' }}>
          {children}
        </div>
      </div>
    </div>
  );

  // Consider rendering in a portal for robust stacking contexts, but for simple setups document.body works.
  // We added a 'toast-root' div in index.html, we can use a 'modal-root' or just document.body.
  return createPortal(content, document.body);
};

export default Modal;
