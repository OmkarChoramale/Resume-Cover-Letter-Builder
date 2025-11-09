import React, { type FC } from 'react';
// FIX: Import correct types
import type { ResumeData, Theme } from '../../../../types';

interface SectionProps {
    data: ResumeData;
    theme: Theme;
}

const ExperienceSection: FC<SectionProps> = ({ data, theme }) => {
    // FIX: Add guard clause for optional theme prop
    if (!theme) return null;

    const { experience } = data;
    const headingStyles = {
        fontFamily: theme.fonts.heading.family,
        fontWeight: theme.fonts.heading.weight,
        fontSize: `${theme.fonts.heading.size * 0.8}px`,
        color: theme.colors.primary,
    };

    return (
        <div className="p-2">
            <h3 style={headingStyles} className="mb-2">Experience</h3>
            {experience.map(exp => (
                <div key={exp.id} className="mb-3 text-sm">
                    <h4 className="font-bold">{exp.role}</h4>
                    <div className="flex justify-between items-baseline">
                        <p className="font-semibold" style={{color: theme.colors.accent}}>{exp.company}</p>
                        <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <ul className="list-disc pl-4 mt-1 text-gray-700">{exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace('• ', '')}</li>)}</ul>
                </div>
            ))}
        </div>
    );
};

export default ExperienceSection;
