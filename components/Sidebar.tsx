
import React, { type FC } from 'react';
import ContentEditor from './sidebar/ContentEditor';
import { useResumeStore } from '../../hooks/useResumeStore';

const Sidebar: FC = () => {
  const { selectDocument } = useResumeStore();

  return (
    <div className="w-[450px] h-full flex flex-col shadow-2xl bg-black/30 backdrop-blur-xl border-r border-[var(--border-color)] no-print">
      <header className="p-4 border-b border-[var(--border-color)] flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white">Elegance<span style={{color: 'var(--accent)'}}>AI</span></h1>
          <p className="text-sm text-gray-400">Document Editor</p>
        </div>
        <button 
          onClick={() => selectDocument(null)}
          className="py-1 px-3 text-sm bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 transition-colors"
        >
          &larr; Dashboard
        </button>
      </header>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <ContentEditor />
      </div>
    </div>
  );
};

export default Sidebar;