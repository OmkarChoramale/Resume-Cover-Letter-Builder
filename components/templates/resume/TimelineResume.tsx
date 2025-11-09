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

const TimelineResume: FC<ResumeTemplateProps> = ({ data, theme, sections, sectionOrder }) => {
  // FIX: Added guard clause for optional props
  if (!theme || !sections || !sectionOrder) return null;

  const { personalInfo, summary, experience, education, skills } = data;
    const headingStyles = (size = '1.2rem') => ({
        fontFamily: theme.fonts.heading.family,
        fontWeight: theme.fonts.heading.weight,
        color: theme.colors.primary,
        fontSize: size,
    });

  return (
    <div className="p-10">
      <header className="text-center mb-8">
        <h1 style={headingStyles('2.5rem')}>{personalInfo.name}</h1>
        <p className="text-lg">{personalInfo.title}</p>
        <div className="text-sm text-gray-500 flex justify-center items-center gap-2 flex-wrap">
          <span>{personalInfo.email}</span>
          <span>&bull;</span>
          <span>{personalInfo.phone}</span>
          {personalInfo.linkedin && <><span>&bull;</span><a href={formatLink(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" style={{color: theme.colors.accent}} className="hover:underline">LinkedIn</a></>}
        </div>
      </header>
      
      {sections.summary && summary && <p className="text-center mb-8">{summary}</p>}
      
      {sections.experience && experience.length > 0 && <div>
        <div className="relative border-l-2 pl-8" style={{borderColor: theme.colors.accent}}>
          {experience.map(exp => (
            <div key={exp.id} className="mb-8 relative">
              <div style={{backgroundColor: theme.colors.accent}} className="absolute -left-[41px] top-1 w-4 h-4 rounded-full border-4 border-white"></div>
              <p className="text-sm font-medium text-gray-500">{exp.startDate} - {exp.endDate}</p>
              <h3 style={headingStyles('1.1rem')}>{exp.role}</h3>
              <p className="font-semibold">{exp.company}</p>
              <p className="text-sm mt-1">{exp.description.replace(/• /g, '')}</p>
            </div>
          ))}
        </div>
      </div>}
      
      <div className="grid grid-cols-2 gap-8 mt-8">
        {sections.education && education.length > 0 && <Section title="Education" theme={theme}>{education.map(edu => (<div key={edu.id} className="mb-3">
            <h3 style={headingStyles('1rem')}>{edu.institution}</h3>
            <p className="text-sm">{edu.degree}</p>
        </div>))}</Section>}
        
        {sections.skills && skills.length > 0 && <Section title="Skills" theme={theme}><p className="text-sm">{skills.map(s => s.value).join(', ')}</p></Section>}
      </div>
    </div>
  );
};

const Section: FC<{ title: string; theme: Theme; children: React.ReactNode }> = ({ title, theme, children }) => (
  <section>
    <h2 style={{ fontFamily: theme.fonts.heading.family, color: theme.colors.primary}} className="text-lg font-bold mb-2">{title}</h2>
    {children}
  </section>
);


export default TimelineResume;
