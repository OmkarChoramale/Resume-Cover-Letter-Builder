
import React, { type FC } from 'react';
import type { ResumeTemplateProps } from '../../../types';

const ModernCoverLetter: FC<ResumeTemplateProps> = ({ data, theme }) => {
  const { personalInfo, coverLetter } = data;
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="p-10">
      <header style={{ backgroundColor: theme.colors.primary, color: theme.colors.background }} className="p-8 mb-10">
        <h1 style={{
            fontFamily: theme.fonts.heading.family,
            fontSize: `${theme.fonts.heading.size * 1.2}px`,
            fontWeight: theme.fonts.heading.weight,
        }}>{personalInfo.name}</h1>
        <p className="text-lg opacity-80">{personalInfo.title}</p>
      </header>

      <div className="flex justify-between items-start px-8">
        <div className="text-sm">
            <p><strong>To:</strong> Hiring Manager</p>
            <p><strong>Date:</strong> {currentDate}</p>
        </div>
         <div className="text-sm text-right">
            <p>{personalInfo.email}</p>
            <p>{personalInfo.phone}</p>
            <p>{personalInfo.location}</p>
        </div>
      </div>

      <hr style={{ borderColor: theme.colors.accent }} className="my-8 border-t-2" />

      <main className="px-8 leading-loose whitespace-pre-wrap">
        {coverLetter}
      </main>
    </div>
  );
};

export default ModernCoverLetter;