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
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Job Details</h2>
        <p>Season Year: {jobDetails.seasonYear}</p>
        <p>Season Type: {jobDetails.seasonType}</p>
        <p>Company Name: {jobDetails.companyName}</p>
        <p>Role: {jobDetails.role}</p>
        <p>Current Status: {jobDetails.currentStatus}</p>
        <p>Job Status Transition Timeline:</p>
        <ul>
          {jobDetails.jobStatusTransitionTimeline.map((status, index) => (
            <li key={index}>{status}</li>
          ))}
        </ul>
        <p>Recruiter Details:</p>
        <p>User ID: {jobDetails.recruiterDetails.userId}</p>
        <p>User Name: {jobDetails.recruiterDetails.userName}</p>
        <p>Faculty Approval Requests:</p>
        <ul>
          {jobDetails.facultyApprovalRequests.map((request, index) => (
            <li key={index}>
              Faculty ID: {request.facultyId}, Faculty Name: {request.facultyName}, User ID: {request.userId}, User Name: {request.userName}
            </li>
          ))}
        </ul>
        <p>Link to Salaries: <a href={jobDetails.linkToSalaries}>Click Here</a></p>
        <p>Link to Events: <a href={jobDetails.linkToEvents}>Click Here</a></p>
        <p>Job Coordinators:</p>
        <ul>
          {jobDetails.jobCoordinators.map((coordinator, index) => (
            <li key={index}>
              Member ID: {coordinator.memberId}, Member Name: {coordinator.memberName}, User ID: {coordinator.userId}, User Name: {coordinator.userName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobModal;
