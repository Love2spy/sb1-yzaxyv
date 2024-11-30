import { useState } from 'react';
import { X, Upload, AlertCircle } from 'lucide-react';
import { useStore } from '../../store';
import { Proposal } from '../../types';

interface ImportProposalModalProps {
  onClose: () => void;
}

export default function ImportProposalModal({ onClose }: ImportProposalModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const addProposal = useStore(state => state.addProposal);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/json') {
        setError('Please select a JSON file');
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleImport = async () => {
    if (!file) return;

    try {
      const content = await file.text();
      const proposalData = JSON.parse(content);

      // Validate the imported data
      if (!proposalData.title || !proposalData.opportunityId || !proposalData.dueDate) {
        throw new Error('Invalid proposal data format');
      }

      const proposal: Proposal = {
        id: crypto.randomUUID(),
        title: proposalData.title,
        opportunityId: proposalData.opportunityId,
        dueDate: proposalData.dueDate,
        content: proposalData.content || '',
        status: 'draft',
        progress: 0
      };

      addProposal(proposal);
      onClose();
    } catch (err) {
      setError('Failed to import proposal. Please check the file format.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Import Proposal</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Proposal File
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                    <span>Upload a file</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept=".json"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">JSON files only</p>
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-center text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </div>
          )}

          {file && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-700">Selected file: {file.name}</p>
            </div>
          )}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleImport}
              disabled={!file}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Import
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}