
import React, { useState, type FC } from 'react';
import { useResumeStore } from '../hooks/useResumeStore';
import ContentEditor from './sidebar/ContentEditor';
import TemplateSelector from './sidebar/TemplateSelector';
import StyleEditor from './sidebar/StyleEditor';
import LayoutEditor from './sidebar/LayoutEditor';

const Sidebar: FC<{ className?: string; onBackToDashboard: () => void; }> = ({ className, onBackToDashboard }) => {
  const [activeTab, setActiveTab] = useState('Content');
  const store = useResumeStore();

  const handleDocumentTypeChange = (type: 'resume' | 'cover-letter') => {
    store.setDocumentType(type);
  };
    
  return (
    <div className={`w-[450px] h-full flex flex-col shadow-2xl bg-black/30 backdrop-blur-xl border-r border-[var(--border-color)] ${className}`}>
      <header className="p-4 border-b border-[var(--border-color)] flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Elegance<span style={{color: 'var(--accent)'}}>AI</span></h1>
          <p className="text-sm text-gray-400">Craft your perfect application</p>
        </div>
        <button onClick={onBackToDashboard} className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-1 group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Dashboard
        </button>
      </header>
      
      <div className="border-b border-[var(--border-color)]">
        <div className="flex justify-center p-1 bg-black/20 rounded-lg m-2">
            <button onClick={() => handleDocumentTypeChange('resume')} className={`px-4 py-2 text-sm font-semibold rounded-md flex-1 transition-all duration-300 ${store.documentType === 'resume' ? 'bg-white/10 shadow-md text-white' : 'text-gray-400 hover:bg-black/40'}`}>Resume</button>
            <button onClick={() => handleDocumentTypeChange('cover-letter')} className={`px-4 py-2 text-sm font-semibold rounded-md flex-1 transition-all duration-300 ${store.documentType === 'cover-letter' ? 'bg-white/10 shadow-md text-white' : 'text-gray-400 hover:bg-black/40'}`}>Cover Letter</button>
        </div>
        <nav className="relative flex px-2">
          {['Content', 'Templates', 'Style', 'Layout'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === tab ? 'border-[var(--accent)] text-[var(--accent)]' : 'border-transparent text-gray-400 hover:text-white'}`}>
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {activeTab === 'Content' && <ContentEditor />}
        {activeTab === 'Templates' && <TemplateSelector />}
        {activeTab === 'Style' && <StyleEditor />}
        {activeTab === 'Layout' && <LayoutEditor />}
      </div>
    </div>
  );
};

export default Sidebar;