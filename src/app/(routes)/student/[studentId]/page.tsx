"use client";
import React, { useEffect, useState } from "react";
import JobCard from "@/components/jobs/JobCard";
import { Jobs } from "@/dummyData/job";

interface Props {}

interface Job {
  id: string;
  seasonId: string;
  recruiterId: string;
  companyId: string;
  role: string;
  active: boolean;
  currentStatus: string;
  season: {
    id: string;
    year: string;
    type: string;
  };
  company: {
    id: string;
    name: string;
  };
}

const salaryData = {
  salary: "Rs 40LPA",
};

const StudentPage = ({
  params,
}: {
  params: {
    studentId: String;
  };
}) => {

  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch("http://localhost:5000/api/v1/jobs");
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        setJobs(data);
    };

    fetchJobs();
    // setJobs(Jobs);
  }, []);

  return (
    <div>
      <div className="my-3 mx-5 font-bold text-xl">
        <h1>Apply</h1>
      </div>
      {jobs.map((job) => (
        <div key={job.id} className="my-3">
          <JobCard jobItem={job} salary={salaryData}/>
        </div>
      ))}
    </div>
  );
};

export default StudentPage;
