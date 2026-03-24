"use client";
import React, { useEffect, useState } from "react";
import { GetOnCampusOffers } from "@/helpers/student/api";
import { OnCampusOffers } from "@/helpers/student/types";
import OnCampusCard from "@/components/jobs/OnCampusCard";
import toast from "react-hot-toast";
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
    <div className="min-h-screen p-2 md:p-4 lg:p-6">
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
          On Campus Offers
        </h1>
      </div>
      {loading && (
        <div className="h-screen w-full flex justify-center items-center">
          <Loader />
        </div>
      )}
      {onCampusOffers && onCampusOffers.length > 0 ? (
        <div className="space-y-4">
          {onCampusOffers.map((job) => (
            <div key={job.id} className="w-full">
              <OnCampusCard offerItem={job} salaryId={job.salary.id} />
            </div>
          ))}
        </div>
      ) : !loading ? (
        <div className="h-64 w-full flex justify-center items-center">
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold text-gray-600 mb-2">
              No On Campus Offers Available
            </h1>
            <p className="text-gray-500">Check back later for new offers</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default StudentPage;
