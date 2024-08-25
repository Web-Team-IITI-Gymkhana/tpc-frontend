"use client";
import React from "react";
import { useState, useEffect } from "react";
import { JobDetailFC } from "@/helpers/recruiter/types";
import { getJobDetail } from "@/helpers/recruiter/api";
import loadingImg from "@/../public/loadingSpinner.svg";
import { JobEvents } from "@/components/Recruiters/Events";
import Loader from "@/components/Loader/loader";
import toast from "react-hot-toast";
const EventsPage = ({ params }: { params: { jobId: string } }) => {
  const [job, setData] = useState<JobDetailFC>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await getJobDetail(params.jobId);
        setData(jsonData);
      } catch (error) {
        toast.error("Error Fetching Data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.jobId]);
  return (
    <div className="container my-8">
      <h1 className="text-3xl mb-8 font-bold mx-auto text-center">
        Events And Applications
      </h1>
      {loading && (
        <div className="h-screen w-full flex justify-center items-center">
          <Loader />
        </div>
      )}
      {job && (
        <div>
          <JobEvents events={job.events} />
        </div>
      )}
    </div>
  );
};

export default EventsPage;
