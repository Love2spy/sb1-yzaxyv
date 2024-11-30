import { useState } from 'react';
import { FileText, Plus, Clock, CheckCircle2, XCircle, Download, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import ImportProposalModal from '../components/proposals/ImportProposalModal';

function Proposals() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active');
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null);

  const { proposals, addProposal } = useStore(state => ({
    proposals: state.proposals,
    addProposal: state.addProposal
  }));

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'in_review':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'submitted':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'won':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'lost':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ');
  };

  const handleNewProposal = () => {
    navigate('/proposals/new');
  };

  const handleEditProposal = (id: string) => {
    navigate(`/proposals/${id}/edit`);
  };

  const handleExportProposal = (id: string) => {
    setSelectedProposal(id);
    setShowExportModal(true);
  };

  const handleExport = (format: 'doc' | 'pdf' | 'google') => {
    if (!selectedProposal) return;
    
    const proposal = proposals.find(p => p.id === selectedProposal);
    if (!proposal) return;

    switch (format) {
      case 'google':
        window.open('https://docs.google.com/document/create', '_blank');
        break;
      case 'doc':
        const wordContent = `
${proposal.title}
Due Date: ${new Date(proposal.dueDate).toLocaleDateString()}

${proposal.content}
        `;
        
        const blob = new Blob([wordContent], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${proposal.title.replace(/\s+/g, '_')}.doc`;
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

  const filteredProposals = proposals.filter(proposal => 
    activeTab === 'active' 
      ? ['draft', 'in_review', 'submitted'].includes(proposal.status)
      : ['won', 'lost'].includes(proposal.status)
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Proposals</h1>
        <div className="flex gap-4">
          <button 
            onClick={() => setShowImportModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
          >
            <Upload className="w-5 h-5 mr-2" />
            Import
          </button>
          <button 
            onClick={handleNewProposal}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Proposal
          </button>
        </div>
      </div>

      {/* Rest of the component remains the same */}
      
      {showImportModal && (
        <ImportProposalModal onClose={() => setShowImportModal(false)} />
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Export Proposal</h2>
            <div className="space-y-4">
              <button
                onClick={() => handleExport('google')}
                className="w-full p-4 text-left bg-white border rounded-lg hover:bg-gray-50"
              >
                <div className="font-medium">Google Docs</div>
                <p className="text-sm text-gray-500">Create a new Google Doc</p>
              </button>
              
              <button
                onClick={() => handleExport('doc')}
                className="w-full p-4 text-left bg-white border rounded-lg hover:bg-gray-50"
              >
                <div className="font-medium">Microsoft Word</div>
                <p className="text-sm text-gray-500">Download as .doc file</p>
              </button>
              
              <button
                onClick={() => handleExport('pdf')}
                className="w-full p-4 text-left bg-white border rounded-lg hover:bg-gray-50"
              >
                <div className="font-medium">PDF</div>
                <p className="text-sm text-gray-500">Download as PDF file</p>
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

export default Proposals;