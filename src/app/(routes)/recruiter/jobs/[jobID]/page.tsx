"use client";
import React, { useState, useEffect } from "react";
import { JobDetailFC } from "@/helpers/recruiter/types";
import { getJobDetail, OpenJD } from "@/helpers/recruiter/api";
import loadingImg from "@/../public/loadingSpinner.svg";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PersonIcon from "@mui/icons-material/Person";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { getJafDetails } from "@/helpers/recruiter/api";
import { JAFdetailsFC } from "@/helpers/recruiter/types";
import { patchJobData } from "@/helpers/recruiter/api";
import { patchSalaryData } from "@/helpers/recruiter/api";
import {
  CategorySelectList,
  GenderSelectList,
} from "@/components/Recruiters//JobPage/jobEdit";
import Loader from "@/components/Loader/loader";
import Salaries from "@/components/Recruiters/Salaries";

const JobDetailPage = ({ params }: { params: { jobID: string } }) => {
  const [job, setData] = useState<JobDetailFC>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(null);
  const [jafDetails, setJafDetails] = useState<JAFdetailsFC>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobDetailData, jafDetailsData] = await Promise.all([
          getJobDetail(params.jobID),
          getJafDetails(),
        ]);

        setJafDetails((prev) => jafDetailsData);
        setData(jobDetailData);
        setFormData(jobDetailData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.jobID]);

  const handleEditClick = () => {
    if (editMode) {
      handleSubmit();
    }
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenJD = async (filename: string) => {
    OpenJD(filename);
  };
  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: string) => {
    console.log("Event:", e);
    console.log("Index:", index);
    console.log("Field:", field);
    
    setFormData(prevFormData => ({
      ...prevFormData,
      salaries: prevFormData.salaries.map((salary, i) =>
        i === index ? { ...salary, [field]: e.target.value } : salary
      ),
    }));
  };

  const handleSubmit = async () => {
    const c1 = await patchJobData(job.id, formData);
    if (true) {
      formData.salaries.map((salary, index) => patchSalaryData(salary));
    }
    setEditMode(false);
    window.location.reload();
  };

  const addNewTest = () => {
    const newTest = { type: "", duration: 0 };
    setFormData((prev) => ({
      ...prev,
      selectionProcedure: {
        ...prev.selectionProcedure,
        tests: [...prev.selectionProcedure.tests, newTest],
      },
    }));
  };

  const addNewInterview = () => {
    const newInterview = { type: "", duration: 0 };
    setFormData((prev) => ({
      ...prev,
      selectionProcedure: {
        ...prev.selectionProcedure,
        interviews: [...prev.selectionProcedure.interviews, newInterview],
      },
    }));
  };

  return (
    <div className="container my-8">
      <h1 className="text-3xl mb-8 font-bold mx-auto text-center">
        Job Details
      </h1>

      {loading && (
        <div className="h-screen w-full flex justify-center items-center">
          <Loader />
        </div>
      )}
      {job && (
        <div className="flex flex-col gap-4">
          <div className="bg-white p-4 px-8 rounded-lg border-gray-300 hover:border-blue-200 border-2">
            <div className="flex md:flex-row flex-col justify-between leading-8">
              <div className="flex flex-col">
                <span className="font-semibold text-lg">Role </span>
                {editMode ? (
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{job.role}</span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg">Activity </span>
                <span>{job.active ? "Active" : "Inactive"}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg">Current Status </span>
                <span>{job.currentStatus}</span>
              </div>
              <div className="flex flex-col gap-4">
                <Link
                  href={`/recruiter/events/${job.id}`}
                  className="flex flex-col gap-4"
                >
                  <Button variant="default">Events and Applications</Button>
                </Link>
                {!job.active && (
                  <Button onClick={handleEditClick}>
                    {editMode ? "Save Application" : "Edit Application"}
                  </Button>
                )}
              </div>
            </div>
            <div>
              <div className="font-semibold text-lg my-4">Skills</div>
              <div className="flex flex-wrap gap-4">
                {editMode ? (
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                  />
                ) : (
                  job.skills
                )}
              </div>
              <div className="flex md:flex-row flex-col flex-wrap bg-gray-200 rounded-lg justify-between py-4 px-6 my-3">
                <div>
                  <div className="font-semibold my-2">Location</div>{" "}
                  {editMode ? (
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  ) : (
                    <div>{job.location}</div>
                  )}
                </div>
                <div>
                  <div className="font-semibold my-2">Offer letter release</div>{" "}
                  {editMode ? (
                    <input
                      type="date"
                      name="offerLetterReleaseDate"
                      value={formData.offerLetterReleaseDate}
                      onChange={handleChange}
                    />
                  ) : (
                    <div>{job.offerLetterReleaseDate}</div>
                  )}
                </div>
                <div>
                  <div className="font-semibold my-2">Joining Date</div>{" "}
                  {editMode ? (
                    <input
                      type="date"
                      name="joiningDate"
                      value={formData.joiningDate}
                      onChange={handleChange}
                    />
                  ) : (
                    <div>{job.joiningDate}</div>
                  )}
                </div>
                <div>
                  <div className="font-semibold my-2">Duration</div>{" "}
                  {editMode ? (
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                    />
                  ) : (
                    <div>{job.duration}</div>
                  )}
                </div>
                <div>
                <div className="font-semibold my-2">Attachments</div>{" "}
                  {job.attachments?.map((attachment, index) => (
                    <div
                      className="text-blue-500 font-semibold cursor-pointer hover:text-blue-600 transition-all fade-in-out"
                      onClick={() => handleOpenJD(attachment)}
                      key={index}
                    >
                      {attachment.length > 20
                        ? `${attachment.slice(0, 20)}...`
                        : attachment}
                    </div>
                  ))}
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
                {editMode ? (
                  <select
                    value={formData.selectionProcedure.selectionMode}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        selectionProcedure: {
                          ...prev.selectionProcedure,
                          selectionMode: e.target.value,
                        },
                      }));
                    }}
                  >
                    <option>ONLINE</option>
                    <option>OFFLINE</option>
                    <option>HYBRID</option>
                  </select>
                ) : (
                  <div>{job.selectionProcedure.selectionMode}</div>
                )}
              </div>
              <div>
                <div className="font-semibold my-2">Shortlist from Resume</div>{" "}
                {editMode ? (
                  <input
                    type="checkbox"
                    name="shortlistFromResume"
                    checked={formData.selectionProcedure.shortlistFromResume}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        selectionProcedure: {
                          ...prev.selectionProcedure,
                          shortlistFromResume: e.target.checked,
                        },
                      }));
                    }}
                  />
                ) : (
                  <div>
                    {job.selectionProcedure.shortlistFromResume ? "YES" : "NO"}
                  </div>
                )}
              </div>
              <div>
                <div className="font-semibold my-2">Group Discussion</div>{" "}
                {editMode ? (
                  <input
                    type="checkbox"
                    name="groupDiscussion"
                    checked={formData.selectionProcedure.groupDiscussion}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        selectionProcedure: {
                          ...prev.selectionProcedure,
                          groupDiscussion: e.target.checked,
                        },
                      }));
                    }}
                  />
                ) : (
                  <div>
                    {job.selectionProcedure.groupDiscussion ? "YES" : "NO"}
                  </div>
                )}
              </div>
              <div>
                <div className="font-semibold my-2">Number of members</div>{" "}
                {editMode ? (
                  <input
                    type="number"
                    name="numberOfMembers"
                    value={
                      formData.selectionProcedure.requirements.numberOfMembers
                    }
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        selectionProcedure: {
                          ...prev.selectionProcedure,
                          requirements: {
                            ...prev.selectionProcedure.requirements,
                            numberOfMembers: e.target.value,
                          },
                        },
                      }));
                    }}
                  />
                ) : (
                  <div>
                    {job.selectionProcedure.requirements.numberOfMembers}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start md:items-stretch">
              <div className="bg-gray-200 p-8 rounded-lg">
                <div className="font-semibold bg-gray-200">Tests</div>
                <ul className="list-disc capitalize">
                  {editMode
                    ? formData.selectionProcedure.tests.map((test, index) => (
                        <li key={index} className="my-2">
                          Test Type:
                          <select
                            className="ml-4 my-2 capitalize"
                            value={test.type}
                            onChange={(e) => {
                              const updatedtests =
                                formData.selectionProcedure.tests.map((i, j) =>
                                  j === index
                                    ? { ...i, type: e.target.value }
                                    : i,
                                );
                              setFormData((prev) => ({
                                ...prev,
                                selectionProcedure: {
                                  ...prev.selectionProcedure,
                                  tests: updatedtests,
                                },
                              }));
                            }}
                          >
                            {jafDetails.testTypes.map((test, index) => (
                              <option key={index}>{test}</option>
                            ))}
                          </select>
                          <br />
                          Test Duration:
                          <input
                            className="ml-4 my-2"
                            type="number"
                            name="testDuration"
                            value={test.duration}
                            onChange={(e) => {
                              const updatedTests =
                                formData.selectionProcedure.tests.map((t, i) =>
                                  i === index
                                    ? { ...t, duration: Number(e.target.value) }
                                    : t,
                                );
                              setFormData((prev) => ({
                                ...prev,
                                selectionProcedure: {
                                  ...prev.selectionProcedure,
                                  tests: updatedTests,
                                },
                              }));
                            }}
                          />
                        </li>
                      ))
                    : job.selectionProcedure.tests.map((p, index) => (
                        <li key={index} className="my-2">
                          {Object.entries(p).map(([key, value]) => (
                            <span key={key}>
                              {key} : {value}
                              <br />
                            </span>
                          ))}
                        </li>
                      ))}
                </ul>
                {editMode && (
                  <Button className="w-full" onClick={addNewTest}>
                    Add
                  </Button>
                )}
              </div>

              <ArrowForwardIosIcon className="md:rotate-0 rotate-90 md:self-center" />

              <div className="bg-gray-200 p-8 rounded-lg">
                <div className="font-semibold bg-gray-200">Interviews</div>
                <ul className="list-disc capitalize">
                  {editMode
                    ? formData.selectionProcedure.interviews.map(
                        (interview, index) => (
                          <li key={index} className="my-2">
                            Interview Type:
                            <select
                              className="ml-4 my-2 capitalize"
                              value={interview.type}
                              onChange={(e) => {
                                const updatedInterviews =
                                  formData.selectionProcedure.interviews.map(
                                    (i, j) =>
                                      j === index
                                        ? { ...i, type: e.target.value }
                                        : i,
                                  );
                                setFormData((prev) => ({
                                  ...prev,
                                  selectionProcedure: {
                                    ...prev.selectionProcedure,
                                    interviews: updatedInterviews,
                                  },
                                }));
                              }}
                            >
                              {jafDetails.interviewTypes.map((test, index) => (
                                <option key={index}>{test}</option>
                              ))}
                            </select>
                            <br />
                            Interview Duration:
                            <input
                              className="ml-4 my-2"
                              type="number"
                              name="interviewDuration"
                              value={interview.duration}
                              onChange={(e) => {
                                const updatedInterviews =
                                  formData.selectionProcedure.interviews.map(
                                    (i, j) =>
                                      j === index
                                        ? { ...i, duration: e.target.value }
                                        : i,
                                  );
                                setFormData((prev) => ({
                                  ...prev,
                                  selectionProcedure: {
                                    ...prev.selectionProcedure,
                                    interviews: updatedInterviews,
                                  },
                                }));
                              }}
                            />
                          </li>
                        ),
                      )
                    : job.selectionProcedure.interviews.map((p, index) => (
                        <li key={index} className="my-2">
                          {Object.entries(p).map(([key, value]) => (
                            <span key={key}>
                              {key} : {value}
                              <br />
                            </span>
                          ))}
                        </li>
                      ))}
                </ul>
                {editMode && (
                  <Button className="w-full" onClick={addNewInterview}>
                    Add
                  </Button>
                )}
              </div>
            </div>
            <div className="mt-8">
              <div>
                <div>
                  <span className="font-semibold">Other requirements :</span>{" "}
                  {editMode ? (
                    <input
                      type="text"
                      name="otherRequirements"
                      value={
                        formData.selectionProcedure.requirements
                          .otherRequirements
                      }
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          selectionProcedure: {
                            ...prev.selectionProcedure,
                            requirements: {
                              ...prev.selectionProcedure.requirements,
                              otherRequirements: e.target.value,
                            },
                          },
                        }));
                      }}
                    />
                  ) : (
                    <div>
                      {job.selectionProcedure.requirements.otherRequirements}
                    </div>
                  )}
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
                    {coordinator.tpcMember.student.user.name}
                  </div>
                  <div>
                    <div>
                      <span className="font-semibold">Role : </span>
                      {coordinator.tpcMember.role}
                    </div>
                    <div>
                      <span className="font-semibold">Department : </span>
                      {coordinator.tpcMember.student.program.department}
                    </div>
                    <div>
                      <span className="font-semibold">Email : </span>
                      {coordinator.tpcMember.student.user.email}
                    </div>
                    <div>
                      <span className="font-semibold">Contact : </span>
                      {coordinator.tpcMember.student.user.contact}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Salaries
            salaries={job.salaries}
            editMode={editMode}
            handleChange={handleChange2}
            seasonType={job.season.type}
            formData={formData}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
};

export default JobDetailPage;
