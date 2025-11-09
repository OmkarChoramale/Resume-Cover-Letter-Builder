import React, { type FC } from 'react';
import { useResumeStore } from '../../hooks/useResumeStore';
import type { ListSectionKeys, ListItem, Experience, Education, Project, Skill, Certificate, Achievement, Language, Hobby } from '../../types';
import Accordion from '../ui/Accordion';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';

const ListSection: FC<{ section: ListSectionKeys; title: string; }> = ({ section, title }) => {
    const { resumeData, addListItem, updateListItem, removeListItem } = useResumeStore();
    const items = resumeData[section] as ListItem[];

    if (!items) return null;

    const renderFields = (item: ListItem) => {
        switch (section) {
            case 'experience': {
                const exp = item as Experience;
                return <>
                    <Input label="Company" value={exp.company} onChange={e => updateListItem(section, exp.id, 'company', e.target.value)} />
                    <Input label="Role" value={exp.role} onChange={e => updateListItem(section, exp.id, 'role', e.target.value)} />
                    <Input label="Start Date" value={exp.startDate} onChange={e => updateListItem(section, exp.id, 'startDate', e.target.value)} />
                    <Input label="End Date" value={exp.endDate} onChange={e => updateListItem(section, exp.id, 'endDate', e.target.value)} />
                    <Textarea label="Description" value={exp.description} onChange={e => updateListItem(section, exp.id, 'description', e.target.value)} rows={4}/>
                </>;
            }
            case 'education': {
                const edu = item as Education;
                return <>
                    <Input label="Institution" value={edu.institution} onChange={e => updateListItem(section, edu.id, 'institution', e.target.value)} />
                    <Input label="Degree" value={edu.degree} onChange={e => updateListItem(section, edu.id, 'degree', e.target.value)} />
                    <Input label="Start Date" value={edu.startDate} onChange={e => updateListItem(section, edu.id, 'startDate', e.target.value)} />
                    <Input label="End Date" value={edu.endDate} onChange={e => updateListItem(section, edu.id, 'endDate', e.target.value)} />
                    <Input label="GPA" value={edu.gpa} onChange={e => updateListItem(section, edu.id, 'gpa', e.target.value)} />
                </>;
            }
            case 'projects': {
                 const proj = item as Project;
                return <>
                    <Input label="Project Name" value={proj.name} onChange={e => updateListItem(section, proj.id, 'name', e.target.value)} />
                    <Textarea label="Description" value={proj.description} onChange={e => updateListItem(section, proj.id, 'description', e.target.value)} />
                    <Input label="Link" value={proj.link} onChange={e => updateListItem(section, proj.id, 'link', e.target.value)} />
                </>;
            }
            case 'skills':
                return <Input label="Skill" value={(item as Skill).value} onChange={e => updateListItem(section, item.id, 'value', e.target.value)} />;
            case 'certificates': {
                const cert = item as Certificate;
                return <>
                    <Input label="Certificate Name" value={cert.name} onChange={e => updateListItem(section, cert.id, 'name', e.target.value)} />
                    <Input label="Issuer" value={cert.issuer} onChange={e => updateListItem(section, cert.id, 'issuer', e.target.value)} />
                    <Input label="Date" value={cert.date} onChange={e => updateListItem(section, cert.id, 'date', e.target.value)} />
                </>;
            }
            case 'achievements': {
                const ach = item as Achievement;
                return <Textarea label="Achievement" value={ach.description} onChange={e => updateListItem(section, ach.id, 'description', e.target.value)} rows={3} />;
            }
            case 'languages': {
                const lang = item as Language;
                return <>
                    <Input label="Language" value={lang.name} onChange={e => updateListItem(section, lang.id, 'name', e.target.value)} />
                    <Input label="Proficiency" value={lang.proficiency} onChange={e => updateListItem(section, lang.id, 'proficiency', e.target.value)} />
                </>;
            }
            case 'hobbies': {
                const hobby = item as Hobby;
                return <Input label="Hobby" value={hobby.name} onChange={e => updateListItem(section, hobby.id, 'name', e.target.value)} />;
            }
            default:
                return null;
        }
    };
    
    return (
        <Accordion title={title}>
            <div className="space-y-4">
                {items.map((item) => (
                    <div key={item.id} className="p-4 bg-black/30 rounded-lg border border-[var(--border-color)] relative group">
                        <button onClick={() => removeListItem(section, item.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full w-6 h-6 flex items-center justify-center font-bold text-lg">&times;</button>
                        <div className="pr-6">
                            {renderFields(item)}
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => addListItem(section)} className="mt-4 w-full text-sm py-2 px-4 bg-[var(--accent)] text-black font-semibold rounded-lg hover:brightness-110 transition-all transform hover:scale-[1.02] shadow hover:shadow-lg flex items-center justify-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                Add {title.slice(0, -1)}
            </button>
        </Accordion>
    );
};

export default ListSection;
