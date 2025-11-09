import React, { type FC } from 'react';
// FIX: Import correct types
import type { ResumeData, Theme } from '../../../../types';

interface SectionProps {
    data: ResumeData;
    theme: Theme;
}

const EducationSection: FC<SectionProps> = ({ data, theme }) => {
    // FIX: Add guard clause for optional theme prop
    if (!theme) return null;
    
    const { education } = data;
    const headingStyles = {
        fontFamily: theme.fonts.heading.family,
        fontWeight: theme.fonts.heading.weight,
        fontSize: `${theme.fonts.heading.size * 0.8}px`,
        color: theme.colors.primary,
    };

    return (
        <div className="p-2">
            <h3 style={headingStyles} className="mb-2">Education</h3>
            {education.map(edu => (
                <div key={edu.id} className="mb-2 text-sm">
                    <h4 className="font-bold">{edu.institution}</h4>
                    <p className="italic">{edu.degree}</p>
                    <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                </div>
            ))}
        </div>
    );
};

export default EducationSection;
