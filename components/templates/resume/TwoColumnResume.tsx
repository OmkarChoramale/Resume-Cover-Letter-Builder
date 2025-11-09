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

const TwoColumnResume: FC<ResumeTemplateProps> = ({ data, theme, sections, sectionOrder }) => {
  // FIX: Added guard clause for optional props
  if (!theme || !sections || !sectionOrder) return null;

  const { personalInfo, summary, experience, education, skills, projects } = data;
    const headingStyles = (size = '1.2rem') => ({
        fontFamily: theme.fonts.heading.family,
        fontWeight: theme.fonts.heading.weight,
        color: theme.colors.primary,
        fontSize: size,
    });
    
  const mainSections: SectionKeys[] = ['summary', 'experience', 'projects'];
  const sidebarSections: SectionKeys[] = ['education', 'skills'];

  return (
    <div className="p-8">
      <header className="mb-6">
        <h1 style={headingStyles('2.5rem')}>{personalInfo.name}</h1>
        <p style={{color: theme.colors.accent}} className="text-xl font-semibold">{personalInfo.title}</p>
        <div className="text-sm mt-2 flex items-center gap-2 flex-wrap">
          <span>{personalInfo.phone}</span>
          <span>&bull;</span>
          <a href={`mailto:${personalInfo.email}`} className="hover:underline" style={{color: theme.colors.accent}}>{personalInfo.email}</a>
          <span>&bull;</span>
          <span>{personalInfo.location}</span>
          {personalInfo.linkedin && <><span>&bull;</span><a href={formatLink(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{color: theme.colors.accent}}>LinkedIn</a></>}
        </div>
      </header>
      
      <div className="flex gap-8">
        <div className="w-2/3">
          {sectionOrder.filter(s => mainSections.includes(s) && sections[s]).map(key => {
            if (key === 'summary') return <Section theme={theme} title="Summary"><p>{summary}</p></Section>
            if (key === 'experience') return <Section theme={theme} title="Experience">{experience.map(exp => (
              <div key={exp.id} className="mb-4">
                <h3 style={headingStyles('1.1rem')}>{exp.role}</h3>
                <p className="font-semibold">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                <ul className="list-disc pl-5 mt-1 text-sm">{exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace('• ', '')}</li>)}</ul>
              </div>
            ))}</Section>
            if (key === 'projects') return <Section theme={theme} title="Projects">{projects.map(p => (
              <div key={p.id} className="mb-3">
                <h3 style={headingStyles('1.1rem')}>{p.name}</h3>
                <p>{p.description}</p>
              </div>
            ))}</Section>
            return null;
          })}
        </div>
        <div className="w-1/3 border-l-2 pl-6" style={{borderColor: theme.colors.accent}}>
          {sectionOrder.filter(s => sidebarSections.includes(s) && sections[s]).map(key => {
            if (key === 'education') return <Section theme={theme} title="Education">{education.map(edu => (
              <div key={edu.id}>
                <h3 style={headingStyles('1rem')}>{edu.institution}</h3>
                <p>{edu.degree}</p>
                <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}</Section>
            if (key === 'skills') return <Section theme={theme} title="Skills"><ul className="space-y-1">{skills.map((s) => <li key={s.id}>{s.value}</li>)}</ul></Section>
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

const Section: FC<{ title: string; theme: Theme; children: React.ReactNode }> = ({ title, theme, children }) => (
  <section className="mb-6">
    <h2 style={{ fontFamily: theme.fonts.heading.family, color: theme.colors.primary}} className="text-xl font-bold mb-2">{title}</h2>
    {children}
  </section>
);


export default TwoColumnResume;
