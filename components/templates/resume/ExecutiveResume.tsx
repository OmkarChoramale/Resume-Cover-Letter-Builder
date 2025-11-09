import React, { type FC } from 'react';
// FIX: Import correct types
import type { ResumeTemplateProps, SectionKeys, Theme } from '../../../types';

const formatLink = (url: string) => {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    return `https://${url}`;
};

const ExecutiveResume: FC<ResumeTemplateProps> = ({ data, theme, sections, sectionOrder }) => {
    // FIX: Added guard clause for optional props
    if (!theme || !sections || !sectionOrder) return null;
    
    const { personalInfo, summary, experience, education, skills, projects, certificates, achievements } = data;
    const headingStyles = (size = '1.2rem', weight = theme.fonts.heading.weight) => ({
        fontFamily: theme.fonts.heading.family,
        fontWeight: weight,
        color: theme.colors.primary,
        fontSize: size,
    });
    
    const renderSection = (key: SectionKeys) => {
        if (!sections[key]) return null;
        switch (key) {
            case 'summary':
                return summary && <Section title="Profile" theme={theme}><p className="text-gray-700">{summary}</p></Section>;
            case 'experience':
                return experience.length > 0 && <Section title="Experience" theme={theme}>{experience.map(exp => (
                    <div key={exp.id} className="mb-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 style={headingStyles('1.1rem', 700)}>{exp.role}</h3>
                                <p className="font-semibold text-gray-700">{exp.company}</p>
                            </div>
                            <p className="text-sm text-gray-500 text-right">{exp.startDate} – {exp.endDate}<br/>{exp.company.includes('Kolhapur') ? 'Kolhapur, India' : ''}</p>
                        </div>
                        <ul className="list-disc pl-5 mt-1 text-sm text-gray-600 space-y-1">{exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/•\s*/, '')}</li>)}</ul>
                    </div>))}</Section>;
            case 'education':
                 return education.length > 0 && <Section title="Education" theme={theme}>{education.map(edu => (
                    <div key={edu.id} className="mb-2">
                        <div className="flex justify-between items-baseline">
                            <h3 style={headingStyles('1.1rem', 700)}>{edu.institution}</h3>
                            <p className="text-sm text-gray-500 font-medium">{edu.startDate} – {edu.endDate}</p>
                        </div>
                        <div className="flex justify-between items-baseline">
                             <p className="font-semibold text-gray-700">{edu.degree}</p>
                             {edu.gpa && <p className="text-sm text-gray-500">CGPA: {edu.gpa}</p>}
                        </div>
                    </div>))}</Section>;
            case 'projects':
                return projects.length > 0 && <Section title="Projects" theme={theme}>{projects.map(proj => (
                    <div key={proj.id} className="mb-3">
                         <h3 style={headingStyles('1.1rem', 700)}>{proj.name}</h3>
                         <ul className="list-disc pl-5 mt-1 text-sm text-gray-600 space-y-1">{proj.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/•\s*/, '')}</li>)}</ul>
                    </div>))}</Section>;
            case 'skills':
                 return skills.length > 0 && <Section title="Skills" theme={theme}><div className="flex flex-wrap gap-x-4 gap-y-1">{skills.map(s => <span key={s.id} className="font-medium text-gray-700">{s.value}</span>)}</div></Section>;
            case 'certificates':
                 return certificates.length > 0 && <Section title="Certification" theme={theme}>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        {certificates.map(c => <div key={c.id}>
                            <h4 className="font-semibold text-gray-800">{c.name}</h4>
                            <p className="text-sm text-gray-600">{c.issuer}</p>
                        </div>)}
                    </div>
                </Section>;
            case 'achievements':
                 return achievements.length > 0 && <Section title="Achievements" theme={theme}><ul className="list-disc pl-5 text-sm">{achievements.map(a => <li key={a.id}>{a.description}</li>)}</ul></Section>;
            default: return null;
        }
    }

    return (
        <div className="p-8 font-serif bg-white text-gray-800">
            <header className="text-center mb-4">
                <h1 style={headingStyles('2.2rem', 700)}>{personalInfo.name}</h1>
                <p className="text-lg font-medium">{personalInfo.title}</p>
                <div className="mt-1 text-xs text-gray-600 flex justify-center items-center gap-x-2 flex-wrap">
                    <span>{personalInfo.phone}</span>
                    <span style={{color: theme.colors.accent}}>&bull;</span>
                    <a href={`mailto:${personalInfo.email}`} className="hover:underline" style={{color: theme.colors.accent}}>{personalInfo.email}</a>
                    <span style={{color: theme.colors.accent}}>&bull;</span>
                    <a href={formatLink(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{color: theme.colors.accent}}>{personalInfo.linkedin}</a>
                    <span style={{color: theme.colors.accent}}>&bull;</span>
                    <span>{personalInfo.location}</span>
                </div>
            </header>
            
            <main>
                {sectionOrder.map(key => renderSection(key))}
            </main>
        </div>
    );
};

const Section: FC<{ title: string; theme: Theme; children: React.ReactNode }> = ({ title, theme, children }) => (
    <section className="mb-4">
        <h2 style={{ fontFamily: theme.fonts.heading.family, color: theme.colors.primary, borderColor: theme.colors.primary }} className="text-base font-bold uppercase tracking-widest border-b-2 mb-2 pb-1" >{title}</h2>
        {children}
    </section>
);


export default ExecutiveResume;
