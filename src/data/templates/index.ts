import { pastPerformanceTemplates } from './pastPerformance';
import { technicalTemplates } from './technical';
import { pricingTemplates } from './pricing';
import { quoteRequestTemplates } from './quoteRequest';
import { Template } from '../../types';

export const defaultTemplates: Template[] = [
  ...pastPerformanceTemplates,
  ...technicalTemplates,
  ...pricingTemplates,
  ...quoteRequestTemplates
];

export const getTemplatesByCategory = (category: Template['category']) => {
  return defaultTemplates.filter(template => template.category === category);
};

export const getTemplateById = (id: string) => {
  return defaultTemplates.find(template => template.id === id);
};

export const getTemplatesByTags = (tags: string[]) => {
  return defaultTemplates.filter(template => 
    template.tags.some(tag => tags.includes(tag))
  );
};