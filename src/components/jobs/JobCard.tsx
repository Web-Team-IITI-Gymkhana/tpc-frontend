import React from "react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { fetchJobSalary } from "@/helpers/api";
import { cookies } from "next/headers";
import { useState, useEffect } from 'react';
import {JobDetails} from "@/dummyData/jobdetails"
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { OnCampusOffers, Salary, Resume } from "@/helpers/student/types";
import { GetSalaryById } from "@/helpers/student/api";
interface Props {
  jobItem: OnCampusOffers;
  salaryId: string;
  resumes: Resume[];
}

const JobCard = ({ jobItem, salaryId, resumes }: Props) => {
  const [salary, setSalary] = useState<Salary|null>(null);

  useEffect(() => {
    const fetchSalary = async () => {
      const data = await GetSalaryById(salaryId);
      setSalary(data);
      console.log(data);
    };

    fetchSalary();
    // setJobs(Jobs);
  }, [salaryId]);
  const [selectedResume, setSelectedResume] = useState<string | null>(null);
  const [showDescription, setShowDescription] = useState<boolean>(false);

  const handleResumeChange = (value: string) => {
    setSelectedResume(value);
  };
  const handleViewDetails = () => {
    setShowDescription(!showDescription);
  };

  const roundOff = (n: number) => {
    return Math.round((n + Number.EPSILON) * 100) / 100;
  };

  function formatNumber(num: number): string {
    if (num >= 1e7) {
      // Convert to Crores
      const crores = num / 1e7;
      return `₹${crores.toFixed(2)} Crores`;
    } else if (num >= 1e5) {
      // Convert to Lakhs
      const lakhs = num / 1e5;
      return `₹${lakhs.toFixed(2)} Lakhs`;
    } else {
      return `₹${num.toString()}`;
    }
  }

  return (
    <div className="">     
      {salary===null? (
        <div>No Data</div>
      ): (
        <div className="rounded-xl bg-white text-black p-5">
        <div className="font-semibold text-md ">
          {jobItem.salary.job.company.name}
        </div>
        <div className="my-4">
          <Separator />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 text-sm mx-2" onClick={handleViewDetails} style={{cursor: "pointer"}}>
          <div>
            <div className="text-gray-500 font-semibold my-2">Role</div>{" "}
            <div>{jobItem.salary.job.role}</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Period</div>{" "}
            <div>{salary.salaryPeriod}</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">CTC</div>{" "}
            <div>{formatNumber(salary.totalCTC)}</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Base Salary</div>{" "}
            <div>{formatNumber(salary.baseSalary)}</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Minimum CPI</div>{" "}
            <div>{roundOff(salary.minCPI)}</div>
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
                  <Link href={`http://localhost:3000/student/jobs/${jobItem.salary.job.id}`} className="my-1 p-2 text-blue-500 font-semibold cursor-pointer hover:text-blue-600 transition-all fade-in-out">
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
                    {resumes && resumes.map((resume) => (
                      <SelectItem key={resume.id} value={resume.filepath}>
                        {resume.verified ? (
                          <span style={{ display: 'flex', alignItems: 'center' }}>
                            {resume.filepath} 
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24"
                                style={{ fill: '#40C057', marginLeft:5 }}>
                              <path d="M 12 2 C 6.486 2 2 6.486 2 12 C 2 17.514 6.486 22 12 22 C 17.514 22 22 17.514 22 12 C 22 10.874 21.803984 9.7942031 21.458984 8.7832031 L 19.839844 10.402344 C 19.944844 10.918344 20 11.453 20 12 C 20 16.411 16.411 20 12 20 C 7.589 20 4 16.411 4 12 C 4 7.589 7.589 4 12 4 C 13.633 4 15.151922 4.4938906 16.419922 5.3378906 L 17.851562 3.90625 C 16.203562 2.71225 14.185 2 12 2 z M 21.292969 3.2929688 L 11 13.585938 L 7.7070312 10.292969 L 6.2929688 11.707031 L 11 16.414062 L 22.707031 4.7070312 L 21.292969 3.2929688 z"></path>
                            </svg>    
                          </span>
                        ) : resume.filepath}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>          
        )}
      </div>
      )}
    </div>
  );
};

export default JobCard;
