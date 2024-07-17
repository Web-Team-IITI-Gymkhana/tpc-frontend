"use client";
import React, { useEffect, useState } from "react";
import SalaryCard from "@/components/jobs/SalaryCard";
import { GetJobById, GetResumes } from "@/helpers/student/api";
import { Resume } from "@/helpers/student/types";
import toast from "react-hot-toast";
import loadingImg from "@/components/Faculty/loadingSpinner.svg";
import Loader from "@/components/Loader/loader";

interface Salary {
  id: string;
  salaryPeriod: string;
  programs: string[];
  genders: string[];
  categories: string[];
  minCPI: number;
  tenthMarks: number;
  twelthMarks: number;
  facultyApprovals: string[];
  baseSalary: number;
  totalCTC: number;
  takeHomeSalary: number;
  grossSalary: number;
  otherCompensations: number;
}

const SalaryPage = ({ params }: { params: { jobId: string } }) => {
  const [salaryData, setSalaryData] = useState<Salary[]>([]);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalaryData = async () => {
      try {
        const data = await GetJobById(params.jobId);
        setSalaryData(data.salaries);

        const res = await GetResumes();
        setResumes(res);
      } catch (error) {

        toast.error("Error fetching data",{duration: 3000});
      } finally {
        setLoading(false);
      }
    };

    fetchSalaryData();
  }, [params.jobId]);

  return (
    <div>
      <div className="font-bold text-black text-lg ml-2 mb-4">Salaries</div>
      {loading && (
        <div className="h-screen w-full flex justify-center items-center">
          <Loader />
        </div>
      )}
      {salaryData &&
        salaryData.map((item, index) => (
          <div key={index} className="my-3">
            <SalaryCard salaryId={item.id} resumes={resumes} />
          </div>
        ))}
    </div>
  );
};

export default SalaryPage;
