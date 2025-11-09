import React, { type FC } from 'react';
// FIX: Changed to useResumeStore
import { useResumeStore } from '../hooks/useResumeStore';
import { resumeTemplates, coverLetterTemplates } from '../data/templates';
import ModernResume from './templates/resume/ModernResume';

const Preview: FC = () => {
  // FIX: Switched to useResumeStore and get the full active document
  const store = useResumeStore();
  const { activeDocument } = store;

  const handlePrint = () => {
    window.print();
  };
  
  const renderContent = () => {
      if (!activeDocument) {
          // Fallback to ModernResume with initialData if no document is active
          return <ModernResume data={store.resumeData} />;
      }

      const templates = activeDocument.type === 'resume' ? resumeTemplates : coverLetterTemplates;
      const template = templates.find(t => t.id === activeDocument.customization.template);
      
      // FIX: Dynamically render the component with all required props from the active document
      const Component = template ? template.component : ModernResume;
      return <Component {...activeDocument.customization} data={activeDocument.data} />;
  };

  return (
    <div className="h-full flex flex-col items-center p-8">
      <div className="mb-4 no-print flex items-center gap-4">
        <h2 className="text-xl font-semibold text-white/90">Live Preview</h2>
        <button 
          onClick={handlePrint} 
          className="py-2 px-6 bg-[var(--accent)] text-black font-semibold rounded-lg shadow-lg hover:brightness-110 transition-all transform hover:scale-105 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" /></svg>
          Print / Save as PDF
        </button>
      </div>
      <div 
        id="resume-preview" 
        className="print-area w-[210mm] min-h-[297mm] h-fit bg-white text-gray-800 shadow-2xl overflow-hidden transition-all duration-300"
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default Preview;
