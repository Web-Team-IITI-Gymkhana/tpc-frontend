"use client";
import React from "react";
import { useState, useEffect } from "react";
import { JobDetailFC } from "@/helpers/recruiter/api";
import { JobDetail } from "@/dummyData/Recruiters";
import Cookies from "js-cookie";
import { getJobDetail } from "@/helpers/recruiter/api";
import loadingImg from "@/../public/loadingSpinner.svg";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import JavascriptIcon from "@mui/icons-material/Javascript";
import PhpIcon from "@mui/icons-material/Php";
import CssIcon from "@mui/icons-material/Css";
import CodeIcon from "@mui/icons-material/Code";
import HtmlIcon from "@mui/icons-material/Html";
import PersonIcon from "@mui/icons-material/Person";
import { Span } from "next/dist/trace";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const JobDetailPage = ({ params }: { params: { jobID: string } }) => {
  const [job, setData] = useState<JobDetailFC>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await getJobDetail(
          Cookies.get("accessToken"),
          params.jobID
        );
        setData(jsonData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.jobID]);
  return (
    <div className="container my-8">
      {loading && (
        <img src={loadingImg.src} alt="" className="mx-auto my-auto" />
      )}
      {job && (
        <div className="flex flex-col gap-4">
          <div className="bg-white p-4 px-8 rounded-lg border-gray-300 hover:border-blue-200 border-2">
            <div className="flex md:flex-row flex-col justify-between leading-8">
              <div className="flex flex-col">
                <span className="font-semibold text-lg">Role </span>
                <span>{job.role}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg">Activity </span>
                <span>{job.active ? "Active" : "Inactive"}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg">Current Status </span>
                <span>{job.currentStatus}</span>
              </div>
              <Link
                href={`/recruiter/events/${job.id}`}
                className="flex flex-col"
              >
                <Button variant="default">Events and Applications</Button>
              </Link>
            </div>
            <div>
              <div className="font-semibold text-lg my-4">Skills</div>
              <div className="flex flex-wrap gap-4">
                {/* <div className="bg-gray-200 rounded-full p-2 px-4">
                  <HtmlIcon /> HTML
                </div>
                <div className="bg-gray-200 rounded-full p-2 px-4">
                  <CodeIcon /> Cloud Computing
                </div>
                <div className="bg-gray-200 rounded-full p-2 px-4">
                  <JavascriptIcon /> Javascript
                </div>
                <div className="bg-gray-200 rounded-full p-2 px-4">
                  <CssIcon /> CSS
                </div>
                <div className="bg-gray-200 rounded-full p-2 px-4">
                  <PhpIcon /> PHP
                </div> */}
                {job.skills}
              </div>
              <div className="flex md:flex-row flex-col bg-gray-200 rounded-lg justify-between py-4 px-6 my-3">
                <div>
                  <div className="font-semibold my-2">Location</div>{" "}
                  <div>{job.location}</div>
                </div>
                <div>
                  <div className="font-semibold my-2">Offer letter release</div>{" "}
                  <div>{job.offerLetterReleaseDate}</div>
                </div>
                <div>
                  <div className="font-semibold my-2">Joining Date</div>{" "}
                  <div>{job.joiningDate}</div>
                </div>
                <div>
                  <div className="font-semibold my-2">Duration</div>{" "}
                  <div>{job.duration}</div>
                </div>
                <div>
                  <div className="font-semibold my-2">Attachment</div>{" "}
                  <div>{job.attachment}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 px-8 rounded-lg border-gray-300 hover:border-blue-200 border-2">
            <div className="font-semibold text-lg mb-4">
              Selection Procedure
            </div>
            <div className="flex md:flex-row flex-col justify-between mb-6">
              <div>
                <div className="font-semibold my-2">Selection mode</div>{" "}
                <div>{job.selectionProcedure.selectionMode}</div>
              </div>
              <div>
                <div className="font-semibold my-2">Shortlist from Resume</div>{" "}
                <div>
                  {job.selectionProcedure.shortlistFromResume ? "YES" : "NO"}
                </div>
              </div>
              <div>
                <div className="font-semibold my-2">Group Discussion</div>{" "}
                <div>
                  {job.selectionProcedure.groupDiscussion ? "YES" : "NO"}
                </div>
              </div>
              <div>
                <div className="font-semibold my-2">Number of members</div>{" "}
                <div>{job.selectionProcedure.requirements.numberOfMembers}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
              <div className="bg-gray-200 p-8 rounded-lg">
                <div className="font-semibold bg-gray-200">Tests</div>
                <ul className="list-disc capitalize">
                  {JobDetail.selectionProcedure.tests.map((p, index) => (
                    <li key={index} className="my-2">
                      {Object.entries(p).map(([key, value]) => (
                        <span key={index}>
                          {key} : {value}
                          <br />
                        </span>
                      ))}
                    </li>
                  ))}
                </ul>
              </div>

              <ArrowForwardIosIcon className="md:rotate-0 rotate-90" />

              <div className="bg-gray-200 p-8 rounded-lg">
                <div className="font-semibold bg-gray-200">Interviews</div>
                <ul className="list-disc capitalize">
                  {JobDetail.selectionProcedure.interviews.map((p, index) => (
                    <li key={index} className="my-2">
                      {Object.entries(p).map(([key, value]) => (
                        <span key={index}>
                          {key} : {value}
                          <br />
                        </span>
                      ))}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-8">
              <div>
                <div>
                  <span className="font-semibold">Other requirements :</span>{" "}
                  {job.selectionProcedure.requirements.otherRequirements}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 px-8 rounded-lg border-gray-300 hover:border-blue-200 border-2">
            <div className="font-semibold text-lg mb-4">Job Coordinators</div>
            <div className="flex gap-4 flex-wrap">
              {job.jobCoordinators.map((coordinator, index) => (
                <div
                  key={index}
                  className="bg-gray-200 p-8 rounded-lg md:w-80 w-full leading-8"
                >
                  <div className="text-center font-semibold">
                    <PersonIcon sx={{ fontSize: 80 }} className="mx-auto" />
                    <br />
                    {coordinator.tpcMember.user.name}
                  </div>
                  <div>
                    <div>
                      <span className="font-semibold">Role : </span>
                      {coordinator.tpcMember.role}
                    </div>
                    <div>
                      <span className="font-semibold">Department : </span>
                      {coordinator.tpcMember.department}
                    </div>
                    <div>
                      <span className="font-semibold">Email : </span>
                      {coordinator.tpcMember.user.email}
                    </div>
                    <div>
                      <span className="font-semibold">Contact : </span>
                      {coordinator.tpcMember.user.contact}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-4 px-8 rounded-lg border-gray-300 hover:border-blue-200 border-2">
            <div className="font-semibold text-lg mb-4">Salaries</div>
            {job.salaries.map((salary, index) => (
              <div key={index}>
                <div
                  key={index}
                  className="flex md:flex-row flex-col flex-wrap justify-between"
                >
                  <div>
                    <div className="font-semibold my-2">Base Salary</div>{" "}
                    <div>{salary.baseSalary}</div>
                  </div>
                  <div>
                    <div className="font-semibold my-2">CTC</div>{" "}
                    <div>{salary.totalCTC}</div>
                  </div>
                  <div>
                    <div className="font-semibold my-2">Take Home Salary</div>{" "}
                    <div>{salary.takeHomeSalary}</div>
                  </div>
                  <div>
                    <div className="font-semibold my-2">Gross Salary</div>{" "}
                    <div>{salary.grossSalary}</div>
                  </div>
                  <div>
                    <div className="font-semibold my-2">
                      Other Compensations
                    </div>{" "}
                    <div>{salary.otherCompensations}</div>
                  </div>
                </div>
                {salary.genders && (
                  <div>
                    <h2 className="text-md font-semibold mt-4">Genders</h2>
                    <div className="flex flex-wrap !text-md">
                      {salary.genders.map((gender, index) => (
                        <div
                          key={index}
                          className="mx-2 border-2 border-gray-300 p-2 px-4 rounded-full my-2 bg-gray-200 text-gray-600"
                        >
                          {gender}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {salary.categories && (
                  <div>
                    <h2 className="text-md font-semibold mt-4">Categories</h2>
                    <div className="flex flex-wrap">
                      {salary.categories.map((category, index) => (
                        <div
                          key={index}
                          className="mx-2 border-2 border-gray-300 p-2 px-4 rounded-full my-2 bg-gray-200 text-gray-600"
                        >
                          {category}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetailPage;
