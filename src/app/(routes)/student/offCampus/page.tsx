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
    <div className="min-h-screen p-2 md:p-4 lg:p-6">
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
          Off Campus Offers
        </h1>
      </div>
      {loading && (
        <div className="h-screen w-full flex justify-center items-center">
          <Loader />
        </div>
      )}
      {offCampusOffers && offCampusOffers.length > 0 ? (
        <div className="space-y-4">
          {offCampusOffers.map((job) => (
            <div key={job.id} className="w-full">
              <OffCampusCard jobItem={job} />
            </div>
          ))}
        </div>
      ) : !loading ? (
        <div className="h-64 w-full flex justify-center items-center">
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold text-gray-600 mb-2">
              No Off Campus Offers Available
            </h1>
            <p className="text-gray-500">Check back later for new offers</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OffCampusPage;
