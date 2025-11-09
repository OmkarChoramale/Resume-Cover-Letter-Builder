
import React, { type FC } from 'react';
import { useResumeStore } from '../../hooks/useResumeStore';
import Switch from '../ui/Switch';
import type { SectionKeys } from '../../types';

const LayoutEditor: FC = () => {
    const store = useResumeStore();
    const { activeDocument, toggleSectionVisibility, setSectionOrder, addCanvasBlock } = store;

    if (store.documentType === 'cover-letter' || !activeDocument) {
        return <div className="p-4 text-center text-gray-400 bg-black/20 rounded-lg">Layout options are only available for resumes.</div>
    }

    if (activeDocument.customization.template === 'canvas') {
        const availableSections: SectionKeys[] = ['personalInfo', 'summary', 'experience', 'education', 'skills', 'projects', 'certificates', 'achievements', 'languages', 'hobbies'];
        return (
             <div>
                <h3 className="text-lg font-semibold mb-2 text-white">Canvas Tools</h3>
                <p className="text-sm text-gray-400 mb-4">Add sections to your free-form canvas. You can drag, resize, and layer them in the preview area.</p>
                <div className="grid grid-cols-2 gap-2">
                    {availableSections.map(section => (
                        <button key={section} onClick={() => addCanvasBlock(section)} className="p-3 text-sm bg-white/5 border border-[var(--border-color)] rounded-lg hover:bg-white/10 hover:text-[var(--accent)] transition-colors capitalize">
                           + {section.replace(/([A-Z])/g, ' $1')}
                        </button>
                    ))}
                </div>
            </div>
        );
    }


    const { sections, sectionOrder } = activeDocument.customization;

    const handleMove = (index: number, direction: 'up' | 'down') => {
        const newOrder = [...sectionOrder];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newOrder.length) return;
        [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
        setSectionOrder(newOrder);
    };

    return (
        <div className="space-y-2">
            <h3 className="text-lg font-semibold mb-2 text-white">Manage & Reorder Sections</h3>
            <p className="text-sm text-gray-400 mb-4">Toggle visibility and re-arrange the order of sections on your resume.</p>
            <div className="space-y-2">
                {sectionOrder.map((sectionKey, index) => (
                    <div key={sectionKey} className="flex items-center justify-between p-3 bg-white/5 border border-[var(--border-color)] rounded-lg shadow-sm">
                        <div className="flex items-center gap-3">
                             <div className="flex flex-col">
                                <button onClick={() => handleMove(index, 'up')} disabled={index === 0} className="disabled:opacity-20 disabled:cursor-not-allowed text-gray-400 hover:text-[var(--accent)] rounded-full p-0.5 transition-colors">▲</button>
                                <button onClick={() => handleMove(index, 'down')} disabled={index === sectionOrder.length - 1} className="disabled:opacity-20 disabled:cursor-not-allowed text-gray-400 hover:text-[var(--accent)] rounded-full p-0.5 transition-colors">▼</button>
                            </div>
                            <span className="font-medium text-gray-200 capitalize">{sectionKey.replace(/([A-Z])/g, ' $1')}</span>
                        </div>
                        <Switch 
                            checked={sections[sectionKey]} 
                            onChange={() => toggleSectionVisibility(sectionKey)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LayoutEditor;
