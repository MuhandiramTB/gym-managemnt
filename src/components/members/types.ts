export interface MemberFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  membershipType: string;
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
}

export interface Member extends MemberFormData {
  id: number;
  lastVisit: string;
}

export interface CreateMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (memberData: MemberFormData) => void;
} 