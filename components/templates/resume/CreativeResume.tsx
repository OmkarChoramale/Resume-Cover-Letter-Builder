
import React, { type FC, type CSSProperties } from 'react';
import type { ResumeTemplateProps, SectionKeys, Theme } from '../../../types';

const getHeadingStyles = (theme: Theme, color: string) => ({
    fontFamily: theme.fonts.heading.family,
    fontWeight: theme.fonts.heading.weight,
    color: color,
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

const CreativeResume: FC<ResumeTemplateProps> = ({ data, theme, sections, sectionOrder }) => {
  const { personalInfo, summary, experience, education, skills, projects, certificates } = data;

  const renderLeftSection = (key: SectionKeys) => {
    if (!sections[key]) return null;
     switch (key) {
        case 'summary':
            return summary && <Section title="About Me" theme={theme}><p className="text-sm">{summary}</p></Section>;
        case 'skills':
            return skills.length > 0 && <Section title="Skills" theme={theme}><ul className="space-y-1">{skills.map((skill) => (<li key={skill.id} className="flex items-center text-sm"><span style={{ backgroundColor: theme.colors.accent }} className="w-2 h-2 rounded-full mr-2"></span>{skill.value}</li>))}</ul></Section>;
        case 'education':
            return education.length > 0 && <Section title="Education" theme={theme}>{education.map(edu => (<div key={edu.id} className="mb-2"><h3 className="font-bold">{edu.institution}</h3><p className="italic text-sm">{edu.degree}</p><p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p></div>))}</Section>;
        default: return null;
     }
  };

  const renderRightSection = (key: SectionKeys) => {
    if (!sections[key]) return null;
     switch (key) {
        case 'experience':
            return experience.length > 0 && <Section title="Experience" theme={theme}><div className="relative border-l-2 border-gray-200 pl-6">{experience.map((exp) => (<div key={exp.id} className="mb-8 relative"><div style={{ backgroundColor: theme.colors.accent, border: '4px solid white' }} className="absolute -left-[34px] top-1 w-4 h-4 rounded-full"></div><p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p><h3 className="text-lg font-bold">{exp.role}</h3><h4 className="font-semibold text-gray-600 mb-2">{exp.company}</h4><ul className="text-sm list-disc pl-4">{exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace('• ', '')}</li>)}</ul></div>))}</div></Section>;
        case 'projects':
            return projects.length > 0 && <Section title="Projects" theme={theme}>{projects.map(proj => (<div key={proj.id} className="mb-4"><h3 className="text-lg font-bold">{proj.name}</h3><p className="text-sm">{proj.description}</p></div>))}</Section>;
        case 'certificates':
            return certificates.length > 0 && <Section title="Certificates" theme={theme}>{certificates.map(cert => (<div key={cert.id} className="mb-2"><h3 className="font-bold">{cert.name}</h3><p className="italic text-sm">{cert.issuer} - {cert.date}</p></div>))}</Section>;
        default: return null;
     }
  };


  return (
    <div style={{ backgroundColor: theme.colors.primary }} className="p-8 text-white">
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-2xl">
        <header className="flex items-center mb-8">
          <div style={{ backgroundColor: theme.colors.accent }} className="w-24 h-24 rounded-full flex items-center justify-center mr-6 overflow-hidden">
            {personalInfo.profilePicture ? (
                <img src={personalInfo.profilePicture} alt={personalInfo.name} className="w-full h-full object-cover" />
            ) : (
                <span style={{ fontFamily: theme.fonts.heading.family }} className="text-4xl font-bold text-white">{personalInfo.name.charAt(0)}</span>
            )}
          </div>
          <div>
            <h1 style={{ ...getHeadingStyles(theme, theme.colors.primary), fontSize: '2.5rem' }}>{personalInfo.name}</h1>
            <p style={{ color: theme.colors.text, fontSize: '1.25rem' }}>{personalInfo.title}</p>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1">
            <Section title="Contact" theme={theme}>
              <p className="text-sm">{personalInfo.phone}</p>
              <p className="text-sm">{personalInfo.email}</p>
              <p className="text-sm">{personalInfo.location}</p>
              {personalInfo.linkedin && <Link href={personalInfo.linkedin} style={{ color: theme.colors.accent }} className="hover:underline text-sm break-all">LinkedIn</Link>}
              {personalInfo.github && <Link href={personalInfo.github} style={{ color: theme.colors.accent }} className="hover:underline text-sm break-all">GitHub</Link>}
              {personalInfo.website && <Link href={personalInfo.website} style={{ color: theme.colors.accent }} className="hover:underline text-sm break-all">Website</Link>}
            </Section>
            {sectionOrder.map(key => renderLeftSection(key))}
          </div>
          <div className="col-span-2">
            {sectionOrder.map(key => renderRightSection(key))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Section: FC<{ title: string; theme: Theme; children: React.ReactNode }> = ({ title, theme, children }) => (
  <div className="mb-6">
    <h2 style={{ ...getHeadingStyles(theme, theme.colors.text), fontSize: '1rem' }} className="uppercase tracking-wider mb-3">{title}</h2>
    {children}
  </div>
);

export default CreativeResume;
