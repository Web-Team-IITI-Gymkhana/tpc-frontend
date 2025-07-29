"use client";
import React, { useState, useEffect } from "react";
import { fetchJobOffers } from "@/helpers/api";
import TableComponent from "@/components/NewTableComponent/Table";
import generateColumns from "@/components/NewTableComponent/ColumnMapping";
import Loader from "@/components/Loader/loader";
import toast from "react-hot-toast";

interface JobAnalyticsProps {
  jobId: string;
}

interface Offer {
  id: string;
  status: string;
  metadata?: string;
  student: {
    id: string;
    rollNo: string;
    user: {
      id: string;
      name: string;
      contact: string;
      email: string;
    };
    program: {
      id: string;
      branch: string;
      course: string;
      year: string;
      department: string;
    };
  };
  salary: {
    id: string;
    totalCTC: number;
    salaryPeriod?: string;
    job: {
      id: string;
      role: string;
      season: {
        id: string;
        year: string;
        type: string;
      };
      company: {
        id: string;
        name: string;
      };
    };
  };
}

const offerColumns = [
  {
    status: "ACCEPTED",
    metadata: "string",
    student: {
      rollNo: "string",
      user: {
        name: "string",
        contact: "string",
        email: "string",
      },
      program: {
        branch: "string",
        course: "string",
        year: "string",
        department: "string",
      },
    },
    salary: {
      totalCTC: 0,
      salaryPeriod: "string",
      job: {
        role: "string",
        season: {
          year: "string",
          type: "string",
        },
        company: {
          name: "string",
        },
      },
    },
  },
];

const JobAnalytics: React.FC<JobAnalyticsProps> = ({ jobId }) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const data = await fetchJobOffers(jobId);
        // Ensure data is an array
        if (Array.isArray(data)) {
          setOffers(data);
        } else {
          console.error("Expected array but got:", typeof data, data);
          setOffers([]);
          toast.error("Invalid data format received");
        }
      } catch (error) {
        console.error("Error fetching offers:", error);
        toast.error("Failed to fetch offers data");
        setOffers([]);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchOffers();
    }
  }, [jobId]);

  if (loading) {
    return (
      <div className="bg-white p-4 px-8 rounded-lg border-gray-300 hover:border-blue-200 border-2">
        <div className="font-bold text-xl my-4">Job Analytics - Offers</div>
        <div className="flex justify-center items-center h-32">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 px-8 rounded-lg border-gray-300 hover:border-blue-200 border-2">
      <div className="font-semibold text-lg mb-4">Job Analytics</div>
      <div>
        <h4 className="font-semibold text-lg mb-4">On Campus Offers</h4>
        <TableComponent
          columns={generateColumns(offerColumns)}
          data={Array.isArray(offers) ? offers : []}
          type="job-offers"
        />
      </div>
    </div>
  );
};

export default JobAnalytics;
