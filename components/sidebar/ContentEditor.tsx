import React, { useRef, type FC, type ChangeEvent } from 'react';
// FIX: Renamed useResumeData to useResumeStore
import { useResumeStore } from '../../hooks/useResumeStore';
import Accordion from '../ui/Accordion';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import ListSection from './ListSection';

const ContentEditor: FC = () => {
    const { resumeData, updateField, updateSummary, updateProfilePicture } = useResumeStore();
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const handleProfilePicChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    updateProfilePicture(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-4">
            <Accordion title="Personal Info">
                <div className="flex items-center gap-4 mb-4">
                    <img 
                        src={resumeData.personalInfo.profilePicture || `https://ui-avatars.com/api/?name=${resumeData.personalInfo.name.replace(' ', '+')}&background=0d0d4d&color=00d4ff&bold=true`} 
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover border-2 border-[var(--border-color)]"
                    />
                    <div>
                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleProfilePicChange} className="hidden" />
                        <button onClick={() => fileInputRef.current?.click()} className="text-sm py-2 px-4 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-all border border-[var(--border-color)]">Upload Photo</button>
                        <p className="text-xs text-gray-400 mt-2">JPG, PNG. 2MB max.</p>
                    </div>
                </div>
                <Input label="Full Name" value={resumeData.personalInfo.name} onChange={e => updateField('personalInfo', 'name', e.target.value)} />
                <Input label="Job Title" value={resumeData.personalInfo.title} onChange={e => updateField('personalInfo', 'title', e.target.value)} />
                <Input label="Email" type="email" value={resumeData.personalInfo.email} onChange={e => updateField('personalInfo', 'email', e.target.value)} />
                <Input label="Phone" value={resumeData.personalInfo.phone} onChange={e => updateField('personalInfo', 'phone', e.target.value)} />
                <Input label="Location" value={resumeData.personalInfo.location} onChange={e => updateField('personalInfo', 'location', e.target.value)} />
                <Input label="LinkedIn" value={resumeData.personalInfo.linkedin} onChange={e => updateField('personalInfo', 'linkedin', e.target.value)} placeholder="linkedin.com/in/username"/>
                <Input label="GitHub" value={resumeData.personalInfo.github} onChange={e => updateField('personalInfo', 'github', e.target.value)} placeholder="github.com/username"/>
                <Input label="Website" value={resumeData.personalInfo.website} onChange={e => updateField('personalInfo', 'website', e.target.value)} placeholder="your-portfolio.com"/>
            </Accordion>
            <Accordion title="Summary">
                <Textarea label="Professional Summary" value={resumeData.summary} onChange={e => updateSummary(e.target.value)} rows={5} />
            </Accordion>
            <ListSection section="experience" title="Experience" />
            <ListSection section="education" title="Education" />
            <ListSection section="projects" title="Projects" />
            <ListSection section="skills" title="Skills" />
            <ListSection section="certificates" title="Certificates" />
            <ListSection section="achievements" title="Achievements" />
            <ListSection section="languages" title="Languages" />
            <ListSection section="hobbies" title="Hobbies" />
        </div>
    );
};

export default ContentEditor;
