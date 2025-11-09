
import React, { type FC, type CSSProperties, type ReactNode } from 'react';
import type { ResumeTemplateProps } from '../../../types';

// Hardcoded theme for simplicity and a professional look
const theme = {
    colors: {
        primary: '#1e293b',    // slate-800
        text: '#334155',       // slate-700
        accent: '#0ea5e9',     // sky-500
        background: '#ffffff',
    },
    fonts: {
        heading: {
          family: "'Inter', sans-serif",
          weight: 700,
        },
        body: {
          family: "'Inter', sans-serif",
          weight: 400,
        },
    }
};

const getHeadingStyles = (size: string) => ({
    fontFamily: theme.fonts.heading.family,
    fontWeight: theme.fonts.heading.weight,
    fontSize: size,
    color: theme.colors.primary,
});

const formatLink = (url: string) => {
    if (!url) return '';
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

const ModernResume: FC<ResumeTemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  return (
    <div className="p-8 flex font-sans text-sm" style={{ color: theme.colors.text, fontFamily: theme.fonts.body.family }}>
      {/* Sidebar */}
      <aside className="w-1/3 pr-8 border-r border-gray-200 flex flex-col gap-6">
        <div>
            {personalInfo.profilePicture && (
                <img src={personalInfo.profilePicture} alt={personalInfo.name} className="w-32 h-32 rounded-full object-cover mb-4" />
            )}
            <h1 style={getHeadingStyles('28px')}>{personalInfo.name}</h1>
            <h2 style={{ color: theme.colors.accent, fontWeight: 500, fontSize: '1.25rem' }}>{personalInfo.title}</h2>
        </div>
        
        <Section title="Contact">
          <div className="flex flex-col gap-1 text-sm">
            {personalInfo.phone && <p>{personalInfo.phone}</p>}
            {personalInfo.email && <p>{personalInfo.email}</p>}
            {personalInfo.location && <p>{personalInfo.location}</p>}
            {personalInfo.linkedin && <Link href={personalInfo.linkedin} style={{ color: theme.colors.accent }} className="hover:underline break-all">{personalInfo.linkedin}</Link>}
            {personalInfo.github && <Link href={personalInfo.github} style={{ color: theme.colors.accent }} className="hover:underline break-all">{personalInfo.github}</Link>}
            {personalInfo.website && <Link href={personalInfo.website} style={{ color: theme.colors.accent }} className="hover:underline break-all">{personalInfo.website}</Link>}
          </div>
        </Section>
        
        {education.length > 0 && <Section title="Education">{education.map(edu => (<div key={edu.id} className="mb-2"><h3 className="font-bold">{edu.institution}</h3><p className="italic">{edu.degree}</p><p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p></div>))}</Section>}

        {skills.length > 0 && <Section title="Skills"><ul className="flex flex-wrap gap-2">{skills.map((skill) => (<li key={skill.id} style={{ backgroundColor: theme.colors.primary, color: theme.colors.background }} className="text-xs py-1 px-3 rounded-full">{skill.value}</li>))}</ul></Section>}
      </aside>

      {/* Main Content */}
      <main className="w-2/3 pl-8 flex flex-col gap-6">
        {summary && <Section title="Summary"><p>{summary}</p></Section>}

        {experience.length > 0 && <Section title="Experience">{experience.map(exp => (
            <div key={exp.id} className="mb-4">
                <h3 style={{ ...getHeadingStyles('16px') }}>{exp.role}</h3>
                <div className="flex justify-between items-baseline mb-1">
                    <h4 style={{ color: theme.colors.primary, fontWeight: 500 }}>{exp.company}</h4>
                    <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">{exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/•\s*/, '')}</li>)}</ul>
            </div>))}</Section>}
        
        {projects.length > 0 && <Section title="Projects">{projects.map(proj => (
            <div key={proj.id} className="mb-3">
                <h3 style={{ ...getHeadingStyles('16px') }}>{proj.name}</h3>
                <p>{proj.description}</p>
                {proj.link && <Link href={proj.link} style={{ color: theme.colors.accent }} className="hover:underline text-sm">{proj.link}</Link>}
            </div>))}</Section>}
      </main>
    </div>
  );
};

const Section: FC<{ title: string; children: ReactNode; }> = ({ title, children }) => (
  <section>
    <h2 style={{...getHeadingStyles('18px') }} className="border-b-2 border-gray-200 pb-1 mb-3">{title}</h2>
    {children}
  </section>
);

export default ModernResume;
