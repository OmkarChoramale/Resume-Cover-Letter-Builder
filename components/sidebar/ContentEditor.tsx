
import React, { useRef, type FC, type ChangeEvent } from 'react';
import { useResumeStore } from '../../hooks/useResumeStore';
import Accordion from '../ui/Accordion';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import ListSection from './ListSection';
import AIGenerateButton from './AIGenerateButton';

const ContentEditor: FC = () => {
    const store = useResumeStore();
    const fileInputRef = useRef<HTMLInputElement>(null);
    if (!store.activeDocument) return null;
    
    const handleProfilePicChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            store.updateProfilePicture(e.target.files[0]);
        }
    };
    
    const generateCoverLetterPrompt = () => {
        const { personalInfo, experience } = store.activeDocument.data;
        const latestExperience = experience[0] 
            ? `My most recent role was as a ${experience[0].role} at ${experience[0].company}, where I was responsible for the following: ${experience[0].description}.` 
            : 'I have a solid background in my field and am eager to bring my skills to a new challenge.';
        return `Write a professional and compelling cover letter for ${personalInfo.name}, a ${personalInfo.title}. The letter should be addressed to "Dear Hiring Manager,". Incorporate the following experience: ${latestExperience}. The tone should be enthusiastic and confident. The cover letter should highlight key skills and express strong interest in a new opportunity. End with a call to action and sign off with "Sincerely,\n${personalInfo.name}".`;
    };
    
    const generateSummaryPrompt = () => {
        const { personalInfo, experience } = store.activeDocument.data;
        const experienceText = experience.map(exp => `- Worked as a ${exp.role} at ${exp.company} from ${exp.startDate} to ${exp.endDate}. Key responsibilities included: ${exp.description.replace(/•/g, '').trim()}`).join('\n');
        return `Write a professional and concise summary for a resume. The candidate's name is ${personalInfo.name} and their title is ${personalInfo.title}. Their work experience is as follows:\n\n${experienceText}\n\nGenerate a summary of 2-4 sentences that highlights their key skills and experience. The tone should be confident and professional. Do not use the first person (e.g., "I am"). Start with a phrase like "Experienced ${personalInfo.title} with a proven track record..." or similar.`;
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
                        <AIGenerateButton
                            prompt={generateSummaryPrompt()}
                            onComplete={(text) => store.updateWholeSection('summary', text)}
                            className="mb-4"
                        />
                        <Textarea label="Professional Summary" value={store.activeDocument.data.summary} onChange={e => store.updateWholeSection('summary', e.target.value)} rows={5} />
                    </Accordion>
                    <ListSection section="experience" title="Experience" />
                    <ListSection section="education" title="Education" />
                    <ListSection section="projects" title="Projects" />
                    <ListSection section="skills" title="Skills" />
                    <ListSection section="certificates" title="Certificates" />
                    <ListSection section="achievements" title="Achievements" />
                    <ListSection section="languages" title="Languages" />
                    <ListSection section="hobbies" title="Hobbies" />
                </>
            ) : (
                <Accordion title="Cover Letter Content">
                    <AIGenerateButton
                        prompt={generateCoverLetterPrompt()}
                        onComplete={(text) => store.updateWholeSection('coverLetter', text)}
                        className="mb-4"
                    />
                    <Textarea label="Cover Letter" value={store.activeDocument.data.coverLetter || ''} onChange={e => store.updateWholeSection('coverLetter', e.target.value)} rows={20} />
                </Accordion>
            )}
        </div>
    );
};

export default ContentEditor;
