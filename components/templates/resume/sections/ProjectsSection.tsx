import React, { type FC } from 'react';
// FIX: Import correct types
import type { ResumeData, Theme } from '../../../../types';

interface SectionProps {
    data: ResumeData;
    theme: Theme;
}

const ProjectsSection: FC<SectionProps> = ({ data, theme }) => {
    // FIX: Add guard clause for optional theme prop
    if (!theme) return null;
    
    const { projects } = data;
     const headingStyles = {
        fontFamily: theme.fonts.heading.family,
        fontWeight: theme.fonts.heading.weight,
        fontSize: `${theme.fonts.heading.size * 0.8}px`,
        color: theme.colors.primary,
    };

    return (
        <div className="p-2">
            <h3 style={headingStyles} className="mb-2">Projects</h3>
            {projects.map(proj => (
                <div key={proj.id} className="mb-2 text-sm">
                    <h4 className="font-bold">{proj.name}</h4>
                    <p>{proj.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ProjectsSection;
