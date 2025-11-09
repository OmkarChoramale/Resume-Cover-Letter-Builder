
import React, { useRef, type FC, type ChangeEvent } from 'react';
import { useResumeStore } from '../../hooks/useResumeStore';
import Accordion from '../ui/Accordion';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import ListSection from './ListSection';

const ContentEditor: FC = () => {
    const store = useResumeStore();
    const fileInputRef = useRef<HTMLInputElement>(null);
    if (!store.activeDocument) return null;
    
    const handleProfilePicChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            store.updateProfilePicture(e.target.files[0]);
        }
    };
    
    return (
        <div className="space-y-4">
            {store.documentType === 'resume' ? (
                <>
                    <Accordion title="Personal Info">
                        <div className="flex items-center gap-4 mb-4">
                            <img 
                                src={store.activeDocument.data.personalInfo.profilePicture || `https://ui-avatars.com/api/?name=${store.activeDocument.data.personalInfo.name.replace(' ', '+')}&background=0d0d4d&color=00d4ff&bold=true`} 
                                alt="Profile"
                                className="w-20 h-20 rounded-full object-cover border-2 border-[var(--border-color)]"
                            />
                            <div>
                                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleProfilePicChange} className="hidden" />
                                <button onClick={() => fileInputRef.current?.click()} className="text-sm py-2 px-4 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-all border border-[var(--border-color)]">Upload Photo</button>
                                <p className="text-xs text-gray-400 mt-2">JPG, PNG. 2MB max.</p>
                            </div>
                        </div>
                        <Input label="Full Name" value={store.activeDocument.data.personalInfo.name} onChange={e => store.updateField('personalInfo', 'name', e.target.value)} />
                        <Input label="Job Title" value={store.activeDocument.data.personalInfo.title} onChange={e => store.updateField('personalInfo', 'title', e.target.value)} />
                        <Input label="Email" type="email" value={store.activeDocument.data.personalInfo.email} onChange={e => store.updateField('personalInfo', 'email', e.target.value)} />
                        <Input label="Phone" value={store.activeDocument.data.personalInfo.phone} onChange={e => store.updateField('personalInfo', 'phone', e.target.value)} />
                        <Input label="Location" value={store.activeDocument.data.personalInfo.location} onChange={e => store.updateField('personalInfo', 'location', e.target.value)} />
                        <Input label="LinkedIn" value={store.activeDocument.data.personalInfo.linkedin} onChange={e => store.updateField('personalInfo', 'linkedin', e.target.value)} placeholder="linkedin.com/in/username"/>
                        <Input label="GitHub" value={store.activeDocument.data.personalInfo.github} onChange={e => store.updateField('personalInfo', 'github', e.target.value)} placeholder="github.com/username"/>
                         <Input label="Website" value={store.activeDocument.data.personalInfo.website} onChange={e => store.updateField('personalInfo', 'website', e.target.value)} placeholder="your-portfolio.com"/>
                    </Accordion>
                    <Accordion title="Summary">
                        <Textarea label="Professional Summary" value={store.activeDocument.data.summary} onChange={e => store.updateWholeSection('summary', e.target.value)} rows={5} />
                    </Accordion>
                    <ListSection section="experience" title="Experience" fields={{ company: 'Company', role: 'Role', startDate: 'Start Date', endDate: 'End Date', description: {type: 'textarea', rows: 4} }} />
                    <ListSection section="education" title="Education" fields={{ institution: 'Institution', degree: 'Degree', startDate: 'Start Date', endDate: 'End Date', gpa: 'GPA' }} />
                    <ListSection section="projects" title="Projects" fields={{ name: 'Project Name', description: { type: 'textarea' }, link: 'Link' }} />
                    <ListSection section="skills" title="Skills" />
                    <ListSection section="certificates" title="Certificates" fields={{ name: 'Certificate Name', issuer: 'Issuer', date: 'Date' }} />
                    <ListSection section="achievements" title="Achievements" fields={{ description: { type: 'textarea', label: 'Achievement' } }} />
                    <ListSection section="languages" title="Languages" fields={{ name: 'Language', proficiency: { type: 'select', options: ['Native', 'Fluent', 'Proficient', 'Intermediate', 'Basic'] } }} />
                    <ListSection section="hobbies" title="Hobbies" fields={{ name: 'Hobby' }} />
                </>
            ) : (
                <Accordion title="Cover Letter Content">
                    <Textarea label="Cover Letter" value={store.activeDocument.data.coverLetter || ''} onChange={e => store.updateWholeSection('coverLetter', e.target.value)} rows={20} />
                </Accordion>
            )}
        </div>
    );
};

export default ContentEditor;