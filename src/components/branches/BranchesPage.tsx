import React from 'react';
import { BuildingOfficeIcon } from '@heroicons/react/24/outline';

const BranchesPage: React.FC = () => {
  return (
    <div className="p-4 md:p-8 bg-[#181F2A] min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-4 flex items-center gap-2">
        <BuildingOfficeIcon className="h-7 w-7 text-indigo-500" /> Branches Management
      </h1>
      <div className="bg-[#232B3B] rounded-xl shadow-lg p-6 border border-[#232B3B]">
        <p className="text-gray-400">Branches management system coming soon...</p>
      </div>
    </div>
  );
};

export default BranchesPage; 