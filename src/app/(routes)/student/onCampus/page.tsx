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
import OnCampusCard from "@/components/jobs/OnCampusCard";

const StudentPage = () => {

  const [onCampusOffers, setOnCampusOffers] = useState<OnCampusOffers[]>([]);

  useEffect(() => {
    const fetchOffers = async () => {
      const oco = await GetOnCampusOffers(Cookies.get("accessToken"));
      setOnCampusOffers(oco);

    };

    fetchOffers();
  }, []);

  return (
    <div>
      <div className="my-3 mx-5 font-bold text-xl">
        <h1>Offers</h1>
      </div>
      {onCampusOffers.length===0? (
        <div>
          No Offers
        </div>
      ): (onCampusOffers.map((job)=>(
        <div key={job.id} className="my-3">
          <OnCampusCard jobItem={job} salaryId={job.salary.id}/>
        </div>
      )))}
    </div>
  );
};

export default StudentPage;
