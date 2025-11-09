
import React, { type FC, type CSSProperties, type ReactNode } from 'react';
import type { ResumeTemplateProps, SectionKeys, Theme } from '../../../types';

// Helper to generate heading styles
const getHeadingStyles = (theme: Theme) => ({
    fontFamily: theme.fonts.heading.family,
    fontWeight: theme.fonts.heading.weight,
    fontSize: `${theme.fonts.heading.size}px`,
    color: theme.colors.primary,
});

const formatLink = (url: string) => {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    return `https://${url}`;
};

const Link: FC<{ href: string; children: React.ReactNode; className?: string; style?: CSSProperties }> = ({ href, children, ...props }) => (
  <a href={formatLink(href)} target="_blank" rel="noopener noreferrer" {...props}>
    {children}
  </a>
);

const ModernResume: FC<ResumeTemplateProps> = ({ data, theme, sections, sectionOrder }) => {
  const { personalInfo, summary, experience, education, skills, projects, certificates, achievements, languages } = data;
  
  const renderSection = (key: SectionKeys) => {
    if (!sections[key]) return null;
    switch (key) {
        case 'summary':
            return summary && <Section title="Summary" theme={theme}><p>{summary}</p></Section>;
        case 'experience':
            return experience.length > 0 && <Section title="Experience" theme={theme}>{experience.map(exp => (
                <div key={exp.id} className="mb-4">
                    <h3 style={{ ...getHeadingStyles(theme), fontSize: '1.1em' }}>{exp.role}</h3>
                    <div className="flex justify-between items-baseline mb-1">
                        <h4 style={{ color: theme.colors.primary, fontWeight: 500 }}>{exp.company}</h4>
                        <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">{exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace('• ', '')}</li>)}</ul>
                </div>))}</Section>;
        case 'projects':
            return projects.length > 0 && <Section title="Projects" theme={theme}>{projects.map(proj => (
                <div key={proj.id} className="mb-3">
                    <h3 style={{ ...getHeadingStyles(theme), fontSize: '1.1em' }}>{proj.name}</h3>
                    <p>{proj.description}</p>
                    <Link href={proj.link} style={{ color: theme.colors.accent }} className="hover:underline text-sm">{proj.link}</Link>
                </div>))}</Section>;
        case 'certificates':
            return certificates.length > 0 && <Section title="Certificates" theme={theme}>{certificates.map(cert => (
                <div key={cert.id} className="mb-2">
                    <h3 className="font-bold">{cert.name}</h3>
                    <p className="italic text-gray-600">{cert.issuer} - {cert.date}</p>
                </div>))}</Section>;
        case 'achievements':
            return achievements.length > 0 && <Section title="Achievements" theme={theme}><ul className="list-disc pl-5 space-y-1">{achievements.map(ach => <li key={ach.id}>{ach.description}</li>)}</ul></Section>;
        default: return null;
    }
  };
  
  const renderSidebarSection = (key: SectionKeys) => {
    if (!sections[key]) return null;
     switch (key) {
        case 'skills':
            return skills.length > 0 && <Section title="Skills" theme={theme}><ul className="flex flex-wrap gap-2">{skills.map((skill) => (<li key={skill.id} style={{ backgroundColor: theme.colors.primary, color: theme.colors.background }} className="text-xs py-1 px-3 rounded-full">{skill.value}</li>))}</ul></Section>;
        case 'education':
            return education.length > 0 && <Section title="Education" theme={theme}>{education.map(edu => (<div key={edu.id} className="mb-2"><h3 className="font-bold">{edu.institution}</h3><p className="italic">{edu.degree}</p><p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p></div>))}</Section>;
        case 'languages':
            return languages.length > 0 && <Section title="Languages" theme={theme}>{languages.map(lang => (<p key={lang.id} className="mb-1">{lang.name} <span className="text-gray-500">({lang.proficiency})</span></p>))}</Section>;
        default: return null;
    }
  };

  return (
    <div className="p-8 flex">
      {/* Sidebar */}
      <div className="w-1/3 pr-8 border-r border-gray-200">
        <h1 style={getHeadingStyles(theme)}>{personalInfo.name}</h1>
        <h2 style={{ color: theme.colors.accent, fontWeight: 500, fontSize: '1.25rem' }} className="mb-4">{personalInfo.title}</h2>
        
        <Section title="Contact" theme={theme}>
          <p>{personalInfo.phone}</p>
          <p>{personalInfo.email}</p>
          <p>{personalInfo.location}</p>
          {personalInfo.linkedin && <Link href={personalInfo.linkedin} style={{ color: theme.colors.accent }} className="hover:underline text-sm">{personalInfo.linkedin}</Link>}
          {personalInfo.github && <Link href={personalInfo.github} style={{ color: theme.colors.accent }} className="hover:underline text-sm">{personalInfo.github}</Link>}
          {personalInfo.website && <Link href={personalInfo.website} style={{ color: theme.colors.accent }} className="hover:underline text-sm">{personalInfo.website}</Link>}
        </Section>
        
        {sectionOrder.map(key => renderSidebarSection(key))}
      </div>

      {/* Main Content */}
      <div className="w-2/3 pl-8">
        {sectionOrder.map(key => renderSection(key))}
      </div>
    </div>
  );
};

const Section: FC<{ title: string; children: ReactNode; theme: Theme }> = ({ title, children, theme }) => (
  <div className="mb-6">
    <h2 style={{...getHeadingStyles(theme), fontSize: '1.2em' }} className="border-b-2 border-gray-200 pb-1 mb-3">{title}</h2>
    {children}
  </div>
);

export default ModernResume;
