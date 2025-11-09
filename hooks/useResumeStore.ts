
import React, { createContext, useContext, useState, useEffect, type ReactNode, type FC } from 'react';
import { initialResumeData } from '../data/initialData';
// FIX: Import new types for multi-document store
import type { ResumeStore, ResumeData, ListSectionKeys, ListItem, Document, Theme, SectionKeys, CanvasBlock } from '../types';
import { produce } from 'immer';
import { set } from 'lodash';

const ResumeContext = createContext<ResumeStore | undefined>(undefined);

// FIX: Default theme and sections for new documents
const defaultTheme: Theme = {
    colors: {
        primary: '#1e293b',
        accent: '#0ea5e9',
        text: '#334155',
        background: '#ffffff',
    },
    fonts: {
        heading: { family: "'Inter', sans-serif", size: 28, weight: 700 },
        body: { family: "'Inter', sans-serif", size: 14, weight: 400 },
    },
};

const defaultSections: Record<SectionKeys, boolean> = {
    personalInfo: true,
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    certificates: true,
    achievements: true,
    languages: true,
    hobbies: true,
};

const defaultSectionOrder: SectionKeys[] = ['summary', 'experience', 'projects', 'education', 'skills', 'certificates', 'achievements', 'languages', 'hobbies'];

const getInitialState = (): { documents: Document[]; activeDocumentId: string | null } => {
  try {
    const savedState = localStorage.getItem('eleganceAI_v1');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      if(parsed.documents && parsed.documents.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Failed to parse state from localStorage', error);
  }

  const firstDocId = 'default-resume-1';
  const firstDoc: Document = {
      id: firstDocId,
      name: `My First Resume`,
      type: 'resume',
      data: initialResumeData,
      customization: {
          template: 'modern',
          theme: defaultTheme,
          sections: defaultSections,
          sectionOrder: defaultSectionOrder,
          canvasLayout: [],
      },
      lastModified: Date.now(),
  };

  return { documents: [firstDoc], activeDocumentId: firstDocId };
};

export const ResumeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useState<Document[]>(getInitialState().documents);
  const [activeDocumentId, setActiveDocumentId] = useState<string | null>(getInitialState().activeDocumentId);
  
  useEffect(() => {
    try {
      localStorage.setItem('eleganceAI_v1', JSON.stringify({ documents, activeDocumentId }));
    } catch (error) {
      console.error('Failed to save state to localStorage', error);
    }
  }, [documents, activeDocumentId]);

  const activeDocument = documents.find(doc => doc.id === activeDocumentId) || null;
  
  const updateActiveDocument = (updater: (draft: Document) => void) => {
      setDocuments(produce(draft => {
          const doc = draft.find(d => d.id === activeDocumentId);
          if (doc) {
              updater(doc);
              doc.lastModified = Date.now();
          }
      }));
  };

  const resumeData = activeDocument?.data || initialResumeData;

  const updateField = (section: 'personalInfo', field: string, value: string) => {
     updateActiveDocument(draft => {
        (draft.data[section] as any)[field] = value;
     });
  };
  
  const updateSummary = (value: string) => {
    updateActiveDocument(draft => {
        draft.data.summary = value;
    });
  };

  const addListItem = (section: ListSectionKeys) => {
    updateActiveDocument(draft => {
      const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      let newItem: ListItem;
      switch (section) {
        case 'experience':
          newItem = { id: uniqueId, company: '', role: '', startDate: '', endDate: '', description: '' };
          break;
        case 'education':
          newItem = { id: uniqueId, institution: '', degree: '', startDate: '', endDate: '', gpa: '' };
          break;
        case 'projects':
          newItem = { id: uniqueId, name: '', description: '', link: '' };
          break;
        case 'skills':
          newItem = { id: uniqueId, value: 'New Skill' };
          break;
        case 'certificates':
          newItem = { id: uniqueId, name: '', issuer: '', date: '' };
          break;
        case 'achievements':
            newItem = { id: uniqueId, description: '' };
            break;
        case 'languages':
            newItem = { id: uniqueId, name: '', proficiency: 'Conversational' };
            break;
        case 'hobbies':
            newItem = { id: uniqueId, name: '' };
            break;
      }
      (draft.data[section] as any[]).push(newItem);
    });
  };
  
  const updateListItem = (section: ListSectionKeys, id:string, field: string, value: any) => {
     updateActiveDocument(draft => {
       const list = draft.data[section] as ListItem[];
       const item = list.find(it => it.id === id);
       if (item) {
         (item as any)[field] = value;
       }
     });
  };

  const removeListItem = (section: ListSectionKeys, id: string) => {
    updateActiveDocument(draft => {
      draft.data[section] = draft.data[section].filter((item: any) => item.id !== id) as any;
    });
  };
  
  const updateProfilePicture = (base64: string) => {
      updateActiveDocument(draft => {
          draft.data.personalInfo.profilePicture = base64;
      });
  };

  const selectDocument = (id: string) => {
      setActiveDocumentId(id);
  };

  const createNewDocument = (type: 'resume' | 'cover-letter', templateId: string) => {
      const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const newDoc: Document = {
          id: uniqueId,
          name: `Untitled ${type === 'resume' ? 'Resume' : 'Cover Letter'}`,
          type,
          data: JSON.parse(JSON.stringify(initialResumeData)), // Deep copy
          customization: {
              template: templateId,
              theme: defaultTheme,
              sections: defaultSections,
              sectionOrder: defaultSectionOrder,
              canvasLayout: [],
          },
          lastModified: Date.now(),
      };
      setDocuments(docs => [...docs, newDoc]);
      setActiveDocumentId(uniqueId);
  };

  const deleteDocument = (id: string) => {
      setDocuments(docs => docs.filter(d => d.id !== id));
      if (activeDocumentId === id) {
          setActiveDocumentId(documents.length > 1 ? documents.filter(d => d.id !== id)[0].id : null);
      }
  };

  const updateTemplate = (templateId: string) => {
      updateActiveDocument(draft => {
          draft.customization.template = templateId;
      });
  };

  const updateTheme = (update: { path?: string; value?: unknown; colors?: Theme['colors'] }) => {
      updateActiveDocument(draft => {
          if (update.colors) {
              draft.customization.theme.colors = update.colors;
          } else if (update.path) {
              set(draft.customization.theme, update.path, update.value);
          }
      });
  };

  const toggleSectionVisibility = (section: SectionKeys) => {
      updateActiveDocument(draft => {
          draft.customization.sections[section] = !draft.customization.sections[section];
      });
  };

  const setSectionOrder = (order: SectionKeys[]) => {
      updateActiveDocument(draft => {
          draft.customization.sectionOrder = order;
      });
  };

  const addCanvasBlock = (type: SectionKeys) => {
      updateActiveDocument(draft => {
        const newBlock: CanvasBlock = {
            id: `${Date.now()}`,
            type,
            x: 50,
            y: 50,
            width: 300,
            height: 200,
            zIndex: (draft.customization.canvasLayout.length || 0) + 1,
        };
        draft.customization.canvasLayout.push(newBlock);
      });
  };
  
  const updateCanvasBlock = (id: string, updates: Partial<CanvasBlock>) => {
      updateActiveDocument(draft => {
          const block = draft.customization.canvasLayout.find(b => b.id === id);
          if (block) {
              Object.assign(block, updates);
          }
      });
  };

  const removeCanvasBlock = (id: string) => {
      updateActiveDocument(draft => {
          draft.customization.canvasLayout = draft.customization.canvasLayout.filter(b => b.id !== id);
      });
  };

  const bringCanvasBlockForward = (id: string) => {
      updateActiveDocument(draft => {
          const layout = draft.customization.canvasLayout;
          const block = layout.find(b => b.id === id);
          if (block) {
              const maxZ = Math.max(...layout.map(b => b.zIndex), 0);
              if (block.zIndex <= maxZ) {
                  block.zIndex = maxZ + 1;
              }
          }
      });
  };

  const value: ResumeStore = {
    resumeData,
    updateField,
    updateSummary,
    addListItem,
    updateListItem,
    removeListItem,
    updateProfilePicture,
    documents,
    activeDocumentId,
    activeDocument,
    documentType: activeDocument?.type || null,
    selectDocument,
    createNewDocument,
    deleteDocument,
    updateTemplate,
    updateTheme,
    toggleSectionVisibility,
    setSectionOrder,
    addCanvasBlock,
    updateCanvasBlock,
    removeCanvasBlock,
    bringCanvasBlockForward,
  };

  // FIX: Replaced JSX with React.createElement to fix parsing error in a .ts file.
  // JSX syntax is not allowed in files with a .ts extension.
  return React.createElement(ResumeContext.Provider, { value: value }, children);
};

// FIX: Renamed hook to useResumeStore to match usage in components.
export const useResumeStore = (): ResumeStore => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResumeStore must be used within a ResumeProvider');
  }
  return context;
};
