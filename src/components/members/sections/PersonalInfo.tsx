import React from 'react';
import { Member } from '../types';

interface PersonalInfoProps {
  member: Member;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ member }) => {
  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-center py-2 border-b border-gray-700 last:border-0">
      <span className="w-24 text-gray-400">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );

  return (
    <div className="bg-[#181F2A] rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-4">Personal Information</h3>
      <div className="space-y-1">
        <InfoRow label="Name" value={member.name} />
        <InfoRow label="Email" value={member.email} />
        <InfoRow label="Phone" value={member.phone} />
        <InfoRow 
          label="Join Date" 
          value={new Date(member.joinDate).toLocaleDateString()} 
        />
        <InfoRow 
          label="Last Visit" 
          value={member.lastVisit 
            ? new Date(member.lastVisit).toLocaleDateString()
            : 'Never'
          } 
        />
      </div>
    </div>
  );
};

export default PersonalInfo; 