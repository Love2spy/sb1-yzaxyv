import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store';
import { useOpportunityStore } from '../../store/opportunityStore';
import { Proposal } from '../../types';
import { FileText, Calendar, Building2, AlertCircle } from 'lucide-react';

export default function NewProposal() {
  const navigate = useNavigate();
  const opportunities = useOpportunityStore(state => state.opportunities);
  const addProposal = useStore(state => state.addProposal);
  
  const [formData, setFormData] = useState({
    title: '',
    opportunityId: '',
    dueDate: '',
    content: '',
    status: 'draft' as const,
    progress: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const proposal: Proposal = {
      id: crypto.randomUUID(),
      ...formData,
      dueDate: new Date(formData.dueDate).toISOString()
    };

    addProposal(proposal);
    navigate('/proposals');
  };

  const selectedOpportunity = opportunities.find(opp => opp.id === formData.opportunityId);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create New Proposal</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Proposal Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter proposal title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Opportunity
            </label>
            <select
              required
              value={formData.opportunityId}
              onChange={(e) => setFormData({ ...formData, opportunityId: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select an opportunity...</option>
              {opportunities.map((opp) => (
                <option key={opp.id} value={opp.id}>
                  {opp.title} ({opp.noticeId})
                </option>
              ))}
            </select>
          </div>

          {selectedOpportunity && (
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-3">Opportunity Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-blue-900">{selectedOpportunity.agency}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-blue-900">
                    Due: {new Date(selectedOpportunity.responseDeadline).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-blue-900">ID: {selectedOpportunity.noticeId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-blue-900">{selectedOpportunity.setAside}</span>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <input
              type="date"
              required
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial Content
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={6}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter initial proposal content..."
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/proposals')}
            className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Proposal
          </button>
        </div>
      </form>
    </div>
  );
}