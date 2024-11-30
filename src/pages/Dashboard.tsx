import { 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  Ban,
  Search,
  BarChart2,
  FileText,
  Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useOpportunityStore } from '../store/opportunityStore';
import { useStore } from '../store';
import { openSAMSearch } from '../services/samApi';

function Dashboard() {
  const navigate = useNavigate();
  const opportunities = useOpportunityStore(state => state.opportunities);
  const store = useStore();
  const proposals = store.proposals || [];
  const subcontractors = store.subcontractors || [];

  const stats = {
    activeOpportunities: opportunities.filter(o => ['new', 'analyzing', 'bidding'].includes(o.status)).length,
    submittedProposals: proposals.filter(p => p.status === 'submitted').length,
    wonContracts: proposals.filter(p => p.status === 'won').length,
    activeVendors: subcontractors.filter(s => s.status === 'approved').length
  };

  const quickActions = [
    {
      title: 'Search Opportunities',
      description: 'Browse contract opportunities on SAM.gov',
      icon: <Search className="w-8 h-8 text-blue-500" />,
      action: openSAMSearch
    },
    {
      title: 'Analyze Opportunity',
      description: 'Start bid/no-bid analysis',
      icon: <BarChart2 className="w-8 h-8 text-green-500" />,
      action: () => navigate('/bid-analysis')
    },
    {
      title: 'Create Proposal',
      description: 'Start a new proposal',
      icon: <FileText className="w-8 h-8 text-purple-500" />,
      action: () => navigate('/proposals/new')
    },
    {
      title: 'Manage Vendors',
      description: 'View and manage subcontractors',
      icon: <Users className="w-8 h-8 text-orange-500" />,
      action: () => navigate('/vendors')
    }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Opportunities</p>
              <p className="text-2xl font-bold mt-1">{stats.activeOpportunities}</p>
            </div>
            <AlertCircle className="w-10 h-10 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Submitted Proposals</p>
              <p className="text-2xl font-bold mt-1">{stats.submittedProposals}</p>
            </div>
            <Clock className="w-10 h-10 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Won Contracts</p>
              <p className="text-2xl font-bold mt-1">{stats.wonContracts}</p>
            </div>
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Vendors</p>
              <p className="text-2xl font-bold mt-1">{stats.activeVendors}</p>
            </div>
            <Users className="w-10 h-10 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              {action.icon}
              <h3 className="mt-4 font-medium">{action.title}</h3>
              <p className="mt-1 text-sm text-gray-500 text-center">{action.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;