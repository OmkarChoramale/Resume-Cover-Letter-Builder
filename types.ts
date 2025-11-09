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
  profilePicture: string | null; // Base64 encoded image
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
  proficiency: 'Native' | 'Fluent' | 'Proficient' | 'Intermediate' | 'Basic';
}

export interface Hobby {
  id: string;
  name: string;
}

export interface Skill {
  id: string;
  value: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  coverLetter: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certificates: Certificate[];
  achievements: Achievement[];
  languages: Language[];
  hobbies: Hobby[];
}

export type SectionKeys = keyof ResumeData;
export type ListSectionKeys = 'experience' | 'education' | 'projects' | 'skills' | 'certificates' | 'achievements' | 'languages' | 'hobbies';
export type ListItem = Experience | Education | Project | Skill | Certificate | Achievement | Language | Hobby;


// ADVANCED CUSTOMIZATION TYPES
export interface FontStyle {
  family: string;
  size: number; // in px
  weight: 400 | 500 | 600 | 700;
}

export interface Theme {
  colors: {
    primary: string;
    text: string;
    accent: string;
    background: string;
  };
  fonts: {
    heading: FontStyle;
    body: FontStyle;
  };
}

export interface CanvasBlock {
  id: string;
  type: SectionKeys;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}


export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  lastModified: number;
  data: ResumeData;
  customization: {
    template: string;
    theme: Theme;
    sections: Record<SectionKeys, boolean>;
    sectionOrder: SectionKeys[];
    canvasLayout: CanvasBlock[];
  };
}

export type DocumentType = 'resume' | 'cover-letter';

export interface ResumeTemplateProps {
  data: ResumeData;
  theme: Theme;
  sections: Record<SectionKeys, boolean>;
  sectionOrder: SectionKeys[];
  canvasLayout?: CanvasBlock[];
}

export interface Template {
  id: string;
  name: string;
  component: ComponentType<ResumeTemplateProps>;
  thumbnail: string;
}

export interface FontOption {
  name: string;
  family: string;
}

export interface AppState {
  documents: Document[];
  activeDocumentId: string | null;
  documentType: DocumentType;
}

export interface ResumeStore extends AppState {
  activeDocument: Document | null;
  updateField: (section: 'personalInfo' | 'summary', field: string, value: string) => void;
  updateWholeSection: (section: 'summary' | 'coverLetter', value: string) => void;
  addListItem: (section: ListSectionKeys) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateListItem: (section: ListSectionKeys, id: string, field: string, value: any) => void;
  removeListItem: (section: ListSectionKeys, id: string) => void;
  toggleSectionVisibility: (section: SectionKeys) => void;
  setSectionOrder: (newOrder: SectionKeys[]) => void;
  setListOrder: (section: ListSectionKeys, newOrder: any[]) => void;
  updateTheme: (newTheme: Partial<Theme> | { path: string; value: unknown }) => void;
  updateTemplate: (templateId: string) => void;
  setDocumentType: (type: DocumentType) => void;
  updateProfilePicture: (file: File) => void;
  
  // Canvas methods
  addCanvasBlock: (type: SectionKeys) => void;
  updateCanvasBlock: (id: string, updates: Partial<CanvasBlock>) => void;
  removeCanvasBlock: (id: string) => void;
  bringCanvasBlockForward: (id: string) => void;

  // Document Management
  selectDocument: (id: string | null) => void;
  createNewDocument: (type: DocumentType, templateId: string) => void;
  deleteDocument: (id: string) => void;
  updateDocumentName: (id: string, newName: string) => void;
}