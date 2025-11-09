import React, { type FC } from 'react';
import { useResumeStore } from '../../hooks/useResumeStore';
import type { ListSectionKeys, ListItem } from '../../types';
import Accordion from '../ui/Accordion';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import { Reorder } from 'framer-motion';

type FieldConfig = string | { type: 'textarea'; label?: string; rows?: number } | { type: 'select'; label?: string; options: string[] };

const ListSection: FC<{ section: ListSectionKeys; title: string; fields?: Record<string, FieldConfig> }> = ({ section, title, fields }) => {
    const store = useResumeStore();
    const items = store.activeDocument?.data[section] as ListItem[] | undefined;

    if (!items) return null;
    
    const handleReorder = (newOrder: ListItem[]) => {
      store.setListOrder(section, newOrder);
    }

    return (
        <Accordion title={title}>
            <Reorder.Group axis="y" values={items} onReorder={handleReorder}>
                {items.map((item) => (
                    <Reorder.Item key={item.id} value={item}>
                        <div className="p-4 mb-2 bg-black/30 rounded-lg border border-[var(--border-color)] relative group">
                            <div className="absolute top-2 left-1 cursor-grab opacity-50 group-hover:opacity-100 transition-opacity">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                            </div>
                            <button onClick={() => store.removeListItem(section, item.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full w-6 h-6 flex items-center justify-center font-bold text-lg">&times;</button>
                            <div className="ml-4">
                            {fields ? (
                                Object.entries(fields).map(([key, config]) => {
                                    const value = item[key as keyof typeof item];
                                    if (typeof config === 'object' && config.type === 'textarea') {
                                        return <Textarea key={key} label={config.label || key} value={value as string} onChange={e => store.updateListItem(section, item.id, key, e.target.value)} rows={config.rows || 3}/>
                                    }
                                     if (typeof config === 'object' && config.type === 'select') {
                                        return <div key={key} className="mb-4">
                                          <label className="block text-sm font-medium text-gray-300 mb-1 capitalize">{config.label || key}</label>
                                          <select value={value as string} onChange={e => store.updateListItem(section, item.id, key, e.target.value)} className="w-full p-2 border border-[var(--border-color)] rounded-lg bg-black/30 text-white focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] transition">
                                            {config.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                          </select>
                                        </div>
                                    }
                                    return <Input key={key} label={typeof config === 'string' ? config : key} value={value as string} onChange={e => store.updateListItem(section, item.id, key, e.target.value)} />
                                })
                            ) : (
                                 <Input label="Skill" value={(item as {value: string}).value} onChange={e => store.updateListItem(section, item.id, 'value', e.target.value)} />
                            )}
                            </div>
                        </div>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
            <button onClick={() => store.addListItem(section)} className="mt-2 w-full text-sm py-2 px-4 bg-[var(--accent)] text-black font-semibold rounded-lg hover:brightness-110 transition-all transform hover:scale-[1.02] shadow hover:shadow-lg flex items-center justify-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                Add {title.slice(0, -1)}
            </button>
        </Accordion>
    );
};

export default ListSection;