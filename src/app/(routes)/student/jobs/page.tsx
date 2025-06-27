"use client";
import React, { useEffect, useState } from "react";
import JobCard from "@/components/jobs/JobCard";
import { GetJobs } from "@/helpers/student/api";
import { Jobs } from "@/helpers/student/types";
import toast from "react-hot-toast";
import Loader from "@/components/Loader/loader";
const StudentPage = () => {
  const [jobs, setJobs] = useState<Jobs[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await GetJobs();
        setJobs(data);
      } catch (error) {
        toast.error("Error fetching data:");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen p-2 md:p-4 lg:p-6">
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
          Jobs
        </h1>
      </div>
      <div>
        {loading && (
          <div className="h-screen w-full flex justify-center items-center">
            <Loader />
          </div>
        )}
        {jobs && jobs.length > 0 ? (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="w-full">
                <JobCard jobItem={job} type="job" />
              </div>
            ))}
          </div>
        ) : !loading ? (
          <div className="h-64 w-full flex justify-center items-center">
            <div className="text-center">
              <h1 className="text-xl md:text-2xl font-bold text-gray-600 mb-2">
                No Jobs Available
              </h1>
              <p className="text-gray-500">
                Check back later for new opportunities
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default StudentPage;
