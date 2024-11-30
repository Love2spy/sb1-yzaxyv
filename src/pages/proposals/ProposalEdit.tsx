import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../store';
import { useOpportunityStore } from '../../store/opportunityStore';
import { Save, X, Calendar, Building2, AlertCircle, FileText } from 'lucide-react';

export default function ProposalEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { proposals, updateProposal } = useStore();
  const opportunities = useOpportunityStore(state => state.opportunities);
  
  const proposal = proposals.find(p => p.id === id);
  const opportunity = proposal ? opportunities.find(o => o.id === proposal.opportunityId) : null;

  const [content, setContent] = useState(proposal?.content || '');
  const [title, setTitle] = useState(proposal?.title || '');
  const [dueDate, setDueDate] = useState(proposal?.dueDate.split('T')[0] || '');

  useEffect(() => {
    if (!proposal) {
      navigate('/proposals');
    }
  }, [proposal, navigate]);

  if (!proposal || !opportunity) {
    return null;
  }

  const handleSave = () => {
    updateProposal(proposal.id, { 
      content,
      title,
      dueDate: new Date(dueDate).toISOString()
    });
    navigate('/proposals');
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-3xl font-bold bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
          />
          <div className="mt-2 text-gray-500">
            Opportunity ID: {opportunity.noticeId}
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/proposals')}
            className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <X className="w-5 h-5 mr-2" />
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-gray-400" />
            <h3 className="font-medium">Agency</h3>
          </div>
          <p className="text-gray-600">{opportunity.agency}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-gray-400" />
            <h3 className="font-medium">Due Date</h3>
          </div>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-gray-400" />
            <h3 className="font-medium">Status</h3>
          </div>
          <p className="text-gray-600 capitalize">{proposal.status}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-gray-400" />
            <h3 className="font-medium">Set-Aside</h3>
          </div>
          <p className="text-gray-600">{opportunity.setAside}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">Proposal Content</h2>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-[500px] p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          placeholder="Enter your proposal content here..."
        />
      </div>
    </div>
  );
}