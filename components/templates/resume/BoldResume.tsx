import React, { type FC } from 'react';
// FIX: Import correct types
import type { ResumeTemplateProps, Theme } from '../../../types';

const formatLink = (url: string) => {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    return `https://${url}`;
};

const BoldResume: FC<ResumeTemplateProps> = ({ data, theme, sections, sectionOrder }) => {
  // FIX: Added guard clause for optional props
  if (!theme || !sections || !sectionOrder) return null;
  
  const { personalInfo, summary, experience, education, skills, projects } = data;
    const headingStyles = (color = theme.colors.primary) => ({
        fontFamily: theme.fonts.heading.family,
        fontWeight: theme.fonts.heading.weight,
        color: color,
    });

  return (
    <div className="flex min-h-[297mm]">
      <div style={{ backgroundColor: theme.colors.primary }} className="w-1/3 text-white p-8">
        <h1 style={{...headingStyles(theme.colors.background), fontSize: '2.5rem', lineHeight: 1.1}}>{personalInfo.name}</h1>
        <p style={{ color: theme.colors.accent }} className="text-lg font-medium mt-1">{personalInfo.title}</p>
        
        <div className="mt-8 space-y-1 text-sm">
            <h2 style={{...headingStyles(theme.colors.background), fontSize: '1.2rem'}} className="border-b-2 border-opacity-50 border-white pb-1 mb-3">Contact</h2>
            <p>{personalInfo.phone}</p>
            <p>{personalInfo.email}</p>
            <p>{personalInfo.location}</p>
            {personalInfo.linkedin && <a href={formatLink(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline text-cyan-300 break-all">LinkedIn</a>}
            {personalInfo.github && <a href={formatLink(personalInfo.github)} target="_blank" rel="noopener noreferrer" className="hover:underline text-cyan-300 break-all">GitHub</a>}
            {personalInfo.website && <a href={formatLink(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="hover:underline text-cyan-300 break-all">Website</a>}
        </div>
        
        {sections.skills && skills.length > 0 && <div className="mt-6">
            <h2 style={{...headingStyles(theme.colors.background), fontSize: '1.2rem'}} className="border-b-2 border-opacity-50 border-white pb-1 mb-3">Skills</h2>
            <ul className="space-y-1">{skills.map((skill) => <li key={skill.id}>{skill.value}</li>)}</ul>
        </div>}
        
        {sections.education && education.length > 0 && <div className="mt-6">
            <h2 style={{...headingStyles(theme.colors.background), fontSize: '1.2rem'}} className="border-b-2 border-opacity-50 border-white pb-1 mb-3">Education</h2>
            {education.map(edu => (<div key={edu.id} className="mb-3">
                <h3 className="font-bold">{edu.institution}</h3>
                <p className="text-sm italic">{edu.degree}</p>
                <p className="text-xs opacity-80">{edu.startDate} - {edu.endDate}</p>
            </div>))}
        </div>}
      </div>
      <div className="w-2/3 p-8">
        {sections.summary && summary && <Section title="Summary" theme={theme}><p>{summary}</p></Section>}
        
        {sections.experience && experience.length > 0 && <Section title="Experience" theme={theme}>{experience.map(exp => (<div key={exp.id} className="mb-4">
            <div className="flex justify-between items-baseline">
                <h3 style={{...headingStyles(), fontSize: '1.2rem'}}>{exp.role}</h3>
                <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
            </div>
            <p className="font-semibold">{exp.company}</p>
            <ul className="list-disc pl-5 mt-1 text-sm">{exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace('• ', '')}</li>)}</ul>
        </div>))}</Section>}
        
        {sections.projects && projects.length > 0 && <Section title="Projects" theme={theme}>{projects.map(proj => (<div key={proj.id} className="mb-3">
            <h3 style={{...headingStyles(), fontSize: '1.2rem'}}>{proj.name}</h3>
            <p>{proj.description}</p>
        </div>))}</Section>}
      </div>
    </div>
  );
};

const Section: FC<{ title: string; theme: Theme; children: React.ReactNode }> = ({ title, theme, children }) => (
  <section className="mb-6">
    <h2 style={{ fontFamily: theme.fonts.heading.family, color: theme.colors.accent, borderBottom: `2px solid ${theme.colors.primary}`}} className="text-xl font-bold pb-1 mb-3">{title}</h2>
    {children}
  </section>
);

export default BoldResume;
