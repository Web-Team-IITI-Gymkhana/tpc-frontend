"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { GetOnCampusOffers } from "@/helpers/student/api";
import { OnCampusOffers } from "@/helpers/student/types";
import OnCampusCard from "@/components/jobs/OnCampusCard";
import toast from "react-hot-toast";
import loadingImg from "@/components/Faculty/loadingSpinner.svg";

const StudentPage = () => {

  const [onCampusOffers, setOnCampusOffers] = useState<OnCampusOffers[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {      
      try {
        const oco = await GetOnCampusOffers(Cookies.get("accessToken"));
        setOnCampusOffers(oco);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data:");
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div>
      <div className="my-3 mx-5 font-bold text-xl">
        <h1>On Campus Offers</h1>
      </div>
      {loading && <img src={loadingImg.src} alt="Loading" className="mx-auto my-auto" />}
      {onCampusOffers.length >0 && (onCampusOffers.map((job)=>(
        <div key={job.id} className="my-3">
          <OnCampusCard jobItem={job} salaryId={job.salary.id}/>
        </div>
      )))}
    </div>
  );
};

export default StudentPage;
