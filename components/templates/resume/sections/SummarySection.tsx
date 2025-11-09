
import React, { type FC } from 'react';
import type { ResumeData, Theme } from '../../../../types';

interface SectionProps {
    data: ResumeData;
    theme: Theme;
}

const SummarySection: FC<SectionProps> = ({ data, theme }) => {
    const { summary } = data;
    const headingStyles = {
        fontFamily: theme.fonts.heading.family,
        fontWeight: theme.fonts.heading.weight,
        fontSize: `${theme.fonts.heading.size * 0.8}px`,
        color: theme.colors.primary,
    };
    return (
        <div className="p-2">
            <h3 style={headingStyles}>Summary</h3>
            <p className="mt-1 text-sm">{summary}</p>
        </div>
    );
};

export default SummarySection;