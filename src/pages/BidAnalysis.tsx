import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { useOpportunityStore } from '../store/opportunityStore';

function BidAnalysis() {
  const navigate = useNavigate();
  const opportunities = useOpportunityStore(state => state.opportunities);
  const updateOpportunity = useOpportunityStore(state => state.updateOpportunity);
  
  const [formData, setFormData] = useState({
    opportunityId: '',
    expectedValue: '',
    technicalCapability: 'yes',
    pastPerformance: 'yes',
    resourceAvailability: 'yes',
    riskAssessment: '',
  });

  const selectedOpportunity = opportunities.find(opp => opp.id === formData.opportunityId);

  useEffect(() => {
    if (opportunities.length > 0 && !formData.opportunityId) {
      setFormData(prev => ({
        ...prev,
        opportunityId: opportunities[0].id
      }));
    }
  }, [opportunities]);

  const handleProceedWithBid = () => {
    if (formData.opportunityId) {
      updateOpportunity(formData.opportunityId, { status: 'bidding' });
      navigate('/proposals/new', { state: { opportunityId: formData.opportunityId } });
    }
  };

  const handleNoBid = () => {
    if (formData.opportunityId) {
      updateOpportunity(formData.opportunityId, { status: 'lost' });
      navigate('/opportunities');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Bid Analysis</h1>

      {/* Analysis Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Opportunity Analysis</h2>
        
        {/* Basic Information */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Basic Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Opportunity
              </label>
              <select
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.opportunityId}
                onChange={(e) => setFormData({ ...formData, opportunityId: e.target.value })}
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
                Expected Value
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter expected contract value"
                value={formData.expectedValue}
                onChange={(e) => setFormData({ ...formData, expectedValue: e.target.value })}
              />
            </div>
          </div>

          {selectedOpportunity && (
            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Selected Opportunity Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm text-blue-800">
                <div>Agency: {selectedOpportunity.agency}</div>
                <div>Notice ID: {selectedOpportunity.noticeId}</div>
                <div>Due Date: {new Date(selectedOpportunity.responseDeadline).toLocaleDateString()}</div>
                <div>Set-Aside: {selectedOpportunity.setAside}</div>
              </div>
            </div>
          )}
        </div>

        {/* Evaluation Criteria */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Evaluation Criteria</h3>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-500 mr-4" />
              <div className="flex-1">
                <p className="font-medium">Technical Capability</p>
                <p className="text-sm text-gray-500">Company has required technical expertise</p>
              </div>
              <select 
                className="border rounded-lg p-2"
                value={formData.technicalCapability}
                onChange={(e) => setFormData({ ...formData, technicalCapability: e.target.value })}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="partial">Partial</option>
              </select>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-500 mr-4" />
              <div className="flex-1">
                <p className="font-medium">Past Performance</p>
                <p className="text-sm text-gray-500">Similar projects completed successfully</p>
              </div>
              <select 
                className="border rounded-lg p-2"
                value={formData.pastPerformance}
                onChange={(e) => setFormData({ ...formData, pastPerformance: e.target.value })}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="partial">Partial</option>
              </select>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <XCircle className="w-6 h-6 text-red-500 mr-4" />
              <div className="flex-1">
                <p className="font-medium">Resource Availability</p>
                <p className="text-sm text-gray-500">Required resources are available</p>
              </div>
              <select 
                className="border rounded-lg p-2"
                value={formData.resourceAvailability}
                onChange={(e) => setFormData({ ...formData, resourceAvailability: e.target.value })}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="partial">Partial</option>
              </select>
            </div>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Risk Assessment</h3>
          <textarea
            className="w-full p-4 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter risk assessment notes..."
            value={formData.riskAssessment}
            onChange={(e) => setFormData({ ...formData, riskAssessment: e.target.value })}
          ></textarea>
        </div>

        {/* Decision */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Bid Decision</h3>
          <div className="flex gap-4">
            <button 
              onClick={handleProceedWithBid}
              disabled={!formData.opportunityId}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Proceed with Bid
            </button>
            <button 
              onClick={handleNoBid}
              disabled={!formData.opportunityId}
              className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              No Bid
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BidAnalysis;