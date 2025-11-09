
import React, { type FC } from 'react';
import type { ResumeTemplateProps, SectionKeys, Theme } from '../../../types';

const getHeadingStyles = (theme: Theme, size = '1rem', color = theme.colors.primary) => ({
    fontFamily: theme.fonts.heading.family,
    fontWeight: theme.fonts.heading.weight,
    fontSize: size,
    color: color,
});

const formatLink = (url: string) => {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    return `https://${url}`;
};

const MinimalistResume: FC<ResumeTemplateProps> = ({ data, theme, sections, sectionOrder }) => {
  const { personalInfo, summary, experience, education, skills, projects, achievements } = data;

  const renderSection = (key: SectionKeys) => {
    if (!sections[key]) return null;
    switch(key) {
        case 'summary':
            return summary && <p className="leading-relaxed mb-8">{summary}</p>;
        case 'experience':
            return experience.length > 0 && <Section title="Experience" theme={theme}>{experience.map(exp => (
            <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 style={getHeadingStyles(theme)}>{exp.role}, <span className="font-normal text-gray-600">{exp.company}</span></h3>
                  <p className="text-sm text-gray-400">{exp.startDate} — {exp.endDate}</p>
                </div>
                <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">{exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace('• ', '')}</li>)}</ul>
            </div>))}</Section>;
        case 'education':
            return education.length > 0 && <Section title="Education" theme={theme}>{education.map(edu => (
                <div key={edu.id} className="mb-2">
                    <h3 style={getHeadingStyles(theme)}>{edu.degree}</h3>
                    <p>{edu.institution}</p>
                    <p className="text-sm text-gray-400">{edu.startDate} — {edu.endDate}</p>
                </div>))}</Section>;
        case 'skills':
            return skills.length > 0 && <Section title="Skills" theme={theme}><p>{skills.map(s => s.value).join(' · ')}</p></Section>;
        case 'projects':
            return projects.length > 0 && <Section title="Projects" theme={theme}>{projects.map(proj => (
              <div key={proj.id} className="mb-3">
                <h3 style={getHeadingStyles(theme)}>{proj.name}</h3>
                <p className="text-sm">{proj.description}</p>
              </div>))}</Section>;
        case 'achievements':
            return achievements.length > 0 && <Section title="Achievements" theme={theme}><ul className="list-disc pl-5 space-y-1 text-sm">{achievements.map(ach => <li key={ach.id}>{ach.description}</li>)}</ul></Section>;
        default: return null;
    }
  }

  return (
    <div className="p-10">
      <header className="mb-10">
        <h1 style={{...getHeadingStyles(theme, '3rem'), lineHeight: 1.1}} className="tracking-tight">{personalInfo.name}</h1>
        <p style={{ color: theme.colors.text, fontSize: '1.2rem' }} className="mt-1">{personalInfo.title}</p>
        <div className="text-sm text-gray-500 mt-2 flex items-center gap-2 flex-wrap">
          <a href={`mailto:${personalInfo.email}`} className="hover:underline" style={{color: theme.colors.accent}}>{personalInfo.email}</a>
          <span>·</span>
          <span>{personalInfo.phone}</span>
          {personalInfo.linkedin && <><span>·</span><a href={formatLink(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{color: theme.colors.accent}}>LinkedIn</a></>}
          {personalInfo.github && <><span>·</span><a href={formatLink(personalInfo.github)} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{color: theme.colors.accent}}>GitHub</a></>}
        </div>
      </header>

      <main className="space-y-8">
        {sectionOrder.map(key => renderSection(key))}
      </main>
    </div>
  );
};

const Section: FC<{ title: string; theme: Theme; children: React.ReactNode }> = ({ title, theme, children }) => (
  <section>
    <h2 style={{...getHeadingStyles(theme, '0.75rem', theme.colors.text)}} className="uppercase tracking-widest mb-3 opacity-70">{title}</h2>
    {children}
  </section>
);


export default MinimalistResume;
