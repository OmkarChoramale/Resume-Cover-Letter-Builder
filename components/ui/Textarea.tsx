
import React, { type TextareaHTMLAttributes, type FC } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const Textarea: FC<TextareaProps> = ({ label, ...props }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
       <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-0 group-focus-within:opacity-75 transition duration-200"></div>
        <textarea
            {...props}
            className="relative w-full px-3 py-2 border border-[var(--border-color)] rounded-lg bg-black/30 text-white focus:outline-none transition-shadow"
        />
       </div>
    </div>
  );
};

export default Textarea;