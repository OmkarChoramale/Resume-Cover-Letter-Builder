import type { ComponentType } from 'react';

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
  profilePicture: string | null;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
}

export interface Skill {
  id: string;
  value: string;
}

// FIX: Added missing types for additional resume sections.
export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface Achievement {
    id: string;
    description: string;
}

export interface Language {
    id: string;
    name: string;
    proficiency: string;
}

export interface Hobby {
    id: string;
    name: string;
}


export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  // FIX: Added missing fields to ResumeData.
  certificates: Certificate[];
  achievements: Achievement[];
  languages: Language[];
  hobbies: Hobby[];
  coverLetter: string;
}

export type ListSectionKeys = 'experience' | 'education' | 'projects' | 'skills' | 'certificates' | 'achievements' | 'languages' | 'hobbies';
export type ListItem = Experience | Education | Project | Skill | Certificate | Achievement | Language | Hobby;

// FIX: Added SectionKeys type.
export type SectionKeys = keyof Omit<ResumeData, 'personalInfo' | 'coverLetter'> | 'personalInfo';

// FIX: Added Theme type.
export interface Theme {
  colors: {
    primary: string;
    accent: string;
    text: string;
    background: string;
  };
  fonts: {
    heading: {
      family: string;
      size: number;
      weight: number;
    };
    body: {
      family: string;
      size: number;
      weight: number;
    };
  };
}

// FIX: Added CanvasBlock type.
export interface CanvasBlock {
    id: string;
    type: SectionKeys;
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number;
}


export interface ResumeTemplateProps {
  data: ResumeData;
  // FIX: Added missing optional props for templates.
  theme?: Theme;
  sections?: Record<SectionKeys, boolean>;
  sectionOrder?: SectionKeys[];
  canvasLayout?: CanvasBlock[];
}

// FIX: Added Template type.
export interface Template {
    id: string;
    name: string;
    component: ComponentType<ResumeTemplateProps>;
    thumbnail: string;
}

// FIX: Added FontOption type.
export interface FontOption {
    name: string;
    family: string;
}

// FIX: Added Document type.
export interface Document {
    id: string;
    name: string;
    type: 'resume' | 'cover-letter';
    data: ResumeData;
    customization: {
        template: string;
        theme: Theme;
        sections: Record<SectionKeys, boolean>;
        sectionOrder: SectionKeys[];
        canvasLayout: CanvasBlock[];
    };
    lastModified: number;
}


export interface ResumeStore {
  resumeData: ResumeData;
  updateField: (section: 'personalInfo', field: string, value: string) => void;
  updateSummary: (value: string) => void;
  addListItem: (section: ListSectionKeys) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateListItem: (section: ListSectionKeys, id: string, field: string, value: any) => void;
  removeListItem: (section: ListSectionKeys, id: string) => void;
  updateProfilePicture: (base64: string) => void;
  
  // FIX: Added properties and methods for multi-document management.
  documents: Document[];
  activeDocumentId: string | null;
  activeDocument: Document | null;
  documentType: 'resume' | 'cover-letter' | null;
  selectDocument: (id: string) => void;
  createNewDocument: (type: 'resume' | 'cover-letter', templateId: string) => void;
  deleteDocument: (id: string) => void;
  updateTemplate: (templateId: string) => void;
  updateTheme: (update: { path?: string; value?: unknown; colors?: Theme['colors'] }) => void;
  toggleSectionVisibility: (section: SectionKeys) => void;
  setSectionOrder: (order: SectionKeys[]) => void;
  addCanvasBlock: (type: SectionKeys) => void;
  updateCanvasBlock: (id: string, updates: Partial<CanvasBlock>) => void;
  removeCanvasBlock: (id: string) => void;
  bringCanvasBlockForward: (id: string) => void;
}
