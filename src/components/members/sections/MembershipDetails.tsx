import React from 'react';
import { Member } from '../types';

interface MembershipDetailsProps {
  member: Member;
}

const MembershipDetails: React.FC<MembershipDetailsProps> = ({ member }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'suspended':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const InfoRow = ({ label, value, badge }: { label: string; value: string; badge?: React.ReactNode }) => (
    <div className="flex items-center py-2 border-b border-gray-700 last:border-0">
      <span className="w-24 text-gray-400">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-white">{value}</span>
        {badge}
      </div>
    </div>
  );

  return (
    <div className="bg-[#181F2A] rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-4">Membership Details</h3>
      <div className="space-y-1">
        <InfoRow 
          label="Type" 
          value={member.membershipType} 
        />
        <InfoRow 
          label="Status" 
          value={member.status}
          badge={
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
              {member.status}
            </span>
          }
        />
        <InfoRow 
          label="Expiry" 
          value={new Date(member.membershipExpiry).toLocaleDateString()} 
        />
      </div>
    </div>
  );
};

export default MembershipDetails; 