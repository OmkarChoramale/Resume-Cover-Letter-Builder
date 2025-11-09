
import React, { type FC } from 'react';
import { Rnd } from 'react-rnd';
import { useResumeStore } from '../../../hooks/useResumeStore';
import type { ResumeTemplateProps, SectionKeys } from '../../../types';
import PersonalInfoSection from './sections/PersonalInfoSection';
import SummarySection from './sections/SummarySection';
import ExperienceSection from './sections/ExperienceSection';
import EducationSection from './sections/EducationSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import SectionWrapper from './sections/SectionWrapper';

const sectionComponentMap: Record<SectionKeys, FC<any>> = {
    personalInfo: PersonalInfoSection,
    summary: SummarySection,
    experience: ExperienceSection,
    education: EducationSection,
    skills: SkillsSection,
    projects: ProjectsSection,
    // Add other section components here as they are created
    certificates: () => <div>Certificates Section</div>,
    achievements: () => <div>Achievements Section</div>,
    languages: () => <div>Languages Section</div>,
    hobbies: () => <div>Hobbies Section</div>,
    coverLetter: () => null,
};


const CanvasResume: FC<ResumeTemplateProps> = ({ data, theme, canvasLayout }) => {
    const { updateCanvasBlock, removeCanvasBlock, bringCanvasBlockForward } = useResumeStore();
    
    if (!canvasLayout) return null;

    return (
        <div className="w-full h-full relative overflow-hidden">
            {canvasLayout.map(block => {
                const SectionComponent = sectionComponentMap[block.type];
                if (!SectionComponent) return null;
                
                return (
                    <Rnd
                        key={block.id}
                        size={{ width: block.width, height: block.height }}
                        position={{ x: block.x, y: block.y }}
                        onDragStop={(e, d) => {
                            updateCanvasBlock(block.id, { x: d.x, y: d.y });
                        }}
                        onResizeStop={(e, direction, ref, delta, position) => {
                            updateCanvasBlock(block.id, {
                                width: parseInt(ref.style.width),
                                height: parseInt(ref.style.height),
                                ...position,
                            });
                        }}
                        style={{ zIndex: block.zIndex }}
                        bounds="parent"
                        minWidth={150}
                        minHeight={100}
                    >
                        <SectionWrapper 
                            onDelete={() => removeCanvasBlock(block.id)}
                            onBringForward={() => bringCanvasBlockForward(block.id)}
                        >
                            <SectionComponent data={data} theme={theme} />
                        </SectionWrapper>
                    </Rnd>
                );
            })}
        </div>
    );
};

export default CanvasResume;