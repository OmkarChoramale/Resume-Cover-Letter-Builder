import React, { type FC } from 'react';
import type { ResumeTemplateProps } from '../../../types';

const ClassicCoverLetter: FC<ResumeTemplateProps> = ({ data, theme }) => {
  // FIX: Added guard clause for optional props
  if (!theme) return null;
  
  const { personalInfo, coverLetter } = data;
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="p-12 leading-relaxed max-w-4xl mx-auto">
        <header className="text-center mb-12 border-b-2 pb-4">
            <h1 style={{
                fontFamily: theme.fonts.heading.family,
                fontSize: `${theme.fonts.heading.size * 1.3}px`,
                fontWeight: theme.fonts.heading.weight,
                color: theme.colors.primary 
            }}>{personalInfo.name}</h1>
            <p className="text-md mt-2">
                {personalInfo.location} | {personalInfo.phone} | {personalInfo.email}
            </p>
        </header>
      
      <div className="mb-8 text-sm">
        <p>Hiring Manager</p>
        <p>[Company Name]</p>
        <p>[Company Address]</p>
        <p className="mt-4">{currentDate}</p>
      </div>

      <div className="space-y-4 whitespace-pre-wrap text-base">
        {coverLetter}
      </div>

      <footer style={{ borderColor: theme.colors.accent }} className="mt-12 pt-4 border-t-2">
        <p className="text-center text-sm text-gray-500">
            {personalInfo.name} | {personalInfo.title}
        </p>
      </footer>
    </div>
  );
};

export default ClassicCoverLetter;
