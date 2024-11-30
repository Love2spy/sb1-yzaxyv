import { useState } from 'react';
import { 
  Search, 
  Plus, 
  MapPin, 
  Phone, 
  Mail, 
  Building2, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  MessageCircle, 
  X, 
  Link as LinkIcon, 
  Filter, 
  Trash2, 
  Star, 
  Edit, 
  Globe, 
  Map,
  Users2 as Users
} from 'lucide-react';
import { format } from 'date-fns';
import { useStore } from '../store';
import { useOpportunityStore } from '../store/opportunityStore';
import { Subcontractor } from '../types';

function Vendors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Subcontractor['status'] | 'all'>('all');
  const [showVendorDetails, setShowVendorDetails] = useState<string | null>(null);
  const [showNewVendorForm, setShowNewVendorForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const store = useStore();
  const opportunities = useOpportunityStore(state => state.opportunities);
  const subcontractors = store.subcontractors || [];
  const { addSubcontractor, updateSubcontractor, removeSubcontractor } = store;
  
  const [newVendor, setNewVendor] = useState<Partial<Subcontractor>>({
    name: '',
    location: '',
    contact: '',
    email: '',
    specialties: [],
    status: 'new',
    statusUpdatedAt: new Date().toISOString(),
    notes: '',
    rating: 0,
    pastPerformance: [],
    opportunityId: ''
  });

  const filteredSubcontractors = subcontractors.filter(vendor => {
    const matchesSearch = 
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddVendor = () => {
    const vendor: Subcontractor = {
      id: crypto.randomUUID(),
      ...newVendor as Omit<Subcontractor, 'id'>
    };
    addSubcontractor(vendor);
    setShowNewVendorForm(false);
    setNewVendor({
      name: '',
      location: '',
      contact: '',
      email: '',
      specialties: [],
      status: 'new',
      statusUpdatedAt: new Date().toISOString(),
      notes: '',
      rating: 0,
      pastPerformance: [],
      opportunityId: ''
    });
  };

  const getOpportunityTitle = (opportunityId: string) => {
    const opportunity = opportunities.find(o => o.id === opportunityId);
    return opportunity ? opportunity.title : 'Unknown Opportunity';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Vendors</h1>
        <button
          onClick={() => setShowNewVendorForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Vendor
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Subcontractor['status'] | 'all')}
            className="border rounded-lg px-4 py-2"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="waiting_response">Waiting Response</option>
            <option value="quoted">Quoted</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubcontractors.map((vendor) => (
          <div key={vendor.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{vendor.name}</h3>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {vendor.location}
                </div>
                {vendor.opportunityId && (
                  <div className="text-sm text-blue-600 mt-1">
                    <Building2 className="w-4 h-4 inline mr-1" />
                    {getOpportunityTitle(vendor.opportunityId)}
                  </div>
                )}
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                vendor.status === 'approved' ? 'bg-green-100 text-green-800' :
                vendor.status === 'rejected' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {vendor.status.replace('_', ' ').charAt(0).toUpperCase() + vendor.status.slice(1)}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                {vendor.contact}
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                {vendor.email}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {vendor.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs"
                >
                  {specialty}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= vendor.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setShowVendorDetails(vendor.id)}
                className="text-blue-600 hover:text-blue-800"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredSubcontractors.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No vendors found</h3>
          <p className="text-gray-500">
            {searchTerm || statusFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Add your first vendor to get started'}
          </p>
        </div>
      )}

      {/* Add/Edit Vendor Modal */}
      {showNewVendorForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {isEditing ? 'Edit Vendor' : 'Add New Vendor'}
              </h2>
              <button
                onClick={() => setShowNewVendorForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              handleAddVendor();
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  value={newVendor.name}
                  onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  required
                  value={newVendor.location}
                  onChange={(e) => setNewVendor({ ...newVendor, location: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Person
                </label>
                <input
                  type="text"
                  required
                  value={newVendor.contact}
                  onChange={(e) => setNewVendor({ ...newVendor, contact: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={newVendor.email}
                  onChange={(e) => setNewVendor({ ...newVendor, email: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Opportunity
                </label>
                <select
                  value={newVendor.opportunityId}
                  onChange={(e) => setNewVendor({ ...newVendor, opportunityId: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Select an opportunity...</option>
                  {opportunities.map((opp) => (
                    <option key={opp.id} value={opp.id}>
                      {opp.title} ({opp.noticeId})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specialties (comma-separated)
                </label>
                <input
                  type="text"
                  value={newVendor.specialties?.join(', ')}
                  onChange={(e) => setNewVendor({
                    ...newVendor,
                    specialties: e.target.value.split(',').map(s => s.trim())
                  })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowNewVendorForm(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  {isEditing ? 'Save Changes' : 'Add Vendor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Vendors;