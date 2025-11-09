import React, { type FC } from 'react';
// FIX: Import correct types
import type { ResumeData, Theme } from '../../../../types';

interface SectionProps {
    data: ResumeData;
    theme: Theme;
}

const SkillsSection: FC<SectionProps> = ({ data, theme }) => {
    // FIX: Add guard clause for optional theme prop
    if (!theme) return null;

    const { skills } = data;
     const headingStyles = {
        fontFamily: theme.fonts.heading.family,
        fontWeight: theme.fonts.heading.weight,
        fontSize: `${theme.fonts.heading.size * 0.8}px`,
        color: theme.colors.primary,
    };

    return (
        <div className="p-2">
            <h3 style={headingStyles} className="mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <span key={skill.id} style={{ backgroundColor: theme.colors.primary, color: 'white' }} className="text-xs py-1 px-3 rounded-full">
                        {skill.value}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default SkillsSection;
