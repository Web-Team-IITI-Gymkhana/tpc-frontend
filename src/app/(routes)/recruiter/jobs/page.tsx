"use client";
import React from "react";
import { getJobs } from "@/helpers/recruiter/api";
import { JobsFC } from "@/helpers/recruiter/api";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import loadingImg from "@/../public/loadingSpinner.svg";
import { useRouter } from "next/navigation";

const JobPage = () => {
  const [data, setData] = useState<JobsFC[]>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await getJobs(Cookies.get("accessToken"));
        setData(jsonData);
      } catch (error) {
        error("Error Fetching Data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="container my-8">
      {loading && (
        <img src={loadingImg.src} alt="" className="mx-auto my-auto" />
      )}
      {data && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Active
                </th>
                <th scope="col" className="px-6 py-3">
                  Current Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Season Year
                </th>
                <th scope="col" className="px-6 py-3">
                  Season Type
                </th>
                <th scope="col" className="px-6 py-3">
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
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {job.role}
                  </th>
                  <td className="px-6 py-4">
                    {job.active ? "Active" : "Inactive"}
                  </td>
                  <td className="px-6 py-4">{job.currentStatus}</td>
                  <td className="px-6 py-4">{job.season.type}</td>
                  <td className="px-6 py-4">{job.season.year}</td>
                  <td className="px-6 py-4">{job.company.name}</td>
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
