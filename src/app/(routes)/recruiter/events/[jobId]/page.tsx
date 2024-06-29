"use client";
import React from "react";
import { useState, useEffect } from "react";
import { JobDetailFC } from "@/helpers/recruiter/types";
import Cookies from "js-cookie";
import { getJobDetail } from "@/helpers/recruiter/api";
import loadingImg from "@/../public/loadingSpinner.svg";
import { JobEvents } from "@/components/Recruiters/Events";

const EventsPage = ({ params }: { params: { jobId: string } }) => {
  const [job, setData] = useState<JobDetailFC>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await getJobDetail(
          Cookies.get("accessToken"),
          params.jobId
        );
        setData(jsonData);
      } catch (error) {
        console.log(error);
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
        <img src={loadingImg.src} alt="" className="mx-auto my-auto" />
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
