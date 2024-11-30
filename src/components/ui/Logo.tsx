import React from 'react';
import { Cloud } from 'lucide-react';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="h-16 w-16 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg shadow-lg">
        <Cloud className="h-10 w-10 text-white" />
      </div>
      <div className="text-center mt-2">
        <h1 className="text-xl font-bold text-gray-900">GCMS</h1>
        <p className="text-sm text-gray-500">Contract Management</p>
      </div>
    </div>
  );
}