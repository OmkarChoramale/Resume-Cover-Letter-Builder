
import React, { type FC } from 'react';
import { useResumeStore } from '../../hooks/useResumeStore';
import type { ListSectionKeys, ListItem, Experience, Education, Project, Skill, Certificate, Achievement, Language, Hobby } from '../../types';
import Accordion from '../ui/Accordion';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import AIGenerateButton from './AIGenerateButton';

const ListSection: FC<{ section: ListSectionKeys; title: string; }> = ({ section, title }) => {
    const store = useResumeStore();
    const items = store.activeDocument?.data[section] as ListItem[] | undefined;

    if (!items) return null;

    const renderFields = (item: ListItem) => {
        switch (section) {
            case 'experience': {
                const exp = item as Experience;
                const canGenerate = !!(exp.role && exp.company);
                const prompt = `Create a professional job description for the role of '${exp.role}' at '${exp.company}'. Focus on key responsibilities and achievements. Use bullet points starting with '• '.`;
                return <>
                    <Input label="Company" value={exp.company} onChange={e => store.updateListItem(section, exp.id, 'company', e.target.value)} />
                    <Input label="Role" value={exp.role} onChange={e => store.updateListItem(section, exp.id, 'role', e.target.value)} />
                    <Input label="Start Date" value={exp.startDate} onChange={e => store.updateListItem(section, exp.id, 'startDate', e.target.value)} />
                    <Input label="End Date" value={exp.endDate} onChange={e => store.updateListItem(section, exp.id, 'endDate', e.target.value)} />
                    <Textarea label="Description" value={exp.description} onChange={e => store.updateListItem(section, exp.id, 'description', e.target.value)} rows={4}/>
                    {canGenerate && (
                        <AIGenerateButton 
                        prompt={prompt}
                        onComplete={(text) => store.updateListItem(section, exp.id, 'description', text)}
                        className="mt-2"
                        />
                    )}
                </>;
            }
            case 'education': {
                const edu = item as Education;
                return <>
                    <Input label="Institution" value={edu.institution} onChange={e => store.updateListItem(section, edu.id, 'institution', e.target.value)} />
                    <Input label="Degree" value={edu.degree} onChange={e => store.updateListItem(section, edu.id, 'degree', e.target.value)} />
                    <Input label="Start Date" value={edu.startDate} onChange={e => store.updateListItem(section, edu.id, 'startDate', e.target.value)} />
                    <Input label="End Date" value={edu.endDate} onChange={e => store.updateListItem(section, edu.id, 'endDate', e.target.value)} />
                    <Input label="GPA" value={edu.gpa} onChange={e => store.updateListItem(section, edu.id, 'gpa', e.target.value)} />
                </>;
            }
            case 'projects': {
                 const proj = item as Project;
                return <>
                    <Input label="Project Name" value={proj.name} onChange={e => store.updateListItem(section, proj.id, 'name', e.target.value)} />
                    <Textarea label="Description" value={proj.description} onChange={e => store.updateListItem(section, proj.id, 'description', e.target.value)} />
                    <Input label="Link" value={proj.link} onChange={e => store.updateListItem(section, proj.id, 'link', e.target.value)} />
                </>;
            }
            case 'skills':
                return <Input label="Skill" value={(item as Skill).value} onChange={e => store.updateListItem(section, item.id, 'value', e.target.value)} />;
            case 'certificates': {
                const cert = item as Certificate;
                return <>
                    <Input label="Certificate Name" value={cert.name} onChange={e => store.updateListItem(section, cert.id, 'name', e.target.value)} />
                    <Input label="Issuer" value={cert.issuer} onChange={e => store.updateListItem(section, cert.id, 'issuer', e.target.value)} />
                    <Input label="Date" value={cert.date} onChange={e => store.updateListItem(section, cert.id, 'date', e.target.value)} />
                </>;
            }
            case 'achievements':
                return <Textarea label="Achievement" value={(item as Achievement).description} onChange={e => store.updateListItem(section, item.id, 'description', e.target.value)} />;
            case 'languages': {
                const lang = item as Language;
                const options = ['Native', 'Fluent', 'Proficient', 'Intermediate', 'Basic'];
                return <>
                    <Input label="Language" value={lang.name} onChange={e => store.updateListItem(section, lang.id, 'name', e.target.value)} />
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-1 capitalize">Proficiency</label>
                        <select value={lang.proficiency} onChange={e => store.updateListItem(section, item.id, 'proficiency', e.target.value)} className="w-full p-2 border border-[var(--border-color)] rounded-lg bg-black/30 text-white focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] transition">
                        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                </>;
            }
            case 'hobbies':
                return <Input label="Hobby" value={(item as Hobby).name} onChange={e => store.updateListItem(section, item.id, 'name', e.target.value)} />;
            default:
                return null;
        }
    };
    
    return (
        <Accordion title={title}>
            <div className="space-y-4">
                {items.map((item) => (
                    <div key={item.id} className="p-4 bg-black/30 rounded-lg border border-[var(--border-color)] relative group">
                        <button onClick={() => store.removeListItem(section, item.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full w-6 h-6 flex items-center justify-center font-bold text-lg">&times;</button>
                        <div className="pr-6">
                            {renderFields(item)}
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => store.addListItem(section)} className="mt-4 w-full text-sm py-2 px-4 bg-[var(--accent)] text-black font-semibold rounded-lg hover:brightness-110 transition-all transform hover:scale-[1.02] shadow hover:shadow-lg flex items-center justify-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                Add {title.slice(0, -1)}
            </button>
        </Accordion>
    );
};

export default ListSection;
