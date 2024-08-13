"use client";
import React, { useState, useEffect } from "react";
import { JobDetailFC } from "@/helpers/recruiter/types";
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
} from "@/components/Recruiters/jobEdit";
import { fetchJobById } from "@/helpers/api";
import Modal from "@mui/material/Modal";
import toast from "react-hot-toast";
import Loader from "../Loader/loader";

const JobModal = ({
  jobID,
  open,
  setOpen,
}: {
  jobID: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  if (!open) {
    return null;
  }

  const [job, setData] = useState<JobDetailFC>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(null);
  const [jafDetails, setJafDetails] = useState<JAFdetailsFC>();
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobDetailData, jafDetailsData] = await Promise.all([
          fetchJobById(jobID),
          getJafDetails(),
        ]);

        setJafDetails((prev) => jafDetailsData);
        setData(jobDetailData);
        setFormData(jobDetailData);
      } catch (error) {
        toast.error("Error Fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [jobID]);

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
    <Modal
      open={open}
      onClose={handleClose}
      className="!text-black overflow-y-scroll"
    >
      <div className="container py-12">
        {loading && (
          <div className="w-full h-full flex justify-center items-center">
            <div className="px-28 py-16 bg-white">
              <Loader />
            </div>
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
                    href={`/admin/jobs/events/${job.id}`}
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
                    <div className="font-semibold my-2">
                      Offer letter release
                    </div>{" "}
                    {editMode ? (
                      <input
                        type="date"
                        name="offerLetterReleaseDate"
                        value={formData.offerLetterReleaseDate}
                        onChange={handleChange}
                      />
                    ) : (
                      <div>
                        {new Date(job.offerLetterReleaseDate).toLocaleString()}
                      </div>
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
                      <div>{new Date(job.joiningDate).toLocaleString()}</div>
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
                    <div className="font-semibold my-2">Attachment</div>{" "}
                    {editMode ? (
                      <input
                        type="text"
                        name="attachment"
                        value={formData.attachment}
                        onChange={handleChange}
                      />
                    ) : (
                      <div>{job.attachment}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {job.selectionProcedure && (
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
                      </select>
                    ) : (
                      <div>{job.selectionProcedure.selectionMode}</div>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold my-2">
                      Shortlist from Resume
                    </div>{" "}
                    {editMode ? (
                      <input
                        type="checkbox"
                        name="shortlistFromResume"
                        checked={
                          formData.selectionProcedure.shortlistFromResume
                        }
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
                        {job.selectionProcedure.shortlistFromResume
                          ? "YES"
                          : "NO"}
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
                            .numberOfMembers
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
                        ? formData.selectionProcedure.tests.map(
                            (test, index) => (
                              <li key={index} className="my-2">
                                Test Type:
                                <select
                                  className="ml-4 my-2 capitalize"
                                  value={test.type}
                                  onChange={(e) => {
                                    const updatedtests =
                                      formData.selectionProcedure.tests.map(
                                        (i, j) =>
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
                                      formData.selectionProcedure.tests.map(
                                        (t, i) =>
                                          i === index
                                            ? {
                                                ...t,
                                                duration: Number(
                                                  e.target.value,
                                                ),
                                              }
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
                            ),
                          )
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
                                  {jafDetails.interviewTypes.map(
                                    (test, index) => (
                                      <option key={index}>{test}</option>
                                    ),
                                  )}
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
                      <span className="font-semibold">
                        Other requirements :
                      </span>{" "}
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
                          {
                            job.selectionProcedure.requirements
                              .otherRequirements
                          }
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="bg-white p-4 px-8 rounded-lg border-gray-300 hover:border-blue-200 border-2">
              <div className="font-semibold text-lg mb-4">Job Coordinators</div>
              <div className="flex gap-4 flex-wrap">
                {job.jobCoordinators?.map((coordinator, index) => (
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
            <div className="bg-white p-4 px-8 rounded-lg border-gray-300 hover:border-blue-200 border-2">
              <div className="font-semibold text-lg mb-4">Salaries</div>
              {job.salaries?.map((salary, salaryIndex) => (
                <div key={salaryIndex}>
                  <div className="flex md:flex-row flex-col flex-wrap justify-between">
                    <div>
                      <div className="font-semibold my-2">Base Salary</div>{" "}
                      {editMode ? (
                        <input
                          type="text"
                          name="baseSalary"
                          value={formData.salaries[salaryIndex].baseSalary}
                          onChange={(e) => {
                            const updatedSalaries = formData.salaries.map(
                              (s, i) =>
                                i === salaryIndex
                                  ? { ...s, baseSalary: e.target.value }
                                  : s,
                            );
                            setFormData((prev) => ({
                              ...prev,
                              salaries: updatedSalaries,
                            }));
                          }}
                        />
                      ) : (
                        <div>{salary.baseSalary}</div>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold my-2">CTC</div>{" "}
                      {editMode ? (
                        <input
                          type="text"
                          name="totalCTC"
                          value={formData.salaries[salaryIndex].totalCTC}
                          onChange={(e) => {
                            const updatedSalaries = formData.salaries.map(
                              (s, i) =>
                                i === salaryIndex
                                  ? { ...s, totalCTC: e.target.value }
                                  : s,
                            );
                            setFormData((prev) => ({
                              ...prev,
                              salaries: updatedSalaries,
                            }));
                          }}
                        />
                      ) : (
                        <div>{salary.totalCTC}</div>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold my-2">Take Home Salary</div>{" "}
                      {editMode ? (
                        <input
                          type="text"
                          name="takeHomeSalary"
                          value={formData.salaries[salaryIndex].takeHomeSalary}
                          onChange={(e) => {
                            const updatedSalaries = formData.salaries.map(
                              (s, i) =>
                                i === salaryIndex
                                  ? { ...s, takeHomeSalary: e.target.value }
                                  : s,
                            );
                            setFormData((prev) => ({
                              ...prev,
                              salaries: updatedSalaries,
                            }));
                          }}
                        />
                      ) : (
                        <div>{salary.takeHomeSalary}</div>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold my-2">Gross Salary</div>{" "}
                      {editMode ? (
                        <input
                          type="text"
                          name="grossSalary"
                          value={formData.salaries[salaryIndex].grossSalary}
                          onChange={(e) => {
                            const updatedSalaries = formData.salaries.map(
                              (s, i) =>
                                i === salaryIndex
                                  ? { ...s, grossSalary: e.target.value }
                                  : s,
                            );
                            setFormData((prev) => ({
                              ...prev,
                              salaries: updatedSalaries,
                            }));
                          }}
                        />
                      ) : (
                        <div>{salary.grossSalary}</div>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold my-2">
                        Other Compensations
                      </div>{" "}
                      {editMode ? (
                        <input
                          type="text"
                          name="otherCompensations"
                          value={
                            formData.salaries[salaryIndex].otherCompensations
                          }
                          onChange={(e) => {
                            const updatedSalaries = formData.salaries.map(
                              (s, i) =>
                                i === salaryIndex
                                  ? { ...s, otherCompensations: e.target.value }
                                  : s,
                            );
                            setFormData((prev) => ({
                              ...prev,
                              salaries: updatedSalaries,
                            }));
                          }}
                        />
                      ) : (
                        <div>{salary.otherCompensations}</div>
                      )}
                    </div>
                  </div>
                  {/* Genders */}
                  <div>
                    <h2 className="text-md font-semibold mt-4">Genders</h2>
                    {editMode ? (
                      <GenderSelectList
                        givenOptions={jafDetails.genders}
                        formData={formData}
                        setFormData={setFormData}
                        salaryIndex={salaryIndex}
                      />
                    ) : (
                      <div className="flex flex-wrap !text-md">
                        {salary.genders?.map((gender, genderIndex) => (
                          <div key={genderIndex} className="mx-2 my-2">
                            {editMode ? null : (
                              <div className="border-2 border-gray-300 p-2 px-4 rounded-full bg-gray-200 text-gray-600">
                                {gender}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Categories */}
                  <div>
                    <h2 className="text-md font-semibold mt-4">Categories</h2>
                    {editMode ? (
                      <CategorySelectList
                        givenOptions={jafDetails.categories}
                        formData={formData}
                        setFormData={setFormData}
                        salaryIndex={salaryIndex}
                      />
                    ) : (
                      <div className="flex flex-wrap !text-md">
                        {salary.categories?.map((category, categoryIndex) => (
                          <div key={categoryIndex} className="mx-2 my-2">
                            {editMode ? null : (
                              <div className="border-2 border-gray-300 p-2 px-4 rounded-full bg-gray-200 text-gray-600">
                                {category}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Separator className="my-4" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default JobModal;
