"use client";
import React, { useEffect, useState } from "react";
import JobCard from "@/components/jobs/JobCard";
import Cookies from "js-cookie";
import { GetJobs } from "@/helpers/student/api";
import { Jobs } from "@/helpers/student/types";
import toast from "react-hot-toast";
import loadingImg from "@/components/Faculty/loadingSpinner.svg";

const StudentPage = () => {
  const [jobs, setJobs] = useState<Jobs[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await GetJobs(Cookies.get("accessToken"));
        setJobs(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data:");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <div className="my-3 mx-5 font-bold text-xl">
        <h1>Apply</h1>
      </div>
      <div>
        {loading && <img src={loadingImg.src} alt="Loading" className="mx-auto my-auto" />}
        {jobs && (
          jobs.map((job) => (
            <div key={job.id} className="my-3">
              <JobCard jobItem={job} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentPage;
