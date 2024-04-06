import React from "react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { fetchJobSalary } from "@/helpers/api";
import { cookies } from "next/headers";
import { useState } from 'react';
import {JobDetails} from "@/dummyData/jobdetails"
import { Button } from "@/components/ui/button";
import { Pointer } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
    active: boolean;
    currentStatus: string;
    season: {
      id: string;
      year: string;
      type: string;
    };
    company: {
      id: string;
      name: string;
    };
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

  const handleResumeChange = (value: string) => {
    setSelectedResume(value);
  };
  const handleViewDetails = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="">      
      <div className="rounded-xl bg-white text-black p-5">
        <div className="font-semibold text-md ">
          {jobItem.company.name}
        </div>
        <div className="my-4">
          <Separator />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 text-sm mx-2" onClick={handleViewDetails} style={{cursor: "pointer"}}>
          <div>
            <div className="text-gray-500 font-semibold my-2">Role</div>{" "}
            <div>{jobItem.role}</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Duration</div>{" "}
            <div>3 Months</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Stipend</div>{" "}
            <div>{salary?.salary}</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Apply By</div>{" "}
            <div>1st Jan 2024</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Eligibility CPI</div>{" "}
            <div>7.5</div>
          </div>
        </div>        
        {showDescription && (
          <div className="mt-4">
            <div className="my-4">
              <Separator />
            </div>
            <div>
              <div className="flex justify-between">
                <h1 className="text-lg font-semibold">About The Work</h1>
                <div className="text-sm my-3">
                  <Link href={`http://localhost:3000/student/jobs/${jobItem.id}`} className="my-1 p-2 text-blue-500 font-semibold cursor-pointer hover:text-blue-600 transition-all fade-in-out">
                    View Details {'>'}
                  </Link>
                </div>
              </div>
              <ul className="list-disc mx-10">
                <li>
                  Build an application in Flutter and connect REST APIs to provide a
                  seamless experience to users
                </li>
                <li>
                  Take ownership of the application and work alongside backend and
                  database engineers to deliver tasks based on timeline
                </li>
                <li>Work with 3rd party services to integrate in app</li>
                <li>
                  Attend daily standup calls to discuss team updates and next tasks
                </li>
              </ul>
            </div>

            <div>
              <h1 className="text-lg font-semibold my-2">Skill(s) Required</h1>
              <div className="flex flex-wrap !text-md">
                <div className="mx-2 border-2 p-2 !text-md rounded-full my-2 bg-gray-100 text-gray-600 font-medium">
                  Algorithms
                </div>
                <div className="mx-2 border-2 p-2 !text-md rounded-full my-2 bg-gray-100 text-gray-600 font-medium">
                  Android
                </div>
                <div className="mx-2 border-2 p-2 !text-md rounded-full my-2 bg-gray-100 text-gray-600 font-medium">
                  Data Structures
                </div>
                <div className="mx-2 border-2 p-2 !text-md rounded-full my-2 bg-gray-100 text-gray-600 font-medium">
                  Firebase
                </div>
                <div className="mx-2 border-2 p-2 !text-md rounded-full my-2 bg-gray-100 text-gray-600 font-medium">
                  iOS
                </div>
                <div className="mx-2 border-2 p-2 !text-md rounded-full my-2 bg-gray-100 text-gray-600 font-medium">
                  Flutter
                </div>
                <div className="mx-2 border-2 p-2 !text-md rounded-full my-2 bg-gray-100 text-gray-600 font-medium">
                  REST API
                </div>
              </div>
            </div>

            <div>
              <h1 className="text-lg font-semibold my-2">Who can apply</h1>
              <ul className="list-disc mx-10">
                <li> are available for the work from home job/internship</li>
                <li>
                  can work from 8:00 pm - 2:00 am Indian Standard Time (as the company
                  is based outside of India & their local work timings are 9:30 am -
                  3:30 pm Eastern Standard Time)
                </li>
                <li>
                  can start the work from home job/internship between 4th Jan24 and
                  8th Feb24
                </li>
                <li> are available for duration of 3 months</li>
                <li> have relevant skills and interests</li>
              </ul>
            </div>            
            <div className="flex justify-between my-3">
              <Button disabled={!selectedResume}>
                Apply
              </Button>
              <Select value={selectedResume || ''} onValueChange={handleResumeChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Resume" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Resume 1">Resume 1</SelectItem>
                    <SelectItem value="Resume 2">Resume 2</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>          
        )}
      </div>
    </div>
  );
};

export default JobCard;
