import React from "react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { fetchJobSalary } from "@/helpers/api";
import { cookies } from "next/headers";
import { useState } from 'react';
interface Event {
  id: string;
  name: string;
  date: string;
}

interface Coordinator {
  id: string;
  name: string;
}

interface FacultyCoordinatorApproval {
  id: string;
  facultyId: string;
  approvalStatus: string;
}

interface OnCampusOffer {
  id: string;
  name: string;
  offerStatus: string;
}

interface RoleOffered {
  id: string;
  roleName: string;
}

// interface Props {
//   jobItem: {
//     id: string,
//     seasonId: string,
//     "companyId": string,
//     "role": string,
//     "recruiterId": string,
//     "active": boolean,
//     "eligibility": any,
//     "currentStatusId": string,
//     "metadata": any,
//     "createdAt": string,
//     "updatedAt": string
//   };
//   salary: null |  {
//     salary: string,
//     salaryPeriod: string,
//     metadata: any,
//     constraints: any
//   }
// }
interface Props {
  jobItem: {
    id: string;
    seasonId: string;
    recruiterId: string;
    companyId: string;
    role: string;
    metadata: string;
    docs: string;
    publicAccess: boolean;
    eligibilityCpi: number;
    status: string;
    events: {
      id: string;
      name: string;
      date: string;
    }[];
    tpcCoordinators: {
      id: string;
      name: string;
    }[];
    facultyCoordinatorApprovals: {
      id: string;
      facultyId: string;
      approvalStatus: string;
    }[];
    onCampusOffers: {
      id: string;
      name: string;
      offerStatus: string;
    }[];
    rolesOffered: {
      id: string;
      roleName: string;
    }[];
  };
  salary: null |  {
    salary: string,
  }
}

const JobCard = ({ jobItem, salary }: Props) => {
  // const salary = await fetchJobSalary(cookies()?.get('accessToken')?.value, jobItem.id)
  // console.log(salary)
  const [selectedResume, setSelectedResume] = useState<string | null>(null);
  const [showDescription, setShowDescription] = useState<boolean>(false);

  const handleResumeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedResume(event.target.value);
  };
  const handleViewDetails = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="" onClick={handleViewDetails} style={{ cursor: 'pointer' }}>      
      <div className="rounded-xl bg-white text-black p-5">
        <div className="font-semibold text-md ">
          Goldman Sachs
        </div>
        <div className="my-4">
          <Separator />
        </div>
        <div className="text-xs">
          {salary?.salary}
        </div>
        <div className="flex justify-between text-xs">
          <div className="text-xs my-2">
            3 Months
          </div>
          <div className="text-xs my-2">
            Eligibility CPI: {jobItem.eligibilityCpi}
          </div>
        </div>
        <div className="flex justify-between text-xs">
          <button 
            disabled={!selectedResume}
            className={`my-1 p-2 text-white font-semibold cursor-pointer rounded-md ${selectedResume ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300'}`} 
          >
            Apply
          </button>
          <div className="bg-gray-20 my-1 p-2 rounded-md">
            <select value={selectedResume || ''} onChange={handleResumeChange}>
              <option value="" disabled>Select Resume</option>
              <option value="resume1">Resume 1</option>
              <option value="resume2">Resume 2</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <Link href={`/admin/jobs/${jobItem.id}`} className="my-1 p-2 text-blue-500 font-semibold cursor-pointer hover:text-blue-600 transition-all fade-in-out">
            View Details {'>'}
          </Link>
        </div>
        {showDescription && (
          <div className="mt-4">
            <div className="my-4">
              <Separator />
            </div>
            <div className="my-4">
              <h2>{jobItem.role}</h2>
            </div>
            <p className="text-sm my-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda modi architecto molestiae quidem, eos aspernatur, officia, laboriosam maiores enim dignissimos impedit iure aliquid officiis voluptatibus! Neque modi eius vero ea quas maiores deleniti natus. Labore veritatis aspernatur aperiam cum iste nisi, possimus vel odio accusamus, recusandae qui suscipit. Impedit, quibusdam!</p>
            <p className="text-sm my-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda modi architecto molestiae quidem, eos aspernatur, officia, laboriosam maiores enim dignissimos impedit iure aliquid officiis voluptatibus! Neque modi eius vero ea quas maiores deleniti natus. Labore veritatis aspernatur aperiam cum iste nisi, possimus vel odio accusamus, recusandae qui suscipit. Impedit, quibusdam!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;
