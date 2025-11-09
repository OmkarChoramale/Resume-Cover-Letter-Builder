
import React, { type FC } from 'react';
import type { ResumeTemplateProps, SectionKeys, Theme } from '../../../types';

const getHeadingStyles = (theme: Theme, size = '1.25rem') => ({
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

const ProfessionalResume: FC<ResumeTemplateProps> = ({ data, theme, sections, sectionOrder }) => {
  const { personalInfo, summary, experience, education, skills, projects, certificates, languages } = data;

  const renderSection = (key: SectionKeys) => {
    if (!sections[key]) return null;
    switch(key) {
        case 'summary':
            return summary && <Section title="Professional Summary" theme={theme}><p>{summary}</p></Section>;
        case 'experience':
            return experience.length > 0 && <Section title="Work Experience" theme={theme}>{experience.map(exp => (
                <div key={exp.id} className="mb-4">
                    <div className="flex justify-between items-baseline">
                      <h3 style={getHeadingStyles(theme, '1.1rem')}>{exp.role} at <span style={{ color: theme.colors.primary }}>{exp.company}</span></h3>
                      <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <ul className="list-disc pl-5 mt-1 space-y-1">{exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace('• ', '')}</li>)}</ul>
                </div>))}</Section>;
        case 'education':
            return education.length > 0 && <Section title="Education" theme={theme}>{education.map(edu => (
                <div key={edu.id} className="mb-2">
                    <h3 style={getHeadingStyles(theme, '1.1rem')}>{edu.institution}</h3>
                    <p className="italic">{edu.degree}</p>
                    <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
                </div>))}</Section>;
        case 'skills':
            return skills.length > 0 && <Section title="Skills" theme={theme}><ul className="flex flex-wrap gap-2">{skills.map(skill => <li key={skill.id} className="bg-gray-200 text-gray-700 text-sm py-1 px-3 rounded">{skill.value}</li>)}</ul></Section>;
        case 'languages':
            return languages.length > 0 && <Section title="Languages" theme={theme}>{languages.map(lang => <p key={lang.id}>{lang.name} ({lang.proficiency})</p>)}</Section>;
        case 'certificates':
            return certificates.length > 0 && <Section title="Certificates" theme={theme}>{certificates.map(cert => (
                <div key={cert.id} className="mb-2">
                    <h3 className="font-semibold">{cert.name}</h3>
                    <p className="text-sm italic">{cert.issuer} ({cert.date})</p>
                </div>))}</Section>;
         case 'projects':
            return projects.length > 0 && <Section title="Projects" theme={theme}>{projects.map(proj => (
              <div key={proj.id} className="mb-3">
                <h3 style={getHeadingStyles(theme, '1.1rem')}>{proj.name}</h3>
                <p>{proj.description}</p>
              </div>))}</Section>;
        default: return null;
    }
  };


  return (
    <div className="p-8">
      <header style={{ backgroundColor: theme.colors.primary, color: theme.colors.background }} className="p-6 rounded-t-lg">
        <h1 style={{...getHeadingStyles(theme, '2.5rem'), color: 'inherit'}} className="tracking-wide">{personalInfo.name}</h1>
        <p className="text-xl opacity-90">{personalInfo.title}</p>
      </header>
      <div style={{ backgroundColor: theme.colors.accent }} className="p-2 flex justify-center items-center gap-x-4 text-sm text-white flex-wrap">
          <span>{personalInfo.email}</span>
          <span>&bull;</span>
          <span>{personalInfo.phone}</span>
           <span>&bull;</span>
          <span>{personalInfo.location}</span>
          {personalInfo.linkedin && <><span>&bull;</span><a href={formatLink(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a></>}
          {personalInfo.github && <><span>&bull;</span><a href={formatLink(personalInfo.github)} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a></>}
          {personalInfo.website && <><span>&bull;</span><a href={formatLink(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="hover:underline">Portfolio</a></>}
      </div>

      <main className="p-6">
        {sectionOrder.map(key => renderSection(key))}
      </main>
    </div>
  );
};

const Section: FC<{ title: string; theme: Theme; children: React.ReactNode }> = ({ title, theme, children }) => (
  <section className="mb-6">
    <h2 style={{...getHeadingStyles(theme, '1.25rem'), borderBottom: `2px solid #e5e7eb`}} className="pb-1 mb-3">{title}</h2>
    {children}
  </section>
);

export default ProfessionalResume;
