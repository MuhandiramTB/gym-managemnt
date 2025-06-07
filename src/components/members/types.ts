export type MemberStatus = 'active' | 'inactive' | 'suspended';

export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  membershipType: string;
  status: MemberStatus;
  joinDate: string;
  lastVisit: string;
}

export type MemberFormData = Omit<Member, 'id' | 'lastVisit'>;

export interface CreateMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (memberData: MemberFormData) => void;
  initialData?: Member | null;
} 