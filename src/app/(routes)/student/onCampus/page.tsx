"use client";
import React, { useEffect, useState } from "react";
import { GetOnCampusOffers } from "@/helpers/student/api";
import { OnCampusOffers } from "@/helpers/student/types";
import OnCampusCard from "@/components/jobs/OnCampusCard";
import toast from "react-hot-toast";
import loadingImg from "@/components/Faculty/loadingSpinner.svg";
import Loader from "@/components/Loader/loader";
const StudentPage = () => {
  const [onCampusOffers, setOnCampusOffers] = useState<OnCampusOffers[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const oco = await GetOnCampusOffers();
        setOnCampusOffers(oco);
      } catch (error) {
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
      {loading && (
        <div className="h-screen w-full flex justify-center items-center">
          <Loader />
        </div>
      )}
      {onCampusOffers &&
        onCampusOffers.map((job) => (
          <div key={job.id} className="my-3">
            <OnCampusCard offerItem={job} salaryId={job.salary.id} />
          </div>
        ))}
    </div>
  );
};

export default StudentPage;
