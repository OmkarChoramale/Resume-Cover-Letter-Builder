
import React, { type FC, type InputHTMLAttributes } from 'react';

interface ColorInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const ColorInput: FC<ColorInputProps> = ({ label, value, ...props }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      <div className="relative flex items-center border border-white/20 rounded-lg shadow-sm overflow-hidden bg-white/5">
        <div className="w-10 h-10 flex items-center justify-center">
           <div style={{ backgroundColor: value as string }} className="w-6 h-6 rounded-full border border-white/20"></div>
        </div>
        <input
          type="color"
          {...props}
          value={value}
          className="absolute opacity-0 w-10 h-10 cursor-pointer"
        />
        <span className="px-3 text-gray-200 w-full text-left">{value}</span>
      </div>
    </div>
  );
};

export default ColorInput;