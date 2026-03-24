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
  const handleChange2 = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string,
  ) => {
    console.log("Event:", e);
    console.log("Index:", index);
    console.log("Field:", field);

    setFormData((prevFormData) => ({
      ...prevFormData,
      salaries: prevFormData.salaries.map((salary, i) =>
        i === index ? { ...salary, [field]: e.target.value } : salary,
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
    const newTest = { type: "", duration: "" };
    setFormData((prev) => ({
      ...prev,
      selectionProcedure: {
        ...prev.selectionProcedure,
        tests: [...(prev.selectionProcedure.tests || []), newTest],
      },
    }));
  };

  const removeTest = (index) => {
    setFormData((prev) => ({
      ...prev,
      selectionProcedure: {
        ...prev.selectionProcedure,
        tests: prev.selectionProcedure.tests.filter((_, i) => i !== index),
      },
    }));
  };

  const addNewInterview = () => {
    const newInterview = { type: "", duration: "" };
    setFormData((prev) => ({
      ...prev,
      selectionProcedure: {
        ...prev.selectionProcedure,
        interviews: [
          ...(prev.selectionProcedure.interviews || []),
          newInterview,
        ],
      },
    }));
  };

  const removeInterview = (index) => {
    setFormData((prev) => ({
      ...prev,
      selectionProcedure: {
        ...prev.selectionProcedure,
        interviews: prev.selectionProcedure.interviews.filter(
          (_, i) => i !== index,
        ),
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
                <span className="font-semibold text-lg">Active </span>
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
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="Type skill and press Enter"
                      className="w-full p-2 border border-gray-300 rounded"
                      onKeyDown={(e) => {
                        const target = e.target as HTMLInputElement;
                        if (e.key === "Enter" && target.value.trim()) {
                          e.preventDefault();
                          const newSkill = target.value.trim();
                          const currentSkills = Array.isArray(formData.skills)
                            ? formData.skills
                            : [];
                          if (!currentSkills.includes(newSkill)) {
                            setFormData((prev) => ({
                              ...prev,
                              skills: [...currentSkills, newSkill],
                            }));
                          }
                          target.value = "";
                        }
                      }}
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(Array.isArray(formData.skills)
                        ? formData.skills
                        : []
                      ).map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => {
                              const updatedSkills = formData.skills.filter(
                                (_, i) => i !== index,
                              );
                              setFormData((prev) => ({
                                ...prev,
                                skills: updatedSkills,
                              }));
                            }}
                            className="text-blue-600 hover:text-blue-800 font-bold"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(job.skills) && job.skills.length > 0 ? (
                      job.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">No skills specified</span>
                    )}
                  </div>
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
                      value={formData.offerLetterReleaseDate || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    <div>{job.offerLetterReleaseDate || "N/A"}</div>
                  )}
                </div>
                <div>
                  <div className="font-semibold my-2">Joining Date</div>{" "}
                  {editMode ? (
                    <input
                      type="date"
                      name="joiningDate"
                      value={formData.joiningDate || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    <div>{job.joiningDate || "N/A"}</div>
                  )}
                </div>
                <div>
                  <div className="font-semibold my-2">Duration</div>{" "}
                  {editMode ? (
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    <div>{job.duration || "N/A"}</div>
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
                      formData.selectionProcedure.requirements
                        ?.numberOfMembers || ""
                    }
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        selectionProcedure: {
                          ...prev.selectionProcedure,
                          requirements: {
                            ...(prev.selectionProcedure.requirements || {}),
                            numberOfMembers: e.target.value,
                          },
                        },
                      }));
                    }}
                  />
                ) : (
                  <div>
                    {job.selectionProcedure.requirements?.numberOfMembers ||
                      "N/A"}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start md:items-stretch">
              <div className="bg-gray-200 p-8 rounded-lg">
                <div className="font-semibold bg-gray-200">Tests</div>
                <ul className="list-disc capitalize">
                  {editMode
                    ? (formData.selectionProcedure.tests || []).map(
                        (test, index) => (
                          <li
                            key={index}
                            className="my-2 border p-3 rounded bg-gray-50"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-semibold">
                                Test {index + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeTest(index)}
                                className="text-red-500 hover:text-red-700 font-bold"
                                title="Remove test"
                              >
                                ×
                              </button>
                            </div>
                            <div className="mb-2">
                              Test Type:
                              <select
                                className="ml-4 my-2 capitalize p-1 border rounded"
                                value={test.type || ""}
                                onChange={(e) => {
                                  const updatedTests =
                                    formData.selectionProcedure.tests.map(
                                      (t, i) =>
                                        i === index
                                          ? { ...t, type: e.target.value }
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
                              >
                                <option value="">Select Type</option>
                                {jafDetails?.testTypes?.map((testType, idx) => (
                                  <option key={idx} value={testType}>
                                    {testType}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              Test Duration:
                              <input
                                className="ml-4 my-2 p-1 border rounded"
                                type="text"
                                placeholder="e.g., 2 hours, 90 minutes"
                                value={test.duration || ""}
                                onChange={(e) => {
                                  const updatedTests =
                                    formData.selectionProcedure.tests.map(
                                      (t, i) =>
                                        i === index
                                          ? { ...t, duration: e.target.value }
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
                            </div>
                          </li>
                        ),
                      )
                    : (job.selectionProcedure.tests || []).map(
                        (test, index) => (
                          <li key={index} className="my-2">
                            <div>
                              <strong>Type:</strong> {test.type}
                            </div>
                            <div>
                              <strong>Duration:</strong> {test.duration}
                            </div>
                          </li>
                        ),
                      )}
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
                    ? (formData.selectionProcedure.interviews || []).map(
                        (interview, index) => (
                          <li
                            key={index}
                            className="my-2 border p-3 rounded bg-gray-50"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-semibold">
                                Interview {index + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeInterview(index)}
                                className="text-red-500 hover:text-red-700 font-bold"
                                title="Remove interview"
                              >
                                ×
                              </button>
                            </div>
                            <div className="mb-2">
                              Interview Type:
                              <select
                                className="ml-4 my-2 capitalize p-1 border rounded"
                                value={interview.type || ""}
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
                                <option value="">Select Type</option>
                                {jafDetails?.interviewTypes?.map(
                                  (interviewType, idx) => (
                                    <option key={idx} value={interviewType}>
                                      {interviewType}
                                    </option>
                                  ),
                                )}
                              </select>
                            </div>
                            <div>
                              Interview Duration:
                              <input
                                className="ml-4 my-2 p-1 border rounded"
                                type="text"
                                placeholder="e.g., 30 minutes, 1 hour"
                                value={interview.duration || ""}
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
                            </div>
                          </li>
                        ),
                      )
                    : (job.selectionProcedure.interviews || []).map(
                        (interview, index) => (
                          <li key={index} className="my-2">
                            <div>
                              <strong>Type:</strong> {interview.type}
                            </div>
                            <div>
                              <strong>Duration:</strong> {interview.duration}
                            </div>
                          </li>
                        ),
                      )}
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
                          ?.otherRequirements || ""
                      }
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          selectionProcedure: {
                            ...prev.selectionProcedure,
                            requirements: {
                              ...(prev.selectionProcedure.requirements || {}),
                              otherRequirements: e.target.value,
                            },
                          },
                        }));
                      }}
                    />
                  ) : (
                    <div>
                      {job.selectionProcedure.requirements?.otherRequirements ||
                        "N/A"}
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
            jafDetails={jafDetails}
          />
        </div>
      )}
    </div>
  );
};

export default JobDetailPage;
