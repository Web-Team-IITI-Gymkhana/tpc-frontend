"use client";
import React, { useEffect, useState } from "react";
import OffCampusCard from "@/components/jobs/OffCampusCard";
import { OffCampusOffer } from "@/helpers/student/types";
import { GetOffCampusOffers } from "@/helpers/student/api";
import toast from "react-hot-toast";
import loadingImg from "@/components/Faculty/loadingSpinner.svg";
import Loader from "@/components/Loader/loader";

const OffCampusPage = () => {
  const [offCampusOffers, setOffCampusOffers] = useState<OffCampusOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const oco = await GetOffCampusOffers();
        setOffCampusOffers(oco);
      } catch (error) {
        toast.error("Error fetching data:");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
    // setJobs(Jobs);
  }, []);

  return (
    <div>
      <div className="my-3 mx-5 font-bold text-xl">
        <h1>Off Campus Offers</h1>
      </div>
      {loading && (
        <div className="h-screen w-full flex justify-center items-center">
          <Loader />
        </div>
      )}
      {offCampusOffers &&
        offCampusOffers.map((job) => (
          <div key={job.id} className="my-3">
            <OffCampusCard jobItem={job} />
          </div>
        ))}
    </div>
  );
};

export default OffCampusPage;
