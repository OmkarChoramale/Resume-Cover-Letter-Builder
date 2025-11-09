
import React, { type FC } from 'react';
import type { ResumeTemplateProps, Theme } from '../../../types';

const formatLink = (url: string) => {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    return `https://${url}`;
};

const InfographicResume: FC<ResumeTemplateProps> = ({ data, theme, sections }) => {
  const { personalInfo, summary, experience, education, skills } = data;
    const headingStyles = (size = '1.2rem') => ({
        fontFamily: theme.fonts.heading.family,
        fontWeight: theme.fonts.heading.weight,
        color: theme.colors.primary,
        fontSize: size,
    });

  return (
    <div className="p-8 grid grid-cols-3 gap-8">
      <div className="col-span-1">
        <div style={{borderColor: theme.colors.accent}} className="p-1 border-4 rounded-full w-40 h-40 mx-auto flex items-center justify-center overflow-hidden">
            {personalInfo.profilePicture ? (
                <img src={personalInfo.profilePicture} alt={personalInfo.name} className="w-full h-full object-cover rounded-full" />
            ) : (
                <div className="text-center">
                    <h1 style={{...headingStyles('1.5rem'), lineHeight: 1}}>{personalInfo.name.split(' ')[0]}</h1>
                    <h1 style={{...headingStyles('1.5rem'), lineHeight: 1}}>{personalInfo.name.split(' ').slice(1).join(' ')}</h1>
                </div>
            )}
        </div>
        {!personalInfo.profilePicture && <h1 style={{ ...headingStyles('1.8rem'), textAlign: 'center', marginTop: '0.5rem' }}>{personalInfo.name}</h1>}
        <p style={{ color: theme.colors.accent, textAlign: 'center' }} className="font-semibold text-lg mt-2">{personalInfo.title}</p>

        <div className="mt-8 text-sm space-y-1">
            <h2 style={headingStyles()}>Contact</h2>
            <p>{personalInfo.phone}</p>
            <p>{personalInfo.email}</p>
            <p>{personalInfo.location}</p>
            {personalInfo.linkedin && <a href={formatLink(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" style={{color: theme.colors.accent}} className="hover:underline break-all">LinkedIn</a>}
            {personalInfo.github && <a href={formatLink(personalInfo.github)} target="_blank" rel="noopener noreferrer" style={{color: theme.colors.accent}} className="hover:underline break-all">GitHub</a>}
        </div>

        {sections.skills && skills.length > 0 && <div className="mt-6">
            <h2 style={headingStyles()}>Skills</h2>
            <ul className="space-y-2 mt-2">{skills.map((skill) => (<div key={skill.id}>
                <p className="text-sm font-medium">{skill.value}</p>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div style={{ width: `${80 + Math.random()*15}%`, backgroundColor: theme.colors.accent }} className="h-1.5 rounded-full"></div>
                </div>
            </div>))}</ul>
        </div>}
      </div>
      <div className="col-span-2">
        {sections.summary && summary && <Section title="Profile" theme={theme}><p>{summary}</p></Section>}
        {sections.experience && experience.length > 0 && <Section title="Experience" theme={theme}>{experience.map(exp => (<div key={exp.id} className="mb-4">
            <h3 style={headingStyles('1.1rem')}>{exp.role}</h3>
            <p className="font-semibold">{exp.company} | {exp.startDate} - {exp.endDate}</p>
            <ul className="list-disc pl-5 mt-1 text-sm">{exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace('• ', '')}</li>)}</ul>
        </div>))}</Section>}
         {sections.education && education.length > 0 && <Section title="Education" theme={theme}>{education.map(edu => (<div key={edu.id} className="mb-3">
            <h3 style={headingStyles('1.1rem')}>{edu.degree}</h3>
            <p className="font-semibold">{edu.institution}</p>
            <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
        </div>))}</Section>}
      </div>
    </div>
  );
};

const Section: FC<{ title: string; theme: Theme; children: React.ReactNode }> = ({ title, theme, children }) => (
  <section className="mb-6">
    <h2 style={{ fontFamily: theme.fonts.heading.family, color: theme.colors.accent }} className="text-2xl font-bold mb-2">{title}</h2>
    {children}
  </section>
);


export default InfographicResume;
