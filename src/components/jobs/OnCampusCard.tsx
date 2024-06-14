import React from "react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { fetchJobSalary } from "@/helpers/api";
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
import { ApplyJob, GetSalaryById } from "@/helpers/student/api";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
interface Props {
  jobItem: OnCampusOffers;
  salaryId: string;
}

const OnCampusCard = ({ jobItem, salaryId }: Props) => {
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
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const handleViewDetails = () => {
    setShowDescription(!showDescription);
  };

  const roundOff = (n: number) => {
    return Math.round((n + Number.EPSILON) * 100) / 100;
  };

  function formatNumber(num: number): string {
    if (num >= 1e7) {
      const crores = num / 1e7;
      return `₹${crores.toFixed(2)} Crores`;
    } else if (num >= 1e5) {
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
          </div>          
        )}
      </div>
      )}
    </div>
  );
};

export default OnCampusCard;
