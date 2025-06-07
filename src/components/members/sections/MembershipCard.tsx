import React from 'react';
import QRCode from 'qrcode.react';
import { Member } from '../types';

interface MembershipCardProps {
  member: Member;
}

const MembershipCard: React.FC<MembershipCardProps> = ({ member }) => {
  const membershipData = {
    id: member.id,
    name: `${member.firstName} ${member.lastName}`,
    type: member.membershipType,
    expiryDate: new Date(member.joinDate).setFullYear(new Date().getFullYear() + 1),
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl p-6 max-w-sm mx-auto shadow-xl">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">{member.firstName} {member.lastName}</h2>
          <p className="text-indigo-200">Member ID: {member.id}</p>
        </div>
        <div className="bg-white p-2 rounded-lg">
          <QRCode
            value={JSON.stringify(membershipData)}
            size={80}
            level="H"
            includeMargin={true}
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="bg-indigo-800/50 rounded-lg p-3">
          <p className="text-sm text-indigo-200">Membership Type</p>
          <p className="text-white font-medium">{member.membershipType}</p>
        </div>
        
        <div className="bg-indigo-800/50 rounded-lg p-3">
          <p className="text-sm text-indigo-200">Valid Until</p>
          <p className="text-white font-medium">
            {new Date(membershipData.expiryDate).toLocaleDateString()}
          </p>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-xs text-indigo-300">
          Scan QR code at the gym entrance
        </p>
      </div>
    </div>
  );
};

export default MembershipCard; 