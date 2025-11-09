
import React, { useState, useRef, useEffect, type FC, type ReactNode } from 'react';

interface AccordionProps {
  title: string;
  children: ReactNode;
}

const Accordion: FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState('auto');
  
  useEffect(() => {
    if (contentRef.current) {
        setContentHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen, children]); // Re-calculate on children change

  return (
    <div className="border border-[var(--border-color)] rounded-lg bg-black/30 overflow-hidden transition-all duration-300 shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-black/20 hover:bg-black/40 focus:outline-none transition-colors"
      >
        <h3 className="font-semibold text-gray-200">{title}</h3>
        <span className={`transform transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
        </span>
      </button>
      <div
        ref={contentRef}
        style={{ maxHeight: contentHeight }}
        className="overflow-hidden transition-max-height duration-500 ease-in-out"
      >
        <div className="p-4 border-t border-[var(--border-color)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;