
import React, { type FC } from 'react';
import ContentEditor from './sidebar/ContentEditor';

const Sidebar: FC = () => {
  return (
    <div className="w-[450px] h-full flex flex-col shadow-2xl bg-black/30 backdrop-blur-xl border-r border-[var(--border-color)] no-print">
      <header className="p-4 border-b border-[var(--border-color)]">
        <div>
          <h1 className="text-2xl font-bold text-white">Simple Resume Builder</h1>
          <p className="text-sm text-gray-400">Fill in your details below</p>
        </div>
      </header>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <ContentEditor />
      </div>
    </div>
  );
};

export default Sidebar;
