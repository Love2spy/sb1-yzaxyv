import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Template } from '../types';
import { defaultTemplates } from '../data/templates';

interface TemplateStore {
  templates: Template[];
  addTemplate: (template: Template) => void;
  updateTemplate: (id: string, updates: Partial<Template>) => void;
  removeTemplate: (id: string) => void;
  resetToDefaults: () => void;
}

export const useTemplateStore = create<TemplateStore>()(
  persist(
    (set) => ({
      templates: defaultTemplates,
      
      addTemplate: (template) =>
        set((state) => ({
          templates: [...state.templates, template],
        })),
        
      updateTemplate: (id, updates) =>
        set((state) => ({
          templates: state.templates.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),
        
      removeTemplate: (id) =>
        set((state) => ({
          templates: state.templates.filter((t) => t.id !== id),
        })),

      resetToDefaults: () =>
        set({ templates: defaultTemplates }),
    }),
    {
      name: 'templates-storage'
    }
  )
);