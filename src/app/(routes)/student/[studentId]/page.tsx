"use client";
import React, { useEffect, useState } from "react";
import JobCard from "@/components/jobs/JobCard";
import { SampleJobData } from "@/dummyData/job";
import InterviewExperiences from "@/app/(routes)/student/interviewExperiences/page";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { GetOnCampusOffers, GetResumes } from "@/helpers/student/api";
import { OnCampusOffers, Resume } from "@/helpers/student/types";

interface Props {}

const StudentPage = ({
  params,
}: {
  params: {
    studentId: String;
  };
}) => {

  const [onCampusOffers, setOnCampusOffers] = useState<OnCampusOffers[]>([]);
  const [resumes, setResumes] = useState<Resume[]>([])

  useEffect(() => {
    const fetchJobs = async () => {
      const oco = await GetOnCampusOffers(Cookies.get("accessToken"));
      setOnCampusOffers(oco);

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
      {onCampusOffers.length===0? (
        <div>
          No Jobs
        </div>
      ): (onCampusOffers.map((job)=>(
        <div key={job.id} className="my-3">
          <JobCard jobItem={job} salaryId={job.salary.id} resumes={resumes}/>
        </div>
      )))}
    </div>
  );
};

export default StudentPage;
