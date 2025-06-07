import React from 'react';

interface MemberActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

const MemberActions: React.FC<MemberActionsProps> = ({ onEdit, onDelete, onClose }) => {
  const ActionButton = ({ 
    onClick, 
    label, 
    variant = 'primary' 
  }: { 
    onClick: () => void; 
    label: string; 
    variant?: 'primary' | 'danger' | 'secondary' 
  }) => {
    const baseClasses = "px-6 py-2.5 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#232B3B]";
    const variantClasses = {
      primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      secondary: "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white focus:ring-gray-500"
    };

    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant]}`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="flex flex-wrap justify-end gap-4 mt-8 pt-6 border-t border-gray-700">
      <ActionButton
        onClick={onEdit}
        label="Edit Member"
        variant="primary"
      />
      <ActionButton
        onClick={onDelete}
        label="Delete Member"
        variant="danger"
      />
      <ActionButton
        onClick={onClose}
        label="Close"
        variant="secondary"
      />
    </div>
  );
};

export default MemberActions; 