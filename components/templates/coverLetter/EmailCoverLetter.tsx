import React, { type FC } from 'react';
import type { ResumeTemplateProps } from '../../../types';

const formatLink = (url: string) => {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    return `https://${url}`;
};

const EmailCoverLetter: FC<ResumeTemplateProps> = ({ data, theme }) => {
  // FIX: Added guard clause for optional props
  if (!theme) return null;
  
  const { personalInfo, coverLetter } = data;

  return (
    <div className="p-10 leading-relaxed text-base bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-lg">
        <p className="mb-4"><strong>Subject:</strong> Application for the {personalInfo.title} Position</p>
        <hr className="my-4" />
        <div className="space-y-4 whitespace-pre-wrap">
            {coverLetter}
        </div>
        <hr className="my-6" />
        <div className="text-sm">
            <p style={{
                fontFamily: theme.fonts.heading.family,
                fontSize: `1.2rem`,
                fontWeight: theme.fonts.heading.weight,
                color: theme.colors.primary
            }}>{personalInfo.name}</p>
            <p>{personalInfo.title}</p>
            <p>{personalInfo.email} | {personalInfo.phone}</p>
            {personalInfo.linkedin && <a href={formatLink(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" style={{ color: theme.colors.accent }} className="hover:underline">LinkedIn Profile</a>}
        </div>
      </div>
    </div>
  );
};

export default EmailCoverLetter;
