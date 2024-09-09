"use client";
import React, { useState, useEffect } from "react";
import { JobDetailFC } from "@/helpers/recruiter/types";
import {
  fetchJobById,
  fetchCompany,
  fetchRecruiterData,
  fetchFaculties,
} from "@/helpers/api";
import { getJafDetails } from "@/helpers/recruiter/api";
import Loader from "@/components/Loader/loader";
import toast from "react-hot-toast";
import JobHeader from "@/components/Admin/Job/JobHeader";
import CompanyDetails from "@/components/Admin/Job/CompanyDetails";
import RecruiterDetails from "@/components/Admin/Job/RecruiterDetails";
import SelectionProcedure from "@/components/Admin/Job/SelectionProcedure";
import JobCoordinators from "@/components/Admin/Job/JobCoordinators";
import Salaries from "@/components/Admin/Job/Salaries";

const JobDetailPage = ({ params }: { params: { jobId: string } }) => {
  const [job, setData] = useState<JobDetailFC>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobDetailData, companyData, recruiterData, facultyData] =
          await Promise.all([
            fetchJobById(params.jobId),
            getJafDetails(),
            fetchCompany(),
            fetchRecruiterData(),
            fetchFaculties(),
          ]);
        setData(jobDetailData);
        setFormData(jobDetailData);
        console.log(jobDetailData);
      } catch (error) {
        toast.error("Error fetching data");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.jobId]);

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
          <JobHeader
            job={job}
            formData={formData}
            setFormData={setFormData}
            editMode={editMode}
            setEditMode={setEditMode}
          />
          {job.company && (
            <CompanyDetails
              company={job.company}
              editMode={editMode}
              handleChange={(e) =>
                setFormData({
                  ...formData,
                  company: {
                    ...formData.company,
                    [e.target.name]: e.target.value,
                  },
                })
              }
            />
          )}
          <RecruiterDetails
            recruiter={job}
            editMode={editMode}
            handleChange={(e) =>
              setFormData({
                ...formData,
                recruiter: {
                  ...formData.recruiter,
                  [e.target.name]: e.target.value,
                },
              })
            }
          />
          <SelectionProcedure
            selectionProcedure={job.selectionProcedure}
            editMode={editMode}
            handleChange={(e, field) =>
              setFormData({
                ...formData,
                selectionProcedure: {
                  ...formData.selectionProcedure,
                  [field]: e.target.value,
                },
              })
            }
          />
          <JobCoordinators jobCoordinators={job.jobCoordinators} />
          <Salaries
            salaries={job.salaries}
            editMode={editMode}
            handleChange={(e, index, field) =>
              setFormData({
                ...formData,
                salaries: formData.salaries.map((salary, i) =>
                  i === index ? { ...salary, [field]: e.target.value } : salary,
                ),
              })
            }
          />
        </div>
      )}
    </div>
  );
};

export default JobDetailPage;
