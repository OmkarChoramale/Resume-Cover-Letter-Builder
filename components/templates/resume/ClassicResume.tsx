import React, { type FC } from 'react';
// FIX: Import correct types
import type { ResumeTemplateProps, SectionKeys, Theme } from '../../../types';

// Helper to generate heading styles
const getHeadingStyles = (theme: Theme, size = '2rem') => ({
    fontFamily: theme.fonts.heading.family,
    fontWeight: theme.fonts.heading.weight,
    fontSize: size,
    color: theme.colors.primary,
});

const formatLink = (url: string) => {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    return `https://${url}`;
};

const ClassicResume: FC<ResumeTemplateProps> = ({ data, theme, sections, sectionOrder }) => {
  // FIX: Added guard clause for optional props
  if (!theme || !sections || !sectionOrder) return null;

  const { personalInfo, summary, experience, education, skills, projects, certificates, achievements, languages } = data;

   const renderSection = (key: SectionKeys) => {
    if (!sections[key]) return null;
    switch (key) {
      case 'summary':
        return summary && <Section title="Summary" theme={theme}><p>{summary}</p></Section>;
      case 'experience':
        return experience.length > 0 && <Section title="Experience" theme={theme}>{experience.map(exp => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 style={{ ...getHeadingStyles(theme, '1.1rem') }}>{exp.role}</h3>
              <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
            </div>
            <h4 className="text-md font-medium text-gray-600 mb-1">{exp.company}</h4>
            <ul className="list-disc pl-5 space-y-1">{exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace('• ', '')}</li>)}</ul>
          </div>
        ))}</Section>;
      case 'education':
        return education.length > 0 && <Section title="Education" theme={theme}>{education.map(edu => (
            <div key={edu.id} className="mb-2 flex justify-between">
                <div>
                    <h3 style={{...getHeadingStyles(theme, '1.1rem')}}>{edu.institution}</h3>
                    <p className="italic">{edu.degree}</p>
                </div>
                <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
            </div>
        ))}</Section>;
      case 'skills':
        return skills.length > 0 && <Section title="Skills" theme={theme}><p>{skills.map(s => s.value).join(', ')}</p></Section>;
      case 'projects':
        return projects.length > 0 && <Section title="Projects" theme={theme}>{projects.map(proj => (
          <div key={proj.id} className="mb-2">
            <h3 style={{...getHeadingStyles(theme, '1.1rem')}}>{proj.name}</h3>
            <p>{proj.description}</p>
          </div>
        ))}</Section>;
      case 'certificates':
         return certificates.length > 0 && <Section title="Certificates" theme={theme}>{certificates.map(cert => (
            <div key={cert.id} className="mb-2">
                <h3 style={{...getHeadingStyles(theme, '1.1rem')}}>{cert.name}</h3>
                <p className="italic">{cert.issuer} ({cert.date})</p>
            </div>
        ))}</Section>;
      case 'achievements':
         return achievements.length > 0 && <Section title="Achievements" theme={theme}><ul className="list-disc pl-5 space-y-1">{achievements.map(ach => <li key={ach.id}>{ach.description}</li>)}</ul></Section>;
      case 'languages':
         return languages.length > 0 && <Section title="Languages" theme={theme}><p>{languages.map(lang => `${lang.name} (${lang.proficiency})`).join(' | ')}</p></Section>;
      default:
        return null;
    }
  };

  return (
    <div className="p-10">
      <header className="text-center mb-8">
        <h1 style={getHeadingStyles(theme, '2.5rem')}>{personalInfo.name}</h1>
        <p style={{ color: theme.colors.text, fontSize: '1.25rem' }} className="font-light mb-2">{personalInfo.title}</p>
        <div className="text-sm text-gray-600 flex justify-center items-center gap-2 flex-wrap">
          <span>{personalInfo.phone}</span>
          <span>&bull;</span>
          <span>{personalInfo.email}</span>
          <span>&bull;</span>
          <span>{personalInfo.location}</span>
          {personalInfo.linkedin && (
              <><span className="hidden md:inline">&bull;</span><a href={formatLink(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" style={{color: theme.colors.accent}} className="hover:underline">LinkedIn</a></>
          )}
           {personalInfo.website && (
              <><span className="hidden md:inline">&bull;</span><a href={formatLink(personalInfo.website)} target="_blank" rel="noopener noreferrer" style={{color: theme.colors.accent}} className="hover:underline">Portfolio</a></>
          )}
        </div>
      </header>

      {sectionOrder.map(key => renderSection(key))}
    </div>
  );
};

const Section: FC<{ title: string; theme: Theme; children: React.ReactNode }> = ({ title, theme, children }) => (
  <section className="mb-6">
    <h2 style={{...getHeadingStyles(theme, '1.5rem'), borderBottom: `2px solid ${theme.colors.accent}`}} className="pb-1 mb-3">{title}</h2>
    {children}
  </section>
);


export default ClassicResume;
