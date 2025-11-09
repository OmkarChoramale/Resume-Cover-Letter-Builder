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

// This is a placeholder as this template might need more specific data fields
// For now, it uses existing fields.
const AcademicResume: FC<ResumeTemplateProps> = ({ data, theme }) => {
  // FIX: Added guard clause for optional props
  if (!theme) return null;

  const { personalInfo, summary, education, experience, skills, projects } = data;
    const headingStyles = {
        fontFamily: theme.fonts.heading.family,
        fontWeight: theme.fonts.heading.weight,
        color: theme.colors.primary,
    };

  return (
    <div className="p-10">
      <header className="text-center mb-8">
        <h1 style={{...headingStyles, fontSize: '2.5rem'}}>{personalInfo.name}</h1>
        <p className="text-lg">{personalInfo.title}</p>
        <div className="text-sm text-gray-500 mt-2 flex justify-center items-center gap-2 flex-wrap">
          <span>{personalInfo.email}</span>
          <span>&bull;</span>
          <span>{personalInfo.location}</span>
          {personalInfo.website && <><span>&bull;</span><a href={formatLink(personalInfo.website)} target="_blank" rel="noopener noreferrer" style={{color: theme.colors.accent}} className="hover:underline">Website</a></>}
        </div>
      </header>
      
      <Section title="Statement of Purpose" theme={theme}>
        <p>{summary}</p>
      </Section>
      
      <Section title="Education" theme={theme}>
        {education.map(edu => (
          <div key={edu.id} className="mb-3">
            <h3 style={{...headingStyles, fontSize: '1.1rem'}}>{edu.degree}</h3>
            <p className="font-semibold">{edu.institution}</p>
            <p className="text-sm text-gray-500">{edu.endDate} | GPA: {edu.gpa}</p>
          </div>
        ))}
      </Section>
      
      <Section title="Research Experience" theme={theme}>
        {experience.map(exp => (
          <div key={exp.id} className="mb-4">
            <h3 style={{...headingStyles, fontSize: '1.1rem'}}>{exp.role}</h3>
            <p className="font-semibold">{exp.company}</p>
            <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
            <ul className="list-disc pl-5 mt-1 text-sm">{exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace('• ', '')}</li>)}</ul>
          </div>
        ))}
      </Section>
      
      <Section title="Publications" theme={theme}>
        {projects.map(proj => (
          <div key={proj.id} className="mb-3">
            <p><strong className="font-semibold">[{proj.name}]</strong> {proj.description}</p>
          </div>
        ))}
      </Section>

      <Section title="Skills" theme={theme}>
        <p>{skills.map(s => s.value).join(', ')}</p>
      </Section>
    </div>
  );
};

const Section: FC<{ title: string; theme: Theme; children: React.ReactNode }> = ({ title, theme, children }) => (
  <section className="mb-6">
    <h2 style={{ fontFamily: theme.fonts.heading.family, color: theme.colors.primary, borderBottom: `1px solid ${theme.colors.accent}`}} className="text-lg font-bold uppercase tracking-wider pb-1 mb-3">{title}</h2>
    {children}
  </section>
);

export default AcademicResume;
