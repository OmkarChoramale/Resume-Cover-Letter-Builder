

import React, { createContext, useContext, useState, useEffect, type ReactNode, type FC } from 'react';
import { initialDocument } from '../data/initialData';
import type { ResumeStore, AppState, Document, DocumentType, ListSectionKeys, SectionKeys, Theme, CanvasBlock, ListItem } from '../types';
import { produce } from 'https://esm.sh/immer@10.1.1';
import { set } from 'https://esm.sh/lodash-es@4.17.21';

const ResumeContext = createContext<ResumeStore | undefined>(undefined);

const migrateState = (state: AppState): AppState => {
  return produce(state, draft => {
    draft.documents.forEach(doc => {
      // @ts-ignore
      if (doc.data.skills && doc.data.skills.length > 0 && typeof doc.data.skills[0] === 'string') {
        // @ts-ignore
        doc.data.skills = doc.data.skills.map((skill: string) => ({
          id: `${Date.now()}-${Math.random()}`,
          value: skill,
        }));
      }
    });
  });
};


const getInitialState = (): AppState => {
  try {
    const savedState = localStorage.getItem('resumeBuilderState_v3');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      if(parsedState.documents && parsedState.documents.length > 0) {
        return migrateState(parsedState);
      }
    }
  } catch (error) {
    console.error('Failed to parse state from localStorage', error);
  }
  return {
    documents: [initialDocument],
    activeDocumentId: initialDocument.id,
    documentType: 'resume',
  };
};

export const ResumeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(getInitialState);

  useEffect(() => {
    try {
      localStorage.setItem('resumeBuilderState_v3', JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save state to localStorage', error);
    }
  }, [state]);

  const activeDocument = state.documents.find(doc => doc.id === state.activeDocumentId) || null;

  const updateActiveDocument = (updater: (draft: Document) => void) => {
    setState(
      produce(draft => {
        const docIndex = draft.documents.findIndex(d => d.id === draft.activeDocumentId);
        if (docIndex !== -1) {
          updater(draft.documents[docIndex]);
          draft.documents[docIndex].lastModified = Date.now();
        }
      })
    );
  };
  
  const updateField = (section: 'personalInfo' | 'summary', field: string, value: string) => {
     updateActiveDocument(doc => {
        // @ts-ignore
        doc.data[section][field] = value;
     });
  };

  const updateWholeSection = (section: 'summary' | 'coverLetter', value: string) => {
    updateActiveDocument(doc => {
        // @ts-ignore
        doc.data[section] = value;
    });
  };

  const addListItem = (section: ListSectionKeys) => {
    updateActiveDocument(doc => {
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
          newItem = { id: uniqueId, name: '', proficiency: 'Basic' };
          break;
        case 'hobbies':
          newItem = { id: uniqueId, name: '' };
          break;
        default:
          // This should never be reached if all list section keys are handled.
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const _exhaustiveCheck: never = section;
          return;
      }
      // @ts-ignore - This is tricky to type correctly with discriminated unions on keys.
      // We are ensuring the correct object type is pushed to the correct array.
      doc.data[section].push(newItem);
    });
  };
  
  const updateListItem = (section: ListSectionKeys, id: string, field: string, value: unknown) => {
     updateActiveDocument(doc => {
       const list = doc.data[section] as ListItem[];
       const item = list.find(it => it.id === id);
       if (item) {
         // @ts-ignore
         item[field] = value;
       }
     });
  };

  const removeListItem = (section: ListSectionKeys, id: string) => {
    updateActiveDocument(doc => {
      // @ts-ignore
      doc.data[section] = doc.data[section].filter(item => item.id !== id);
    });
  };

  const toggleSectionVisibility = (section: SectionKeys) => {
    updateActiveDocument(doc => {
      doc.customization.sections[section] = !doc.customization.sections[section];
    });
  };

  const setSectionOrder = (newOrder: SectionKeys[]) => {
    updateActiveDocument(doc => {
      doc.customization.sectionOrder = newOrder;
    });
  };

  const setListOrder = (section: ListSectionKeys, newOrder: ListItem[]) => {
    updateActiveDocument(doc => {
      // @ts-ignore
      doc.data[section] = newOrder;
    });
  }

  const updateTheme = (newTheme: Partial<Theme> | { path: string; value: unknown }) => {
    updateActiveDocument(doc => {
      if ('path' in newTheme) {
         set(doc.customization.theme, newTheme.path, newTheme.value);
      } else {
        doc.customization.theme = { ...doc.customization.theme, ...newTheme };
      }
    });
  };
  
  const updateTemplate = (templateId: string) => {
    updateActiveDocument(doc => {
        doc.customization.template = templateId;
    });
  };
  
  const updateProfilePicture = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
        updateActiveDocument(doc => {
            doc.data.personalInfo.profilePicture = reader.result as string;
        });
    };
    reader.readAsDataURL(file);
  };

  const setDocumentType = (type: DocumentType) => {
    setState(produce(draft => { draft.documentType = type; }));
  };

  // Canvas methods
  const addCanvasBlock = (type: SectionKeys) => {
    updateActiveDocument(doc => {
      const newBlock: CanvasBlock = {
        id: Date.now().toString(),
        type,
        x: 50,
        y: 50,
        width: 300,
        height: 200,
        zIndex: (Math.max(0, ...doc.customization.canvasLayout.map(b => b.zIndex)) || 0) + 1,
      };
      doc.customization.canvasLayout.push(newBlock);
    });
  };

  const updateCanvasBlock = (id: string, updates: Partial<CanvasBlock>) => {
    updateActiveDocument(doc => {
      const block = doc.customization.canvasLayout.find(b => b.id === id);
      if (block) {
        Object.assign(block, updates);
      }
    });
  };

  const removeCanvasBlock = (id: string) => {
    updateActiveDocument(doc => {
      doc.customization.canvasLayout = doc.customization.canvasLayout.filter(b => b.id !== id);
    });
  };

  const bringCanvasBlockForward = (id: string) => {
    updateActiveDocument(doc => {
      const maxZ = Math.max(...doc.customization.canvasLayout.map(b => b.zIndex)) || 0;
      const block = doc.customization.canvasLayout.find(b => b.id === id);
      if (block) {
        block.zIndex = maxZ + 1;
      }
    });
  };

  // Document Management
  const selectDocument = (id: string | null) => {
     setState(produce(draft => { draft.activeDocumentId = id; }));
  };

  const createNewDocument = (type: DocumentType, templateId: string) => {
      const newDoc: Document = produce(initialDocument, draft => {
          draft.id = Date.now().toString();
          draft.name = type === 'resume' ? 'Untitled Resume' : 'Untitled Cover Letter';
          draft.type = type;
          draft.lastModified = Date.now();
          draft.customization.template = templateId;
      });
      setState(produce(draft => {
          draft.documents.push(newDoc);
          draft.activeDocumentId = newDoc.id;
          draft.documentType = type;
      }));
  };

  const deleteDocument = (id: string) => {
      setState(produce(draft => {
          draft.documents = draft.documents.filter(d => d.id !== id);
          if (draft.activeDocumentId === id) {
              draft.activeDocumentId = draft.documents[0]?.id || null;
          }
      }));
  };
  
  const updateDocumentName = (id: string, newName: string) => {
     setState(
      produce(draft => {
        const docIndex = draft.documents.findIndex(d => d.id === id);
        if (docIndex !== -1) {
          draft.documents[docIndex].name = newName;
        }
      })
    );
  };


  const value: ResumeStore = {
    ...state,
    activeDocument,
    updateField,
    updateWholeSection,
    addListItem,
    updateListItem,
    removeListItem,
    toggleSectionVisibility,
    setSectionOrder,
    setListOrder,
    updateTheme,
    updateTemplate,
    updateProfilePicture,
    setDocumentType,
    addCanvasBlock,
    updateCanvasBlock,
    removeCanvasBlock,
    bringCanvasBlockForward,
    selectDocument,
    createNewDocument,
    deleteDocument,
    updateDocumentName,
  };

  // This file is a .ts file but contains a React Provider. It uses React.createElement
  // instead of JSX. Renaming to .tsx and using JSX is recommended if possible.
  return React.createElement(ResumeContext.Provider, { value: value }, children);
};

export const useResumeStore = (): ResumeStore => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResumeStore must be used within a ResumeProvider');
  }
  return context;
};