
import React, { type FC } from 'react';
import type { ResumeTemplateProps } from '../../../types';

const StandardCoverLetter: FC<ResumeTemplateProps> = ({ data, theme }) => {
  const { personalInfo, coverLetter } = data;
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="p-12 leading-relaxed">
      <div className="text-right mb-12">
        <h1 style={{ 
            fontFamily: theme.fonts.heading.family,
            fontSize: `${theme.fonts.heading.size}px`,
            fontWeight: theme.fonts.heading.weight,
            color: theme.colors.primary 
        }}>{personalInfo.name}</h1>
        <p>{personalInfo.email}</p>
        <p>{personalInfo.phone}</p>
        <p>{personalInfo.location}</p>
      </div>
      
      <div className="mb-8">
        <p>{currentDate}</p>
      </div>

      <div className="space-y-4 whitespace-pre-wrap">
        {coverLetter}
      </div>
    </div>
  );
};

export default StandardCoverLetter;
