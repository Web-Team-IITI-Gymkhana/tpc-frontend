"use client";
import React, { useEffect, useState } from "react";
import OffCampusCard from "@/components/jobs/OffCampusCard";
import { OffCampusOffer } from "@/helpers/student/types";
import { GetOffCampusOffers } from "@/helpers/student/api";
import Cookies from "js-cookie";

interface Props {}

const OffCampusPage = () => {

  const [offCampusOffers, setOffCampusOffers] = useState<OffCampusOffer[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const oco = await GetOffCampusOffers(Cookies.get("accessToken"));
      setOffCampusOffers(oco);
    };

    fetchJobs();
    // setJobs(Jobs);
  }, []);


  return (
    <div>
      <div className="my-3 mx-5 font-bold text-xl">
        <h1>Off Campus Offers</h1>
      </div>
      {offCampusOffers.length===0? (
        <div>
          No Jobs
        </div>
      ): (offCampusOffers.map((job)=>(
        <div key={job.id} className="my-3">
          <OffCampusCard jobItem={job}/>
        </div>
      )))}
    </div>
  );
};

export default OffCampusPage;
