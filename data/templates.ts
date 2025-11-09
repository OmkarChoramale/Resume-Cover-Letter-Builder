// FIX: Import newly created Template and FontOption types.
import type { Template, FontOption } from '../types';
import ModernResume from '../components/templates/resume/ModernResume';
import ClassicResume from '../components/templates/resume/ClassicResume';
import CreativeResume from '../components/templates/resume/CreativeResume';
import ProfessionalResume from '../components/templates/resume/ProfessionalResume';
import MinimalistResume from '../components/templates/resume/MinimalistResume';
import TwoColumnResume from '../components/templates/resume/TwoColumnResume';
import InfographicResume from '../components/templates/resume/InfographicResume';
import AcademicResume from '../components/templates/resume/AcademicResume';
import BoldResume from '../components/templates/resume/BoldResume';
import TimelineResume from '../components/templates/resume/TimelineResume';
import ExecutiveResume from '../components/templates/resume/ExecutiveResume';
import DeveloperResume from '../components/templates/resume/DeveloperResume';
import CanvasResume from '../components/templates/resume/CanvasResume';

import StandardCoverLetter from '../components/templates/coverLetter/StandardCoverLetter';
import ModernCoverLetter from '../components/templates/coverLetter/ModernCoverLetter';
import ClassicCoverLetter from '../components/templates/coverLetter/ClassicCoverLetter';
import CreativeCoverLetter from '../components/templates/coverLetter/CreativeCoverLetter';
import EmailCoverLetter from '../components/templates/coverLetter/EmailCoverLetter';
import FormalCoverLetter from '../components/templates/coverLetter/FormalCoverLetter';

const placeholder = (name: string, isCoverLetter = false) => {
    const bgColor = isCoverLetter ? '090979' : '020024';
    const textColor = '00d4ff';
    const text = name.replace(' ', '+').toUpperCase();
    return `https://placehold.co/400x564/${bgColor}/${textColor}/png?text=${text}&font=inter&fontWeight=600`;
};

export const resumeTemplates: Template[] = [
  { id: 'canvas', name: 'Canvas (Free-Form)', component: CanvasResume, thumbnail: placeholder('Canvas') },
  { id: 'developer', name: 'Developer', component: DeveloperResume, thumbnail: placeholder('Developer') },
  { id: 'executive', name: 'Executive', component: ExecutiveResume, thumbnail: placeholder('Executive') },
  { id: 'modern', name: 'Modern', component: ModernResume, thumbnail: placeholder('Modern') },
  { id: 'creative', name: 'Creative', component: CreativeResume, thumbnail: placeholder('Creative') },
  { id: 'professional', name: 'Professional', component: ProfessionalResume, thumbnail: placeholder('Professional') },
  { id: 'bold', name: 'Bold', component: BoldResume, thumbnail: placeholder('Bold') },
  { id: 'classic', name: 'Classic', component: ClassicResume, thumbnail: placeholder('Classic') },
  { id: 'minimalist', name: 'Minimalist', component: MinimalistResume, thumbnail: placeholder('Minimalist') },
  { id: 'two-column', name: 'Two Column', component: TwoColumnResume, thumbnail: placeholder('Two Column') },
  { id: 'infographic', name: 'Infographic', component: InfographicResume, thumbnail: placeholder('Infographic') },
  { id: 'academic', name: 'Academic', component: AcademicResume, thumbnail: placeholder('Academic') },
  { id: 'timeline', name: 'Timeline', component: TimelineResume, thumbnail: placeholder('Timeline') },
];

export const coverLetterTemplates: Template[] = [
  { id: 'formal-cl', name: 'Formal', component: FormalCoverLetter, thumbnail: placeholder('Formal', true) },
  { id: 'standard-cl', name: 'Standard', component: StandardCoverLetter, thumbnail: placeholder('Standard', true) },
  { id: 'modern-cl', name: 'Modern', component: ModernCoverLetter, thumbnail: placeholder('Modern', true) },
  { id: 'classic-cl', name: 'Classic', component: ClassicCoverLetter, thumbnail: placeholder('Classic', true) },
  { id: 'creative-cl', name: 'Creative', component: CreativeCoverLetter, thumbnail: placeholder('Creative', true) },
  { id: 'email-cl', name: 'Email', component: EmailCoverLetter, thumbnail: placeholder('Email', true) },
];

export const fonts: Omit<FontOption, 'family'>[] = [
  { name: 'Inter' },
  { name: 'Lato' },
  { name: 'Montserrat' },
  { name: 'Roboto' },
  { name: 'Roboto Slab'},
  { name: 'Open Sans' },
  { name: 'Poppins' },
  { name: 'Merriweather' },
];

export const fontFamilies: Record<string, string> = {
  inter: "'Inter', sans-serif",
  lato: "'Lato', sans-serif",
  montserrat: "'Montserrat', sans-serif",
  roboto: "'Roboto', sans-serif",
  robotoslab: "'Roboto Slab', serif",
  opensans: "'Open Sans', sans-serif",
  poppins: "'Poppins', sans-serif",
  merriweather: "'Merriweather', serif",
}

export const fontWeights = [400, 500, 600, 700];
