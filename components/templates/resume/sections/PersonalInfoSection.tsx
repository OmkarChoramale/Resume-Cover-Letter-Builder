
import React, { type FC } from 'react';
import type { ResumeData, Theme } from '../../../../types';

interface SectionProps {
    data: ResumeData;
    theme: Theme;
}

const PersonalInfoSection: FC<SectionProps> = ({ data, theme }) => {
    const { personalInfo } = data;
    const headingStyles = {
        fontFamily: theme.fonts.heading.family,
        fontWeight: theme.fonts.heading.weight,
        fontSize: `${theme.fonts.heading.size}px`,
        color: theme.colors.primary,
    };

    return (
        <div className="p-2">
            <h1 style={headingStyles}>{personalInfo.name}</h1>
            <h2 style={{ color: theme.colors.accent, fontWeight: 500 }} className="text-lg mb-2">{personalInfo.title}</h2>
            
            {personalInfo.profilePicture && (
                <img src={personalInfo.profilePicture} alt={personalInfo.name} className="w-24 h-24 rounded-full object-cover my-2" />
            )}
            
            <div className="text-sm space-y-1">
                <p><strong>Email:</strong> {personalInfo.email}</p>
                <p><strong>Phone:</strong> {personalInfo.phone}</p>
                <p><strong>Location:</strong> {personalInfo.location}</p>
                {personalInfo.linkedin && <p><strong>LinkedIn:</strong> {personalInfo.linkedin}</p>}
                {personalInfo.github && <p><strong>GitHub:</strong> {personalInfo.github}</p>}
                {personalInfo.website && <p><strong>Website:</strong> {personalInfo.website}</p>}
            </div>
        </div>
    );
};

export default PersonalInfoSection;