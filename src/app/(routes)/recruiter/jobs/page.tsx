"use client";
import React from "react";
import { getJobs } from "@/helpers/recruiter/api";
import { JobsFC } from "@/helpers/recruiter/types";
import { useState, useEffect } from "react";
import loadingImg from "@/../public/loadingSpinner.svg";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/loader";
import toast from "react-hot-toast";
const JobPage = () => {
  const [data, setData] = useState<JobsFC[]>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await getJobs();
        setData(jsonData);
      } catch (error) {
        toast.error("Error Fetching Data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="container mx-auto my-4 md:my-8 px-2 md:px-4">
      <h1 className="text-2xl md:text-3xl mb-4 md:mb-8 font-bold mx-auto text-center">
        All Jobs
      </h1>
      {loading && (
        <div className="h-screen w-full flex justify-center items-center">
          <Loader />
        </div>
      )}
      {data && (
        <div className="w-full overflow-x-auto shadow-md rounded-lg">
          <table className="w-full min-w-[640px] text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-3 md:px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-3 md:px-6 py-3">
                  Active
                </th>
                <th
                  scope="col"
                  className="px-3 md:px-6 py-3 hidden sm:table-cell"
                >
                  Current Status
                </th>
                <th scope="col" className="px-3 md:px-6 py-3">
                  Season Type
                </th>
                <th
                  scope="col"
                  className="px-3 md:px-6 py-3 hidden md:table-cell"
                >
                  Season Year
                </th>
                <th scope="col" className="px-3 md:px-6 py-3">
                  Company Name
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((job, index) => (
                <tr
                  key={index}
                  onClick={() => {
                    router.push(`/recruiter/jobs/${job.id}`);
                  }}
                  className="cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-3 md:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {job.role}
                  </th>
                  <td className="px-3 md:px-6 py-4">
                    {job.active ? "Active" : "Inactive"}
                  </td>
                  <td className="px-3 md:px-6 py-4 hidden sm:table-cell">
                    {job.currentStatus}
                  </td>
                  <td className="px-3 md:px-6 py-4">{job.season.type}</td>
                  <td className="px-3 md:px-6 py-4 hidden md:table-cell">
                    {job.season.year}
                  </td>
                  <td className="px-3 md:px-6 py-4">{job.company.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JobPage;
