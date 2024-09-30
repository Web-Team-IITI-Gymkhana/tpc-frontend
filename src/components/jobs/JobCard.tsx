import React from "react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Jobs } from "@/helpers/student/types";
import DOMPurify from 'dompurify';
import "./styles/JobDescription.css"
import { OpenJD } from "@/helpers/student/api";
const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;

const url = (NextUrl: string) => {
  return `${baseUrl}${NextUrl}`;
};
interface Props {
  jobItem: Jobs;
  type: string;
}

const JobCard = ({ jobItem, type}: Props) => {
  const cleanHTML = DOMPurify.sanitize(jobItem.description);
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const handleViewDetails = () => {
    setShowDescription(!showDescription);
  };

  const handleOpenJD = async (filename: string) => {
    OpenJD(filename);
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
              Duration
            </div>{" "}
            <div>{jobItem.duration}</div>
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
            <div className="text-gray-500 font-semibold my-2">Attachment</div>{" "}
            <div onClick={() => handleOpenJD(jobItem.attachment)} className="text-blue-500 font-semibold cursor-pointer hover:text-blue-600 transition-all fade-in-out">{jobItem.attachment? "Link": ""}</div>
          </div>
        </div>
        {showDescription && (
          <div className="mt-4">
            <div className="my-4">
              <Separator />
            </div>
            <div
              className="job-description"
              dangerouslySetInnerHTML={{ __html: cleanHTML }}
            />
            <div className="my-4">
              <Separator />
            </div>
            <div className="font-semibold text-md"> Skills </div>
            <div className="flex flex-wrap !text-md">
              {jobItem.skills.map((skill, index) => (
                <div key={index} className="mx-2 my-2">
                  <div className="border-2 border-gray-300 p-2 px-4 rounded-full bg-gray-200 text-gray-600">
                    {skill}
                  </div>
                </div>
              ))}
            </div>
            <div className="my-4">
              <Separator />
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
