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
import { fetchClashes, OpenJD, patchJobData } from "@/helpers/api";
import { patchSalaryData } from "@/helpers/api";
import { fetchJobById } from "@/helpers/api";
import Loader from "@/components/Loader/loader";
import toast from "react-hot-toast";
import JobCoordinatorForm from "@/components/Admin/AddForms";
import {
  fetchRecruiterData,
  fetchFaculties,
  postFacultyApproval,
} from "@/helpers/api";
import { postCompany, postRecruiter, fetchApprovals } from "@/helpers/api";
import Select from "react-select";
import Salaries from "@/components/Admin/Job/Salaries";
import SelectionProcedure from "@/components/Admin/Job/SelectionProcedure";
import Clashes from "@/components/Admin/Job/Clashes";
import JobAnalytics from "@/components/Admin/Job/JobAnalytics";
import { ClashesFC } from "@/dto/Clashes";
const currentStatusOptions = [
  "INITIALIZED",
  "SCHEDULED",
  "PPT_DONE",
  "POLL_FREEZED",
  "TEST_COMPLETED",
  "INTERVIEW_COMPLETED",
  "RECRUITMENT_PROCESS_COMPLELETED",
  "OFFER_LETTER_RELEASED",
  "PROCESS_ON_HOLD",
  "PROCESS_TERMINATED",
  "OFFER_REVOKED",
];

const JobDetailPage = ({ params }: { params: { jobId: string } }) => {
  const [job, setData] = useState<JobDetailFC>(null);
  const [clashes, setClashes] = useState<ClashesFC>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(null);
  const [jafDetails, setJafDetails] = useState<JAFdetailsFC>();
  const [facultyData, setFacultyData] = useState(null);
  const [facultyApprovals, setFacultyApprovals] = useState([]);
  const [selectedFaculties, setSelectedFaculties] = useState([]);
  const [facultyDropDown, setFacultyDropdown] = useState([false]);
  const [approvalModal, setApprovalModal] = useState(false);
  const [companyFormData, setCompanyFormData] = useState({
    name: "",
    size: 0,
    category: "",
    yearOfEstablishment: "",
    website: "",
    annualTurnover: "",
    socialMediaLink: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
    },
    domains: [""],
  });
  const [recruiterFormData, setRecruiterFormData] = useState({
    designation: "",
    landline: "",
    companyId: "",
    user: {
      name: "",
      email: "",
      contact: "",
    },
  });
  const newCurrentStatusOptions = currentStatusOptions.map((option) => ({
    value: option,
    label: option,
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          jobDetailData,
          jafDetailsData,
          recruiterData,
          facultyData,
          clashes,
        ] = await Promise.all([
          fetchJobById(params.jobId),
          getJafDetails(),
          fetchRecruiterData(),
          fetchFaculties(),
          fetchClashes(params.jobId),
        ]);
        setJafDetails(jafDetailsData);
        setData(jobDetailData);
        setFormData(jobDetailData);
        setFacultyData(facultyData);
        setClashes(clashes);
      } catch (error) {
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.jobId]);

  const handleOpenJD = async (filename: string) => {
    OpenJD(filename);
  };

  const updateFacultyDropDown = (index, value) => {
    setFacultyDropdown((prevState) => {
      const newState = [...prevState];
      newState[index] = value;
      return newState;
    });
  };

  const submitApproval = async (salaryIndex) => {
    const selected = selectedFaculties[salaryIndex] || [];
    const res = await postFacultyApproval(
      job.salaries[salaryIndex].id,
      selected,
    );
    if (res) toast.success("Request Sent");
    else toast.error("Error Sending Request");
    updateFacultyDropDown(salaryIndex, false);
  };

  const getApprovals = async (salaryIndex) => {
    setLoading(true);
    const approvals = await fetchApprovals(job.salaries[salaryIndex].id);
    setFacultyApprovals(approvals);
    setLoading(false);
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
    const updatedFormData = {
      ...formData,
      salaries: formData.salaries.map((salary) => ({
        ...salary,
        programs: salary.programs.map((program) => program.id),
      })),
    };

    await patchJobData(job.id, updatedFormData);
    await Promise.all(
      updatedFormData.salaries.map((salary) => patchSalaryData(salary)),
    );

    setEditMode(false);
    window.location.reload();
  };

  const addNewTest = () => {
    const newTest = { type: "", duration: "" };
    setFormData((prev) => ({
      ...prev,
      selectionProcedure: {
        ...prev.selectionProcedure,
        tests: [...prev.selectionProcedure.tests, newTest],
      },
    }));
  };

  const addNewInterview = () => {
    const newInterview = { type: "", duration: "" };
    setFormData((prev) => ({
      ...prev,
      selectionProcedure: {
        ...prev.selectionProcedure,
        interviews: [...prev.selectionProcedure.interviews, newInterview],
      },
    }));
  };

  return (
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
                {editMode ? (
                  <input
                    type="checkbox"
                    name="activity"
                    checked={formData.active}
                    onChange={(e) => {
                      setFormData((form) => ({
                        ...form,
                        active: e.target.checked,
                      }));
                    }}
                  />
                ) : (
                  <span>{job.active ? "Active" : "Inactive"}</span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg">
                  Registration Status{" "}
                </span>
                {editMode ? (
                  <input
                    type="checkbox"
                    name="registration"
                    checked={formData.registration === "OPEN"}
                    onChange={(e) => {
                      setFormData((form) => ({
                        ...form,
                        registration: e.target.checked ? "OPEN" : "CLOSED",
                      }));
                    }}
                  />
                ) : (
                  <span>{job.registration === "OPEN" ? "Open" : "Closed"}</span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg">Current Status </span>
                {editMode ? (
                  <Select
                    options={newCurrentStatusOptions}
                    value={{
                      value: formData.currentStatus,
                      label: formData.currentStatus,
                    }}
                    onChange={(value) => {
                      setFormData((form) => ({
                        ...formData,
                        currentStatus: value.value,
                      }));
                    }}
                  />
                ) : (
                  <span>{job.currentStatus}</span>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <Link
                  href={`/admin/jobs/events/${job.id}`}
                  className="flex flex-col gap-4"
                >
                  <Button variant="default">Events and Applications</Button>
                </Link>
                <Button onClick={handleEditClick}>
                  {editMode ? "Save Application" : "Edit Application"}
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-col flex-1">
                  <div className="font-semibold my-2">Description</div>
                  {editMode ? (
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: job.description || "",
                      }}
                    ></div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="font-semibold text-lg my-4">Skills</div>
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-wrap !text-md">
                  {job.skills?.map((skill, index) => (
                    <div key={index} className="mx-2 my-2">
                      <div className="border-2 border-gray-300 p-2 px-4 rounded-full bg-gray-200 text-gray-600">
                        {skill}
                      </div>
                    </div>
                  ))}
                </div>
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
                    <div>
                      {job.offerLetterReleaseDate
                        ? new Date(job.offerLetterReleaseDate).toLocaleString()
                        : "Not specified"}
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
                    <div>
                      {job.joiningDate
                        ? new Date(job.joiningDate).toLocaleString()
                        : "Not specified"}
                    </div>
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
                    <div>{job.duration || "Not specified"}</div>
                  )}
                </div>
                {(job.minNoOfHires || job.expectedNoOfHires) && (
                  <>
                    {job.minNoOfHires && (
                      <div>
                        <div className="font-semibold my-2">
                          Min. No. of Hires
                        </div>{" "}
                        {editMode ? (
                          <input
                            type="number"
                            name="minNoOfHires"
                            value={formData.minNoOfHires || ""}
                            onChange={handleChange}
                          />
                        ) : (
                          <div>{job.minNoOfHires}</div>
                        )}
                      </div>
                    )}
                    {job.expectedNoOfHires && (
                      <div>
                        <div className="font-semibold my-2">
                          Expected No. of Hires
                        </div>{" "}
                        {editMode ? (
                          <input
                            type="number"
                            name="expectedNoOfHires"
                            value={formData.expectedNoOfHires || ""}
                            onChange={handleChange}
                          />
                        ) : (
                          <div>{job.expectedNoOfHires}</div>
                        )}
                      </div>
                    )}
                  </>
                )}
                <div>
                  <div className="font-semibold my-2">Attachments</div>{" "}
                  {job.attachments && job.attachments.length > 0 ? (
                    job.attachments.map((attachment, index) => (
                      <div
                        className="text-blue-500 font-semibold cursor-pointer hover:text-blue-600 transition-all fade-in-out"
                        onClick={() => handleOpenJD(attachment)}
                        key={index}
                      >
                        {attachment.length > 20
                          ? `${attachment.slice(0, 20)}...`
                          : attachment}
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500">No attachments</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-white p-4 px-8 rounded-lg border-gray-300 hover:border-blue-200 border-2">
              <div className="font-bold text-xl my-4">Company Details</div>
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-col flex-1">
                  <div className="font-semibold my-2">Company Name</div>
                  <div className="flex items-center">
                    <div>{job.company?.name}</div>
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="font-semibold my-2">Annual Turnover</div>
                  <div className="flex items-center">
                    <div>{job.company?.annualTurnover}</div>
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="font-semibold my-2">
                    Year of Establishment
                  </div>
                  <div className="flex items-center">
                    <div>{job.company?.yearOfEstablishment}</div>
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="font-semibold my-2">Category</div>
                  <div className="flex items-center">
                    <div>{job.company?.category}</div>
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="font-semibold my-2">Social Media Link</div>
                  <div className="flex items-center">
                    <div>
                      <a
                        href={job.company?.socialMediaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {job.company?.socialMediaLink}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 px-8 rounded-lg border-gray-300 hover:border-blue-200 border-2">
            <div className="font-semibold text-xl my-4">Recruiter Details</div>
            {job.recruiterDetailsFilled &&
            job.recruiterDetailsFilled.length > 0 ? (
              <div className="space-y-6">
                {job.recruiterDetailsFilled.map((recruiter, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 pb-4 last:border-b-0"
                  >
                    {job.recruiterDetailsFilled.length > 1 && (
                      <div className="font-semibold text-lg mb-3 text-blue-600">
                        Recruiter {index + 1}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-4">
                      <div className="flex flex-col flex-1">
                        <div className="font-semibold my-2">Name</div>
                        <div className="flex items-center">
                          <div>{recruiter.name}</div>
                        </div>
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="font-semibold my-2">Designation</div>
                        <div className="flex items-center">
                          <div>{recruiter.designation}</div>
                        </div>
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="font-semibold my-2">Company</div>
                        <div className="flex items-center">
                          <div>{job.company.name}</div>
                        </div>
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="font-semibold my-2">Email</div>
                        <div className="flex items-center">
                          <div>{recruiter.email}</div>
                        </div>
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="font-semibold my-2">Contact</div>
                        <div className="flex items-center">
                          <div>{recruiter.contact}</div>
                        </div>
                      </div>
                      {recruiter.landline && (
                        <div className="flex flex-col flex-1">
                          <div className="font-semibold my-2">Landline</div>
                          <div className="flex items-center">
                            <div>{recruiter.landline}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Fallback to old structure if new structure is not available
              job.recruiter && (
                <div className="flex flex-wrap gap-4">
                  <div className="flex flex-col flex-1">
                    <div className="font-semibold my-2">Name</div>
                    <div className="flex items-center">
                      <div>{job.recruiter.user.name}</div>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="font-semibold my-2">Designation</div>
                    <div className="flex items-center">
                      <div>{job.recruiter.designation}</div>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="font-semibold my-2">Company</div>
                    <div className="flex items-center">
                      <div>{job.company.name}</div>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="font-semibold my-2">Email</div>
                    <div className="flex items-center">
                      <div>{job.recruiter.user.email}</div>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="font-semibold my-2">Contact</div>
                    <div className="flex items-center">
                      <div>{job.recruiter.user.contact}</div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          {job.selectionProcedure && (
            <SelectionProcedure
              selectionProcedure={job.selectionProcedure}
              editMode={editMode}
              handleChange={(e, field) => {
                const { value, type, checked } = e.target;
                const fieldValue = type === "checkbox" ? checked : value;

                // Handle nested requirements fields
                if (
                  [
                    "numberOfMembers",
                    "numberOfRooms",
                    "otherRequirements",
                  ].includes(field)
                ) {
                  setFormData({
                    ...formData,
                    selectionProcedure: {
                      ...formData.selectionProcedure,
                      requirements: {
                        ...formData.selectionProcedure.requirements,
                        [field]: fieldValue,
                      },
                    },
                  });
                } else {
                  // Handle regular fields
                  setFormData({
                    ...formData,
                    selectionProcedure: {
                      ...formData.selectionProcedure,
                      [field]: fieldValue,
                    },
                  });
                }
              }}
            />
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
              <JobCoordinatorForm jobId={params.jobId} />
            </div>
          </div>
          <Salaries
            salaries={job.salaries}
            editMode={editMode}
            handleChange={handleChange2}
            seasonType={job.season.type}
            formData={formData}
            setApprovalModal={setApprovalModal}
            approvalModal={approvalModal}
            getApprovals={getApprovals}
            facultyDropDown={facultyDropDown}
            submitApproval={submitApproval}
            facultyApprovals={facultyApprovals}
            facultyData={facultyData}
            selectedFaculties={selectedFaculties}
            setSelectedFaculties={setSelectedFaculties}
            setFacultyDropdown={setFacultyDropdown}
            loading={loading}
          />
          {job && <JobAnalytics jobId={job.id} />}
          {clashes ? <Clashes clashes={clashes} /> : <Loader />}
        </div>
      )}
    </div>
  );
};

export default JobDetailPage;
