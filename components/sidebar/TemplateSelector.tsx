
import React, { type FC } from 'react';
import { useResumeStore } from '../../hooks/useResumeStore';
import { resumeTemplates, coverLetterTemplates } from '../../data/templates';

const TemplateSelector: FC = () => {
    const store = useResumeStore();
    const templates = store.documentType === 'resume' ? resumeTemplates : coverLetterTemplates;
    const currentTemplate = store.activeDocument?.customization.template || '';

    return (
        <div className="grid grid-cols-2 gap-4">
            {templates.map(template => (
                <div key={template.id} onClick={() => store.updateTemplate(template.id)} className={`cursor-pointer border-2 rounded-lg overflow-hidden transition-all duration-300 group ${currentTemplate === template.id ? 'border-[var(--accent)] shadow-lg scale-105 shadow-[var(--accent)]/20' : 'border-[var(--border-color)] hover:border-[var(--accent)]/50 hover:shadow-md hover:-translate-y-1'}`}>
                    <img src={template.thumbnail} alt={template.name} className="w-full h-auto object-cover group-hover:opacity-90 transition-opacity aspect-[200/282]" />
                    <p className="text-center text-sm font-medium p-2 bg-black/40 text-white">{template.name}</p>
                </div>
            ))}
        </div>
    );
};

export default TemplateSelector;
