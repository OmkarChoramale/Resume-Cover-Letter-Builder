
import React, { type FC } from 'react';
import type { ResumeTemplateProps, SectionKeys, Theme } from '../../../types';

const formatLink = (url: string) => {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    return `https://${url}`;
};

const DeveloperResume: FC<ResumeTemplateProps> = ({ data, theme, sections, sectionOrder }) => {
    const { personalInfo, summary, experience, education, skills, projects, certificates, languages } = data;
    const headingStyles = (size = '1.2rem') => ({
        fontFamily: theme.fonts.heading.family,
        fontWeight: theme.fonts.heading.weight,
        color: theme.colors.primary,
        fontSize: size,
    });
    
    // Split skills for multi-column layout
    const midIndex = Math.ceil(skills.length / 2);
    const skills1 = skills.slice(0, midIndex);
    const skills2 = skills.slice(midIndex);

    const renderSection = (key: SectionKeys) => {
        if (!sections[key]) return null;
        switch (key) {
            case 'summary':
                return summary && <Section title="Profile" theme={theme}><p>{summary}</p></Section>;
            case 'experience':
                return experience.length > 0 && <Section title="Experience" theme={theme}>{experience.map(exp => (
                    <div key={exp.id} className="mb-4">
                        <div className="flex justify-between items-baseline">
                            <h3 style={headingStyles('1.1rem')}>{exp.role}</h3>
                            <p className="text-sm text-gray-500 font-medium">{exp.startDate} – {exp.endDate}</p>
                        </div>
                        <p className="font-semibold text-gray-700">{exp.company}</p>
                        <ul className="list-disc pl-5 mt-1 text-sm text-gray-600 space-y-1">{exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace('• ', '')}</li>)}</ul>
                    </div>))}</Section>;
            case 'education':
                return education.length > 0 && <Section title="Education" theme={theme}>{education.map(edu => (
                    <div key={edu.id} className="mb-2">
                        <div className="flex justify-between items-baseline">
                            <h3 style={headingStyles('1.1rem')}>{edu.institution}</h3>
                            <p className="text-sm text-gray-500 font-medium">{edu.startDate} – {edu.endDate}</p>
                        </div>
                        <p className="font-semibold text-gray-700">{edu.degree}</p>
                        {edu.gpa && <p className="text-sm text-gray-500">CGPA: {edu.gpa}</p>}
                    </div>))}</Section>;
            case 'projects':
                return projects.length > 0 && <Section title="Projects" theme={theme}>{projects.map(proj => (
                    <div key={proj.id} className="mb-3">
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                            <h3 style={headingStyles('1.1rem')}>{proj.name}</h3>
                        </div>
                        <p className="pl-6 text-sm text-gray-600">{proj.description}</p>
                    </div>))}</Section>;
            case 'skills':
                 return skills.length > 0 && <Section title="Technical Skills" theme={theme}><div className="flex">
                    <ul className="w-1/2 list-disc pl-5 text-sm space-y-1">{skills1.map(s => <li key={s.id}>{s.value}</li>)}</ul>
                    <ul className="w-1/2 list-disc pl-5 text-sm space-y-1">{skills2.map(s => <li key={s.id}>{s.value}</li>)}</ul>
                </div></Section>;
            case 'certificates':
                 return certificates.length > 0 && <Section title="Certifications" theme={theme}><ul className="list-disc pl-5 space-y-1 text-sm">{certificates.map(c => <li key={c.id}><strong>{c.name}</strong> from {c.issuer}</li>)}</ul></Section>;
            case 'languages':
                 return languages.length > 0 && <Section title="Languages" theme={theme}><p>{languages.map(l => `${l.name} (${l.proficiency})`).join(' | ')}</p></Section>;
            default: return null;
        }
    }

    return (
        <div className="p-8 font-sans">
            <header className="text-center mb-6">
                <h1 style={headingStyles('2.2rem')} className="uppercase tracking-wider">{personalInfo.name}</h1>
                <p style={{color: theme.colors.text}} className="text-lg font-medium">{personalInfo.title}</p>
                <div style={{color: theme.colors.accent}} className="mt-2 text-sm font-medium flex justify-center items-center gap-x-3 flex-wrap">
                    <span>{personalInfo.location}</span>
                    <span>|</span>
                    <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>
                    <span>|</span>
                    <span>{personalInfo.phone}</span>
                </div>
                <div style={{color: theme.colors.accent}} className="mt-1 text-sm font-medium flex justify-center items-center gap-x-3 flex-wrap">
                    <a href={formatLink(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn Profile</a>
                    <span>|</span>
                    <a href={formatLink(personalInfo.github)} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub Profile</a>
                    {personalInfo.website && <><span>|</span><a href={formatLink(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="hover:underline">Digital Portfolio</a></>}
                </div>
            </header>
            
            <main>
                {sectionOrder.map(key => renderSection(key))}
            </main>
        </div>
    );
};

const Section: FC<{ title: string; theme: Theme; children: React.ReactNode }> = ({ title, theme, children }) => (
    <section className="mb-5">
        <h2 style={{ fontFamily: theme.fonts.heading.family, color: theme.colors.primary }} className="text-lg font-bold uppercase tracking-wider border-l-4 pl-2 mb-3" >{title}</h2>
        {children}
    </section>
);


export default DeveloperResume;
