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
import { OffCampusOffer } from "@/helpers/student/types";
import { GetSalaryById } from "@/helpers/student/api";
interface Props {
  jobItem: OffCampusOffer;
}

const OffCampusCard = ({ jobItem }: Props) => {

  const [showDescription, setShowDescription] = useState<boolean>(false);

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
            <div className="text-gray-500 font-semibold my-2">Period</div>{" "}
            <div>{jobItem.salaryPeriod}</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Salary</div>{" "}
            <div>{jobItem.salary}</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Category</div>{" "}
            <div>{jobItem.company.category}</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Type</div>{" "}
            <div>{jobItem.season.type}</div>
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
              <Button>
                Apply
              </Button>
            </div>
          </div>          
        )}
      </div>
    </div>
  );
};

export default OffCampusCard;
