import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus, Search, Filter, Copy, Download, ExternalLink } from 'lucide-react';
import { useStore } from '../store';
import TemplateEditor from '../components/templates/TemplateEditor';
import { Template } from '../types';
import { generateWordContent } from '../services/proposalGenerator';

const TEMPLATE_CATEGORIES = {
  past_performance: 'Past Performance',
  technical: 'Technical Proposal',
  pricing: 'Pricing',
  quote_request: 'Quote Request'
};

function Templates() {
  const navigate = useNavigate();
  const [showEditor, setShowEditor] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  
  const store = useStore();
  const templates = store.templates || [];
  const { addTemplate, updateTemplate, addProposal } = store;

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleSave = (template: Template) => {
    if (editingTemplate) {
      updateTemplate(editingTemplate.id, template);
    } else {
      addTemplate(template);
    }
    setShowEditor(false);
    setEditingTemplate(null);
  };

  const handleEdit = (template: Template) => {
    setEditingTemplate(template);
    setShowEditor(true);
  };

  const handleUseTemplate = (template: Template) => {
    const proposal = {
      id: crypto.randomUUID(),
      title: `New Proposal from ${template.name}`,
      opportunityId: '',
      dueDate: new Date().toISOString(),
      content: template.content,
      status: 'draft' as const,
      progress: 0
    };

    addProposal(proposal);
    navigate(`/proposals/${proposal.id}/edit`);
  };

  const handleExport = (template: Template, format: 'doc' | 'pdf' | 'google') => {
    switch (format) {
      case 'google':
        window.open('https://docs.google.com/document/create', '_blank');
        break;
      case 'doc':
        const content = generateWordContent([{
          title: template.name,
          content: template.content
        }]);
        
        const blob = new Blob([content], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${template.name.replace(/\s+/g, '_')}.doc`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        break;
      case 'pdf':
        // PDF generation would be implemented here
        break;
    }
    
    setShowExportModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Document Templates</h1>
        <button 
          onClick={() => {
            setEditingTemplate(null);
            setShowEditor(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Template
        </button>
      </div>

      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search templates..."
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {Object.entries(TEMPLATE_CATEGORIES).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No templates found. Create your first template to get started.
          </div>
        ) : (
          filteredTemplates.map((template) => (
            <div key={template.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-500">{TEMPLATE_CATEGORIES[template.category]}</p>
                </div>
                <FileText className="w-6 h-6 text-blue-500" />
              </div>

              <div className="mb-4">
                <p className="text-gray-600 text-sm line-clamp-3">{template.content}</p>
              </div>

              {template.tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {template.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(template)}
                  className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                >
                  Edit
                </button>
                <button 
                  onClick={() => {
                    setSelectedTemplate(template);
                    setShowExportModal(true);
                  }}
                  className="flex-1 bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium flex items-center justify-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
                <button 
                  onClick={() => handleUseTemplate(template)}
                  className="flex-1 bg-purple-50 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium flex items-center justify-center"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Use
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {editingTemplate ? 'Edit Template' : 'Create Template'}
            </h2>
            <TemplateEditor
              template={editingTemplate || undefined}
              onSave={handleSave}
              onCancel={() => {
                setShowEditor(false);
                setEditingTemplate(null);
              }}
            />
          </div>
        </div>
      )}

      {showExportModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Export Template</h2>
            <div className="space-y-4">
              <button
                onClick={() => handleExport(selectedTemplate, 'google')}
                className="w-full p-4 text-left bg-white border rounded-lg hover:bg-gray-50 flex items-center"
              >
                <ExternalLink className="w-5 h-5 mr-3 text-blue-600" />
                <div>
                  <div className="font-medium">Google Docs</div>
                  <p className="text-sm text-gray-500">Create a new Google Doc</p>
                </div>
              </button>
              
              <button
                onClick={() => handleExport(selectedTemplate, 'doc')}
                className="w-full p-4 text-left bg-white border rounded-lg hover:bg-gray-50 flex items-center"
              >
                <FileText className="w-5 h-5 mr-3 text-blue-600" />
                <div>
                  <div className="font-medium">Microsoft Word</div>
                  <p className="text-sm text-gray-500">Download as .doc file</p>
                </div>
              </button>
              
              <button
                onClick={() => handleExport(selectedTemplate, 'pdf')}
                className="w-full p-4 text-left bg-white border rounded-lg hover:bg-gray-50 flex items-center"
              >
                <Download className="w-5 h-5 mr-3 text-blue-600" />
                <div>
                  <div className="font-medium">PDF</div>
                  <p className="text-sm text-gray-500">Download as PDF file</p>
                </div>
              </button>
              
              <button
                onClick={() => setShowExportModal(false)}
                className="w-full p-2 text-center text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Templates;