
import React, { type FC } from 'react';
import type { ResumeTemplateProps } from '../../../types';

const FormalCoverLetter: FC<ResumeTemplateProps> = ({ data, theme }) => {
  const { personalInfo, coverLetter } = data;
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const headingStyles = {
    fontFamily: theme.fonts.heading.family,
    fontWeight: theme.fonts.heading.weight,
    color: theme.colors.primary,
  };

  const formatLink = (url: string) => {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://${url}`;
  };

  return (
    <div className="p-12 font-serif text-gray-800 leading-relaxed">
      <header className="text-center mb-8">
        <h1 style={{ ...headingStyles, fontSize: '2rem' }}>{personalInfo.name}</h1>
        <p style={{ color: theme.colors.text }} className="text-lg">{personalInfo.title}</p>
        <div className="text-sm text-gray-600 mt-2 flex justify-center items-center gap-x-2 flex-wrap">
          <span>{personalInfo.email}</span>
          <span>|</span>
          <span>{personalInfo.phone}</span>
          <span>|</span>
          <span>{personalInfo.location}</span>
        </div>
        <a href={formatLink(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" style={{ color: theme.colors.accent }} className="text-sm hover:underline">
          {personalInfo.linkedin}
        </a>
      </header>
      
      <hr style={{borderColor: theme.colors.primary}} className="mb-8" />
      
      <div className="mb-8 text-sm">
        <p>{currentDate}</p>
        <br />
        <p>Hiring Manager</p>
        <p>[Company Name]</p>
      </div>

      <div className="whitespace-pre-wrap text-base">
        {coverLetter}
      </div>
    </div>
  );
};

export default FormalCoverLetter;
