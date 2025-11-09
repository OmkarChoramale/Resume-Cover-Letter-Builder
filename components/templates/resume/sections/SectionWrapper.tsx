
import React, { type FC, type ReactNode } from 'react';

interface SectionWrapperProps {
    children: ReactNode;
    onDelete: () => void;
    onBringForward: () => void;
}

const SectionWrapper: FC<SectionWrapperProps> = ({ children, onDelete, onBringForward }) => {
    return (
        <div className="w-full h-full border-2 border-dashed border-transparent hover:border-blue-400 group relative bg-white overflow-hidden p-4">
            <div className="absolute top-1 right-1 z-20 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={onBringForward}
                    title="Bring to Front"
                    className="p-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                </button>
                <button
                    onClick={onDelete}
                    title="Delete Section"
                    className="p-1 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            <div className="w-full h-full overflow-auto">
                 {children}
            </div>
        </div>
    );
};

export default SectionWrapper;