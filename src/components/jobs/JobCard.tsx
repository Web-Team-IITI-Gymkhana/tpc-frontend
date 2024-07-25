import React from "react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Jobs } from "@/helpers/student/types";
const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;

const url = (NextUrl: string) => {
  return `${baseUrl}${NextUrl}`;
};
interface Props {
  jobItem: Jobs;
  type: string;
}

const JobCard = ({ jobItem, type}: Props) => {
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const handleViewDetails = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="">
      <div className="rounded-xl bg-white text-black p-5">
        {type === "opportunity"? (
          <div className="font-semibold text-md"> {jobItem.company.name}</div>
        ): (
          <div className="flex justify-between">
            <div className="font-semibold text-md mt-2">{jobItem.company.name}</div>
            <div className="text-sm my-3">
              <Link
                href={url(`/student/job/${jobItem.id}`)}
                className="my-1 p-2 text-blue-500 font-semibold cursor-pointer hover:text-blue-600 transition-all fade-in-out"
              >
                View Details {">"}
              </Link>
            </div>
          </div>
        )}
        <div className="my-4">
          <Separator />
        </div>
        <div
          className="grid md:grid-cols-2 lg:grid-cols-5 text-sm mx-2"
          onClick={handleViewDetails}
          style={{ cursor: "pointer" }}
        >
          <div>
            <div className="text-gray-500 font-semibold my-2">Role</div>{" "}
            <div>{jobItem.role}</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">
              Current Status
            </div>{" "}
            <div>{jobItem.currentStatus}</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Location</div>{" "}
            <div>{jobItem.location}</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Season</div>{" "}
            <div>
              {jobItem.season.type} {jobItem.season.year}
            </div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Recruiter</div>{" "}
            <div>{jobItem.recruiter.user.name}</div>
          </div>
        </div>
        {showDescription && (
          <div className="mt-4">
            <div className="my-4">
              <Separator />
            </div>
            <div>
              <h1 className="text-lg font-semibold">About The Work</h1>
              <ul className="list-disc mx-10">
                <li>
                  Build an application in Flutter and connect REST APIs to
                  provide a seamless experience to users
                </li>
                <li>
                  Take ownership of the application and work alongside backend
                  and database engineers to deliver tasks based on timeline
                </li>
                <li>Work with 3rd party services to integrate in app</li>
                <li>
                  Attend daily standup calls to discuss team updates and next
                  tasks
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
                  can work from 8:00 pm - 2:00 am Indian Standard Time (as the
                  company is based outside of India & their local work timings
                  are 9:30 am - 3:30 pm Eastern Standard Time)
                </li>
                <li>
                  can start the work from home job/internship between 4th Jan24
                  and 8th Feb24
                </li>
                <li> are available for duration of 3 months</li>
                <li> have relevant skills and interests</li>
              </ul>
            </div>
            <div className="flex justify-between my-3">
              <Button>
                <Link href={`/student/job/salary/${jobItem.id}`}>Salaries</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;
