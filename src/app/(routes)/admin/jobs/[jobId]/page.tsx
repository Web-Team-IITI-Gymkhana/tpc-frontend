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
import { patchJobData } from "@/helpers/api";
import { patchSalaryData } from "@/helpers/api";
import {
  CategorySelectList,
  GenderSelectList,
} from "@/components/Recruiters/jobEdit";
import { fetchJobById } from "@/helpers/api";
import Loader from "@/components/Loader/loader";
import toast from "react-hot-toast";
import JobCoordinatorForm from "@/components/Admin/AddForms";
import { fetchCompany, fetchRecruiterData, fetchFaculties, postFacultyApproval } from "@/helpers/api";
import { assignCompany, postCompany, assignRecruiter, postRecruiter, fetchApprovals } from "@/helpers/api";
import Select from "react-select";
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
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(null);
  const [jafDetails, setJafDetails] = useState<JAFdetailsFC>();
  const [facultyData, setFacultyData] = useState(null);
  const [facultyApprovals, setFacultyApprovals] = useState([]);
  const [selectedFaculties, setSelectedFaculties] = useState([]);
  const [facultyDropDown, setFacultyDropdown] = useState([false]);
  const [companyData, setCompanyData] = useState(null);
  const [recruiterData, setRecruiterData] = useState(null);
  const [companyDropDown, setcompanyDropDown] = useState(false);
  const [recruiterDropDown, setrecruiterDropDown] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [toggleCompanyModal, setToggleCompanyModal] = useState(false);
  const [toggleRecruiterModal, setToggleRecruiterModal] = useState(false);
  const [approvalModal, setApprovalModal] = useState(false);
  const [companyFormData, setCompanyFormData] = useState({
    name: '',
    size: 0,
    category: '',
    yearOfEstablishment: '',
    website: '',
    annualTurnover: '',
    socialMediaLink: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      country: ''
    },
    domains: ['']
  });
  const [recruiterFormData, setRecruiterFormData] = useState({
    designation: '',
    landline: '',
    companyId: '',
    user: {
      name: '',
      email: '',
      contact: ''
    }
  });
  const newCurrentStatusOptions = currentStatusOptions.map((option) => ({
    value: option,
    label: option,
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {

        const [jobDetailData, jafDetailsData, companyData, recruiterData, facultyData] =
          await Promise.all([
            fetchJobById(params.jobId),
            getJafDetails(),
            fetchCompany(),
            fetchRecruiterData(),
            fetchFaculties(),
          ]);

        setJafDetails(jafDetailsData);
        setData(jobDetailData);
        setFormData(jobDetailData);
        setFacultyData(facultyData);
        setCompanyData(companyData);
        setRecruiterData(recruiterData);
        setRecruiterFormData({
          designation: jobDetailData.recruiterDetailsFilled.designation,
          landline: jobDetailData.recruiterDetailsFilled.landline,
          companyId: jobDetailData.company.id, // Assuming you have a companyId in jobDetailData
          user: {
            name: jobDetailData.recruiterDetailsFilled.name,
            email: jobDetailData.recruiterDetailsFilled.email,
            contact: jobDetailData.recruiterDetailsFilled.contact
          }
        });
        setCompanyFormData({
          name: jobDetailData.companyDetailsFilled.name,
          size: jobDetailData.companyDetailsFilled.size,
          category: jobDetailData.companyDetailsFilled.category,
          yearOfEstablishment: jobDetailData.companyDetailsFilled.yearOfEstablishment,
          website: jobDetailData.companyDetailsFilled.website,
          annualTurnover: jobDetailData.companyDetailsFilled.annualTurnover || '',
          socialMediaLink: jobDetailData.companyDetailsFilled.socialMediaLink || '',
          address: {
            line1: jobDetailData.companyDetailsFilled.address.line1 || '',
            line2: jobDetailData.companyDetailsFilled.address.line2 || '',
            city: jobDetailData.companyDetailsFilled.address.city || '',
            state: jobDetailData.companyDetailsFilled.address.state || '',
            country: jobDetailData.companyDetailsFilled.address.country || ''
          },
          domains: jobDetailData.companyDetailsFilled.domains || ['']
        });

        const matchedCompany = companyData.find(
          (company) => company.id === jobDetailData.company.id,
        );
        setSelectedCompany(matchedCompany);
        const matchedRecruiter = recruiterData.find(
          (recruiter) => recruiter.id === jobDetailData.recruiter.id,
        );
        setSelectedRecruiter(matchedRecruiter);
      } catch (error) {
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.jobId]);

  const handleCompanyFormChange = (e) => {
    const { name, value } = e.target;
    setCompanyFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRecruiterFormChange = (e) => {
    const { name, value } = e.target;
    const [mainKey, subKey] = name.split('.');

    if (subKey) {
      setRecruiterFormData((prevFormData) => ({
        ...prevFormData,
        [mainKey]: {
          ...prevFormData[mainKey],
          [subKey]: value
        }
      }));
    } else {
      setRecruiterFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  const handleCompanyFormSubmit = async () => {
    try {
      await postCompany([{
        name: companyFormData.name,
        category: companyFormData.category,
        yearOfEstablishment: companyFormData.yearOfEstablishment,
        website: companyFormData.website,
        size: companyFormData.size,
        annualTurnover: companyFormData.annualTurnover,
        socialMediaLink: "companyFormData.socialMediaLink",
        domains: companyFormData.domains,
        address: {
          line1: companyFormData.address.line1,
          line2: companyFormData.address.line2,
          city: companyFormData.address.city,
          state: companyFormData.address.state,
          country: companyFormData.address.country
        }
      }]);
      toast.success("Company details updated successfully!");
      window.location.reload();
    } catch (error) {
      toast.error("Error updating company details");
    }
  };

  const handleRecruiterFormSubmit = async () => {
    try {
      await postRecruiter([{
        designation: recruiterFormData.designation,
        landline: recruiterFormData.landline,
        companyId: recruiterFormData.companyId,
        user: {
          name: recruiterFormData.user.name,
          email: recruiterFormData.user.email,
          contact: recruiterFormData.user.contact
        }
      }]);
      toast.success("Recruiter details updated successfully!");
      window.location.reload();
    } catch (error) {
      toast.error("Error updating recruiter details");
    }
  };
  const handleToggleModal = (type) => {
    if (type === "company") {
      setToggleCompanyModal(prevState => !prevState);
    } else if (type === "recruiter") {
      setToggleRecruiterModal(prevState => !prevState);
    }
  };
  const toggleDropdown = (state: string) => {
    if (state === "company") {
      setcompanyDropDown(!companyDropDown);
      setrecruiterDropDown(false);
    } else {
      setrecruiterDropDown(!recruiterDropDown);
      setcompanyDropDown(false);
    }
  };

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    setcompanyDropDown(false);
  };
  const handleRecruiterSelect = (recruiter) => {
    setSelectedRecruiter(recruiter);
    setrecruiterDropDown(false);
  };

  const submitApproval = async (salaryIndex) => {
    const selected = selectedFaculties[salaryIndex] || [];
    for (let i = 0; i < selected.length; i++) {
      await postFacultyApproval(job.salaries[salaryIndex].id, selected[i]);
    }

  };

  const getApprovals = async (salaryIndex) => {
    setLoading(true);
    const approvals = await fetchApprovals(job.salaries[salaryIndex].id);
    setFacultyApprovals(approvals);
    setLoading(false);
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
    await patchJobData(job.id, formData);
    formData.salaries.map((salary, index) => patchSalaryData(salary));
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
                    value={formData.active}
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
          <div className="flex flex-col gap-4">
            <div className="bg-white p-4 px-8 rounded-lg border-gray-300 hover:border-blue-200 border-2">
              <div className="font-bold text-xl my-4">Company Details</div>
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-col w-full">
                  <div className="font-semibold my-2">Company Name</div>
                  <div className="flex">
                    {companyDropDown ? (
                      <div className="relative w-full">
                        <input
                          type="text"
                          className="input-field w-full border border-gray-300 rounded p-2"
                          value={selectedCompany?.name || ""}
                          onFocus={() => toggleDropdown("company")}
                          readOnly
                        />
                        {companyDropDown && (
                          <div className="max-h-64 bg-gray-100 w-full rounded-lg shadow-md absolute z-10">
                            <div className="dropdown rounded-t-lg  mt-2  w-full max-h-60 overflow-auto z-10">
                              {companyData.map((company) => (
                                <div
                                  key={company.id}
                                  className="dropdown-item  py-2 px-4 hover:bg-gray-200 cursor-pointer rounded-md last:rounded-t-md"
                                  onClick={() => handleCompanySelect(company)}
                                >
                                  {company.name}
                                </div>
                              ))}
                            </div>
                            <div className="dropdown-item bg-gray-100 py-2 px-4  cursor-pointer rounded-b-md ">
                              <Button onClick={() => handleToggleModal("company")}>Add Company</Button>
                            </div>
                            <div className="fixed  z-30 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-75">
                              {toggleCompanyModal && (
                                <div className="fixed inset-0 flex items-center justify-center z-30 bg-gray-800 bg-opacity-75">
                                  <div className="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
                                    <div className="flex justify-between items-center p-4 border-b">
                                      <h2 className="text-xl font-semibold">Edit Company Details</h2>
                                      <button className="text-gray-500 text-lg font-extrabold hover:text-gray-700" onClick={() => { handleToggleModal('company') }}>
                                        X
                                      </button>
                                    </div>
                                    <div className="p-4">
                                      <div>
                                        <label className="block text-lg font-semibold">Company Name:</label>
                                        <input
                                          className="w-full p-2 border border-gray-300 rounded mt-1"
                                          type="text"
                                          name="name"
                                          value={companyFormData.name}
                                          onChange={handleCompanyFormChange}
                                        />
                                      </div>
                                      <div className="mt-4">
                                        <label className="block text-lg font-semibold">Size:</label>
                                        <input
                                          className="w-full p-2 border border-gray-300 rounded mt-1"
                                          type="text"
                                          name="size"
                                          value={companyFormData.size}
                                          onChange={handleCompanyFormChange}
                                        />
                                      </div>
                                      <div className="mt-4">
                                        <label className="block text-lg font-semibold">Category:</label>
                                        <select
                                          className="w-full p-2 border border-gray-300 rounded mt-1"
                                          name="category"
                                          value={companyFormData.category}
                                          onChange={handleCompanyFormChange}
                                        >
                                          <option value="PSU">PSU</option>
                                          <option value="MNC">MNC</option>
                                          <option value="PUBLIC">PUBLIC</option>
                                          <option value="GOVERNMENT">GOVERNMENT</option>
                                        </select>
                                      </div>
                                      <div className="mt-4">
                                        <label className="block text-lg font-semibold">Year of Establishment:</label>
                                        <input
                                          className="w-full p-2 border border-gray-300 rounded mt-1"
                                          type="text"
                                          name="yearOfEstablishment"
                                          value={companyFormData.yearOfEstablishment}
                                          onChange={handleCompanyFormChange}
                                        />
                                      </div>
                                      <div className="mt-4">
                                        <label className="block text-lg font-semibold">Website:</label>
                                        <input
                                          className="w-full p-2 border border-gray-300 rounded mt-1"
                                          type="text"
                                          name="website"
                                          value={companyFormData.website}
                                          onChange={handleCompanyFormChange}
                                        />
                                      </div>
                                    </div>
                                    <div className="flex justify-end p-4 border-t">
                                      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleCompanyFormSubmit}>
                                        Submit
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}

                            </div>

                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-between w-full">
                        <div
                          onClick={() => toggleDropdown("company")}
                          className="cursor-pointer w-full"
                        >
                          {selectedCompany?.name || "Select a Company"}
                        </div>
                        <Button
                          onClick={() => toggleDropdown("company")}
                          className="ml-2"
                        >
                          {selectedCompany?.id ===
                            "f47ac10b-58cc-4372-a567-0e02b2c3d479"
                            ? "Assign"
                            : "Change"}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="font-semibold my-2">Annual Turnover</div>
                  <div className="flex items-center">
                    <div>{selectedCompany?.annualTurnover}</div>
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="font-semibold my-2">
                    Year of Establishment
                  </div>
                  <div className="flex items-center">
                    <div>{selectedCompany?.yearOfEstablishment}</div>
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="font-semibold my-2">Category</div>
                  <div className="flex items-center">
                    <div>{selectedCompany?.category}</div>
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="font-semibold my-2">Social Media Link</div>
                  <div className="flex items-center">
                    <div>
                      <a
                        href={selectedCompany?.socialMediaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {selectedCompany?.socialMediaLink}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end w-full mt-4">
                  <Button
                    onClick={async () => {
                      if (selectedCompany) {
                        try {
                          await assignCompany([
                            { id: job.id, companyId: selectedCompany.id },
                          ]);
                          toast.success("Company assigned successfully");
                        } catch (error) {
                          toast.error("Failed to assign company");
                        }
                      }
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 px-8 rounded-lg border-gray-300 hover:border-blue-200 border-2">
            <div className="font-semibold text-lg my-4">Recruiter Details</div>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col w-full">
                <div className="font-semibold my-2">Recruiter Name</div>
                <div className="flex">
                  {recruiterDropDown ? (
                    <div className="relative w-full">
                      <input
                        type="text"
                        className="input-field w-full border border-gray-300 rounded p-2"
                        value={selectedRecruiter?.user.name || ""}
                        onFocus={() => toggleDropdown("recruiter")}
                        readOnly
                      />
                      {recruiterDropDown && (
                        <div className="max-h-64 bg-gray-100 w-full rounded-lg shadow-md absolute z-10">
                          <div className="dropdown rounded-t-lg  mt-2  w-full max-h-60 overflow-auto z-10">
                            {recruiterData.map((recruiter) => (
                              <div
                                key={recruiter.id}
                                className="dropdown-item  py-2 px-4 hover:bg-gray-200 cursor-pointer rounded-md last:rounded-t-md"
                                onClick={() => handleRecruiterSelect(recruiter)}
                              >
                                {recruiter.user.name}
                              </div>
                            ))}
                          </div>
                          <div className="dropdown-item bg-gray-100 py-2 px-4  cursor-pointer rounded-b-md ">
                            <Button onClick={() => handleToggleModal("recruiter")}>Add Recruiter</Button>
                          </div>
                          <div className="fixed  w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-75">
                            {toggleRecruiterModal && (
                              <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                                <div className="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
                                  <div className="flex justify-between items-center p-4 border-b">
                                    <h2 className="text-xl font-semibold">Edit Recruiter Details</h2>
                                    <button className="text-gray-500 text-lg  font-extrabold hover:text-gray-700" onClick={() => handleToggleModal("recruiter")}>
                                      X
                                    </button>
                                  </div>
                                  <div className="p-4">
                                    <div>
                                      <label className="block text-lg font-semibold">Name:</label>
                                      <input
                                        className="w-full p-2 border border-gray-300 rounded mt-1"
                                        type="text"
                                        name="user.name"
                                        value={recruiterFormData.user.name}
                                        onChange={handleRecruiterFormChange}
                                      />
                                    </div>
                                    <div className="mt-4">
                                      <label className="block text-lg font-semibold">Designation:</label>
                                      <input
                                        className="w-full p-2 border border-gray-300 rounded mt-1"
                                        type="text"
                                        name="designation"
                                        value={recruiterFormData.designation}
                                        onChange={handleRecruiterFormChange}
                                      />
                                    </div>
                                    <div className="mt-4">
                                      <label className="block text-lg font-semibold">Email:</label>
                                      <input
                                        className="w-full p-2 border border-gray-300 rounded mt-1"
                                        type="text"
                                        name="user.email"
                                        value={recruiterFormData.user.email}
                                        onChange={handleRecruiterFormChange}
                                      />
                                    </div>
                                    <div className="mt-4">
                                      <label className="block text-lg font-semibold">Contact:</label>
                                      <input
                                        className="w-full p-2 border border-gray-300 rounded mt-1"
                                        type="text"
                                        name="user.contact"
                                        value={recruiterFormData.user.contact}
                                        onChange={handleRecruiterFormChange}
                                      />
                                    </div>
                                    <div className="mt-4">
                                      <label className="block text-lg font-semibold">Landline:</label>
                                      <input
                                        className="w-full p-2 border border-gray-300 rounded mt-1"
                                        type="text"
                                        name="landline"
                                        value={recruiterFormData.landline}
                                        onChange={handleRecruiterFormChange}
                                      />
                                    </div>
                                  </div>
                                  <div className="flex justify-end p-4 border-t">
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleRecruiterFormSubmit}>
                                      Submit
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}



                          </div>

                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between w-full">
                      <div
                        onClick={() => toggleDropdown("recruiter")}
                        className="cursor-pointer w-full"
                      >
                        {selectedRecruiter?.user.name || "Select a Recruiter"}
                      </div>
                      <Button
                        onClick={() => toggleDropdown("recruiter")}
                        className="ml-2"
                      >
                        {selectedRecruiter?.id ===
                          "3a0a4d51-3085-4d39-8a0b-376e4e1e63a1"
                          ? "Assign"
                          : "Change"}
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col flex-1">
                <div className="font-semibold my-2">Name</div>
                <div className="flex items-center">
                  <div>{selectedRecruiter?.user.name}</div>
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <div className="font-semibold my-2">Email</div>
                <div className="flex items-center">
                  <div>{selectedRecruiter?.user.email}</div>
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <div className="font-semibold my-2">Contact</div>
                <div className="flex items-center">
                  <div>{selectedRecruiter?.user.contact}</div>
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <div className="font-semibold my-2">Company</div>
                <div className="flex items-center">
                  <div>{selectedRecruiter?.company.name}</div>
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <div className="font-semibold my-2">Designation</div>
                <div className="flex items-center">
                  <div>{selectedRecruiter?.designation}</div>
                </div>
              </div>
              <div className="flex justify-end w-full mt-4">
                <Button
                  onClick={async () => {
                    if (selectedRecruiter) {
                      try {
                        await assignRecruiter([
                          { id: job.id, recruiterId: selectedRecruiter.id },
                        ]);
                        toast.success("Recruiter assigned successfully");
                      } catch (error) {
                        toast.error("Failed to assign recruiter");
                      }
                    }
                  }}
                >
                  Submit
                </Button>
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
                          ?.numberOfMembers!
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
                      {job.selectionProcedure.requirements?.numberOfMembers!}
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
                                        duration: Number(e.target.value),
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
                    <span className="font-semibold">Other requirements :</span>{" "}
                    {editMode ? (
                      <input
                        type="text"
                        name="otherRequirements"
                        value={
                          formData.selectionProcedure.requirements
                            ?.otherRequirements
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
                        {job.selectionProcedure.requirements?.otherRequirements}
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
              <JobCoordinatorForm jobId={params.jobId} />
            </div>
          </div>
          <div className="bg-white p-4 px-8 rounded-lg border-gray-300 hover:border-blue-200 border-2">
            <div className=" flex justify-between">
              <div className="font-semibold text-lg mb-4">Salaries</div>

            </div>
            {job.salaries?.map((salary, salaryIndex) => (
              <>
                <div key={salaryIndex}>
                  <div className="flex md:flex-row flex-col flex-wrap justify-between">
                    <div className="w-1/6">
                      <div className="font-semibold my-2">Base Salary</div>
                      {editMode ? (
                        <input
                          type="text"
                          name="baseSalary"
                          value={formData.salaries[salaryIndex].baseSalary}
                          onChange={(e) => {
                            const updatedSalaries = formData.salaries.map((s, i) =>
                              i === salaryIndex ? { ...s, baseSalary: e.target.value } : s
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
                    <div  className="w-1/6">
                      <div className="font-semibold my-2">CTC</div>
                      {editMode ? (
                        <input
                          type="text"
                          name="totalCTC"
                          value={formData.salaries[salaryIndex].totalCTC}
                          onChange={(e) => {
                            const updatedSalaries = formData.salaries.map((s, i) =>
                              i === salaryIndex ? { ...s, totalCTC: e.target.value } : s
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
                    <div  className="w-1/6">
                      <div className="font-semibold my-2">Take Home Salary</div>
                      {editMode ? (
                        <input
                          type="text"
                          name="takeHomeSalary"
                          value={formData.salaries[salaryIndex].takeHomeSalary}
                          onChange={(e) => {
                            const updatedSalaries = formData.salaries.map((s, i) =>
                              i === salaryIndex ? { ...s, takeHomeSalary: e.target.value } : s
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
                    <div  className="w-1/6">
                      <div className="font-semibold my-2">Gross Salary</div>
                      {editMode ? (
                        <input
                          type="text"
                          name="grossSalary"
                          value={formData.salaries[salaryIndex].grossSalary}
                          onChange={(e) => {
                            const updatedSalaries = formData.salaries.map((s, i) =>
                              i === salaryIndex ? { ...s, grossSalary: e.target.value } : s
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
                    <div  className="w-1/6">
                      <div className="font-semibold my-2">Other Compensations</div>
                      {editMode ? (
                        <input
                          type="text"
                          name="otherCompensations"
                          value={formData.salaries[salaryIndex].otherCompensations}
                          onChange={(e) => {
                            const updatedSalaries = formData.salaries.map((s, i) =>
                              i === salaryIndex ? { ...s, otherCompensations: e.target.value } : s
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
                  <div className="flex md:flex-row flex-col flex-wrap justify-between my-5">
                      <div  className="w-1/6">
                        <div className="font-semibold my-2">Minimum CPI</div>
                        {editMode ? (
                          <input
                            type="text"
                            name="minCPI"
                            value={formData.salaries[salaryIndex].minCPI}
                            onChange={(e) => {
                              const updatedSalaries = formData.salaries.map((s, i) =>
                                i === salaryIndex ? { ...s, minCPI: e.target.value } : s
                              );
                              setFormData((prev) => ({
                                ...prev,
                                salaries: updatedSalaries,
                              }));
                            }}
                          />
                        ) : (
                          <div>{salary.minCPI}</div>
                        )}
                      </div>
                      <div  className="w-1/6">
                        <div className="font-semibold my-2">Tenth Marks</div>
                        {editMode ? (
                          <input
                            type="text"
                            name="tenthMarks"
                            value={formData.salaries[salaryIndex].tenthMarks}
                            onChange={(e) => {
                              const updatedSalaries = formData.salaries.map((s, i) =>
                                i === salaryIndex ? { ...s, tenthMarks: e.target.value } : s
                              );
                              setFormData((prev) => ({
                                ...prev,
                                salaries: updatedSalaries,
                              }));
                            }}
                          />
                        ) : (
                          <div>{salary.tenthMarks}</div>
                        )}
                      </div>
                      <div  className="w-1/6">
                        <div className="font-semibold my-2">TwelthMarks Marks</div>
                        {editMode ? (
                          <input
                            type="text"
                            name="twelthMarks"
                            value={formData.salaries[salaryIndex].twelthMarks}
                            onChange={(e) => {
                              const updatedSalaries = formData.salaries.map((s, i) =>
                                i === salaryIndex ? { ...s, twelthMarks: e.target.value } : s
                              );
                              setFormData((prev) => ({
                                ...prev,
                                salaries: updatedSalaries,
                              }));
                            }}
                          />
                        ) : (
                          <div>{salary.twelthMarks}</div>
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
                        salaryIndex={salaryIndex} />
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
                        salaryIndex={salaryIndex} />
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
                  <div className="flex justify-between mt-2 mb-4">
                    <Button color="primary" onClick={() => { setApprovalModal(!approvalModal); getApprovals(salaryIndex) }} >Current Approvals</Button>
                    <div className="flex justify-end">
                      {facultyDropDown[salaryIndex] && (<button
                        className="bg-blue-500 text-white p-2 mr-4 rounded  hover:bg-blue-600 transition duration-200"
                        onClick={() => submitApproval(salaryIndex)}
                      >
                        Submit Request
                      </button>)}
                      <Button
                        color="primary"
                        className=""
                        onClick={() => {
                          setFacultyDropdown((prev) => {
                            const newDropdownState = [...prev];
                            newDropdownState[salaryIndex] = !newDropdownState[salaryIndex];
                            return newDropdownState;
                          });
                        }}
                      >
                        Make Request
                      </Button>
                    </div>
                  </div>
                  {approvalModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-30 bg-gray-800 bg-opacity-10">
                      <div className="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
                        <div className="flex justify-between items-center p-4 border-b">
                          <h2 className="text-xl font-semibold">Current Approvals</h2>
                          <button className="text-gray-500 text-lg font-extrabold hover:text-gray-700" onClick={() => setApprovalModal(!approvalModal)}>
                            X
                          </button>
                        </div>
                        <div className="p-4 web overflow-auto" style={{ maxHeight: "75vh" }}>
                          {loading ? (
                            <Loader />
                          ) : (
                            facultyApprovals.map((approval, salaryIndex) => (
                              <div key={approval.id} className="border-b border-gray-300 py-2">
                                <h3 className="text-lg font-semibold">{approval?.faculty.user.name}</h3>
                                <p className="text-gray-600"><strong>Department:</strong> {approval.faculty.department}</p>
                                <p className="text-gray-600"><strong>Email:</strong> {approval.faculty?.user.email}</p>
                                <p className="text-gray-600"><strong>Contact:</strong> {approval.faculty?.user.contact}</p>
                                <p className="text-gray-600"><strong>Status:</strong> {approval.status}</p>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )}                

                  <div key={salaryIndex} className="flex flex-col">
                    <div className="relative">

                      {facultyDropDown[salaryIndex] && (
                        <><div className="absolute right-0 mt-2 mb-3 w-60 bg-white border border-gray-300 max-h-60 overflow-auto rounded shadow-lg z-10">
                          {facultyData.map((faculty) => (
                            <label
                              key={faculty.id}
                              className="flex items-center p-2 bg-gray-100 hover:bg-gray-200 transition duration-200"
                            >
                              <input
                                type="checkbox"
                                checked={selectedFaculties[salaryIndex]?.includes(faculty.id) || false}
                                onChange={() => {
                                  setSelectedFaculties((prev) => {
                                    const newSelectedFaculties = [...prev];
                                    if (!newSelectedFaculties[salaryIndex]) {
                                      newSelectedFaculties[salaryIndex] = [];
                                    }
                                    if (newSelectedFaculties[salaryIndex].includes(faculty.id)) {
                                      newSelectedFaculties[salaryIndex] = newSelectedFaculties[salaryIndex].filter((id) => id !== faculty.id);
                                    } else {
                                      newSelectedFaculties[salaryIndex].push(faculty.id);
                                    }
                                    return newSelectedFaculties;
                                  });
                                }}
                                className="form-checkbox h-4 w-4 text-blue-600" />
                              <span className="ml-2 text-gray-700">{faculty.user.name}</span>
                            </label>
                          ))}
                        </div></>
                      )}
                    </div>
                  </div>
                </div ></>
            ))}
          </div>
        </div>
      )
      }
    </div >
  );
};

export default JobDetailPage;
