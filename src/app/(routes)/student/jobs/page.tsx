"use client";
import React, { useEffect, useState } from "react";
import JobCard from "@/components/jobs/JobCard";
import Cookies from "js-cookie";
import { GetJobs, GetResumes } from "@/helpers/student/api";
import { Jobs, Resume } from "@/helpers/student/types";

const StudentPage = () => {

  const [jobs, setJobs] = useState<Jobs[]>([]);
  const [resumes, setResumes] = useState<Resume[]>([])

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await GetJobs();
      setJobs(data);

      const res = await GetResumes(Cookies.get("accessToken"));
      setResumes(res);

    };

    fetchJobs();
    // setJobs(Jobs);
  }, []);

  return (
    <div>
      <div className="my-3 mx-5 font-bold text-xl">
        <h1>Apply</h1>
      </div>
      {jobs.length===0? (
        <div>
          No Jobs
        </div>
      ): (jobs.map((job)=>(
        <div key={job.id} className="my-3">
          <JobCard jobItem={job}/>
        </div>
      )))}
    </div>
  );
};

export default StudentPage;
