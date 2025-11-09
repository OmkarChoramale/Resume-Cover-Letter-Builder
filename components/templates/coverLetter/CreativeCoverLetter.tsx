
import React, { type FC } from 'react';
import type { ResumeTemplateProps } from '../../../types';

const CreativeCoverLetter: FC<ResumeTemplateProps> = ({ data, theme }) => {
  const { personalInfo, coverLetter } = data;
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="flex min-h-[297mm]">
      <aside style={{ backgroundColor: theme.colors.primary, color: theme.colors.background }} className="w-1/3 p-8 flex flex-col justify-between">
          <div>
            <h1 style={{
                fontFamily: theme.fonts.heading.family,
                fontSize: `${theme.fonts.heading.size * 1.2}px`,
                fontWeight: theme.fonts.heading.weight,
            }}>{personalInfo.name}</h1>
            <p className="text-lg opacity-80">{personalInfo.title}</p>
          </div>
          <div className="text-sm">
            <h2 className="font-bold uppercase tracking-wider mb-2 border-b border-white border-opacity-30 pb-1">Contact</h2>
            <p>{personalInfo.email}</p>
            <p>{personalInfo.phone}</p>
            <p>{personalInfo.location}</p>
            <p>{personalInfo.linkedin}</p>
          </div>
          <div></div>
      </aside>
      <main className="w-2/3 p-12">
        <p className="text-right text-sm text-gray-500 mb-12">{currentDate}</p>
        <div className="leading-loose whitespace-pre-wrap">
          {coverLetter}
        </div>
      </main>
    </div>
  );
};

export default CreativeCoverLetter;
