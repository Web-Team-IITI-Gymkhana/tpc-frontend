import React from "react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Jobs } from "@/helpers/student/types";
import DOMPurify from "dompurify";
import "./styles/JobDescription.css";
import { OpenJD } from "@/helpers/student/api";
const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;

interface Props {
  jobItem: Jobs;
  type: string;
}

const JobCard = ({ jobItem, type }: Props) => {
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
        {type === "opportunity" ? (
          <div className="font-semibold text-md"> {jobItem.company.name}</div>
        ) : (
          <div className="flex justify-between">
            <div className="font-semibold text-md mt-2">
              {jobItem.company.name}
            </div>
            <div className="text-sm my-3">
              <Link
                href={`/student/job/${jobItem.id}`}
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
          className="grid md:grid-cols-2 lg:grid-cols-4 text-sm mx-2"
          onClick={handleViewDetails}
          style={{ cursor: "pointer" }}
        >
          <div>
            <div className="text-gray-500 font-semibold my-2">Role</div>{" "}
            <div>{jobItem.role}</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Duration</div>{" "}
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
        </div>
        {showDescription && (
          <div className="mt-4">
            <div className="my-4">
              <Separator />
            </div>
            <div className="font-semibold text-md"> Description </div>
            <div
              className="job-description my-2"
              dangerouslySetInnerHTML={{ __html: jobItem.description }}
            />
            <div className="my-4">
              <Separator />
            </div>
            <div className="font-semibold text-md"> Skills </div>
            <div className="flex flex-wrap !text-md">
              {jobItem.skills && jobItem.skills.length > 0 ? (
                jobItem.skills.map((skill, index) => (
                  <div key={index} className="mx-2 my-2">
                    <div className="border-2 border-gray-300 p-2 px-4 rounded-full bg-gray-200 text-gray-600">
                      {skill}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 italic">No skills specified</div>
              )}
            </div>
            <div className="my-4">
              <Separator />
            </div>
            {jobItem.attachments && jobItem.attachments.length > 0 && (
              <>
                <div className="font-semibold text-md mb-3">Attachments</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {jobItem.attachments.map((attachment, index) => {
                    const fileName = attachment.split("/").pop() || attachment;
                    const fileExtension =
                      fileName.split(".").pop()?.toLowerCase() || "";
                    const fileNameWithoutExt = fileName.replace(
                      /\.[^/.]+$/,
                      "",
                    );

                    return (
                      <div
                        key={index}
                        className="group border border-gray-200 rounded-lg p-3 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer bg-gray-50 hover:bg-blue-50"
                        onClick={() => handleOpenJD(attachment)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            {fileExtension === "pdf" ? (
                              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <svg
                                  className="w-6 h-6 text-red-600"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            ) : fileExtension === "doc" ||
                              fileExtension === "docx" ? (
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg
                                  className="w-6 h-6 text-blue-600"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            ) : fileExtension === "jpg" ||
                              fileExtension === "jpeg" ||
                              fileExtension === "png" ||
                              fileExtension === "gif" ? (
                              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg
                                  className="w-6 h-6 text-green-600"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            ) : (
                              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <svg
                                  className="w-6 h-6 text-gray-600"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors uppercase">
                              {fileExtension || "FILE"}
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <svg
                              className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="my-4">
                  <Separator />
                </div>
              </>
            )}

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
