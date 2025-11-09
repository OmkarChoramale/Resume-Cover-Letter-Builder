
import React, { type FC } from 'react';
import { useResumeStore } from '../hooks/useResumeStore';
import { resumeTemplates, coverLetterTemplates } from '../data/templates';

const Preview: FC = () => {
  const store = useResumeStore();

  const handlePrint = () => {
    window.print();
  };

  if (!store.activeDocument) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8">
          <p className="text-gray-400">No document selected. Go to the dashboard to create or select one.</p>
      </div>
    );
  }

  const { data, customization, type } = store.activeDocument;
  const { theme, sections, sectionOrder, template, canvasLayout } = customization;

  const templates = type === 'resume' ? resumeTemplates : coverLetterTemplates;
  const SelectedTemplate = templates.find(t => t.id === template)?.component;

  return (
    <div className="h-full flex flex-col items-center p-8" >
      <div className="mb-4 no-print flex items-center gap-4">
        <h2 className="text-xl font-semibold text-white/90">Live Preview</h2>
        <button 
          onClick={handlePrint} 
          className="py-2 px-6 bg-[var(--accent)] text-black font-semibold rounded-lg shadow-lg hover:brightness-110 transition-all transform hover:scale-105 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" /></svg>
          Print / PDF
        </button>
      </div>
      <div 
        id="resume-preview" 
        className="print-area w-[210mm] h-[297mm] bg-white shadow-2xl overflow-hidden transition-all duration-300 relative"
        style={{
          backgroundColor: theme.colors.background,
          fontFamily: theme.fonts.body.family,
          fontSize: `${theme.fonts.body.size}px`,
          fontWeight: theme.fonts.body.weight,
          color: theme.colors.text,
        }}
      >
        {SelectedTemplate ? (
          <SelectedTemplate 
              data={data}
              theme={theme}
              sections={sections}
              sectionOrder={sectionOrder}
              canvasLayout={canvasLayout}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-black">
            <p>Template not found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;