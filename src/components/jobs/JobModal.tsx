import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobDetails: {
    seasonId: string;
    seasonYear: number;
    seasonType: string;
    companyId: string;
    companyName: string;
    role: string;
    currentStatus: string;
    jobStatusTransitionTimeline: string[];
    recruiterDetails: {
      userId: string;
      userName: string;
    };
    facultyApprovalRequests: {
      facultyId: string;
      facultyName: string;
      userId: string;
      userName: string;
    }[];
    linkToSalaries: string;
    linkToEvents: string;
    jobCoordinators: {
      memberId: string;
      memberName: string;
      userId: string;
      userName: string;
    }[];
  };
}

const JobModal: React.FC<ModalProps> = ({ isOpen, onClose, jobDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      
    </div>
  );
};

export default JobModal;
